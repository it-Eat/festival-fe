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
  {
    id: 1,
    img: facefainting,
    name: "페이스 페인팅",
    position: "1구역",
    description:
      "페이스페인팅이란, 화지에 그림을 그리듯 얼굴에 그림을 그려 즐기는 아트입니다.",
  },
  {
    id: 2,
    img: ceramic,
    name: "도자기 체험",
    position: "2구역",
    description:
      "도자기 체험이란, 도자기를 체험해 보는 유익한 시간이 될 수 있습니다.",
  },
  {
    id: 3,
    img: dartgame,
    name: "다트 게임",
    position: "3구역",
    description:
      "다트게임이란, 화지에 그림을 그리듯 얼굴에 그림을 그려 즐기는 아트입니다.",
  },
  {
    id: 4,
    img: necklace,
    name: "목걸이 만들기",
    position: "4구역",
    description:
      "목걸이 만들기는 수제로 자기 자신만의 아름다운 목걸이를 만들 수 있습니다..",
  },
  {
    id: 5,
    img: photo,
    name: "즉석 사진 촬영",
    position: "5구역",
    description:
      "즉시 사진을 촬영해주어 면접, 여권, 주민등록증 등의 발급에 사용할 수 있습니다.",
  },
  {
    id: 6,
    img: personal,
    name: "퍼스널 컬러 진단",
    position: "6구역",
    description:
      "퍼스널 컬러 진단이란, 각자의 피부톤에 맞는 어울리는 색상을 찾아주고 스타일링해주는 진단입니다.",
  },
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
      :key="play.id"
      :item="play"
      card-type="playing"
    ></photoCard>
    <button class="button1" @click="goToPlayingList">더보기</button>
  </div>
</template>

<style scoped>
.button1 {
  grid-column: 1 / -1; /* 버튼이 전체 너비를 차지하도록 */
  justify-self: center;
}
</style>
