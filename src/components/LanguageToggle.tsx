import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function LanguageToggle() {
  const { language, setLanguage, isArabic } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(isArabic ? 'en' : 'ar');
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleLanguage}
        className="flex items-center gap-2 text-foreground/80 hover:text-primary hover:bg-primary/10"
      >
        <Globe className="h-4 w-4" />
        <span className="font-medium">
          {isArabic ? 'English' : 'العربية'}
        </span>
      </Button>
    </motion.div>
  );
}
