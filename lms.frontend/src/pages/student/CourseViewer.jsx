// src/pages/student/CourseViewer.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../services/apiClient";
import StudentLayout from "../../layouts/StudentLayout";

export default function CourseViewer() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completing, setCompleting] = useState(null);

  useEffect(() => {
    apiClient.get(`/student/course/${id}`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const completeLesson = async (lessonId) => {
    setCompleting(lessonId);
    try {
      await apiClient.post(`/student/course/${id}/lesson/${lessonId}/complete`);
      // Update local state
      setData(prev => ({
        ...prev,
        completedLessonIds: [...prev.completedLessonIds, lessonId]
      }));
    } catch (err) {
      alert(err.response?.data?.message || "Failed to mark as complete");
    } finally {
      setCompleting(null);
    }
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </StudentLayout>
    );
  }

  if (!data) {
    return (
      <StudentLayout>
        <div className="text-center py-12">
          <div className="text-6xl mb-4">❌</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Course not found</h3>
          <p className="text-gray-600">The requested course could not be loaded</p>
        </div>
      </StudentLayout>
    );
  }

  const { course, lessons, completedLessonIds = [] } = data;
  const progress = lessons.length > 0 ? (completedLessonIds.length / lessons.length) * 100 : 0;

  return (
    <StudentLayout>
      {/* Course Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white p-8 mb-8">
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
          <p className="text-blue-100 text-lg mb-6">{course.description}</p>
          
          <div className="flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📖</span>
              <span>{lessons.length} lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <span>{completedLessonIds.length} completed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium text-gray-700">Course Progress</span>
          <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Lessons</h2>
        
        {lessons.map((lesson, index) => {
          const isCompleted = completedLessonIds.includes(lesson.id);

          return (
            <div key={lesson.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    } font-bold`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{lesson.title}</h3>
                      {lesson.duration && (
                        <p className="text-sm text-gray-600 mt-1">Duration: {lesson.duration}</p>
                      )}
                    </div>
                  </div>

                  {lesson.description && (
                    <p className="text-gray-600 mb-4 ml-14">{lesson.description}</p>
                  )}

                  {lesson.mediaUrl && (
                    <div className="ml-14 mb-4">
                      <video 
                        controls 
                        className="w-full max-w-2xl rounded-xl shadow-sm border border-gray-200"
                        poster={lesson.thumbnailUrl}
                      >
                        <source src={lesson.mediaUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>

                <button
                  disabled={isCompleted || completing === lesson.id}
                  onClick={() => completeLesson(lesson.id)}
                  className={`ml-4 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isCompleted 
                      ? "bg-green-500 text-white cursor-default" 
                      : "bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
                >
                  {completing === lesson.id ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : isCompleted ? (
                    <div className="flex items-center gap-2">
                      <span>✅</span>
                      Completed
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>🎯</span>
                      Mark Complete
                    </div>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {lessons.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No lessons available</h3>
          <p className="text-gray-600">Lessons will be added to this course soon</p>
        </div>
      )}
    </StudentLayout>
  );
}