import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function MyPage() {
  const navigate = useNavigate();

  // 프로필 편집 상태
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "사용자",
    email: "user@example.com",
    studentId: "2020123456",
    major: "컴퓨터학과",
  });

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grade: profile.grade || 0,
          semester: profile.semester || 0,
          majorCode: profile.major,
          creditsMajorRequired: profile.creditsMajorRequired || 0,
          creditsMajorElective: profile.creditsMajorElective || 0,
          creditsGeneral: profile.creditsGeneral || 0,
          preferredOffDays: profile.preferredOffDays || [],
          preferredTimeSlot: profile.preferredTimeSlot || "",
          maxTransferMinutes: profile.maxTransferMinutes || 0,
          priorityOrder: profile.priorityOrder || [],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("프로필 저장 성공:", data);
        setIsEditing(false);
        alert("프로필이 저장되었습니다!");
      } else {
        console.error("프로필 저장 실패:", response.status);
        alert("프로필 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("API 호출 에러:", error);
      alert("프로필 저장 중 오류가 발생했습니다.");
    }
  };

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  // 통계 데이터 (예시)
  const stats = {
    connectedSeniors: 5,
    activeChats: 3,
    completedCredits: 78,
    totalCredits: 130,
  };

  // 최근 활동 데이터 (예시)
  const recentActivities = [
    {
      id: 1,
      seniorName: "김선배",
      subject: "자료구조",
      lastMessage: "과제 관련 자료 공유해드렸어요!",
      time: "2시간 전",
      avatar: "👨‍💻",
    },
    {
      id: 2,
      seniorName: "이선배",
      subject: "알고리즘",
      lastMessage: "다음 주 시험 화이팅!",
      time: "5시간 전",
      avatar: "👩‍💼",
    },
    {
      id: 3,
      seniorName: "박선배",
      subject: "데이터베이스",
      lastMessage: "SQL 쿼리 예제 보내드릴게요",
      time: "1일 전",
      avatar: "👨‍🎓",
    },
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">마이페이지</h1>

        {/* 활동 통계 */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="bg-white border border-indigo-200 rounded-lg p-3 text-center">
            <div className="text-xl font-semibold text-indigo-700">
              {stats.connectedSeniors}
            </div>
            <div className="text-xs text-gray-600 mt-0.5">
              연결된 선배
            </div>
          </div>
          <div className="bg-white border border-indigo-200 rounded-lg p-3 text-center">
            <div className="text-xl font-semibold text-indigo-700">
              {stats.activeChats}
            </div>
            <div className="text-xs text-gray-600 mt-0.5">
              진행 중인 대화
            </div>
          </div>
          <div className="bg-white border border-indigo-200 rounded-lg p-3 text-center">
            <div className="text-xl font-semibold text-indigo-700">
              {stats.completedCredits}
            </div>
            <div className="text-xs text-gray-600 mt-0.5">
              이수 학점
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
          <div className="flex flex-col items-center py-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 border border-indigo-200 flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            {!isEditing ? (
              <>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">{profile.name}</h2>
                <p className="text-sm text-gray-600 mb-1">{profile.email}</p>
                <p className="text-xs text-gray-500 mb-3">
                  {profile.studentId} · {profile.major}
                </p>
                <button
                  onClick={handleEditToggle}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all font-medium"
                >
                  프로필 편집
                </button>
              </>
            ) : (
              <>
                <div className="w-full max-w-xs mt-2">
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="이름"
                    className="w-full px-3 py-2 mb-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="이메일"
                    className="w-full px-3 py-2 mb-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  />
                  <input
                    type="text"
                    value={profile.studentId}
                    onChange={(e) =>
                      handleInputChange("studentId", e.target.value)
                    }
                    placeholder="학번"
                    className="w-full px-3 py-2 mb-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  />
                  <select
                    value={profile.major}
                    onChange={(e) => handleInputChange("major", e.target.value)}
                    className="w-full px-3 py-2 mb-3 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 cursor-pointer bg-white"
                  >
                    <option value="컴퓨터학과">컴퓨터학과</option>
                    <option value="데이터과학과">데이터과학과</option>
                    <option value="인공지능학과">인공지능학과</option>
                  </select>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all font-medium"
                    >
                      저장
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                      취소
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="border-t border-gray-100 mt-4 pt-3">
            <div
              className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => handleMenuClick("/schedule")}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-900">내 시간표</span>
            </div>
            <div
              className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => handleMenuClick("/mymessage")}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm text-gray-900">내 메시지</span>
            </div>
            <div className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-gray-900">설정</span>
            </div>
            <div className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-sm text-gray-900">고객지원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
