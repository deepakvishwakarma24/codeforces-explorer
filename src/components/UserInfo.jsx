/**
 * UserInfo Component
 * 
 * Allows users to search for a Codeforces handle and displays:
 * - Username, rating, rank, and number of problems solved
 * - Uses state management with useState for input and data
 * - Implements error handling for invalid handles
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, User, Trophy, Code, TrendingUp, Loader2 } from 'lucide-react';
import { getUserInfo, getUserSubmissions } from '../services/codeforcesService';
import { RATING_COLORS } from '../config/api';

const UserInfo = () => {
  const [handle, setHandle] = useState('');
  const [userData, setUserData] = useState(null);
  const [problemsSolved, setProblemsSolved] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Handle user search - fetches user info and problems solved
   */
  const handleSearch = async () => {
    if (!handle.trim()) {
      setError('Please enter a valid handle');
      return;
    }

    setLoading(true);
    setError('');
    setUserData(null);

    try {
      // Fetch user info and submissions in parallel
      const [userInfo, solvedCount] = await Promise.all([
        getUserInfo(handle.trim()),
        getUserSubmissions(handle.trim())
      ]);

      setUserData(userInfo);
      setProblemsSolved(solvedCount);
    } catch (err) {
      setError(err.message || 'User not found. Please check the handle.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle Enter key press for search
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-cf-gray to-cf-dark rounded-2xl shadow-2xl p-8 border border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <User className="w-8 h-8 text-cf-blue" />
        <h2 className="text-3xl font-bold text-white">User Info Lookup</h2>
      </div>

      {/* Search Input */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <input
            type="text"
            value={handle}
            onChange={(e) => setHandle(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter Codeforces handle (e.g., tourist)"
            className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-cf-blue focus:outline-none focus:ring-2 focus:ring-cf-blue/50 transition-all"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-3 bg-cf-blue hover:bg-blue-600 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Search className="w-5 h-5" />
          )}
          Search
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

      {/* User Data Display */}
      {userData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* User Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-gray-700">
            {userData.titlePhoto && (
              <img
                src={userData.titlePhoto}
                alt={userData.handle}
                className="w-20 h-20 rounded-full border-4 border-cf-blue"
              />
            )}
            <div>
              <h3 className="text-2xl font-bold text-white">
                {userData.firstName && userData.lastName
                  ? `${userData.firstName} ${userData.lastName}`
                  : userData.handle}
              </h3>
              <p className="text-gray-400">@{userData.handle}</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Rating */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-cf-blue" />
                <span className="text-gray-400 text-sm">Rating</span>
              </div>
              <p
                className="text-3xl font-bold"
                style={{ color: RATING_COLORS.getColor(userData.rating || 0) }}
              >
                {userData.rating || 'Unrated'}
              </p>
            </motion.div>

            {/* Rank */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="text-gray-400 text-sm">Rank</span>
              </div>
              <p
                className="text-xl font-bold"
                style={{ color: RATING_COLORS.getColor(userData.rating || 0) }}
              >
                {userData.rank || 'Unrated'}
              </p>
            </motion.div>

            {/* Max Rating */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-gray-400 text-sm">Max Rating</span>
              </div>
              <p
                className="text-3xl font-bold"
                style={{ color: RATING_COLORS.getColor(userData.maxRating || 0) }}
              >
                {userData.maxRating || 'N/A'}
              </p>
            </motion.div>

            {/* Problems Solved */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800/50 rounded-xl p-4 border border-gray-700"
            >
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-5 h-5 text-purple-500" />
                <span className="text-gray-400 text-sm">Problems Solved</span>
              </div>
              <p className="text-3xl font-bold text-white">{problemsSolved}</p>
            </motion.div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-800/30 rounded-xl p-4 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {userData.country && (
                <div>
                  <span className="text-gray-400">Country:</span>
                  <span className="text-white ml-2">{userData.country}</span>
                </div>
              )}
              {userData.city && (
                <div>
                  <span className="text-gray-400">City:</span>
                  <span className="text-white ml-2">{userData.city}</span>
                </div>
              )}
              {userData.organization && (
                <div>
                  <span className="text-gray-400">Organization:</span>
                  <span className="text-white ml-2">{userData.organization}</span>
                </div>
              )}
              <div>
                <span className="text-gray-400">Contribution:</span>
                <span className="text-white ml-2">{userData.contribution || 0}</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UserInfo;
