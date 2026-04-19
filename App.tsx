
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Estimator from './pages/Estimator';
import Materials from './pages/Materials';
import ProductDetail from './pages/ProductDetail';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import ProSpace from './pages/ProSpace';
import NotFound from './pages/NotFound';
import DocumentHead from './components/DocumentHead';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <DocumentHead />
      <div className="relative flex min-h-screen flex-col">
        <a
          href="#main-content"
          className="fixed left-4 top-0 z-[200] -translate-y-full bg-primary px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white shadow-lg transition-transform focus:translate-y-4 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-white"
        >
          Aller au contenu principal
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-grow outline-none">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/estimateur" element={<Estimator />} />
            <Route path="/materiaux" element={<Materials />} />
            <Route path="/materiaux/:id" element={<ProductDetail />} />
            <Route path="/galerie" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/espace-pro" element={<ProSpace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
