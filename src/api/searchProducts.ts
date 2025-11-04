import connection from ".";
import request from "axios";

export const searchProducts = async (searchValue: string, perPage: number = 20, page: number = 1) => {
  try {
    return await connection.post("https://noxer-test.ru/webapp/api/products/filter", 
      { search: searchValue },
      {
        params: {
          per_page: perPage,
          page,
        }
      },
    );
  } catch(e) {
    if (request.isAxiosError(e)) {
      if (e.response?.status === 404) {
        return { status: "not found" };
      } else if (e.response?.status === 403) {
        return { status: "forbidden" };
      }
    }

    console.log(e)
    return { status: "error" };
  }
};