  export class Category {

     constructor(private _categoryId: string,
           private _categoryName: string, 
           private _categoryOrder: number,
            private _categoryImgUrl: string) 
            {

     }

    get categoryName(){
      return this._categoryName;
    }
    get categoryId(){
      return this._categoryId;
    }
    get categoryImgURL(){
      return this._categoryImgUrl;
    }
   
}