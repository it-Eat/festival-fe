<script setup>
import commentItem from "@/components/common/commentItem.vue";
import { useCommentStore } from "@/stores/comment";

const commentStore = useCommentStore();

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  writingId: {
    type: Number,
    required: true,
  },
});

const filteredComments = commentStore.getCommentByWritingId(
  props.writingId,
  props.type
);
const size = filteredComments.length;
</script>

<template>
  <div>
    <div style="padding: 5px; background-color: #dddcc6">
      댓글 수 : {{ size }}
    </div>
    <commentItem
      v-for="commentItem in filteredComments"
      :key="commentItem.id"
      :comment="commentItem"
    />
  </div>
</template>
