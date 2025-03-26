<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import backHeader from "@/components/common/backHeader.vue";
import { getFestivalList } from "@/stores/festival";
import { dateFormat } from "@/util/dateFormat";
import { useRouter, RouterLink } from "vue-router";
import festivalDefault from "@/assets/festivalDefault.png";
import { useFestivalInfoStore } from "@/stores/festivalInfo"; // 새 Pinia 스토어 import

const isLoading = ref(false);
const hasMoreData = ref(true);
const cursor = ref(0);
const limit = ref(9);
const keyword = ref("");
const festivalItems = ref([]);
const router = useRouter();

// 스토어 인스턴스 생성
const festivalInfoStore = useFestivalInfoStore();

function getEventStatus(startDateStr, endDateStr) {
  if (!startDateStr || !endDateStr) return { text: "날짜 미정", color: "gray" };

  const startDate = dateFormat(startDateStr);
  const endDate = dateFormat(endDateStr);
  endDate.setHours(23, 59, 59);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (today >= startDate && today <= endDate) {
    return { text: "개최중", color: "#4CAF50" };
  } else if (today < startDate) {
    const daysLeft = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
    return {
      text: `D-${daysLeft}`,
      color: daysLeft <= 7 ? "#FF9800" : "#2196F3",
    };
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

function goDetail(id) {
  // 선택한 축제 ID를 Pinia 스토어에 저장
  festivalInfoStore.setFestivalId(id);
  router.push(`/${id}/userHome/homeFood`);
  console.log("선택된 축제 ID:", festivalInfoStore.selectedFestivalId);
  // 이후 상세 페이지로 이동
  // 예: router.push(`/festival/${id}`);
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const date = dateFormat(dateStr);
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
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
        :title="'축제 둘러보기'"
        :useUserName="false"
        :category="'home'"
        :showType="false"
      />
      <div class="body-header-link-btn">
        <p>일단 상단에 배치했고, 햄버거 수정이 없으면 하겠슴다!</p>
        <br />
        <RouterLink to="/user" class="router-link">사용자</RouterLink>
      </div>

      <form class="body-header" @submit.prevent="searchFestival">
        <input
          class="body-header-input"
          type="text"
          placeholder="검색어를 입력해주세요."
          v-model="keyword"
        />
        <button class="body-header-button" type="submit">검색</button>
      </form>
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
          <p class="body-content-item-title">
            {{ item.festivalName || "행사명 정보 없음" }}
          </p>
          <p class="body-content-item-date">
            {{ formatDate(item.eventStartDate) }} ~
            {{ formatDate(item.eventEndDate) }}
          </p>
          <p class="body-content-item-address">
            {{
              item.address
                ? item.address.split(" ").slice(0, 2).join(" ")
                : "주소 정보 없음"
            }}
          </p>
        </div>
      </div>
    </div>

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
  width: 600px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.body-header {
  display: flex;
  width: 100%;
  gap: 10px;
  padding: 24px 0;
}
.body-header-input {
  width: 100%;
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 4px 12px;
  color: black;
}
.body-header-input:focus {
  outline: none;
  border: 1px solid #ff6f61;
}
.body-header-button {
  width: 120px;
  border: 1px solid #ff6f61;
  border-radius: 8px;
  background-color: white;
  color: #ff6f61;
  padding: 4px 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
}
.body-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100%;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.body-content-item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-bottom: 24px;
  cursor: pointer;
}
.body-content-item:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.body-content-item-img {
  width: 100%;
  height: 230px;
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
.body-content-item-title {
  font-size: 16px;
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 4px;
}
.body-content-item-date {
  font-size: 12px;
  color: #414141;
  margin: 4px 0;
}
.body-content-item-address {
  font-size: 12px;
  color: #666;
  margin: 4px 0;
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
.body-header-link-btn {
  display: flex;
  width: 100%;
  gap: 10px;
  padding: 24px 0 0 0;
  margin: 0;
  align-items: center;
  justify-content: center;
}

@media (max-width: 450px) {
  .body-content {
    grid-template-columns: 1fr 1fr;
  }
  .body-content-item {
    margin-bottom: 12px;
  }
  .body-content-item-img {
    height: 160px;
  }
  .body-content-item-title {
    font-size: 14px;
  }
  .body-content-item-date {
    font-size: 10px;
  }
  .body-content-item-address {
    font-size: 10px;
  }
}
</style>
