import { useCareerStore } from '../../store/careerStore';

function Dashboard() {
  const { completedCourses, getTotalCredits } = useCareerStore();
  
  const totalCredits = getTotalCredits();
  const courseBreakdown = {
    전필: completedCourses.filter(c => c.type === '전필').length,
    전선: completedCourses.filter(c => c.type === '전선').length,
    교양: completedCourses.filter(c => c.type === '교양').length,
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 mb-4">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">📊 학업 현황 요약</h2>
      
      <div className="space-y-4">
        {/* Total Credits */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
          <div className="text-sm text-gray-600 mb-1">총 이수 학점</div>
          <div className="text-3xl font-bold text-purple-700">{totalCredits}학점</div>
        </div>

        {/* Course Breakdown */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-blue-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-blue-700">{courseBreakdown.전필}</div>
            <div className="text-xs text-gray-600 mt-1">전필</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-green-700">{courseBreakdown.전선}</div>
            <div className="text-xs text-gray-600 mt-1">전선</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3 text-center">
            <div className="text-2xl font-bold text-yellow-700">{courseBreakdown.교양}</div>
            <div className="text-xs text-gray-600 mt-1">교양</div>
          </div>
        </div>

        {/* Completed Courses List */}
        <div className="mt-4">
          <div className="text-sm font-semibold text-gray-700 mb-2">이수한 과목</div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {completedCourses.length === 0 ? (
              <div className="text-sm text-gray-500 text-center py-2">이수한 과목이 없습니다</div>
            ) : (
              completedCourses.map((course) => (
                <div key={course.courseId} className="flex justify-between items-center bg-gray-50 rounded-lg p-2 text-sm">
                  <div>
                    <span className="font-medium text-gray-800">{course.courseName}</span>
                    <span className="text-gray-500 ml-2 text-xs">({course.type})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{course.grade}</span>
                    <span className="text-gray-400 text-xs">{course.credits}학점</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

