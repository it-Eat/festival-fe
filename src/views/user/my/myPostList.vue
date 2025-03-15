<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 영역 -->
      <div class="header">
        <!-- 타이틀: 사용자 정보가 있을 경우, 닉네임으로 제목 표시 -->
        <BackHeader :title="userStore.user ? `${userStore.user.nickname}님의 게시글` : '게시글'" />
      </div>

      <div class="content">
        <!-- 분실물 영역 -->
        <section class="section">
          <h2 class="section-title">분실물</h2>
          <hr class="divider" />
          <!-- 분실물 아이템 -->
          <SmallList
            class="list-item"
            v-for="lostItem in lostStore.lostList.slice(0, 4)"
            :key="lostItem.id"
            :lost="lostItem"
          />
          <!-- 자세히 보기 버튼 -->
          <div class="btn-wrapper">
            <button class="detail-button">
              <router-link to="/user/lostItem/list" class="detail-link">
                자세히 보기 &gt;
              </router-link>
            </button>
          </div>
        </section>

        <!-- 게시판 영역 -->
        <section class="section">
          <h2 class="section-title">게시판</h2>
          <hr class="divider" />
          <!-- 게시판 아이템 -->
          <SmallList
            class="list-item"
            v-for="boardItem in boardStore.boardList.slice(0, 4)"
            :key="boardItem.id"
            :board="boardItem"
          />
          <!-- 자세히 보기 버튼 -->
          <div class="btn-wrapper">
            <button class="detail-button">
              <router-link to="/user/board/list" class="detail-link">
                자세히 보기 &gt;
              </router-link>
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import BackHeader from '@/components/common/backHeader.vue';
import SmallList from '@/components/common/smallList.vue';
import { useLostStore } from '@/stores/lost';
import { useBoardStore } from '@/stores/board';
import { useUserStore } from '@/stores/userStore';
import api from '@/api/axiosInstance';

const lostStore = useLostStore();
const boardStore = useBoardStore();
const userStore = useUserStore();

const festivalId = 1;

// 게시글 데이터 불러오기 (내 게시물, keyword로 내 닉네임 전달)
const fetchBoardList = async () => {
  try {
    const keyword = userStore.user ? userStore.user.nickname : '';
    const res = await api.get(`/board/${festivalId}`, { params: { keyword } });
    // 만약 store에 setBoardList 메서드가 있으면 호출, 없으면 직접 할당
    if (boardStore.setBoardList) {
      boardStore.setBoardList(res.data);
    } else {
      boardStore.boardList = res.data;
    }
  } catch (error) {
    console.error("Error fetching board list:", error);
  }
};

// 분실물 데이터 불러오기 (내 분실물, keyword로 내 닉네임 전달)
const fetchLostList = async () => {
  try {
    const keyword = userStore.user ? userStore.user.nickname : '';
    const res = await api.get(`/board/board-loss/${festivalId}`, { params: { keyword } });
    // 만약 store에 setLostList 메서드가 있으면 호출, 없으면 직접 할당
    if (lostStore.setLostList) {
      lostStore.setLostList(res.data);
    } else {
      lostStore.lostList = res.data;
    }
  } catch (error) {
    console.error("Error fetching lost list:", error);
  }
};

onMounted(() => {
  fetchBoardList();
  fetchLostList();
});
</script>

<style scoped>
/* 전체 페이지를 화면 중앙 정렬 */
.page {
  display: flex;
  justify-content: center;
}

/* 메인 컨테이너 */
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 600px;
  height: 95vh;
  box-sizing: border-box;
  margin: auto;
}

@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}

/* 헤더 영역 */
.header {
  width: 100%;
  margin-bottom: 20px;
}

/* 콘텐츠 영역 */
.content {
  width: 100%;
  margin-bottom: 20px;
  padding: 0;
}

/* 섹션(분실물, 게시판) 컨테이너 */
.section {
  width: 90%;
  margin: auto;
  margin-bottom: 40px; /* 섹션 간격 */
}

/* 섹션 타이틀 */
.section-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 10px;
}

/* 구분선 */
.divider {
  width: 100%;
  border: none;
  border-top: 1px solid #000; /* 검은색 구분선 */
  margin-bottom: 10px;
}

/* 버튼 감싸는 래퍼 */
.btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

/* 자세히 보기 버튼 자체 */
.detail-button {
  background-color: #ff6f61; /* 핑크/코랄 계열 */
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
}

/* router-link를 버튼처럼 보이게 */
.detail-link {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}

.detail-button:hover {
  background-color: #e75b4f;
}
</style>
