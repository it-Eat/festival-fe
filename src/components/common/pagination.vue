<template>
  <nav class="pagination">
    <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
    <button
      :disabled="currentPage === 1"
      @click="changePage(currentPage - 1)">
      이전
    </button>

    <button
      v-for="page in visiblePages"
      :key="page"
      :class="{ active: page === currentPage }"
      @click="changePage(page)">
      {{ page }}
    </button>

    <button
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)">
      다음
    </button>
  </nav>
</template>

<script>
export default {
  props: {
    totalItems: {
      type: Number,
      required: true,
    },
    itemsPerPage: {
      type: Number,
      default: 10,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
  emits: ["page-changed"],
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage);
    },
    visiblePages() {
      const pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    changePage(page) {
      if (page !== this.currentPage && page > 0 && page <= this.totalPages) {
        this.$emit("page-changed", page);
      }
    },
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  gap: 5px;
  justify-content: center; /* 버튼들을 수평으로 중앙 정렬 */
  align-items: center; /* 버튼들이 세로로 중앙 정렬 */
  margin-top: 20px; /* 위쪽 여백 추가 */
  margin-bottom: 20px; /* 아래쪽 여백 추가 */
}

button.active {
  font-weight: bold;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
