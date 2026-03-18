/**
 * ProblemExplorer Component
 * 
 * Lists Codeforces problems with tags and difficulty ratings
 * Includes search and filter functionality for tags and ratings
 * Implements pagination for better performance
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Search, Filter, Loader2, Tag, TrendingUp } from 'lucide-react';
import { getProblems } from '../services/codeforcesService';

const ProblemExplorer = () => {
  const [problems, setProblems] = useState([]);
  const [filteredProblems, setFilteredProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [allTags, setAllTags] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const problemsPerPage = 20;

  /**
   * Fetch problems on component mount
   */
  useEffect(() => {
    fetchProblems();
  }, []);

  /**
   * Apply filters whenever filter states change
   */
  useEffect(() => {
    applyFilters();
  }, [problems, searchTerm, selectedTag, selectedRating]);

  const fetchProblems = async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getProblems();
      setProblems(data);
      
      // Extract unique tags
      const tags = new Set();
      data.forEach(problem => {
        problem.tags?.forEach(tag => tags.add(tag));
      });
      setAllTags(Array.from(tags).sort());
    } catch (err) {
      setError('Failed to load problems. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Apply search and filter logic
   */
  const applyFilters = () => {
    let filtered = [...problems];

    // Search by name
    if (searchTerm) {
      filtered = filtered.filter(problem =>
        problem.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by tag
    if (selectedTag) {
      filtered = filtered.filter(problem =>
        problem.tags?.includes(selectedTag)
      );
    }

    // Filter by rating
    if (selectedRating) {
      filtered = filtered.filter(problem =>
        problem.rating === parseInt(selectedRating)
      );
    }

    setFilteredProblems(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
    setSelectedRating('');
  };

  // Pagination logic
  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = filteredProblems.slice(indexOfFirstProblem, indexOfLastProblem);
  const totalPages = Math.ceil(filteredProblems.length / problemsPerPage);

  /**
   * Get color based on problem rating
   */
  const getRatingColor = (rating) => {
    if (!rating) return 'text-gray-400';
    if (rating >= 2400) return 'text-red-500';
    if (rating >= 2000) return 'text-orange-500';
    if (rating >= 1600) return 'text-purple-500';
    if (rating >= 1200) return 'text-blue-500';
    return 'text-green-500';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-br from-cf-gray to-cf-dark rounded-2xl shadow-2xl p-8 border border-gray-700"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Code2 className="w-8 h-8 text-cf-blue" />
        <h2 className="text-3xl font-bold text-white">Problem Explorer</h2>
      </div>

      {/* Filters */}
      <div className="space-y-4 mb-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search problems by name..."
            className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-cf-blue focus:outline-none focus:ring-2 focus:ring-cf-blue/50 transition-all"
          />
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap gap-3">
          {/* Tag Filter */}
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-cf-blue focus:outline-none focus:ring-2 focus:ring-cf-blue/50 transition-all"
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>

          {/* Rating Filter */}
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-cf-blue focus:outline-none focus:ring-2 focus:ring-cf-blue/50 transition-all"
          >
            <option value="">All Ratings</option>
            {[800, 900, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100, 2200, 2300, 2400, 2500, 2600, 2700, 2800, 2900, 3000].map(rating => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>

          {/* Clear Filters Button */}
          {(searchTerm || selectedTag || selectedRating) && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearFilters}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-semibold transition-colors"
            >
              Clear Filters
            </motion.button>
          )}

          {/* Results Count */}
          <div className="ml-auto flex items-center gap-2 text-gray-400 text-sm">
            <Filter className="w-4 h-4" />
            <span>{filteredProblems.length} problems found</span>
          </div>
        </div>
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

      {/* Problems List */}
      {!loading && !error && (
        <>
          <div className="space-y-3 mb-6 max-h-[600px] overflow-y-auto custom-scrollbar">
            {currentProblems.map((problem, index) => (
              <motion.div
                key={`${problem.contestId}-${problem.index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                whileHover={{ scale: 1.01 }}
                className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 hover:border-cf-blue transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {/* Problem Name */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-gray-400 font-mono text-sm">
                        {problem.contestId}{problem.index}
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {problem.name}
                      </h3>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {problem.tags?.slice(0, 5).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-cf-blue/20 text-cf-blue rounded text-xs font-semibold flex items-center gap-1"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Problem Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      {problem.rating && (
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          <span className={`font-semibold ${getRatingColor(problem.rating)}`}>
                            {problem.rating}
                          </span>
                        </div>
                      )}
                      {problem.type && (
                        <span className="text-gray-500">{problem.type}</span>
                      )}
                    </div>
                  </div>

                  {/* Solved Count */}
                  {problem.solvedCount !== undefined && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-500">
                        ✓ {problem.solvedCount}
                      </div>
                      <div className="text-xs text-gray-400">solved</div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Empty State */}
            {currentProblems.length === 0 && (
              <div className="text-center py-12 text-gray-400">
                <Code2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No problems found matching your filters</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </motion.button>

              <span className="text-gray-400 px-4">
                Page {currentPage} of {totalPages}
              </span>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </motion.button>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
};

export default ProblemExplorer;
