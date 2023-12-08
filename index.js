
import { createRouter, createWebHistory } from "vue-router";
import myWeather from "../components/Weather.vue";
import About from "../map/index.html";



const routes = [
  {
    path: "/",
    name: "myWeather",
    component: myWeather,
  },
  {
    path: "/about",
    name: "about",
    component: About, // Fügen Sie die About-Komponente hinzu
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
