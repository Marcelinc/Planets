import * as THREE from 'three'

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff
})

const starVertices = []
for(let i =0; i<10000;i++){
    const x = (Math.random()-0.5) * 2000
    const y = (Math.random()-0.5) * 2000
    const z = -Math.random() * 2000
    starVertices.push(x,y,z)
}

console.log(starVertices)

starGeometry.setAttribute('position',new THREE.Float32BufferAttribute(starVertices,3))

export const stars = new THREE.Points(starGeometry,starMaterial)
