import api from "@/api/axiosInstance";

async function getFestivalList(cursor, limit, keyword) {
  // URL 파라미터를 저장할 배열
  const queryParams = [];

  // 각 파라미터가 있을 때만 배열에 추가
  if (cursor !== undefined && cursor !== null) {
    queryParams.push(`cursor=${encodeURIComponent(cursor)}`);
  }

  if (limit !== undefined && limit !== null) {
    queryParams.push(`limit=${encodeURIComponent(limit)}`);
  }

  if (keyword) {
    queryParams.push(`keyword=${encodeURIComponent(keyword)}`);
  }

  // 쿼리 파라미터 조합
  const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

  const response = await api.get(`/festival${queryString}`);
  return response.data;
}

async function getFestivalDetail(festivalId) {
  const response = await api.get(`/festival/${festivalId}`);
  return response.data;
}

async function joinFestival(festivalId) {
  const response = await api.post(`/participation/${festivalId}`);
  return response.data;
}

export { getFestivalList, getFestivalDetail, joinFestival };
