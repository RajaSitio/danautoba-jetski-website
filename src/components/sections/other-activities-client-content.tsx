
"use client";

import { useTranslation } from '@/hooks/use-language';
import { Waves } from 'lucide-react';
import type { OtherActivityInfo } from '@/data/other-activities';
import { OtherActivityCard } from '@/components/common/other-activity-card';

interface OtherActivitiesClientContentProps {
    activities: OtherActivityInfo[];
}

export function OtherActivitiesClientContent({ activities }: OtherActivitiesClientContentProps) {
    const { t } = useTranslation();
    const title = t('other_activities_page_title');
    const subtitle = t('other_activities_page_subtitle');

    return (
        <main className="py-8 md:py-12 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl font-bold text-primary mb-3">
                        <Waves className="inline-block h-8 w-8 md:h-9 md:w-9 mr-3 mb-1" />
                        {title}
                    </h1>
                    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {activities.map((activity) => (
                        <OtherActivityCard key={activity.id} activityInfo={activity} />
                    ))}
                </div>
            </div>
        </main>
    );
}
