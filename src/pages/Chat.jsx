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
        text: `안녕하세요! ${senior.name}입니다.`,
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
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <button 
          className="p-1.5 rounded hover:bg-gray-100 transition-colors flex-shrink-0"
          onClick={() => navigate('/chatlist')}
        >
          <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 border border-indigo-200 flex items-center justify-center text-base flex-shrink-0">
          {senior.profileImage}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-sm font-semibold text-gray-900">{senior.name}</h2>
          <p className="text-xs text-gray-500">{senior.subject} - {senior.professorName} 수강</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.sent ? 'flex-row-reverse' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 border border-indigo-200 flex items-center justify-center text-sm flex-shrink-0">
              {msg.sent ? (
                <svg className="w-4 h-4 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              ) : (
                senior.profileImage
              )}
            </div>
            <div className={`flex flex-col ${msg.sent ? 'items-end' : 'items-start'} max-w-[75%]`}>
              <div className={`rounded-lg px-3 py-2 ${msg.sent ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-200 text-gray-900'}`}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
              </div>
              <p className="text-xs text-gray-400 mt-1 px-1">{msg.time}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form className="bg-white border-t border-gray-200 px-3 py-2.5 flex items-end gap-2" onSubmit={handleSend}>
        <textarea
          ref={inputRef}
          className="flex-1 resize-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="수업 후기나 궁금한 점을 물어보세요..."
          rows={1}
          style={{ maxHeight: '120px' }}
        />
        <button
          type="submit"
          className="w-9 h-9 rounded-lg bg-gradient-to-r from-indigo-600 to-blue-600 text-white flex items-center justify-center hover:from-indigo-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          disabled={!message.trim()}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>
    </div>
  )
}

export default Chat

