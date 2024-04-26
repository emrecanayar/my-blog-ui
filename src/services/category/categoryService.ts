import { PageRequest } from "./../base/models/PageRequest";
import apiService from "../base/apiService";
import { CustomResponseDto } from "../base/models/CustomResponseDto";
import { CategoryListModel } from "./dtos/categoryListModel";
import { DynamicQuery } from "../base/models/DynamicQuery";
import { GetByIdCategoryResponse } from "./dtos/getByIdCategoryResponse";

export class CategoryService {
  getCategoriesListByDynamic = async (
    pageRequest: PageRequest,
    dynamicQuery: DynamicQuery
  ): Promise<CustomResponseDto<CategoryListModel>> => {
    try {
      const response = await apiService.postWithQuery(
        "/Categories/GetListByDynamic",
        pageRequest,
        dynamicQuery
      );
      return response;
    } catch (error) {
      console.log("Categories yüklenirken bir hata oluştu", error);
      throw error;
    }
  };

  getById = async (
    id: string
  ): Promise<CustomResponseDto<GetByIdCategoryResponse>> => {
    try {
      let response = await apiService.get(`/Categories/${id}`);
      return response;
    } catch (error) {
      console.log("Kategori detayı yüklenirken bir hata oluştu", error);
      throw error;
    }
  };
}
const categoryService = new CategoryService();
export default categoryService;
