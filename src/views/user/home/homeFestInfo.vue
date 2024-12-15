<script setup>

</script>

<template>
  <div class="container">
    <h1>축제정보뷰</h1>
    <button class="button">인스타그램</button><br>
    <button class="button">축제 지도</button><br>
    <button class="button">축제 정보</button><br>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.button {
  color: white;
  font-size: 16px;
  background-color: brown;
  padding: 10px 20px; 
  margin: 5px;
  width: 80%;
  max-width: 400px; 
  height: 60px; 
  text-align: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}


.button:hover {
  background-color: darkred;
  transform: scale(1.05);
}
</style>
