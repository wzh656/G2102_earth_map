import { PerspectiveCamera, Vector3 } from "three";

const fov = 75;
const aspect = innerWidth / innerHeight;
const near = 0.1;
const far = 1000;
const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, -2);
camera.lookAt(new Vector3(0, 0, 0));

export default camera;
