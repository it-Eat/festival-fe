<script setup>
import BackHeader from '@/components/common/backHeader.vue';
</script>

<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader/>
      </div>
      <div class="content">

      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 600px;
  height: 95vh;
  box-sizing: border-box;
  margin: auto;
}

@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}

.header {
  width: 100%;
  margin-bottom: 20px;
}
</style>
