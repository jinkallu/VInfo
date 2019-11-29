import { IOControl } from './iocontrol';
export class IOPanel {
    constructor(pos) {
        this.mouseClick = (evt) => {
            if (this.resizingPos(evt)) {
                window.addEventListener("mousemove", this.mouseMoveW);
                this.original_width = parseFloat(getComputedStyle(this.iopanel_div, null).getPropertyValue('width').replace('px', ''));
                this.original_x = this.iopanel_div.getBoundingClientRect().left;
                this.original_mouse_x = evt.pageX;
            }
        };
        this.mouseUp = () => {
            window.removeEventListener('mousemove', this.mouseMoveW);
        };
        this.mouseMove = (evt) => {
            if (this.resizingPos(evt)) {
                this.iopanel_div.style.cursor = "e-resize";
            }
            else {
                this.iopanel_div.style.cursor = "default";
            }
        };
        this.mouseMoveW = (evt) => {
            let x_diff = evt.pageX - this.original_mouse_x;
            const width = this.original_width - x_diff;
            if (width > this.minimum_size && width < this.maximum_size) {
                this.iopanel_div.style.width = width + 'px';
                let left = this.original_x + x_diff;
                this.iopanel_div.style.left = left + 'px';
                this.iopanel_div.dispatchEvent(new CustomEvent("resize", {
                    bubbles: true,
                    detail: { left: left }
                }));
            }
        };
        this.iopanel_div = document.createElement("div");
        this.iopanel_div.style.position = "absolute";
        this.iopanel_div.style.border = "solid black";
        this.iopanel_div.style.top = pos.top;
        this.iopanel_div.style.width = pos.width;
        this.iopanel_div.style.left = pos.left;
        this.iopanel_div.style.height = pos.height;
        this.minimum_size = 100;
        this.maximum_size = 1000;
        this.iocontrol = new IOControl();
        this.iopanel_div.appendChild(this.iocontrol.get());
        this.iopanel_div.addEventListener("mousemove", this.mouseMove);
        this.iopanel_div.addEventListener("mousedown", this.mouseClick);
        window.addEventListener("mouseup", this.mouseUp);
    }
    get() {
        return this.iopanel_div;
    }
    resizingPos(evt) {
        let rect = this.iopanel_div.getBoundingClientRect();
        var x = evt.pageX - rect.left;
        if (x < 2 / 100 * rect.width) {
            return true;
        }
        return false;
    }
    getIOControl() {
        return this.iocontrol;
    }
}
//# sourceMappingURL=iopanel.js.map