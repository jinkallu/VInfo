export class CategoryItem {
    constructor(_categoryId, _catItemId, _catItemName, _cateUrl) {
        this._categoryId = _categoryId;
        this._catItemId = _catItemId;
        this._catItemName = _catItemName;
        this._cateUrl = _cateUrl;
    }
    get categoryId() {
        return this._categoryId;
    }
    get categoryName() {
        return this._catItemName;
    }
    get catItemId() {
        return this._catItemId;
    }
}
//# sourceMappingURL=categoryItem.js.map