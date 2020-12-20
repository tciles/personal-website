import { Scene, PerspectiveCamera, WebGLRenderer, BoxBufferGeometry, MeshBasicMaterial, Mesh } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { VertexNormalsHelper } from 'three/examples/jsm/helpers/VertexNormalsHelper.js';

import "./index.scss";

const container = document.createElement("div");
document.body.appendChild(container);

const camera = new PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 500;

const scene = new Scene(); 

const renderer = new WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement );

const render = () => {
    renderer.render( scene, camera );
}

const animate = () => {
    requestAnimationFrame( animate );
    render(); 
}

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

const createCube = (parameters) => {
    const material = new MeshBasicMaterial( parameters );
    const geometry = new BoxBufferGeometry( 200, 200, 200, 2, 2, 2 );    
    const mesh = new Mesh(geometry, material);

    return mesh;
}

const addVertexNormalsHelper = (mesh) => {
    const vertexNormalsHelper = new VertexNormalsHelper( mesh, 10 );
    mesh.add( vertexNormalsHelper );
}


window.addEventListener( 'resize', onWindowResize, false );

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableZoom = true;

const mesh = createCube({ color: 0xfefefe, wireframe: true, opacity: 0.5 });
scene.add( mesh );

addVertexNormalsHelper(mesh);

animate();