import { Menu } from '../models/menu.js';
export class MenuApi {
     static menus: Menu[]
          = [

               new Menu(
                    "File",
                    ["Open", "close", "save"]

               ), new Menu(
                    "Edit",
                    ["Cut", "Paste", "Undu"]

               ), new Menu(
                    "View",
                    ["Toolbox", "next", "next"]

               )];


     static getMenus() {
          return [...this.menus];
     }


}