<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 영역 -->
      <div class="header">
        <BackHeader
          :title="
            userStore.user ? `${userStore.user.nickname}님의 게시글` : '게시글'
          "
        />
      </div>

      <div class="content">
        <!-- 분실물 영역 -->
        <section class="section">
          <h2 class="section-title">분실물</h2>
          <hr class="divider" />

          <!-- 분실물 리스트가 있고, 0개 이상일 때만 리스트 표시 -->
          <div v-if="lostStore.totalItems > 0">
            <SmallList
              class="list-item"
              v-for="lostItem in lostStore.myLosts.slice(0, 4)"
              :key="lostItem.id"
              :lost="lostItem"
            />
          </div>
          <!-- 데이터가 없을 때 -->
          <div v-else>
            <p>작성한 분실물이 없습니다.</p>
          </div>

          <!-- 자세히 보기 버튼 -->
          <div class="btn-wrapper">
            <button class="detail-button">
              <router-link
                :to="{
                  name: 'myLostItemList',
                }"
                class="detail-link"
              >
                자세히 보기 &gt;
              </router-link>
            </button>
          </div>
        </section>

        <!-- 게시판 영역 -->
        <section class="section">
          <h2 class="section-title">게시판</h2>
          <hr class="divider" />

          <!-- 게시판 리스트가 있고, 0개 이상일 때만 리스트 표시 -->
          <div v-if="boardStore.totalItems > 0">
            <SmallList
              class="list-item"
              v-for="boardItem in boardStore.myBoards.slice(0, 4)"
              :key="boardItem.id"
              :board="boardItem"
            />
          </div>

          <!-- 데이터가 없을 때 -->
          <div v-else>
            <p>작성한 게시글이 없습니다.</p>
          </div>

          <!-- 자세히 보기 버튼 -->
          <div class="btn-wrapper">
            <button class="detail-button">
              <router-link
                :to="{
                  name: 'myBoardList',
                }"
                class="detail-link"
              >
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
import { onMounted } from "vue";
import BackHeader from "@/components/common/backHeader.vue";
import SmallList from "@/components/common/smallList.vue";
import { useLostStore } from "@/stores/lost";
import { useBoardStore } from "@/stores/board";
import { useUserStore } from "@/stores/userStore";

const lostStore = useLostStore();
const boardStore = useBoardStore();
const userStore = useUserStore();

onMounted(() => {
  boardStore.fetchMyItems();
  lostStore.fetchMyItems();
});
</script>

<style scoped>
/* 스타일은 기존과 동일하게 유지 */
.page {
  display: flex;
  justify-content: center;
}
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
.header {
  width: 100%;
  margin-bottom: 20px;
}
.content {
  width: 100%;
  margin-bottom: 20px;
  padding: 0;
}
.section {
  width: 90%;
  margin: auto;
  margin-bottom: 40px;
}
.section-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 10px;
}
.divider {
  width: 100%;
  border: none;
  border-top: 1px solid #000;
  margin-bottom: 10px;
}
.btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.detail-button {
  background-color: #ff6f61;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  cursor: pointer;
}
.detail-link {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}
.detail-button:hover {
  background-color: #e75b4f;
}
</style>
