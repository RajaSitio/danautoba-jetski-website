"use client";

import type { ReactNode } from 'react';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, MapPin, Share2, AlertTriangle } from 'lucide-react';
import { useTranslation } from '@/hooks/use-language';
import type { LocationDetail } from '@/data/locations';
import { useToast } from "@/hooks/use-toast";
import { countries } from '@/data/countries';

interface LocationCardProps {
  location: LocationDetail;
  children?: ReactNode;
}

export function LocationCard({ location, children }: LocationCardProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>('62'); // Default to Indonesia
  const [shareError, setShareError] = useState<string | null>(null);

  const locationName = t(location.nameKey);
  const locationAddress = t(location.addressKey);
  const locationPhone = t(location.phoneKey);

  const handleShareLocation = () => {
    // 1. Get the current state values
    const countryCode = selectedCountryCode;
    const rawPhoneNumber = whatsappNumber.trim();

    // 2. Validate input
    if (!rawPhoneNumber) {
      setShareError(t('whatsAppNumberEmptyError'));
      return;
    }

    // 3. Format the number
    // Remove all non-digit characters from the raw input
    let digitsOnly = rawPhoneNumber.replace(/\D/g, '');

    // If the number starts with '0', remove it.
    if (digitsOnly.startsWith('0')) {
      digitsOnly = digitsOnly.substring(1);
    }
    
    // Final formatted number
    const finalWhatsappNumberForUrl = `${countryCode}${digitsOnly}`;

    // Simple validation for the combined number length
    if (finalWhatsappNumberForUrl.length < 9 || finalWhatsappNumberForUrl.length > 15) {
       setShareError(t('whatsAppNumberInvalidError'));
      return;
    }
    
    // 4. Construct the URL and open it
    setShareError(null);

    const mapsLink = `https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`;
    const message = t('shareLocationMessageText', {
      locationName: locationName,
      mapsLink: mapsLink,
    });

    const whatsappUrl = `https://wa.me/${finalWhatsappNumberForUrl}?text=${encodeURIComponent(message)}`;

    try {
      window.open(whatsappUrl, '_blank');
      toast({
        title: t('shareLocationSuccessTitle'),
        description: t('shareLocationSuccessMessage', { number: `+${finalWhatsappNumberForUrl}` }),
      });
    } catch (error) {
      console.error("Error opening WhatsApp link:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not open WhatsApp. Please check your browser settings or try again.",
      });
    }
    
    // 5. Reset state
    setIsShareDialogOpen(false);
    setWhatsappNumber(''); 
  };

  return (
    <>
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="text-center text-xl">{locationName}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          {children && <div className="mb-4">{children}</div>}
          
          <Button 
            variant="secondary"
            className="w-full mt-2" 
            onClick={() => {
              setShareError(null); 
              setIsShareDialogOpen(true);
            }}
          >
            <Share2 className="mr-2 h-4 w-4" />
            {t('shareLocationButton')}
          </Button>

          <div className="text-center mb-2 mt-4 flex items-center justify-center">
            <MapPin className="mr-2 h-6 w-6 text-destructive flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{locationAddress}</span>
          </div>

          <div className="text-center mb-4 flex items-center justify-center">
            <Phone className="mr-2 h-4 w-4 text-primary flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{locationPhone}</span>
          </div>
          
          <div className="mt-auto space-y-2">
            <Button 
              className="w-full btn-gold" 
              onClick={() => {
                window.open(`https://wa.me/${locationPhone.replace(/\D/g, '')}`, '_blank');
              }}
            >
              <Phone className="mr-2 h-4 w-4" />
              {t('contactLocationButton')}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isShareDialogOpen} onOpenChange={(isOpen) => {
        setIsShareDialogOpen(isOpen);
        if (!isOpen) { 
            setWhatsappNumber('');
            setShareError(null);
            setSelectedCountryCode('62'); // Reset to default on close
        }
      }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('shareLocationDialogTitle')}</DialogTitle>
            <DialogDescription>
              {t('shareLocationDialogDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="whatsapp-number" className="text-right col-span-4 text-left">
                {t('shareLocationDialogInputLabel')}
              </Label>
             </div>
             <div className="flex gap-2">
                <Select onValueChange={setSelectedCountryCode} defaultValue={selectedCountryCode}>
                    <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder={t('shareLocationDialogCountryLabel')} />
                    </SelectTrigger>
                    <SelectContent>
                        {countries.map(country => (
                            <SelectItem key={country.code} value={country.phoneCode}>
                                {country.flag} +{country.phoneCode}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Input
                    id="whatsapp-number"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder={t('shareLocationDialogInputPlaceholder')}
                    className="flex-grow"
                    type="tel" 
                />
            </div>
            {shareError && (
              <div className="col-span-4 flex items-center text-sm text-destructive bg-destructive/10 p-2 rounded-md">
                <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                <span>{shareError}</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                {t('shareLocationDialogCancelButton')}
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleShareLocation} className="btn-gold">
              {t('shareLocationDialogOKButton')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
