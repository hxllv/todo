import { createWebHistory } from "vue-router";
import { createRouter } from "vue-router";
import About from "../views/About.vue";
import Home from "../views/Home.vue";
import Edit from "../views/Edit.vue";

const routes = [
  {
    path: `/about`,
    name: `About`,
    component: About,
  },
  {
    path: `/`,
    name: `Home`,
    component: Home,
  },
  {
    path: `/edit`,
    name: `Edit`,
    component: Edit,
    props(route) {
      return { id: route.query.id };
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
