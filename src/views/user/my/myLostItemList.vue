<script setup>
import SmallList from "@/components/common/smallList.vue";
import { useLostStore } from "@/stores/lost";
import backHeader from "@/components/common/backHeader.vue";
import { onMounted, computed, ref } from "vue";

const lostStore = useLostStore();
const currentPage = ref(1); // 현재 페이지
const itemsPerPage = 7; // 한 페이지당 분실물 개수
const totalItems = computed(() => lostStore.totalItems || 50); // 전체 분실물 개수

onMounted(async () => {
  await lostStore.fetchMyItems(1, 50, "recent", "LOSS");
});

// 전체 목록
const allLosts = computed(() =>
  Array.isArray(lostStore.myLosts) ? [...lostStore.myLosts] : []
);

// 현재 페이지의 목록 필터링
const paginatedLosts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return allLosts.value.slice(start, end);
});

// 전체 페이지 수 계산
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

// 페이지 변경 함수
const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<template>
  <div class="container">
    <backHeader title="분실물 목록" />
    <div class="menu">분실물</div>
    <hr class="divider" />

    <!-- 분실물 목록 -->
    <div class="list-wrapper">
      <SmallList
        class="list-item"
        v-for="lostItem in paginatedLosts"
        :key="lostItem.id"
        :lost="lostItem"
      />
    </div>

    <!-- 페이지네이션 -->
    <div class="pagination">
      <button
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        〈 이전
      </button>
      <span v-for="page in totalPages" :key="page">
        <button
          @click="changePage(page)"
          :class="{ active: page === currentPage }"
        >
          {{ page }}
        </button>
      </span>
      <button
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        다음 〉
      </button>
    </div>

    <!-- 분실물 작성 버튼 -->
    <div class="button-wrapper">
      <RouterLink to="/user/lostItem/write">
        <button class="write-button">분실물 작성하기</button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 15px;
}

.list-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-item {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 페이지네이션 스타일 */
.pagination {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.pagination button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button.active {
  background-color: #ff5a5f;
  color: white;
  font-weight: bold;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.write-button {
  padding: 10px 20px;
  background-color: #ff5a5f;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}

.menu {
  font-size: 18px;
  font-weight: bold;
  margin: 15px auto;
}

.divider {
  border: 0;
  height: 1px;
  background-color: black;
  margin-bottom: 10px;
}
</style>
