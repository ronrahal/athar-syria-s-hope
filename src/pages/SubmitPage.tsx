import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Lock, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SubmitPage() {
  const { t, isArabic } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    toast({
      title: isArabic ? 'تم إرسال البلاغ' : 'Report Submitted',
      description: t('submit.success'),
    });
  };

  if (isSubmitted) {
    return (
      <Layout>
        <div className="min-h-screen py-24 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-12 max-w-md text-center gold-border-glow"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-success/10">
                <CheckCircle className="h-12 w-12 text-success" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {isArabic ? 'شكراً لك' : 'Thank You'}
            </h2>
            <p className="text-muted-foreground">
              {t('submit.success')}
            </p>
          </motion.div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-primary/10">
                <Shield className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gold-gradient-text">
              {t('submit.title')}
            </h1>
            <p className="text-muted-foreground text-lg">
              {t('submit.subtitle')}
            </p>
          </motion.div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-4 mb-8 flex items-center gap-3 border-primary/30"
          >
            <Lock className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-sm text-muted-foreground">
              {t('submit.encrypted')}
            </span>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 md:p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t('submit.form.firstName')} *</Label>
                  <Input
                    id="firstName"
                    required
                    className="bg-muted/50 border-border/50 focus:border-primary"
                    placeholder={isArabic ? 'أدخل الاسم الأول' : 'Enter first name'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t('submit.form.lastName')} *</Label>
                  <Input
                    id="lastName"
                    required
                    className="bg-muted/50 border-border/50 focus:border-primary"
                    placeholder={isArabic ? 'أدخل اسم العائلة' : 'Enter last name'}
                  />
                </div>
              </div>

              {/* Age and Gender */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">{t('submit.form.age')} *</Label>
                  <Input
                    id="age"
                    type="number"
                    required
                    min="0"
                    max="120"
                    className="bg-muted/50 border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">{t('submit.form.gender')} *</Label>
                  <Select required>
                    <SelectTrigger className="bg-muted/50 border-border/50">
                      <SelectValue placeholder={isArabic ? 'اختر' : 'Select'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">{t('cases.male')}</SelectItem>
                      <SelectItem value="female">{t('cases.female')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lastSeen">{t('submit.form.lastSeen')} *</Label>
                  <Input
                    id="lastSeen"
                    required
                    className="bg-muted/50 border-border/50 focus:border-primary"
                    placeholder={isArabic ? 'مثال: دمشق، سوريا' : 'e.g., Damascus, Syria'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateMissing">{t('submit.form.dateMissing')} *</Label>
                  <Input
                    id="dateMissing"
                    type="date"
                    required
                    className="bg-muted/50 border-border/50 focus:border-primary"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">{t('submit.form.description')} *</Label>
                <Textarea
                  id="description"
                  required
                  rows={5}
                  className="bg-muted/50 border-border/50 focus:border-primary resize-none"
                  placeholder={isArabic 
                    ? 'يرجى تقديم أي تفاصيل إضافية قد تساعد في العثور على هذا الشخص...'
                    : 'Please provide any additional details that might help locate this person...'
                  }
                />
              </div>

              {/* File Upload */}
              <div className="space-y-2">
                <Label>{t('submit.form.files')}</Label>
                <div className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground">
                    {isArabic 
                      ? 'اسحب الملفات هنا أو انقر للتحميل'
                      : 'Drag files here or click to upload'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {isArabic ? 'الحد الأقصى: 10 ميجابايت، صور فقط' : 'Max 10MB, images only'}
                  </p>
                  <input type="file" className="hidden" accept="image/*" multiple />
                </div>
              </div>

              {/* Contact (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="contact">{t('submit.form.contact')}</Label>
                <Input
                  id="contact"
                  className="bg-muted/50 border-border/50 focus:border-primary"
                  placeholder={isArabic ? 'بريد إلكتروني أو رقم هاتف' : 'Email or phone number'}
                />
              </div>

              {/* Disclaimer */}
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <AlertCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground">
                  {t('submit.disclaimer')}
                </p>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-6 text-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      ⏳
                    </motion.span>
                    {t('submit.form.submitting')}
                  </span>
                ) : (
                  t('submit.form.submit')
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
