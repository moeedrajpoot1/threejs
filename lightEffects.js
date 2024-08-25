import * as THREE from "three"
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const renderer= new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
document.body.appendChild(renderer.domElement)


const scene= new THREE.Scene()
const camera= new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
// lights


const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 50);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Material

const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

  //objects 
  const sphere=new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
  sphere.position.x = -1.5;

  const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material);

  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 32, 64),
    material
  );
  torus.position.x = 1.5;


  const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;


scene.add(sphere, cube, torus, plane);
// Lights 
const ambiant=new THREE.AmbientLight("red",1)
scene.add(ambiant)
const directional= new THREE.DirectionalLight("blue",5)
scene.add(directional)
directional.position.set(1,0.25,0)

const Hemisphere= new THREE.HemisphereLight("green",'parrot',1)
scene.add(Hemisphere)

const point=new THREE.PointLight('purple',1.5,10,10)
scene.add(point)




const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  cube.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  cube.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();


