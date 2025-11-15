import { useState, useEffect } from 'react';
import { useCareerStore } from '../../store/careerStore';
import { StudentConnection } from '../../types/career';
import { careerApi } from '../../api/careerApi';

function Connections({ courseId }: { courseId: string }) {
  const [connections, setConnections] = useState<StudentConnection[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchConnections = async () => {
      setLoading(true);
      try {
        const data = await careerApi.getStudentConnections(courseId);
        setConnections(data);
      } catch (error) {
        console.error('Failed to fetch connections:', error);
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchConnections();
    }
  }, [courseId]);

  if (!courseId) {
    return null;
  }

  const 선수강자 = connections.filter(c => c.type === '선수강자');
  const 동시수강자 = connections.filter(c => c.type === '동시수강자');

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 mb-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">👥 연결된 학생들</h2>
      
      {loading ? (
        <div className="text-center py-4 text-gray-500">로딩 중...</div>
      ) : connections.length === 0 ? (
        <div className="text-center py-4 text-gray-500">연결된 학생이 없습니다</div>
      ) : (
        <div className="space-y-4">
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
                    <button className="px-3 py-1.5 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors">
                      질문하기
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                    <button className="px-3 py-1.5 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors">
                      메시지
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Connections;

