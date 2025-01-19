import { localAxios } from "@/util/http-commons";

const local = localAxios();

// const cookie = document.cookie;
// const accessToken = cookie.split('; ').find(row => row.startsWith('access-token=')).split('=')[1];

// 분실물 조회
async function getLostBoards(festivalId, query) {
  const {
    page = 1,
    pageSize = 5,
    orderBy = "recent",
    keyword = "",
    type = "",
  } = query;

  try {
    const response = await local.get(`board/board-loss/${festivalId}`, {
      params: {
        page,
        pageSize,
        orderBy,
        keyword,
        type,
      },
    });
    return response.data; // 데이터를 반환
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
}

// 게시판 조회
async function getBoards(festivalId, query) {
  const {
    page = 1,
    pageSize = 5,
    orderBy = "recent",
    order = "asc",
    keyword = "",
    startDate = "",
    endDate = "",
  } = query;

  try {
    const response = await local.get(`board/admin/${festivalId}`, {
      // params 대신 data로 변경
      data: {
        page,
        pageSize,
        orderBy,
        order,
        keyword,
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error("API 호출 에러:", error);
    throw error;
  }
}
export { getLostBoards, getBoards };
