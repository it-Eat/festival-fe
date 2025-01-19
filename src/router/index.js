import { createRouter, createWebHistory } from "vue-router";
import Common from "@/views/common.vue";
import adminLogin from "@/views/admin/adminLogin.vue";
import Admin from "@/views/admin/adminMain.vue";
import User from "@/views/user/home.vue";
import userRouter from "./userRouter";
import adminRouter from "./adminRouter";

const routes = [
  ...userRouter,
  ...adminRouter,
  {
    path: "/",
    name: "common",
    component: Common,
  },
  {
    path: "/user",
    name: "user",
    component: User,
  },
  {
    path: "/adminLogin",
    name: "adminLogin",
    component: adminLogin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
