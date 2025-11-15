// Course types
import {MajorProps} from "./major.ts";

export type CourseType = 'MAJOR_REQUIRED' | 'MAJOR_ELECTIVE' | '교양';

export interface CompletedCourse {
  courseId: string;
  courseName: string;
  grade: string;
  type: CourseType;
  credits: number;
  semester: string;
}

export interface Course {
  id: string;
  courseCode: string;
  name: string;
  major: MajorProps | undefined | null;
  creditType: CourseType;
  credits: number;
  competitionRate: number;
  easinessScore: number;
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
  workFocus?: string;
  aptitudeTraits?: string[];
}

export interface CrossMajorSchedulePattern {
  phase: string;
  details: string[];
}

export interface CrossMajorOption {
  id: string;
  rank: number;
  emoji: string;
  title: string;
  majors: string[];
  keywords: string[];
  reason: string;
  schedulePatterns: CrossMajorSchedulePattern[];
  comboExamples: string[];
  trackMatches: string[];
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

