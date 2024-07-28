<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as Echarts from "echarts";
import data from "@/assets/data/map-data";

const chartElem = ref<HTMLElement | null>(null);

interface PeopleData {
  name: string;
  value: number[];
}

const people = {
  北京市: 2,
  广东省: 1,
  海南省: 2,
  河北省: 2,
  河南省: 1,
  湖北省: 2,
  吉林省: 1,
  江苏省: 5,
  江西省: 14,
  山东省: 2,
  陕西省: 2,
  上海市: 3,
  天津市: 2,
  香港特别行政区: 1,
  浙江省: 3,
  重庆市: 2,
};
const peopleData: PeopleData[] = [];
for (const feature of data.features) {
  const name = feature.properties.name;
  peopleData.push({
    name,
    value: [...feature.properties.center, people[name] ?? 0],
  });
}

function initMap() {
  const chart = Echarts.init(chartElem.value);
  const options = {
    title: {
      text: "G2102 蹭饭图",
    },
    legend: {
      // Try 'horizontal'
      orient: "vertical",
      right: 10,
      top: "center",
    },
    // 背景颜色
    backgroundColor: "#404a59",
    // 提示浮窗样式
    tooltip: {
      show: true,
      trigger: "item",
      alwaysShowContent: false,
      backgroundColor: "#0C121C",
      borderColor: "rgba(0, 0, 0, 0.16);",
      hideDelay: 100,
      triggerOn: "mousemove",
      enterable: true,
      textStyle: {
        color: "#DADADA",
        fontSize: "12",
        width: 20,
        height: 30,
        overflow: "break",
      },
      showDelay: 100,
      formatter(params) {
        return `${params.name} (${people[params.name] ?? 0})`;
      },
    },
    // 地图配置
    geo: {
      map: "china",
      label: {
        // 通常状态下的样式
        normal: {
          //show: true,
          textStyle: {
            color: "#fff",
          },
        },
        // 鼠标放上去的样式
        emphasis: {
          show: true,
          textStyle: {
            color: "#fff",
          },
        },
      },
      // 地图区域的样式设置
      itemStyle: {
        normal: {
          borderColor: "rgba(147, 235, 248, 1)",
          borderWidth: 1,
          areaColor: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.8,
            colorStops: [
              {
                offset: 0,
                color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
              },
            ],
            globalCoord: false, // 缺省为 false
          },
          shadowColor: "rgba(128, 217, 248, 1)",
          shadowOffsetX: -2,
          shadowOffsetY: 2,
          shadowBlur: 10,
        },
        // 鼠标放上去高亮的样式
        emphasis: {
          areaColor: "#389BB7",
          borderWidth: 0,
        },
      },
    },
    // 数据渲染
    series: [
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        effectType: "ripple",
        showEffectOn: "render",
        rippleEffect: {
          period: 5,
          scale: 5,
          brushType: "fill",
        },

        hoverAnimation: true,
        itemStyle: {
          normal: {
            color: "rgba(255, 235, 59, .7)",
            shadowBlur: 5,
            shadowColor: "#333",
          },
        },
        zlevel: 1,
        data: peopleData.filter((v) => v.value[2] > 0),
        label: {
          show: true,
          formatter(value) {
            return value.data.value[2];
          },
          color: "#fff",
        },
      },
      /* {
        type: "map",
        data: peopleData.filter((v) => v.value[2] > 0),
        map: "china",
        label: {
          // 通常状态下的样式
          normal: {
            //show: true,
            textStyle: {
              color: "#fff",
            },
          },
          // 鼠标放上去的样式
          emphasis: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
        },
        // 地图区域的样式设置
        itemStyle: {
          normal: {
            borderColor: "rgba(147, 235, 248, 1)",
            borderWidth: 1,
            areaColor: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(147, 235, 248, 0)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(147, 235, 248, .2)", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
            shadowColor: "rgba(128, 217, 248, 1)",
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10,
          },
          // 鼠标放上去高亮的样式
          emphasis: {
            areaColor: "#389BB7",
            borderWidth: 0,
          },
        },
      }, */
    ],
    // 左上方标题
    graphic: {
      type: "group",
      rotation: Math.PI / 4,
      bounding: "raw",
      left: 110,
      top: 110,
      z: 100,
      children: [
        {
          type: "rect",
          left: "center",
          top: "center",
          z: 100,
          shape: {
            width: 400,
            height: 50,
          },
          style: {
            fill: "rgba(0,0,0,0.3)",
          },
        },
        {
          type: "text",
          left: "center",
          top: "center",
          z: 100,
          style: {
            fill: "#ddd",
            text: "G 2 1 0 2 蹭 饭 图",
            font: 'bolder 1.5rem "Microsoft YaHei", sans-serif',
          },
        },
      ],
    },
    // 数据渲染
    visualMap: {
      // 是否展示左下角，即是是false，也仅是不显示，不影响数据的映射
      show: true,
      // 上下端文字
      text: ["高", "低"],
      // 最小值和最大值，必须指定
      min: 0,
      max: 11,
      // 位置
      left: "10%",
      bottom: "10%",
      // 是否展示滑块
      calculable: true,
      // 指定映射的数据，对应的是option.series，这里根据自己的实际需要进行配置
      seriesIndex: [0],
      // 从下到上的颜色
      inRange: {
        color: ["#00467F", "#A5CC82"],
      },
      //字体颜色
      textStyle: {
        color: "#fff",
        map: "china",
      },
    },
  };
  // 地图注册，第一个参数的名字必须和option.geo.map一致
  // @ts-ignore
  Echarts.registerMap("china", data);

  chart.setOption(options);

  /* 自适应大小改变 */
  window.addEventListener("resize", function () {
    chart.resize();
  });
}

onMounted(() => initMap());
</script>

<template>
  <section>
    <div id="chart" ref="chartElem"></div>
  </section>
</template>

<style scoped>
#chart {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
