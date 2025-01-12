import { defineStore } from "pinia";
import { ref } from "vue";
import charryice from "@/assets/food/charryice.jpg";
import chicken from "@/assets/food/chicken.jpg";
import crepe from "@/assets/food/crepe.jpg";
import fishcake from "@/assets/food/fishcake.jpg";
import leegane from "@/assets/food/leegane.jpg";
import sausage from "@/assets/food/sausage.jpg";

export const useFoodStore = defineStore("food", () => {
  const foodList = ref([
    {
      id: 1,
      img: charryice,
      name: "벚꽃아이스",
      position: "1구역",
      star: 4.1,
    },
    {
      id: 2,
      img: chicken,
      name: "닭꼬치",
      position: "1구역",
      star: 4.2,
    },
    {
      id: 3,
      img: crepe,
      name: "크레페",
      position: "1구역",
      star: 4.3,
    },
    {
      id: 4,
      img: fishcake,
      name: "오뎅",
      position: "1구역",
      star: 4.4,
    },
    {
      id: 5,
      img: leegane,
      name: "이가네",
      position: "1구역",
      description:
        "전통적인 한국식 간식으로, 고소한 맛의 재료가 가득한 떡입니다. 간편하게 먹을 수 있어 남녀노소에게 사랑받고 있습니다.",
      star: 4.5,
    },
    {
      id: 6,
      img: sausage,
      name: "소세지",
      position: "1구역",
      star: 4.6,
    },
    {
      id: 7,
      img: charryice,
      name: "벚꽃아이스",
      position: "1구역",
      star: 4.7,
    },
    {
      id: 8,
      img: chicken,
      name: "닭꼬치",
      position: "1구역",
      star: 4.8,
    },
    {
      id: 9,
      img: crepe,
      name: "크레페",
      position: "1구역",
      star: 4.9,
    },
    {
      id: 10,
      img: fishcake,
      name: "오뎅",
      position: "1구역",
      star: 5.0,
    },
    {
      id: 11,
      img: leegane,
      name: "이가네",
      position: "1구역",
      star: 5.1,
    },
    {
      id: 12,
      img: sausage,
      name: "소세지",
      position: "1구역",
      star: 5.2,
    },
  ]);

  const getFoodById = (id) => {
    return foodList.value.find((item) => item.id === id);
  };

  return { foodList, getFoodById };
});
