<template>
  <nav class="pagination-nav">
    <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
      이전
    </button>

    <span>{{ currentPage }} / {{ totalPages }}</span>

    <button
      :disabled="currentPage === totalPages"
      @click="changePage(currentPage + 1)"
    >
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
.pagination-nav {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.pagination-nav button {
  padding: 8px 20px;
  border: 1px solid #fe6f61;
  border-radius: 8px;
  background-color: white;
  color: #fe6f61;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-nav button:hover:not(:disabled) {
  background-color: #fe6f61;
  color: white;
}

.pagination-nav button:disabled {
  border-color: #ddd;
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.pagination-nav span {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}
</style>
