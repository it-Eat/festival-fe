import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref([]);

  const totalCount = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  const addToCart = (menu, quantity) => {
    const existingItem = cartItems.value.find(item => item.id === menu.id);

    if (existingItem) {
      // 수량이 0이면 아이템 제거
      if (quantity === 0) {
        cartItems.value = cartItems.value.filter(item => item.id !== menu.id);
      } else {
        existingItem.quantity = quantity; // 수량을 덮어쓰도록 수정
      }
    } else if (quantity > 0) { // 수량이 0보다 클 때만 새 아이템 추가
      cartItems.value.push({
        id: menu.id,
        name: menu.name,
        price: menu.price,
        quantity: quantity,
        image: menu.image
      });
    }
  };

  // 특정 메뉴의 수량을 조회하는 함수 추가
  const getItemQuantity = (menuId) => {
    const item = cartItems.value.find(item => item.id === menuId);
    return item ? item.quantity : 0;
  };

  return {
    cartItems,
    totalCount,
    addToCart,
    getItemQuantity
  };
});
