<h1>🎓 Learning Management System (LMS) Backend</h1>
<p>
A full-featured Learning Management System built with Spring Boot that facilitates online learning with role-based access control, course management, and student progress tracking.
</p>

<h2>🚀 Features</h2>
<h3>👥 Role-Based Access Control</h3>

-> Admin: Manage users, approve courses, system oversight

-> Instructor: Create courses, manage lessons, view enrollments

-> Student: Browse courses, enroll, track learning progress.

<h3>📚 Course Management</h3>
-> Create and manage courses with rich content

-> Add lessons with text, video, PDF support

-> Course categorization and approval workflow

-> Enrollment management with duplicate prevention

<h3>🔐 Security & Authentication</h3>
-> JWT-based secure authentication

-> Password encryption with BCrypt

-> Role-based endpoint protection

-> CORS configuration for frontend integration

<h3>📁 Media Handling</h3>
-> AWS S3 integration for file storage

-> Support for videos, PDFs, images, audio

-> Secure file upload and retrieval

<h2>🛠 Tech Stack</h2>
<h3>Backend</h3>
-> Framework: Spring Boot 3.5.6

-> Security: Spring Security 6.5.5 + JWT

-> Database: MySQL with Spring Data JPA

-> Documentation: Swagger/OpenAPI 3.1

-> Testing: JUnit 5, Mockito

-> Build Tool: Maven

<h3>Cloud Services</h3>
-> File Storage: AWS S3

-> Deployment: Render/Railway (Backend), Vercel/Netlify (Frontend)

<h2>📋 API Endpoints</h2>

Authentication Endpoints
```
Method	Endpoint	Description	Access
POST	/api/auth/signup	User registration	Public
POST	/api/auth/login	User login	Public
POST	/api/auth/validate	Token validation	All Roles
```
Admin Endpoints
```

Method	Endpoint	Description
GET	/api/admin/users	Get all users
PUT	/api/admin/users/{id}/role	Update user role
GET	/api/admin/courses	Get all courses
PUT	/api/admin/courses/{id}/approve	Approve/reject course
DELETE	/api/admin/courses/{id}	Delete course
```
Instructor Endpoints
```

Method	Endpoint	Description
POST	/api/instructor/courses	Create new course
PUT	/api/instructor/courses/{id}	Update course
GET	/api/instructor/courses	Get instructor's courses
POST	/api/instructor/courses/{courseId}/lessons	Add lesson to course
GET	/api/instructor/courses/{courseId}/enrollments	View course enrollments
```
Student Endpoints
```

Method	Endpoint	Description
GET	/api/student/courses	Browse available courses
POST	/api/student/courses/{courseId}/enroll	Enroll in course
GET	/api/student/enrollments	Get student's enrollments
GET	/api/student/courses/{courseId}/lessons	View course lessons
PUT	/api/student/progress/{lessonId}	Update lesson progress
```
Media Endpoints
```

Method	Endpoint	Description
POST	/api/media/upload	Upload media file
GET	/api/media/{filename}	Get media file
DELETE	/api/media/{filename}	Delete media file
```






