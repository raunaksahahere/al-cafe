import { neon } from "@neondatabase/serverless";
import { loadEnvConfig } from "@next/env";
import { foodMenu } from "../src/data/menu";
import { hookahMenu } from "../src/data/hookah";

type Category = { id: string; name: string; section: "food" | "hookah" };

function priceToNumber(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

async function main() {
  loadEnvConfig(process.cwd());
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error("DATABASE_URL is required to seed the menu.");
  const sql = neon(connectionString);
  const categories = (await sql`SELECT id, name, section FROM menu_categories`) as Category[];
  const categoryByKey = new Map(categories.map((category) => [`${category.section}:${category.name}`, category.id]));

  for (const [index, item] of foodMenu.entries()) {
    const categoryId = categoryByKey.get(`food:${item.category}`);
    if (!categoryId) throw new Error(`Missing seeded food category: ${item.category}`);
    await sql`
      INSERT INTO menu_items (category_id, name, description, price, type, spice_level, is_bestseller, is_chef_special, is_available, sort_order)
      SELECT ${categoryId}, ${item.name}, ${item.description ?? null}, ${priceToNumber(item.price)}, ${item.type}, ${item.spiceLevel ?? null}, ${item.isBestseller ?? false}, ${item.isChefSpecial ?? false}, true, ${index}
      WHERE NOT EXISTS (SELECT 1 FROM menu_items WHERE category_id = ${categoryId} AND name = ${item.name})
    `;
  }

  for (const [index, item] of hookahMenu.entries()) {
    const categoryId = categoryByKey.get(`hookah:${item.series}`);
    if (!categoryId) throw new Error(`Missing seeded hookah category: ${item.series}`);
    await sql`
      INSERT INTO hookah_items (category_id, name, description, price, is_premium, is_available, sort_order)
      SELECT ${categoryId}, ${item.name}, null, ${priceToNumber(item.price)}, ${item.isBestseller ?? item.isChefSpecial ?? false}, true, ${index}
      WHERE NOT EXISTS (SELECT 1 FROM hookah_items WHERE category_id = ${categoryId} AND name = ${item.name})
    `;
  }

  console.log(`Seeded ${foodMenu.length} food items and ${hookahMenu.length} hookah items.`);
}

main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
