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
          <!-- button-->
          <div class="soldOut-btn-container">
            <!-- 이미지 영역 -->
            <div class="menu-image">
              <input
                type="file"
                :ref="(el) => (imageInputs[index] = el)"
                accept="image/*"
                style="display: none"
                @change="handleImageUpload(index, $event)"
              />
              <div class="image-preview" @click="triggerFileInput(index)">
                <img
                  v-if="menu.imagePreview"
                  :src="menu.imagePreview"
                  alt="메뉴 이미지"
                />
                <div v-else class="image-placeholder">
                  <img :src="noimage" alt="image placeholder" />
                </div>
              </div>
            </div>
            <div>
              <button class="soldOut-btn" @click="toggleSoldOut(menu.id)">
                {{ menu.soldOut ? "품절" : "판매중" }}
              </button>
            </div>
          </div>

          <!-- 메뉴 정보 입력 영역 -->
          <div class="menu-details">
            <label>메뉴명</label>
            <input type="text" v-model="menu.name" placeholder="메뉴명 입력" />

            <label
              >가격 <span style="font-size: 12px">(숫자만 입력)</span></label
            >
            <input type="text" v-model="menu.price" placeholder="가격 입력" />

            <label>소개글</label>
            <input
              type="text"
              v-model="menu.content"
              placeholder="메뉴 소개글"
            />
          </div>

          <!-- 삭제 버튼 -->
          <button class="remove-button" @click="removeMenu(index)">X</button>
        </div>

        <!-- 메뉴 추가 버튼 -->
        <button class="add-button" @click="addMenu">+</button>

        <!-- 수정 완료 버튼 -->
        <button class="submit-button" @click="saveMenus">수정 완료</button>
      </div>
    </div>
    <loadingComponent v-if="loading" />
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import BackHeader from "@/components/common/backHeader.vue";
import api from "@/api/axiosInstance";
import noimage from "@/assets/noimage.png";
import loadingComponent from "@/components/common/loadingComponent.vue";

const route = useRoute();
const router = useRouter();

// boothId는 route.params로부터 받습니다.
const boothId = route.params.id || 1;

// 메뉴 리스트
const menus = ref([]);

// 각 파일 input 요소를 저장할 배열
const imageInputs = ref([]);
const loading = ref(false);
// 페이지 로드 시 메뉴 목록 불러오기
onMounted(async () => {
  imageInputs.value = [];
  await fetchMenus();
});

// 메뉴 목록 조회 (GET /menu/{boothId})
const fetchMenus = async () => {
  try {
    loading.value = true;
    const res = await api.get(`/menu/${boothId}`);
    // 백엔드 데이터 예시: [{id, name, price, content, image, soldOut}, ...]
    menus.value = res.data.map((m) => ({
      ...m,
      imagePreview: m.image || null,
      selectedFile: null,
    }));
  } catch (error) {
    console.error("메뉴 불러오기 실패:", error);
  } finally {
    loading.value = false;
  }
};

// 메뉴 추가: 신규 메뉴는 id가 null입니다.
const addMenu = () => {
  menus.value.push({
    id: null,
    name: "",
    price: "",
    content: "",
    image: null,
    imagePreview: null,
    selectedFile: null,
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
      loading.value = true;
      await api.delete(`/menu/${menu.id}`);
    } catch (error) {
      console.error("메뉴 삭제 실패:", error);
    } finally {
      loading.value = false;
    }
  }
  menus.value.splice(index, 1);
  imageInputs.value.splice(index, 1);
};

// 이미지 업로드 처리: 파일 선택 시 URL.createObjectURL()을 이용해 미리보기 업데이트 및 파일 객체 저장
const triggerFileInput = (index) => {
  if (imageInputs.value[index]) {
    imageInputs.value[index].click();
  } else {
    console.error("해당 인덱스의 input 요소가 없습니다:", index);
  }
};

const handleImageUpload = (index, event) => {
  const file = event.target.files[0];
  if (file) {
    menus.value[index].selectedFile = file;
    menus.value[index].imagePreview = URL.createObjectURL(file);
  }
};

// 메뉴 저장: 신규 메뉴 추가 시 FormData로 아래 필드로 전송합니다.
// { name: "이름", price: "1000", content: "맛있는 치킨!", image: "이미지 url" }
const saveMenus = async () => {
  try {
    loading.value = true;
    for (const menu of menus.value) {
      const formData = new FormData();
      formData.append("name", menu.name);
      // price를 문자열로 변환하여 전송 (백엔드에서 int로 변경)
      formData.append("price", menu.price ? menu.price.toString() : "0");
      formData.append("content", menu.content);
      formData.append("soldOut", menu.soldOut);

      // 이미지: 파일 객체가 존재하면 해당 파일을 전송, 없으면 기존 이미지 URL을 전송
      if (menu.selectedFile) {
        formData.append("image", menu.selectedFile);
      } else {
        formData.append("image", menu.imagePreview || "");
      }

      if (menu.id) {
        // 기존 메뉴 업데이트: PATCH /menu/{menu.id}
        await api.patch(`/menu/${menu.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // 신규 메뉴 추가: POST /menu/{boothId}
        const res = await api.post(`/menu/${boothId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        menu.id = res.data.id;
      }
    }
    router.back();
  } catch (error) {
    console.error("메뉴 저장 실패:", error);
  } finally {
    loading.value = false;
  }
};

const toggleSoldOut = (id) => {
  for (const menu of menus.value) {
    if (menu.id == id) {
      menu.soldOut = menu.soldOut ? false : true;
    }
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
  margin: 10px 0;
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
  border: 1px solid #ff6f61;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  box-sizing: border-box;
  background-color: #fff;
}

.menu-image {
  width: 85px;
  height: 85px;
  margin-right: 20px;
  border: 1px solid #eee;
  border-radius: 8px;
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
  width: 85px;
  height: 85px;
  object-fit: fill;
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
  gap: 8px;
}

.menu-details label {
  font-size: 16px;
}

.menu-details input {
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 5px;
}

.menu-details input:focus {
  outline: none;
}

/* 삭제 버튼 */
.remove-button {
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #ff6f61;
  color: white;
  border: none;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}
.remove-button:hover {
  background-color: #ef5b4c;
}

/* + 버튼 */
.add-button,
.submit-button {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.5s ease, transform 0.5s ease;
  margin-top: 18px;
}

.add-button {
  background-color: #ff6f61;
  color: white;
}

.add-button:hover {
  transform: scale(1.08);
  transition: transform 0.5s ease;
}

/* 수정 완료 버튼 */
.submit-button {
  background-color: white;
  color: #ff6f61;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ff6f61;
}

.submit-button:hover {
  background-color: #ff6f61;
  color: white;
}

.soldOut-btn-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.soldOut-btn {
  width: 80px;
  padding: 8px 12px;
  background-color: white;
  border: 1px solid #ff6f61;
  border-radius: 8px;
  color: #ff6f61;
  cursor: pointer;
}

.soldOut-btn:hover {
  background-color: #ff6f61;
  color: white;
}

/* 품절 상태에 따른 버튼 스타일 변경 (선택사항) */
.soldOut-btn.active {
  background-color: #ff6b6b;
  color: white;
}
</style>
