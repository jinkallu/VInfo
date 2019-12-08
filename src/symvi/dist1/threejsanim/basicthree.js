import * as THREE from 'THREE';
export class BasicThree {
    constructor(pos) {
        this.animate = () => {
            this.updateData();
            this.update();
            if (this.resizeRendererToDisplaySize(this.renderer)) {
                let canvas = this.renderer.domElement;
                this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
                this.camera.updateProjectionMatrix();
            }
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(this.animate);
        };
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
        this.scene.add(new THREE.AmbientLight(0x444444));
        this.camera = new THREE.PerspectiveCamera(70, pos.width / pos.height, 0.1, 1000);
        let color = 0xffffff;
        let intensity = 1;
        let dirLight = new THREE.DirectionalLight(color, intensity);
        dirLight.position.set(0, 0, 10);
        this.scene.add(dirLight);
        let canvas = this.three_div;
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.renderer.setClearColor(0xffffff);
        this.camera.position.z = 50;
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target = new THREE.Vector3(0, 0, 0);
        this.controls.maxDistance = 4000;
        this.animate();
    }
    addSphere(rad, texture) {
        if (!rad) {
            rad = 3;
        }
        let geometry = new THREE.SphereGeometry(rad, 32, 32);
        let material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
        this.addTexture(material, texture);
        let msh = new THREE.Mesh(geometry, material);
        this.mesh.push(msh);
        this.scene.add(msh);
        this.data_idx.push(0);
    }
    addTexture(material, texture) {
        if (texture === "" || texture === null || texture === undefined) {
            return;
        }
        texture = texture.toLowerCase();
        material.color = new THREE.Color(0xffffff);
        if (texture === "earth") {
            material.map = THREE.ImageUtils.loadTexture('/static/images/textures/earth/earthmap1k.jpg');
            material.bumpMap = THREE.ImageUtils.loadTexture('/static/images/textures/earth/earthbump1k.jpg');
            material.specularMap = THREE.ImageUtils.loadTexture('/static/images/textures/earth/earthspec1k.jpg');
        }
        else if (texture == "moon") {
            material.map = THREE.ImageUtils.loadTexture('/static/images/textures/moon/8k_moon.jpg');
        }
    }
    setData(data) {
        this.data = data;
        if (!this.data) {
            return;
        }
        for (let i = 0; i < this.data.length; i++) {
            this.addSphere(this.data[i]["radius"], this.data[i]["texture"]);
        }
    }
    updateData() {
        if (!this.data) {
            return;
        }
        for (let i = 0; i < this.data.length; i++) {
            let data_i = this.data[i];
            if (this.data[i]) {
                let position = data_i["position"];
                let x = position["x"];
                let y = position["y"];
                let z = position["z"];
                let length = 0;
                if (x) {
                    length = x.length;
                }
                else if (y) {
                    length = y.length;
                }
                else if (z) {
                    length = z.length;
                }
                if (this.data_idx[i] >= length) {
                    this.data_idx[i] = 0;
                }
                if (x) {
                    this.mesh[i].position.x = x[this.data_idx[i]];
                }
                if (y) {
                    this.mesh[i].position.y = y[this.data_idx[i]];
                }
                if (z) {
                    this.mesh[i].position.z = z[this.data_idx[i]];
                }
                this.data_idx[i]++;
            }
        }
    }
    update() {
        this.controls.update();
    }
    resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }
    get() {
        return this.three_div;
    }
}
//# sourceMappingURL=basicthree.js.map