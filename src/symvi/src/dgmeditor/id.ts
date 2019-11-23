// unique id for blocks and edges
export class Id{
    private static id:number = 0;

    static getID(){
        return Id.id++;
    }
}