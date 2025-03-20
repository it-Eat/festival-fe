// YYYYMMDD 형식의 문자열을 Date 객체로 변환
export const dateFormat = (dateStr) => {
  const year = parseInt(dateStr.substring(0, 4));
  const month = parseInt(dateStr.substring(4, 6)) - 1;
  const day = parseInt(dateStr.substring(6, 8));
  return new Date(year, month, day);
};

// createdAt 형식의 문자열을 YYYY년 MM월 DD일 오전/오후 HH시 MM분으로 변환
export const dateFormatWithTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// createdAt 형식의 문자열을 YYYY년 MM월 DD일로 변환
export const dateFormatWithoutTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// createdAt 형식의 문자열을 오전/오후 HH시 MM분으로 변환
export const dateFormatWithTime2 = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
