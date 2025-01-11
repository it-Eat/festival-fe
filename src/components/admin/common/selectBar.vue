<script setup>
import { ref } from "vue";
const emit = defineEmits(["onKeySelect"]);

const props = defineProps({
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
      <option value="" disabled selected>선택해주세요</option>
      <option
        v-for="option in items"
        :key="option.value"
        :value="option.value"
        :disabled="option.value === '' ? true : false"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<style scoped>
select {
  width: 200px;
  padding: 5px;
  border: 1px solid #999;
  font-family: "Nanumgothic";
  border-radius: 5px;
}
</style>
