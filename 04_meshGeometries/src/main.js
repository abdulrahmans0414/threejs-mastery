import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();


// Add objects to the scene
// Different types of primitive geometries in Three.js 

// const geometry = new THREE.BoxGeometry(1, 1, 1);           // Width, height, depth
// const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);  // Width, height, depth, widthSegments, heightSegments, depthSegments
// const geometry = new THREE.SphereGeometry(1, 16, 16);      // Radius, widthSegments, heightSegments
// const geometry = new THREE.PlaneGeometry(1, 1, 2, 2);      // Width, height, widthSegments, heightSegments
// const geometry = new THREE.CylinderGeometry(1, 1, 1, 16);  // RadiusTop, radiusBottom, height, radialSegments
// const geometry = new THREE.IcosahedronGeometry(1, 1);      // Radius, detail
// const geometry = new THREE.TorusGeometry(1, 0.5, 16, 100); // Radius, tubeRadius, radialSegments, tubularSegments
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16); // Radius, tubeRadius, tubularSegments, radialSegments



// Create custom geometry using a Float32Array for vertices
// const vertices = new Float32Array([
//   0, 0, 0, // Vertex 1: (x, y, z)
//   0, 2, 0, // Vertex 2: (x, y, z)
//   2, 1, 0, // Vertex 3: (x, y, z)
// ]);

// Create a BufferAttribute from the vertices array
// Each vertex has 3 components (x, y, z), so the itemSize is 3
// const bufferAttribute = new THREE.BufferAttribute(vertices, 3);

// Create a BufferGeometry and set the 'position' attribute
// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', bufferAttribute);


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