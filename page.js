import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap'

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


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
// Add an ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

// Add a directional light for better visualization
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const right = new THREE.Mesh(new THREE.PlaneGeometry(windowWidth/2,windowHeight/2), new THREE.MeshStandardMaterial({ color: 0xaaaaaa }));
right.rotation.x = 0.02;

right.position.set(windowWidth / 4, 0, 0);
scene.add( right);

const leftGeometry = new THREE.PlaneGeometry(windowWidth / 2, windowHeight);
const leftMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 }); // Different color for distinction
const left = new THREE.Mesh(leftGeometry, leftMaterial);

// Position the left plane so it covers the left half of the window
left.rotation.x = 0.02;
left.position.set(-windowWidth / 4, 0, 0);

// Add the left plane to the scene
scene.add(left);
gsap.to(right.position, {
    x: windowWidth / 2, // Move to the right edge
    duration: 8,
    ease: "power2.inOut"
});

gsap.to(left.position, {
    x: -windowWidth / 2, // Move to the left edge
    duration: 8,
    ease: "power2.inOut"
});



camera.position.z = 5






const tick = () => {
    
    
    // Calculate positions
    
    
    // Update positions
    right.position.x += 0.02
    left.position.x -= 0.02


    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();