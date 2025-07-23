import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { PressArticle } from '@/api/entities';
import { Download, Mail } from 'lucide-react';
import { format } from 'date-fns';

const PageHero = ({ title, subtitle }) => (
    <section className="relative pt-48 pb-24 bg-gradient-to-b from-[#111] to-black">
        <div className="max-w-screen-md mx-auto text-center px-6">
            <h1 className="font-heading text-5xl md:text-6xl font-black text-white">{title}</h1>
            <p className="text-xl text-gray-400 mt-4">{subtitle}</p>
        </div>
    </section>
);

export default function Press() {
    const { t } = useLanguage();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        PressArticle.list('-date').then(setArticles);
    }, []);

    if (!t) return <div className="min-h-screen bg-black" />;

    return (
        <div className="w-full bg-black">
            <PageHero title={t.press_title} subtitle={t.press_subtitle} />

            <section className="section-padding bg-black">
                <div className="max-w-screen-lg mx-auto">
                    <h2 className="font-heading text-4xl font-bold text-center mb-12">{t.press_featured_title}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map(article => (
                            <a href={article.article_url} target="_blank" rel="noopener noreferrer" key={article.id} className="block bg-[#111] p-6 rounded-lg hover:bg-[#222] transition-colors">
                                <img src={article.publisher_logo_url} alt="Publisher" className="h-8 mb-4 invert brightness-0 opacity-70"/>
                                <h3 className="font-heading text-lg font-bold mb-2">{article.headline}</h3>
                                <p className="text-sm text-gray-500 mb-3">{format(new Date(article.date), 'MMMM d, yyyy')}</p>
                                <p className="text-gray-400 text-sm mb-4">"{article.excerpt}"</p>
                                <span className="text-blue-500 font-bold text-sm">{t.press_read_more} &rarr;</span>
                            </a>
                        ))}
                    </div>
                </div>
            </section>
            
            <section className="section-padding bg-[#050505]">
                <div className="max-w-screen-md mx-auto flex justify-center">
                     <div className="bg-[#111] p-8 rounded-lg text-center">
                        <h3 className="font-heading text-2xl font-bold mb-4">{t.press_contact_title}</h3>
                        <a href="mailto:press@spacerunvr.com" className="btn-secondary w-full flex items-center justify-center gap-2"><Mail size={16}/> {t.press_contact_email_cta}</a>
                    </div>
                </div>
            </section>
        </div>
    );
}