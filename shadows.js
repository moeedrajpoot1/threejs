import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;  // Enable shadow maps
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: softer shadows

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lights
const directional = new THREE.DirectionalLight(0xffffff, 1.5);
directional.position.set(2, 2, -1);
directional.castShadow = true; // Enable shadow casting for the light

// Shadow properties for the light
directional.shadow.mapSize.width = 1024;
directional.shadow.mapSize.height = 1024;
directional.shadow.camera.near = 0.5;
directional.shadow.camera.far = 10;
directional.shadow.camera.left = -5;
directional.shadow.camera.right = 5;
directional.shadow.camera.top = 5;
directional.shadow.camera.bottom = -5;

scene.add(directional);

// Material that interacts with lights
const material = new THREE.MeshStandardMaterial({ color: 0x0077ff });
material.roughness = 0.4;

// Sphere object
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = true; // Enable shadow casting for the sphere

// Plane object
const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), new THREE.MeshStandardMaterial({ color: 0xaaaaaa }));
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;
plane.receiveShadow = true; // Enable shadow receiving for the plane

scene.add(sphere, plane);

camera.position.z = 5;

const tick = () => {
    sphere.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();
