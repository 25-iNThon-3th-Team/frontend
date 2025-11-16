
# Kourse - 맞춤형 학습 로드맵 플랫폼

<div align="center">
  <img src="./KourseLogo.png" alt="Kourse Logo" width="200"/>

  **나만의 맞춤 학습 로드맵**

  [![React](<https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react>)](<https://reactjs.org/>)
  [![TypeScript](<https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript>)](<https://www.typescriptlang.org/>)
  [![Vite](<https://img.shields.io/badge/Vite-5.0.8-646CFF?logo=vite>)](<https://vitejs.dev/>)
  [![Tailwind CSS](<https://img.shields.io/badge/Tailwind_CSS-3.4.18-38B2AC?logo=tailwind-css>)](<https://tailwindcss.com/>)
</div>

---

## 📋 목차

- [프로젝트 소개](#-프로젝트-소개)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [주요 컴포넌트](#-주요-컴포넌트)
- [API 연동](#-api-연동)
- [상태 관리](#-상태-관리)
- [배포](#-배포)
- [트러블 슈팅](#-트러블-슈팅)
- [사용자 시나리오](#-사용자-시나리오) 

---

## 🎯 프로젝트 소개

**Kourse**는 대학생들을 위한 지능형 학습 로드맵 플랫폼입니다. 시간표 자동 편성, 선배-후배 매칭, 커리어 트랙 추천 등을 통해 학생들이 자신만의 학습 경로를 효율적으로 설계할 수 있도록 돕습니다.

### 🌟 핵심 가치

- **개인화된 학습 경험**: 각 학생의 이수 현황과 관심 분야에 맞춘 맞춤형 추천
- **시간 절약**: 시간표 자동 편성으로 복잡한 수강신청 과정 간소화
- **지식 공유**: 같은 과목을 이수한 선배와의 연결을 통한 실전 경험 공유
- **커리어 가이드**: AI/ML, Backend 등 트랙별 로드맵 제공

---

## 🚀 주요 기능

### 1️⃣ 시간표 자동화 (Schedule)
- 이수 과목 기반 수강 가능 과목 자동 필터링
- 선호 요일/시간, 이동 시간, 전공 우선순위 고려
- 실시간 시간표 시각화 및 편집 기능
- 시간 충돌 방지 및 최적 스케줄 제안

### 2️⃣ 선배-후배 매칭 (Mentor/Connections)
- 같은 과목 이수자 연결 시스템
- 실시간 채팅 기능
- 수업 후기 및 팁 공유
- 크로스 메이저 학습 네트워크 구축

### 3️⃣ 커리어 로드맵 (Career)
- **Dashboard**: 학점 및 이수 현황 시각화
- **트랙 추천**: AI/ML, Backend, Frontend 등 커리어 경로 제안
- **로드맵**: 학기별 추천 과목 및 선수과목 관리
- **다음 학기 추천**: 현재 진도에 맞는 최적 과목 제안

### 4️⃣ 마이페이지 (MyPage)
- 프로필 관리
- 수강 선호도 설정
- 학습 통계 확인
- 앱 설정 (테마, 알림, 언어 등)

### 5️⃣ 채팅 시스템 (Chat)
- 선배-후배 간 1:1 채팅
- 채팅방 목록 관리
- 실시간 메시지 알림

---

## 🛠️ 기술 스택

### Frontend
- **React 18.2.0** - UI 라이브러리
- **TypeScript 5.9.3** - 타입 안정성
- **Vite 5.0.8** - 빌드 도구 및 개발 서버
- **React Router DOM 7.9.6** - 클라이언트 사이드 라우팅

### 스타일링
- **Tailwind CSS 3.4.18** - 유틸리티 우선 CSS 프레임워크
- **PostCSS 8.5.6** - CSS 전처리
- **Pretendard Font** - 한글 웹폰트

### 상태 관리 & API
- **Zustand 5.0.8** - 경량 상태 관리
- **Axios 1.13.2** - HTTP 클라이언트
- **React Flow Renderer 10.3.17** - 로드맵 시각화

### 개발 도구
- **ESLint** - 코드 품질 관리
- **Prettier** - 코드 포맷팅

---

## 🏁 시작하기

### 사전 요구사항

- **Node.js** 18.x 이상
- **npm** 또는 **yarn**

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone <repository-url>
cd webapp

# 2. pro2 브랜치로 이동
git checkout pro2

# 3. 의존성 설치
npm install

# 4. 개발 서버 실행
npm run dev

# 5. 브라우저에서 <http://localhost:5173> 접속
````

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

---

## 📁 프로젝트 구조

```
webapp/
├── src/
│   ├── api/                    # API 통신 관련
│   │   ├── axios.js           # Axios 인스턴스 설정
│   │   └── careerApi.ts       # Career API 함수
│   ├── components/            # 재사용 가능한 컴포넌트
│   │   ├── BottomNav.jsx      # 하단 네비게이션 바
│   │   ├── career/            # Career 페이지 컴포넌트
│   │   │   ├── Dashboard.tsx
│   │   │   ├── CareerRecommendation.tsx
│   │   │   ├── Roadmap.tsx
│   │   │   ├── Connections.tsx
│   │   │   ├── CrossMajorConnections.tsx
│   │   │   └── CourseModal.tsx
│   │   └── mypage/            # MyPage 관련 컴포넌트
│   │       ├── ProfileCard.jsx
│   │       ├── Stats.jsx
│   │       ├── CoursePreferenceCard.jsx
│   │       └── SettingsMenu.jsx
│   ├── data/                  # 목 데이터
│   │   └── mockData.ts
│   ├── pages/                 # 페이지 컴포넌트
│   │   ├── Home.jsx           # 로그인/회원가입
│   │   ├── Schedule.jsx       # 시간표
│   │   ├── Mentor.jsx         # 멘토 찾기
│   │   ├── Career.jsx         # 커리어 로드맵
│   │   ├── MyPage.jsx         # 마이페이지
│   │   ├── ChatList.jsx       # 채팅 목록
│   │   ├── Chat.jsx           # 채팅방
│   │   └── ...                # 기타 설정 페이지
│   ├── store/                 # Zustand 상태 관리
│   │   ├── authStore.ts       # 인증 상태
│   │   ├── careerStore.ts     # Career 데이터
│   │   └── themeStore.ts      # 테마 설정
│   ├── types/                 # TypeScript 타입 정의
│   │   ├── career.ts
│   │   └── major.ts
│   ├── App.jsx               # 루트 컴포넌트
│   ├── App.css               # 전역 스타일
│   ├── index.css             # Tailwind 진입점
│   └── main.jsx              # 앱 진입점
├── index.html                # HTML 템플릿
├── vite.config.js            # Vite 설정
├── tailwind.config.js        # Tailwind 설정
├── tsconfig.json             # TypeScript 설정
├── package.json              # 프로젝트 메타데이터
└── README.md                 # 프로젝트 문서
```

---

## 🧩 주요 컴포넌트

### Career 모듈

| 컴포넌트                      | 역할                | 주요 데이터                                            |
| ------------------------- | ----------------- | ------------------------------------------------- |
| **Dashboard**             | 학점·이수 현황 요약       | `completedCourses`                                |
| **CareerRecommendation**  | 트랙 추천 및 선택        | `tracks`, `selectedTrack`                         |
| **Roadmap**               | 학기별 로드맵, 다음 과목 추천 | `allCourses`, `selectedTrack`, `completedCourses` |
| **Connections**           | 선수 수강자 매칭         | `studentConnections`                              |
| **CrossMajorConnections** | 타전공 학습 네트워크       | 크로스 메이저 데이터                                       |
| **CourseModal**           | 과목 상세 정보 모달       | 과목 상세 데이터                                         |

### Navigation

- **BottomNav**: 하단 네비게이션 바
    - Schedule (시간표)
    - Mentor (멘토)
    - Career (커리어)
    - MyPage (마이페이지)

---

## 🔌 API 연동

### Base URL

- 개발 환경: `/api` → Proxy to `http://inthon.fjey.me:8080`

### 주요 엔드포인트

#### 인증

```typescript
POST /login          // 로그인
POST /register       // 회원가입
```

#### 시간표

```typescript
GET  /api/schedule/recommend      // 시간표 자동화 결과
POST /api/course-preferences      // 사용자 제약 조건 저장
```

#### Career

```typescript
GET /api/courses/:id/connections  // 같은 과목 학우 목록
GET /api/tracks/recommend         // 진로 트랙 추천
GET /api/roadmap/next-courses     // 다음 학기 추천
```

### API 클라이언트 설정

```javascript
// src/api/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// 요청 인터셉터 (토큰 자동 추가)
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
```

---

## 🗄️ 상태 관리

### Zustand Stores

#### 1. authStore

```typescript
interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  checkLogin: () => void;
}
```

#### 2. careerStore

```typescript
interface CareerState {
  completedCourses: Course[];
  allCourses: Course[];
  tracks: Track[];
  selectedTrack: Track | null;
  studentConnections: Connection[];
  // ... 기타 메서드
}
```

#### 3. themeStore

```typescript
interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: string) => void;
  initTheme: () => void;
}
```

---

#### 컴포넌트 구조

```jsx
// 1. Import
import { useState } from 'react';

// 2. Type/Interface (TypeScript)
interface Props {
  title: string;
}

// 3. Component
function Component({ title }: Props) {
  // 3-1. Hooks
  const [state, setState] = useState();

  // 3-2. Handlers
  const handleClick = () => {};

  // 3-3. Render
  return <div>{title}</div>;
}

// 4. Export
export default Component;
```

타일링 가이드

```
<div className="w-full sm:w-1/2 lg:w-1/3">
  {/* 모바일: 100%, 태블릿: 50%, 데스크톱: 33.33% */}
</div>
```



## 🚢 배포

### 프로덕션 빌드

```bash
npm run build
```

빌드 결과물은 `dist/` 디렉토리에 생성됩니다.

### 환경 변수

프로덕션 환경에서는 `.env.production` 파일 생성:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
```


## 🔧 트러블슈팅

### 흔한 문제들

#### 1. API 연결 실패

```
Error: Network Error
```

**해결**: `vite.config.js`의 proxy 설정 확인

#### 2. 타입 에러

```
TS2307: Cannot find module
```

**해결**: `tsconfig.json`의 paths 설정 확인 또는 `npm install` 재실행

#### 3. 빌드 에러

```
RollupError: Could not resolve
```

**해결**: `node_modules` 삭제 후 재설치

---

## 📊 사용자 시나리오

### 전형적인 사용 흐름

1. **회원가입/로그인**
    
    - Home 페이지에서 계정 생성 또는 로그인
2. **프로필 설정**
    
    - MyPage에서 시간표 제약 조건 입력
    - 선호 요일/시간, 전공 우선순위 설정
3. **시간표 생성**
    
    - Schedule 페이지에서 자동 추천 확인
    - 과목 추가/삭제로 시간표 커스터마이징
4. **선배 매칭**
    
    - Mentor 페이지에서 관심 과목 검색
    - 해당 과목 이수 선배와 채팅 연결
5. **커리어 로드맵 확인**
    
    - Career 페이지에서 트랙 선택
    - 학기별 추천 과목 확인 및 계획 수립

---
