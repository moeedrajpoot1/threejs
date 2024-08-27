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

//        Texture

const textureLoader=new THREE.TextureLoader()
const doorTexture=textureLoader.load('images/R-removebg-preview.png')

const walltexture=textureLoader.load('images/bricks.jpg')
const roadTexture=textureLoader.load('images/road1.png')
//
doorTexture.colorSpace=THREE.SRGBColorSpace
walltexture.colorSpace=THREE.SRGBColorSpace
roadTexture.colorSpace=THREE.SRGBColorSpace
/// HOUSE /////////
const groupHouse=new THREE.Group()
scene.add(groupHouse)
const wall=new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,2),
    new THREE.MeshStandardMaterial({map:walltexture,metalness:0.7}))
wall.position.y=1.5
groupHouse.add(wall)


const roof=new THREE.Mesh(
    new THREE.ConeGeometry(4,2,4),
    new THREE.MeshStandardMaterial()
)
roof.position.y=3.5
roof.rotation.y=Math.PI/4
groupHouse.add(roof)

/// Door
const door= new THREE.Mesh(
    new THREE.PlaneGeometry(1.8,1.8),
    new THREE.MeshStandardMaterial({map:doorTexture,roughness:0.3,metalness:0.4})

)
door.position.z=1.01
door.position.y=1.13
groupHouse.add(door)











const plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20), new THREE.MeshStandardMaterial({ color: 0xaaaaaa }));
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add( plane);

// Road 
const road = new THREE.Mesh(
    new THREE.PlaneGeometry(20,4),
    new THREE.MeshStandardMaterial({map:roadTexture})
)
road.rotation.x=-Math.PI/2
road.position.z=7
scene.add(road)


// Car 
const groupCar=new THREE.Group() 
scene.add(groupCar)
groupCar.position.z=7
groupCar.position.x=-9
const wheelBack= new THREE.Mesh(
new THREE.BoxGeometry(2,0.5,0.5),
new THREE.MeshBasicMaterial({color:'black'})
)

wheelBack.rotation.y=Math.PI/2
wheelBack.position.y=0.25
groupCar.add(wheelBack)



const wheelFront= new THREE.Mesh(
    new THREE.BoxGeometry(2,0.5,0.5),
    new THREE.MeshBasicMaterial({color:'black'})
    )
    wheelFront.position.x=2
    wheelFront.rotation.y=Math.PI/2
    wheelFront.position.y=0.25
    groupCar.add(wheelFront)




const main=new THREE.Mesh(
    new THREE.BoxGeometry(1.8,1.5,3.5),
    new THREE.MeshStandardMaterial({color:'red'})
)


main.position.y=1
main.rotation.y=Math.PI/2
main.position.x=1
groupCar.add(main)

const cabin =new THREE.Mesh(
    new THREE.BoxGeometry(1.3,1,2),
    new THREE.MeshStandardMaterial()
)
cabin.position.y=2
cabin.rotation.y=Math.PI/2
groupCar.add(cabin)


gsap.to(groupCar.position,{x:8,duration:5,repeat:-1
})
// TREEEEEEEEEE

const groupTree= new THREE.Group()
groupTree.position.set(-6,0,3)
scene.add(groupTree)


const wood= new THREE.Mesh(
    new THREE.BoxGeometry(0.2,3,0.2),
    new THREE.MeshStandardMaterial({color:'brown'})
)
wood.position.y=1.5
groupTree.add(wood)

const branch1= new THREE.Mesh(
    new THREE.ConeGeometry(1.2,1,5),
    new THREE.MeshStandardMaterial({color:"green"})
)
branch1.position.y=2
groupTree.add(branch1)

const branch2= new THREE.Mesh(
    new THREE.ConeGeometry(1.2,1.3,7),
    new THREE.MeshStandardMaterial({color:"green"})
)
branch2.position.y=3
groupTree.add(branch2)

const branch3= new THREE.Mesh(
    new THREE.ConeGeometry(1,1.3,9),
    new THREE.MeshStandardMaterial({color:"green"})
)
branch3.position.y=1
groupTree.add(branch3)



camera.position.z = 5;

const tick = () => {
  
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();
