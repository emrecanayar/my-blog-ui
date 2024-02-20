import { CategoryListModel } from "./../../services/category/dtos/categoryListModel";
import { action, observable } from "mobx";
import { PageRequest } from "../../services/base/models/PageRequest";
import { DynamicQuery } from "../../services/base/models/DynamicQuery";
import categoryService from "../../services/category/categoryService";

export class CategoryStore {
  @observable categoriesListByDynamic: CategoryListModel =
    {} as CategoryListModel;

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
    } catch (error) {}
  };
}
const categoryStore = new CategoryStore();
export default categoryStore;
