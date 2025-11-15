import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import logoImage from '../image/Logo.png'

function Home() {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true) // true: 로그인, false: 회원가입

  const handleLogin = (e) => {
    e.preventDefault()
    // 실제로는 로그인 API 호출
    // 로그인 성공 시 localStorage에 token 저장
    localStorage.setItem('token', 'dummy-token')
    // 로그인 상태 변경을 위해 커스텀 이벤트 발생
    window.dispatchEvent(new CustomEvent('authChange'))
    navigate('/schedule')
  }

  const handleSignup = (e) => {
    e.preventDefault()
    // 실제로는 회원가입 API 호출
    // 회원가입 성공 시 로그인 처리
    localStorage.setItem('token', 'dummy-token')
    // 로그인 상태 변경을 위해 커스텀 이벤트 발생
    window.dispatchEvent(new CustomEvent('authChange'))
    navigate('/schedule')
  }


  return (
    <div className="page-container">
      <div className="page-content">
        {/* 로고 및 타이틀 */}
        <div className="home-header">
          <div className="home-logo">
            <img 
              src={logoImage} 
              alt="Kourse Logo" 
            />
          </div>
          <h1 className="home-title">Kourse</h1>
        </div>

        {/* 로그인/회원가입 탭 */}
        <div className="home-auth">
          <div className="home-auth-tabs">
            <button
              className={`home-auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              로그인
            </button>
            <button
              className={`home-auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              회원가입
            </button>
          </div>

          {/* 로그인/회원가입 폼 */}
          <div className="home-auth-form">
            {isLogin ? (
              <form onSubmit={handleLogin}>
                <div className="home-form-group">
                  <label htmlFor="login-email">이메일</label>
                  <input
                    id="login-email"
                    type="text"
                    placeholder="이메일을 입력하세요"
                    required
                  />
                </div>
                <div className="home-form-group">
                  <label htmlFor="login-password">비밀번호</label>
                  <input
                    id="login-password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    required
                  />
                </div>
                <button type="submit" className="home-auth-button">
                  로그인
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup}>
                <div className="home-form-group">
                  <label htmlFor="signup-name">이름</label>
                  <input
                    id="signup-name"
                    type="text"
                    placeholder="이름을 입력하세요"
                    required
                  />
                </div>
                <div className="home-form-group">
                  <label htmlFor="signup-email">이메일</label>
                  <input
                    id="signup-email"
                    type="text"
                    placeholder="이메일을 입력하세요"
                    required
                  />
                </div>
                <div className="home-form-group">
                  <label htmlFor="signup-password">비밀번호</label>
                  <input
                    id="signup-password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    required
                  />
                </div>
                <div className="home-form-group">
                  <label htmlFor="signup-password-confirm">비밀번호 확인</label>
                  <input
                    id="signup-password-confirm"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                    required
                  />
                </div>
                <button type="submit" className="home-auth-button">
                  회원가입
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

