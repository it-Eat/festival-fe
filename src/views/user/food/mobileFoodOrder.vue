<template>
  <div class="loadingComponent">
    <p class="loadingText">결제 진행중...</p>
    <div class="loading-spinner"></div>
  </div>
</template>

<script></script>

<style>
.loadingComponent {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
}
.loadingText {
  font-size: 24px;
  font-weight: 600;
  color: #333;
}
.loading-spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #ff6f61;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1.5s linear infinite;
  margin-bottom: 24px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
