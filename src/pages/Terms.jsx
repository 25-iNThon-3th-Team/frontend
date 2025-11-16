import { useNavigate } from "react-router-dom";
import "../App.css";

function Terms() {
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
            이용 약관
          </h1>
        </div>

        <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
          <div className="prose prose-sm max-w-none">
            <h2 className="text-base font-semibold text-gray-800 mb-3">
              제1조 (목적)
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              본 약관은 학생 멘토링 서비스(이하 "서비스")의 이용과 관련하여
              회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              제2조 (정의)
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              본 약관에서 사용하는 용어의 정의는 다음과 같습니다:
            </p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
              <li>"서비스"라 함은 회원이 이용할 수 있는 멘토링, 시간표 관리 등의 서비스를 의미합니다.</li>
              <li>"회원"이라 함은 서비스에 접속하여 본 약관에 따라 서비스를 이용하는 이용자를 말합니다.</li>
              <li>"멘토"라 함은 후배 회원에게 조언과 정보를 제공하는 선배 회원을 말합니다.</li>
            </ul>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              제3조 (약관의 효력 및 변경)
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              본 약관은 서비스를 이용하고자 하는 모든 회원에 대하여 그 효력을
              발생합니다. 회사는 합리적인 사유가 발생할 경우 본 약관을 변경할
              수 있으며, 약관을 변경할 경우 적용일자 및 변경사유를 명시하여
              서비스 내에 공지합니다.
            </p>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              제4조 (회원가입)
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              회원가입은 이용자가 약관의 내용에 대하여 동의를 하고 회원가입
              신청을 한 후 회사가 이러한 신청에 대하여 승낙함으로써 체결됩니다.
            </p>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              제5조 (서비스의 제공 및 변경)
            </h2>
            <p className="text-sm text-gray-600 mb-2">회사는 다음과 같은 서비스를 제공합니다:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
              <li>선배-후배 멘토링 매칭 서비스</li>
              <li>개인 맞춤형 시간표 생성 및 관리</li>
              <li>학습 및 진로 상담 서비스</li>
              <li>기타 회사가 정하는 서비스</li>
            </ul>

            <h2 className="text-base font-semibold text-gray-800 mb-3">
              제6조 (회원의 의무)
            </h2>
            <p className="text-sm text-gray-600 mb-2">회원은 다음 행위를 하여서는 안됩니다:</p>
            <ul className="list-disc list-inside text-sm text-gray-600 mb-4 space-y-1">
              <li>신청 또는 변경 시 허위내용의 등록</li>
              <li>타인의 정보 도용</li>
              <li>회사가 게시한 정보의 변경</li>
              <li>회사가 정한 정보 이외의 정보 등의 송신 또는 게시</li>
              <li>회사 및 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
            </ul>

            <p className="text-xs text-gray-500 mt-6">
              최종 수정일: 2025년 11월 16일
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Terms;
