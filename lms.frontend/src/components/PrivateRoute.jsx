// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * PrivateRoute
 * - Wrap route groups that need authentication.
 * - allowedRoles (array) is optional; when provided, only users with at least one matching role can access.
 *
 * Usage (React Router v6):
 * <Route element={<PrivateRoute allowedRoles={['ADMIN']} />}>
 *   <Route path="/admin" element={<AdminDashboard />} />
 * </Route>
 */
export default function PrivateRoute({ allowedRoles = [] }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0) {
    const roles = Array.isArray(user.roles) ? user.roles : [user.roles];
    const allowed = roles.some((r) => allowedRoles.includes(r));
    if (!allowed) return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
