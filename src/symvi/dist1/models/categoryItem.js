export class CategoryItem {
    constructor(_categoryId, _catItemId, _catItemName, _cateUrl, _inputs, _outputs) {
        this._categoryId = _categoryId;
        this._catItemId = _catItemId;
        this._catItemName = _catItemName;
        this._cateUrl = _cateUrl;
        this._inputs = _inputs;
        this._outputs = _outputs;
        this.drag = false;
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
    get inputs() {
        return this._inputs;
    }
    get outputs() {
        return this._outputs;
    }
}
//# sourceMappingURL=categoryItem.js.map