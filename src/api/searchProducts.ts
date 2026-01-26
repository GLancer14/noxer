import connection from ".";
import request from "axios";
import type { ProductsDTO } from "../types/Product";
import type { ErrorResponse } from "../types/ErrorResponse";

export interface ProductsSearchParams {
  page: number;
  perPage: number;
  searchValue: string | null;
}

export const searchProducts = async (searchParams: ProductsSearchParams): Promise<ProductsDTO | ErrorResponse> => {
  try {
    const products = await connection.post("/webapp/api/products/filter", 
      { search: searchParams.searchValue },
      {
        params: {
          per_page: searchParams.perPage,
          page: searchParams.page,
        }
      },
    );
    return products.data;
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response?.status === 404) {
        return { message: "not found", status: "error" };
      } else if (e.response?.status === 403) {
        return { message: "forbidden", status: "error" };
      }
    }

    return { message: "error", status: "error" };
  }
};