<script setup>
import { ref } from "vue";

const isLoggedIn = ref(true); // 로그인 상태를 나타내는 변수
const userType = ref("merchant"); // 로그인된 사용자 유형 (예: 'user', 'merchant')

function handleLogin() {
  isLoggedIn.value = true;
  userType.value = "user"; // 일반 사용자로 로그인
}

function handleMerchantLogin() {
  isLoggedIn.value = true;
  userType.value = "merchant"; // 상인으로 로그인
}

function handleLogout() {
  isLoggedIn.value = false;
  userType.value = "user"; // 로그아웃 처리
}
</script>

<template>
  <div class="hamberger">
    <div class="menu-content">
      <div>
        <!-- 사용자 이름과 로그인 상태에 따라 다르게 표시 -->
        <div v-if="isLoggedIn">
          <div>천세윤 님</div>
          <hr />
        </div>

        <ul>
          <!-- 로그인 여부에 따라 항목 변경 -->
          <li v-if="!isLoggedIn">
            <router-link to="/login">로그인</router-link>
          </li>
          <li v-if="isLoggedIn && userType === 'user'">
            <router-link to="/user/my/myOrderList">주문 내역</router-link>
          </li>
          <li v-if="isLoggedIn && userType === 'user'">
            <router-link to="/user/my/boothApply">부스 신청하기</router-link>
          </li>
          <li v-if="isLoggedIn && userType === 'user'">
            <router-link to="/user/my/myPostList">작성글 보기</router-link>
          </li>
          <li v-if="isLoggedIn && userType === 'merchant'">
            <router-link to="/merchant/salesList">매출 확인</router-link>
          </li>
          <li v-if="isLoggedIn && userType === 'merchant'">
            <router-link to="/merchant/basicMessage"
              >기본 메시지 지정하기</router-link
            >
          </li>
          <li v-if="isLoggedIn">
            <a href="#" @click="handleLogout">로그아웃</a>
          </li>
          <li v-if="!isLoggedIn">
            <router-link to="/common">공통페이지</router-link>
          </li>
        </ul>

        <div v-if="isLoggedIn" class="delete-account">
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
  margin-top: auto; /* 아래로 밀기 */
  margin-bottom: 40px;
  padding: 8px 16px;
  background-color: #000000; /* 버튼 배경색 */
  color: white;
  font-weight: bold;
  border-radius: 5px; /* 둥근 모서리 */
  cursor: pointer;
  text-align: center;
  width: 10%;
  font-size: 7px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* 버튼 그림자 */
}

.delete-account a {
  text-decoration: none; /* 밑줄 제거 */
  color: white; /* 텍스트 색상 */
  width: 100%; /* 링크 전체 클릭 가능 */
  display: block; /* 블록 형태로 설정 */
  text-align: center;
}

.delete-account:hover {
  background-color: #474241; /* 호버 시 버튼 색상 */
}

@media (max-width: 900px) {
  .menu-content {
    width: 100%;
  }
}
</style>
