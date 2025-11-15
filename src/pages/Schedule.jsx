import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import '../App.css'
import { mockCourses } from '../data/mockData'

const LOCAL_STORAGE_KEY = 'inthon-saved-schedules'

const AI_THEMES = [
  {
    id: 'ai-depth',
    label: '심화',
    description: '머신러닝·딥러닝 중심 구성',
    accent: '#6b5bff'
  },
  {
    id: 'backend',
    label: '백엔드 집중',
    description: '서버·네트워크 역량 강화',
    accent: '#2563eb'
  },
  {
    id: 'data',
    label: '데이터 크래프트',
    description: '데이터·분석 프로젝트형',
    accent: '#0ea5e9'
  },
  {
    id: 'balance',
    label: '균형 잡힌 커리큘럼',
    description: '전필·전선 밸런스',
    accent: '#38a169'
  },
  {
    id: 'light',
    label: '부담 완화 플랜',
    description: '난이도와 학점을 슬림하게',
    accent: '#dd6b20'
  }
]

const DAY_PATTERN = /([월화수목금토일]+)\s*(\d{2}:\d{2})-(\d{2}:\d{2})/
const DAY_LABELS = ['월', '화', '수', '목', '금']
const GRID_DEFAULT_START = 9 * 60
const GRID_DEFAULT_END = 18 * 60
const GRID_MINUTES_STEP = 30
const MINUTES_PER_PIXEL = 1.1
const MIN_GRID_SPAN = 5 * 60

const parseTimeToMinutes = (timeText = '') => {
  const [hour = '0', minute = '0'] = timeText.split(':')
  return Number(hour) * 60 + Number(minute)
}

const parseCourseSlots = (scheduleText = '') => {
  const match = scheduleText.match(DAY_PATTERN)
  if (!match) return []

  const [, days, startText, endText] = match
  const start = parseTimeToMinutes(startText)
  const end = parseTimeToMinutes(endText)

  return Array.from(days).map((day) => ({
    day,
    start,
    end
  }))
}

const enrichCourse = (course) => ({
  ...course,
  slots: Array.isArray(course.slots) ? course.slots : parseCourseSlots(course.schedule || '')
})

const hasTimeConflict = (selectedCourses, candidate) => {
  if (!candidate.slots?.length) return false

  return selectedCourses.some((course) =>
    course.slots?.some((slot) =>
      candidate.slots.some(
        (candidateSlot) =>
          slot.day === candidateSlot.day &&
          !(slot.end <= candidateSlot.start || candidateSlot.end <= slot.start)
      )
    )
  )
}

const shuffleArray = (array) => {
  const cloned = [...array]
  for (let i = cloned.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cloned[i], cloned[j]] = [cloned[j], cloned[i]]
  }
  return cloned
}

const formatTimestamp = (isoString) => {
  if (!isoString) return '방금 생성'
  const date = new Date(isoString)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')
  return `${month}월 ${day}일 ${hour}:${minute}`
}

const getSemesterLabel = (customSemester = null) => {
  if (customSemester) {
    return customSemester
  }
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1 // 1-12
  
  // 3-8월: 1학기, 9-2월: 2학기
  if (month >= 3 && month <= 8) {
    return `${year}-1`
  } else if (month >= 9) {
    return `${year}-2`
  } else {
    // 1-2월은 전년도 2학기
    return `${year - 1}-2`
  }
}

const loadSavedSchedules = () => {
  if (typeof window === 'undefined') return []
  try {
    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []
    return parsed.map((schedule) => {
      const courses = (schedule.courses || []).map((course) => enrichCourse(course))
      const summary = summariseCourses(courses)
      return {
        ...schedule,
        courses,
        ...summary,
        signature: schedule.signature || signatureFromCourses(courses)
      }
    })
  } catch (error) {
    console.error('Failed to load saved schedules', error)
    return []
  }
}

const matchesTheme = (themeId, course) => {
  if (!course) return false
  switch (themeId) {
    case 'ai-depth':
      return course.courseId?.startsWith('AI') || course.description?.includes('머신')
    case 'backend':
      return (
        course.courseId?.startsWith('BE') ||
        course.description?.includes('서버') ||
        course.description?.includes('네트워크')
      )
    case 'data':
      return (
        course.courseId?.startsWith('DS') || course.description?.includes('데이터') || course.description?.includes('분석')
      )
    case 'balance':
      return course.type === '전필'
    case 'light':
      return (course.difficulty || 3) <= 3
    default:
      return false
  }
}

const getCourseColor = (courseId = '') => {
  // courseId를 해시하여 색상 생성
  let hash = 0
  for (let i = 0; i < courseId.length; i++) {
    hash = courseId.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  // 색상 팔레트 (밝고 구분하기 쉬운 색상들)
  const colors = [
    { bg: 'rgba(74, 144, 226, 0.92)', border: 'rgba(74, 144, 226, 0.3)' }, // 파란색
    { bg: 'rgba(244, 152, 62, 0.92)', border: 'rgba(244, 152, 62, 0.3)' }, // 주황색
    { bg: 'rgba(77, 182, 172, 0.92)', border: 'rgba(77, 182, 172, 0.3)' }, // 청록색
    { bg: 'rgba(139, 92, 246, 0.92)', border: 'rgba(139, 92, 246, 0.3)' }, // 보라색
    { bg: 'rgba(236, 72, 153, 0.92)', border: 'rgba(236, 72, 153, 0.3)' }, // 분홍색
    { bg: 'rgba(34, 197, 94, 0.92)', border: 'rgba(34, 197, 94, 0.3)' }, // 초록색
    { bg: 'rgba(251, 146, 60, 0.92)', border: 'rgba(251, 146, 60, 0.3)' }, // 주황색2
    { bg: 'rgba(59, 130, 246, 0.92)', border: 'rgba(59, 130, 246, 0.3)' }, // 파란색2
    { bg: 'rgba(168, 85, 247, 0.92)', border: 'rgba(168, 85, 247, 0.3)' }, // 보라색2
    { bg: 'rgba(20, 184, 166, 0.92)', border: 'rgba(20, 184, 166, 0.3)' }, // 청록색2
  ]
  
  const index = Math.abs(hash) % colors.length
  return colors[index]
}

const signatureFromCourses = (courses = []) =>
  courses
    .map((course) => course.courseId)
    .filter(Boolean)
    .sort()
    .join('-')

const summariseCourses = (courses = []) => {
  const requiredCount = courses.filter((course) => course.type === '전필').length
  return {
    totalCredits: calculateCredits(courses),
    requiredCount,
    electiveCount: courses.length - requiredCount
  }
}

const calculateCredits = (courses = []) =>
  courses.reduce((sum, course) => sum + (Number(course.credits) || 0), 0)

const mergeCoursesForTheme = (theme, courses) => {
  const preferred = []
  const others = []

  courses.forEach((course) => {
    if (matchesTheme(theme.id, course)) {
      preferred.push(course)
    } else {
      others.push(course)
    }
  })

  return [...shuffleArray(preferred), ...shuffleArray(others)]
}

const describeTheme = (themeId) => {
  switch (themeId) {
    case 'ai-depth':
      return '심화 필수 과목을 우선 배치했어요.'
    case 'backend':
      return '백엔드 역량을 넓힐 수 있도록 서버·네트워크 과목을 중심으로 구성했어요.'
    case 'data':
      return '데이터 분석 프로젝트에 바로 투입할 수 있는 조합이에요.'
    case 'balance':
      return '전필과 전선을 균형 있게 섞어 학점과 난이도를 모두 챙겼어요.'
    case 'light':
      return '난이도는 낮추고, 학점은 필요한 만큼만 채운 플랜이에요.'
    default:
      return '학습 패턴을 분석해 최적의 조합을 제안했어요.'
  }
}

const minutesToClock = (minutes) => {
  const hour = Math.floor(minutes / 60)
  const minute = minutes % 60
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

const computeGridRange = (courses = []) => {
  const slots = courses.flatMap((course) => course.slots || [])
  if (!slots.length) {
    return { start: GRID_DEFAULT_START, end: GRID_DEFAULT_END }
  }
  const minStart = Math.min(...slots.map((slot) => slot.start))
  const maxEnd = Math.max(...slots.map((slot) => slot.end))
  let start = Math.floor(minStart / GRID_MINUTES_STEP) * GRID_MINUTES_STEP
  let end = Math.ceil(maxEnd / GRID_MINUTES_STEP) * GRID_MINUTES_STEP
  start = Math.min(start, GRID_DEFAULT_START)
  end = Math.max(end, GRID_DEFAULT_END)
  if (end - start < MIN_GRID_SPAN) {
    end = start + MIN_GRID_SPAN
  }
  return { start, end }
}

const buildHourMarks = (range) => {
  const marks = []
  for (let minutes = range.start; minutes <= range.end; minutes += 60) {
    marks.push({
      minutes,
      label: minutesToClock(minutes),
      top: (minutes - range.start) * MINUTES_PER_PIXEL
    })
  }
  return marks
}

const buildBlocksForCourses = (courses = [], rangeStart) => {
  const blocks = []
  courses.forEach((course) => {
    if (!course.slots?.length) return
    course.slots.forEach((slot) => {
      if (!DAY_LABELS.includes(slot.day)) return
      blocks.push({
        key: `${course.courseId}-${slot.day}-${slot.start}`,
        courseId: course.courseId,
        day: slot.day,
        top: (slot.start - rangeStart) * MINUTES_PER_PIXEL,
        height: Math.max(36, (slot.end - slot.start) * MINUTES_PER_PIXEL),
        name: course.name,
        type: course.type,
        professor: course.professor,
        credits: course.credits,
        location: course.location || '장소 미정',
        course: course
      })
    })
  })
  return blocks
}

const buildAiChatReply = (message = '', scheduleContext, savedCount = 0) => {
  const normalized = message.replace(/\s/g, '')
  if (!scheduleContext && savedCount === 0) {
    return '먼저 상단의 "다시 생성" 버튼을 눌러 추천 시간표를 받아보세요. 마음에 드는 조합은 저장 후 아래 캐러셀에서 확인할 수 있어요.'
  }

  if (scheduleContext) {
    if (normalized.includes('학점')) {
      return `현재 보고 있는 시간표는 총 ${scheduleContext.totalCredits}학점이에요. 필요하면 과목을 줄이거나 저장된 시간표에서 부담 완화 플랜을 편집해 보세요.`
    }
    if (normalized.includes('전필')) {
      return `이 조합에는 전필 ${scheduleContext.requiredCount}과목이 들어가 있어요. 특정 전필을 반드시 담고 싶다면 과목 이름을 알려주시면 추천에 반영할게요.`
    }
  }

  if (normalized.includes('저장')) {
    return '화살표로 원하는 시간표를 고른 뒤 "이 시간표 저장하기" 버튼을 누르면 아래 저장 목록에서 바로 편집할 수 있어요.'
  }

  if (normalized.includes('추가') || normalized.includes('삭제')) {
    return '저장된 시간표에서 "편집"을 누르면 과목 카드를 터치해 삭제하고, 아래 추가 가능한 과목 버튼으로 새로운 강의를 넣을 수 있어요.'
  }

  if (normalized.includes('가볍') || normalized.includes('쉬운') || normalized.includes('light')) {
    return '부담을 줄이고 싶다면 추천을 다시 생성한 뒤 "부담 완화 플랜" 테마를 골라보세요. 필요하면 저장 후 직접 과목을 더 삭제해도 좋아요.'
  }

  if (normalized.includes('새로') || normalized.includes('다시')) {
    return '상단의 "다시 생성" 버튼을 누르면 최신 조건으로 10개의 시간표를 다시 계산해 드릴게요.'
  }

  return '요청 내용을 기록했어요. 원하는 요일이나 시간대를 구체적으로 말해주시면 그에 맞춰 추천 또는 편집 방법을 안내해 드릴게요.'
}

const TimetableGrid = ({ courses = [], editable = false, onSelectCourse, onBlockClick }) => {
  const gridRange = useMemo(() => computeGridRange(courses), [courses])
  const hourMarks = useMemo(() => buildHourMarks(gridRange), [gridRange])
  const blocks = useMemo(() => buildBlocksForCourses(courses, gridRange.start), [courses, gridRange])
  const gridHeight = (gridRange.end - gridRange.start) * MINUTES_PER_PIXEL
  const isInteractive = editable && typeof onSelectCourse === 'function'

  return (
    <div className="timetable-grid-shell">
      <div className="timetable-head">
        <div className="time-axis-head">시간</div>
        {DAY_LABELS.map((day) => (
          <div key={day} className="day-head">
            {day}
          </div>
        ))}
      </div>
      <div className="timetable-body" style={{ height: gridHeight }}>
        <div className="time-axis">
          {hourMarks.map((mark) => (
            <div key={`axis-${mark.minutes}`} className="time-axis-item" style={{ top: mark.top }}>
              {mark.label}
            </div>
          ))}
        </div>
          {DAY_LABELS.map((day) => (
            <div key={day} className="day-column">
              {blocks
                .filter((block) => block.day === day)
                .map((block) => (
                <div
                    key={block.key}
                  className={`timetable-block ${editable ? 'is-editable' : ''}`}
                  style={{ 
                    top: block.top, 
                    height: block.height,
                    background: getCourseColor(block.courseId).bg,
                    borderColor: getCourseColor(block.courseId).border
                  }}
                  onClick={() => {
                    if (isInteractive) {
                      onSelectCourse?.(block.courseId)
                    } else {
                      onBlockClick?.(block.course)
                    }
                  }}
                  >
                    <strong>{block.name}</strong>
                  <small>{block.location}</small>
                    <small>{block.professor || `${block.credits || 3}학점`}</small>
            </div>
          ))}
        </div>
        ))}
        {hourMarks.map((mark) => (
          <div key={`line-${mark.minutes}`} className="time-grid-line" style={{ top: mark.top }} />
        ))}
      </div>
    </div>
  )
}

function Schedule() {
  const availableCourses = useMemo(() => mockCourses.map((course) => enrichCourse(course)), [])
  const [aiSchedules, setAiSchedules] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [lastGeneratedAt, setLastGeneratedAt] = useState(null)
  const [savedSchedules, setSavedSchedules] = useState(loadSavedSchedules)
  const [savedIndex, setSavedIndex] = useState(0)
  const [editingScheduleId, setEditingScheduleId] = useState(null)
  const [isSavedPanelOpen, setIsSavedPanelOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSemesterSelectOpen, setIsSemesterSelectOpen] = useState(false)
  const [selectedSemester, setSelectedSemester] = useState(null) // 선택된 학기 (예: "2025-1", "2025-여름", "2025-2", "2025-겨울")
  const [feedback, setFeedback] = useState(null)
  const menuRef = useRef(null)
  const [chatMessages, setChatMessages] = useState(() => [
    {
      id: 'ai-welcome',
      role: 'ai',
      text: '안녕하세요! 원하는 요일이나 학점 조건을 말해주시면 시간표를 더 정교하게 도와드릴게요.'
    }
  ])
  const [chatInput, setChatInput] = useState('')
  const [isChatting, setIsChatting] = useState(false)
  const chatWindowRef = useRef(null)
  const chatTimerRef = useRef(null)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('시간표')
  const [isSaveConfirmOpen, setIsSaveConfirmOpen] = useState(false)
  const [selectedScheduleDetail, setSelectedScheduleDetail] = useState(null)
  const [isDetailMenuOpen, setIsDetailMenuOpen] = useState(false)
  const [isEditingDetail, setIsEditingDetail] = useState(false)
  const detailMenuRef = useRef(null)
  const [browseSchedules, setBrowseSchedules] = useState([]) // 둘러보기용 친구들의 시간표
  const [browseIndex, setBrowseIndex] = useState(0) // 둘러보기 현재 인덱스

  const currentSchedule = aiSchedules[currentIndex]
  const currentSavedSchedule = savedSchedules[savedIndex]
  const currentBrowseSchedule = browseSchedules[browseIndex]

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedSchedules))
  }, [savedSchedules])

  useEffect(() => {
    setSavedIndex((prev) => {
      if (savedSchedules.length === 0) return 0
      const next = Math.min(prev, savedSchedules.length - 1)
      return next < 0 ? 0 : next
    })
  }, [savedSchedules])

  useEffect(() => {
    if (!currentSavedSchedule) {
      setEditingScheduleId(null)
      return
    }
    if (editingScheduleId && editingScheduleId !== currentSavedSchedule.id) {
      setEditingScheduleId(null)
    }
  }, [currentSavedSchedule, editingScheduleId])

  useEffect(() => {
    if (!chatWindowRef.current) return
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight
  }, [chatMessages, isChatting])

  useEffect(() => {
    return () => {
      if (chatTimerRef.current) {
        clearTimeout(chatTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!feedback) return
    const timer = setTimeout(() => setFeedback(null), 3200)
    return () => clearTimeout(timer)
  }, [feedback])

  useEffect(() => {
    if (savedSchedules.length === 0) {
      setIsSavedPanelOpen(false)
    }
  }, [savedSchedules])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
      if (detailMenuRef.current && !detailMenuRef.current.contains(event.target)) {
        setIsDetailMenuOpen(false)
      }
    }

    if (isMenuOpen || isDetailMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen, isDetailMenuOpen])


  const buildAiSchedules = useCallback(() => {
    const proposals = []
    const signatures = new Set()
    let attempt = 0

    while (proposals.length < 10 && attempt < 400) {
      const theme = AI_THEMES[attempt % AI_THEMES.length]
      const orderedCourses = mergeCoursesForTheme(theme, availableCourses)
      const selected = []
      const targetLength = 5 + (Math.random() > 0.4 ? 1 : 0)

      for (const course of orderedCourses) {
        if (selected.length >= targetLength) break
        if (hasTimeConflict(selected, course)) continue
        if (theme.id === 'light' && (course.difficulty || 3) > 3 && Math.random() > 0.4) continue
        selected.push(course)
      }

      if (selected.length < 4) {
        attempt += 1
        continue
      }

      const signature = signatureFromCourses(selected)
      if (signatures.has(signature)) {
        attempt += 1
        continue
      }

      signatures.add(signature)
      const courseStats = summariseCourses(selected)

      proposals.push({
        id: `ai-${Date.now()}-${attempt}`,
        label: `추천 ${proposals.length + 1}`,
        theme,
        courses: selected,
        signature,
        ...courseStats,
        summary: describeTheme(theme.id)
      })
      attempt += 1
    }

    return proposals
  }, [availableCourses])

  const generateWithAi = useCallback(() => {
    setIsGenerating(true)
    setFeedback({ type: 'info', text: '10개의 시간표를 계산하고 있어요.' })
    const generated = buildAiSchedules()
    setAiSchedules(generated)
    setCurrentIndex(0)
    setLastGeneratedAt(new Date().toISOString())
    setIsGenerating(false)
    setFeedback({ type: 'success', text: '10개의 추천 시간표가 준비됐어요!' })
  }, [buildAiSchedules])

  useEffect(() => {
    generateWithAi()
  }, [generateWithAi])

  // 둘러보기용 친구들의 시간표 생성
  useEffect(() => {
    const friendSchedules = buildAiSchedules().slice(0, 6).map((schedule, index) => ({
      ...schedule,
      id: `friend-${Date.now()}-${index}`,
      label: `2025-${index % 2 === 0 ? '1' : '2'}`,
      friendName: ['김철수', '이영희', '박민수', '정수진', '최지훈', '한소영'][index],
      friendMajor: '컴퓨터공학과',
      savedAt: new Date(Date.now() - (index + 1) * 86400000).toISOString() // 하루씩 차이
    }))
    setBrowseSchedules(friendSchedules)
    setBrowseIndex(0) // 초기화
  }, [buildAiSchedules])

  const handleSaveSchedule = () => {
    if (!currentSchedule) return
    setIsSaveConfirmOpen(true)
  }

  const confirmSaveSchedule = () => {
    if (!currentSchedule) return
    const signature = signatureFromCourses(currentSchedule.courses)

    const duplicated = savedSchedules.some((schedule) => schedule.signature === signature)
    if (duplicated) {
      setFeedback({ type: 'info', text: '이미 저장된 시간표예요.' })
      setIsSaveConfirmOpen(false)
      return
    }

    const payload = {
      ...currentSchedule,
      id: `${currentSchedule.id}-saved-${Date.now()}`,
      signature,
      savedAt: new Date().toISOString()
    }

    setSavedSchedules((prev) => [payload, ...prev])
    setSavedIndex(0)
    setFeedback({ type: 'success', text: '현재 시간표를 저장했어요.' })
    setIsSaveConfirmOpen(false)
    setActiveTab('제작')
  }

  const handleSaveBrowseSchedule = (schedule) => {
    const signature = signatureFromCourses(schedule.courses)

    const duplicated = savedSchedules.some((s) => s.signature === signature)
    if (duplicated) {
      setFeedback({ type: 'info', text: '이미 저장된 시간표예요.' })
      return
    }

    const payload = {
      ...schedule,
      id: `${schedule.id}-saved-${Date.now()}`,
      signature,
      savedAt: new Date().toISOString(),
      label: schedule.label || getSemesterLabel()
    }

    setSavedSchedules((prev) => [payload, ...prev])
    setSavedIndex(0)
    setFeedback({ type: 'success', text: '시간표를 제작 탭에 저장했어요.' })
    setActiveTab('제작')
  }

  const cancelSaveSchedule = () => {
    setIsSaveConfirmOpen(false)
  }

  const toggleEditSchedule = (scheduleId) => {
    setEditingScheduleId((prev) => (prev === scheduleId ? null : scheduleId))
  }

  const handleRemoveCourse = (scheduleId, courseId) => {
    setSavedSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule.id !== scheduleId) return schedule
        const updatedCourses = schedule.courses.filter((course) => course.courseId !== courseId)
        const summary = summariseCourses(updatedCourses)
        const updated = {
          ...schedule,
          courses: updatedCourses,
          ...summary,
          signature: signatureFromCourses(updatedCourses)
        }
        // 제작 탭 상세 화면이 열려있으면 업데이트
        if (selectedScheduleDetail && selectedScheduleDetail.id === scheduleId) {
          setSelectedScheduleDetail(updated)
        }
        return updated
      })
    )
  }

  const handleAddCourse = (scheduleId, courseToAdd) => {
    setSavedSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule.id !== scheduleId) return schedule
        if (schedule.courses.some((course) => course.courseId === courseToAdd.courseId)) return schedule
        if (hasTimeConflict(schedule.courses, courseToAdd)) {
          setFeedback({
            type: 'warning',
            text: '이미 같은 시간대에 강의가 있어서 추가할 수 없어요.'
          })
          return schedule
        }

        const updatedCourses = [...schedule.courses, courseToAdd]
        const summary = summariseCourses(updatedCourses)
        const updated = {
          ...schedule,
          courses: updatedCourses,
          ...summary,
          signature: signatureFromCourses(updatedCourses)
        }
        // 제작 탭 상세 화면이 열려있으면 업데이트
        if (selectedScheduleDetail && selectedScheduleDetail.id === scheduleId) {
          setSelectedScheduleDetail(updated)
        }
        return updated
      })
    )
  }

  const getAddableCourses = (schedule) => {
    const existingIds = new Set(schedule.courses.map((course) => course.courseId))
    return availableCourses
      .filter((course) => !existingIds.has(course.courseId))
      .slice(0, 12)
  }

  const handleSavedNavigation = (direction) => {
    setSavedIndex((prev) => {
      const next = prev + direction
      const maxIndex = savedSchedules.length - 1
      if (maxIndex < 0) return 0
      return Math.max(0, Math.min(next, maxIndex))
    })
  }

  const handleChatSubmit = (event) => {
    event.preventDefault()
    if (!chatInput.trim()) return
    const userText = chatInput.trim()
    const userMessage = { id: `user-${Date.now()}`, role: 'user', text: userText }
    setChatMessages((prev) => [...prev, userMessage])
    setChatInput('')
    setIsChatting(true)
    const scheduleContext = currentSchedule || currentSavedSchedule
    const aiReply = buildAiChatReply(userText, scheduleContext, savedSchedules.length)
    if (chatTimerRef.current) {
      clearTimeout(chatTimerRef.current)
    }
    chatTimerRef.current = setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { id: `ai-${Date.now()}`, role: 'ai', text: aiReply }
      ])
      setIsChatting(false)
    }, 700 + Math.random() * 600)
  }

  const isEmpty = aiSchedules.length === 0
  const savedEmpty = savedSchedules.length === 0
  const isEditingSaved = Boolean(currentSavedSchedule && editingScheduleId === currentSavedSchedule?.id)
  const savedAddableCourses =
    isEditingSaved && currentSavedSchedule ? getAddableCourses(currentSavedSchedule) : []

  useEffect(() => {
    if (isEditingSaved || isEditingDetail || isSemesterSelectOpen) {
      // 편집 모드 활성화 시 body 스크롤 막기
      document.body.style.overflow = 'hidden'
    } else {
      // 편집 모드 비활성화 시 body 스크롤 복원
      document.body.style.overflow = ''
    }

    return () => {
      // 컴포넌트 언마운트 시 스크롤 복원
      document.body.style.overflow = ''
    }
  }, [isEditingSaved, isEditingDetail, isSemesterSelectOpen])

  return (
    <>
      <div className="page-container">
      <nav className="schedule-top-nav">
        <button 
          className={`schedule-nav-item ${activeTab === '시간표' ? 'active' : ''}`}
          onClick={() => setActiveTab('시간표')}
        >
          시간표
        </button>
        <button 
          className={`schedule-nav-item ${activeTab === 'AI' ? 'active' : ''}`}
          onClick={() => setActiveTab('AI')}
        >
          AI
        </button>
        <button 
          className={`schedule-nav-item ${activeTab === '제작' ? 'active' : ''}`}
          onClick={() => setActiveTab('제작')}
        >
          제작
        </button>
        <button 
          className={`schedule-nav-item ${activeTab === '둘러보기' ? 'active' : ''}`}
          onClick={() => setActiveTab('둘러보기')}
        >
          둘러보기
        </button>
      </nav>
      <div className="page-content">
        {activeTab === '시간표' && (
          <>
            {savedEmpty ? (
              <div className="page-card empty-state">
                <p className="page-text">아직 저장된 시간표가 없어요. 제작 탭에서 마음에 드는 조합을 저장해 보세요.</p>
              </div>
            ) : (
              currentSavedSchedule && (
                <div className="schedule-card saved-card">
                  <div className="saved-card-top">
                    <div>
                      <div className="saved-card-title-row">
                        <p className="saved-card-title">{getSemesterLabel(selectedSemester)}</p>
                        <span className="saved-card-credits">{currentSavedSchedule.totalCredits}학점</span>
                      </div>
                    </div>
                    <div className="saved-card-actions">
                      <div className="menu-container" ref={menuRef}>
                        <button 
                          className="menu-button" 
                          onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                          <span className="menu-dots">⋮</span>
                        </button>
                        {isMenuOpen && (
                          <div className="menu-dropdown">
                            <button 
                              className="menu-item"
                              onClick={() => {
                                setIsMenuOpen(false)
                                setIsSemesterSelectOpen(true)
                              }}
                            >
                              학기 선택
                            </button>
                            <button 
                              className="menu-item"
                              onClick={() => {
                                setIsMenuOpen(false)
                                toggleEditSchedule(currentSavedSchedule.id)
                              }}
                            >
                              시간표 수정하기
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="schedule-meta compact">
                    <div className="schedule-chip">
                      <span>전공필수</span>
                      <strong>{currentSavedSchedule.requiredCount}과목</strong>
                    </div>
                    <div className="schedule-chip">
                      <span>전공선택</span>
                      <strong>{currentSavedSchedule.courses.filter(c => c.type === '전선').length}과목</strong>
                    </div>
                    <div className="schedule-chip">
                      <span>교양</span>
                      <strong>{currentSavedSchedule.courses.filter(c => c.type === '교양').length}과목</strong>
                    </div>
                  </div>

                  <TimetableGrid
                    courses={currentSavedSchedule.courses}
                    editable={isEditingSaved}
                    onSelectCourse={(courseId) => handleRemoveCourse(currentSavedSchedule.id, courseId)}
                    onBlockClick={(course) => {
                      setSelectedCourse(course)
                      setIsCourseModalOpen(true)
                    }}
                  />
                </div>
              )
            )}

            {isEditingSaved && (
              <div className="edit-bottom-sheet-overlay" onClick={() => toggleEditSchedule(currentSavedSchedule.id)}>
                <div className="edit-bottom-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="edit-bottom-sheet-header">
                    <h3>과목 추가하기</h3>
                    <button 
                      className="edit-bottom-sheet-close" 
                      onClick={() => toggleEditSchedule(currentSavedSchedule.id)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="edit-bottom-sheet-content">
                    <p className="edit-hint">시간표 블록 또는 아래 버튼으로 과목을 삭제/추가할 수 있어요.</p>
                    <div className="add-course-grid">
                      {savedAddableCourses.length === 0 ? (
                        <span className="empty-state-hint">추가할 수 있는 과목이 없어요.</span>
                      ) : (
                        savedAddableCourses.map((course) => (
                          <button
                            key={course.courseId}
                            className="add-course-pill"
                            onClick={() => handleAddCourse(currentSavedSchedule.id, course)}
                          >
                            <div className="course-pill-header">
                              <span className="course-name">{course.name}</span>
                              <div className="course-header-right">
                                <span className="course-professor">{course.professor}</span>
                                <span className="course-type-badge">{course.type}</span>
                              </div>
                            </div>
                            <div className="course-pill-info">
                              <div className="course-info-row">
                                <span className="info-value">{course.schedule || '시간 협의'}</span>
                                {course.location && (
                                  <>
                                    <span className="info-separator">·</span>
                                    <span className="info-value">{course.location}</span>
                                  </>
                                )}
                              </div>
                              <div className="course-info-row">
                                <span className="info-value">{course.courseId}</span>
                                <span className="info-separator">·</span>
                                <span className="info-value">{course.grade ? `${course.grade}학년` : '-'}</span>
                                <span className="info-separator">·</span>
                                <span className="info-value">{course.credits}학점</span>
                                {(course.enrollment !== undefined || course.capacity !== undefined) && (
                                  <span className="info-value enrollment" style={{ marginLeft: 'auto' }}>
                                    {course.enrollment !== undefined ? course.enrollment : '-'}
                                    {course.capacity !== undefined ? ` / ${course.capacity}` : ''}
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isSemesterSelectOpen && (
              <div className="edit-bottom-sheet-overlay" onClick={() => setIsSemesterSelectOpen(false)}>
                <div className="edit-bottom-sheet" onClick={(e) => e.stopPropagation()}>
                  <div className="edit-bottom-sheet-header">
                    <h3>학기 선택</h3>
                    <button 
                      className="edit-bottom-sheet-close" 
                      onClick={() => setIsSemesterSelectOpen(false)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="edit-bottom-sheet-content">
                    <div className="semester-select-list">
                      {['2025-1', '2025-여름', '2025-2', '2025-겨울'].map((semester) => (
                        <button
                          key={semester}
                          className={`semester-select-item ${selectedSemester === semester ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedSemester(semester)
                            setIsSemesterSelectOpen(false)
                          }}
                        >
                          {semester}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        

        {activeTab === 'AI' && (
          <>
            <section className="ai-chat-section">
          <div className="ai-chat-window" ref={chatWindowRef}>
            {chatMessages.map((message) => (
              <div key={message.id} className={`ai-chat-message ${message.role}`}>
                <p>{message.text}</p>
              </div>
            ))}
            {isChatting && (
              <div className="ai-chat-message ai typing">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            )}
          </div>
          <form className="ai-chat-input" onSubmit={handleChatSubmit}>
            <input
              type="text"
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              placeholder="예: 수요일 오전은 비워줘"
              disabled={isChatting}
            />
            <button type="submit" disabled={isChatting || chatInput.trim() === ''}>
              전송
            </button>
          </form>
        </section>

        {!isEmpty && currentSchedule ? (
          <div className="schedule-display">
            <div className="schedule-card">
              <div className="schedule-card-head">
                <div>
                  <div className="schedule-title-row">
                    <h2 className="schedule-card-title">{currentSchedule.label}</h2>
                  <p className="schedule-chip-label" style={{ color: currentSchedule.theme.accent }}>
                    {currentSchedule.theme.label}
                  </p>
                  </div>
                  <p className="schedule-card-summary">{currentSchedule.summary}</p>
                </div>
                <span className="schedule-index">
                  {currentIndex + 1} / {aiSchedules.length}
                </span>
              </div>

              <div className="schedule-meta">
                <div className="schedule-chip">
                  <span>총 학점</span>
                  <strong>{currentSchedule.totalCredits}학점</strong>
                </div>
                <div className="schedule-chip">
                  <span>전필</span>
                  <strong>{currentSchedule.requiredCount}과목</strong>
                </div>
                <div className="schedule-chip">
                  <span>전선·교양</span>
                  <strong>{currentSchedule.electiveCount}과목</strong>
                </div>
              </div>

              <TimetableGrid 
                courses={currentSchedule.courses} 
                onBlockClick={(course) => {
                  setSelectedCourse(course)
                  setIsCourseModalOpen(true)
                }}
              />

              <div className="schedule-actions">
                <div className="schedule-actions-grid">
                  <button className="primary-btn" onClick={handleSaveSchedule}>
                    이 시간표 저장하기
                  </button>
                </div>
              </div>
            </div>

            <div className="carousel-controls">
              <button
                type="button"
                className="arrow-button slim"
                onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                disabled={isGenerating || currentIndex === 0}
              >
                ‹ 이전
              </button>
              <span className="carousel-divider" />
              <button
                type="button"
                className="arrow-button slim"
                onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, aiSchedules.length - 1))}
                disabled={isGenerating || currentIndex === aiSchedules.length - 1}
              >
                다음 ›
              </button>
            </div>
          </div>
        ) : (
          <div className="page-card empty-state">
            <p className="page-text">시간표를 불러오는 중이에요. 잠시만 기다려 주세요.</p>
          </div>
        )}

        {feedback && (
          <div className={`inline-feedback ${feedback.type || 'info'}`}>
            <span>{feedback.text}</span>
          </div>
            )}
          </>
        )}

        {activeTab === '제작' && (
          <>
            {savedSchedules.length === 0 ? (
              <div className="page-card empty-state">
                <p className="page-text">저장된 시간표가 없어요. AI 탭에서 시간표를 생성하고 저장해보세요.</p>
              </div>
            ) : (
              <div className="schedule-list">
                {savedSchedules.map((schedule) => (
                  <div 
                    key={schedule.id} 
                    className="schedule-list-item"
                    onClick={() => setSelectedScheduleDetail(schedule)}
                  >
                    <div className="schedule-list-item-header">
            <div>
                        <h3 className="schedule-list-item-title">{schedule.label}</h3>
                        <p className="schedule-list-item-meta">
                          {schedule.theme?.label} · {schedule.totalCredits}학점 · {schedule.courses.length}과목
                        </p>
            </div>
                      <span className="schedule-list-item-arrow">›</span>
          </div>
              </div>
            ))}
              </div>
            )}

            {selectedScheduleDetail && (
              <div className="schedule-detail-fullscreen">
                <div className="schedule-detail-header-fullscreen">
                  <button 
                    className="schedule-detail-back" 
                    onClick={() => {
                      setSelectedScheduleDetail(null)
                      setIsEditingDetail(false)
                    }}
                  >
                    ‹
                  </button>
                  <div className="saved-card-title-row">
                    <h2>{selectedScheduleDetail.label}</h2>
                    <span className="saved-card-credits">{selectedScheduleDetail.totalCredits}학점</span>
                  </div>
                  <div className="schedule-detail-actions">
                    <div className="menu-container" ref={detailMenuRef}>
                      <button 
                        className="menu-button" 
                        onClick={() => setIsDetailMenuOpen(!isDetailMenuOpen)}
                      >
                        <span className="menu-dots">⋮</span>
                      </button>
                      {isDetailMenuOpen && (
                        <div className="menu-dropdown">
                          <button 
                            className="menu-item"
                            onClick={() => {
                              setIsDetailMenuOpen(false)
                              setIsEditingDetail(true)
                            }}
                          >
                            시간표 수정하기
                          </button>
          </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="schedule-detail-content-fullscreen">
                  <div className="schedule-meta compact">
                    <div className="schedule-chip">
                      <span>전공필수</span>
                      <strong>{selectedScheduleDetail.requiredCount}과목</strong>
                    </div>
                    <div className="schedule-chip">
                      <span>전공선택</span>
                      <strong>{selectedScheduleDetail.courses.filter(c => c.type === '전선').length}과목</strong>
                    </div>
                    <div className="schedule-chip">
                      <span>교양</span>
                      <strong>{selectedScheduleDetail.courses.filter(c => c.type === '교양').length}과목</strong>
                    </div>
                  </div>

                  <TimetableGrid
                    courses={selectedScheduleDetail.courses}
                    editable={isEditingDetail}
                    onSelectCourse={(courseId) => handleRemoveCourse(selectedScheduleDetail.id, courseId)}
                    onBlockClick={(course) => {
                      setSelectedCourse(course)
                      setIsCourseModalOpen(true)
                    }}
                  />
                </div>

                {isEditingDetail && (
                  <div className="edit-bottom-sheet-overlay" onClick={() => setIsEditingDetail(false)}>
                    <div className="edit-bottom-sheet" onClick={(e) => e.stopPropagation()}>
                      <div className="edit-bottom-sheet-header">
                        <h3>과목 추가하기</h3>
                        <button 
                          className="edit-bottom-sheet-close" 
                          onClick={() => setIsEditingDetail(false)}
                        >
                          ×
            </button>
                      </div>
                      <div className="edit-bottom-sheet-content">
                        <p className="edit-hint">시간표 블록 또는 아래 버튼으로 과목을 삭제/추가할 수 있어요.</p>
                        <div className="add-course-grid">
                          {getAddableCourses(selectedScheduleDetail).length === 0 ? (
                            <span className="empty-state-hint">추가할 수 있는 과목이 없어요.</span>
                          ) : (
                            getAddableCourses(selectedScheduleDetail).map((course) => (
                              <button
                                key={course.courseId}
                                className="add-course-pill"
                                onClick={() => handleAddCourse(selectedScheduleDetail.id, course)}
                              >
                                <div className="course-pill-header">
                                  <span className="course-name">{course.name}</span>
                                  <div className="course-header-right">
                                    <span className="course-professor">{course.professor}</span>
                                    <span className="course-type-badge">{course.type}</span>
                                  </div>
                                </div>
                                <div className="course-pill-info">
                                  <div className="course-info-row">
                                    <span className="info-value">{course.schedule || '시간 협의'}</span>
                                    {course.location && (
                                      <>
                                        <span className="info-separator">·</span>
                                        <span className="info-value">{course.location}</span>
                                      </>
                                    )}
                                  </div>
                                  <div className="course-info-row">
                                    <span className="info-value">{course.courseId}</span>
                                    <span className="info-separator">·</span>
                                    <span className="info-value">{course.grade ? `${course.grade}학년` : '-'}</span>
                                    <span className="info-separator">·</span>
                                    <span className="info-value">{course.credits}학점</span>
                                    {(course.enrollment !== undefined || course.capacity !== undefined) && (
                                      <span className="info-value enrollment" style={{ marginLeft: 'auto' }}>
                                        {course.enrollment !== undefined ? course.enrollment : '-'}
                                        {course.capacity !== undefined ? ` / ${course.capacity}` : ''}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {activeTab === '둘러보기' && (
          <>
            {browseSchedules.length === 0 ? (
              <div className="page-card empty-state">
                <p className="page-text">공유된 시간표가 없어요.</p>
              </div>
            ) : (
              browseSchedules.length > 0 && (
                <div className="schedule-display browse-carousel-container">
                  <button
                    type="button"
                    className="browse-nav-button browse-nav-prev"
                    onClick={() => setBrowseIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={browseIndex === 0}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="browse-nav-button browse-nav-next"
                    onClick={() => setBrowseIndex((prev) => Math.min(prev + 1, browseSchedules.length - 1))}
                    disabled={browseIndex === browseSchedules.length - 1}
                  >
                    ›
                  </button>
                  <div 
                    className="browse-carousel-track"
                    style={{ transform: `translateX(-${browseIndex * 100}%)` }}
                  >
                    {browseSchedules.map((schedule) => (
                      <div key={schedule.id} className="browse-carousel-slide">
                        <div className="schedule-card saved-card browse-schedule-card-wrapper">
                          <div className="saved-card-top">
                            <div>
                              <div className="saved-card-title-row">
                                <p className="saved-card-title">{schedule.label}</p>
                                <span className="saved-card-credits">{schedule.totalCredits}학점</span>
                              </div>
                              <p className="browse-schedule-author">
                                {schedule.friendName} · {schedule.friendMajor}
                              </p>
                            </div>
                          </div>

                          <div className="schedule-meta compact">
                            <div className="schedule-chip">
                              <span>전공필수</span>
                              <strong>{schedule.requiredCount}과목</strong>
                            </div>
                            <div className="schedule-chip">
                              <span>전공선택</span>
                              <strong>{schedule.courses.filter(c => c.type === '전선').length}과목</strong>
                            </div>
                            <div className="schedule-chip">
                              <span>교양</span>
                              <strong>{schedule.courses.filter(c => c.type === '교양').length}과목</strong>
                            </div>
                          </div>

                          <TimetableGrid
                            courses={schedule.courses}
                            editable={false}
                            onBlockClick={(course) => {
                              setSelectedCourse(course)
                              setIsCourseModalOpen(true)
                            }}
                          />

                          <div className="schedule-actions">
                            <div className="schedule-actions-grid">
                              <button 
                                className="primary-btn" 
                                onClick={() => handleSaveBrowseSchedule(schedule)}
                              >
                                시간표 저장하기
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </>
        )}
      </div>
    </div>
    {isSavedPanelOpen && (
      <div className="saved-panel-overlay">
        <div className="saved-panel">
          <div className="saved-panel-header">
            <div>
              <h2 className="saved-title">저장된 시간표</h2>
              <p className="saved-description">저장된 조합을 좌우 화살표로 비교하고, 편집 모드에서 바로 수정하세요.</p>
            </div>
            <button className="saved-panel-close" onClick={() => setIsSavedPanelOpen(false)}>
              닫기 ✕
            </button>
          </div>

          {savedEmpty ? (
            <div className="page-card empty-state">
              <p className="page-text">아직 저장된 시간표가 없어요. 마음에 드는 조합을 저장해 보세요.</p>
            </div>
          ) : (
            <div className="schedule-carousel saved-carousel">
              <button
                type="button"
                className="arrow-button"
                aria-label="이전 저장 시간표"
                onClick={() => handleSavedNavigation(-1)}
                disabled={savedIndex === 0}
              >
                ‹
              </button>

              {currentSavedSchedule && (
                <div className="schedule-card saved-card">
                  <div className="saved-card-top">
                    <div>
                      <p className="saved-card-title">{getSemesterLabel()}</p>
                      <span className="saved-card-meta">
                        {currentSavedSchedule.theme?.label} · {currentSavedSchedule.totalCredits}학점 ·{' '}
                        {currentSavedSchedule.courses.length}과목
                      </span>
                    </div>
                    <div className="saved-card-actions">
                      <button className="ghost-btn small" onClick={() => toggleEditSchedule(currentSavedSchedule.id)}>
                        {isEditingSaved ? '편집 완료' : '편집'}
                      </button>
                    </div>
                  </div>

                  <div className="schedule-meta compact">
                    <div className="schedule-chip">
                      <span>총 학점</span>
                      <strong>{currentSavedSchedule.totalCredits}학점</strong>
                    </div>
                    <div className="schedule-chip">
                      <span>전필</span>
                      <strong>{currentSavedSchedule.requiredCount}과목</strong>
                    </div>
                    <div className="schedule-chip">
                      <span>전선·교양</span>
                      <strong>{currentSavedSchedule.electiveCount}과목</strong>
                    </div>
                  </div>

                  <TimetableGrid
                    courses={currentSavedSchedule.courses}
                    editable={isEditingSaved}
                    onSelectCourse={(courseId) => handleRemoveCourse(currentSavedSchedule.id, courseId)}
                    onBlockClick={(course) => {
                      setSelectedCourse(course)
                      setIsCourseModalOpen(true)
                    }}
                  />

                  {isEditingSaved && (
                    <>
                      <p className="edit-hint">시간표 블록 또는 아래 버튼으로 과목을 삭제/추가할 수 있어요.</p>
                      <div className="add-course-grid">
                        {savedAddableCourses.length === 0 ? (
                          <span className="empty-state-hint">추가할 수 있는 과목이 없어요.</span>
                        ) : (
                          savedAddableCourses.map((course) => (
                            <button
                              key={course.courseId}
                              className="add-course-pill"
                              onClick={() => handleAddCourse(currentSavedSchedule.id, course)}
                            >
                              <span>{course.name}</span>
                              <small>{course.schedule || '시간 협의'}</small>
                            </button>
                          ))
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

              <button
                type="button"
                className="arrow-button"
                aria-label="다음 저장 시간표"
                onClick={() => handleSavedNavigation(1)}
                disabled={savedIndex === savedSchedules.length - 1}
              >
                ›
              </button>
            </div>
          )}
        </div>
      </div>
    )}
    {isSaveConfirmOpen && (
      <div className="course-modal-overlay" onClick={cancelSaveSchedule}>
        <div className="course-modal save-confirm-modal" onClick={(e) => e.stopPropagation()}>
          <div className="course-modal-header">
            <h3>제작 탭에서 보시겠습니까?</h3>
          </div>
          <div className="course-modal-content">
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="ghost-btn" onClick={cancelSaveSchedule}>
                아니요
              </button>
              <button className="primary-btn" onClick={confirmSaveSchedule}>
                예
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

    {isCourseModalOpen && selectedCourse && (
      <div className="course-modal-overlay" onClick={() => setIsCourseModalOpen(false)}>
        <div className="course-modal" onClick={(e) => e.stopPropagation()}>
          <div className="course-modal-header">
            <h3>{selectedCourse.name}</h3>
            <button className="course-modal-close" onClick={() => setIsCourseModalOpen(false)}>
              ✕
            </button>
          </div>
          <div className="course-modal-content">
            <div className="course-modal-info">
              <div className="course-info-row">
                <span className="course-info-label">과목 코드</span>
                <span className="course-info-value">{selectedCourse.courseId}</span>
              </div>
              <div className="course-info-row">
                <span className="course-info-label">교수</span>
                <span className="course-info-value">{selectedCourse.professor}</span>
              </div>
              <div className="course-info-row">
                <span className="course-info-label">학점</span>
                <span className="course-info-value">{selectedCourse.credits}학점</span>
              </div>
              <div className="course-info-row">
                <span className="course-info-label">유형</span>
                <span className="course-info-value">{selectedCourse.type}</span>
              </div>
              <div className="course-info-row">
                <span className="course-info-label">시간</span>
                <span className="course-info-value">{selectedCourse.schedule || '시간 협의'}</span>
              </div>
              {selectedCourse.location && (
                <div className="course-info-row">
                  <span className="course-info-label">장소</span>
                  <span className="course-info-value">{selectedCourse.location}</span>
                </div>
              )}
              {selectedCourse.description && (
                <div className="course-info-row full-width">
                  <span className="course-info-label">설명</span>
                  <span className="course-info-value">{selectedCourse.description}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default Schedule