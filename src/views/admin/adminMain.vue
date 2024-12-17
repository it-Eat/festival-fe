<script setup>
import menuComponent from "@/components/admin/menuComponent.vue";
import adminContent from "./adminContent.vue";
</script>

<template>
  <div class="container">
    <div class="menu">
      <menuComponent />
    </div>
    <div class="content">
      <adminContent />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: 100vh;
  overflow: hidden;
}

.menu {
  background-color: #f0f0f0;
  padding: 20px;
  border-right: 1px solid #ddd;
  overflow: hidden;
}

.content {
  padding: 20px;
  background-color: #fff;
  overflow: hidden;
}
</style>
