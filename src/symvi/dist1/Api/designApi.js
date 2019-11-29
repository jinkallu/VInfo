export class DesignApi {
    static getComponents() {
        return this.components;
    }
    static getComponentByInstId(instanceId) {
        for (let comp of this.components) {
            if (comp.instanceId == instanceId) {
                return comp;
                break;
            }
        }
    }
    static addComponent(component) {
        DesignApi.components.push(component);
        console.log("added component");
        console.log(this.components);
    }
    static removeComponent(id) {
        DesignApi.components = DesignApi.components.filter(f => {
            return f.instanceId !== id;
        });
    }
    static addPropVal(instanceid, propId, val) {
        for (let component of this.components) {
            if (component.instanceId === instanceid) {
                component.addItemPropVal(propId, val);
                break;
            }
        }
    }
}
DesignApi.components = [];
DesignApi.edges = [];
//# sourceMappingURL=designApi.js.map