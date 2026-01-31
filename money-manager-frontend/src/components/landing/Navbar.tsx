import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Analytics', href: '#dashboard' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const scrollToDashboard = () => {
    const element = document.getElementById('dashboard');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-primary/20 bg-white/90 backdrop-blur-xl shadow-sm"
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('#home')}
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold text-primary">MoneyFlow</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Button
            variant="ghost"
            className="text-foreground/80 hover:text-primary hover:bg-primary/5"
            onClick={scrollToDashboard}
          >
            Sign In
          </Button>
          <Button
            className="bg-primary text-white hover:bg-primary/90 shadow-lg"
            onClick={scrollToDashboard}
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-primary/10 bg-white/95 backdrop-blur-xl md:hidden"
          >
            <div className="container flex flex-col gap-4 px-4 py-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-left text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
                >
                  {link.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t border-primary/10">
                <Button
                  variant="ghost"
                  className="w-full text-foreground/80 hover:text-primary hover:bg-primary/5"
                  onClick={scrollToDashboard}
                >
                  Sign In
                </Button>
                <Button
                  className="w-full bg-primary text-white hover:bg-primary/90"
                  onClick={scrollToDashboard}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
