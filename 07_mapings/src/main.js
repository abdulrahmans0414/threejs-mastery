import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// Initialize the texture loader
// TextureLoader is used to load image files as textures
const textureLoader = new THREE.TextureLoader();

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);


// Load a texture from an image file
// The texture is loaded asynchronously, and once loaded, it can be applied to materials
// Load textures for PBR (Physically Based Rendering) material
const grassAlbedo = textureLoader.load("src/static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png"); // Base color texture
const grassAO = textureLoader.load("src/static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png"); // Ambient occlusion texture
const grassHeight = textureLoader.load("src/static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png"); // Height map texture
const grassMetallic = textureLoader.load("src/static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png"); // Metallic map texture
const grassNormal = textureLoader.load("src/static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png"); // Normal map texture
const grassRoughness = textureLoader.load("src/static/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png"); // Roughness map texture

// initialize the material
// const material = new THREE.MeshBasicMaterial();

// Initialize a MeshStandardMaterial for PBR rendering
const material = new THREE.MeshStandardMaterial();

// Assign textures to material properties
material.map = grassAlbedo; // Set the base color texture

material.roughnessMap = grassRoughness; // Set the roughness map texture
material.roughness = 0.1; // Adjust the base roughness value

material.metalnessMap = grassMetallic; // Set the metallic map texture
material.metalness = 0.8; // Adjust the base metalness value

// !Assign the normal map texture to the material
// Normal maps simulate surface details by perturbing the surface normals
material.normalMap = grassNormal;

// Adjust the normal map intensity using normalScale
// The x and y values control the strength of the effect in the U and V directions
material.normalScale.set(0.5, 0.5); // Reduce the intensity of the normal map effect

// !Assign the height map texture to the material
// Height maps (displacement maps) modify the geometry's vertices to create actual surface depth
material.displacementMap = grassHeight;

// Adjust the displacement scale to control the intensity of the height effect
// A higher value creates more pronounced displacement, while a lower value creates subtle depth
material.displacementScale = 0.05; // Set a subtle displacement effect


// Initialize a group to hold multiple meshes
// Groups allow you to transform multiple objects as a single unit
const group = new THREE.Group();

// initialize the mesh
const cube = new THREE.Mesh(geometry, material);

const knot = new THREE.Mesh(torusKnotGeometry, material);
knot.position.x = 1.5;

// Create a plane mesh with the textured material
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.5;


// Create a sphere mesh and assign geometry and material
const sphere = new THREE.Mesh();
sphere.geometry = sphereGeometry;
sphere.material = material;
sphere.position.y = 1.5;

// Create a cylinder mesh and assign geometry and material
const cylinder = new THREE.Mesh();
cylinder.geometry = cylinderGeometry;
cylinder.material = material;
cylinder.position.y = -1.5;


// Add all meshes to the group
group.add(cube, knot, plane, sphere, cylinder);

// Add the group to the scene
scene.add(group);

// initialize the light
const light = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(light);

const pointLight = new THREE.PointLight(0xffffff, 1.2);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  10000 // Far clipping plane
);
camera.position.z = 10;
camera.position.y = 5;

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


// Render loop for continuous animation
const renderloop = () => {

  // Rotate each child of the group
  // group.children.forEach((child) => {
  // console.log(children);
  // child.rotation.x += 0.01;
  // child.rotation.y += 0.01;

  // Check if the child is a Mesh (to avoid errors)
  //   if (child instanceof THREE.Mesh) {
  //     child.rotation.x += 0.01;
  //     child.rotation.y += 0.01;
  //   }
  // });

  // Update controls (e.g., OrbitControls)
  controls.update();

  // Render the scene
  renderer.render(scene, camera);

  // Request the next frame
  window.requestAnimationFrame(renderloop);
};

// Start the render loop
renderloop();