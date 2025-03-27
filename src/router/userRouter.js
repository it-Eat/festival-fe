import boardList from "@/views/user/board/boardList.vue";
import boardDetail from "@/views/user/board/boardDetail.vue";
import boardWrite from "@/views/user/board/boardWrite.vue";
import homeBoard from "@/views/user/home/homeBoard.vue";
import homeIntroduction from "@/views/user/home/homeIntroduction.vue";
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
import MyWriteReview from "@/views/user/my/myWriteReview.vue";

import LostItemDetail from "@/views/user/lostItem/lostItemDetail.vue";
import LostItemList from "@/views/user/lostItem/lostItemList.vue";
import LostItemWrite from "@/views/user/lostItem/lostItemWrite.vue";

import BoardList from "@/views/user/board/boardList.vue";
import BoardDetail from "@/views/user/board/boardDetail.vue";
import BoardWrite from "@/views/user/board/boardWrite.vue";

import FoodList from "@/views/user/food/foodList.vue";
import FoodDetail from "@/views/user/food/foodDetail.vue";
import FoodSearch from "@/views/user/food/foodSearch.vue";

import SalesList from "@/views/merchant/salesList.vue";
import BasicMessage from "@/views/merchant/basicMessage.vue";
import MerchantHome from "@/views/merchant/merchantHome.vue";
import Modify from "@/views/merchant/merchantModify.vue";
import MenuManage from "@/views/merchant/menuManage.vue";
import OrderCheck from "@/components/modal/orderCheck.vue";
import OrderComplete from "@/components/modal/orderComplete.vue";
import Login from "@/views/user/my/login.vue";
import FoodReview from "@/views/user/food/foodReview.vue";
import FoodCart from "@/views/user/food/foodCart.vue";
import FoodOrder from "@/views/user/food/foodOrder.vue";
import LoginCallback from "@/views/user/my/loginCallback.vue";
import Notice from "@/views/common/noticePage.vue";
import MyLostItemList from "@/views/user/my/myLostItemList.vue";
import MyBoardList from "@/views/user/my/myBoardList.vue";

export default [
  {
    path: "/:festivalId/boardList",
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
    path: "/:festivalId/userHome",
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
        path: "homeIntroduction",
        name: "homeIntroduction",
        component: homeIntroduction,
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
    path: "/:festivalId/food/foodList",
    name: "foodList",
    component: FoodList,
    meta: { title: "먹거리 리스트" },
  },
  {
    path: "/:festivalId/food/foodDetail/:id",
    name: "foodDetail",
    component: FoodDetail,
    props: true,
  },
  {
    path: "/:festivalId/food/foodSearch",
    name: "foodSearch",
    component: FoodSearch,
  },
  {
    path: "/:festivalId/playing/playingList",
    name: "playingList",
    component: playingList,
    props: true,
  },
  {
    path: "/:festivalId/playing/playingDetail/:id",
    name: "playingDetail",
    component: playingDetail,
    props: true,
  },
  {
    path: "/:festivalId/user/my/myOrderList",
    name: "myOrderList",
    component: MyOrderList,
    meta: { title: "결제내역", useUserName: true },
  },
  {
    path: "/:festivalId/my/myOrderDetail/:id",
    name: "myOrderDetail",
    component: MyOrderDetail,
    meta: { title: "주문 상세" },
  },
  {
    path: "/:festivalId/food/review",
    name: "review",
    component: FoodReview,
  },
  {
    path: "/:festivalId/food/foodCart",
    name: "foodCart",
    component: FoodCart,
  },
  {
    path: "/:festivalId/food/foodOrder",
    name: "foodOrder",
    component: FoodOrder,
  },
  {
    path: "/:festivalId/user/login",
    name: "login",
    component: Login,
  },
  {
    path: "/:festivalId/auth/kakao/callback",
    component: LoginCallback,
  },
  {
    path: "/:festivalId/my/deleteId",
    name: "deleteId",
    component: DeleteId,
    meta: { title: "회원탈퇴" },
  },

  {
    path: "/:festivalId/my/myPostList",
    name: "myPostList",
    component: MyPostList,
    meta: { title: "게시글보기", useUserName: true },
  },
  {
    path: "/:festivalId/user/my/boothApply",
    name: "boothApply",
    component: BoothApply,
    meta: { title: "부스 신청하기" },
  },
  {
    path: "/:festivalId/lostItem/detail/:id",
    name: "lostItemDetail",
    component: LostItemDetail,
    props: true,
  },
  {
    path: "/:festivalId/board/detail/:id",
    name: "boardDetail",
    component: BoardDetail,
    props: true,
  },
  {
    path: "/:festivalId/lostItem/list",
    name: "lostItemList",
    component: LostItemList,
  },
  {
    path: "/:festivalId/my/lostItem/list",
    name: "myLostItemList",
    component: MyLostItemList,
    props: (route) => ({ keyword: route.query.keyword }),
  },
  {
    path: "/:festivalId/my/board/list",
    name: "myBoardList",
    component: MyBoardList,
  },
  {
    path: "/:festivalId/board/list",
    name: "boardList",
    component: BoardList,
  },
  {
    path: "/:festivalId/board/write",
    name: "boardWrite",
    component: BoardWrite,
  },
  {
    path: "/:festivalId/lostItem/write",
    name: "lostItemWrite",
    component: LostItemWrite,
  },
  {
    path: "/:festivalId/my/myWriteReview",
    name: "writeReview",
    component: MyWriteReview,
    meta: { title: "리뷰 작성하기" },
  },
  {
    path: "/:festivalId/user/notice",
    name: "notice",
    component: Notice,
  },

  // 상인

  {
    path: "/:festivalId/merchant/merchantHome/:boothId",
    name: "merchantHome",
    component: MerchantHome,
  },
  {
    path: "/:festivalId/merchant/salesList",
    name: "salesList",
    component: SalesList,
    meta: { title: "매출 확인" },
  },
  {
    path: "/:festivalId/merchant/basicMessage/:boothId",
    name: "basicMessage",
    component: BasicMessage,
    meta: { title: "기본 메시지 지정하기" },
  },
  {
    path: "/:festivalId/merchant/modify/:boothId",
    name: "modify",
    component: Modify,
  },
  {
    path: "/:festivalId/merchant/menuManage/:id",
    name: "menuManage",
    component: MenuManage,
    meta: { title: "메뉴 관리" },
  },
  {
    path: "/:festivalId/modal/orderCheck",
    name: "orderCheck",
    component: OrderCheck,
  },
  {
    path: "/:festivalId/modal/orderComplete",
    name: "orderComplete",
    component: OrderComplete,
  },
];
