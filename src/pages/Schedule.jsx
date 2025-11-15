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

const courseTagClass = (type = '') => {
  if (type === '전필') return 'required'
  if (type === '전선') return 'elective'
  return 'liberal'
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
        timeText: `${minutesToClock(slot.start)}-${minutesToClock(slot.end)}`
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

const TimetableGrid = ({ courses = [], editable = false, onSelectCourse }) => {
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
        <div className="grid-columns">
          {DAY_LABELS.map((day) => (
            <div key={day} className="day-column">
              {blocks
                .filter((block) => block.day === day)
                .map((block) => (
                  <button
                    key={block.key}
                    type="button"
                    className={`timetable-block ${courseTagClass(block.type)} ${editable ? 'is-editable' : ''}`}
                    style={{ top: block.top, height: block.height }}
                    onClick={
                      isInteractive ? () => onSelectCourse?.(block.courseId) : undefined
                    }
                    disabled={!isInteractive}
                  >
                    <strong>{block.name}</strong>
                    <span>{block.timeText}</span>
                    <small>{block.professor || `${block.credits || 3}학점`}</small>
                  </button>
                ))}
            </div>
          ))}
        </div>
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
  const [feedback, setFeedback] = useState(null)
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

  const currentSchedule = aiSchedules[currentIndex]
  const currentSavedSchedule = savedSchedules[savedIndex]

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

  const handleSaveSchedule = () => {
    if (!currentSchedule) return
    const signature = signatureFromCourses(currentSchedule.courses)

    const duplicated = savedSchedules.some((schedule) => schedule.signature === signature)
    if (duplicated) {
      setFeedback({ type: 'info', text: '이미 저장된 시간표예요.' })
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
        return {
          ...schedule,
          courses: updatedCourses,
          ...summary,
          signature: signatureFromCourses(updatedCourses)
        }
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
        return {
          ...schedule,
          courses: updatedCourses,
          ...summary,
          signature: signatureFromCourses(updatedCourses)
        }
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

  return (
    <>
      <div className="page-container">
      <div className="page-content">
        <section className="schedule-hero">
          <h1 className="page-title">시간표 스튜디오</h1>
          <p className="page-text">
            학업 이력과 과목 특성을 분석해 10개의 시간표를 제안해드려요. 좌우 화살표로 비교하고, 마음에 드는
            조합은 바로 저장해 주세요.
          </p>
          {lastGeneratedAt && (
            <span className="hero-meta-text">최근 생성: {formatTimestamp(lastGeneratedAt)}</span>
          )}
        </section>

        {!isEmpty && currentSchedule ? (
          <div className="schedule-display">
            <div className="schedule-card">
              <div className="schedule-card-head">
                <div>
                  <p className="schedule-chip-label" style={{ color: currentSchedule.theme.accent }}>
                    {currentSchedule.theme.label}
                  </p>
                  <h2 className="schedule-card-title">{currentSchedule.label}</h2>
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

              <TimetableGrid courses={currentSchedule.courses} />

              <div className="schedule-actions">
                <div className="schedule-actions-grid">
                  <button className="primary-btn" onClick={handleSaveSchedule}>
                    이 시간표 저장하기
                  </button>
                  <button
                    className="ghost-btn secondary"
                    onClick={() => setIsSavedPanelOpen(true)}
                    disabled={savedSchedules.length === 0}
                  >
                    저장된 시간표 보기
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

        <section className="ai-chat-section">
          <div className="ai-chat-header">
            <div>
              <h2 className="saved-title">대화로 조건 전달</h2>
              <p className="saved-description">시간·학점·전필 조건을 말하면 맞춤 가이드를 드려요.</p>
            </div>
          </div>
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
                      <p className="saved-card-title">{currentSavedSchedule.label}</p>
                      <span className="saved-card-meta">
                        {currentSavedSchedule.theme?.label} · {currentSavedSchedule.totalCredits}학점 ·{' '}
                        {currentSavedSchedule.courses.length}과목 · {formatTimestamp(currentSavedSchedule.savedAt)}
                      </span>
                    </div>
                    <div className="saved-card-actions">
                      <span className="schedule-index">
                        {savedIndex + 1} / {savedSchedules.length}
                      </span>
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
    </>
  )
}

export default Schedule