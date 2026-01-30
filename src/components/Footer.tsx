import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Heart, Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  const { t, isArabic } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card/50 border-t border-border/50 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="inline-block"
            >
              <span className="text-2xl font-bold gold-gradient-text">
                {isArabic ? 'أثر' : 'Athar'}
              </span>
            </motion.div>
            <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
              {isArabic 
                ? 'منصة إنسانية مكرسة لتوثيق حالات المفقودين في سوريا، لإعطاء صوت للذين لا صوت لهم.'
                : 'A humanitarian platform dedicated to documenting missing persons cases in Syria, giving voice to the voiceless.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {isArabic ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <nav className="flex flex-col gap-2">
              <Link to="/cases" className="text-muted-foreground hover:text-primary transition-colors">
                {t('nav.cases')}
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                {t('nav.about')}
              </Link>
              <Link to="/submit" className="text-muted-foreground hover:text-primary transition-colors">
                {t('nav.submit')}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              {t('footer.contact')}
            </h4>
            <div className="flex flex-col gap-3">
              <a 
                href="mailto:contact@athar.org" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                contact@athar.org
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              © {currentYear} Athar. {t('footer.rights')}
              <span className="inline-flex items-center gap-1 mx-1">
                {isArabic ? 'صنع بـ' : 'Made with'}
                <Heart className="h-3 w-3 text-destructive fill-destructive" />
                {isArabic ? 'للإنسانية' : 'for humanity'}
              </span>
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                {t('footer.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
