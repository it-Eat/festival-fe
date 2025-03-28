<template>
  <div class="counter">
    <button @click="decrease" :disabled="count <= 0">-</button>
    <span>{{ count }}</span>
    <button @click="increase">+</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  initialValue: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update:modelValue"]);
const count = ref(props.initialValue);

const increase = () => {
  count.value++;
  emit("update:modelValue", count.value);
};

const decrease = () => {
  if (count.value > 0) {
    count.value--;
    emit("update:modelValue", count.value);
  }
};

const reset = () => {
  count.value = 0;
  emit("update:modelValue", 0);
};

defineExpose({ reset });
</script>

<style scoped>
.counter {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  width: 30px;
  height: 30px;
  border: 1px solid #ff6f61;
  background-color: white;
  color: #ff6f61;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  border-color: #ccc;
  color: #ccc;
  cursor: not-allowed;
}

span {
  min-width: 20px;
  text-align: center;
}
</style>
