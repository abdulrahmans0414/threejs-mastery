import * as THREE from 'three';

// console.log(THREE);

// Initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial,
)

// console.log(cubeMesh);
// console.log(scene);

scene.add(cubeMesh);
console.log(scene);

// Initialize the camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);

// Position the camera
camera.position.z = 5;

// scene.add(camera);
// console.log(camera);

// Initialize the renderer
const canvas = document.querySelector("canvas.threejs");
// console.log(canvas);

const renderer = new THREE.WebGLRenderer({ canvas: canvas }); // Create a WebGL renderer and link it to the canvas element

// Set the size of the renderer
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera); // Render the scene from the perspective of the camera


