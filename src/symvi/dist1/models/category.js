export class Category {
    constructor(_categoryId, _categoryName, _categoryOrder, _categoryImgUrl) {
        this._categoryId = _categoryId;
        this._categoryName = _categoryName;
        this._categoryOrder = _categoryOrder;
        this._categoryImgUrl = _categoryImgUrl;
    }
    get categoryName() {
        return this._categoryName;
    }
    get categoryId() {
        return this._categoryId;
    }
}
//# sourceMappingURL=category.js.map