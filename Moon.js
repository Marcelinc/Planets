import * as THREE from "three"

const geometry = new THREE.SphereGeometry(1.5,64,64)
//geometry.setAttribute('position',new THREE.Float32BufferAttribute([0,0,-1],3))
const material = new THREE.MeshStandardMaterial({
    //color: '#00ff83'
    map: new THREE.TextureLoader().load('moon.jpg')
})

const moonMesh = new THREE.Mesh(geometry,material)
moonMesh.position.x = 10
moonMesh.position.y = 10
moonMesh.position.z = -100

export {moonMesh}