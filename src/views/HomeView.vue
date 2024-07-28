<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import * as Echarts from "echarts";
import "echarts-gl";
import worldImg from "@/assets/data/world.jpg";
import starfieldImg from "@/assets/data/starfield.jpg";

const bgElem = ref<HTMLElement | null>(null);

function initBackground() {
  const chart = Echarts.init(bgElem.value);
  const option = {
    backgroundColor: "#000",
    globe: {
      baseTexture: worldImg,
      heightTexture: worldImg,
      displacementScale: 0.04,
      shading: "realistic",
      environment: starfieldImg,
      realisticMaterial: {
        roughness: 0.9,
      },
      postEffect: {
        enable: true,
      },
      light: {
        main: {
          intensity: 5,
          shadow: true,
        },
        /* ambientCubemap: {
          texture: "/pisa.hdr",
          diffuseIntensity: 0.2,
        }, */
      },
    },
  };
  chart.setOption(option);
  console.log("load", bgElem, chart);

  /* 自适应大小改变 */
  window.addEventListener("resize", function () {
    chart.resize();
  });
}

//onMounted(initBackground);
</script>

<template>
  <main>
    <div id="bgChart" ref="bgElem"></div>
    <section>
      <h1>G2102蹭饭图</h1>
      <RouterLink to="./map">前往</RouterLink>
    </section>
  </main>
</template>

<style scoped>
#bgChart {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

section {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

section > h1 {
  margin: 0 auto;
  font-size: 5vmax;
  font-weight: bold;
  letter-spacing: 0.5em;
  padding-left: 0.5em;

  text-shadow:
    1px 1px gray,
    0 0 5px yellow,
    0 0 15px yellow,
    0 0 50px white;
}

section > a {
  display: block;
  border: none;
  background: none;
  color: white;
  text-decoration: none;
  letter-spacing: 0.5em;

  margin: 0 auto;
  padding-left: 0.5em;
  border-radius: 100vw;
  font-size: 3em;

  text-shadow:
    1px 1px 1px gray,
    0 0 5px purple,
    0 0 15px purple;
  transition: backdrop-filter 0.5s;
}

section > a:hover {
  backdrop-filter: blur(10px);
}
</style>
