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
    fitScore: 85,
    workFocus: '머신러닝 모델을 설계·학습시키고 데이터 파이프라인을 통해 예측·분류 문제를 해결합니다.',
    aptitudeTraits: ['수학/통계에 강함', '새로운 연구 트렌드 학습을 즐김', '실험과 튜닝에 인내심이 있음', '데이터 기반 의사결정을 선호']
  },
  {
    trackId: 'data',
    name: 'Data Science',
    description: '데이터 과학 및 분석 전문가',
    requiredCourses: ['DS301', 'DS302', 'AI301'],
    optionalCourses: ['AI302'],
    fitScore: 75,
    workFocus: '대규모 데이터를 수집·정제·시각화하고 분석 모델로 비즈니스 인사이트를 만들어냅니다.',
    aptitudeTraits: ['문제 정의에 능숙', '데이터 해석과 스토리텔링을 좋아함', '도메인 지식 학습을 즐김', '커뮤니케이션이 원활']
  },
  {
    trackId: 'backend',
    name: 'Backend',
    description: '백엔드 개발 전문가',
    requiredCourses: ['BE301', 'BE302', 'DS301'],
    optionalCourses: ['CS201'],
    fitScore: 70,
    workFocus: '서비스 로직과 API를 설계하고 데이터베이스·인프라를 구성해 안정적인 시스템을 만듭니다.',
    aptitudeTraits: ['논리적 설계 능력', '디버깅과 최적화를 즐김', '안정성/확장성에 관심', '팀과의 협업을 선호']
  },
  {
    trackId: 'security',
    name: 'Security',
    description: '정보보안 전문가',
    requiredCourses: ['CS201', 'BE301'],
    optionalCourses: [],
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
  }
];

