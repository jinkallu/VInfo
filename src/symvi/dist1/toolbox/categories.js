import { CategoryApi } from '../Api/categoryApi';
import { Category } from './category';
export class Categories {
    constructor() {
        this.categoryApi = new CategoryApi();
        this.categoriesDiv = document.createElement("div");
        this.categoriesDiv.style.width = "100%";
        this.categoriesDiv.style.height = "100%";
    }
    create() {
        this.createCategories();
        return this.categoriesDiv;
    }
    createCategories() {
        let categories_data = CategoryApi.getCategories();
        let flag_first = false;
        for (let category_data of categories_data) {
            let category = new Category(category_data);
            this.categoriesDiv.appendChild(category.create());
            if (!flag_first) {
                flag_first = true;
                category.toggleElements();
            }
        }
    }
}
//# sourceMappingURL=categories.js.map