import { Gift, Medal, Star, Trophy, Youtube, X } from 'lucide-react';
import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function PrizesSection() {
  const [showRunnerUpModal, setShowRunnerUpModal] = useState(false);

  const topPrizes = [
    {
      position: '1st Winner',
      amount: '₹51,000',
      icon: Trophy,
      launching: 'T-Series YouTube Channel',
      color: 'from-yellow-500/20 to-amber-500/20',
      iconColor: 'text-yellow-500',
      borderColor: 'border-yellow-500/50',
    },
    {
      position: '2nd Winner',
      amount: '₹25,000',
      icon: Medal,
      launching: 'Red Ribbon Musik Youtube Channel',
      color: 'from-gray-400/20 to-gray-500/20',
      iconColor: 'text-gray-400',
      borderColor: 'border-gray-400/50',
    },
    {
      position: '3rd Winner',
      amount: '₹11,000',
      icon: Star,
      launching: 'Red Ribbon Musik Youtube Channel',
      color: 'from-amber-700/20 to-amber-800/20',
      iconColor: 'text-amber-700',
      borderColor: 'border-amber-700/50',
    },
  ];

  const runnerUps = [
    {
      position: '1st Runner Up',
      positionNumber: '4th Position',
      amount: '₹8,000',
      icon: Star,
      color: 'from-blue-500/20 to-blue-600/20',
      iconColor: 'text-blue-500',
    },
    {
      position: '2nd Runner Up',
      positionNumber: '5th Position',
      amount: '₹5,000',
      icon: Star,
      color: 'from-green-500/20 to-green-600/20',
      iconColor: 'text-green-500',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Exciting <span className="text-amber-500">Prizes</span>
          </h2>
          <p className="text-xl text-gray-400 mb-2">Win amazing rewards and kickstart your music career</p>
          <p className="text-lg text-amber-500 font-semibold">Total Prize Pool: ₹1,00,000</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {topPrizes.map((prize, index) => {
            const Icon = prize.icon;
            return (
              <Card
                key={index}
                hover
                className={`text-center bg-gradient-to-br ${prize.color} border-2 ${prize.borderColor} ${
                  index === 0 ? 'md:scale-105' : ''
                }`}
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/30 mb-4">
                  <Icon className={prize.iconColor} size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{prize.position}</h3>
                <div className="text-4xl font-bold text-amber-500 mb-6">{prize.amount}</div>

                <div className="bg-black/30 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Youtube className="text-red-500" size={24} />
                    <p className="text-white font-semibold">Launching On</p>
                  </div>
                  <p className="text-amber-500 font-bold text-lg">{prize.launching}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <Gift size={16} className="text-amber-500" />
                    <span>Prize via Cheque</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <Gift size={16} className="text-amber-500" />
                    <span>YouTube Launch</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <Gift size={16} className="text-amber-500" />
                    <span>Media Coverage</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="text-center mb-12">
          <Button
            size="lg"
            onClick={() => setShowRunnerUpModal(true)}
            className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-bold"
          >
            View Runner Up Prizes
          </Button>
        </div>

        <div className="mt-12 space-y-4">
          <Card className="bg-red-500/10 border-red-500/50 text-center">
            <p className="text-lg text-white font-semibold">
              All prizes are awarded in the form of cheques, not cash
            </p>
          </Card>
          <Card className="bg-amber-500/10 border-amber-500/50 text-center">
            <p className="text-lg text-white">
              All finalists will receive certificates, media exposure, and opportunities to perform at various events across India
            </p>
          </Card>
        </div>
      </div>

      {showRunnerUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-amber-500/30">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-6 py-4 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">Runner Up Prizes</h3>
              <button
                onClick={() => setShowRunnerUpModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-8">
                {runnerUps.map((prize, index) => {
                  const Icon = prize.icon;
                  return (
                    <Card
                      key={index}
                      className={`text-center bg-gradient-to-br ${prize.color} border-2 border-amber-500/30`}
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-black/30 mb-4">
                        <Icon className={prize.iconColor} size={40} />
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">{prize.position}</h4>
                      <p className="text-gray-400 mb-4">{prize.positionNumber}</p>
                      <div className="text-4xl font-bold text-amber-500 mb-6">{prize.amount}</div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2 text-gray-300">
                          <Gift size={16} className="text-amber-500" />
                          <span>Prize via Cheque</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-gray-300">
                          <Gift size={16} className="text-amber-500" />
                          <span>Certificate of Achievement</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-gray-300">
                          <Gift size={16} className="text-amber-500" />
                          <span>Media Coverage</span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-8">
                <Card className="bg-gradient-to-r from-red-500/10 to-amber-500/10 border border-red-500/30 text-center">
                  <p className="text-white text-lg">
                    <span className="font-bold text-amber-500">Important:</span> All cash prizes will be awarded through cheques only. Runner-ups will also receive certificates and performance opportunities.
                  </p>
                </Card>
              </div>

              <div className="mt-6 text-center">
                <Button
                  onClick={() => setShowRunnerUpModal(false)}
                  variant="outline"
                  size="lg"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
