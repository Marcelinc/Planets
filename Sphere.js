import * as THREE from "three"

const geometry = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({
    color: '#00ff83'
})

export const mesh = new THREE.Mesh(geometry,material)