import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import '../App.css'

function ChatList() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [chats, setChats] = useState([])
  
  // URL 파라미터에서 자동으로 열 채팅방 확인
  const openChatId = searchParams.get('open')
  const professorId = searchParams.get('professor')

  // 선배 및 교수님 데이터 (실제로는 API에서 가져올 것)
  const seniorData = {
    1: { name: '김선배', major: '컴퓨터공학과', year: '20학번', profileImage: '👨‍💻', subject: '자료구조', professorName: '김교수', professorId: 'prof1' },
    2: { name: '이선배', major: '컴퓨터공학과', year: '21학번', profileImage: '👩‍💼', subject: '자료구조', professorName: '김교수', professorId: 'prof1' },
    3: { name: '박선배', major: '컴퓨터공학과', year: '19학번', profileImage: '👨‍🎓', subject: '알고리즘', professorName: '박교수', professorId: 'prof2' },
    4: { name: '최선배', major: '컴퓨터공학과', year: '20학번', profileImage: '👩‍🎓', subject: '알고리즘', professorName: '박교수', professorId: 'prof2' },
    5: { name: '정선배', major: '컴퓨터공학과', year: '18학번', profileImage: '👨‍💻', subject: '데이터베이스', professorName: '이교수', professorId: 'prof3' },
    6: { name: '강선배', major: '컴퓨터공학과', year: '21학번', profileImage: '👩‍💼', subject: '데이터베이스', professorName: '이교수', professorId: 'prof3' },
    7: { name: '윤선배', major: '컴퓨터공학과', year: '20학번', profileImage: '👨‍🎓', subject: '웹프로그래밍', professorName: '최교수', professorId: 'prof4' }
  }

  // 채팅 목록 로드 (실제로는 API에서 가져올 것)
  useEffect(() => {
    // 예시: 최근 대화한 선배들 (로컬 스토리지나 API에서 가져올 수 있음)
    const recentChats = [
      { seniorId: 1, lastMessage: '수업 후기 궁금하시면 언제든 물어보세요!', lastTime: '오후 2:30', unread: 0 },
      { seniorId: 3, lastMessage: '알고리즘 수업은 정말 도움이 됐어요', lastTime: '오전 11:20', unread: 2 },
      { seniorId: 5, lastMessage: '데이터베이스 수업 자료 공유해드릴게요', lastTime: '어제', unread: 0 }
    ]
    setChats(recentChats)
    
    // URL 파라미터에 open이 있으면 해당 채팅방으로 자동 이동
    if (openChatId && professorId) {
      // 약간의 지연을 두어 채팅 목록이 먼저 렌더링되도록
      setTimeout(() => {
        navigate(`/chat/${openChatId}?professor=${professorId}`, { replace: true })
      }, 100)
    }
  }, [openChatId, professorId, navigate])

  const handleChatClick = (seniorId) => {
    const senior = seniorData[seniorId]
    if (senior) {
      navigate(`/chat/${seniorId}?professor=${senior.professorId}`)
    }
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">채팅</h1>
        
        {chats.length === 0 ? (
          <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-1">아직 대화한 선배가 없습니다.</p>
            <p className="text-xs text-gray-400">선배 연결에서 선배를 선택하여 대화를 시작해보세요!</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {chats.map((chat) => {
              const senior = seniorData[chat.seniorId]
              if (!senior) return null
              
              return (
                <div
                  key={chat.seniorId}
                  className="bg-white rounded-lg p-3 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer active:scale-[0.99]"
                  onClick={() => handleChatClick(chat.seniorId)}
                >
                  <div className="flex gap-3 items-start">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 border border-indigo-200 flex items-center justify-center text-lg flex-shrink-0">
                      {senior.profileImage}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-semibold text-gray-900">{senior.name}</h3>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{chat.lastTime}</span>
                      </div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-gray-600">{senior.subject} - {senior.professorName}</span>
                        {chat.unread > 0 && (
                          <span className="bg-indigo-600 text-white text-xs font-medium px-2 py-0.5 rounded-full min-w-[20px] text-center flex-shrink-0 ml-2">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-1">{chat.lastMessage}</p>
                    </div>
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

