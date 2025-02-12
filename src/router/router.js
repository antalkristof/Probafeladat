import { createRouter, createWebHistory } from "vue-router";
import ProjectForm from "../views/ProjectForm.vue";
import ProjectList from "../views/ProjectList.vue";
import HomePage from "../views/Homepage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
        path: "/",
        name: "root",
        component: HomePage,
      },
      {
        path: "/project-form",
        name: "projectform",
        component: ProjectForm,
      },
      {
        path: "/project-list",
        name: "projectlist",
        component: ProjectList,
      }
    ]
});
export default router;