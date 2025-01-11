import adminBoard from "@/views/admin/board/adminBoard.vue";
import adminLogin from "@/views/admin/adminLogin.vue";
import adminContent from "@/views/admin/adminContent.vue";
import adminLost from "@/views/admin/lost/adminLost.vue";

export default [
  {
    path: "/admin/adminLogin",
    name: "adminLogin",
    component: adminLogin,
  },
  {
    path: "/admin",
    redirect: { name: "adminLogin" },
  },
  {
    path: "/admin/adminContent",
    name: "adminContent",
    component: adminContent,
    children: [
      {
        // 관리자 게시판 관리 페이지
        path: "adminBoard",
        name: "adminBoard",
        component: adminBoard,
      },
      {
        // 관리자 분실물 관리 페이지
        path: "adminLost",
        name: "adminLost",
        component: adminLost,
      },
    ],
  },
];
