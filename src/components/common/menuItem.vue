<template>
  <div class="menu-card">
    <img :src="menu.image || noimage" :alt="menu.name" class="menu-image" />
    <div class="menu-info">
      <span class="menu-name">{{ menu.name }}</span>
      <span class="menu-price">{{ priceFormat(menu.price) }}원</span>
    </div>

    <!-- 품절 상태 표시 -->
    <span v-if="menu.soldOut" class="sold-out">품절</span>

    <!-- 장바구니 버튼 -->
    <div class="button" v-if="showButton && !menu.soldOut">
      <UpdownButton
        ref="updownRef"
        :initialValue="0"
        @update:modelValue="updateQuantity"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UpdownButton from "./updownButton.vue";
import noimage from "@/assets/noimage.png";

const props = defineProps({
  menu: { type: Object, required: true },
  showButton: { type: Boolean, default: false },
});

const emit = defineEmits(["updateSelectedMenu"]);
const updownRef = ref(null);

const priceFormat = (price) => {
  return price.toLocaleString("ko-KR");
};

const updateQuantity = (quantity) => {
  emit("updateSelectedMenu", {
    menuId: props.menu.id,
    cnt: quantity,
    price: props.menu.price,
  });
};

const resetQuantity = () => {
  if (updownRef.value) {
    updownRef.value.reset();
  }
};

defineExpose({ resetQuantity });
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
  margin-bottom: 10px;
}

.menu-image {
  width: 80px;
  height: 80px;
  margin-right: 14px;
  object-fit: cover;
  border-radius: 12px;
}

.menu-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 18px;
}

.menu-name {
  font-weight: bold;
}

.sold-out {
  color: red;
  font-weight: bold;
}
</style>
