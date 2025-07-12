
"use client";

import { useState, useEffect } from 'react';
import { ThumbnailGallery } from "@/components/common/thumbnail-gallery";
import { photoItems } from "@/data/media";
import type { MediaItem } from '@/data/media';

export function PhotoGallerySection() {
  const [items, setItems] = useState<MediaItem[]>(photoItems);

  useEffect(() => {
    // On the client, after the initial render, shuffle the items and update the state.
    // This pattern ensures the server and initial client render are identical, fixing hydration errors.
    const shuffled = [...photoItems].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <ThumbnailGallery
      items={items} // Use the stateful items
      itemType="photo"
      titleKey="photoGalleryTitle"
      itemAspectRatio="aspect-[4/5]"
      itemWidthClass="w-[140px]"
      scrollContainerMaxWidthClass="max-w-[1076px]"
      imageSizes="140px"
      paddingTopClass="pt-4 md:pt-6"
      paddingBottomClass="pb-4 md:pb-6"
    />
  );
}
