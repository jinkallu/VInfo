import { Menu } from '../models/menu';
export class MenuApi {
     static menus: Menu[]
          = [

               new Menu(
                    "File",
                    ["Open", "Close", "Save"]

               ), new Menu(
                    "Edit",
                    ["Cut", "Paste", "Undu"]

               ), new Menu(
                    "View",
                    ["Toolbox", "next", "next"]),
               new Menu(
                    "Help",
                    ["Help"])

               ];


     static getMenus() {
          return [...this.menus];
     }


}