import * as THREE from 'three'
import gsap from 'gsap'
import {mesh, rotateEarth} from './celestialModels/Sphere'
import { stars } from './celestialModels/Stars'
import { moonMesh } from './celestialModels/Moon'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { marsMesh, rotateMars } from './celestialModels/Mars'
import { jupiterMesh, rotateJupiter } from './celestialModels/Jupiter'
import {createDescription, updateDescription} from './description'
import { celestialBodies } from './celestialsData'
import { canvas, celestialContainer, descriptionContainer, explore, nextButton } from './selectors'


const scene = new THREE.Scene()
const light = new THREE.PointLight(0xffffff,1.5,30000)
const SIZES = {
    width: window.innerWidth,
    height: window.innerHeight
}
const camera = new THREE.PerspectiveCamera(
    45,
    SIZES.width/SIZES.height,
    0.1,
    1000
)
const renderer = new THREE.WebGLRenderer({canvas,antialias: true},)
const controls = new OrbitControls(camera,canvas)

var currentIndex = 0;
export var currentCelestial = celestialBodies[currentIndex];

//init scene
export const initScene = () => {
    //Scene - add objects
    scene.add(mesh)
    scene.add(stars)
    scene.add(moonMesh)
    scene.add(marsMesh)
    scene.add(jupiterMesh)

    //Set Light
    light.position.set(25,20,20)
    scene.add(light)

    //Set Camera
    camera.position.z = 20
    camera.lookAt(moonMesh.position)
    scene.add(camera)

    //Set Renderer
    renderer.setSize(SIZES.width,SIZES.height)
    renderer.setPixelRatio(2)
    renderer.render(scene,camera)


    //Set Controls
    controls.enableDamping = true
    controls.enablePan = false
    controls.enableZoom = true
    //controls.autoRotate = true
    //controls.autoRotateSpeed = 3

    //Set resizing
    window.addEventListener('resize',() => {
        //Update sizes
        SIZES.width = window.innerWidth
        SIZES.height = window.innerHeight

        //Update Camera
        camera.aspect = SIZES.width / SIZES.height
        camera.updateProjectionMatrix()
        renderer.setSize(SIZES.width,SIZES.height)
    })

    //Timeline - scale Earth
    const t1 = gsap.timeline({defaults: {duration: 1}});
    t1.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1});
    const t2 = gsap.timeline({defaults: {duration: 1}});
    t2.fromTo(moonMesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1});

    //create description
    createDescription(currentCelestial)


    //updating scene
    const loop = () => { 
        controls.update()
        renderer.render(scene,camera)
        window.requestAnimationFrame(loop)
        rotateEarth()
        rotateMars()
        rotateJupiter()
    }
    loop()
}

//move to celestial position
export const addCameraMovement = () => {
    if(nextButton){
        nextButton.addEventListener('click',() => {
            //change text
            if(currentIndex != celestialBodies.length-1){
                currentIndex +=1;
            } else{
                currentIndex = 0;
            }
            //set current celestial body
            currentCelestial = celestialBodies[currentIndex];
            celestialContainer.innerHTML = currentCelestial.name;
            updateDescription(currentCelestial);


            //change camera position
            gsap.to(camera.position,{
                duration: 3,
                x: moonMesh.position.x,
                y: moonMesh.position.y,
                //z: moonMesh.position.z+10,
                onUpdate: () => {  
                    if(currentCelestial.name === 'Earth')
                        controls.target = new THREE.Vector3(mesh.position.x,mesh.position.y,mesh.position.z)
                    else if(currentCelestial.name === 'Moon'){
                        controls.target = new THREE.Vector3(moonMesh.position.x,moonMesh.position.y,moonMesh.position.z)
                        camera.position.set(moonMesh.position.x-10,moonMesh.position.y,moonMesh.position.z);
                    }
                    else if(currentCelestial.name === 'Mars'){
                        controls.target = new THREE.Vector3(marsMesh.position.x,marsMesh.position.y,marsMesh.position.z)
                        camera.position.set(marsMesh.position.x-20,marsMesh.position.y,marsMesh.position.z-20);
                    }   
                    else if(currentCelestial.name === 'Jupiter'){
                        controls.target = new THREE.Vector3(jupiterMesh.position.x,jupiterMesh.position.y,jupiterMesh.position.z)
                        camera.position.set(jupiterMesh.position.x-40,jupiterMesh.position.y,jupiterMesh.position.z);
                    }
                }
            })    
        })
    }
}

//add listeners to scene's elements
export const addListeners = () => {
    if(descriptionContainer && explore){
        explore.addEventListener('click',() => {
            createDescription(currentCelestial);
        })
    }
}