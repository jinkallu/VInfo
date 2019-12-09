export class ItemProp {
    constructor(_catItemId, _propId, _propName, _propType, _propSpec, _propDefVal, _propOrder, _propReqd) {
        this._catItemId = _catItemId;
        this._propId = _propId;
        this._propName = _propName;
        this._propType = _propType;
        this._propSpec = _propSpec;
        this._propDefVal = _propDefVal;
        this._propOrder = _propOrder;
        this._propReqd = _propReqd;
        this._propVal = null;
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
    get propOrder() {
        return this._propOrder;
    }
    get propReqd() {
        return this._propReqd;
    }
    get propDefVal() {
        return this._propDefVal;
    }
    get propVal() {
        return this._propVal;
    }
    get propSpec() {
        return this._propSpec;
    }
    set propVal(val) {
        this._propVal = val;
    }
}
//# sourceMappingURL=itemProp.js.map