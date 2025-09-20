import { Brand } from "./brand";
import { Category, SubCategory } from "./category";

export interface product {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  sold: number;
  ratingsAverage: number;
  ratingsQuantity: number;
  imageCover: string;
  images: string[];
  subcategory: SubCategory[]; 
  category: Category;
  brand: Brand;
  createdAt: string; 
  updatedAt: string; 
}