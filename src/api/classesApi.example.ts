// API 사용 예제

import { classesApi, convertClassToCourse } from './classesApi';

// 방법 1: 원본 데이터 그대로 사용
async function example1() {
  try {
    const classes = await classesApi.getClasses();
    console.log('Classes:', classes);
    
    // 각 클래스 데이터 사용
    classes.forEach(classData => {
      console.log(`과목: ${classData.course.name}`);
      console.log(`교수: ${classData.professorName}`);
      console.log(`분반: ${classData.classCode}`);
      console.log(`시간표:`, classData.schedule);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// 방법 2: 기존 형식으로 변환해서 사용 (Schedule.jsx에서 사용)
async function example2() {
  try {
    const courses = await classesApi.getClassesAsCourses();
    console.log('Converted Courses:', courses);
    
    // 기존 mockCourses 형식과 동일하게 사용 가능
    courses.forEach(course => {
      console.log(`과목 코드: ${course.courseId}`);
      console.log(`과목명: ${course.name}`);
      console.log(`교수: ${course.professor}`);
      console.log(`시간: ${course.schedule}`);
      console.log(`유형: ${course.type}`);
      console.log(`장소: ${course.location}`);
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

// 방법 3: Schedule.jsx에서 사용하는 예제
/*
import { classesApi } from '../api/classesApi';
import { useMemo } from 'react';

function Schedule() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const apiCourses = await classesApi.getClassesAsCourses();
        setCourses(apiCourses);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        // 에러 발생 시 mockCourses 사용
        setCourses(mockCourses);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  const availableCourses = useMemo(
    () => courses.map((course) => enrichCourse(course)), 
    [courses]
  );

  // ... 나머지 코드
}
*/

