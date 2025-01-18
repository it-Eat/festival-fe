import { localAxios } from "@/util/http-commons";

const local = localAxios();

// 상점 전체 조회
function allListBooth(festivalId, query) {
  const {
    page = 1,
    pageSize = 5,
    orderBy = "recent",
    keyword = "",
    type = "",
  } = query;

  local
    .get(`booth/admin/${festivalId}`, {
      params: {
        page,
        pageSize,
        orderBy,
        keyword,
        type,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("API 호출 에러:", error);
      throw error;
    });
}

export { allListBooth };
