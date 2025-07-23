import React, { useState, useEffect } from 'react';
import { FaqItem } from '@/api/entities';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FaqSection({ t }) {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    FaqItem.list('order', 10).then(setFaqs);
  }, []);

  return (
    <section id="faq" className="section-padding bg-black">
      <div className="max-w-screen-md mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-black uppercase text-center mb-12">{t.faq_title}</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map(faq => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border-b border-gray-800">
              <AccordionTrigger className="font-heading text-lg text-left hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}