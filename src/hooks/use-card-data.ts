
"use client";

import { type Dispatch, type SetStateAction, useState, useEffect, useCallback } from 'react';

export interface CardData {
  fullName: string;
  jobTitle: string;
  bio: string;
  photoUrl: string;
  phone: string;
  email: string;
  website: string;
  linkedin: string;
  github: string;
  twitter: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  layout: 'template1' | 'template2';
}

const CARD_DATA_STORAGE_KEY = 'cardify-cardData';
const APP_SETTINGS_STORAGE_KEY = 'cardify-appSettings';

const initialCardData: CardData = {
  fullName: 'Alex Johnson',
  jobTitle: 'UX Designer & Frontend Developer',
  bio: 'Crafting beautiful and intuitive digital experiences. Let\'s connect!',
  photoUrl: '', // Will use placeholder if empty
  phone: '555-123-4567',
  email: 'alex.johnson@example.com',
  website: 'https://alexjohnson.design',
  linkedin: 'https://www.linkedin.com/in/alexjohnson',
  github: 'https://github.com/alexjohnson',
  twitter: 'https://twitter.com/alexjdesigns',
};

const initialAppSettings: AppSettings = {
  theme: 'light',
  layout: 'template1',
};

// Helper to get item from localStorage
function getStoredItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

// Helper to set item in localStorage
function setStoredItem<T>(key: string, value: T) {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage key "${key}":`, error);
  }
}

export function useCardData() {
  const [cardData, setCardDataState] = useState<CardData>(initialCardData);
  const [appSettings, setAppSettingsState] = useState<AppSettings>(initialAppSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCardDataState(getStoredItem<CardData>(CARD_DATA_STORAGE_KEY, initialCardData));
    setAppSettingsState(getStoredItem<AppSettings>(APP_SETTINGS_STORAGE_KEY, initialAppSettings));
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setStoredItem<CardData>(CARD_DATA_STORAGE_KEY, cardData);
    }
  }, [cardData, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      setStoredItem<AppSettings>(APP_SETTINGS_STORAGE_KEY, appSettings);
      if (appSettings.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, [appSettings, isLoaded]);

  const updateCardField = useCallback(<K extends keyof CardData>(field: K, value: CardData[K]) => {
    setCardDataState(prev => ({ ...prev, [field]: value }));
  }, []);

  const setTheme = useCallback((theme: AppSettings['theme']) => {
    setAppSettingsState(prev => ({ ...prev, theme }));
  }, []);

  const setLayout = useCallback((layout: AppSettings['layout']) => {
    setAppSettingsState(prev => ({ ...prev, layout }));
  }, []);
  
  const setCardData = useCallback((newCardData: CardData) => {
    setCardDataState(newCardData);
  }, []);


  return {
    cardData,
    appSettings,
    updateCardField,
    setTheme,
    setLayout,
    isLoaded,
    setCardData, // Expose setCardData directly
  };
}
