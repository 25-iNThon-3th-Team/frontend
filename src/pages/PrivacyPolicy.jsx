import { useNavigate } from "react-router-dom";
import "../App.css";

function PrivacyPolicy() {
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
            개인정보 처리방침
          </h1>
        </div>

        <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-base font-semibold text-gray-800 mb-3">
              1. 개인정보의 수집 및 이용목적
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              회사는 다음의 목적을 위하여 개인정보를 처리합니다:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
              <li>회원 가입 및 관리: 회원 가입의사 확인, 회원제 서비스 제공</li>
              <li>서비스 제공: 멘토링 매칭, 시간표 생성, 학습 상담 서비스 제공</li>
              <li>마케팅 및 광고 활용: 이벤트 및 광고성 정보 제공</li>
            </ul>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              2. 수집하는 개인정보의 항목
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              회사는 서비스 제공을 위해 다음의 개인정보를 수집합니다:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
              <li>필수항목: 이름, 이메일, 학번, 학과, 비밀번호</li>
              <li>선택항목: 학년, 학기, 이수 학점, 관심 분야</li>
              <li>자동 수집 정보: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
            </ul>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              3. 개인정보의 보유 및 이용기간
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를
              수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
              회원 탈퇴 시 즉시 파기하며, 관계 법령에 따라 보존할 필요가 있는 경우
              일정기간 보관 후 파기합니다.
            </p>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              4. 개인정보의 제3자 제공
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
              다만, 다음의 경우에는 예외로 합니다:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
              <li>이용자가 사전에 동의한 경우</li>
              <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
            </ul>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              5. 개인정보의 파기
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게
              되었을 때에는 지체없이 해당 개인정보를 파기합니다. 전자적 파일 형태인
              경우 복구 및 재생되지 않도록 안전하게 삭제하며, 그 밖에 기록물, 인쇄물,
              서면 등의 경우 분쇄하거나 소각하여 파기합니다.
            </p>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              6. 정보주체의 권리·의무 및 행사방법
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를
              행사할 수 있습니다:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
              <li>개인정보 열람 요구</li>
              <li>오류 등이 있을 경우 정정 요구</li>
              <li>삭제 요구</li>
              <li>처리정지 요구</li>
            </ul>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              7. 개인정보 보호책임자
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와
              관련한 정보주체의 불만처리 및 피해구제를 위하여 아래와 같이 개인정보
              보호책임자를 지정하고 있습니다.
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

export default PrivacyPolicy;
