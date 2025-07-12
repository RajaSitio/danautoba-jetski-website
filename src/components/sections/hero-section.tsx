
"use client";

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-language';
import { ChevronDown } from 'lucide-react';

const heroVideoUrl = "https://archive.org/download/hero-video-jetski/HeroVideoJetski.mp4";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useTranslation();

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        const scrollY = window.scrollY;
        const parallaxFactor = 0.5;
        videoRef.current.style.transform = `translateY(${scrollY * parallaxFactor}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Autoplay/pause video based on visibility
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const tryPlayVideo = () => {
      if (videoElement.paused) {
        videoElement.play().catch(error => {
          const domError = error as DOMException;
          if (domError.name === 'AbortError') {
            // This is a normal interruption, can be ignored.
          } else if (domError.name === "NotAllowedError") {
            if (!videoElement.muted) {
              console.warn("Hero video: Autoplay with sound was prevented. Playing muted.");
              videoElement.muted = true;
              videoElement.play().catch(mutedPlayError => {
                 const mutedDomError = mutedPlayError as DOMException;
                 if (mutedDomError.name !== 'AbortError') { 
                    console.error("Hero video: Error attempting to play muted:", mutedDomError);
                 }
              });
            } else {
                console.error("Hero video: Autoplay prevented even when muted:", domError);
            }
          } else {
            console.error("Hero video: Error attempting to play video:", domError);
          }
        });
      }
    };
    
    const handleCanPlayThrough = () => {
      tryPlayVideo();
    };

    videoElement.addEventListener('canplaythrough', handleCanPlayThrough, { once: true });
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tryPlayVideo();
        } else {
          if (!videoElement.paused) {
            videoElement.pause();
          }
        }
      },
      {
        threshold: 0.1, // Start playing when a small part is visible
      }
    );

    observer.observe(videoElement);

    return () => {
      if (videoElement) {
        observer.unobserve(videoElement);
        videoElement.removeEventListener('canplaythrough', handleCanPlayThrough);
        if (!videoElement.paused) {
          videoElement.pause();
        }
      }
    };
  }, []); // Empty dependency array as the video URL is static now

  return (
    <section
      id="hero"
      className="relative flex flex-col items-start justify-center min-h-screen overflow-hidden -mt-[5rem]" 
    >
      <video
        ref={videoRef}
        src={heroVideoUrl}
        loop
        muted 
        playsInline 
        autoPlay 
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster="https://placehold.co/1920x1080/0A0C0F/0A0C0F.png?text=."
        data-ai-hint="landscape jetski lake"
        onError={(e) => {
          const videoElem = e.target as HTMLVideoElement;
          if (videoElem.error) {
              console.error(
                  `Hero Video Error: Code ${videoElem.error.code} - ${videoElem.error.message}. Source: ${videoElem.currentSrc || 'N/A'}`
              );
          } else {
              console.error(
                  `Hero Video encountered an unspecified error. Source: ${videoElem.currentSrc || 'N/A'}. Raw event:`, e
              );
          }
        }}
      />
      <div className="absolute inset-0 w-full h-full bg-black/60 z-1" />

      <div className="relative z-2 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-3xl">
          <h1 className="font-extrabold leading-tight text-white">
            <span className="block text-2xl sm:text-3xl md:text-4xl">{t('heroTagline_line1')}</span>
            <span className="block text-primary text-xl sm:text-2xl md:text-3xl">{t('heroTagline_line2')}</span>
          </h1>
          <p className="mt-4 text-base text-secondary-foreground max-w-xl">
            {t('heroSubtitle')}
          </p>
          <div className="mt-8 flex flex-wrap justify-start gap-4">
            <Button
              asChild
              size="lg"
              className="btn-gold rounded-lg shadow-xl hover:shadow-primary/50 transition-all duration-300 transform hover:scale-105"
            >
              <Link href="/#packages">{t('heroButton')}</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 w-full px-4 text-center">
        <p className="text-sm text-gray-300 italic max-w-md mx-auto underline decoration-primary underline-offset-4">
          {t('teaserScrollText')}
        </p>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
        <ChevronDown 
          className="h-10 w-10 text-primary animate-bounce-slow opacity-70 hover:opacity-100 transition-opacity" 
          aria-hidden="true" 
        />
      </div>
    </section>
  );
}
