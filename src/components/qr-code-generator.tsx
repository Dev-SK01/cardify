
"use client";

import QRCode from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QrCodeGeneratorProps {
  vCardData: string;
}

export function QrCodeGenerator({ vCardData }: QrCodeGeneratorProps) {
  if (!vCardData) {
    return null;
  }
  // Create a data URI for the vCard to be embedded in QR code.
  // This might be too long for some QR readers if vCardData is extensive.
  // A URL pointing to the vCard would be more robust in a real application.
  const qrValue = `BEGIN:VCARD\n${vCardData.substring(vCardData.indexOf('\nVERSION:'))}`;


  return (
    <Card className="mt-6 shadow-md">
      <CardHeader>
        <CardTitle className="text-center text-lg">Scan QR Code</CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center p-4">
        {qrValue ? (
           <QRCode
            value={qrValue}
            size={160}
            level="M" // Error correction level: L, M, Q, H
            bgColor="var(--background)" // Use CSS variables for theme compliance
            fgColor="var(--foreground)"
            renderAs="svg" // SVG is sharper and scales better
          />
        ) : (
          <p className="text-muted-foreground">Enter data to generate QR code.</p>
        )}
      </CardContent>
    </Card>
  );
}
