/**
 * RatingChart Component (BONUS)
 * 
 * Displays a user's rating changes over time using Recharts
 * Shows rating progression across contests
 * Interactive chart with tooltips
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Search, Loader2 } from 'lucide-react';
import { getUserRating } from '../services/codeforcesService';
import { RATING_COLORS } from '../config/api';

const RatingChart = () => {
  const [handle, setHandle] = useState('');
  const [ratingData, setRatingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handle rating chart fetch
   */
  const handleFetchRating = async () => {
    if (!handle.trim()) {
      setError('Please enter a valid handle');
      return;
    }

    setLoading(true);
    setError('');
    setRatingData([]);

    try {
      const data = await getUserRating(handle.trim());
      
      if (data.length === 0) {
        setError('No rating history found for this user');
        return;
      }

      // Transform data for chart
      const chartData = data.map((contest, index) => ({
        contestName: contest.contestName,
        rating: contest.newRating,
        oldRating: contest.oldRating,
        rank: contest.rank,
        date: new Date(contest.ratingUpdateTimeSeconds * 1000).toLocaleDateString(),
        contestId: contest.contestId,
        index: index + 1
      }));

      setRatingData(chartData);
    } catch (err) {
      setError('Failed to fetch rating history');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle Enter key press
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFetchRating();
    }
  };

  /**
   * Custom tooltip for chart
   */
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-xl">
          <p className="text-white font-bold mb-1">{data.contestName}</p>
          <p className="text-sm text-gray-400 mb-2">{data.date}</p>
          <div className="space-y-1">
            <p className="text-sm">
              <span className="text-gray-400">Rating: </span>
              <span className="font-bold" style={{ color: RATING_COLORS.getColor(data.rating) }}>
                {data.rating}
              </span>
            </p>
            <p className="text-sm">
              <span className="text-gray-400">Change: </span>
              <span className={`font-bold ${data.rating - data.oldRating >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {data.rating - data.oldRating >= 0 ? '+' : ''}{data.rating - data.oldRating}
              </span>
            </p>
            <p className="text-sm">
              <span className="text-gray-400">Rank: </span>
              <span className="text-white font-bold">{data.rank}</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  /**
   * Calculate statistics
   */
  const getStats = () => {
    if (ratingData.length === 0) return null;

    const currentRating = ratingData[ratingData.length - 1].rating;
    const maxRating = Math.max(...ratingData.map(d => d.rating));
    const minRating = Math.min(...ratingData.map(d => d.rating));
    const totalChange = currentRating - ratingData[0].oldRating;

    return { currentRating, maxRating, minRating, totalChange, contests: ratingData.length };
  };

  const stats = getStats();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gradient-to-br from-cf-gray to-cf-dark rounded-2xl shadow-2xl p-8 border border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-8 h-8 text-cf-blue" />
        <h2 className="text-3xl font-bold text-white">Rating History Chart</h2>
      </div>

      {/* Search Input */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter Codeforces handle"
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-cf-blue focus:outline-none focus:ring-2 focus:ring-cf-blue/50 transition-all"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleFetchRating}
          disabled={loading}
          className="px-6 py-3 bg-cf-blue hover:bg-blue-600 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          Show Chart
        </motion.button>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6"
        >
          {error}
        </motion.div>
      )}

      {/* Statistics */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6"
        >
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-xs mb-1">Current</p>
            <p className="text-2xl font-bold" style={{ color: RATING_COLORS.getColor(stats.currentRating) }}>
              {stats.currentRating}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-xs mb-1">Max</p>
            <p className="text-2xl font-bold text-green-500">{stats.maxRating}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-xs mb-1">Min</p>
            <p className="text-2xl font-bold text-red-500">{stats.minRating}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-xs mb-1">Total Change</p>
            <p className={`text-2xl font-bold ${stats.totalChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stats.totalChange >= 0 ? '+' : ''}{stats.totalChange}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <p className="text-gray-400 text-xs mb-1">Contests</p>
            <p className="text-2xl font-bold text-cf-blue">{stats.contests}</p>
          </div>
        </motion.div>
      )}

      {/* Chart */}
      {ratingData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-800/30 rounded-xl p-6 border border-gray-700"
        >
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={ratingData}>
              <defs>
                <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1E88E5" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1E88E5" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="index" 
                stroke="#9CA3AF"
                label={{ value: 'Contest Number', position: 'insideBottom', offset: -5, fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                label={{ value: 'Rating', angle: -90, position: 'insideLeft', fill: '#9CA3AF' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="rating" 
                stroke="#1E88E5" 
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRating)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && !error && ratingData.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <TrendingUp className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Enter a handle to view rating history</p>
        </div>
      )}
    </motion.div>
  );
};

export default RatingChart;
