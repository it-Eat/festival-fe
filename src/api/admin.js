import { localAxios } from "@/util/http-commons";

const local = localAxios();

// 상점 전체 조회
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

export { getLostBoards };
