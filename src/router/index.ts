import { createRouter, createWebHistory } from "vue-router";
//import HomeView from "../views/HomeView.vue";
import HomeView from "../views/EarthView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  /* routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/map",
      name: "map",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/MapView.vue"),
    },
    {
      path: "/earth",
      name: "earth",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/EarthView.vue"),
    },
  ], */
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
  ],
});

export default router;
