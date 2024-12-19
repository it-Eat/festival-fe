<script setup>
import backHeader from "@/components/common/backHeader.vue";

// props를 사용하기 위해 변수에 할당
const props = defineProps({
  playNum: {
    type: Number,
    required: true,
  },
  playPosition: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="container">
    <backHeader></backHeader>
    <div class="sub-container">
      <div>
        <div class="logo-image">
          <div>로고이미지부분</div>
        </div>
      </div>

      <div class="main">
        <div class="booth">
          <span>선택된 놀거리 번호: props.playNum </span>
          <span>부스 위치: props.playPosition </span>
        </div>
        <div class="description">
          <div class="contents">props.playDescription</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo-image {
  background-color: #6b5b95;
  width: 100vw;
  height: 200px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  height: 95vh;
  display: flex; /* 추가 */
  flex-direction: column; /* 추가 */
}

.sub-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1; /* 추가 */
}

.main {
  display: flex;
  flex-direction: column;
  flex: 1; /* 추가 */
  width: 100%; /* 추가 */
}

.description {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a999d4;
  flex: 1; /* 추가 */
}
.contents {
  background-color: aliceblue;
}
</style>
