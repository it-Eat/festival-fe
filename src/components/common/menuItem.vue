<template>
  <div class="menu-card">
    <div>
      <img :src="menu.img" :alt="menu.name" class="menu-image" />
    </div>
    <div class="menu-item">
      <div class="menu-name">{{ menu.name }}</div>
      <div class="menu-ps">
        <div class="menu-position">{{ menu.position }}</div>
        <div class="menu-star">{{ menu.star }}</div>
      </div>
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
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #eee; /* 하단 테두리 추가 */
  box-sizing: border-box; /* padding을 포함한 너비 계산 */
}

.menu-item {
  margin-left: 10px; /* 이미지와의 간격 추가 */
  width: 90%;
}

.menu-image {
  width: 80px;
  height: 80px;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 3px;
}

.menu-ps {
  display: flex;
  margin-top: 5px;
  witdh: 100%;
}

.menu-position {
  margin-right: auto;
}

.menu-star {
  margin: 0px auto;
}

.menu-name {
  font-weight: bold;
  margin: 0; /* 기본 여백 제거 */
}
</style>
