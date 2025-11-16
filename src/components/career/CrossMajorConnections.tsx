import { useCareerStore } from '../../store/careerStore';

// 연계 이중전공별 SVG 아이콘
const CrossMajorIcon = ({ id }: { id: string }) => {
  const iconClass = "w-5 h-5";
  
  switch (id) {
    case 'biz':
      // 경영·경제 - 비즈니스 차트
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M7 16L10 13L13 16L17 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M17 12V18H7V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <circle cx="7" cy="6" r="1.5" fill="currentColor"/>
          <circle cx="17" cy="18" r="1.5" fill="currentColor"/>
        </svg>
      );
    case 'data-science':
      // 통계·데이터사이언스 - 데이터 차트
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="6" y="14" width="3" height="5" rx="1" fill="currentColor"/>
          <rect x="10.5" y="10" width="3" height="9" rx="1" fill="currentColor"/>
          <rect x="15" y="7" width="3" height="12" rx="1" fill="currentColor"/>
          <path d="M3 20H21" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
        </svg>
      );
    case 'ux':
      // 심리·언론정보·디자인 - 사용자/UX
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M6 21C6 17 8.5 14 12 14C15.5 14 18 17 18 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <rect x="2" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
          <rect x="16" y="2" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5"/>
        </svg>
      );
    case 'security-major':
      // 법학·경찰행정학 - 법/저울
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M8 7L12 3L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <path d="M8 17L12 21L16 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="18" cy="12" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M4 12H8M16 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'ai-math':
      // 수학·통계학 - 수학 공식
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 6L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M16 6L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 4V20" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
          <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
        </svg>
      );
    case 'backend-infra':
      // 전기전자공학·산업공학 - 기어/공학
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="12" cy="12" r="2" fill="currentColor"/>
          <path d="M12 6L12 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 22L12 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6 12L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M22 12L18 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M17.66 6.34L20.49 3.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6.34 17.66L3.51 20.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M17.66 17.66L20.49 20.49" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M6.34 6.34L3.51 3.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    default:
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
        </svg>
      );
  }
};

const plannerTips = [
  {
    title: '1~2학년 초',
    description:
      '정보대 전필과 복수전공 입문 과목을 미리 깔고, 미적분·선형대수·확률통계 같은 기초를 선이수하면 이후 학기 부담이 줄어요.'
  },
  {
    title: '2학년 후반~3학년',
    description:
      '두 전공의 심화/전선 과목을 섞되, 한 학기에 초고난도 과목 3개 이상은 피하면서 난이도를 분산하세요.'
  },
  {
    title: '3~4학년',
    description:
      '두 전공을 엮은 프로젝트·캡스톤을 최소 한 번은 진행하면 포트폴리오/자소서에 강력한 사례가 생깁니다.'
  },
  {
    title: '학사 요건 체크',
    description:
      '전필·전선 최소 학점, 캡스톤 필수 여부, 공통교양 등 학과별 졸업요건을 확인해 추가 학기 리스크를 줄이세요.'
  }
];

function CrossMajorConnections() {
  const { getCrossMajors } = useCareerStore();
  const crossMajors = getCrossMajors();

  if (!crossMajors.length) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-base font-semibold text-gray-900">연계 이중전공 TOP 3</h2>
          <p className="text-xs text-gray-500 mt-0.5">정보대 기준 인기 조합 & 수업 패턴</p>
        </div>
        <span className="text-xs text-indigo-600 font-medium">진로 확장 가이드</span>
      </div>

      <div className="space-y-3">
        {crossMajors.map((option) => (
          <div key={option.id} className="border border-gray-100 rounded-lg p-3">
            <div className="flex items-start justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <div className="text-indigo-600 dark:text-indigo-400">
                  <CrossMajorIcon id={option.id} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">
                    {option.rank}순위 · {option.title}
                  </div>
                <div className="text-[11px] text-gray-500 mt-0.5">
                  전공: {option.majors.join(' · ')}
                </div>
              </div>
              <div className="flex flex-wrap gap-1 justify-end">
                {option.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[11px] border border-indigo-100"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-700 leading-relaxed mb-2">{option.reason}</p>

            <div className="space-y-1.5 mb-2">
              {option.schedulePatterns.map((pattern) => (
                <div key={`${option.id}-${pattern.phase}`}>
                  <div className="text-[11px] font-semibold text-gray-700">{pattern.phase}</div>
                  <ul className="list-disc list-inside text-[11px] text-gray-600 leading-relaxed">
                    {pattern.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {option.comboExamples.map((combo) => (
                <span
                  key={combo}
                  className="px-2 py-0.5 bg-gray-50 text-gray-700 rounded text-[11px] border border-gray-200"
                >
                  {combo}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="text-xs font-semibold text-gray-800 mb-2">시간표 설계 공통 팁</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {plannerTips.map((tip) => (
            <div key={tip.title} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
              <div className="text-[11px] font-semibold text-gray-700 mb-0.5">{tip.title}</div>
              <p className="text-[11px] text-gray-600 leading-relaxed">{tip.description}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-gray-500 mt-2">
          관심 전공·진로를 알려주면 한 학기짜리 맞춤 시간표 예시도 만들어 줄 수 있어요!
        </p>
      </div>
    </div>
  );
}

export default CrossMajorConnections;


