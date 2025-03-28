<script setup>
import SmallList from "@/components/common/smallList.vue";
import { useLostStore } from "@/stores/lost";
import backHeader from "@/components/common/backHeader.vue";
import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import loadingComponent from "@/components/common/loadingComponent.vue";

const lostStore = useLostStore();
const currentPage = ref(1);
const itemsPerPage = 10;
const totalItems = computed(() => lostStore.losts.length || 50);
const route = useRoute();
const festivalId = route.params.festivalId;
const isLoading = ref(false);
// 데이터 가져오기
onMounted(async () => {
  isLoading.value = true;
  await lostStore.fetchItems(festivalId);
  isLoading.value = false;
});

// 전체 목록
const allLosts = computed(() =>
  Array.isArray(lostStore.losts) ? [...lostStore.losts] : []
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
      <RouterLink :to="`/${festivalId}/lostItem/write`">
        <button class="write-button">분실물 작성하기</button>
      </RouterLink>
    </div>
    <loadingComponent v-if="isLoading" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 15px;
  gap: 28px;
}

.list-wrapper {
  display: flex;
  flex-direction: column;
}

.list-item {
  background-color: white;
  border-bottom: 1px solid #eee;
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
}

.write-button {
  padding: 10px 20px;
  background-color: white;
  color: #ff6f61;
  border: 1px solid #ff6f61;
  border-radius: 8px;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}

.write-button:hover {
  background-color: #ff6f61;
  color: white;
}
</style>
