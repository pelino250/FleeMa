import { Routes, Route, Navigate } from "react-router-dom";
import { RequireAuth, GuestOnly } from "./components/RouteGuards";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";

function DashboardPlaceholder() {
  return <h1>FleeMa — Dashboard</h1>;
}

function App() {
  return (
    <Routes>
      {/* Guest-only routes */}
      <Route element={<GuestOnly />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Auth-required routes */}
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<DashboardPlaceholder />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
