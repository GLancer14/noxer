import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ProjectDataDTO } from "../../types/ProjectDataDTO";

const initialState: ProjectDataDTO = {
  categories: [],
  id_mark_for_sale: 0,
  pagination: {
    current_page: 1,
    has_next: false,
    has_prev: false,
    per_page: 1,
    total_pages: 1,
    total_products: 1,
  },
  products: [],
  special_project_parameters: {},
  special_project_parameters_actions: {
    action_type: "",
    description: "",
    extra_field_1: "",
    extra_field_2: "",
    id: 0,
    image_url: "",
    sort_order: 0,
    url: "",
  },
  special_project_parameters_badges: {
    description: "",
    extra_json: null,
    id: 0,
    image_url: "",
    meaning_tag: null,
    sort_order: 0,
    url: "",
  },
  special_project_parameters_json: {},
  status: "ok",
};

export const projectDataSlice = createSlice({
  name: "projectData",
  initialState,
  reducers: {
    setProjectData: (_, action: PayloadAction<ProjectDataDTO>) => {
      return action.payload;
    },
  }
});

export const { setProjectData } = projectDataSlice.actions;
export default projectDataSlice.reducer;