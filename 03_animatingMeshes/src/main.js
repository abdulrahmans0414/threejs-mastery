import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// initialize the scene
const scene = new THREE.Scene();

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red", wireframe: true });
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

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

// initialize the clock
const clock = new THREE.Clock();
let previousTime = 0;

// render the scene
const renderloop = () => {
  const currentTime = clock.getElapsedTime();
  const delta = currentTime - previousTime;
  previousTime = currentTime;

  // the delta (time between frames)
  // console.log(delta);

  // Rotate cubeMesh around the Y-axis
  // delta ensures smooth animation regardless of frame rate
  cubeMesh.rotation.y += THREE.MathUtils.degToRad(1) * delta * 20; // Rotate 1 degree per frame, scaled by delta and a speed factor

  // Other Animation
  // cubeMesh.position.x += 0.1 * delta * 2;
  // cubeMesh.scale.x += 0.1 * delta * 2;

  // Another type of animation using a sine wave for smooth oscillations
  // console.log(Math.sin(currentTime)); // generates a value between -1 and 1

  // Scale cubeMesh along the X-axis using a sine wave
  // The sine wave is multiplied by 20 and offset by 2 for a larger range
  // cubeMesh.scale.x = (Math.sin(currentTime)) * 20 + 1;

  // Smaller sine wave animation for cubeMesh.scale.x
  // Reduce the amplitude (multiplier) for a smaller effect
  cubeMesh.scale.x = Math.sin(currentTime) * 0.5 + 1; // Amplitude of 0.5, offset by 1

  // Move cubeMesh along the X-axis using a sine wave
  // The sine wave is offset by 2 to keep the movement within a specific range
  cubeMesh.position.x = (Math.sin(currentTime)) + 2;



  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();