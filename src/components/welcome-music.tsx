'use client';
import { useEffect, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { Pause, Play } from 'lucide-react';
import {
  getMusicActive,
  getServerMusicActive,
  initializeWelcomeMusic,
  subscribeMusic,
  toggleWelcomeMusic,
} from '@/lib/welcome-music';
import { Button } from './ui/button';

export function WelcomeMusic() {
  const t = useTranslations();
  const active = useSyncExternalStore(subscribeMusic, getMusicActive, getServerMusicActive);
  useEffect(initializeWelcomeMusic, []);
  const label = t(active ? 'musicPause' : 'musicPlay');
  return (
    <Button
      type="button"
      size="icon"
      className="music-toggle"
      data-testid="music-toggle"
      aria-label={label}
      title={label}
      onClick={toggleWelcomeMusic}
    >
      {active ? <Pause size={18} aria-hidden="true" /> : <Play size={18} aria-hidden="true" />}
    </Button>
  );
}
