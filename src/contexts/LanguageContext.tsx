import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
  isArabic: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.cases': 'Cases',
    'nav.about': 'About',
    'nav.submit': 'Submit Report',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'Athar',
    'hero.subtitle': 'Documenting the Missing, Preserving Hope',
    'hero.description': 'A humanitarian platform dedicated to documenting cases of missing persons in Syria, providing a voice to the voiceless and hope to the waiting.',
    'hero.cta.browse': 'Browse Cases',
    'hero.cta.submit': 'Submit Anonymous Report',
    
    // Stats
    'stats.total': 'Total Cases',
    'stats.active': 'Active Cases',
    'stats.resolved': 'Resolved',
    'stats.urgent': 'Urgent',
    
    // Cases
    'cases.title': 'Cases Database',
    'cases.subtitle': 'Search and browse documented cases',
    'cases.search': 'Search by name or case number...',
    'cases.filter.all': 'All Statuses',
    'cases.filter.kidnapped': 'Kidnapped',
    'cases.filter.ransom': 'Kidnapped for Ransom',
    'cases.filter.killed': 'Killed',
    'cases.filter.returned': 'Returned Safely',
    'cases.filter.missing': 'Missing (Voluntary)',
    'cases.filter.investigation': 'Under Investigation',
    'cases.noResults': 'No cases found matching your criteria',
    'cases.caseNumber': 'Case',
    'cases.lastSeen': 'Last Seen',
    'cases.missingSince': 'Missing Since',
    'cases.viewDetails': 'View Details',
    'cases.age': 'Age',
    'cases.gender': 'Gender',
    'cases.male': 'Male',
    'cases.female': 'Female',
    'cases.location': 'Location',
    
    // Case Detail
    'case.timeline': 'Case Timeline',
    'case.updates': 'Updates',
    'case.evidence': 'Evidence & Media',
    'case.share': 'Share This Case',
    'case.description': 'Description',
    'case.personalInfo': 'Personal Information',
    'case.caseDetails': 'Case Details',
    
    // About (Updated with professional human rights documentation text)
    'about.title': 'About Athar',
    'about.mission': 'Our Mission',
    'about.missionText': 'Athar was established in response to the escalating violations of fundamental rights in Syria—most notably enforced disappearances, the abduction of women, and the extrajudicial detention of men. As an independent human rights platform, Athar is dedicated to documenting cases of the abducted and disappeared while monitoring practices that contravene constitutional principles and international standards. We believe enforced disappearance and arbitrary detention are grave, ongoing crimes not subject to statutes of limitations. Athar adheres to rigorous professional and legal documentation methodologies, ensuring a clear distinction between verified facts and allegations. Athar is not an accusatory body; it is a documentation platform. It does not replace the judiciary; it preserves the facts. Because justice begins with preserving the trace.',
    'about.methodology': 'Methodology',
    'about.methodologyText': 'We employ rigorous verification processes to ensure the accuracy of each case while protecting the privacy and safety of all individuals involved.',
    'about.values': 'Our Values',
    'about.value1': 'Truth & Accuracy',
    'about.value2': 'Compassion & Dignity',
    'about.value3': 'Transparency',
    'about.value4': 'Security & Privacy',
    
    // Join Us Section
    'join.title': 'Join Us in This Mission',
    'join.description': 'If you have any information about any missing person, or would like to contribute to our efforts, please reach out to us. Every piece of information could help reunite a family.',
    'join.trace': 'Your participation will leave a trace',

    // Submit
    'submit.title': 'Submit Anonymous Report',
    'submit.subtitle': 'Your identity will remain protected',
    'submit.encrypted': 'All submissions are encrypted and secure',
    'submit.form.firstName': 'First Name of Missing Person',
    'submit.form.lastName': 'Last Name of Missing Person',
    'submit.form.age': 'Age (at time of disappearance)',
    'submit.form.gender': 'Gender',
    'submit.form.lastSeen': 'Last Known Location',
    'submit.form.dateMissing': 'Date Missing',
    'submit.form.description': 'Description & Additional Details',
    'submit.form.contact': 'Contact Information (optional)',
    'submit.form.files': 'Upload Photos or Documents',
    'submit.form.submit': 'Submit Report',
    'submit.form.submitting': 'Submitting...',
    'submit.success': 'Report submitted successfully. Thank you.',
    'submit.disclaimer': 'By submitting this report, you confirm that the information provided is accurate to the best of your knowledge.',
    
    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.contact': 'Contact Us',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.share': 'Share',
    'common.download': 'Download',
    'common.print': 'Print',
    'common.close': 'Close',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.readMore': 'Read More',
    'common.urgent': 'URGENT',
    'common.featured': 'Featured',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.cases': 'الحالات',
    'nav.about': 'من نحن',
    'nav.submit': 'تقديم بلاغ',
    'nav.contact': 'اتصل بنا',
    
    // Hero
    'hero.title': 'أثر',
    'hero.subtitle': 'توثيق المفقودين، الحفاظ على الأمل',
    'hero.description': 'منصة إنسانية مكرسة لتوثيق حالات المفقودين في سوريا، لإعطاء صوت للذين لا صوت لهم وأمل للمنتظرين.',
    'hero.cta.browse': 'تصفح الحالات',
    'hero.cta.submit': 'تقديم بلاغ مجهول',
    
    // Stats
    'stats.total': 'إجمالي الحالات',
    'stats.active': 'حالات نشطة',
    'stats.resolved': 'تم حلها',
    'stats.urgent': 'عاجلة',
    
    // Cases
    'cases.title': 'قاعدة بيانات الحالات',
    'cases.subtitle': 'البحث وتصفح الحالات الموثقة',
    'cases.search': 'البحث بالاسم أو رقم الحالة...',
    'cases.filter.all': 'جميع الحالات',
    'cases.filter.kidnapped': 'مختطف',
    'cases.filter.ransom': 'مختطف للفدية',
    'cases.filter.killed': 'قُتل',
    'cases.filter.returned': 'عاد بسلام',
    'cases.filter.missing': 'مفقود (طوعي)',
    'cases.filter.investigation': 'قيد التحقيق',
    'cases.noResults': 'لم يتم العثور على حالات تطابق معاييرك',
    'cases.caseNumber': 'رقم الحالة',
    'cases.lastSeen': 'آخر مشاهدة',
    'cases.missingSince': 'مفقود منذ',
    'cases.viewDetails': 'عرض التفاصيل',
    'cases.age': 'العمر',
    'cases.gender': 'الجنس',
    'cases.male': 'ذكر',
    'cases.female': 'أنثى',
    'cases.location': 'الموقع',
    
    // Case Detail
    'case.timeline': 'الجدول الزمني للحالة',
    'case.updates': 'التحديثات',
    'case.evidence': 'الأدلة والوسائط',
    'case.share': 'مشاركة هذه الحالة',
    'case.description': 'الوصف',
    'case.personalInfo': 'المعلومات الشخصية',
    'case.caseDetails': 'تفاصيل الحالة',
    
    // About (Updated Arabic)
    'about.title': 'عن أثر',
    'about.mission': 'مهمتنا',
    'about.missionText': 'تأسست منصة أثر استجابةً للانتهاكات الجسيمة والمتصاعدة للحقوق الأساسية في سوريا، وفي مقدمتها الإخفاء القسري، واختطاف النساء، واحتجاز الرجال خارج أي إطار قانوني. تعمل أثر كمنصة حقوقية مستقلة مخصصة لتوثيق قضايا المختطفين والمختفين قسرياً، ورصد وتحليل الممارسات التي تنتهك الحق في الحرية والكرامة الإنسانية. تنطلق المنصة من مبدأ أن الإخفاء القسري والاحتجاز التعسفي جرائم مستمرة لا تسقط بالتقادم. تلتزم أثر بمنهجيات توثيق مهنية وقانونية، مع ضمان الفصل الواضح بين الوقائع المؤكدة والادعاءات. أثر لا تدين، بل تثبت. أثر لا تحل محل القضاء، بل تحفظ الوقائع. لأن العدالة تبدأ بحفظ الأثر.',
    'about.methodology': 'المنهجية',
    'about.methodologyText': 'نستخدم عمليات تحقق صارمة لضمان دقة كل حالة مع حماية خصوصية وسلامة جميع الأفراد المعنيين.',
    'about.values': 'قيمنا',
    'about.value1': 'الحقيقة والدقة',
    'about.value2': 'الرحمة والكرامة',
    'about.value3': 'الشفافية',
    'about.value4': 'الأمان والخصوصية',
    
    // Join Us Section
    'join.title': 'انضم إلينا في هذه المهمة',
    'join.description': 'إذا كانت لديك أي معلومات عن أي شخص مفقود، أو ترغب في المساهمة في جهودنا، يرجى التواصل معنا. كل معلومة قد تساعد في لم شمل الأسرة.',
    'join.trace': 'مشاركتكم ستترك أثراً',

    // Submit
    'submit.title': 'تقديم بلاغ مجهول',
    'submit.subtitle': 'ستبقى هويتك محمية',
    'submit.encrypted': 'جميع البلاغات مشفرة وآمنة',
    'submit.form.firstName': 'الاسم الأول للشخص المفقود',
    'submit.form.lastName': 'اسم العائلة للشخص المفقود',
    'submit.form.age': 'العمر (وقت الاختفاء)',
    'submit.form.gender': 'الجنس',
    'submit.form.lastSeen': 'آخر موقع معروف',
    'submit.form.dateMissing': 'تاريخ الاختفاء',
    'submit.form.description': 'الوصف والتفاصيل الإضافية',
    'submit.form.contact': 'معلومات الاتصال (اختياري)',
    'submit.form.files': 'رفع صور أو مستندات',
    'submit.form.submit': 'إرسال البلاغ',
    'submit.form.submitting': 'جاري الإرسال...',
    'submit.success': 'تم إرسال البلاغ بنجاح. شكراً لك.',
    'submit.disclaimer': 'بتقديم هذا البلاغ، تؤكد أن المعلومات المقدمة دقيقة على حد علمك.',
    
    // Footer
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    'footer.contact': 'اتصل بنا',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.share': 'مشاركة',
    'common.download': 'تحميل',
    'common.print': 'طباعة',
    'common.close': 'إغلاق',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.readMore': 'اقرأ المزيد',
    'common.urgent': 'عاجل',
    'common.featured': 'مميز',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('athar-language');
    return (stored as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('athar-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';
  const isArabic = language === 'ar';

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
  }, [language, dir]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, isArabic }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}