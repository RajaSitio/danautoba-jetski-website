"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-language';

interface PaginationControlsProps {
  totalPages: number;
  currentPage: number;
  basePath: string;
}

export function PaginationControls({ totalPages, currentPage, basePath }: PaginationControlsProps) {
  const { t } = useTranslation();

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <div className="flex items-center justify-between mt-8 md:mt-12">
      {hasPreviousPage ? (
        <Button asChild variant="outline">
          <Link href={`${basePath}?page=${currentPage - 1}`} scroll={false}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            {t('pagination_previous')}
          </Link>
        </Button>
      ) : (
        <Button variant="outline" disabled>
          <ChevronLeft className="mr-2 h-4 w-4" />
          {t('pagination_previous')}
        </Button>
      )}
      
      <div className="text-sm text-muted-foreground">
        {t('pagination_page_info', { currentPage, totalPages })}
      </div>

      {hasNextPage ? (
        <Button asChild variant="outline">
          <Link href={`${basePath}?page=${currentPage + 1}`} scroll={false}>
            {t('pagination_next')}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      ) : (
        <Button variant="outline" disabled>
          {t('pagination_next')}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
