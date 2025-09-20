export interface SubCategoryMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}


export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}


export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: Category;   
  createdAt: string;
  updatedAt: string;
  detail: string
}

export interface SubCategoryResponse {
  results: number;
  metadata: SubCategoryMetadata;
  data: SubCategory[];
}

export interface Product {
  images : string ,
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  subcategory: SubCategory[];
  createdAt: string;
  updatedAt: string;
}