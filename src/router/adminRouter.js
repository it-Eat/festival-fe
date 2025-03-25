import adminBoard from "@/views/admin/board/adminBoard.vue";
import adminLost from "@/views/admin/lost/adminLost.vue";
import adminMain from "@/views/admin/adminMain.vue";
import adminUserManage from "@/views/admin/adminUserManage.vue";
import adminBooth from "@/views/admin/adminBooth.vue";
import adminNotice from "@/views/admin/notice/adminNotice.vue";
import adminBoardDetail from "@/views/admin/board/adminBoardDetail.vue";
import adminLostDetail from "@/views/admin/lost/adminLostDetail.vue";
import adminBoothDetail from "@/views/admin/adminBoothDetail.vue";

export default [
  {
    path: "/admin/:festivalId",
    name: "admin",
    component: adminMain,
    props: true,
    children: [
      {
        path: "adminBoard",
        name: "adminBoard",
        component: adminBoard,
      },
      {
        path: "adminLost",
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
      {
        path: "adminNotice",
        name: "adminNotice",
        component: adminNotice,
      },
      {
        path: "adminBoardDetail/:boardId/:festivalId",
        name: "adminBoardDetail",
        component: adminBoardDetail,
        props: true,
      },
      {
        path: "adminLostDetail/:boardId/:festivalId",
        name: "adminLostDetail",
        component: adminLostDetail,
        props: true,
      },
      {
        path: "adminBoothDetail/:festivalId/:boothId",
        name: "adminBoothDetail",
        component: adminBoothDetail,
        props: true,
      },
    ],
  },
];
