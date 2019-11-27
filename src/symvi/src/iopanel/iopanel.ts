export class IOPanel{
    iopanel_div:HTMLDivElement;
    flag_resizing:boolean;
    ref_resize:number;

    constructor(pos:any){
        this.iopanel_div = document.createElement("div");
        this.iopanel_div.setAttribute('id','properties');
        this.iopanel_div.style.position = "absolute";
        this.iopanel_div.style.border = "solid black";
        this.iopanel_div.style.top = pos.top;
        this.iopanel_div.style.width = pos.width;
        this.iopanel_div.style.left = pos.left;
        this.iopanel_div.style.height = pos.height;

        this.flag_resizing = false;
        this.ref_resize = 0;

        this.iopanel_div.addEventListener("mousemove", this.mouseMove); 
        this.iopanel_div.addEventListener("mousedown", this.mouseClick); 
        this.iopanel_div.addEventListener("mouseup", this.mouseUp); 
        this.iopanel_div.addEventListener("mouseout", this.mouseUp); 

    }

    get(){
        return this.iopanel_div;
    }

    mouseClick = (evt: MouseEvent) => {
        if(this.resizingPos(evt)){
            this.flag_resizing = true;
            this.ref_resize = evt.pageX;
            console.log("Resizing started");
        }
    }

    mouseUp = () => {
        if(this.flag_resizing){
            this.flag_resizing = false;
        }
    }

    mouseMove = (evt: MouseEvent) => {
        if(this.resizingPos(evt)){
            this.iopanel_div.style.cursor = "e-resize";

            if(this.flag_resizing){
                console.log("Resizing");
                let new_pos = parseInt(this.iopanel_div.style.left) + evt.pageX - this.ref_resize;
                this.iopanel_div.style.left = new_pos.toString() + "%";
            }
        }
        else{
            this.iopanel_div.style.cursor = "default";
        }
    }

    resizingPos(evt:MouseEvent){
        let rect = this.iopanel_div.getBoundingClientRect();
        var x = evt.pageX - rect.left;
        if(x < 2/100 * rect.width){
            return true;
        }

        return false;
    }
}