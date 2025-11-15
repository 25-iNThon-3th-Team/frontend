import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Schedule from './pages/Schedule'
import Mentor from './pages/Mentor'
import Career from './pages/Career'
import MyPage from './pages/MyPage'
import Chat from './pages/Chat'
import ChatList from './pages/ChatList'
import './App.css'

function App() {
  const location = useLocation()
  const isChatPage = location.pathname.startsWith('/chat/') && !location.pathname.startsWith('/chatlist')

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/career" element={<Career />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/chat/:seniorId" element={<Chat />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isChatPage && <BottomNav />}
    </div>
  )
}

export default App

