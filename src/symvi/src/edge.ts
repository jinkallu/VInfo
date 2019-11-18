export class Edge{
    static static_id:number = 0;

    id:number;

    active:boolean;
    src_block_id:number;
    src_node_id:number;

    tgt_block_id:number;
    tgt_node_id:number;

    polyline:any;

    constructor(_src:any, _tgt:any){
        this.id = Edge.static_id;
        Edge.static_id++;

        this.src_block_id = _src.block_id;
        this.src_node_id = _src.node_id;

        this.tgt_block_id = _tgt.block_id;
        this.tgt_node_id = _tgt.node_id;

        this.polyline = document.createElementNS("http://www.w3.org/2000/svg","polyline");
        this.polyline.setAttribute("stroke", "blue");
        this.setPoints("" + _src.pos.x + "," + _src.pos.y + " " + _tgt.pos.x + "," + _tgt.pos.y + "");

        this.active = true;
    }

    setPoints(points:any){
        console.log("points " + points);
        this.polyline.setAttributeNS(null, "points", points);
    }

    getPolyLine(){
        return this.polyline;
    }
}