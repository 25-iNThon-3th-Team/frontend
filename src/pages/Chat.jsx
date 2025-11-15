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

  const professorId = searchParams.get('professor') || 'prof1'

  // 선배 및 교수님 데이터 (실제로는 API에서 가져올 것)
  const seniorData = {
    1: { name: '김선배', major: '컴퓨터공학과', year: '20학번', profileImage: '👨‍💻', subject: '자료구조', professorName: '김교수' },
    2: { name: '이선배', major: '컴퓨터공학과', year: '21학번', profileImage: '👩‍💼', subject: '자료구조', professorName: '김교수' },
    3: { name: '박선배', major: '컴퓨터공학과', year: '19학번', profileImage: '👨‍🎓', subject: '알고리즘', professorName: '박교수' },
    4: { name: '최선배', major: '컴퓨터공학과', year: '20학번', profileImage: '👩‍🎓', subject: '알고리즘', professorName: '박교수' },
    5: { name: '정선배', major: '컴퓨터공학과', year: '18학번', profileImage: '👨‍💻', subject: '데이터베이스', professorName: '이교수' },
    6: { name: '강선배', major: '컴퓨터공학과', year: '21학번', profileImage: '👩‍💼', subject: '데이터베이스', professorName: '이교수' },
    7: { name: '윤선배', major: '컴퓨터공학과', year: '20학번', profileImage: '👨‍🎓', subject: '웹프로그래밍', professorName: '최교수' }
  }

  const senior = seniorData[seniorId] || seniorData[1]

  // 초기 환영 메시지
  useEffect(() => {
    const welcomeMessages = [
      {
        id: 1,
        text: `안녕하세요! ${senior.name}입니다. 😊`,
        sent: false,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      },
      {
        id: 2,
        text: `${senior.professorName}님의 ${senior.subject} 수업을 수강했었어요. 수업에 대한 궁금한 점이나 후기가 궁금하시면 언제든 물어보세요!`,
        sent: false,
        time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      }
    ]
    setMessages(welcomeMessages)
  }, [seniorId, senior.name, senior.professorName, senior.subject])

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
          <h2 className="chat-header-name">{senior.name}</h2>
          <p className="chat-header-status">{senior.subject} - {senior.professorName} 수강</p>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.sent ? 'sent' : ''}`}>
            <div className="chat-message-avatar">
              {msg.sent ? '👤' : senior.profileImage}
            </div>
            <div className="chat-message-content">
              <p className="chat-message-text">{msg.text}</p>
              <p className="chat-message-time">{msg.time}</p>
            </div>
          </div>
        ))}
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
          ➤
        </button>
      </form>
    </div>
  )
}

export default Chat

