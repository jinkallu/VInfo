import { ToolBox } from './toolbox.js';
import { MenuBar } from './menubar.js';
import { ToolBar } from './toolbar.js';
import { DesignArea } from './designarea.js';
import { Properties } from './properties.js';
var MainUI = (function () {
    function MainUI(body) {
        this.body = body;
        body.style.width = "100%";
        body.style.height = "100%";
        this.menu_bar = new MenuBar();
        this.tool_bar = new ToolBar();
        this.tool_box = new ToolBox();
        this.design_area = new DesignArea();
        this.properties = new Properties();
    }
    MainUI.prototype.createUI = function () {
        this.createMenuBar();
        this.createToolBar();
        this.createToolBox();
        this.createDesignArea();
        this.createProperties();
    };
    MainUI.prototype.createMenuBar = function () {
        var menuBarDiv = document.createElement("div");
        menuBarDiv.style.position = "absolute";
        menuBarDiv.style.width = "100%";
        menuBarDiv.style.height = "3em";
        menuBarDiv.style.border = "solid black";
        this.body.appendChild(menuBarDiv);
        this.menu_bar.create(menuBarDiv);
    };
    MainUI.prototype.createToolBar = function () {
        var tool_bar_div = document.createElement("div");
        tool_bar_div.style.width = "100%";
        tool_bar_div.style.top = "10%";
        tool_bar_div.style.height = "8%";
        tool_bar_div.style.border = "solid black";
        tool_bar_div.style.position = "absolute";
        tool_bar_div.innerHTML = "Toolbar";
        this.body.appendChild(tool_bar_div);
    };
    MainUI.prototype.createToolBox = function () {
        var tool_box_div = document.createElement("div");
        tool_box_div.style.position = "absolute";
        tool_box_div.style.top = "20%";
        tool_box_div.style.width = "18%";
        tool_box_div.style.height = "80%";
        tool_box_div.style.border = "solid black";
        tool_box_div.innerHTML = "Toolbox";
        this.body.appendChild(tool_box_div);
        this.tool_box.create(tool_box_div);
    };
    MainUI.prototype.createDesignArea = function () {
        var design_area_div = document.createElement("div");
        design_area_div.style.position = "absolute";
        design_area_div.style.border = "solid black";
        design_area_div.style.top = "20%";
        design_area_div.style.width = "60%";
        design_area_div.style.left = "20%";
        design_area_div.style.minHeight = "80%";
        this.body.appendChild(design_area_div);
        this.design_area.create(design_area_div);
    };
    MainUI.prototype.createProperties = function () {
        var properties_div = document.createElement("div");
        properties_div.style.position = "absolute";
        properties_div.style.border = "solid black";
        properties_div.style.top = "20%";
        properties_div.style.width = "18%";
        properties_div.style.left = "82%";
        properties_div.style.minHeight = "80%";
        properties_div.innerHTML = "PropertiesArea";
        this.body.appendChild(properties_div);
    };
    return MainUI;
}());
export { MainUI };
//# sourceMappingURL=mainui.js.map