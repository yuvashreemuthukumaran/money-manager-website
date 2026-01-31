import { useState, useMemo } from 'react';
import { 
  Transaction, 
  TransactionFilters, 
  TransactionSummary, 
  TimeRange,
  TransactionType,
  Category,
  Division
} from '@/types/transaction';
import { 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth, 
  startOfYear, 
  endOfYear,
  isWithinInterval,
  subHours,
  isAfter
} from 'date-fns';

// Generate sample data
const generateSampleTransactions = (): Transaction[] => {
  const now = new Date();
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'income',
      amount: 5000,
      description: 'Monthly Salary',
      category: 'salary',
      division: 'office',
      date: new Date(now.getFullYear(), now.getMonth(), 1),
      createdAt: new Date(now.getFullYear(), now.getMonth(), 1),
    },
    {
      id: '2',
      type: 'expense',
      amount: 150,
      description: 'Grocery shopping',
      category: 'food',
      division: 'personal',
      date: new Date(now.getFullYear(), now.getMonth(), 3),
      createdAt: new Date(now.getFullYear(), now.getMonth(), 3),
    },
    {
      id: '3',
      type: 'expense',
      amount: 75,
      description: 'Fuel refill',
      category: 'fuel',
      division: 'personal',
      date: new Date(now.getFullYear(), now.getMonth(), 5),
      createdAt: new Date(now.getFullYear(), now.getMonth(), 5),
    },
    {
      id: '4',
      type: 'income',
      amount: 800,
      description: 'Freelance project',
      category: 'freelance',
      division: 'personal',
      date: new Date(now.getFullYear(), now.getMonth(), 8),
      createdAt: new Date(now.getFullYear(), now.getMonth(), 8),
    },
    {
      id: '5',
      type: 'expense',
      amount: 200,
      description: 'Doctor visit',
      category: 'medical',
      division: 'personal',
      date: new Date(now.getFullYear(), now.getMonth(), 10),
      createdAt: new Date(now.getFullYear(), now.getMonth(), 10),
    },
    {
      id: '6',
      type: 'expense',
      amount: 45,
      description: 'Movie night',
      category: 'movie',
      division: 'personal',
      date: new Date(now.getFullYear(), now.getMonth(), 12),
      createdAt: new Date(now.getFullYear(), now.getMonth(), 12),
    },
    {
      id: '7',
      type: 'expense',
      amount: 500,
      description: 'Office supplies',
      category: 'others',
      division: 'office',
      date: new Date(now.getFullYear(), now.getMonth(), 15),
      createdAt: new Date(now.getFullYear(), now.getMonth(), 15),
    },
    {
      id: '8',
      type: 'income',
      amount: 250,
      description: 'Investment returns',
      category: 'investment',
      division: 'personal',
      date: new Date(now.getFullYear(), now.getMonth(), 18),
      createdAt: new Date(now.getFullYear(), now.getMonth(), 18),
    },
    {
      id: '9',
      type: 'expense',
      amount: 120,
      description: 'Team lunch',
      category: 'food',
      division: 'office',
      date: new Date(now.getFullYear(), now.getMonth(), 20),
      createdAt: new Date(now.getFullYear(), now.getMonth(), 20),
    },
    {
      id: '10',
      type: 'expense',
      amount: 300,
      description: 'Loan EMI',
      category: 'loan',
      division: 'personal',
      date: new Date(),
      createdAt: new Date(),
    },
  ];
  return transactions;
};

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(generateSampleTransactions());
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
  const [filters, setFilters] = useState<TransactionFilters>({
    category: 'all',
    division: 'all',
  });

  const getDateRange = (range: TimeRange) => {
    const now = new Date();
    switch (range) {
      case 'weekly':
        return { start: startOfWeek(now), end: endOfWeek(now) };
      case 'monthly':
        return { start: startOfMonth(now), end: endOfMonth(now) };
      case 'yearly':
        return { start: startOfYear(now), end: endOfYear(now) };
    }
  };

  const filteredTransactions = useMemo(() => {
    const { start, end } = getDateRange(timeRange);
    
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      
      // Time range filter
      if (!isWithinInterval(transactionDate, { start, end })) {
        return false;
      }

      // Custom date range filter
      if (filters.dateFrom && transactionDate < filters.dateFrom) {
        return false;
      }
      if (filters.dateTo && transactionDate > filters.dateTo) {
        return false;
      }

      // Category filter
      if (filters.category && filters.category !== 'all' && transaction.category !== filters.category) {
        return false;
      }

      // Division filter
      if (filters.division && filters.division !== 'all' && transaction.division !== filters.division) {
        return false;
      }

      return true;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, timeRange, filters]);

  const summary: TransactionSummary = useMemo(() => {
    const totalIncome = filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
    };
  }, [filteredTransactions]);

  const categoryBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    
    filteredTransactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        breakdown[t.category] = (breakdown[t.category] || 0) + t.amount;
      });

    return Object.entries(breakdown)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [filteredTransactions]);

  const divisionBreakdown = useMemo(() => {
    const personal = filteredTransactions
      .filter((t) => t.division === 'personal' && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const office = filteredTransactions
      .filter((t) => t.division === 'office' && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    return { personal, office, total: personal + office };
  }, [filteredTransactions]);

  const canEditTransaction = (transaction: Transaction): boolean => {
    const twelveHoursAgo = subHours(new Date(), 12);
    return isAfter(new Date(transaction.createdAt), twelveHoursAgo);
  };

  const addTransaction = (
    data: Omit<Transaction, 'id' | 'createdAt'>
  ) => {
    const newTransaction: Transaction = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setTransactions((prev) => [newTransaction, ...prev]);
    return newTransaction;
  };

  const updateTransaction = (id: string, data: Partial<Transaction>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...data } : t))
    );
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    transactions: filteredTransactions,
    allTransactions: transactions,
    summary,
    categoryBreakdown,
    divisionBreakdown,
    timeRange,
    setTimeRange,
    filters,
    setFilters,
    canEditTransaction,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
};
