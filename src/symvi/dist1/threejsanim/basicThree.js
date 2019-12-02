import THREE from 'three';
export class BasicThree {
    constructor() {
        this.three_div = document.createElement("div");
        let scene = new THREE.Scene();
        let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        let renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.three_div.appendChild(renderer.domElement);
    }
}
//# sourceMappingURL=basicThree.js.map