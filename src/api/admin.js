// import { localAxios } from "@/util/http-commons";
import api from "@/api/axiosInstance";
// withCredentials 활성화된 Axios 인스턴스 생성
// const local = localAxios();

async function deleteNotice(noticeIds, festivalId) {
  const response = await api.delete(`notice/${noticeIds}/${festivalId}`);
  return response.data;
}

async function getFestivalInfo(festivalId) {
  const response = await api.get(`festival/${festivalId}`);
  return response.data;
}

// 게시판 조회 API (관리자용)
async function getBoards(festivalId, query) {
  let { page, pageSize, orderBy, order, keyword, startDate, endDate } = query;

  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;
  orderBy = orderBy || "createdAt";
  order = order || "asc";

  const params = {
    page,
    pageSize,
    orderBy,
    order,
    boardType: "BOARD",
  };

  if (keyword) params.keyword = keyword;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  try {
    const response = await api.get(`board/admin/${festivalId}`, { params });
    return response.data;
  } catch (error) {
    console.error("API 호출 에러:", error);

    if (error.response?.status === 401) {
      alert("인증이 만료되었습니다. 다시 로그인해주세요.");
    }

    throw error;
  }
}

// 분실물 조회 API
async function getLostBoards(festivalId, query) {
  let { page, pageSize, orderBy, order, keyword, startDate, endDate } = query;

  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;
  orderBy = orderBy || "createdAt";
  order = order || "asc";

  const params = {
    page,
    pageSize,
    orderBy,
    order,
    boardType: "LOSS",
  };

  if (keyword) params.keyword = keyword;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  try {
    const response = await api.get(`board/admin/${festivalId}`, { params });
    return response.data;
  } catch (error) {
    console.error("API 호출 에러:", error);

    if (error.response?.status === 401) {
      alert("인증이 만료되었습니다. 다시 로그인해주세요.");
    }

    throw error;
  }
}

// 공지사항 api
async function getNotice(festivalId, query) {
  const { page = 1, pageSize = 5, orderBy = "" } = query;

  const params = { page, pageSize, orderBy };

  try {
    const response = await api.get(`notice/${festivalId}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
}

// 게시글 상세 api
async function getBoardDetail(boardId, festivalId) {
  try {
    const response = await api.get(`board/${boardId}/${festivalId}`, {
      headers: {
        "Content-Type": "application/json", // JSON 응답 명확히 설정
      },
    });

    console.log("✅ API 응답 데이터:", response.data); // 응답 데이터 확인

    if (!response.data || Object.keys(response.data).length === 0) {
      throw new Error("게시글 데이터를 찾을 수 없습니다.");
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "API 응답 오류:",
        error.response.status,
        error.response.data
      );
      throw new Error(
        `API 요청 실패: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      console.error("API 요청 실패 (서버 응답 없음):", error.request);
      throw new Error("서버 응답이 없습니다. 네트워크 상태를 확인해주세요.");
    } else {
      console.error("요청 설정 오류:", error.message);
      throw new Error("API 요청 중 오류가 발생했습니다.");
    }
  }
}

// 댓글 목록 불러오기
async function getComments(boardId, festivalId) {
  try {
    const response = await api.get(`comment/${boardId}/${festivalId}`);
    return response.data;
  } catch (error) {
    console.error("댓글 API 요청 실패:", error);
    return [];
  }
}

// 리뷰 목록 불러오기
async function getReviews(query) {
  // query: { page, pageSize, orderBy, boothId, ... }
  const res = await api.get(`review`, { params: query });
  // 응답 예: { items: [...], total: number } or just an array
  return res.data;
}

// 리뷰 삭제
async function deleteReview(reviewId) {
  try {
    const response = await api.delete(`review/${reviewId}`);
    return response;
  } catch (error) {
    console.error("리뷰 삭제 실패:", error);
    throw error;
  }
}

// 부스 불러오기
async function getBooths(festivalId, query) {
  const {
    page = 1,
    pageSize = 5,
    orderBy = "",
    keyword = "",
    type = "",
  } = query;
  const params = { page, pageSize, orderBy };
  if (keyword) params.keyword = keyword;
  if (type) params.type = type;

  try {
    const response = await api.get(`booth/admin/${festivalId}`, {
      params,
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("상점 API 호출 에러:", error);
    throw error;
  }
}

// 부스 상세 api
async function getBoothDetail(boothId, festivalId) {
  try {
    const response = await api.get(`booth/${boothId}/${festivalId}`, {
      headers: {
        "Content-Type": "application/json", // JSON 응답 명확히 설정
      },
    });

    console.log("✅ API 응답 데이터:", response.data); // 응답 데이터 확인

    if (!response.data || Object.keys(response.data).length === 0) {
      throw new Error("게시글 데이터를 찾을 수 없습니다.");
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        "API 응답 오류:",
        error.response.status,
        error.response.data
      );
      throw new Error(
        `API 요청 실패: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      console.error("API 요청 실패 (서버 응답 없음):", error.request);
      throw new Error("서버 응답이 없습니다. 네트워크 상태를 확인해주세요.");
    } else {
      console.error("요청 설정 오류:", error.message);
      throw new Error("API 요청 중 오류가 발생했습니다.");
    }
  }
}

// 2) 메뉴 목록
async function getMenuList(boothId) {
  const res = await api.get(`menu/${boothId}`);
  return res.data; // [ { id, name, price }, ... ]
}

// 부스 승인
async function patchBooth(festivalId, boothId, payload) {
  try {
    const response = await api.patch(
      `booth/admin/${festivalId}/${boothId}`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("부스 patch API 호출 에러:", error);
    throw error;
  }
}

async function logout() {
  const response = await api.post("/user/logout");
  return response.data;
}

export {
  getBoards,
  getLostBoards,
  getNotice,
  getBoardDetail,
  getComments,
  getBooths,
  patchBooth,
  getBoothDetail,
  getReviews,
  getMenuList,
  deleteReview,
  getFestivalInfo,
  logout,
  deleteNotice,
};
