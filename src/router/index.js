import { createRouter, createWebHistory } from "vue-router";
import commonRouter from "./adminRouter";
import userRouter from "./userRouter";
import Common from "@/views/common.vue"
import Admin from "@/views/admin/adminMain.vue"
import User from "@/views/user/home.vue"

const routes = [
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
            name: 'user',
            component: User,
        },
    ...commonRouter,
    ...userRouter
]

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_VUE_API_URL),
    routes
})

export default router