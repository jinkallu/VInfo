// this is an edit check...
import { ToolBox } from './toolbox/toolbox';
import { MenuBar } from './menubar/menubar';
import { ToolBar } from './toolbar/toolbar';
import { DesignArea } from './dgmeditor/designarea';
//import { Properties } from './properties';
import { IOPanel } from './iopanel/iopanel';
import { Console } from './console'

export class MainUI {
    body: HTMLBodyElement;
    menu_bar: MenuBar;
    tool_bar: ToolBar;
    tool_box: ToolBox;
    design_area: DesignArea;
    //properties: Properties;
    iopanel: IOPanel;
    console: Console;


    constructor(body: HTMLBodyElement) {
        this.body = body;
        
        this.menu_bar = new MenuBar({width: "99%", height: "2rem"});
        this.tool_box = new ToolBox("13%", "18%", "86%");

        
        this.design_area = new DesignArea({"left": "19%", "top": "13%", "width": "62%", "height": "66%"});
        this.console = new Console({'left': "19%", 'top': "80%", 'width': "62%", 'height': "19%"});
        this.tool_bar = new ToolBar({width: "99%", top: "3em", height: "5%"}, this.design_area, this.console); // toolbar after designarea

        this.iopanel = new IOPanel({"left": "82%", "top": "13%", "width" : "17.5%", "height": "86%"});
        let ioc = this.iopanel.getIOControl(); // for output
        this.tool_bar.setIOControl(ioc);
        //this.properties = new Properties();
    }

    createUI() {
        this.createMenuBar();
        this.createToolBar();
        this.createDesignArea();
        this.createProperties();
        this.createToolBox();
        this.creatConsole();
        this.createIOPanel();
    }

    createMenuBar() {
        let menubar_div = this.menu_bar.get();
        this.body.appendChild(menubar_div);
    }

    createToolBar() {
        let toolbar_div = this.tool_bar.get();
        this.body.appendChild(toolbar_div);
    }

    createToolBox() {
        let tool_box_div = this.tool_box.get();
        this.body.appendChild(tool_box_div);
    }

    createDesignArea() {
        let design_area_div = this.design_area.get();        
        this.body.appendChild(design_area_div);
    }

    createIOPanel(){
        let iopanel_div = this.iopanel.get();
        this.body.appendChild(iopanel_div);

        iopanel_div.addEventListener("resize", this.resize);
    }

    createProperties() {
        //let property:Properties=Properties.getInstance();
        //this.body.appendChild(property.create() );



        /*let properties_div = document.createElement("div");
        properties_div.setAttribute('id','properties');
        properties_div.style.position = "absolute";
        properties_div.style.border = "solid black";
        properties_div.style.top = "20%";
        properties_div.style.width = "18%";
        properties_div.style.left = "82%";
        properties_div.style.minHeight = "80%";
        let itemDiv = document.createElement('div');
        itemDiv.setAttribute('id', 'itemName');
        itemDiv.style.margin="5px";
        itemDiv.style.fontSize='12px';
        itemDiv.style.fontWeight="bold";
        itemDiv.style.textAlign='center';
        let propDiv = document.createElement('div');

        propDiv.style.background='lightgrey';
        propDiv.style.minHeight = "40%";
        propDiv.style.width = "90";
        propDiv.style.margin = "3%";
        propDiv.setAttribute('id', 'propDiv');
        propDiv.style.display="flex";
        propDiv.style.flexDirection="column";
        properties_div.appendChild(itemDiv);
        properties_div.appendChild(propDiv);
        this.body.appendChild(properties_div);
        this.properties.create(properties_div);*/
    }

    creatConsole(){
        let console_div = this.console.get();
        this.body.appendChild(console_div);
    }

    resize = (evt:any) => {
        let dw = 10; // hardcoded must change
        this.design_area.setRight(evt.detail.left - dw);
        this.console.setRight(evt.detail.left - dw);
    }
}
