<script>
import BackHeader from "@/components/common/backHeader.vue";
import Pagination from "@/components/common/pagination.vue";
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
    isChildRouteActive() {
      // 현재 라우트가 자식 라우트인지 확인
      return this.$route.name === "myOrderDetail"; // 자식 라우트의 name과 비교
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
      <ul class="content" v-if="!isChildRouteActive">
        <router-link
          v-for="item in paginatedItems"
          :key="item.id"
          :to="`/user/my/myOrderList/${item.id}`"
          class="list-item-link"
        >
          <li>
            {{ item.name }}
          </li>
        </router-link>
      </ul>

      <!-- 페이지네이션 -->
      <div class="footer" v-if="!isChildRouteActive">
        <Pagination
          :total-items="items.length"
          :items-per-page="itemsPerPage"
          :current-page="currentPage"
          @page-changed="handlePageChange"
        />
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center; /* 수평 중앙 정렬 */
  justify-content: flex-start; /* 상단 정렬 */
  width: 600px; /* 고정된 너비 */
  height: 95vh; /* 부모 높이 채우기 */
  box-sizing: border-box;
  margin: auto;
}

@media (max-width: 900px) {
  .home {
    width: 100%;
  }
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
  padding: 0px;
  text-align: center; /* 리스트 항목들을 중앙 정렬 */
}
.list-item-link {
  text-decoration: none; /* 밑줄 제거 */
  color: inherit; /* 기본 텍스트 색상 유지 */
}

.list-item-link:hover {
  text-decoration: none; /* 호버 시에도 밑줄 제거 */
}

.content li {
  margin: 15px 0; /* 항목 간의 간격을 적당히 조절 */
  padding: 10px; /* 항목 내부 여백 */
  background-color: #f9f9f9; /* 부드러운 배경색 */
  border-radius: 8px; /* 둥근 모서리 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 효과 */
  font-size: 16px; /* 텍스트 크기 */
  font-weight: 500; /* 텍스트 굵기 */
  color: #333; /* 텍스트 색상 */
  transition: transform 0.2s ease, box-shadow 0.2s ease; /* 애니메이션 효과 */
  list-style-type: none;
}

.content li:hover {
  transform: translateY(-5px); /* 마우스 오버 시 살짝 위로 올라가는 효과 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); /* 그림자 효과 강화 */
}

/* 페이지네이션 영역 */
.footer {
  width: 100%;
  padding: 10px 0;
  text-align: center; /* 페이지네이션을 중앙 정렬 */
  position: fixed;
  bottom: 0;
}
</style>
