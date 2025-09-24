import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";


// Import Client layout and pages
import EnrollPage from "../features/enroll/pages/EnrollPage";
import { LoginPage as ClientLoginPage } from "../features/auth/pages/Client/LoginPage";
import { LoginPage as ClinicianLoginPage } from "../features/auth/pages/Clinician/LoginPage";
import { SetPassword as ClientSetPassword } from "../features/auth/pages/Client/SetPassword";
import { SetPassword as ClinicianSetPassword } from "../features/auth/pages/Clinician/SetPassword";
import { ForgotPassword as ClinicianForgotPassword } from "../features/auth/pages/Clinician/ForgotPassword";
import TestPage from "../pages/TestPage";

// Import admin layout and pages
import AdminLayout from "../layout/AdminLayout";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import SchedulingPage from "../features/scheduling/pages/SchedulingPage";
import ClientPage from "../features/clients/pages/ClientPage";
import GroupsPage from "../features/groups/pages/GroupsPage";
import TreatmentsPage from "../features/treatments/pages/TreatmentsPage";
import BillingPage from "../features/billing/pages/BillingPage";
import ReferralPage from "../features/referral/pages/ReferralPage";
import ReportsPage from "../features/reports/pages/ReportsPage";
import FormPage from "../features/forms/pages/FormPage";
import AdminPage from "../features/admin/pages/AdminPage";
import RolesPermissionsList from "../features/admin/pages/Roles&PermissionsList";
import IntakeAppointmentPage from "../features/appointment/pages/IntakeAppointmentPage";
import IntakeAppointmentSuccessPage from "../features/appointment/pages/IntakeAppointmentSuccessPage";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Default route - redirect to dashboard */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

      {/* Test Page - Main page for testing components */}
      <Route path="/test" element={<TestPage />} />

      {/* Enroll  Page */}
      <Route path="/enroll" element={<EnrollPage />} />

      {/* Login Pages */}
      <Route path="/login" element={<ClientLoginPage />} />
      <Route path="/clinician/login" element={<ClinicianLoginPage />} />

      {/* Forgot Password Pages */}
      <Route
        path="/clinician/forgot-password"
        element={<ClinicianForgotPassword />}
      />

      {/* Set Password Pages */}
      <Route path="/set-password" element={<ClientSetPassword />} />
      <Route
        path="/clinician/set-password"
        element={<ClinicianSetPassword />}
      />

      <Route
        path="/book-intake-appointment"
        element={<IntakeAppointmentPage />}
      />

      <Route
        path="/intake-appointment-success"
        element={<IntakeAppointmentSuccessPage />}
      />
      {/* Admin Routes with Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Default admin route - redirect to dashboard */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />

        {/* Dashboard */}
        <Route path="dashboard" element={<DashboardPage />} />

        {/* Scheduling */}
        <Route path="scheduling" element={<SchedulingPage />} />

        {/* Clients */}
        <Route path="clients" element={<ClientPage />} />

        {/* Groups */}
        <Route path="groups" element={<GroupsPage />} />

        {/* Treatments */}
        <Route path="treatments" element={<TreatmentsPage />} />

        {/* Billing */}
        <Route path="billing" element={<BillingPage />} />

        {/* Referral */}
        <Route path="referral" element={<ReferralPage />} />

        {/* Reports */}
        <Route path="reports" element={<ReportsPage />} />

        {/* Forms */}
        <Route path="forms" element={<FormPage />} />

        {/* Admin Settings */}
        <Route path="settings" element={<AdminPage />} />

        {/* Roles & Permissions */}
        <Route path="roles-permissions" element={<RolesPermissionsList />} />

        {/* Profile */}
        <Route path="profile" element={<div>Profile Page - Coming Soon</div>} />
      </Route>

      {/* Catch all route - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;
