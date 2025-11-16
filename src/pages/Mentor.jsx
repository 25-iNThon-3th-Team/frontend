import {useState, useMemo, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import axios from '../api/axios.js'

function Mentor() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedSeniors, setExpandedSeniors] = useState(new Set())

    const [majors, setMajors] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
      const fetchData = async () => {
          const majorsResp = await axios.get('/api/majors');
          setMajors(majorsResp.data);
          const userResp = await axios.get('/api/users/me');
          setUser(userResp.data);
          const usersResp = await axios.get('/api/connect');
          setUsers(usersResp.data.filter(item => item.user.id.toString() !== userResp.data.id.toString()));
      }
      fetchData()
  }, [])

  // 검색어로 필터링된 선배 목록
  const filteredSeniors = useMemo(() => {
      console.log(users);
    if (!searchQuery.trim()) {
      return users
    }
    
    const query = searchQuery.toLowerCase()
    
    return users
      .map(senior => {
        // 검색어와 일치하는 수업만 필터링
        const matchedCourses = senior.courses.filter(course =>
          course.course.name.toLowerCase().includes(query) ||
          course.professorName.toLowerCase().includes(query)
        )
        
        // 일치하는 수업이 있으면 해당 선배와 수업 반환
        if (matchedCourses.length > 0) {
          return {
            ...senior,
            courses: matchedCourses
          }
        }
        return null
      })
      .filter(senior => senior !== null)
  }, [searchQuery, users])

  // 선배 클릭 시 수업 목록 토글
  const handleSeniorClick = (seniorId) => {
    setExpandedSeniors(prev => {
      const newSet = new Set(prev)
      if (newSet.has(seniorId)) {
        newSet.delete(seniorId)
      } else {
        newSet.add(seniorId)
      }
      return newSet
    })
  }

  const majorString = (majorId) => {
      console.log(majorId)
      return majors.find((major) => {console.log(major); return major.code === majorId})?.name
  }

  // 채팅 시작
  const handleStartChat = async (e, seniorId) => {
    e.stopPropagation() // 선배 클릭 이벤트 전파 방지

      const roomResp = await axios.post('/api/chat/rooms', {'otherUserId': seniorId});
      if(roomResp.data){
          navigate(`/chat/${roomResp.data.id}`);
      }
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">선배 연결</h1>
        
        {/* 검색 섹션 */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="과목, 교수님 이름으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
        </div>

        {/* 안내 문구 */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:!from-gray-800 dark:!to-gray-700 border border-indigo-200 dark:border-gray-600 rounded-lg px-3.5 py-2.5 mb-3">
          <span className="text-xs text-gray-700 leading-relaxed">수강을 고민 중인 수업의 선수강자 선배들과 연결되어 실제 후기와 조언을 받아보세요.</span>
        </div>

        {/* 선배 목록 */}
        {filteredSeniors.length === 0 ? (
          <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              {searchQuery ? '검색 결과가 없습니다.' : '선배가 없습니다.'}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredSeniors.map((senior) => {
              const isExpanded = expandedSeniors.has(senior.user.id)
              
              return (
                <div 
                  key={senior.user.id}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  {/* 선배 정보 헤더 */}
                  <div 
                    className="p-3 mentor-tile-header transition-all cursor-pointer"
                    onClick={() => handleSeniorClick(senior.user.id)}
                  >
                    <div className="flex gap-3 items-start">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 border border-indigo-200 flex items-center justify-center text-lg flex-shrink-0">
                        {senior.profileImage}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-1">
                          <h3 className="text-sm font-semibold text-gray-900">{senior.user.username}</h3>
                          <svg className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-600 mb-1.5">
                          {majorString(senior.user.majorCode)} {senior.user.year}
                        </p>
                        {!searchQuery && (
                          <div className="text-xs text-gray-500">
                            {senior.courses.length}개 수업 수강
                          </div>
                        )}
                        {searchQuery && senior.courses.length > 0 && (
                          <div className="space-y-1">
                            {senior.courses.map((course, idx) => (
                              <div key={idx} className="text-xs text-indigo-700">
                                {course.course.name} - {course.professorName} 수강
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <svg 
                          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* 수업 목록 (펼쳐졌을 때) */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 bg-gray-50">
                      <div className="p-3 space-y-2">
                        {senior.courses.map((course, idx) => (
                          <div 
                            key={idx}
                            className="flex items-center justify-between p-2.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-900">
                                {course.course.name}
                              </div>
                              <div className="text-xs text-gray-600 mt-0.5">
                                {course.professorName} 교수님
                              </div>
                            </div>
                            <button
                              onClick={(e) => handleStartChat(e, senior.user.id, course.id, course.course.name, course.professorName)}
                              className="px-3 py-1.5 bg-indigo-500 text-white text-xs rounded-lg hover:bg-indigo-600 transition-colors flex-shrink-0 ml-2"
                            >
                              채팅하기
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Mentor
