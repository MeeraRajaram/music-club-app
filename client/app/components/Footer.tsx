'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaInstagram, FaYoutube, FaTree, FaEnvelope, FaMapMarkerAlt, FaPhone, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  const pathname = usePathname();
  const isTeamPage = pathname === '/2024team' || pathname === '/2025team';

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-poppins">Music Club IIITDM</h3>
            <p className="text-gray-300 mb-4">
              The official Music Club of IIITDM Kancheepuram, dedicated to nurturing musical talent and creating memorable experiences through music.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-poppins">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href={isTeamPage ? "/#about" : "#about"} 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Events
                </Link>
              </li>
              <li>
                <Link 
                  href="/gallery" 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/team" className="text-gray-300 hover:text-white transition-colors duration-300">
                  Our Team
                </Link>
              </li>
              <li>
                <Link 
                  href={isTeamPage ? "/#contact" : "#contact"} 
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 font-poppins">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-purple-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">
                  D1 PEMS Block, IIITDM Kancheepuram, Vandalur-Kelambakkam Road, Chennai - 600127, Tamil Nadu, India
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-purple-400 flex-shrink-0" />
                <a href="mailto:musicclub.iiitdm@gmail.com" className="text-gray-300 hover:text-white transition-colors duration-300">
                  musicclub.iiitdm@gmail.com
                </a>
              </li>
            </ul>
            
            <h4 className="text-lg font-bold mt-6 mb-3 font-poppins">Follow Us</h4>
            <div className="flex space-x-3">
              <a href="https://linktr.ee/MusicClub_IIITDM" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaTree />
              </a>
              <a href="https://www.instagram.com/musicclub.iiitdm" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/@iiitdmmusicclub2549" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaYoutube />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61575171101823" target="_blank" rel="noopener noreferrer" className="social-icon">
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 mt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Music Club IIITDM Kancheepuram. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/legal/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/legal/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
          </div>
          <p className="mt-2">
            Designed with <span className="text-red-500">♥</span> by Music Club Web Team
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
