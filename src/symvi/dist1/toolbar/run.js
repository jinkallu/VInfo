import JSROOT from 'JSROOT';
import { DesignApi } from '../Api/designApi';
import { BasicThree } from '../threejsanim/basicthree';
export class Run {
    constructor(_design_area, _console) {
        this.execute = () => {
            let edges = this.createEdgesData();
            let blocks = this.createBlocksData();
            if (blocks === null) {
                let console_data = this.console_area.get().innerHTML;
                console_data += "<br><font color='red'>No blocks to run </font>";
                this.console_area.get().innerHTML = console_data;
                return;
            }
            this.submit({ edges: edges,
                blocks: blocks });
        };
        this.outputResize = (evt) => {
            console.log("resizing");
        };
        this.design_area = _design_area;
        this.console_area = _console;
        this.run_div = document.createElement("div");
        this.run_div.innerHTML = 'Run';
        this.run_div.style.background = 'red';
        this.run_div.style.color = 'white';
        this.run_div.style.display = 'inline-block';
        this.run_div.addEventListener("click", this.execute);
    }
    get() {
        return this.run_div;
    }
    createEdgesData() {
        let edges = this.design_area.getEdges().getEdges();
        if (edges.length < 1) {
            return null;
        }
        let edge;
        let edges_data = [];
        for (edge of edges) {
            let data = edge.getData();
            let edge_data = {
                id: data.id,
                type: data.type,
                src_blk_id: data.src_blk_id,
                src_node_id: data.src_node_id,
                tgt_blk_id: data.tgt_blk_id,
                tgt_node_id: data.tgt_node_id
            };
            edges_data.push(edge_data);
            console.log(data.id + ' ' +
                data.type + ' ' +
                data.src_blk_id + ' ' +
                data.src_node_id + ' ' +
                data.tgt_blk_id + ' ' +
                data.tgt_node_id);
        }
        console.log(edges_data);
        return edges_data;
    }
    createBlocksData() {
        let blocks = this.design_area.getBlocks();
        if (blocks.length < 1) {
            return null;
        }
        let blocks_data = [];
        let block;
        for (block of blocks) {
            let data = block.getData();
            let properties = this.createPropertiesData(data.id);
            let block_data = {
                id: data.id,
                type: data.type,
                name: data.name,
                inputs: data.inputs,
                outputs: data.outputs,
                properties: properties
            };
            blocks_data.push(block_data);
            console.log(data.id + " " +
                data.type + " " +
                data.name + " " +
                data.inputs + " " +
                data.outputs);
        }
        console.log(blocks_data);
        return blocks_data;
    }
    createPropertiesData(id) {
        let properties = DesignApi.getComponentByInstId(id);
        let prop_data = {};
        for (let prop of properties.itemProps) {
            let key = prop.propName;
            prop_data[key] = prop.propVal;
        }
        return prop_data;
    }
    async submit(send_data) {
        console.log("Send data ", send_data);
        let response = await fetch('http://127.0.0.1:5000/api/calc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(send_data)
        });
        let msg;
        let data = await response.json();
        if (data['output'] !== null) {
            let data_draw = data['output'][0]['data'];
            if (this.iocontrol !== null) {
                this.iocontrol.getIoButtonOutput().emulateClick();
                let output_panel = this.iocontrol.getOuputPanel();
                output_panel.innerHTML = "";
                if (data_draw['data_type'] === "Sim") {
                    let rect = output_panel.getBoundingClientRect();
                    let output_div = this.iocontrol.getOuputPanel();
                    this.three = new BasicThree({ "width": rect.width, "height": rect.height });
                    this.three.setData(data_draw['data']);
                    output_div.appendChild(this.three.get());
                    output_div.addEventListener("resize", this.outputResize);
                }
                else {
                    let dat = JSROOT.parse(data_draw["data"]);
                    JSROOT.draw(output_panel.id, dat, "ACP");
                }
            }
            msg = "<br><font color='green'>" + data['message'] + "</font>";
        }
        else {
            msg = "<br><font color='red'>" + data['message'] + "</font>";
        }
        let console_data = this.console_area.get().innerHTML;
        console_data += msg;
        this.console_area.get().innerHTML = console_data;
        return data;
    }
    setIOControl(ioc) {
        this.iocontrol = ioc;
    }
}
//# sourceMappingURL=run.js.map