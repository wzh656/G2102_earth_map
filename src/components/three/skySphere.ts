import * as THREE from "three";
import starfield from "@/assets/data/starfield - 副本.jpg";

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(starfield);

const geometry = new THREE.SphereGeometry(100);
const material = new THREE.MeshBasicMaterial({
  map: texture,
  side: THREE.BackSide,
});
const sphere = new THREE.Mesh(geometry, material);

export default sphere;
