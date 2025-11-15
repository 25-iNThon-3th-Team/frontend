import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function MyPage() {
  const navigate = useNavigate();

  // 프로필 편집 상태
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "사용자",
    email: "user@example.com",
    studentId: "2020123456",
    major: "컴퓨터학과",
  });

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grade: profile.grade || 0,
          semester: profile.semester || 0,
          majorCode: profile.major,
          creditsMajorRequired: profile.creditsMajorRequired || 0,
          creditsMajorElective: profile.creditsMajorElective || 0,
          creditsGeneral: profile.creditsGeneral || 0,
          preferredOffDays: profile.preferredOffDays || [],
          preferredTimeSlot: profile.preferredTimeSlot || "",
          maxTransferMinutes: profile.maxTransferMinutes || 0,
          priorityOrder: profile.priorityOrder || [],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("프로필 저장 성공:", data);
        setIsEditing(false);
        alert("프로필이 저장되었습니다!");
      } else {
        console.error("프로필 저장 실패:", response.status);
        alert("프로필 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("API 호출 에러:", error);
      alert("프로필 저장 중 오류가 발생했습니다.");
    }
  };

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  // 통계 데이터 (예시)
  const stats = {
    connectedSeniors: 5,
    activeChats: 3,
    completedCredits: 78,
    totalCredits: 130,
  };

  // 최근 활동 데이터 (예시)
  const recentActivities = [
    {
      id: 1,
      seniorName: "김선배",
      subject: "자료구조",
      lastMessage: "과제 관련 자료 공유해드렸어요!",
      time: "2시간 전",
      avatar: "👨‍💻",
    },
    {
      id: 2,
      seniorName: "이선배",
      subject: "알고리즘",
      lastMessage: "다음 주 시험 화이팅!",
      time: "5시간 전",
      avatar: "👩‍💼",
    },
    {
      id: 3,
      seniorName: "박선배",
      subject: "데이터베이스",
      lastMessage: "SQL 쿼리 예제 보내드릴게요",
      time: "1일 전",
      avatar: "👨‍🎓",
    },
  ];

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">👤 마이페이지</h1>

        {/* 활동 통계 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <div
            className="page-card"
            style={{
              padding: "16px",
              textAlign: "center",
              flex: "none",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#667eea",
              }}
            >
              {stats.connectedSeniors}
            </div>
            <div
              style={{ fontSize: "0.8rem", color: "#718096", marginTop: "4px" }}
            >
              연결된 선배
            </div>
          </div>
          <div
            className="page-card"
            style={{
              padding: "16px",
              textAlign: "center",
              flex: "none",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#48bb78",
              }}
            >
              {stats.activeChats}
            </div>
            <div
              style={{ fontSize: "0.8rem", color: "#718096", marginTop: "4px" }}
            >
              진행 중인 대화
            </div>
          </div>
          <div
            className="page-card"
            style={{
              padding: "16px",
              textAlign: "center",
              flex: "none",
            }}
          >
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#f6ad55",
              }}
            >
              {stats.completedCredits}
            </div>
            <div
              style={{ fontSize: "0.8rem", color: "#718096", marginTop: "4px" }}
            >
              이수 학점
            </div>
          </div>
        </div>

        <div className="page-card">
          <div className="profile-section">
            <div className="profile-avatar">👤</div>

            {!isEditing ? (
              <>
                <h2 className="profile-name">{profile.name}</h2>
                <p className="profile-email">{profile.email}</p>
                <p
                  className="profile-email"
                  style={{ fontSize: "0.85rem", color: "#718096" }}
                >
                  {profile.studentId} · {profile.major}
                </p>
                <button
                  onClick={handleEditToggle}
                  style={{
                    marginTop: "12px",
                    padding: "8px 20px",
                    background: "#667eea",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    fontWeight: "500",
                  }}
                >
                  프로필 편집
                </button>
              </>
            ) : (
              <>
                <div
                  style={{
                    marginTop: "16px",
                    width: "100%",
                    maxWidth: "300px",
                  }}
                >
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="이름"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      boxSizing: "border-box",
                    }}
                  />
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="이메일"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      boxSizing: "border-box",
                    }}
                  />
                  <input
                    type="text"
                    value={profile.studentId}
                    onChange={(e) =>
                      handleInputChange("studentId", e.target.value)
                    }
                    placeholder="학번"
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "10px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      boxSizing: "border-box",
                    }}
                  />
                  <select
                    value={profile.major}
                    onChange={(e) => handleInputChange("major", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginBottom: "16px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "0.95rem",
                      boxSizing: "border-box",
                      cursor: "pointer",
                      background: "white",
                    }}
                  >
                    <option value="컴퓨터학과">컴퓨터학과</option>
                    <option value="데이터과학과">데이터과학과</option>
                    <option value="인공지능학과">인공지능학과</option>
                  </select>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={handleSave}
                      style={{
                        flex: 1,
                        padding: "10px",
                        background: "#48bb78",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      저장
                    </button>
                    <button
                      onClick={handleEditToggle}
                      style={{
                        flex: 1,
                        padding: "10px",
                        background: "#e2e8f0",
                        color: "#4a5568",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        fontWeight: "500",
                      }}
                    >
                      취소
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="menu-list">
            <div
              className="menu-item"
              onClick={() => handleMenuClick("/schedule")}
            >
              📚 내 시간표
            </div>
            <div
              className="menu-item"
              onClick={() => handleMenuClick("/mymessage")}
            >
              💬 내 메시지
            </div>
            <div className="menu-item">⚙️ 설정</div>
            <div className="menu-item">📞 고객지원</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
