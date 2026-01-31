import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { TransactionSummary } from '@/types/transaction';

interface SummaryCardsProps {
  summary: TransactionSummary;
}

export const SummaryCards = ({ summary }: SummaryCardsProps) => {
  const cards = [
    {
      title: 'Total Income',
      amount: summary.totalIncome,
      icon: TrendingUp,
      trend: ArrowUpRight,
      colorClass: 'income',
    },
    {
      title: 'Total Expense',
      amount: summary.totalExpense,
      icon: TrendingDown,
      trend: ArrowDownRight,
      colorClass: 'expense',
    },
    {
      title: 'Current Balance',
      amount: summary.balance,
      icon: Wallet,
      trend: summary.balance >= 0 ? ArrowUpRight : ArrowDownRight,
      colorClass: 'balance',
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="relative overflow-hidden border-border/50 card-shadow hover:card-shadow-hover transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </p>
                  <p className={`text-2xl font-bold tracking-tight ${
                    card.colorClass === 'income' ? 'text-income' :
                    card.colorClass === 'expense' ? 'text-expense' :
                    summary.balance >= 0 ? 'text-income' : 'text-expense'
                  }`}>
                    {card.colorClass === 'expense' ? '-' : ''}{formatCurrency(Math.abs(card.amount))}
                  </p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  card.colorClass === 'income' ? 'bg-income-muted' :
                  card.colorClass === 'expense' ? 'bg-expense-muted' :
                  'bg-balance-muted'
                }`}>
                  <card.icon className={`h-5 w-5 ${
                    card.colorClass === 'income' ? 'text-income' :
                    card.colorClass === 'expense' ? 'text-expense' :
                    'text-balance'
                  }`} />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-1">
                <card.trend className={`h-3 w-3 ${
                  card.colorClass === 'income' ? 'text-income' :
                  card.colorClass === 'expense' ? 'text-expense' :
                  summary.balance >= 0 ? 'text-income' : 'text-expense'
                }`} />
                <span className="text-xs text-muted-foreground">
                  This period
                </span>
              </div>
            </CardContent>
            <div className={`absolute bottom-0 left-0 right-0 h-1 ${
              card.colorClass === 'income' ? 'bg-income' :
              card.colorClass === 'expense' ? 'bg-expense' :
              summary.balance >= 0 ? 'bg-income' : 'bg-expense'
            }`} />
          </Card>
        </motion.div>
      ))}
    </div>
  );
};
