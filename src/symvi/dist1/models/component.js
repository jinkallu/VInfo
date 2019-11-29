import { CategoryApi } from '../Api/categoryApi';
export class Component {
    constructor(_instanceId, _itemId) {
        this._instanceId = _instanceId;
        this._itemId = _itemId;
        this._itemProps = CategoryApi.getItemPropsByItemId(this._itemId);
    }
    get instanceId() {
        return this._instanceId;
    }
    get itemId() {
        return this._itemId;
    }
    get itemProps() {
        return this._itemProps;
    }
    addItemPropVal(propId, val) {
        for (let item of this._itemProps) {
            if (item.propId == propId) {
                item.propVal = val;
            }
        }
    }
}
//# sourceMappingURL=component.js.map