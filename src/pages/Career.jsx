import { useEffect, useState } from 'react';
import '../App.css';
import Dashboard from '../components/career/Dashboard';
import CareerRecommendation from '../components/career/CareerRecommendation';
import Roadmap from '../components/career/Roadmap';
import Connections from '../components/career/Connections';
import { useCareerStore } from '../store/careerStore';
import { mockCompletedCourses, mockCourses, mockTracks } from '../data/mockData';
import { careerApi } from '../api/careerApi';

function Career() {
  const {
    setCompletedCourses,
    setAllCourses,
    setTracks,
    selectedTrack
  } = useCareerStore();
  
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load mock data (replace with actual API calls)
    const loadData = async () => {
      setLoading(true);
      try {
        // In production, use actual API calls:
        // const completed = await careerApi.getCompletedCourses();
        // const courses = await careerApi.getAllCourses();
        // const tracks = await careerApi.getRecommendedTracks();
        
        // For now, use mock data
        setCompletedCourses(mockCompletedCourses);
        setAllCourses(mockCourses);
        setTracks(mockTracks);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [setCompletedCourses, setAllCourses, setTracks]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-content">
          <div className="flex items-center justify-center py-20">
            <div className="text-gray-500">로딩 중...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">🔍 진로탐색</h1>
        
        {/* Dashboard */}
        <Dashboard />
        
        {/* Career Recommendation */}
        <CareerRecommendation />
        
        {/* Roadmap */}
        <Roadmap />
        
      </div>
    </div>
  );
}

export default Career;

