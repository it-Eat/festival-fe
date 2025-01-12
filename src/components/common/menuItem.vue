<template>
  <div class="menu-card">
    <img :src="menu.image" :alt="menu.name" class="menu-image" />
    <div class="menu-info">
      <span class="menu-name">{{ menu.name }}</span>
      <span class="menu-price">{{ menu.price }}</span>
    </div>
    <div class="button" v-if="showButton">
      <UpdownButton />
    </div>
  </div>
</template>

<script>
import UpdownButton from './updownButton.vue';
export default {
  components: { UpdownButton },
  props: {
    menu: { type: Object, required: true },
    showButton: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
/* menuItem.vue 스타일 */
.menu-card { display: flex; align-items: center; width: 100%; padding: 10px; border-bottom: 1px solid #eee; box-sizing: border-box; justify-content: space-between; }
.menu-image { width: 80px; height: 80px; margin-right: 10px; object-fit: cover; }
.menu-info { display: flex; flex-direction: column; flex-grow: 1; }
.menu-name { font-weight: bold; margin-bottom: 5px; }
</style>
