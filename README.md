# Kourse Frontend

INTHON 3 프로젝트의 프런트엔드 애플리케이션입니다. React 18 + Vite 5 스택을 기반으로 학사 일정, 멘토 연결, 채팅, 진로 추천 등 대학 생활 전반을 돕는 기능을 제공합니다.

## 개요
- 초기 랜딩/인증 화면에서 더미 토큰을 통해 빠르게 로그인 흐름을 시연할 수 있습니다.
- 로그인 이후 `Schedule`, `Mentor`, `Chat`, `Career`, `MyPage` 등 주요 탭을 하단 내비게이션으로 오갈 수 있습니다.
- 진로탐색 영역은 과목/트랙 정보를 불러와 학점 현황, 추천 트랙, 로드맵, 학생 연결 정보를 한 화면에서 확인하도록 구성되어 있습니다.

## 주요 화면 & 기능
- `Home`: 로그인/회원가입 폼, 토큰 발급 후 `authChange` 커스텀 이벤트로 전역 인증 상태 갱신.
- `Schedule`: 학사 일정(Day/Week) UI를 위한 기본 레이아웃.
- `Mentor`: 선/후배 매칭 리스트와 프로필 카드 UI.
- `ChatList` & `Chat`: 선배와 1:1 대화 흐름, `/chat/:seniorId` 라우팅.
- `Career`: `Dashboard`, `CareerRecommendation`, `Roadmap`, `Connections` 컴포넌트로 진로 추천 UX 구성.
- `MyPage`: 프로필, 선호 과목, 통계, 설정/정책(알림·언어·테마·개인정보·탈퇴 등) 서브 페이지.

## 기술 스택
| 영역 | 사용 기술 |
| --- | --- |
| 번들러/Dev Server | Vite 5 |
| UI | React 18, React Router DOM 7 |
| 상태 관리 | Zustand (`authStore`, `careerStore`) |
| HTTP 클라이언트 | Axios (인터셉터 + `/api` 프록시) |
| 스타일 | Tailwind CSS 3 + 글로벌 CSS(`App.css`, `index.css`) |
| 기타 | React Flow Renderer(로드맵 그래프 계획), PostCSS, Autoprefixer |

## 폴더 구조
```
frontend/
├── src/
│   ├── api/            # Axios 인스턴스 및 API 스켈레톤
│   ├── components/
│   │   ├── BottomNav.jsx
│   │   ├── career/     # Dashboard, Roadmap, Connections 등 세부 UI (README 포함)
│   │   └── mypage/
│   ├── data/           # mock 데이터 (과목/트랙/교차전공)
│   ├── pages/          # 라우트 단위 화면
│   ├── store/          # Zustand 전역 상태
│   ├── types/          # TypeScript 타입 정의
│   ├── App.jsx         # 라우팅 및 인증 게이트
│   └── main.jsx        # React 엔트리
├── public / index.html
├── package.json
└── vite.config.js
```

## 빠른 시작
### 요구 사항
- Node.js 18 이상 (Vite 5 권장 버전)
- npm 10 이상

### 설치 & 개발 서버
```bash
npm install
npm run dev
```
- 기본 포트는 `5173`이며, 필요 시 `npm run dev -- --host 0.0.0.0 --port 3000`처럼 옵션을 넘길 수 있습니다.

### 프로덕션 빌드 & 미리보기
```bash
npm run build   # dist/ 생성
npm run preview # 로컬에서 빌드 결과 확인
```

## 환경 & 백엔드 연동
- `vite.config.js`의 `server.proxy`는 `/api` 요청을 `http://inthon.fjey.me:8080`으로 프록시합니다. 다른 백엔드 주소를 쓰려면 해당 값을 수정하거나 `.env`에 `VITE_API_BASE_URL`을 정의한 뒤 `axios` 인스턴스에서 참조하도록 확장하세요.
- `src/api/axios.js`는 `/api`를 기본 경로로 사용하며 `withCredentials` 옵션과 Authorization 헤더(로컬 스토리지 토큰)를 자동으로 붙입니다. 실제 인증 연동 시 토큰 저장, 만료 처리, 에러 핸들링을 이 파일에서 중앙화하세요.
- 아직 실제 API가 연결되지 않은 진로 영역은 `src/data/mockData.ts`를 불러옵니다. 추후 `src/api/careerApi.ts`의 메서드 구현을 완료한 뒤 `Career.jsx`에서 mock 대신 실제 호출을 사용하도록 전환하면 됩니다.

## 데이터 & 상태 관리
- `src/store/authStore.ts`: 로컬 스토리지 토큰을 기반으로 로그인 상태를 추적합니다. `Home` 페이지의 로그인/회원가입 흐름이 `window.dispatchEvent(new CustomEvent('authChange'))`를 발생시켜 `App.jsx`에서 인증 상태를 재검증합니다.
- `src/store/careerStore.ts`: 과목, 트랙, 이수 현황, 교차전공 정보를 보관하며, 총 학점/추천 트랙/로드맵용 헬퍼 메서드를 제공합니다.
- 타입 정의는 `src/types/career.ts`에 모여 있어 JS/TS 파일 모두에서 재사용할 수 있습니다.

## UI 컴포넌트 가이드
- `components/BottomNav.jsx`: 라우트 경로와 SVG 아이콘을 한 곳에서 관리합니다. `Chat` 상세 페이지에서는 `isChatPage` 검사로 하단 바를 숨깁니다.
- `components/career/*`: 진로탐색 핵심 UI를 담당하며, 각 컴포넌트 설명은 `src/components/career/README.md`에서 추가로 확인할 수 있습니다. `Roadmap`은 현재 리스트 기반으로 렌더링되지만 `react-flow-renderer` 의존성이 포함되어 있어 향후 그래프 기반 시각화로 확장할 수 있습니다.
- `components/mypage/*`: 프로필 카드, 통계, 설정 메뉴 등 마이페이지 위젯 모음입니다.

## 스타일링
- Tailwind CSS가 전역적으로 활성화되어 있으며 `tailwind.config.js`에서 `Pretendard` 폰트와 `src/**/*.{js,ts,jsx,tsx}` 경로를 스캔하도록 설정되어 있습니다.
- Tailwind 유틸리티와 함께 `App.css`, `index.css`에 정의된 커스텀 클래스(`page-container`, `bottom-nav` 등)를 혼용합니다. 새 스타일을 추가할 때는 가능하면 Tailwind 유틸리티를 우선 사용하고, 반복되는 패턴만 CSS로 추출하세요.

## 개발 팁
- 새 화면을 추가하려면 `src/pages`에 컴포넌트를 만들고 `App.jsx` 라우트에 등록하세요.
- HTTP 통신은 `src/api`의 Axios 인스턴스를 재사용하고, 엔드포인트별 함수는 `careerApi.ts`와 같은 패턴으로 작성합니다.
- 글로벌 상태가 필요하면 기존 Zustand 스토어를 확장하거나 새로운 스토어 파일을 추가하세요. React Context 대신 Zustand를 우선 고려합니다.
- API 연동 전까지는 `src/data/mockData.ts`를 수정해 빠르게 UI를 검증할 수 있습니다.
- 인증이 필요 없는 화면을 만들 때는 `App.jsx`의 인증 게이트 조건을 참고하여 예외 처리를 추가합니다.

## 추가 문서
- 진로탐색 컴포넌트 상세 설명: `src/components/career/README.md`
- 디자인 시안/정책 문서는 아직 별도 저장소에 있으며, 필요 시 링크를 README에 추가하세요.


