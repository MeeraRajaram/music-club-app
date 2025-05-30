'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import AnimatedSection from '../layout/AnimatedSection';
import GalleryItem from '../ui/GalleryItem';
import { GalleryItem as GalleryItemType } from '../../data/gallery2024';

interface GallerySectionProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  showViewFullButton?: boolean;
  showAllImages?: boolean;
  showFilters?: boolean;
  driveButton?: React.ReactNode;
  items: GalleryItemType[];
}

const filterButtons = [
  { id: 'all', label: 'All' },
  { id: 'performances', label: 'Performances' },
  { id: 'workshops', label: 'Workshops' },
  { id: 'jams', label: 'Jam Sessions' },
  { id: 'covers', label: 'Covers' },
  { id: 'team', label: 'The Team Pictures' },
];

const GallerySection = ({ 
  activeFilter, 
  setActiveFilter,
  showViewFullButton = true,
  showAllImages = false,
  showFilters = false,
  driveButton,
  items
}: GallerySectionProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter gallery items based on active filter
  const filteredGalleryItems = activeFilter === 'all' 
    ? items 
    : items.filter(item => item.category === activeFilter);

  // If not showing all images, limit to 3 items
  const displayItems = showAllImages ? filteredGalleryItems : filteredGalleryItems.slice(0, 3);

  return (
    <AnimatedSection id="gallery" className="bg-gradient-to-b from-gray-900 to-gray-800 py-20">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
            Our Gallery
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            Explore moments captured during our various musical events and activities
          </p>
          {driveButton && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              {driveButton}
            </motion.div>
          )}
        </motion.div>
        
        {/* Gallery Filters */}
        {showFilters && (
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filterButtons.map((button, index) => (
              <motion.button
                key={button.id}
                onClick={() => setActiveFilter(button.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2.5 rounded-full transition-all duration-300 ${
                  activeFilter === button.id
                    ? 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {button.label}
              </motion.button>
            ))}
          </motion.div>
        )}
        
        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={isMounted ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`grid gap-8 ${
              activeFilter === 'team' 
                ? 'grid-cols-1' 
                : activeFilter === 'jams'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-auto'
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {displayItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={activeFilter === 'team' ? 'w-full' : ''}
              >
                <GalleryItem item={item} isTeamPicture={activeFilter === 'team'} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        {showViewFullButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link 
              href="/gallery" 
              className="inline-flex items-center px-8 py-3 rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold hover:from-primary-700 hover:to-secondary-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View Full Gallery
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </motion.div>
        )}

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </AnimatedSection>
  );
};

export default GallerySection;
