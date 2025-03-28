<script setup>
defineProps({
  comment: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="comment-container">
    <div class="comment-header">
      <span class="writer">{{ comment.writer }}</span>
      <span class="date">{{ comment.date }}</span>
    </div>
    <div class="comment-content">
      {{ comment.contents }}
    </div>
  </div>
</template>

<style scoped>
.comment-container {
  padding: 10px;
  margin: 10px 0;
  border-bottom: 2px solid #eee;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.writer {
  font-weight: bold;
}

.date {
  color: #666;
  font-size: 0.9em;
}

.comment-content {
  padding: 5px 0;
}
</style>
