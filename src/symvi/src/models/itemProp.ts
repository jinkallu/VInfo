export class ItemProp {
     private _propVal: string;
     constructor(
          private _catItemId: string,
          private _propId: string,
          private _propName: string,
          private _propType: string,
          private _propDefVal:string,
          private _propOrder: number,
          private _propReqd: boolean,

     ) {
          this._propVal=null;

     }

     get catItemId() {
          return this._catItemId;
     }
     get propId() {
          return this._propId;
     } get propName() {
          return this._propName;
     } get propType() {
          return this._propType;
     } get propOrder() {
          return this._propOrder;
     } get propReqd() {
          return this._propReqd;
     }
     get propDefVal() {
          return this._propDefVal;
     }
     get propVal() {
          return this._propVal;
     }

     set propVal(val: string) {
          this._propVal = val;
     }
}