<script setup>
import { ref, watch, defineEmits } from "vue";

const emit = defineEmits(["update:modelValue", "search"]);
const props = defineProps({
  modelValue: String,
});

const keyword = ref(props.modelValue || "");

watch(keyword, (val) => {
  emit("update:modelValue", val);
});

const handleSearch = () => {
  emit("search");
};
</script>

<template>
  <form class="container" @submit.prevent="handleSearch">
    <input type="text" v-model="keyword" placeholder="검색어를 입력해주세요" />
    <button class="btn" type="submit">검색</button>
  </form>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

input {
  width: 100%;
  height: 32px;
  font-size: 15px;
  border: 0;
  border-radius: 8px;
  outline: none;
  padding-left: 10px;
  background-color: white;
  border: 1px solid #ccc;
}

input:focus {
  outline: none;
}

.btn {
  float: right;
  width: 100px;
  height: 32px;
  border: 2px solid #fe6f61;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
}

.btn:hover {
  background-color: #fe6f61;
  color: white;
  cursor: pointer;
}
</style>
