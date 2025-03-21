import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
// const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

// Create custom geometry using a Float32Array for vertices
const vertices = new Float32Array([
  0, 0, 0, // Vertex 1: (x, y, z)
  0, 2, 0, // Vertex 2: (x, y, z)
  2, 1, 0, // Vertex 3: (x, y, z)
]);

// Create a BufferAttribute from the vertices array
// Each vertex has 3 components (x, y, z), so the itemSize is 3
const bufferAttribute = new THREE.BufferAttribute(vertices, 3);

// Create a BufferGeometry and set the 'position' attribute
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', bufferAttribute);


const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });


// Create a mesh using the custom geometry and material
const cubeMesh = new THREE.Mesh(geometry, cubeMaterial);
// const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cubeMesh);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.autoRotate = true;

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render the scene
const renderloop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();