// Course types
export type CourseType = '전필' | '전선' | '교양';

export interface CompletedCourse {
  courseId: string;
  courseName: string;
  grade: string;
  type: CourseType;
  credits: number;
  semester: string;
}

export interface Course {
  courseId: string;
  name: string;
  credits: number;
  professor: string;
  schedule: string;
  prerequisites: string[];
  difficulty: number; // 1-5
  workload: number; // 1-5
  type: CourseType;
  description?: string;
  reviews?: CourseReview[];
  semester?: number; // 1-8
  location?: string; // 수업 장소
  grade?: number; // 학년 (1-4)
  enrollment?: number; // 담은 수
  capacity?: number; // 정원
}

export interface CourseReview {
  rating: number;
  comment: string;
  semester: string;
}

// Track types
export interface Track {
  trackId: string;
  name: string;
  description: string;
  requiredCourses: string[]; // courseIds
  optionalCourses: string[]; // courseIds
  fitScore?: number; // 0-100
}

// Roadmap types
export interface RoadmapNode {
  id: string;
  courseId: string;
  position: { x: number; y: number };
  data: {
    course: Course;
    isCompleted: boolean;
    semester?: string;
  };
}

export interface RoadmapEdge {
  id: string;
  source: string;
  target: string;
  type?: string;
}

// Connection types
export interface StudentConnection {
  studentId: string;
  name: string;
  courseId: string;
  type: '선수강자' | '동시수강자';
  semester?: string;
}

