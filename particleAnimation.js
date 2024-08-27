import  * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { texture } from 'three/webgpu';
const renderer= new THREE.WebGLRenderer()
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

const texture= new THREE.TextureLoader()
const particle=texture.load()

const particleGeometry= new THREE.BufferGeometry()
const count=500
const position= new Float32Array(count*3)
for(let i=0;i<count *3 ;i++){
    position[i]=(Math.random()-0.5)*10
}
particleGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(position,3)
)

const particleMaterial=new THREE.PointsMaterial({size:0.02})
particleMaterial.sizeAttenuation=false
particleMaterial.color= new THREE.Color('#ff88cc')

const particle= new THREE.Points(particleGeometry,particleMaterial)

scene.add(particle)


camera.position.z = 5;


const tick = () => {
  
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();



