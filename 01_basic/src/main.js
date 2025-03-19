import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// console.log(THREE);
// console.log(OrbitControls);


// Initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true
});

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


const aspectRatio = window.innerWidth / window.innerHeight;

// Initialize the orthographic projection camera
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio, // left
//   1 * aspectRatio, // right
//   1, // top
//   -1, // bottom
//   0.1, // near
//   200 // far
// );


// Position the camera
camera.position.z = 5; // Position the camera at z = 5 units

// scene.add(camera);
// console.log(camera);

// Initialize the renderer
const canvas = document.querySelector("canvas.threejs");
// console.log(canvas);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
}); // Create a WebGL renderer and link it to the canvas element


// Set the size of the renderer
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.render(scene, camera); // Render the scene from the perspective of the camera

// console.log(window.devicePixelRatio);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // hide the aliasing


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


// Handle window resize events and no longer called every frame
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight; // Update the aspect ratio
  camera.updateProjectionMatrix(); // Update the camera's projection matrix  to reflect the camera's aspect ratio
  renderer.setSize(window.innerWidth, window.innerHeight); // Update the size of the renderer || resize
})


// render the scene
const renderLoop = function () {
  // console.log("Render Loop");

  controls.update(); // Update controls (required when damping is enabled)
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop) // Schedule the next frame

}

renderLoop();




