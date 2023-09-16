import * as THREE from 'three'

const geometry = new THREE.SphereGeometry(2.5,64,64)
const material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('./mars.jpg')
})

const marsMesh = new THREE.Mesh(geometry,material)
marsMesh.position.x = 320
marsMesh.position.y = 10


const rotateMars = () => {
    marsMesh.rotation.y += 0.005
}

export {marsMesh,rotateMars}