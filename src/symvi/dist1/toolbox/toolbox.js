import { Categories } from './categories';
export class ToolBox {
    constructor() {
        this.categories = new Categories();
    }
    create(parentToolBox) {
        parentToolBox.appendChild(this.categories.create());
    }
}
//# sourceMappingURL=toolbox.js.map