import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#fc0335",
  roughness: 0.3,
})

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const light = new THREE.PointLight(0xffff95, 1, 100)
light.position.set(10, 10, 10)
light.intensity = 1.25;
scene.add(light)

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 20
scene.add(camera)

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(3)
renderer.render(scene, camera)

const control = new OrbitControls(camera, canvas)
control.enableDamping = true
control.enablePan = false
control.enableZoom = false
control.autoRotate = true
control.autoRotateSpeed = 10


window.addEventListener("resize", () => {
  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width, sizes.height)
})


const loop = () => {
  control.update()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()

const tl = gsap.timeline({ defaults: { duration: 1 } })
tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 })
tl.fromTo("nav", { y: "-100%" }, { y: "0%" })
tl.fromTo(".title", { opacity: 0 }, { opacity: 1 })

let mouseDown = false;
let rgb = []

window.addEventListener("mousedown", () => {mouseDown = true})
window.addEventListener("mouseup", () => {mouseDown = false})

window.addEventListener("mousemove", (e) => {
  console.log("asdasd")
  if (mouseDown) {
    console.log(mouseDown)
    rgb = [
      Math.round((e.pageX / sizes.width) * 255),
      Math.round((e.pageY / sizes.height) * 255),
      200,
    ]

    let newColor = new THREE.Color(`rgb(${rgb.join(",")})`)
    gsap.to(mesh.material.color, {
      r: newColor.r,
      g: newColor.g,
      b: newColor.b,
    })
  }
})