import { useNavigate } from "react-router-dom";
import "../App.css";

function CommunityRules() {
  const navigate = useNavigate();

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
            커뮤니티 이용규칙
          </h1>
        </div>

        <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
          <div className="prose prose-sm max-w-none">
            <p className="text-sm text-gray-600 mb-4">
              건강한 커뮤니티 문화 조성을 위해 다음의 규칙을 준수해 주시기 바랍니다.
            </p>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              1. 기본 원칙
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
              <li>모든 회원은 서로를 존중하고 배려해야 합니다</li>
              <li>학습과 진로 발전을 위한 건설적인 대화를 나눕니다</li>
              <li>개인정보 보호와 프라이버시를 존중합니다</li>
              <li>정확하고 검증된 정보를 공유합니다</li>
            </ul>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              2. 금지 행위
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              다음과 같은 행위는 엄격히 금지되며, 위반 시 서비스 이용이 제한될 수 있습니다:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
              <li>욕설, 비방, 차별적 발언 등 타인에게 불쾌감을 주는 행위</li>
              <li>허위 정보나 과장된 정보의 유포</li>
              <li>스팸, 광고, 홍보성 게시물</li>
              <li>타인의 개인정보 무단 공개</li>
              <li>저작권을 침해하는 콘텐츠 게시</li>
              <li>불법적인 내용이나 부적절한 콘텐츠 공유</li>
              <li>서비스의 정상적인 운영을 방해하는 행위</li>
            </ul>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              3. 멘토링 매너
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
              <li>약속한 시간과 장소를 지켜주세요</li>
              <li>질문은 구체적이고 명확하게 해주세요</li>
              <li>조언에 대한 감사 인사를 잊지 마세요</li>
              <li>멘토의 시간을 존중하고 배려해주세요</li>
              <li>받은 조언을 실천하고 피드백을 공유해주세요</li>
            </ul>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              4. 게시물 작성 가이드
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
              <li>제목은 내용을 잘 나타내도록 작성해주세요</li>
              <li>적절한 카테고리를 선택해주세요</li>
              <li>읽기 쉽게 문단을 나누어 작성해주세요</li>
              <li>출처가 있는 정보는 출처를 명시해주세요</li>
            </ul>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              5. 신고 및 제재
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              커뮤니티 규칙을 위반하는 게시물이나 회원을 발견한 경우 신고해 주시기 바랍니다.
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
              <li>1차 위반: 경고 및 게시물 삭제</li>
              <li>2차 위반: 7일 이용 정지</li>
              <li>3차 위반: 30일 이용 정지</li>
              <li>중대한 위반: 영구 이용 정지</li>
            </ul>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              6. 문의
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              커뮤니티 이용규칙에 대한 문의사항이나 신고는 '문의하기' 메뉴를 통해
              접수해 주시기 바랍니다.
            </p>

            <p className="text-xs text-gray-500 mt-6">
              최종 수정일: 2025년 11월 16일
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityRules;
