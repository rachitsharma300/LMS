# FRONTEND

```
lms.frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── assets/                 # images, icons, and static files
│   │   ├── logo.png
│   │   └── illustrations/
│   │
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── CourseCard.jsx
│   │   └── Loader.jsx
│   │
│   ├── context/                # Global React contexts (Auth, Theme, etc.)
│   │   └── AuthContext.jsx
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useAuth.js
│   │
│   ├── layouts/                # Common page layouts per role
│   │   ├── AdminLayout.jsx
│   │   ├── InstructorLayout.jsx
│   │   └── StudentLayout.jsx
│   │
│   ├── pages/                  # Page-level components
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── admin/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── instructor/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── student/
│   │   │   ├── Dashboard.jsx
│   │   │   └── CourseViewer.jsx
│   │   │
│   │   ├── Home.jsx
│   │   └── NotFound.jsx
│   │
│   ├── routes/                 # All app routes in one place
│   │   └── AppRoutes.jsx
│   │
│   ├── services/               # API service layer
│   │   ├── apiClient.js
│   │   ├── authService.js
│   │   ├── userService.js
│   │   ├── courseService.js
│   │   └── lessonService.js
│   │
│   ├── styles/                 # CSS files
│   │   ├── tailwind.css
│   │   └── globals.css
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── vite.config.js
│
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md

```
