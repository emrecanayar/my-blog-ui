import { CategoryListModel } from "./../../services/category/dtos/categoryListModel";
import { action, observable } from "mobx";
import { PageRequest } from "../../services/base/models/PageRequest";
import { DynamicQuery } from "../../services/base/models/DynamicQuery";
import categoryService from "../../services/category/categoryService";
import { BaseStore } from "../base/baseStore";
import { GetByIdCategoryResponse } from "../../services/category/dtos/getByIdCategoryResponse";

export class CategoryStore extends BaseStore {
  @observable categoriesListByDynamic: CategoryListModel =
    {} as CategoryListModel;

  @observable categoryDetail: GetByIdCategoryResponse =
    {} as GetByIdCategoryResponse;
  @action
  getCategoriesListByDynamic = async (
    pageRequest: PageRequest,
    dynamicQuery: DynamicQuery
  ) => {
    try {
      let result = await categoryService.getCategoriesListByDynamic(
        pageRequest,
        dynamicQuery
      );
      this.categoriesListByDynamic = result.data;
      return result.data;
    } catch (error: any) {
      this.handleApiError(error);
      throw error;
    }
  };

  @action
  getById = async (id: string) => {
    try {
      let result = await categoryService.getById(id);
      this.categoryDetail = result.data;
      return result.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  };
}
const categoryStore = new CategoryStore();
export default categoryStore;
