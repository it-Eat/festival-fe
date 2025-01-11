import { createRouter, createWebHistory } from "vue-router";
import Common from "@/views/common.vue";
import Admin from "@/views/admin/adminMain.vue";
import User from "@/views/user/home.vue";
import userRouter from "./userRouter";
import adminRouter from "./adminRouter";
import merchantHome from "@/views/merchant/merchantHome.vue";

const routes = [
  ...userRouter,
  ...adminRouter,
  {
    path: "/",
    name: "common",
    component: merchantHome,
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin,
  },
  {
    path: "/user",
    name: "user",
    component: User,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
