<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader title="공지사항" />
      </div>

      <div class="content">
        <!-- 공지사항 목록 -->
        <div class="notice-list">
          <div
            v-for="(notice, index) in notices"
            :key="notice.id"
            class="notice-item"
          >
            <!-- 제목/내용 영역 -->
            <div
              class="notice-content"
              :class="{
                truncated: !expandedItems[index],
                expanded: expandedItems[index],
              }"
            >
              {{ notice.content }}
            </div>

            <!-- 하단 영역(작성일, 작성자, 화살표 버튼) -->
            <div class="notice-footer">
              <!-- 왼쪽: 작성일 -->
              <span class="date">{{ formatDate(notice.createdAt) }}</span>

              <!-- 오른쪽: 작성자 -->
              <span class="author">작성자 : 관리자</span>

              <!-- 중앙(화살표 텍스트): 펼치기/접기 토글 -->
              <div class="toggle-arrow" @click.stop="toggleExpand(index)">
                <!-- 펼쳐진 상태라면 ▲, 접힌 상태라면 ▼ -->
                <span v-if="expandedItems[index]">▲</span>
                <span v-else>▼</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BackHeader from "@/components/common/backHeader.vue";
import { getNotice } from "@/api/user"; // 경로에 맞게 수정

// 공지사항 배열
const notices = ref([]);

// 각 아이템의 펼침 상태 (false: 접힘, true: 펼침)
const expandedItems = ref([]);

// 컴포넌트 마운트 시 API 호출
onMounted(async () => {
  try {
    const festivalId = 1; // 예시
    const query = {};
    // getNotice 함수가 [{ id, content, createdAt, ... }, ... ] 배열을 반환한다고 가정
    const data = await getNotice(festivalId, query);
    notices.value = data;
    // 모든 항목을 접힘(false) 상태로 초기화
    expandedItems.value = notices.value.map(() => false);
  } catch (error) {
    console.error("공지사항 API 호출 실패:", error);
  }
});

// 펼치기/접기 토글 함수
function toggleExpand(index) {
  console.log("toggleExpand called, index =", index);
  expandedItems.value[index] = !expandedItems.value[index];
}

// 작성일 포맷 함수
function formatDate(dateString) {
  if (!dateString) return "-";
  const d = new Date(dateString);
  return d.toLocaleString("ko-KR");
}
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  background-color: #151414;
}
.home {
  display: flex;
  flex-direction: column;
  width: 600px;
  max-height: 100vh;
  margin: auto;
  box-sizing: border-box;
  background-color: #fff;
}
@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}
.header {
  width: 100%;
  margin-bottom: 8px;
}
.content {
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
}

/* 공지사항 목록 */
.notice-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px;
}

/* 개별 공지 박스 */
.notice-item {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
  background-color: #fff;
  position: relative;
}

/* 내용 (기본 2줄 말줄임) */
.notice-content {
  font-size: 1rem;
  line-height: 1.4;
  color: #333;
  text-align: center; /* 가운데 정렬 */

  /* 말줄임을 위한 공통 속성 */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* 접힌 상태(2줄 말줄임) */
.notice-content.truncated {
  -webkit-line-clamp: 2;
}

/* 펼쳐진 상태(전체 표시) */
.notice-content.expanded {
  -webkit-line-clamp: unset; /* 제한 해제 */
  overflow: visible; /* 전체 표시 */
}

/* 하단 영역 (작성일, 작성자, 화살표) */
.notice-footer {
  display: flex;
  align-items: center;
  margin-top: 8px;
  position: relative;
}

/* 작성일 */
.notice-footer .date {
  flex: 1;
  font-size: 0.85rem;
  color: #888;
}

/* 작성자 */
.notice-footer .author {
  font-size: 0.85rem;
  color: #888;
}

/* 화살표 텍스트 (가운데) */
.toggle-arrow {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  color: #ff6f61; /* 화살표 색상 */
  font-size: 1.2rem;
}
.toggle-arrow:hover {
  color: #e65d52;
}

/* 항목 사이 구분선 (선택사항) */
.notice-item + .notice-item {
  border-top: none;
}
</style>
