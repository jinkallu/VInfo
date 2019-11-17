import { Category } from '../models/category.js';
export class CategoryApi {
    static getCategories() {
        return [...this.categories];
    }
}
CategoryApi.categories = [new Category('c1', 'Category1', 1, 'url'),
    new Category('c2', 'Category3', 2, 'url'),
    new Category('c3', 'Category3', 2, 'url')];
//# sourceMappingURL=categoryApi.js.map