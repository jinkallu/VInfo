import { CategoryApi } from './Api/categoryApi.js';
var ToolBox = (function () {
    function ToolBox() {
        this._categories = CategoryApi.getCategories();
        console.log(this._categories);
    }
    ToolBox.prototype.create = function (parentToolBox) {
        console.log('create called');
    };
    return ToolBox;
}());
export { ToolBox };
//# sourceMappingURL=toolbox.js.map