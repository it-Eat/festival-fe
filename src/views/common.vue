<script setup>
// 공통페이지
import festivalDefault from "@/assets/festivalDefault.png";
import { useRouter } from "vue-router";
import { getFestivalList } from "@/stores/festival";
import { ref, onMounted, onUnmounted } from "vue";
import backHeader from "@/components/common/backHeader.vue";

const router = useRouter();
const isLoading = ref(false);
const hasMoreData = ref(true);
const cursor = ref(0);
const limit = ref(9);
const keyword = ref("");
const festivalItems = ref([]);

function getEventStatus(startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) return { text: "날짜 미정", color: "gray" };

  // YYYYMMDD 형식의 문자열을 Date 객체로 변환
  const startYear = parseInt(startDateStr.substring(0, 4));
  const startMonth = parseInt(startDateStr.substring(4, 6)) - 1;
  const startDay = parseInt(startDateStr.substring(6, 8));

  const endYear = parseInt(endDateStr.substring(0, 4));
  const endMonth = parseInt(endDateStr.substring(4, 6)) - 1;
  const endDay = parseInt(endDateStr.substring(6, 8));

  const startDate = new Date(startYear, startMonth, startDay);
  const endDate = new Date(endYear, endMonth, endDay);
  endDate.setHours(23, 59, 59);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 현재 날짜와 이벤트 날짜 비교
  if (today >= startDate && today <= endDate) {
    return { text: "개최중", color: "#4CAF50" };
  } else if (today < startDate) {
    const daysLeft = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
    if (daysLeft <= 7) {
      return { text: `D-${daysLeft}`, color: "#FF9800" };
    } else {
      return { text: `D-${daysLeft}`, color: "#2196F3" };
    }
  } else {
    return { text: "종료됨", color: "#9E9E9E" };
  }
}

async function handleScroll() {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;

  if (
    scrollTop + clientHeight >= scrollHeight - 100 &&
    !isLoading.value &&
    hasMoreData.value
  ) {
    loadMoreData();
  }
}

async function loadMoreData() {
  if (isLoading.value || !festivalItems.value.nextCursor) return;

  isLoading.value = true;
  try {
    cursor.value = festivalItems.value.nextCursor;
    const response = await getFestivalList(
      cursor.value,
      limit.value,
      keyword.value
    );

    if (response.items && response.items.length > 0) {
      festivalItems.value.items = [
        ...festivalItems.value.items,
        ...response.items,
      ];
      festivalItems.value.nextCursor = response.nextCursor;
    } else {
      hasMoreData.value = false;
    }
  } catch (error) {
    console.error("추가 데이터 로드 실패:", error);
  } finally {
    isLoading.value = false;
  }
}

async function goDetail(id) {
  console.log(id);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  return `${year}년 ${month}월 ${day}일`;
}

onMounted(() => {
  const fetchInitialData = async () => {
    isLoading.value = true;
    try {
      const response = await getFestivalList(
        cursor.value,
        limit.value,
        keyword.value
      );
      festivalItems.value = response;
    } finally {
      isLoading.value = false;
    }
  };

  fetchInitialData();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

async function searchFestival() {
  cursor.value = 0;
  hasMoreData.value = true;

  isLoading.value = true;
  try {
    const response = await getFestivalList(
      cursor.value,
      limit.value,
      keyword.value
    );
    festivalItems.value = response;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="mainpage">
    <div class="body">
      <backHeader
        :title="'불꽃놀이 페스티벌'"
        :useUserName="false"
        :category="'home'"
      />
      <div class="body-header">
        <input
          class="body-header-input"
          type="text"
          placeholder="검색어를 입력해주세요."
          v-model="keyword"
        />
        <button class="body-header-button" @click="searchFestival">검색</button>
      </div>
      <div class="body-content">
        <div
          @click="goDetail(item.id)"
          class="body-content-item"
          v-for="item in festivalItems.items"
          :key="item.id"
        >
          <img
            class="body-content-item-img"
            :src="item.mapImage || festivalDefault"
            alt="img"
          />
          <div
            class="status-chip"
            :style="{
              backgroundColor: getEventStatus(
                item.eventStartDate,
                item.eventEndDate
              ).color,
            }"
          >
            {{ getEventStatus(item.eventStartDate, item.eventEndDate).text }}
          </div>
          <p>{{ item.festivalName || "행사명 정보 없음" }}</p>
          <p>
            {{ formatDate(item.eventStartDate) }} ~
            {{ formatDate(item.eventEndDate) }}
          </p>
          <p>
            {{
              item.address
                ? item.address.split(" ").slice(0, 2).join(" ")
                : "주소 정보 없음"
            }}
          </p>
        </div>
      </div>
    </div>
    <h1>공통 페이지 입니다.</h1>
    <RouterLink to="/adminLogin" class="router-link">관리자로그인</RouterLink
    ><br />
    <RouterLink to="/user" class="router-link">사용자</RouterLink><br />

    <div v-if="isLoading" class="loading">데이터 로딩 중...</div>
    <div
      v-if="
        !hasMoreData && festivalItems.items && festivalItems.items.length > 0
      "
      class="no-more-data"
    >
      더 이상 표시할 축제가 없습니다.
    </div>
  </div>
</template>

<style scoped>
.mainpage {
  display: flex;
  max-width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.body {
  display: flex;
  max-width: 600px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.body-header {
  display: flex;
  width: 100%;
  gap: 10px;
  margin-bottom: 10px;
}
.body-header-input {
  width: 100%;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.body-header-button {
  width: 100px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.body-content {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 3px;
}
.body-content-item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 33%;
}
.body-content-item-img {
  width: 100%;
  height: 250px;
}
.status-chip {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  border-radius: 15px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.body-content-item p {
  margin: 0;
  font-size: 12px;
  color: #666;
}
.loading {
  text-align: center;
  padding: 20px;
  width: 100%;
}
.no-more-data {
  text-align: center;
  padding: 20px;
  color: #999;
  width: 100%;
}
</style>
