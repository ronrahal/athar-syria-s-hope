export type CaseStatus = 
  | 'kidnapped'
  | 'ransom'
  | 'killed'
  | 'returned'
  | 'missing'
  | 'investigation';

export interface CaseTimeline {
  id: string;
  date: string;
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
}

export interface Case {
  id: string;
  caseNumber: string;
  firstName: string;
  lastName: string;
  firstNameAr?: string;
  lastNameAr?: string;
  age: number;
  gender: 'male' | 'female';
  photo?: string;
  dateMissing: string;
  lastSeenLocation: string;
  lastSeenLocationAr?: string;
  descriptionEn: string;
  descriptionAr: string;
  status: CaseStatus;
  isUrgent?: boolean;
  isFeatured?: boolean;
  timeline: CaseTimeline[];
  evidence: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface CaseFilters {
  search: string;
  status: CaseStatus | 'all';
  sortBy: 'date' | 'name' | 'caseNumber';
  sortOrder: 'asc' | 'desc';
}

export function generateCaseNumber(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ATH-${year}-${random}`;
}

export function getStatusLabel(status: CaseStatus, language: 'en' | 'ar'): string {
  const labels: Record<CaseStatus, { en: string; ar: string }> = {
    kidnapped: { en: 'Kidnapped', ar: 'مختطف' },
    ransom: { en: 'Kidnapped for Ransom', ar: 'مختطف للفدية' },
    killed: { en: 'Killed', ar: 'قُتل' },
    returned: { en: 'Returned Safely', ar: 'عاد بسلام' },
    missing: { en: 'Missing (Voluntary)', ar: 'مفقود (طوعي)' },
    investigation: { en: 'Under Investigation', ar: 'قيد التحقيق' },
  };
  return labels[status][language];
}

export function getStatusClass(status: CaseStatus): string {
  const classes: Record<CaseStatus, string> = {
    kidnapped: 'status-kidnapped',
    ransom: 'status-ransom',
    killed: 'status-killed',
    returned: 'status-returned',
    missing: 'status-missing',
    investigation: 'status-investigation',
  };
  return classes[status];
}
