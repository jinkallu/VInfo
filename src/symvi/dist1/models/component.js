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
        let index = this.itemProps.findIndex(i => {
            i.propId === propId;
        });
        this._itemProps[index].propVal = val;
    }
}
//# sourceMappingURL=component.js.map