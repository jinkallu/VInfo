import { CategoryApi } from '../Api/categoryApi';
import { ItemProp } from './itemProp';
export class Component {
    private _itemProps: ItemProp[];


    constructor(private _instanceId: number, private _itemId: string) {
        this._itemProps = CategoryApi.getItemPropsByItemId(this._itemId);

    }
    get instanceId() {
        return this._instanceId;
    }

    get itemId() {
        return this._itemId;
    }

    get itemProps(){
        return this._itemProps;
    }

    addItemPropVal(propId: string, val: string) {
        let index = this.itemProps.findIndex(i => {
            i.propId === propId;
        });
        this._itemProps[index].propVal = val;
    }
}