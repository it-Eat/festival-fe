<template>
  <div class="menu-card">
    <img :src="menu.image" :alt="menu.name" class="menu-image" />
    <div class="menu-info">
      <span class="menu-name">{{ menu.name }}</span>
      <span class="menu-price">{{ menu.price }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.menu-card {
  display: flex;
  align-items: center; /* 이미지와 텍스트를 수직으로 정렬 */
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #eee; /* 하단 테두리 추가 */
  box-sizing: border-box; /* padding을 포함한 너비 계산 */
}

.menu-image {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  object-fit: cover; /* 이미지가 카드 영역을 꽉 채우도록 설정 */
}

.menu-info {
  display: flex;
  flex-direction: column; /* 메뉴 이름과 가격을 세로로 배치 */
}

.menu-name {
  font-weight: bold;
  margin-bottom: 5px;
}
</style>
