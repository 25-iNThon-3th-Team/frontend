import { useCareerStore } from '../../store/careerStore';

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
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {option.emoji} {option.rank}순위 · {option.title}
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


