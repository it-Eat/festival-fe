import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  const cartItems = ref([]);
  const storeName = ref(""); // 상점명 저장

  // 총 수량
  const totalCount = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  // 장바구니 추가/수정
  const addToCart = (menu, quantity) => {
    const existingItem = cartItems.value.find((item) => item.id === menu.id);
    if (existingItem) {
      if (quantity === 0) {
        cartItems.value = cartItems.value.filter((item) => item.id !== menu.id);
      } else {
        existingItem.quantity = quantity;
      }
    } else if (quantity > 0) {
      cartItems.value.push({
        id: menu.id,
        name: menu.name,
        price: menu.price,
        quantity,
        image: menu.image,
      });
    }
  };

  // 상점명 설정
  const setStoreName = (name) => {
    storeName.value = name;
  };

  // 장바구니 및 상점명 모두 초기화
  const clearCart = () => {
    cartItems.value = [];
    storeName.value = "";
  };

  return {
    cartItems,
    storeName,
    totalCount,
    addToCart,
    setStoreName,
    clearCart, // 장바구니, 상점명 비우기
  };
});
