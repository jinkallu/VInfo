import { Component } from '../models/component';

export class DesignApi {
    static components: Component[] = [];
    static edges: any = [];


    static getComponents() {
        return this.components;
    }

    static getComponentByInstId(instanceId: number):Component{

        for (let comp of this.components){
            if (comp.instanceId==instanceId){
                return comp;
                break;
            }
        }
       
    }

    static addComponent(component: Component) {
        DesignApi.components.push(component);
        console.log("added component");
        console.log(component);
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

        console.log(this.components);


    }




}