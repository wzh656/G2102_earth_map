<script setup lang="ts">
import { Clock } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { onMounted, ref } from "vue";
import camera from "@/components/three/camera";
import scene from "@/components/three/scene";
import renderer from "@/components/three/renderer";
import sphere from "@/components/three/sphere";
import skySphere from "@/components/three/skySphere";

scene.add(skySphere);
scene.add(sphere);

/* 添加Canvas */
const mainElem = ref<HTMLElement | null>(null);
let controls: OrbitControls;
onMounted(() => {
  if (!mainElem.value) throw "Not";
  mainElem.value?.appendChild(renderer.domElement); //添加canvas元素
  controls = new OrbitControls(camera, mainElem.value); //控制器

  render(); //开始渲染循环
});

/* 渲染循环 */
//const clock = new Clock();
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);

  //const delta = clock.getDelta(); //单位: s
  if (!controls) return;
  controls.update();
  //console.log(delta);
}
</script>

<template>
  <main ref="mainElem"></main>
</template>

<style scoped>
canvas {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
