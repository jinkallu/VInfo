export class Run {
    constructor(_design_area) {
        this.execute = () => {
            this.submit({ edges: this.createEdgesData(),
                blocks: this.createBlocksData() });
        };
        this.design_area = _design_area;
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
        return edges_data;
    }
    createBlocksData() {
        let blocks = this.design_area.getBlocks();
        let blocks_data = [];
        let block;
        for (block of blocks) {
            let data = block.getData();
            let block_data = {
                id: data.id,
                type: data.type,
                name: data.name,
                outputs: data.outputs
            };
            blocks_data.push(block_data);
            console.log(data.id + " " +
                data.type + " " +
                data.name + " " +
                data.inputs + " " +
                data.outputs);
        }
        return blocks_data;
    }
    async submit(send_data) {
        let response = await fetch('http://127.0.0.1:5000/api/calc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(send_data)
        });
        let data = await response.json();
    }
}
//# sourceMappingURL=run.js.map