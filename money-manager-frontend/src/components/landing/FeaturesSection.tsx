import { motion } from 'framer-motion';
import { 
  PieChart, 
  CreditCard, 
  BarChart3, 
  Clock, 
  Filter,
  Layers
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: CreditCard,
    title: 'Track Transactions',
    description: 'Easily log income and expenses with detailed categorization for personal and office finances.',
    color: 'income',
  },
  {
    icon: PieChart,
    title: 'Category Insights',
    description: 'Visual breakdown of spending by category helps identify where your money goes.',
    color: 'expense',
  },
  {
    icon: BarChart3,
    title: 'Division Analytics',
    description: 'Separate personal and office expenses with clear visual comparisons.',
    color: 'balance',
  },
  {
    icon: Filter,
    title: 'Smart Filters',
    description: 'Filter transactions by date range, category, and division for quick analysis.',
    color: 'income',
  },
  {
    icon: Clock,
    title: 'Time-based Views',
    description: 'Switch between weekly, monthly, and yearly views to track spending patterns.',
    color: 'expense',
  },
  {
    icon: Layers,
    title: 'Real-time Updates',
    description: 'Dashboard updates instantly as you add, edit, or filter transactions.',
    color: 'balance',
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="bg-background py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <span className="inline-block rounded-full bg-income-muted px-4 py-1.5 text-sm font-medium text-income">
            Features
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Manage Money
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Powerful features designed to help you track, analyze, and optimize your financial life.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="group h-full border-border/50 transition-all duration-300 hover:border-border hover:shadow-lg">
                <CardContent className="p-6">
                  <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                    feature.color === 'income' ? 'bg-income-muted' :
                    feature.color === 'expense' ? 'bg-expense-muted' :
                    'bg-balance-muted'
                  }`}>
                    <feature.icon className={`h-6 w-6 ${
                      feature.color === 'income' ? 'text-income' :
                      feature.color === 'expense' ? 'text-expense' :
                      'text-balance'
                    }`} />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
