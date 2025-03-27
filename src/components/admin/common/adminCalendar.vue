<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits(["date-selected"]);

const startDate = ref("");
const endDate = ref("");
const highlightedDates = ref([]);
const today = new Date().toISOString().split("T")[0];

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
      endDate.value = "";
      document.getElementById("end-date").setAttribute("min", target.value);
    } else if (target === document.getElementById("end-date")) {
      endDate.value = target.value;
    }

    updateHighlightedDates();

    // 여기서 날짜를 YYYYMMDD로 포맷팅
    if (startDate.value && endDate.value) {
      emit("date-selected", {
        page: 1,
        pageSize: 4,
        orderBy: "createdAt",
        order: "asc",
        startDate: startDate.value,
        endDate: endDate.value,
        typeSelect: "",
        keyword: "",
      });
    }
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
  <div class="calendar-container">
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
  </div>
</template>

<style>
.calendar-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

input[type="date"] {
  position: relative;
  padding: 8px;
  width: 120px;
  height: 32px;
  font-size: 12px;
  color: #201f1f;
  border: 1px solid #ff6f61;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
}
</style>
