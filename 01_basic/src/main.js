import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// console.log(THREE);
// console.log(OrbitControls);


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
// console.log(scene);

// Initialize the camera
const camera = new THREE.PerspectiveCamera(
  45, // FOV field of view
  window.innerWidth / window.innerHeight,
  0.1, // near clip plane
  200   // far clip plane
);

// Position the camera
camera.position.z = 5; // Position the camera at z = 5 units

// scene.add(camera);
// console.log(camera);

// Initialize the renderer
const canvas = document.querySelector("canvas.threejs");
// console.log(canvas);
const renderer = new THREE.WebGLRenderer({ canvas: canvas }); // Create a WebGL renderer and link it to the canvas element


// Set the size of the renderer
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.render(scene, camera); // Render the scene from the perspective of the camera


// Initialize the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true; // Enable damping for smoother camera movement
controls.autoRotate = true;  // Enable auto-rotation for a dynamic scene view

// The problem with calling render once is that the scene won't update dynamically.
// Instead, we need a continuous loop to re-render the scene every frame.

// const loop = () => {
//   console.log("Loop");
//   loop();

// }
// loop();

const renderLoop = function () {
  // console.log("Render Loop");
  controls.update(); // Update controls (required when damping is enabled)
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop) // Schedule the next frame

}

renderLoop();




