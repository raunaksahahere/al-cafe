"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { getDb } from "@/lib/db";

const itemSchema = z.object({
  section: z.enum(["food", "hookah"]),
  categoryId: z.string().uuid(),
  name: z.string().trim().min(1, "Name is required.").max(120),
  description: z.string().trim().max(600).optional(),
  price: z.coerce.number().positive("Price must be a positive number.").max(100000),
  type: z.enum(["veg", "non-veg"]),
  spiceLevel: z.coerce.number().int().min(1).max(3).optional(),
  isBestseller: z.boolean(),
  isChefSpecial: z.boolean(),
  isPremium: z.boolean(),
});

function readItem(formData: FormData) {
  return itemSchema.safeParse({
    section: formData.get("section"),
    categoryId: formData.get("categoryId"),
    name: formData.get("name"),
    description: formData.get("description") || undefined,
    price: formData.get("price"),
    type: formData.get("type") || "veg",
    spiceLevel: formData.get("spiceLevel") || undefined,
    isBestseller: formData.get("isBestseller") === "on",
    isChefSpecial: formData.get("isChefSpecial") === "on",
    isPremium: formData.get("isPremium") === "on",
  });
}

function refreshMenus() {
  revalidatePath("/menu");
  revalidatePath("/hookah-lounge");
  revalidatePath("/admin");
}

async function categoryBelongsToSection(categoryId: string, section: "food" | "hookah") {
  const sql = getDb();
  const rows = (await sql`
    SELECT EXISTS(
      SELECT 1 FROM menu_categories
      WHERE id = ${categoryId} AND section = ${section}
    ) AS exists
  `) as { exists: boolean }[];

  return Boolean(rows[0]?.exists);
}

export async function createMenuItem(_: { error?: string; success?: boolean }, formData: FormData) {
  await requireAdmin();
  const parsed = readItem(formData);
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid item." };

  const item = parsed.data;
  if (!(await categoryBelongsToSection(item.categoryId, item.section))) {
    return { error: "Choose a valid category for this menu." };
  }

  const sql = getDb();
  if (item.section === "food") {
    await sql`
      INSERT INTO menu_items (category_id, name, description, price, type, spice_level, is_bestseller, is_chef_special, is_available, sort_order)
      VALUES (${item.categoryId}, ${item.name}, ${item.description ?? null}, ${item.price}, ${item.type}, ${item.spiceLevel ?? null}, ${item.isBestseller}, ${item.isChefSpecial}, true, 999)
    `;
  } else {
    await sql`
      INSERT INTO hookah_items (category_id, name, description, price, is_premium, is_available, sort_order)
      VALUES (${item.categoryId}, ${item.name}, ${item.description ?? null}, ${item.price}, ${item.isPremium}, true, 999)
    `;
  }
  refreshMenus();
  return { success: true };
}

export async function updateMenuItem(formData: FormData) {
  await requireAdmin();
  const id = z.string().uuid().safeParse(formData.get("id"));
  const section = z.enum(["food", "hookah"]).safeParse(formData.get("section"));
  const parsed = readItem(formData);
  if (!id.success || !section.success || !parsed.success) throw new Error(parsed.success ? "Invalid item." : parsed.error.issues[0]?.message ?? "Invalid item.");

  const item = parsed.data;
  if (item.section !== section.data || !(await categoryBelongsToSection(item.categoryId, section.data))) {
    throw new Error("Choose a valid category for this menu.");
  }

  const sql = getDb();
  if (section.data === "food") {
    await sql`
      UPDATE menu_items
      SET category_id = ${item.categoryId},
          name = ${item.name},
          description = ${item.description ?? null},
          price = ${item.price},
          type = ${item.type},
          spice_level = ${item.spiceLevel ?? null},
          is_bestseller = ${item.isBestseller},
          is_chef_special = ${item.isChefSpecial},
          updated_at = NOW()
      WHERE id = ${id.data}
    `;
  } else {
    await sql`
      UPDATE hookah_items
      SET category_id = ${item.categoryId},
          name = ${item.name},
          description = ${item.description ?? null},
          price = ${item.price},
          is_premium = ${item.isPremium},
          updated_at = NOW()
      WHERE id = ${id.data}
    `;
  }
  refreshMenus();
}

export async function setMenuItemAvailability(formData: FormData) {
  await requireAdmin();
  const id = z.string().uuid().safeParse(formData.get("id"));
  const section = z.enum(["food", "hookah"]).safeParse(formData.get("section"));
  const isAvailable = z.enum(["true", "false"]).safeParse(formData.get("isAvailable"));
  if (!id.success || !section.success || !isAvailable.success) throw new Error("Invalid item.");

  const nextAvailability = isAvailable.data === "true";
  const sql = getDb();
  if (section.data === "food") {
    await sql`UPDATE menu_items SET is_available = ${nextAvailability}, updated_at = NOW() WHERE id = ${id.data}`;
  } else {
    await sql`UPDATE hookah_items SET is_available = ${nextAvailability}, updated_at = NOW() WHERE id = ${id.data}`;
  }
  refreshMenus();
}

export async function deleteMenuItem(formData: FormData) {
  await requireAdmin();
  const id = z.string().uuid().safeParse(formData.get("id"));
  const section = z.enum(["food", "hookah"]).safeParse(formData.get("section"));
  if (!id.success || !section.success) throw new Error("Invalid item.");

  const sql = getDb();
  if (section.data === "food") {
    await sql`DELETE FROM menu_items WHERE id = ${id.data}`;
  } else {
    await sql`DELETE FROM hookah_items WHERE id = ${id.data}`;
  }
  refreshMenus();
}
