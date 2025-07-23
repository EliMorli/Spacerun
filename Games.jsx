
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../components/LanguageProvider';
import { Game } from '@/api/entities';
import { Users, Clock, BarChart3, Tag } from 'lucide-react';
import { createPageUrl } from '@/utils';

const GameCard = ({ game, t, language }) => {
  const scrollToBooking = () => {
    window.location.href = createPageUrl('Booking');
  };

  // Helper function to get localized difficulty string
  const getLocalizedDifficulty = (difficulty) => {
    if (!difficulty) return '';
    const key = `difficulty_${difficulty.toLowerCase()}`;
    return t[key] || difficulty; // Fallback to original if translation not found
  };

  // Helper function to get localized tags string
  const getLocalizedTags = (tags) => {
    if (!tags || tags.length === 0) return '...';
    // Map each tag to its localized version, falling back to original tag if no translation
    return tags.map(tag => t[`tag_${tag.toLowerCase()}`] || tag).join(', ');
  };

  return (
    <div className="bg-[#111] rounded-lg overflow-hidden group transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
      <div className="relative h-60">
        <img src={game.image_url} alt={language === 'he' && game.title_he ? game.title_he : game.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <h3 className="font-heading text-2xl font-bold absolute bottom-4 left-4">{language === 'he' && game.title_he ? game.title_he : game.title}</h3>
      </div>
      <div className="p-6">
        <p className="font-body text-gray-300 mb-4 h-20 overflow-hidden">{language === 'he' && game.description_he ? game.description_he : game.description}</p>
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-400 mb-4">
            <div className="flex items-center gap-2">
                <Users size={16} className="text-blue-500"/>
                <span>{game.player_range} {t.players_label}</span>
            </div>
            <div className="flex items-center gap-2">
                <Clock size={16} className="text-blue-500"/>
                <span>{game.duration} {t.minutes_label}</span>
            </div>
            <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-blue-500"/>
                <span>{getLocalizedDifficulty(game.difficulty)}</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
                <Tag size={16} className="text-blue-500"/>
                <span>{getLocalizedTags(game.tags)}</span>
            </div>
        </div>
        <button onClick={scrollToBooking} className="btn-primary w-full text-center">
          {t.games_book_now}
        </button>
      </div>
    </div>
  );
};

export default function Games() {
    const { t, language } = useLanguage();
    const [games, setGames] = useState([]);
    const [featuredGame, setFeaturedGame] = useState(null);

    useEffect(() => {
        Game.list().then(allGames => {
            setGames(allGames);
            setFeaturedGame(allGames.find(g => g.featured) || allGames[0]);
        });
    }, []);

    const scrollToBooking = () => {
      window.location.href = createPageUrl('Booking');
    };

    if (!t || !featuredGame) return <div className="min-h-screen bg-black" />;
    
    return (
        <div className="w-full bg-black">
            <section className="relative pt-48 pb-24 bg-gradient-to-b from-[#111] to-black text-center">
                 <h1 className="font-heading text-5xl md:text-7xl font-black text-white">{t.games_page_title}</h1>
                 <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">{t.games_page_subtitle}</p>
            </section>
            
            {featuredGame && (
                 <section className="section-padding bg-black">
                    <div className="max-w-screen-lg mx-auto grid md:grid-cols-2 gap-12 items-center">
                        <div>
                             <h2 className="font-heading text-4xl font-bold mb-4">{language === 'he' && featuredGame.title_he ? featuredGame.title_he : featuredGame.title}</h2>
                             <p className="text-gray-400 mb-6">
                                {language === 'he' && featuredGame.long_description_he 
                                    ? featuredGame.long_description_he 
                                    : (featuredGame.long_description || (language === 'he' && featuredGame.description_he ? featuredGame.description_he : featuredGame.description))}
                             </p>
                             <button onClick={scrollToBooking} className="btn-primary px-8 py-3">
                               {t.games_play_now}
                             </button>
                        </div>
                        <div className="h-80 rounded-lg bg-cover bg-center" style={{backgroundImage: `url(${featuredGame.image_url})`}}></div>
                    </div>
                </section>
            )}

            <section className="section-padding bg-[#050505]">
              <div className="max-w-screen-xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {games.map(game => (
                    <GameCard key={game.id} game={game} t={t} language={language} />
                  ))}
                </div>
              </div>
            </section>
        </div>
    );
}
