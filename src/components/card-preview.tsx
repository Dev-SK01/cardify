
"use client";

import { useState, useEffect } from 'react';
import type { CardData, AppSettings } from "@/hooks/use-card-data";
import { Template1 } from "./layout-templates/template1";
import { Template2 } from "./layout-templates/template2";
import { QrCodeGenerator } from "./qr-code-generator";
import { SocialShareButtons } from "./social-share-buttons";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { generateVCard, downloadVCard } from "@/lib/vcard";
import { Skeleton } from './ui/skeleton';

interface CardPreviewProps {
  cardData: CardData;
  appSettings: AppSettings;
  isLoaded: boolean;
}

export function CardPreview({ cardData, appSettings, isLoaded }: CardPreviewProps) {
  const [vCardString, setVCardString] = useState("");
  const [currentLayoutKey, setCurrentLayoutKey] = useState(appSettings.layout);
  const [animationClass, setAnimationClass] = useState('card-template-entered');

  useEffect(() => {
    setVCardString(generateVCard(cardData));
  }, [cardData]);

  useEffect(() => {
    // Handle layout transition animation
    if (appSettings.layout !== currentLayoutKey) {
      setAnimationClass('card-template-exiting');
      const timer = setTimeout(() => {
        setCurrentLayoutKey(appSettings.layout);
        setAnimationClass('card-template-entering');
        setTimeout(() => setAnimationClass('card-template-entered'), 50); // Allow reflow before entering
      }, 300); // Match CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [appSettings.layout, currentLayoutKey]);


  const handleDownloadVCard = () => {
    const filename = `${cardData.fullName.replace(/\s+/g, '_') || 'contact'}.vcf`;
    downloadVCard(vCardString, filename);
  };

  if (!isLoaded) {
    return (
      <div className="w-full max-w-lg p-4 md:p-6 space-y-6">
        <Skeleton className="h-[400px] w-full rounded-lg" />
        <Skeleton className="h-[100px] w-full rounded-lg" />
        <Skeleton className="h-[50px] w-full rounded-lg" />
      </div>
    );
  }
  
  const cardUrl = typeof window !== 'undefined' ? window.location.href : "https://example.com/my-card"; // Mock URL

  return (
    <div className="w-full max-w-lg p-4 md:p-6 space-y-6 sticky top-6">
      <div className={`card-template-transition ${animationClass}`}>
        {currentLayoutKey === 'template1' ? <Template1 data={cardData} /> : <Template2 data={cardData} />}
      </div>
      
      <QrCodeGenerator vCardData={vCardString} />
      
      <Button onClick={handleDownloadVCard} className="w-full" variant="default">
        <Download className="mr-2 h-4 w-4" /> Download vCard (.vcf)
      </Button>
      
      <SocialShareButtons 
        cardUrl={cardUrl} 
        cardTitle={`Check out ${cardData.fullName || 'my'} digital business card!`}
        vCardData={vCardString}
      />
    </div>
  );
}
