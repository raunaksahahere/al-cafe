import type { Metadata } from "next";
import AddMenuItemForm from "@/components/admin/AddMenuItemForm";
import { deleteMenuItem, setMenuItemAvailability, updateMenuItem } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminMenuData, type AdminMenuItem, type MenuCategory } from "@/lib/menu-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

function priceValue(price: string) {
  return price.replace(/[^0-9.]/g, "");
}

function ItemsTable({ title, items, categories }: { title: string; items: AdminMenuItem[]; categories: MenuCategory[] }) {
  const groups = Object.groupBy(items, (item) => item.category);

  return (
    <section className="space-y-5">
      <h2 className="text-2xl font-semibold">{title}</h2>
      {Object.entries(groups).map(([category, categoryItems]) => (
        <div key={category} className="rounded-lg border border-white/10 bg-[#111]">
          <h3 className="px-4 py-3 font-medium text-[#FF7A00] border-b border-white/10">{category}</h3>
          <div className="divide-y divide-white/10">
            {categoryItems?.map((item) => {
              const sectionCategories = categories.filter((menuCategory) => menuCategory.section === item.section);

              return (
                <div key={item.id} className="grid gap-4 p-4 xl:grid-cols-[1fr_auto]">
                  <form action={updateMenuItem} className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                    <input type="hidden" name="id" value={item.id} />
                    <input type="hidden" name="section" value={item.section} />
                    <label className="text-sm text-white/70">Name
                      <input name="name" required maxLength={120} defaultValue={item.name} className="mt-1 w-full rounded border border-white/15 bg-black p-2 text-white" />
                    </label>
                    <label className="text-sm text-white/70">Category
                      <select name="categoryId" required defaultValue={item.categoryId} className="mt-1 w-full rounded border border-white/15 bg-black p-2 text-white">
                        {sectionCategories.map((menuCategory) => <option key={menuCategory.id} value={menuCategory.id}>{menuCategory.name}</option>)}
                      </select>
                    </label>
                    <label className="text-sm text-white/70">Price
                      <input name="price" type="number" min="0.01" step="0.01" defaultValue={priceValue(item.price)} required className="mt-1 w-full rounded border border-white/15 bg-black p-2 text-white" />
                    </label>
                    <label className="text-sm text-white/70">Status
                      <span className={`mt-1 flex h-[42px] items-center rounded border px-3 ${item.isAvailable ? "border-green-500/40 text-green-300" : "border-red-500/40 text-red-300"}`}>
                        {item.isAvailable ? "Available" : "Hidden"}
                      </span>
                    </label>
                    <label className="text-sm text-white/70">Type
                      <select name="type" disabled={item.section === "hookah"} defaultValue={item.type} className="mt-1 w-full rounded border border-white/15 bg-black p-2 text-white disabled:opacity-50">
                        <option value="veg">Veg</option>
                        <option value="non-veg">Non-veg</option>
                      </select>
                    </label>
                    <label className="text-sm text-white/70">Spice level
                      <select name="spiceLevel" disabled={item.section === "hookah"} defaultValue={item.spiceLevel ?? ""} className="mt-1 w-full rounded border border-white/15 bg-black p-2 text-white disabled:opacity-50">
                        <option value="">Not specified</option>
                        <option value="1">Mild</option>
                        <option value="2">Medium</option>
                        <option value="3">Spicy</option>
                      </select>
                    </label>
                    <div className="flex flex-wrap items-end gap-4 text-sm text-white/80 md:col-span-2">
                      {item.section === "food" ? (
                        <>
                          <label className="flex h-[42px] items-center gap-2"><input name="isBestseller" type="checkbox" defaultChecked={item.isBestseller} /> Bestseller</label>
                          <label className="flex h-[42px] items-center gap-2"><input name="isChefSpecial" type="checkbox" defaultChecked={item.isChefSpecial} /> Chef special</label>
                        </>
                      ) : (
                        <label className="flex h-[42px] items-center gap-2"><input name="isPremium" type="checkbox" defaultChecked={item.isPremium} /> Premium hookah</label>
                      )}
                    </div>
                    <label className="text-sm text-white/70 md:col-span-2 xl:col-span-3">Description
                      <textarea name="description" maxLength={600} rows={2} defaultValue={item.description ?? ""} className="mt-1 w-full rounded border border-white/15 bg-black p-2 text-white" />
                    </label>
                    <div className="flex items-end">
                      <button className="h-[42px] w-full rounded bg-[#FF7A00] px-4 py-2 font-medium text-black transition-colors hover:bg-[#ff932f]">Save changes</button>
                    </div>
                  </form>
                  <div className="flex gap-2 xl:w-44 xl:flex-col xl:justify-end">
                    <form action={setMenuItemAvailability} className="flex-1">
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="section" value={item.section} />
                      <input type="hidden" name="isAvailable" value={item.isAvailable ? "false" : "true"} />
                      <button className="h-[42px] w-full rounded border border-white/20 px-3 text-sm text-white transition-colors hover:bg-white/10">{item.isAvailable ? "Hide" : "Restore"}</button>
                    </form>
                    <form action={deleteMenuItem} className="flex-1">
                      <input type="hidden" name="id" value={item.id} />
                      <input type="hidden" name="section" value={item.section} />
                      <button className="h-[42px] w-full rounded border border-red-500/60 px-3 text-sm text-red-300 transition-colors hover:bg-red-500/10">Delete</button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}

export default async function AdminPage() {
  await requireAdmin();
  const { categories, food, hookah } = await getAdminMenuData();
  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white md:px-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <header><p className="text-sm uppercase tracking-[0.2em] text-[#FF7A00]">AL Cafe & Lounge</p><h1 className="mt-2 text-4xl font-semibold">Menu dashboard</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/60">Changes here write directly to the Neon database tables and refresh the public menu pages.</p></header>
        <AddMenuItemForm categories={categories} />
        <ItemsTable title="Food menu" items={food} categories={categories} />
        <ItemsTable title="Hookah menu" items={hookah} categories={categories} />
      </div>
    </main>
  );
}
