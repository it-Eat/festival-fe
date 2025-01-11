<template>
  <div class="page">
    <div class="home">
      <div class="header">
        <BackHeader />
      </div>
      <div class="content">
        <div class="menu-item" v-for="(menu, index) in menus" :key="index">
          <div class="menu-image">
            <input type="file" @change="handleImageUpload(index, $event)" accept="image/*" ref="imageInput" style="display: none;" />
            <div class="image-preview" @click="$refs.imageInput[index].click()" style="cursor: pointer;">
              <img v-if="menu.imagePreview" :src="menu.imagePreview" alt="Menu Image" />
              <div v-else class="image-placeholder">
                <img src="./image.png" alt="image placeholder" style="width: 50px; height: 50px;">
              </div>
            </div>
          </div>
          <div class="menu-details">
            <label for="menu-name">메뉴명:</label>
            <input type="text" id="menu-name" v-model="menu.name" placeholder="메뉴명 입력" />
            <label for="menu-price">가격:</label>
            <input type="number" id="menu-price" v-model="menu.price" placeholder="가격 입력" />
            <div class="sold-out">
              <label>품절 여부</label>
              <input type="checkbox" v-model="menu.soldOut" />
            </div>
          </div>
          <button class="remove-button" @click="removeMenu(index)">X</button>
        </div>
        <button class="add-button" @click="addMenu">+</button>
        <button class="submit-button" @click="saveMenus">수정 완료</button>
      </div>
    </div>
  </div>
</template>

<script>
import BackHeader from '@/components/common/backHeader.vue';
import { useRouter } from 'vue-router';

export default {
  components: { BackHeader },
  data() {
    return {
      menus: [
        { image: null, imagePreview: 'https://via.placeholder.com/600x300', name: '떡볶이', price: 5000, soldOut: false },
        { image: null, imagePreview: null, name: '', price: null, soldOut: false }
      ],
      router: useRouter()
    };
  },
  mounted() {
    this.$refs.imageInput = [];
  },
  methods: {
    handleImageUpload(index, event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.menus[index].image = file;
          this.menus[index].imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    addMenu() {
      this.menus.push({ image: null, imagePreview: null, name: '', price: null, soldOut: false });
      this.$nextTick(() => {
        this.$refs.imageInput.push(null);
      })
    },
    removeMenu(index) {
      this.menus.splice(index, 1);
      this.$refs.imageInput.splice(index, 1);
    },
    saveMenus(){
      console.log(this.menus);
      this.router.back(); // Assuming you want to navigate back after saving
    }
  },
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
}

.header {
  width: 100%;
  margin-bottom: 20px;
  text-align: center;
}

.content {
  width: 100%;
  margin-bottom: 20px;
  padding: 0;
  display: flex; /* Flexbox 활성화 */
    flex-direction: column; /* 아이템들을 세로로 배치 (기존 정렬 유지) */
    align-items: center; /* 가로 방향 중앙 정렬 */
}

.menu-item {
  display: flex;
  width: 100%;
  align-items: center;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  position: relative;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.05);
  margin-bottom: 10px;
  box-sizing: border-box;
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

.menu-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.menu-details {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
}

.input-group label {
  font-weight: 500;
  margin-bottom: 3px;
}

.menu-details input {
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

.sold-out {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

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

.add-button,
.submit-button {
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease; /* box-shadow transition 추가 */
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* 초기 그림자 효과 */
}

.add-button {
  background-color: #2ecc71;
  color: white;
  margin: 20px auto;
}

.submit-button {
  background-color: #3498db;
  color: white;
  width: 100%;
  margin-top: 20px;
}

.add-button:hover {
  background-color: #27ae60;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.3); /* 호버 시 그림자 강화 */
}

.add-button:active {
  background-color: #219d56;
  transform: translateY(1px);
  box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2); /* 클릭 시 내부 그림자 */
}

.submit-button:hover {
  background-color: #2980b9;
    box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.2);
}
</style>
