import type { Pagination } from "./Pagination";

export interface ProductImage {
  Image_ID: number;
  Image_URL: string;
  MainImage: boolean;
  Product_ID: 799;
  position: string;
  sort_order: 1;
  title: string;
}

export default interface Product {
  id: number;
  images: ProductImage[];
  marks: Array<{
    Mark_Name: string;
    color_code: string;
  }>;
  name: string;
  old_price: number | null;
  price: number;
}

export interface ProductsDTO {
  filters: {
    category_ids: number | null;
    color_ids: number | null;
    in_stock: number | null;
    mark_ids: number | null;
    price: number | null;
    search: string | null;
    sort_by: string;
    sort_desc: boolean;
    specifications: string | null;
  };
  pagination: Pagination;
  products: Product[];
  status: "ok";
  total: number;
}