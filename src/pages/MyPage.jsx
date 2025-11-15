import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuthStore from "../store/authStore";
import "../App.css";
import ProfileCard from "../components/mypage/ProfileCard";
import CoursePreferenceCard from "../components/mypage/CoursePreferenceCard";
import SettingsMenu from "../components/mypage/SettingsMenu";

function MyPage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "사용자",
    userid: "", // API에서 가져올 때까지 빈 값
    studentId: "2020123456",
    major: "컴퓨터학과",
    grade: 3,
    semester: 1,
    completedCredits: 78,
    totalCredits: 130,
  });

  const [coursePreference, setCoursePreference] = useState({
    preferredOffDays: ["수요일"],
    preferredTimeSlot: "morning",
    maxTransferMinutes: 15,
    priorityOrder: ["전공필수", "전공선택", "교양"],
  });


  const handleSave = async () => {
    try {
      const response = await axios.put("/api/users/me", {
        name: profile.name || "", // 사용자 이름 (표시 이름)
        grade: profile.grade || 0,
        semester: profile.semester || 0,
        majorCode: profile.major || "",
        creditsMajorRequired: profile.creditsMajorRequired || 0,
        creditsMajorElective: profile.creditsMajorElective || 0,
        creditsGeneral: profile.creditsGeneral || 0,
        preferredOffDays: coursePreference.preferredOffDays || [],
        preferredTimeSlot: coursePreference.preferredTimeSlot || "",
        maxTransferMinutes: coursePreference.maxTransferMinutes || 0,
        priorityOrder: coursePreference.priorityOrder || [],
      });
      console.log("프로필 저장 성공:", response.data);
      alert("프로필이 저장되었습니다!");
    } catch (error) {
      console.error("프로필 저장 에러:", error);
      alert("프로필 저장에 실패했습니다.");
    }
  };

  const handleInputChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };


  const handleLogout = async () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      try {
        await axios.post("/logout");
        console.log("로그아웃 성공");
      } catch (error) {
        console.error("로그아웃 에러:", error);
      } finally {
        const { logout } = useAuthStore.getState();
        logout();
        sessionStorage.clear();
        navigate("/");
        alert("로그아웃되었습니다.");
      }
    }
  };

  const handlePreferenceSave = async () => {
    try {
      // API 호출하여 수강신청 성향 저장
      const response = await axios.put("/api/users/me", {
        name: profile.name || "", // 사용자 이름 (표시 이름)
        grade: profile.grade || 0,
        semester: profile.semester || 0,
        majorCode: profile.major || "",
        creditsMajorRequired: profile.creditsMajorRequired || 0,
        creditsMajorElective: profile.creditsMajorElective || 0,
        creditsGeneral: profile.creditsGeneral || 0,
        preferredOffDays: coursePreference.preferredOffDays || [],
        preferredTimeSlot: coursePreference.preferredTimeSlot || "",
        maxTransferMinutes: coursePreference.maxTransferMinutes || 0,
        priorityOrder: coursePreference.priorityOrder || [],
      });
      
      console.log("수강신청 성향 저장 성공:", response.data);
      alert("수강신청 성향이 저장되었습니다!");
    } catch (error) {
      console.error("수강신청 성향 저장 에러:", error);
      console.error("에러 응답:", error.response);
      
      if (!error.response) {
        alert("서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.");
      } else if (error.response.status === 400) {
        const message = error.response.data?.message || "입력한 정보를 확인해주세요.";
        alert(`저장 실패: ${message}`);
      } else if (error.response.status === 401 || error.response.status === 403) {
        alert("인증이 만료되었습니다. 다시 로그인해주세요.");
      } else if (error.response.status >= 500) {
        alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else {
        alert(`저장 중 오류가 발생했습니다. (오류 코드: ${error.response.status})`);
      }
    }
  };

  const handlePreferenceChange = (field, value) => {
    setCoursePreference({ ...coursePreference, [field]: value });
  };

  const toggleOffDay = (day) => {
    const currentDays = coursePreference.preferredOffDays;
    const newDays = currentDays.includes(day)
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day];
    handlePreferenceChange("preferredOffDays", newDays);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users/me");
        const userData = response.data;

        console.log("사용자 데이터:", userData); // 디버깅용
        console.log("userid 필드 확인:", {
          userid: userData.userid,
          userId: userData.userId,
          user_id: userData.user_id,
          USER_ID: userData.USER_ID
        }); // 디버깅용
        
        setProfile((prevProfile) => ({
          ...prevProfile,
          name: userData.username || userData.name || prevProfile.name, // username (이름) 우선 가져오기
          // 회원가입 시 userId로 보냈으므로 userId를 우선 확인
          userid: userData.userId || userData.userid || userData.user_id || prevProfile.userid || "", 
          studentId: userData.studentId || userData.student_id || prevProfile.studentId,
          major: userData.majorCode || userData.major || prevProfile.major,
          grade: userData.grade || prevProfile.grade,
          semester: userData.semester || prevProfile.semester,
          creditsMajorRequired:
            userData.creditsMajorRequired || prevProfile.creditsMajorRequired,
          creditsMajorElective:
            userData.creditsMajorElective || prevProfile.creditsMajorElective,
          creditsGeneral: userData.creditsGeneral || prevProfile.creditsGeneral,
        }));

        setCoursePreference((prevPreference) => ({
          ...prevPreference,
          preferredOffDays:
            userData.preferredOffDays || prevPreference.preferredOffDays,
          preferredTimeSlot:
            userData.preferredTimeSlot || prevPreference.preferredTimeSlot,
          maxTransferMinutes:
            userData.maxTransferMinutes || prevPreference.maxTransferMinutes,
          priorityOrder: userData.priorityOrder || prevPreference.priorityOrder,
        }));
      } catch (error) {
        console.error("사용자 데이터 로드 에러:", error);
        // Optionally, handle error by setting default values or showing a message
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">마이페이지</h1>
        <ProfileCard
          profile={profile}
          onSave={handleSave}
          onInputChange={handleInputChange}
          onLogout={handleLogout}
        />
        <CoursePreferenceCard
          preference={coursePreference}
          onSave={handlePreferenceSave}
          onChange={handlePreferenceChange}
          toggleOffDay={toggleOffDay}
        />
        <SettingsMenu />
      </div>
    </div>
  );
}

export default MyPage;
