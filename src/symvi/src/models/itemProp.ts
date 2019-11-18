export class ItemProp {
     constructor(
          private _catItemId: string, 
          private _propId: string,
          private _propName: string,
          private _propType: string,
          private _propDefVal: string=null,
          private _propOrder: number,
          private _propReqd: boolean

     ) {

     }

     get catItemId(){
          return this._catItemId;
     }
     get propId(){
          return this._propId;
     }get propName(){
          return this._propName;
     }get propType(){
          return this._propType;
     }get propDefVal(){
          return this._propDefVal;
     }get propOrder(){
          return this._propOrder;
     }get propReqd(){
          return this._propReqd;
     }
}