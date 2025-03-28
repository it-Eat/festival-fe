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

// 상대적 시간 표시 함수 추가
export const getRelativeTime = (dateStr) => {
  const now = new Date();
  const past = new Date(dateStr);
  const diff = now - past; // 밀리초 단위 차이

  // 시간 단위 정의 (밀리초 기준)
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < minute) {
    return "방금 전";
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}분 전`;
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}시간 전`;
  } else if (diff < week) {
    return `${Math.floor(diff / day)}일 전`;
  } else if (diff < month) {
    return `${Math.floor(diff / week)}주 전`;
  } else if (diff < year) {
    return `${Math.floor(diff / month)}개월 전`;
  } else {
    return `${Math.floor(diff / year)}년 전`;
  }
};
