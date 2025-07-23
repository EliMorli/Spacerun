import React from 'react';
import { Calendar, UserCheck, Gamepad2 } from 'lucide-react';

export default function HowItWorksSection({ t }) {
  const steps = [
    { icon: Calendar, title: t.how_it_works_step1_title, desc: t.how_it_works_step1_desc },
    { icon: UserCheck, title: t.how_it_works_step2_title, desc: t.how_it_works_step2_desc },
    { icon: Gamepad2, title: t.how_it_works_step3_title, desc: t.how_it_works_step3_desc },
  ];

  return (
    <section id="how-it-works" className="section-padding bg-black">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="font-heading text-4xl md:text-5xl font-black uppercase mb-12">{t.how_it_works_title}</h2>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Dotted line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-px -translate-y-12">
             <svg width="100%" height="2"><line x1="0" y1="1" x2="100%" y2="1" stroke="#333" strokeWidth="2" strokeDasharray="8 8"/></svg>
          </div>
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center">
              <div className="bg-blue-500 text-black rounded-full w-24 h-24 flex items-center justify-center mb-4 z-10 border-4 border-black">
                <step.icon size={40} />
              </div>
              <h3 className="font-heading text-2xl font-bold mb-2">{step.title}</h3>
              <p className="text-gray-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}