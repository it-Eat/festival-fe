<template>
  <div class="booth-wrapper">
    <h1>상점 관리</h1>
    <div class="container-search">
      <selectBar
        :items="boothOption"
        placeholder="부스 타입을 선택해주세요"
        v-model="selectedType"
        @onKeySelect="handleTypeSelect"
      />
      <searchBar v-model="keyword" @search="handleSearch" />
    </div>

    <!-- 상점 목록 테이블 -->
    <div class="container-list">
      <!-- 부스가 없을 때 메시지 추가 -->
      <div v-if="!booths.length" class="empty-state">
        <p>등록된 부스가 없습니다.</p>
      </div>
      <!-- 부스가 있을 때만 테이블 표시 -->
      <table v-else class="custom-table">
        <thead>
          <tr>
            <th style="width: 200px">부스명</th>
            <th style="width: 200px">부스 위치</th>
            <th style="width: 120px">유형</th>
            <th style="width: 200px">신청자ID</th>
            <th style="width: 200px">승인여부</th>
          </tr>
        </thead>
        <tbody>
          <!-- 행에 @click으로 상세 페이지 이동 -->
          <tr
            v-for="booth in booths"
            :key="booth.id"
            class="table-row"
            @click="goToBoothDetail(booth.id)"
          >
            <td>{{ booth.name }}</td>
            <td>{{ booth.location }}</td>
            <td>{{ booth.boothType }}</td>
            <td>{{ booth.user?.userName || "-" }}</td>
            <td>
              <span
                v-if="booth.accept === 'ACCEPT'"
                class="status-badge status-accept"
                @click.stop="openAcceptModal(booth)"
              >
                승인
              </span>
              <span
                v-else-if="booth.accept === 'WAITING'"
                class="status-badge status-waiting"
                @click.stop="openAcceptModal(booth)"
              >
                미승인
              </span>
              <span
                v-else
                class="status-badge status-reject"
                @click.stop="openAcceptModal(booth)"
              >
                거절
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 페이지네이션 -->
      <div class="pagination-nav">
        <button @click="goToPreviousPage" :disabled="currentPage === 1">
          이전
        </button>
        <span>{{ currentPage }} / {{ maxPage }}</span>
        <button @click="goToNextPage" :disabled="currentPage >= maxPage">
          다음
        </button>
      </div>
    </div>

    <!-- 모달 추가 -->
    <accept-modal
      :is-visible="acceptModalVisible"
      :booth="selectedBooth"
      @accept="handleAccept"
      @reject="handleReject"
      @close="closeModal"
    />
    <loading v-if="loadingType !== 'none'" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import searchBar from "@/components/admin/common/searchBar.vue";
import selectBar from "@/components/admin/common/selectBar.vue";
import { getBooths, patchBooth } from "@/api/admin";
import api from "@/api/axiosInstance";
import acceptModal from "@/components/admin/acceptModal.vue";
import loading from "@/components/common/loadingComponent.vue";

const router = useRouter();
const festivalId = router.currentRoute.value.params.festivalId;
const acceptModalVisible = ref(false);
const selectedBooth = ref(null);
const loadingType = ref("none");

const openAcceptModal = (booth) => {
  selectedBooth.value = booth;
  acceptModalVisible.value = true;
};

const closeModal = () => {
  acceptModalVisible.value = false;
  selectedBooth.value = null;
};

// selectBar 옵션
const boothOption = ref([
  { value: null, text: "전체" },
  { value: "EAT", text: "먹거리" },
  { value: "PLAY", text: "놀거리" },
  { value: "ETC", text: "기타" },
]);

// 검색/필터
const selectedType = ref("");
const keyword = ref("");
const booths = ref([]); // computed에서 ref로 변경

// 페이지네이션
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);

// computed 제거 (filteredBooths, booths)

// fetchBooths 함수 수정
const fetchBooths = async () => {
  try {
    loadingType.value = "fetch";
    const query = {
      page: currentPage.value,
      pageSize: pageSize.value,
      orderBy: "recent",
      ...(keyword.value && { keyword: keyword.value }),
      ...(selectedType.value && { type: selectedType.value }),
    };

    const response = await getBooths(festivalId, query);
    booths.value = response.booths;
    totalItems.value = response.total;
  } catch (error) {
    console.error("상점 API 호출 실패:", error);
    booths.value = [];
    totalItems.value = 0;
  } finally {
    loadingType.value = "none";
  }
};

// maxPage 계산 수정
const maxPage = computed(
  () => Math.ceil(totalItems.value / pageSize.value) || 1
);

// 승인 처리
const handleAccept = async (location) => {
  try {
    loadingType.value = "accept";
    // 1. 부스 승인 요청
    await patchBooth(festivalId, selectedBooth.value.id, {
      location: location,
      type: "ACCEPT",
    });

    // 2. 사용자 타입 변경 요청
    await api.patch(
      "user/change-type",
      {
        type: "ACCEPT",
        boothId: selectedBooth.value.id,
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    closeModal();
    fetchBooths();
  } catch (error) {
    console.error("승인 처리 실패:", error);
    alert("승인 처리에 실패했습니다.");
  } finally {
    loadingType.value = "none";
  }
};

// 거절 처리
const handleReject = async () => {
  try {
    loadingType.value = "reject";
    await patchBooth(festivalId, selectedBooth.value.id, {
      type: "REJECT",
    });

    closeModal();
    fetchBooths(); // 목록 새로고침
  } catch (error) {
    console.error("거절 처리 실패:", error);
    alert("거절 처리에 실패했습니다.");
  } finally {
    loadingType.value = "none";
  }
};

// 상세 페이지 이동 함수
const goToBoothDetail = (boothId) => {
  router.push({
    name: "adminBoothDetail",
    params: { festivalId, boothId },
  });
};

// 페이지 이동
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchBooths();
  }
};
const goToNextPage = () => {
  if (currentPage.value < maxPage.value) {
    currentPage.value++;
    fetchBooths();
  }
};

// 검색 처리
const handleSearch = () => {
  currentPage.value = 1;
  fetchBooths();
};

// 타입 선택 처리
const handleTypeSelect = (type) => {
  selectedType.value = type;
  currentPage.value = 1;
  fetchBooths();
};

onMounted(() => {
  fetchBooths();
});
</script>

<style scoped>
.booth-wrapper {
  max-width: 1800px;
  padding: 0 20px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 24px;
}

.container-search {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 16px;
}

.container-list {
  background-color: #fff;
  margin-top: 24px;
}

.custom-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 1rem;
  text-align: center;
}

.custom-table thead th {
  padding: 12px;
  font-weight: 600;
  background-color: #fff5f4;
  color: #fe6f61;
  border-bottom: 2px solid #fe6f61;
  border-top: 2px solid #fe6f61;
}

.table-row {
  transition: all 0.2s ease;
  cursor: pointer;
}

.table-row:hover {
  background-color: #fff5f4;
  cursor: pointer;
}

.custom-table tbody td {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

/* 상태 배지 스타일 */
.status-badge {
  padding: 6px 12px;
  border-radius: 20px;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-block;
  min-width: 80px;
}

.status-accept {
  background-color: #4caf50;
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.2);
}

.status-waiting {
  background-color: #fe6f61;
  box-shadow: 0 2px 4px rgba(254, 111, 97, 0.2);
}

.status-reject {
  background-color: #9e9e9e;
  box-shadow: 0 2px 4px rgba(158, 158, 158, 0.2);
}

/* 페이지네이션 */
.pagination-nav {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
}

.pagination-nav button {
  padding: 8px 20px;
  border: 1px solid #fe6f61;
  border-radius: 8px;
  background-color: white;
  color: #fe6f61;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.pagination-nav button:hover:not(:disabled) {
  background-color: #fe6f61;
  color: white;
}

.pagination-nav button:disabled {
  border-color: #ddd;
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.pagination-nav span {
  font-size: 1rem;
  font-weight: 500;
  color: #333;
}

/* 부스 없음 메시지 스타일 */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  text-align: center;
  color: #666;
  font-size: 1.1rem;
  background-color: #fff5f4;
  border-radius: 8px;
  margin: 20px 0 0 0;
  height: 425px;
}
</style>
