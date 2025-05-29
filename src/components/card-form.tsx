
"use client";

import type { ChangeEvent } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { CardData } from "@/hooks/use-card-data";
import { UploadCloud } from 'lucide-react';

interface CardFormProps {
  cardData: CardData;
  updateCardField: <K extends keyof CardData>(field: K, value: CardData[K]) => void;
}

export function CardForm({ cardData, updateCardField }: CardFormProps) {
  const handleInputChange = <K extends keyof CardData>(field: K, value: string) => {
    updateCardField(field, value as CardData[K]);
  };

  const handlePhotoUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateCardField('photoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Edit Your Card</CardTitle>
        <CardDescription>Fill in your details to create your digital business card.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" value={cardData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} placeholder="e.g., Alex Johnson" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input id="jobTitle" value={cardData.jobTitle} onChange={(e) => handleInputChange('jobTitle', e.target.value)} placeholder="e.g., UX Designer" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Short Bio/Tagline</Label>
          <Textarea id="bio" value={cardData.bio} onChange={(e) => handleInputChange('bio', e.target.value)} placeholder="e.g., Crafting digital experiences" />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="photoUrl">Profile Photo URL or Upload</Label>
          <Input id="photoUrl" value={cardData.photoUrl.startsWith('data:image') ? '' : cardData.photoUrl} onChange={(e) => handleInputChange('photoUrl', e.target.value)} placeholder="https://example.com/photo.jpg" />
          <Label htmlFor="photoUpload" className="mt-2 inline-flex items-center px-4 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md text-sm font-medium cursor-pointer">
            <UploadCloud className="mr-2 h-4 w-4" /> Upload Image
          </Label>
          <Input id="photoUpload" type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
           {cardData.photoUrl.startsWith('data:image') && <p className="text-xs text-muted-foreground mt-1">Image uploaded. Clear URL field to remove.</p>}
        </div>

        <h3 className="text-lg font-medium pt-4 border-t">Contact Information</h3>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" type="tel" value={cardData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="e.g., 555-123-4567" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" value={cardData.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="e.g., alex.johnson@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website/Portfolio</Label>
          <Input id="website" type="url" value={cardData.website} onChange={(e) => handleInputChange('website', e.target.value)} placeholder="https://alexjohnson.design" />
        </div>

        <h3 className="text-lg font-medium pt-4 border-t">Social Media</h3>
        <div className="space-y-2">
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input id="linkedin" type="url" value={cardData.linkedin} onChange={(e) => handleInputChange('linkedin', e.target.value)} placeholder="https://linkedin.com/in/username" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="github">GitHub URL</Label>
          <Input id="github" type="url" value={cardData.github} onChange={(e) => handleInputChange('github', e.target.value)} placeholder="https://github.com/username" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="twitter">Twitter/X URL</Label>
          <Input id="twitter" type="url" value={cardData.twitter} onChange={(e) => handleInputChange('twitter', e.target.value)} placeholder="https://twitter.com/username" />
        </div>
      </CardContent>
    </Card>
  );
}
