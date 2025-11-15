import '../App.css'

function MyPage() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">👤 마이페이지</h1>
        <div className="page-card">
          <div className="profile-section">
            <div className="profile-avatar">👤</div>
            <h2 className="profile-name">사용자</h2>
            <p className="profile-email">user@example.com</p>
          </div>
          <div className="menu-list">
            <div className="menu-item">📚 내 시간표</div>
            <div className="menu-item">💬 내 메시지</div>
            <div className="menu-item">⚙️ 설정</div>
            <div className="menu-item">📞 고객지원</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPage

