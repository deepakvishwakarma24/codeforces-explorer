/**
 * ContestInfo Component
 * 
 * Displays upcoming and past Codeforces contests
 * Shows contest name, start time, and duration
 * Uses tabs to switch between upcoming and past contests
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Trophy, Loader2 } from 'lucide-react';
import { getContests } from '../services/codeforcesService';

const ContestInfo = () => {
  const [contests, setContests] = useState({ upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('upcoming'); // 'upcoming' or 'past'

  /**
   * Fetch contests on component mount
   */
  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getContests();
      setContests(data);
    } catch (err) {
      setError('Failed to load contests. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Format Unix timestamp to readable date
   */
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  /**
   * Format duration in seconds to hours and minutes
   */
  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  /**
   * Get time until contest starts
   */
  const getTimeUntil = (timestamp) => {
    const now = Math.floor(Date.now() / 1000);
    const diff = timestamp - now;
    
    if (diff < 0) return 'Started';
    
    const days = Math.floor(diff / 86400);
    const hours = Math.floor((diff % 86400) / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    
    if (days > 0) return `in ${days}d ${hours}h`;
    if (hours > 0) return `in ${hours}h ${minutes}m`;
    return `in ${minutes}m`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="bg-gradient-to-br from-cf-gray to-cf-dark rounded-2xl shadow-2xl p-8 border border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-cf-blue" />
          <h2 className="text-3xl font-bold text-white">Contest Info</h2>
        </div>
        
        {/* Refresh Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={fetchContests}
          disabled={loading}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm transition-colors disabled:opacity-50"
        >
          Refresh
        </motion.button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-gray-800/50 p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
            activeTab === 'upcoming'
              ? 'bg-cf-blue text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Upcoming ({contests.upcoming.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
            activeTab === 'past'
              ? 'bg-cf-blue text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Past ({contests.past.length})
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-cf-blue animate-spin" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Contest List */}
      {!loading && !error && (
        <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
          {(activeTab === 'upcoming' ? contests.upcoming : contests.past).map((contest, index) => (
            <motion.div
              key={contest.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 hover:border-cf-blue transition-all cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Contest Name */}
                  <h3 className="text-lg font-bold text-white mb-2">
                    {contest.name}
                  </h3>

                  {/* Contest Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(contest.startTimeSeconds)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Duration: {formatDuration(contest.durationSeconds)}</span>
                    </div>
                  </div>
                </div>

                {/* Contest Status Badge */}
                <div className="flex flex-col items-end gap-2">
                  {activeTab === 'upcoming' && (
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold">
                      {getTimeUntil(contest.startTimeSeconds)}
                    </span>
                  )}
                  
                  {contest.type && (
                    <span className="px-3 py-1 bg-cf-blue/20 text-cf-blue rounded-full text-xs font-semibold">
                      {contest.type}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Empty State */}
          {(activeTab === 'upcoming' ? contests.upcoming : contests.past).length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No {activeTab} contests found</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ContestInfo;
