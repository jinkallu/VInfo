import { Component } from '../models/component';

export class DesignApi {
    static components: Component[] = [];
    static edges: any = [];


    static getComponents() {
        return this.components;
    }

    static addComponent(component: Component) {
        DesignApi.components.push(component);
        console.log(this.components);
    }

    static removeComponent(id: number) {
        DesignApi.components = DesignApi.components.filter(f => {
            return f.instanceId !== id;
        })
    }

    static addPropVal(instanceid: number, propId: string, val: string) {

        for (let component of this.components) {
            if (component.instanceId === instanceid) {
                component.addItemPropVal(propId, val);
                break;
            }
        }


    }




}