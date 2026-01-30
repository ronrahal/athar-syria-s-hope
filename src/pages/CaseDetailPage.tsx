import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Timeline } from '@/components/Timeline';
import { mockCases } from '@/data/mockCases';
import { getStatusLabel, getStatusClass } from '@/types/case';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  ArrowLeft, ArrowRight, Calendar, MapPin, User, Hash, 
  Share2, Twitter, Facebook, MessageCircle, Copy, Check,
  AlertTriangle, ImageIcon
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function CaseDetailPage() {
  const { caseNumber } = useParams<{ caseNumber: string }>();
  const { t, language, isArabic } = useLanguage();
  const [copied, setCopied] = useState(false);

  const caseData = mockCases.find(c => c.caseNumber === caseNumber);
  const ArrowIcon = isArabic ? ArrowRight : ArrowLeft;

  if (!caseData) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center glass-card p-12">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {isArabic ? 'الحالة غير موجودة' : 'Case Not Found'}
            </h1>
            <Button asChild variant="outline">
              <Link to="/cases" className="flex items-center gap-2">
                <ArrowIcon className="h-4 w-4" />
                {t('common.back')}
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const name = isArabic && caseData.firstNameAr 
    ? `${caseData.firstNameAr} ${caseData.lastNameAr}`
    : `${caseData.firstName} ${caseData.lastName}`;
  
  const location = isArabic && caseData.lastSeenLocationAr
    ? caseData.lastSeenLocationAr
    : caseData.lastSeenLocation;

  const description = isArabic ? caseData.descriptionAr : caseData.descriptionEn;

  const shareText = `${isArabic ? 'عاجل: ' : 'URGENT: '}${name} ${isArabic ? 'مفقود منذ' : 'missing since'} ${new Date(caseData.dateMissing).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')} ${isArabic ? 'في' : 'in'} ${location}. ${isArabic ? 'رقم الحالة' : 'Case'} #${caseData.caseNumber}. #Athar #Syria`;
  
  const shareUrl = window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: isArabic ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Link to="/cases" className="flex items-center gap-2">
                <ArrowIcon className="h-4 w-4" />
                {isArabic ? 'العودة إلى الحالات' : 'Back to Cases'}
              </Link>
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3">
                  {/* Photo */}
                  <div className="relative aspect-square md:aspect-auto">
                    {caseData.photo ? (
                      <img
                        src={caseData.photo}
                        alt={name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center min-h-64">
                        <User className="h-24 w-24 text-muted-foreground" />
                      </div>
                    )}
                    
                    {caseData.isUrgent && (
                      <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                        <Badge className="bg-destructive text-destructive-foreground animate-pulse flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          {t('common.urgent')}
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="md:col-span-2 p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Hash className="h-4 w-4" />
                          <span className="font-mono">{caseData.caseNumber}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                          {name}
                        </h1>
                      </div>
                      <span className={`status-badge ${getStatusClass(caseData.status)}`}>
                        {getStatusLabel(caseData.status, language)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-4 w-4 text-primary" />
                        <span>{caseData.age} {isArabic ? 'سنة' : 'years old'}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{new Date(caseData.dateMissing).toLocaleDateString(isArabic ? 'ar-SA' : 'en-US')}</span>
                      </div>
                      <div className="col-span-2 flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{location}</span>
                      </div>
                    </div>

                    {/* Share Button */}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                          <Share2 className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                          {t('case.share')}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-card border-border">
                        <DialogHeader>
                          <DialogTitle className="gold-gradient-text">{t('case.share')}</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')}
                          >
                            <Twitter className="h-4 w-4" />
                            Twitter / X
                          </Button>
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
                          >
                            <Facebook className="h-4 w-4" />
                            Facebook
                          </Button>
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank')}
                          >
                            <MessageCircle className="h-4 w-4" />
                            Telegram
                          </Button>
                          <Button
                            variant="outline"
                            className="flex items-center gap-2"
                            onClick={copyToClipboard}
                          >
                            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                            {copied ? (isArabic ? 'تم النسخ' : 'Copied!') : (isArabic ? 'نسخ الرابط' : 'Copy Link')}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 md:p-8"
              >
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {t('case.description')}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </motion.div>

              {/* Evidence Gallery */}
              {caseData.evidence.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card p-6 md:p-8"
                >
                  <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-primary" />
                    {t('case.evidence')}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {caseData.evidence.map((url, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={url}
                          alt={`Evidence ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Timeline */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card p-6 sticky top-24"
              >
                <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  {t('case.timeline')}
                </h2>
                <Timeline events={caseData.timeline} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
