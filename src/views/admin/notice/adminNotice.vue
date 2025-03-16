<template>
  <div class="notice-wrapper">
    <h1>공지사항 관리</h1>

    <!-- 검색/달력/버튼 영역 -->
    <div class="container-search">
      <div class="search-left">
        <adminCalendar />
        <searchBar />
      </div>
      <!-- 우측 버튼 -->
      <div class="button-group">
        <button class="create-btn" @click="isWriteOpen = true">작성</button>
        <button class="delete-btn">삭제</button>
      </div>
    </div>

    <!-- 공지사항 목록 테이블 -->
    <div class="container-list">
      <hr class="line-strong" />
      <table class="custom-table">
        <thead>
          <tr>
            <th style="width: 60px">✔</th>
            <th style="width: 120px">작성자</th>
            <th style="width: 500px">내용</th>
            <th style="width: 220px">작성일자</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="notice in notices"
            :key="notice.id"
            @click="openModal(notice)"
            class="table-row"
          >
            <td><input type="checkbox" /></td>
            <td>관리자</td>
            <td class="notice-content">{{ notice.content }}</td>
            <td>{{ formatDate(notice.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
      <hr class="line-light" />
      <!-- 이전/다음 버튼을 통한 페이지네이션 -->
      <div class="pagination-nav">
        <button @click="goToPreviousPage" :disabled="currentPage === 1">
          이전
        </button>
        <span>페이지 {{ currentPage }} / {{ maxPage }}</span>
        <button @click="goToNextPage" :disabled="currentPage >= maxPage">
          다음
        </button>
      </div>
    </div>

    <!-- 수정/보기 모달 -->
    <adminNoticeDetail
      :notice="selectedNotice"
      :isOpen="isModalOpen"
      @close="closeModal"
      @update-success="handleUpdateSuccess"
    />

    <!-- 공지사항 작성 모달 -->
    <adminNoticeWrite
      :isOpen="isWriteOpen"
      @close="isWriteOpen = false"
      @write-success="handleWriteSuccess"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { getNotice } from "@/api/admin"; // 공지사항 API 호출 함수
import adminCalendar from "@/components/admin/common/adminCalendar.vue";
import searchBar from "@/components/admin/common/searchBar.vue";
import adminNoticeDetail from "./adminNoticeDetail.vue";
import adminNoticeWrite from "./adminNoticeWrite.vue";

const notices = ref([]);
const isModalOpen = ref(false);
const selectedNotice = ref(null);
const isWriteOpen = ref(false);

// 페이지네이션 관련 변수
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);

// 최대 페이지 계산 (전체 항목 수와 페이지당 개수를 기반)
const maxPage = computed(() => {
  return Math.ceil(totalItems.value / pageSize.value) || 1;
});

// 공지사항 조회 함수
const getNoticeList = async () => {
  try {
    const festivalId = 1;
    const query = {
      page: currentPage.value,
      pageSize: pageSize.value,
      orderBy: "recent",
    };
    const response = await getNotice(festivalId, query);

    if (response && response.total !== undefined) {
      notices.value = response.items;
      totalItems.value = response.total;
    } else if (Array.isArray(response)) {
      notices.value = response;
      totalItems.value = 50;
    }
    // 그 외의 경우 기본값 할당
    else {
      notices.value = [];
      totalItems.value = 0;
    }
  } catch (error) {
    console.error("공지사항 API 호출 실패:", error);
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString("ko-KR");
};

const openModal = (notice) => {
  selectedNotice.value = notice;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedNotice.value = null;
};

// 이전 페이지 버튼 클릭
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    getNoticeList();
  }
};

// 다음 페이지 버튼 클릭
const goToNextPage = () => {
  if (currentPage.value < maxPage.value) {
    currentPage.value++;
    getNoticeList();
  }
};

const handleUpdateSuccess = () => {
  getNoticeList();
};

const handleWriteSuccess = () => {
  isWriteOpen.value = false;
  getNoticeList();
};

onMounted(() => {
  getNoticeList();
});
</script>

<style scoped>
.notice-wrapper {
  max-width: 2000px;
  margin: 40px;
  padding: 0 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 30px;
  text-shadow: 4px 4px rgb(226, 223, 223);
}

.container-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

/* 검색 부분(왼쪽) */
.search-left {
  display: flex;
  gap: 10px;
}

/* 버튼 그룹(오른쪽) */
.button-group {
  display: flex;
  gap: 10px;
}

/* 작성 버튼 (초록색) */
.create-btn {
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
}
.create-btn:hover {
  background-color: #43a047;
}

/* 삭제 버튼 (빨간색) */
.delete-btn {
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
}
.delete-btn:hover {
  background-color: #e53935;
}

/* 테이블 영역 */
.container-list {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
}

/* 진한 선 */
.line-strong {
  border: none;
  border-top: 2px solid #333;
  margin-bottom: 10px;
}
/* 옅은 선 */
.line-light {
  border: none;
  border-top: 1px solid #aaa;
  margin-top: 10px;
}

/* 테이블 스타일 */
.custom-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 1rem;
  text-align: center;
}

/* 테이블 헤더 */
.custom-table thead th {
  border-bottom: 2px solid #333;
  padding: 12px 8px;
  font-weight: 600;
  background-color: #f9f9f9;
}

/* 테이블 바디(각 행) */
.table-row {
  cursor: pointer;
  border-bottom: 1px solid #ddd;
  transition: background-color 0.2s;
}
.table-row:hover {
  background-color: #f5f5f5;
}
.custom-table tbody td {
  padding: 12px 8px;
}

/* 내용 셀 (너무 길면 말줄임) */
.notice-content {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 500px;
}

/* 이전/다음 버튼을 위한 페이지네이션 네비게이션 */
.pagination-nav {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.pagination-nav button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #ff6f61;
  color: white;
  cursor: pointer;
}

.pagination-nav button:disabled {
  background-color: #ccc;
  cursor: default;
}

.pagination-nav span {
  font-size: 1rem;
  font-weight: bold;
}
</style>
