import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);


// !initialize the material -> non environment reacting material
// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ff00,
// transparent: true,
// opacity: 0.5,
// });


// !initialize the material -> environment reacting material
// const material = new THREE.MeshLambertMaterial();

// Alternative way to set material color
// material.color.set(0x00ff00); 
// material.color = new THREE.Color(0x00ff00);

// Set material properties
// material.side = THREE.DoubleSide; 
// material.side = THREE.FrontSide; 
// material.fog = true; 

// Add fog to the scene
// THREE.Fog creates a linear fog effect
// const fog = new THREE.Fog(0xffffff, 1, 10); 
// scene.fog = fog;

// Set the scene background color
// scene.background = new THREE.Color(0xffffff); 


// !Initialize a MeshPhongMaterial
// MeshPhongMaterial is used for shiny, reflective surfaces
// const material = new THREE.MeshPhongMaterial({
//   color: 0x00ff00,
//   specular: 0xffffff, // The color of the specular reflection of the material

// });

// Set the shininess of the material
// Shininess controls the size and intensity of the specular highlight
// material.shininess = 90;

// Add shininess control to the Tweakpane UI
// This allows real-time adjustment of the shininess property
// pane.addBinding(material, 'shininess', {
//   min: 0,
//   max: 100,
//   step: 1,
// });


// !Initialize a MeshStandardMaterial
// MeshStandardMaterial is a physically-based rendering (PBR) material
// It uses metalness and roughness properties for realistic lighting
const material = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
})

// Add metalness control to the Tweakpane UI
// Metalness determines how "metal-like" the surface appears (0 = non-metal, 1 = metal)
pane.addBinding(material, 'metalness', {
  min: 0,
  max: 1,
  step: 0.1,
});

// Add roughness control to the Tweakpane UI
// Roughness determines how rough or smooth the surface appears (0 = smooth, 1 = rough)
pane.addBinding(material, 'roughness', {
  min: 0,
  max: 1,
  step: 0.1,
});





// initialize the mesh
const mesh = new THREE.Mesh(geometry, material);

const mesh2 = new THREE.Mesh(torusKnotGeometry, material); // Create a second cube mesh
mesh2.position.x = 1.5; // Position the second cube on the X-axis

const plane = new THREE.Mesh(planeGeometry, material); // Create a plane mesh
plane.position.x = -1.5; // Position the plane on the X-axis
// Note: The plane disappears if material.side is not set to THREE.DoubleSide


// Add meshes to the scene
scene.add(mesh);
scene.add(mesh2);
scene.add(plane);


// !initialize the light
const light = new THREE.AmbientLight(0xffffff, 0.4);
// light.position.set(1, 1, 1);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 0.9);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

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