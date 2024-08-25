import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui'
const gui= new GUI()
const renderer=new THREE.WebGLRenderer()


renderer.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(renderer.domElement)



const scene=new THREE.Scene()
const camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,100)
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping=true
// object
// const geometry=new THREE.BoxGeometry(1,1,1,2,2,2)


const textureLoader= new THREE.TextureLoader()
const color=textureLoader.load('/images/t.jpg')


const geometry=new THREE.CapsuleGeometry(-1,8,0,5)

// Materials 
const material = new THREE.MeshBasicMaterial({map:color,wireframe:true});
material.metalness=0.7
material.roughness=0.2




const cube = new THREE.Mesh( geometry, material );
scene.add( cube );
gui.add(cube.position,'y')






camera.position.z = 5;

function animate() {


  

	renderer.render( scene, camera );

}
renderer.setAnimationLoop( animate );


const tick=()=>{
   
    // cube.rotation.x += 0.01
    cube.rotation.y += 0.01
 controls.update()
	renderer.render( scene, camera );

    window.requestAnimationFrame(tick)
}
tick()