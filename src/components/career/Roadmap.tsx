import { useEffect, useState } from 'react';
import { useCareerStore } from '../../store/careerStore';
import { Course } from '../../types/career';
import CourseModal from './CourseModal';

function Roadmap() {
  const { selectedTrack, allCourses, getCompletedCourseIds } = useCareerStore();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [semesterGroups, setSemesterGroups] = useState<{ [key: string]: Course[] }>({});
  const [expandedSemesters, setExpandedSemesters] = useState<Set<number>>(new Set([1])); // 기본적으로 1학기만 펼침

  const completedCourseIds = getCompletedCourseIds();

  useEffect(() => {
    if (allCourses.length === 0) {
      setSemesterGroups({});
      return;
    }

    // Get all courses for full 8-semester roadmap (regardless of track selection)
    // Group all courses by semester (1-8)
    const groups: { [key: string]: Course[] } = {};
    
    // Initialize all 8 semesters
    for (let i = 1; i <= 8; i++) {
      groups[`${i}학기`] = [];
    }

    // Group courses by their semester field
    allCourses.forEach(course => {
      if (course.semester && course.semester >= 1 && course.semester <= 8) {
        const semesterKey = `${course.semester}학기`;
        if (!groups[semesterKey]) {
          groups[semesterKey] = [];
        }
        groups[semesterKey].push(course);
      }
    });

    // Sort courses within each semester by courseId
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => a.courseId.localeCompare(b.courseId));
    });

    setSemesterGroups(groups);
  }, [allCourses, completedCourseIds]);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleAddToSchedule = (courseId: string) => {
    // TODO: Implement add to schedule functionality
    console.log('Add to schedule:', courseId);
  };

  const toggleSemester = (semesterNum: number) => {
    setExpandedSemesters(prev => {
      const newSet = new Set(prev);
      if (newSet.has(semesterNum)) {
        newSet.delete(semesterNum);
      } else {
        newSet.add(semesterNum);
      }
      return newSet;
    });
  };


  return (
    <>
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-200 mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">🗺️ 학습 로드맵</h2>
        
        <div className="space-y-3">
          {Object.keys(semesterGroups).length === 0 ? (
            <div className="text-center py-8 text-gray-500">과목 정보를 불러오는 중...</div>
          ) : (
            // Show all 8 semesters in order
            Array.from({ length: 8 }, (_, i) => i + 1).map(semesterNum => {
              const semester = `${semesterNum}학기`;
              const courses = semesterGroups[semester] || [];
              
              const isExpanded = expandedSemesters.has(semesterNum);
              const completedCount = courses.filter(c => completedCourseIds.includes(c.courseId)).length;
              
              return (
              <div key={semester} className="border border-gray-200 rounded-xl overflow-hidden">
                {/* Semester Header - Toggle Button */}
                <button
                  onClick={() => toggleSemester(semesterNum)}
                  className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {semesterNum}
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-gray-800 text-base sm:text-lg">{semester}</h3>
                      <div className="text-xs text-gray-600 mt-0.5">
                        {courses.length > 0 ? `${courses.length}개 과목` : '과목 없음'} {completedCount > 0 && `• ${completedCount}개 이수 완료`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className={`w-5 h-5 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Courses in this semester - Collapsible */}
                {isExpanded && (
                <div className="p-4 space-y-3 bg-white">
                  {courses.map((course, index) => {
                    const isCompleted = completedCourseIds.includes(course.courseId);
                    const hasPrerequisites = course.prerequisites.length > 0;
                    const completedPrereqs = course.prerequisites.filter(id => 
                      completedCourseIds.includes(id)
                    );

                    return (
                      <div key={course.courseId} className="relative">
                        {/* Prerequisite Arrow */}
                        {hasPrerequisites && index > 0 && (
                          <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-purple-300"></div>
                        )}

                        {/* Course Card */}
                        <button
                          onClick={() => handleCourseClick(course)}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all active:scale-[0.98] ${
                            isCompleted
                              ? 'bg-green-50 border-green-400'
                              : completedPrereqs.length === course.prerequisites.length
                              ? 'bg-white border-purple-300 hover:border-purple-400'
                              : 'bg-gray-50 border-gray-300 opacity-60'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="font-semibold text-sm sm:text-base text-gray-800 mb-1">
                                {course.name}
                              </div>
                              <div className="text-xs text-gray-600">{course.courseId}</div>
                            </div>
                            {isCompleted && (
                              <div className="ml-2 text-green-600">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Course Info */}
                          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-2">
                            <span>{course.credits}학점</span>
                            <span>•</span>
                            <span>{course.professor}</span>
                            <span>•</span>
                            <span className={`px-2 py-0.5 rounded ${
                              course.type === '전필' ? 'bg-blue-100 text-blue-700' :
                              course.type === '전선' ? 'bg-green-100 text-green-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {course.type}
                            </span>
                          </div>

                          {/* Difficulty & Workload */}
                          <div className="flex items-center gap-4 mb-2">
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">난이도:</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${
                                      i < course.difficulty ? 'bg-red-400' : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">작업량:</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${
                                      i < course.workload ? 'bg-blue-400' : 'bg-gray-200'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Prerequisites */}
                          {hasPrerequisites && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <div className="text-xs text-gray-500 mb-1">선수과목:</div>
                              <div className="flex flex-wrap gap-1">
                                {course.prerequisites.map((prereqId) => {
                                  const isPrereqCompleted = completedCourseIds.includes(prereqId);
                                  return (
                                    <span
                                      key={prereqId}
                                      className={`px-2 py-0.5 rounded text-xs ${
                                        isPrereqCompleted
                                          ? 'bg-green-100 text-green-700'
                                          : 'bg-gray-100 text-gray-600'
                                      }`}
                                    >
                                      {prereqId}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Tap hint */}
                          <div className="mt-2 text-xs text-gray-400">
                            탭하여 상세 정보 보기 →
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
                )}
              </div>
            );
            }).filter(Boolean)
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-50 border-2 border-green-400 rounded-lg"></div>
              <span>이수 완료</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border-2 border-purple-300 rounded-lg"></div>
              <span>수강 가능</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-50 border-2 border-gray-300 rounded-lg opacity-60"></div>
              <span>선수과목 필요</span>
            </div>
          </div>
        </div>
      </div>

      {/* Course Modal */}
      <CourseModal
        course={selectedCourse}
        isCompleted={selectedCourse ? completedCourseIds.includes(selectedCourse.courseId) : false}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToSchedule={handleAddToSchedule}
      />
    </>
  );
}

export default Roadmap;
