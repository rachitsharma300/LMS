# 🎓 Learning Management System (LMS) Backend

A full-featured **Learning Management System** built with **Spring Boot** that supports:
- Role-based access control
- Course & lesson management
- Secure authentication and authorization
- Student progress tracking
- Cloud-based media storage

---

## 🚀 Features

### 👥 Role-Based Access Control
| Role | Capabilities |
|------|--------------|
| **Admin** | Manage users • Approve courses • System oversight |
| **Instructor** | Create/manage courses • Manage lessons • View enrollments |
| **Student** | Browse courses • Enroll • Track learning progress |

---

### 📚 Course Management
- Create and manage courses with structured content
- Add lessons (Text, Video, PDF supported)
- Categorized courses with approval workflow
- Enrollment management with duplicate prevention

---

### 🔐 Security & Authentication
- JWT-based secure authentication
- Password hashing using **BCrypt**
- Role-based API access restrictions
- CORS enabled for frontend integration

---

### 📁 Media Handling
- AWS S3 cloud storage integration
- Supports Videos • PDFs • Images • Audio
- Secure upload & access endpoints

---

## 🛠 Tech Stack

### 🧩 Backend
| Component | Technology |
|----------|------------|
| Framework | **Spring Boot 3.5.6** |
| Security | **Spring Security 6.5.5 + JWT** |
| Database | **MySQL + Spring Data JPA** |
| API Docs | **Swagger / OpenAPI 3.1** |
| Testing | **JUnit 5, Mockito** |
| Build Tool | **Maven** |

### ☁️ Cloud Services
| Service | Provider |
|--------|----------|
| File Storage | **AWS S3** |
| Deployment | **Render / Railway (Backend)** <br> **Vercel / Netlify (Frontend)** |

---

## 📋 API Endpoints

### 🔑 Authentication Endpoints
| Method | Endpoint | Description | Access |
|-------|----------|-------------|--------|
| POST | `/api/auth/signup` | User Registration | Public |
| POST | `/api/auth/login` | Login & Token Issuance | Public |
| POST | `/api/auth/validate` | Validate JWT Token | All Roles |

---

### 🛡 Admin Endpoints
| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/api/admin/users` | Get all users |
| PUT | `/api/admin/users/{id}/role` | Update user role |
| GET | `/api/admin/courses` | Get all courses |
| PUT | `/api/admin/courses/{id}/approve` | Approve/Reject a course |
| DELETE | `/api/admin/courses/{id}` | Delete a course |

---

### 🎓 Instructor Endpoints
| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | `/api/instructor/courses` | Create new course |
| PUT | `/api/instructor/courses/{id}` | Update existing course |
| GET | `/api/instructor/courses` | View instructor’s courses |
| POST | `/api/instructor/courses/{courseId}/lessons` | Add lesson to course |
| GET | `/api/instructor/courses/{courseId}/enrollments` | View enrolled students |

---

### 🧑‍🎓 Student Endpoints
| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | `/api/student/courses` | Browse available courses |
| POST | `/api/student/courses/{courseId}/enroll` | Enroll in course |
| GET | `/api/student/enrollments` | View enrolled courses |
| GET | `/api/student/courses/{courseId}/lessons` | Access course lessons |
| PUT | `/api/student/progress/{lessonId}` | Update lesson progress |

---

### 🎥 Media Endpoints
| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | `/api/media/upload` | Upload media to AWS |
| GET | `/api/media/{filename}` | Retrieve media file |
| DELETE | `/api/media/{filename}` | Delete media file |

---

