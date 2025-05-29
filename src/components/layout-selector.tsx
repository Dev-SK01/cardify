
"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { AppSettings } from "@/hooks/use-card-data";

interface LayoutSelectorProps {
  currentLayout: AppSettings['layout'];
  setLayout: (layout: AppSettings['layout']) => void;
}

export function LayoutSelector({ currentLayout, setLayout }: LayoutSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Card Layout</Label>
      <RadioGroup
        value={currentLayout}
        onValueChange={(value: AppSettings['layout']) => setLayout(value)}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="template1" id="template1" />
          <Label htmlFor="template1" className="cursor-pointer">Classic</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="template2" id="template2" />
          <Label htmlFor="template2" className="cursor-pointer">Modern</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
