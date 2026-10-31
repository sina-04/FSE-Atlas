'use client';
import { useEffect, useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { Music2, Pause, Play, Volume2, X } from 'lucide-react';
import type { Locale } from '@/data/schema';
import {
  dismissWelcomeMusic,
  getMusicState,
  getServerMusicState,
  initializeWelcomeMusic,
  pauseWelcomeMusic,
  playWelcomeMusic,
  setWelcomeMusicVolume,
  subscribeMusic,
} from '@/lib/welcome-music';
import { Button } from './ui/button';

export function WelcomeMusic({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const state = useSyncExternalStore(subscribeMusic, getMusicState, getServerMusicState);
  useEffect(initializeWelcomeMusic, []);
  if (!state.visible) return null;
  const active = state.status === 'playing' || state.status === 'starting';
  const message =
    state.status === 'blocked'
      ? 'musicBlocked'
      : state.status === 'error'
        ? 'musicError'
        : state.status === 'starting'
          ? 'musicStarting'
          : state.status === 'playing'
            ? 'musicPlaying'
            : state.status === 'ended'
              ? 'musicEnded'
              : 'musicPaused';

  return (
    <aside
      className="welcome-music"
      aria-label={t('musicWelcome')}
      data-testid="welcome-music"
      dir={locale === 'fa' ? 'rtl' : 'ltr'}
    >
      <div className="music-heading">
        <span className="icon-tile">
          <Music2 size={22} aria-hidden="true" />
        </span>
        <div className="music-track">
          <p className="music-eyebrow">{t('musicWelcome')}</p>
          <p className="music-title" dir="ltr" lang="en">
            Secret Garden <span>—</span> Adagio
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t('musicDismiss')}
          onClick={() => {
            dismissWelcomeMusic();
            document.getElementById('main')?.focus({ preventScroll: true });
          }}
        >
          <X size={17} />
        </Button>
      </div>
      <p className="music-status" role="status">
        {t(message)}
      </p>
      <div className="music-controls">
        <Button
          size="icon"
          aria-label={active ? t('musicPause') : t('musicPlay')}
          onClick={() => (active ? pauseWelcomeMusic() : void playWelcomeMusic())}
        >
          {active ? <Pause size={19} /> : <Play size={19} />}
        </Button>
        <label className="music-volume">
          <Volume2 size={18} aria-hidden="true" />
          <span className="sr-only">{t('musicVolume')}</span>
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={Math.round(state.volume * 100)}
            onChange={(event) => setWelcomeMusicVolume(Number(event.target.value) / 100)}
            aria-valuetext={new Intl.NumberFormat(locale, {
              style: 'percent',
              maximumFractionDigits: 0,
            }).format(state.volume)}
          />
        </label>
      </div>
    </aside>
  );
}
