import { Music, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/Button';
import logo from "../../../assets/logo.png";

export function HeroSection() {
  const { setCurrentPage } = useApp();
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_50%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="relative flex justify-center mb-2">
          <img
            src={logo}
            alt="KKC Talent Show"
            className="h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96 object-contain"
          />

          <div
            className="absolute text-white text-sm sm:text-base md:text-lg font-bold tracking-wider"
            style={{
              bottom: '29%',
              textShadow: '3px 3px 8px rgba(0,0,0,0.9)'
            }}
          >
            SEASON - 1
          </div>
        </div>

        <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-6 -mt-10 font-medium">
          अब गाईये दिल से
        </p>

        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles className="text-amber-500" size={24} />
          <span className="text-amber-500 font-semibold text-lg">Season 1 - 2026</span>
          <Sparkles className="text-amber-500" size={24} />
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
          KKC <span className="text-amber-500">Talent Show</span>
        </h1>

        <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
          Showcase Your Talent on India's Biggest Musical Platform
        </p>

        <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          12 World Records | 400+ Shows | 2000 Artists | London Book Record Holder
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => navigate('/auditions/register')}
            className="group"
          >
            <Music className="mr-2 group-hover:rotate-12 transition-transform" size={24} />
            Register for Auditions
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              const element = document.getElementById('about-section');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Learn More
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { label: 'World Records', value: '12' },
            { label: 'Shows', value: '400+' },
            { label: 'Artists', value: '2000+' },
            { label: 'Singing Hours', value: '128' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-amber-500 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}
