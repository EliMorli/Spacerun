
import React, { useState, useEffect } from 'react';
import { Game } from '@/api/entities';
import { Users, Puzzle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function GamesSection({ t, isPreview = false, language }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    Game.list().then(setGames);
  }, []);

  const gamesToShow = isPreview ? games.slice(0, 3) : games;

  const scrollToBooking = () => {
    window.location.href = createPageUrl('Booking');
  };

  return (
    <section id="games" className="section-padding bg-[#050505]">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl font-black uppercase">{t.games_title}</h2>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">{t.games_subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gamesToShow.map(game => (
            <div key={game.id} className="bg-[#111] rounded-lg overflow-hidden group transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="relative h-60">
                <img src={game.image_url} alt={language === 'he' && game.title_he ? game.title_he : game.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <h3 className="font-heading text-2xl font-bold absolute bottom-4 left-4">{language === 'he' && game.title_he ? game.title_he : game.title}</h3>
              </div>
              <div className="p-6">
                <p className="font-body text-gray-300 mb-4 h-24">{language === 'he' && game.description_he ? game.description_he : game.description}</p>
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2"><Puzzle size={16} className="text-blue-500"/><span>{game.tags ? game.tags[0] : ''}</span></div>
                  <div className="flex items-center gap-2"><Users size={16} className="text-blue-500"/><span>{game.player_range}</span></div>
                </div>
                <button onClick={scrollToBooking} className="btn-primary w-full text-center">
                  {t.games_book_now || 'Book Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
        {isPreview && (
            <div className="text-center mt-12">
                <Link to={createPageUrl('Games')} className="btn-secondary">{t.games_see_all}</Link>
            </div>
        )}
      </div>
    </section>
  );
}
