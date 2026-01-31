import { motion } from 'framer-motion';
import { Wallet, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onAddTransaction: () => void;
}

export const Header = ({ onAddTransaction }: HeaderProps) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60"
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">MoneyFlow</h1>
            <p className="text-xs text-muted-foreground hidden sm:block">Personal & Office Finance</p>
          </div>
        </div>

        <Button
          onClick={onAddTransaction}
          className="gap-2 shadow-sm"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add Transaction</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>
    </motion.header>
  );
};
