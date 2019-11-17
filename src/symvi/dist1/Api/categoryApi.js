import { Category } from '../models/category.js';
import { CategoryItem } from '../models/categoryItem.js';
export class CategoryApi {
    static getCategories() {
        return [...this.categories];
    }
    static getCategoryItemsByCatId(categoryId) {
        return [...this.categoryItems.filter(i => {
                return i.categoryId === categoryId;
            })];
    }
}
CategoryApi.categories = [new Category('c1', 'Category1', 1, 'url'),
    new Category('c2', 'Category3', 2, 'url'),
    new Category('c3', 'Category3', 2, 'url')];
CategoryApi.categoryItems = [
    new CategoryItem('c1', 'i1', 'item1', 'url'),
    new CategoryItem('c1', 'i2', 'item2', 'url'),
    new CategoryItem('c1', 'i3', 'item3', 'url'),
    new CategoryItem('c1', 'i4', 'item4', 'url'),
    new CategoryItem('c1', 'i5', 'item5', 'url'),
    new CategoryItem('c1', 'i6', 'item6', 'url'),
    new CategoryItem('c1', 'i7', 'item7', 'url'),
    new CategoryItem('c3', 'i1', 'item1', 'url'),
];
//# sourceMappingURL=categoryApi.js.map