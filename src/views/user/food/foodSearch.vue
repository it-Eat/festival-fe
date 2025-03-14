<template>
  <div class="search-container">
    <!-- 검색 폼 -->
    <form @submit.prevent="handleSearch" class="search-form">
      <div class="search-input-wrapper">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="검색어를 입력하세요"
          class="search-input"
          @input="handleInput"
        />
        <button type="submit" class="search-button">검색</button>
      </div>

      <!-- 검색 결과 표시 -->
      <div v-if="searchResults.length > 0" class="search-results">
        <ul>
          <li v-for="(result, index) in searchResults" :key="index">
            {{ result }}
          </li>
        </ul>
      </div>

      <!-- 검색 결과가 없을 때 메시지 -->
      <div v-if="hasSearched && searchResults.length === 0" class="no-results">
        검색 결과가 없습니다.
      </div>
    </form>
  </div>
</template>

<script>
import _ from "lodash"; // 이 줄을 상단에 추가

export default {
  name: "SearchComponent",
  data() {
    return {
      searchQuery: "",
      searchResults: [],
      hasSearched: false,
    };
  },
  methods: {
    handleSearch() {
      // 실제 검색 로직을 구현하세요
      this.hasSearched = true;
      // 예시: API 호출
      this.searchResults = this.performSearch(this.searchQuery);
    },
    handleInput() {
      // 입력 중 실시간 검색이 필요한 경우 구현
      if (this.searchQuery.length >= 2) {
        this.debounceSearch();
      }
    },
    performSearch(query) {
      // 여기에 실제 검색 로직을 구현하세요
      // 예시 데이터 반환
      const mockData = ["결과 1", "결과 2", "결과 3"];
      return mockData.filter((item) => item.includes(query));
    },
    debounceSearch: _.debounce(function () {
      this.handleSearch();
    }, 300),
  },
};
</script>

<style scoped>
.search-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.search-form {
  width: 100%;
}

.search-input-wrapper {
  display: flex;
  gap: 10px;
}

.search-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.search-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #45a049;
}

.search-results {
  margin-top: 20px;
}

.search-results ul {
  list-style: none;
  padding: 0;
}

.search-results li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.no-results {
  margin-top: 20px;
  text-align: center;
  color: #666;
}
</style>
