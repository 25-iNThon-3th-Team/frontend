import { useEffect, useState } from 'react'
import '../App.css'
import SchedulePreview from '../components/SchedulePreview'
import BlockEditPanel from '../components/BlockEditPanel'
import {
  HOURS,
  MAX_OPTIONS,
  buildSummary,
  craftAiReply,
  createEmptyBlock,
  createScheduleOption,
  extractPreferences,
  loadSavedSchedules,
  sortBlocks
} from '../utils/scheduleUtils'

function Schedule() {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'ai',
      text: '안녕하세요! 듣고 싶은 과목, 원하는 공강 요일, 오전/오후 선호 등을 알려주시면 맞춤 시간표 10개를 바로 만들어 드릴게요.'
    }
  ])
  const [userInput, setUserInput] = useState('')
  const [isAiTyping, setIsAiTyping] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [scheduleOptions, setScheduleOptions] = useState([])
  const [currentOptionIndex, setCurrentOptionIndex] = useState(0)
  const [savedSchedules, setSavedSchedules] = useState(loadSavedSchedules)
  const [saveToast, setSaveToast] = useState('')
  const [editingScheduleId, setEditingScheduleId] = useState(null)
  const [newBlock, setNewBlock] = useState(createEmptyBlock())
  const [currentSavedIndex, setCurrentSavedIndex] = useState(0)

  useEffect(() => {
    if (!saveToast) return
    const timer = setTimeout(() => setSaveToast(''), 2500)
    return () => clearTimeout(timer)
  }, [saveToast])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem('savedSchedules', JSON.stringify(savedSchedules))
  }, [savedSchedules])

  useEffect(() => {
    if (!savedSchedules.length) {
      setCurrentSavedIndex(0)
      return
    }
    setCurrentSavedIndex((prev) => Math.min(prev, savedSchedules.length - 1))
  }, [savedSchedules.length])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem('savedSchedule')
  }, [])

  const handleSendMessage = () => {
    if (!userInput.trim()) return
    const text = userInput.trim()
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text
    }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setUserInput('')
    setIsAiTyping(true)
    triggerScheduleGeneration(updatedMessages)

    setTimeout(() => {
      const aiMessage = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        text: craftAiReply(text, extractPreferences(updatedMessages))
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsAiTyping(false)
    }, 800)
  }

  const triggerScheduleGeneration = (messageList) => {
    const preference = extractPreferences(messageList)
    setIsGenerating(true)
    setTimeout(() => {
      const baseSeed = Date.now()
      const options = Array.from({ length: MAX_OPTIONS }, (_, idx) =>
        createScheduleOption(baseSeed + idx * 101, idx, preference)
      )
      setScheduleOptions(options)
      setCurrentOptionIndex(0)
      setIsGenerating(false)
    }, 400)
  }

  const currentSchedule = scheduleOptions[currentOptionIndex] || null
  const currentSavedSchedule = savedSchedules[currentSavedIndex] || null

  const handleNavigate = (direction) => {
    if (!scheduleOptions.length) return
    setCurrentOptionIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? scheduleOptions.length - 1 : prev - 1
      }
      return prev === scheduleOptions.length - 1 ? 0 : prev + 1
    })
  }

  const handleSaveCurrent = () => {
    if (!currentSchedule) return
    const alreadySaved = savedSchedules.some((schedule) => schedule.id === currentSchedule.id)
    if (alreadySaved) {
      setSaveToast('이미 저장된 시간표예요.')
      return
    }
    const updated = [...savedSchedules, currentSchedule]
    setSavedSchedules(updated)
    setSaveToast('선택한 시간표를 저장했어요.')
  }

  const handleSavedCarousel = (direction) => {
    if (!savedSchedules.length) return
    setCurrentSavedIndex((prev) => {
      if (direction === 'prev') {
        return prev === 0 ? savedSchedules.length - 1 : prev - 1
      }
      return prev === savedSchedules.length - 1 ? 0 : prev + 1
    })
  }

  const handleToggleEdit = (scheduleId) => {
    setEditingScheduleId((prev) => (prev === scheduleId ? null : scheduleId))
    setNewBlock(createEmptyBlock())
  }

  const handleRemoveSaved = (scheduleId) => {
    setSavedSchedules((prev) => prev.filter((schedule) => schedule.id !== scheduleId))
    if (editingScheduleId === scheduleId) {
      setEditingScheduleId(null)
    }
    setSaveToast('저장된 시간표를 삭제했어요.')
  }

  const handleNewBlockChange = (field, value) => {
    setNewBlock((prev) => ({
      ...prev,
      [field]: field === 'start' || field === 'duration' ? Number(value) : value
    }))
  }

  const handleAddBlock = (scheduleId) => {
    const subject = newBlock.subject.trim()
    if (!subject) {
      setSaveToast('과목명을 입력해주세요.')
      return
    }
    const minStart = HOURS[0]
    const maxEnd = HOURS[0] + HOURS.length
    if (newBlock.start < minStart || newBlock.start >= maxEnd) {
      setSaveToast(`가능한 시작 시간은 ${minStart}~${maxEnd - 1}시예요.`)
      return
    }
    if (newBlock.duration < 1 || newBlock.start + newBlock.duration > maxEnd) {
      setSaveToast('수업 길이를 다시 확인해주세요.')
      return
    }

    const block = {
      id: `custom-${Date.now()}`,
      subject,
      professor: newBlock.professor.trim() || '미정',
      day: newBlock.day,
      start: Number(newBlock.start),
      duration: Number(newBlock.duration),
      room: newBlock.room.trim() || '강의실 미정',
      type: newBlock.type.trim() || '커스텀',
      color: newBlock.color
    }

    setSavedSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule.id !== scheduleId) return schedule
        const updatedBlocks = sortBlocks([...schedule.blocks, block])
        return {
          ...schedule,
          blocks: updatedBlocks,
          summary: buildSummary(updatedBlocks, schedule.preferenceSnapshot || schedule.preference || {})
        }
      })
    )
    setNewBlock(createEmptyBlock())
    setSaveToast('수업을 추가했어요.')
  }

  const handleRemoveBlock = (scheduleId, blockId) => {
    setSavedSchedules((prev) =>
      prev.map((schedule) => {
        if (schedule.id !== scheduleId) return schedule
        const updatedBlocks = schedule.blocks.filter((block) => block.id !== blockId)
        return {
          ...schedule,
          blocks: updatedBlocks,
          summary: buildSummary(updatedBlocks, schedule.preferenceSnapshot || schedule.preference || {})
        }
      })
    )
    setSaveToast('선택한 수업을 삭제했어요.')
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">📅 AI 시간표 플래너</h1>

        <section className="schedule-section">
          {isGenerating && (
            <div className="schedule-empty-card">
              <p>AI가 시간표를 조합하는 중입니다...</p>
            </div>
          )}

          {!isGenerating && !currentSchedule && (
            <div className="schedule-empty-card">
              <p>아직 생성된 시간표가 없어요.</p>
              <p>아래 채팅창에 원하는 조건을 입력하고 전송해보세요.</p>
            </div>
          )}

          {!isGenerating && currentSchedule && (
            <div className="schedule-option-card">
              <div className="schedule-option-header">
                <div>
                  <p className="option-title">{currentSchedule.title}</p>
                  <p className="option-summary">{currentSchedule.summary}</p>
                </div>
                <div className="schedule-navigation">
                  <button type="button" className="nav-button" onClick={() => handleNavigate('prev')}>
                    ←
                  </button>
                  <span className="nav-counter">
                    {currentOptionIndex + 1} / {scheduleOptions.length}
                  </span>
                  <button type="button" className="nav-button" onClick={() => handleNavigate('next')}>
                    →
                  </button>
                </div>
              </div>
              <SchedulePreview blocks={currentSchedule.blocks} />
              <div className="schedule-option-footer">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={handleSaveCurrent}
                  disabled={savedSchedules.some((schedule) => schedule.id === currentSchedule.id)}
                >
                  {savedSchedules.some((schedule) => schedule.id === currentSchedule.id)
                    ? '이미 저장된 시간표'
                    : '이 시간표 저장하기'}
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="chat-section">
          <h2>AI와 대화하기</h2>
          <div className="chat-window">
            {messages.map((message) => (
              <div key={message.id} className={`chat-message ${message.role}`}>
                <span className="chat-role">{message.role === 'ai' ? 'AI' : '나'}</span>
                <p>{message.text}</p>
              </div>
            ))}
            {isAiTyping && <p className="typing-indicator">AI가 생각 중...</p>}
          </div>
          <div className="chat-input-row">
            <input
              className="chat-input"
              type="text"
              placeholder="예: 수요일 공강, AI 전공 위주로, 오전 수업만"
              value={userInput}
              onChange={(event) => setUserInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <button type="button" className="chat-send-button" onClick={handleSendMessage}>
              전송
            </button>
          </div>
        </section>

        <section className="saved-section">
          <div className="saved-section-header">
            <h2>저장한 시간표</h2>
            {savedSchedules.length > 1 && (
              <div className="schedule-navigation">
                <button type="button" className="nav-button" onClick={() => handleSavedCarousel('prev')}>
                  ←
                </button>
                <span className="nav-counter">
                  {currentSavedIndex + 1} / {savedSchedules.length}
                </span>
                <button type="button" className="nav-button" onClick={() => handleSavedCarousel('next')}>
                  →
                </button>
              </div>
            )}
          </div>
          {savedSchedules.length === 0 ? (
            <div className="schedule-empty-card">
              <p>저장된 시간표가 없습니다.</p>
              <p>마음에 드는 조합을 저장하면 편집과 수업 추가가 가능해요.</p>
            </div>
          ) : (
            currentSavedSchedule && (
              <div className="saved-schedule-card" key={currentSavedSchedule.id}>
                <div className="saved-schedule-header">
                  <div>
                    <p className="saved-label">저장된 시간표</p>
                    <strong>{currentSavedSchedule.summary}</strong>
                  </div>
                  <div className="saved-controls">
                    <button
                      type="button"
                      className="ghost-button"
                      onClick={() => handleToggleEdit(currentSavedSchedule.id)}
                    >
                      {editingScheduleId === currentSavedSchedule.id ? '편집 닫기' : '편집'}
                    </button>
                    <button
                      type="button"
                      className="ghost-button danger"
                      onClick={() => handleRemoveSaved(currentSavedSchedule.id)}
                    >
                      삭제
                    </button>
                  </div>
                </div>
                <SchedulePreview blocks={currentSavedSchedule.blocks} />
                {editingScheduleId === currentSavedSchedule.id && (
                  <BlockEditPanel
                    schedule={currentSavedSchedule}
                    newBlock={newBlock}
                    onChange={handleNewBlockChange}
                    onAdd={() => handleAddBlock(currentSavedSchedule.id)}
                    onRemoveBlock={(blockId) => handleRemoveBlock(currentSavedSchedule.id, blockId)}
                  />
                )}
              </div>
            )
          )}
        </section>

        {saveToast && <div className="toast-banner">{saveToast}</div>}
      </div>
    </div>
  )
}

export default Schedule
