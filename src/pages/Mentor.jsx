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
        <h1 className="page-title">👥 선배 연결</h1>
        
        {/* 필터 섹션 - 교수님별 */}
        <div className="filter-section">
          <select 
            className="filter-select full-width"
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
        <div className="privacy-notice">
          <span className="privacy-icon">💬</span>
          <span className="privacy-text">수강을 고민 중인 수업의 선수강자 선배들과 연결되어 실제 후기와 조언을 받아보세요.</span>
        </div>

        {/* 선배 목록 */}
        {filteredSeniors.length === 0 ? (
          <div className="empty-state">
            <p>선택하신 교수님의 수업을 수강한 선배가 없습니다.</p>
          </div>
        ) : (
          <div className="senior-list">
            {filteredSeniors.map((senior) => (
              <div 
                key={`${senior.professorId}-${senior.id}`} 
                className="senior-card"
                onClick={() => handleSeniorClick(senior.id, senior.professorId)}
              >
                <div className="senior-profile">
                  <div className="senior-avatar">{senior.profileImage}</div>
                  <div className="senior-info">
                    <div className="senior-name-row">
                      <h3 className="senior-name">{senior.name}</h3>
                      <span className="verified-badge">✓</span>
                    </div>
                    <p className="senior-education">
                      {senior.major} {senior.year}
                    </p>
                    <div className="senior-course-info">
                      <span className="course-tag">
                        📚 {senior.subject} - {senior.professorName}
                      </span>
                    </div>
                    <div className="senior-badges">
                      {senior.tags.map((tag, idx) => (
                        <span key={idx} className="badge">{tag}</span>
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

