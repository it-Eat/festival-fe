<script setup>
// 관리자 메뉴 부분
import { getFestivalInfo } from "@/api/admin";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
const router = useRouter();
const festivalInfo = ref(null);
const festivalId = router.currentRoute.value.params.festivalId;
const isLoading = ref(true);

onMounted(async () => {
  try {
    // 새로운 변수를 선언하지 않고 ref의 value를 업데이트
    isLoading.value = true;
    festivalInfo.value = await getFestivalInfo(festivalId);
    if (festivalInfo.value.festivalName === null) {
      festivalInfo.value.festivalName = "테스트 축제";
    }
  } catch (error) {
    console.error("축제 정보 로드 실패:", error);
  } finally {
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
  <div v-if="isLoading">
    <h2>로딩중...</h2>
  </div>
  <div v-else>
    <h2>{{ festivalInfo.festivalName }} 축제 관리자님</h2>
    <div>
      <h3 @click="goToBooth">상점 관리</h3>
    </div>
    <div>
      <p class="board-h3">게시판 관리</p>
      <ul>
        <li @click="goToLost">분실물</li>
        <li @click="goToBoard">게시판</li>
      </ul>
    </div>
    <h3 @click="goToNotice">공지사항</h3>
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 50px;
}

h3 {
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 20px;
  margin-bottom: 10px;
}

h3:hover {
  background-color: #f0f0f0; /* 호버 시 배경색 변화 */
  color: rgb(127, 129, 127);
}

.board-h3 {
  margin-top: 25px;
  margin-bottom: 5px;
}

li {
  font-size: large;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}
li:hover {
  background-color: #f0f0f0; /* 호버 시 배경색 변화 */
  color: rgb(127, 129, 127);
}

p {
  font-size: 18px;
  font-weight: bold;
}
</style>
