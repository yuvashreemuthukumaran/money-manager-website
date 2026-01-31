import { motion } from 'framer-motion';
import { TimeRange } from '@/types/transaction';
import { cn } from '@/lib/utils';

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
}

export const TimeRangeSelector = ({ value, onChange }: TimeRangeSelectorProps) => {
  const options: { value: TimeRange; label: string }[] = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  return (
    <div className="inline-flex items-center rounded-lg bg-muted p-1">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            'relative px-4 py-2 text-sm font-medium transition-colors rounded-md',
            value === option.value
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          {value === option.value && (
            <motion.div
              layoutId="timeRangeIndicator"
              className="absolute inset-0 bg-card rounded-md shadow-sm"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{option.label}</span>
        </button>
      ))}
    </div>
  );
};
