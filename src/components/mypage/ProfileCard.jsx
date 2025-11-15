import { useState } from "react";

const ProfileCard = ({ profile, onSave, onInputChange, onLogout, onLogin }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    onSave();
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Here you might want to reset the profile state to its original values
    // For now, just exit editing mode
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
      <div className="flex flex-col items-center py-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 border border-indigo-200 flex items-center justify-center mb-3">
          <svg
            className="w-8 h-8 text-indigo-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>

        {!isEditing ? (
          <>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              {profile.name}
            </h2>
            <p className="text-sm text-gray-600 mb-1">{profile.email}</p>
            <p className="text-xs text-gray-500 mb-1">
              {profile.studentId} · {profile.major}
            </p>
            <p className="text-xs text-gray-500 mb-3">
              {profile.grade >= 5 ? "5학년 이상" : `${profile.grade}학년`}{" "}
              {profile.semester}학기
            </p>
            <div className="flex gap-2 flex-wrap justify-center">
              <button
                onClick={handleEditToggle}
                className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all font-medium"
              >
                프로필 편집
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                로그아웃
              </button>
              <button
                onClick={onLogin}
                className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                로그인 테스트
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-full max-w-xs mt-2">
              <input
                type="text"
                value={profile.name}
                onChange={(e) => onInputChange("name", e.target.value)}
                placeholder="이름"
                className="w-full px-3 py-2 mb-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => onInputChange("email", e.target.value)}
                placeholder="이메일"
                className="w-full px-3 py-2 mb-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              />
              <input
                type="text"
                value={profile.studentId}
                onChange={(e) => onInputChange("studentId", e.target.value)}
                placeholder="학번"
                className="w-full px-3 py-2 mb-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              />
              <select
                value={profile.major}
                onChange={(e) => onInputChange("major", e.target.value)}
                className="w-full px-3 py-2 mb-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 cursor-pointer bg-white"
              >
                <option value="컴퓨터학과">컴퓨터학과</option>
                <option value="데이터과학과">데이터과학과</option>
                <option value="인공지능학과">인공지능학과</option>
              </select>
              <div className="flex gap-2 mb-2">
                <select
                  value={profile.grade}
                  onChange={(e) =>
                    onInputChange("grade", parseInt(e.target.value))
                  }
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 cursor-pointer bg-white"
                >
                  <option value={1}>1학년</option>
                  <option value={2}>2학년</option>
                  <option value={3}>3학년</option>
                  <option value={4}>4학년</option>
                  <option value={5}>5학년 이상</option>
                </select>
                <select
                  value={profile.semester}
                  onChange={(e) =>
                    onInputChange("semester", parseInt(e.target.value))
                  }
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 cursor-pointer bg-white"
                >
                  <option value={1}>1학기</option>
                  <option value={2}>2학기</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all font-medium"
                >
                  저장
                </button>
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  취소
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
