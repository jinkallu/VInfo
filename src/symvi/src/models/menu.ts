export class Menu{
     constructor(private _menuId:string, private _menuItems: string[]){

     }

     get menuId(){
          return this._menuId;
     }

     get menuItems(){
          return this._menuItems;
     }
}