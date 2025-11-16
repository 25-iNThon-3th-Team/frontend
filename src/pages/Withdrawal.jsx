import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import useAuthStore from "../store/authStore";
import axios from "../api/axios";

function Withdrawal() {
  const navigate = useNavigate();
  const [confirmText, setConfirmText] = useState("");

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUser(response.data);
      } catch (error) {
        console.error("사용자 정보 불러오기 실패:", error);
      }
    };
    fetchUser();
  }, []);

  const handleWithdrawal = () => {
    // 최종 확인 절차
    if (confirmText !== "회원탈퇴") {
      alert("정확한 확인을 위해 '회원탈퇴'를 입력해주세요.");
      return;
    }

    // 최종 확인
    if (
      !window.confirm(
        "정말로 회원탈퇴를 하시겠습니까? 이 작업은 되돌릴 수 없습니다."
      )
    )
      return;
    // 탈퇴 API 호출
    axios.delete(`/api/users/${user.id}`);
    alert("회원탈퇴가 완료되었습니다. 그동안 이용해주셔서 감사합니다.");
    // 홈으로 이동
    // navigate("/");
    const handleLogout = async () => {
      {
        try {
          await axios.post("/logout");
          console.log("로그아웃 성공");
        } catch (error) {
          console.error("로그아웃 에러:", error);
        } finally {
          const { logout } = useAuthStore.getState();
          logout();
          sessionStorage.clear();
          navigate("/");
        }
      }
    };
    handleLogout();
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="flex items-center mb-3">
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="p-1 mr-2 rounded-full hover:bg-gray-100"
          >
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="page-title" style={{ marginBottom: 0, flexGrow: 1 }}>
            회원 탈퇴
          </h1>
        </div>

        <div className="bg-white rounded-lg p-4 mb-3 border border-red-200">
          <div className="text-center">
            <svg
              className="w-12 h-12 text-red-500 mx-auto mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-lg font-semibold text-red-700">
              정말로 탈퇴하시겠습니까?
            </h2>
            <p className="text-sm text-gray-600 mt-2 mb-4">
              계정을 삭제하면 모든 데이터(프로필, 활동 기록, 채팅 내역 등)가
              영구적으로 삭제되며, 복구할 수 없습니다.
            </p>
          </div>

          <div className="mt-4">
            <label
              htmlFor="confirm"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              계속 진행하려면 아래에 '회원탈퇴'를 입력하세요.
            </label>
            <input
              id="confirm"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="회원탈퇴"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={handleWithdrawal}
              disabled={confirmText !== "회원탈퇴"}
              className="w-full px-4 py-2 bg-red-600 text-white text-base rounded-lg transition-all font-medium disabled:bg-red-300 disabled:cursor-not-allowed hover:bg-red-700"
            >
              계정 영구 삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Withdrawal;
