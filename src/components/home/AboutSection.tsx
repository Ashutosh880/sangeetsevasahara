import { Award, Clock, Heart, Target, Trophy, Users } from 'lucide-react';
import { Card } from '../ui/Card';

export function AboutSection() {
  const features = [
    {
      icon: Target,
      title: 'Our Vision',
      description: 'To create a platform where talented artists can showcase their skills and achieve their dreams in the music industry.',
    },
    {
      icon: Heart,
      title: 'Our Mission',
      description: 'Nurturing musical talent across India and providing opportunities for aspiring singers to shine on a national stage.',
    },
    {
      icon: Trophy,
      title: 'Our Achievement',
      description: '12 World Records, 400+ successful shows, and launching careers of 2000+ artists across the nation.',
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Proud holder of London Book of Records for outstanding contribution to the field of music and talent development.',
    },
  ];

  return (
    <section id="about-section" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About <span className="text-amber-500">KKC Talent Show</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            India's premier musical talent discovery platform with a legacy of excellence
          </p>
        </div>

        <div className="mb-12">
          <Card className="bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border-2 border-amber-500/50">
            <div className="text-center py-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy className="text-amber-500" size={48} />
                <h3 className="text-3xl sm:text-4xl font-bold text-white">London Book of World Record Achievement</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
                <div className="bg-black/30 rounded-lg p-6 backdrop-blur-sm">
                  <Clock className="text-amber-500 mx-auto mb-3" size={40} />
                  <p className="text-4xl font-bold text-amber-500 mb-2">128</p>
                  <p className="text-white font-semibold">Hours Continuous</p>
                  <p className="text-gray-300">Singing Marathon</p>
                </div>
                <div className="bg-black/30 rounded-lg p-6 backdrop-blur-sm">
                  <Users className="text-amber-500 mx-auto mb-3" size={40} />
                  <p className="text-4xl font-bold text-amber-500 mb-2">530+</p>
                  <p className="text-white font-semibold">Total Participants</p>
                  <p className="text-gray-300">Artists Launched</p>
                </div>
                <div className="bg-black/30 rounded-lg p-6 backdrop-blur-sm">
                  <Award className="text-amber-500 mx-auto mb-3" size={40} />
                  <p className="text-2xl font-bold text-amber-500 mb-2">London Book</p>
                  <p className="text-white font-semibold">of World Records</p>
                  <p className="text-gray-300">Official Recognition</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} hover>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-4">
                    <Icon className="text-amber-500" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
