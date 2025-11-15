import { useNavigate } from "react-router-dom";
import "../App.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <div className="page-content">
        <div className="page-card" style={{ textAlign: "center", padding: "40px 20px" }}>
          <h1 style={{ fontSize: "72px", margin: "0" }}>404</h1>
          <h2 className="page-title">페이지를 찾을 수 없습니다</h2>
          <p style={{ color: "#666", margin: "20px 0" }}>
            요청하신 페이지가 존재하지 않거나 이동되었습니다.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#007AFF",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              marginTop: "20px"
            }}
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
