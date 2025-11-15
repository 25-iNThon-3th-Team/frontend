import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import '../App.css'

function Chat() {
  const { seniorId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // 현재 사용자 ID (실제로는 인증 시스템에서 가져올 것)
  const currentUserId = 'currentUser'
  
  const professorId = searchParams.get('professor') || 'prof1'
  // 채팅 시작자 정보 (실제로는 API나 로컬 스토리지에서 가져올 것)
  const initiatedBy = searchParams.get('initiatedBy') || 'currentUser'
  const subject = searchParams.get('subject') || ''
  const professorName = searchParams.get('professorName') || ''

  // 선배 데이터 (실제로는 API에서 가져올 것)
  const seniorData = {
    1: { name: '김선배', major: '컴퓨터공학과', year: '20학번', profileImage: '👨‍💻' },
    2: { name: '이선배', major: '컴퓨터공학과', year: '21학번', profileImage: '👩‍💼' },
    3: { name: '박선배', major: '컴퓨터공학과', year: '19학번', profileImage: '👨‍🎓' },
    4: { name: '최선배', major: '컴퓨터공학과', year: '20학번', profileImage: '👩‍🎓' },
    5: { name: '정선배', major: '컴퓨터공학과', year: '18학번', profileImage: '👨‍💻' },
    6: { name: '강선배', major: '컴퓨터공학과', year: '21학번', profileImage: '👩‍💼' },
    7: { name: '윤선배', major: '컴퓨터공학과', year: '20학번', profileImage: '👨‍🎓' },
    8: { name: '조선배', major: '컴퓨터공학과', year: '19학번', profileImage: '👩‍💻' },
    9: { name: '한선배', major: '컴퓨터공학과', year: '21학번', profileImage: '👨‍💼' },
    10: { name: '송선배', major: '컴퓨터공학과', year: '20학번', profileImage: '👩‍🎓' }
  }

  const senior = seniorData[seniorId] || seniorData[1]
  const displaySubject = subject ? decodeURIComponent(subject) : '자료구조'
  const displayProfessorName = professorName ? decodeURIComponent(professorName) : '김교수'
  
  // 내가 먼저 채팅을 건 경우 = 내가 후배, 상대방이 선배
  // 채팅을 받은 경우 = 내가 선배, 상대방이 후배
  const isOpponentSenior = initiatedBy === currentUserId // 상대방이 선배인지 여부
  const isOpponentJunior = initiatedBy !== currentUserId // 상대방이 후배인지 여부

  // 초기 메시지 설정
  useEffect(() => {
    // 내가 먼저 연락을 건 경우(상대방이 선배)에는 환영 메시지 없음
    // 후배가 먼저 연락을 건 경우(상대방이 후배)에는 환영 메시지 표시
    if (isOpponentJunior) {
      // 후배가 먼저 연락을 건 경우 - 환영 메시지 표시
      const welcomeMessages = [
        {
          id: 1,
          text: `안녕하세요! ${senior.name}입니다. 😊`,
          sent: false,
          time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        },
        {
          id: 2,
          text: `${displayProfessorName}님의 ${displaySubject} 수업을 수강했었어요. 수업에 대한 궁금한 점이나 후기가 궁금하시면 언제든 물어보세요!`,
          sent: false,
          time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
        }
      ]
      setMessages(welcomeMessages)
    } else {
      // 내가 먼저 연락을 건 경우 - 빈 메시지
      setMessages([])
    }
  }, [seniorId, senior.name, displayProfessorName, displaySubject, isOpponentJunior])

  // 메시지 전송 시 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (e) => {
    e?.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: Date.now(),
      text: message,
      sent: true,
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, newMessage])
    setMessage('')
    inputRef.current?.focus()

    // 자동 응답 제거 - 실제 사람이 답변할 것입니다
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="chat-back-button" onClick={() => navigate('/chatlist')}>
          ←
        </button>
        <div className="chat-header-avatar">{senior.profileImage}</div>
        <div className="chat-header-info">
          <div className="chat-header-name-wrapper">
            <h2 className="chat-header-name">{senior.name}</h2>
            {/* 상대방이 선배일 때 선배 딱지, 후배일 때 후배 딱지 표시 */}
            {isOpponentSenior && (
              <span className="role-badge role-badge-senior">
                선배
              </span>
            )}
            {isOpponentJunior && (
              <span className="role-badge role-badge-junior">
                후배
              </span>
            )}
          </div>
          <p className="chat-header-status">{displaySubject} - {displayProfessorName} 수강</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="chat-empty-state">
            <p className="chat-empty-text">아직 채팅 내용이 없습니다.</p>
            <p className="chat-empty-hint">궁금한 점을 물어보세요!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.sent ? 'sent' : ''}`}>
              <div className="chat-message-avatar">
                {msg.sent ? '👤' : senior.profileImage}
              </div>
              <div className="chat-message-content">
                <p className="chat-message-text">{msg.text}</p>
                <p className="chat-message-time">{msg.time}</p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-container" onSubmit={handleSend}>
        <textarea
          ref={inputRef}
          className="chat-input"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="수업 후기나 궁금한 점을 물어보세요..."
          rows={1}
        />
        <button
          type="submit"
          className="chat-send-button"
          disabled={!message.trim()}
        >
        </button>
      </form>
    </div>
  )
}

export default Chat

