import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function LocationSection({ t }) {
  return (
    <section id="location" className="section-padding bg-[#050505]">
      <div className="max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <h2 className="font-heading text-4xl md:text-5xl font-black uppercase">{t.location_title}</h2>
          <div className="mt-8 space-y-4 text-lg">
            <p className="flex items-center justify-center lg:justify-start gap-3"><MapPin className="text-blue-500" /> 123 Virtual Ave, Reality City, 90210</p>
            <p className="flex items-center justify-center lg:justify-start gap-3"><Phone className="text-blue-500" /> (123) 456-7890</p>
            <p className="flex items-center justify-center lg:justify-start gap-3"><Clock className="text-blue-500" /> Mon - Sun: 10am - 11pm</p>
          </div>
        </div>
        <div className="h-80 lg:h-96 rounded-lg bg-gray-800 flex items-center justify-center">
          <p className="text-gray-500">Map Placeholder</p>
        </div>
      </div>
    </section>
  );
}