import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  // 부스 ID
  const boothId = ref(null);

  // 장바구니 아이템
  const cartItems = ref([]);

  // 상점명
  const storeName = ref("");

  // 총 수량
  const totalCount = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.quantity, 0);
  });

  /**
   * 장바구니 추가/수정
   * - 이미 있는 메뉴는 수량 수정
   * - 수량이 0이면 장바구니에서 제거
   * - 없던 메뉴이고 수량이 0보다 크면 추가
   */
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

  /**
   * 부스 ID 설정
   */
  const setBoothId = (id) => {
    boothId.value = id;
  };

  /**
   * 상점명 설정
   */
  const setStoreName = (name) => {
    storeName.value = name;
  };

  /**
   * 장바구니 및 상점명, 부스ID 초기화
   */
  const clearCart = () => {
    boothId.value = null;
    cartItems.value = [];
    storeName.value = "";
  };

  return {
    boothId,
    cartItems,
    storeName,
    totalCount,
    addToCart,
    setBoothId,
    setStoreName,
    clearCart,
  };
});
