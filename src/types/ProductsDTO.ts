import type { Pagination } from "./Pagination";
import type Product from "./Product";

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