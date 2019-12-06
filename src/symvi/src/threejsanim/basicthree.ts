import * as THREE from 'THREE';

export class BasicThree{
    three_div: HTMLCanvasElement;
    scene:any;
    renderer:any;
    camera:any;
    mesh:any[];
    data:any;
    data_idx: number[];
    axis:number;

    constructor(pos:any){
        this.three_div = document.createElement("canvas");
        this.three_div.style.height = "100%";
        this.three_div.style.width = "100%";
        this.three_div.style.display = "block";
        this.three_div.style.margin = "0";

        this.mesh = [];
        this.data = null;
        this.data_idx = [];
        this.axis = 0;
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


        this.camera.position.z = 50;
        //this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        this.animate();
    }

    addSphere(){
        let geometry = new THREE.SphereGeometry( 3, 32, 32 );
        let material = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
        this.mesh.push(new THREE.Mesh( geometry, material ));
        this.scene.add( this.mesh[this.mesh.length - 1]);

        this.data_idx.push(0);
    }

    setData(data:any){
        this.data = data;
        if(!this.data){
            return;
        }

        for(let i = 0; i < this.data.length; i++){
            this.addSphere();
            console.log("Adding sphere ", i);
        }
    }

    updateData(){
        if(!this.data){
            return;
        }

        for(let i = 0; i < this.data.length; i++){
            let data_i = this.data[i];
            if(this.data[i]){

                let length = 0;
                if(data_i[0]){
                    length = data_i[0].length;
                }
                else if(data_i[1]){
                    length = data_i[1].length;
                }
                else if(data_i[2]){
                    length = data_i[2].length;
                }

                if(this.data_idx[i] >= length){
                    this.data_idx[i] = 0;
                }

                if(data_i[0]){
                    this.mesh[i].position.x = data_i[0][this.data_idx[i]];
                }
                if(data_i[1]){
                    this.mesh[i].position.y = data_i[1][this.data_idx[i]];
                }
                if(data_i[2]){
                    this.mesh[i].position.z = data_i[2][this.data_idx[i]];
                }
                this.data_idx[i]++;
            }
        }
    }

    animate = () => {
        this.updateData();
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
        //console.log(width, height, canvas.width, canvas.height);
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