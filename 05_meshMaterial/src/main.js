import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const planeGeometry = new THREE.PlaneGeometry(1, 1);


// initialize the material
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  // transparent: true,
  // opacity: 0.5,
});

// Alternative way to set material color
// material.color.set(0x00ff00); // Using Color.set() method
material.color = new THREE.Color(0x00ff00);

// Set material properties
material.side = THREE.DoubleSide; // Render both sides of the geometry
// material.side = THREE.FrontSide; // Render only the front side (default)
material.fog = true; // Enable fog effect for this material


// Add fog to the scene
// THREE.Fog creates a linear fog effect
const fog = new THREE.Fog(0xffffff, 1, 10); // Color = white, near = 1, far = 10
scene.fog = fog;

// Set the scene background color
scene.background = new THREE.Color(0xffffff); // Set background color to white


// initialize the mesh
const mesh = new THREE.Mesh(geometry, material);

const mesh2 = new THREE.Mesh(geometry, material); // Create a second cube mesh
mesh2.position.x = 1.5; // Position the second cube on the X-axis

const plane = new THREE.Mesh(planeGeometry, material); // Create a plane mesh
plane.position.x = -1.5; // Position the plane on the X-axis
// Note: The plane disappears if material.side is not set to THREE.DoubleSide


// Add meshes to the scene
scene.add(mesh);
scene.add(mesh2);
scene.add(plane);


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