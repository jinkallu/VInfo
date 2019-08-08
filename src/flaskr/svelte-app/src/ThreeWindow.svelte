<script>
    import * as THREE from 'three';
    //import * as OrbitControls from 'three-orbitcontrols'

'use strict';

// global variables
var container;
var camera, scene, renderer, controls;
var spheres = [];
var mouseX = 0;
var mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
document.addEventListener( 'mousemove', onDocumentMouseMove, false );

init();
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 'skyblue' );

	camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 1, 10000 );
//container = document.getElementById( 'can' );

//container = document.createElement( 'div' );
//container.setAttribute("id", "can");
//let cont = document.getElementById("can");
//document.body.appendChild( container );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
   //cont.appendChild( renderer.domElement );
   //document.getElementById('canvas').appendChild(renderer.domElement);


    camera.position.set( 0, 0, 5 );

			


    // lights
    setLight();

    //setControls();

    createSphere(0, 0, 0, "Maths");
    createSphere(0, 0, -400, "Arithematic");

    createLine(0, 0, 0, 0, 5, 0);




    window.addEventListener( 'resize', onWindowResize, false );
}

function createSphere(x, y, z, txt){
    //var dynamicTexture	= new THREEx.DynamicTexture(300,500);
    //https://github.com/jeromeetienne/threex.dynamictexture
    //dynamicTexture.context.font	= "bolder 30px Verdana";
    //dynamicTexture.texture.anisotropy = renderer.getMaxAnisotropy();
    //dynamicTexture.clear("blue");
    //dynamicTexture.drawText(txt, 30, 256, 'white');

    var nod_geometry = new THREE.SphereBufferGeometry( 100, 32, 16 );
    var node_material = new THREE.MeshLambertMaterial( { /*map	: dynamicTexture.texture,*/ transparent: true, opacity: 1.0/*, envMap: scene.background */} );

    var node = new THREE.Mesh( nod_geometry, node_material );
    node.castShadow = true;
    node.receiveShadow = true;
    node.position.x = x;
    node.position.y = y;
    node.position.z = z;
    scene.add( node );


}

function createLine(x1, y1, z1, x2, y2, z2){


    var line_material = new THREE.LineBasicMaterial({
                                       color: 0x5f00ff  ,linewidth: 5
                                   });

    var line_geometry = new THREE.Geometry();

    line_geometry.vertices.push(new THREE.Vector3(x1, y1, z1));
    line_geometry.vertices.push(new THREE.Vector3(x2, y2, z2));

    var edge = new THREE.Line(line_geometry, line_material);
    edge.position.multiplyScalar( 1);
    scene.add( edge );
}

    function setLight(){
        scene.add( new THREE.AmbientLight( 0x666666 ) );
        var light = new THREE.DirectionalLight( 0xdfebff, 1 );
        light.position.set( 50, 200, 100 );
        light.position.multiplyScalar( 1.3 );
        light.castShadow = true;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        var d = 300;
        light.shadow.camera.left = - d;
        light.shadow.camera.right = d;
        light.shadow.camera.top = d;
        light.shadow.camera.bottom = - d;
        light.shadow.camera.far = 1000;
        scene.add( light );
    }

    function setControls(){
        

        // Orbitcontrols
        controls = new OrbitControls( camera, renderer.domElement );
        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minDistance = 10;
        controls.maxDistance = 5000;
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function onDocumentMouseMove( event ) {
        mouseX = ( event.clientX - windowHalfX ) * 10;
        mouseY = ( event.clientY - windowHalfY ) * 10;
    }
                    //
    function animate() {
        requestAnimationFrame( animate );
        //controls.update();
        render();
    }

    function render() {

        renderer.render( scene, camera );
    }

</script>
