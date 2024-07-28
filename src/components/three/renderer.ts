import { WebGLRenderer } from "three";

const renderer = new WebGLRenderer({
  antialias: true, //抗锯齿
  powerPreference: "high-performance", //使用高性能GPU
});
renderer.setSize(innerWidth, innerHeight);

window.addEventListener("resize", () => {
  renderer.setSize(innerWidth, innerHeight);
});

export default renderer;
