import { useCareerStore } from '../../store/careerStore';
import {useEffect, useState} from "react";
import {Course} from "../../types/career.ts";
import axios from "../../api/axios";

function Dashboard() {
  // const { completedCourses, getTotalCredits } = useCareerStore();

    const [completedCourses, setCompletedCourses] = useState<Course[]>([]);

    const getTotalCredits = () => {
        return completedCourses
            .map((course) => course.credits)
            .reduce((prev, next) => prev + next, 0);
    }
  const totalCredits = getTotalCredits();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("/api/jinro/courses");
            setCompletedCourses(response.data);
            console.log(response.data);
        }
        fetchData()
    }, []);

  const courseBreakdown = {
    전필: completedCourses.filter(c => c.creditType === 'MAJOR_REQUIRED').length,
    전선: completedCourses.filter(c => c.creditType === 'MAJOR_ELECTIVE').length,
    교양: completedCourses.filter(c => c.creditType === '교양').length,
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3 border border-gray-100 dark:border-gray-700">
      <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">학업 현황</h2>
      
      <div className="space-y-3">
        {/* Total Credits */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:!from-gray-800 dark:!to-gray-700 rounded-lg p-3.5 border border-indigo-200 dark:border-gray-600">
          <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-0.5">총 이수학점 / 졸업 요구 학점</div>
          <div className="text-2xl font-semibold text-blue-400">{getTotalCredits()} <span className="text-base text-indigo-500 dark:text-indigo-400">/</span> 130<span className="text-base text-indigo-600 dark:text-indigo-400 ml-1">학점</span></div>

        </div>

        {/* Course Breakdown */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white dark:bg-gray-800 border border-indigo-200 dark:border-gray-700 rounded-lg p-2.5 text-center">
            <div className="text-xl font-semibold text-blue-400">{courseBreakdown.전필}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">전필</div>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-indigo-200 dark:border-gray-700 rounded-lg p-2.5 text-center">
            <div className="text-xl font-semibold text-blue-400">{courseBreakdown.전선}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">전선</div>
          </div>
          <div className="bg-white dark:bg-gray-800 border border-indigo-200 dark:border-gray-700 rounded-lg p-2.5 text-center">
            <div className="text-xl font-semibold text-blue-400">{courseBreakdown.교양}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">교양</div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;

