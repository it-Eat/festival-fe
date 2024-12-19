<script>
import BackHeader from '@/components/common/backHeader.vue';
import Pagination from '@/components/common/pagination.vue';
export default {
  components: { Pagination, BackHeader },
  data() {
    return {
      items: [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        { id: 3, name: "Item 2" },
        { id: 4, name: "Item 2" },
        { id: 5, name: "Item 2" },
        { id: 6, name: "Item 2" },
        { id: 7, name: "Item 2" },
        { id: 8, name: "Item 2" },
        { id: 9, name: "Item 2" },
        { id: 10, name: "Item 2" },
        { id: 11, name: "Item 2" },
        { id: 12, name: "Item 2" },
        { id: 13, name: "Item 2" },
        // ... 더 많은 데이터
        { id: 100, name: "Item 100" },
      ],
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    paginatedItems() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.items.slice(start, end);
    },
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
};
</script>

<template>
  <div class="page">
    <div class="home">
      <!-- 헤더 -->
      <div class="header">
        <BackHeader />
      </div>

      <!-- 리스트 -->
      <ul class="content">
        <li v-for="item in paginatedItems" :key="item.id">
          {{ item.name }}
        </li>
      </ul>

      <!-- 페이지네이션 -->
      <div class="footer">
        <Pagination
          :total-items="items.length"
          :items-per-page="itemsPerPage"
          :current-page="currentPage"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>



<style scoped>
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 중앙 정렬 */
  justify-content: flex-start; /* 상단 정렬 */
  width: 600px; /* 고정된 너비 */
  height: 100%; /* 부모 높이 채우기 */
  box-sizing: border-box;
  margin: auto;
}

/* 헤더 스타일 */
.header {
  width: 100%;
  margin-bottom: 20px;
}

/* 리스트 영역 */
.content {
  width: 100%;
  margin-bottom: 20px;
  text-align: center; /* 리스트 항목들을 중앙 정렬 */
}

/* 페이지네이션 영역 */
.footer {
  width: 100%;
  padding: 10px 0;
  text-align: center; /* 페이지네이션을 중앙 정렬 */
}

</style>
