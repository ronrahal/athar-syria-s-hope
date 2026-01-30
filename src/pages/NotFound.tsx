import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import { useEffect } from 'react';

const NotFound = () => {
  const { isArabic } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center glass-card p-12 max-w-lg"
        >
          <h1 className="text-8xl font-bold gold-gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            {isArabic ? 'الصفحة غير موجودة' : 'Page Not Found'}
          </h2>
          <p className="text-muted-foreground mb-8">
            {isArabic 
              ? 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
              : 'The page you are looking for does not exist or has been moved.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                {isArabic ? 'الرئيسية' : 'Go Home'}
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
              <Link to="/cases" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                {isArabic ? 'تصفح الحالات' : 'Browse Cases'}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default NotFound;
