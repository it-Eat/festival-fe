<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader />
      </div>
      <div class="content">
        <div class="main-image-container">
          <img
            src="https://via.placeholder.com/600x300"
            alt="대표 이미지"
            class="mainImg"
          />
          <Wrench class="edit-button" @click="goToModify" />
        </div>
        <div class="store-info">
          <h2 class="store-name">{{ storeInfo.name }}</h2>
          <div class="store-details">
            <div class="location-category">
              <span class="store-location">{{ storeInfo.location }}</span>
              <span class="store-category">({{ storeInfo.category }})</span>
            </div>
            <div class="store-rating">
              <span v-for="n in Math.floor(storeInfo.rating)" :key="n">★</span>
              <span v-if="storeInfo.rating % 1 !== 0">☆</span>
            </div>
          </div>
        </div>
        <div class="menu-list">
          <MenuItem v-for="menu in menus" :key="menu.id" :menu="menu" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackHeader from "@/components/common/backHeader.vue";
import MenuItem from "@/components/common/menuItem.vue";
import { Wrench } from "lucide-vue-next";

export default {
  components: { BackHeader, MenuItem, Wrench },
  data() {
    return {
      storeInfo: {
        name: "지코바",
        location: "A-23",
        category: "먹거리", // 예시 카테고리
        rating: 4.5, // 별점 (5점 만점)
      },
      menus: [
        {
          id: 1,
          image: "https://via.placeholder.com/80",
          name: "떡볶이",
          price: "5000원",
        },
        {
          id: 2,
          image: "https://via.placeholder.com/80",
          name: "마라탕",
          price: "12500원",
        },
        {
          id: 3,
          image: "https://via.placeholder.com/80",
          name: "마라탕",
          price: "12500원",
        },
        {
          id: 4,
          image: "https://via.placeholder.com/80",
          name: "마라탕",
          price: "12500원",
        },
        {
          id: 5,
          image: "https://via.placeholder.com/80",
          name: "마라탕",
          price: "12500원",
        },
        // 추가 메뉴 데이터
      ],
    };
  },
  methods: {
    goToModify() {
      this.$router.push("/merchant/modify");
    },
  },
};
</script>

<style>
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
/* ... 다른 스타일 ... */
.main-image-container {
  position: relative; /* 수정 버튼 위치 기준 설정 */
  width: 100%;
}

.mainImg {
  width: 100%;
  display: block; /* 이미지 아래 여백 제거 */
}

.edit-button {
  position: absolute; /* 이미지에 겹쳐서 배치 */
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 검정 배경 */
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.store-info {
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.store-name {
  margin-bottom: 5px;
  text-align: left;
}

.store-details {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.store-rating {
  display: flex;
  align-items: center;
}

.location-category {
  display: flex;
  gap: 5px;
}
</style>
