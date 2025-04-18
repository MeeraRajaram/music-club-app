'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { TeamMember } from '../../data/team';

interface MemberCardProps {
  member: TeamMember;
}

const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group bg-gray-800 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div className="aspect-square relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent z-10" />
        <Image
          src={member.image}
          alt={member.name}
          fill
          style={{ objectFit: 'cover' }}
          className="rounded-t-2xl transform group-hover:scale-110 transition-transform duration-700"
        />
      </div>
      
      <div className="p-6 text-center space-y-4">
        <div>
          <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
            {member.name}
          </h3>
          <p className="text-primary-400 font-medium">{member.role}</p>
        </div>
        
        <p className="text-gray-400 line-clamp-3">{member.bio}</p>
        
        {/* Social Links */}
        <div className="flex justify-center space-x-4 pt-2">
          {member.social?.github && (
            <motion.a
              href={member.social.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaGithub className="w-5 h-5" />
            </motion.a>
          )}
          {member.social?.linkedin && (
            <motion.a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaLinkedin className="w-5 h-5" />
            </motion.a>
          )}
          {member.social?.instagram && (
            <motion.a
              href={member.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <FaInstagram className="w-5 h-5" />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MemberCard;