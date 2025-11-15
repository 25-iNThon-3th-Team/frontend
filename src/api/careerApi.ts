import { CompletedCourse, Course, Track, StudentConnection } from '../types/career';

// API call skeletons
export const careerApi = {
  // Get completed courses
  getCompletedCourses: async (): Promise<CompletedCourse[]> => {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/courses/completed');
    // return response.json();
    return Promise.resolve([]);
  },

  // Get all courses
  getAllCourses: async (): Promise<Course[]> => {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/courses');
    // return response.json();
    return Promise.resolve([]);
  },

  // Get recommended courses
  getRecommendedCourses: async (trackId?: string): Promise<Course[]> => {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/courses/recommend?trackId=${trackId || ''}`);
    // return response.json();
    return Promise.resolve([]);
  },

  // Get recommended tracks
  getRecommendedTracks: async (): Promise<Track[]> => {
    // TODO: Replace with actual API call
    // const response = await fetch('/api/tracks/recommend');
    // return response.json();
    return Promise.resolve([]);
  },

  // Generate roadmap
  generateRoadmap: async (trackId: string): Promise<{ nodes: any[], edges: any[] }> => {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/roadmap/generate?trackId=${trackId}`);
    // return response.json();
    return Promise.resolve({ nodes: [], edges: [] });
  },

  // Get student connections for a course
  getStudentConnections: async (courseId: string): Promise<StudentConnection[]> => {
    // TODO: Replace with actual API call
    // const response = await fetch(`/api/courses/${courseId}/connections`);
    // return response.json();
    return Promise.resolve([]);
  }
};

