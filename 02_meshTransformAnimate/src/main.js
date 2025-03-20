import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.y = -1;
cubeMesh.scale.setScalar(0.5);

const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh2.position.x = 2;

const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh3.position.x = -2;

// Create a group to hold all cube meshes
const group = new THREE.Group();
group.add(cubeMesh);
group.add(cubeMesh2);
group.add(cubeMesh3);
scene.add(group);

// Transform the entire group
group.position.y = 2;
group.scale.setScalar(2);
// scene.add(cubeMesh);

// Transform properties of the cubeMesh
// cubeMesh.position.y = 1;
// cubeMesh.position.x = 1;
// cubeMesh.position.z = -1;


// Position, scale, and rotation properties
// These properties are inherited from the parent Object3D class
// Changes here affect the cubeMesh's transformation in the scene


// THREE.Vector3 represents a 3D vector (x, y, z) with useful methods
// Common methods include .add(), .addScalar(), .copy(), distanceTo(), etc.
// Example: Create a temporary vector for calculations

// const tempVector = new THREE.Vector3(0, 1, 0);
// cubeMesh.position.copy(tempVector);

// Transform scale properties of cubeMesh ->
// console.log(cubeMesh.scale);
// cubeMesh.scale.x = 2;
// cubeMesh.scale.y = 2;
// cubeMesh.scale.z = 2;
// cubeMesh.scale.set(2, 2, 1);


const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);



// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  200
);
camera.position.z = 5;

// distanceTo() this method called after the camera has been initialized
// console.log(cubeMesh.position.distanceTo(camera.position));


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