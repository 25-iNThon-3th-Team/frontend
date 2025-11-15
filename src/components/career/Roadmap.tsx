import { useEffect, useState } from 'react';
import { useCareerStore } from '../../store/careerStore';
import { Course } from '../../types/career';
import CourseModal from './CourseModal';

function Roadmap() {
  const { selectedTrack, allCourses, completedCourses, getCompletedCourseIds } = useCareerStore();
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
  }, [allCourses, completedCourses.length]); // completedCourses.length를 dependency로 사용하여 배열 내용 변경 감지

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
      <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
        <h2 className="text-base font-semibold text-gray-900 mb-3">학습 로드맵</h2>
        
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
              <div key={semester} className="border border-indigo-200 rounded-lg overflow-hidden mb-2">
                {/* Semester Header - Toggle Button */}
                <button
                  onClick={() => toggleSemester(semesterNum)}
                  className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 transition-colors border-b border-indigo-200"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded flex items-center justify-center font-semibold text-xs">
                      {semesterNum}
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 text-sm">{semester}</h3>
                      <div className="text-xs text-gray-600 mt-0.5">
                        {courses.length > 0 ? `${courses.length}개 과목` : '과목 없음'} {completedCount > 0 && `· ${completedCount}개 완료`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 text-indigo-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Courses in this semester - Collapsible */}
                {isExpanded && (
                <div className="p-3 space-y-2 bg-white">
                  {courses.map((course, index) => {
                    const isCompleted = completedCourseIds.includes(course.courseId);
                    const hasPrerequisites = course.prerequisites.length > 0;
                    const completedPrereqs = course.prerequisites.filter(id => 
                      completedCourseIds.includes(id)
                    );

                    return (
                      <div key={course.courseId}>
                        {/* Course Card */}
                        <button
                          onClick={() => handleCourseClick(course)}
                          className={`w-full text-left p-3 rounded-lg border transition-all active:scale-[0.99] ${
                            isCompleted
                              ? 'bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-300'
                              : completedPrereqs.length === course.prerequisites.length
                              ? 'bg-white border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50'
                              : 'bg-gray-50 border-gray-200 opacity-70'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-1.5">
                            <div className="flex-1">
                              <div className="font-medium text-sm text-gray-900 mb-0.5">
                                {course.name}
                              </div>
                              <div className="text-xs text-gray-500">{course.courseId}</div>
                            </div>
                            {isCompleted && (
                              <div className="ml-2 text-gray-600">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>

                          {/* Course Info */}
                          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-2">
                            <span>{course.credits}학점</span>
                            <span>·</span>
                            <span>{course.professor}</span>
                            <span>·</span>
                            <span className={`px-1.5 py-0.5 rounded border ${
                              course.type === '전필' ? 'bg-white border-gray-300 text-gray-700' :
                              course.type === '전선' ? 'bg-white border-gray-300 text-gray-700' :
                              'bg-white border-gray-300 text-gray-700'
                            }`}>
                              {course.type}
                            </span>
                          </div>

                          {/* Difficulty & Workload */}
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">난이도</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      i < course.difficulty ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs text-gray-500">작업량</span>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-1.5 h-1.5 rounded-full ${
                                      i < course.workload ? 'bg-gray-700' : 'bg-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Prerequisites */}
                          {hasPrerequisites && (
                            <div className="mt-1.5 pt-1.5 border-t border-gray-200">
                              <div className="text-xs text-gray-500 mb-1">선수과목</div>
                              <div className="flex flex-wrap gap-1">
                                {course.prerequisites.map((prereqId) => {
                                  const isPrereqCompleted = completedCourseIds.includes(prereqId);
                                  return (
                                    <span
                                      key={prereqId}
                                      className={`px-1.5 py-0.5 rounded text-xs border ${
                                        isPrereqCompleted
                                          ? 'bg-indigo-50 border-indigo-300 text-indigo-700'
                                          : 'bg-white border-indigo-200 text-indigo-600'
                                      }`}
                                    >
                                      {prereqId}
                                    </span>
                                  );
                                })}
                              </div>
                            </div>
                          )}
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
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-300 rounded"></div>
              <span>이수 완료</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-white border border-indigo-200 rounded"></div>
              <span>수강 가능</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-gray-50 border border-gray-200 rounded opacity-60"></div>
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
