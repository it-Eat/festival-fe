import { defineStore } from "pinia";
import { ref } from "vue";

export const useFestivalInfoStore = defineStore(
  "festivalInfo",
  () => {
    // 선택한 축제 ID 저장 변수
    const selectedFestivalId = ref(null);

    // 축제 ID 설정 함수
    const setFestivalId = (id) => {
      selectedFestivalId.value = id;
    };

    return { selectedFestivalId, setFestivalId };
  },
  {
    // sessionStorage에 persist
    persist: {
      enabled: true,
      storage: sessionStorage,
    },
  }
);
