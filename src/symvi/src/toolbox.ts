import { Category }  from './models/category.js';
import { CategoryApi } from './Api/categoryApi.js';
 export class ToolBox{

     private _categories: Category[];

     constructor(){
         this._categories=CategoryApi.getCategories();
          console.log(this._categories);
     }     

     create (parentToolBox: HTMLDivElement){
          console.log('create called');
     }
    
}
