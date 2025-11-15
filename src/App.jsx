import { Routes, Route } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Schedule from './pages/Schedule'
import Mentor from './pages/Mentor'
import Career from './pages/Career'
import MyPage from './pages/MyPage'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/career" element={<Career />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <BottomNav />
    </div>
  )
}

export default App

