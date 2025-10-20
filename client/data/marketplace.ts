export type SellerType = "Cooperative" | "Individual" | "School Supplier";
export type Item = {
  id: number;
  name: string;
  category: string;
  price: number; // in RWF
  priceLabel: string;
  seller: string;
  sellerType: SellerType;
  location: string;
  verified: boolean;
  availability: "In Stock" | "Limited" | "Out of Stock";
  image: string;
};

const marketplaceData: Item[] = [
  { id: 1, name: "Fresh Spinach", category: "Vegetables", price: 600, priceLabel: "600 RWF / bunch", seller: "Nyabihu Women’s Cooperative", sellerType: "Cooperative", location: "Nyabihu District", verified: true, availability: "In Stock", image: "https://images.pexels.com/photos/1458697/pexels-photo-1458697.jpeg" },
  { id: 2, name: "Dry Beans", category: "Cereals", price: 900, priceLabel: "900 RWF / kg", seller: "Kigali Fresh Market", sellerType: "School Supplier", location: "Nyarugenge, Kigali", verified: true, availability: "In Stock", image: "https://images.pexels.com/photos/4110252/pexels-photo-4110252.jpeg" },
  { id: 3, name: "Fresh Milk", category: "Dairy", price: 700, priceLabel: "700 RWF / liter", seller: "Rwamagana Dairy Group", sellerType: "Cooperative", location: "Rwamagana District", verified: false, availability: "Limited", image: "https://images.pexels.com/photos/3026812/pexels-photo-3026812.jpeg" },
  { id: 4, name: "Bananas", category: "Fruits", price: 500, priceLabel: "500 RWF / kg", seller: "Musanze Youth Co-op", sellerType: "Cooperative", location: "Musanze District", verified: true, availability: "In Stock", image: "https://images.pexels.com/photos/161559/bananas-fruits-food-healthy-161559.jpeg" },
  { id: 5, name: "Maize Flour", category: "Cereals", price: 1200, priceLabel: "1200 RWF / kg", seller: "Rubavu Agro Hub", sellerType: "Individual", location: "Rubavu District", verified: false, availability: "In Stock", image: "https://images.pexels.com/photos/4197798/pexels-photo-4197798.jpeg" },
  { id: 6, name: "Eggs", category: "Protein", price: 120, priceLabel: "120 RWF / egg", seller: "Huye Farmers Network", sellerType: "Cooperative", location: "Huye District", verified: true, availability: "In Stock", image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg" },
  { id: 7, name: "Sorghum Flour", category: "Cereals", price: 1500, priceLabel: "1500 RWF / kg", seller: "Kayonza Agro Processing", sellerType: "School Supplier", location: "Kayonza District", verified: true, availability: "Limited", image: "https://images.pexels.com/photos/4197920/pexels-photo-4197920.jpeg" },
  { id: 8, name: "Cassava Leaves", category: "Vegetables", price: 400, priceLabel: "400 RWF / bunch", seller: "Bugesera Women Growers", sellerType: "Cooperative", location: "Bugesera District", verified: true, availability: "In Stock", image: "https://images.pexels.com/photos/5914439/pexels-photo-5914439.jpeg" }
];

export default marketplaceData;
