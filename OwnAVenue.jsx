import React from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { Rocket, Wrench, Globe, TrendingUp } from 'lucide-react';
import { FranchiseInquiry } from '@/api/entities';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const FranchiseHero = ({ t }) => {
    const scrollToForm = () => document.getElementById('franchise-form')?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section className="relative h-[70vh] flex items-center justify-center text-center px-6" style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative z-10 max-w-4xl animate-fade-in">
                <h1 className="font-heading text-5xl md:text-7xl font-black text-white mb-4">{t.franchise_hero_title}</h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8">{t.franchise_hero_subtitle}</p>
                <button onClick={scrollToForm} className="btn-primary text-lg px-8 py-4">{t.franchise_hero_cta}</button>
            </div>
        </section>
    );
};

const WhyFranchise = ({ t }) => {
    const valueProps = [
        { icon: Rocket, text: t.franchise_why_1_title },
        { icon: Wrench, text: t.franchise_why_2_title },
        { icon: Globe, text: t.franchise_why_3_title },
        { icon: TrendingUp, text: t.franchise_why_4_title }
    ];

    return (
        <section className="section-padding bg-[#050505]">
            <div className="max-w-screen-lg mx-auto text-center">
                <h2 className="font-heading text-4xl md:text-5xl font-black uppercase mb-12">{t.franchise_why_title}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {valueProps.map((prop, index) => (
                        <div key={index} className="flex flex-col items-center p-6 bg-[#111] rounded-lg">
                            <prop.icon className="w-16 h-16 text-blue-500 mb-4" />
                            <h3 className="font-heading text-xl font-bold">{prop.text}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FranchiseForm = ({ t }) => {
    const [formData, setFormData] = React.useState({
        full_name: '', email: '', phone_number: '', location_of_interest: '',
        previous_experience: '', investment_capital: '', reason_for_opening: '',
        commercial_space_details: '', linkedin_profile: '', launch_timeline: ''
    });
    const [consent, setConsent] = React.useState(false);
    const [isSubmitted, setIsSubmitted] = React.useState(false);
    const [errors, setErrors] = React.useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.full_name) newErrors.full_name = "Full name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.phone_number) newErrors.phone_number = "Phone number is required";
        if (!formData.location_of_interest) newErrors.location_of_interest = "Location is required";
        if (!formData.previous_experience) newErrors.previous_experience = "Experience is required";
        if (!formData.investment_capital) newErrors.investment_capital = "Capital is required";
        if (!formData.reason_for_opening) newErrors.reason_for_opening = "Reason is required";
        if (!formData.launch_timeline) newErrors.launch_timeline = "Timeline is required";
        if (!consent) newErrors.consent = "You must consent to continue";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        
        await FranchiseInquiry.create({ ...formData, consent });
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <section id="franchise-form" className="section-padding bg-black">
                <div className="max-w-screen-md mx-auto text-center">
                    <h2 className="font-heading text-4xl md:text-5xl font-black uppercase">{t.franchise_form_thanks_title}</h2>
                    <p className="text-gray-300 mt-4 text-lg">{t.franchise_form_thanks_subtitle}</p>
                </div>
            </section>
        );
    }
    
    const experienceOptions = [t.franchise_form_experience_1, t.franchise_form_experience_2, t.franchise_form_experience_3, t.franchise_form_experience_4];
    const capitalOptions = [t.franchise_form_capital_1, t.franchise_form_capital_2, t.franchise_form_capital_3, t.franchise_form_capital_4];
    const timelineOptions = [t.franchise_form_timeline_1, t.franchise_form_timeline_2, t.franchise_form_timeline_3, t.franchise_form_timeline_4];
    
    return (
        <section id="franchise-form" className="section-padding bg-black">
            <div className="max-w-screen-lg mx-auto">
                <div className="text-center mb-12">
                    <h2 className="font-heading text-4xl md:text-5xl font-black uppercase">{t.franchise_form_title}</h2>
                    <p className="text-gray-400 mt-2 max-w-xl mx-auto">{t.franchise_form_subtitle}</p>
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <Input name="full_name" placeholder={t.franchise_form_full_name} value={formData.full_name} onChange={handleChange} required className="bg-gray-900 border-gray-700 h-12" />
                    <Input name="email" type="email" placeholder={t.franchise_form_email} value={formData.email} onChange={handleChange} required className="bg-gray-900 border-gray-700 h-12" />
                    <Input name="phone_number" placeholder={t.franchise_form_phone} value={formData.phone_number} onChange={handleChange} required className="bg-gray-900 border-gray-700 h-12" />
                    <Input name="location_of_interest" placeholder={t.franchise_form_location} value={formData.location_of_interest} onChange={handleChange} required className="bg-gray-900 border-gray-700 h-12" />

                    <Select onValueChange={(v) => handleSelectChange('previous_experience', v)} value={formData.previous_experience}>
                        <SelectTrigger className="bg-gray-900 border-gray-700 h-12"><SelectValue placeholder={t.franchise_form_experience} /></SelectTrigger>
                        <SelectContent>{experienceOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>
                    
                    <Select onValueChange={(v) => handleSelectChange('investment_capital', v)} value={formData.investment_capital}>
                        <SelectTrigger className="bg-gray-900 border-gray-700 h-12"><SelectValue placeholder={t.franchise_form_capital} /></SelectTrigger>
                        <SelectContent>{capitalOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>

                    <Textarea name="reason_for_opening" placeholder={t.franchise_form_reason} value={formData.reason_for_opening} onChange={handleChange} required className="md:col-span-2 bg-gray-900 border-gray-700" rows={4} />
                    <Textarea name="commercial_space_details" placeholder={t.franchise_form_space} value={formData.commercial_space_details} onChange={handleChange} className="md:col-span-2 bg-gray-900 border-gray-700" rows={2} />
                    
                    <Input name="linkedin_profile" placeholder={t.franchise_form_linkedin} value={formData.linkedin_profile} onChange={handleChange} className="bg-gray-900 border-gray-700 h-12" />
                    
                    <Select onValueChange={(v) => handleSelectChange('launch_timeline', v)} value={formData.launch_timeline}>
                        <SelectTrigger className="bg-gray-900 border-gray-700 h-12"><SelectValue placeholder={t.franchise_form_timeline} /></SelectTrigger>
                        <SelectContent>{timelineOptions.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                    </Select>

                    <div className="md:col-span-2 flex items-start space-x-3 rtl:space-x-reverse">
                        <Checkbox id="consent" checked={consent} onCheckedChange={setConsent} className="mt-1" />
                        <label htmlFor="consent" className="text-sm text-gray-400">{t.franchise_form_consent}</label>
                    </div>
                     {errors.consent && <p className="text-red-500 text-sm md:col-span-2">{errors.consent}</p>}

                    <div className="md:col-span-2 text-center mt-4">
                        <Button type="submit" className="btn-primary text-lg w-full md:w-auto px-12 py-4">{t.franchise_form_submit}</Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default function OwnAVenue() {
    const { t } = useLanguage();

    if (!t) return <div className="min-h-screen bg-black" />;

    return (
        <div className="w-full">
            <FranchiseHero t={t} />
            <WhyFranchise t={t} />
            <FranchiseForm t={t} />
        </div>
    );
}