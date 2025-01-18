<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader :title="storeInfo.name" :category="ctg" :cartCount="cartCount" />
      </div>
      <div class="content">
        <div class="main-image-container">
          <img src="https://via.placeholder.com/600x300" alt="대표 이미지" class="mainImg" />
        </div>
        <div class="store-info">
          <h2 class="store-name">{{ storeInfo.name }}</h2>
          <div class="store-details">
            <div class="location-category">
              <span class="store-location">{{ storeInfo.location }}</span>
              <span class="store-category">{{ storeInfo.category }}</span>
            </div>
            <div class="store-rating">
              <span>★{{ storeInfo.rating }}</span>
              <span @click="goToReview">리뷰 {{ storeInfo.reviewCount }}개></span>
            </div>
          </div>
          <br>
          <div>{{ storeInfo.information }}</div>
        </div>
        <div class="menu-list">
          <MenuItem v-for="menu in menus" :key="menu.id" :menu="menu" :showButton="isFoodDetail" @add-to-cart="addToCart" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStores'
import BackHeader from '@/components/common/backHeader.vue';
import MenuItem from '@/components/common/menuItem.vue';
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';

const cartItems = ref([]);
const router = useRouter();

const goToReview = () => {
  router.push("/user/food/review");
}

const ctg = "foodDetail";

const storeInfo = {
  name: "지코바",
  location: "A-23",
  category: "",
  rating: 4.5,
  reviewCount: 4,
  information: "안녕하세요, 지코바입니다."
};
const menus = [
  { id: 1, image: "https://via.placeholder.com/80", name: "떡볶이", price: "5000원" },
  { id: 2, image: "https://via.placeholder.com/80", name: "마라탕", price: "12500원" },
  { id: 3, image: "https://via.placeholder.com/80", name: "마라탕", price: "12500원" },
  { id: 4, image: "https://via.placeholder.com/80", name: "마라탕", price: "12500원" },
  { id: 5, image: "https://via.placeholder.com/80", name: "마라탕", price: "12500원" },
];

const addToCart = (menu) => {
  cartItems.value.push(menu);
};

const isFoodDetail = true;

const cartStore = useCartStore();
const cartCount = computed(() => cartStore.totalCount);
</script>

<style scoped>
/* foodDetail.vue 스타일 */
.page { display: flex; justify-content: center; }
.home { display: flex; flex-direction: column; align-items: center; justify-content: flex-start; width: 600px; height: 95vh; box-sizing: border-box; margin: auto; }
@media (max-width: 900px) { .home { width: 100%; } }
.header { width: 100%; margin-bottom: 20px; }
.content { width: 100%; }
.store-rating { display: flex; align-items: center; }
.store-rating span { margin-right: 5px; }
.store-rating span:hover { cursor: pointer; text-decoration: underline; }
</style>
