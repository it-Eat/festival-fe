<script setup>
import { ref } from "vue";

const startDate = ref("");
const endDate = ref("");
const highlightedDates = ref([]);

const today = new Date().toISOString().split("T")[0]; // 현재 일자

const dataChange = (e) => {
  const target = e.target;
  if (target.value === "") {
    target.classList.remove("has-value");
  } else {
    target.classList.add("has-value");
  }

  if (target.type === "date") {
    if (target === document.getElementById("start-date")) {
      startDate.value = target.value;
      endDate.value = ""; // 종료일 초기화
      document.getElementById("end-date").setAttribute("min", target.value); // 종료일 최소값 설정
    } else if (target === document.getElementById("end-date")) {
      endDate.value = target.value;
    }
    updateHighlightedDates();
  }
};

const updateHighlightedDates = () => {
  highlightedDates.value = [];
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      highlightedDates.value.push(new Date(d).toISOString().split("T")[0]);
    }
  }
};
</script>

<template>
  <div>
    시작일:
    <input id="start-date" type="date" @change="dataChange" :max="today" />
    종료일:
    <input
      id="end-date"
      type="date"
      @change="dataChange"
      :disabled="!startDate"
      :max="today"
    />
    <!-- <div v-if="startDate && endDate">
      선택한 날짜: {{ startDate }} ~ {{ endDate }}
    </div> -->
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
