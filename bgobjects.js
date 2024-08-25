import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
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

//object
const fontloader = new FontLoader();

fontloader.load("fonts/Manrope Medium_Regular.json", (font) => {
  const textgeometry = new TextGeometry("Hello World", {
    font: font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 17,
    bevelEnabled: true,
    bevelThickness: 0.3,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 9,
  });
  const mesh = new THREE.MeshNormalMaterial();
  const text = new THREE.Mesh(textgeometry, mesh);
  textgeometry.center();
  scene.add(text);
});

///
// Heart Object
const heartX = -25;
const heartY = -25;
const heartShape = new THREE.Shape();
heartShape.moveTo(25 + heartX, 25 + heartY);
heartShape.bezierCurveTo(25 + heartX, 25 + heartY, 20 + heartX, 0 + heartY, 0 + heartX, 0 + heartY);
heartShape.bezierCurveTo(-30 + heartX, 0 + heartY, -30 + heartX, 35 + heartY, -30 + heartX, 35 + heartY);
heartShape.bezierCurveTo(-30 + heartX, 55 + heartY, -10 + heartX, 77 + heartY, 25 + heartX, 95 + heartY);
heartShape.bezierCurveTo(60 + heartX, 77 + heartY, 80 + heartX, 55 + heartY, 80 + heartX, 35 + heartY);
heartShape.bezierCurveTo(80 + heartX, 35 + heartY, 80 + heartX, 0 + heartY, 50 + heartX, 0 + heartY);
heartShape.bezierCurveTo(35 + heartX, 0 + heartY, 25 + heartX, 25 + heartY, 25 + heartX, 25 + heartY);

const extrudeSettings = {
 depth: 8,
 bevelEnabled: true,
 bevelSegments: 2,
 steps: 2,
 bevelSize: 1,
 bevelThickness: 1,
};

const materialRed = new THREE.MeshBasicMaterial({
 color: 0xffffff,
});

for (let i=0;i<=100;i++){

  const geometryHeart = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  const meshHeart = new THREE.Mesh(geometryHeart, materialRed);
  meshHeart.rotation.x=Math.PI
  meshHeart.position.x=(Math.random()-0.5)*20
  meshHeart.position.y=(Math.random()-0.5)*20
  meshHeart.position.z=(Math.random()-0.5)*20
  meshHeart.scale.set(0.01, 0.01, 0.01);
  // For Pumping 
  gsap.to(meshHeart.scale,{x:0.008,y:0.008,z:0.008,duration:1,repeat:-1})
  
  scene.add(meshHeart);
  
}


for (let i=0;i<=100;i++){

  const geometryHeart = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  const meshHeart = new THREE.Mesh(geometryHeart, materialRed);
  meshHeart.rotation.x=Math.PI
  meshHeart.position.x=(Math.random()-0.5)*20
  meshHeart.position.y=(Math.random()-0.5)*20
  meshHeart.position.z=(Math.random()-0.5)*20
  meshHeart.scale.set(0.03, 0.03, 0.03);
  // For Pumping 
  gsap.to(meshHeart.scale,{x:0.009,y:0.009,z:0.009,duration:1,repeat:-1})
  
  scene.add(meshHeart);
  
}








camera.position.z = 5;
const tick = () => {
  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};
tick();
