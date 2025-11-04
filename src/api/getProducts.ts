import connection from ".";
import request from "axios";

export const getProducts = async (perPage: number, page: number) => {
  try {
    return await connection.post("https://noxer-test.ru/webapp/api/products/filter", 
      {},
      {
        params: {
          per_page: perPage,
          page,
        },
    });

    // console.log(import.meta.env.VITE_POST_REQUEST)
    // return await connection.get(import.meta.env.VITE_POST_REQUEST, 
    //   {},
    // );
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