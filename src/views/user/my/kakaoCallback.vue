<template>
  <div class="callback-container">
    <p> 로그인 처리 중...</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { processKakaoCallback } from '@/api/user'; // API 호출 함수 import

const router = useRouter();

const handleKakaoCallback = async () => {
  try {
    // URL에서 인증 코드 추출
    const code = new URL(window.location.href).searchParams.get('code');
    if (!code) {
      throw new Error('인증 코드가 없습니다');
    }

    // 카카오 콜백 처리 함수 호출
    const response = await processKakaoCallback(code);

    // 로그인 성공 후 리다이렉트
    router.push('/user'); // 또는 원하는 경로
  } catch (error) {
    console.error('로그인 처리 실패:', error);
    router.push('/user/login'); // 실패시 로그인 페이지로 리다이렉트
  }
};

onMounted(() => {
  handleKakaoCallback();
});
</script>
