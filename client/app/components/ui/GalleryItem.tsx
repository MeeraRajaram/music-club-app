'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCamera, FaPlay } from 'react-icons/fa';
import { GalleryItem as GalleryItemType } from '../../data/gallery';
import { useState, useEffect } from 'react';
import Modal from './Modal';
import { usePathname } from 'next/navigation';

interface GalleryItemProps {
  item: GalleryItemType;
  isTeamPicture?: boolean;
}

const getCategoryDisplayName = (category: string): string => {
  const categoryMap: { [key: string]: string } = {
    'performances': 'Performances',
    'jams': 'Jam Sessions',
    'workshops': 'Workshops',
    'team': 'Team',
    'covers': 'Covers',
    'competitions': 'Competitions'
  };
  return categoryMap[category] || category;
};

const GalleryItem = ({ item, isTeamPicture = false }: GalleryItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const isEventGallery = pathname.startsWith('/events/');

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (item.type === 'video') {
      setIsModalOpen(true);
    } else {
      setIsContentVisible(!isContentVisible);
    }
  };

  const handleCardClick = () => {
    if (!isEventGallery) {
      setIsContentVisible(!isContentVisible);
    }
  };

  // Video Play Button component
  const PlayButton = () => (
    <div className="absolute top-4 right-4 z-[3]" onClick={handleClick}>
      <div className={`w-10 h-10 ${isEventGallery ? 'bg-white/20' : 'bg-black/40'} backdrop-blur-sm rounded-full flex items-center justify-center ${isEventGallery ? 'group-hover:bg-white/30' : 'group-hover:bg-primary-500/50'} transition-all duration-300`}>
        <FaPlay className="w-4 h-4 text-white" />
      </div>
    </div>
  );

  // Reset content visibility when route changes
  useEffect(() => {
    setIsContentVisible(false);
    setIsHovered(false);
  }, [pathname]);

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className={`group relative bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer ${
          isTeamPicture ? 'h-auto' : 'h-64'
        }`}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`relative ${isTeamPicture ? 'h-auto' : 'h-64'} w-full overflow-hidden`}>
          {!isTeamPicture && (
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent z-[1]" />
          )}
          
          {isTeamPicture ? (
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-2xl mx-auto">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={800}
                  height={600}
                  style={{ 
                    objectFit: 'contain',
                    width: '100%',
                    height: 'auto',
                    borderRadius: '1rem'
                  }}
                  className="transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          ) : (
            <Image
              src={item.image}
              alt={item.title}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-2xl transform group-hover:scale-110 transition-transform duration-700"
            />
          )}
          
          {/* Video Play Button Overlay */}
          {item.type === 'video' && <PlayButton />}
          
          {/* Overlay content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: isEventGallery 
                ? (isHovered ? 1 : 0) 
                : (isContentVisible || isHovered ? 1 : 0)
            }}
            transition={{ duration: 0.2 }}
            className={`absolute inset-0 z-[2] flex flex-col ${
              isTeamPicture ? 'justify-end' : 'items-center justify-center'
            } p-6 text-white ${
              isEventGallery 
                ? 'bg-black/60' 
                : isTeamPicture 
                  ? 'bg-transparent' 
                  : 'bg-black/60 md:bg-black/60 transition-opacity duration-300'
            }`}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: isEventGallery 
                  ? (isHovered ? 0 : 20) 
                  : (isContentVisible || isHovered ? 0 : 20),
                opacity: isEventGallery 
                  ? (isHovered ? 1 : 0) 
                  : (isContentVisible || isHovered ? 1 : 0)
              }}
              transition={{ duration: 0.3 }}
              className={`${isTeamPicture ? 'text-left' : 'text-center'}`}
            >
              {(!isEventGallery && item.type === 'video' && !isTeamPicture) ? (
                <FaPlay className="w-8 h-8 mx-auto mb-3 text-primary-400" />
              ) : !isTeamPicture ? (
                <FaCamera className="w-8 h-8 mx-auto mb-3 text-primary-400" />
              ) : null}
              <h3 className={`text-xl font-bold mb-2 text-white group-hover:text-primary-300 transition-colors duration-300 ${
                isTeamPicture ? 'text-2xl' : ''
              }`}>
                {item.title}
              </h3>
              {!isTeamPicture && (
                <span className="inline-block px-3 py-1 rounded-full text-sm bg-primary-600/80 backdrop-blur-sm">
                  {getCategoryDisplayName(item.category)}
                </span>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Video Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative pb-[56.25%] h-0">
              <iframe
                src={item.videoUrl}
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default GalleryItem;