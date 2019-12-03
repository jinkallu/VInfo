import { ToolBox } from './toolbox/toolbox';
import { MenuBar } from './menubar/menubar';
import { ToolBar } from './toolbar/toolbar';
import { DesignArea } from './dgmeditor/designarea';
import { IOPanel } from './iopanel/iopanel';
import { Console } from './console';
export class MainUI {
    constructor(body) {
        this.resize = (evt) => {
            let dw = 10;
            this.design_area.setRight(evt.detail.left - dw);
            this.console.setRight(evt.detail.left - dw);
        };
        this.body = body;
        this.menu_bar = new MenuBar({ width: "99%", height: "2rem" });
        this.tool_box = new ToolBox("13%", "18%", "86%");
        this.design_area = new DesignArea({ "left": "19%", "top": "13%", "width": "62%", "height": "66%" });
        this.console = new Console({ 'left': "19%", 'top': "80%", 'width': "62%", 'height': "19%" });
        this.iopanel = new IOPanel({ "left": "82%", "top": "13%", "width": "17.5%", "height": "86%" });
        this.ioc = this.iopanel.getIOControl();
        this.tool_bar = new ToolBar({ width: "99%", top: "3em", height: "5%" }, this.design_area, this.console);
        console.log(body.getBoundingClientRect().width, body.getBoundingClientRect().height * 0.86);
        this.tool_bar.setIOControl(this.ioc);
    }
    createUI() {
        this.createMenuBar();
        this.createDesignArea();
        this.createProperties();
        this.createToolBox();
        this.creatConsole();
        this.createIOPanel();
        this.createToolBar();
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
    createIOPanel() {
        let iopanel_div = this.iopanel.get();
        this.body.appendChild(iopanel_div);
        iopanel_div.addEventListener("resize", this.resize);
    }
    createProperties() {
    }
    creatConsole() {
        let console_div = this.console.get();
        this.body.appendChild(console_div);
    }
}
//# sourceMappingURL=mainui.js.map