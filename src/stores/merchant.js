import { defineStore } from "pinia";

export const useMerchantStore = defineStore('store', {
  state: () => ({
    storeName: '',
  }),
  actions: {
    setStoreName(name){
      this.storeName = name;
    },
  },
});
