// Son de validation (Web Audio, pas de fichier). Préférence dans localStorage.

const SOUND_KEY = "startkaba-sound";

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(SOUND_KEY) !== "off";
}

export function setSoundEnabled(enabled: boolean) {
  localStorage.setItem(SOUND_KEY, enabled ? "on" : "off");
}

// Petit arpège ascendant de victoire.
export function playSuccessSound() {
  if (!isSoundEnabled()) return;
  try {
    const ctx = new AudioContext();
    const notes = [523.25, 659.25, 783.99]; // do, mi, sol
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.12, ctx.currentTime + i * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.3);
      osc.connect(gain).connect(ctx.destination);
      osc.start(ctx.currentTime + i * 0.12);
      osc.stop(ctx.currentTime + i * 0.12 + 0.3);
    });
  } catch {
    // AudioContext indisponible — on ignore silencieusement.
  }
}
