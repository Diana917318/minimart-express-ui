// Categories
export const categories = [
  { id: 1, name: "Groceries", icon: "🛒" },
  { id: 2, name: "Fruits & Vegetables", icon: "🍎" },
  { id: 3, name: "Cold Cuts", icon: "🥓" },
  { id: 4, name: "Dairy", icon: "🥛" },
  { id: 5, name: "Frozen Foods", icon: "🧊" },
  { id: 6, name: "Cleaning", icon: "🧽" },
  { id: 7, name: "Hygiene", icon: "🧴" },
  { id: 8, name: "Basic Pharmacy", icon: "💊" },
];

// Products
export const products = [
  {
    id: 101,
    name: "White Bread",
    price: 1.5,
    categoryId: 1,
    image: "https://images.unsplash.com/photo-1608198093002-f2e61f8a1a1d",
    stock: 25,
  },
  {
    id: 102,
    name: "Bananas (1kg)",
    price: 2.2,
    categoryId: 2,
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e43e",
    stock: 15,
  },
  {
    id: 103,
    name: "Red Apples (1kg)",
    price: 3.0,
    categoryId: 2,
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
    stock: 20,
  },
  {
    id: 104,
    name: "Turkey Ham 200g",
    price: 4.5,
    categoryId: 3,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947",
    stock: 10,
  },
  {
    id: 105,
    name: "Fresh Milk 1L",
    price: 1.2,
    categoryId: 4,
    image: "https://images.unsplash.com/photo-1582719478173-2d50f3f74c84",
    stock: 30,
  },
  {
    id: 106,
    name: "Cheddar Cheese 200g",
    price: 3.8,
    categoryId: 4,
    image: "https://images.unsplash.com/photo-1625231180189-6d61f9b1c4cf",
    stock: 12,
  },
  {
    id: 107,
    name: "Frozen Pizza",
    price: 5.5,
    categoryId: 5,
    image: "https://images.unsplash.com/photo-1601924582971-c9d4c25d03f4",
    stock: 8,
  },
  {
    id: 108,
    name: "Laundry Detergent",
    price: 6.0,
    categoryId: 6,
    image: "https://images.unsplash.com/photo-1602184896266-6c02ab73e611",
    stock: 15,
  },
  {
    id: 109,
    name: "Toothpaste",
    price: 2.0,
    categoryId: 7,
    image: "https://images.unsplash.com/photo-1629909614339-445e7a123617",
    stock: 22,
  },
  {
    id: 110,
    name: "Aspirin 20ct",
    price: 3.5,
    categoryId: 8,
    image: "https://images.unsplash.com/photo-1588776814546-ec09dba9f3d1",
    stock: 18,
  },
];

// Example User
export const user = {
  id: 1,
  name: "Jane Doe",
  email: "jane@example.com",
  phone: "+1 555-0100",
  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786",
  addresses: [
    {
      id: 1,
      label: "Home",
      address: "123 Main St, Apt 4B",
      city: "New York",
      isDefault: true,
    },
    {
      id: 2,
      label: "Work",
      address: "456 Market Ave, Floor 8",
      city: "New York",
      isDefault: false,
    },
  ],
};

// Example Orders
export const orders = [
  {
    id: 201,
    userId: 1,
    items: [
      { productId: 103, quantity: 2, price: 3.0 },
      { productId: 106, quantity: 1, price: 3.8 },
    ],
    total: 9.8,
    status: "On the way",
    driverId: 301,
    estimatedDelivery: "2025-09-22T19:30:00Z",
    orderDate: "2025-09-22T18:00:00Z",
  },
  {
    id: 202,
    userId: 1,
    items: [
      { productId: 102, quantity: 3, price: 2.2 },
      { productId: 105, quantity: 2, price: 1.2 },
    ],
    total: 9.0,
    status: "Delivered",
    driverId: 301,
    estimatedDelivery: "2025-09-21T15:30:00Z",
    orderDate: "2025-09-21T14:00:00Z",
  },
];

// Drivers
export const drivers = [
  {
    id: 301,
    name: "Carlos Pérez",
    licensePlate: "XYZ-123",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    location: { lat: 40.7128, lng: -74.0060 },
    rating: 4.8,
    deliveriesCompleted: 156,
  },
  {
    id: 302,
    name: "Maria Rodriguez",
    licensePlate: "ABC-789",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    location: { lat: 40.7589, lng: -73.9851 },
    rating: 4.9,
    deliveriesCompleted: 203,
  },
];

// Admin KPIs
export const adminStats = {
  totalOrders: 120,
  revenue: 2350,
  activePromotions: 3,
  totalProducts: products.length,
  activeDrivers: 2,
  averageDeliveryTime: 28,
};

// Promotions
export const promotions = [
  {
    id: 1,
    title: "Welcome Discount",
    code: "WELCOME10",
    discount: 10,
    type: "percentage",
    active: true,
    expiryDate: "2025-12-31",
  },
  {
    id: 2,
    title: "Free Delivery",
    code: "FREEDEL",
    discount: 0,
    type: "free_delivery",
    active: true,
    expiryDate: "2025-10-31",
  },
];

// Cart state (would be in a context/store in real app)
export let cart = {
  items: [
    { productId: 102, quantity: 2 },
    { productId: 105, quantity: 1 },
  ],
  promoCode: "",
};

// Helper functions
export const getProductById = (id: number) => products.find(p => p.id === id);
export const getCategoryById = (id: number) => categories.find(c => c.id === id);
export const getProductsByCategory = (categoryId: number) => products.filter(p => p.categoryId === categoryId);