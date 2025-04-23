import adminBoard from "@/views/admin/board/adminBoard.vue";
import adminLost from "@/views/admin/lost/adminLost.vue";
import adminMain from "@/views/admin/adminMain.vue";
import adminUserManage from "@/views/admin/adminUserManage.vue";
import adminBooth from "@/views/admin/adminBooth.vue";
import adminNotice from "@/views/admin/notice/adminNotice.vue";
import adminBoardDetail from "@/views/admin/board/adminBoardDetail.vue";
import adminLostDetail from "@/views/admin/lost/adminLostDetail.vue";
import adminBoothDetail from "@/views/admin/adminBoothDetail.vue";
import { useAuthStore } from "@/stores/auth";

const adminAuth = (to, from, next) => {
  const authStore = useAuthStore();
  if (!authStore.isLoggedIn || authStore.user.role !== "ADMIN") {
    alert("관리자 권한이 필요합니다.");
    return next("/adminlogin");
  }
  next();
};

export default [
  {
    path: "/admin/:festivalId",
    name: "admin",
    component: adminMain,
    props: true,
    beforeEnter: adminAuth,
    children: [
      {
        path: "adminBoard",
        name: "adminBoard",
        component: adminBoard,
        beforeEnter: adminAuth,
      },
      {
        path: "adminLost",
        name: "adminLost",
        component: adminLost,
        beforeEnter: adminAuth,
      },
      {
        path: "adminUserManage",
        name: "adminUserManage",
        component: adminUserManage,
        beforeEnter: adminAuth,
      },
      {
        path: "adminBooth",
        name: "adminBooth",
        component: adminBooth,
        beforeEnter: adminAuth,
      },
      {
        path: "adminNotice",
        name: "adminNotice",
        component: adminNotice,
        beforeEnter: adminAuth,
      },
      {
        path: "adminBoardDetail/:boardId",
        name: "adminBoardDetail",
        component: adminBoardDetail,
        props: true,
        beforeEnter: adminAuth,
      },
      {
        path: "adminLostDetail/:boardId",
        name: "adminLostDetail",
        component: adminLostDetail,
        props: true,
        beforeEnter: adminAuth,
      },
      {
        path: "adminBoothDetail/:boothId",
        name: "adminBoothDetail",
        component: adminBoothDetail,
        props: true,
        beforeEnter: adminAuth,
      },
    ],
  },
];
