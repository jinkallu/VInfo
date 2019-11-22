export class Run {
    constructor(_design_area) {
        this.execute = () => {
            let blocks = this.design_area.getBlocks();
            let block;
            for (block of blocks) {
                let data = block.getData();
                console.log(block.id + " " + block.name);
            }
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
}
//# sourceMappingURL=run.js.map