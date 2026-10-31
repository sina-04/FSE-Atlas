import { asset } from './utils';

export const welcomeMusicVisitKey = 'fse-atlas:welcome-music:v1';
const welcomeMusicPath = '/audio/secret-garden-adagio.mp3';

let initialized = false;
let player: HTMLAudioElement | undefined;

// Keep one background audio instance across client navigation and locale remounts.
export function initializeWelcomeMusic() {
  if (initialized) return;
  initialized = true;
  try {
    if (localStorage.getItem(welcomeMusicVisitKey)) return;
    localStorage.setItem(welcomeMusicVisitKey, 'seen');
  } catch {
    // The module guard prevents repeats when browser storage is unavailable.
  }

  player = new Audio(asset(welcomeMusicPath));
  player.preload = 'none';
  player.volume = 0.35;
  player.loop = false;
  // Respect browser autoplay restrictions without showing controls or prompts.
  void player.play().catch(() => {});
}
