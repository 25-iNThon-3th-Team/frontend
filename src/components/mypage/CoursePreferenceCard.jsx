import { useState } from "react";

const CoursePreferenceCard = ({
  preference,
  onSave,
  onChange,
  toggleOffDay,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    onSave();
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Optionally reset changes
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-3 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-900">
          수강신청 성향
        </h2>
        {!isEditing && (
          <button
            onClick={handleEditToggle}
            className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
          >
            편집
          </button>
        )}
      </div>

      {!isEditing ? (
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <svg
              className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-0.5">
                공강 희망 요일
              </div>
              <div className="text-sm text-gray-900">
                {preference.preferredOffDays.length > 0
                  ? preference.preferredOffDays.join(", ")
                  : "없음"}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <svg
              className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-0.5">선호 시간대</div>
              <div className="text-sm text-gray-900">
                {preference.preferredTimeSlot === "morning" &&
                  "아침형 (09:00-12:00)"}
                {preference.preferredTimeSlot === "afternoon" &&
                  "오후형 (13:00-16:00)"}
                {preference.preferredTimeSlot === "evening" &&
                  "저녁형 (17:00-20:00)"}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <svg
              className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-0.5">
                이동 시간 제한
              </div>
              <div className="text-sm text-gray-900">
                {preference.maxTransferMinutes}분
              </div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <svg
              className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <div className="flex-1">
              <div className="text-xs text-gray-500 mb-0.5">우선순위</div>
              <div className="text-sm text-gray-900">
                {preference.priorityOrder.join(" > ")}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              공강 희망 요일
            </label>
            <div className="flex flex-wrap gap-2">
              {["월요일", "화요일", "수요일", "목요일", "금요일", "없음"].map(
                (day) => (
                  <button
                    key={day}
                    onClick={() => toggleOffDay(day)}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                      preference.preferredOffDays.includes(day)
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-indigo-300"
                    }`}
                  >
                    {day}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              선호 시간대
            </label>
            <select
              value={preference.preferredTimeSlot}
              onChange={(e) =>
                onChange("preferredTimeSlot", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
            >
              <option value="morning">아침형 (09:00-12:00)</option>
              <option value="afternoon">오후형 (13:00-16:00)</option>
              <option value="evening">저녁형 (17:00-20:00)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              이동 시간 제한 (분)
            </label>
            <input
              type="number"
              value={preference.maxTransferMinutes}
              onChange={(e) =>
                onChange(
                  "maxTransferMinutes",
                  parseInt(e.target.value)
                )
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
              min="0"
              max="60"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-sm rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all font-medium"
            >
              저장
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursePreferenceCard;
