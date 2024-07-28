import * as THREE from "three";
import world from "@/assets/data/world_v3.jpg";

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(world);

const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);

export default sphere;
