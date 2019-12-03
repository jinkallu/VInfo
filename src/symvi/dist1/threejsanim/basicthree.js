import * as THREE from 'THREE';
export class BasicThree {
    constructor(pos) {
        this.animate = () => {
            if (this.data) {
                if (this.data_idx >= this.data.length) {
                    this.data_idx = 0;
                }
                this.sphere.position.x = this.data[this.data_idx];
                this.data_idx++;
            }
            requestAnimationFrame(this.animate);
            this.renderer.render(this.scene, this.camera);
        };
        this.data = null;
        this.data_idx = 0;
        console.log("Three", pos.width, pos.height);
        this.three_div = document.createElement("div");
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.AmbientLight(0x444444));
        this.camera = new THREE.PerspectiveCamera(70, pos.width / pos.height, 0.1, 1000);
        let dirLight = new THREE.PointLight(0xffffff, 1, 100);
        dirLight.position.set(50, 50, 50);
        this.scene.add(dirLight);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(pos.width, pos.height);
        this.three_div.appendChild(this.renderer.domElement);
        let geometry = new THREE.SphereGeometry(3, 32, 32);
        let material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);
        this.camera.position.z = 50;
        this.animate();
    }
    setData(data) {
        this.data = data;
    }
    get() {
        return this.three_div;
    }
    resize(size) {
        this.camera.aspect = size.width / size.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(size.width, size.height);
    }
}
//# sourceMappingURL=basicthree.js.map