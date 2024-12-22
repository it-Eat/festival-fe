<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import photoCard from "@/components/common/photoCard.vue";
import facefainting from "@/assets/play/facefainting.jpeg";
import dartgame from "@/assets/play/dart.png";
import necklace from "@/assets/play/necklace.jpeg";
import photo from "@/assets/play/photo.jpeg";
import ceramic from "@/assets/play/ceramic.jpeg";
import personal from "@/assets/play/personalcolor.jpeg";

const playList = ref([
  { playNum: 1, img: facefainting, name: "페이스 페인팅" },
  { playNum: 2, img: ceramic, name: "도자기 체험" },
  { playNum: 3, img: dartgame, name: "다트 게임" },
  { playNum: 4, img: necklace, name: "목걸이 만들기" },
  { playNum: 5, img: photo, name: "즉석 사진 촬영" },
  { playNum: 6, img: personal, name: "퍼스널 컬러 진단" },
]);

const router = useRouter();

const goToPlayingList = () => {
  router.push("/user/playing/playingList");
};
</script>

<template>
  <div>
    <photoCard
      v-for="play in playList"
      :key="play.playNum"
      :item="play"
    ></photoCard>
    <button class="button1" @click="goToPlayingList">자세히보기</button>
  </div>
</template>

<style scoped>
.button1 {
  grid-column: 1 / -1; /* 버튼이 전체 너비를 차지하도록 */
  justify-self: center;
}
</style>
