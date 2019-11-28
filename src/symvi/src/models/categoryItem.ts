export class CategoryItem{
    
     constructor( private  _categoryId: string, private _catItemId: string, private _catItemName: string,
                  private _cateUrl: string, private _inputs:number, private _outputs:number,private  _drag:boolean=false){
     }

     get categoryId(){
          return this._categoryId;
     }

     get categoryName(){
          return this._catItemName;
     }
     get catItemId(){
          return this._catItemId;
     }

     get inputs(){
          return this._inputs;
     }     

     get outputs(){
          return this._outputs;
     }
     get drag(){
          return this._drag;
     }
}