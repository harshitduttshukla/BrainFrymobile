import React, { createContext, useState, useContext, useEffect } from 'react';
import { NativeModules, Platform } from 'react-native';

export interface AppBlock {
  id: string;
  name: string;
  icon: string;
  color: string;
  blocked: boolean;
}

interface BlockContextType {
  strictMode: boolean;
  setStrictMode: (val: boolean) => void;
  apps: AppBlock[];
  toggleApp: (id: string) => void;
  shortsReelsBlocked: boolean;
  setShortsReelsBlocked: (val: boolean) => void;
}

const BlockContext = createContext<BlockContextType | undefined>(undefined);

export function BlockProvider({ children }: { children: React.ReactNode }) {
  const [strictMode, setStrictMode] = useState(false);
  const [shortsReelsBlocked, setShortsReelsBlocked] = useState(false);
  const [apps, setApps] = useState<AppBlock[]>([
    { id: '1', name: 'Instagram', icon: 'logo-instagram', color: '#E1306C', blocked: true },
    { id: '2', name: 'YouTube', icon: 'logo-youtube', color: '#FF0000', blocked: true },
    { id: '3', name: 'TikTok', icon: 'logo-tiktok', color: '#000000', blocked: false },
    { id: '4', name: 'Twitter / X', icon: 'logo-twitter', color: '#1DA1F2', blocked: false },
  ]);

  const toggleApp = (id: string) => {
    setApps((prevApps) =>
      prevApps.map((app) =>
        app.id === id ? { ...app, blocked: !app.blocked } : app
      )
    );
  };

  useEffect(() => {
    if (Platform.OS === 'android' && NativeModules.AppBlocker) {
      try {
        NativeModules.AppBlocker.setShortsReelsBlocked(shortsReelsBlocked);
      } catch (error) {
        console.error('Failed to initialize native AppBlocker state:', error);
      }
    }
  }, []);

  const handleSetShortsReelsBlocked = (val: boolean) => {
    setShortsReelsBlocked(val);
    
    // Write state to native Android service
    if (Platform.OS === 'android' && NativeModules.AppBlocker) {
      try {
        NativeModules.AppBlocker.setShortsReelsBlocked(val);
      } catch (error) {
        console.error('Failed to update native AppBlocker state:', error);
      }
    }

    if (val) {
      // Auto-block short-form video apps
      setApps((prevApps) =>
        prevApps.map((app) =>
          app.name === 'Instagram' || app.name === 'YouTube' || app.name === 'TikTok'
            ? { ...app, blocked: true }
            : app
        )
      );
    } else {
      // Auto-unblock short-form video apps when turned off
      setApps((prevApps) =>
        prevApps.map((app) =>
          app.name === 'Instagram' || app.name === 'YouTube' || app.name === 'TikTok'
            ? { ...app, blocked: false }
            : app
        )
      );
    }
  };

  return (
    <BlockContext.Provider
      value={{
        strictMode,
        setStrictMode,
        apps,
        toggleApp,
        shortsReelsBlocked,
        setShortsReelsBlocked: handleSetShortsReelsBlocked,
      }}
    >
      {children}
    </BlockContext.Provider>
  );
}

export function useBlock() {
  const context = useContext(BlockContext);
  if (!context) {
    throw new Error('useBlock must be used within a BlockProvider');
  }
  return context;
}
