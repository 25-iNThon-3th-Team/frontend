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
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-50" onClick={onClose}>
      <div 
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">{course.name}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Course Info */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">과목 코드</span>
              <span className="font-medium">{course.courseId}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">학점</span>
              <span className="font-medium">{course.credits}학점</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">교수</span>
              <span className="font-medium">{course.professor}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">시간</span>
              <span className="font-medium">{course.schedule}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">유형</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-sm">{course.type}</span>
            </div>
          </div>

          {/* Difficulty & Workload */}
          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-gray-200">
            <div>
              <div className="text-sm text-gray-600 mb-2">난이도</div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      i < course.difficulty ? 'bg-red-400' : 'bg-gray-200'
                    }`}
                  >
                    {i < course.difficulty && <span className="text-white text-xs">●</span>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-600 mb-2">작업량</div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      i < course.workload ? 'bg-blue-400' : 'bg-gray-200'
                    }`}
                  >
                    {i < course.workload && <span className="text-white text-xs">●</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          {course.description && (
            <div className="pt-3 border-t border-gray-200">
              <div className="text-sm text-gray-600 mb-2">과목 설명</div>
              <div className="text-sm text-gray-800">{course.description}</div>
            </div>
          )}

          {/* Prerequisites */}
          {course.prerequisites.length > 0 && (
            <div className="pt-3 border-t border-gray-200">
              <div className="text-sm text-gray-600 mb-2">선수과목</div>
              <div className="flex flex-wrap gap-2">
                {course.prerequisites.map((prereqId) => (
                  <span key={prereqId} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    {prereqId}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Status */}
          {isCompleted && (
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center gap-2 text-green-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">이수 완료</span>
              </div>
            </div>
          )}

          {/* Connections */}
          <div className="pt-3 border-t border-gray-200 space-y-4">
            {/* 선수강자 */}
            {선수강자.length > 0 && (
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  선수강자 ({선수강자.length})
                </div>
                <div className="space-y-2">
                  {선수강자.map((connection) => (
                    <div
                      key={connection.studentId}
                      className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div>
                        <div className="font-medium text-gray-800">{connection.name}</div>
                        {connection.semester && (
                          <div className="text-xs text-gray-600 mt-1">{connection.semester} 수강</div>
                        )}
                      </div>
                      <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors">
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
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  동시수강자 ({동시수강자.length})
                </div>
                <div className="space-y-2">
                  {동시수강자.map((connection) => (
                    <div
                      key={connection.studentId}
                      className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <div>
                        <div className="font-medium text-gray-800">{connection.name}</div>
                        {connection.semester && (
                          <div className="text-xs text-gray-600 mt-1">{connection.semester} 수강</div>
                        )}
                      </div>
                      <button className="px-4 py-2 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors">
                        메시지
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!loading && connections.length === 0 && (
              <div className="text-center py-4 text-gray-500 text-sm">
                연결된 학생이 없습니다
              </div>
            )}

            {loading && (
              <div className="text-center py-4 text-gray-500 text-sm">로딩 중...</div>
            )}
          </div>

          {/* Actions */}
          {!isCompleted && (
            <div className="pt-3 border-t border-gray-200">
              <button
                onClick={() => {
                  onAddToSchedule(course.courseId);
                  onClose();
                }}
                className="w-full px-4 py-3 bg-purple-500 text-white font-medium rounded-lg hover:bg-purple-600 transition-colors"
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

