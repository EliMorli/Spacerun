import React, { useState, useEffect } from 'react';
import { BookingInquiry } from '@/api/entities';
import { Game } from '@/api/entities';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Gamepad2, Users, Clock } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default function BookingSection({ t, language }) {
  const [formData, setFormData] = useState({ name: '', email: '', group_size: '', message: '' });
  const [date, setDate] = useState();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    Game.list().then(setGames);
  }, []);

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
    await BookingInquiry.create({ 
      ...formData, 
      group_size: Number(formData.group_size), 
      event_date: date.toISOString().split('T')[0],
      game_title: selectedGame?.title || 'Any Game'
    });
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="section-padding bg-[#050505]">
        <div className="max-w-screen-md mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-black uppercase">{t.booking_thanks_title}</h2>
            <p className="text-gray-300 mt-4">{t.booking_thanks_subtitle}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="section-padding bg-[#050505]">
      <div className="max-w-screen-md mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl font-black uppercase text-center mb-12">{t.booking_title}</h2>
        
        {/* Game Selection */}
        <div className="mb-8">
          <h3 className="font-heading text-2xl font-bold mb-6 flex items-center gap-2">
            <Gamepad2 className="text-blue-500" />
            {t.booking_select_game || 'Choose Your Game'}
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {games.slice(0, 3).map(game => (
              <div 
                key={game.id}
                onClick={() => setSelectedGame(game)}
                className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
                  selectedGame?.id === game.id 
                    ? 'border-blue-500 bg-blue-500/10' 
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <img src={game.image_url} alt={game.title} className="w-full h-32 object-cover rounded mb-3"/>
                <h4 className="font-heading font-bold mb-2 text-sm">{game.title}</h4>
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    {game.player_range}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {game.duration}
                  </span>
                </div>
                <Badge variant="outline" className="text-xs">{game.difficulty}</Badge>
              </div>
            ))}
          </div>
          {selectedGame && (
            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-400">
                <strong>{t.booking_selected_game || 'Selected Game'}:</strong> {selectedGame.title}
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input name="name" placeholder={t.form_name} value={formData.name} onChange={handleChange} required className="bg-gray-900 border-gray-700 h-12" />
          <Input name="email" type="email" placeholder={t.form_email} value={formData.email} onChange={handleChange} required className="bg-gray-900 border-gray-700 h-12" />
          <Input name="group_size" type="number" placeholder={t.form_group_size} value={formData.group_size} onChange={handleChange} required className="bg-gray-900 border-gray-700 h-12" />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"} className={`h-12 w-full justify-start text-left font-normal bg-gray-900 border-gray-700 hover:bg-gray-800 ${!date && "text-muted-foreground"}`}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>{t.form_date}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={date} onSelect={setDate} initialFocus /></PopoverContent>
          </Popover>
          <Textarea name="message" placeholder={t.form_message} value={formData.message} onChange={handleChange} className="md:col-span-2 bg-gray-900 border-gray-700" rows={4} />
          <div className="md:col-span-2 text-center">
            <Button type="submit" className="btn-primary text-lg w-full md:w-auto">{t.form_submit}</Button>
          </div>
        </form>
      </div>
    </section>
  );
}