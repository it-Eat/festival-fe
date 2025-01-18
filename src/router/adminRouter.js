import adminBoard from "@/views/admin/board/adminBoard.vue";
import adminLost from "@/views/admin/lost/adminLost.vue";
import adminMain from "@/views/admin/adminMain.vue";
import adminUserManage from "@/views/admin/adminUserManage.vue";
import adminBooth from "@/views/admin/adminBooth.vue";

export default [
  {
    path: "/admin",
    name: "admin",
    component: adminMain, // 기본 컴포넌트
    children: [
      {
        path: "adminBoard", // 자식 경로
        name: "adminBoard",
        component: adminBoard,
      },
      {
        path: "adminLost", // 자식 경로
        name: "adminLost",
        component: adminLost,
      },
      {
        path: "adminUserManage",
        name: "adminUserManage",
        component: adminUserManage,
      },
      {
        path: "adminBooth",
        name: "adminBooth",
        component: adminBooth,
      },
      // {
      //   path: "", // 기본 경로 (예: /admin)
      //   redirect: { name: "adminBoard" }, // 기본적으로 adminBoard로 리다이렉트
      // },
    ],
  },
];
