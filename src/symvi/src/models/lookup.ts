export class Lookup{
    constructor(private _propId:string,private _lookupId:string,private _lookupVal:string){

    }

    get propId(){
        return this._propId;
    }
    
    get lookupId(){
        return this._lookupId;
    }
    get lookupVal(){
        return this._lookupVal;
    }
}