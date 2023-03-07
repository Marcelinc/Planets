import * as THREE from 'three'

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    //emissive: 0xffffff
})

const starVertices = []
for(let i =0; i<20000;i++){
    const preX = (Math.random()-0.5) * 2000
    const preY = (Math.random()-0.5) * 2000
    const z = (Math.random()-0.5) * 2000
    var x = preX
    var y = preY
    if(Math.abs(z) < 100 || Math.abs(y) < 100){
        x = preX - 900
    }
        
    starVertices.push(x,y,z)
}

console.log(starVertices)

starGeometry.setAttribute('position',new THREE.Float32BufferAttribute(starVertices,3))

export const stars = new THREE.Points(starGeometry,starMaterial)
