import React from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function Trailer() {
    const { t } = useLanguage();

    const scrollToBooking = () => {
        window.location.href = createPageUrl('Home') + '#booking';
    };

    if (!t) return <div className="min-h-screen bg-black" />;

    return (
        <div className="w-full bg-black min-h-screen">
            <section className="relative pt-32 pb-16">
                <div className="max-w-6xl mx-auto px-6">
                    <Link 
                        to={createPageUrl('Home')} 
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                    >
                        <ArrowLeft size={20} />
                        {t.trailer_back_to_home}
                    </Link>
                    
                    <div className="text-center mb-12">
                        <h1 className="font-heading text-4xl md:text-6xl font-black text-white mb-4">
                            {t.trailer_title}
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            {t.trailer_subtitle}
                        </p>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
                            <div 
                                className="w-full h-full bg-cover bg-center flex items-center justify-center"
                                style={{
                                    backgroundImage: "url('https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=2078&auto=format&fit=crop')"
                                }}
                            >
                                <div className="bg-black/70 p-8 rounded-lg text-center">
                                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                                    </div>
                                    <p className="text-white text-lg">{t.trailer_coming_soon}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
                        <div>
                            <h3 className="font-heading text-2xl font-bold text-white mb-2">{t.trailer_feature_1_title}</h3>
                            <p className="text-gray-400">{t.trailer_feature_1_desc}</p>
                        </div>
                        <div>
                            <h3 className="font-heading text-2xl font-bold text-white mb-2">{t.trailer_feature_2_title}</h3>
                            <p className="text-gray-400">{t.trailer_feature_2_desc}</p>
                        </div>
                        <div>
                            <h3 className="font-heading text-2xl font-bold text-white mb-2">{t.trailer_feature_3_title}</h3>
                            <p className="text-gray-400">{t.trailer_feature_3_desc}</p>
                        </div>
                    </div>

                    <div className="text-center mt-16">
                        <button onClick={scrollToBooking} className="btn-primary text-lg px-8 py-4">
                            {t.trailer_book_mission}
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}