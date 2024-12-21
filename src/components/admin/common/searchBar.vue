<script setup></script>

<template>
  <div class="container">
    <input type="text" placeholder="검색어입력" />
    <button class="btn">검색</button>
  </div>
</template>

<style scoped>
input {
  width: 150px;
  height: 32px;
  font-size: 15px;
  border: 0;
  border-radius: 5px;
  outline: none;
  padding-left: 10px;
  margin-right: 10px;
  background-color: rgb(233, 233, 233);
}

.btn {
  float: right;
  width: 50px;
  height: 30px;
  background-color: #ccc;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  transition-duration: 0.3s;
  border: none;
}

.btn:active {
  margin-left: 5px;
  margin-top: 5px;
  box-shadow: none;
}
</style>
