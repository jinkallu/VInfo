import * as THREE from 'THREE';
//import CCapture from 'CCAPTURE';
declare var CCapture: any;

export class BasicThree{
    three_div: HTMLCanvasElement;
    scene:any;
    renderer:any;
    camera:any;
    mesh:any[];
    data:any;
    data_idx: number[];
    axis:number;
    controls: any;
    ccapture: any;
    light: any;

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
    ///    this.scene.background = new THREE.Color( 0x000000 );
    ///    this.scene.add( new THREE.AmbientLight(0x444444));
        this.camera = new THREE.PerspectiveCamera( 70, pos.width / pos.height, 0.1, 1000 );

        // addlight
        let color = 0xffffff;
        let intensity = 1;
        let dirLight = new THREE.DirectionalLight(color, intensity);
        dirLight.position.set(0, 0, 10);
    ///    this.scene.add(dirLight);
        //this.camera.add(dirLight);
        //this.camera.add(dirLight.target);

        let canvas = this.three_div;
        this.renderer = new THREE.WebGLRenderer({canvas});
        this.renderer.setClearColor(0xffffff);


        this.camera.position.z = 50;
        //this.camera.lookAt(new THREE.Vector3(0, 0, 0));

        // Prepare Orbit controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target = new THREE.Vector3(0, 0, 0);
        this.controls.maxDistance = 4000;

        this.ccapture = new CCapture( { format: 'webm' , timeLimit: 20} );

        this.light = new THREE.AmbientLight(0xffffff, 1);
        this.animate();
    }

    addSphere(dat:any){
        //console.log("radius ", rad)
        let rad = dat["radius"];
        let texture = dat["texture"];
        let color = dat["color"];
        let transparency = dat["transparency"];
        if(!transparency){
            transparency = false;
        }

        let opacity = dat["opacity"];
        if(!opacity){
            opacity = 1.0;
        }

        if(!color){
            color = 0x0000ff;
        }

        if(!rad){
            rad = 3;
        }
        let geometry;
        if(dat["type"] === "Cylinder"){
            geometry = new THREE.CylinderGeometry( rad, rad, 2, 32 );
        }
        else{
            geometry = new THREE.SphereGeometry( rad, 32, 32 );
        }

        let emissive = 0x000000;
        if(texture == "sun"){
            emissive = 0xffffff;
        }

        let material = new THREE.MeshPhongMaterial( { color: color,
                                                      transparent: transparency,
                                                      opacity: opacity,
                                                      emissive: emissive
                                                    } );
        
        this.addTexture(material, texture);
        
        let msh = new THREE.Mesh( geometry, material );
        msh.position.x = dat["position"]["x"];
        msh.position.y = dat["position"]["y"];
        msh.position.z = dat["position"]["z"];

        this.mesh.push(msh);
        this.scene.add(msh);

        this.data_idx.push(0);
    }

    addTexture(material:any, texture: string){
        if(texture === "" || texture === null || texture === undefined){
            return;
        }

        texture = texture.toLowerCase();
        
        if(!(texture == "earth" ||
             texture == "sun" ||
             texture == "moon")){
                return;
           }

        material.color = new THREE.Color( 0xffffff );

        if(texture === "earth"){
            material.map = THREE.ImageUtils.loadTexture('/static/images/textures/earth/earthmap1k.jpg');
            material.bumpMap = THREE.ImageUtils.loadTexture('/static/images/textures/earth/earthbump1k.jpg');
            material.specularMap = THREE.ImageUtils.loadTexture('/static/images/textures/earth/earthspec1k.jpg');
        }
        else if(texture == "moon"){
            material.map = THREE.ImageUtils.loadTexture('/static/images/textures/moon/8k_moon.jpg');
        }
        else if(texture == "sun"){
            material.emissiveMap = THREE.ImageUtils.loadTexture('/static/images/textures/8k_sun.jpg');
            this.light = new THREE.PointLight(0xffffff, 1);
        }
    }

    setData(data:any){
        this.data = data;
        if(!this.data){
            return;
        }
        

        //console.log("Data", this.data);
        for(let i = 0; i < this.data.length; i++){
            this.addSphere(this.data[i]);//(this.data[i]["radius"], this.data[i]["texture"]);
            //console.log("Adding sphere ", i, this.data[i]["radius"]);
        }

        this.scene.add(this.light);
        this.ccapture.start();
    }

    updateData(){
        if(!this.data){
            return;
        }

        for(let i = 0; i < this.data.length; i++){
            let data_i = this.data[i];
            //console.log("# 0");
            if(this.data[i]){
                //console.log("# 1");

                let position = data_i["position"];
                //console.log("# 2");


                let x = position["x"];
                let y = position["y"];
                let z = position["z"];

                //console.log("# 3");


                let length = 0;
                if(x){
                    length = x.length;
                }
                else if(y){
                    length = y.length;
                }
                else if(z){
                    length = z.length;
                }

                if(this.data_idx[i] >= length){
                    this.data_idx[i] = 0;
                }

                //console.log("# 4");

                if(x){
                    this.mesh[i].position.x = x[this.data_idx[i]];
                    
                }
                //console.log("# 5");
                if(y){
                    this.mesh[i].position.y = y[this.data_idx[i]];
                }
                if(z){
                    this.mesh[i].position.z = z[this.data_idx[i]];
                }

                if(data_i["texture"] == "sun"){
                    this.light.position.set(this.mesh[i].position.x, 
                                            this.mesh[i].position.y, 
                                            this.mesh[i].position.z);
                }

                this.data_idx[i]++;
                //console.log("# 2");
            }
        }
    }

    // Update controls and stats
    update() {
        this.controls.update();
    }

    animate = () => {
        this.updateData();
        this.update();
        // responsive 
        if (this.resizeRendererToDisplaySize(this.renderer)) {
            let canvas = this.renderer.domElement;
            this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
            this.camera.updateProjectionMatrix();
        }

        this.renderer.render( this.scene, this.camera );
        requestAnimationFrame( this.animate );

        this.ccapture.capture(this.three_div);
    }

    resizeRendererToDisplaySize(renderer:any) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        ////console.log(width, height, canvas.width, canvas.height);
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