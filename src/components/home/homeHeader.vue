<script setup>
import { AlignJustify } from 'lucide-vue-next';
import { Bell } from 'lucide-vue-next';
</script>

<template>
  <div class="header-container">
    <Bell class="left-icon" />
    <h1>진해군항제</h1>
    <AlignJustify class="right-icon" />
  </div>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  position: relative;
  width: 100%; 
}

.header-container h1 {
  font-size: 1.2rem;
  margin: 0; 
  transform: translateX(-50%);
  left: 50%;
  position: absolute;
}

.left-icon {
  margin-left: 10px; 
}

.right-icon {
  margin-right: 10px; 
}
</style>
