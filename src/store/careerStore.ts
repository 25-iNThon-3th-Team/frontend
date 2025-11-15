import { create } from 'zustand';
import { CompletedCourse, Course, Track, StudentConnection } from '../types/career';

interface CareerState {
  completedCourses: CompletedCourse[];
  allCourses: Course[];
  tracks: Track[];
  selectedTrack: Track | null;
  studentConnections: StudentConnection[];
  
  // Actions
  setCompletedCourses: (courses: CompletedCourse[]) => void;
  setAllCourses: (courses: Course[]) => void;
  setTracks: (tracks: Track[]) => void;
  selectTrack: (track: Track | null) => void;
  setStudentConnections: (connections: StudentConnection[]) => void;
  
  // Computed
  getTotalCredits: () => number;
  getCompletedCourseIds: () => string[];
  getRecommendedTracks: () => Track[];
}

export const useCareerStore = create<CareerState>((set, get) => ({
  completedCourses: [],
  allCourses: [],
  tracks: [],
  selectedTrack: null,
  studentConnections: [],

  setCompletedCourses: (courses) => set({ completedCourses: courses }),
  setAllCourses: (courses) => set({ allCourses: courses }),
  setTracks: (tracks) => set({ tracks }),
  selectTrack: (track) => set({ selectedTrack: track }),
  setStudentConnections: (connections) => set({ studentConnections: connections }),

  getTotalCredits: () => {
    return get().completedCourses.reduce((sum, course) => sum + course.credits, 0);
  },

  getCompletedCourseIds: () => {
    return get().completedCourses.map(course => course.courseId);
  },

  getRecommendedTracks: () => {
    const { tracks } = get();
    return [...tracks].sort((a, b) => (b.fitScore || 0) - (a.fitScore || 0)).slice(0, 4);
  }
}));

