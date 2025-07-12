
"use client";

import { useState, useEffect } from 'react';
import { ThumbnailGallery } from "@/components/common/thumbnail-gallery";
import { videoItems } from "@/data/media";
import type { MediaItem } from '@/data/media';

export function VideoGallerySection() {
  const [items, setItems] = useState<MediaItem[]>(videoItems);

  useEffect(() => {
    // On the client, after the initial render, shuffle the items and update the state.
    // This ensures the server and initial client render are identical, fixing hydration errors.
    const shuffled = [...videoItems].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <ThumbnailGallery
      items={items} // Use the stateful items
      itemType="video"
      titleKey="videoGalleryTitle"
      itemAspectRatio="aspect-[9/16]"
      itemWidthClass="w-[140px]"
      scrollContainerMaxWidthClass="max-w-[1076px]"
      imageSizes="140px"
      paddingBottomClass="pb-4 md:pb-6"
    />
  );
}
