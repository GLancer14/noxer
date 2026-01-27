import type Category from "./Category";
import type { Pagination } from "./Pagination";
import type Product from "./Product";

export interface ProjectDataDTO {
  categories: Category[];
  id_mark_for_sale: number;
  pagination: Pagination;
  products: Product[];
  special_project_parameters: {
    [key: string]: string;
  };
  special_project_parameters_actions: {
    action_type: string;
    description: string;
    extra_field_1: string;
    extra_field_2: string;
    id: number;
    image_url: string;
    sort_order: number;
    url: string | null;
  };
  special_project_parameters_badges: {
    description: string;
    extra_json: {
        isActive: boolean;
    } | null,
    id: number;
    image_url: string;
    meaning_tag: string | null;
    sort_order: number;
    url: string;
  };
  special_project_parameters_json: any;
  status: "ok";
}
