import { Histogram } from '../histogram';
import { DesignApi } from '../Api/designApi';
export class Properties {
    constructor() { }
    static getInstance() {
        if (!Properties.instance) {
            Properties.instance = new Properties();
        }
        return Properties.instance;
    }
    create() {
        this.properties_div = document.createElement("div");
        this.properties_div.setAttribute('id', 'properties');
        this.properties_div.style.position = "absolute";
        this.properties_div.style.top = "7%";
        this.properties_div.style.width = "100%";
        this.properties_div.style.minHeight = "80%";
        let itemDiv = document.createElement('div');
        itemDiv.setAttribute('id', 'itemName');
        itemDiv.style.margin = "5px";
        itemDiv.style.fontSize = '12px';
        itemDiv.style.fontWeight = "bold";
        itemDiv.style.textAlign = 'center';
        this.propDiv = document.createElement('div');
        this.propDiv.style.background = 'lightgrey';
        this.propDiv.style.minHeight = "40%";
        this.propDiv.style.width = "90";
        this.propDiv.style.margin = "3%";
        this.propDiv.setAttribute('id', 'this.propDiv');
        this.propDiv.style.display = "flex";
        this.propDiv.style.flexDirection = "column";
        this.properties_div.appendChild(itemDiv);
        this.properties_div.appendChild(this.propDiv);
        let histogram = new Histogram();
        return this.properties_div;
    }
    onChange() {
        console.log();
    }
    addProperties(itemProp, instanceid) {
        let divEl = document.createElement('div');
        divEl.style.display = "flex";
        divEl.style.justifyContent = "space-between";
        divEl.style.flexDirection = 'row';
        divEl.style.margin = '5px';
        let inEl = document.createElement('input');
        inEl.setAttribute('id', itemProp.propId);
        inEl.setAttribute('placeholder', itemProp.propName);
        inEl.addEventListener('change', function () {
            console.log(this.value);
            DesignApi.addPropVal(instanceid, itemProp.propId, this.value);
        });
        let lblEl = document.createElement('label');
        lblEl.textContent = itemProp.propName.toUpperCase();
        switch (itemProp.propType) {
            case 'string':
                inEl.setAttribute('type', 'text');
                break;
            case 'number':
                inEl.setAttribute('type', 'number');
                break;
            case 'date':
                inEl.setAttribute('type', 'date');
                break;
        }
        divEl.appendChild(lblEl);
        divEl.appendChild(inEl);
        return divEl;
    }
    addItems(itemProps, instanceid) {
        this.propDiv.innerHTML = null;
        for (let itemProp of itemProps) {
            this.propDiv.appendChild(this.addProperties(itemProp, instanceid));
        }
        this.properties_div.appendChild(this.propDiv);
    }
}
//# sourceMappingURL=properties.js.map