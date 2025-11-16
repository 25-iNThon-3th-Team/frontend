export const DAYS = ['월', '화', '수', '목', '금']
export const ENGLISH_DAY_MAP = { 월: 'mon', 화: 'tue', 수: 'wed', 목: 'thu', 금: 'fri' }
export const HOURS = Array.from({ length: 13 }, (_, idx) => 8 + idx)
export const MAX_OPTIONS = 10
export const COLOR_PALETTE = ['#f97316', '#a855f7', '#14b8a6', '#3b82f6', '#ec4899', '#facc15', '#10b981', '#6366f1']

const COURSE_CATALOG = [
  {
    id: 'cs201',
    title: '자료구조',
    professor: '정다은',
    tags: ['전공', '코딩', '아침'],
    slots: [
      { day: '월', start: 9, duration: 2, room: 'U210', type: '전공필수' },
      { day: '수', start: 11, duration: 2, room: 'U228', type: '전공필수' }
    ]
  },
  {
    id: 'cs305',
    title: '알고리즘설계',
    professor: '이도윤',
    tags: ['전공', '코딩', '심화'],
    slots: [
      { day: '화', start: 9, duration: 2, room: 'U226', type: '전공필수' },
      { day: '목', start: 15, duration: 2, room: 'U214', type: '전공선택' }
    ]
  },
  {
    id: 'ma210',
    title: '선형대수',
    professor: '박서현',
    tags: ['수학', '이론'],
    slots: [
      { day: '화', start: 11, duration: 2, room: 'U120', type: '기초' },
      { day: '목', start: 13, duration: 2, room: 'U120', type: '기초' }
    ]
  },
  {
    id: 'ux110',
    title: 'UX디자인',
    professor: '한다빈',
    tags: ['디자인', '프로젝트', '오전'],
    slots: [
      { day: '월', start: 13, duration: 2, room: 'U320', type: '교양' },
      { day: '수', start: 9, duration: 2, room: 'U320', type: '교양' }
    ]
  },
  {
    id: 'ai450',
    title: 'AI프로젝트랩',
    professor: '장민우',
    tags: ['AI', '프로젝트', '실습'],
    slots: [
      { day: '화', start: 14, duration: 3, room: 'AI401', type: '전공심화' },
      { day: '금', start: 13, duration: 3, room: 'AI401', type: '전공심화' }
    ]
  },
  {
    id: 'mob320',
    title: '모바일프로그래밍',
    professor: '김하늘',
    tags: ['코딩', '앱', '실습'],
    slots: [
      { day: '수', start: 15, duration: 2, room: 'U218', type: '전공선택' },
      { day: '금', start: 9, duration: 2, room: 'U218', type: '전공선택' }
    ]
  },
  {
    id: 'ds230',
    title: '데이터시각화',
    professor: '윤채린',
    tags: ['데이터', '실습', '오후'],
    slots: [
      { day: '월', start: 15, duration: 2, room: 'LAB201', type: '전공선택' },
      { day: '목', start: 15, duration: 2, room: 'LAB201', type: '전공선택' }
    ]
  },
  {
    id: 'cp410',
    title: '캡스톤디자인',
    professor: '백승우',
    tags: ['프로젝트', '실습'],
    slots: [
      { day: '목', start: 11, duration: 2, room: 'FAB110', type: '전공심화' },
      { day: '금', start: 14, duration: 3, room: 'FAB110', type: '전공심화' }
    ]
  },
  {
    id: 'gc105',
    title: '글로벌커뮤니케이션',
    professor: '알렉스',
    tags: ['언어', '교양', '오후'],
    slots: [
      { day: '화', start: 16, duration: 2, room: 'B201', type: '교양' },
      { day: '금', start: 11, duration: 2, room: 'B201', type: '교양' }
    ]
  },
  {
    id: 'en150',
    title: '창업세미나',
    professor: '최유진',
    tags: ['창업', '교양', '오전'],
    slots: [
      { day: '월', start: 11, duration: 2, room: 'U410', type: '교양' },
      { day: '수', start: 14, duration: 2, room: 'U410', type: '교양' }
    ]
  },
  {
    id: 'st220',
    title: '확률과통계',
    professor: '홍예린',
    tags: ['수학', '전공기초', '아침'],
    slots: [
      { day: '수', start: 13, duration: 2, room: 'U110', type: '전공기초' },
      { day: '금', start: 11, duration: 2, room: 'U110', type: '전공기초' }
    ]
  },
  {
    id: 'cl330',
    title: '클라우드컴퓨팅',
    professor: '마준호',
    tags: ['실습', '전공', '오후'],
    slots: [
      { day: '화', start: 10, duration: 2, room: 'LAB330', type: '전공선택' },
      { day: '목', start: 16, duration: 2, room: 'LAB330', type: '전공선택' }
    ]
  },
  {
    id: 'pm240',
    title: 'IT서비스기획',
    professor: '문가람',
    tags: ['기획', '프로젝트'],
    slots: [
      { day: '수', start: 10, duration: 2, room: 'B305', type: '전공선택' },
      { day: '금', start: 15, duration: 2, room: 'B305', type: '전공선택' }
    ]
  },
  {
    id: 'nt360',
    title: '컴퓨터네트워크',
    professor: '송지후',
    tags: ['전공', '코딩'],
    slots: [
      { day: '목', start: 9, duration: 2, room: 'U130', type: '전공필수' },
      { day: '화', start: 13, duration: 2, room: 'U130', type: '전공필수' }
    ]
  },
  {
    id: 'ml520',
    title: '심화머신러닝',
    professor: '사라김',
    tags: ['AI', '심화', '오후'],
    slots: [
      { day: '월', start: 16, duration: 2, room: 'AI204', type: '전공심화' },
      { day: '금', start: 9, duration: 2, room: 'AI204', type: '전공심화' }
    ]
  }
]

export const loadSavedSchedules = () => {
  if (typeof window === 'undefined') return []
  try {
    const list = window.localStorage.getItem('savedSchedules')
    if (list) return JSON.parse(list)
    const legacy = window.localStorage.getItem('savedSchedule')
    return legacy ? [JSON.parse(legacy)] : []
  } catch {
    return []
  }
}

export const createEmptyBlock = () => ({
  subject: '',
  professor: '',
  day: '월',
  start: 9,
  duration: 2,
  room: '',
  type: '커스텀',
  color: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)]
})

export function craftAiReply(text, preference = {}) {
  if (!text) return '원하는 요일과 수업 스타일을 조금 더 알려주세요!'

  const lowered = text.toLowerCase()
  if (lowered.includes('공강') || lowered.includes('비우')) {
    return '원하는 요일에 공강이 생기도록 조합해볼게요.'
  }
  if (lowered.includes('ai') || lowered.includes('인공지능')) {
    return 'AI/데이터 수업을 중심으로 추천해볼게요.'
  }
  if (lowered.includes('오전') || lowered.includes('아침')) {
    return '오전 수업 위주로 묶어볼게요.'
  }
  if (lowered.includes('오후') || lowered.includes('저녁')) {
    return '오후 수업으로 몰아서 배치해볼게요.'
  }
  if (lowered.includes('프로젝트') || lowered.includes('실습')) {
    return '프로젝트/실습 비중을 높여서 조합해볼게요.'
  }

  if (preference.preferMorning) {
    return '아침형 일정에 맞춰서 수업을 배치해볼게요.'
  }
  if (preference.preferAfternoon) {
    return '오후·저녁 일정이 중심이 되도록 구성할게요.'
  }

  return '좋아요! 더 원하는 조건이 있으면 말씀해주세요.'
}

export function extractPreferences(messages) {
  const combined = messages
    .filter((msg) => msg.role === 'user')
    .map((msg) => msg.text.toLowerCase())
    .join(' ')

  const dayOff = DAYS.find((day) => {
    const korPattern = new RegExp(`${day}(?:요일)?\\s*(?:공강|비우|휴식|비워)`)
    if (korPattern.test(combined)) return true
    const eng = ENGLISH_DAY_MAP[day]
    if (!eng) return false
    const engPattern = new RegExp(`${eng}\\s*(?:off|free)`)
    return engPattern.test(combined)
  })

  return {
    preferMorning: /아침|오전|morning|일찍/.test(combined),
    preferAfternoon: /오후|저녁|야간|late/.test(combined),
    wantDayOff: dayOff,
    preferAi: /ai|인공지능|데이터|머신러닝/.test(combined),
    preferPractice: /실습|프로젝트|랩|랩실|capstone|실무/.test(combined)
  }
}

export function createScheduleOption(seed, index, preference = {}) {
  const rng = mulberry32(seed)
  const coursePool = shuffle([...COURSE_CATALOG], rng)
  const usedBlocks = {}
  const blocks = []

  while (coursePool.length && blocks.length < 8) {
    const course = chooseCourse(coursePool, preference, rng)
    if (!course) break
    const slot = chooseSlot(course, preference, rng, usedBlocks)
    if (!slot) continue

    const block = {
      id: `${course.id}-${slot.day}-${slot.start}-${index}`,
      subject: course.title,
      professor: course.professor,
      day: slot.day,
      start: slot.start,
      duration: slot.duration,
      room: slot.room,
      type: slot.type,
      color: COLOR_PALETTE[(blocks.length + index) % COLOR_PALETTE.length]
    }
    blocks.push(block)
    markSlot(usedBlocks, block)
  }

  const orderedBlocks = sortBlocks(blocks)

  return {
    id: `schedule-${seed}`,
    title: `AI 추천 시간표 ${index + 1}`,
    summary: buildSummary(orderedBlocks, preference),
    blocks: orderedBlocks,
    preferenceSnapshot: preference
  }
}

function chooseCourse(pool, preference, rng) {
  if (!pool.length) return null
  const prioritized = pool.filter((course) => {
    if (preference.preferAi && course.tags.includes('AI')) return true
    if (preference.preferPractice && course.tags.includes('실습')) return true
    return false
  })

  const targetPool = prioritized.length ? prioritized : pool
  const randomIndex = Math.floor(rng() * targetPool.length)
  const course = targetPool[randomIndex]
  const absoluteIndex = pool.indexOf(course)
  pool.splice(absoluteIndex, 1)
  return course
}

function chooseSlot(course, preference, rng, usedBlocks) {
  const morningSlots = course.slots.filter((slot) => slot.start < 12)
  const afternoonSlots = course.slots.filter((slot) => slot.start >= 12)

  let candidates = course.slots
  if (preference.preferMorning && morningSlots.length) {
    candidates = morningSlots
  } else if (preference.preferAfternoon && afternoonSlots.length) {
    candidates = afternoonSlots
  }

  const ordered = shuffle([...candidates], rng)
  for (const slot of ordered) {
    if (preference.wantDayOff && slot.day === preference.wantDayOff) continue
    if (!hasConflict(slot, usedBlocks)) return slot
  }
  return null
}

function hasConflict(slot, used) {
  const daySlots = used[slot.day] || []
  return daySlots.some((block) => {
    const blockEnd = block.start + block.duration
    const slotEnd = slot.start + slot.duration
    return block.start < slotEnd && slot.start < blockEnd
  })
}

function markSlot(used, block) {
  if (!used[block.day]) used[block.day] = []
  used[block.day].push(block)
}

export function buildSummary(blocks, preference = {}) {
  if (!blocks.length) return '빈 시간표'
  const daysCovered = [...new Set(blocks.map((block) => block.day))]
  const earliest = Math.min(...blocks.map((block) => block.start))
  const latest = Math.max(...blocks.map((block) => block.start + block.duration))
  const dayOff = DAYS.filter((day) => !daysCovered.includes(day))

  const daySentence = dayOff.length ? `${dayOff.slice(0, 2).join(', ')} 공강` : `${daysCovered.length}일 등교`
  const timeSentence =
    earliest >= 11 ? '늦은 오전 시작' : latest <= 15 ? '오전 집중' : '균형 잡힌 시간대'
  const focusSentence = preference.preferAi
    ? 'AI·데이터 강화'
    : preference.preferPractice
      ? '프로젝트 중심'
      : '전공·교양 균형'

  return `${daySentence} · ${timeSentence} · ${focusSentence}`
}

export function hourToRow(startHour) {
  return startHour - HOURS[0] + 1
}

export function formatTimeRange(start, duration) {
  const pad = (value) => String(value).padStart(2, '0')
  const end = start + duration
  return `${pad(start)}:00 ~ ${pad(end)}:00`
}

export function sortBlocks(blocks) {
  return [...blocks].sort((a, b) => {
    const dayDiff = DAYS.indexOf(a.day) - DAYS.indexOf(b.day)
    if (dayDiff !== 0) return dayDiff
    return a.start - b.start
  })
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function shuffle(array, rng = Math.random) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

