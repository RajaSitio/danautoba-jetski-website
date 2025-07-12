
"use client";

import type { ReactNode } from 'react';
import { useTranslation } from '@/hooks/use-language';
import { locationDetails } from '@/data/locations';
import { LocationCard } from '@/components/common/location-card';
import { MapPin } from 'lucide-react';

export function FindUsSection() {
  const { t } = useTranslation();
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  // A robust check to see if the API key is provided and not a placeholder.
  const apiKeyIsAvailable = GOOGLE_MAPS_API_KEY && !GOOGLE_MAPS_API_KEY.includes('MASUKKAN_API_KEY');

  // Filter to only show operational locations
  const operationalLocations = locationDetails.filter(
    (loc) => loc.id === 'tio-beach' || loc.id === 'juma-cottage'
  );

  return (
    <section id="find-us" className="pt-8 pb-8 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-6 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
            <MapPin className="inline-block h-7 w-7 md:h-8 md:w-8 mr-2 mb-1" />
            {t('findUsSectionTitle')}
          </h2>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto">
            {t('findUsSectionSubtitle')}
          </p>
        </div>

        {apiKeyIsAvailable ? (
          <>
            {operationalLocations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {operationalLocations.map((location) => {
                  const locationName = t(location.nameKey);
                  const locationAddress = t(location.addressKey);
                  
                  const individualMapQuery = `${locationName}, ${locationAddress}`;
                  const individualMapSrc = `https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(individualMapQuery)}`;

                  return (
                    <LocationCard
                      key={location.id}
                      location={location}
                    >
                      <iframe
                        src={individualMapSrc}
                        width="100%"
                        height="250"
                        style={{ border:0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="rounded-md shadow-md"
                        title={`${locationName} Map`}
                      ></iframe>
                    </LocationCard>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-muted-foreground">
                {t('findUsSectionNoLocations', {defaultValue: 'Location information will be available soon.'})}
              </p>
            )}
          </>
        ) : (
          <div className="text-center p-8 bg-destructive/10 border border-destructive text-destructive rounded-lg shadow-lg">
            <h3 className="font-semibold text-xl mb-2">{t('maps_api_key_missing_title')}</h3>
            <p className="text-base">{t('maps_api_key_missing_message')}</p>
          </div>
        )}
      </div>
    </section>
  );
}
