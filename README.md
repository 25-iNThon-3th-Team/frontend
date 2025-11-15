# 학습 로드맵 · 시간표 자동화 README

## 개요
이 모듈은 **시간표 자동 편성**을 중심으로, 같은 과목을 이수한 학우와 연결하고, 과목을 결정한 뒤에는 **맞춤형 로드맵과 다음 학기 추천 과목**을 제공하는 워크플로우를 담당합니다. 사용자는 “무엇을 들어야 할까?”라는 질문에 답을 얻고, 곧바로 일정에 반영할 수 있습니다.

## 핵심 기능

### 1. 시간표 자동화
- `Schedule` 페이지와 연동되어 `allCourses`/`completedCourses` 데이터를 기반으로 수강 가능 과목을 필터링합니다.
- 선호 요일/시간, 이동 시간, 전공 우선순위 등 `CoursePreferenceCard`에서 입력한 제약 조건을 사용해 추천 리스트를 생성합니다.
- 사용자가 과목을 확정하면 `Roadmap`과 `Connections` 모듈이 즉시 갱신되어 이어지는 단계가 자연스럽게 이어집니다.

### 2. 동료 매칭 (같은 과목 이수자 연결)
- `Connections` 컴포넌트는 특정 과목을 이미 들었거나 동시에 듣는 학우를 보여줍니다.
- 선수강자에게 질문하거나, 동시 수강자와 스터디를 구성할 수 있는 액션을 제공합니다.
- 추천된 과목을 수강하기 전에 실제 경험담을 확인할 수 있어 시간표 결정이 더 빠르고 정확해집니다.

### 3. 맞춤 로드맵 & 다음 수강 과목 추천
- `CareerRecommendation`에서 트랙(예: AI/ML, Backend 등)을 선택하면 `Roadmap`이 해당 커리큘럼을 기준으로 다시 정렬됩니다.
- 로드맵은 현재 학기/다음 학기에 집중해야 할 과목을 우선 제시하고, 선수 과목 충족 여부와 난이도까지 함께 표시합니다.
- 선택한 과목 이후 이어서 들어야 할 과목을 자동으로 제안해 학기별 계획을 빠르게 세울 수 있습니다.

## 컴포넌트 구성

| 컴포넌트 | 역할 | 주요 연관 데이터 |
|----------|------|------------------|
| `Dashboard` | 학점·이수 현황 요약 | `completedCourses` |
| `CareerRecommendation` | 트랙 추천 및 선택 | `tracks`, `selectedTrack` |
| `Roadmap` | 학기별 로드맵, 다음 과목 추천 | `allCourses`, `selectedTrack`, `completedCourses` |
| `Connections` | 선수/동시 수강자 매칭 | `studentConnections` |
| `CoursePreferenceCard` | 시간표 제약 조건 입력 | `coursePreference` |

## 데이터 & 상태 관리
- Zustand 스토어(`useCareerStore`)에서 핵심 데이터를 보관하며, `useAuthStore`는 로그인 세션을 관리합니다.
- 주요 상태
  - `completedCourses`: 이미 이수한 과목 → 시간표 자동화 및 로드맵 필터링에 사용
  - `allCourses`: 전체 커리큘럼
  - `tracks` / `selectedTrack`: 트랙 기반 추천
  - `studentConnections`: 매칭 대상

## API 스켈레톤
서버 연동 시 다음 엔드포인트가 필요합니다.
- `GET /api/schedule/recommend` : 시간표 자동화 결과
- `POST /api/course-preferences` : 사용자 제약 조건 저장
- `GET /api/courses/:id/connections` : 같은 과목 학우 목록
- `GET /api/tracks/recommend` : 진로 트랙 추천
- `GET /api/roadmap/next-courses` : 다음 학기 추천

## 사용자 시나리오 요약
1. 사용자는 로그인 후 MyPage에서 시간표 제약 조건을 입력합니다.
2. Career 페이지로 이동하면 추천 트랙/과목이 자동으로 계산됩니다.
3. 과목을 선택하면 즉시:
   - 같은 과목 이수자 목록을 확인하고,
   - 로드맵에서 이후 추천 과목을 확인하며,
   - 일정에 반영할 수 있습니다.

이 README는 위 흐름을 기준으로 문서를 유지·보수해야 합니다. 기능 추가 시 “시간표 자동화 → 동료 매칭 → 맞춤 로드맵”의 3단계 경험을 깨지 않는지 확인하세요.

