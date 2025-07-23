
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { EventPackage } from '@/api/entities';
import BookingSection from '../components/sections/BookingSection';
import { Cake, Briefcase, Heart, School, Users } from 'lucide-react';
import { Link } from 'react-router-dom'; // Added this import
import { createPageUrl } from '@/utils'; // Added this import

// Sample data for Event Packages
const samplePackages = [
    {
        id: 'sample-1',
        title: 'Birthday Bash Extravaganza',
        description: 'Celebrate your special day with an unforgettable gaming experience, complete with custom party options.',
        image_url: 'https://images.unsplash.com/photo-1579547620164-9d1872124508?q=80&w=2070&auto=format&fit=crop',
        min_players: 8,
        duration: '2 hours',
        price_info: 'Starting from $250'
    },
    {
        id: 'sample-2',
        title: 'Corporate Team Builder',
        description: 'Boost team morale and collaboration with engaging challenges designed for corporate groups.',
        image_url: 'https://images.unsplash.com/photo-1549923746-c5678491c3d1?q=80&w=2070&auto=format&fit=crop',
        min_players: 10,
        duration: '3 hours',
        price_info: 'Custom quote'
    },
    {
        id: 'sample-3',
        title: 'Friends & Family Fun Day',
        description: 'Perfect for social gatherings, bringing friends and family together for an exciting adventure.',
        image_url: 'https://images.unsplash.com/photo-1517457375827-80259c961e0f?q=80&w=2070&auto=format&fit=crop',
        min_players: 6,
        duration: '1.5 hours',
        price_info: 'Per group'
    },
    {
        id: 'sample-4',
        title: 'Educational Field Trip',
        description: 'An interactive learning experience for schools and educational groups, blending fun with knowledge.',
        image_url: 'https://images.unsplash.com/photo-1552589410-637bb34d7003?q=80&w=2070&auto=format&fit=crop',
        min_players: 15,
        duration: '2 hours',
        price_info: 'Per student'
    }
];

const EventPackageCard = ({ pkg, t }) => {
  const scrollToBooking = () => {
    window.location.href = createPageUrl('Home') + '#booking';
  };

  return (
    <div className="bg-[#111] rounded-lg overflow-hidden flex flex-col">
        <img src={pkg.image_url} alt={pkg.title} className="w-full h-48 object-cover"/>
        <div className="p-6 flex flex-col flex-grow">
            <h3 className="font-heading text-2xl font-bold mb-2">{pkg.title}</h3>
            <p className="text-gray-400 mb-4 flex-grow">{pkg.description}</p>
            <div className="text-sm space-y-2 text-gray-300 mb-4">
                <p><span className="font-bold">{t.events_min_players}:</span> {pkg.min_players}</p>
                <p><span className="font-bold">{t.events_duration}:</span> {pkg.duration}</p>
                 <p><span className="font-bold">{t.events_pricing}:</span> {pkg.price_info}</p>
            </div>
            <button onClick={scrollToBooking} className="btn-primary w-full text-center mt-auto">
              {t.events_plan_event}
            </button>
        </div>
    </div>
  );
};

export default function Events() {
    const { t, language } = useLanguage();
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        EventPackage.list()
            .then(res => {
                // If no packages are returned from the API, use sample data
                if (!res || res.length === 0) {
                    setPackages(samplePackages);
                } else {
                    setPackages(res);
                }
            })
            .catch(error => {
                console.error("Failed to fetch event packages, using sample data:", error);
                setPackages(samplePackages); // Fallback to sample data on error as well
            });
    }, []);

    const includedItems = [
        { icon: Users, text: t.events_included_1 },
        { icon: Cake, text: t.events_included_2 },
        { icon: Briefcase, text: t.events_included_3 },
    ];

    if (!t) return <div className="min-h-screen bg-black" />;

    return (
        <div className="w-full bg-black">
            <section className="relative pt-48 pb-24 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1527489118552-52504e761675?q=80&w=2070&auto=format&fit=crop')"}}>
                 <div className="absolute inset-0 bg-black/60"></div>
                 <div className="relative max-w-screen-md mx-auto text-center px-6">
                    <h1 className="font-heading text-5xl md:text-7xl font-black text-white">{t.events_page_title}</h1>
                    <p className="text-xl text-gray-200 mt-4">{t.events_page_subtitle}</p>
                </div>
            </section>
            
            <section className="section-padding bg-black">
                <div className="max-w-screen-xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {packages.map(pkg => (
                            <EventPackageCard key={pkg.id} pkg={pkg} t={t} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding bg-[#050505]">
                <div className="max-w-screen-lg mx-auto text-center">
                    <h2 className="font-heading text-4xl font-bold mb-8">{t.events_included_title}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {includedItems.map(item => (
                            <div key={item.text} className="text-center">
                                <item.icon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                                <h3 className="text-lg text-gray-300">{item.text}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <div id="booking">
                <BookingSection t={t} language={language} />
            </div>
        </div>
    );
}
