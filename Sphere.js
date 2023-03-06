import * as THREE from "three"

const geometry = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({
    //color: '#00ff83'
    map: new THREE.TextureLoader().load('earth.jpg')
})

export const mesh = new THREE.Mesh(geometry,material)