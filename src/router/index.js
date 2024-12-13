import { createRouter, createWebHistory } from "vue-router";
import Common from "@/views/common.vue"
import Admin from "@/views/admin/adminMain.vue"
import User from "@/views/user/home.vue"
import userRouter from "./userRouter";
import adminRouter from "./adminRouter";

const routes = [
    ...userRouter,
    ...adminRouter,
    {
            path: '/',
            name: 'common',
            component: Common,
        },
        {
            path: '/admin',
            name: 'admin',
            component: Admin,
        },
        {
            path: '/user',
            name: User,

        }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_VUE_API_URL),
    routes
})

export default router