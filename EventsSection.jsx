
import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function EventsSection({ t }) {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="events" 
      className="relative section-padding bg-cover bg-center" 
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1527489118552-52504e761675?q=80&w=2070&auto=format&fit=crop')"
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
        <h2 className="font-heading text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          {t.events_title}
        </h2>
        <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto font-light leading-relaxed">
          {t.events_subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button onClick={scrollToBooking} className="btn-primary text-lg px-8 py-4">
            {t.events_cta}
          </button>
          <Link to={createPageUrl('Events')} className="btn-secondary text-lg px-8 py-4">
            {t.events_view_all}
          </Link>
        </div>
      </div>
    </section>
  );
}
