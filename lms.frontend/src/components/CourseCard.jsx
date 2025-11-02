// src/components/CourseCard.jsx
import React from "react";

export default function CourseCard({ course = {}, onView = () => {}, onEnroll = () => {} }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col">
      <div className="flex items-start gap-4">
        <div className="w-20 h-14 bg-gray-100 rounded flex items-center justify-center text-sm text-gray-500">
          {course.thumbnail ? <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover rounded" /> : "Image"}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{course.title || "Untitled Course"}</h3>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{course.description || "No description"}</p>
          <div className="text-xs text-gray-500 mt-2">Instructor: {course.instructorName || "TBA"}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">{course.price ? `₹${course.price}` : "Free"}</div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEnroll(course.id)}
            className="px-3 py-1 border rounded text-sm hover:bg-gray-50"
          >
            Enroll
          </button>
          <button
            onClick={() => onView(course.id)}
            className="px-3 py-1 bg-indigo-600 text-white rounded text-sm"
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
