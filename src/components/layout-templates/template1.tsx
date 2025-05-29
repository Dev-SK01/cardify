
"use client";

import Image from "next/image";
import type { CardData } from "@/hooks/use-card-data";
import { Phone, Mail, Link as LinkIcon, Linkedin, Github, Twitter } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface TemplateProps {
  data: CardData;
}

export function Template1({ data }: TemplateProps) {
  const placeholderImg = "https://placehold.co/150x150.png";
  const photoSrc = data.photoUrl && data.photoUrl.trim() !== '' ? data.photoUrl : placeholderImg;
  
  return (
    <Card className="w-full max-w-md mx-auto shadow-xl rounded-lg overflow-hidden bg-card text-card-foreground animate-fadeIn">
      <CardHeader className="bg-primary text-primary-foreground p-6 text-center">
        <div className="mb-4 mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-primary-foreground shadow-md">
          <Image
            src={photoSrc}
            alt={data.fullName || "Profile photo"}
            width={150}
            height={150}
            className="object-cover w-full h-full"
            data-ai-hint="profile avatar"
          />
        </div>
        <h1 className="text-3xl font-bold">{data.fullName || "Your Name"}</h1>
        <p className="text-lg opacity-90">{data.jobTitle || "Your Title"}</p>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        {data.bio && (
          <>
            <p className="text-center text-muted-foreground">{data.bio}</p>
            <Separator />
          </>
        )}

        <div className="space-y-3">
          {data.phone && (
            <a href={`tel:${data.phone}`} className="flex items-center space-x-3 group hover:text-primary transition-colors">
              <Phone className="w-5 h-5 text-primary group-hover:animate-pulse" />
              <span>{data.phone}</span>
            </a>
          )}
          {data.email && (
            <a href={`mailto:${data.email}`} className="flex items-center space-x-3 group hover:text-primary transition-colors">
              <Mail className="w-5 h-5 text-primary group-hover:animate-pulse" />
              <span>{data.email}</span>
            </a>
          )}
          {data.website && (
            <a href={data.website} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group hover:text-primary transition-colors">
              <LinkIcon className="w-5 h-5 text-primary group-hover:animate-pulse" />
              <span>{data.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
        </div>

        {(data.linkedin || data.github || data.twitter) && <Separator />}

        <div className="flex justify-center space-x-4 pt-2">
          {data.linkedin && (
            <Button variant="outline" size="icon" asChild className="hover:bg-accent/10">
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 text-primary" />
              </a>
            </Button>
          )}
          {data.github && (
            <Button variant="outline" size="icon" asChild className="hover:bg-accent/10">
              <a href={data.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-5 h-5 text-primary" />
              </a>
            </Button>
          )}
          {data.twitter && (
            <Button variant="outline" size="icon" asChild className="hover:bg-accent/10">
              <a href={data.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-5 h-5 text-primary" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// Minimal CSS for fade-in animation if needed, though Tailwind handles transitions well.
// Add this to globals.css if more complex animations are desired:
// @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
// .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
// For simplicity, this is handled by card-template-transition classes in globals.css on the container.
