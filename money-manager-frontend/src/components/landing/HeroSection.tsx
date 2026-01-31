import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroBg from '@/assets/hero-bg.jpg';

export const HeroSection = () => {
  const scrollToDashboard = () => {
    const element = document.getElementById('dashboard');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden">
      {/* Animated Background Image */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0"
        >
          <img
            src={heroBg}
            alt=""
            className="h-full w-full object-cover"
          />
        </motion.div>
        
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-transparent to-primary/40" />
      </div>

      {/* Content */}
      <div className="relative container flex min-h-screen flex-col items-center justify-center px-4 pt-20 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm text-white backdrop-blur-sm border border-white/20"
          >
            <span className="flex h-2 w-2 rounded-full bg-income animate-pulse" />
            Track Personal & Office Finances
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            See where your money{' '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-income via-white to-income bg-clip-text text-transparent">
                grows
              </span>
            </span>
            {' & '}
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-white via-income to-white bg-clip-text text-transparent">
                goes
              </span>
            </span>
            ?
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl"
          >
            Smart expense tracking for individuals and businesses. Analyze spending patterns, 
            manage budgets, and make informed financial decisions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              onClick={scrollToDashboard}
              className="group h-12 gap-2 bg-white px-8 text-primary shadow-xl hover:bg-white/90 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 px-8 text-white hover:text-white hover:bg-white/20 border border-white/30"
            >
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 border-t border-white/20 pt-10"
          >
            {[
              { value: '50K+', label: 'Active Users' },
              { value: '₹2.5Cr', label: 'Tracked Monthly' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-2xl font-bold text-white sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-white/60 sm:text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {[
            { icon: TrendingUp, label: 'Real-time Analytics' },
            { icon: Shield, label: 'Bank-level Security' },
            { icon: Zap, label: 'Instant Reports' },
          ].map((feature) => (
            <div
              key={feature.label}
              className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 backdrop-blur-sm border border-white/20"
            >
              <feature.icon className="h-4 w-4" />
              {feature.label}
            </div>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 cursor-pointer"
            onClick={scrollToDashboard}
          >
            <span className="text-xs text-white/50">Scroll to explore</span>
            <div className="h-10 w-6 rounded-full border border-white/30 p-1">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="h-2 w-2 rounded-full bg-white/50"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
