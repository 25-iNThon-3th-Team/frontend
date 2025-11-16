import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuthStore from "../store/authStore";
import "../App.css";
import Stats from "../components/mypage/Stats";
import ProfileCard from "../components/mypage/ProfileCard";
import CoursePreferenceCard from "../components/mypage/CoursePreferenceCard";
import SettingsMenu from "../components/mypage/SettingsMenu";

function MyPage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "사용자",
    // email: "user@example.com",
    // studentId: "2020123456",
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

  const [stats, setStats] = useState({
    connectedSeniors: 0,
    activeChats: 0,
  });

  const handleSave = async () => {
    try {
      const response = await axios.put("/api/users/me", {
        username: profile.name || "", // 사용자 이름 (표시 이름)
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

  const handleLogin = async () => {
    try {
      const response = await axios.post("/login", {
        userid: "admin",
        password: "admin123",
      });
      console.log("로그인 성공:", response.data);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      alert("로그인 성공!");
    } catch (error) {
      console.error("로그인 에러:", error);
      alert("로그인 실패");
    }
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
      // Assuming a similar API endpoint for preferences
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
      // await axios.put("/api/users/me/preferences", coursePreference);
      console.log("수강신청 성향 저장:", coursePreference);
      alert("수강신청 성향이 저장되었습니다!");
    } catch (error) {
      console.error("API 호출 에러:", error);
      alert("저장 중 오류가 발생했습니다.");
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

        setProfile((prevProfile) => ({
          ...prevProfile,
          name: userData.name || userData.username || prevProfile.name, // name 또는 username 필드에서 사용자 이름 가져오기
          // email: userData.email || prevProfile.email,
          // studentId: userData.studentId || prevProfile.studentId,
          major: userData.majorCode || prevProfile.major,
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

    const fetchStatsData = () => {
      // Mock data, replace with actual API calls
      const seniorData = { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {}, 7: {} };
      const recentChats = [{}, {}, {}];
      setStats({
        connectedSeniors: Object.keys(seniorData).length,
        activeChats: recentChats.length,
      });
    };

    fetchUserData();
    fetchStatsData();
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
          onLogin={handleLogin}
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
