import { IOButton } from './iobutton';
import { InputPanel } from './inputpanel';
import { OutputPanel } from './outputpanel';

export class IOControl{
    iocontrol_div: HTMLDivElement;

    io_button_input:IOButton;
    io_button_output:IOButton;

    input_panel: InputPanel;
    output_panel: OutputPanel;

    input_panel_div: HTMLDivElement;
    output_panel_div: HTMLDivElement;

    constructor(){
        this.iocontrol_div = document.createElement("div");

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
        //this.output_panel_div.style.display = "none";
        this.iocontrol_div.appendChild(this.output_panel_div);

        this.showInput();
    }

    get(){
        return this.iocontrol_div;
    }

    showInput = () => {
        this.output_panel_div.style.display = "none";
        this.input_panel_div.style.display = "block";
        this.io_button_input.get().style.background = "#DCDCDC";
        this.io_button_output.get().style.background = "#E8E8E8";
    }

    showOutput = () => {
        this.input_panel_div.style.display = "none";
        this.output_panel_div.style.display = "block";
        this.io_button_output.get().style.background = "#DCDCDC";
        this.io_button_input.get().style.background = "#E8E8E8";
    }

    getIoButtonOutput(){
        return this.io_button_output;
    }

    getOuputPanel(){
        return this.output_panel_div;
    }
}