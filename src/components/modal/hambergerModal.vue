<script setup>
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { socket } from "@/main";

const userStore = useUserStore();
const router = useRouter();
const festivalId = computed(() => {
  return (
    router.currentRoute.value.params.festivalId ||
    localStorage.getItem("festivalId")
  );
});
const boothId = localStorage.getItem("boothId");
// 로컬 메서드: 로그아웃 후 "/user" 페이지로 이동
function handleLogout() {
  try {
    if (socket.connected) {
      // 축제 방에서 나가기
      if (festivalId.value) {
        socket.emit("leave_festival", String(festivalId.value));
      }

      // 사용자 방에서 나가기
      if (userStore.user?.id) {
        socket.emit("leave_user", String(userStore.user.id));
      }

      // 소켓 연결 해제
      socket.disconnect();
    }
  } catch (error) {
    console.error("소켓 해제 실패:", error);
  } finally {
    // 스토리지 및 스토어 초기화
    sessionStorage.clear();
    localStorage.clear();
    userStore.logout();

    // 페이지 이동
    router.push("/");
  }
}
</script>

<template>
  <!-- 전체 래퍼 -->
  <div class="menu-wrapper">
    <!-- 왼쪽 회색 바 -->
    <div class="left-bar"></div>

    <!-- 오른쪽(흰색 영역) -->
    <div class="menu-content">
      <!-- 상단 로고 / 브랜드명 (예시) -->
      <div class="header-logo">
        <span class="black-text">it</span><span class="red-text">-eat</span>
      </div>

      <!-- 로그인 상태인 경우: 닉네임 표시 -->
      <div v-if="userStore.isAuthenticated" class="user-info">
        <span class="nickname">{{ userStore.user.nickname }} 님,</span>
      </div>

      <!-- 메뉴 목록 -->
      <ul>
        <!--공통 상태-->
        <li>
          <router-link :to="`/${festivalId}/user/notice`"
            ><span class="home-icon">📢</span> 공지사항</router-link
          >
        </li>
        <!-- 비로그인 상태 -->
        <li v-if="!userStore.isAuthenticated">
          <router-link :to="`/${festivalId}/user/login`">
            <span class="home-icon">👤</span>
            로그인
          </router-link>
        </li>
        <li v-if="!userStore.isAuthenticated">
          <span class="home-icon">🏠</span>
          <router-link to="/"> 공통 페이지 </router-link>
        </li>

        <!-- 일반 사용자 메뉴 -->
        <li v-if="userStore.isAuthenticated && userStore.userRole === 'USER'">
          <span class="home-icon">🏠</span>
          <router-link to="/"> 공통 페이지 </router-link>
        </li>
        <li v-if="userStore.isAuthenticated && userStore.userRole === 'USER'">
          <span class="home-icon">📄</span>
          <router-link :to="`/${festivalId}/user/my/myOrderList`">
            주문 내역
          </router-link>
        </li>
        <li v-if="userStore.isAuthenticated && userStore.userRole === 'USER'">
          <router-link :to="`/${festivalId}/user/my/boothApply`">
            <span class="plane-icon">🙏🏻</span>
            부스 신청하기
          </router-link>
        </li>
        <li v-if="userStore.isAuthenticated && userStore.userRole === 'USER'">
          <router-link :to="`/${festivalId}/my/myPostList`">
            <span class="home-icon">📝</span>
            작성글 보기
          </router-link>
        </li>

        <!-- 상인(merchant) 메뉴 -->
        <li v-if="userStore.isAuthenticated && userStore.userRole === 'SELLER'">
          <router-link to="/">
            <span class="home-icon">🏠</span>
            공통 페이지
          </router-link>
        </li>
        <li v-if="userStore.isAuthenticated && userStore.userRole === 'SELLER'">
          <router-link :to="`/${festivalId}/merchant/merchantHome/${boothId}`">
            <span class="home-icon">🛒</span>
            상점 관리
          </router-link>
        </li>
        <li v-if="userStore.isAuthenticated && userStore.userRole === 'SELLER'">
          <router-link :to="`/${festivalId}/merchant/salesList/${boothId}`">
            <span class="home-icon">💰</span>

            매출 확인
          </router-link>
        </li>
        <li v-if="userStore.isAuthenticated && userStore.userRole === 'SELLER'">
          <router-link :to="`/${festivalId}/merchant/basicMessage/${boothId}`">
            <span class="plane-icon">💬</span>
            기본 메시지 지정하기
          </router-link>
        </li>
        <li v-if="userStore.isAuthenticated && userStore.userRole === 'SELLER'">
          <router-link :to="`/${festivalId}/my/myPostList`">
            <span class="home-icon">📝</span>
            작성글 보기
          </router-link>
        </li>
      </ul>

      <!-- 로그인 상태일 때만: 로그아웃 + 회원탈퇴 -->
      <div v-if="userStore.isAuthenticated" class="bottom-menu">
        <a href="#" @click.prevent="handleLogout">
          <span class="home-icon">👤</span>
          로그아웃
        </a>

        <router-link to="/user/my/deleteId" class="delete-link">
          회원 탈퇴
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 전체 레이아웃 래퍼 */
.menu-wrapper {
  display: flex; /* 왼쪽 바 + 오른쪽 컨텐츠를 나란히 */
  height: 100vh; /* 화면 전체 높이 */
  background-color: #fff;
  border-right: 1px solid #ffffff;
}

/* 오른쪽 흰색 영역 */
.menu-content {
  flex: 1; /* 나머지 공간 차지 */
  padding: 20px;
  width: 250px;
  position: relative; /* 하단 메뉴(absolute) 배치용 */
  box-sizing: border-box;
}

/* 로고 / 브랜드명 */
.header-logo {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

/* "it"은 검정, "-eat"은 빨간색 */
.black-text {
  color: #000;
}
.red-text {
  color: #ff6f61;
}

/* 로그인 후 사용자 정보 */
.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
}

.nickname {
  font-size: 16px;
  font-weight: bold;
}

/* 메뉴 목록 스타일 */
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 20px;
  text-align: left;
}
li {
  margin: 10px 0;
  padding: 10px 0;
}

/* 각 링크의 기본 스타일 */
a,
.router-link-active {
  text-decoration: none;
  font-size: 15px;
  color: #ff6f61;
}
a:hover {
  color: #c15248;
}

/* 하단(로그아웃, 회원 탈퇴) 배치 */
.bottom-menu {
  position: absolute;
  bottom: 40px;
  left: 20px;
  right: 20px;

  display: flex;
  justify-content: space-between; /* 좌우로 배치 */
  align-items: center;
}

.arrow-icon {
  margin-left: 5px;
}
.plane-icon {
  margin-left: 5px;
}
.edit-icon {
  margin-left: 5px;
}
.home-icon {
  margin-left: 5px;
}

/* 회원탈퇴는 살짝 연한 회색 + 글자 작게 */
.delete-link {
  color: #999 !important;
  font-size: 14px;
}
</style>
