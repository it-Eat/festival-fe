<script setup>
import { ref } from "vue";
const emit = defineEmits(["onKeySelect"]);

defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const key = ref("");

const onSelect = () => {
  key.value = event.target.value;
  emit("onKeySelect", key.value);
};
</script>

<template>
  <div class="custom-select-container">
    <select class="custom-select" @change="onSelect">
      <option value="" disabled selected>부스 타입을 선택해주세요</option>
      <option v-for="option in items" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped>
select {
  width: 200px;
  padding: 8px 32px 8px 12px;
  border: 1px solid #fe6f61;
  font-family: "Pretendard";
  border-radius: 5px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fe6f61'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 32px;
  background-color: white;
}

select::-ms-expand {
  display: none;
}

select:focus {
  outline: none;
  border: 1px solid #fe6f61;
}

select:hover {
  border: 1px solid #fe6f61;
  background-color: #fff5f4;
}
</style>
