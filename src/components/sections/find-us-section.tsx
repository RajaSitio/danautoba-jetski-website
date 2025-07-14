"use client";

import { useTranslation } from '@/hooks/use-language';
import { locationDetails } from '@/data/locations';
import { LocationCard } from '@/components/common/location-card';
import { MapPin } from 'lucide-react';

export function FindUsSection() {
  const { t } = useTranslation();

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

        {operationalLocations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {operationalLocations.map((location) => {
              let mapSrc = '';
              if (location.id === 'tio-beach') {
                mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=98.849177,2.655589,98.859177,2.665589&layer=mapnik&marker=2.660089,98.854177`;
              } else if (location.id === 'juma-cottage') {
                mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=98.860743,2.666542,98.870743,2.676542&layer=mapnik&marker=2.671542,98.865743`;
              }

              return (
                <LocationCard
                  key={location.id}
                  location={location}
                >
                  {mapSrc && (
                     <div className="relative w-full aspect-video overflow-hidden rounded-md shadow-inner mt-2 mb-4">
                        <div className="absolute top-2 left-2 flex items-center bg-background/80 px-2 py-1 rounded-md shadow">
                           <MapPin className="mr-2 h-4 w-4 text-destructive flex-shrink-0" />
                           <span className="text-xs font-semibold">{t(location.nameKey)}</span>
                        </div>
                        <iframe
                          width="100%"
                          height="100%"
                          loading="lazy"
                          src={mapSrc}
                          className="absolute top-0 left-0 w-full h-full border-0"
                          title={`Map of ${t(location.nameKey)}`}
                        ></iframe>
                      </div>
                  )}
                </LocationCard>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            {t('findUsSectionNoLocations', {defaultValue: 'Location information will be available soon.'})}
          </p>
        )}
      </div>
    </section>
  );
}
