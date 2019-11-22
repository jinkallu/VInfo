export class CategoryItem{
     drag:boolean;
     constructor( private  _categoryId: string, private _catItemId: string, private _catItemName: string,private _cateUrl: string){
          this.drag = false;
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

     
}