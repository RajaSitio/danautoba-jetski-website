"use client";

import { useState, useEffect } from 'react'; // Import hooks
import type { Article } from '@/data/articles';
import { useTranslation } from '@/hooks/use-language';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, ArrowLeft } from 'lucide-react';

interface ArticleClientContentProps {
    article: Article;
}

export function ArticleClientContent({ article }: ArticleClientContentProps) {
    const { t, currentLanguage } = useTranslation();
    const [formattedDate, setFormattedDate] = useState(''); // State for formatted date
    
    const title = t(article.titleKey);
    const content = t(article.contentKey);
    const publishedOnText = t('blog_published_on');

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
        <main className="py-8 md:py-12 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                <div className="mb-8">
                    <Button variant="outline" asChild>
                        <Link href="/blog">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            {t('menuBlog')}
                        </Link>
                    </Button>
                </div>

                <Card className="overflow-hidden shadow-xl">
                    <article>
                        {/* Box with title, replacing the image */}
                        <div className="relative w-full bg-muted flex items-center justify-center p-6 text-center border-b border-border">
                            <h1 className="text-3xl md:text-4xl font-extrabold text-primary leading-tight">
                                {title}
                            </h1>
                        </div>

                        <div className="p-6 md:p-8">
                            {/* Header now only contains the date */}
                            <header className="mb-8">
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    <span>{publishedOnText}{' '}
                                        {formattedDate ? (
                                            formattedDate
                                        ) : (
                                            <span className="inline-block w-24 h-4 bg-muted animate-pulse rounded-sm" />
                                        )}
                                    </span>
                                </div>
                            </header>

                            <div
                                className="prose prose-lg dark:prose-invert max-w-none text-foreground/90 
                                           prose-headings:text-primary prose-headings:font-semibold 
                                           prose-a:text-primary hover:prose-a:text-primary/90 
                                           prose-strong:text-foreground 
                                           prose-blockquote:border-primary prose-blockquote:text-muted-foreground
                                           prose-li:marker:text-primary"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </div>
                    </article>
                </Card>
            </div>
        </main>
    );
}
