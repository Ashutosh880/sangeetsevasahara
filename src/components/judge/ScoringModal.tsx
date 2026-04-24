import { X, Star, Music, Mic2, Sparkles, Send, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { JudgeCandidate } from '../../lib/api';

interface ScoringModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: JudgeCandidate | null;
  onSubmit: (scores: {
    vocal_quality: number;
    stage_presence: number;
    song_choice: number;
    overall_impact: number;
  }) => Promise<void>;
  isSubmitting: boolean;
}

const CRITERIA = [
  {
    key: 'vocal_quality' as const,
    label: 'Vocal Quality & Technique',
    percentage: 40,
    maxScore: 4,
    icon: Mic2,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-400',
  },
  {
    key: 'stage_presence' as const,
    label: 'Stage Presence & Performance',
    percentage: 30,
    maxScore: 3,
    icon: Sparkles,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-400',
  },
  {
    key: 'song_choice' as const,
    label: 'Song Choice & Interpretation',
    percentage: 20,
    maxScore: 2,
    icon: Music,
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
  },
  {
    key: 'overall_impact' as const,
    label: 'Overall Impact & Originality',
    percentage: 10,
    maxScore: 1,
    icon: Star,
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    textColor: 'text-rose-400',
  },
];

export function ScoringModal({ isOpen, onClose, candidate, onSubmit, isSubmitting }: ScoringModalProps) {
  const [scores, setScores] = useState<Record<string, string>>({
    vocal_quality: '',
    stage_presence: '',
    song_choice: '',
    overall_impact: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleScoreChange = (key: string, value: string) => {
    setScores(prev => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    for (const c of CRITERIA) {
      const val = scores[c.key];
      if (val === '' || val === undefined) {
        newErrors[c.key] = 'Score is required';
        continue;
      }
      const num = parseFloat(val);
      if (isNaN(num)) {
        newErrors[c.key] = 'Must be a number';
      } else if (num < 0) {
        newErrors[c.key] = 'Cannot be negative';
      } else if (num > c.maxScore) {
        newErrors[c.key] = `Max score is ${c.maxScore}`;
      } else if (!Number.isInteger(num * 10)) {
        newErrors[c.key] = 'Max 1 decimal place';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    await onSubmit({
      vocal_quality: parseFloat(scores.vocal_quality),
      stage_presence: parseFloat(scores.stage_presence),
      song_choice: parseFloat(scores.song_choice),
      overall_impact: parseFloat(scores.overall_impact),
    });

    setScores({ vocal_quality: '', stage_presence: '', song_choice: '', overall_impact: '' });
    setErrors({});
  };

  const totalScore = CRITERIA.reduce((sum, c) => {
    const val = parseFloat(scores[c.key]);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-lg max-h-[95vh] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-850 to-black border border-gray-700/50 shadow-2xl shadow-black/50">
        {/* Header with candidate info */}
        <div className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 px-5 py-4 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {candidate.profile_image_path ? (
                <img
                  src={candidate.profile_image_path}
                  alt={candidate.full_name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/50"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center border-2 border-amber-500/30">
                  <User className="text-amber-500" size={22} />
                </div>
              )}
              <div>
                <h3 className="text-white font-bold text-lg leading-tight">{candidate.full_name}</h3>
                <p className="text-gray-400 text-sm">{candidate.category} | {candidate.city || 'N/A'}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white p-1.5 hover:bg-white/10 rounded-lg transition-colors">
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Scoring fields */}
        <div className="overflow-y-auto max-h-[calc(95vh-180px)] p-5 space-y-4">
          {CRITERIA.map((c) => {
            const Icon = c.icon;
            return (
              <div key={c.key} className={`${c.bgColor} border ${c.borderColor} rounded-xl p-4 transition-all`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg bg-gradient-to-br ${c.color} bg-opacity-20`}>
                      <Icon size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{c.label}</p>
                      <p className="text-gray-400 text-xs">{c.percentage}% weightage</p>
                    </div>
                  </div>
                  <span className={`${c.textColor} text-sm font-bold`}>Max: {c.maxScore}</span>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max={c.maxScore}
                    value={scores[c.key]}
                    onChange={(e) => handleScoreChange(c.key, e.target.value)}
                    placeholder={`Enter score (0 - ${c.maxScore})`}
                    className={`w-full px-4 py-3 bg-black/40 border-2 rounded-lg text-white text-lg font-semibold placeholder-gray-600 focus:outline-none focus:ring-2 transition-all ${
                      errors[c.key]
                        ? 'border-red-500 focus:ring-red-500/30'
                        : 'border-gray-700 focus:border-amber-500 focus:ring-amber-500/20'
                    }`}
                  />
                  {errors[c.key] && (
                    <p className="text-red-400 text-xs mt-1.5 font-medium">{errors[c.key]}</p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Total */}
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300 font-semibold">Total Score</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-amber-500">{totalScore.toFixed(1)}</span>
                <span className="text-gray-400 text-lg">/ 10</span>
              </div>
            </div>
            <div className="mt-3 w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${(totalScore / 10) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-700/50 bg-gray-900/50">
          <div className="flex gap-3">
            <Button
              onClick={handleSubmit}
              className="flex-1"
              isLoading={isSubmitting}
              disabled={isSubmitting}
            >
              <Send size={18} className="mr-2" />
              Submit Score
            </Button>
            <Button variant="outline" onClick={onClose} className="flex-1" disabled={isSubmitting}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
