<script setup>
import BackHeader from "@/components/common/backHeader.vue";
import { ref, onMounted } from "vue";
import { useInfiniteScroll } from "@vueuse/core";
import { useRouter } from "vue-router";
import api from "@/api/axiosInstance";

const router = useRouter();

const boothList = ref([]);
const page = ref(1);
const isLoading = ref(false);
const hasMore = ref(true);

const festivalId = 1;

const fetchBooths = async () => {
  if (!hasMore.value || isLoading.value) return;

  try {
    isLoading.value = true;
    const res = await api.get(`/booth/${festivalId}`, {
      params: {
        page: page.value,
        pageSize: 50,
        orderBy: "recent",
        keyword: "",
        type: "EAT",
      },
    });
    let newData = res.data.filter((b) => b.boothType === "EAT");
    if (!newData.length) {
      hasMore.value = false;
    } else {
      newData.forEach((booth) => {
        booth.menuItems = booth.menu ? booth.menu.slice(0, 4) : [];

        booth.avgRating = booth.avgReviewScore
          ? booth.avgReviewScore.toFixed(1)
          : "0.0";
      });
      boothList.value.push(...newData);
      page.value++;
    }
  } catch (error) {
    console.error("fetchBooths error:", error);
  } finally {
    isLoading.value = false;
  }
};

const goToDetail = (boothId) => {
  router.push({ name: "foodDetail", params: { id: boothId } });
};

const target = ref(null);
useInfiniteScroll(target, fetchBooths);

onMounted(() => {
  fetchBooths();
});
</script>

<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader title="먹거리" />
      </div>

      <div class="content">
        <div class="booth-list">
          <div
            v-for="booth in boothList"
            :key="booth.id"
            class="booth-item"
            @click="goToDetail(booth.id)"
          >
            <!-- 이미지 4개 -->
            <div class="booth-images">
              <img
                v-for="(menu, idx) in booth.menuItems"
                :key="idx"
                :src="menu.image || 'https://via.placeholder.com/80'"
                class="menu-img"
              />
            </div>

            <!-- 텍스트 -->
            <div class="booth-info">
              <!-- 첫 줄: 이름 + 별점 -->
              <div class="booth-header">
                <span class="booth-name">{{ booth.name }}</span>
                <span class="star-rating">★ {{ booth.avgRating }}</span>
              </div>

              <!-- 두 번째 줄: 위치 + 대기시간 (같은 줄) -->
              <div class="booth-loc-wait">
                <span class="booth-location">
                  위치 : {{ booth.location || "정보 없음" }}
                </span>
                <span class="booth-waiting">{{ booth.waitingTime }}</span>
              </div>

              <!-- 링크  -->
              <div class="booth-link">둘러보러 가기 ➔</div>
            </div>
          </div>
        </div>

        <!-- 무한스크롤 로딩 -->
        <div ref="target" class="load-more" v-if="isLoading">로딩 중...</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  background-color: #fff;
}
.home {
  display: flex;
  flex-direction: column;
  width: 600px;
  max-height: 100vh;
  margin: auto;
  box-sizing: border-box;
}
@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}
.header {
  width: 100%;
  margin-bottom: 8px;
}
.content {
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
}
.booth-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* *** booth-item, booth-images, booth-info (CSS) *** */
.booth-item {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
  cursor: pointer;
}
.booth-item:hover {
  background-color: #fafafa;
}
/* 이미지 4개, gap 조금 */
.booth-images {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}
.menu-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 4px;
}
/* 텍스트 정보 */
.booth-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.booth-header {
  display: flex;
  align-items: center;
  gap: 6px;
}
.booth-name {
  font-size: 16px;
  font-weight: bold;
}
.star-rating {
  color: #f66;
  font-size: 14px;
}
/* 위치 + 대기시간 한 줄 */
.booth-loc-wait {
  display: flex;
  align-items: center;
  gap: 8px;
}
.booth-location {
  color: #666;
  font-size: 14px;
}
.booth-waiting {
  color: #f66;
  font-size: 14px;
  font-weight: bold;
}
.booth-link {
  font-size: 14px;
  color: #f66;
  text-align: right;
}
/* 무한스크롤 로딩 */
.load-more {
  text-align: center;
  padding: 20px;
  color: #777;
  font-size: 14px;
}
</style>
