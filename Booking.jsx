
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { BookingInquiry } from '@/api/entities';
import { Game } from '@/api/entities';
import { Location } from '@/api/entities';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  MapPin, 
  Gamepad2,
  Star,
  CheckCircle,
  ArrowLeft,
  Gift
} from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const BookingHero = ({ t }) => (
    <section className="relative pt-48 pb-24 bg-cover bg-center" style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1551698618-1dfe5d97d256?q=80&w=2070&auto=format&fit=crop')"
    }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative max-w-4xl mx-auto text-center px-6">
            <h1 className="font-heading text-5xl md:text-7xl font-black text-white mb-6">
                {t.booking_hero_title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light leading-relaxed">
                {t.booking_hero_subtitle}
            </p>
        </div>
    </section>
);

const GameSelection = ({ games, selectedGame, onGameSelect, t }) => (
    <div className="bg-[#111] rounded-lg p-6 border border-gray-800">
        <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2">
            <Gamepad2 className="text-blue-500" />
            {t.booking_select_game}
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {games.map(game => (
                <div 
                    key={game.id}
                    onClick={() => onGameSelect(game)}
                    className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                        selectedGame?.id === game.id 
                            ? 'border-blue-500 bg-blue-500/10' 
                            : 'border-gray-700 hover:border-gray-600'
                    }`}
                >
                    <img src={game.image_url} alt={game.title} className="w-full h-32 object-cover rounded mb-3"/>
                    <h4 className="font-heading font-bold mb-2 text-pink-500">{game.title}</h4>
                    <div className="flex justify-between text-sm text-pink-400 mb-2">
                        <span className="flex items-center gap-1">
                            <Users size={14} />
                            {game.player_range}
                        </span>
                        <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {game.duration}
                        </span>
                    </div>
                    <Badge variant="outline" className="text-xs border-pink-400 text-pink-400">{game.difficulty}</Badge>
                </div>
            ))}
        </div>
    </div>
);

const LocationSelection = ({ locations, selectedLocation, onLocationSelect, t }) => (
    <div className="bg-[#111] rounded-lg p-6 border border-gray-800">
        <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2">
            <MapPin className="text-blue-500" />
            {t.booking_select_location}
        </h3>
        <RadioGroup value={selectedLocation?.id} onValueChange={(value) => {
            const location = locations.find(l => l.id === value);
            onLocationSelect(location);
        }}>
            <div className="grid md:grid-cols-2 gap-4">
                {locations.map(location => (
                    <div key={location.id} className={`flex items-center space-x-3 p-4 border rounded-lg transition-colors ${
                        selectedLocation?.id === location.id
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-gray-700 hover:border-gray-600'
                    }`}>
                        <RadioGroupItem value={location.id} id={location.id} />
                        <Label htmlFor={location.id} className="flex-grow cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold">{location.city}</h4>
                                    <p className="text-sm text-gray-400">{location.address}</p>
                                    <p className="text-sm text-gray-400">{location.phone}</p>
                                </div>
                                <div className="flex items-center gap-1 text-yellow-400">
                                    <Star size={14} />
                                    <span className="text-sm">{location.google_rating}</span>
                                </div>
                            </div>
                        </Label>
                    </div>
                ))}
            </div>
        </RadioGroup>
    </div>
);

const BookingForm = ({ selectedGame, selectedLocation, t }) => {
    const [formData, setFormData] = useState({
        name: '', email: '', group_size: '', message: '', 
        preferred_time: '', special_requests: '', 
        celebration_type: '', add_party_package: false
    });
    const [date, setDate] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!date) {
            alert(t.booking_select_date_alert);
            return;
        }
        if (!selectedGame) {
            alert(t.booking_select_game_alert);
            return;
        }
        if (!selectedLocation) {
            alert(t.booking_select_location_alert);
            return;
        }

        const bookingData = {
            ...formData,
            group_size: Number(formData.group_size),
            event_date: date.toISOString().split('T')[0],
            game_title: selectedGame.title,
            location_city: selectedLocation.city,
            message: `Game: ${selectedGame.title}\nLocation: ${selectedLocation.city}\nPreferred Time: ${formData.preferred_time}\nCelebration: ${formData.celebration_type}\nSpecial Requests: ${formData.special_requests}\nParty Package: ${formData.add_party_package ? 'Yes' : 'No'}\n\nMessage: ${formData.message}`
        };
        
        await BookingInquiry.create(bookingData);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="font-heading text-3xl font-bold text-green-400 mb-4">{t.booking_success_title}</h3>
                <p className="text-gray-300 mb-6">{t.booking_success_subtitle}</p>
                <div className="bg-[#111] p-4 rounded-lg">
                    <h4 className="font-bold mb-2">{t.booking_success_summary}</h4>
                    <div className="text-sm text-gray-400 space-y-1">
                        <p><strong>{t.booking_game}:</strong> {selectedGame?.title}</p>
                        <p><strong>{t.booking_location}:</strong> {selectedLocation?.city}</p>
                        <p><strong>{t.booking_date}:</strong> {date ? format(date, 'PPP') : ''}</p>
                        <p><strong>{t.booking_group_size}:</strong> {formData.group_size} {t.booking_people}</p>
                    </div>
                </div>
            </div>
        );
    }

    const timeSlots = [
        '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', 
        '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
    ];

    const celebrationTypes = [
        t.booking_celebration_none,
        t.booking_celebration_birthday,
        t.booking_celebration_corporate,
        t.booking_celebration_bachelor,
        t.booking_celebration_anniversary,
        t.booking_celebration_other
    ];

    return (
        <div className="bg-[#111] rounded-lg p-6 border border-gray-800">
            <h3 className="font-heading text-2xl font-bold mb-6">{t.booking_form_title}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                    name="name" 
                    placeholder={t.form_name} 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    className="bg-gray-900 border-gray-700 h-12 placeholder:text-gray-500" 
                />
                <Input 
                    name="email" 
                    type="email" 
                    placeholder={t.form_email} 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                    className="bg-gray-900 border-gray-700 h-12 placeholder:text-gray-500" 
                />
                <Input 
                    name="group_size" 
                    type="number" 
                    placeholder={t.form_group_size} 
                    value={formData.group_size} 
                    onChange={handleChange} 
                    required 
                    min="1"
                    className="bg-gray-900 border-gray-700 h-12 placeholder:text-gray-500" 
                />
                
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant={"outline"} className={`h-12 w-full justify-start text-left font-normal bg-gray-900 border-gray-700 hover:bg-gray-800 ${!date && "text-gray-400"}`}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>{t.form_date}</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                </Popover>

                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, preferred_time: value }))}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 h-12 text-white">
                        <SelectValue placeholder={t.booking_preferred_time} />
                    </SelectTrigger>
                    <SelectContent>
                        {timeSlots.map(time => (
                            <SelectItem key={time} value={time}>{time}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, celebration_type: value }))}>
                    <SelectTrigger className="bg-gray-900 border-gray-700 h-12 text-white">
                        <SelectValue placeholder={t.booking_celebration_type} />
                    </SelectTrigger>
                    <SelectContent>
                        {celebrationTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Textarea 
                    name="special_requests" 
                    placeholder={t.booking_special_requests} 
                    value={formData.special_requests} 
                    onChange={handleChange} 
                    className="md:col-span-2 bg-gray-900 border-gray-700 placeholder:text-gray-500" 
                    rows={3} 
                />

                <div className="md:col-span-2 flex items-center space-x-3 rtl:space-x-reverse p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <Checkbox 
                        id="party_package" 
                        checked={formData.add_party_package} 
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, add_party_package: checked }))} 
                    />
                    <Label htmlFor="party_package" className="flex items-center gap-2 cursor-pointer">
                        <Gift className="text-blue-400" size={20} />
                        <span>{t.booking_party_package}</span>
                    </Label>
                </div>

                <Textarea 
                    name="message" 
                    placeholder={t.form_message} 
                    value={formData.message} 
                    onChange={handleChange} 
                    className="md:col-span-2 bg-gray-900 border-gray-700 placeholder:text-gray-500" 
                    rows={4} 
                />

                <div className="md:col-span-2 text-center">
                    <Button type="submit" className="btn-primary text-lg w-full md:w-auto px-12 py-4">
                        {t.booking_confirm_btn}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default function Booking() {
    const { t } = useLanguage();
    const [games, setGames] = useState([]);
    const [locations, setLocations] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        Game.list().then(setGames);
        Location.list().then(setLocations);
    }, []);

    if (!t) return <div className="min-h-screen bg-black" />;

    return (
        <div className="w-full bg-black">
            <BookingHero t={t} />
            
            <div className="max-w-screen-xl mx-auto px-6 pb-16">
                <Link 
                    to={createPageUrl('Home')} 
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={20} />
                    {t.booking_back_to_home}
                </Link>

                <div className="space-y-8">
                    <GameSelection 
                        games={games} 
                        selectedGame={selectedGame} 
                        onGameSelect={setSelectedGame} 
                        t={t} 
                    />
                    
                    <LocationSelection 
                        locations={locations} 
                        selectedLocation={selectedLocation} 
                        onLocationSelect={setSelectedLocation} 
                        t={t} 
                    />
                    
                    <BookingForm 
                        selectedGame={selectedGame} 
                        selectedLocation={selectedLocation} 
                        t={t} 
                    />
                </div>
            </div>
        </div>
    );
}
