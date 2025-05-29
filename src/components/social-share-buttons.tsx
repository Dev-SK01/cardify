
"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy, Share2, Mail, Facebook, Twitter as TwitterIcon } from "lucide-react"; // Assuming Twitter is X
// Lucide doesn't have WhatsApp icon. Using Share2 as a generic share or text.
// For specific icons like WhatsApp, an SVG would be needed.

interface SocialShareButtonsProps {
  cardUrl: string; // This would be the URL of the digital card, mocked for now.
  cardTitle: string; // e.g., "Check out Alex Johnson's Digital Business Card!"
  vCardData: string;
}

// A simple SVG for WhatsApp
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16.75 13.96c.27.42.33.95.08 1.44s-.6.89-1.09.99c-.41.08-1.14-.14-1.71-.38-.8-.34-1.76-.92-2.8-1.91s-1.8-2.13-2.09-2.93c-.24-.67-.02-1.28.23-1.71.2-.35.46-.56.78-.7.22-.1.46-.14.64-.07.41.14.64.51.73.66.14.27.16.51.1.78-.07.27-.2.51-.35.71l-.27.35c-.07.07-.07.14.01.22.35.35.78.78 1.28 1.13.58.42 1.13.73 1.64.92.14.07.22.07.3-.01l.35-.42c.22-.27.51-.46.86-.46.21-.01.4.06.58.14zM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
  </svg>
);


export function SocialShareButtons({ cardUrl, cardTitle, vCardData }: SocialShareButtonsProps) {
  const { toast } = useToast();
  const encodedUrl = encodeURIComponent(cardUrl);
  const encodedTitle = encodeURIComponent(cardTitle);
  const shareText = `${cardTitle} ${cardUrl}`;


  const handleCopyToClipboard = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(vCardData)
        .then(() => {
          toast({ title: "Copied!", description: "vCard data copied to clipboard." });
        })
        .catch(err => {
          console.error("Failed to copy:", err);
          toast({ title: "Error", description: "Failed to copy vCard data.", variant: "destructive" });
        });
    } else {
       toast({ title: "Error", description: "Clipboard not available.", variant: "destructive" });
    }
  };

  return (
    <div className="mt-6 space-y-3">
      <h3 className="text-center text-lg font-medium text-foreground">Share this Card</h3>
      <div className="flex flex-wrap justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank')}
          aria-label="Share on WhatsApp"
        >
          <WhatsAppIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank')}
          aria-label="Share on Twitter/X"
        >
          <TwitterIcon className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(`mailto:?subject=${encodedTitle}&body=${encodeURIComponent(shareText)}`, '_blank')}
          aria-label="Share via Email"
        >
          <Mail className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')}
          aria-label="Share on Facebook"
        >
          <Facebook className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleCopyToClipboard}
          aria-label="Copy vCard data to clipboard"
        >
          <Copy className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
