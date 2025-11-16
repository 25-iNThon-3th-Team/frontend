import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import '../App.css'
import axios from '../api/axios.js'

function Chat() {
  const { roomId } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [opponent, setOpponent] = useState({

    })
    const [chat, setChat] = useState([])
    const [room, setRoom] = useState(null)

    const [hasNewChat, setHasNewChat] = useState(false)

  // 현재 사용자 ID (실제로는 인증 시스템에서 가져올 것)
  const currentUserId = 'currentUser'

  // 채팅 시작자 정보 (실제로는 API나 로컬 스토리지에서 가져올 것)
  const initiatedBy = searchParams.get('initiatedBy') || false


    const isUserSender = () => {
        return room && room.sender?.id?.toString() === user?.id
    }

  // 초기 메시지 설정
  useEffect(() => {
      const fetchData = async () => {
          setIsLoading(true)
          const rooms = await axios.get(`/api/chat/rooms/${roomId}`);
          const chatData = await axios.get(`/api/chat/rooms/${roomId}/messages`);
          setChat(chatData.data);
          setRoom(rooms.data);
          const user = await axios.get('/api/users/me');
          setUser(user.data);
          const userId = user.data.id
          const opp = rooms.data.sender.id.toString() === userId ? rooms.data.receiver : rooms.data.sender;
          setOpponent(opp)
          setHasNewChat(false)
          setIsLoading(false)
      }
      fetchData()
  }, [roomId]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            if(hasNewChat) {
                const chatData = await axios.get(`/api/chat/rooms/${roomId}/messages`);
                setChat(chatData.data);
                await axios.post(`/api/chat/rooms/${roomId}/read`);
            }
            setHasNewChat(false)
            setIsLoading(false)
        }
        fetchData()
    }, [hasNewChat]);

  // Polling
    useEffect(() => {
        let polling = setInterval(() => {
            const poll = async () => {
                const ret = await axios.get(`/api/chat/rooms/${roomId}/messages/poll`);
                const pollData = ret.data;
                if(pollData.messages.length > 0 || pollData.hasMore) {
                    setHasNewChat(true);
                }
            }
            poll();
        }, 500);

        // 페이지에 벗어날 경우 polling X
        return () => {
            clearInterval(polling);
        };
    }, []);

  // 메시지 전송 시 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chat])

  const handleSend = async (e) => {
    e?.preventDefault()
    if (!message.trim()) return
    const res = await axios.post(`/api/chat/rooms/${roomId}/messages`, {content: message.trim()});

    setChat(prev => [...prev, res.data])
    setMessage('')
      setHasNewChat(true)
    inputRef.current?.focus()
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
        <div className="chat-header-avatar">{}</div>
        <div className="chat-header-info">
          <div className="chat-header-name-wrapper">
            <h2 className="chat-header-name">{opponent.username}</h2>
            {/* 상대방이 선배일 때 선배 딱지, 후배일 때 후배 딱지 표시 */}
            {user && isUserSender() && (
              <span className="role-badge role-badge-senior">
                선배
              </span>
            )}
            {user && !isUserSender() && (
              <span className="role-badge role-badge-junior">
                후배
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {chat.length === 0 ? (
          <div className="chat-empty-state">
            <p className="chat-empty-text">아직 채팅 내용이 없습니다.</p>
            <p className="chat-empty-hint">궁금한 점을 물어보세요!</p>
          </div>
        ) : (
          chat.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg?.senderId?.toString() === user?.id ? 'sent' : ''}`}>
              <div className="chat-message-avatar">
                {'👤'}
              </div>
              <div className="chat-message-content">
                <p className="chat-message-text">{msg.content}</p>
                <p className="chat-message-time">{new Date(msg.sentAt).toLocaleTimeString()}</p>
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

