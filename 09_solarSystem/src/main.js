import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";

// initialize pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add stuff here
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// create a sun material
const sunMaterial = new THREE.MeshBasicMaterial(
  {
    color: "yellow",
  }
);
const sun = new THREE.Mesh(
  sphereGeometry,
  sunMaterial
);
sun.scale.setScalar(5);
scene.add(sun);

// create an earth material
const earthMaterial = new THREE.MeshBasicMaterial(
  {
    color: "blue",
  }
)
const earth = new THREE.Mesh(
  sphereGeometry,
  earthMaterial
);
earth.position.x = 10;
scene.add(earth);


// create a moon material
const moonMaterial = new THREE.MeshBasicMaterial(
  {
    color: "gray",
  }
)
const moon = new THREE.Mesh(
  sphereGeometry,
  moonMaterial
);
moon.position.x = 4;
moon.scale.setScalar(0.5);
earth.add(moon);


// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 100;
camera.position.y = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// initialize a clock
const clock = new THREE.Clock();

// render loop
const renderloop = () => {

  const elapsedTime = clock.getElapsedTime();

  // add animation here
  // Earth rotation - rotates around its own axis
  earth.rotation.y += 0.01; // Rotate 0.01 radians per frame (~0.57 degrees)

  // moon.rotation.y += 0.005;

  // Planetary orbit - Earth revolves around sun in circular path
  earth.position.x = Math.sin(elapsedTime) * 10; // X position based on sine wave
  earth.position.z = Math.cos(elapsedTime) * 10; // Z position based on cosine wave

  // Moon orbit - Moon revolves around Earth
  moon.position.x = Math.sin(elapsedTime * 2) * 3; // Faster orbit (2x speed)
  moon.position.z = Math.cos(elapsedTime * 2) * 3; // Smaller radius (3 units)



  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};


renderloop();