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
          const data = await careerApi.getStudentConnections(course.courseId);
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

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-40" onClick={onClose}>
      <div 
        className="bg-white rounded-t-xl sm:rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg"
        onClick={(e) => e.stopPropagation()}
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
              <span className="font-medium text-gray-900">{course.courseId}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">학점</span>
              <span className="font-medium text-gray-900">{course.credits}학점</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">교수</span>
              <span className="font-medium text-gray-900">{course.professor}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">시간</span>
              <span className="font-medium text-gray-900">{course.schedule}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">유형</span>
              <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs border border-gray-200">{course.type}</span>
            </div>
          </div>

          {/* Difficulty & Workload */}
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
            <div>
              <div className="text-xs text-gray-500 mb-1.5">난이도</div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded flex items-center justify-center border ${
                      i < course.difficulty ? 'bg-gray-700 border-gray-700' : 'bg-white border-gray-300'
                    }`}
                  >
                    {i < course.difficulty && <span className="text-white text-[8px]">●</span>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1.5">작업량</div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded flex items-center justify-center border ${
                      i < course.workload ? 'bg-gray-700 border-gray-700' : 'bg-white border-gray-300'
                    }`}
                  >
                    {i < course.workload && <span className="text-white text-[8px]">●</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          {course.description && (
            <div className="pt-2 border-t border-gray-100">
              <div className="text-xs text-gray-500 mb-1.5">과목 설명</div>
              <div className="text-xs text-gray-700 leading-relaxed">{course.description}</div>
            </div>
          )}

          {/* Prerequisites */}
          {course.prerequisites.length > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <div className="text-xs text-gray-500 mb-1.5">선수과목</div>
              <div className="flex flex-wrap gap-1.5">
                {course.prerequisites.map((prereqId) => (
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
                  onAddToSchedule(course.courseId);
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

