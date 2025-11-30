import { Product, Order } from "@/lib/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id) || PlaceHolderImages[0];

export const mockProducts: Product[] = [
  {
    id: "prod_001",
    name: "Artisan Cheese Board",
    description: "A selection of fine cheeses, fruits, nuts, and crackers.",
    price: 75.0,
    image: getImage('cheese-board').imageUrl,
    imageHint: getImage('cheese-board').imageHint,
  },
  {
    id: "prod_002",
    name: "Gourmet Sliders",
    description: "Miniature burgers with premium beef and gourmet toppings.",
    price: 55.0,
    image: getImage('appetizers').imageUrl,
    imageHint: getImage('appetizers').imageHint,
  },
  {
    id: "prod_003",
    name: "Roasted Salmon Fillet",
    description: "Perfectly roasted salmon with a lemon-dill sauce.",
    price: 120.0,
    image: getImage('main-course').imageUrl,
    imageHint: getImage('main-course').imageHint,
  },
  {
    id: "prod_004",
    name: "Decadent Chocolate Cake",
    description: "A rich, multi-layered chocolate cake for the perfect finish.",
    price: 60.0,
    image: getImage('desserts').imageUrl,
    imageHint: getImage('desserts').imageHint,
  },
  {
    id: "prod_005",
    name: "Seasonal Fruit Platter",
    description: "An assortment of the freshest seasonal fruits.",
    price: 45.0,
    image: getImage('fruit-platter').imageUrl,
    imageHint: getImage('fruit-platter').imageHint,
  },
  {
    id: "prod_006",
    name: "Caprese Skewers",
    description: "Cherry tomatoes, mozzarella, and basil drizzled with balsamic glaze.",
    price: 40.0,
    image: "https://picsum.photos/seed/9/400/300",
    imageHint: "caprese skewers",
  },
  {
    id: "prod_007",
    name: "Chicken Satay",
    description: "Grilled chicken skewers with a spicy peanut sauce.",
    price: 65.0,
    image: "https://picsum.photos/seed/10/400/300",
    imageHint: "chicken satay"
  },
  {
    id: "prod_008",
    name: "Fresh Garden Salad",
    description: "Mixed greens, seasonal vegetables, and a light vinaigrette.",
    price: 35.0,
    image: getImage('salad-bowl').imageUrl,
    imageHint: getImage('salad-bowl').imageHint,
  },
];

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    user: "John Doe",
    date: "2023-10-26",
    status: "Delivered",
    total: 130.0,
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[4], quantity: 1 },
    ],
  },
  {
    id: "ORD-002",
    user: "Jane Smith",
    date: "2023-10-28",
    status: "Confirmed",
    total: 180.0,
    items: [
        { product: mockProducts[2], quantity: 1 },
        { product: mockProducts[3], quantity: 1 },
    ],
  },
  {
    id: "ORD-003",
    user: "Peter Jones",
    date: "2023-10-29",
    status: "Pending",
    total: 100.0,
    items: [
        { product: mockProducts[1], quantity: 1 },
        { product: mockProducts[7], quantity: 1 },
    ],
  },
];

export const mockCart = [
    { product: mockProducts[1], quantity: 2 },
    { product: mockProducts[3], quantity: 1 },
];
