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
    <backHeader></backHeader>
    <div>
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
.title {
  text-align: center;
}

.meta-data-bar {
  background-color: #7591bf;
}

.main-contents {
  background-color: rgb(164, 220, 122);
}

.comment-list {
  background-color: #89dcc6;
}
</style>
