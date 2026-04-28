export const menuItemsData = [
  {
    id: 1,
    name: "Espresso",
    category: "Coffee",
    price: 120,
    available: true,
  },
  {
    id: 2,
    name: "Cappuccino",
    category: "Coffee",
    price: 150,
    available: true,
  },
  { id: 3, name: "Latte", category: "Coffee", price: 160, available: true },
  {
    id: 4,
    name: "Americano",
    category: "Coffee",
    price: 130,
    available: true,
  },
  {
    id: 5,
    name: "Club Sandwich",
    category: "Food",
    price: 280,
    available: true,
  },
  {
    id: 6,
    name: "Pasta Carbonara",
    category: "Food",
    price: 320,
    available: true,
  },
  {
    id: 7,
    name: "Caesar Salad",
    category: "Food",
    price: 250,
    available: true,
  },
  { id: 8, name: "Burger", category: "Food", price: 300, available: true },
  {
    id: 9,
    name: "Chocolate Cake",
    category: "Dessert",
    price: 180,
    available: true,
  },
  {
    id: 10,
    name: "Cheesecake",
    category: "Dessert",
    price: 200,
    available: true,
  },
  {
    id: 11,
    name: "Ice Cream",
    category: "Dessert",
    price: 120,
    available: true,
  },
];

export const ordersData = [
  {
    id: 1,
    tableNumber: "3",
    customerName: "John Doe",
    items: [
      { name: "Cappuccino", quantity: 2, price: 150 },
      { name: "Club Sandwich", quantity: 1, price: 280 },
    ],
    total: 580,
    status: "preparing",
    time: "10:30 AM",
  },
  {
    id: 2,
    tableNumber: "7",
    customerName: "Sarah Smith",
    items: [
      { name: "Espresso", quantity: 1, price: 120 },
      { name: "Chocolate Cake", quantity: 2, price: 180 },
    ],
    total: 480,
    status: "preparing",
    time: "10:25 AM",
  },
];

export const revenueData = [
  { name: "Sun", date: "2026-04-19", Revenue: 1200 },
  { name: "Mon", date: "2026-04-20", Revenue: 4300 },
  { name: "Tue", date: "2026-04-21", Revenue: 2200 },
  { name: "Wed", date: "2026-04-22", Revenue: 3550 },
  { name: "Thu", date: "2026-04-23", Revenue: 1500 },
  { name: "Fri", date: "2026-04-24", Revenue: 3000 },
  { name: "Sat", date: "2026-04-25", Revenue: 4050 },
];

export const orderData = [
  { name: 'Food', value: 425 },
  { name: 'Desserts', value: 185 },
  { name: 'Coffee', value: 252 },
];

export const COLORS = ['#F59E0B', '#FACC15', '#EAB676'];