"use client";

import { useEffect, useState } from "react";
import { CHARACTERS, type Character, type CharacterId } from "@/lib/data";
import { hasFemaleTurkishVoice } from "@/lib/audio";
import { CharacterAvatar } from "./CharacterAvatar";

type Props = {
  names: Record<string, string>;
  onNameChange: (id: CharacterId, name: string) => void;
  onPick: (character: Character) => void;
  onTestSound: () => void;
};

export function StartScreen({
  names,
  onNameChange,
  onPick,
  onTestSound,
}: Props) {
  const [voiceNote, setVoiceNote] = useState<
    "female" | "fallback" | "none" | null
  >(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("speechSynthesis" in window)
    ) {
      setVoiceNote("none");
      return;
    }
    const synth = window.speechSynthesis;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const check = () => {
      const voices = synth.getVoices();
      if (!voices.length) {
        setVoiceNote(null);
        return;
      }
      if (!voices.some((voice) => /^tr/i.test(voice.lang))) {
        setVoiceNote("none");
      } else if (hasFemaleTurkishVoice()) {
        setVoiceNote("female");
      } else {
        setVoiceNote("fallback");
      }
    };

    check();
    synth.addEventListener("voiceschanged", check);
    timer = setTimeout(check, 1200);
    return () => {
      synth.removeEventListener("voiceschanged", check);
      if (timer) clearTimeout(timer);
    };
  }, []);

  const note =
    voiceNote === "fallback"
      ? "Cihazda Türkçe kadın sesi bulunamadı; ses daha yumuşak bir tonda ayarlandı."
      : voiceNote === "none"
        ? "Türkçe konuşma sesi bulunamadı; cihazın varsayılan sesi kullanılıyor."
        : "Ses, cihazın Türkçe kadın konuşma sesiyle çalışır.";

  return (
    <div className="start-screen">
      <div className="start-sky" aria-hidden="true">
        <span className="cloud cloud-1" />
        <span className="cloud cloud-2" />
        <span className="cloud cloud-3" />
        <span className="start-sun">☀️</span>
      </div>

      <div className="start-content">
        <div className="start-badge">Dil ve konuşma çalışması</div>
        <h1 className="start-title">
          <span className="start-pin" aria-hidden="true">
            📍
          </span>
          Nerede?
        </h1>
        <p className="start-sub">
          Bir karakter seç, ismini yaz; ihtiyacını dinle ve şehirde doğru yeri
          bul!
        </p>

        <div className="char-grid">
          {CHARACTERS.map((character) => {
            const name = names[character.id] ?? character.name;
            const pick = () =>
              onPick({
                ...character,
                name: name.trim() || character.name,
              });
            return (
              <div
                key={character.id}
                className="char-card"
                role="group"
                aria-label={`${character.role} karakteri`}
              >
                <span className="char-card-art">
                  <CharacterAvatar character={character} size={132} />
                </span>
                <span className="char-card-role">{character.role}</span>
                <label className="char-name-wrap">
                  <span className="char-name-icon" aria-hidden="true">
                    ✏️
                  </span>
                  <span className="sr-only">
                    {character.role} karakterinin ismi
                  </span>
                  <input
                    className="char-name-input"
                    type="text"
                    value={name}
                    maxLength={14}
                    spellCheck={false}
                    autoComplete="off"
                    onChange={(event) =>
                      onNameChange(character.id, event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        pick();
                      }
                    }}
                    aria-label={`${character.role} karakterinin ismi`}
                  />
                </label>
                <button
                  type="button"
                  className="char-card-pick"
                  onClick={pick}
                >
                  Seç
                </button>
              </div>
            );
          })}
        </div>

        <div className="start-steps">
          <div className="start-step">
            <span>1</span> Karakterini seç
          </div>
          <div className="start-step">
            <span>2</span> İhtiyacı dinle
          </div>
          <div className="start-step">
            <span>3</span> Doğru yeri bul
          </div>
        </div>

        <div className="start-footer">
          <button
            type="button"
            className="btn btn-sound-test"
            onClick={onTestSound}
          >
            <span aria-hidden="true">🔊</span> Sesi dene
          </button>
          <span className="start-note">{note}</span>
        </div>
      </div>

      <div className="start-ground" aria-hidden="true">
        <span className="start-building b1">🏥</span>
        <span className="start-building b2">🏦</span>
        <span className="start-building b3">🌳</span>
        <span className="start-building b4">🏫</span>
        <span className="start-building b5">🍦</span>
        <span className="start-building b6">🚒</span>
      </div>
    </div>
  );
}
