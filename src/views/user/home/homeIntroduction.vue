<script setup></script>

<template>
  <div class="container">
    <button class="join-button">참여하기</button><br />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 450px;
}

.join-button {
  color: black;
  font-size: 16px;
  background-color: white;
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

.join-button:hover {
  background-color: #ff6e61b0;
  transform: scale(1.05);
}
</style>
