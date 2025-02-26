import { localAxios } from "@/util/http-commons";

// withCredentials 활성화된 Axios 인스턴스 생성
const local = localAxios();

// 게시판 조회 API
async function getBoards(festivalId, query) {
  let { page, pageSize, orderBy, order, keyword, startDate, endDate } = query;

  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 4;
  orderBy = orderBy || "createdAt";
  order = order || "asc";

  const params = {
    page,
    pageSize,
    orderBy,
    order,
  };

  // keyword가 비어 있지 않을 때만 추가
  if (keyword) params.keyword = keyword;
  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  try {
    const response = await local.get(`board/${festivalId}`, { params });
    return response.data;
  } catch (error) {
    console.error("API 호출 에러:", error);

    if (error.response?.status === 401) {
      alert("인증이 만료되었습니다. 다시 로그인해주세요.");
    }

    throw error;
  }
}

// 분실물 조회 API (withCredentials 추가)
async function getLostBoards(festivalId, query) {
  const {
    page = 1,
    pageSize = 5,
    orderBy = "recent",
    keyword = "",
    type = "",
  } = query;

  const params = { page, pageSize, orderBy };

  if (keyword) params.keyword = keyword;
  if (type) params.type = type;

  try {
    const response = await local.get(`board/board-loss/${festivalId}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
}

// 공지사항 api
async function getNotice(festivalId, query) {
  const { page = 1, pageSize = 5, orderBy = "recent" } = query;

  const params = { page, pageSize, orderBy };

  try {
    const response = await local.get(`notice/${festivalId}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
}

export { getBoards, getLostBoards, getNotice };
