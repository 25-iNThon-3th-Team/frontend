import { Course, CompletedCourse, Track } from '../types/career';

// Mock completed courses
export const mockCompletedCourses: CompletedCourse[] = [
  {
    courseId: 'CS101',
    courseName: '프로그래밍 기초',
    grade: 'A',
    type: '전필',
    credits: 3,
    semester: '2024-1'
  },
  {
    courseId: 'CS102',
    courseName: '자료구조',
    grade: 'B+',
    type: '전필',
    credits: 3,
    semester: '2024-1'
  },
  {
    courseId: 'MATH201',
    courseName: '선형대수학',
    grade: 'A-',
    type: '전선',
    credits: 3,
    semester: '2024-2'
  }
];

// Mock all courses - 8학기 전체 커리큘럼
export const mockCourses: Course[] = [
  // 1학기
  {
    courseId: 'CS101',
    name: '프로그래밍 기초',
    credits: 3,
    professor: '김교수',
    schedule: '월수 10:00-11:30',
    prerequisites: [],
    difficulty: 2,
    workload: 3,
    type: '전필',
    description: '프로그래밍의 기초 개념과 실습',
    semester: 1
  },
  {
    courseId: 'MATH101',
    name: '이산수학',
    credits: 3,
    professor: '조교수',
    schedule: '화목 09:00-10:30',
    prerequisites: [],
    difficulty: 3,
    workload: 3,
    type: '전필',
    description: '이산수학의 기초 이론',
    semester: 1
  },
  {
    courseId: 'GEN101',
    name: '대학영어',
    credits: 2,
    professor: '박교수',
    schedule: '월수 13:00-14:00',
    prerequisites: [],
    difficulty: 2,
    workload: 2,
    type: '교양',
    description: '대학 수준의 영어 학습',
    semester: 1
  },
  
  // 2학기
  {
    courseId: 'CS102',
    name: '자료구조',
    credits: 3,
    professor: '이교수',
    schedule: '화목 13:00-14:30',
    prerequisites: ['CS101'],
    difficulty: 3,
    workload: 4,
    type: '전필',
    description: '다양한 자료구조와 알고리즘',
    semester: 2
  },
  {
    courseId: 'CS103',
    name: '컴퓨터구조',
    credits: 3,
    professor: '최교수',
    schedule: '월수 14:00-15:30',
    prerequisites: [],
    difficulty: 3,
    workload: 3,
    type: '전필',
    description: '컴퓨터 하드웨어 구조 이해',
    semester: 2
  },
  {
    courseId: 'MATH201',
    name: '선형대수학',
    credits: 3,
    professor: '정교수',
    schedule: '화목 11:00-12:30',
    prerequisites: [],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: '선형대수학의 기초 이론',
    semester: 2
  },
  
  // 3학기
  {
    courseId: 'CS201',
    name: '알고리즘',
    credits: 3,
    professor: '박교수',
    schedule: '월수 14:00-15:30',
    prerequisites: ['CS102'],
    difficulty: 4,
    workload: 4,
    type: '전필',
    description: '알고리즘 설계 및 분석',
    semester: 3
  },
  {
    courseId: 'CS202',
    name: '운영체제',
    credits: 3,
    professor: '강교수',
    schedule: '화목 10:00-11:30',
    prerequisites: ['CS103'],
    difficulty: 4,
    workload: 4,
    type: '전필',
    description: '운영체제의 원리와 구현',
    semester: 3
  },
  {
    courseId: 'CS203',
    name: '소프트웨어공학',
    credits: 3,
    professor: '윤교수',
    schedule: '월수 11:00-12:30',
    prerequisites: ['CS101'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: '소프트웨어 개발 프로세스',
    semester: 3
  },
  
  // 4학기
  {
    courseId: 'CS204',
    name: '네트워크',
    credits: 3,
    professor: '임교수',
    schedule: '화목 14:00-15:30',
    prerequisites: ['CS202'],
    difficulty: 3,
    workload: 3,
    type: '전필',
    description: '컴퓨터 네트워크의 원리',
    semester: 4
  },
  {
    courseId: 'DS301',
    name: '데이터베이스',
    credits: 3,
    professor: '한교수',
    schedule: '월수 13:00-14:30',
    prerequisites: ['CS102'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: '데이터베이스 설계 및 관리',
    semester: 4
  },
  {
    courseId: 'BE301',
    name: '웹 프로그래밍',
    credits: 3,
    professor: '서교수',
    schedule: '화목 15:00-16:30',
    prerequisites: ['CS102'],
    difficulty: 3,
    workload: 4,
    type: '전선',
    description: '웹 애플리케이션 개발',
    semester: 4
  },
  
  // 5학기
  {
    courseId: 'AI301',
    name: '머신러닝',
    credits: 3,
    professor: '최교수',
    schedule: '화목 10:00-11:30',
    prerequisites: ['CS201', 'MATH201'],
    difficulty: 5,
    workload: 5,
    type: '전선',
    description: '머신러닝 기초 이론과 실습',
    semester: 5
  },
  {
    courseId: 'BE302',
    name: '서버 아키텍처',
    credits: 3,
    professor: '김교수',
    schedule: '월수 13:00-14:30',
    prerequisites: ['BE301'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '서버 시스템 설계 및 구현',
    semester: 5
  },
  {
    courseId: 'CS301',
    name: '컴파일러',
    credits: 3,
    professor: '이교수',
    schedule: '화목 11:00-12:30',
    prerequisites: ['CS201'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '컴파일러 설계 원리',
    semester: 5
  },
  
  // 6학기
  {
    courseId: 'AI302',
    name: '딥러닝',
    credits: 3,
    professor: '정교수',
    schedule: '월수 16:00-17:30',
    prerequisites: ['AI301'],
    difficulty: 5,
    workload: 5,
    type: '전선',
    description: '딥러닝 모델 설계 및 구현',
    semester: 6
  },
  {
    courseId: 'DS302',
    name: '빅데이터 분석',
    credits: 3,
    professor: '윤교수',
    schedule: '월수 11:00-12:30',
    prerequisites: ['DS301', 'AI301'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '대용량 데이터 처리 및 분석',
    semester: 6
  },
  {
    courseId: 'CS302',
    name: '컴퓨터보안',
    credits: 3,
    professor: '강교수',
    schedule: '화목 14:00-15:30',
    prerequisites: ['CS204'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '정보보안 기초 및 실습',
    semester: 6
  },
  {
    courseId: 'CS303',
    name: '캡스톤디자인1',
    credits: 3,
    professor: '박교수',
    schedule: '화목 16:00-17:30',
    prerequisites: ['CS203'],
    difficulty: 4,
    workload: 5,
    type: '전필',
    description: '종합 설계 프로젝트 1',
    semester: 6
  },
  
  // 7학기
  {
    courseId: 'AI401',
    name: '자연어처리',
    credits: 3,
    professor: '최교수',
    schedule: '월수 10:00-11:30',
    prerequisites: ['AI302'],
    difficulty: 5,
    workload: 5,
    type: '전선',
    description: '자연어 처리 기법',
    semester: 7
  },
  {
    courseId: 'CS401',
    name: '분산시스템',
    credits: 3,
    professor: '임교수',
    schedule: '화목 13:00-14:30',
    prerequisites: ['BE302', 'CS204'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '분산 시스템 설계',
    semester: 7
  },
  {
    courseId: 'CS304',
    name: '캡스톤디자인2',
    credits: 3,
    professor: '박교수',
    schedule: '화목 16:00-17:30',
    prerequisites: ['CS303'],
    difficulty: 4,
    workload: 5,
    type: '전필',
    description: '종합 설계 프로젝트 2',
    semester: 7
  },
  
  // 8학기
  {
    courseId: 'CS402',
    name: '졸업논문',
    credits: 3,
    professor: '지도교수',
    schedule: '협의',
    prerequisites: ['CS304'],
    difficulty: 4,
    workload: 5,
    type: '전필',
    description: '졸업 논문 작성',
    semester: 8
  },
  {
    courseId: 'AI402',
    name: '컴퓨터비전',
    credits: 3,
    professor: '정교수',
    schedule: '월수 14:00-15:30',
    prerequisites: ['AI302'],
    difficulty: 5,
    workload: 5,
    type: '전선',
    description: '컴퓨터 비전 기법',
    semester: 8
  },
  {
    courseId: 'CS403',
    name: '클라우드컴퓨팅',
    credits: 3,
    professor: '한교수',
    schedule: '화목 11:00-12:30',
    prerequisites: ['CS401'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '클라우드 시스템 구축',
    semester: 8
  }
];

// Mock tracks
export const mockTracks: Track[] = [
  {
    trackId: 'ai',
    name: 'AI/ML',
    description: '인공지능 및 머신러닝 전문가 양성',
    requiredCourses: ['CS201', 'AI301', 'AI302'],
    optionalCourses: ['DS302'],
    fitScore: 85
  },
  {
    trackId: 'data',
    name: 'Data Science',
    description: '데이터 과학 및 분석 전문가',
    requiredCourses: ['DS301', 'DS302', 'AI301'],
    optionalCourses: ['AI302'],
    fitScore: 75
  },
  {
    trackId: 'backend',
    name: 'Backend',
    description: '백엔드 개발 전문가',
    requiredCourses: ['BE301', 'BE302', 'DS301'],
    optionalCourses: ['CS201'],
    fitScore: 70
  },
  {
    trackId: 'security',
    name: 'Security',
    description: '정보보안 전문가',
    requiredCourses: ['CS201', 'BE301'],
    optionalCourses: [],
    fitScore: 60
  }
];

