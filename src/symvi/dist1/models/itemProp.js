export class ItemProp {
    constructor(_catItemId, _propId, _propName, _propType, _propDefVal = null, _propOrder, _propReqd) {
        this._catItemId = _catItemId;
        this._propId = _propId;
        this._propName = _propName;
        this._propType = _propType;
        this._propDefVal = _propDefVal;
        this._propOrder = _propOrder;
        this._propReqd = _propReqd;
    }
    get catItemId() {
        return this._catItemId;
    }
    get propId() {
        return this._propId;
    }
    get propName() {
        return this._propName;
    }
    get propType() {
        return this._propType;
    }
    get propDefVal() {
        return this._propDefVal;
    }
    get propOrder() {
        return this._propOrder;
    }
    get propReqd() {
        return this._propReqd;
    }
}
//# sourceMappingURL=itemProp.js.map