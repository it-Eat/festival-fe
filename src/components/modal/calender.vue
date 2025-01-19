<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(['update:start-date', 'update:end-date', 'selected-date-range']);

const startDate = ref("");
const endDate = ref("");
const today = new Date().toISOString().split("T")[0];

const dataChange = (e) => {
  const target = e.target;
  if (target.value === "") {
    target.classList.remove("has-value");
  } else {
    target.classList.add("has-value");
  }

  if (target.id === "start-date") {
    startDate.value = target.value;
    endDate.value = "";
    document.getElementById("end-date").setAttribute("min", target.value);
    emit('update:start-date', startDate.value); // 양방향 바인딩을 위한 emit
  } else if (target.id === "end-date") {
    endDate.value = target.value;
    emit('update:end-date', endDate.value); // 양방향 바인딩을 위한 emit
  }
  if (startDate.value && endDate.value) {
    emit('selected-date-range', { startDate: startDate.value, endDate: endDate.value });
  }
};
</script>

<template>
  <div>
    시작일:
    <input id="start-date" type="date" @change="dataChange" :max="today" v-model="startDate" />
    종료일:
    <input
      id="end-date"
      type="date"
      @change="dataChange"
      :disabled="!startDate"
      :max="today"
      v-model="endDate"
    />
  </div>
</template>

<style>
input[type="date"] {
  position: relative;
  padding: 6px;
  width: 150px;
  height: 20px;
  font-size: 12px;
  color: #201f1f;
  border: 1px solid #999;
  border-radius: 8px;
  margin-right: 10px; /* 두 입력 필드 사이의 간격 */
}

input[type="date"].has-value::before {
  content: attr(data-placeholder);
  width: 100%;
}

/* 날짜 강조 스타일 */
input[type="date"].highlighted {
  background-color: #ffeb3b; /* 강조 색상 */
}
input[type="date"]::before {
  content: attr(data-placeholder);
  width: 100%;
}
</style>
