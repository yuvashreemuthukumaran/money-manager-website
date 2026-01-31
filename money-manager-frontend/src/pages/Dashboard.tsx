import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { TimeRangeSelector } from '@/components/dashboard/TimeRangeSelector';
import { FilterPanel } from '@/components/dashboard/FilterPanel';
import { TransactionList } from '@/components/dashboard/TransactionList';
import { TransactionModal } from '@/components/dashboard/TransactionModal';
import { AnalyticsSection } from '@/components/dashboard/AnalyticsSection';
import { useTransactions } from '@/hooks/useTransactions';
import { Transaction } from '@/types/transaction';
import { toast } from '@/hooks/use-toast';

const Dashboard = () => {
  const {
    transactions,
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
  } = useTransactions();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleAddTransaction = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleSaveTransaction = (data: Omit<Transaction, 'id' | 'createdAt'>) => {
    if (editingTransaction) {
      updateTransaction(editingTransaction.id, data);
      toast({
        title: 'Transaction Updated',
        description: 'Your transaction has been updated successfully.',
      });
    } else {
      addTransaction(data);
      toast({
        title: 'Transaction Added',
        description: 'Your new transaction has been recorded.',
      });
    }
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id);
    toast({
      title: 'Transaction Deleted',
      description: 'The transaction has been removed.',
      variant: 'destructive',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onAddTransaction={handleAddTransaction} />

      <main className="container px-4 py-6 md:px-6 md:py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Page Title and Time Range */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-sm text-muted-foreground">
                Track and manage your finances
              </p>
            </div>
            <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
          </div>

          {/* Summary Cards */}
          <SummaryCards summary={summary} />

          {/* Filter Panel */}
          <FilterPanel filters={filters} onFiltersChange={setFilters} />

          {/* Analytics Section */}
          <AnalyticsSection
            categoryBreakdown={categoryBreakdown}
            divisionBreakdown={divisionBreakdown}
          />

          {/* Transaction List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
          >
            <TransactionList
              transactions={transactions}
              canEdit={canEditTransaction}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          </motion.div>
        </motion.div>
      </main>

      {/* Add/Edit Transaction Modal */}
      <TransactionModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTransaction(null);
        }}
        onSave={handleSaveTransaction}
        editTransaction={editingTransaction}
      />
    </div>
  );
};

export default Dashboard;
