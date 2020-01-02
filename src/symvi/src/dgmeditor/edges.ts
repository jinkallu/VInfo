import {Edge } from './edge';

export class Edges{
    edges:Edge[];
    tmp_edge:Edge;
    svg:any;

    connection_started:boolean;
    connection_src:any;
    connection_tgt:any;

    body: HTMLBodyElement;

    constructor(_svg:any, _body: HTMLBodyElement){
        this.edges = [];
        this.svg = _svg;

        this.connection_started = false;

        this.body = _body;

        //this.body.addEventListener("click", this.bodyClicked);
        //this.body.addEventListener("contextmenu", this.bodyClicked);
    }

    addEdge(){
        
        this.edges.push(new Edge(this.connection_src, this.connection_tgt, false, this.body));
        //this.edges[this.edges.length - 1].getPolyLine().addEventListener("deleteEdge", this.deleteEdge);
        this.svg.appendChild(this.edges[this.edges.length - 1].getPolyLine());
        return this.edges[this.edges.length - 1];
    }

    setEdgeForSrc(edge:Edge){
        this.connection_src.src_node.setEdge(edge);
    }

    connectionStarted(){
        return this.connection_started;
    }

    setConnectionStarted(flag:boolean){
        this.connection_started = flag;
        if(!flag){
            this.removeTempEdge();
        }
    }

    setConnectionSrc(src:any){
        this.connection_src = src;
        this.tmp_edge = null;
        this.tmp_edge = new Edge(this.connection_src, this.connection_src, true);
        this.svg.appendChild(this.tmp_edge.getPolyLine());
    }

    getConnectionSrc(){
        return this.connection_src;
    }

    setConnectionTgt(tgt:any){
        this.connection_tgt = tgt;
    }

    removeTempEdge(){
        this.tmp_edge.getPolyLine().parentNode.removeChild(this.tmp_edge.getPolyLine());
        this.tmp_edge = null;
    }

    getConnectioTgt(){
        return this.connection_tgt;
    }

    getEdges(){
        return this.edges;
    }

    bodyClicked(){
        for(let edge of this.edges){
            edge.hideContextMenu();
        }
    }

    deleteEdge = (id: any) => {
        for (let i = 0; i < this.edges.length; i++){
            if(this.edges[i].getId() == id){

                let edge_data = this.edges[i].getData();
                this.svg.removeChild(this.edges[i].getPolyLine());
                this.edges.splice(i, 1);
                
                return edge_data;
            }
        }
    }

    getEdgesConnectedWithBlock(id: any){
        let edges_connected = [];

        for(let edge of this.edges){
            if(edge.connectedToBlock(id)){
                edges_connected.push(edge);
            }
        }

        return edges_connected;
    }
}