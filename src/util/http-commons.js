import axios from "axios";

const { VITE_VUE_API_URL } = import.meta.env;

function localAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { localAxios };
