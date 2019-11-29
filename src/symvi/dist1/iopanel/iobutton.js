export class IOButton {
    constructor(name) {
        this.button_div = document.createElement("button");
        this.button_div.innerHTML = name;
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