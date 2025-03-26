<template>
  <div class="quantity-control">
    <button @click="decrement">-</button>
    <span>{{ quantity }}</span>
    <button @click="increment">+</button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  initialValue: { type: Number, default: 0 },
});

const emit = defineEmits(["update:modelValue"]);

const quantity = ref(props.initialValue);

// initialValue가 변경될 때 quantity를 업데이트
watch(
  () => props.initialValue,
  (newValue) => {
    quantity.value = newValue;
  }
);

const increment = () => {
  quantity.value++;
  emit("update:modelValue", quantity.value);
};

const decrement = () => {
  if (quantity.value > 0) {
    quantity.value--;
    emit("update:modelValue", quantity.value);
  }
};

defineExpose({ quantity });
</script>

<style scoped>
/* updownButton.vue 스타일 */
.quantity-control {
  display: inline-flex;
  align-items: center;
  border: none;
  padding: 5px;
  border-radius: 5px;
}
.quantity-control button {
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ff6f61;
  background-color: #fff;
  color: #ff6f61;
  cursor: pointer;
  border-radius: 3px;
}
.quantity-control button:hover {
  background-color: #ff6f61;
  color: #fff;
}
.quantity-control span {
  width: 30px;
  text-align: center;
}
</style>
