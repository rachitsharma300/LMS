// src/hooks/useAuth.js
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Simple custom hook to use AuthContext easily
export default function useAuth() {
  return useContext(AuthContext);
}
