<script setup>
</script>

<template>
    <div>
        <h1>게시글 리스트입니다.</h1>
        <RouterLink to="/user/boardList/detail" class="router-link">게시글 디테일 보기</RouterLink><br />
        <RouterLink to="/user/boardList/write" class="router-link">게시글 작성하기</RouterLink><br />
        <main class="content-area">
            <router-view></router-view>
        </main>
    </div>
</template>

<style scoped>
.content-area {
    width: 100%;          
    height: 300px;         
    background-color: #f0f0f0; 
    margin-top: 20px;        
    padding: 20px;          
    border: 1px solid #ccc;  
}

</style>
