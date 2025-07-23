
import React, { useState } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { ContactInquiry } from '@/api/entities';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare,
  Users,
  Building,
  Newspaper,
  Instagram,
  Facebook
} from 'lucide-react';

const ContactHero = ({ t }) => (
    <section className="relative pt-48 pb-24 bg-cover bg-center" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')"
    }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative max-w-4xl mx-auto text-center px-6">
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white mb-6">
                {t.contact_hero_title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
                {t.contact_hero_subtitle}
            </p>
        </div>
    </section>
);

const GeneralInquiries = ({ t }) => (
    <section className="section-padding bg-black">
        <div className="max-w-screen-lg mx-auto">
            <h2 className="font-heading text-4xl font-bold text-center mb-12">{t.contact_general_inquiries_title}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                    <Mail className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-heading text-lg font-bold mb-2">{t.contact_email_title}</h3>
                    <a href="mailto:support@spacerunvr.com" className="text-gray-300 hover:text-white transition-colors">
                        support@spacerunvr.com
                    </a>
                </div>
                <div className="text-center">
                    <Phone className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-heading text-lg font-bold mb-2">{t.contact_phone_title}</h3>
                    <a href="tel:+11234567890" className="text-gray-300 hover:text-white transition-colors">
                        (123) 456-7890
                    </a>
                </div>
                <div className="text-center">
                    <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-heading text-lg font-bold mb-2">{t.contact_office_title}</h3>
                    <p className="text-gray-300">
                        123 Virtual Ave<br />
                        Reality City, 90210
                    </p>
                </div>
                <div className="text-center">
                    <MessageSquare className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="font-heading text-lg font-bold mb-2">{t.contact_social_title}</h3>
                    <div className="flex justify-center gap-3">
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="text-gray-300 hover:text-white transition-colors">
                            <Facebook size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const ContactForm = ({ t }) => {
    const [formData, setFormData] = useState({
        name: '', 
        email: '', 
        phone: '', 
        subject: '', 
        message: '',
        preferred_contact: []
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value) => {
        setFormData(prev => ({ ...prev, subject: value }));
    };

    const handleCheckboxChange = (method, checked) => {
        setFormData(prev => ({
            ...prev,
            preferred_contact: checked 
                ? [...prev.preferred_contact, method]
                : prev.preferred_contact.filter(m => m !== method)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await ContactInquiry.create({
            ...formData,
            preferred_contact: formData.preferred_contact.join(', ')
        });
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="text-center p-8 bg-[#111] rounded-lg">
                <h3 className="font-heading text-3xl font-bold text-white mb-4">{t.contact_form_thanks_title}</h3>
                <p className="text-gray-300">{t.contact_form_thanks_subtitle}</p>
            </div>
        );
    }
    
    const subjectOptions = [
        { value: 'booking-help', label: t.contact_form_subject_booking },
        { value: 'group-events', label: t.contact_form_subject_group },
        { value: 'franchise-interest', label: t.contact_form_subject_franchise },
        { value: 'technical-support', label: t.contact_form_subject_support },
        { value: 'media-press', label: t.contact_form_subject_media },
        { value: 'other', label: t.contact_form_subject_other },
    ];

    return (
        <form onSubmit={handleSubmit} className="bg-[#111] p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
            <h2 className="font-heading text-3xl font-bold md:col-span-2">{t.contact_form_title}</h2>
            <Input name="name" placeholder={t.contact_form_name} value={formData.name} onChange={handleChange} required className="bg-gray-900 border-gray-700 h-12 placeholder:text-gray-500" />
            <Input name="email" type="email" placeholder={t.contact_form_email} value={formData.email} onChange={handleChange} required className="bg-gray-900 border-gray-700 h-12 placeholder:text-gray-500" />
            <Input name="phone" placeholder={t.contact_form_phone} value={formData.phone} onChange={handleChange} className="bg-gray-900 border-gray-700 h-12 placeholder:text-gray-500" />
            
            <Select onValueChange={handleSelectChange} value={formData.subject} required>
                <SelectTrigger className="bg-gray-900 border-gray-700 h-12 text-white"><SelectValue placeholder={t.contact_form_subject} /></SelectTrigger>
                <SelectContent>{subjectOptions.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent>
            </Select>
            
            <Textarea name="message" placeholder={t.contact_form_message} value={formData.message} onChange={handleChange} required className="md:col-span-2 bg-gray-900 border-gray-700 placeholder:text-gray-500" rows={5} />
            
            <div className="md:col-span-2">
                <label className="text-sm font-medium mb-3 block">{t.contact_form_preferred}</label>
                <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox id="email_pref" onCheckedChange={(checked) => handleCheckboxChange('Email', checked)} />
                        <label htmlFor="email_pref" className="text-sm text-gray-200">{t.contact_form_preferred_email}</label>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Checkbox id="phone_pref" onCheckedChange={(checked) => handleCheckboxChange('Phone', checked)} />
                        <label htmlFor="phone_pref" className="text-sm text-gray-200">{t.contact_form_preferred_phone}</label>
                    </div>
                </div>
            </div>
            
            <Button type="submit" className="btn-primary w-full md:col-span-2 text-lg py-4">{t.contact_form_submit_btn}</Button>
        </form>
    );
};

const OtherContacts = ({ t }) => (
    <section className="section-padding bg-black">
        <div className="max-w-screen-lg mx-auto grid md:grid-cols-3 gap-8">
            <div className="bg-[#111] p-6 rounded-lg text-center">
                <Building className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2">{t.contact_specific_location_title}</h3>
                <p className="text-gray-300 text-sm mb-4">{t.contact_specific_location_text}</p>
                <Link to={createPageUrl("Locations")} className="font-bold text-blue-500 text-sm">Visit Locations Page &rarr;</Link>
            </div>
            <div className="bg-[#111] p-6 rounded-lg text-center">
                <Newspaper className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2">{t.contact_media_inquiry_title}</h3>
                <p className="text-gray-300 text-sm mb-4">{t.contact_media_inquiry_text}</p>
                 <Link to={createPageUrl("Press")} className="font-bold text-blue-500 text-sm">Visit Press Page &rarr;</Link>
            </div>
            <div className="bg-[#111] p-6 rounded-lg text-center">
                <Users className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                <h3 className="font-heading text-xl font-bold mb-2">{t.contact_own_venue_title}</h3>
                <p className="text-gray-300 text-sm mb-4">{t.contact_own_venue_text}</p>
                <Link to={createPageUrl("OwnAVenue")} className="font-bold text-blue-500 text-sm">Learn More &rarr;</Link>
            </div>
        </div>
    </section>
);


export default function Contact() {
    const { t } = useLanguage();

    if (!t) return <div className="min-h-screen bg-black" />;

    return (
        <div className="w-full">
            <ContactHero t={t} />
            <GeneralInquiries t={t} />
            <section className="section-padding bg-black/80" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' width='100' height='100'%3E%3Cpath d='M0 1 L100 1 M0 2 L100 2' stroke='%23111' stroke-width='0.1'/%3E%3Cpath d='M1 0 L1 100 M2 0 L2 100' stroke='%23111' stroke-width='0.1'/%3E%3C/svg%3E")`
            }}>
                <div className="max-w-screen-md mx-auto">
                    <ContactForm t={t} />
                </div>
            </section>
            <OtherContacts t={t} />
        </div>
    );
}
