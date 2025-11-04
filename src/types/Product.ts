import type ProductImage from "./ProductImage";

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