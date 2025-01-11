<script>
import BackHeader from "@/components/common/backHeader.vue";
import Pagination from "@/components/common/pagination.vue";
export default {
  components: { Pagination, BackHeader },
  data() {
    return {
      items: [
        { id: 1, name: "Item 1", price: "30,000원" },
        { id: 2, name: "Item 2", price: "20,000원" },
        { id: 3, name: "Item 3", price: "15,000원" },
        { id: 4, name: "Item 4", price: "12,000원" },
        { id: 5, name: "Item 5", price: "18,000원" },
        // ... 더 많은 데이터
        { id: 100, name: "Item 100", price: "50,000원" },
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
      <!-- 리스트 -->
      <div class="content" v-if="!isChildRouteActive">
        <!-- 헤더 -->
        <div class="header">
          <BackHeader />
        </div>
        <!-- 리스트 제목 -->
        <div class="list-header">
          <span class="list-header-name">주문상점</span>
          <span class="list-header-price">금액</span>
        </div>

        <!-- 리스트 항목 -->
        <router-link
          v-for="item in paginatedItems"
          :key="item.id"
          :to="{
            name: 'myOrderDetail',
            query: {
              name: item.name,
              price: item.price,
            },
            params: {
              id: item.id,
            },
          }"
          class="list-item-link"
        >

          <li class="list-item">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-price">{{ item.price }}</span>
          </li>
        </router-link>
      </div>

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
  justify-content: center;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 600px;
  height: 95vh;
  box-sizing: border-box;
  margin: auto;
}

@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}

.header {
  width: 100%;
  margin-bottom: 20px;
}

.content {
  width: 100%;
  margin-bottom: 20px;
  padding: 0;
}

.list-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 10px;
  padding: 0 10px;
}

.list-header-name {
  text-align: left;
}

.list-header-price {
  text-align: right;
}

.list-item-link {
  text-decoration: none;
  color: inherit;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  font-weight: 500;
  color: #333;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  list-style-type: none;
}

.item-name {
  text-align: left;
}

.item-price {
  text-align: right;
}

.list-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.footer {
  width: 100%;
  padding: 10px 0;
  text-align: center;
  position: fixed;
  bottom: 0;
}
</style>
