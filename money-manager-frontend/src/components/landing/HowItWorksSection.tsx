import { motion } from 'framer-motion';
import { Plus, Edit2, BarChart3, ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Plus,
    title: 'Add Transactions',
    description: 'Quickly log your income and expenses with our intuitive modal. Choose categories and divisions.',
    color: 'income',
  },
  {
    step: '02',
    icon: Edit2,
    title: 'Track & Edit',
    description: 'View your transaction history and edit entries within 12 hours of creation.',
    color: 'balance',
  },
  {
    step: '03',
    icon: BarChart3,
    title: 'Analyze Insights',
    description: 'Get visual breakdowns by category and division to understand your spending patterns.',
    color: 'expense',
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="bg-surface-sunken py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-balance-muted px-4 py-1.5 text-sm font-medium text-balance">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Simple Steps to Financial Clarity
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Get started in minutes with our straightforward workflow.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-1/2 hidden h-0.5 w-full bg-gradient-to-r from-border to-transparent md:block" />
              )}
              
              <div className="relative flex flex-col items-center text-center">
                {/* Step Number */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-card px-3 py-1 text-xs font-bold text-muted-foreground shadow-sm">
                  Step {item.step}
                </div>
                
                {/* Icon */}
                <div className={`flex h-24 w-24 items-center justify-center rounded-2xl ${
                  item.color === 'income' ? 'bg-income-muted' :
                  item.color === 'balance' ? 'bg-balance-muted' :
                  'bg-expense-muted'
                }`}>
                  <item.icon className={`h-10 w-10 ${
                    item.color === 'income' ? 'text-income' :
                    item.color === 'balance' ? 'text-balance' :
                    'text-expense'
                  }`} />
                </div>
                
                {/* Content */}
                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
