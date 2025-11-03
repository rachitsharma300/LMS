// src/pages/student/CourseViewer.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StudentLayout from "../../layouts/StudentLayout";
import * as lessonService from "../../services/lessonService";
import Loader from "../../components/Loader";

export default function CourseViewer() {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLessons = async () => {
      try {
        const data = await lessonService.getLessonsByCourse(id);
        setLessons(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadLessons();
  }, [id]);

  return (
    <StudentLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Course Lessons</h2>
        {loading ? (
          <Loader text="Loading lessons..." />
        ) : lessons.length === 0 ? (
          <div className="text-gray-500">No lessons available.</div>
        ) : (
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-white p-4 rounded-lg shadow-sm border"
              >
                <h3 className="font-medium text-lg">{lesson.title}</h3>
                <p className="text-gray-600 mt-2">{lesson.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </StudentLayout>
  );
}
