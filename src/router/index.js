import { createRouter, createWebHistory } from "vue-router";
import commonRouter from "./adminRouter";
import userRouter from "./userRouter";

const routes = [
    ...commonRouter,
    ...userRouter
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_VUE_API_URL),
    routes
})

export default router