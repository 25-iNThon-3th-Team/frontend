import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function PrivacySettings() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    profileVisibility: "public", // public, friends, private
    showEmail: false,
    showSchedule: true,
    allowMessages: true,
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleVisibilityChange = (value) => {
    setSettings({ ...settings, profileVisibility: value });
  };

  const handleSave = () => {
    // API 호출하여 설정 저장
    console.log("개인정보 공개 설정 저장:", settings);
    alert("개인정보 공개 설정이 저장되었습니다.");
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
            개인정보 공개 설정
          </h1>
        </div>

        <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
          <div className="space-y-4">
            <div className="py-2">
              <h3 className="text-sm font-medium text-gray-900 mb-2">프로필 공개 범위</h3>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={settings.profileVisibility === "public"}
                    onChange={(e) => handleVisibilityChange(e.target.value)}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-900">전체 공개</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="friends"
                    checked={settings.profileVisibility === "friends"}
                    onChange={(e) => handleVisibilityChange(e.target.value)}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-900">연결된 선배만</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={settings.profileVisibility === "private"}
                    onChange={(e) => handleVisibilityChange(e.target.value)}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-900">비공개</span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-gray-100">
              <div>
                <h3 className="text-sm font-medium text-gray-900">이메일 공개</h3>
                <p className="text-xs text-gray-500">다른 사용자에게 이메일 공개</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showEmail}
                  onChange={() => handleToggle("showEmail")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-gray-100">
              <div>
                <h3 className="text-sm font-medium text-gray-900">시간표 공개</h3>
                <p className="text-xs text-gray-500">다른 사용자에게 시간표 공개</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showSchedule}
                  onChange={() => handleToggle("showSchedule")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-gray-100">
              <div>
                <h3 className="text-sm font-medium text-gray-900">메시지 수신</h3>
                <p className="text-xs text-gray-500">다른 사용자의 메시지 받기</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.allowMessages}
                  onChange={() => handleToggle("allowMessages")}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
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

export default PrivacySettings;
