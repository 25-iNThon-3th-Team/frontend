import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function ChangePassword() {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (passwords.newPassword.length < 8) {
      setError("새 비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    // In a real app, you would make an API call here
    // to verify the current password and update to the new one.
    console.log("비밀번호 변경 시도:", {
      currentPassword: passwords.currentPassword,
      newPassword: passwords.newPassword,
    });

    alert("비밀번호가 성공적으로 변경되었습니다.");
    navigate("/mypage");
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-base rounded-lg font-medium"
          >
            비밀번호 변경
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
