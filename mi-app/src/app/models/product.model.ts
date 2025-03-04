export interface Product {
  id: number;
  name: string;
  category_id: number;
  category: string;
  brand: string;
  price: string;
  old_price: string;
  discount: string;
  stock: number;
  image: string;
  description: string;
  screen_size: string;
  screen_resolution: string;
  ram: string;
  processor: string;
  os: string;
  battery: string;
  waterproof: string;
  release_date: string;
  rating: number;
  styles: string;
  colors: Color[];
  connectivities: Connectivity[];
  storages: Storage[];
  accessories: Accessory[];
  reviews: Review[];
}

export interface Color {
  color: string;
}

export interface Connectivity {
  type: string;
}

export interface Storage {
  capacity: string;
}

export interface Accessory {
  name: string;
}

export interface Review {
  user: string;
  comment: string;
  rating: number;
}