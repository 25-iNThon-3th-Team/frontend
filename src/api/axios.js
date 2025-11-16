import axios from "axios";

// 백엔드 API base URL
// 환경 변수에서 가져오거나 기본값 사용
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

// axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10초 타임아웃
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 전송을 위해 필요
});

// 요청 인터셉터 (토큰 추가 등)
axiosInstance.interceptors.request.use(
  (config) => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("요청:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error("요청 에러:", error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리 등)
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("응답:", response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      // 서버가 응답을 보냈지만 에러 상태 코드
      console.error(
        `응답 에러 [${error.response.status}]:`,
        error.response.data
      );

      // 401 Unauthorized - 토큰 만료 등
      if (error.response.status === 401) {
        console.log("인증 실패 - 로그인이 필요합니다");
        // 필요시 로그인 페이지로 리다이렉트
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못함
      console.error("응답 없음 (서버가 응답하지 않음)");
    } else {
      // 요청 설정 중 에러 발생
      console.error("요청 설정 에러:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
