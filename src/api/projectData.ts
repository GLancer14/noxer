import connection from ".";
import request from "axios";
import type { ProjectDataDTO } from "../types/ProjectDataDTO";
import type { ErrorResponse } from "../types/ErrorResponse";

export const getProjectData = async (): Promise<ProjectDataDTO | ErrorResponse> => {
  try {
    const projectData = await connection.get("/webapp/api/products/on_main");

    return projectData.data;
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