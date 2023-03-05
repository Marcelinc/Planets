import * as THREE from 'three'
import {mesh} from './Sphere'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

//Scene
const scene = new THREE.Scene()
scene.add(mesh)

//Light
const light = new THREE.PointLight(0xffffff,1,100)
light.position.set(10,10,10)
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
  100
)
camera.position.z = 20
scene.add(camera)


//Renderer
const canvas = document.querySelector('.content')
const renderer = new THREE.WebGLRenderer({canvas})
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


//Timeline
const t1 = gsap.timeline({defaults: {duration: 1}})
t1.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})