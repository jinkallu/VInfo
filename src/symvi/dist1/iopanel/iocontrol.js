import { IOButton } from './iobutton';
import { InputPanel } from './inputpanel';
import { OutputPanel } from './outputpanel';
export class IOControl {
    constructor() {
        this.showInput = () => {
            this.output_panel_div.style.display = "none";
            this.input_panel_div.style.display = "block";
            this.io_button_input.get().style.background = "#DCDCDC";
            this.io_button_output.get().style.background = "#E8E8E8";
        };
        this.showOutput = () => {
            this.input_panel_div.style.display = "none";
            this.output_panel_div.style.display = "block";
            this.io_button_output.get().style.background = "#DCDCDC";
            this.io_button_input.get().style.background = "#E8E8E8";
        };
        this.iocontrol_div = document.createElement("div");
        this.iocontrol_div.style.width = "100%";
        this.iocontrol_div.style.height = "100%";
        this.io_button_input = new IOButton("Input");
        this.io_button_output = new IOButton("Output");
        let io_button_input_div = this.io_button_input.get();
        this.iocontrol_div.appendChild(io_button_input_div);
        io_button_input_div.addEventListener("click", this.showInput);
        let io_button_output_div = this.io_button_output.get();
        this.iocontrol_div.appendChild(io_button_output_div);
        io_button_output_div.addEventListener("click", this.showOutput);
        this.input_panel = new InputPanel();
        this.input_panel_div = this.input_panel.get();
        this.iocontrol_div.appendChild(this.input_panel_div);
        this.output_panel = new OutputPanel();
        this.output_panel_div = this.output_panel.get();
        this.iocontrol_div.appendChild(this.output_panel_div);
        this.showInput();
    }
    get() {
        return this.iocontrol_div;
    }
    getIoButtonOutput() {
        return this.io_button_output;
    }
    getOuputPanel() {
        return this.output_panel_div;
    }
}
//# sourceMappingURL=iocontrol.js.map