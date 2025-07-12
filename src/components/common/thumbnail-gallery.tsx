
"use client";

import type { MediaItem } from '@/data/media';
import { useTranslation } from '@/hooks/use-language';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, PlayCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';

interface ThumbnailGalleryProps {
  items: MediaItem[];
  titleKey: string;
  itemType: 'video' | 'photo';
  itemAspectRatio?: string;
  itemWidthClass?: string;
  scrollContainerMaxWidthClass?: string;
  imageSizes?: string;
  paddingTopClass?: string;
  paddingBottomClass?: string;
}

export function ThumbnailGallery({
  items,
  titleKey,
  itemType,
  itemAspectRatio = "aspect-[4/5]",
  itemWidthClass = "w-[180px] sm:w-[200px] md:w-[220px]",
  scrollContainerMaxWidthClass,
  imageSizes = "100px",
  paddingTopClass,
  paddingBottomClass,
}: ThumbnailGalleryProps) {
  const { t } = useTranslation();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Video Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoItem, setCurrentVideoItem] = useState<MediaItem | null>(null);
  const [activeVideoItemIndex, setActiveVideoItemIndex] = useState<number | null>(null);
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const [currentVolume, setCurrentVolume] = useState<number>(1.0);
  const [isUserMuted, setIsUserMuted] = useState<boolean>(false);

  // Photo Modal State
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [currentPhotoItem, setCurrentPhotoItem] = useState<MediaItem | null>(null);
  const [activePhotoItemIndex, setActivePhotoItemIndex] = useState<number | null>(null);


  const THUMBNAIL_WIDTH_ESTIMATE = parseInt(itemWidthClass.match(/\d+/)?.[0] || '100', 10) + 16; // Includes gap

  const checkScrollability = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const currentScrollLeft = Math.round(container.scrollLeft);
      const currentScrollWidth = Math.round(container.scrollWidth);
      const currentClientWidth = Math.round(container.clientWidth);

      // Enable scroll left if currentScrollLeft is greater than a small threshold (e.g., 1 pixel)
      setCanScrollLeft(currentScrollLeft > 1);

      const maxScrollLeft = currentScrollWidth - currentClientWidth;
      // Enable scroll right if currentScrollLeft is less than maxScrollLeft minus a small threshold
      setCanScrollRight(currentScrollLeft < (maxScrollLeft - 1));
      
      // If no scrollbar is needed (content fits), disable both
      if (maxScrollLeft <= 0) {
        setCanScrollLeft(false);
        setCanScrollRight(false);
      }
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScrollOrResize = () => {
      checkScrollability();
    };
    
    // When items are populated or layout changes:
    // 1. Reset scroll to the beginning.
    // 2. Check scrollability after a short delay for DOM updates.
    if (items.length > 0) {
      container.scrollLeft = 0;
    }

    const initialCheckTimeoutId = setTimeout(() => {
      checkScrollability();
    }, 100); // Delay to allow DOM to update after item changes and scroll reset

    container.addEventListener('scroll', handleScrollOrResize);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      clearTimeout(initialCheckTimeoutId);
      if (container) { // Check if container still exists before removing listener
        container.removeEventListener('scroll', handleScrollOrResize);
      }
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [items, itemWidthClass, checkScrollability]);


  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = THUMBNAIL_WIDTH_ESTIMATE * (direction === 'left' ? -1 : 1);
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleThumbnailClick = (item: MediaItem, index: number) => {
    if (item.type === 'video' && item.videoUrl) {
      setActiveVideoItemIndex(index);
      setIsVideoModalOpen(true);
    } else if (item.type === 'photo') {
      setActivePhotoItemIndex(index);
      setIsPhotoModalOpen(true);
    }
  };
  
  useEffect(() => {
    if (activeVideoItemIndex !== null && items[activeVideoItemIndex]?.type === 'video') {
      setCurrentVideoItem(items[activeVideoItemIndex]);
    } else if (activeVideoItemIndex === null) {
      setCurrentVideoItem(null); 
    }
  }, [activeVideoItemIndex, items]);

  useEffect(() => {
    if (activePhotoItemIndex !== null && items[activePhotoItemIndex]?.type === 'photo') {
      setCurrentPhotoItem(items[activePhotoItemIndex]);
    } else if (activePhotoItemIndex === null) {
      setCurrentPhotoItem(null);
    }
  }, [activePhotoItemIndex, items]);


  const handleVideoModalOpenChange = (open: boolean) => {
    setIsVideoModalOpen(open);
    if (!open) {
      const videoElement = videoPlayerRef.current;
      if (videoElement) {
        videoElement.pause();
      }
      setActiveVideoItemIndex(null);
    }
  };

  const handlePhotoModalOpenChange = (open: boolean) => {
    setIsPhotoModalOpen(open);
    if (!open) {
      setActivePhotoItemIndex(null);
    }
  };
  
  useEffect(() => {
    const videoElement = videoPlayerRef.current;
    if (!videoElement || !isVideoModalOpen || !currentVideoItem || !currentVideoItem.videoUrl) {
      if (videoElement && !isVideoModalOpen) videoElement.pause();
      return;
    }
  
    const ensurePlayback = () => {
      if (videoElement.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA && videoElement.paused) {
        videoElement.volume = currentVolume;
        videoElement.muted = isUserMuted;
        videoElement.play().catch(error => {
          const domError = error as DOMException;
          if (domError.name === 'AbortError') {
            console.warn('Video play() request was interrupted. This is often normal during navigation or modal close. Message:', domError.message);
          } else if (domError.name === 'NotAllowedError') {
            if (!videoElement.muted) {
              console.warn("Autoplay with sound was prevented. Attempting to play muted.");
              videoElement.muted = true; 
              setIsUserMuted(true);
               videoElement.play().catch(mutedPlayError => {
                 const mutedDomError = mutedPlayError as DOMException;
                 if (mutedDomError.name !== 'AbortError') { 
                    console.error("Error attempting to play muted video:", mutedDomError);
                 }
              });
            } else {
              console.error("Autoplay prevented even when muted:", domError);
            }
          } else {
            console.error("Error attempting to play video:", domError);
          }
        });
      }
    };
  
    const handleCanPlay = () => {
      ensurePlayback();
    };

    videoElement.addEventListener('canplay', handleCanPlay, { once: true });
    videoElement.addEventListener('error', (e) => {
        const videoElem = e.target as HTMLVideoElement;
        console.error('Video Error Event:', e);
        if (videoElem.error) {
            console.error('Video MediaError Code:', videoElem.error.code, 'Message:', videoElem.error.message);
            console.error('Video Source URL:', videoElem.currentSrc);
        } else {
            console.error('Video error occurred, but no MediaError object found. Video Source:', videoElem.currentSrc);
        }
    });
    
    if (videoElement.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      ensurePlayback();
    }
    
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('canplay', handleCanPlay);
      }
    };
  }, [isVideoModalOpen, currentVideoItem, currentVolume, isUserMuted]);


  const { prevVideoIndex, nextVideoIndex } = useMemo(() => {
    if (activeVideoItemIndex === null) return { prevVideoIndex: -1, nextVideoIndex: -1 };
    
    let prevIdx = -1;
    for (let i = activeVideoItemIndex - 1; i >= 0; i--) {
        if (items[i].type === 'video' && !!items[i].videoUrl) {
            prevIdx = i;
            break;
        }
    }

    let nextIdx = -1;
    for (let i = activeVideoItemIndex + 1; i < items.length; i++) {
        if (items[i].type === 'video' && !!items[i].videoUrl) {
            nextIdx = i;
            break;
        }
    }
    return { prevVideoIndex: prevIdx, nextVideoIndex: nextIdx };
  }, [activeVideoItemIndex, items]);

  const previousVideoItemForPreview = prevVideoIndex !== -1 ? items[prevVideoIndex] : null;
  const nextVideoItemForPreview = nextVideoIndex !== -1 ? items[nextVideoIndex] : null;

  const canGoToPreviousVideo = prevVideoIndex !== -1;
  const canGoToNextVideo = nextVideoIndex !== -1;

  const handleNextVideo = useCallback(() => {
    if (nextVideoIndex !== -1) {
      setActiveVideoItemIndex(nextVideoIndex);
    }
  }, [nextVideoIndex, setActiveVideoItemIndex]);
  
  const handlePreviousVideo = useCallback(() => {
    if (prevVideoIndex !== -1) {
      setActiveVideoItemIndex(prevVideoIndex);
    }
  }, [prevVideoIndex, setActiveVideoItemIndex]);

  const handleVideoEnded = useCallback(() => {
    if (nextVideoIndex !== -1) {
      setActiveVideoItemIndex(nextVideoIndex);
    }
    // If it's the last video (nextVideoIndex === -1), it will just stop.
  }, [nextVideoIndex, setActiveVideoItemIndex]);


  // Photo Navigation Logic
  const { prevPhotoIndex, nextPhotoIndex } = useMemo(() => {
    if (activePhotoItemIndex === null) return { prevPhotoIndex: -1, nextPhotoIndex: -1 };
    
    let prevIdx = -1;
    for (let i = activePhotoItemIndex - 1; i >= 0; i--) {
        if (items[i].type === 'photo') {
            prevIdx = i;
            break;
        }
    }

    let nextIdx = -1;
    for (let i = activePhotoItemIndex + 1; i < items.length; i++) {
        if (items[i].type === 'photo') {
            nextIdx = i;
            break;
        }
    }
    return { prevPhotoIndex: prevIdx, nextPhotoIndex: nextIdx };
  }, [activePhotoItemIndex, items]);

  const previousPhotoItemForPreview = prevPhotoIndex !== -1 ? items[prevPhotoIndex] : null;
  const nextPhotoItemForPreview = nextPhotoIndex !== -1 ? items[nextPhotoIndex] : null;
  
  const canGoToPreviousPhoto = prevPhotoIndex !== -1;
  const canGoToNextPhoto = nextPhotoIndex !== -1;

  const handleNextPhoto = useCallback(() => {
    if (nextPhotoIndex !== -1) {
      setActivePhotoItemIndex(nextPhotoIndex);
    }
  }, [nextPhotoIndex, setActivePhotoItemIndex]);
  
  const handlePreviousPhoto = useCallback(() => {
    if (prevPhotoIndex !== -1) {
      setActivePhotoItemIndex(prevPhotoIndex);
    }
  }, [prevPhotoIndex, setActivePhotoItemIndex]);

  const translatedTitle = t(titleKey);

  // If items are still empty (e.g., during initial shuffle), display the title and a loading/no items message.
  if (!items || items.length === 0) {
    return (
      <div className={cn(
        paddingTopClass ?? "pt-2 md:pt-4",
        paddingBottomClass ?? "pb-8 md:pb-12",
        "text-center"
      )}>
        {translatedTitle && (
           <div className="text-base md:text-lg text-center text-primary mb-8 max-w-7xl mx-auto bg-card/40 p-4 rounded-lg border border-border shadow-lg">
            {translatedTitle}
          </div>
        )}
        <p className="text-muted-foreground">{t(itemType === 'video' ? 'videoGalleryNoItems' : 'photoGalleryNoItems')}</p>
      </div>
    );
  }
  
  return (
    <>
      <div className={cn(
        paddingTopClass ?? "pt-2 md:pt-4",
        paddingBottomClass ?? "pb-8 md:pb-12"
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {translatedTitle && (
            <div className="text-base md:text-lg text-center text-primary mb-8 max-w-7xl mx-auto bg-card/40 p-4 rounded-lg border border-border shadow-lg">
              {translatedTitle}
            </div>
          )}
          <div className={cn(
            "relative group",
            scrollContainerMaxWidthClass,
            scrollContainerMaxWidthClass ? "mx-auto" : ""
          )}>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/50 hover:bg-primary/80 text-foreground hover:text-primary-foreground transition-opacity opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed -ml-4 sm:-ml-6 md:-ml-8",
                !canScrollLeft && "opacity-30 cursor-not-allowed !important" 
              )}
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label={t('scrollLeft', { "defaultValue": "Scroll Left"})}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>

            <div
              ref={scrollContainerRef}
              className="flex space-x-4 overflow-x-auto no-scrollbar py-2 snap-x snap-mandatory"
            >
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className={cn(
                    "flex-shrink-0 snap-start relative rounded-lg overflow-hidden shadow-lg group/item_thumb transition-all duration-300 ease-in-out hover:shadow-primary/30",
                    itemAspectRatio,
                    itemWidthClass,
                    (item.type === 'video' && item.videoUrl) || item.type === 'photo' ? 'cursor-pointer' : 'cursor-default'
                  )}
                  onClick={() => handleThumbnailClick(item, index)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleThumbnailClick(item, index)}
                  tabIndex={0}
                  role="button"
                  aria-label={
                    item.type === 'video' && item.videoUrl ? `${t(item.altKey)} ${index + 1} - Play video` :
                    item.type === 'photo' ? `${t(item.altKey)} ${index + 1} - View photo` :
                    `${t(item.altKey)} ${index + 1}`
                  }
                >
                  <Image
                    src={item.src}
                    alt={`${t(item.altKey)} ${index + 1}`}
                    fill
                    sizes={imageSizes}
                    className="object-cover transition-transform duration-300 group-hover/item_thumb:scale-105"
                    data-ai-hint={item.dataAiHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover/item_thumb:opacity-100 transition-opacity duration-300" />

                  {item.type === 'video' && item.videoUrl && (
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item_thumb:opacity-100 transition-opacity duration-300"
                    >
                      <PlayCircle className="h-10 w-10 sm:h-12 sm:w-12 text-foreground fill-primary/70 drop-shadow-lg" />
                    </div>
                  )}
                  {item.type === 'photo' && (
                    <div
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item_thumb:opacity-100 transition-opacity duration-300"
                    >
                      <Eye className="h-10 w-10 sm:h-12 sm:w-12 text-primary drop-shadow-lg" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/50 hover:bg-primary/80 text-foreground hover:text-primary-foreground transition-opacity opacity-0 group-hover:opacity-100 disabled:opacity-30 disabled:cursor-not-allowed -mr-4 sm:-mr-6 md:-mr-8",
                !canScrollRight && "opacity-30 cursor-not-allowed !important" 
              )}
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label={t('scrollRight', { "defaultValue": "Scroll Right"})}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          </div>
        </div>
      </div>

      {/* Video Player Modal */}
      {currentVideoItem && (
        <Dialog open={isVideoModalOpen} onOpenChange={handleVideoModalOpenChange}>
          <DialogContent
            className={cn(
              "w-[95vw] sm:w-auto max-w-screen-xl lg:max-w-screen-2xl h-auto max-h-[95vh]",
              "p-0 bg-transparent border-0 overflow-hidden", 
              "flex items-center justify-between group/dialog_content" 
            )}
            onEscapeKeyDown={() => handleVideoModalOpenChange(false)}
          >
            <DialogHeader className="sr-only">
              <DialogTitle>{t(currentVideoItem.altKey, { defaultValue: "Video Player" })}</DialogTitle>
            </DialogHeader>
            
            <div className={cn(
              "relative w-12 h-20 sm:w-16 sm:h-28 md:w-20 md:h-36 lg:w-24 lg:h-40 xl:w-28 xl:h-48",
              "opacity-75 transition-opacity duration-300 hidden sm:flex sm:flex-shrink-0 self-center" 
            )}>
              {previousVideoItemForPreview && (
                <>
                  <Image
                    src={previousVideoItemForPreview.src}
                    alt={t(previousVideoItemForPreview.altKey, { defaultValue: "Previous video preview"})}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 80px, (max-width: 1280px) 96px, 112px"
                    data-ai-hint={previousVideoItemForPreview.dataAiHint}
                  />
                  <Button
                    variant="ghost"
                    onClick={handlePreviousVideo}
                    disabled={!canGoToPreviousVideo}
                    aria-label={t('previousVideo')}
                    className={cn(
                      "absolute inset-0 w-full h-full flex items-center justify-center",
                      "bg-black/20 hover:bg-black/50 focus-visible:bg-black/40 transition-all rounded-md",
                      !canGoToPreviousVideo && "opacity-30 cursor-not-allowed"
                    )}
                  >
                    <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white opacity-70 hover:opacity-100 focus-visible:opacity-100 transition-opacity" />
                  </Button>
                </>
              )}
            </div>

            <div className="relative flex items-center justify-center flex-grow mx-0 sm:mx-1 md:mx-2">
              <video
                key={currentVideoItem?.videoUrl || 'video-player-fallback-key'}
                ref={videoPlayerRef}
                src={currentVideoItem?.videoUrl}
                controls
                autoPlay
                playsInline
                className="w-full h-auto max-h-[95vh] max-w-5xl rounded-md shadow-lg border-2 border-primary"
                onVolumeChange={(e) => {
                  const video = e.target as HTMLVideoElement;
                  if (!video.muted) { 
                    setCurrentVolume(video.volume);
                  }
                  setIsUserMuted(video.muted); 
                }}
                onError={(e) => {
                  const videoElement = e.target as HTMLVideoElement;
                  console.error('Video Error Event:', e);
                  if (videoElement.error) {
                    console.error('Video MediaError Code:', videoElement.error.code, 'Message:', videoElement.error.message);
                    console.error('Video Source URL:', videoElement.currentSrc);
                  } else {
                    console.error('Video error occurred, but no MediaError object found. Video Source:', videoElement.currentSrc);
                  }
                }}
                onEnded={handleVideoEnded}
              />
            </div>
            
            <div className={cn(
              "relative w-12 h-20 sm:w-16 sm:h-28 md:w-20 md:h-36 lg:w-24 lg:h-40 xl:w-28 xl:h-48",
              "opacity-75 transition-opacity duration-300 hidden sm:flex sm:flex-shrink-0 self-center"
            )}>
              {nextVideoItemForPreview && (
                <>
                  <Image
                    src={nextVideoItemForPreview.src}
                    alt={t(nextVideoItemForPreview.altKey, { defaultValue: "Next video preview"})}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 640px) 48px, (max-width: 768px) 64px, (max-width: 1024px) 80px, (max-width: 1280px) 96px, 112px"
                    data-ai-hint={nextVideoItemForPreview.dataAiHint}
                  />
                  <Button
                    variant="ghost"
                    onClick={handleNextVideo}
                    disabled={!canGoToNextVideo}
                    aria-label={t('nextVideo')}
                    className={cn(
                      "absolute inset-0 w-full h-full flex items-center justify-center",
                      "bg-black/20 hover:bg-black/50 focus-visible:bg-black/40 transition-all rounded-md",
                       !canGoToNextVideo && "opacity-30 cursor-not-allowed"
                    )}
                  >
                    <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white opacity-70 hover:opacity-100 focus-visible:opacity-100 transition-opacity" />
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Photo Viewer Modal */}
      {currentPhotoItem && (
        <Dialog open={isPhotoModalOpen} onOpenChange={handlePhotoModalOpenChange}>
          <DialogContent 
            className={cn(
              "w-[95vw] sm:w-auto max-w-screen-xl lg:max-w-screen-2xl h-auto max-h-[95vh] sm:max-h-[90vh]", 
              "p-1 bg-transparent border-0 overflow-hidden", 
              "flex items-center justify-between group/dialog_content"
            )}
            onEscapeKeyDown={() => handlePhotoModalOpenChange(false)}
          >
            <DialogHeader className="sr-only">
              <DialogTitle>{t(currentPhotoItem.altKey, {defaultValue: "Photo Viewer"})}</DialogTitle>
            </DialogHeader>

            <div className={cn(
              "relative w-16 h-24 sm:w-20 sm:h-32 md:w-24 md:h-36", 
              "opacity-75 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 hidden sm:flex sm:flex-shrink-0 self-center" 
            )}>
              {previousPhotoItemForPreview && (
                <>
                  <Image
                    src={previousPhotoItemForPreview.src}
                    alt={t('previousPhoto', { defaultValue: "Previous photo preview"})}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                    data-ai-hint={previousPhotoItemForPreview.dataAiHint}
                  />
                  <Button
                    variant="ghost"
                    onClick={handlePreviousPhoto}
                    disabled={!canGoToPreviousPhoto}
                    aria-label={t('previousPhoto')}
                    className={cn(
                      "absolute inset-0 w-full h-full flex items-center justify-center",
                      "bg-black/10 hover:bg-black/40 focus-visible:bg-black/30 transition-all rounded-md",
                      !canGoToPreviousPhoto && "opacity-30 cursor-not-allowed"
                    )}
                  >
                    <ChevronLeft className="h-6 w-6 sm:h-8 sm:w-8 text-white opacity-70 hover:opacity-100 focus-visible:opacity-100 transition-opacity" />
                  </Button>
                </>
              )}
            </div>
            
            <div className="relative flex items-center justify-center flex-grow mx-0 sm:mx-1 md:mx-2">
              <Image
                key={currentPhotoItem.src} 
                src={currentPhotoItem.src}
                alt={t(currentPhotoItem.altKey)}
                width={1920} 
                height={1080}
                className="block object-contain w-auto h-auto max-w-full max-h-[calc(90vh-2rem)] rounded-md border-2 border-primary"
                data-ai-hint={currentPhotoItem.dataAiHint}
                priority
              />
            </div>

            <div className={cn(
              "relative w-16 h-24 sm:w-20 sm:h-32 md:w-24 md:h-36", 
              "opacity-75 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 hidden sm:flex sm:flex-shrink-0 self-center" 
            )}>
              {nextPhotoItemForPreview && (
                <>
                  <Image
                    src={nextPhotoItemForPreview.src}
                    alt={t('nextPhoto', { defaultValue: "Next photo preview"})}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                    data-ai-hint={nextPhotoItemForPreview.dataAiHint}
                  />
                  <Button
                    variant="ghost"
                    onClick={handleNextPhoto}
                    disabled={!canGoToNextPhoto}
                    aria-label={t('nextPhoto')}
                    className={cn(
                      "absolute inset-0 w-full h-full flex items-center justify-center",
                      "bg-black/10 hover:bg-black/40 focus-visible:bg-black/30 transition-all rounded-md",
                      !canGoToNextPhoto && "opacity-30 cursor-not-allowed"
                    )}
                  >
                    <ChevronRight className="h-6 w-6 sm:h-8 sm:w-8 text-white opacity-70 hover:opacity-100 focus-visible:opacity-100 transition-opacity" />
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
