<template>
  <div class="notice-wrapper">
    <h1>공지사항 관리</h1>

    <!-- 검색/달력/버튼 영역 -->
    <div class="container-search">
      <div class="search-left">
        <!-- <adminCalendar /> -->
        <!-- <searchBar /> -->
      </div>
      <!-- 우측 버튼 -->
      <div class="button-group">
        <button class="create-btn" @click="isWriteOpen = true">작성</button>
        <button class="delete-btn" @click="deleteNotices">삭제</button>
      </div>
    </div>

    <!-- 공지사항 목록 테이블 -->
    <div class="container-list">
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
            <td @click.stop>
              <!-- 클릭 이벤트 전파 중단 -->
              <input
                type="checkbox"
                :checked="selectedNoticeIds.includes(notice.id)"
                @click="handleCheck($event, notice.id)"
              />
            </td>
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
        <span>{{ currentPage }} / {{ maxPage }}</span>
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
import adminNoticeDetail from "./adminNoticeDetail.vue";
import adminNoticeWrite from "./adminNoticeWrite.vue";
import { useRouter } from "vue-router";
import { deleteNotice } from "@/api/admin";
import { dateFormatWithoutTime } from "@/util/dateFormat";

const router = useRouter();
const notices = ref([]);
const isModalOpen = ref(false);
const selectedNotice = ref(null);
const isWriteOpen = ref(false);
const selectedNoticeIds = ref([]);

const festivalId = router.currentRoute.value.params.festivalId;

// 페이지네이션 관련 변수
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const maxPage = ref(1);

const deleteNotices = async () => {
  try {
    const deletePromises = selectedNoticeIds.value.map((id) =>
      deleteNotice([id.toString()], festivalId)
    );

    // 모든 삭제 요청을 병렬로 처리
    await Promise.all(deletePromises);
    getNoticeList();
    selectedNoticeIds.value = [];
  } catch (error) {
    console.error("공지사항 삭제 실패:", error);
  }
};

const handleCheck = (event, noticeId) => {
  console.log(selectedNoticeIds.value);
  event.stopPropagation();
  if (event.target.checked) {
    selectedNoticeIds.value.push(noticeId);
  } else {
    selectedNoticeIds.value = selectedNoticeIds.value.filter(
      (id) => id !== noticeId
    );
  }
};
// 공지사항 조회 함수
const getNoticeList = async () => {
  try {
    const query = {
      page: currentPage.value,
      pageSize: pageSize.value,
      orderBy: "recent",
    };
    const response = await getNotice(festivalId, query);
    maxPage.value = response.totalPages;
    notices.value = response.data;
  } catch (error) {
    console.error("공지사항 API 호출 실패:", error);
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return dateFormatWithoutTime(dateString);
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
  margin-bottom: 24px;
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
  border-radius: 8px;
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
.custom-table thead th {
  padding: 12px;
  font-weight: 600;
  background-color: #fff5f4;
  color: #fe6f61;
  border-bottom: 2px solid #fe6f61;
  border-top: 2px solid #fe6f61;
}

/* 테이블 헤더 */
/* .custom-table thead th {
  border-bottom: 2px solid #333;
  padding: 12px 8px;
  font-weight: 600;
  background-color: #f9f9f9;
} */

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
  border: 1px solid #fe6f61;
  border-radius: 4px;
  background-color: white;
  color: #fe6f61;
  cursor: pointer;
}
.pagination-nav button:hover:not(:disabled) {
  background-color: #fe6f61;
  color: white;
}

.pagination-nav button:disabled {
  border-color: #ddd;
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.pagination-nav span {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}
</style>
