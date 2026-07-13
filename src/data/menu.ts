export type MenuItem = {
  id: string;
  name: string;
  price: string;
  category: string;
  type: "veg" | "non-veg";
  description?: string;
  spiceLevel?: 1 | 2 | 3; // 1 = mild, 2 = medium, 3 = spicy
  isBestseller?: boolean;
  isChefSpecial?: boolean;
};

export const menuCategories = [
  "Noodles",
  "Rice",
  "Veg Kebabs",
  "Non Veg Kebabs",
  "Indian Veg Gravy",
  "Indian Non Veg Gravy",
  "Breads",
  "Salad",
];

export const foodMenu: MenuItem[] = [
  // Noodles
  { id: "n1", name: "Veg Noodles", price: "₹250", category: "Noodles", type: "veg", spiceLevel: 1 },
  { id: "n2", name: "Egg Noodles", price: "₹270", category: "Noodles", type: "non-veg", spiceLevel: 1 },
  { id: "n3", name: "Chicken Noodles", price: "₹300", category: "Noodles", type: "non-veg", spiceLevel: 2, isBestseller: true },
  { id: "n4", name: "Mixed Noodles", price: "₹350", category: "Noodles", type: "non-veg", spiceLevel: 2 },
  { id: "n5", name: "Schezwan Noodles (Veg)", price: "₹280", category: "Noodles", type: "veg", spiceLevel: 3 },
  { id: "n6", name: "Schezwan Noodles (Chicken)", price: "₹330", category: "Noodles", type: "non-veg", spiceLevel: 3, isChefSpecial: true },

  // Rice
  { id: "r1", name: "Veg Fried Rice", price: "₹250", category: "Rice", type: "veg", spiceLevel: 1 },
  { id: "r2", name: "Egg Fried Rice", price: "₹270", category: "Rice", type: "non-veg", spiceLevel: 1 },
  { id: "r3", name: "Chicken Fried Rice", price: "₹300", category: "Rice", type: "non-veg", spiceLevel: 1, isBestseller: true },
  { id: "r4", name: "Mixed Fried Rice", price: "₹350", category: "Rice", type: "non-veg", spiceLevel: 2 },
  { id: "r5", name: "Schezwan Fried Rice (Veg)", price: "₹280", category: "Rice", type: "veg", spiceLevel: 3 },
  { id: "r6", name: "Schezwan Fried Rice (Chicken)", price: "₹330", category: "Rice", type: "non-veg", spiceLevel: 3 },
  { id: "r7", name: "Steamed Rice", price: "₹150", category: "Rice", type: "veg", spiceLevel: 1 },
  { id: "r8", name: "Jeera Rice", price: "₹180", category: "Rice", type: "veg", spiceLevel: 1 },
  { id: "r9", name: "Peas Pulao", price: "₹220", category: "Rice", type: "veg", spiceLevel: 1 },

  // Veg Kebabs
  { id: "vk1", name: "Paneer Tikka Kebab", price: "₹350", category: "Veg Kebabs", type: "veg", spiceLevel: 2, isBestseller: true },
  { id: "vk2", name: "Malai Paneer Tikka Kebab", price: "₹380", category: "Veg Kebabs", type: "veg", spiceLevel: 1, isChefSpecial: true },
  { id: "vk3", name: "Hariyali Paneer Tikka Kebab", price: "₹360", category: "Veg Kebabs", type: "veg", spiceLevel: 2 },

  // Non Veg Kebabs
  { id: "nvk1", name: "Spicy Chicken Tikka Kebab", price: "₹450", category: "Non Veg Kebabs", type: "non-veg", spiceLevel: 3, isBestseller: true },
  { id: "nvk2", name: "Hariyali Chicken Tikka Kebab", price: "₹460", category: "Non Veg Kebabs", type: "non-veg", spiceLevel: 2 },
  { id: "nvk3", name: "Malai Chicken Tikka Kebab", price: "₹480", category: "Non Veg Kebabs", type: "non-veg", spiceLevel: 1, isChefSpecial: true },
  { id: "nvk4", name: "Reshmi Chicken Tikka Kebab", price: "₹470", category: "Non Veg Kebabs", type: "non-veg", spiceLevel: 1 },
  { id: "nvk5", name: "Tandoori Chicken (Half)", price: "₹380", category: "Non Veg Kebabs", type: "non-veg", spiceLevel: 2 },
  { id: "nvk6", name: "Tandoori Chicken (Full)", price: "₹700", category: "Non Veg Kebabs", type: "non-veg", spiceLevel: 2, isBestseller: true },
  { id: "nvk7", name: "Chicken Tangri Kebab", price: "₹450", category: "Non Veg Kebabs", type: "non-veg", spiceLevel: 2 },

  // Indian Veg Gravy
  { id: "ivg1", name: "Paneer Butter Masala", price: "₹350", category: "Indian Veg Gravy", type: "veg", spiceLevel: 1, isBestseller: true },
  { id: "ivg2", name: "Mixed Veg", price: "₹280", category: "Indian Veg Gravy", type: "veg", spiceLevel: 2 },
  { id: "ivg3", name: "Matar Paneer", price: "₹320", category: "Indian Veg Gravy", type: "veg", spiceLevel: 2 },

  // Indian Non Veg Gravy
  { id: "invg1", name: "Chicken Butter Masala", price: "₹450", category: "Indian Non Veg Gravy", type: "non-veg", spiceLevel: 1, isBestseller: true },
  { id: "invg2", name: "Chicken Bharta", price: "₹420", category: "Indian Non Veg Gravy", type: "non-veg", spiceLevel: 2, isChefSpecial: true },
  { id: "invg3", name: "Kadhai Chicken", price: "₹440", category: "Indian Non Veg Gravy", type: "non-veg", spiceLevel: 3 },
  { id: "invg4", name: "Chicken Lababdar", price: "₹460", category: "Indian Non Veg Gravy", type: "non-veg", spiceLevel: 2 },

  // Breads
  { id: "b1", name: "Tandoori Roti", price: "₹40", category: "Breads", type: "veg" },
  { id: "b2", name: "Butter Roti", price: "₹50", category: "Breads", type: "veg", isBestseller: true },
  { id: "b3", name: "Plain Naan", price: "₹70", category: "Breads", type: "veg" },
  { id: "b4", name: "Butter Naan", price: "₹90", category: "Breads", type: "veg", isBestseller: true },
  { id: "b5", name: "Garlic Naan", price: "₹110", category: "Breads", type: "veg", isChefSpecial: true },
  { id: "b6", name: "Cheese Naan", price: "₹140", category: "Breads", type: "veg" },

  // Salad
  { id: "s1", name: "Green Salad", price: "₹120", category: "Salad", type: "veg" },
  { id: "s2", name: "Onion Salad", price: "₹80", category: "Salad", type: "veg" },
  { id: "s3", name: "Roasted Papad", price: "₹40", category: "Salad", type: "veg" },
  { id: "s4", name: "Fried Papad", price: "₹50", category: "Salad", type: "veg" },
  { id: "s5", name: "Mint Cucumber Salad", price: "₹140", category: "Salad", type: "veg", isChefSpecial: true },
];
