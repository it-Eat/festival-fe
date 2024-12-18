<script setup>

</script>

<template>
    <div class="hamberger">
      <div class="menu-content">
        <div>
        <!-- 나중에 토큰연결후 이름바꾸기 -->
        <div>천세윤 님</div>
         <hr>
        </div>
        <ul>
          <li>로그아웃</li>
          <li>공통페이지</li>
          <li><router-link to="/user/myOrderList">주문 내역</router-link></li>
          <li><router-link to="/user/boothApply">부스 신청하기</router-link></li>
          <li><router-link to="/user/myPostList">작성글 보기기</router-link></li>
        </ul>
        <div class="delete-account"><router-link to="/user/deleteId">회원탈퇴</router-link></div>
      </div>

    </div>
</template>

<style scoped>
  .menu-content {
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  height: 100vh;
  background: #ffffff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-content li {
  margin: 10px 0;
}

.menu-content ul a {
  text-decoration: none;
  color: #ff6f61;
}

.menu-content ul a:hover{
  color: #c15248;
}


.delete-account {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: auto; /* 아래로 밀기 */
  margin-bottom: 40px;
  padding: 8px 16px;
  background-color: #000000; /* 버튼 배경색 */
  color: white;
  font-weight: bold;
  border-radius: 5px; /* 둥근 모서리 */
  cursor: pointer;
  text-align: center;
  width: 10%;
  font-size: 7px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* 버튼 그림자 */
}

.delete-account a {
  text-decoration: none; /* 밑줄 제거 */
  color: white; /* 텍스트 색상 */
  width: 100%; /* 링크 전체 클릭 가능 */
  display: block; /* 블록 형태로 설정 */
  text-align: center;
}

.delete-account:hover {
  background-color: #474241; /* 호버 시 버튼 색상 */
}
</style>
