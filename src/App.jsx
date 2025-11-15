import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import Mentor from "./pages/Mentor";
import Career from "./pages/Career";
import MyPage from "./pages/MyPage";
import Chat from "./pages/Chat";
import ChatList from "./pages/ChatList";
import NotFound from "./pages/NotFound";
import Guide from "./pages/Guide";
import Withdrawal from "./pages/Withdrawal";
import ChangePassword from "./pages/ChangePassword";
import Contact from "./pages/Contact";
import NotificationSettings from "./pages/NotificationSettings";
import PrivacySettings from "./pages/PrivacySettings";
import LanguageSettings from "./pages/LanguageSettings";
import ThemeSettings from "./pages/ThemeSettings";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CommunityRules from "./pages/CommunityRules";
import "./App.css";

function App() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const isChatPage =
    location.pathname.startsWith("/chat/") &&
    !location.pathname.startsWith("/chatlist");

  // 로그인 상태 확인
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    };
    
    // 초기 로그인 상태 확인
    checkAuth();
    
    // localStorage 변경 감지 (다른 탭에서 로그인/로그아웃 시)
    const handleStorageChange = () => {
      checkAuth();
    };
    
    // 커스텀 이벤트로 같은 탭에서의 로그인 상태 변경 감지
    const handleAuthChange = () => {
      checkAuth();
    };
    
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("authChange", handleAuthChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  // 로그인하지 않았으면 홈 페이지만 보여줌
  if (!isAuthenticated) {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    );
  }

  // 로그인했으면 기존 앱 라우팅
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/mentor" element={<Mentor />} />
        <Route path="/chatlist" element={<ChatList />} />
        <Route path="/career" element={<Career />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/withdrawal" element={<Withdrawal />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chat/:seniorId" element={<Chat />} />
        <Route
          path="/settings/notifications"
          element={<NotificationSettings />}
        />
        <Route path="/settings/privacy" element={<PrivacySettings />} />
        <Route path="/settings/language" element={<LanguageSettings />} />
        <Route path="/settings/theme" element={<ThemeSettings />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/community-rules" element={<CommunityRules />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isChatPage && <BottomNav />}
    </div>
  );
}

export default App;
