/**
 * Codeforces API Configuration
 * 
 * This file contains the base URL and endpoint configurations
 * for the Codeforces API (https://codeforces.com/apiHelp)
 */

// Base URL from environment variable or fallback to default
export const API_BASE_URL = import.meta.env.VITE_CODEFORCES_API_BASE_URL || 'https://codeforces.com/api';

/**
 * API Endpoints for Codeforces
 */
export const API_ENDPOINTS = {
  // User-related endpoints
  USER_INFO: (handle) => `${API_BASE_URL}/user.info?handles=${handle}`,
  USER_RATING: (handle) => `${API_BASE_URL}/user.rating?handle=${handle}`,
  USER_STATUS: (handle, from = 1, count = 100) => `${API_BASE_URL}/user.status?handle=${handle}&from=${from}&count=${count}`,
  
  // Contest-related endpoints
  CONTEST_LIST: () => `${API_BASE_URL}/contest.list`,
  
  // Problem-related endpoints
  PROBLEMSET_PROBLEMS: () => `${API_BASE_URL}/problemset.problems`,
};

/**
 * Rating color mapping based on Codeforces rating system
 */
export const RATING_COLORS = {
  getColor: (rating) => {
    if (rating >= 3000) return '#FF0000'; // Legendary Grandmaster (red)
    if (rating >= 2600) return '#FF0000'; // International Grandmaster (red)
    if (rating >= 2400) return '#FF8C00'; // Grandmaster (orange)
    if (rating >= 2300) return '#FF8C00'; // International Master (orange)
    if (rating >= 2100) return '#AA00AA'; // Master (violet)
    if (rating >= 1900) return '#AA00AA'; // Candidate Master (violet)
    if (rating >= 1600) return '#0000FF'; // Expert (blue)
    if (rating >= 1400) return '#03A89E'; // Specialist (cyan)
    if (rating >= 1200) return '#008000'; // Pupil (green)
    return '#808080'; // Newbie (gray)
  },
  getRank: (rating) => {
    if (rating >= 3000) return 'Legendary Grandmaster';
    if (rating >= 2600) return 'International Grandmaster';
    if (rating >= 2400) return 'Grandmaster';
    if (rating >= 2300) return 'International Master';
    if (rating >= 2100) return 'Master';
    if (rating >= 1900) return 'Candidate Master';
    if (rating >= 1600) return 'Expert';
    if (rating >= 1400) return 'Specialist';
    if (rating >= 1200) return 'Pupil';
    return 'Newbie';
  }
};
