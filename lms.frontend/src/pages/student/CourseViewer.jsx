// src/pages/student/CourseViewer.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StudentLayout from "../../layouts/StudentLayout";
import * as lessonService from "../../services/lessonService";
import * as courseService from "../../services/courseService";
import Loader from "../../components/Loader";

export default function CourseViewer() {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);
  const [course, setCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(false);
  const [completedLessons, setCompletedLessons] = useState(new Set());

  useEffect(() => {
    const loadCourseData = async () => {
      try {
        setLoading(true);
        
        // Simulate API calls - replace with actual API calls
        const [lessonsData, courseData] = await Promise.all([
          lessonService.getLessonsByCourse(id),
          courseService.getCourseById(id)
        ]);

        // Mock data for demonstration
        const mockLessons = [
          {
            id: 1,
            title: "Introduction to React",
            content: "Learn the fundamentals of React and its core concepts",
            duration: "15:30",
            type: "video",
            videoUrl: "https://example.com/video1",
            resources: ["Slide Deck", "Code Examples"],
            isCompleted: true,
            order: 1
          },
          {
            id: 2,
            title: "Components and Props",
            content: "Understanding React components and how to pass data with props",
            duration: "22:15",
            type: "video",
            videoUrl: "https://example.com/video2",
            resources: ["Exercise Files", "Cheat Sheet"],
            isCompleted: false,
            order: 2
          },
          {
            id: 3,
            title: "State and Lifecycle",
            content: "Master component state and lifecycle methods in React",
            duration: "28:45",
            type: "video",
            videoUrl: "https://example.com/video3",
            resources: ["Practice Project", "Additional Reading"],
            isCompleted: false,
            order: 3
          },
          {
            id: 4,
            title: "Handling Events",
            content: "Learn how to handle user interactions and events in React",
            duration: "18:20",
            type: "video",
            videoUrl: "https://example.com/video4",
            resources: ["Interactive Demo", "Code Sandbox"],
            isCompleted: false,
            order: 4
          },
          {
            id: 5,
            title: "Quiz: React Fundamentals",
            content: "Test your knowledge with this interactive quiz",
            duration: "10:00",
            type: "quiz",
            questions: 10,
            isCompleted: false,
            order: 5
          }
        ];

        const mockCourse = {
          id: id,
          title: "React Masterclass 2024",
          description: "Complete React development course with hooks, context, and advanced patterns",
          instructor: "John Doe",
          progress: 20,
          totalLessons: 5,
          completedLessons: 1,
          thumbnail: "/api/placeholder/400/300",
          category: "Web Development",
          level: "Beginner"
        };

        setLessons(mockLessons);
        setCourse(mockCourse);
        setCurrentLesson(mockLessons[0]);

        // Mark completed lessons
        const completed = new Set();
        mockLessons.forEach(lesson => {
          if (lesson.isCompleted) {
            completed.add(lesson.id);
          }
        });
        setCompletedLessons(completed);

      } catch (err) {
        console.error("Error loading course data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourseData();
  }, [id]);

  const handleLessonSelect = (lesson) => {
    setCurrentLesson(lesson);
    setVideoLoading(true);
    
    // Simulate video loading
    setTimeout(() => {
      setVideoLoading(false);
    }, 1000);
  };

  const markLessonComplete = (lessonId) => {
    setCompletedLessons(prev => {
      const newCompleted = new Set(prev);
      newCompleted.add(lessonId);
      return newCompleted;
    });
  };

  const getNextLesson = () => {
    const currentIndex = lessons.findIndex(lesson => lesson.id === currentLesson.id);
    return lessons[currentIndex + 1];
  };

  const getPreviousLesson = () => {
    const currentIndex = lessons.findIndex(lesson => lesson.id === currentLesson.id);
    return lessons[currentIndex - 1];
  };

  const calculateProgress = () => {
    return Math.round((completedLessons.size / lessons.length) * 100);
  };

  if (loading) {
    return (
      <StudentLayout>
        <div className="flex items-center justify-center min-h-96">
          <Loader size="lg" text="Loading course content..." variant="modern" />
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {course?.category}
                </span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
                  {course?.level}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-3">{course?.title}</h1>
              <p className="text-blue-100 text-lg mb-4 max-w-3xl">{course?.description}</p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Instructor: {course?.instructor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{lessons.length} lessons</span>
                </div>
              </div>
            </div>
            
            {/* Progress Section */}
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 text-center">
                <div className="text-2xl font-bold mb-2">{calculateProgress()}%</div>
                <div className="text-blue-100 text-sm mb-3">Course Progress</div>
                <div className="w-32 h-2 bg-white/30 rounded-full mx-auto">
                  <div 
                    className="h-2 bg-white rounded-full transition-all duration-500"
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>
                <div className="text-xs text-blue-200 mt-2">
                  {completedLessons.size} of {lessons.length} lessons completed
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Lessons Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              
              {/* Sidebar Header */}
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Course Content</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {lessons.length} lessons • {course?.totalLessons || 0} total
                </p>
              </div>

              {/* Lessons List */}
              <div className="max-h-96 lg:max-h-[calc(100vh-300px)] overflow-y-auto">
                {lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => handleLessonSelect(lesson)}
                    className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 ${
                      currentLesson?.id === lesson.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      
                      {/* Lesson Number */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                        completedLessons.has(lesson.id)
                          ? 'bg-green-100 text-green-700'
                          : currentLesson?.id === lesson.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {completedLessons.has(lesson.id) ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          index + 1
                        )}
                      </div>

                      {/* Lesson Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-medium text-sm truncate ${
                          currentLesson?.id === lesson.id ? 'text-blue-700' : 'text-gray-900'
                        }`}>
                          {lesson.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{lesson.duration}</span>
                          {lesson.type === 'quiz' && (
                            <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                              Quiz
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Play Icon */}
                      {currentLesson?.id === lesson.id && (
                        <div className="text-blue-600 flex-shrink-0">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {currentLesson ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                
                {/* Lesson Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{currentLesson.title}</h2>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {currentLesson.duration}
                        </span>
                        {currentLesson.type === 'quiz' && (
                          <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                            Quiz: {currentLesson.questions} questions
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Mark Complete Button */}
                    {!completedLessons.has(currentLesson.id) && (
                      <button
                        onClick={() => markLessonComplete(currentLesson.id)}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>

                {/* Lesson Content */}
                <div className="p-6">
                  
                  {/* Video Player */}
                  {currentLesson.type === 'video' && (
                    <div className="mb-6">
                      {videoLoading ? (
                        <div className="bg-gray-200 rounded-xl w-full h-64 flex items-center justify-center">
                          <Loader text="Loading video..." size="md" />
                        </div>
                      ) : (
                        <div className="bg-gray-900 rounded-xl overflow-hidden">
                          <div className="aspect-w-16 aspect-h-9 bg-black flex items-center justify-center">
                            <div className="text-center text-white">
                              <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                              <p className="text-lg font-medium">Video Player</p>
                              <p className="text-gray-400 text-sm mt-1">Lesson content would play here</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Quiz Content */}
                  {currentLesson.type === 'quiz' && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Ready for the Quiz?</h3>
                          <p className="text-yellow-700 text-sm">Test your knowledge with {currentLesson.questions} questions</p>
                        </div>
                      </div>
                      <button className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-200">
                        Start Quiz
                      </button>
                    </div>
                  )}

                  {/* Lesson Description */}
                  <div className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed">{currentLesson.content}</p>
                  </div>

                  {/* Resources */}
                  {currentLesson.resources && currentLesson.resources.length > 0 && (
                    <div className="mt-8">
                      <h4 className="font-semibold text-gray-900 mb-4">Lesson Resources</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentLesson.resources.map((resource, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                            <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span className="text-sm text-gray-700">{resource}</span>
                            <button className="ml-auto text-blue-600 hover:text-blue-700 text-sm font-medium">
                              Download
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Navigation Footer */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => getPreviousLesson() && handleLessonSelect(getPreviousLesson())}
                      disabled={!getPreviousLesson()}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>

                    <button
                      onClick={() => getNextLesson() && handleLessonSelect(getNextLesson())}
                      disabled={!getNextLesson()}
                      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      Next Lesson
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Lesson</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Choose a lesson from the sidebar to start learning. Each lesson builds upon the previous one to help you master the course material.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}