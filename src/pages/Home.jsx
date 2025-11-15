import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import axios from "../api/axios";
import useAuthStore from '../store/authStore';

function Home() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [isLogin, setIsLogin] = useState(true) // true: 로그인, false: 회원가입
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    const userid = e.target['login-userid'].value
    const password = e.target['login-password'].value

    try {
      const response = await axios.post('/login', {
        userid: userid,
        password: password
      })
      
      console.log("로그인 성공:", response.data)
      console.log("응답 전체:", response)

      // 로그인 성공 처리
      // 응답에 token이 있으면 사용, 없으면 성공 메시지만 있어도 로그인 처리
      if (response.data && response.data.token) {
        login(response.data.token)
        navigate('/schedule')
      } else if (response.data && (response.data.message || response.data.id)) {
        // token이 없지만 성공 메시지가 있으면 로그인 성공으로 처리
        // (일부 백엔드는 token을 별도로 관리하거나 쿠키로 전송할 수 있음)
        console.log("토큰 없이 로그인 성공, 더미 토큰 사용")
        login('dummy-token')
        navigate('/schedule')
      } else {
        console.warn("토큰이 응답에 없습니다. 응답 데이터:", response.data)
        setErrorMessage('로그인에 실패했습니다. 서버 응답을 확인할 수 없습니다.')
      }
    } catch (error) {
      console.error("로그인 에러:", error)
      console.error("에러 응답:", error.response)
      
      // API 연결 실패 (네트워크 에러, 타임아웃 등)
      if (!error.response) {
        setErrorMessage('서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.')
      } 
      // 서버 응답이 있지만 에러 상태 코드
      else if (error.response.status === 400) {
        const message = error.response.data?.message || '아이디 또는 비밀번호가 올바르지 않습니다.'
        setErrorMessage(message)
      } else if (error.response.status === 401 || error.response.status === 403) {
        setErrorMessage('아이디 또는 비밀번호가 올바르지 않습니다.')
      } else if (error.response.status >= 500) {
        setErrorMessage('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      } else {
        setErrorMessage(`로그인에 실패했습니다. (오류 코드: ${error.response.status})`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    const username = e.target['signup-name'].value.trim() // 이름 (username)
    const userid = e.target['signup-userid'].value.trim() // 아이디 (userid)
    const password = e.target['signup-password'].value
    const passwordConfirm = e.target['signup-password-confirm'].value

    // 입력값 검증
    if (!username || username.length === 0) {
      setErrorMessage('이름을 입력해주세요.')
      setIsLoading(false)
      return
    }

    if (!userid || userid.length === 0) {
      setErrorMessage('아이디를 입력해주세요.')
      setIsLoading(false)
      return
    }

    if (userid.length < 3 || userid.length > 20) {
      setErrorMessage('아이디는 3자 이상 20자 이하여야 합니다.')
      setIsLoading(false)
      return
    }

    if (!password || password.length === 0) {
      setErrorMessage('비밀번호를 입력해주세요.')
      setIsLoading(false)
      return
    }

    if (password.length < 4 || password.length > 50) {
      setErrorMessage('비밀번호는 4자 이상 50자 이하여야 합니다.')
      setIsLoading(false)
      return
    }

    // 비밀번호 확인
    if (password !== passwordConfirm) {
      setErrorMessage('비밀번호가 일치하지 않습니다.')
      setIsLoading(false)
      return
    }

    try {
      console.log("회원가입 요청:", { username, userid, password: '***' })
      const response = await axios.post('/register', {
        username: username, // 이름은 username으로 전송
        userId: userid,     // 아이디는 userId (camelCase)로 전송 (백엔드 요구사항)
        password: password
      })

      console.log("회원가입 성공:", response.data)
      console.log("응답 전체:", response)

      // 회원가입 성공 처리
      // 성공 응답이 오면 (200 상태 코드) 알림을 띄우고 로그인 페이지로 이동
      if (response.status === 200 || response.status === 201) {
        // 회원가입 완료 알림
        alert('회원가입이 완료되었습니다. 로그인해주세요.')
        
        // 로그인 탭으로 전환하고 에러 메시지 초기화
        setIsLogin(true)
        setErrorMessage('')
        
        // 폼 초기화는 자동으로 됨 (페이지 이동 없이 탭만 전환)
      } else {
        console.warn("예상치 못한 응답 상태 코드:", response.status)
        setErrorMessage('회원가입에 실패했습니다. 서버 응답을 확인할 수 없습니다.')
      }
    } catch (error) {
      console.error("회원가입 에러:", error)
      console.error("에러 응답:", error.response)
      
      // API 연결 실패 (네트워크 에러, 타임아웃 등)
      if (!error.response) {
        setErrorMessage('서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.')
      } 
      // 서버 응답이 있지만 에러 상태 코드
      else if (error.response.status === 400) {
        const message = error.response.data?.message || '입력한 정보를 확인해주세요.'
        setErrorMessage(message)
      } else if (error.response.status === 409) {
        setErrorMessage('이미 사용 중인 아이디입니다.')
      } else if (error.response.status >= 500) {
        // 500 에러의 경우 서버 메시지 확인
        const errorData = error.response.data
        const exception = errorData?.exception || ''
        
        // DataIntegrityViolationException은 보통 중복 데이터나 제약 조건 위반
        // 아이디는 중복이 안 되지만 이름은 중복 가능
        if (exception.includes('DataIntegrityViolationException')) {
          // 아이디 중복으로 처리 (이름은 중복 가능하므로)
          setErrorMessage('이미 사용 중인 아이디입니다. 다른 아이디를 사용해주세요.')
        } else {
          // 다른 서버 오류
          const serverMessage = errorData?.message || errorData?.error || '서버 오류가 발생했습니다.'
          setErrorMessage(`서버 오류: ${serverMessage}. 잠시 후 다시 시도해주세요.`)
        }
      } else {
        setErrorMessage(`회원가입에 실패했습니다. (오류 코드: ${error.response.status})`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="page-content">
        {/* 로고 및 타이틀 */}
        <div className="home-header">
          <h1 className="home-title">Kourse</h1>
        </div>

        {/* 로그인/회원가입 탭 */}
        <div className="home-auth">
          <div className="home-auth-tabs">
            <button
              className={`home-auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(true)
                setErrorMessage('')
              }}
            >
              로그인
            </button>
            <button
              className={`home-auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(false)
                setErrorMessage('')
              }}
            >
              회원가입
            </button>
          </div>

          {/* 로그인/회원가입 폼 */}
          <div className="home-auth-form">
            {errorMessage && (
              <div className="home-error-message">
                {errorMessage}
              </div>
            )}
            {isLogin ? (
              <>
                <form onSubmit={handleLogin}>
                  <div className="home-form-group">
                    <label htmlFor="login-userid">아이디</label>
                    <input
                      id="login-userid"
                      name="login-userid"
                      type="text"
                      placeholder="아이디를 입력하세요"
                      autoComplete="username"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <div className="home-form-group">
                    <label htmlFor="login-password">비밀번호</label>
                    <input
                      id="login-password"
                      name="login-password"
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      autoComplete="current-password"
                      required
                      disabled={isLoading}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="home-auth-button"
                    disabled={isLoading}
                  >
                    {isLoading ? '로그인 중...' : '로그인'}
                  </button>
                </form>
                <button
                  type="button"
                  onClick={() => {
                    // 개발용 임시 로그인 - 무조건 로그인 처리
                    login('dummy-token')
                    navigate('/schedule')
                  }}
                  className="home-auth-button"
                  style={{
                    marginTop: '12px',
                    background: '#6b7280',
                    fontSize: '0.9rem'
                  }}
                >
                  임시 로그인 (개발용)
                </button>
              </>
            ) : (
              <form onSubmit={handleSignup}>
                <div className="home-form-group">
                  <label htmlFor="signup-name">이름</label>
                  <input
                    id="signup-name"
                    name="signup-name"
                    type="text"
                    placeholder="이름을 입력하세요"
                    autoComplete="name"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="home-form-group">
                  <label htmlFor="signup-userid">아이디</label>
                  <input
                    id="signup-userid"
                    name="signup-userid"
                    type="text"
                    placeholder="아이디를 입력하세요"
                    autoComplete="username"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="home-form-group">
                  <label htmlFor="signup-password">비밀번호</label>
                  <input
                    id="signup-password"
                    name="signup-password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    autoComplete="new-password"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="home-form-group">
                  <label htmlFor="signup-password-confirm">비밀번호 확인</label>
                  <input
                    id="signup-password-confirm"
                    name="signup-password-confirm"
                    type="password"
                    placeholder="비밀번호를 다시 입력하세요"
                    autoComplete="new-password"
                    required
                    disabled={isLoading}
                  />
                </div>
                <button 
                  type="submit" 
                  className="home-auth-button"
                  disabled={isLoading}
                >
                  {isLoading ? '회원가입 중...' : '회원가입'}
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

