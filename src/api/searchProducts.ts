import connection from ".";
import request from "axios";

export const searchProducts = async (searchValue: string, perPage: number = 20, page: number = 1) => {
  try {
    const products = await connection.post("/webapp/api/products/filter", 
      { search: searchValue },
      {
        params: {
          per_page: perPage,
          page,
        }
      },
    );
    return { ...products, status: "ok" };
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response?.status === 404) {
        return { status: "not found" };
      } else if (e.response?.status === 403) {
        return { status: "forbidden" };
      }
    }

    return { status: "error" };
  }
};