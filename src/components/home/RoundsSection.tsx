import { Card } from '../ui/Card';

export function RoundsSection() {
  const rounds = [
    {
      number: 1,
      title: 'Registration & Audition',
      description: 'Submit your latest video performance and complete your registration by paying the ₹499 registration fee.',
    },
    {
      number: 2,
      title: 'Online Screening',
      description: 'Our expert panel reviews all submissions and selects promising talents',
    },
    {
      number: 3,
      title: 'Live Auditions',
      description: 'Selected candidates perform live before the judges',
      dates: 'May 8, 9, and 10, 2026',
    },
    {
      number: 4,
      title: 'Quarter Final',
      description: 'Top performers advance to quarter finals. Registration fee of ₹999 required for participation in further finale rounds',
      dates: 'Will be announced once the live auditions are completed',
      highlight: true,
    },
    {
      number: 5,
      title: 'Semi Final',
      description: 'Top performers compete in semi-final rounds',
      dates: 'Will be announced once the quarter finals are completed',
    },
    {
      number: 6,
      title: 'Grand Finale',
      description: 'The ultimate showdown to crown the KKC Talent Show champion',
      dates: 'Will be announced once the semi-finals are completed',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Competition <span className="text-amber-500">Structure</span>
          </h2>
          <p className="text-xl text-gray-400">Journey from audition to stardom in 6 exciting rounds</p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-amber-500 to-transparent hidden lg:block"></div>

          <div className="space-y-12">
            {rounds.map((round, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                <div className="flex-1 w-full">
                  <Card
                    hover
                    className={`${index % 2 === 0 ? 'lg:mr-8' : 'lg:ml-8'} ${
                      round.highlight ? 'border-2 border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-transparent' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold text-xl">
                        {round.number}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">{round.title}</h3>
                        <p className="text-gray-400">{round.description}</p>
                        {round.dates && <p className="text-amber-500 mt-2">Dates: {round.dates}</p>}
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="hidden lg:flex flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 border-4 border-black z-10"></div>

                <div className="flex-1 w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
