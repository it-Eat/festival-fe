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

async function processKakaoCallback(code) {
  const local = localAxios();
  try {
    const response = await local.get(`/user/auth/kakao/callback?code=${code}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("카카오 로그인 처리 실패:", error);
    throw error;
  }
}

// 공지사항 호출 API 함수 추가
async function getNotice(festivalId, query) {
  try {
    // 전달받은 query에 pageSize: 50을 강제로 추가 (덮어씌움)
    const params = {
      ...query,
      pageSize: 50,
    };
    const response = await local.get(`notice/${festivalId}`, {
      params,
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("공지사항 API 호출 실패:", error);
    throw error;
  }
}

async function getBoothDetail(boothId, festivalId) {
  try {
    const response = await local.get(`booth/${boothId}/${festivalId}`, {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("부스 상세 API 호출 실패:", error);
    throw error;
  }
}

export { kakaoLogin, processKakaoCallback, getNotice, getBoothDetail };
