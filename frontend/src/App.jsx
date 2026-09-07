import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';
import ProtectedRoute from './components/admin/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Events from './pages/Events';
import Membership from './pages/Membership';
import Sponsors from './pages/Sponsors';
import Scholarship from './pages/Scholarship';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Donate from './pages/Donate';

import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEvents from './pages/admin/AdminEvents';
import AdminTeam from './pages/admin/AdminTeam';
import AdminSponsors from './pages/admin/AdminSponsors';
import AdminMessages from './pages/admin/AdminMessages';
import AdminGallery from './pages/admin/AdminGallery';
import AdminNews from './pages/admin/AdminNews';
import AdminSlides from './pages/admin/AdminSlides';
import AdminApps from './pages/admin/AdminScholarship';
import AdminContent from './pages/admin/AdminContent';

function PublicLayout() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = new Lenis({
      autoRaf: true,
      duration: reduced ? 0 : 0.9,
      lerp: reduced ? 1 : 0.1,
      smoothWheel: !reduced,
      touchMultiplier: 1.4,
    });
    window.lenis = lenis;
    return () => {
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return (
    <>
      <Navbar />
      <main id="main" className="lenis-container">
        <PageTransition />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/news" element={<News />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/scholarship" element={<Scholarship />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/events" element={<ProtectedRoute><AdminEvents /></ProtectedRoute>} />
          <Route path="/admin/team" element={<ProtectedRoute><AdminTeam /></ProtectedRoute>} />
          <Route path="/admin/sponsors" element={<ProtectedRoute><AdminSponsors /></ProtectedRoute>} />
          <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
          <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
          <Route path="/admin/news" element={<ProtectedRoute><AdminNews /></ProtectedRoute>} />
          <Route path="/admin/slides" element={<ProtectedRoute><AdminSlides /></ProtectedRoute>} />
          <Route path="/admin/scholarship" element={<ProtectedRoute><AdminApps /></ProtectedRoute>} />
          <Route path="/admin/content" element={<ProtectedRoute><AdminContent /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
