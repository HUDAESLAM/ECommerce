export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt : string;
}

export interface BrandResponse {
  data: Brand;
  status: string;  
}