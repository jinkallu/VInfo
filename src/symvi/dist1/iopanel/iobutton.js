export class IOButton {
    constructor(name) {
        this.button_div = document.createElement("button");
        this.button_div.innerHTML = name;
    }
    get() {
        return this.button_div;
    }
}
//# sourceMappingURL=iobutton.js.map