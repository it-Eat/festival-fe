<script setup>
import backHeader from "@/components/common/backHeader.vue";
import commnetList from "@/components/common/commentList.vue";
import lostChip from "@/components/common/lostChip.vue";
import { useRoute } from "vue-router";
import { useLostStore } from "@/stores/lost";

const route = useRoute();
const lostStore = useLostStore();
const currentId = Number(route.params.id);
const currentItem = lostStore.getLostById(currentId);
</script>

<template>
  <div>
    <backHeader></backHeader>
    <div>
      <hr />
      <div style="display: flex; margin: 3px 0px">
        <lostChip :found="currentItem.found" style="margin-left: 3px" />
        <div class="title" style="margin: 0 auto">{{ currentItem.title }}</div>
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
        <div>{{ currentItem.contents }}</div>
      </div>

      <commnetList :type="1" :writingId="currentId" class="comment-list" />
    </div>
  </div>
</template>

<style scoped>
.title {
  background-color: #b3adad;
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
