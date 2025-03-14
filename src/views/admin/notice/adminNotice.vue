<template>
  <div class="notice-wrapper">
    <h1>공지사항 관리</h1>

    <!-- 검색영역, 달력 등 (생략 가능) -->
    <div class="container-search">
      <!-- 날짜 선택 -->
      <adminCalendar />
      <!-- 검색바 -->
      <searchBar />
      <button class="search-btn">검색</button>
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
            <!-- 임의로 '관리자' 표기 (API상 'userName' 속성이 있다면 해당 값 사용) -->
            <td>관리자</td>
            <td class="notice-content">{{ notice.content }}</td>
            <td>{{ formatDate(notice.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
      <hr class="line-light" />
      <!-- 페이지네이션 -->
      <pagination />
    </div>

    <!--
      모달 컴포넌트 (adminNoticeDetail)
      :notice="selectedNotice" - 선택한 공지사항 데이터
      :isOpen="isModalOpen" - 모달 열림/닫힘 상태
      (close) 이벤트 - 모달 내부에서 닫기 클릭 시 부모에 알림
    -->
    <adminNoticeDetail
      :notice="selectedNotice"
      :isOpen="isModalOpen"
      @close="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getNotice } from "@/api/admin"; // 공지사항 가져오는 API
import adminCalendar from "@/components/admin/common/adminCalendar.vue";
import searchBar from "@/components/admin/common/searchBar.vue";
import pagination from "@/components/common/pagination.vue";
import adminNoticeDetail from "./adminNoticeDetail.vue";

// 공지사항 리스트
const notices = ref([]);
const isModalOpen = ref(false);
const selectedNotice = ref(null);

// 공지사항 조회
const getNoticeList = async () => {
  try {
    const festivalId = 1;
    const query = {
      page: 1,
      pageSize: 5,
      orderBy: "recent",
    };
    const response = await getNotice(festivalId, query);
    notices.value = response; // 목록 갱신
  } catch (error) {
    console.error("공지사항 API 호출 실패:", error);
  }
};

// 날짜 포맷
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleString("ko-KR");
};

// 모달 열기
const openModal = (notice) => {
  selectedNotice.value = notice;
  isModalOpen.value = true;
};

// 모달 닫기
const closeModal = () => {
  isModalOpen.value = false;
  selectedNotice.value = null;
};

onMounted(() => {
  getNoticeList();
});
</script>

<style scoped>
/* 전체 Wrapper */
.notice-wrapper {
  max-width: 2000px;
  margin: 40px; /* 페이지 가운데 정렬 */
  padding: 0 20px;
}

/* 상단 타이틀 */
h1 {
  font-size: 2rem;
  margin-bottom: 30px;
  text-shadow: 4px 4px rgb(226, 223, 223);
}

/* 검색/날짜 섹션 */
.container-search {
  display: flex;
  justify-content: space-between; /* 양쪽으로 배치 */
  align-items: center;
  margin-bottom: 20px;
}

/* 날짜 관련 */
.date-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
.date-label {
  font-weight: 600;
  margin-right: 4px;
}

/* 검색 관련 */
.search-container {
  display: flex;
  align-items: center;
  gap: 8px;
}
.search-btn {
  padding: 8px 16px;
  background-color: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.search-btn:hover {
  background-color: #ee5c5c;
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
  border-collapse: separate; /* 셀 간격/분리 스타일 */
  border-spacing: 0; /* 셀 사이 간격 없애기 (원한다면 0이 아닌 값을) */
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
  background-color: #f5f5f5; /* 호버 시 배경 */
}
.custom-table tbody td {
  padding: 12px 8px;
}

/* 내용 셀 (너무 길면 말줄임) */
.notice-content {
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* 한 줄로 제한 */
  max-width: 500px; /* 테이블 헤더에 맞춰서 */
}

/* 페이지네이션 */
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>
