import {Histogram} from './histogram';

export class Properties{
     constructor(){

     }
     create( parentProperty: HTMLDivElement){
          console.log(parentProperty);
          let histogram = new Histogram();
     }    
}