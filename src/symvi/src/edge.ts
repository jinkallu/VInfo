export class Edge{
    static static_id:number = 0;

    id:number;

    active:boolean;
    src_block_id:number;
    src_node_id:number;

    tgt_block_id:number;
    tgt_node_id:number;

    polyline:any;
    pos:any;

    constructor(_src:any, _tgt:any){
        this.id = Edge.static_id;
        Edge.static_id++;

        this.src_block_id = _src.block_id;
        this.src_node_id = _src.node_id;

        this.tgt_block_id = _tgt.block_id;
        this.tgt_node_id = _tgt.node_id;

        this.pos = {x1: _src.pos.x, y1: _src.pos.y, x2: _tgt.pos.x, y2: _tgt.pos.y};

        this.polyline = document.createElementNS("http://www.w3.org/2000/svg","polyline");
        this.polyline.setAttribute("stroke", "blue");
        this.polyline.setAttribute("fill", "white");
        this.polyline.setAttribute("fill-opacity", "0");
        this.updatePoints();

        this.active = true;
    }

    updatePoints(){
        let x_mid = (Math.max(this.pos.x2, this.pos.x1) - Math.min(this.pos.x2, this.pos.x1)) / 2;
        let points = this.pos.x1 + "," + this.pos.y1 + " " + 
                     x_mid + "," + this.pos.y1 + " " +
                     x_mid + "," + this.pos.y2 + " " +
                     this.pos.x2 + "," + this.pos.y2;
        //let points = "" + this.pos.x1 + "," + this.pos.y1 + " " + this.pos.x2 + "," + this.pos.y2 + "";
        console.log("points " + points);
        this.polyline.setAttributeNS(null, "points", points);
    }

    setPointSrc(src:any){
        this.pos.x1 = src.x;
        this.pos.y1 = src.y;
        this.updatePoints();
    }

    setPointTgt(src:any){
        this.pos.x2 = src.x;
        this.pos.y2 = src.y;
        this.updatePoints();
    }

    getPolyLine(){
        return this.polyline;
    }
}