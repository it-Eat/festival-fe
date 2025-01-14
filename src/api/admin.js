import { localAxios } from "@/util/http-commons";

const local = localAxios();

// 상점 전체 조회
async function allListBooth(festivalId, query) {
  const {
    page = 1,
    pageSize = 5,
    orderBy = "recent",
    keyword = "",
    type = "",
  } = query;

  try {
    const response = await local.get(`booth/admin/${festivalId}`, {
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
    throw error; // 에러를 다시 던져서 호출한 쪽에서 처리 가능하게 함
  }
}

export { allListBooth };
