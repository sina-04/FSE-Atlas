import { asset } from './utils';

export const welcomeMusicVisitKey = 'fse-atlas:welcome-music:v1';
const welcomeMusicPath = '/audio/secret-garden-adagio.mp3';

let initialized = false;
let player: HTMLAudioElement | undefined;
let active = false;
let wantsPlayback = false;
let operation = 0;
const listeners = new Set<() => void>();

function update(next: boolean) {
  if (active === next) return;
  active = next;
  listeners.forEach((listener) => listener());
}

export function subscribeMusic(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
export const getMusicActive = () => active;
export const getServerMusicActive = () => false;

function getPlayer() {
  if (!player) {
    const audio = new Audio(asset(welcomeMusicPath));
    audio.preload = 'none';
    audio.volume = 0.35;
    audio.loop = false;
    audio.addEventListener('playing', () => {
      if (wantsPlayback) update(true);
      else audio.pause();
    });
    const stopped = () => {
      operation++;
      wantsPlayback = false;
      update(false);
    };
    audio.addEventListener('pause', () => {
      if (audio.paused) stopped();
    });
    audio.addEventListener('ended', stopped);
    audio.addEventListener('error', stopped);
    player = audio;
  }
  return player;
}

async function playMusic() {
  const audio = getPlayer();
  const current = ++operation;
  wantsPlayback = true;
  update(true);
  if (audio.ended) audio.currentTime = 0;
  try {
    await audio.play();
  } catch {
    if (current !== operation) return;
    wantsPlayback = false;
    update(false);
  }
}

export function toggleWelcomeMusic() {
  if (active) {
    operation++;
    wantsPlayback = false;
    player?.pause();
    update(false);
  } else {
    void playMusic();
  }
}

// One media instance survives client navigation and locale-layout remounts.
export function initializeWelcomeMusic() {
  if (initialized) return;
  initialized = true;
  try {
    if (localStorage.getItem(welcomeMusicVisitKey)) return;
    localStorage.setItem(welcomeMusicVisitKey, 'seen');
  } catch {
    // The module guard prevents repeats when browser storage is unavailable.
  }
  void playMusic();
}
