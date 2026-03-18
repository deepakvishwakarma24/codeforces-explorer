/**
 * Codeforces API Service
 * 
 * This service handles all API calls to the Codeforces API
 * using Axios for HTTP requests with error handling
 */

import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

/**
 * Fetch user information by handle
 * @param {string} handle - Codeforces user handle
 * @returns {Promise} User data object
 */
export const getUserInfo = async (handle) => {
  try {
    const response = await axios.get(API_ENDPOINTS.USER_INFO(handle));
    if (response.data.status === 'OK') {
      return response.data.result[0];
    }
    throw new Error('User not found');
  } catch (error) {
    throw new Error(error.response?.data?.comment || 'Failed to fetch user info');
  }
};

/**
 * Fetch user rating history
 * @param {string} handle - Codeforces user handle
 * @returns {Promise} Array of rating change objects
 */
export const getUserRating = async (handle) => {
  try {
    const response = await axios.get(API_ENDPOINTS.USER_RATING(handle));
    if (response.data.status === 'OK') {
      return response.data.result;
    }
    return [];
  } catch (error) {
    console.error('Failed to fetch rating history:', error);
    return [];
  }
};

/**
 * Fetch user submission status to calculate problems solved
 * @param {string} handle - Codeforces user handle
 * @returns {Promise} Number of unique problems solved
 */
export const getUserSubmissions = async (handle) => {
  try {
    const response = await axios.get(API_ENDPOINTS.USER_STATUS(handle, 1, 10000));
    if (response.data.status === 'OK') {
      // Filter only accepted submissions and count unique problems
      const acceptedSubmissions = response.data.result.filter(
        submission => submission.verdict === 'OK'
      );
      
      // Create a set of unique problem IDs
      const uniqueProblems = new Set(
        acceptedSubmissions.map(sub => `${sub.problem.contestId}-${sub.problem.index}`)
      );
      
      return uniqueProblems.size;
    }
    return 0;
  } catch (error) {
    console.error('Failed to fetch submissions:', error);
    return 0;
  }
};

/**
 * Fetch contest list (upcoming and past)
 * @returns {Promise} Object with upcoming and past contests
 */
export const getContests = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.CONTEST_LIST());
    if (response.data.status === 'OK') {
      const contests = response.data.result;
      const now = Math.floor(Date.now() / 1000);
      
      // Separate upcoming and past contests
      const upcoming = contests
        .filter(contest => contest.phase === 'BEFORE')
        .sort((a, b) => a.startTimeSeconds - b.startTimeSeconds);
      
      const past = contests
        .filter(contest => contest.phase === 'FINISHED')
        .sort((a, b) => b.startTimeSeconds - a.startTimeSeconds)
        .slice(0, 20); // Get last 20 past contests
      
      return { upcoming, past };
    }
    throw new Error('Failed to fetch contests');
  } catch (error) {
    throw new Error('Failed to fetch contests');
  }
};

/**
 * Fetch problemset with tags and ratings
 * @returns {Promise} Array of problems
 */
export const getProblems = async () => {
  try {
    const response = await axios.get(API_ENDPOINTS.PROBLEMSET_PROBLEMS());
    if (response.data.status === 'OK') {
      return response.data.result.problems;
    }
    throw new Error('Failed to fetch problems');
  } catch (error) {
    throw new Error('Failed to fetch problems');
  }
};
