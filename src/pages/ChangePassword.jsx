import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "../App.css";

function ChangePassword() {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 비밀번호 확인
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 길이 검증 (회원가입과 동일한 기준)
    if (!passwords.newPassword || passwords.newPassword.length === 0) {
      setError("새 비밀번호를 입력해주세요.");
      return;
    }

    if (passwords.newPassword.length < 4 || passwords.newPassword.length > 50) {
      setError("비밀번호는 4자 이상 50자 이하여야 합니다.");
      return;
    }

    // 비밀번호 변경 API 호출
    setIsLoading(true);
    try {
      // 여러 가능한 엔드포인트 시도
      let response;
      const passwordData = {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      };

      // 1. /api/users/password 시도
      try {
        response = await axios.put("/api/users/password", passwordData);
      } catch (err) {
        // 2. /api/users/change-password 시도
        if (err.response?.status === 404) {
          try {
            response = await axios.put("/api/users/change-password", passwordData);
          } catch (err2) {
            // 3. /api/users/me에 password 필드 포함해서 시도
            if (err2.response?.status === 404) {
              response = await axios.put("/api/users/me", {
                password: passwords.newPassword,
                currentPassword: passwords.currentPassword,
              });
            } else {
              throw err2;
            }
          }
        } else {
          throw err;
        }
      }

      console.log("비밀번호 변경 성공:", response.data);
      alert("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/mypage");
    } catch (error) {
      console.error("비밀번호 변경 에러:", error);
      
      if (!error.response) {
        setError("서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.");
      } else if (error.response.status === 404) {
        setError("비밀번호 변경 기능을 사용할 수 없습니다. 관리자에게 문의해주세요.");
      } else if (error.response.status === 400) {
        const message = error.response.data?.message || "현재 비밀번호가 올바르지 않습니다.";
        setError(message);
      } else if (error.response.status === 401 || error.response.status === 403) {
        setError("현재 비밀번호가 올바르지 않습니다.");
      } else if (error.response.status >= 500) {
        setError("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else {
        setError(`비밀번호 변경에 실패했습니다. (오류 코드: ${error.response.status})`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="flex items-center mb-3">
          <button
            onClick={() => navigate(-1)}
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
            비밀번호 변경
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg p-4 border border-gray-100"
        >
          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              현재 비밀번호
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              새 비밀번호
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              새 비밀번호 확인
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleInputChange}
              required
              disabled={isLoading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-[#4f46e5] hover:bg-[#6366f1] text-white text-base rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? "변경 중..." : "비밀번호 변경"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
