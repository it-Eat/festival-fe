<template>
  <div class="menu-card">
    <img
      :src="menu.image || noimage"
      :alt="menu.name"
      class="menu-image"
    />
    <div class="menu-info">
      <span class="menu-name">{{ menu.name }}</span>
      <span class="menu-price">{{ menu.price }}원</span>
    </div>

    <!-- 품절 상태 표시 -->
    <span v-if="menu.soldOut" class="sold-out">품절</span>

    <!-- 장바구니 버튼 -->
    <div class="button" v-if="showButton && !menu.soldOut">
      <UpdownButton
        ref="updownRef"
        :initialValue="initialQuantity"
        @update:modelValue="updateCart"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import UpdownButton from "./updownButton.vue";
import { useCartStore } from "@/stores/cartStores";
import noimage from "@/assets/noimage.png";

const props = defineProps({
  menu: { type: Object, required: true },
  showButton: { type: Boolean, default: false },
});

const cartStore = useCartStore();
const updownRef = ref(null);

// 장바구니에서 현재 메뉴의 수량을 가져옴
const initialQuantity = computed(() => {
  const cartItem = cartStore.cartItems.find(
    (item) => item.id === props.menu.id
  );
  return cartItem ? cartItem.quantity : 0;
});

// 수량 업데이트
const updateCart = (quantity) => {
  cartStore.addToCart(props.menu, quantity);
};
</script>

<style scoped>
.menu-card {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
  justify-content: space-between;
}

.menu-image {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  object-fit: cover;
}

.menu-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.menu-name {
  font-weight: bold;
}

.sold-out {
  color: red;
  font-weight: bold;
}
</style>
