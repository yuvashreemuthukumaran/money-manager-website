export type TransactionType = 'income' | 'expense';
export type Division = 'personal' | 'office';
export type Category = 'fuel' | 'food' | 'movie' | 'medical' | 'loan' | 'salary' | 'freelance' | 'investment' | 'others';
export type TimeRange = 'weekly' | 'monthly' | 'yearly';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: Category;
  division: Division;
  date: Date;
  createdAt: Date;
}

export interface TransactionFilters {
  dateFrom?: Date;
  dateTo?: Date;
  category?: Category | 'all';
  division?: Division | 'all';
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

export const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: 'fuel', label: 'Fuel', icon: '⛽' },
  { value: 'food', label: 'Food', icon: '🍔' },
  { value: 'movie', label: 'Movie', icon: '🎬' },
  { value: 'medical', label: 'Medical', icon: '🏥' },
  { value: 'loan', label: 'Loan', icon: '💳' },
  { value: 'salary', label: 'Salary', icon: '💰' },
  { value: 'freelance', label: 'Freelance', icon: '💼' },
  { value: 'investment', label: 'Investment', icon: '📈' },
  { value: 'others', label: 'Others', icon: '📦' },
];

export const DIVISIONS: { value: Division; label: string }[] = [
  { value: 'personal', label: 'Personal' },
  { value: 'office', label: 'Office' },
];
