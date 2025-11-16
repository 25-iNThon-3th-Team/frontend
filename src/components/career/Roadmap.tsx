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

  const trackCourseSet = useMemo(() => {
    if (!selectedTrack) {
      return null;
    }
    const trackCourseIds = Array.from(
      new Set([
        ...selectedTrack.requiredCourses,
        ...selectedTrack.optionalCourses
      ])
    );
    return new Set(trackCourseIds);
  }, [selectedTrack]);

  // 하드코딩된 과목 데이터 (CourseModal에 추가한 과목들을 로드맵에도 표시)
  const hardcodedCourses: Course[] = useMemo(() => {
    const courses: Course[] = [
      // 1학기
      { id: 'cose211-1', courseCode: 'COSE211', courseId: 'COSE211', name: '이산수학(영강)', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 1, professor: '박성빈', schedule: '화 16:30-17:45, 목 16:30-17:45', location: '정보통신관 205호', type: '전선', difficulty: 3, workload: 3 },
      { id: 'cose212-1', courseCode: 'COSE212', courseId: 'COSE212', name: '프로그래밍언어(영강)', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 1, professor: '박지혁', schedule: '월 13:30-14:45, 수 13:30-14:45', location: '정운오IT교양관 B102', type: '전선', difficulty: 3, workload: 3 },
      { id: 'cose213-1', courseCode: 'COSE213', courseId: 'COSE213', name: '자료구조(영강)', major: null, creditType: 'MAJOR_REQUIRED', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 1, professor: '김세연', schedule: '화 15:00-16:15, 목 15:00-16:15', location: '정보통신관 205호', type: '전필', difficulty: 4, workload: 4 },
      
      // 2학기
      { id: 'cose214-1', courseCode: 'COSE214', courseId: 'COSE214', name: '알고리즘(영강)', major: null, creditType: 'MAJOR_REQUIRED', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE213'], semester: 2, professor: '박성빈', schedule: '월 13:30-14:45, 수 13:30-14:45', location: '정보통신관 205호', type: '전필', difficulty: 4, workload: 4 },
      { id: 'cose215-1', courseCode: 'COSE215', courseId: 'COSE215', name: '계산이론(영강)', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE214'], semester: 2, professor: '우승훈', schedule: '화 13:30-14:45, 목 13:30-14:45', location: '애기능생활관 301호', type: '전선', difficulty: 4, workload: 3 },
      { id: 'cose221-1', courseCode: 'COSE221', courseId: 'COSE221', name: '논리설계', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 2, professor: '이숙윤', schedule: '월 09:00-10:15, 수 09:00-10:15', location: '애기능생활관 302호', type: '전선', difficulty: 3, workload: 3 },
      { id: 'cose222-1', courseCode: 'COSE222', courseId: 'COSE222', name: '컴퓨터구조(영강)', major: null, creditType: 'MAJOR_REQUIRED', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE221'], semester: 2, professor: '구건재', schedule: '월 10:30-11:45, 수 10:30-11:45', location: '정운오IT교양관 B103호', type: '전필', difficulty: 4, workload: 3 },
      
      // 3학기
      { id: 'cose242-1', courseCode: 'COSE242', courseId: 'COSE242', name: '데이터통신', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE222'], semester: 3, professor: '민성기', schedule: '화 13:30-14:45, 목 13:30-14:45', location: '정보통신관 604호', type: '전선', difficulty: 3, workload: 3 },
      { id: 'cose281-1', courseCode: 'COSE281', courseId: 'COSE281', name: '공학수학', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 3, professor: '박중석', schedule: '금 13:30-16:15', location: '정보통신관 205호', type: '전선', difficulty: 3, workload: 3 },
      { id: 'cose284-1', courseCode: 'COSE284', courseId: 'COSE284', name: '전자기학', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 3, professor: '이주섭', schedule: '월 15:00-16:15, 금 15:00-16:15', location: '애기능생활관 302호', type: '전선', difficulty: 4, workload: 3 },
      
      // 4학기
      { id: 'cose322-1', courseCode: 'COSE322', courseId: 'COSE322', name: '시스템프로그래밍', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE222'], semester: 4, professor: '유혁', schedule: '월 15:00-16:15, 수 15:00-16:15', location: '정운오IT교양관 B102', type: '전선', difficulty: 4, workload: 4 },
      { id: 'cose341-1', courseCode: 'COSE341', courseId: 'COSE341', name: '운영체제(영강)', major: null, creditType: 'MAJOR_REQUIRED', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE222'], semester: 4, professor: '양경식', schedule: '월 15:00-16:15, 수 15:00-16:15', location: '정보통신관 202호', type: '전필', difficulty: 4, workload: 4 },
      { id: 'cose342-1', courseCode: 'COSE342', courseId: 'COSE342', name: '컴퓨터네트워크', major: null, creditType: 'MAJOR_REQUIRED', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE242'], semester: 4, professor: '민성기', schedule: '월 13:30-14:45, 수 13:30-14:45', location: '정보통신관 604호', type: '전필', difficulty: 3, workload: 3 },
      { id: 'cose352-1', courseCode: 'COSE352', courseId: 'COSE352', name: '소프트웨어공학(영강)', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE214'], semester: 4, professor: '인호', schedule: '월 10:30-11:45, 수 10:30-11:45', location: '정보통신관 202호', type: '전선', difficulty: 3, workload: 3 },
      { id: 'cose354-1', courseCode: 'COSE354', courseId: 'COSE354', name: '정보보호(영강)', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE342'], semester: 4, professor: '이희조', schedule: '화 15:00-16:15, 목 15:00-16:15', location: '정운오IT교양관 B103호', type: '전선', difficulty: 4, workload: 3 },
      
      // 5학기
      { id: 'cose361-1', courseCode: 'COSE361', courseId: 'COSE361', name: '인공지능(영강)', major: null, creditType: 'MAJOR_REQUIRED', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE214'], semester: 5, professor: '김동현', schedule: '화 12:00-13:15, 목 12:00-13:15', location: '정운오IT교양관 B102', type: '전필', difficulty: 4, workload: 4 },
      { id: 'cose362-1', courseCode: 'COSE362', courseId: 'COSE362', name: '기계학습', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE361'], semester: 5, professor: '육동석', schedule: '월 09:00-10:15, 수 09:00-10:15', location: '정보통신관 205호', type: '전선', difficulty: 4, workload: 4 },
      { id: 'cose371-1', courseCode: 'COSE371', courseId: 'COSE371', name: '데이터베이스(영강)', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE214'], semester: 5, professor: '박종혁', schedule: '화 13:30-14:45, 목 13:30-14:45', location: '정보통신관 205호', type: '전선', difficulty: 3, workload: 3 },
      { id: 'cose372-1', courseCode: 'COSE372', courseId: 'COSE372', name: '데이터베이스시스템', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE371'], semester: 5, professor: '정연돈', schedule: '화 10:30-11:45, 목 10:30-11:45', location: '정운오IT교양관 609호', type: '전선', difficulty: 4, workload: 3 },
      { id: 'cose380-1', courseCode: 'COSE380', courseId: 'COSE380', name: '디지털신호처리', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 5, professor: '이재훈', schedule: '월 12:00-13:15, 수 12:00-13:15', location: '애기능생활관 301호', type: '전선', difficulty: 3, workload: 3 },
      { id: 'cose382-1', courseCode: 'COSE382', courseId: 'COSE382', name: '확률및랜덤과정', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 5, professor: '백승준', schedule: '화 15:00-16:15, 목 15:00-16:15', location: '정운오IT교양관 B102', type: '전선', difficulty: 4, workload: 3 },
      { id: 'cose389-1', courseCode: 'COSE389', courseId: 'COSE389', name: '기업가정신과리더쉽', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 5, professor: '이문영', schedule: '수 15:00-16:15, 금 15:00-16:15', location: '애기능생활관 301호', type: '전선', difficulty: 2, workload: 2 },
      { id: 'cose432-1', courseCode: 'COSE432', courseId: 'COSE432', name: '인간컴퓨터상호작용입문(영강)', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE352'], semester: 5, professor: '김정현', schedule: '월 10:30-11:45, 수 10:30-11:45', location: '정보통신관 604호', type: '전선', difficulty: 3, workload: 3 },
      { id: 'cose444-1', courseCode: 'COSE444', courseId: 'COSE444', name: '클라우드컴퓨팅', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE341'], semester: 5, professor: '유헌창', schedule: '월 10:30-11:45, 수 10:30-11:45', location: '애기능생활관 302호', type: '전선', difficulty: 4, workload: 4 },
      
      // 6학기
      { id: 'cose436-1', courseCode: 'COSE436', courseId: 'COSE436', name: '인터렉티브시각화(영강)', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE214'], semester: 6, professor: '정원기', schedule: '화 10:30-11:45, 목 10:30-11:45', location: '정운오IT교양관 610호', type: '전선', difficulty: 3, workload: 3 },
      { id: 'cose455-1', courseCode: 'COSE455', courseId: 'COSE455', name: '스타트업프로젝트관리', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE389'], semester: 6, professor: '이문영', schedule: '수 13:30-14:45, 금 13:30-14:45', location: '애기능생활관 301호', type: '전선', difficulty: 3, workload: 3 },
      { id: 'cose457-1', courseCode: 'COSE457', courseId: 'COSE457', name: '실전SW프로젝트', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE352'], semester: 6, professor: '유헌창', schedule: '목 13:30-16:15, 토 12:00-14:45', location: '정운오IT교양관 407호', type: '전선', difficulty: 4, workload: 5 },
      { id: 'cose474-1', courseCode: 'COSE474', courseId: 'COSE474', name: '딥러닝', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE362'], semester: 6, professor: '이정범', schedule: '화 10:30-11:45, 목 10:30-11:45', location: '정운오IT교양관 B103호', type: '전선', difficulty: 5, workload: 5 },
      { id: 'cose484-1', courseCode: 'COSE484', courseId: 'COSE484', name: '무선보안(영강)', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE354'], semester: 6, professor: '전유석', schedule: '화 10:30-11:45, 목 10:30-11:45', location: '정보통신관 B101호', type: '전선', difficulty: 4, workload: 3 },
      
      // 7학기
      { id: 'cose405-1', courseCode: 'COSE405', courseId: 'COSE405', name: '컴퓨터학콜로키움(영강)', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 7, professor: '김진규', schedule: '수 16:30-20:50, 토 09:00-10:15', location: '애기능생활관 301호', type: '전선', difficulty: 2, workload: 2 },
      { id: 'cose407-1', courseCode: 'COSE407', courseId: 'COSE407', name: '개별연구프로젝트(영강)', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 7, professor: '김진규', schedule: '화 16:30-17:45, 토 10:30-14:45', location: '애기능생활관 303호', type: '전선', difficulty: 3, workload: 4 },
      { id: 'cose475-1', courseCode: 'COSE475', courseId: 'COSE475', name: '고급딥러닝(영강)', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE474'], semester: 7, professor: '서홍석', schedule: '화 09:00-10:15, 목 09:00-10:15', location: '애기능생활관 302호', type: '전선', difficulty: 5, workload: 5 },
      { id: 'cose480-1', courseCode: 'COSE480', courseId: 'COSE480', name: '산학캡스톤디자인', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: ['COSE352'], semester: 7, professor: '이숙윤, 구건재', schedule: '월 15:00-17:45, 토 15:00-17:45', location: '애기능생활관 303호', type: '전선', difficulty: 4, workload: 5 },
      { id: 'cose490-1', courseCode: 'COSE490', courseId: 'COSE490', name: '전산학특강(영강)', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 7, professor: '박성빈', schedule: '금 12:00-14:45', location: '정보통신관 202호', type: '전선', difficulty: 3, workload: 3 },
      
      // 8학기
      { id: 'cose401-1', courseCode: 'COSE401', courseId: 'COSE401', name: '현장실습및창업실습I', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 8, professor: '이숙윤', schedule: '시간 협의', location: '시간 협의', type: '전선', difficulty: 2, workload: 3 },
      { id: 'cose402-1', courseCode: 'COSE402', courseId: 'COSE402', name: '현장실습및창업실습II', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 8, professor: '이숙윤', schedule: '시간 협의', location: '시간 협의', type: '전선', difficulty: 2, workload: 3 },
      { id: 'cose403-1', courseCode: 'COSE403', courseId: 'COSE403', name: '현장실습및창업실습III', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 8, professor: '이숙윤', schedule: '시간 협의', location: '시간 협의', type: '전선', difficulty: 2, workload: 3 },
      { id: 'cose404-1', courseCode: 'COSE404', courseId: 'COSE404', name: '현장실습및창업실습IV', major: null, creditType: 'MAJOR_ELECTIVE', credits: 3, competitionRate: 0, easinessScore: 0, prerequisites: [], semester: 8, professor: '이숙윤', schedule: '시간 협의', location: '시간 협의', type: '전선', difficulty: 2, workload: 3 },
    ];
    return courses;
  }, []);

  // allCourses와 hardcodedCourses를 병합 (중복 제거)
  const mergedCourses = useMemo(() => {
    const courseMap = new Map<string, Course>();
    
    // 먼저 allCourses 추가
    allCourses.forEach(course => {
      const key = course.courseId || course.courseCode;
      if (key) {
        courseMap.set(key, course);
      }
    });
    
    // hardcodedCourses 추가 (allCourses에 없는 것만)
    hardcodedCourses.forEach(course => {
      const key = course.courseId || course.courseCode;
      if (key && !courseMap.has(key)) {
        courseMap.set(key, course);
      }
    });
    
    return Array.from(courseMap.values());
  }, [allCourses, hardcodedCourses]);

  useEffect(() => {
    if (mergedCourses.length === 0) {
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
    mergedCourses.forEach(course => {
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
        const matched = mergedCourses.find((course) => (course.courseId || course.courseCode) === completedCourse.courseId);
        return matched?.semester ?? 0;
      })
      .filter((semester) => typeof semester === 'number' && semester > 0);

    const latestCompletedSemester = completedSemesters.length > 0 ? Math.max(...completedSemesters) : 0;
    const inferredSemester = Math.min(8, Math.max(1, latestCompletedSemester + 1));

    setCurrentSemester(inferredSemester);
    setExpandedSemesters(new Set([inferredSemester, Math.min(8, inferredSemester + 1)]));
  }, [mergedCourses, completedCourses]); // mergedCourses를 dependency로 사용하여 변경 감지

  // Backend 트랙용 하드코딩 과목
  const backendHardcodedCourses: Course[] = [
    {
      id: 'backend-1',
      courseCode: 'COSE352',
      name: '소프트웨어공학',
      major: null,
      creditType: 'MAJOR_ELECTIVE',
      credits: 3,
      competitionRate: 0,
      easinessScore: 0,
      prerequisites: []
    },
    {
      id: 'backend-2',
      courseCode: 'COSE341',
      name: '운영체제',
      major: null,
      creditType: 'MAJOR_REQUIRED',
      credits: 3,
      competitionRate: 0,
      easinessScore: 0,
      prerequisites: []
    },
    {
      id: 'backend-3',
      courseCode: 'COSE342',
      name: '컴퓨터네트워크',
      major: null,
      creditType: 'MAJOR_REQUIRED',
      credits: 3,
      competitionRate: 0,
      easinessScore: 0,
      prerequisites: []
    },
    {
      id: 'backend-4',
      courseCode: 'COSE371',
      name: '데이터베이스',
      major: null,
      creditType: 'MAJOR_ELECTIVE',
      credits: 3,
      competitionRate: 0,
      easinessScore: 0,
      prerequisites: []
    }
  ];

  const focusRecommendations = useMemo(() => {
    // Backend 트랙이고 추천 과목이 없을 때 하드코딩 과목 반환
    if (selectedTrack?.trackId === 'backend') {
      const focusCourses = focusSemesters.flatMap((semesterNumber) => {
        const semesterKey = `${semesterNumber}학기`;
        return semesterGroups[semesterKey] || [];
      });

      const baseCandidates = focusCourses
        .filter((course) => {
          if (completedCourseIds.includes(course.courseId)) {
            return false;
          }
          const completedPrereqs = course.prerequisites.filter((id) =>
            completedCourseIds.includes(id)
          );
          return completedPrereqs.length === course.prerequisites.length;
        })
        .sort((a, b) => b.difficulty - a.difficulty);

      if (!trackCourseSet || trackCourseSet.size === 0) {
        return baseCandidates.slice(0, 4);
      }

      const isRequiredCourse = (courseId: string) =>
        selectedTrack.requiredCourses.includes(courseId);
      const isTrackCourse = (courseId: string) => trackCourseSet?.has(courseId) || false;
      const prerequisitesReady = (course: Course) =>
        course.prerequisites.every((id) => completedCourseIds.includes(id));
      const semesterValue = (course: Course) => course.semester ?? 99;

      const sortByTrackPriority = (courses: Course[]) =>
        [...courses].sort((a, b) => {
          const requiredDiff =
            Number(isRequiredCourse(b.courseId)) - Number(isRequiredCourse(a.courseId));
          if (requiredDiff !== 0) {
            return requiredDiff;
          }

          const readinessDiff = Number(prerequisitesReady(b)) - Number(prerequisitesReady(a));
          if (readinessDiff !== 0) {
            return readinessDiff;
          }

          const semesterDiff = semesterValue(a) - semesterValue(b);
          if (semesterDiff !== 0) {
            return semesterDiff;
          }

          return b.difficulty - a.difficulty;
        });

      const matchedInFocus = sortByTrackPriority(
        baseCandidates.filter((course) => isTrackCourse(course.courseId || course.courseCode))
      );

      if (matchedInFocus.length >= 4) {
        return matchedInFocus.slice(0, 4);
      }

      const remainingSlots = 4 - matchedInFocus.length;

      const broaderTrackPool = sortByTrackPriority(
        mergedCourses
          .filter(
            (course) =>
              isTrackCourse(course.courseId || course.courseCode) && !completedCourseIds.includes(course.courseId || course.courseCode)
          )
          .filter((course) => !matchedInFocus.some((item) => (item.courseId || item.courseCode) === (course.courseId || course.courseCode)))
      );

      const result = matchedInFocus.concat(broaderTrackPool.slice(0, remainingSlots));
      
      // 결과가 비어있으면 하드코딩 과목 반환
      if (result.length === 0) {
        return backendHardcodedCourses;
      }
      
      return result;
    }

    // 다른 트랙은 기존 로직
    const focusCourses = focusSemesters.flatMap((semesterNumber) => {
      const semesterKey = `${semesterNumber}학기`;
      return semesterGroups[semesterKey] || [];
    }).map(course => {
      // courseId가 없으면 courseCode를 courseId로 사용
      if (!course.courseId && course.courseCode) {
        return { ...course, courseId: course.courseCode };
      }
      return course;
    });

    const baseCandidates = focusCourses
      .filter((course) => {
        if (completedCourseIds.includes(course.courseId)) {
          return false;
        }
        const completedPrereqs = course.prerequisites.filter((id) =>
          completedCourseIds.includes(id)
        );
        return completedPrereqs.length === course.prerequisites.length;
      })
      .sort((a, b) => b.difficulty - a.difficulty);

    if (!selectedTrack || !trackCourseSet || trackCourseSet.size === 0) {
      return baseCandidates.slice(0, 4);
    }

    const isRequiredCourse = (courseId: string) =>
      selectedTrack.requiredCourses.includes(courseId);
    const isTrackCourse = (courseId: string) => trackCourseSet?.has(courseId) || false;
    const prerequisitesReady = (course: Course) =>
      course.prerequisites.every((id) => completedCourseIds.includes(id));
    const semesterValue = (course: Course) => course.semester ?? 99;

    const sortByTrackPriority = (courses: Course[]) =>
      [...courses].sort((a, b) => {
        const requiredDiff =
          Number(isRequiredCourse(b.courseId)) - Number(isRequiredCourse(a.courseId));
        if (requiredDiff !== 0) {
          return requiredDiff;
        }

        const readinessDiff = Number(prerequisitesReady(b)) - Number(prerequisitesReady(a));
        if (readinessDiff !== 0) {
          return readinessDiff;
        }

        const semesterDiff = semesterValue(a) - semesterValue(b);
        if (semesterDiff !== 0) {
          return semesterDiff;
        }

        return b.difficulty - a.difficulty;
      });

    const matchedInFocus = sortByTrackPriority(
      baseCandidates.filter((course) => isTrackCourse(course.courseId || course.courseCode))
    );

    if (matchedInFocus.length >= 4) {
      return matchedInFocus.slice(0, 4);
    }

    const remainingSlots = 4 - matchedInFocus.length;

    const broaderTrackPool = sortByTrackPriority(
      mergedCourses
        .filter(
          (course) =>
            isTrackCourse(course.courseId || course.courseCode) && !completedCourseIds.includes(course.courseId || course.courseCode)
        )
        .filter((course) => !matchedInFocus.some((item) => (item.courseId || item.courseCode) === (course.courseId || course.courseCode)))
      );

    return matchedInFocus.concat(broaderTrackPool.slice(0, remainingSlots));
  }, [
    mergedCourses,
    completedCourseIds,
    focusSemesters,
    selectedTrack,
    semesterGroups,
    trackCourseSet
  ]);

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
                      {course.type === '전필' ? '전공필수' : course.type === '전선' ? '전공선택' : course.type}
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
          <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-400">
            지금 집중하면 좋은 과목
          </span>
          <p className="text-sm text-indigo-900 dark:text-indigo-200">
            현재 학기를 기준으로 바로 수강할 수 있는 핵심 과목을 추천해 드려요.
          </p>
        </div>

        {selectedTrack ? (
          <>
            <div className="mb-4 rounded-xl border border-indigo-200 dark:border-indigo-600 bg-white/70 dark:bg-gray-800/70 p-3">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-300">선택한 진로</div>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-200">
                  맞춤 로드맵
                </span>
              </div>
              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">{selectedTrack.name}</div>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                {selectedTrack.description}
              </p>
            </div>

            {focusRecommendations.length > 0 ? (
          <div className="grid gap-2 md:grid-cols-2">
            {focusRecommendations.map((course, index) => {
              const completedPrereqs = course.prerequisites.filter((id) =>
                completedCourseIds.includes(id)
              );
              const prereqsSatisfied = completedPrereqs.length === course.prerequisites.length;
              const courseId = course.courseId || course.courseCode;
              const isCompleted = completedCourseIds.includes(courseId);
              const isTrackCourse = Boolean(trackCourseSet?.has(courseId));
              const isTrackRequired =
                isTrackCourse && selectedTrack?.requiredCourses.includes(courseId);
              
              // 전공필수인지 확인
              const isMajorRequired = course.type === '전필';
              // 추천 마크는 처음 2개만 표시
              const showRecommendBadge = index < 2;

              let statusLabel = '수강 가능';
              let statusClass = 'text-emerald-600 dark:text-emerald-400';
              let showStatus = true;

              if (isCompleted) {
                statusLabel = '수강 완료';
                statusClass = 'text-emerald-600 dark:text-emerald-400';
              } else if (course.semester && course.semester > currentSemester + 1) {
                statusLabel = `${course.semester}학기 예정`;
                statusClass = 'text-indigo-600 dark:text-indigo-400';
              } else if (!prereqsSatisfied) {
                // 선수 과목 필요일 때는 상태를 표시하지 않음
                showStatus = false;
              }

              return (
                <button
                  key={course.courseId}
                  onClick={() => handleCourseClick(course)}
                  className="w-full rounded-xl border border-indigo-200 dark:border-indigo-700 bg-white/80 dark:bg-gray-800/80 p-3 text-left shadow-sm transition hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-white dark:hover:bg-gray-700"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {course.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {course.courseId || course.courseCode}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {showRecommendBadge && (
                        <span className="rounded-full bg-indigo-50 dark:bg-indigo-900 px-2 py-0.5 text-xs font-medium text-indigo-600 dark:text-indigo-300">
                          추천
                        </span>
                      )}
                      {isMajorRequired && (
                        <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-200">
                          필수
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col gap-2 text-xs">
                    <div className="flex items-center justify-between rounded-lg border border-indigo-100 dark:border-indigo-800 bg-indigo-50/60 dark:bg-indigo-900/60 px-3 py-2">
                      <span className="font-semibold text-indigo-500 dark:text-indigo-400">학점</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">{course.credits}학점</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-2">
                      <span className="font-semibold text-gray-500 dark:text-gray-400">구분</span>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        {course.type === '전필' ? '전공필수' : course.type === '전선' ? '전공선택' : course.type}
                      </span>
                    </div>
                    {showStatus && (
                      <div className="flex items-center justify-between rounded-lg border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-800 px-3 py-2">
                        <span className="font-semibold text-gray-500 dark:text-gray-400">상태</span>
                        <span className={`font-semibold ${statusClass}`}>{statusLabel}</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
            ) : (
              <div className="rounded-xl border border-dashed border-indigo-200 dark:border-indigo-700 bg-white/80 dark:bg-gray-800/80 p-4 text-sm text-indigo-800 dark:text-indigo-300">
                {selectedTrack.name} 트랙에 맞춰 지금 바로 들을 수 있는 과목이 없어요. 필요한 선수 과목을 먼저 이수해보세요!
              </div>
            )}
          </>
        ) : (
          <div className="mb-4 rounded-xl border border-dashed border-indigo-200 dark:border-gray-600 bg-white/60 dark:bg-gray-800/60 p-3 text-xs text-gray-600 dark:text-gray-300">
            관심 있는 진로 카드를 선택하면 해당 트랙에 맞춘 학습 로드맵을 바로 확인할 수 있어요.
          </div>
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
