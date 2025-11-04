import type CategoryImage from "./CategoryImage";

export default interface Category {
  Category_ID: number;
  Category_Image: string;
  Category_Name: string;
  category_images: CategoryImage[] | null;
  parent_category_id: number | null;
  sort_order: number;
}