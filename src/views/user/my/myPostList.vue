<script setup>
import BackHeader from '@/components/common/backHeader.vue';
import SmallList from '@/components/common/smallList.vue';
import { useLostStore } from "@/stores/lost";
import { useBoardStore } from "@/stores/board";

const lostStore = useLostStore();
const boardStore = useBoardStore();
</script>

<template>
    <div class="page">
        <div class="home">
          <div class="header">
            <BackHeader/>
          </div>
          <div class="content">
            <div>
              <div class="menu">분실물</div>
              <hr style="border: 0; height: 1px; background-color: black" />
              <SmallList
                class="list-item"
                v-for="lostItem in lostStore.lostList.slice(0, 4)"
                :key="lostItem.id"
                :lost="lostItem"
              />
              <div style="display: flex; justify-content: center">
                <button
                  style="margin: auto; padding: 2px 4px; background-color: #2fffff"
                >
                  <router-link style="text-decoration: none" to="/user/lostItem/list"
                    >더보기</router-link
                  >
                </button>
              </div>
            </div>
            <div>
              <div class="menu">게시판</div>
              <hr style="border: 0; height: 1px; background-color: black" />
              <SmallList
                class="list-item"
                v-for="boardItem in boardStore.boardList.slice(0, 4)"
                :key="boardItem.id"
                :board="boardItem"
              />
              <div style="display: flex; justify-content: center">
                <button
                  style="margin: auto; padding: 2px 4px; background-color: #2fffff"
                >
                  <router-link style="text-decoration: none" to="/user/board/list"
                    >더보기</router-link
                  >
                </button>
              </div>
            </div>
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

.content {
  width: 100%;
  margin-bottom: 20px;
  padding: 0;
}
</style>
