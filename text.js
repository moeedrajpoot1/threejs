import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import txt from './fonts/Manrope Medium_Regular.json'
console.log(txt)

const renderer= new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
document.body.appendChild(renderer.domElement)


const scene= new THREE.Scene()
const camera= new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,100)
const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping=true

const geometry= new THREE.BoxGeometry(1,1,1,1)
const material=new THREE.MeshBasicMaterial({color:'red'})

const object= new THREE.Mesh(geometry,material)
///////// font 
const fontloader = new FontLoader();
fontloader.load('fonts/Manrope Medium_Regular.json',(font)=>{
    const textgeometry=new TextGeometry('Hello World InshaAllah i will be a developer',{
font: font,
		size: 0.5,
		depth: 0.2,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0.3,
		bevelSize: 0.03,
		bevelOffset: 0,
		bevelSegments: 5


    })
    const textMaterial=new THREE.MeshBasicMaterial()
}

)




scene.add(object)
camera.position.z = 5;

const tick=()=>{
   
    // cube.rotation.x += 0.01
    object.rotation.y += 0.01
 controls.update()
	renderer.render( scene, camera );

    window.requestAnimationFrame(tick)
}
tick()