import { useCareerStore } from '../../store/careerStore';
import {useEffect, useState, useMemo} from "react";
import {Course} from "../../types/career.ts";
import { scheduleApi, ApiTimetable } from "../../api/scheduleApi";

function Dashboard() {
  const [timetables, setTimetables] = useState<ApiTimetable[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // 선택된 카테고리 ('MAJOR_REQUIRED', 'MAJOR_ELECTIVE', 'LIBERAL')
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const allTimetables = await scheduleApi.getMyTimetables();
        setTimetables(allTimetables);
      } catch (error) {
        console.error('Failed to fetch timetables:', error);
        setTimetables([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // isActive가 true인 timetables만 필터링
  const activeTimetables = useMemo(() => {
    return timetables.filter(t => t.isActive === true);
  }, [timetables]);

  // isActive가 true인 timetables의 모든 courses를 합쳐서 계산
  // 같은 courseCode를 가진 과목이 여러 timetables에 있어도 모두 포함 (중복 제거 안 함)
  const completedCourses = useMemo(() => {
    const allCourses: Course[] = [];
    activeTimetables.forEach(timetable => {
      timetable.classes?.forEach(classItem => {
        const course = classItem.course;
        // 모든 과목을 추가 (중복 제거하지 않음 - 같은 과목이 여러 학기에 있을 수 있음)
        allCourses.push({
          id: `${timetable.id}-${classItem.id}`,
          courseCode: course.courseCode || '',
          name: course.name || '',
          major: null,
          creditType: course.creditType || 'MAJOR_ELECTIVE',
          credits: course.credits || 0,
          competitionRate: 0,
          easinessScore: 0
        });
      });
    });
    
    // 디버깅: creditType별 개수 확인
    const creditTypeCounts = {
      MAJOR_REQUIRED: allCourses.filter(c => c.creditType === 'MAJOR_REQUIRED').length,
      MAJOR_ELECTIVE: allCourses.filter(c => c.creditType === 'MAJOR_ELECTIVE').length,
      LIBERAL: allCourses.filter(c => c.creditType === 'LIBERAL').length,
    };
    console.log('Active timetables:', activeTimetables.length);
    console.log('Total courses:', allCourses.length);
    console.log('Credit type counts:', creditTypeCounts);
    console.log('Courses by creditType:', {
      MAJOR_REQUIRED: allCourses.filter(c => c.creditType === 'MAJOR_REQUIRED'),
      MAJOR_ELECTIVE: allCourses.filter(c => c.creditType === 'MAJOR_ELECTIVE'),
      LIBERAL: allCourses.filter(c => c.creditType === 'LIBERAL'),
    });
    
    return allCourses;
  }, [activeTimetables]);

  const getTotalCredits = () => {
    return completedCourses
      .map((course) => course.credits)
      .reduce((prev, next) => prev + next, 0);
  };

  const totalCredits = getTotalCredits();

  const courseBreakdown = useMemo(() => {
    const majorRequired = completedCourses.filter(c => c.creditType === 'MAJOR_REQUIRED');
    const majorElective = completedCourses.filter(c => c.creditType === 'MAJOR_ELECTIVE');
    const liberal = completedCourses.filter(c => c.creditType === 'LIBERAL');
    
    return {
      전필: majorRequired.reduce((sum, c) => sum + c.credits, 0),
      전선: majorElective.reduce((sum, c) => sum + c.credits, 0),
      교양: liberal.reduce((sum, c) => sum + c.credits, 0),
    };
  }, [completedCourses]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3 border border-gray-100 dark:border-gray-700">
      <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">학업 현황</h2>
      
      <div className="space-y-3">
        {/* Total Credits */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:!from-gray-800 dark:!to-gray-700 rounded-lg p-3.5 border border-indigo-200 dark:border-gray-600">
          <div className="text-xs text-indigo-600 dark:text-indigo-400 mb-0.5">총 이수학점 / 졸업 요구 학점</div>
          <div className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">{getTotalCredits()} <span className="text-base text-indigo-500 dark:text-indigo-400">/</span> 130<span className="text-base text-indigo-600 dark:text-indigo-400 ml-1">학점</span></div>

        </div>

        {/* Course Breakdown */}
        <div className="grid grid-cols-3 gap-2">
          <div 
            className="bg-white dark:bg-gray-800 border border-indigo-200 dark:border-gray-700 rounded-lg p-2.5 text-center cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => {
              setSelectedCategory('MAJOR_REQUIRED');
              setIsCategoryModalOpen(true);
            }}
          >
            <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">{courseBreakdown.전필}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">전필</div>
          </div>
          <div 
            className="bg-white dark:bg-gray-800 border border-indigo-200 dark:border-gray-700 rounded-lg p-2.5 text-center cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => {
              setSelectedCategory('MAJOR_ELECTIVE');
              setIsCategoryModalOpen(true);
            }}
          >
            <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">{courseBreakdown.전선}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">전선</div>
          </div>
          <div 
            className="bg-white dark:bg-gray-800 border border-indigo-200 dark:border-gray-700 rounded-lg p-2.5 text-center cursor-pointer hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
            onClick={() => {
              setSelectedCategory('LIBERAL');
              setIsCategoryModalOpen(true);
            }}
          >
            <div className="text-xl font-semibold text-indigo-600 dark:text-indigo-400">{courseBreakdown.교양}</div>
            <div className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">교양</div>
          </div>
        </div>

      </div>

      {/* Category Modal */}
      {isCategoryModalOpen && selectedCategory && (
        <div 
          className="course-modal-overlay" 
          onClick={() => {
            setIsCategoryModalOpen(false);
            setSelectedCategory(null);
          }}
        >
          <div className="course-modal" onClick={(e) => e.stopPropagation()}>
            <div className="course-modal-header">
              <h3>
                {selectedCategory === 'MAJOR_REQUIRED' ? '전공필수' : selectedCategory === 'MAJOR_ELECTIVE' ? '전공선택' : '교양'} 과목
              </h3>
              <button 
                className="course-modal-close" 
                onClick={() => {
                  setIsCategoryModalOpen(false);
                  setSelectedCategory(null);
                }}
              >
                ✕
              </button>
            </div>
            <div className="course-modal-content" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
              {(() => {
                const filteredCourses = completedCourses.filter((course) => course.creditType === selectedCategory);
                return filteredCourses.length === 0 ? (
                  <p style={{ textAlign: 'center', color: '#64748b', padding: '20px' }}>
                    해당 카테고리의 과목이 없습니다.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {filteredCourses.map((course) => (
                      <div
                        key={course.id}
                        style={{
                          padding: '16px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          backgroundColor: '#f7fafc',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#edf2f7';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f7fafc';
                        }}
                      >
                        <div style={{ fontWeight: 600, marginBottom: '4px', fontSize: '1rem' }}>
                          {course.name}
                        </div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '4px' }}>
                          {course.courseCode} · {course.credits}학점
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

