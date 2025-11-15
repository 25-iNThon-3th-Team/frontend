import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'

function Mentor() {
  const navigate = useNavigate()
  const [selectedProfessor, setSelectedProfessor] = useState('전체')

  // 교수님별 선배 데이터 (예시)
  const seniorsByProfessor = [
    {
      professorId: 'prof1',
      professorName: '김교수',
      subject: '자료구조',
      seniors: [
        {
          id: 1,
          name: '김선배',
          major: '컴퓨터공학과',
          year: '20학번',
          tags: ['추천', '후기', '자료공유'],
          profileImage: '👨‍💻'
        },
        {
          id: 2,
          name: '이선배',
          major: '컴퓨터공학과',
          year: '21학번',
          tags: ['후기', '자료공유'],
          profileImage: '👩‍💼'
        }
      ]
    },
    {
      professorId: 'prof2',
      professorName: '박교수',
      subject: '알고리즘',
      seniors: [
        {
          id: 3,
          name: '박선배',
          major: '컴퓨터공학과',
          year: '19학번',
          tags: ['추천', '후기'],
          profileImage: '👨‍🎓'
        },
        {
          id: 4,
          name: '최선배',
          major: '컴퓨터공학과',
          year: '20학번',
          tags: ['자료공유'],
          profileImage: '👩‍🎓'
        }
      ]
    },
    {
      professorId: 'prof3',
      professorName: '이교수',
      subject: '데이터베이스',
      seniors: [
        {
          id: 5,
          name: '정선배',
          major: '컴퓨터공학과',
          year: '18학번',
          tags: ['추천', '후기', '자료공유'],
          profileImage: '👨‍💻'
        },
        {
          id: 6,
          name: '강선배',
          major: '컴퓨터공학과',
          year: '21학번',
          tags: ['후기'],
          profileImage: '👩‍💼'
        }
      ]
    },
    {
      professorId: 'prof4',
      professorName: '최교수',
      subject: '웹프로그래밍',
      seniors: [
        {
          id: 7,
          name: '윤선배',
          major: '컴퓨터공학과',
          year: '20학번',
          tags: ['추천', '자료공유'],
          profileImage: '👨‍🎓'
        }
      ]
    }
  ]

  // 교수님 목록
  const professors = seniorsByProfessor.map(prof => ({
    id: prof.professorId,
    name: prof.professorName,
    subject: prof.subject,
    displayName: `${prof.subject} - ${prof.professorName}`
  }))

  // 선택된 교수님에 따른 선배 목록 필터링
  const filteredSeniors = useMemo(() => {
    if (selectedProfessor === '전체') {
      // 전체 선택 시 모든 선배를 평탄화
      return seniorsByProfessor.flatMap(prof => 
        prof.seniors.map(senior => ({
          ...senior,
          professorId: prof.professorId,
          professorName: prof.professorName,
          subject: prof.subject
        }))
      )
    }
    
    const selectedProf = seniorsByProfessor.find(p => p.professorId === selectedProfessor)
    if (!selectedProf) return []
    
    return selectedProf.seniors.map(senior => ({
      ...senior,
      professorId: selectedProf.professorId,
      professorName: selectedProf.professorName,
      subject: selectedProf.subject
    }))
  }, [selectedProfessor])

  const handleSeniorClick = (seniorId, professorId) => {
    // 채팅 목록으로 이동하고, 해당 선배와의 채팅방으로 자동 이동
    navigate(`/chatlist?open=${seniorId}&professor=${professorId}`)
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">선배 연결</h1>
        
        {/* 필터 섹션 - 교수님별 */}
        <div className="mb-3">
          <select 
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-900 focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%234F46E5' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 12px center',
              backgroundSize: '12px',
              paddingRight: '36px'
            }}
            value={selectedProfessor}
            onChange={(e) => setSelectedProfessor(e.target.value)}
          >
            <option value="전체">전체 교수님</option>
            {professors.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.displayName}
              </option>
            ))}
          </select>
        </div>

        {/* 안내 문구 */}
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200 rounded-lg px-3.5 py-2.5 mb-3">
          <span className="text-xs text-gray-700 leading-relaxed">수강을 고민 중인 수업의 선수강자 선배들과 연결되어 실제 후기와 조언을 받아보세요.</span>
        </div>

        {/* 선배 목록 */}
        {filteredSeniors.length === 0 ? (
          <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
            <p className="text-sm text-gray-500">선택하신 교수님의 수업을 수강한 선배가 없습니다.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {filteredSeniors.map((senior) => (
              <div 
                key={`${senior.professorId}-${senior.id}`} 
                className="bg-white rounded-lg p-3 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer active:scale-[0.99]"
                onClick={() => handleSeniorClick(senior.id, senior.professorId)}
              >
                <div className="flex gap-3 items-start">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 border border-indigo-200 flex items-center justify-center text-lg flex-shrink-0">
                    {senior.profileImage}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">{senior.name}</h3>
                      <svg className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-xs text-gray-600 mb-1.5">
                      {senior.major} {senior.year}
                    </p>
                    <div className="mb-2">
                      <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-200 inline-block">
                        {senior.subject} - {senior.professorName}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {senior.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs px-2 py-0.5 bg-white text-indigo-700 rounded border border-indigo-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Mentor

