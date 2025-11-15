import React from 'react';
import '../App.css';

function Guide() {
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">📘 이용안내</h1>

        <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
          <h2 className="text-md font-semibold text-gray-800 mb-2">서비스 소개</h2>
          <p className="text-sm text-gray-600 mb-4">
            저희 서비스는 학생들의 성공적인 대학 생활과 커리어 설계를 돕기 위한 맞춤형 플랫폼입니다.
          </p>

          <h2 className="text-md font-semibold text-gray-800 mb-2">주요 기능</h2>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            <li><strong>시간표 관리:</strong> 개인 맞춤형 시간표를 생성하고 관리할 수 있습니다.</li>
            <li><strong>멘토 연결:</strong> 원하는 분야의 선배들과 연결되어 조언을 얻을 수 있습니다.</li>
            <li><strong>진로 탐색:</strong> 학년별 로드맵과 추천 과목을 통해 커리어를 설계합니다.</li>
            <li><strong>마이페이지:</strong> 학습 현황과 목표를 관리하고 성찰할 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Guide;
