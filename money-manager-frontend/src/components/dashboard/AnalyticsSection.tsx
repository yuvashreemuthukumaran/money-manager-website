import { motion } from 'framer-motion';
import { PieChart, BarChart3, Briefcase, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CATEGORIES } from '@/types/transaction';
import { cn } from '@/lib/utils';

interface AnalyticsSectionProps {
  categoryBreakdown: { category: string; amount: number }[];
  divisionBreakdown: { personal: number; office: number; total: number };
}

export const AnalyticsSection = ({
  categoryBreakdown,
  divisionBreakdown,
}: AnalyticsSectionProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getCategoryInfo = (categoryValue: string) => {
    return CATEGORIES.find((c) => c.value === categoryValue) || { icon: '📦', label: 'Others' };
  };

  const maxCategoryAmount = categoryBreakdown.length > 0
    ? Math.max(...categoryBreakdown.map((c) => c.amount))
    : 0;

  const personalPercentage = divisionBreakdown.total > 0
    ? (divisionBreakdown.personal / divisionBreakdown.total) * 100
    : 0;
  const officePercentage = divisionBreakdown.total > 0
    ? (divisionBreakdown.office / divisionBreakdown.total) * 100
    : 0;

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Category Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="border-border/50 h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <PieChart className="h-4 w-4 text-muted-foreground" />
              Expense by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryBreakdown.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No expense data available
                </p>
              </div>
            ) : (
              categoryBreakdown.slice(0, 6).map((item, index) => {
                const category = getCategoryInfo(item.category);
                const percentage = maxCategoryAmount > 0
                  ? (item.amount / maxCategoryAmount) * 100
                  : 0;

                return (
                  <motion.div
                    key={item.category}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 * index }}
                    className="space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{category.icon}</span>
                        <span className="text-sm font-medium">{category.label}</span>
                      </div>
                      <span className="text-sm font-semibold text-expense">
                        {formatCurrency(item.amount)}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <motion.div
                        className="h-full rounded-full bg-expense"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 0.5, delay: 0.2 + 0.1 * index }}
                      />
                    </div>
                  </motion.div>
                );
              })
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Division Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="border-border/50 h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base font-semibold">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              Personal vs Office
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {divisionBreakdown.total === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <BarChart3 className="h-8 w-8 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">
                  No expense data available
                </p>
              </div>
            ) : (
              <>
                {/* Visual Bar */}
                <div className="space-y-3">
                  <div className="flex h-8 overflow-hidden rounded-lg">
                    <motion.div
                      className="flex items-center justify-center bg-balance"
                      initial={{ width: 0 }}
                      animate={{ width: `${personalPercentage}%` }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      {personalPercentage > 15 && (
                        <span className="text-xs font-medium text-balance-foreground">
                          {personalPercentage.toFixed(0)}%
                        </span>
                      )}
                    </motion.div>
                    <motion.div
                      className="flex items-center justify-center bg-primary"
                      initial={{ width: 0 }}
                      animate={{ width: `${officePercentage}%` }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      {officePercentage > 15 && (
                        <span className="text-xs font-medium text-primary-foreground">
                          {officePercentage.toFixed(0)}%
                        </span>
                      )}
                    </motion.div>
                  </div>
                </div>

                {/* Legend */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="flex items-center gap-3 rounded-lg bg-balance-muted p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-balance">
                      <User className="h-5 w-5 text-balance-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Personal</p>
                      <p className="text-lg font-bold text-balance">
                        {formatCurrency(divisionBreakdown.personal)}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="flex items-center gap-3 rounded-lg bg-secondary p-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                      <Briefcase className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Office</p>
                      <p className="text-lg font-bold text-foreground">
                        {formatCurrency(divisionBreakdown.office)}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Total */}
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Expenses</span>
                    <span className="text-lg font-bold text-expense">
                      {formatCurrency(divisionBreakdown.total)}
                    </span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
