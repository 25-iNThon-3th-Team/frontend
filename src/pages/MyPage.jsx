import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
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
    grade: 3, // 학년
    semester: 1, // 학기
    completedCredits: 78,
    totalCredits: 130,
  });

  // 수강신청 성향 편집 상태
  const [isEditingPreference, setIsEditingPreference] = useState(false);
  const [coursePreference, setCoursePreference] = useState({
    preferredOffDays: ["수요일"],
    preferredTimeSlot: "morning", // morning, afternoon, evening
    maxTransferMinutes: 15,
    priorityOrder: ["전공필수", "전공선택", "교양"],
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

  const handleLogout = async () => {
    // 로그아웃 확인
    if (window.confirm("로그아웃 하시겠습니까?")) {
      try {
        // 백엔드에 로그아웃 요청
        const response = await axios.post("/logout");
        console.log("로그아웃 성공:", response.data);
        console.log("상태 코드:", response.status);

        // 로그인 정보 삭제
        localStorage.removeItem("token");
        sessionStorage.clear();

        // 메인 페이지로 이동
        navigate("/");
        alert("로그아웃되었습니다.");
      } catch (error) {
        console.error("로그아웃 에러:", error);

        // 에러가 발생해도 프론트엔드 세션은 정리
        localStorage.removeItem("token");
        sessionStorage.clear();
        navigate("/");
        alert("로그아웃되었습니다.");
      }
    }
  };

  const handlePreferenceToggle = () => {
    setIsEditingPreference(!isEditingPreference);
  };

  const handlePreferenceSave = async () => {
    try {
      // API 호출하여 성향 저장
      console.log("수강신청 성향 저장:", coursePreference);
      setIsEditingPreference(false);
      alert("수강신청 성향이 저장되었습니다!");
    } catch (error) {
      console.error("API 호출 에러:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handlePreferenceChange = (field, value) => {
    setCoursePreference({ ...coursePreference, [field]: value });
  };

  const toggleOffDay = (day) => {
    const currentDays = coursePreference.preferredOffDays;
    if (currentDays.includes(day)) {
      handlePreferenceChange(
        "preferredOffDays",
        currentDays.filter((d) => d !== day)
      );
    } else {
      handlePreferenceChange("preferredOffDays", [...currentDays, day]);
    }
  };

  // 통계 데이터 (실제 데이터에서 계산)
  const [stats, setStats] = useState({
    connectedSeniors: 0,
    activeChats: 0,
    completedCredits: 0,
    totalCredits: 130,
  });

  // 데이터 로드 및 통계 계산
  useEffect(() => {
    // 선배 데이터 가져오기 (실제로는 API에서 가져올 것)
    const seniorData = {
      1: { name: "김선배", major: "컴퓨터공학과", year: "20학번" },
      2: { name: "이선배", major: "컴퓨터공학과", year: "21학번" },
      3: { name: "박선배", major: "컴퓨터공학과", year: "19학번" },
      4: { name: "최선배", major: "컴퓨터공학과", year: "20학번" },
      5: { name: "정선배", major: "컴퓨터공학과", year: "18학번" },
      6: { name: "강선배", major: "컴퓨터공학과", year: "21학번" },
      7: { name: "윤선배", major: "컴퓨터공학과", year: "20학번" },
    };

    // 채팅 목록 가져오기 (실제로는 API에서 가져올 것)
    const recentChats = [
      {
        seniorId: 1,
        lastMessage: "수업 후기 궁금하시면 언제든 물어보세요!",
        lastTime: "오후 2:30",
        unread: 0,
      },
      {
        seniorId: 3,
        lastMessage: "알고리즘 수업은 정말 도움이 됐어요",
        lastTime: "오전 11:20",
        unread: 2,
      },
      {
        seniorId: 5,
        lastMessage: "데이터베이스 수업 자료 공유해드릴게요",
        lastTime: "어제",
        unread: 0,
      },
    ];

    // 통계 계산
    setStats({
      connectedSeniors: Object.keys(seniorData).length, // 연결된 선배 수
      activeChats: recentChats.length, // 진행 중인 대화 수
      completedCredits: profile.completedCredits, // 이수 학점
      totalCredits: profile.totalCredits,
    });
  }, [profile.completedCredits, profile.totalCredits]);

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">마이페이지</h1>

        {/* 활동 통계 */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-white border border-indigo-200 rounded-lg p-3 text-center">
            <div className="text-xl font-semibold text-indigo-700">
              {stats.connectedSeniors}
            </div>
            <div className="text-xs text-gray-600 mt-0.5">연결된 선배</div>
          </div>
          <div className="bg-white border border-indigo-200 rounded-lg p-3 text-center">
            <div className="text-xl font-semibold text-indigo-700">
              {stats.activeChats}
            </div>
            <div className="text-xs text-gray-600 mt-0.5">진행 중인 대화</div>
          </div>
        </div>

        {/* 프로필 카드 */}
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
                <div className="flex gap-2">
                  <button
                    onClick={handleEditToggle}
                    className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all font-medium"
                  >
                    프로필 편집
                  </button>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    로그아웃
                  </button>
                </div>
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
                        handleInputChange("grade", parseInt(e.target.value))
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
                        handleInputChange("semester", parseInt(e.target.value))
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
        </div>

        {/* 수강신청 성향 카드 */}
        <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-gray-900">
              수강신청 성향
            </h2>
            {!isEditingPreference && (
              <button
                onClick={handlePreferenceToggle}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
              >
                편집
              </button>
            )}
          </div>

          {!isEditingPreference ? (
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-0.5">
                    공강 희망 요일
                  </div>
                  <div className="text-sm text-gray-900">
                    {coursePreference.preferredOffDays.length > 0
                      ? coursePreference.preferredOffDays.join(", ")
                      : "없음"}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-0.5">
                    선호 시간대
                  </div>
                  <div className="text-sm text-gray-900">
                    {coursePreference.preferredTimeSlot === "morning" &&
                      "아침형 (09:00-12:00)"}
                    {coursePreference.preferredTimeSlot === "afternoon" &&
                      "오후형 (13:00-16:00)"}
                    {coursePreference.preferredTimeSlot === "evening" &&
                      "저녁형 (17:00-20:00)"}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-0.5">
                    이동 시간 제한
                  </div>
                  <div className="text-sm text-gray-900">
                    {coursePreference.maxTransferMinutes}분
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <svg
                  className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                <div className="flex-1">
                  <div className="text-xs text-gray-500 mb-0.5">우선순위</div>
                  <div className="text-sm text-gray-900">
                    {coursePreference.priorityOrder.join(" > ")}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  공강 희망 요일
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    "월요일",
                    "화요일",
                    "수요일",
                    "목요일",
                    "금요일",
                    "없음",
                  ].map((day) => (
                    <button
                      key={day}
                      onClick={() => toggleOffDay(day)}
                      className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                        coursePreference.preferredOffDays.includes(day)
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-gray-700 border-gray-300 hover:border-indigo-300"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  선호 시간대
                </label>
                <select
                  value={coursePreference.preferredTimeSlot}
                  onChange={(e) =>
                    handlePreferenceChange("preferredTimeSlot", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                >
                  <option value="morning">아침형 (09:00-12:00)</option>
                  <option value="afternoon">오후형 (13:00-16:00)</option>
                  <option value="evening">저녁형 (17:00-20:00)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  이동 시간 제한 (분)
                </label>
                <input
                  type="number"
                  value={coursePreference.maxTransferMinutes}
                  onChange={(e) =>
                    handlePreferenceChange(
                      "maxTransferMinutes",
                      parseInt(e.target.value)
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                  min="0"
                  max="60"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handlePreferenceSave}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all font-medium"
                >
                  저장
                </button>
                <button
                  onClick={handlePreferenceToggle}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  취소
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 메뉴 섹션 */}
        <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
          <div>
            {/* 설정 섹션 */}
            <div className="mb-3">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                설정
              </h3>
              <div
                className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => navigate("/settings/notifications")}
              >
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="text-sm text-gray-900">알림 설정</span>
              </div>
              <div
                className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => navigate("/settings/privacy")}
              >
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span className="text-sm text-gray-900">
                  개인정보 공개 설정
                </span>
              </div>
              <div
                className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => navigate("/settings/language")}
              >
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
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                <span className="text-sm text-gray-900">언어 설정</span>
              </div>
              <div
                className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => navigate("/settings/theme")}
              >
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
                <span className="text-sm text-gray-900">테마 설정</span>
              </div>
            </div>

            {/* 고객 지원 섹션 */}
            <div className="mb-3 pt-2 border-t border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                고객 지원
              </h3>
              <div
                className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => handleMenuClick("/guide")}
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  ></path>
                </svg>
                <span className="text-sm text-gray-900">이용안내</span>
              </div>
              <div
                className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => navigate("/contact")}
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-sm text-gray-900">문의하기</span>
              </div>
            </div>

            {/* 정보 섹션 */}
            <div className="mb-3 pt-2 border-t border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                정보
              </h3>
              <div
                className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => navigate("/terms")}
              >
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <span className="text-sm text-gray-900">이용 약관</span>
              </div>
              <div
                className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => navigate("/privacy-policy")}
              >
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <span className="text-sm text-gray-900">개인정보 처리방침</span>
              </div>
              <div
                className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => navigate("/community-rules")}
              >
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="text-sm text-gray-900">커뮤니티 이용규칙</span>
              </div>
            </div>

            {/* 계정 관리 섹션 */}
            <div className="pt-2 border-t border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
                계정 관리
              </h3>
              <div
                className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-gray-50 rounded-lg transition-colors"
                onClick={() => navigate("/change-password")}
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  ></path>
                </svg>
                <span className="text-sm text-gray-900">비밀번호 변경</span>
              </div>
              <div
                className="flex items-center gap-3 py-2.5 px-2 cursor-pointer hover:bg-red-50 rounded-lg transition-colors"
                onClick={() => navigate("/withdrawal")}
              >
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  ></path>
                </svg>
                <span className="text-sm text-red-600">회원 탈퇴</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
