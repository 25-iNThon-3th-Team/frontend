import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import '../App.css'
import axios from "../api/axios.js";

function ChatList() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [chats, setChats] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('전체') // '전체', '선배', '후배'
  const [rooms, setRooms] = useState([])
    const [user, setUser] = useState(null)
  // 현재 사용자 ID (실제로는 인증 시스템에서 가져올 것)
  const currentUserId = 'currentUser'
  
  // URL 파라미터에서 자동으로 열 채팅방 확인
  const openChatId = searchParams.get('open')
  const professorId = searchParams.get('professor')
  const initiatedBy = searchParams.get('initiatedBy')
  const subject = searchParams.get('subject')
  const professorName = searchParams.get('professorName')

  // 채팅 목록 로드 및 업데이트
  useEffect(() => {

      // URL 파라미터에 open이 있으면 해당 채팅방으로 자동 이동
      if (openChatId) {
          setTimeout(() => {
              const initiatedByParam = initiatedBy || currentUserId
              navigate(`/chat/${openChatId}?initiate=true`, { replace: true })
          }, 100)
      }

      console.log('loglog')

    const loadChats = async () => {
        const userResp = await axios.get('/api/users/me');
        setUser(userResp.data);
        const roomsResp = await axios.get('/api/chat/rooms');
        setRooms(roomsResp.data);
    }
    
    loadChats()

  }, [])

    useEffect(() => {
        let polling = setInterval(() => {
            const poll = async () => {
                const roomsResp = await axios.get('/api/chat/rooms');
                setRooms(roomsResp.data);
            }
            poll();
        }, 1000);

        // 페이지에 벗어날 경우 polling X
        return () => {
            clearInterval(polling);
        };
    }, []);

  // 검색 및 필터링
  const filteredChats = rooms.filter(room => {
    // 선배/후배 필터
    const isOpponentSenior = room.sender.id.toString() === user.id // 내가 먼저 시작 = 상대방이 선배
    if (roleFilter === '선배' && !isOpponentSenior) return false
    if (roleFilter === '후배' && isOpponentSenior) return false
    
    // 검색어 필터
    if (!searchQuery.trim()) return true

    const query = searchQuery.toLowerCase()

      const subject = room.sender.id.toString() === user.id ? room.receiver.username : room.sender.username
    
    return (
      (subject || '').toLowerCase().startsWith(query) ||
      (room.lastMessage || '').toLowerCase().includes(query)
    )
  })

  const handleChatClick = (roomId) => {
    const room = rooms.find(room => room.id === roomId)
    if (room) {
      navigate(`/chat/${room.id}`)
    }
  }

  const handleDeleteChat = (e, chatKey) => {
    e.stopPropagation() // 채팅 클릭 이벤트 전파 방지
    
    if (window.confirm('이 채팅방을 삭제하시겠습니까?')) {
      const updatedChats = chats.filter(chat => chat.key !== chatKey)
      setChats(updatedChats)
    }
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">채팅</h1>
        
        {/* 검색 바 및 필터 */}
        {rooms.length > 0 && (
          <div className="mb-3 space-y-2">
            <input
              type="text"
              placeholder="이름으로 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setRoleFilter('전체')}
                className={`flex-1 px-3 py-1.5 text-xs rounded-lg transition-colors ${
                  roleFilter === '전체'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                전체
              </button>
              <button
                onClick={() => setRoleFilter('선배')}
                className={`flex-1 px-3 py-1.5 text-xs rounded-lg transition-colors ${
                  roleFilter === '선배'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                선배
              </button>
              <button
                onClick={() => setRoleFilter('후배')}
                className={`flex-1 px-3 py-1.5 text-xs rounded-lg transition-colors ${
                  roleFilter === '후배'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                후배
              </button>
            </div>
          </div>
        )}
        
        {filteredChats.length === 0 ? (
          <div className="empty-state">
            {searchQuery ? (
              <>
                <p>검색 결과가 없습니다.</p>
                <p className="empty-state-hint">다른 검색어를 시도해보세요.</p>
              </>
            ) : (
              <>
                {roleFilter === '전체' && (
                  <>
                    <p>아직 채팅이 없습니다.</p>
                  </>
                )}
                {roleFilter === '선배' && (
                  <>
                    <p>아직 채팅이 없습니다.</p>
                  </>
                )}
                {roleFilter === '후배' && (
                  <>
                    <p>아직 연락온 후배가 없습니다.</p>
                  </>
                )}
              </>
            )}
          </div>
        ) : (
          <div className="chat-list">
            {filteredChats.map((chat) => {
                const isOpponentSenior = chat.sender.id.toString() === user.id // 상대방이 선배인지 여부
            const isOpponentJunior = chat.sender.id.toString() !== user.id // 상대방이 후배인지 여부
              const senior = chat.sender.id.toString() === user.id ? chat.receiver : chat.sender
              if (!senior) return null
              
              // 내가 먼저 채팅을 건 경우 = 내가 후배, 상대방이 선배
              // 채팅을 받은 경우 = 내가 선배, 상대방이 후배
              
              return (
                <div
                  key={chat.id}
                  className="chat-item"
                  onClick={() => handleChatClick(chat.id)}
                >
                  <div className="chat-item-avatar">{senior.profileImage}</div>
                  <div className="chat-item-content">
                    <div className="chat-item-header">
                      <div className="chat-item-name-wrapper">
                        <h3 className="chat-item-name">{senior.username}</h3>

                          <div className="chat-item-info">
                              {chat.unreadCount > 0 && (
                                  <span className="chat-item-unread">{chat.unreadCount}</span>
                              )}
                          </div>
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
                      <div className="flex items-center gap-2">
                        <span className="chat-item-time">{new Date(chat.lastMessageAt).toLocaleDateString()}</span>
                        <button
                          onClick={(e) => handleDeleteChat(e, chat.key)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          title="삭제"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="chat-item-preview">{chat.lastMessage || '새로운 채팅방'}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatList
