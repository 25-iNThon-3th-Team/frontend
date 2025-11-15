import { useCareerStore } from '../../store/careerStore';
import { Track } from '../../types/career';

function CareerRecommendation() {
  const { tracks, selectedTrack, selectTrack, getRecommendedTracks } = useCareerStore();
  const recommendedTracks = getRecommendedTracks();

  const handleTrackClick = (track: Track) => {
    selectTrack(track);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 mb-4">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">🎯 추천 진로 방향</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {recommendedTracks.map((track) => (
          <button
            key={track.trackId}
            onClick={() => handleTrackClick(track)}
            className={`p-4 rounded-xl border-2 transition-all ${
              selectedTrack?.trackId === track.trackId
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-50'
            }`}
          >
            <div className="text-lg font-bold text-gray-800 mb-1">{track.name}</div>
            <div className="text-xs text-gray-600 mb-2 line-clamp-2">{track.description}</div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">적합도</div>
              <div className="flex items-center gap-1">
                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    style={{ width: `${track.fitScore || 0}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-purple-700">{track.fitScore || 0}%</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedTrack && (
        <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
          <div className="font-semibold text-gray-800 mb-2">{selectedTrack.name} 트랙</div>
          <div className="text-sm text-gray-700 mb-3">{selectedTrack.description}</div>
          
          <div className="space-y-2">
            <div>
              <div className="text-xs font-semibold text-gray-600 mb-1">필수 과목</div>
              <div className="flex flex-wrap gap-1">
                {selectedTrack.requiredCourses.map((courseId) => (
                  <span key={courseId} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                    {courseId}
                  </span>
                ))}
              </div>
            </div>
            
            {selectedTrack.optionalCourses.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-gray-600 mb-1">선택 과목</div>
                <div className="flex flex-wrap gap-1">
                  {selectedTrack.optionalCourses.map((courseId) => (
                    <span key={courseId} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                      {courseId}
                    </span>
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

