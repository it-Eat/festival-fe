import boardList from "@/views/user/board/boardList.vue";
import boardDetail from "@/views/user/board/boardDetail.vue";
import boardWrite from "@/views/user/board/boardWrite.vue";
import homeBoard from "@/views/user/home/homeBoard.vue";
import homeFestInfo from "@/views/user/home/homeFestInfo.vue";
import homeFood from "@/views/user/home/homeFood.vue";
import homePlaying from "@/views/user/home/homePlaying.vue";
import homeComponent from "@/views/user/homeComponent.vue";

export default [
  {
    path: "/user/boardList",
    name: "boardList",
    component: boardList,
    children: [
      {
        path: "detail",
        name: "boardDetail",
        component: boardDetail,
      },
      {
        path: "write",
        name: "boardWrite",
        component: boardWrite,
      },
    ],
  },

  {
    path: "/user/userHome",
    name: "userHome",
    component: homeComponent,
    children: [
      {
        // 홈화면 소형 게시판
        path: "homeBoard",
        name: "homeBoard",
        component: homeBoard,
      },
      {
        // 홈화면 소형 축제정보
        path: "homeFestInfo",
        name: "homeFestInfo",
        component: homeFestInfo,
      },
      {
        // 홈화면 소형 먹거리
        path: "homeFood",
        name: "homeFood",
        component: homeFood,
      },
      {
        // 홈화면 소형 놀거리
        path: "homePlaying",
        name: "homePlaying",
        component: homePlaying,
      },
    ],
  },
];
