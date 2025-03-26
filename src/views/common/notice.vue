<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader title="공지사항" />
      </div>

      <div class="content">
        <div class="notice-list" v-if="notices.length > 0">
          <div
            v-for="(notice, index) in notices"
            :key="notice.id"
            class="notice-item"
            :class="{ expanded: expandedItems[index] }"
          >
            <!-- 공지사항 헤더 -->
            <div class="notice-header">
              <div class="notice-badge">공지</div>
              <span class="notice-date">{{
                formatDate(notice.createdAt)
              }}</span>
            </div>

            <!-- 공지사항 내용 -->
            <div
              class="notice-content"
              :class="{ truncated: !expandedItems[index] }"
            >
              {{ notice.content }}
            </div>

            <!-- 더보기/접기 버튼 -->
            <div class="toggle-button" @click="toggleExpand(index)">
              <span class="toggle-text">
                {{ expandedItems[index] ? "접기" : "더보기" }}
              </span>
              <i
                class="toggle-icon"
                :class="
                  expandedItems[index]
                    ? 'fas fa-chevron-up'
                    : 'fas fa-chevron-down'
                "
              >
              </i>
            </div>

            <!-- 작성자 정보 -->
            <div class="notice-footer">
              <span class="author">작성자: 관리자</span>
            </div>
          </div>
        </div>

        <!-- 공지사항이 없을 때 -->
        <div v-else class="no-notices">
          <i class="fas fa-bell-slash"></i>
          <p>등록된 공지사항이 없습니다.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BackHeader from "@/components/common/backHeader.vue";
import { getNotice } from "@/api/user";
import { useRoute } from "vue-router";

const route = useRoute();
const festivalId = route.params.festivalId;
const notices = ref([]);
const expandedItems = ref([]);

onMounted(async () => {
  try {
    const query = {};
    const data = await getNotice(festivalId, query);
    notices.value = data.data;
    expandedItems.value = new Array(data.length).fill(false);
  } catch (error) {
    console.error("공지사항 불러오기 실패:", error);
  }
});

const toggleExpand = (index) => {
  expandedItems.value[index] = !expandedItems.value[index];
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.home {
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.05);
}

.content {
  padding: 20px;
  height: calc(100vh - 60px);
  overflow-y: auto;
}

.notice-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.notice-item {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.notice-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.notice-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.notice-badge {
  background-color: #ff6f61;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.notice-date {
  color: #666;
  font-size: 14px;
}

.notice-content {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  transition: all 0.3s ease;
}

.notice-content.truncated {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.toggle-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  padding: 8px;
  cursor: pointer;
  color: #ff6f61;
  transition: all 0.2s ease;
}

.toggle-button:hover {
  color: #e65d52;
}

.toggle-text {
  font-size: 14px;
  font-weight: 500;
}

.toggle-icon {
  transition: transform 0.3s ease;
}

.notice-item.expanded .toggle-icon {
  transform: rotate(180deg);
}

.notice-footer {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #eee;
}

.author {
  color: #666;
  font-size: 14px;
}

.no-notices {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #666;
  gap: 16px;
}

.no-notices i {
  font-size: 48px;
  color: #ccc;
}

.no-notices p {
  font-size: 16px;
}

@media (max-width: 600px) {
  .content {
    padding: 16px;
  }

  .notice-item {
    padding: 16px;
  }
}
</style>
