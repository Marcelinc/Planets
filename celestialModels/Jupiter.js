import * as THREE from 'three'

const geometry = new THREE.SphereGeometry(5,64,64)

const material = new THREE.MeshBasicMaterial({
    map: new THREE.TextureLoader().load('./jupiter.jpg')
})

const jupiterMesh = new THREE.Mesh(geometry,material)
jupiterMesh.position.x = 950
jupiterMesh.position.y = 20

const rotateJupiter = () => {
    jupiterMesh.rotation.y += 0.010
}

export {jupiterMesh,rotateJupiter}