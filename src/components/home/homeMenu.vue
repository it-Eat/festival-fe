<script setup>
const menuItems = [
  { name: '먹거리', path: '/user/userHome/homeFood' },
  { name: '놀거리', path: '/user/userHome/homePlaying' },
  { name: '게시판', path: '/user/userHome/homeBoard' },
  { name: '축제 정보', path: '/user/userHome/homeFestInfo' }
];
</script>

<template>
  <div class="menu-component">
    <router-link
      v-for="(item, index) in menuItems"
      :key="index"
      :to="item.path"
      class="menu-button"
    >
      {{ item.name }}
    </router-link>
  </div>
</template>

<style scoped>
.menu-component {
  display: flex;
  width: 100%;
}

.rounded-left {
  border-top-left-radius: 10px;
}

.rounded-right {
  border-top-right-radius: 10px;
}

.menu-button {
  flex: 1;  
  height: 50px;               
  background-color: #f5985e; 
  color: #fff;             
  border: 1px solid #8b8b8b;   
  text-align: center;      
  cursor: pointer;          
  outline: none;           
  margin: 0;                
}

.menu-button:hover {
  background-color: #f47142;
}

</style>