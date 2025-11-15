import { useCareerStore } from '../../store/careerStore';
import { Track } from '../../types/career';

function CareerRecommendation() {
  const { tracks, selectedTrack, selectTrack, getRecommendedTracks, getCrossMajorsForTrack } = useCareerStore();
  const recommendedTracks = getRecommendedTracks();
  const relatedCrossMajors = selectedTrack ? getCrossMajorsForTrack(selectedTrack.trackId) : [];

  const handleTrackClick = (track: Track) => {
    selectTrack(track);
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
      <h2 className="text-base font-semibold text-gray-900 mb-3">추천 진로</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {recommendedTracks.map((track) => (
          <button
            key={track.trackId}
            onClick={() => handleTrackClick(track)}
            className={`p-3 rounded-lg border transition-all text-left ${
              selectedTrack?.trackId === track.trackId
                ? 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-blue-50'
                : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-indigo-50'
            }`}
          >
            <div className="text-sm font-semibold text-gray-900 mb-1">{track.name}</div>
            <div className="text-xs text-gray-600 mb-2.5 line-clamp-2 leading-relaxed">{track.description}</div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">진도</div>
              <div className="flex items-center gap-1.5">
                <div className="w-14 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-600 to-blue-600 rounded-full"
                    style={{ width: `${track.fitScore || 0}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-indigo-700 min-w-[30px] text-right">{track.fitScore || 0}%</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedTrack && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="font-semibold text-sm text-gray-900 mb-2">{selectedTrack.name}</div>
          <div className="text-xs text-gray-600 mb-3 leading-relaxed">{selectedTrack.description}</div>
          
          <div className="space-y-2.5">
            <div>
              <div className="text-xs font-medium text-gray-700 mb-1.5">필수 과목</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedTrack.requiredCourses.map((courseId) => (
                  <span key={courseId} className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded text-xs border border-indigo-200">
                    {courseId}
                  </span>
                ))}
              </div>
            </div>
            
            {selectedTrack.optionalCourses.length > 0 && (
              <div>
                <div className="text-xs font-medium text-gray-700 mb-1.5">선택 과목</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTrack.optionalCourses.map((courseId) => (
                    <span key={courseId} className="px-2 py-0.5 bg-white text-indigo-700 rounded text-xs border border-indigo-300">
                      {courseId}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedTrack.workFocus && (
              <div>
                <div className="text-xs font-medium text-gray-700 mb-1.5">어떤 일을 하나요?</div>
                <p className="text-xs text-gray-600 leading-relaxed">{selectedTrack.workFocus}</p>
              </div>
            )}

            {selectedTrack.aptitudeTraits && selectedTrack.aptitudeTraits.length > 0 && (
              <div>
                <div className="text-xs font-medium text-gray-700 mb-1.5">적성 & 특징</div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTrack.aptitudeTraits.map((trait) => (
                    <span
                      key={trait}
                      className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs border border-gray-200"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {relatedCrossMajors.length > 0 && (
              <div>
                <div className="text-xs font-medium text-gray-700 mb-1.5">연계 이중전공</div>
                <div className="flex flex-col gap-1.5">
                  {relatedCrossMajors.map((option) => (
                    <div key={option.id} className="p-2 bg-gray-50 rounded border border-gray-100">
                      <div className="text-[11px] font-semibold text-gray-800">
                        {option.emoji} {option.title}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {option.keywords.slice(0, 3).map((keyword) => (
                          <span
                            key={`${option.id}-${keyword}`}
                            className="px-1.5 py-0.5 bg-white text-gray-700 rounded text-[10px] border border-gray-200"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <div className="text-[11px] text-gray-600 mt-1">
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

