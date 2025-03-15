<script setup>
const props = defineProps({
  found: {
    type: Boolean,
    required: true,
  },
});
</script>
<template>
  <!-- lostChip -->
  <div class="status">
    <div class="a" v-if="props.found">습득</div>
    <div class="b" v-else>분실</div>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  padding: 10px;
  box-sizing: border-box;
}
.status {
  display: flex; /* flexbox로 설정하여 가로 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  font-size: 10px;
  white-space: nowrap; /* 한 줄로 표시 */
}

.a {
  background-color: blue;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
}
.b {
  background-color: red;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
}

.list-item {
  display: flex; /* Added to ensure proper layout */
  align-items: center; /* Added for vertical alignment */
  justify-content: space-between; /* Added for item alignment */
  background-color: white;
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px; /* Adjusted margin */
  width: 100%;
  border-bottom: 1px solid black; /* Added for consistency */
}

.menu {
  margin-bottom: 12px;
  font-weight: bold;
  font-size: 18px;
}

.divider {
  border: none;
  height: 1px;
  background-color: black;
  margin: 10px 0;
}

.more-button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.more-button {
  background-color: #e74c3c;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
}

.more-button a {
  text-decoration: none;
  color: white;
}

.list-item .title {
  max-width: 150px; /* Prevent title overflow */
  white-space: nowrap; /* Prevent title from wrapping */
  overflow: hidden; /* Hide overflow */
  text-overflow: ellipsis; /* Add ellipsis for overflowed text */
}
</style>
