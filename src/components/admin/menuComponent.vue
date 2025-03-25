<script setup>
// 관리자 메뉴 부분
import { getFestivalInfo } from "@/api/admin";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import loading from "@/components/common/loadingComponent.vue";
const router = useRouter();
const festivalInfo = ref(null);
const festivalId = router.currentRoute.value.params.festivalId;
const loadingType = ref("none");
const isLoading = ref(true);

onMounted(async () => {
  try {
    // 새로운 변수를 선언하지 않고 ref의 value를 업데이트
    loadingType.value = "reject";
    isLoading.value = true;
    festivalInfo.value = await getFestivalInfo(festivalId);
    if (festivalInfo.value.festivalName === null) {
      festivalInfo.value.festivalName = "테스트";
    }
  } catch (error) {
    console.error("축제 정보 로드 실패:", error);
  } finally {
    loadingType.value = "none";
    isLoading.value = false;
  }
});
function goToBoard() {
  router.push({ name: "adminBoard", params: { festivalId: festivalId } });
}

function goToLost() {
  router.push({
    name: "adminLost",
    params: { festivalId: festivalId },
  });
}

function goToBooth() {
  router.push({
    name: "adminBooth",
    params: { festivalId: festivalId },
  });
}

function goToNotice() {
  router.push({
    name: "adminNotice",
    params: { festivalId: festivalId },
  });
}
</script>

<template>
  <loading v-if="isLoading" />
  <div v-else class="sidebar-menu">
    <div class="admin-info">
      <h2>{{ festivalInfo.festivalName }}</h2>
      <h2>축제 관리자님</h2>
    </div>

    <div class="menu-item" @click="goToBooth">
      <h3>상점 관리</h3>
    </div>

    <div class="menu-section">
      <p class="section-title">게시판 관리</p>
      <ul class="submenu">
        <li @click="goToLost">분실물</li>
        <li @click="goToBoard">게시판</li>
      </ul>
    </div>

    <div class="menu-item" @click="goToNotice">
      <h3>공지사항</h3>
    </div>
  </div>
</template>

<style scoped>
.sidebar-menu {
  background-color: #f8f9fa;
  width: 100%;
}

.admin-info {
  padding: 20px 0;
  border-bottom: 2px solid #e9ecef;
  margin-bottom: 20px;
}

.admin-info h2 {
  font-size: 1.2rem;
  color: #343a40;
  margin: 0;
  word-break: keep-all;
}

.menu-item {
  padding: 15px;
  margin: 5px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background-color: #e9ecef;
  transform: translateX(5px);
}

.menu-item h3 {
  margin: 0;
  font-size: 1rem;
  color: #495057;
}

.menu-section {
  margin: 20px 0;
}

.section-title {
  font-size: 1rem;
  color: #6c757d;
  margin: 0;
  padding: 15px;
  font-weight: bold;
}

.submenu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.submenu li {
  padding: 12px 25px;
  color: #495057;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  margin: 2px 0;
}

.submenu li:hover {
  background-color: #e9ecef;
  color: #228be6;
  transform: translateX(5px);
}

/* 활성 메뉴 스타일 */
.active {
  background-color: #e9ecef;
  color: #228be6 !important;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .sidebar-menu {
    padding: 10px;
  }

  .admin-info h2 {
    font-size: 1rem;
  }

  .menu-item,
  .submenu li {
    padding: 10px;
  }
}
</style>
