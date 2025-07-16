
"use client";

import { useState, useEffect } from 'react'; // Import hooks
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { useTranslation } from '@/hooks/use-language';
import type { Article } from '@/data/articles';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { t, currentLanguage } = useTranslation();
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // Defer date formatting to the client side to avoid hydration mismatch
    setFormattedDate(
      new Date(article.publishedOn).toLocaleDateString(
        currentLanguage === 'id' ? 'id-ID' : 'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      )
    );
  }, [article.publishedOn, currentLanguage]);

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-lg hover:shadow-primary/30 transition-shadow duration-300 h-full bg-card group">
      {/* Box with title, replacing the image */}
      <Link href={`/blog/${article.id}`} className="block group/title-box">
        <div className="relative w-full bg-muted/50 border-b border-border flex items-center justify-center p-6 text-center transition-colors duration-300 group-hover:bg-primary/20">
          <h2 className="text-xl font-bold text-foreground group-hover/title-box:text-primary transition-colors duration-300">
            {t(article.titleKey)}
          </h2>
        </div>
      </Link>
      
      {/* Date and summary are now in CardContent */}
      <CardContent className="p-6 flex-grow">
        <div className="flex items-center text-xs text-muted-foreground mb-4">
          <Calendar className="mr-2 h-4 w-4" />
          <span>{t('blog_published_on')}{' '}
            {formattedDate ? (
              formattedDate
            ) : (
              <span className="inline-block w-24 h-4 bg-muted animate-pulse rounded-sm" />
            )}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {t(article.summaryKey)}
        </p>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button asChild variant="link" className="p-0 h-auto text-primary">
          <Link href={`/blog/${article.id}`}>
            {t('blog_read_more')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
