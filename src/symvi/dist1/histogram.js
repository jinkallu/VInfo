import JSROOT from 'JSROOT';
export class Histogram {
    constructor() {
        JSROOT.NewHttpRequest('http://127.0.0.1:5000/api/calc', 'object', function (obj) {
            JSROOT.draw("properties", obj, "hist");
        }).send();
    }
}
//# sourceMappingURL=histogram.js.map