import { asset } from './utils';

export const welcomeMusicVisitKey = 'fse-atlas:welcome-music:v1';
export const welcomeMusicPath = '/audio/secret-garden-adagio.mp3';
type Status = 'idle' | 'starting' | 'playing' | 'paused' | 'blocked' | 'ended' | 'error';
type MusicState = { visible: boolean; status: Status; volume: number };

const initial: MusicState = { visible: false, status: 'idle', volume: 0.35 };
let state = initial;
let player: HTMLAudioElement | undefined;
let initialized = false;
let operation = 0;
const listeners = new Set<() => void>();

function update(changes: Partial<MusicState>) {
  state = { ...state, ...changes };
  listeners.forEach((listener) => listener());
}

// A single media instance survives client navigation and locale-layout remounts.
// No audio object or network request is created for returning visitors.
function getPlayer() {
  if (!player) {
    player = new Audio(asset(welcomeMusicPath));
    player.preload = 'none';
    player.volume = state.volume;
    player.addEventListener('playing', () => {
      if (!state.visible) {
        player?.pause();
        return;
      }
      update({ status: 'playing' });
    });
    player.addEventListener('pause', () => {
      if (state.visible) update({ status: player?.ended ? 'ended' : 'paused' });
    });
    player.addEventListener('ended', () => update({ status: 'ended' }));
    player.addEventListener('error', () => {
      if (state.visible) update({ status: 'error' });
    });
  }
  return player;
}

export function subscribeMusic(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
export const getMusicState = () => state;
export const getServerMusicState = () => initial;

export async function playWelcomeMusic() {
  const current = ++operation;
  const audio = getPlayer();
  update({ visible: true, status: 'starting' });
  if (audio.ended) audio.currentTime = 0;
  try {
    await audio.play();
    if (current !== operation) return;
    update({ status: 'playing' });
  } catch (error) {
    if (current !== operation) return;
    update({
      status:
        error instanceof DOMException && error.name === 'NotAllowedError'
          ? 'blocked'
          : 'error',
    });
  }
}

export function initializeWelcomeMusic() {
  if (initialized) return;
  initialized = true;
  try {
    if (localStorage.getItem(welcomeMusicVisitKey)) return;
    // Record the first encounter even when autoplay is blocked or never requested.
    localStorage.setItem(welcomeMusicVisitKey, 'seen');
  } catch {
    // The module guard still prevents repeats when browser storage is unavailable.
  }
  void playWelcomeMusic();
}

export function pauseWelcomeMusic() {
  operation++;
  player?.pause();
  update({ status: 'paused' });
}
export function dismissWelcomeMusic() {
  pauseWelcomeMusic();
  update({ visible: false });
}
export function setWelcomeMusicVolume(volume: number) {
  const next = Math.max(0, Math.min(1, volume));
  if (player) player.volume = next;
  update({ volume: next });
}
