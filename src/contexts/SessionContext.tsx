'use client'

import React, { useState, useEffect, useContext, FC } from 'react';

export type SessionContextType = {
  userID: string | null;
  sessionID: string | null;
  locale: LocaleContextType | null;
}

export type LocaleContextType = {
  date: string | null;
  time: string | null;
  lang: string | null;
  TZ: string | null;
}

interface SessionProviderProps {
    children: React.ReactNode;
}

const SessionContext = React.createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: FC<SessionProviderProps> = ({ children }) => {
  const [session, setSession] = useState<SessionContextType>({ sessionID: null, userID: null, locale: null});

  useEffect(() => {
    const uniqueSessionID = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    //get user ID from local storage
    const localID = localStorage.getItem('userID');
    if (!localID) {
      const uniqueID = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('userID', uniqueID);
    }

    setSession({
      sessionID: uniqueSessionID ?? null,
      userID: localID ?? null,
      locale: {
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) ?? "unknown",
        time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' }) ?? "unknown",
        lang: Intl.DateTimeFormat().resolvedOptions()?.locale ?? 'en-US',
        TZ: Intl.DateTimeFormat().resolvedOptions()?.timeZone ?? 'unknown',
      },
     });
    
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

// 4. Creating a Custom Hook for Convenience:
export function useSession(): SessionContextType {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

// 5. Export Everything:
export { SessionContext };
