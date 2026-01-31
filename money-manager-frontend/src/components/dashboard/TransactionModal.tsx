import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { CalendarIcon, DollarSign } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Transaction,
  TransactionType,
  Category,
  Division,
  CATEGORIES,
  DIVISIONS,
} from '@/types/transaction';
import { cn } from '@/lib/utils';

interface TransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: Omit<Transaction, 'id' | 'createdAt'>) => void;
  editTransaction?: Transaction | null;
}

export const TransactionModal = ({
  open,
  onClose,
  onSave,
  editTransaction,
}: TransactionModalProps) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<Category>('others');
  const [division, setDivision] = useState<Division>('personal');
  const [date, setDate] = useState<Date>(new Date());

  const incomeCategories = CATEGORIES.filter((c) =>
    ['salary', 'freelance', 'investment', 'others'].includes(c.value)
  );
  const expenseCategories = CATEGORIES.filter((c) =>
    ['fuel', 'food', 'movie', 'medical', 'loan', 'others'].includes(c.value)
  );

  useEffect(() => {
    if (editTransaction) {
      setType(editTransaction.type);
      setAmount(editTransaction.amount.toString());
      setDescription(editTransaction.description);
      setCategory(editTransaction.category);
      setDivision(editTransaction.division);
      setDate(new Date(editTransaction.date));
    } else {
      resetForm();
    }
  }, [editTransaction, open]);

  const resetForm = () => {
    setType('expense');
    setAmount('');
    setDescription('');
    setCategory('others');
    setDivision('personal');
    setDate(new Date());
  };

  const handleSave = () => {
    if (!amount || parseFloat(amount) <= 0) return;

    onSave({
      type,
      amount: parseFloat(amount),
      description: description || `${type === 'income' ? 'Income' : 'Expense'} transaction`,
      category,
      division,
      date,
    });
    onClose();
    resetForm();
  };

  const currentCategories = type === 'income' ? incomeCategories : expenseCategories;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {editTransaction ? 'Edit Transaction' : 'Add Transaction'}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Transaction Type Tabs */}
          <div className="flex rounded-lg bg-muted p-1">
            {(['income', 'expense'] as TransactionType[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setType(t);
                  setCategory('others');
                }}
                className={cn(
                  'relative flex-1 rounded-md px-4 py-2.5 text-sm font-medium transition-colors',
                  type === t
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {type === t && (
                  <motion.div
                    layoutId="transactionType"
                    className={cn(
                      'absolute inset-0 rounded-md shadow-sm',
                      t === 'income' ? 'bg-income-muted' : 'bg-expense-muted'
                    )}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={cn(
                  'relative z-10 capitalize',
                  type === t && (t === 'income' ? 'text-income' : 'text-expense')
                )}>
                  {t}
                </span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={type}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {/* Amount */}
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-sm font-medium">
                  Amount
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-9 h-11"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Date & Time</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal h-11"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(date, 'PPP p')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(d) => d && setDate(d)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="What is this transaction for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="resize-none h-20"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Category</Label>
                <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {currentCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <span className="flex items-center gap-2">
                          <span>{cat.icon}</span>
                          {cat.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Division */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Division</Label>
                <div className="flex gap-2">
                  {DIVISIONS.map((div) => (
                    <Button
                      key={div.value}
                      type="button"
                      variant={division === div.value ? 'default' : 'outline'}
                      className={cn(
                        'flex-1 h-11',
                        division === div.value && 'shadow-sm'
                      )}
                      onClick={() => setDivision(div.value)}
                    >
                      {div.label}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button
              className={cn(
                'flex-1',
                type === 'income'
                  ? 'bg-income hover:bg-income/90'
                  : 'bg-expense hover:bg-expense/90'
              )}
              onClick={handleSave}
              disabled={!amount || parseFloat(amount) <= 0}
            >
              {editTransaction ? 'Update' : 'Save'} {type === 'income' ? 'Income' : 'Expense'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
