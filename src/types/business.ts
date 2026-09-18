import { Category } from './category';

export interface BusinessService {
  id?: string;
  business_id?: string;
  name: string;
  description?: string;
  created_at?: string;
}

export interface BusinessProduct {
  id?: string;
  business_id?: string;
  name: string;
  description?: string;
  price?: number;
  image_url?: string;
  created_at?: string;
}

export interface BusinessImage {
  id?: string;
  business_id?: string;
  image_url: string;
  created_at?: string;
}

export interface Business {
  id: string;
  name: string;
  description?: string;
  category_id?: string;
  category?: Category;
  address?: string;
  city: string;
  latitude?: number;
  longitude?: number;
  phone: string;
  whatsapp?: string;
  opening_hours?: string;
  cover_image?: string;
  created_at?: string;
  updated_at?: string;
  rating?: number;
  rating_count?: number;
  years_in_business?: number;
  verified?: boolean;
  trending?: boolean;
  tagline?: string;
  is_open_now?: boolean;
  services?: BusinessService[];
  products?: BusinessProduct[];
  images?: BusinessImage[];
}

export interface BusinessInput {
  name: string;
  description?: string;
  category_id: string;
  address: string;
  city: string;
  phone: string;
  whatsapp?: string;
  opening_hours?: string;
  services: { name: string; description?: string }[];
  products: { name: string; description?: string; price?: number; image_url?: string }[];
  images: string[];
}
