import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function LanguageSettings() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("ko");

  const languages = [
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
  ];

  const handleSave = () => {
    // API 호출하여 언어 설정 저장
    console.log("언어 설정 저장:", selectedLanguage);
    alert("언어 설정이 저장되었습니다.");
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
            언어 설정
          </h1>
        </div>

        <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
          <p className="text-sm text-gray-600 mb-4">
            서비스에서 사용할 언어를 선택하세요.
          </p>
          <div className="space-y-2">
            {languages.map((lang) => (
              <label
                key={lang.code}
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-2xl mr-3">{lang.flag}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {lang.name}
                  </span>
                </div>
                <input
                  type="radio"
                  name="language"
                  value={lang.code}
                  checked={selectedLanguage === lang.code}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
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

export default LanguageSettings;
