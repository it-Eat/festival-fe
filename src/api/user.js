import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function kakaoLogin() {
  try {
    const response = await local.get(`user/auth/kakao/url`);

    if (!response.data || !response.data.continue) {
      throw new Error("카카오 로그인 URL을 받아오지 못했습니다.");
    }

    // ✅ 카카오 로그인 페이지로 리다이렉트
    window.location.href = response.data.continue;
  } catch (error) {
    console.error("API 호출 에러:", error);
    alert("카카오 로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
  }
}





async function processKakaoCallback(code){
  const local = localAxios();
  try {
    // 백엔드의 콜백 엔드포인트 호출
    const response = await local.get(`/user/auth/kakao/callback?code=${code}`);

    return response.data;
  } catch (error) {
    console.error('카카오 로그인 처리 실패:', error);
    throw error; // 호출한 곳에서 오류를 처리하도록 예외를 던짐
  }
};

export {kakaoLogin, processKakaoCallback};
