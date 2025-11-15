import { useNavigate } from "react-router-dom";

const SettingsMenu = () => {
  const navigate = useNavigate();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  return (
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
  );
};

export default SettingsMenu;
