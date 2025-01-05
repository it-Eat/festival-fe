import boardList from "@/views/user/board/boardList.vue";
import boardDetail from "@/views/user/board/boardDetail.vue";
import boardWrite from "@/views/user/board/boardWrite.vue";
import homeBoard from "@/views/user/home/homeBoard.vue";
import homeFestInfo from "@/views/user/home/homeFestInfo.vue";
import homeFood from "@/views/user/home/homeFood.vue";
import homePlaying from "@/views/user/home/homePlaying.vue";
import homeComponent from "@/views/user/homeComponent.vue";
import playingList from "@/views/user/playing/playingList.vue";
import playingDetail from "@/views/user/playing/playingDetail.vue";
import MyOrderList from "@/views/user/my/myOrderList.vue";
import DeleteId from "@/views/user/my/deleteId.vue";
import MyPostList from "@/views/user/my/myPostList.vue";
import BoothApply from "@/views/user/my/boothApply.vue";
import MyOrderDetail from "@/views/user/my/myOrderDetail.vue";
import LostItemDetail from "@/views/user/lostItem/lostItemDetail.vue";
import LostItemList from "@/views/user/lostItem/lostItemList.vue";
import BoardList from "@/views/user/board/boardList.vue";
import MyWriteReview from "@/views/user/my/myWriteReview.vue";
import SalesList from "@/views/merchant/salesList.vue";
import BasicMessage from "@/views/merchant/basicMessage.vue";
import MerchantHome from "@/views/merchant/merchantHome.vue";
import Modify from "@/views/merchant/modify.vue";
import MenuManage from "@/views/merchant/menuManage.vue";
import OrderCheck from "@/components/modal/orderCheck.vue";
import OrderComplete from "@/components/modal/orderComplete.vue";
import Login from "@/views/user/my/login.vue";

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

  {
    path: "/user/playing/playingList",
    name: "playingList",
    component: playingList,
  },
  {
    path: "/user/playing/playingDetail/:playNum",
    name: "playingDetail",
    component: playingDetail,
    props: true,
  },
  {
    path: "/user/my/myOrderList",
    name: "myOrderList",
    component: MyOrderList,
    meta: { title: "주문내역", useUserName: true },
    children: [
      {
        path: ":id",
        name: "myOrderDetail",
        component: MyOrderDetail,
        meta: { title: " " },
      },
    ],
  },
  {
    path: "/user/login",
    name: "login",
    component: Login,
  },
  {
    path: "/user/my/deleteId",
    name: "deleteId",
    component: DeleteId,
    meta: { title: "회원탈퇴" },
  },

  {
    path: "/user/my/myPostList",
    name: "myPostList",
    component: MyPostList,
  },
  {
    path: "/user/my/boothApply",
    name: "boothApply",
    component: BoothApply,
    meta: { title: "부스 신청하기" },
  },
  {
    path: "/user/lostItem/detail",
    name: "lostItemDetail",
    component: LostItemDetail,
  },
  {
    path: "/user/lostItem/list",
    name: "lostItemList",
    component: LostItemList,
  },
  {
    path: "/user/board/list",
    name: "boardList",
    component: BoardList,
  },
  {
    path: "/user/my/myWriteReview",
    name: "writeReview",
    component: MyWriteReview,
    meta: { title: "리뷰 작성하기" },
  },

  // 상인

  {
    path: "/merchant/merchantHome",
    name: "merchantHome",
    component: MerchantHome,
  },
  {
    path: "/merchant/salesList",
    name: "salesList",
    component: SalesList,
    meta: { title: "매출 확인" },
  },
  {
    path: "/merchant/basicMessage",
    name: "basicMessage",
    component: BasicMessage,
    meta: { title: "기본 메시지 지정하기" },
  },
  {
    path: "/merchant/modify",
    name: "modify",
    component: Modify,
  },
  {
    path: "/merchant/menuManage",
    name: "menuManage",
    component: MenuManage,
    meta: { title: "메뉴 관리" },
  },
  {
    path: "/modal/orderCheck",
    name: "orderCheck",
    component: OrderCheck,
  },
  {
    path: "/modal/orderComplete",
    name: "orderComplete",
    component: OrderComplete,
  },
];
