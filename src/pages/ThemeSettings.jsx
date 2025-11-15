import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/themeStore";
import "../App.css";

function ThemeSettings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useThemeStore();
  const [selectedTheme, setSelectedTheme] = useState(theme);
  
  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  const SunIcon = () => (
    <svg
      className="w-5 h-5 text-gray-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );

  const MoonIcon = () => (
    <svg
      className="w-5 h-5 text-gray-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );

  const AutoIcon = () => (
    <svg
      className="w-5 h-5 text-gray-600"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
      />
    </svg>
  );

  const themes = [
    {
      code: "light",
      name: "라이트 모드",
      description: "밝은 테마",
      icon: <SunIcon />,
    },
    {
      code: "dark",
      name: "다크 모드",
      description: "어두운 테마",
      icon: <MoonIcon />,
    },
    {
      code: "auto",
      name: "자동",
      description: "시스템 설정에 따름",
      icon: <AutoIcon />,
    },
  ];

  const handleSave = () => {
    // 테마 설정 저장
    setTheme(selectedTheme);
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
            className="p-1 mr-2 rounded-full hover:bg-gray-200"
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
                className={`flex items-center justify-between p-4 cursor-pointer border rounded-lg transition-all ${
                  selectedTheme === theme.code
                    ? "border-gray-400 bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center">
                  <div className="mr-3">{theme.icon}</div>
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
                  className="w-4 h-4 text-gray-600 focus:ring-gray-500"
                />
              </label>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="w-full mt-6 px-4 py-2 bg-gray-800 text-white text-base rounded-lg hover:bg-gray-700 transition-all font-medium"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThemeSettings;
