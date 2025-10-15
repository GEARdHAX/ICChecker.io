import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'primereact/button'; // Using PrimeReact's button for the icon

export default function Navbar() {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const navLinks = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Upload', to: '/upload' },
    { label: 'History', to: '/history' },
    { label: 'About', to: '/about' },
  ];

  const closeMobileMenu = () => setIsMenuVisible(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/50 backdrop-blur-lg border-b border-primary/20">
      {/* --- Desktop Navbar --- */}
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <NavLink to="/" className="text-2xl font-bold text-primary" onClick={closeMobileMenu}>
          ICChecker.io
        </NavLink>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className="text-lg font-medium text-text-main hover:text-primary transition-colors relative group">
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </NavLink>
          ))}
        </div>

        {/* --- Hamburger Button (Mobile Only) --- */}
        <div className="md:hidden">
            <Button 
                icon={isMenuVisible ? "pi pi-times" : "pi pi-bars"}
                onClick={() => setIsMenuVisible(!isMenuVisible)}
                text
                className="text-text-main"
                aria-label="Toggle navigation"
            />
        </div>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      {isMenuVisible && (
        <div className="md:hidden bg-secondary/95 backdrop-blur-lg absolute w-full left-0">
          <div className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                // FIX: Ensures text is light (text-text-main) and visible on the dark background
                className="text-text-dark text-lg py-3 px-4 rounded-md hover:bg-primary/20 transition-colors"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}