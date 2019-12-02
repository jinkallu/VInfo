import * as THREE from 'THREE';

export class BasicThree{
    three_div: HTMLDivElement;
    scene:any;
    renderer:any;
    camera:any;

    constructor(pos:any){
        //pos.width = '100';
        //pos.height = '100';
        console.log("Three", pos.width, pos.height);
        this.three_div = document.createElement("div");
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera( 75, pos.width / pos.height, 0.1, 1000 );

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( pos.width, pos.height);
        this.three_div.appendChild( this.renderer.domElement );

        let geometry = new THREE.BoxGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        let cube = new THREE.Mesh( geometry, material );
        this.scene.add( cube );

        this.camera.position.z = 5;

        this.animate();
    }

    animate() {
        requestAnimationFrame( this.animate );
        this.renderer.render( this.scene, this.camera );
    }

    get(){
        return this.three_div;
    }
}