
"use client";

import { useState, useEffect } from 'react';
import QRCode from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QrCodeGeneratorProps {
  vCardData: string;
}

export function QrCodeGenerator({ vCardData }: QrCodeGeneratorProps) {
  const [bgColor, setBgColor] = useState<string>('#FFFFFF'); // Default light background
  const [fgColor, setFgColor] = useState<string>('#000000'); // Default dark foreground
  const [isColorsLoaded, setIsColorsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const rootStyle = getComputedStyle(document.documentElement);
      const bg = rootStyle.getPropertyValue('--background').trim();
      const fg = rootStyle.getPropertyValue('--foreground').trim();
      
      // Convert HSL string "H S% L%" to #RRGGBB format if necessary,
      // or ensure qrcode.react can handle HSL strings directly.
      // For simplicity, assuming getPropertyValue returns a format qrcode.react accepts
      // or that browsers resolve CSS variables to hex/rgb for getComputedStyle.
      // If direct HSL (e.g. "0 0% 96.1%") is returned and not supported by qrcode.react,
      // a conversion function would be needed here.
      // ShadCN themes use HSL strings like "231 48% 48%". We need to convert them.

      const convertHslStringToCssHsl = (hslString: string) => {
        if (!hslString) return '';
        const [h, s, l] = hslString.split(' ');
        return `hsl(${h}, ${s}, ${l})`;
      }
      
      const computedBgColor = convertHslStringToCssHsl(bg) || '#FFFFFF';
      const computedFgColor = convertHslStringToCssHsl(fg) || '#000000';

      setBgColor(computedBgColor);
      setFgColor(computedFgColor);
      setIsColorsLoaded(true);
    }
  }, [vCardData]); // Re-run if vCardData changes, in case theme changed.

  if (!vCardData) {
    return null;
  }

  const qrValue = `BEGIN:VCARD\n${vCardData.substring(vCardData.indexOf('\nVERSION:'))}`;

  return (
    <Card className="mt-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-lg">Scan QR Code</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center p-4">
        {isColorsLoaded && qrValue ? (
           <QRCode
            value={qrValue}
            size={160}
            level="M" // Error correction level: L, M, Q, H
            bgColor={bgColor} 
            fgColor={fgColor}
            renderAs="svg" // SVG is sharper and scales better
          />
        ) : (
          <div className="h-[160px] w-[160px] flex items-center justify-center bg-muted rounded-md">
            <p className="text-xs text-muted-foreground">Generating QR...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
