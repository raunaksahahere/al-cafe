export type HookahItem = {
  id: string;
  name: string;
  price: string;
  series: string;
  isBestseller?: boolean;
  isChefSpecial?: boolean;
};

export const hookahSeries = [
  "Elaichi Series",
  "Rasna Series",
  "Premium Series",
  "Kiwi Series",
  "Teen Paan Series",
  "Blueberry Series",
  "Gum Series",
  "Russian Base",
];

export const hookahMenu: HookahItem[] = [
  // Elaichi Series (₹599)
  { id: "h1", name: "Elaichi", price: "₹599", series: "Elaichi Series" },
  { id: "h2", name: "Elaichi Mint", price: "₹599", series: "Elaichi Series" },
  { id: "h3", name: "Elaichi Mint Vanilla", price: "₹599", series: "Elaichi Series" },
  { id: "h4", name: "Elaichi Mint Grape", price: "₹599", series: "Elaichi Series" },
  { id: "h5", name: "Energetic Mint", price: "₹599", series: "Elaichi Series" },
  { id: "h6", name: "Grape Mint", price: "₹599", series: "Elaichi Series" },
  { id: "h7", name: "Orange Gum Mint", price: "₹599", series: "Elaichi Series" },
  { id: "h8", name: "Vanilla Gum", price: "₹599", series: "Elaichi Series" },

  // Rasna Series (₹599)
  { id: "h9", name: "Lemon Rasna", price: "₹599", series: "Rasna Series" },
  { id: "h10", name: "Vanilla Rasna", price: "₹599", series: "Rasna Series" },
  { id: "h11", name: "Mango Rasna", price: "₹599", series: "Rasna Series" },
  { id: "h12", name: "Orange Rasna", price: "₹599", series: "Rasna Series" },

  // Premium Series (₹599)
  { id: "h13", name: "Pink Guava", price: "₹599", series: "Premium Series", isBestseller: true },
  { id: "h14", name: "Habibi Special", price: "₹599", series: "Premium Series", isChefSpecial: true },
  { id: "h15", name: "Gum Blast", price: "₹599", series: "Premium Series" },
  { id: "h16", name: "Kiwi Blast", price: "₹599", series: "Premium Series" },
  { id: "h17", name: "Kolkata Mitha Paan", price: "₹599", series: "Premium Series", isBestseller: true },
  { id: "h18", name: "Turkish", price: "₹599", series: "Premium Series" },
  { id: "h19", name: "Mix Fruit", price: "₹599", series: "Premium Series" },
  { id: "h20", name: "Magic", price: "₹599", series: "Premium Series" },
  { id: "h21", name: "Commissioner", price: "₹599", series: "Premium Series" },
  { id: "h22", name: "Watermelon Gum", price: "₹599", series: "Premium Series" },
  { id: "h23", name: "Lip Kiss", price: "₹599", series: "Premium Series" },
  { id: "h24", name: "Ice Grape", price: "₹599", series: "Premium Series" },

  // Kiwi Series (₹599)
  { id: "h25", name: "Kiwi Gum", price: "₹599", series: "Kiwi Series" },
  { id: "h26", name: "Kiwi Mint", price: "₹599", series: "Kiwi Series" },
  { id: "h27", name: "Kiwi Orange Mint", price: "₹599", series: "Kiwi Series" },
  { id: "h28", name: "Kiwi Zafran", price: "₹599", series: "Kiwi Series" },
  { id: "h29", name: "Kiwi Spring Water", price: "₹599", series: "Kiwi Series" },
  { id: "h30", name: "Peach Kiwi Rasna", price: "₹599", series: "Kiwi Series" },

  // Teen Paan Series (₹599)
  { id: "h31", name: "Teen Paan Peach", price: "₹599", series: "Teen Paan Series" },
  { id: "h32", name: "Teen Paan Kemaam", price: "₹599", series: "Teen Paan Series" },
  { id: "h33", name: "Teen Paan Rajni", price: "₹599", series: "Teen Paan Series" },
  { id: "h34", name: "Teen Paan Gum", price: "₹599", series: "Teen Paan Series" },
  { id: "h35", name: "Teen Paan Rose", price: "₹599", series: "Teen Paan Series" },
  { id: "h36", name: "Teen Paan Zafraan", price: "₹599", series: "Teen Paan Series" },
  { id: "h37", name: "Five Paan", price: "₹599", series: "Teen Paan Series", isBestseller: true },
  { id: "h38", name: "Rasna Mint", price: "₹599", series: "Teen Paan Series" },

  // Blueberry Series (₹599)
  { id: "h39", name: "Blueberry Vanilla", price: "₹599", series: "Blueberry Series" },
  { id: "h40", name: "Blueberry Spring Water", price: "₹599", series: "Blueberry Series" },
  { id: "h41", name: "Blueberry Orange Mint", price: "₹599", series: "Blueberry Series" },
  { id: "h42", name: "Blueberry Mint", price: "₹599", series: "Blueberry Series" },
  { id: "h43", name: "Blueberry Gum", price: "₹599", series: "Blueberry Series" },
  { id: "h44", name: "Blueberry Paan", price: "₹599", series: "Blueberry Series" },

  // Gum Series (₹599)
  { id: "h45", name: "Gum Supari", price: "₹599", series: "Gum Series" },
  { id: "h46", name: "Gum Mint", price: "₹599", series: "Gum Series" },
  { id: "h47", name: "Gum Orange", price: "₹599", series: "Gum Series" },
  { id: "h48", name: "Gum Elaichi", price: "₹599", series: "Gum Series" },
  { id: "h49", name: "Brain Freezer Gum", price: "₹599", series: "Gum Series", isChefSpecial: true },
  { id: "h50", name: "Brain Freezer Orange", price: "₹599", series: "Gum Series" },

  // Russian Base
  { id: "h51", name: "Russian Base", price: "₹999", series: "Russian Base", isChefSpecial: true },
];

export const hookahAddons = [
  { id: "a1", name: "Ice Base", price: "+₹49" },
  { id: "a2", name: "Milk Base", price: "+₹49" },
  { id: "a3", name: "Lemon Base", price: "+₹49" },
  { id: "a4", name: "Fruit Base", price: "+₹99" },
  { id: "a5", name: "Ice Bucket Base", price: "+₹99" },
  { id: "a6", name: "Cappuccino Base", price: "+₹99" },
  { id: "a7", name: "Mojito Base", price: "+₹149" },
  { id: "a8", name: "Red Bull Base", price: "+₹199" },
];
