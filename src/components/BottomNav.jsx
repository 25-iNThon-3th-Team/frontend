import { Link, useLocation } from 'react-router-dom'
import '../App.css'

function BottomNav() {
  const location = useLocation()

  const navItems = [
    { path: '/schedule', icon: '📅', label: '시간표' },
    { path: '/mentor', icon: '👥', label: '선배연결' },
    { path: '/chatlist', icon: '💬', label: '채팅' },
    { path: '/career', icon: '🔍', label: '진로탐색' },
    { path: '/mypage', icon: '👤', label: '마이페이지' }
  ]

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </Link>
      ))}
    </nav>
  )
}

export default BottomNav

