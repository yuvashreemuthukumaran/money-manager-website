import { motion } from 'framer-motion';
import { Filter, X, CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
import { TransactionFilters, CATEGORIES, DIVISIONS, Category, Division } from '@/types/transaction';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
}

export const FilterPanel = ({ filters, onFiltersChange }: FilterPanelProps) => {
  const hasActiveFilters = 
    filters.dateFrom || 
    filters.dateTo || 
    (filters.category && filters.category !== 'all') || 
    (filters.division && filters.division !== 'all');

  const clearFilters = () => {
    onFiltersChange({
      dateFrom: undefined,
      dateTo: undefined,
      category: 'all',
      division: 'all',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Filter className="h-4 w-4" />
                Filters
              </div>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                  Clear all
                </Button>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Date From */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'justify-start text-left font-normal h-10',
                      !filters.dateFrom && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateFrom ? format(filters.dateFrom, 'MMM dd, yyyy') : 'From date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateFrom}
                    onSelect={(date) =>
                      onFiltersChange({ ...filters, dateFrom: date })
                    }
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              {/* Date To */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'justify-start text-left font-normal h-10',
                      !filters.dateTo && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateTo ? format(filters.dateTo, 'MMM dd, yyyy') : 'To date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateTo}
                    onSelect={(date) =>
                      onFiltersChange({ ...filters, dateTo: date })
                    }
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>

              {/* Category */}
              <Select
                value={filters.category || 'all'}
                onValueChange={(value) =>
                  onFiltersChange({ ...filters, category: value as Category | 'all' })
                }
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        {cat.label}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Division */}
              <Select
                value={filters.division || 'all'}
                onValueChange={(value) =>
                  onFiltersChange({ ...filters, division: value as Division | 'all' })
                }
              >
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Divisions</SelectItem>
                  {DIVISIONS.map((div) => (
                    <SelectItem key={div.value} value={div.value}>
                      {div.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
