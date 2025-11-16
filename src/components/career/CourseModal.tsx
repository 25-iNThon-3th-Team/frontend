import { useEffect, useState } from 'react';
import { Course, StudentConnection } from '../../types/career';
import { careerApi } from '../../api/careerApi';

interface CourseModalProps {
  course: Course | null;
  isCompleted: boolean;
  isOpen: boolean;
  onClose: () => void;
  onAddToSchedule: (courseId: string) => void;
}

function CourseModal({ course, isCompleted, isOpen, onClose, onAddToSchedule }: CourseModalProps) {
  const [connections, setConnections] = useState<StudentConnection[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && course) {
      const fetchConnections = async () => {
        setLoading(true);
        try {
          const courseId = course.courseId || course.courseCode;
          const data = await careerApi.getStudentConnections(courseId);
          setConnections(data);
        } catch (error) {
          console.error('Failed to fetch connections:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchConnections();
    }
  }, [isOpen, course]);

  if (!isOpen || !course) return null;

  const 선수강자 = connections.filter(c => c.type === '선수강자');
  const 동시수강자 = connections.filter(c => c.type === '동시수강자');

  // 하드코딩된 과목 정보 (과목 코드별)
  const getHardcodedCourseInfo = (courseCode: string) => {
    const courseInfoMap: { [key: string]: { professor: string; schedule: string; description: string; location?: string } } = {
      // 알고리즘
      'COSE214': {
        professor: '박성빈',
        schedule: '월 13:30-14:45, 수 13:30-14:45',
        description: '알고리즘의 설계 및 분석 기법을 학습합니다. 시간복잡도, 공간복잡도 분석, 정렬 알고리즘, 탐색 알고리즘, 그래프 알고리즘 등을 다룹니다.',
        location: '정보통신관 205호'
      },
      // 운영체제
      'COSE341': {
        professor: '양경식',
        schedule: '월 15:00-16:15, 수 15:00-16:15',
        description: '운영체제의 기본 개념과 구조를 학습합니다. 프로세스 관리, 메모리 관리, 파일 시스템, 입출력 관리 등을 다룹니다.',
        location: '정보통신관 202호'
      },
      // 컴퓨터네트워크
      'COSE342': {
        professor: '민성기',
        schedule: '월 13:30-14:45, 수 13:30-14:45',
        description: '컴퓨터 네트워크의 기본 원리와 프로토콜을 학습합니다. TCP/IP, 라우팅, 네트워크 보안 등을 다룹니다.',
        location: '정보통신관 604호'
      },
      // 소프트웨어공학
      'COSE352': {
        professor: '인호',
        schedule: '월 10:30-11:45, 수 10:30-11:45',
        description: '소프트웨어 개발 프로세스와 방법론을 학습합니다. 요구사항 분석, 설계, 구현, 테스트, 유지보수 등을 다룹니다.',
        location: '정보통신관 202호'
      },
      // 정보보호
      'COSE354': {
        professor: '이희조',
        schedule: '화 15:00-16:15, 목 15:00-16:15',
        description: '정보보호의 기본 개념과 보안 기법을 학습합니다. 암호화, 인증, 접근 제어, 네트워크 보안 등을 다룹니다.',
        location: '정운오IT교양관 B103호'
      },
      // 인공지능
      'COSE361': {
        professor: '김동현',
        schedule: '화 12:00-13:15, 목 12:00-13:15',
        description: '인공지능의 기본 개념과 기법을 학습합니다. 탐색 알고리즘, 지식 표현, 추론, 학습 등을 다룹니다.',
        location: '정운오IT교양관 B102'
      },
      // 기계학습
      'COSE362': {
        professor: '육동석',
        schedule: '월 09:00-10:15, 수 09:00-10:15',
        description: '기계학습의 기본 이론과 알고리즘을 학습합니다. 지도학습, 비지도학습, 강화학습 등을 다룹니다.',
        location: '정보통신관 205호'
      },
      // 데이터베이스
      'COSE371': {
        professor: '박종혁',
        schedule: '화 13:30-14:45, 목 13:30-14:45',
        description: '데이터베이스의 기본 개념과 설계 방법을 학습합니다. 관계형 데이터베이스, SQL, 정규화 등을 다룹니다.',
        location: '정보통신관 205호'
      },
      // 데이터베이스시스템
      'COSE372': {
        professor: '정연돈',
        schedule: '화 10:30-11:45, 목 10:30-11:45',
        description: '데이터베이스 시스템의 고급 기법을 학습합니다. 트랜잭션 처리, 동시성 제어, 복구 기법 등을 다룹니다.',
        location: '정운오IT교양관 609호'
      },
      // 확률및랜덤과정
      'COSE382': {
        professor: '백승준',
        schedule: '화 15:00-16:15, 목 15:00-16:15',
        description: '확률론과 랜덤 프로세스의 기본 개념을 학습합니다. 확률 분포, 랜덤 변수, 마르코프 프로세스 등을 다룹니다.',
        location: '정운오IT교양관 B102'
      },
      // 클라우드컴퓨팅
      'COSE444': {
        professor: '유헌창',
        schedule: '월 10:30-11:45, 수 10:30-11:45',
        description: '클라우드 컴퓨팅의 기본 개념과 기술을 학습합니다. 가상화, 분산 시스템, 클라우드 서비스 모델 등을 다룹니다.',
        location: '애기능생활관 302호'
      },
      // 딥러닝
      'COSE474': {
        professor: '이정범',
        schedule: '화 10:30-11:45, 목 10:30-11:45',
        description: '딥러닝의 기본 이론과 실습을 학습합니다. 신경망, 역전파, CNN, RNN 등을 다룹니다.',
        location: '정운오IT교양관 B103호'
      },
      // 고급딥러닝
      'COSE475': {
        professor: '서홍석',
        schedule: '화 09:00-10:15, 목 09:00-10:15',
        description: '고급 딥러닝 기법을 학습합니다. Attention 메커니즘, Transformer, GAN, 강화학습 등을 다룹니다.',
        location: '애기능생활관 302호'
      },
      // 인터렉티브시각화
      'COSE436': {
        professor: '정원기',
        schedule: '화 10:30-11:45, 목 10:30-11:45',
        description: '인터렉티브 데이터 시각화 기법을 학습합니다. D3.js, 웹 기반 시각화, 대화형 차트 등을 다룹니다.',
        location: '정운오IT교양관 610호'
      },
      // 실전SW프로젝트
      'COSE457': {
        professor: '유헌창',
        schedule: '목 13:30-16:15, 토 12:00-14:45',
        description: '실전 소프트웨어 프로젝트를 수행합니다. 팀 프로젝트를 통해 실제 소프트웨어를 개발하고 배포합니다.',
        location: '정운오IT교양관 407호'
      },
      // 무선보안
      'COSE484': {
        professor: '전유석',
        schedule: '화 10:30-11:45, 목 10:30-11:45',
        description: '무선 네트워크 보안 기법을 학습합니다. 무선 통신 보안, 모바일 보안, IoT 보안 등을 다룹니다.',
        location: '정보통신관 B101호'
      },
      // 시스템프로그래밍
      'COSE322': {
        professor: '유혁',
        schedule: '월 15:00-16:15, 수 15:00-16:15',
        description: '시스템 프로그래밍 기법을 학습합니다. 시스템 콜, 프로세스 관리, 메모리 관리, 파일 시스템 등을 다룹니다.',
        location: '정운오IT교양관 B102'
      },
      // 이산수학
      'COSE211': {
        professor: '박성빈',
        schedule: '화 16:30-17:45, 목 16:30-17:45',
        description: '이산수학의 기본 개념과 기법을 학습합니다. 집합론, 논리, 그래프 이론, 조합론 등을 다룹니다.',
        location: '정보통신관 205호'
      },
      // 프로그래밍언어
      'COSE212': {
        professor: '박지혁',
        schedule: '월 13:30-14:45, 수 13:30-14:45',
        description: '프로그래밍 언어의 설계 원리와 구현 기법을 학습합니다. 언어 구문, 의미론, 타입 시스템 등을 다룹니다.',
        location: '정운오IT교양관 B102'
      },
      // 자료구조
      'COSE213': {
        professor: '김세연',
        schedule: '화 15:00-16:15, 목 15:00-16:15',
        description: '자료구조의 기본 개념과 구현 방법을 학습합니다. 배열, 리스트, 스택, 큐, 트리, 그래프 등을 다룹니다.',
        location: '정보통신관 205호'
      },
      // 계산이론
      'COSE215': {
        professor: '우승훈',
        schedule: '화 13:30-14:45, 목 13:30-14:45',
        description: '계산 이론의 기본 개념을 학습합니다. 오토마타, 형식 언어, 계산 복잡도 이론 등을 다룹니다.',
        location: '애기능생활관 301호'
      },
      // 논리설계
      'COSE221': {
        professor: '이숙윤',
        schedule: '월 09:00-10:15, 수 09:00-10:15',
        description: '디지털 논리 설계의 기본 원리를 학습합니다. 불 대수, 논리 게이트, 조합 논리, 순차 논리 등을 다룹니다.',
        location: '애기능생활관 302호'
      },
      // 컴퓨터구조
      'COSE222': {
        professor: '구건재',
        schedule: '월 10:30-11:45, 수 10:30-11:45',
        description: '컴퓨터 하드웨어 구조를 학습합니다. CPU 설계, 메모리 계층 구조, 입출력 시스템 등을 다룹니다.',
        location: '정운오IT교양관 B103호'
      },
      // 데이터통신
      'COSE242': {
        professor: '민성기',
        schedule: '화 13:30-14:45, 목 13:30-14:45',
        description: '데이터 통신의 기본 원리와 프로토콜을 학습합니다. 신호 전송, 오류 제어, 흐름 제어 등을 다룹니다.',
        location: '정보통신관 604호'
      },
      // 공학수학
      'COSE281': {
        professor: '박중석',
        schedule: '금 13:30-16:15',
        description: '공학에 필요한 수학 기초를 학습합니다. 미적분, 선형대수, 미분방정식 등을 다룹니다.',
        location: '정보통신관 205호'
      },
      // 전자기학
      'COSE284': {
        professor: '이주섭',
        schedule: '월 15:00-16:15, 금 15:00-16:15',
        description: '전자기학의 기본 원리를 학습합니다. 정전기학, 전류, 자기장, 전자기파 등을 다룹니다.',
        location: '애기능생활관 302호'
      },
      // 소프트웨어공학 (다른 교수)
      'COSE352-2': {
        professor: '김동선',
        schedule: '화 12:00-14:45, 목 12:00-14:45',
        description: '소프트웨어 개발 프로세스와 방법론을 학습합니다. 요구사항 분석, 설계, 구현, 테스트, 유지보수 등을 다룹니다.',
        location: '정운오IT교양관 609호'
      },
      // 정보보호 (다른 교수)
      'COSE354-2': {
        professor: '허준범',
        schedule: '월 09:00-11:45, 수 09:00-11:45',
        description: '정보보호의 기본 개념과 보안 기법을 학습합니다. 암호화, 인증, 접근 제어, 네트워크 보안 등을 다룹니다.',
        location: '애기능생활관 301호'
      },
      // 인공지능 (다른 교수)
      'COSE361-2': {
        professor: '윤수식',
        schedule: '금 10:30-13:15',
        description: '인공지능의 기본 개념과 기법을 학습합니다. 탐색 알고리즘, 지식 표현, 추론, 학습 등을 다룹니다.',
        location: '정보통신관 205호'
      },
      // 기계학습 (다른 교수)
      'COSE362-2': {
        professor: '김현철',
        schedule: '화 15:00-16:15, 목 15:00-16:15',
        description: '기계학습의 기본 이론과 알고리즘을 학습합니다. 지도학습, 비지도학습, 강화학습 등을 다룹니다.',
        location: '애기능생활관 301호'
      },
      // 기계학습 (다른 교수)
      'COSE362-3': {
        professor: '강재우',
        schedule: '화 13:30-14:45, 목 13:30-14:45',
        description: '기계학습의 기본 이론과 알고리즘을 학습합니다. 지도학습, 비지도학습, 강화학습 등을 다룹니다.',
        location: '정운오IT교양관 B102'
      },
      // 딥러닝 (다른 교수)
      'COSE474-2': {
        professor: '이상민',
        schedule: '화 15:00-16:15, 목 15:00-16:15',
        description: '딥러닝의 기본 이론과 실습을 학습합니다. 신경망, 역전파, CNN, RNN 등을 다룹니다.',
        location: '정보통신관 B101호'
      },
      // 확률및랜덤과정 (다른 교수)
      'COSE382-2': {
        professor: '정원주',
        schedule: '월 10:30-11:45, 수 10:30-11:45',
        description: '확률론과 랜덤 프로세스의 기본 개념을 학습합니다. 확률 분포, 랜덤 변수, 마르코프 프로세스 등을 다룹니다.',
        location: '정보통신관 205호'
      },
      // 디지털신호처리
      'COSE380': {
        professor: '이재훈',
        schedule: '월 12:00-13:15, 수 12:00-13:15',
        description: '디지털 신호 처리의 기본 원리와 알고리즘을 학습합니다. 샘플링, 필터링, FFT, 신호 변환 등을 다룹니다.',
        location: '애기능생활관 301호'
      },
      // 기업가정신과리더쉽
      'COSE389': {
        professor: '이문영',
        schedule: '수 15:00-16:15, 금 15:00-16:15',
        description: '기업가 정신과 리더십을 학습합니다. 창업 기초, 비즈니스 모델 설계, 팀 리더십 등을 다룹니다.',
        location: '애기능생활관 301호'
      },
      // 현장실습및창업실습I
      'COSE401': {
        professor: '이숙윤',
        schedule: '시간 협의',
        description: '현장 실습 및 창업 실습을 통해 실무 경험을 쌓습니다. 산업체 현장 실습과 창업 프로젝트를 수행합니다.',
        location: '시간 협의'
      },
      // 현장실습및창업실습II
      'COSE402': {
        professor: '이숙윤',
        schedule: '시간 협의',
        description: '현장 실습 및 창업 실습을 통해 실무 경험을 쌓습니다. 산업체 현장 실습과 창업 프로젝트를 수행합니다.',
        location: '시간 협의'
      },
      // 현장실습및창업실습III
      'COSE403': {
        professor: '이숙윤',
        schedule: '시간 협의',
        description: '현장 실습 및 창업 실습을 통해 실무 경험을 쌓습니다. 산업체 현장 실습과 창업 프로젝트를 수행합니다.',
        location: '시간 협의'
      },
      // 현장실습및창업실습IV
      'COSE404': {
        professor: '이숙윤',
        schedule: '시간 협의',
        description: '현장 실습 및 창업 실습을 통해 실무 경험을 쌓습니다. 산업체 현장 실습과 창업 프로젝트를 수행합니다.',
        location: '시간 협의'
      },
      // 컴퓨터학콜로키움
      'COSE405': {
        professor: '김진규',
        schedule: '수 16:30-20:50, 토 09:00-10:15',
        description: '컴퓨터학 분야의 최신 연구 동향과 기술을 학습합니다. 세미나와 토론을 통해 전문성을 향상시킵니다.',
        location: '애기능생활관 301호'
      },
      // 개별연구프로젝트
      'COSE407': {
        professor: '김진규',
        schedule: '화 16:30-17:45, 토 10:30-14:45',
        description: '개별 연구 프로젝트를 수행합니다. 지도교수와 함께 독립적인 연구 주제를 선정하고 연구를 진행합니다.',
        location: '애기능생활관 303호'
      },
      // 인간컴퓨터상호작용입문
      'COSE432': {
        professor: '김정현',
        schedule: '월 10:30-11:45, 수 10:30-11:45',
        description: '인간과 컴퓨터 간의 상호작용을 설계하는 기법을 학습합니다. 사용자 인터페이스, UX 디자인, 사용성 평가 등을 다룹니다.',
        location: '정보통신관 604호'
      },
      // 스타트업프로젝트관리
      'COSE455': {
        professor: '이문영',
        schedule: '수 13:30-14:45, 금 13:30-14:45',
        description: '스타트업 프로젝트 관리 기법을 학습합니다. 프로젝트 기획, 팀 관리, 일정 관리, 리스크 관리 등을 다룹니다.',
        location: '애기능생활관 301호'
      },
      // 산학캡스톤디자인
      'COSE480': {
        professor: '이숙윤, 구건재',
        schedule: '월 15:00-17:45, 토 15:00-17:45',
        description: '산업체와 연계한 캡스톤 디자인 프로젝트를 수행합니다. 실무 프로젝트를 통해 종합적인 설계 능력을 향상시킵니다.',
        location: '애기능생활관 303호'
      },
      // 전산학특강
      'COSE490': {
        professor: '박성빈',
        schedule: '금 12:00-14:45',
        description: '전산학 분야의 특정 주제에 대한 심화 강의입니다. 최신 기술 동향과 연구 주제를 다룹니다.',
        location: '정보통신관 202호'
      },
      // 자료구조 (다른 교수들)
      'COSE213-2': {
        professor: '박채용',
        schedule: '화 13:30-14:45, 목 13:30-14:45',
        description: '자료구조의 기본 개념과 구현 방법을 학습합니다. 배열, 리스트, 스택, 큐, 트리, 그래프 등을 다룹니다.',
        location: '정운오IT교양관 B103호'
      },
      'COSE213-3': {
        professor: '장부루',
        schedule: '화 12:00-13:15, 목 12:00-13:15',
        description: '자료구조의 기본 개념과 구현 방법을 학습합니다. 배열, 리스트, 스택, 큐, 트리, 그래프 등을 다룹니다.',
        location: '정보통신관 202호'
      },
      'COSE213-4': {
        professor: '이도길',
        schedule: '월 10:30-11:45, 수 10:30-11:45',
        description: '자료구조의 기본 개념과 구현 방법을 학습합니다. 배열, 리스트, 스택, 큐, 트리, 그래프 등을 다룹니다.',
        location: '정운오IT교양관 611호'
      },
      // 알고리즘 (다른 교수들)
      'COSE214-2': {
        professor: '박성빈',
        schedule: '월 16:30-17:45, 수 16:30-17:45',
        description: '알고리즘의 설계 및 분석 기법을 학습합니다. 시간복잡도, 공간복잡도 분석, 정렬 알고리즘, 탐색 알고리즘, 그래프 알고리즘 등을 다룹니다.',
        location: '정보통신관 205호'
      },
      'COSE214-3': {
        professor: '안가빈',
        schedule: '화 13:30-14:45, 목 13:30-14:45',
        description: '알고리즘의 설계 및 분석 기법을 학습합니다. 시간복잡도, 공간복잡도 분석, 정렬 알고리즘, 탐색 알고리즘, 그래프 알고리즘 등을 다룹니다.',
        location: '정운오IT교양관 610호'
      },
      'COSE214-4': {
        professor: '유용재',
        schedule: '목 09:00-11:45',
        description: '알고리즘의 설계 및 분석 기법을 학습합니다. 시간복잡도, 공간복잡도 분석, 정렬 알고리즘, 탐색 알고리즘, 그래프 알고리즘 등을 다룹니다.',
        location: '정보통신관 604호'
      },
      'COSE214-5': {
        professor: '김승태',
        schedule: '목 15:00-17:45',
        description: '알고리즘의 설계 및 분석 기법을 학습합니다. 시간복잡도, 공간복잡도 분석, 정렬 알고리즘, 탐색 알고리즘, 그래프 알고리즘 등을 다룹니다.',
        location: '애기능생활관 302호'
      },
      // 운영체제 (다른 교수)
      'COSE341-2': {
        professor: '오상은',
        schedule: '월 12:00-13:15, 수 12:00-13:15',
        description: '운영체제의 기본 개념과 구조를 학습합니다. 프로세스 관리, 메모리 관리, 파일 시스템, 입출력 관리 등을 다룹니다.',
        location: '정보통신관 205호'
      },
      // 컴퓨터네트워크 (다른 교수들)
      'COSE342-2': {
        professor: '주창희',
        schedule: '월 15:00-16:15, 화 15:00-16:15, 수 15:00-16:15, 목 15:00-16:15',
        description: '컴퓨터 네트워크의 기본 원리와 프로토콜을 학습합니다. TCP/IP, 라우팅, 네트워크 보안 등을 다룹니다.',
        location: '정운오IT교양관 611호'
      },
      'COSE342-3': {
        professor: '곽정호',
        schedule: '화 15:00-16:15, 목 15:00-16:15',
        description: '컴퓨터 네트워크의 기본 원리와 프로토콜을 학습합니다. TCP/IP, 라우팅, 네트워크 보안 등을 다룹니다.',
        location: '정운오IT교양관 609호'
      },
      // 컴퓨터구조 (다른 교수들)
      'COSE222-2': {
        professor: '김영근',
        schedule: '월 13:30-14:45, 수 13:30-14:45',
        description: '컴퓨터 하드웨어 구조를 학습합니다. CPU 설계, 메모리 계층 구조, 입출력 시스템 등을 다룹니다.',
        location: '정운오IT교양관 609호'
      },
      'COSE222-3': {
        professor: '정성우',
        schedule: '금 12:00-14:45',
        description: '컴퓨터 하드웨어 구조를 학습합니다. CPU 설계, 메모리 계층 구조, 입출력 시스템 등을 다룹니다.',
        location: '정운오IT교양관 609호'
      },
      'COSE222-4': {
        professor: '서태원',
        schedule: '월 13:30-14:45, 수 13:30-14:45',
        description: '컴퓨터 하드웨어 구조를 학습합니다. CPU 설계, 메모리 계층 구조, 입출력 시스템 등을 다룹니다.',
        location: '애기능생활관 302호'
      },
      'COSE222-5': {
        professor: '이중희',
        schedule: '화 15:00-16:15, 목 15:00-16:15',
        description: '컴퓨터 하드웨어 구조를 학습합니다. CPU 설계, 메모리 계층 구조, 입출력 시스템 등을 다룹니다.',
        location: '정운오IT교양관 610호'
      },
      'COSE222-6': {
        professor: '이중희',
        schedule: '화 16:30-17:45, 목 16:30-17:45',
        description: '컴퓨터 하드웨어 구조를 학습합니다. CPU 설계, 메모리 계층 구조, 입출력 시스템 등을 다룹니다.',
        location: '정운오IT교양관 610호'
      },
      // 데이터통신 (다른 교수)
      'COSE242-2': {
        professor: '김효곤',
        schedule: '화 10:30-11:45, 목 10:30-11:45',
        description: '데이터 통신의 기본 원리와 프로토콜을 학습합니다. 신호 전송, 오류 제어, 흐름 제어 등을 다룹니다.',
        location: '정운오IT교양관 611호'
      },
      // 딥러닝 (다른 교수들)
      'COSE474-3': {
        professor: '백승준',
        schedule: '화 10:30-11:45, 목 10:30-11:45',
        description: '딥러닝의 기본 이론과 실습을 학습합니다. 신경망, 역전파, CNN, RNN 등을 다룹니다.',
        location: '정운오IT교양관 B102'
      },
      'COSE474-4': {
        professor: '이상민',
        schedule: '화 15:00-16:15, 목 15:00-16:15',
        description: '딥러닝의 기본 이론과 실습을 학습합니다. 신경망, 역전파, CNN, RNN 등을 다룹니다.',
        location: '정보통신관 B101호'
      }
    };
    
    return courseInfoMap[courseCode] || {
      professor: '교수명 미정',
      schedule: '시간 협의',
      description: '과목 설명이 없습니다.',
      location: '장소 미정'
    };
  };

  const courseCode = course.courseId || course.courseCode;
  const hardcodedInfo = getHardcodedCourseInfo(courseCode);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
      <div 
        className="bg-white rounded-t-xl sm:rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '500px' }}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-3.5 flex items-center justify-between z-10">
          <h3 className="text-base font-semibold text-gray-900">{course.name}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-3.5 space-y-3">
          {/* Course Info */}
          <div className="space-y-2 border-b border-gray-100 pb-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">과목 코드</span>
              <span className="font-medium text-gray-900">{courseCode}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">학점</span>
              <span className="font-medium text-gray-900">{course.credits}학점</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">교수</span>
              <span className="font-medium text-gray-900">{hardcodedInfo.professor}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">시간</span>
              <span className="font-medium text-gray-900">{hardcodedInfo.schedule}</span>
            </div>
            {hardcodedInfo.location && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">장소</span>
                <span className="font-medium text-gray-900">{hardcodedInfo.location}</span>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">유형</span>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs border border-gray-200">
                {course.creditType === 'MAJOR_REQUIRED' ? '전필' : course.creditType === 'MAJOR_ELECTIVE' ? '전선' : '교양'}
              </span>
            </div>
          </div>

          {/* Difficulty & Workload */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
            <div>
              <div className="text-xs text-gray-500 mb-1.5">난이도</div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => {
                  const difficulty = (course as any).difficulty || 3;
                  return (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded flex items-center justify-center border ${
                        i < difficulty ? 'bg-gray-700 border-gray-700' : 'bg-white border-gray-300'
                      }`}
                    >
                      {i < difficulty && <span className="text-white text-[8px]">●</span>}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1.5">작업량</div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => {
                  const workload = (course as any).workload || 3;
                  return (
                    <div
                      key={i}
                      className={`w-4 h-4 rounded flex items-center justify-center border ${
                        i < workload ? 'bg-gray-700 border-gray-700' : 'bg-white border-gray-300'
                      }`}
                    >
                      {i < workload && <span className="text-white text-[8px]">●</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="pt-2 border-t border-gray-100">
            <div className="text-xs text-gray-500 mb-1.5">과목 설명</div>
            <div className="text-xs text-gray-700 leading-relaxed">{hardcodedInfo.description}</div>
          </div>

          {/* Prerequisites */}
          {((course as any).prerequisites && (course as any).prerequisites.length > 0) && (
            <div className="pt-2 border-t border-gray-100">
              <div className="text-xs text-gray-500 mb-1.5">선수과목</div>
              <div className="flex flex-wrap gap-1.5">
                {(course as any).prerequisites.map((prereqId: string) => (
                  <span key={prereqId} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs border border-indigo-200">
                    {prereqId}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Status */}
          {isCompleted && (
            <div className="pt-2 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-gray-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium">이수 완료</span>
              </div>
            </div>
          )}

          {/* Connections */}
          <div className="pt-2 border-t border-gray-100 space-y-3">
            {/* 선수강자 */}
            {선수강자.length > 0 && (
              <div>
                <div className="text-xs font-medium text-gray-700 mb-2">
                  선수강자 <span className="text-gray-500">({선수강자.length})</span>
                </div>
                <div className="space-y-1.5">
                  {선수강자.map((connection) => (
                    <div
                      key={connection.studentId}
                      className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div>
                        <div className="font-medium text-sm text-gray-900">{connection.name}</div>
                        {connection.semester && (
                          <div className="text-xs text-gray-500 mt-0.5">{connection.semester} 수강</div>
                        )}
                      </div>
                      <button className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs rounded hover:from-indigo-700 hover:to-blue-700 transition-all">
                        질문하기
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 동시수강자 */}
            {동시수강자.length > 0 && (
              <div>
                <div className="text-xs font-medium text-gray-700 mb-2">
                  동시수강자 <span className="text-gray-500">({동시수강자.length})</span>
                </div>
                <div className="space-y-1.5">
                  {동시수강자.map((connection) => (
                    <div
                      key={connection.studentId}
                      className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div>
                        <div className="font-medium text-sm text-gray-900">{connection.name}</div>
                        {connection.semester && (
                          <div className="text-xs text-gray-500 mt-0.5">{connection.semester} 수강</div>
                        )}
                      </div>
                      <button className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs rounded hover:from-indigo-700 hover:to-blue-700 transition-all">
                        메시지
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!loading && connections.length === 0 && (
              <div className="text-center py-3 text-gray-400 text-xs">
                연결된 학생이 없습니다
              </div>
            )}

            {loading && (
              <div className="text-center py-3 text-gray-400 text-xs">로딩 중...</div>
            )}
          </div>

          {/* Actions */}
          {!isCompleted && (
            <div className="pt-2 border-t border-gray-100">
              <button
                onClick={() => {
                  onAddToSchedule(courseCode);
                  onClose();
                }}
                className="w-full px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium text-sm rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all shadow-md"
              >
                시간표에 추가
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseModal;

