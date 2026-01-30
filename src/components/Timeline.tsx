import { CaseTimeline as TimelineType } from '@/types/case';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Calendar, Circle } from 'lucide-react';

interface TimelineProps {
  events: TimelineType[];
}

export function Timeline({ events }: TimelineProps) {
  const { isArabic } = useLanguage();

  return (
    <div className="relative">
      {/* Vertical Line */}
      <div className="absolute top-0 bottom-0 left-4 rtl:left-auto rtl:right-4 w-px bg-border" />

      <div className="space-y-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative flex gap-4 rtl:flex-row-reverse"
          >
            {/* Dot */}
            <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-card border-2 border-primary flex items-center justify-center">
              <Circle className="h-3 w-3 text-primary fill-primary" />
            </div>

            {/* Content */}
            <div className="flex-1 glass-card p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={event.date}>
                  {new Date(event.date).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
              
              <h4 className="font-semibold text-foreground mb-1">
                {isArabic ? event.titleAr : event.titleEn}
              </h4>
              
              {(event.descriptionEn || event.descriptionAr) && (
                <p className="text-sm text-muted-foreground">
                  {isArabic ? event.descriptionAr : event.descriptionEn}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
