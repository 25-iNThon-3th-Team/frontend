import { useCareerStore } from '../../store/careerStore';
import { Track } from '../../types/career';

// 연계 이중전공별 SVG 아이콘 컴포넌트
const CrossMajorIcon = ({ id }: { id: string }) => {
  const iconClass = "w-4 h-4";
  
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

// Track별 SVG 아이콘 컴포넌트
const TrackIcon = ({ trackId }: { trackId: string }) => {
  const iconClass = "w-8 h-8";
  
  switch (trackId) {
    case 'ai':
      // AI/ML - 로봇/인공지능 아이콘
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="4" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="9" cy="9" r="1.5" fill="currentColor"/>
          <circle cx="15" cy="9" r="1.5" fill="currentColor"/>
          <path d="M9 13H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <rect x="8" y="17" width="8" height="3" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M10 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M14 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 18V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    case 'data':
      // Data Science - 막대 그래프 아이콘
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="6" y="14" width="3" height="5" rx="1" fill="currentColor"/>
          <rect x="10.5" y="10" width="3" height="9" rx="1" fill="currentColor"/>
          <rect x="15" y="7" width="3" height="12" rx="1" fill="currentColor"/>
          <path d="M3 20H21" stroke="currentColor" strokeWidth="1.5" opacity="0.3"/>
        </svg>
      );
    case 'backend':
      // Backend - 서버 스택 아이콘
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="3" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="4" y="10" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
          <rect x="4" y="17" width="16" height="4" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="7" cy="5" r="0.8" fill="currentColor"/>
          <circle cx="9.5" cy="5" r="0.8" fill="currentColor"/>
          <circle cx="7" cy="12" r="0.8" fill="currentColor"/>
          <circle cx="9.5" cy="12" r="0.8" fill="currentColor"/>
          <circle cx="7" cy="19" r="0.8" fill="currentColor"/>
          <circle cx="9.5" cy="19" r="0.8" fill="currentColor"/>
          <path d="M14 5H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M14 19H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case 'security':
      // Security - 자물쇠 아이콘
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M7 11V7C7 4.8 8.8 3 11 3H13C15.2 3 17 4.8 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <circle cx="12" cy="16" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 14V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    default:
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
  }
};

function CareerRecommendation() {
  const { tracks, selectedTrack, selectTrack, getRecommendedTracks, getCrossMajorsForTrack } = useCareerStore();
  const recommendedTracks = getRecommendedTracks();
  const relatedCrossMajors = selectedTrack ? getCrossMajorsForTrack(selectedTrack.trackId) : [];

  const handleTrackClick = (track: Track) => {
    selectTrack(track);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3 border border-gray-100 dark:border-gray-700">
      <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">추천 진로</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {recommendedTracks.map((track) => (
          <button
            key={track.trackId}
            onClick={() => handleTrackClick(track)}
            className={`p-3 rounded-lg border transition-all text-left ${
              selectedTrack?.trackId === track.trackId
                ? 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-blue-50 dark:!from-gray-800 dark:!to-gray-700 dark:border-gray-600'
                : 'border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700 hover:border-indigo-300 hover:bg-indigo-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-start gap-2.5">
              <div className="flex-shrink-0 mt-0.5 text-indigo-600 dark:text-indigo-400">
                <TrackIcon trackId={track.trackId} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{track.name}</div>
                <div className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">{track.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedTrack && (
        <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="font-semibold text-sm text-gray-900 dark:text-gray-100 mb-2">{selectedTrack.name}</div>
          <div className="text-xs text-gray-600 dark:text-gray-300 mb-3 leading-relaxed">{selectedTrack.description}</div>
          
          <div className="space-y-2.5">
            <div>
              <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">필수 과목</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedTrack.requiredCourses.map((courseId) => (
                  <span key={courseId} className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 rounded text-xs border border-indigo-200 dark:border-indigo-700">
                    {courseId}
                  </span>
                ))}
              </div>
            </div>
            
            {selectedTrack.optionalCourses.length > 0 && (
              <div>
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">선택 과목</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTrack.optionalCourses.map((courseId) => (
                    <span key={courseId} className="px-2 py-0.5 bg-white dark:bg-gray-700 text-indigo-700 dark:text-indigo-300 rounded text-xs border border-indigo-300 dark:border-gray-600">
                      {courseId}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedTrack.workFocus && (
              <div>
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">어떤 일을 하나요?</div>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{selectedTrack.workFocus}</p>
              </div>
            )}

            {selectedTrack.aptitudeTraits && selectedTrack.aptitudeTraits.length > 0 && (
              <div>
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">적성 & 특징</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTrack.aptitudeTraits.map((trait) => (
                    <span
                      key={trait}
                      className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs border border-gray-200 dark:border-gray-600"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {relatedCrossMajors.length > 0 && (
              <div>
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">연계 이중전공</div>
                <div className="flex flex-col gap-1.5">
                  {relatedCrossMajors.map((option) => (
                    <div key={option.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded border border-gray-100 dark:border-gray-600">
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-800 dark:text-gray-200">
                        <div className="text-indigo-600 dark:text-indigo-400">
                          <CrossMajorIcon id={option.id} />
                        </div>
                        <span>{option.title}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {option.keywords.slice(0, 3).map((keyword) => (
                          <span
                            key={`${option.id}-${keyword}`}
                            className="px-1.5 py-0.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-[10px] border border-gray-200 dark:border-gray-600"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <div className="text-[11px] text-gray-600 dark:text-gray-300 mt-1">
                        조합 예시: {option.comboExamples.join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CareerRecommendation;

