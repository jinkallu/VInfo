import { Component } from '../models/component';

export class DesignApi {
    static components: Component[] = [];
    static edges: any = [];

    static addComponent(component: Component) {
        DesignApi.components.push(component);
    }

    static removeComponent(id: number) {
        DesignApi.components = DesignApi.components.filter(f => {
            return f.instanceId !== id;
        })
    }

    


}