import React from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { Globe, Zap, Users, Film } from 'lucide-react';
import { createPageUrl } from '@/utils';

const PageHero = ({ title }) => (
    <section className="relative pt-48 pb-24 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1554189097-9d8b839b2ddd?q=80&w=2070&auto=format&fit=crop')"}}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-screen-md mx-auto text-center px-6">
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white">{title}</h1>
        </div>
    </section>
);

export default function About() {
    const { t } = useLanguage();

    if (!t) return <div className="min-h-screen bg-black" />;

    const differences = [
        { icon: Globe, title: t.about_why_1_title, text: t.about_why_1_text },
        { icon: Film, title: t.about_why_2_title, text: t.about_why_2_text },
        { icon: Users, title: t.about_why_3_title, text: t.about_why_3_text },
        { icon: Zap, title: t.about_why_4_title, text: t.about_why_4_text },
    ];
    
    const scrollToBooking = () => {
       window.location.href = createPageUrl('Home') + '#booking';
    };

    return (
        <div className="w-full bg-black">
            <PageHero title={t.about_hero_title} />
            
            <section className="section-padding bg-black">
                <div className="max-w-screen-md mx-auto text-center">
                    <h2 className="font-heading text-4xl font-bold mb-4">{t.about_mission_title}</h2>
                    <p className="text-gray-300 text-xl leading-relaxed">{t.about_mission_text}</p>
                </div>
            </section>
            
            <section className="section-padding bg-[#050505]">
                <div className="max-w-screen-lg mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="font-heading text-4xl font-bold mb-4">{t.about_story_title}</h2>
                        <p className="text-gray-400">{t.about_story_text}</p>
                    </div>
                    <div className="h-80 bg-cover bg-center rounded-lg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop')"}}></div>
                </div>
            </section>

            <section className="section-padding bg-black">
                <div className="max-w-screen-lg mx-auto">
                    <h2 className="font-heading text-4xl font-bold text-center mb-12">{t.about_why_title}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {differences.map(item => (
                            <div key={item.title} className="text-center">
                                <item.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                                <h3 className="font-heading text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-gray-400">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
             <section className="section-padding text-center bg-[#050505]">
                <button onClick={scrollToBooking} className="btn-primary text-lg px-12 py-4">{t.about_cta}</button>
            </section>
        </div>
    );
}