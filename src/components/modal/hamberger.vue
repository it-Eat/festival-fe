<script setup>
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
</script>

<template>
  <div class="hamberger">
    <div class="menu-content">
      <div>
        <!-- 로그인 상태에 따라 사용자 이름 표시 -->
        <div v-if="userStore.isAuthenticated">
          <div>{{ userStore.user.nickname }} 님</div>
          <hr />
        </div>

        <ul>
          <!-- 로그인 안 했을 때 -->
          <li v-if="!userStore.isAuthenticated">
            <router-link to="/user/login">로그인</router-link>
          </li>

          <!-- 일반 사용자 메뉴 -->
          <li v-if="userStore.isAuthenticated && userStore.userRole === 'USER'">
            <router-link to="/user/my/myOrderList">주문 내역</router-link>
          </li>
          <li v-if="userStore.isAuthenticated && userStore.userRole === 'USER'">
            <router-link to="/user/my/boothApply">부스 신청하기</router-link>
          </li>
          <li v-if="userStore.isAuthenticated && userStore.userRole === 'USER'">
            <router-link to="/user/my/myPostList">작성글 보기</router-link>
          </li>

          <!-- 상인(merchant) 메뉴 -->
          <li v-if="userStore.isAuthenticated && userStore.userRole === 'MERCHANT'">
            <router-link to="/merchant/salesList">매출 확인</router-link>
          </li>
          <li v-if="userStore.isAuthenticated && userStore.userRole === 'MERCHANT'">
            <router-link to="/merchant/basicMessage">기본 메시지 지정하기</router-link>
          </li>

          <!-- 로그아웃 버튼 -->
          <li v-if="userStore.isAuthenticated">
            <a href="#" @click.prevent="userStore.logout">로그아웃</a>
          </li>

          <!-- 공통 페이지 -->
          <li v-if="!userStore.isAuthenticated">
            <router-link to="/common">공통페이지</router-link>
          </li>
        </ul>

        <div v-if="userStore.isAuthenticated" class="delete-account">
          <router-link to="/user/my/deleteId">회원탈퇴</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-content {
  position: fixed;
  top: 0;
  right: 0;
  width: 30%;
  height: 100vh;
  background: #ffffff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-content li {
  margin: 10px 0;
}

.menu-content ul a {
  text-decoration: none;
  color: #ff6f61;
}

.menu-content ul a:hover {
  color: #c15248;
}

.delete-account {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: auto;
  margin-bottom: 40px;
  padding: 8px 16px;
  background-color: #000000;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  width: 10%;
  font-size: 7px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.delete-account a {
  text-decoration: none;
  color: white;
  width: 100%;
  display: block;
  text-align: center;
}

.delete-account:hover {
  background-color: #474241;
}

@media (max-width: 900px) {
  .menu-content {
    width: 100%;
  }
}
</style>
