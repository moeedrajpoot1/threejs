import * as THREE from "three"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer=new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth,window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
document.body.appendChild(renderer.domElement)


const scene=new THREE.Scene()
const camera= new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,100)
const controls = new OrbitControls(camera,renderer.domElement)
controls.enableDamping=true



////
const geometry=new THREE.CapsuleGeometry(-1,2,2)
const material=new THREE.MeshBasicMaterial({color:'red'})

const object=new THREE.Mesh(geometry,material)

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