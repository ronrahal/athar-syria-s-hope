import { useState, useMemo } from 'react';
import { Layout } from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { CaseCard } from '@/components/CaseCard';
import { mockCases } from '@/data/mockCases';
import { CaseStatus, getStatusLabel } from '@/types/case';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CasesPage() {
  const { t, language, isArabic } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<CaseStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const statuses: (CaseStatus | 'all')[] = ['all', 'kidnapped', 'ransom', 'killed', 'returned', 'missing', 'investigation'];

  const filteredCases = useMemo(() => {
    return mockCases.filter(caseData => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        caseData.caseNumber.toLowerCase().includes(searchLower) ||
        caseData.firstName.toLowerCase().includes(searchLower) ||
        caseData.lastName.toLowerCase().includes(searchLower) ||
        (caseData.firstNameAr && caseData.firstNameAr.includes(searchQuery)) ||
        (caseData.lastNameAr && caseData.lastNameAr.includes(searchQuery)) ||
        caseData.lastSeenLocation.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = statusFilter === 'all' || caseData.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  return (
    <Layout>
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 gold-gradient-text">
              {t('cases.title')}
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('cases.subtitle')}
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-4 md:p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t('cases.search')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rtl:pl-4 rtl:pr-10 bg-muted/50 border-border/50 focus:border-primary"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-muted-foreground hidden md:block" />
                <Select 
                  value={statusFilter} 
                  onValueChange={(value) => setStatusFilter(value as CaseStatus | 'all')}
                >
                  <SelectTrigger className="w-full md:w-48 bg-muted/50 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === 'all' 
                          ? t('cases.filter.all')
                          : getStatusLabel(status, language)
                        }
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 border border-border/50 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                  size="icon"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-muted-foreground">
              {isArabic 
                ? `${filteredCases.length} حالة موجودة`
                : `${filteredCases.length} cases found`
              }
            </div>
          </motion.div>

          {/* Cases Grid/List */}
          {filteredCases.length > 0 ? (
            <div className={
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
            }>
              {filteredCases.map((caseData, index) => (
                <CaseCard key={caseData.id} caseData={caseData} index={index} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="glass-card p-12 max-w-md mx-auto">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">
                  {t('cases.noResults')}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
