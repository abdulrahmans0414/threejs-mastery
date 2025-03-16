import * as THREE from 'three';

// console.log(THREE);

const scene = new THREE.Scene();

const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial,
)

// console.log(cubeMesh);
// console.log(scene);

scene.add(cubeMesh);
console.log(scene);



