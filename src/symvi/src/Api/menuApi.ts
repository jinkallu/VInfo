import { Menu } from '../models/menu';
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
                    ["Toolbox", "next", "next"]),
                    new Menu(
                         "Window",
                         ["Item1", "Item2", "Item3"])

               ];


     static getMenus() {
          return [...this.menus];
     }


}