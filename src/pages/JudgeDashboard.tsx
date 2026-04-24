import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Search, LogOut, Scale, User, Phone, Mail, ChevronRight,
  Clock, Lock, Pencil, CheckCircle, Music,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Toast } from '../components/ui/Toast';
import { useToast } from '../hooks/useToast';
import { ScoringModal } from '../components/judge/ScoringModal';
import {
  JudgeSession, JudgeCandidate, JudgeScore,
  searchCandidates, submitJudgeScore, updateJudgeScore, getJudgeScores,
} from '../lib/api';

const EDIT_WINDOW_SECONDS = 30;

export function JudgeDashboard() {
  const { setCurrentPage } = useApp();
  const { toast, showToast, hideToast } = useToast();

  const [judge, setJudge] = useState<JudgeSession | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<JudgeCandidate[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const [selectedCandidate, setSelectedCandidate] = useState<JudgeCandidate | null>(null);
  const [scoringOpen, setScoringOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [scores, setScores] = useState<JudgeScore[]>([]);
  const [editableScoreId, setEditableScoreId] = useState<string | null>(null);
  const [editTimers, setEditTimers] = useState<Record<string, number>>({});
  const [editingScore, setEditingScore] = useState<JudgeScore | null>(null);
  const [editScoringOpen, setEditScoringOpen] = useState(false);

  const timerRefs = useRef<Record<string, ReturnType<typeof setInterval>>>({});
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('judge_session');
    if (stored) {
      setJudge(JSON.parse(stored));
    } else {
      setCurrentPage('login');
    }
  }, [setCurrentPage]);

  const loadScores = useCallback(async () => {
    if (!judge) return;
    try {
      const data = await getJudgeScores(judge.id);
      if (Array.isArray(data)) {
        setScores(data);
      }
    } catch {
      // silent
    }
  }, [judge]);

  useEffect(() => {
    loadScores();
  }, [loadScores]);

  useEffect(() => {
    return () => {
      Object.values(timerRefs.current).forEach(clearInterval);
    };
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSearch = async () => {
    if (!judge || searchQuery.trim().length < 2) return;
    setIsSearching(true);
    setShowSearchResults(true);
    try {
      const data = await searchCandidates(searchQuery.trim(), judge.id);
      if (Array.isArray(data)) {
        setSearchResults(data);
      } else if (data?.candidates) {
        setSearchResults(data.candidates);
      } else {
        setSearchResults([]);
      }
    } catch {
      showToast('Search failed', 'error');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleSelectCandidate = (candidate: JudgeCandidate) => {
    setSelectedCandidate(candidate);
    setScoringOpen(true);
    setShowSearchResults(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleSubmitScore = async (scoreData: {
    vocal_quality: number;
    stage_presence: number;
    song_choice: number;
    overall_impact: number;
  }) => {
    if (!judge || !selectedCandidate) return;
    setIsSubmitting(true);
    try {
      const result: any = await submitJudgeScore({
        candidate_id: selectedCandidate.id,
        judge_id: judge.id,
        ...scoreData,
      });
      if (result?.success) {
        showToast('Score submitted successfully', 'success');
        setScoringOpen(false);
        setSelectedCandidate(null);
        await loadScores();
        if (result.score_id) {
          startEditTimer(result.score_id);
        }
      } else {
        showToast(result?.message || 'Failed to submit score', 'error');
      }
    } catch {
      showToast('Failed to submit score', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEditTimer = (scoreId: string) => {
    setEditableScoreId(scoreId);
    setEditTimers(prev => ({ ...prev, [scoreId]: EDIT_WINDOW_SECONDS }));

    if (timerRefs.current[scoreId]) clearInterval(timerRefs.current[scoreId]);

    timerRefs.current[scoreId] = setInterval(() => {
      setEditTimers(prev => {
        const remaining = (prev[scoreId] || 0) - 1;
        if (remaining <= 0) {
          clearInterval(timerRefs.current[scoreId]);
          delete timerRefs.current[scoreId];
          setEditableScoreId(prev2 => prev2 === scoreId ? null : prev2);
          setScores(prevScores => prevScores.map(s =>
            s.id === scoreId ? { ...s, is_locked: true } : s
          ));
          const newTimers = { ...prev };
          delete newTimers[scoreId];
          return newTimers;
        }
        return { ...prev, [scoreId]: remaining };
      });
    }, 1000);
  };

  const handleEditScore = (score: JudgeScore) => {
    setEditingScore(score);
    setSelectedCandidate({
      id: score.candidate_id,
      full_name: score.candidate_name,
      mobile: score.candidate_mobile,
      email: score.candidate_email,
      category: score.candidate_category,
      audition_date: '',
      profile_image_path: score.candidate_profile_image,
    });
    setEditScoringOpen(true);
  };

  const handleUpdateScore = async (scoreData: {
    vocal_quality: number;
    stage_presence: number;
    song_choice: number;
    overall_impact: number;
  }) => {
    if (!judge || !editingScore) return;
    setIsSubmitting(true);
    try {
      const result: any = await updateJudgeScore({
        score_id: editingScore.id,
        judge_id: judge.id,
        ...scoreData,
      });
      if (result?.success) {
        showToast('Score updated successfully', 'success');
        setEditScoringOpen(false);
        setEditingScore(null);
        setSelectedCandidate(null);
        await loadScores();
      } else {
        showToast(result?.message || 'Failed to update score', 'error');
      }
    } catch {
      showToast('Failed to update score', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('judge_session');
    setCurrentPage('login');
  };

  if (!judge) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black pt-24 pb-12">
      {toast.isOpen && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <ScoringModal
        isOpen={scoringOpen}
        onClose={() => { setScoringOpen(false); setSelectedCandidate(null); }}
        candidate={selectedCandidate}
        onSubmit={handleSubmitScore}
        isSubmitting={isSubmitting}
      />

      <ScoringModal
        isOpen={editScoringOpen}
        onClose={() => { setEditScoringOpen(false); setEditingScore(null); setSelectedCandidate(null); }}
        candidate={selectedCandidate}
        onSubmit={handleUpdateScore}
        isSubmitting={isSubmitting}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-amber-500/30 to-amber-600/10 rounded-xl flex items-center justify-center border border-amber-500/30">
              <Scale className="text-amber-500" size={28} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Judge Panel</h1>
              <p className="text-amber-500 font-medium">{judge.judge_name}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>

        {/* Search section */}
        <div className="mb-10" ref={searchRef}>
          <div className="bg-gradient-to-r from-gray-800/60 to-gray-900/60 border border-gray-700/50 rounded-2xl p-5 sm:p-6">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Search size={20} className="text-amber-500" />
              Search Contestant
            </h2>
            <div className="flex gap-3">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, mobile, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                />
              </div>
              <Button onClick={handleSearch} isLoading={isSearching} disabled={searchQuery.trim().length < 2}>
                <Search size={18} />
              </Button>
            </div>

            {showSearchResults && (
              <div className="mt-4">
                {isSearching ? (
                  <div className="text-center py-6 text-gray-400">Searching...</div>
                ) : searchResults.length === 0 ? (
                  <div className="text-center py-6 text-gray-400">
                    <Music size={40} className="mx-auto mb-2 opacity-30" />
                    <p>No contestants found or already scored by another judge</p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {searchResults.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleSelectCandidate(c)}
                        className="w-full flex items-center gap-4 p-4 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/40 hover:border-amber-500/40 rounded-xl transition-all group text-left"
                      >
                        {c.profile_image_path ? (
                          <img
                            src={c.profile_image_path}
                            alt={c.full_name}
                            className="w-11 h-11 rounded-full object-cover border-2 border-gray-600 group-hover:border-amber-500/50 transition-colors"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-full bg-gray-700 flex items-center justify-center border-2 border-gray-600 group-hover:border-amber-500/50 transition-colors">
                            <User size={18} className="text-gray-400" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold text-sm truncate">{c.full_name}</p>
                          <div className="flex items-center gap-3 mt-0.5">
                            <span className="text-gray-400 text-xs flex items-center gap-1">
                              <Phone size={11} /> {c.mobile}
                            </span>
                            <span className="text-gray-400 text-xs flex items-center gap-1 hidden sm:flex">
                              <Mail size={11} /> {c.email}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded-md">{c.category}</span>
                          <ChevronRight size={18} className="text-gray-600 group-hover:text-amber-500 transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Scored candidates */}
        <div>
          <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
            <CheckCircle size={22} className="text-emerald-500" />
            Scored Candidates
            <span className="text-sm text-gray-400 font-normal ml-2">({scores.length})</span>
          </h2>

          {scores.length === 0 ? (
            <div className="text-center py-16 border border-gray-800/50 rounded-2xl bg-gray-900/30">
              <Scale size={56} className="mx-auto mb-4 text-gray-700" />
              <p className="text-gray-400 text-lg">No scores yet</p>
              <p className="text-gray-600 text-sm mt-1">Search for a contestant to start scoring</p>
            </div>
          ) : (
            <div className="space-y-3">
              {scores.map((score) => {
                const isEditable = editableScoreId === score.id && !score.is_locked;
                const remainingTime = editTimers[score.id] || 0;

                return (
                  <div
                    key={score.id}
                    className={`bg-gradient-to-r rounded-xl border overflow-hidden transition-all ${
                      isEditable
                        ? 'from-amber-500/5 to-orange-500/5 border-amber-500/30'
                        : 'from-gray-800/40 to-gray-900/40 border-gray-700/40'
                    }`}
                  >
                    <div className="p-4 sm:p-5">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Candidate info */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {score.candidate_profile_image ? (
                            <img
                              src={score.candidate_profile_image}
                              alt={score.candidate_name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-gray-600"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                              <User size={18} className="text-gray-400" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-white font-semibold text-sm truncate">{score.candidate_name}</p>
                            <p className="text-gray-500 text-xs">{score.candidate_category}</p>
                          </div>
                        </div>

                        {/* Score breakdown */}
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <ScorePill label="Vocal" value={score.vocal_quality} max={4} color="blue" />
                          <ScorePill label="Stage" value={score.stage_presence} max={3} color="amber" />
                          <ScorePill label="Song" value={score.song_choice} max={2} color="emerald" />
                          <ScorePill label="Impact" value={score.overall_impact} max={1} color="rose" />

                          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 px-3 py-1.5 rounded-lg">
                            <span className="text-amber-500 font-bold text-sm">{score.total_score.toFixed(1)}</span>
                            <span className="text-gray-500 text-xs">/10</span>
                          </div>
                        </div>

                        {/* Action */}
                        <div className="flex items-center gap-2 sm:ml-2">
                          {isEditable ? (
                            <>
                              <button
                                onClick={() => handleEditScore(score)}
                                className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-400 text-black rounded-lg text-xs font-bold transition-colors"
                              >
                                <Pencil size={14} />
                                Edit
                              </button>
                              <div className="flex items-center gap-1 text-amber-400 text-xs font-medium min-w-[52px]">
                                <Clock size={13} />
                                {remainingTime}s
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                              <Lock size={14} />
                              <span>Locked</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScorePill({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
  };

  return (
    <div className={`px-2 py-1 rounded-md border text-xs font-medium ${colorMap[color] || colorMap.blue}`}>
      <span className="text-gray-400">{label}</span>{' '}
      <span className="font-bold">{value}</span>
      <span className="text-gray-600">/{max}</span>
    </div>
  );
}
