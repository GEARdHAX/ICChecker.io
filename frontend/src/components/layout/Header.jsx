import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useAppStore } from '../../store/appStore';

export default function Header() {
  const { theme, toggleTheme } = useAppStore();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  // Define navigation links in an array to avoid repetition
  const navLinks = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Admin', to: '/admin' },
  ];

  // Function to close the mobile menu, useful for link clicks
  const closeMobileMenu = () => setIsMenuVisible(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-2xl font-bold text-primary" onClick={closeMobileMenu}>
          ICChecker.io
        </Link>

        {/* --- Right side container for nav and buttons --- */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 text-gray-700 dark:text-gray-300">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Theme Toggle Button */}
          <Button
            icon={theme === 'light' ? 'pi pi-moon' : 'pi pi-sun'}
            rounded
            text
            aria-label="Theme Toggle"
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300"
          />

          {/* Hamburger Menu Button for Mobile */}
          <Button
            icon="pi pi-bars"
            rounded
            text
            aria-label="Open navigation menu"
            onClick={() => setIsMenuVisible(!isMenuVisible)}
            className="md:hidden text-gray-700 dark:text-gray-300" // Only shows on screens smaller than 'md'
          />
        </div>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      {isMenuVisible && (
        <div className="md:hidden bg-white dark:bg-gray-800 absolute w-full shadow-lg border-t border-gray-200 dark:border-gray-800">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 dark:text-gray-300 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={closeMobileMenu} // Close menu when a link is clicked
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}