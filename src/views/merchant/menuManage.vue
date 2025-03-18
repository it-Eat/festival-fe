<template>
  <div class="page">
    <div class="home">
      <!-- 상단 헤더 -->
      <div class="header">
        <BackHeader title="메뉴 관리" />
      </div>

      <!-- 본문 영역 -->
      <div class="content">
        <!-- 메뉴 카드 리스트 -->
        <div
          class="menu-item"
          v-for="(menu, index) in menus"
          :key="menu.id ?? index"
        >
          <!-- 이미지 영역 -->
          <div class="menu-image">
            <input
              ref="imageInputs"
              type="file"
              accept="image/*"
              style="display: none;"
              @change="handleImageUpload(index, $event)"
            />
            <div class="image-preview" @click="triggerFileInput(index)">
              <img
                v-if="menu.imagePreview"
                :src="menu.imagePreview"
                alt="메뉴 이미지"
              />
              <div v-else class="image-placeholder">
                <img
                  src="./image.png"
                  alt="image placeholder"
                  style="width: 50px; height: 50px;"
                />
              </div>
            </div>
          </div>

          <!-- 메뉴 정보 입력 영역 -->
          <div class="menu-details">
            <label>메뉴명</label>
            <input
              type="text"
              v-model="menu.name"
              placeholder="메뉴명 입력"
            />

            <label>가격</label>
            <input
              type="number"
              v-model="menu.price"
              placeholder="가격 입력"
            />

            <label>소개글</label>
            <input
              type="text"
              v-model="menu.content"
              placeholder="메뉴 소개글"
            />

            <div class="sold-out">
              <label>품절 여부</label>
              <input
                type="checkbox"
                v-model="menu.soldOut"
              />
            </div>
          </div>

          <!-- 삭제 버튼 -->
          <button class="remove-button" @click="removeMenu(index)">
            X
          </button>
        </div>

        <!-- 메뉴 추가 버튼 -->
        <button class="add-button" @click="addMenu">+</button>

        <!-- 수정 완료 버튼 -->
        <button class="submit-button" @click="saveMenus">
          수정 완료
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import BackHeader from "@/components/common/backHeader.vue";
import api from "@/api/axiosInstance";

const route = useRoute();
const router = useRouter();

// boothId는 route.params로부터 받습니다.
const boothId = route.params.id || 1;

// 메뉴 리스트
const menus = ref([]);

// 이미지 input들을 참조하기 위한 배열
const imageInputs = ref([]);

// 페이지 로드 시 메뉴 목록 불러오기
onMounted(async () => {
  imageInputs.value = [];
  await fetchMenus();
});

// 메뉴 목록 조회 (GET /menu/{boothId})
const fetchMenus = async () => {
  try {
    const res = await api.get(`/menu/${boothId}`);
    // 백엔드 데이터 예시: [{id, name, price, content, image, soldOut}, ...]
    menus.value = res.data.map((m) => ({
      ...m,
      imagePreview: m.image || null,
    }));
  } catch (error) {
    console.error("메뉴 불러오기 실패:", error);
  }
};

// 메뉴 추가: 신규 메뉴는 id가 null입니다.
const addMenu = () => {
  menus.value.push({
    id: null,
    name: "",
    price: null,
    content: "",
    image: null,
    imagePreview: null,
    soldOut: false,
  });
  nextTick(() => {
    imageInputs.value.push(null);
  });
};

// 메뉴 삭제: 만약 메뉴에 id가 있다면 DELETE /menu/{menu.id} 호출
const removeMenu = async (index) => {
  const menu = menus.value[index];
  if (menu.id) {
    try {
      await api.delete(`/menu/${menu.id}`);
      console.log(`메뉴 ${menu.id} 삭제 성공`);
    } catch (error) {
      console.error("메뉴 삭제 실패:", error);
    }
  }
  menus.value.splice(index, 1);
  imageInputs.value.splice(index, 1);
};

// 이미지 업로드 처리
const triggerFileInput = (index) => {
  imageInputs.value[index].click();
};

const handleImageUpload = (index, event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      menus.value[index].image = file;
      menus.value[index].imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

// 메뉴 저장: 각 메뉴를 개별적으로 처리합니다.
const saveMenus = async () => {
  try {
    // forEach로 각 메뉴에 대해 저장
    for (const menu of menus.value) {
      const payload = {
        name: menu.name,
        price: parseInt(menu.price, 10) || 0,
        content: menu.content,
        soldOut: menu.soldOut,
        // image는 여기서는 base64 미리보기 URL 사용 (실제 파일 업로드 로직 필요할 수 있음)
        image: menu.imagePreview,
      };

      if (menu.id) {
        // 기존 메뉴: PUT /menu/{menu.id}
        await api.patch(`/menu/${menu.id}`, payload);
        console.log(`메뉴 ${menu.id} 수정 완료:`, payload);
      } else {
        // 신규 메뉴: POST /menu/{boothId} (새 메뉴 생성)
        const res = await api.post(`/menu/${boothId}`, payload);
        // 생성된 메뉴의 id 업데이트
        menu.id = res.data.id;
        console.log("신규 메뉴 생성 완료:", res.data);
      }
    }
    router.back();
  } catch (error) {
    console.error("메뉴 저장 실패:", error);
  }
};
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  font-family: sans-serif;
}

.home {
  display: flex;
  flex-direction: column;
  width: 600px;
  max-width: 95vh;
  box-sizing: border-box;
  margin: auto;
}

.header {
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
}

.content {
  width: 100%;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 메뉴 카드 */
.menu-item {
  display: flex;
  position: relative;
  width: 100%;
  align-items: flex-start;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
  box-sizing: border-box;
  background-color: #fff;
}

.menu-image {
  width: 80px;
  height: 80px;
  margin-right: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-image .image-preview {
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.menu-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.menu-details label {
  font-weight: 500;
  margin-bottom: 3px;
}

.menu-details input[type="text"],
.menu-details input[type="number"] {
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.9rem;
}

.sold-out {
  display: flex;
  align-items: center;
  margin-top: 8px;
  gap: 6px;
}

/* 삭제 버튼 */
.remove-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 5px 8px;
  cursor: pointer;
  border-radius: 3px;
  transition: background-color 0.3s ease;
}
.remove-button:hover {
  background-color: #c0392b;
}

/* + 버튼 */
.add-button,
.submit-button {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
}

.add-button {
  background-color: #2ecc71;
  color: white;
}

.add-button:hover {
  background-color: #27ae60;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.3);
}

.add-button:active {
  background-color: #219d56;
  transform: translateY(1px);
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
}

/* 수정 완료 버튼 */
.submit-button {
  background-color: #3498db;
  color: white;
  width: 100%;
  margin-bottom: 20px;
}

.submit-button:hover {
  background-color: #2980b9;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.2);
}
</style>
