import { createRouter, createWebHistory } from "vue-router";
import ProjectForm from "../components/ProjectForm.vue";
import ProjectList from "../components/ProjectList.vue";
import HomePage from "../components/Homepage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
        path: "/",
        name: "root",
        component: HomePage,
      },
      {
        path: "/projectform",
        name: "projectform",
        component: ProjectForm,
      },
      {
        path: "/projectlist",
        name: "projectlist",
        component: ProjectList,
      }
    ]
});
export default router;