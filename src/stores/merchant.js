import { defineStore } from "pinia";

export const useMerchantStore = defineStore('store', {
  state: () => ({
    storeName: '',
  }),
  persist: true,
  actions: {
    setStoreName(name){
      this.storeName = name;
    },
  },
});
