import * as THREE from 'THREE';
export class BasicThree {
    constructor(pos) {
        this.animate = () => {
            this.updateData(0);
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
        this.data_idx = 0;
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
        this.addSphere();
        this.camera.position.z = 50;
        this.animate();
    }
    addSphere() {
        let geometry = new THREE.SphereGeometry(3, 32, 32);
        let material = new THREE.MeshPhongMaterial({ color: 0x0000ff });
        this.mesh.push(new THREE.Mesh(geometry, material));
        this.scene.add(this.mesh[this.mesh.length - 1]);
    }
    setData(data) {
        this.data = data;
    }
    updateData(i) {
        if (this.data) {
            let length = 0;
            if (this.data["0"]) {
                length = this.data["0"].length;
            }
            else if (this.data["1"]) {
                length = this.data["1"].length;
            }
            else if (this.data["2"]) {
                length = this.data["2"].length;
            }
            if (this.data_idx >= length) {
                this.data_idx = 0;
            }
            if (this.data["0"]) {
                this.mesh[i].position.x = this.data["0"][this.data_idx];
            }
            if (this.data["1"]) {
                this.mesh[i].position.y = this.data["1"][this.data_idx];
            }
            if (this.data["2"]) {
                this.mesh[i].position.z = this.data["2"][this.data_idx];
            }
            this.data_idx++;
        }
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