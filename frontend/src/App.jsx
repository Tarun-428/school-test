import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import FeePayment from './pages/FeePayment'
import AboutPage from './pages/AboutPage'
import AcademicsPage from './pages/AcademicsPage'
import CoursesPage from './pages/CoursesPage'
import ScholarshipPage from './pages/ScholarshipPage'
import BlogPage from './pages/BlogPage'
import ContactPage from './pages/ContactPage'
import PublicGalleryPage from './pages/PublicGalleryPage'
import PublicFacultyPage from './pages/PublicFacultyPage'
import CertificatesPage from './pages/CertificatesPage'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import FacultyPage from './pages/FacultyPage'
import GalleryPage from './pages/GalleryPage'
import TransactionsPage from './pages/TransactionsPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fee-payment" element={<FeePayment />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/scholarship" element={<ScholarshipPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/faculty" element={<PublicFacultyPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<PublicGalleryPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
          <Route path="/admin/faculty" element={<ProtectedRoute><FacultyPage /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute><GalleryPage /></ProtectedRoute>} />
          <Route path="/admin/transactions" element={<ProtectedRoute><TransactionsPage /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
