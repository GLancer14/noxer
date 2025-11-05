import connection from ".";
import request from "axios";

export const getProjectData = async () => {
  try {
    return await connection.get("/webapp/api/products/on_main");
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