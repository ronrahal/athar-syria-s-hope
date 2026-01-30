import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Heart, Shield, Eye, Lock, Target, Users } from 'lucide-react';

export default function AboutPage() {
  const { t, isArabic } = useLanguage();

  const values = [
    { icon: Eye, labelKey: 'about.value1', color: 'text-primary' },
    { icon: Heart, labelKey: 'about.value2', color: 'text-destructive' },
    { icon: Target, labelKey: 'about.value3', color: 'text-success' },
    { icon: Lock, labelKey: 'about.value4', color: 'text-warning' },
  ];

  return (
    <Layout>
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gold-gradient-text">
              {t('about.title')}
            </h1>
          </motion.div>

          {/* Mission */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="glass-card p-8 md:p-12 gold-border-glow">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {t('about.mission')}
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.missionText')}
              </p>
            </div>
          </motion.section>

          {/* Methodology */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="glass-card p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-teal/20">
                  <Users className="h-8 w-8 text-teal-light" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  {t('about.methodology')}
                </h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.methodologyText')}
              </p>
            </div>
          </motion.section>

          {/* Values */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 gold-gradient-text">
              {t('about.values')}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-muted/50">
                      <value.icon className={`h-8 w-8 ${value.color}`} />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {t(value.labelKey)}
                  </h3>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Additional Content */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-4xl mx-auto mt-16"
          >
            <div className="glass-card p-8 md:p-12 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {isArabic ? 'انضم إلينا في هذه المهمة' : 'Join Us in This Mission'}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {isArabic 
                  ? 'إذا كان لديك أي معلومات عن أي شخص مفقود، أو ترغب في المساهمة في جهودنا، يرجى التواصل معنا. كل معلومة قد تساعد في لم شمل عائلة.'
                  : 'If you have any information about any missing person, or would like to contribute to our efforts, please reach out to us. Every piece of information could help reunite a family.'}
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </Layout>
  );
}
