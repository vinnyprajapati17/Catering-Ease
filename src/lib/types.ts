export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageHint: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  user: string;
  date: string;
  status: 'Pending' | 'Confirmed' | 'Delivered' | 'Cancelled';
  total: number;
  items: CartItem[];
};
