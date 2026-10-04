import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CitizenLayout from "./components/citizen/Layout";
import AdminLayout from "./components/admin/Layout";
import Dashboard from "./pages/citizen/Dashboard";
import ReportPage from "./pages/citizen/Report";
import MyReports from "./pages/citizen/MyReports";
import ClimateHub from "./pages/citizen/ClimateHub";
import Community from "./pages/citizen/Community";
import MapPage from "./pages/citizen/MapPage";
import Quiz from "./pages/citizen/Quiz";
import Notifications from "./pages/citizen/Notifications";
import Profile from "./pages/citizen/Profile";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminReports from "./pages/admin/Reports";
import AdminUsers from "./pages/admin/Users";
import AdminClimateHub from "./pages/admin/ClimateHub";
import AdminNews from "./pages/admin/News";
import AdminAdvisories from "./pages/admin/Advisories";
import AdminActivities from "./pages/admin/Activities";
import AdminCommunity from "./pages/admin/Community";
import AdminQuiz from "./pages/admin/Quiz";
import AdminMap from "./pages/admin/MapPage";
import AdminAnalytics from "./pages/admin/Analytics";
import AdminSettings from "./pages/admin/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CitizenLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="my-reports" element={<MyReports />} />
          <Route path="climate-hub" element={<ClimateHub />} />
          <Route path="community" element={<Community />} />
          <Route path="map" element={<MapPage />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="climate-hub" element={<AdminClimateHub />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="advisories" element={<AdminAdvisories />} />
          <Route path="activities" element={<AdminActivities />} />
          <Route path="community" element={<AdminCommunity />} />
          <Route path="quiz" element={<AdminQuiz />} />
          <Route path="map" element={<AdminMap />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
