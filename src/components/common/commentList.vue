<script setup>
import commentItem from "@/components/common/commentItem.vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  writingId: {
    type: Number,
    required: true,
  },
  comments: {
    type: Array,
    default: () => [], // 기본값 빈 배열 추가
  },
});

const filteredComments = props.comments || []; // undefined 방지
const size = filteredComments.length;
</script>

<template>
  <div>
    <div style="padding: 5px; background-color: #dddcc6">
      댓글 수 : {{ size }}
    </div>
    <commentItem
      v-for="comment in filteredComments"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>
