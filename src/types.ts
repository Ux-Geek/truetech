export interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: string;
  badge?: string;
  category: 'Laptops' | 'Phones' | 'Audio' | 'Gaming' | 'Wearables' | 'Accessories';
  description?: string;
  features?: string[];
  inStock?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CategoryItem {
  name: 'Laptops' | 'Phones' | 'Audio' | 'Gaming' | 'Wearables' | 'Accessories';
  icon: string;
  itemCount: number;
}
