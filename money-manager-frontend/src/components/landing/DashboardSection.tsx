import { useState } from 'react';
import { motion } from 'framer-motion';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { TimeRangeSelector } from '@/components/dashboard/TimeRangeSelector';
import { FilterPanel } from '@/components/dashboard/FilterPanel';
import { TransactionList } from '@/components/dashboard/TransactionList';
import { TransactionModal } from '@/components/dashboard/TransactionModal';
import { AnalyticsSection } from '@/components/dashboard/AnalyticsSection';
import { useTransactions } from '@/hooks/useTransactions';
import { Transaction } from '@/types/transaction';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const DashboardSection = () => {
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
    <section id="dashboard" className="bg-background py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your Financial Dashboard
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Track your income and expenses in real-time. Get insights that help you make smarter financial decisions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Header with Add Button and Time Range */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button onClick={handleAddTransaction} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Transaction
            </Button>
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
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <TransactionList
              transactions={transactions}
              canEdit={canEditTransaction}
              onEdit={handleEditTransaction}
              onDelete={handleDeleteTransaction}
            />
          </motion.div>
        </motion.div>
      </div>

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
    </section>
  );
};
