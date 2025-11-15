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
    <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
      <h2 className="text-base font-semibold text-gray-900 mb-3">학업 현황</h2>
      
      <div className="space-y-3">
        {/* Total Credits */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-3.5 border border-indigo-200">
          <div className="text-xs text-indigo-600 mb-0.5">총 이수학점 / 졸업 요구 학점</div>
          <div className="text-2xl font-semibold text-indigo-700">34 <span className="text-base text-indigo-500">/</span> 130<span className="text-base text-indigo-600 ml-1">학점</span></div>
        </div>

        {/* Course Breakdown */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white border border-indigo-200 rounded-lg p-2.5 text-center">
            <div className="text-xl font-semibold text-indigo-700">{courseBreakdown.전필}</div>
            <div className="text-xs text-gray-600 mt-0.5">전필</div>
          </div>
          <div className="bg-white border border-indigo-200 rounded-lg p-2.5 text-center">
            <div className="text-xl font-semibold text-indigo-700">{courseBreakdown.전선}</div>
            <div className="text-xs text-gray-600 mt-0.5">전선</div>
          </div>
          <div className="bg-white border border-indigo-200 rounded-lg p-2.5 text-center">
            <div className="text-xl font-semibold text-indigo-700">{courseBreakdown.교양}</div>
            <div className="text-xs text-gray-600 mt-0.5">교양</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;

