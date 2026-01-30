import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { StatCard } from '@/components/StatCard';
import { CaseCard } from '@/components/CaseCard';
import { mockCases, getCaseStats } from '@/data/mockCases';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, UserCheck, AlertTriangle, FileSearch, ArrowRight, ArrowLeft, Shield, Search } from 'lucide-react';

export default function HomePage() {
  const { t, isArabic } = useLanguage();
  const stats = getCaseStats();
  const featuredCases = mockCases.filter(c => c.isFeatured).slice(0, 3);
  
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-hero-pattern" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-teal/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo/Title */}
            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6 gold-gradient-text gold-glow"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-primary/90 font-medium mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('hero.subtitle')}
            </motion.p>
            
            <motion.p 
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg group">
                <Link to="/cases" className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  {t('hero.cta.browse')}
                  <ArrowIcon className="h-4 w-4 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10 px-8 py-6 text-lg">
                <Link to="/submit" className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {t('hero.cta.submit')}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
            <motion.div 
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <StatCard 
              icon={FileSearch} 
              value={stats.total} 
              label={t('stats.total')} 
              delay={0}
              variant="gold"
            />
            <StatCard 
              icon={Users} 
              value={stats.active} 
              label={t('stats.active')} 
              delay={0.1}
            />
            <StatCard 
              icon={UserCheck} 
              value={stats.resolved} 
              label={t('stats.resolved')} 
              delay={0.2}
              variant="success"
            />
            <StatCard 
              icon={AlertTriangle} 
              value={stats.urgent} 
              label={t('stats.urgent')} 
              delay={0.3}
              variant="warning"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Cases */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gold-gradient-text">
              {isArabic ? 'حالات مميزة' : 'Featured Cases'}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {isArabic 
                ? 'هذه الحالات تتطلب اهتماماً عاجلاً. إذا كان لديك أي معلومات، يرجى التواصل معنا.'
                : 'These cases require urgent attention. If you have any information, please reach out.'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCases.map((caseData, index) => (
              <CaseCard key={caseData.id} caseData={caseData} index={index} />
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Button asChild variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10">
              <Link to="/cases" className="flex items-center gap-2">
                {isArabic ? 'عرض جميع الحالات' : 'View All Cases'}
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="glass-card p-8 md:p-12 gold-border-glow">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 gold-gradient-text">
                {t('about.mission')}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.missionText')}
              </p>
              
              <div className="mt-8 pt-8 border-t border-border/50">
                <Link 
                  to="/about" 
                  className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
                >
                  {t('common.readMore')}
                  <ArrowIcon className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
