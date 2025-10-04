/**
 * UserComparison Component (BONUS)
 * 
 * Allows comparing two Codeforces users side by side
 * Displays rating, rank, problems solved, and other stats
 * Highlights the better performer in each category
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Loader2, Trophy, Code, TrendingUp } from 'lucide-react';
import { getUserInfo, getUserSubmissions } from '../services/codeforcesService';
import { RATING_COLORS } from '../config/api';

const UserComparison = () => {
  const [handle1, setHandle1] = useState('');
  const [handle2, setHandle2] = useState('');
  const [user1Data, setUser1Data] = useState(null);
  const [user2Data, setUser2Data] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handle comparison - fetches both users' data
   */
  const handleCompare = async () => {
    if (!handle1.trim() || !handle2.trim()) {
      setError('Please enter both handles');
      return;
    }

    setLoading(true);
    setError('');
    setUser1Data(null);
    setUser2Data(null);

    try {
      // Fetch both users' data in parallel
      const [user1Info, user2Info, user1Solved, user2Solved] = await Promise.all([
        getUserInfo(handle1.trim()),
        getUserInfo(handle2.trim()),
        getUserSubmissions(handle1.trim()),
        getUserSubmissions(handle2.trim())
      ]);

      setUser1Data({ ...user1Info, problemsSolved: user1Solved });
      setUser2Data({ ...user2Info, problemsSolved: user2Solved });
    } catch (err) {
      setError(err.message || 'Failed to fetch user data. Please check the handles.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Determine which value is better and return styling
   */
  const getBetterStyle = (val1, val2, higherIsBetter = true) => {
    if (val1 === val2) return '';
    const isBetter = higherIsBetter ? val1 > val2 : val1 < val2;
    return isBetter ? 'ring-2 ring-green-500' : '';
  };

  /**
   * Render stat card for comparison
   */
  const StatCard = ({ label, value1, value2, icon: Icon, color1, color2, higherIsBetter = true }) => (
    <div className="grid grid-cols-2 gap-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`bg-gray-800/50 rounded-xl p-4 border border-gray-700 ${getBetterStyle(value1, value2, higherIsBetter)}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-cf-blue" />
          <span className="text-gray-400 text-xs">{label}</span>
        </div>
        <p className="text-2xl font-bold" style={{ color: color1 || '#fff' }}>
          {value1 || 'N/A'}
        </p>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`bg-gray-800/50 rounded-xl p-4 border border-gray-700 ${getBetterStyle(value2, value1, higherIsBetter)}`}
      >
        <div className="flex items-center gap-2 mb-2">
          <Icon className="w-4 h-4 text-cf-blue" />
          <span className="text-gray-400 text-xs">{label}</span>
        </div>
        <p className="text-2xl font-bold" style={{ color: color2 || '#fff' }}>
          {value2 || 'N/A'}
        </p>
      </motion.div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-gradient-to-br from-cf-gray to-cf-dark rounded-2xl shadow-2xl p-8 border border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-8 h-8 text-cf-blue" />
        <h2 className="text-3xl font-bold text-white">User Comparison</h2>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          value={handle1}
          onChange={(e) => setHandle1(e.target.value)}
          placeholder="First user handle"
          className="px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-cf-blue focus:outline-none focus:ring-2 focus:ring-cf-blue/50 transition-all"
        />
        <input
          type="text"
          value={handle2}
          onChange={(e) => setHandle2(e.target.value)}
          placeholder="Second user handle"
          className="px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-cf-blue focus:outline-none focus:ring-2 focus:ring-cf-blue/50 transition-all"
        />
      </div>

      {/* Compare Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleCompare}
        disabled={loading}
        className="w-full px-6 py-3 bg-cf-blue hover:bg-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Search className="w-5 h-5" />
        )}
        Compare Users
      </motion.button>

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

      {/* Comparison Results */}
      {user1Data && user2Data && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* User Headers */}
          <div className="grid grid-cols-2 gap-4 pb-6 border-b border-gray-700">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-1">
                {user1Data.firstName && user1Data.lastName
                  ? `${user1Data.firstName} ${user1Data.lastName}`
                  : user1Data.handle}
              </h3>
              <p className="text-gray-400">@{user1Data.handle}</p>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-1">
                {user2Data.firstName && user2Data.lastName
                  ? `${user2Data.firstName} ${user2Data.lastName}`
                  : user2Data.handle}
              </h3>
              <p className="text-gray-400">@{user2Data.handle}</p>
            </div>
          </div>

          {/* Stats Comparison */}
          <div className="space-y-4">
            <StatCard
              label="Current Rating"
              value1={user1Data.rating || 0}
              value2={user2Data.rating || 0}
              icon={TrendingUp}
              color1={RATING_COLORS.getColor(user1Data.rating || 0)}
              color2={RATING_COLORS.getColor(user2Data.rating || 0)}
            />

            <StatCard
              label="Max Rating"
              value1={user1Data.maxRating || 0}
              value2={user2Data.maxRating || 0}
              icon={Trophy}
              color1={RATING_COLORS.getColor(user1Data.maxRating || 0)}
              color2={RATING_COLORS.getColor(user2Data.maxRating || 0)}
            />

            <StatCard
              label="Problems Solved"
              value1={user1Data.problemsSolved}
              value2={user2Data.problemsSolved}
              icon={Code}
            />

            <StatCard
              label="Contribution"
              value1={user1Data.contribution || 0}
              value2={user2Data.contribution || 0}
              icon={Users}
            />
          </div>

          {/* Winner Declaration */}
          <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-green-500/50 text-center">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white mb-2">Overall Winner</h3>
            <p className="text-2xl font-bold text-green-400">
              {(user1Data.rating || 0) > (user2Data.rating || 0)
                ? user1Data.handle
                : (user2Data.rating || 0) > (user1Data.rating || 0)
                ? user2Data.handle
                : "It's a tie!"}
            </p>
            <p className="text-sm text-gray-400 mt-2">Based on current rating</p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserComparison;
