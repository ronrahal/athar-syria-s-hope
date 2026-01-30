import { Case, CaseStatus, getStatusClass, getStatusLabel } from '@/types/case';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Calendar, MapPin, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface CaseCardProps {
  caseData: Case;
  index?: number;
}

export function CaseCard({ caseData, index = 0 }: CaseCardProps) {
  const { language, t, isArabic } = useLanguage();
  
  const name = isArabic && caseData.firstNameAr 
    ? `${caseData.firstNameAr} ${caseData.lastNameAr}`
    : `${caseData.firstName} ${caseData.lastName}`;
  
  const location = isArabic && caseData.lastSeenLocationAr
    ? caseData.lastSeenLocationAr
    : caseData.lastSeenLocation;

  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="glass-card-hover group overflow-hidden"
    >
      <Link to={`/cases/${caseData.caseNumber}`} className="block">
        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {caseData.photo ? (
            <img
              src={caseData.photo}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-4xl text-muted-foreground">
                {caseData.firstName[0]}{caseData.lastName[0]}
              </span>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          
          {/* Urgent Badge */}
          {caseData.isUrgent && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-3 right-3 rtl:right-auto rtl:left-3"
            >
              <Badge className="bg-destructive text-destructive-foreground animate-pulse-gold flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {t('common.urgent')}
              </Badge>
            </motion.div>
          )}
          
          {/* Case Number */}
          <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3">
            <span className="text-xs font-mono text-primary/90 bg-background/80 px-2 py-1 rounded">
              {caseData.caseNumber}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Name & Status */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {name}
            </h3>
            <span className={`status-badge text-xs whitespace-nowrap ${getStatusClass(caseData.status)}`}>
              {getStatusLabel(caseData.status, language)}
            </span>
          </div>

          {/* Info Grid */}
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary/70 flex-shrink-0" />
              <span className="line-clamp-1">{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary/70 flex-shrink-0" />
              <span>
                {t('cases.missingSince')}: {new Date(caseData.dateMissing).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}
              </span>
            </div>
          </div>

          {/* View Details Link */}
          <div className="mt-4 pt-4 border-t border-border/50">
            <span className="flex items-center gap-2 text-primary text-sm font-medium group-hover:gap-3 transition-all">
              {t('cases.viewDetails')}
              <ArrowIcon className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
