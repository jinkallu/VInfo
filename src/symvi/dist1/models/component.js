import { CategoryApi } from '../Api/categoryApi';
export class Component {
    constructor(_instanceId, _itemId) {
        this._instanceId = _instanceId;
        this._itemId = _itemId;
        console.log("instance from compoen" + _instanceId);
        let itemPropArr = CategoryApi.getItemPropsByItemId(this._itemId);
        this._itemProps = [...itemPropArr];
        console.log(this._itemProps);
        console.log("printing from compoent");
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
                console.log("value changed..." + val);
            }
        }
    }
}
//# sourceMappingURL=component.js.map