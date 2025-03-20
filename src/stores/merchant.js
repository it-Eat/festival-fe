import { defineStore } from "pinia";

export const useMerchantStore = defineStore('store', {
  state: () => ({
    storeName: '',
  }),
  persist: {
    enable : true,
    storage: sessionStorage,
  },
  actions: {
    setStoreName(name){
      this.storeName = name;
    },
  },
});
