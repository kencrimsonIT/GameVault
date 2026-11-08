export type CartItem = {
  id: number;
  title: string;
  developer: string;
  cover: string;
  price: number;
  originalPrice: number;
};

export type CartState = {
  items: CartItem[];
};
