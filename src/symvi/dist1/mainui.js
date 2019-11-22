import { ToolBox } from './toolbox/toolbox';
import { MenuBar } from './menubar';
import { ToolBar } from './toolbar';
import { DesignArea } from './designarea';
import { Properties } from './properties';
import { Console } from './console';
export class MainUI {
    constructor(body) {
        this.body = body;
        body.style.width = "100%";
        body.style.height = "100%";
        this.menu_bar = new MenuBar();
        this.tool_bar = new ToolBar();
        this.tool_box = new ToolBox();
        this.design_area = new DesignArea();
        this.properties = new Properties();
        this.console = new Console();
    }
    createUI() {
        this.createMenuBar();
        this.createToolBar();
        this.createDesignArea();
        this.createProperties();
        this.createToolBox();
        this.creatConsole();
    }
    createMenuBar() {
        let menuBarDiv = document.createElement("div");
        menuBarDiv.style.position = "absolute";
        menuBarDiv.style.width = "100%";
        menuBarDiv.style.height = "3em";
        menuBarDiv.style.border = "solid black";
        menuBarDiv.setAttribute('id', 'menubar');
        this.body.appendChild(menuBarDiv);
        this.menu_bar.create(menuBarDiv);
    }
    createToolBar() {
        let tool_bar_div = document.createElement("div");
        tool_bar_div.style.width = "100%";
        tool_bar_div.style.top = "10%";
        tool_bar_div.style.height = "8%";
        tool_bar_div.style.border = "solid black";
        tool_bar_div.style.position = "absolute";
        tool_bar_div.innerHTML = "Toolbar";
        this.body.appendChild(tool_bar_div);
    }
    createToolBox() {
        let tool_box_div = document.createElement("div");
        tool_box_div.style.position = "absolute";
        tool_box_div.style.top = "20%";
        tool_box_div.style.width = "18%";
        tool_box_div.style.height = "80%";
        tool_box_div.style.border = "solid black";
        tool_box_div.innerHTML = "ToolboxN";
        this.body.appendChild(tool_box_div);
        this.tool_box.create(tool_box_div);
    }
    createDesignArea() {
        let design_area_div = document.createElement("div");
        design_area_div.style.position = "absolute";
        design_area_div.style.border = "solid black";
        design_area_div.style.top = "20%";
        design_area_div.style.width = "60%";
        design_area_div.style.left = "20%";
        design_area_div.style.height = "60%";
        design_area_div.setAttribute('id', 'designArea');
        this.body.appendChild(design_area_div);
        this.design_area.create(design_area_div);
    }
    createProperties() {
        let properties_div = document.createElement("div");
        properties_div.setAttribute('id', 'properties');
        properties_div.style.position = "absolute";
        properties_div.style.border = "solid black";
        properties_div.style.top = "20%";
        properties_div.style.width = "18%";
        properties_div.style.left = "82%";
        properties_div.style.minHeight = "80%";
        properties_div.innerHTML = "PropertiesArea";
        let itemDiv = document.createElement('div');
        itemDiv.setAttribute('id', 'itemName');
        itemDiv.style.margin = "5px";
        itemDiv.style.fontSize = '12px';
        itemDiv.style.fontWeight = "bold";
        itemDiv.style.textAlign = 'center';
        let propDiv = document.createElement('div');
        propDiv.style.background = 'lightgrey';
        propDiv.style.minHeight = "40%";
        propDiv.style.width = "90";
        propDiv.style.margin = "3%";
        propDiv.setAttribute('id', 'propDiv');
        propDiv.style.display = "flex";
        propDiv.style.flexDirection = "column";
        properties_div.appendChild(itemDiv);
        properties_div.appendChild(propDiv);
        this.body.appendChild(properties_div);
        this.properties.create(properties_div);
    }
    creatConsole() {
        let console_div = document.createElement("div");
        console_div.style.position = "absolute";
        console_div.style.border = "solid black";
        console_div.style.top = "81%";
        console_div.style.width = "60%";
        console_div.style.left = "20%";
        console_div.style.height = "19%";
        console_div.setAttribute('id', 'console');
        console_div.innerHTML = "Console";
        this.body.appendChild(console_div);
    }
}
//# sourceMappingURL=mainui.js.map