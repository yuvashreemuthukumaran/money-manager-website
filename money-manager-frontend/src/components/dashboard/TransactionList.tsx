import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Edit2, Trash2, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Transaction, CATEGORIES } from '@/types/transaction';
import { cn } from '@/lib/utils';

interface TransactionListProps {
  transactions: Transaction[];
  canEdit: (transaction: Transaction) => boolean;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export const TransactionList = ({
  transactions,
  canEdit,
  onEdit,
  onDelete,
}: TransactionListProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getCategoryInfo = (categoryValue: string) => {
    return CATEGORIES.find((c) => c.value === categoryValue) || { icon: '📦', label: 'Others' };
  };

  if (transactions.length === 0) {
    return (
      <Card className="border-border/50">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <AlertCircle className="h-6 w-6 text-muted-foreground" />
          </div>
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            No transactions found
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Try adjusting your filters or add a new transaction
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Transaction History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          <AnimatePresence mode="popLayout">
            {transactions.map((transaction, index) => {
              const category = getCategoryInfo(transaction.category);
              const isEditable = canEdit(transaction);

              return (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-lg',
                      transaction.type === 'income' ? 'bg-income-muted' : 'bg-expense-muted'
                    )}>
                      {category.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium">
                          {transaction.description}
                        </p>
                        <Badge
                          variant="secondary"
                          className={cn(
                            'text-xs shrink-0',
                            transaction.division === 'personal'
                              ? 'bg-balance-muted text-balance'
                              : 'bg-muted text-muted-foreground'
                          )}
                        >
                          {transaction.division}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(transaction.date), 'MMM dd, yyyy • h:mm a')}
                        </span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">
                          {category.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <p className={cn(
                      'text-sm font-semibold tabular-nums',
                      transaction.type === 'income' ? 'text-income' : 'text-expense'
                    )}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>

                    <div className="flex items-center gap-1">
                      {isEditable ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          onClick={() => onEdit(transaction)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      ) : (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground/50 cursor-not-allowed"
                              disabled
                            >
                              <Clock className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Cannot edit transactions older than 12 hours</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => onDelete(transaction.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};
