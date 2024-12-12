import Common from "@/views/common.vue"
import Admin from "@/views/admin/adminMain.vue"
import User from "@/views/user/home.vue"

export default [
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
    }
]
