import { useEffect, useMemo, useState } from 'react';
import { useCareerStore } from '../../store/careerStore';
import { Course } from '../../types/career';
import CourseModal from './CourseModal';

function Roadmap() {
  const { selectedTrack, allCourses, completedCourses } = useCareerStore();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [semesterGroups, setSemesterGroups] = useState<{ [key: string]: Course[] }>({});
  const [expandedSemesters, setExpandedSemesters] = useState<Set<number>>(new Set([1])); // 기본적으로 1학기만 펼침
  const [currentSemester, setCurrentSemester] = useState(1);

  const completedCourseIds = useMemo(
    () => completedCourses.map((course) => course.courseId),
    [completedCourses]
  );

  const focusSemesters = useMemo(() => {
    const nextSemester = Math.min(8, currentSemester + 1);
    return Array.from(new Set([currentSemester, nextSemester])).filter(
      (semester) => semester >= 1 && semester <= 8
    );
  }, [currentSemester]);

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

    const completedSemesters = completedCourses
      .map((completedCourse) => {
        const matched = allCourses.find((course) => course.courseId === completedCourse.courseId);
        return matched?.semester ?? 0;
      })
      .filter((semester) => typeof semester === 'number' && semester > 0);

    const latestCompletedSemester = completedSemesters.length > 0 ? Math.max(...completedSemesters) : 0;
    const inferredSemester = Math.min(8, Math.max(1, latestCompletedSemester + 1));

    setCurrentSemester(inferredSemester);
    setExpandedSemesters(new Set([inferredSemester, Math.min(8, inferredSemester + 1)]));
  }, [allCourses, completedCourses]); // completedCourses를 dependency로 사용하여 변경 감지

  const focusRecommendations = useMemo(() => {
    const focusCourses = focusSemesters.flatMap((semesterNumber) => {
      const semesterKey = `${semesterNumber}학기`;
      return semesterGroups[semesterKey] || [];
    });

    return focusCourses
      .filter((course) => {
        if (completedCourseIds.includes(course.courseId)) {
          return false;
        }
        const completedPrereqs = course.prerequisites.filter((id) => completedCourseIds.includes(id));
        return completedPrereqs.length === course.prerequisites.length;
      })
      .sort((a, b) => b.difficulty - a.difficulty)
      .slice(0, 4);
  }, [completedCourseIds, focusSemesters, semesterGroups]);

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

  const renderSemesterSection = (semesterNum: number, variant?: 'current' | 'next') => {
    const semester = `${semesterNum}학기`;
    const courses = semesterGroups[semester] || [];
    const isExpanded = expandedSemesters.has(semesterNum);
    const completedCount = courses.filter(c => completedCourseIds.includes(c.courseId)).length;
    const title = variant === 'current' ? '현재 학기' : variant === 'next' ? '다음 학기' : semester;
    const baseInfo = courses.length > 0 ? `${courses.length}개 과목` : '과목 없음';
    const subtitle =
      variant === 'current' || variant === 'next'
        ? `${semesterNum}학기 · ${baseInfo}`
        : baseInfo;

    return (
      <div key={semester} className="border border-indigo-200 dark:border-gray-700 rounded-lg overflow-hidden mb-2">
        {/* Semester Header - Toggle Button */}
        <button
          onClick={() => toggleSemester(semesterNum)}
          className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-blue-50 dark:!from-gray-800 dark:!to-gray-700 hover:from-indigo-100 hover:to-blue-100 dark:hover:!from-gray-700 dark:hover:!to-gray-600 transition-colors border-b border-indigo-200 dark:border-gray-600"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-600 to-blue-600 text-white rounded flex items-center justify-center font-semibold text-xs">
              {semesterNum}
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{title}</h3>
              <div className="text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                {subtitle} {completedCount > 0 && `· ${completedCount}개 완료`}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <svg
              className={`w-4 h-4 text-indigo-600 dark:text-indigo-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
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
        <div className="p-3 space-y-2 bg-white dark:bg-gray-800">
          {courses.map((course) => {
            const isCompleted = completedCourseIds.includes(course.courseId);
            const completedPrereqs = course.prerequisites.filter(id => 
              completedCourseIds.includes(id)
            );
            const hasPrerequisites = course.prerequisites.length > 0;

            return (
              <div key={course.courseId}>
                {/* Course Card */}
                <button
                  onClick={() => handleCourseClick(course)}
                  className={`w-full text-left p-3 rounded-lg border transition-all active:scale-[0.99] ${
                    isCompleted
                      ? 'bg-gradient-to-r from-indigo-50 to-blue-50 dark:!from-gray-800 dark:!to-gray-700 border-indigo-300 dark:border-gray-600'
                      : completedPrereqs.length === course.prerequisites.length
                      ? 'bg-white dark:bg-gray-800 border-indigo-200 dark:border-gray-700 hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-70'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1.5">
                    <div className="flex-1">
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-100 mb-0.5">
                        {course.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{course.courseId}</div>
                    </div>
                    {isCompleted && (
                      <div className="ml-2 text-gray-600 dark:text-gray-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Course Info */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span>{course.credits}학점</span>
                    <span>·</span>
                    <span>{course.professor}</span>
                    <span>·</span>
                    <span className={`px-1.5 py-0.5 rounded border ${
                      course.type === '전필' ? 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300' :
                      course.type === '전선' ? 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300' :
                      'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}>
                      {course.type}
                    </span>
                  </div>

                  {/* Difficulty & Workload */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">난이도</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < course.difficulty ? 'bg-gray-700 dark:bg-gray-300' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400">작업량</span>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1.5 h-1.5 rounded-full ${
                              i < course.workload ? 'bg-gray-700 dark:bg-gray-300' : 'bg-gray-300 dark:bg-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {hasPrerequisites && (
                    <div className="mt-1.5 pt-1.5 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">선수과목</div>
                      <div className="flex flex-wrap gap-1">
                        {course.prerequisites.map((prereqId) => {
                          const isPrereqCompleted = completedCourseIds.includes(prereqId);
                          return (
                            <span
                              key={prereqId}
                              className={`px-1.5 py-0.5 rounded text-xs border ${
                                isPrereqCompleted
                                  ? 'bg-indigo-50 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300'
                                  : 'bg-white dark:bg-gray-700 border-indigo-200 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400'
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
  };

  const renderFocusView = () => (
    <div className="space-y-4">
      <div className="rounded-2xl border border-indigo-100 dark:border-gray-600 bg-gradient-to-br from-indigo-50 to-blue-50 dark:!from-gray-800 dark:!to-gray-700 p-4">
        <div className="flex flex-col gap-1 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">지금 집중하면 좋은 과목</span>
          <p className="text-sm text-indigo-900 dark:text-indigo-200">
            현재 학기를 기준으로 바로 수강할 수 있는 핵심 과목을 추천해 드려요.
          </p>
        </div>

        {focusRecommendations.length > 0 ? (
          <div className="grid gap-2 md:grid-cols-2">
            {focusRecommendations.map((course) => (
              <button
                key={course.courseId}
                onClick={() => handleCourseClick(course)}
                className="w-full rounded-xl border border-indigo-200 dark:border-indigo-700 bg-white/80 dark:bg-gray-800/80 p-3 text-left shadow-sm transition hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-white dark:hover:bg-gray-700"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{course.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{course.courseId}</div>
                  </div>
                  <span className="rounded-full bg-indigo-50 dark:bg-indigo-900 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-300">추천</span>
                </div>
                <div className="mt-3 flex flex-col gap-2 text-xs">
                  <div className="flex items-center justify-between rounded-lg border border-indigo-100 dark:border-indigo-800 bg-indigo-50/60 dark:bg-indigo-900/60 px-3 py-2">
                    <span className="font-semibold text-indigo-500 dark:text-indigo-400">학점</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{course.credits}학점</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2">
                    <span className="font-semibold text-gray-500 dark:text-gray-400">구분</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">{course.type}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 px-3 py-2">
                    <span className="font-semibold text-gray-500 dark:text-gray-400">상태</span>
                    <span className={`font-semibold ${course.prerequisites.length > 0 ? 'text-indigo-600 dark:text-indigo-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {course.prerequisites.length > 0 ? '수강 가능' : '기초 과목'}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-indigo-200 dark:border-indigo-700 bg-white/80 dark:bg-gray-800/80 p-4 text-sm text-indigo-800 dark:text-indigo-300">
            아직 바로 들을 수 있는 추천 과목이 없어요. 필요한 선수과목을 조금만 더 채워보세요!
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium text-gray-700 dark:text-gray-300">현재 학기 기준</span>
          {focusSemesters[1] !== undefined && focusSemesters[1] !== currentSemester && (
            <>
              <span>·</span>
              <span>다음 학기</span>
            </>
          )}
        </div>
        {focusSemesters.map((semesterNumber, index) =>
          renderSemesterSection(semesterNumber, index === 0 ? 'current' : 'next')
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-3 border border-gray-100 dark:border-gray-700">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">학습 로드맵</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            현재 학기와 다음 학기에 바로 집중해야 할 과목만 간결하게 보여드려요.
          </p>
        </div>

        {Object.keys(semesterGroups).length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">과목 정보를 불러오는 중...</div>
        ) : (
          renderFocusView()
        )}

        {/* Legend */}
        <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-gradient-to-br from-indigo-50 to-blue-50 dark:!from-gray-800 dark:!to-gray-700 border border-indigo-300 dark:border-gray-600 rounded"></div>
              <span>이수 완료</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-white dark:bg-gray-700 border border-indigo-200 dark:border-indigo-700 rounded"></div>
              <span>수강 가능</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded opacity-60"></div>
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
