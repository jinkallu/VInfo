import { Histogram } from './histogram.js';
export class Properties {
    constructor() {
    }
    create(parentProperty) {
        console.log(parentProperty);
        let histogram = new Histogram();
    }
}
//# sourceMappingURL=properties.js.map