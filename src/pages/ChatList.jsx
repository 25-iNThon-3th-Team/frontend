import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import '../App.css'

function ChatList() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [chats, setChats] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState('전체') // '전체', '선배', '후배'
  
  // 현재 사용자 ID (실제로는 인증 시스템에서 가져올 것)
  const currentUserId = 'currentUser'
  
  // URL 파라미터에서 자동으로 열 채팅방 확인
  const openChatId = searchParams.get('open')
  const professorId = searchParams.get('professor')
  const initiatedBy = searchParams.get('initiatedBy')
  const subject = searchParams.get('subject')
  const professorName = searchParams.get('professorName')

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

  // 채팅 목록 로드 및 업데이트
  useEffect(() => {
    const loadChats = () => {
      let storedChats = JSON.parse(localStorage.getItem('chats') || '[]')
      
      // URL 파라미터로 새 채팅이 전달된 경우 추가
      if (openChatId && professorId && initiatedBy && subject && professorName) {
        const chatKey = `${openChatId}-${professorId}`
        const existingChat = storedChats.find(chat => chat.key === chatKey)
        
        if (!existingChat) {
          const newChat = {
            key: chatKey,
            seniorId: parseInt(openChatId),
            professorId,
            subject: decodeURIComponent(subject),
            professorName: decodeURIComponent(professorName),
            lastMessage: '',
            lastTime: '방금',
            unread: 0,
            initiatedBy
          }
          storedChats.unshift(newChat)
          localStorage.setItem('chats', JSON.stringify(storedChats))
        }
      }
      
      setChats(storedChats)
    }
    
    loadChats()
    
    // URL 파라미터에 open이 있으면 해당 채팅방으로 자동 이동
    if (openChatId && professorId) {
      setTimeout(() => {
        const initiatedByParam = initiatedBy || currentUserId
        navigate(`/chat/${openChatId}?professor=${professorId}&initiatedBy=${initiatedByParam}`, { replace: true })
      }, 100)
    }
  }, [openChatId, professorId, initiatedBy, subject, professorName, navigate, currentUserId])

  // 검색 및 필터링
  const filteredChats = chats.filter(chat => {
    // 선배/후배 필터
    const isOpponentSenior = chat.initiatedBy === currentUserId // 내가 먼저 시작 = 상대방이 선배
    if (roleFilter === '선배' && !isOpponentSenior) return false
    if (roleFilter === '후배' && isOpponentSenior) return false
    
    // 검색어 필터
    if (!searchQuery.trim()) return true
    
    const senior = seniorData[chat.seniorId]
    const query = searchQuery.toLowerCase()
    
    return (
      (chat.subject || '').toLowerCase().includes(query) ||
      (chat.professorName || '').toLowerCase().includes(query) ||
      (chat.lastMessage || '').toLowerCase().includes(query)
    )
  })

  const handleChatClick = (chat) => {
    const senior = seniorData[chat.seniorId]
    if (senior) {
      navigate(`/chat/${chat.seniorId}?professor=${chat.professorId}&initiatedBy=${chat.initiatedBy}&subject=${encodeURIComponent(chat.subject)}&professorName=${encodeURIComponent(chat.professorName)}`)
    }
  }

  const handleDeleteChat = (e, chatKey) => {
    e.stopPropagation() // 채팅 클릭 이벤트 전파 방지
    
    if (window.confirm('이 채팅방을 삭제하시겠습니까?')) {
      const updatedChats = chats.filter(chat => chat.key !== chatKey)
      setChats(updatedChats)
      localStorage.setItem('chats', JSON.stringify(updatedChats))
    }
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">💬 채팅</h1>
        
        {/* 검색 바 및 필터 */}
        {chats.length > 0 && (
          <div className="mb-3 space-y-2">
            <input
              type="text"
              placeholder="과목, 교수님으로 검색..."
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
              const senior = seniorData[chat.seniorId]
              if (!senior) return null
              
              // 내가 먼저 채팅을 건 경우 = 내가 후배, 상대방이 선배
              // 채팅을 받은 경우 = 내가 선배, 상대방이 후배
              const isOpponentSenior = chat.initiatedBy === currentUserId // 상대방이 선배인지 여부
              const isOpponentJunior = chat.initiatedBy !== currentUserId // 상대방이 후배인지 여부
              
              return (
                <div
                  key={chat.key}
                  className="chat-item"
                  onClick={() => handleChatClick(chat)}
                >
                  <div className="chat-item-avatar">{senior.profileImage}</div>
                  <div className="chat-item-content">
                    <div className="chat-item-header">
                      <div className="chat-item-name-wrapper">
                        <h3 className="chat-item-name">{senior.name}</h3>
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
                        <span className="chat-item-time">{chat.lastTime}</span>
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
                    <div className="chat-item-info">
                      <span className="chat-item-course">{chat.subject} - {chat.professorName}</span>
                      {chat.unread > 0 && ( 
                        <span className="chat-item-unread">{chat.unread}</span>
                      )}
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
