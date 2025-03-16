<script setup>
import backHeader from "@/components/common/backHeader.vue";
import commnetList from "@/components/common/commentList.vue";
import lostChip from "@/components/common/lostChip.vue";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useLostStore } from "@/stores/lost";
import api from "@/api/axiosInstance.js";

const route = useRoute();
const lostStore = useLostStore();
const currentId = Number(route.params.id);
const festivalId = 1; // 사용하는 festivalId 값으로 변경하세요
const newComment = ref("");

const currentItem = computed(() => lostStore.getLostById(currentId));

const createComment = async () => {
  try {
    await api.post(
      `https://festival-be.onrender.com/comment/${currentId}/${festivalId}`,
      {
        content: newComment.value,
      }
    );
    newComment.value = "";
    lostStore.fetchItems();
  } catch (error) {
    console.error("댓글 작성 실패:", error);
  }
};
</script>

<template>
  <div v-if="currentItem">
    <backHeader class="header" />
    <div class="a">
      <hr />
      <div style="display: flex; margin: 3px 0px">
        <lostChip
          v-if="currentItem.found !== undefined"
          :found="currentItem.found"
          style="margin-left: 3px"
        />
        <div class="title" style="margin: 0 auto">{{ currentItem.title }}</div>
      </div>
      <hr />

      <div class="meta-data-bar">
        <div>{{ currentItem.name }}</div>
        <div>{{ currentItem.date }}</div>
      </div>

      <div class="main-contents">
        <img :src="currentItem.img" :alt="currentItem.title" />
        <div>{{ currentItem.contents }}</div>
      </div>

      <div class="comment-section">
        <textarea
          v-model="newComment"
          placeholder="댓글을 입력하세요"
        ></textarea>
        <button @click="createComment">댓글 작성</button>
      </div>

      <commnetList :type="1" :writingId="currentId" class="comment-list" />
    </div>
  </div>
  <div v-else>
    <p>데이터를 불러오는 중...</p>
  </div>
</template>

<style scoped>
.a {
  max-width: 600px;
  margin: 20px auto;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.header {
  max-width: 600px;
  margin: 0 auto 15px auto;
}

.title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding: 12px 0;
  color: #333333;
}

.meta-data-bar {
  background-color: #f5f7fa;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  color: #555555;
  margin-top: 10px;
}

.main-contents {
  padding: 20px;
  text-align: center;
}

.main-contents img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 20px auto;
}

.comment-section {
  margin-top: 20px;
}

.comment-section textarea {
  width: 100%;
  height: 60px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 8px;
}

.comment-list {
  background-color: #f8f9fa;
  padding: 10px;
  border-radius: 8px;
  margin-top: 20px;
}

.comment-list div {
  background-color: #ffffff;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 6px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.08);
}
</style>
