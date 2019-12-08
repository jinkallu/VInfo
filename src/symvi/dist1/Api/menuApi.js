import { Menu } from '../models/menu';
export class MenuApi {
    static getMenus() {
        return [...this.menus];
    }
}
MenuApi.menus = [
    new Menu("File", ["Open", "close", "save"]), new Menu("Edit", ["Cut", "Paste", "Undu"]), new Menu("View", ["Toolbox", "next", "next"]),
    new Menu("Help", ["Help"])
];
//# sourceMappingURL=menuApi.js.map