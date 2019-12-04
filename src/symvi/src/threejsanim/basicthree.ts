import * as THREE from 'THREE';

export class BasicThree{
    three_div: HTMLCanvasElement;
    scene:any;
    renderer:any;
    camera:any;
    sphere:any;
    data:any;
    data_idx: number;

    constructor(pos:any){
        this.data = null;
        this.data_idx = 0;
        console.log("Three", pos.width, pos.height);
        this.three_div = document.createElement("canvas");
        this.three_div.style.height = "100%";
        this.three_div.style.width = "100%";
        this.three_div.style.display = "block";
        this.three_div.style.margin = "0";
        this.scene = new THREE.Scene();
        this.scene.add( new THREE.AmbientLight(0x444444));
        this.camera = new THREE.PerspectiveCamera( 70, pos.width / pos.height, 0.1, 1000 );

        // addlight
        let color = 0xffffff;
        let intensity = 1;
        let dirLight = new THREE.DirectionalLight(color, intensity);
        dirLight.position.set(0, 0, 10);
        this.scene.add(dirLight);
        //this.camera.add(dirLight);
        //this.camera.add(dirLight.target);

        let canvas = this.three_div;
        this.renderer = new THREE.WebGLRenderer({canvas});
        this.renderer.setClearColor(0xffffff);

        let geometry = new THREE.SphereGeometry( 3, 32, 32 );
        let material = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
        this.sphere = new THREE.Mesh( geometry, material );
        this.scene.add( this.sphere );

        this.camera.position.z = 50;
        //this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.animate();
    }

    setData(data:any){
        this.data = data;
    }

    animate = () => {
        if(this.data){
            if(this.data_idx >= this.data.length){
                this.data_idx = 0;
            }
            this.sphere.position.x = this.data[this.data_idx];
            this.data_idx++;
        }
        // responsive 
        if (this.resizeRendererToDisplaySize(this.renderer)) {
            let canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }

        this.renderer.render( this.scene, this.camera );
        requestAnimationFrame( this.animate );
    }

    resizeRendererToDisplaySize(renderer:any) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        console.log(width, height, canvas.width, canvas.height);
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
      }

    get(){
        return this.three_div;
    }
}