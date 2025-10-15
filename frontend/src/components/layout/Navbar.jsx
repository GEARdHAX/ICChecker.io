import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const navLinks = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Upload', to: '/upload' },
    { label: 'History', to: '/history' },
    { label: 'About', to: '/about' }, // <-- Add this line
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-secondary/50 backdrop-blur-lg border-b border-primary/20">
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        <NavLink to="/" className="text-2xl font-bold text-primary">ICChecker.io</NavLink>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className="text-lg font-medium text-text-main hover:text-primary transition-colors relative group">
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </NavLink>
          ))}
        </div>
        {/* Remember to add the mobile menu button and its logic here */}
      </div>
    </nav>
  );
}