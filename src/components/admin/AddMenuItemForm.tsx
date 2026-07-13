"use client";

import { useActionState, useMemo, useState } from "react";
import { createMenuItem } from "@/app/admin/actions";
import type { MenuCategory } from "@/lib/menu-data";

const initialState: { error?: string; success?: boolean } = {};

export default function AddMenuItemForm({ categories }: { categories: MenuCategory[] }) {
  const [section, setSection] = useState<"food" | "hookah">("food");
  const [state, formAction, pending] = useActionState(createMenuItem, initialState);
  const availableCategories = useMemo(() => categories.filter((category) => category.section === section), [categories, section]);

  return (
    <form action={formAction} className="border border-white/10 bg-[#111] p-5 rounded-lg grid gap-4 md:grid-cols-2">
      <h2 className="md:col-span-2 text-xl font-semibold">Add menu item</h2>
      <label className="text-sm text-white/70">Menu
        <select name="section" value={section} onChange={(event) => setSection(event.target.value as "food" | "hookah")} className="mt-1 w-full rounded border border-white/15 bg-black p-2 text-white">
          <option value="food">Food</option><option value="hookah">Hookah</option>
        </select>
      </label>
      <label className="text-sm text-white/70">Category
        <select name="categoryId" required className="mt-1 w-full rounded border border-white/15 bg-black p-2 text-white">
          {availableCategories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
        </select>
      </label>
      <label className="text-sm text-white/70">Name<input name="name" required maxLength={120} className="mt-1 w-full rounded border border-white/15 bg-black p-2 text-white" /></label>
      <label className="text-sm text-white/70">Price<input name="price" required type="number" min="0.01" step="0.01" className="mt-1 w-full rounded border border-white/15 bg-black p-2 text-white" /></label>
      <label className="text-sm text-white/70">Type
        <select name="type" disabled={section === "hookah"} className="mt-1 w-full rounded border border-white/15 bg-black p-2 text-white disabled:opacity-50"><option value="veg">Veg</option><option value="non-veg">Non-veg</option></select>
      </label>
      <label className="text-sm text-white/70">Spice level
        <select name="spiceLevel" disabled={section === "hookah"} className="mt-1 w-full rounded border border-white/15 bg-black p-2 text-white disabled:opacity-50"><option value="">Not specified</option><option value="1">Mild</option><option value="2">Medium</option><option value="3">Spicy</option></select>
      </label>
      <label className="md:col-span-2 text-sm text-white/70">Description<textarea name="description" maxLength={600} rows={3} className="mt-1 w-full rounded border border-white/15 bg-black p-2 text-white" /></label>
      <div className="md:col-span-2 flex flex-wrap gap-5 text-sm text-white/80">
        <label className="flex items-center gap-2"><input name="isBestseller" type="checkbox" /> Bestseller</label>
        <label className="flex items-center gap-2"><input name="isChefSpecial" type="checkbox" disabled={section === "hookah"} /> Chef special</label>
        <label className="flex items-center gap-2"><input name="isPremium" type="checkbox" disabled={section === "food"} /> Premium hookah</label>
      </div>
      {state.error && <p className="md:col-span-2 text-sm text-red-400" role="alert">{state.error}</p>}
      {state.success && <p className="md:col-span-2 text-sm text-green-400">Item added.</p>}
      <button type="submit" disabled={pending || availableCategories.length === 0} className="md:col-span-2 rounded bg-[#FF7A00] px-4 py-2 font-medium disabled:opacity-60">{pending ? "Adding..." : "Add item"}</button>
    </form>
  );
}
