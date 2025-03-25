import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";

// initialize pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add textureLoader
const textureLoader = new THREE.TextureLoader();

// adding textures
const sunTexture = textureLoader.load("static/textures/2k_sun.jpg");
sunTexture.colorSpace = THREE.SRGBColorSpace
const mercuryTexture = textureLoader.load("static/textures/2k_mercury.jpg");
mercuryTexture.colorSpace = THREE.SRGBColorSpace
const venusTexture = textureLoader.load("static/textures/2k_venus_surface.jpg");
venusTexture.colorSpace = THREE.SRGBColorSpace
const earthTexture = textureLoader.load("static/textures/2k_earth_daymap.jpg");
earthTexture.colorSpace = THREE.SRGBColorSpace
const marsTexture = textureLoader.load("static/textures/2k_mars.jpg");
marsTexture.colorSpace = THREE.SRGBColorSpace
const moonTexture = textureLoader.load("static/textures/2k_moon.jpg");
moonTexture.colorSpace = THREE.SRGBColorSpace

// add materials
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});

// add stuff here
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// create a sun material
const sunMaterial = new THREE.MeshBasicMaterial(
  {
    map: sunTexture
  }
);
const sun = new THREE.Mesh(
  sphereGeometry,
  sunMaterial
);
sun.scale.setScalar(5);
scene.add(sun);

// !create an earth material
// const earthMaterial = new THREE.MeshBasicMaterial(
//   {
//     color: "blue",
//   }
// )
// const earth = new THREE.Mesh(
//   sphereGeometry,
//   earthMaterial
// );
// earth.position.x = 10;
// scene.add(earth);


// !create a moon material
// const moonMaterial = new THREE.MeshBasicMaterial(
//   {
//     color: "gray",
//   }
// )
// const moon = new THREE.Mesh(
//   sphereGeometry,
//   moonMaterial
// );
// moon.position.x = 4;
// moon.scale.setScalar(0.5);
// earth.add(moon);

// !initialize the planets in an array
const planets = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
];

const createPlanet = (planet) => {
  // create the mesh and add it to the scene
  const planetMesh = new THREE.Mesh(
    sphereGeometry,
    planet.material
  )
  planetMesh.scale.setScalar(planet.radius)
  planetMesh.position.x = planet.distance
  return planetMesh
}

const createMoon = (moon) => {
  // create the mesh and add it to the scene
  const moonMesh = new THREE.Mesh(
    sphereGeometry,
    moonMaterial
  )
  moonMesh.scale.setScalar(moon.radius)
  moonMesh.position.x = moon.distance
  return moonMesh
}


const planetMeshes = planets.map((planet) => {
  // console.log(planet);

  // !create the planet mesh
  // const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);
  // planetMesh.scale.setScalar(planet.radius);
  // planetMesh.position.x = planet.distance;

  const planetMesh = createPlanet(planet);
  // add the mesh to the scene
  scene.add(planetMesh);

  // loop through each moon and create the moon
  // console.log(planet.moons);
  planet.moons.forEach((moon) => {
    // console.log(moon);

    // !create the moon mesh 
    // const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    // moonMesh.scale.setScalar(moon.radius);
    // moonMesh.position.x = moon.distance;

    const moonMesh = createMoon(moon);
    planetMesh.add(moonMesh);
  })

  // add the moon to the planets
  return planetMesh;
})

// add lights
const ambientLight = new THREE.AmbientLight(
  0xffffff,
  0.3
)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(
  0xffffff,
  1000
)
scene.add(pointLight)

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

// !initialize a clock
// const clock = new THREE.Clock();

// how to access arrays in arrays
// console.log(planets[3].moons[1].speed);

// render loop
const renderloop = () => {
  // const elapsedTime = clock.getElapsedTime();

  // add animation here
  // !Earth rotation - rotates around its own axis
  // earth.rotation.y += 0.01; // Rotate 0.01 radians per frame (~0.57 degrees)
  // moon.rotation.y += 0.005;
  // !Planetary orbit - Earth revolves around sun in circular path
  // earth.position.x = Math.sin(elapsedTime) * 10; // X position based on sine wave
  // earth.position.z = Math.cos(elapsedTime) * 10; // Z position based on cosine wave
  // !Moon orbit - Moon revolves around Earth
  // moon.position.x = Math.sin(elapsedTime * 2) * 3; // Faster orbit (2x speed)
  // moon.position.z = Math.cos(elapsedTime * 2) * 3; // Smaller radius (3 units)

  // !Orbit around sun
  planetMeshes.forEach((planet, planetIndex) => {
    planet.rotation.y += planets[planetIndex].speed;
    // console.log(planets[planetIndex].speed);

    planet.position.x = Math.sin(planet.rotation.y) * planets[planetIndex].distance;
    planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance;
    // console.log(planet.position, planet.rotation);
    // console.log(planet.children);

    planet.children.forEach((moon, moonIndex) => {
      moon.rotation.y += planets[planetIndex].moons[moonIndex].speed
      moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
      moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
    })



  });


  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};


renderloop();