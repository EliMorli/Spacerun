

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Menu, X, Globe, Phone, MapPin } from "lucide-react";
import { LanguageProvider, useLanguage } from "./components/LanguageProvider.js";

const AppLayout = ({ children, currentPageName }) => {
  const { language, t, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPageName]);
  
  const scrollToSection = (sectionId) => {
    if (currentPageName !== 'Home') {
      window.location.href = createPageUrl('Home') + `#${sectionId}`;
    } else {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToBooking = () => {
    if (currentPageName !== 'Booking') {
      window.location.href = createPageUrl('Booking');
    }
    setIsMobileMenuOpen(false); // Always close mobile menu after action
  };
  
  const mainNavItems = [
    { key: 'nav_games', page: 'Games' },
    { key: 'nav_events', page: 'Events' },
    { key: 'nav_tournaments', page: 'Tournaments' },
    { key: 'nav_locations', page: 'Locations' },
    { key: 'nav_contact', page: 'Contact' },
    { key: 'nav_faq', page: 'FAQ' },
  ];

  const companyNavItems = [
      { key: 'nav_about', page: 'About' },
      { key: 'nav_careers', page: 'Careers' },
      { key: 'nav_press', page: 'Press' },
      { key: 'nav_own_a_venue', page: 'OwnAVenue' }
  ];

  const allNavItems = [...mainNavItems, ...companyNavItems];

  return (
    <div className="bg-black text-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=Roboto:wght@300;400;500;600&family=Heebo:wght@300;400;500;600;700;800&display=swap');
        @import url('https://unpkg.com/leaflet@1.9.4/dist/leaflet.css');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          scroll-behavior: smooth;
        }
        
        .leaflet-popup-content-wrapper, .leaflet-popup-tip {
            background: #fff;
            color: #333;
        }
        
        body {
          background-color: #000;
          font-family: ${language === 'he' ? "'Heebo', sans-serif" : "'Roboto', sans-serif"};
          line-height: 1.6;
          color: #ffffff;
          overflow-x: hidden;
        }
        
        .font-heading {
          font-family: ${language === 'he' ? "'Heebo'" : "'Montserrat'"}, sans-serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        .font-body {
          font-family: ${language === 'he' ? "'Heebo'" : "'Roboto'"}, sans-serif;
          font-weight: 400;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          color: #000;
          font-weight: 600;
          padding: 14px 32px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 14px;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
        }
        
        .btn-secondary {
          background: transparent;
          color: #fff;
          border: 2px solid #fff;
          padding: 12px 28px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 14px;
          font-weight: 500;
        }
        
        .btn-secondary:hover {
          background: #fff;
          color: #000;
        }
        
        .section-padding {
          padding: 100px 24px;
        }
        
        @media (max-width: 768px) {
          .section-padding {
            padding: 60px 16px;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .gradient-overlay {
          background: linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%);
        }
      `}</style>

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen || currentPageName !== 'Home' ? 'bg-black/95 backdrop-blur-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to={createPageUrl("Home")} className="hover:opacity-80 transition-opacity">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/d68a90614_space_run_vr_front_onlypdf1.png" 
                alt="Spacerun VR Logo" 
                className="w-12 h-auto" 
              />
            </Link>
            
            <nav className="hidden lg:flex items-center gap-8">
              {mainNavItems.map(item => (
                <Link
                  key={item.key}
                  to={createPageUrl(item.page)}
                  className={`font-heading text-sm uppercase tracking-wider transition-colors duration-300 ${currentPageName === item.page ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  {t[item.key]}
                </Link>
              ))}
            </nav>
            
            <div className="hidden lg:flex items-center gap-4">
              <button onClick={toggleLanguage} className="p-2 text-gray-300 hover:text-white transition-colors">
                <Globe size={20} />
              </button>
              <button onClick={scrollToBooking} className="btn-primary">
                {t.nav_book_now}
              </button>
            </div>
            
            <button 
              className="lg:hidden p-2" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>
      
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black z-40 flex flex-col p-6 pt-24">
          <nav className="flex flex-col items-center justify-center flex-grow gap-6 text-center">
            {allNavItems.map(item => (
              <Link key={item.key} to={createPageUrl(item.page)} onClick={() => setIsMobileMenuOpen(false)} className="font-heading text-xl font-bold uppercase tracking-wider text-gray-300 hover:text-white">{t[item.key]}</Link>
            ))}
            <button onClick={() => { toggleLanguage(); setIsMobileMenuOpen(false); }} className="mt-4 text-gray-400 flex items-center gap-2"><Globe size={20} />{language === 'en' ? 'עברית' : 'English'}</button>
             <button onClick={scrollToBooking} className="btn-primary w-full mt-6">{t.nav_book_now}</button>
          </nav>
        </div>
      )}

      <main>{children}</main>

      <footer className="bg-zinc-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/d68a90614_space_run_vr_front_onlypdf1.png" alt="Logo" className="w-16 mb-4" />
              <p className="text-sm leading-relaxed">{t.footer_desc}</p>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-white mb-4 uppercase tracking-wider text-sm">{t.footer_nav_title}</h4>
              <div className="space-y-3">
                {mainNavItems.map(item => (
                  <Link key={item.key} to={createPageUrl(item.page)} className="block text-sm hover:text-white transition-colors">{t[item.key]}</Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-heading font-bold text-white mb-4 uppercase tracking-wider text-sm">{t.footer_company_title}</h4>
              <div className="space-y-3">
                {companyNavItems.map(item => (
                  <Link key={item.key} to={createPageUrl(item.page)} className="block text-sm hover:text-white transition-colors">{t[item.key]}</Link>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-white mb-4 uppercase tracking-wider text-sm">{t.footer_contact_title}</h4>
              <div className="space-y-3">
                <p className="flex items-center gap-2 text-sm"><MapPin size={16} className="text-orange-500" />123 Virtual Ave, Reality City</p>
                <p className="flex items-center gap-2 text-sm"><Phone size={16} className="text-orange-500" />(123) 456-7890</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-white mb-4 uppercase tracking-wider text-sm">{t.footer_social_title}</h4>
              <div className="flex gap-4">
                {['Facebook', 'Instagram', 'Twitter'].map(platform => (
                  <button key={platform} className="text-gray-400 hover:text-white transition-colors text-sm">{platform}</button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-12 text-center text-xs">
            <p>{t.footer_rights}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function LayoutWrapper({ children, currentPageName }) {
  return (
    <LanguageProvider>
      <AppLayout currentPageName={currentPageName}>{children}</AppLayout>
    </LanguageProvider>
  );
}

