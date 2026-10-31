'use client';
import { useEffect } from 'react';
import { initializeWelcomeMusic } from '@/lib/welcome-music';

export function WelcomeMusic() {
  useEffect(initializeWelcomeMusic, []);
  return null;
}
