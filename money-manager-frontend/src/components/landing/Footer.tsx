import { Wallet } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Wallet className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">MoneyFlow</span>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>

          <p className="text-sm text-muted-foreground">
            © 2026 MoneyFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
