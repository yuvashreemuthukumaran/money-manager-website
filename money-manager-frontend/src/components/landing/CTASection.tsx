import { motion } from 'framer-motion';
import { ArrowRight, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CTASection = () => {
  return (
    <section className="relative overflow-hidden bg-primary py-24">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -right-20 h-[400px] w-[400px] rounded-full bg-income/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute -bottom-20 -left-20 h-[400px] w-[400px] rounded-full bg-balance/30 blur-3xl"
        />
      </div>

      <div className="container relative px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready to Take Control?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
            Start tracking your finances today and gain insights that help you make smarter money decisions.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="group h-12 gap-2 bg-white px-8 text-primary shadow-xl hover:bg-white/90"
              onClick={() => {
                const element = document.getElementById('dashboard');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Started Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="h-12 px-8 text-white/80 hover:text-white hover:bg-white/10"
              onClick={() => {
                const element = document.getElementById('features');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Learn More
            </Button>
          </div>

          <p className="mt-6 text-sm text-white/40">
            No credit card required • Free forever for basic use
          </p>
        </motion.div>
      </div>
    </section>
  );
};
