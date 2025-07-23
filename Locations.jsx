import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { Location } from '@/api/entities';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { MapPin, Phone, Clock, Star, Globe } from 'lucide-react';

const LocationCard = ({ loc, t }) => {
    const scrollToBooking = () => {
        window.location.href = createPageUrl('Home') + '#booking';
    };

    return (
        <div className="bg-[#111] rounded-lg overflow-hidden flex flex-col">
            <img src={loc.image_url} alt={loc.city} className="w-full h-48 object-cover"/>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-heading text-2xl font-bold mb-4">{loc.city}</h3>
                <div className="space-y-3 text-gray-400 mb-6 flex-grow">
                    <p className="flex items-start gap-3"><MapPin size={16} className="text-blue-500 mt-1 flex-shrink-0" /> {loc.address}</p>
                    <p className="flex items-center gap-3"><Phone size={16} className="text-blue-500" /> {loc.phone}</p>
                    <p className="flex items-center gap-3"><Clock size={16} className="text-blue-500" /> {loc.hours}</p>
                    <p className="flex items-center gap-3"><Star size={16} className="text-yellow-500" /> {loc.google_rating}</p>
                </div>
                <button onClick={scrollToBooking} className="btn-primary w-full mt-auto text-center block">
                    {t.locations_cta}
                </button>
            </div>
        </div>
    );
};

export default function Locations() {
    const { t } = useLanguage();
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        Location.list().then(setLocations);
    }, []);

    if (!t) return <div className="min-h-screen bg-black" />;

    return (
        <div className="w-full bg-black">
            <section className="relative pt-48 pb-24 bg-gradient-to-b from-[#111] to-black text-center">
                <h1 className="font-heading text-5xl md:text-7xl font-black text-white">{t.locations_title}</h1>
                <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">{t.locations_page_subtitle}</p>
            </section>
            
            <section className="section-padding bg-black">
                <div className="max-w-screen-xl mx-auto">
                    <h2 className="font-heading text-3xl font-bold text-center mb-12 text-white">{t.locations_our_locations}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {locations.map(loc => (
                            <LocationCard key={loc.id} loc={loc} t={t}/>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="section-padding text-center bg-[#050505]">
                <div className="max-w-screen-md mx-auto">
                    <Globe className="w-16 h-16 text-blue-500 mx-auto mb-6" />
                    <h3 className="font-heading text-3xl font-bold mb-4 text-white">{t.locations_expanding_title}</h3>
                    <p className="text-gray-400 mb-8">{t.locations_expanding_subtitle}</p>
                    <Link to={createPageUrl("OwnAVenue")} className="btn-primary text-lg px-8 py-4">
                        {t.locations_expand_cta}
                    </Link>
                </div>
            </section>
        </div>
    );
}