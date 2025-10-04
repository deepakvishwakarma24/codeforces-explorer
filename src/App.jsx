/**
 * Main App Component
 * 
 * Single-page layout that renders all components:
 * - Hero section with project description
 * - UserInfo component for handle lookup
 * - ContestInfo component for contest listings
 * - ProblemExplorer component for problem browsing
 * - UserComparison component (bonus feature)
 * - RatingChart component (bonus feature)
 */

import { motion } from 'framer-motion';
import { Code2, Github, ExternalLink } from 'lucide-react';
import UserInfo from './components/UserInfo';
import ContestInfo from './components/ContestInfo';
import ProblemExplorer from './components/ProblemExplorer';
import UserComparison from './components/UserComparison';
import RatingChart from './components/RatingChart';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cf-dark via-gray-900 to-cf-dark">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Logo/Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cf-blue to-blue-600 rounded-2xl mb-6 shadow-2xl"
            >
              <Code2 className="w-10 h-10 text-white" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl md:text-6xl font-bold text-white mb-4"
            >
              Codeforces Explorer
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-6"
            >
              Built for DJS CODESTARS 2026 Interview
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-400 text-lg max-w-2xl mx-auto mb-8"
            >
              A modern, responsive React web app that integrates with the official Codeforces API
              to explore user profiles, contests, and problems. Features include user lookup,
              contest information, problem explorer, user comparison, and rating history charts.
            </motion.p>

            {/* Tech Stack Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-8"
            >
              {['React', 'TailwindCSS', 'Framer Motion', 'Recharts', 'Axios', 'Vite'].map((tech, index) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full text-sm font-semibold text-gray-300 hover:border-cf-blue transition-colors"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <a
                href="https://codeforces.com/apiHelp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-cf-blue hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                <ExternalLink className="w-5 h-5" />
                Codeforces API Docs
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors border border-gray-700"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </a>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-cf-blue rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 space-y-12">
        {/* Core Features Section */}
        <section>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <div className="w-1 h-8 bg-cf-blue rounded-full"></div>
            Core Features
          </motion.h2>
          
          <div className="space-y-8">
            <UserInfo />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ContestInfo />
              <ProblemExplorer />
            </div>
          </div>
        </section>

        {/* Bonus Features Section */}
        <section>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
          >
            <div className="w-1 h-8 bg-purple-500 rounded-full"></div>
            Bonus Features
          </motion.h2>
          
          <div className="space-y-8">
            <UserComparison />
            <RatingChart />
          </div>
        </section>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-8 mt-12 border-t border-gray-800"
      >
        <div className="text-center text-gray-400">
          <p className="mb-2">
            Built with ❤️ for <span className="text-cf-blue font-semibold">DJS CODESTARS 2026</span>
          </p>
          <p className="text-sm">
            Powered by{' '}
            <a
              href="https://codeforces.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cf-blue hover:underline"
            >
              Codeforces API
            </a>
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
