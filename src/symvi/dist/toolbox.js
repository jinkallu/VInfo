import { CategoryApi } from './Api/categoryApi.js';
export class ToolBox {
    constructor() {
        this._categories = CategoryApi.getCategories();
        console.log(this._categories);
    }
    create(parentToolBox) {
        console.log('create called');
    }
}
