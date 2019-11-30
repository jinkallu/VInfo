import { CategoryApi } from '../Api/categoryApi';
import { ItemProp } from './itemProp';
export class Component {
    private _itemProps: ItemProp[];


    constructor(private _instanceId: number, private _itemId: string) {
        console.log("instance from compoen"+_instanceId);
        let itemPropArr=CategoryApi.getItemPropsByItemId(this._itemId);
        this._itemProps =itemPropArr;
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

    addItemPropVal(propId: string, val: string) {

        for (let item of this._itemProps) {
            if (item.propId == propId) {
                item.propVal = val;
                console.log("value changed..."+val);
            }

        }
        // let index = this.itemProps.findIndex(i => {
        //     //     i.propId === propId;
        //     // });
        //     // this._itemProps[index].propVal = val;
    }
}