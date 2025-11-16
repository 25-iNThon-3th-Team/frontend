import { Course, CompletedCourse, Track, CrossMajorOption } from '../types/career';

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
    semester: 1,
    location: '공학관 101호',
    grade: 1,
    enrollment: 45,
    capacity: 50
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
    semester: 1,
    location: '공학관 201호',
    grade: 1,
    enrollment: 38,
    capacity: 40
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
    semester: 1,
    location: '인문관 301호',
    grade: 1,
    enrollment: 25,
    capacity: 30
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
    semester: 2,
    location: '공학관 102호',
    grade: 1,
    enrollment: 42,
    capacity: 45
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
  },
  
  // 추가 과목들
  {
    courseId: 'GEN102',
    name: '글쓰기',
    credits: 2,
    professor: '김교수',
    schedule: '월 15:00-17:00',
    prerequisites: [],
    difficulty: 2,
    workload: 2,
    type: '교양',
    description: '대학 글쓰기 기초',
    semester: 2
  },
  {
    courseId: 'GEN103',
    name: '컴퓨터 활용',
    credits: 2,
    professor: '이교수',
    schedule: '수 10:00-12:00',
    prerequisites: [],
    difficulty: 1,
    workload: 1,
    type: '교양',
    description: '컴퓨터 기본 활용법',
    semester: 1
  },
  {
    courseId: 'CS104',
    name: '객체지향프로그래밍',
    credits: 3,
    professor: '최교수',
    schedule: '월수 09:00-10:30',
    prerequisites: ['CS101'],
    difficulty: 3,
    workload: 3,
    type: '전필',
    description: '객체지향 프로그래밍 기초',
    semester: 2
  },
  {
    courseId: 'CS205',
    name: '시스템프로그래밍',
    credits: 3,
    professor: '강교수',
    schedule: '화목 09:00-10:30',
    prerequisites: ['CS103'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '시스템 레벨 프로그래밍',
    semester: 3
  },
  {
    courseId: 'CS206',
    name: '프로그래밍언어론',
    credits: 3,
    professor: '윤교수',
    schedule: '월수 15:00-16:30',
    prerequisites: ['CS102'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: '프로그래밍 언어의 원리',
    semester: 3
  },
  {
    courseId: 'DS303',
    name: '데이터마이닝',
    credits: 3,
    professor: '한교수',
    schedule: '화목 09:00-10:30',
    prerequisites: ['DS301'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '데이터 마이닝 기법',
    semester: 5
  },
  {
    courseId: 'BE303',
    name: '모바일 프로그래밍',
    credits: 3,
    professor: '서교수',
    schedule: '월수 10:00-11:30',
    prerequisites: ['CS102'],
    difficulty: 3,
    workload: 4,
    type: '전선',
    description: '모바일 앱 개발',
    semester: 5
  },
  {
    courseId: 'AI303',
    name: '강화학습',
    credits: 3,
    professor: '정교수',
    schedule: '화목 13:00-14:30',
    prerequisites: ['AI301'],
    difficulty: 5,
    workload: 5,
    type: '전선',
    description: '강화학습 알고리즘',
    semester: 6
  },
  {
    courseId: 'CS305',
    name: '임베디드시스템',
    credits: 3,
    professor: '임교수',
    schedule: '월수 11:00-12:30',
    prerequisites: ['CS103'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '임베디드 시스템 설계',
    semester: 6
  },
  {
    courseId: 'CS306',
    name: '게임프로그래밍',
    credits: 3,
    professor: '박교수',
    schedule: '화목 15:00-16:30',
    prerequisites: ['CS102'],
    difficulty: 3,
    workload: 4,
    type: '전선',
    description: '게임 개발 기초',
    semester: 4
  },
  {
    courseId: 'CS307',
    name: '블록체인',
    credits: 3,
    professor: '이교수',
    schedule: '월수 13:00-14:30',
    prerequisites: ['CS204'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '블록체인 기술',
    semester: 7
  },
  {
    courseId: 'AI403',
    name: '추천시스템',
    credits: 3,
    professor: '최교수',
    schedule: '화목 10:00-11:30',
    prerequisites: ['AI301'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '추천 시스템 설계',
    semester: 7
  },
  {
    courseId: 'DS304',
    name: '데이터시각화',
    credits: 3,
    professor: '윤교수',
    schedule: '월수 15:00-16:30',
    prerequisites: ['DS301'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: '데이터 시각화 기법',
    semester: 6
  },
  {
    courseId: 'BE304',
    name: '마이크로서비스',
    credits: 3,
    professor: '서교수',
    schedule: '화목 14:00-15:30',
    prerequisites: ['BE302'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '마이크로서비스 아키텍처',
    semester: 7
  },
  {
    courseId: 'CS308',
    name: '병렬프로그래밍',
    credits: 3,
    professor: '강교수',
    schedule: '월수 09:00-10:30',
    prerequisites: ['CS202'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '병렬 프로그래밍 기법',
    semester: 5
  },
  {
    courseId: 'GEN104',
    name: '창의적사고',
    credits: 2,
    professor: '박교수',
    schedule: '목 13:00-15:00',
    prerequisites: [],
    difficulty: 2,
    workload: 2,
    type: '교양',
    description: '창의적 사고 방법론',
    semester: 3
  },
  {
    courseId: 'GEN105',
    name: '논리와비판적사고',
    credits: 2,
    professor: '김교수',
    schedule: '화 15:00-17:00',
    prerequisites: [],
    difficulty: 2,
    workload: 2,
    type: '교양',
    description: '논리적 사고 훈련',
    semester: 2
  },
  {
    courseId: 'CS309',
    name: '인간컴퓨터상호작용',
    credits: 3,
    professor: '이교수',
    schedule: '월수 16:00-17:30',
    prerequisites: ['CS203'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: 'HCI 설계 원리',
    semester: 5
  },
  {
    courseId: 'CS310',
    name: '정보검색',
    credits: 3,
    professor: '정교수',
    schedule: '화목 11:00-12:30',
    prerequisites: ['CS201'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: '정보 검색 시스템',
    semester: 6
  },
  {
    courseId: 'AI404',
    name: '음성인식',
    credits: 3,
    professor: '최교수',
    schedule: '월수 13:00-14:30',
    prerequisites: ['AI302'],
    difficulty: 5,
    workload: 5,
    type: '전선',
    description: '음성 인식 기술',
    semester: 8
  },
  {
    courseId: 'CS404',
    name: '사이버보안',
    credits: 3,
    professor: '강교수',
    schedule: '화목 15:00-16:30',
    prerequisites: ['CS302'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '사이버 보안 실무',
    semester: 8
  },
  {
    courseId: 'BE305',
    name: 'DevOps',
    credits: 3,
    professor: '서교수',
    schedule: '월수 14:00-15:30',
    prerequisites: ['BE302'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: 'DevOps 실무',
    semester: 7
  },
  {
    courseId: 'DS305',
    name: '실시간데이터처리',
    credits: 3,
    professor: '한교수',
    schedule: '화목 09:00-10:30',
    prerequisites: ['DS302'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '실시간 데이터 스트리밍',
    semester: 7
  },
  
  // 더 많은 추가 과목들
  {
    courseId: 'CS311',
    name: '웹보안',
    credits: 3,
    professor: '강교수',
    schedule: '월수 10:00-11:30',
    prerequisites: ['BE301'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '웹 보안 기법',
    semester: 6
  },
  {
    courseId: 'AI405',
    name: '생성형AI',
    credits: 3,
    professor: '최교수',
    schedule: '화목 16:00-17:30',
    prerequisites: ['AI302'],
    difficulty: 5,
    workload: 5,
    type: '전선',
    description: '생성형 AI 모델',
    semester: 8
  },
  {
    courseId: 'BE306',
    name: 'API 설계',
    credits: 3,
    professor: '서교수',
    schedule: '월수 11:00-12:30',
    prerequisites: ['BE301'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: 'RESTful API 설계',
    semester: 5
  },
  {
    courseId: 'DS306',
    name: 'NoSQL 데이터베이스',
    credits: 3,
    professor: '한교수',
    schedule: '화목 10:00-11:30',
    prerequisites: ['DS301'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: 'NoSQL 데이터베이스 활용',
    semester: 6
  },
  {
    courseId: 'CS312',
    name: '리버스엔지니어링',
    credits: 3,
    professor: '임교수',
    schedule: '월수 15:00-16:30',
    prerequisites: ['CS103'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '리버스 엔지니어링 기법',
    semester: 7
  },
  {
    courseId: 'AI406',
    name: '강화학습응용',
    credits: 3,
    professor: '정교수',
    schedule: '화목 11:00-12:30',
    prerequisites: ['AI303'],
    difficulty: 5,
    workload: 5,
    type: '전선',
    description: '강화학습 실전 응용',
    semester: 8
  },
  {
    courseId: 'CS313',
    name: '멀티미디어시스템',
    credits: 3,
    professor: '박교수',
    schedule: '월수 13:00-14:30',
    prerequisites: ['CS202'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: '멀티미디어 처리',
    semester: 5
  },
  {
    courseId: 'BE307',
    name: 'GraphQL',
    credits: 3,
    professor: '서교수',
    schedule: '화목 13:00-14:30',
    prerequisites: ['BE301'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: 'GraphQL API 개발',
    semester: 6
  },
  {
    courseId: 'DS307',
    name: '머신러닝파이프라인',
    credits: 3,
    professor: '윤교수',
    schedule: '월수 14:00-15:30',
    prerequisites: ['AI301'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: 'ML 파이프라인 구축',
    semester: 7
  },
  {
    courseId: 'CS314',
    name: '가상현실',
    credits: 3,
    professor: '이교수',
    schedule: '화목 14:00-15:30',
    prerequisites: ['CS306'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: 'VR/AR 개발',
    semester: 7
  },
  {
    courseId: 'AI407',
    name: '전이학습',
    credits: 3,
    professor: '최교수',
    schedule: '월수 10:00-11:30',
    prerequisites: ['AI302'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '전이학습 기법',
    semester: 8
  },
  {
    courseId: 'CS315',
    name: '양자컴퓨팅',
    credits: 3,
    professor: '강교수',
    schedule: '화목 09:00-10:30',
    prerequisites: ['MATH201'],
    difficulty: 5,
    workload: 5,
    type: '전선',
    description: '양자 컴퓨팅 기초',
    semester: 8
  },
  {
    courseId: 'BE308',
    name: '서버리스아키텍처',
    credits: 3,
    professor: '서교수',
    schedule: '월수 16:00-17:30',
    prerequisites: ['BE304'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '서버리스 시스템',
    semester: 8
  },
  {
    courseId: 'DS308',
    name: '시계열분석',
    credits: 3,
    professor: '한교수',
    schedule: '화목 15:00-16:30',
    prerequisites: ['DS302'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '시계열 데이터 분석',
    semester: 7
  },
  {
    courseId: 'CS316',
    name: '디지털포렌식',
    credits: 3,
    professor: '임교수',
    schedule: '월수 11:00-12:30',
    prerequisites: ['CS302'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '디지털 포렌식 기법',
    semester: 7
  },
  {
    courseId: 'AI408',
    name: '지능형로봇',
    credits: 3,
    professor: '정교수',
    schedule: '화목 16:00-17:30',
    prerequisites: ['AI302'],
    difficulty: 5,
    workload: 5,
    type: '전선',
    description: '로봇 제어 및 AI',
    semester: 8
  },
  {
    courseId: 'CS317',
    name: '실시간시스템',
    credits: 3,
    professor: '박교수',
    schedule: '월수 12:00-13:30',
    prerequisites: ['CS202'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '실시간 시스템 설계',
    semester: 6
  },
  {
    courseId: 'BE309',
    name: '컨테이너오케스트레이션',
    credits: 3,
    professor: '서교수',
    schedule: '화목 10:00-11:30',
    prerequisites: ['BE305'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: 'Kubernetes 등',
    semester: 8
  },
  {
    courseId: 'DS309',
    name: '데이터거버넌스',
    credits: 3,
    professor: '윤교수',
    schedule: '월수 15:00-16:30',
    prerequisites: ['DS301'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: '데이터 거버넌스',
    semester: 6
  },
  {
    courseId: 'CS318',
    name: '사이버물리시스템',
    credits: 3,
    professor: '이교수',
    schedule: '화목 11:00-12:30',
    prerequisites: ['CS305'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: 'CPS 설계',
    semester: 7
  },
  {
    courseId: 'AI409',
    name: '앙상블학습',
    credits: 3,
    professor: '최교수',
    schedule: '월수 13:00-14:30',
    prerequisites: ['AI301'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '앙상블 학습 기법',
    semester: 7
  },
  {
    courseId: 'GEN106',
    name: '과학기술윤리',
    credits: 2,
    professor: '김교수',
    schedule: '목 10:00-12:00',
    prerequisites: [],
    difficulty: 2,
    workload: 2,
    type: '교양',
    description: '과학기술 윤리',
    semester: 4
  },
  {
    courseId: 'GEN107',
    name: '기업가정신',
    credits: 2,
    professor: '박교수',
    schedule: '화 13:00-15:00',
    prerequisites: [],
    difficulty: 2,
    workload: 2,
    type: '교양',
    description: '기업가 정신',
    semester: 5
  },
  {
    courseId: 'CS319',
    name: '소프트웨어테스팅',
    credits: 3,
    professor: '강교수',
    schedule: '월수 09:00-10:30',
    prerequisites: ['CS203'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: '소프트웨어 테스팅',
    semester: 5
  },
  {
    courseId: 'BE310',
    name: '웹성능최적화',
    credits: 3,
    professor: '서교수',
    schedule: '화목 12:00-13:30',
    prerequisites: ['BE301'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: '웹 성능 최적화',
    semester: 6
  },
  {
    courseId: 'DS310',
    name: '데이터웨어하우징',
    credits: 3,
    professor: '한교수',
    schedule: '월수 16:00-17:30',
    prerequisites: ['DS301'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '데이터 웨어하우스 설계',
    semester: 7
  },
  {
    courseId: 'CS320',
    name: '네트워크프로그래밍',
    credits: 3,
    professor: '임교수',
    schedule: '화목 14:00-15:30',
    prerequisites: ['CS204'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '네트워크 프로그래밍',
    semester: 6
  },
  {
    courseId: 'AI410',
    name: '자율주행기술',
    credits: 3,
    professor: '정교수',
    schedule: '월수 11:00-12:30',
    prerequisites: ['AI402', 'AI303'],
    difficulty: 5,
    workload: 5,
    type: '전선',
    description: '자율주행 시스템',
    semester: 8
  },
  {
    courseId: 'CS321',
    name: '사이버보안실무',
    credits: 3,
    professor: '강교수',
    schedule: '화목 15:00-16:30',
    prerequisites: ['CS302'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '보안 실무 프로젝트',
    semester: 8
  },
  {
    courseId: 'BE311',
    name: '실시간통신',
    credits: 3,
    professor: '서교수',
    schedule: '월수 14:00-15:30',
    prerequisites: ['BE301'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: 'WebSocket 등',
    semester: 6
  },
  {
    courseId: 'DS311',
    name: '스트림처리',
    credits: 3,
    professor: '윤교수',
    schedule: '화목 09:00-10:30',
    prerequisites: ['DS305'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '스트림 데이터 처리',
    semester: 8
  },
  {
    courseId: 'CS322',
    name: '고성능컴퓨팅',
    credits: 3,
    professor: '이교수',
    schedule: '월수 10:00-11:30',
    prerequisites: ['CS308'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: 'HPC 시스템',
    semester: 7
  },
  {
    courseId: 'AI411',
    name: '메타러닝',
    credits: 3,
    professor: '최교수',
    schedule: '화목 13:00-14:30',
    prerequisites: ['AI302'],
    difficulty: 5,
    workload: 5,
    type: '전선',
    description: '메타러닝 기법',
    semester: 8
  },
  {
    courseId: 'GEN108',
    name: '디자인씽킹',
    credits: 2,
    professor: '박교수',
    schedule: '수 14:00-16:00',
    prerequisites: [],
    difficulty: 2,
    workload: 2,
    type: '교양',
    description: '디자인 사고',
    semester: 6
  },
  {
    courseId: 'CS323',
    name: '소프트웨어아키텍처',
    credits: 3,
    professor: '강교수',
    schedule: '월수 12:00-13:30',
    prerequisites: ['CS203'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '소프트웨어 아키텍처 설계',
    semester: 6
  },
  {
    courseId: 'BE312',
    name: '이벤트드리븐아키텍처',
    credits: 3,
    professor: '서교수',
    schedule: '화목 11:00-12:30',
    prerequisites: ['BE304'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: 'EDA 설계',
    semester: 7
  },
  {
    courseId: 'DS312',
    name: '데이터레이크',
    credits: 3,
    professor: '한교수',
    schedule: '월수 15:00-16:30',
    prerequisites: ['DS310'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '데이터 레이크 구축',
    semester: 8
  },
  
  // 추가 과목들 (더 많은 데이터)
  {
    courseId: 'CS324',
    name: '분산데이터베이스',
    credits: 3,
    professor: '임교수',
    schedule: '화목 12:00-13:30',
    prerequisites: ['DS301'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '분산 데이터베이스 시스템',
    semester: 7
  },
  {
    courseId: 'BE313',
    name: '모니터링시스템',
    credits: 3,
    professor: '서교수',
    schedule: '월수 13:00-14:30',
    prerequisites: ['BE302'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: '시스템 모니터링 도구',
    semester: 6
  },
  {
    courseId: 'AI412',
    name: '페더러닝',
    credits: 3,
    professor: '최교수',
    schedule: '화목 14:00-15:30',
    prerequisites: ['AI302'],
    difficulty: 5,
    workload: 5,
    type: '전선',
    description: '연합 학습 기법',
    semester: 8
  },
  {
    courseId: 'CS325',
    name: '사이버공격분석',
    credits: 3,
    professor: '강교수',
    schedule: '월수 14:00-15:30',
    prerequisites: ['CS302'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '사이버 공격 분석 기법',
    semester: 7
  },
  {
    courseId: 'DS313',
    name: '데이터거래',
    credits: 3,
    professor: '한교수',
    schedule: '화목 11:00-12:30',
    prerequisites: ['DS301'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: '데이터 거래 플랫폼',
    semester: 6
  },
  {
    courseId: 'BE314',
    name: '엣지컴퓨팅',
    credits: 3,
    professor: '서교수',
    schedule: '월수 15:00-16:30',
    prerequisites: ['BE302'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '엣지 컴퓨팅 시스템',
    semester: 8
  },
  {
    courseId: 'CS326',
    name: '양자암호학',
    credits: 3,
    professor: '이교수',
    schedule: '화목 09:00-10:30',
    prerequisites: ['CS302'],
    difficulty: 5,
    workload: 5,
    type: '전선',
    description: '양자 암호 기법',
    semester: 8
  },
  {
    courseId: 'AI413',
    name: '신경망최적화',
    credits: 3,
    professor: '정교수',
    schedule: '월수 11:00-12:30',
    prerequisites: ['AI302'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '신경망 최적화 기법',
    semester: 7
  },
  {
    courseId: 'CS327',
    name: '소프트웨어품질관리',
    credits: 3,
    professor: '박교수',
    schedule: '화목 13:00-14:30',
    prerequisites: ['CS203'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: '소프트웨어 품질 관리',
    semester: 6
  },
  {
    courseId: 'BE315',
    name: 'API게이트웨이',
    credits: 3,
    professor: '서교수',
    schedule: '월수 12:00-13:30',
    prerequisites: ['BE304'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: 'API 게이트웨이 설계',
    semester: 7
  },
  {
    courseId: 'DS314',
    name: '데이터프라이버시',
    credits: 3,
    professor: '윤교수',
    schedule: '화목 10:00-11:30',
    prerequisites: ['DS301'],
    difficulty: 3,
    workload: 3,
    type: '전선',
    description: '데이터 프라이버시 보호',
    semester: 5
  },
  {
    courseId: 'CS328',
    name: '사이버위협대응',
    credits: 3,
    professor: '강교수',
    schedule: '월수 16:00-17:30',
    prerequisites: ['CS302'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '사이버 위협 대응 전략',
    semester: 8
  },
  {
    courseId: 'AI414',
    name: '자동화학습',
    credits: 3,
    professor: '최교수',
    schedule: '화목 15:00-16:30',
    prerequisites: ['AI301'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: 'AutoML 기법',
    semester: 7
  },
  {
    courseId: 'BE316',
    name: '서비스메시',
    credits: 3,
    professor: '서교수',
    schedule: '월수 10:00-11:30',
    prerequisites: ['BE304'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '서비스 메시 아키텍처',
    semester: 8
  },
  {
    courseId: 'CS329',
    name: '디지털트윈',
    credits: 3,
    professor: '임교수',
    schedule: '화목 11:00-12:30',
    prerequisites: ['CS305'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '디지털 트윈 기술',
    semester: 7
  },
  {
    courseId: 'DS315',
    name: '데이터거버넌스실무',
    credits: 3,
    professor: '한교수',
    schedule: '월수 14:00-15:30',
    prerequisites: ['DS309'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '데이터 거버넌스 실무',
    semester: 8
  },
  {
    courseId: 'GEN109',
    name: '창업실무',
    credits: 2,
    professor: '김교수',
    schedule: '금 10:00-12:00',
    prerequisites: [],
    difficulty: 2,
    workload: 2,
    type: '교양',
    description: '창업 실무',
    semester: 7
  },
  {
    courseId: 'CS330',
    name: '사이버물리보안',
    credits: 3,
    professor: '강교수',
    schedule: '화목 16:00-17:30',
    prerequisites: ['CS318', 'CS302'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: 'CPS 보안',
    semester: 8
  },
  {
    courseId: 'AI415',
    name: '설명가능한AI',
    credits: 3,
    professor: '정교수',
    schedule: '월수 15:00-16:30',
    prerequisites: ['AI302'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: 'XAI 기법',
    semester: 8
  },
  {
    courseId: 'BE317',
    name: '클라우드네이티브',
    credits: 3,
    professor: '서교수',
    schedule: '화목 12:00-13:30',
    prerequisites: ['BE309'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '클라우드 네이티브 개발',
    semester: 8
  },
  {
    courseId: 'CS331',
    name: '사이버레질리언스',
    credits: 3,
    professor: '이교수',
    schedule: '월수 11:00-12:30',
    prerequisites: ['CS302'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '사이버 복원력',
    semester: 7
  },
  {
    courseId: 'DS316',
    name: '데이터오케스트레이션',
    credits: 3,
    professor: '윤교수',
    schedule: '화목 13:00-14:30',
    prerequisites: ['DS305'],
    difficulty: 4,
    workload: 4,
    type: '전선',
    description: '데이터 오케스트레이션',
    semester: 8
  }
];

// Mock tracks
export const mockTracks: Track[] = [
  {
    trackId: 'ai',
    name: 'AI/ML',
    description: '인공지능 및 머신러닝 전문가 양성',
    requiredCourses: ['COSE214', 'COSE361', 'COSE362', 'COSE474'],
    optionalCourses: ['COSE475', 'COSE382', 'COSE371'],
    fitScore: 85,
    workFocus: '머신러닝 모델을 설계·학습시키고 데이터 파이프라인을 통해 예측·분류 문제를 해결합니다.',
    aptitudeTraits: ['수학/통계에 강함', '새로운 연구 트렌드 학습을 즐김', '실험과 튜닝에 인내심이 있음', '데이터 기반 의사결정을 선호']
  },
  {
    trackId: 'data',
    name: 'Data Science',
    description: '데이터 과학 및 분석 전문가',
    requiredCourses: ['COSE371', 'COSE372', 'COSE361', 'COSE362'],
    optionalCourses: ['COSE474', 'COSE382', 'COSE436'],
    fitScore: 75,
    workFocus: '대규모 데이터를 수집·정제·시각화하고 분석 모델로 비즈니스 인사이트를 만들어냅니다.',
    aptitudeTraits: ['문제 정의에 능숙', '데이터 해석과 스토리텔링을 좋아함', '도메인 지식 학습을 즐김', '커뮤니케이션이 원활']
  },
  {
    trackId: 'backend',
    name: 'Backend',
    description: '백엔드 개발 전문가',
    requiredCourses: ['COSE352', 'COSE341', 'COSE342', 'COSE371'],
    optionalCourses: ['COSE214', 'COSE444', 'COSE457'],
    fitScore: 70,
    workFocus: '서비스 로직과 API를 설계하고 데이터베이스·인프라를 구성해 안정적인 시스템을 만듭니다.',
    aptitudeTraits: ['논리적 설계 능력', '디버깅과 최적화를 즐김', '안정성/확장성에 관심', '팀과의 협업을 선호']
  },
  {
    trackId: 'security',
    name: 'Security',
    description: '정보보안 전문가',
    requiredCourses: ['COSE214', 'COSE354', 'COSE342'],
    optionalCourses: ['COSE484', 'COSE322'],
    fitScore: 60,
    workFocus: '시스템과 네트워크의 취약점을 진단하고 보안 정책·대응 체계를 설계합니다.',
    aptitudeTraits: ['위험 감지에 민감', '세밀한 분석을 즐김', '윤리 의식이 확고', '모의침투 등 탐구심이 강함']
  }
];

export const mockCrossMajors: CrossMajorOption[] = [
  {
    id: 'biz',
    rank: 1,
    emoji: '🥇',
    title: '경영 · 경제 (상경계열)',
    majors: ['경영학', '경제학', '글로벌비즈니스'],
    keywords: ['IT + 비즈니스', '기획', '창업', 'PM'],
    reason:
      '정보대에서 개발 역량을 다지고 상경 계열에서 돈의 흐름·조직·비즈니스 구조를 배우면 서비스 기획, 프로덕트 매니저, 창업 분야로 확장하기 좋습니다.',
    schedulePatterns: [
      {
        phase: '1~2학년 초',
        details: [
          '정보대: 자료구조, 알고리즘, 운영체제, 데이터베이스 등 전필 위주로 기초 다지기',
          '상경: 경영학원론, 회계원리, 경제학원론 등 입문 과목으로 비즈니스 기본 개념 쌓기'
        ]
      },
      {
        phase: '2학년 후반~3학년',
        details: [
          '상경: 마케팅, 재무관리, 조직행동론, 경영통계 등 심화 과목 이수',
          '정보대: 웹/앱, AI, 데이터 과목을 병행하며 기획 가능한 개발 역량 확보'
        ]
      },
      {
        phase: '4학년',
        details: [
          '캡스톤·프로젝트 과목을 비즈니스 모델/창업 과목과 묶어 실전 프로젝트 진행',
          '스타트업, PM 트랙을 노리는 학생들이 이 조합으로 포트폴리오 구성'
        ]
      }
    ],
    comboExamples: ['백엔드 + 서비스 기획', '데이터 분석 + 비즈니스 인사이트'],
    trackMatches: ['backend', 'data', 'ai']
  },
  {
    id: 'data-science',
    rank: 2,
    emoji: '🥈',
    title: '통계 · 데이터사이언스 · 산업공학',
    majors: ['통계학', '데이터사이언스', '산업공학'],
    keywords: ['데이터 과학', '머신러닝', '분석', '최적화'],
    reason:
      '정보대에서 AI·데이터 과목을 들으면서 통계/산공에서 이론·실험 설계·최적화를 배우면 데이터 사이언티스트와 ML 엔지니어 직무에 강점을 가질 수 있습니다.',
    schedulePatterns: [
      {
        phase: '1~2학년',
        details: [
          '통계/산공: 확률과 통계, 선형대수, 통계학입문, 공업수학 등 수학·통계 기초 선이수',
          '정보대: 프로그래밍 입문, 자료구조, 객체지향, 컴퓨터구조 등 필수 과목 이수'
        ]
      },
      {
        phase: '2~3학년',
        details: [
          '통계: 회귀분석, 시계열, 실험계획법 등 분석 과목 집중',
          '정보대: 머신러닝, 데이터마이닝, 인공지능, 빅데이터 처리 등 실무 과목 병행'
        ]
      },
      {
        phase: '3~4학년',
        details: [
          '데이터 분석 프로젝트/논문 형태로 통계 방법론 + 구현력을 합친 팀프로젝트 진행',
          '인턴·취업용 포트폴리오에 Python·ML·회귀/실험 설계 역량을 강조하기 좋음'
        ]
      }
    ],
    comboExamples: ['Python + ML + 회귀/실험 설계', '데이터 기반 의사결정 프로젝트'],
    trackMatches: ['ai', 'data']
  },
  {
    id: 'ux',
    rank: 3,
    emoji: '🥉',
    title: '심리 · 언론정보 · 디자인(콘텐츠)',
    majors: ['심리학', '언론정보', '콘텐츠디자인'],
    keywords: ['UX/UI', 'HCI', '서비스·콘텐츠 기획'],
    reason:
      '정보대에서 만드는 법(How)을, 인문·사회/디자인에서 사용자의 Why를 배우면 UX 디자이너·서비스 기획·콘텐츠 기획 포지션으로 강점이 생깁니다.',
    schedulePatterns: [
      {
        phase: '1~2학년',
        details: [
          '정보대: 기초 코딩, 자료구조, 웹/모바일 입문으로 구현 기반 만들기',
          '심리: 심리학개론, 인지/사회/소비자 심리, 언론/디자인: 미디어 개론, 색채학, 인터페이스 기초'
        ]
      },
      {
        phase: '3~4학년',
        details: [
          '정보대: HCI, 모바일 UX, 인터랙션 디자인, 웹/앱 프로젝트 확대',
          '복수전공: UX 리서치, 사용자 조사, 콘텐츠 기획, 브랜딩 과목으로 리서치 스킬 강화'
        ]
      }
    ],
    comboExamples: ['프로토타입 구현 + UX 리서치', '콘텐츠 기획 + 인터랙션 디자인'],
    trackMatches: ['backend', 'data']
  },
  {
    id: 'security-major',
    rank: 1,
    emoji: '🔒',
    title: '법학 · 경찰행정학',
    majors: ['법학', '경찰행정학', '행정학'],
    keywords: ['사이버보안법', '디지털 포렌식', '정보보호 정책'],
    reason:
      '정보대에서 보안 기술을 배우고 법학/경찰행정에서 법률·정책·수사 기법을 익히면 사이버보안 전문가, 디지털 포렌식 전문가, 정보보호 정책 수립자로 활동할 수 있습니다.',
    schedulePatterns: [
      {
        phase: '1~2학년',
        details: [
          '정보대: 자료구조, 알고리즘, 컴퓨터구조, 네트워크 등 전필 위주로 기초 다지기',
          '법학/경찰: 헌법, 형법, 행정법 기초, 정보보호법 등 입문 과목으로 법률 기초 쌓기'
        ]
      },
      {
        phase: '2~3학년',
        details: [
          '정보대: 정보보호, 시스템프로그래밍, 네트워크 보안 등 보안 심화 과목 이수',
          '법학/경찰: 사이버범죄법, 디지털 증거법, 정보보호 정책 등 전문 과목 병행'
        ]
      },
      {
        phase: '3~4학년',
        details: [
          '보안 사고 분석·포렌식 프로젝트를 법률·정책 관점에서 접근하는 실전 프로젝트 진행',
          '사이버보안 컨설팅, 포렌식 전문가, 정보보호 정책 수립자 포지션으로 취업 가능'
        ]
      }
    ],
    comboExamples: ['보안 기술 + 사이버범죄법', '디지털 포렌식 + 증거법'],
    trackMatches: ['security']
  },
  {
    id: 'ai-math',
    rank: 2,
    emoji: '📐',
    title: '수학 · 통계학',
    majors: ['수학', '통계학', '응용수학'],
    keywords: ['수학적 모델링', '알고리즘 이론', '최적화 이론'],
    reason:
      '정보대에서 AI/ML 실무를 배우고 수학/통계에서 이론적 기반을 다지면 연구직 AI 엔지니어, 알고리즘 연구원, 수학적 모델링 전문가로 성장할 수 있습니다.',
    schedulePatterns: [
      {
        phase: '1~2학년',
        details: [
          '수학/통계: 미적분, 선형대수, 확률론, 통계학 등 수학 기초 과목 선이수',
          '정보대: 프로그래밍, 자료구조, 알고리즘, 이산수학 등 전필 위주로 기초 다지기'
        ]
      },
      {
        phase: '2~3학년',
        details: [
          '수학/통계: 수치해석, 최적화 이론, 확률과정, 통계적 추론 등 심화 과목 이수',
          '정보대: 인공지능, 기계학습, 딥러닝, 확률및랜덤과정 등 AI/ML 실무 과목 병행'
        ]
      },
      {
        phase: '3~4학년',
        details: [
          '수학적 모델링과 AI 알고리즘을 결합한 연구 프로젝트 또는 논문 작성',
          '연구소, 대학원 진학, 알고리즘 연구원 포지션으로 진로 확장 가능'
        ]
      }
    ],
    comboExamples: ['딥러닝 + 최적화 이론', '확률 모델 + 머신러닝'],
    trackMatches: ['ai']
  },
  {
    id: 'backend-infra',
    rank: 2,
    emoji: '⚙️',
    title: '전기전자공학 · 산업공학',
    majors: ['전기전자공학', '산업공학', '시스템공학'],
    keywords: ['인프라 설계', '시스템 최적화', '하드웨어 이해'],
    reason:
      '정보대에서 백엔드 개발을 배우고 전기전자/산업공학에서 하드웨어·시스템 설계를 익히면 임베디드 시스템, IoT, 인프라 설계 전문가로 활동할 수 있습니다.',
    schedulePatterns: [
      {
        phase: '1~2학년',
        details: [
          '전기전자/산공: 회로이론, 전자기학, 공학수학 등 기초 과목 선이수',
          '정보대: 자료구조, 알고리즘, 컴퓨터구조, 운영체제 등 전필 위주로 기초 다지기'
        ]
      },
      {
        phase: '2~3학년',
        details: [
          '전기전자/산공: 마이크로프로세서, 제어시스템, 시스템 설계 등 심화 과목 이수',
          '정보대: 시스템프로그래밍, 네트워크, 클라우드컴퓨팅 등 백엔드 심화 과목 병행'
        ]
      },
      {
        phase: '3~4학년',
        details: [
          '임베디드 시스템, IoT 프로젝트, 인프라 설계 프로젝트 등 실전 프로젝트 진행',
          '임베디드 개발자, IoT 전문가, 인프라 설계자 포지션으로 취업 가능'
        ]
      }
    ],
    comboExamples: ['백엔드 + 임베디드 시스템', '클라우드 + 하드웨어 제어'],
    trackMatches: ['backend']
  }
];

