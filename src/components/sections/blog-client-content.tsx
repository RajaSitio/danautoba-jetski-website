
"use client";

import type { Article } from '@/data/articles';
import { useTranslation } from '@/hooks/use-language';
import { useSearchParams } from 'next/navigation';
import { Newspaper } from 'lucide-react';
import { ArticleCard } from '@/components/common/article-card';
import { PaginationControls } from '@/components/common/pagination-controls';

interface BlogClientContentProps {
    articles: Article[];
}

const ARTICLES_PER_PAGE = 4;

export function BlogClientContent({ articles }: BlogClientContentProps) {
    const { t } = useTranslation();
    const searchParams = useSearchParams();

    const page = searchParams.get('page') ?? '1';
    const currentPage = Number(page);

    const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);

    const start = (currentPage - 1) * ARTICLES_PER_PAGE;
    const end = start + ARTICLES_PER_PAGE;
    const paginatedArticles = articles.slice(start, end);

    return (
        <main className="py-8 md:py-12 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                        <Newspaper className="inline-block h-8 w-8 md:h-9 md:w-9 mr-3 mb-1" />
                        {t('blog_page_title')}
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        {t('blog_page_subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {paginatedArticles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
                
                {totalPages > 1 && (
                    <PaginationControls
                        totalPages={totalPages}
                        currentPage={currentPage}
                        basePath="/blog"
                    />
                )}
            </div>
        </main>
    );
}
