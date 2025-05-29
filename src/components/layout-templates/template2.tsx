
"use client";

import Image from "next/image";
import type { CardData } from "@/hooks/use-card-data";
import { Phone, Mail, Link as LinkIcon, Linkedin, Github, Twitter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface TemplateProps {
  data: CardData;
}

export function Template2({ data }: TemplateProps) {
  const placeholderImg = "https://placehold.co/200x200.png"; // Larger for this template
  const photoSrc = data.photoUrl && data.photoUrl.trim() !== '' ? data.photoUrl : placeholderImg;

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl rounded-lg overflow-hidden bg-card text-card-foreground animate-fadeIn">
      <div className="relative h-48 bg-gradient-to-br from-primary to-accent">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-card shadow-lg bg-card">
          <Image
            src={photoSrc}
            alt={data.fullName || "Profile photo"}
            width={200}
            height={200}
            className="object-cover w-full h-full"
            data-ai-hint="profile avatar modern"
          />
        </div>
      </div>
      
      <CardContent className="pt-20 p-6 text-center space-y-4">
        <h1 className="text-3xl font-bold text-foreground">{data.fullName || "Your Name"}</h1>
        <p className="text-lg text-primary">{data.jobTitle || "Your Title"}</p>
        
        {data.bio && (
          <p className="text-muted-foreground">{data.bio}</p>
        )}

        <Separator />

        <div className="space-y-3 text-left">
          {data.phone && (
            <a href={`tel:${data.phone}`} className="flex items-center space-x-3 group text-foreground hover:text-accent transition-colors py-1">
              <Phone className="w-5 h-5 text-accent" />
              <span>{data.phone}</span>
            </a>
          )}
          {data.email && (
            <a href={`mailto:${data.email}`} className="flex items-center space-x-3 group text-foreground hover:text-accent transition-colors py-1">
              <Mail className="w-5 h-5 text-accent" />
              <span>{data.email}</span>
            </a>
          )}
          {data.website && (
            <a href={data.website} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 group text-foreground hover:text-accent transition-colors py-1">
              <LinkIcon className="w-5 h-5 text-accent" />
              <span>{data.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
        </div>

        {(data.linkedin || data.github || data.twitter) && <Separator />}
        
        <div className="flex justify-center space-x-3 pt-2">
          {data.linkedin && (
            <Button variant="ghost" size="icon" asChild className="text-foreground hover:text-accent hover:bg-accent/10 rounded-full">
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="w-6 h-6" />
              </a>
            </Button>
          )}
          {data.github && (
            <Button variant="ghost" size="icon" asChild className="text-foreground hover:text-accent hover:bg-accent/10 rounded-full">
              <a href={data.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="w-6 h-6" />
              </a>
            </Button>
          )}
          {data.twitter && (
            <Button variant="ghost" size="icon" asChild className="text-foreground hover:text-accent hover:bg-accent/10 rounded-full">
              <a href={data.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="w-6 h-6" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
