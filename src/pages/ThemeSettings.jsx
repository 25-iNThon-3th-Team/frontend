import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function ThemeSettings() {
  const navigate = useNavigate();
  const [selectedTheme, setSelectedTheme] = useState("light");

  const themes = [
    {
      code: "light",
      name: "라이트 모드",
      description: "밝은 테마",
      icon: "☀️",
    },
    {
      code: "dark",
      name: "다크 모드",
      description: "어두운 테마",
      icon: "🌙",
    },
    {
      code: "auto",
      name: "자동",
      description: "시스템 설정에 따름",
      icon: "🔄",
    },
  ];

  const handleSave = () => {
    // API 호출하여 테마 설정 저장
    console.log("테마 설정 저장:", selectedTheme);
    alert("테마 설정이 저장되었습니다.");
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
            테마 설정
          </h1>
        </div>

        <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
          <p className="text-sm text-gray-600 mb-4">
            앱에서 사용할 테마를 선택하세요.
          </p>
          <div className="space-y-3">
            {themes.map((theme) => (
              <label
                key={theme.code}
                className={`flex items-center justify-between p-4 cursor-pointer border-2 rounded-lg transition-all ${
                  selectedTheme === theme.code
                    ? "border-indigo-600 bg-indigo-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <span className="text-3xl mr-3">{theme.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {theme.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {theme.description}
                    </div>
                  </div>
                </div>
                <input
                  type="radio"
                  name="theme"
                  value={theme.code}
                  checked={selectedTheme === theme.code}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                />
              </label>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-base rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all font-medium"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThemeSettings;
