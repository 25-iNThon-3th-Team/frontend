import axiosInstance from './axios'

// API 응답 타입 정의
export interface ApiTimetable {
  id: number
  name: string
  grade: number
  year: string
  semester: number
  isActive: boolean
  totalCredits: number
  createdAt: string
  updatedAt: string
  classes: ApiClass[]
}

export interface ApiClass {
  id: number
  classCode: string
  professorName: string
  schedule: ApiSchedule[]
  course: {
    courseCode: string
    name: string
    credits: number
    creditType: 'MAJOR_REQUIRED' | 'MAJOR_ELECTIVE' | 'LIBERAL'
  }
}

export interface ApiSchedule {
  day: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'
  start: string
  end: string
  location?: string
}

export interface ApiUser {
  grade: number
  semester: number
}

export interface CreateTimetablePayload {
  name: string
  grade: number
  year: string
  isActive: boolean
  classIds: number[]
  semester: number
}

export interface UpdateTimetablePayload {
  name?: string
  grade?: number
  year?: string
  isActive?: boolean
  classIds?: number[]
  semester?: number
}

export interface GenerateTimetablePayload {
  plainTextInput: string
}

// 시간표 API
export const scheduleApi = {
  // 내 시간표 목록 조회
  getMyTimetables: async (): Promise<ApiTimetable[]> => {
    try {
      const response = await axiosInstance.get<ApiTimetable[]>('/api/timetables/me')
      return response.data || []
    } catch (error) {
      throw new Error('시간표 목록을 불러오는데 실패했습니다.')
    }
  },

  // 시간표 생성
  createTimetable: async (payload: CreateTimetablePayload): Promise<ApiTimetable> => {
    try {
      const response = await axiosInstance.post<ApiTimetable>('/api/timetables', payload)
      return response.data
    } catch (error) {
      throw new Error('시간표 생성에 실패했습니다.')
    }
  },

  // 시간표 수정
  updateTimetable: async (timetableId: number, payload: UpdateTimetablePayload): Promise<ApiTimetable> => {
    try {
      const response = await axiosInstance.put<ApiTimetable>(`/api/timetables/${timetableId}`, payload)
      return response.data
    } catch (error) {
      throw new Error('시간표 수정에 실패했습니다.')
    }
  },

  // 시간표 삭제
  deleteTimetable: async (timetableId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/timetables/${timetableId}`)
    } catch (error) {
      throw new Error('시간표 삭제에 실패했습니다.')
    }
  },

  // 시간표에서 과목 삭제
  deleteClassFromTimetable: async (timetableId: number, classId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`/api/timetables/${timetableId}/classes/${classId}`)
    } catch (error) {
      throw new Error('과목 삭제에 실패했습니다.')
    }
  },

  // AI 시간표 생성
  generateTimetables: async (payload: GenerateTimetablePayload): Promise<ApiTimetable[]> => {
    try {
      const response = await axiosInstance.post<ApiTimetable[]>('/api/timetables/generate', payload)
      return response.data || []
    } catch (error) {
      throw new Error('시간표 생성에 실패했습니다.')
    }
  }
}

// 과목 API
export const classesApi = {
  // 과목 목록 조회
  getClasses: async (): Promise<ApiClass[]> => {
    try {
      const response = await axiosInstance.get<ApiClass[]>('/api/classes')
      return response.data || []
    } catch (error) {
      throw new Error('과목 목록을 불러오는데 실패했습니다.')
    }
  }
}

// 사용자 API
export const userApi = {
  // 내 정보 조회
  getMyInfo: async (): Promise<ApiUser> => {
    try {
      const response = await axiosInstance.get<ApiUser>('/api/users/me')
      return response.data
    } catch (error) {
      throw new Error('사용자 정보를 불러오는데 실패했습니다.')
    }
  }
}

