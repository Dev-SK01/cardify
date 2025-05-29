
"use client";

import { CardForm } from "@/components/card-form";
import { CardPreview } from "@/components/card-preview";
import { ThemeToggle } from "@/components/theme-toggle";
import { LayoutSelector } from "@/components/layout-selector";
import { useCardData } from "@/hooks/use-card-data";
import { Button } from "@/components/ui/button";
import { Github, Zap } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { cardData, updateCardField, appSettings, setTheme, setLayout, isLoaded } = useCardData();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="py-4 px-6 shadow-md sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">Cardify</h1>
          </div>
          <div className="flex items-center space-x-4">
            <LayoutSelector currentLayout={appSettings.layout} setLayout={setLayout} />
            <ThemeToggle currentTheme={appSettings.theme} setTheme={setTheme} />
            <Button variant="outline" size="icon" asChild>
              <Link href="https://github.com/your-repo/cardify" target="_blank" aria-label="GitHub Repository">
                <Github className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:space-x-8">
          <section className="md:w-1/2 lg:w-2/5 mb-8 md:mb-0">
            {isLoaded ? (
              <CardForm cardData={cardData} updateCardField={updateCardField} />
            ) : (
              <div className="space-y-6 p-6 border rounded-lg shadow-lg bg-card">
                <div className="h-8 bg-muted rounded w-1/3 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4 animate-pulse mb-1"></div>
                  <div className="h-10 bg-muted rounded w-full animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4 animate-pulse mb-1"></div>
                  <div className="h-10 bg-muted rounded w-full animate-pulse"></div>
                </div>
                 <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4 animate-pulse mb-1"></div>
                  <div className="h-20 bg-muted rounded w-full animate-pulse"></div>
                </div>
              </div>
            )}
          </section>
          <section className="md:w-1/2 lg:w-3/5">
            <CardPreview cardData={cardData} appSettings={appSettings} isLoaded={isLoaded} />
          </section>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} Cardify. Built with Next.js and ShadCN UI.</p>
      </footer>
    </div>
  );
}
