import React from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function FAQ() {
    const { t } = useLanguage();

    if (!t) return <div className="min-h-screen bg-black" />;

    const faqCategories = [
        {
            categoryKey: "faq_category_general",
            items: [
                { questionKey: "faq_general_q1", answerKey: "faq_general_a1" },
                { questionKey: "faq_general_q2", answerKey: "faq_general_a2" },
                { questionKey: "faq_general_q3", answerKey: "faq_general_a3" }
            ]
        },
        {
            categoryKey: "faq_category_booking_and_payments",
            items: [
                { questionKey: "faq_booking_q1", answerKey: "faq_booking_a1" },
                { questionKey: "faq_booking_q2", answerKey: "faq_booking_a2" },
                { questionKey: "faq_booking_q3", answerKey: "faq_booking_a3" }
            ]
        },
        {
            categoryKey: "faq_category_gameplay_and_experiences",
            items: [
                { questionKey: "faq_gameplay_q1", answerKey: "faq_gameplay_a1" },
                { questionKey: "faq_gameplay_q2", answerKey: "faq_gameplay_a2" },
                { questionKey: "faq_gameplay_q3", answerKey: "faq_gameplay_a3" }
            ]
        },
        {
            categoryKey: "faq_category_parties_and_events",
            items: [
                { questionKey: "faq_events_q1", answerKey: "faq_events_a1" },
                { questionKey: "faq_events_q2", answerKey: "faq_events_a2" }
            ]
        },
        {
            categoryKey: "faq_category_technical_and_safety",
            items: [
                { questionKey: "faq_technical_q1", answerKey: "faq_technical_a1" },
                { questionKey: "faq_technical_q2", answerKey: "faq_technical_a2" }
            ]
        }
    ];

    return (
        <div className="w-full bg-black">
            <section className="relative pt-48 pb-24 bg-gradient-to-b from-[#111] to-black text-center">
                 <h1 className="font-heading text-5xl md:text-7xl font-black text-white">{t.faq_page_title}</h1>
                 <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">{t.faq_page_subtitle}</p>
            </section>
            
            <section className="section-padding bg-black">
              <div className="max-w-screen-md mx-auto">
                {faqCategories.map((category, categoryIndex) => (
                    <div key={categoryIndex} className="mb-12">
                        <h2 className="font-heading text-3xl font-bold mb-6 text-white">{t[category.categoryKey]}</h2>
                         <Accordion type="single" collapsible className="w-full">
                          {category.items.map((faq, index) => (
                            <AccordionItem key={`${categoryIndex}-${index}`} value={`item-${categoryIndex}-${index}`} className="border-b border-gray-800">
                              <AccordionTrigger className="font-heading text-lg text-left hover:no-underline text-white">{t[faq.questionKey]}</AccordionTrigger>
                              <AccordionContent className="text-gray-200">{t[faq.answerKey]}</AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                    </div>
                ))}
              </div>
            </section>

             <section className="section-padding text-center bg-[#050505]">
                <h2 className="font-heading text-3xl font-bold mb-4">{t.faq_still_have_questions}</h2>
                <Link to={createPageUrl('Contact')} className="btn-primary px-8 py-3">{t.faq_contact_us}</Link>
            </section>
        </div>
    );
}