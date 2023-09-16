import * as THREE from "three"

const geometry = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({
    //color: '#00ff83'
    map: new THREE.TextureLoader().load('earth.jpg')
})

const mesh = new THREE.Mesh(geometry,material)
mesh.rotateY += 1.5
const rotateEarth = () => {
    mesh.rotation.y += 0.005
}

export {mesh,rotateEarth}