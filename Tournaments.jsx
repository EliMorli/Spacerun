
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { Tournament } from '@/api/entities';
import { TournamentRegistration } from '@/api/entities';
import { Leaderboard } from '@/api/entities';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Users, 
  Calendar, 
  DollarSign, 
  MapPin, 
  Target,
  Zap,
  Medal,
  Crown,
  Gamepad2,
  Filter
} from 'lucide-react';
import { format } from 'date-fns';

const TournamentHero = ({ t }) => (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')"
            }}
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white mb-6 animate-fade-in">
                {t.tournaments_hero_title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
                {t.tournaments_hero_subtitle}
            </p>
            <div className="mt-8 animate-fade-in" style={{animationDelay: '0.4s'}}>
                <Button onClick={() => document.getElementById('tournaments-list')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary text-lg px-8 py-4">{t.tournaments_hero_cta}</Button>
            </div>
        </div>
    </section>
);

const TournamentCard = ({ tournament, t, language }) => {
    const statusColors = {
        "Registering Now": "bg-green-500/20 text-green-400 border-green-500/30",
        "Full": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        "In Progress": "bg-blue-500/20 text-blue-400 border-blue-500/30",
        "Complete": "bg-gray-500/20 text-gray-400 border-gray-500/30",
    };

    const getLocalizedStatus = (status) => {
        const statusMap = {
            "Registering Now": language === 'he' ? "נרשמים עכשיו" : "Registering Now",
            "Full": language === 'he' ? "מלא" : "Full",
            "In Progress": language === 'he' ? "בתהליך" : "In Progress",
            "Complete": language === 'he' ? "הושלם" : "Complete"
        };
        return statusMap[status] || status;
    };

    const getLocalizedGameType = (gameType) => {
        const gameTypeMap = {
            "Combat": language === 'he' ? "קרב" : "Combat",
            "Puzzle": language === 'he' ? "חידות" : "Puzzle",
            "Survival": language === 'he' ? "הישרדות" : "Survival",
            "Rhythm": language === 'he' ? "קצב" : "Rhythm"
        };
        return gameTypeMap[gameType] || gameType;
    };

    return (
        <div className="bg-[#111] rounded-lg overflow-hidden border border-gray-800 flex flex-col">
            <img 
                src={tournament.image_url || 'https://images.unsplash.com/photo-1614036153215-327ce48b598b?q=80&w=1932&auto=format&fit=crop'} 
                alt={language === 'he' && tournament.name_he ? tournament.name_he : tournament.name} 
                className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-heading text-2xl font-bold">{language === 'he' && tournament.name_he ? tournament.name_he : tournament.name}</h3>
                    <Badge className={statusColors[tournament.status]}>{getLocalizedStatus(tournament.status)}</Badge>
                </div>
                <div className="space-y-3 text-gray-400 mb-6 flex-grow mt-4">
                    <p className="flex items-center gap-3"><Gamepad2 size={16} className="text-blue-500" /> {t.tournaments_card_game_type}: {getLocalizedGameType(tournament.game_type)}</p>
                    <p className="flex items-center gap-3"><Calendar size={16} className="text-blue-500" /> {t.tournaments_card_date}: {format(new Date(tournament.date), 'MMM d, yyyy @ h:mm a')}</p>
                    <p className="flex items-center gap-3"><DollarSign size={16} className="text-blue-500" /> {t.tournaments_card_fee}: {tournament.entry_fee}</p>
                    <p className="flex items-center gap-3"><Users size={16} className="text-blue-500" /> {t.tournaments_card_players}: {tournament.max_players}</p>
                    <p className="flex items-center gap-3"><Trophy size={16} className="text-yellow-500" /> {t.tournaments_card_prize}: {tournament.prize_pool}</p>
                </div>
                <div className="flex gap-3 mt-auto">
                    <Button variant="outline" className="w-full">{t.tournaments_card_details_btn}</Button>
                    <Button 
                        onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })} 
                        className="btn-primary w-full" 
                        disabled={tournament.status !== 'Registering Now'}
                    >
                        {t.tournaments_card_register_btn}
                    </Button>
                </div>
            </div>
        </div>
    );
};

const HowItWorks = ({ t }) => {
    const steps = [
        { icon: Target, title: t.tournaments_how_it_works_step1_title, desc: t.tournaments_how_it_works_step1_desc },
        { icon: Zap, title: t.tournaments_how_it_works_step2_title, desc: t.tournaments_how_it_works_step2_desc },
        { icon: Medal, title: t.tournaments_how_it_works_step3_title, desc: t.tournaments_how_it_works_step3_desc },
    ];
    return (
        <section className="section-padding bg-[#050505]">
            <div className="max-w-screen-lg mx-auto text-center">
                <h2 className="font-heading text-4xl md:text-5xl font-black uppercase mb-12">{t.tournaments_how_it_works_title}</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-full w-24 h-24 flex items-center justify-center mb-4">
                                <step.icon size={40} />
                            </div>
                            <h3 className="font-heading text-2xl font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-400">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const LeaderboardDisplay = ({ t }) => {
    const [leaderboard, setLeaderboard] = useState([]);
    useEffect(() => { Leaderboard.list('-score').then(setLeaderboard); }, []);

    if (leaderboard.length === 0) {
        return <p className="text-center text-gray-500 mt-8">{t.tournaments_leaderboard_no_data}</p>;
    }

    return (
        <div className="overflow-x-auto bg-[#111] rounded-lg border border-gray-800 p-4">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="p-4"><Crown size={16} className="inline mr-2"/>{t.tournaments_leaderboard_rank}</th>
                        <th className="p-4">{t.tournaments_leaderboard_player}</th>
                        <th className="p-4">{t.tournaments_leaderboard_score}</th>
                        <th className="p-4">{t.tournaments_leaderboard_tournament}</th>
                        <th className="p-4">{t.tournaments_leaderboard_location}</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboard.map((entry, index) => (
                        <tr key={entry.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50">
                            <td className="p-4 font-bold text-lg">{entry.rank}</td>
                            <td className="p-4">{entry.player_team_name}</td>
                            <td className="p-4 text-blue-400">{entry.score}</td>
                            <td className="p-4">{entry.tournament_name}</td>
                            <td className="p-4">{entry.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const RegistrationForm = ({ t, tournaments }) => {
    const [formData, setFormData] = useState({
        player_name: '', email: '', phone: '', tournament_id: '',
        location: '', num_players: 1, agreed_to_rules: false, add_tshirt: false
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const tournament = tournaments.find(t => t.id === formData.tournament_id);
        const dataToSubmit = {
            ...formData,
            tournament_name: tournament ? tournament.name : '',
        };
        await TournamentRegistration.create(dataToSubmit);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="text-center p-8 bg-[#111] rounded-lg border border-green-500/30">
                <h3 className="font-heading text-3xl font-bold text-green-400 mb-4">{t.tournaments_form_thanks_title}</h3>
                <p className="text-gray-300">{t.tournaments_form_thanks_subtitle}</p>
            </div>
        );
    }

    return (
        <form id="registration-form" onSubmit={handleSubmit} className="bg-[#111] p-8 rounded-lg border border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 text-center">
                <h2 className="font-heading text-4xl font-bold">{t.tournaments_form_title}</h2>
                <p className="text-gray-400 mt-2">{t.tournaments_form_subtitle}</p>
            </div>
            <Input name="player_name" placeholder={t.tournaments_form_player_name} onChange={(e) => setFormData({...formData, player_name: e.target.value})} required className="bg-gray-900 border-gray-700 h-12" />
            <Input name="email" type="email" placeholder={t.tournaments_form_email} onChange={(e) => setFormData({...formData, email: e.target.value})} required className="bg-gray-900 border-gray-700 h-12" />
            <Input name="phone" placeholder={t.tournaments_form_phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required className="bg-gray-900 border-gray-700 h-12" />
            <Input name="num_players" type="number" placeholder={t.tournaments_form_num_players} min="1" onChange={(e) => setFormData({...formData, num_players: parseInt(e.target.value)})} required className="bg-gray-900 border-gray-700 h-12" />
            
            <Select onValueChange={(v) => setFormData({...formData, tournament_id: v})} required>
                <SelectTrigger className="bg-gray-900 border-gray-700 h-12"><SelectValue placeholder={t.tournaments_form_choose_tournament} /></SelectTrigger>
                <SelectContent>{tournaments.filter(t => t.status === 'Registering Now').map(t => <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>)}</SelectContent>
            </Select>

            <Input name="location" placeholder={t.tournaments_form_location} onChange={(e) => setFormData({...formData, location: e.target.value})} required className="bg-gray-900 border-gray-700 h-12" />

            <div className="md:col-span-2 flex items-start space-x-3 rtl:space-x-reverse">
                <Checkbox id="rules_agree" checked={formData.agreed_to_rules} onCheckedChange={(c) => setFormData({...formData, agreed_to_rules: c})} className="mt-1" />
                <label htmlFor="rules_agree" className="text-sm text-gray-400">{t.tournaments_form_rules_agree}</label>
            </div>
            <div className="md:col-span-2 flex items-start space-x-3 rtl:space-x-reverse">
                <Checkbox id="tshirt" checked={formData.add_tshirt} onCheckedChange={(c) => setFormData({...formData, add_tshirt: c})} className="mt-1" />
                <label htmlFor="tshirt" className="text-sm text-gray-400">{t.tournaments_form_tshirt_upsell}</label>
            </div>
            
            <Button type="submit" className="btn-primary w-full md:col-span-2 text-lg py-4">{t.tournaments_form_submit_btn}</Button>
        </form>
    );
};


export default function Tournaments() {
    const { t, language } = useLanguage();
    const [tournaments, setTournaments] = useState([]);
    useEffect(() => { Tournament.list('-date').then(setTournaments); }, []);

    if (!t) return <div className="min-h-screen bg-black" />;
    
    return (
        <div className="w-full bg-black">
            <TournamentHero t={t} />
            
            <section id="tournaments-list" className="section-padding bg-black">
                <div className="max-w-screen-xl mx-auto">
                    <h2 className="font-heading text-4xl font-bold text-center mb-12">{t.tournaments_upcoming_title}</h2>
                    {/* Add filters here if needed */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {tournaments.map(tourney => (
                            <TournamentCard key={tourney.id} tournament={tourney} t={t} language={language} />
                        ))}
                    </div>
                </div>
            </section>

            <HowItWorks t={t} />
            
            <section className="section-padding bg-black">
                <div className="max-w-screen-lg mx-auto text-center">
                     <h2 className="font-heading text-4xl font-bold mb-4">{t.tournaments_rules_title}</h2>
                     <p className="text-gray-400 mb-6">{t.tournaments_rules_subtitle}</p>
                     <Button variant="outline">{t.tournaments_rules_download_btn}</Button>
                </div>
            </section>
            
            <section className="section-padding bg-[#050505]">
                <div className="max-w-screen-xl mx-auto">
                    <h2 className="font-heading text-4xl font-bold text-center mb-12">{t.tournaments_leaderboard_title}</h2>
                    <LeaderboardDisplay t={t} />
                </div>
            </section>

            <section className="section-padding bg-black">
                <div className="max-w-screen-md mx-auto">
                    <RegistrationForm t={t} tournaments={tournaments} />
                </div>
            </section>
        </div>
    );
}
