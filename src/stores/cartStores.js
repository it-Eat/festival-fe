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
      if (quantity === 0) {
        cartItems.value = cartItems.value.filter(item => item.id !== menu.id);
      } else {
        existingItem.quantity = quantity;
      }
    } else if (quantity > 0) {
      cartItems.value.push({
        id: menu.id,
        name: menu.name,
        price: menu.price,
        quantity: quantity,
        image: menu.image
      });
    }
  };

  return {
    cartItems,
    totalCount,
    addToCart
  };
});
