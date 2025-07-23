import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { JobOpening } from '@/api/entities';
import { CheckCircle, Briefcase, MapPin } from 'lucide-react';

const PageHero = ({ title, subtitle }) => (
    <section className="relative pt-48 pb-24 bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop')"}}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative max-w-screen-md mx-auto text-center px-6">
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white">{title}</h1>
            <p className="text-xl text-gray-200 mt-4">{subtitle}</p>
        </div>
    </section>
);

export default function Careers() {
    const { t } = useLanguage();
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        JobOpening.list().then(setJobs);
    }, []);

    if (!t) return <div className="min-h-screen bg-black" />;

    const perks = [t.careers_why_1, t.careers_why_2, t.careers_why_3];

    return (
        <div className="w-full bg-black">
            <PageHero title={t.careers_hero_title} subtitle={t.careers_hero_subtitle} />

            <section className="section-padding bg-[#050505]">
                <div className="max-w-screen-lg mx-auto text-center">
                    <h2 className="font-heading text-4xl font-bold mb-8">{t.careers_why_title}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {perks.map(perk => (
                            <div key={perk} className="flex items-center gap-4 p-4">
                                <CheckCircle className="w-8 h-8 text-blue-500 flex-shrink-0" />
                                <span className="text-lg text-gray-300">{perk}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-padding bg-black">
                <div className="max-w-screen-lg mx-auto">
                    <h2 className="font-heading text-4xl font-bold text-center mb-12">{t.careers_roles_title}</h2>
                    <div className="space-y-6">
                        {jobs.map(job => (
                            <div key={job.id} className="bg-[#111] p-6 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div>
                                    <h3 className="font-heading text-xl font-bold">{job.title}</h3>
                                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-gray-400 mt-2 text-sm">
                                        <span className="flex items-center gap-2"><Briefcase size={14} /> {job.department}</span>
                                        <span className="flex items-center gap-2"><MapPin size={14} /> {job.location}</span>
                                    </div>
                                </div>
                                <button className="btn-secondary px-6 py-2 whitespace-nowrap">{t.careers_apply_cta}</button>
                            </div>
                        ))}
                    </div>
                    <p className="text-center mt-12 text-gray-400">
                        {t.careers_no_roles_cta}
                    </p>
                </div>
            </section>
        </div>
    );
}