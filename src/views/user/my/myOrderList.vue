<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import BackHeader from "@/components/common/backHeader.vue";
import Pagination from "@/components/common/pagination.vue";
import api from "@/api/axiosInstance";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

const festivalId = 1;

// 결제 내역 데이터를 저장할 ref
const payments = ref([]);

// 페이지네이션 관련 변수
const currentPage = ref(1);
const itemsPerPage = 10;

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return payments.value.slice(start, start + itemsPerPage);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const navigateToDetail = (payment) => {
  router.push({
    name: "myOrderDetail",
    params: { id: String(payment.id) },
    query: {
      boothName: payment.boothName || "정보 없음",
      price: payment.price,
      payType: payment.payType,
      waitingNumber: payment.waitingNumber,
    },
  });
};

const fetchPayments = async () => {
  if (!userStore.isAuthenticated) return;
  try {
    const res = await api.get(`/pay/user/${userStore.user.id}`, { withCredentials: true });
    const data = res.data; // 결제 내역 배열
    // 각 결제 항목에 boothName 추가 (wishList가 비어있으면 별도 API 호출)
    for (const payment of data) {
      if (!payment.wishList || payment.wishList.length === 0) {
        try {
          const boothRes = await api.get(`/booth/${payment.boothId}/${festivalId}`);
          payment.boothName = boothRes.data.name;
        } catch (err) {
          console.error(`부스 정보 가져오기 실패 (boothId: ${payment.boothId}):`, err);
          payment.boothName = "정보 없음";
        }
      } else {
        payment.boothName = payment.wishList[0]?.booth?.name || "정보 없음";
      }
    }
    payments.value = data;
  } catch (error) {
    console.error("Error fetching payments:", error);
  }
};

onMounted(() => {
  fetchPayments();
});
</script>

<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <!-- paymentDetail 없이 단순히 "주문 내역" 제목을 사용 -->
        <BackHeader title="주문 내역" />
      </div>
      <table class="order-table">
        <thead>
          <tr>
            <th>주문상점</th>
            <th>금액</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="payment in paginatedItems"
            :key="payment.id"
            @click="navigateToDetail(payment)"
            class="order-row"
          >
            <td>{{ payment.boothName || "정보 없음" }}</td>
            <td>{{ payment.price }}원</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        <Pagination
          :total-items="payments.length"
          :items-per-page="itemsPerPage"
          :current-page="currentPage"
          @page-changed="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  display: flex;
  justify-content: center;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 600px;
  height: 95vh;
  box-sizing: border-box;
  margin: auto;
}

@media (max-width: 900px) {
  .home {
    width: 100%;
  }
}

.header {
  width: 100%;
  margin-bottom: 20px;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  text-align: center;
}

.order-table th,
.order-table td {
  padding: 10px;
  font-size: 16px;
  border-bottom: 1px solid #000;
  border-top: none;
  border-left: none;
  border-right: none;
}

.order-table th {
  background-color: #f0f0f0;
  font-weight: bold;
}

.order-row {
  cursor: pointer;
}

.order-row:hover {
  background-color: #f5f5f5;
}

.footer {
  width: 100%;
  padding: 10px 0;
  text-align: center;
  position: fixed;
  bottom: 0;
}
</style>
