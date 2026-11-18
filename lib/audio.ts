"use client";

let audioCtx: AudioContext | null = null;
let muted = false;
let voicesReady = false;

export function isMuted() {
  return muted;
}

export function setMuted(value: boolean) {
  muted = value;
  if (value && typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

/* ------------------------------------------------------------------ */
/* Web Audio tabanlı ses efektleri                                     */
/* ------------------------------------------------------------------ */

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    audioCtx = new Ctor();
  }
  if (audioCtx.state === "suspended") {
    void audioCtx.resume();
  }
  return audioCtx;
}

export function unlockAudio() {
  const ac = getCtx();
  if (!ac) return;
  // iOS / Chrome için sessiz bir tık ile kilidi aç
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  gain.gain.value = 0.0001;
  osc.connect(gain).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.02);
  // Sesleri önceden yükle
  if ("speechSynthesis" in window) {
    window.speechSynthesis.getVoices();
  }
}

function noiseBuffer(ac: AudioContext, seconds: number) {
  const buffer = ac.createBuffer(1, Math.floor(ac.sampleRate * seconds), ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

export function playPop() {
  if (muted) return;
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(520, t);
  osc.frequency.exponentialRampToValueAtTime(940, t + 0.12);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.16, t + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.20);
  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 0.22);
}

export function playDing() {
  if (muted) return;
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime;
  [880, 1320].forEach((freq, index) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    const start = t + index * 0.09;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.16, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.6);
    osc.connect(gain).connect(ac.destination);
    osc.start(start);
    osc.stop(start + 0.65);
  });
}

export function playSuccess() {
  if (muted) return;
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, index) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const start = t + index * 0.11;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.2, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.45);
    osc.connect(gain).connect(ac.destination);
    osc.start(start);
    osc.stop(start + 0.5);
  });
}

export function playApplause() {
  if (muted) return;
  const ac = getCtx();
  if (!ac) return;
  const duration = 2.2;
  const buffer = ac.createBuffer(
    1,
    Math.floor(ac.sampleRate * duration),
    ac.sampleRate,
  );
  const data = buffer.getChannelData(0);

  // Hafif kalabalık uğultusu
  for (let i = 0; i < data.length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * 0.012;
  }

  // Alkışlar: rastgele zamanlarda kısa gürültü patlamaları
  const clapCount = 70;
  for (let c = 0; c < clapCount; c += 1) {
    const start = Math.floor(Math.random() * data.length * 0.93);
    const length = Math.floor(ac.sampleRate * (0.008 + Math.random() * 0.018));
    const amp = 0.18 + Math.random() * 0.5;
    for (let i = 0; i < length && start + i < data.length; i += 1) {
      const env = Math.exp(-i / (ac.sampleRate * 0.0045));
      data[start + i] += (Math.random() * 2 - 1) * amp * env;
    }
  }

  const src = ac.createBufferSource();
  src.buffer = buffer;
  const band = ac.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = 1900;
  band.Q.value = 0.65;
  const high = ac.createBiquadFilter();
  high.type = "highpass";
  high.frequency.value = 350;
  const gain = ac.createGain();
  const t = ac.currentTime;
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(1.0, t + 0.06);
  gain.gain.setValueAtTime(1.0, t + duration * 0.7);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  src.connect(band).connect(high).connect(gain).connect(ac.destination);
  src.start(t);

  // Üstüne neşeli bir "tadaa"
  [659.25, 783.99, 1046.5].forEach((freq, index) => {
    const osc = ac.createOscillator();
    const g = ac.createGain();
    osc.type = "triangle";
    osc.frequency.value = freq;
    const start = t + 0.18 + index * 0.12;
    g.gain.setValueAtTime(0.0001, start);
    g.gain.exponentialRampToValueAtTime(0.13, start + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);
    osc.connect(g).connect(ac.destination);
    osc.start(start);
    osc.stop(start + 0.55);
  });
}

export function playError() {
  if (muted) return;
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime;

  // Büyük uyarı: iki alçalan "vah vah" sesi
  [0, 0.34].forEach((offset, index) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.type = "sawtooth";
    const start = t + offset;
    const base = index === 0 ? 250 : 190;
    osc.frequency.setValueAtTime(base, start);
    osc.frequency.exponentialRampToValueAtTime(base * 0.55, start + 0.3);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.22, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);
    osc.connect(gain).connect(ac.destination);
    osc.start(start);
    osc.stop(start + 0.34);
  });

  // Altına tok bir "güm"
  const thud = ac.createBufferSource();
  thud.buffer = noiseBuffer(ac, 0.3);
  const filter = ac.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(500, t);
  filter.frequency.exponentialRampToValueAtTime(90, t + 0.28);
  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.35, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
  thud.connect(filter).connect(gain).connect(ac.destination);
  thud.start(t);
}

export function playVroom() {
  if (muted) return;
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  const filter = ac.createBiquadFilter();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(65, t);
  osc.frequency.linearRampToValueAtTime(120, t + 0.35);
  osc.frequency.linearRampToValueAtTime(85, t + 0.8);
  filter.type = "lowpass";
  filter.frequency.value = 420;
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.09, t + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.85);
  osc.connect(filter).connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + 0.9);
}

/* ------------------------------------------------------------------ */
/* Türkçe konuşma sentezi                                              */
/* ------------------------------------------------------------------ */

const femaleName =
  /filiz|yelda|seda|emel|ayşe|ayse|zeynep|elif|defne|melike|özlem|ozlem|dilek|banu|female|kadın|kadin|woman|google türkçe|google turkish/i;
const maleName = /tolga|ahmet|mehmet|male|erkek|\bman\b/i;

type VoiceChoice = {
  voice: SpeechSynthesisVoice | null;
  turkish: boolean;
  gender: "female" | "male" | "unknown";
};

function findVoice(): VoiceChoice {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return { voice: null, turkish: false, gender: "unknown" };
  }
  const synth = window.speechSynthesis;
  const all = synth.getVoices();
  if (!all.length) return { voice: null, turkish: false, gender: "unknown" };

  // Yumuşak, Türkçeye uygun kadın sesi tercih edilir. Türkçe ses her zaman
  // başka dillerdeki seslerden önce gelir; erkek sesler yalnızca hiç kadın
  // sesi yoksa ve son çare olarak kullanılır.
  let best: SpeechSynthesisVoice | null = null;
  let bestScore = -Infinity;

  for (const voice of all) {
    const name = voice.name;
    const lang = voice.lang.toLowerCase();
    let score = 0;

    if (lang.startsWith("tr")) score += 1000;
    else if (/türk|turkish/i.test(name)) score += 900;

    if (femaleName.test(name)) score += 120;
    if (maleName.test(name)) score -= 60;
    if (voice.localService) score += 4;
    if (/natural|premium|enhanced|neural/i.test(name)) score += 6;
    if (voice.default) score += 1;

    if (score > bestScore) {
      bestScore = score;
      best = voice;
    }
  }

  if (!best) return { voice: null, turkish: false, gender: "unknown" };

  const turkish =
    /^tr/i.test(best.lang) || /türk|turkish/i.test(best.name);
  const gender = maleName.test(best.name)
    ? "male"
    : femaleName.test(best.name)
      ? "female"
      : "unknown";

  return { voice: best, turkish, gender };
}

export function hasFemaleTurkishVoice(): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return false;
  }
  return window.speechSynthesis
    .getVoices()
    .some(
      (voice) =>
        /^tr/i.test(voice.lang) &&
        femaleName.test(voice.name) &&
        !maleName.test(voice.name),
    );
}

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export type SpeakOptions = {
  pitch?: number;
  rate?: number;
  volume?: number;
  interrupt?: boolean;
};

export async function speak(
  text: string,
  options: SpeakOptions = {},
): Promise<void> {
  if (muted) return;
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  const synth = window.speechSynthesis;
  const { pitch = 1, rate = 0.94, volume = 0.92, interrupt = true } = options;

  if (interrupt) {
    synth.cancel();
    // Chrome'da cancel + speak art arda gelirse yeni cümle bazen yutuluyor.
    await wait(70);
  }

  synth.resume?.();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "tr-TR";
  // Yumuşak ve doğal bir ton: aşırı ince/kalın perdelerden kaçınılır.
  utterance.pitch = Math.min(1.45, Math.max(0.85, pitch));
  utterance.rate = Math.min(0.98, Math.max(0.72, rate));
  utterance.volume = Math.min(1, Math.max(0.1, volume));
  const choice = findVoice();
  if (choice.voice) {
    utterance.voice = choice.voice;
    if (choice.turkish) utterance.lang = choice.voice.lang;

    // Cihazda Türkçe kadın sesi yoksa erkek sesi daha ince ve yavaş bir
    // tonda kullanarak yumuşak bir anlatım elde etmeye çalış.
    if (choice.gender === "male") {
      utterance.pitch = Math.min(
        1.6,
        Math.max(utterance.pitch, 1.2) + 0.06,
      );
      utterance.rate = Math.min(utterance.rate, 0.88);
      utterance.volume = Math.min(utterance.volume, 0.9);
    }
  }
  if (!voicesReady) {
    voicesReady = true;
    try {
      window.localStorage.setItem("nerede-audio-ready", "1");
    } catch {
      /* yoksay */
    }
  }

  return new Promise<void>((resolve) => {
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      clearTimeout(fallbackTimer);
      resolve();
    };
    const fallbackTimer = setTimeout(
      finish,
      Math.max(3000, text.length * 115 + 1800),
    );
    utterance.onend = finish;
    utterance.onerror = finish;
    try {
      synth.speak(utterance);
    } catch {
      finish();
    }
  });
}

export function warmUpSpeech() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.getVoices();
  try {
    const utterance = new SpeechSynthesisUtterance(" ");
    utterance.volume = 0;
    utterance.lang = "tr-TR";
    const voice = findVoice();
    if (voice.voice) utterance.voice = voice.voice;
    synth.speak(utterance);
  } catch {
    /* yoksay */
  }
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

export function hasTurkishVoice(): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return false;
  }
  return window.speechSynthesis
    .getVoices()
    .some((voice) => /^tr/i.test(voice.lang));
}
