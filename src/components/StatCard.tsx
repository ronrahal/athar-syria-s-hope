import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: number;
  label: string;
  delay?: number;
  variant?: 'default' | 'gold' | 'success' | 'warning';
}

export function StatCard({ icon: Icon, value, label, delay = 0, variant = 'default' }: StatCardProps) {
  const variantStyles = {
    default: 'border-border/50',
    gold: 'border-primary/30 gold-border-glow',
    success: 'border-success/30',
    warning: 'border-warning/30',
  };

  const iconStyles = {
    default: 'text-muted-foreground',
    gold: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`glass-card p-6 text-center ${variantStyles[variant]}`}
    >
      <div className="flex justify-center mb-4">
        <div className={`p-3 rounded-xl bg-muted/50 ${iconStyles[variant]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
      >
        <span className="text-3xl md:text-4xl font-bold gold-gradient-text">
          {value.toLocaleString()}
        </span>
      </motion.div>
      
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}
