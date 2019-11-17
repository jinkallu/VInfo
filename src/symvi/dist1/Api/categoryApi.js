var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Category } from '../models/category.js';
var CategoryApi = (function () {
    function CategoryApi() {
    }
    CategoryApi.getCategories = function () {
        return __spreadArrays(this.categories);
    };
    CategoryApi.categories = [new Category('c1', 'Category1', 1, 'url'),
        new Category('c2', 'Category3', 2, 'url'),
        new Category('c3', 'Category3', 2, 'url')];
    return CategoryApi;
}());
export { CategoryApi };
//# sourceMappingURL=categoryApi.js.map