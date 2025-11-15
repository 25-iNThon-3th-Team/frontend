import axiosInstance from './axios';

// API 응답 타입 정의
export interface ClassSchedule {
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  start: string; // "16:30"
  end: string;   // "17:45"
  location: string;
}

export interface Major {
  id: string;
  code: string;
  name: string;
}

export interface Course {
  id: string;
  courseCode: string;
  name: string;
  major: Major;
  creditType: 'MAJOR_REQUIRED' | 'MAJOR_ELECTIVE' | 'GENERAL';
  credits: number;
  targetGrade: number | null;
  competitionRate: number;
  easinessScore: number;
}

export interface ClassResponse {
  id: string;
  course: Course;
  classCode: string;
  professorName: string;
  schedule: ClassSchedule[];
  totalSeats: number;
}

// 기존 Course 타입으로 변환 (Schedule.jsx에서 사용하는 형식)
export interface ConvertedCourse {
  courseId: string;
  name: string;
  credits: number;
  professor: string;
  schedule: string;
  type: '전필' | '전선' | '교양';
  location: string;
  difficulty?: number;
  workload?: number;
  grade?: number;
  enrollment?: number;
  capacity?: number;
  description?: string;
  prerequisites?: string[];
  semester?: number;
}

// API 응답을 기존 형식으로 변환하는 함수
export const convertClassToCourse = (classData: ClassResponse): ConvertedCourse => {
  // 요일 매핑: MON -> 월, TUE -> 화, etc.
  const dayMap: Record<string, string> = {
    'MON': '월',
    'TUE': '화',
    'WED': '수',
    'THU': '목',
    'FRI': '금',
    'SAT': '토',
    'SUN': '일',
  };

  // schedule 배열을 문자열로 변환: "월수 10:00-11:30"
  const scheduleStr = classData.schedule
    .map(s => {
      const day = dayMap[s.day] || s.day;
      return `${day} ${s.start}-${s.end}`;
    })
    .join(' ');

  // creditType을 기존 형식으로 변환
  const typeMap: Record<string, '전필' | '전선' | '교양'> = {
    'MAJOR_REQUIRED': '전필',
    'MAJOR_ELECTIVE': '전선',
    'GENERAL': '교양',
  };

  // 첫 번째 스케줄의 location 사용
  const location = classData.schedule[0]?.location || '';

  return {
    courseId: `${classData.course.courseCode}-${classData.classCode}`, // 예: "COSE211-01"
    name: classData.course.name,
    credits: classData.course.credits,
    professor: classData.professorName,
    schedule: scheduleStr,
    type: typeMap[classData.course.creditType] || '전선',
    location: location,
    difficulty: classData.course.easinessScore,
    grade: classData.course.targetGrade || undefined,
    capacity: classData.totalSeats,
    // 추가 필드들 (API에 없으면 undefined)
    enrollment: undefined,
    description: undefined,
    prerequisites: undefined,
    semester: undefined,
    workload: undefined,
  };
};

// Classes API
export const classesApi = {
  /**
   * Get all classes
   * GET /api/classes
   * 
   * Swagger: curl -X GET http://inthon.fjey.me:8080/api/classes -H accept: application/json
   * 
   * @returns {Promise<ClassResponse[]>} Array of class data
   */
  getClasses: async (): Promise<ClassResponse[]> => {
    const response = await axiosInstance.get<ClassResponse[]>('/classes', {
      headers: {
        'accept': '*/*',
      },
    });
    return response.data;
  },

  /**
   * Get all classes and convert to existing format
   * 
   * @returns {Promise<ConvertedCourse[]>} Array of converted course data
   */
  getClassesAsCourses: async (): Promise<ConvertedCourse[]> => {
    const classes = await classesApi.getClasses();
    return classes.map(convertClassToCourse);
  },
};

