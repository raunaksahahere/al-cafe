import "server-only";

import { getDb } from "@/lib/db";

export type MenuSection = "food" | "hookah";

export type MenuCategory = {
  id: string;
  name: string;
  section: MenuSection;
  sortOrder: number;
};

export type PublicMenuItem = {
  id: string;
  name: string;
  description?: string;
  price: string;
  category: string;
  type: "veg" | "non-veg";
  spiceLevel?: 1 | 2 | 3;
  isBestseller: boolean;
  isChefSpecial: boolean;
};

export type AdminMenuItem = PublicMenuItem & {
  categoryId: string;
  section: MenuSection;
  isAvailable: boolean;
  isPremium: boolean;
};

type CategoryRow = {
  id: string;
  name: string;
  section: MenuSection;
  sort_order: number;
};

type FoodRow = {
  id: string;
  category_id: string;
  category: string;
  name: string;
  description: string | null;
  price: string | number;
  type: "veg" | "non-veg";
  spice_level: number | null;
  is_bestseller: boolean;
  is_chef_special: boolean;
  is_available: boolean;
};

type HookahRow = {
  id: string;
  category_id: string;
  category: string;
  name: string;
  description: string | null;
  price: string | number;
  is_premium: boolean;
  is_available: boolean;
};

function formatPrice(price: string | number) {
  return `₹${Number(price).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}

function toFoodItem(row: FoodRow): PublicMenuItem {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    price: formatPrice(row.price),
    category: row.category,
    type: row.type,
    spiceLevel: row.spice_level ? (row.spice_level as 1 | 2 | 3) : undefined,
    isBestseller: row.is_bestseller,
    isChefSpecial: row.is_chef_special,
  };
}

function toHookahItem(row: HookahRow): PublicMenuItem {
  return {
    id: row.id,
    name: row.name,
    description: row.description ?? undefined,
    price: formatPrice(row.price),
    category: row.category,
    type: "veg",
    isBestseller: row.is_premium,
    isChefSpecial: false,
  };
}

export async function getPublicFoodMenu() {
  if (!process.env.DATABASE_URL) return [];

  const sql = getDb();
  const rows = (await sql`
    SELECT menu_items.*, menu_categories.name AS category
    FROM menu_items
    INNER JOIN menu_categories ON menu_categories.id = menu_items.category_id
    WHERE menu_categories.section = 'food' AND menu_items.is_available = true
    ORDER BY menu_categories.sort_order, menu_items.sort_order, menu_items.name
  `) as FoodRow[];

  return rows.map(toFoodItem);
}

export async function getPublicHookahMenu() {
  if (!process.env.DATABASE_URL) return [];

  const sql = getDb();
  const rows = (await sql`
    SELECT hookah_items.*, menu_categories.name AS category
    FROM hookah_items
    INNER JOIN menu_categories ON menu_categories.id = hookah_items.category_id
    WHERE menu_categories.section = 'hookah' AND hookah_items.is_available = true
    ORDER BY menu_categories.sort_order, hookah_items.sort_order, hookah_items.name
  `) as HookahRow[];

  return rows.map(toHookahItem);
}

export async function getAdminMenuData() {
  const sql = getDb();
  const [categoryRows, foodRows, hookahRows] = await Promise.all([
    sql`SELECT id, name, section, sort_order FROM menu_categories ORDER BY section, sort_order, name`,
    sql`
      SELECT menu_items.*, menu_categories.name AS category
      FROM menu_items
      INNER JOIN menu_categories ON menu_categories.id = menu_items.category_id
      WHERE menu_categories.section = 'food'
      ORDER BY menu_categories.sort_order, menu_items.sort_order, menu_items.name
    `,
    sql`
      SELECT hookah_items.*, menu_categories.name AS category
      FROM hookah_items
      INNER JOIN menu_categories ON menu_categories.id = hookah_items.category_id
      WHERE menu_categories.section = 'hookah'
      ORDER BY menu_categories.sort_order, hookah_items.sort_order, hookah_items.name
    `,
  ]);

  return {
    categories: (categoryRows as CategoryRow[]).map((category) => ({
      id: category.id,
      name: category.name,
      section: category.section,
      sortOrder: category.sort_order,
    })),
    food: (foodRows as FoodRow[]).map((row) => ({
      ...toFoodItem(row),
      categoryId: row.category_id,
      section: "food" as const,
      isAvailable: row.is_available,
      isPremium: false,
    })),
    hookah: (hookahRows as HookahRow[]).map((row) => ({
      ...toHookahItem(row),
      categoryId: row.category_id,
      section: "hookah" as const,
      isAvailable: row.is_available,
      isPremium: row.is_premium,
    })),
  };
}
