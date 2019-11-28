export class IOPanel{
    iopanel_div:HTMLDivElement;


    original_width:number;
    original_x:number;
    original_mouse_x:number;
    minimum_size:number;


    constructor(pos:any){
        this.iopanel_div = document.createElement("div");
        this.iopanel_div.setAttribute('id','properties');
        this.iopanel_div.style.position = "absolute";
        this.iopanel_div.style.border = "solid black";
        this.iopanel_div.style.top = pos.top;
        //this.iopanel_div.setAttribute('float',"right");
        this.iopanel_div.style.width = pos.width;
        this.iopanel_div.style.left = pos.left;
        this.iopanel_div.style.height = pos.height;

        this.minimum_size = 100;

        this.iopanel_div.addEventListener("mousemove", this.mouseMove);
        window.addEventListener("mousedown", this.mouseClick); 
        window.addEventListener("mouseup", this.mouseUp);
  
        //this.iopanel_div.addEventListener("mousedown", this.mouseClick); 
        //this.iopanel_div.addEventListener("mouseup", this.mouseUp); 
        //this.iopanel_div.addEventListener("mouseout", this.mouseUp); 

    }

    get(){
        return this.iopanel_div;
    }

    mouseClick = (evt: MouseEvent) => {
        if(this.resizingPos(evt)){
            evt.preventDefault();

            window.addEventListener("mousemove", this.mouseMoveW); 

            this.original_width = parseFloat(getComputedStyle(this.iopanel_div, null).getPropertyValue('width').replace('px', ''));
            this.original_x = this.iopanel_div.getBoundingClientRect().left;
            this.original_mouse_x = evt.pageX;
        }
    }

    mouseUp = () => {
        window.removeEventListener('mousemove', this.mouseMoveW);
    }

    mouseMove = (evt: MouseEvent) => {
        //event.preventDefault();
        if(this.resizingPos(evt)){
            this.iopanel_div.style.cursor = "e-resize";
        }
        else{
            this.iopanel_div.style.cursor = "default";
        }
    }

    mouseMoveW = (evt:MouseEvent) => {
        const width = this.original_width - (evt.pageX - this.original_mouse_x)
        if (width > this.minimum_size) {
          this.iopanel_div.style.width = width + 'px';
          this.iopanel_div.style.left = this.original_x + (evt.pageX - this.original_mouse_x) + 'px';
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