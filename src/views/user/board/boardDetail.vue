<script setup>
import backHeader from "@/components/common/backHeader.vue";
import commnetList from "@/components/common/commentList.vue";
import { useRoute } from "vue-router";
import { useBoardStore } from "@/stores/board";

const route = useRoute();
const boardStore = useBoardStore();
const currentId = Number(route.params.id);
const currentItem = boardStore.getLostById(currentId);
</script>

<template>
  <div>
    <backHeader class="header" />
    <div class="a">
      <hr />
      <div>
        <div class="title">{{ currentItem.title }}</div>
      </div>
      <hr />

      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          padding: 5px;
        "
        class="meta-data-bar"
      >
        <div>{{ currentItem.name }}</div>
        <div>{{ currentItem.date }}</div>
      </div>

      <div
        style="display: flex; flex-direction: column; text-align: center"
        class="main-contents"
      >
        <img
          style="margin: auto; aspect-ratio: 1; padding: 10px"
          :src="currentItem.img"
          :alt="currentItem.title"
        />
        <div style="padding: 5px">{{ currentItem.contents }}</div>
      </div>

      <commnetList :type="2" :writingId="currentId" class="comment-list" />
    </div>
  </div>
</template>

<style scoped>
.a {
  max-width: 600px;
  margin: 0 auto;
}
.header {
  max-width: 600px;
  margin: 0 auto;
}

.title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 10px 0;
  background-color: #f8f9fa;
  max-width: 600px;
  margin: 0 auto;
}

.meta-data-bar {
  background-color: #e3e6ec;
  padding: 8px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  max-width: 600px;
  margin: 0 auto;
}

.main-contents {
  background-color: #ffffff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.main-contents img {
  max-width: 250px;
  height: auto;
  border-radius: 10px;
  margin-bottom: 10px;
}

.comment-list {
  background-color: #f1f3f5;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  max-width: 600px;
  margin: 0 auto;
}

.comment-list div {
  padding: 8px;
  background-color: #ffffff;
  margin-bottom: 5px;
  border-radius: 5px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.1);
}
</style>
