import React from 'react';

const Stats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 gap-2 mb-3">
      <div className="bg-white border border-indigo-200 rounded-lg p-3 text-center">
        <div className="text-xl font-semibold text-indigo-700">
          {stats.connectedSeniors}
        </div>
        <div className="text-xs text-gray-600 mt-0.5">연결된 선배</div>
      </div>
      <div className="bg-white border border-indigo-200 rounded-lg p-3 text-center">
        <div className="text-xl font-semibold text-indigo-700">
          {stats.activeChats}
        </div>
        <div className="text-xs text-gray-600 mt-0.5">진행 중인 대화</div>
      </div>
    </div>
  );
};

export default Stats;
