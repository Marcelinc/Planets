import * as THREE from 'three'
import {mesh} from './Sphere'
import { stars } from './Stars'
import { moonMesh } from './Moon'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

//Scene
const scene = new THREE.Scene()
scene.add(mesh)
scene.add(stars)
scene.add(moonMesh)


//Light
const light = new THREE.PointLight(0xffffff,1.5,30000)
light.position.set(25,20,20)
scene.add(light)

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

//Camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width/sizes.height,
  0.1,
  1000
)
camera.position.z = 20
scene.add(camera)


//Renderer
const canvas = document.querySelector('.content')
const renderer = new THREE.WebGLRenderer({canvas,antialias: true},)
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene,camera)


//Controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.enablePan = false
//controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 3


//Resize
window.addEventListener('resize',() => {
  //Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  //Update Camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width,sizes.height)
})

const loop = () => { 
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()


//Timeline - scale Earth
const t1 = gsap.timeline({defaults: {duration: 1}})
t1.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})

//Timeline - move camera to Moon
/*const t2 = gsap.timeline({defaults: {duration: 1}})

const next = document.querySelector('#next')
if(next){
  next.addEventListener('click',() => {
    t2.fromTo(camera.translateZ,{x:0,y:0,z:20},{x:0,y:0,z:-80})
  })
}*/