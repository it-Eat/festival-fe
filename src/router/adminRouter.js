import adminBoard from "@/views/admin/board/adminBoard.vue";
import adminLogin from "@/views/admin/adminLogin.vue";

export default [
  {
    path: "/admin/adminBoard",
    name: "adminBoard",
    component: adminBoard,
  },
  {
    path: "/admin/adminLogin",
    name: "adminLogin",
    component: adminLogin,
  },
  {
    path: "/admin",
    redirect: { name: "adminLogin" },
  },
];
