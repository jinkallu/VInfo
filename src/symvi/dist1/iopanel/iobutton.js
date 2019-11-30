export class IOButton {
    constructor(name) {
        this.button_div = document.createElement("button");
        this.button_div.innerHTML = name;
        this.button_div.style.border = 'none';
        this.button_div.style.outline = 'none';
    }
    get() {
        return this.button_div;
    }
    emulateClick() {
        let event = new Event("click");
        this.button_div.dispatchEvent(event);
    }
}
//# sourceMappingURL=iobutton.js.map