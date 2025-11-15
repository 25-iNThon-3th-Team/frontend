# 진로탐색 페이지 컴포넌트

## 개요
학생의 이수한 과목을 분석하고, 진로 방향을 추천하며, 인터랙티브한 로드맵을 제공하는 진로탐색 기능입니다.

## 컴포넌트 구조

### 1. Dashboard (학업 현황 요약)
- 총 이수 학점 표시
- 전필/전선/교양 과목 분류
- 이수한 과목 목록

### 2. CareerRecommendation (진로 추천)
- 사용자에게 맞는 상위 2-4개 진로 방향 추천
- 각 트랙의 적합도 점수 표시
- 트랙 선택 시 필수/선택 과목 표시

### 3. Roadmap (학습 로드맵)
- react-flow를 사용한 그래프 기반 시각화
- 완료한 과목과 미완료 과목 구분
- 선수과목 관계를 엣지로 표시
- 과목 노드 클릭 시 시간표에 추가 기능
- 난이도 및 작업량 표시

### 4. Connections (학생 연결)
- 선수강자 목록 및 질문하기 기능
- 동시수강자 목록 및 메시지 기능
- 과목별 연결된 학생 표시

## 데이터 구조

### 타입 정의
- `CompletedCourse`: 이수한 과목 정보
- `Course`: 전체 과목 정보
- `Track`: 진로 트랙 정보
- `StudentConnection`: 학생 연결 정보

### Mock 데이터
- 10개의 예시 과목
- 4개의 진로 트랙 (AI/ML, Data Science, Backend, Security)
- 3개의 이수한 과목

## 상태 관리

Zustand를 사용한 전역 상태 관리:
- `completedCourses`: 이수한 과목 목록
- `allCourses`: 전체 과목 목록
- `tracks`: 진로 트랙 목록
- `selectedTrack`: 선택된 트랙

## API 스켈레톤

다음 API 엔드포인트를 구현해야 합니다:
- `GET /api/courses/completed` - 이수한 과목 조회
- `GET /api/courses` - 전체 과목 조회
- `GET /api/courses/recommend` - 추천 과목 조회
- `GET /api/tracks/recommend` - 추천 트랙 조회
- `GET /api/roadmap/generate` - 로드맵 생성
- `GET /api/courses/:courseId/connections` - 학생 연결 조회

## 사용 방법

1. Career 페이지에서 자동으로 mock 데이터가 로드됩니다.
2. 진로 방향을 선택하면 해당 트랙의 로드맵이 표시됩니다.
3. 로드맵에서 과목 노드를 클릭하여 시간표에 추가할 수 있습니다.
4. 각 과목의 연결된 학생들을 확인하고 소통할 수 있습니다.

