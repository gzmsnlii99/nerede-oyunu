"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrivalQuiz } from "@/components/ArrivalQuiz";
import { CityMap } from "@/components/CityMap";
import { SpeechPanel } from "@/components/SpeechPanel";
import { StartScreen } from "@/components/StartScreen";
import {
  CHARACTERS,
  PLACES,
  PLACE_MAP,
  SCENARIOS,
  shuffle,
  type Character,
  type CharacterId,
  type Place,
  type Scenario,
} from "@/lib/data";
import type { QuizState, Stage } from "@/lib/types";
import {
  playApplause,
  playDing,
  playError,
  playPop,
  setMuted,
  speak,
  stopSpeaking,
  unlockAudio,
  warmUpSpeech,
} from "@/lib/audio";

export default function Home() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [names, setNames] = useState<Record<string, string>>(() =>
    Object.fromEntries(CHARACTERS.map((item) => [item.id, item.name])),
  );
  const [stage, setStage] = useState<Stage>("select");
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [target, setTarget] = useState<Place | null>(null);
  const [options, setOptions] = useState<Place[]>([]);
  const [quizState, setQuizState] = useState<QuizState>("asking");
  const [wrongId, setWrongId] = useState<string | null>(null);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [hintId, setHintId] = useState<string | null>(null);
  const [stars, setStars] = useState(0);
  const [solved, setSolved] = useState(0);
  const [muted, setMutedState] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [toast, setToast] = useState<{ kind: "ok" | "no"; text: string } | null>(
    null,
  );

  const queueRef = useRef<Scenario[]>([]);
  const lastIdRef = useRef<string | null>(null);
  const shakeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shakeRafRef = useRef<number | null>(null);
  const wrongTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const laterTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (kind: "ok" | "no", text: string, duration = 1900) => {
      setToast({ kind, text });
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setToast(null), duration);
    },
    [],
  );

  const later = useCallback((fn: () => void, ms: number) => {
    const timer = setTimeout(fn, ms);
    laterTimersRef.current.push(timer);
    return timer;
  }, []);

  const triggerShake = useCallback(() => {
    setShaking(false);
    if (shakeRafRef.current) cancelAnimationFrame(shakeRafRef.current);
    shakeRafRef.current = requestAnimationFrame(() => {
      shakeRafRef.current = requestAnimationFrame(() => setShaking(true));
    });
    if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
    shakeTimerRef.current = setTimeout(() => setShaking(false), 700);
  }, []);

  const pickScenario = useCallback(() => {
    if (!queueRef.current.length) {
      queueRef.current = shuffle(SCENARIOS);
      // Aynı soru arka arkaya gelmesin
      if (
        queueRef.current.length > 1 &&
        queueRef.current[queueRef.current.length - 1].id === lastIdRef.current
      ) {
        [queueRef.current[0], queueRef.current[queueRef.current.length - 1]] = [
          queueRef.current[queueRef.current.length - 1],
          queueRef.current[0],
        ];
      }
    }
    const next = queueRef.current.pop()!;
    lastIdRef.current = next.id;
    return next;
  }, []);

  const startRound = useCallback(
    (char: Character) => {
      const next = pickScenario();
      setScenario(next);
      setTarget(PLACE_MAP[next.placeId]);
      setStage("need");
      setQuizState("asking");
      setOptions([]);
      setWrongId(null);
      setHintId(null);
      setWrongAttempts(0);
      setToast(null);
      void speak(
        `Merhaba! Ben ${char.name}. ${next.need} Nereye gitmeliyim?`,
        { pitch: char.voice.pitch, rate: char.voice.rate },
      );
    },
    [pickScenario],
  );

  const handlePickCharacter = useCallback(
    (char: Character) => {
      unlockAudio();
      warmUpSpeech();
      playPop();
      const customName = (names[char.id] ?? char.name).trim() || char.name;
      const namedCharacter = { ...char, name: customName };
      setCharacter(namedCharacter);
      setStars(0);
      setSolved(0);
      queueRef.current = [];
      lastIdRef.current = null;
      startRound(namedCharacter);
    },
    [names, startRound],
  );

  const handleNameChange = useCallback((id: CharacterId, value: string) => {
    setNames((current) => ({ ...current, [id]: value.slice(0, 14) }));
  }, []);

  const handleTestSound = useCallback(() => {
    unlockAudio();
    warmUpSpeech();
    playPop();
    void speak("Merhaba! Ben Nerede oyunu. Hadi birlikte oynayalım!");
  }, []);

  const handlePlaceClick = useCallback(
    (place: Place) => {
      if (!character || !scenario || stage !== "need") return;
      unlockAudio();

      if (place.id === scenario.placeId) {
        playDing();
        setHintId(null);
        showToast("ok", `${place.name}! Doğru yer.`, 1600);
        setStage("travel");
        void speak(
          `Burası ${place.name}. ${character.name} ${place.dative} gidiyor.`,
          {
            pitch: character.voice.pitch,
            rate: character.voice.rate,
          },
        );
        return;
      }

      playError();
      triggerShake();
      showToast("no", `Burası ${place.name} değil. Tekrar dene!`);
      const attempts = wrongAttempts + 1;
      setWrongAttempts(attempts);
      if (attempts >= 2) setHintId(scenario.placeId);

      later(() => {
        void speak(`Burası ${place.name}. Olmadı, tekrar dene.`, {
          pitch: character.voice.pitch,
          rate: character.voice.rate,
        });
      }, 480);
    },
    [character, scenario, stage, wrongAttempts, triggerShake, later, showToast],
  );

  const handleArrive = useCallback(() => {
    if (!character || !target) return;
    const distractors = shuffle(
      PLACES.filter((place) => place.id !== target.id),
    ).slice(0, 2);
    setOptions(shuffle([target, ...distractors]));
    setStage("quiz");
    setQuizState("asking");
    setWrongId(null);
    setShaking(false);
    setToast(null);

    later(() => {
      void speak(`${character.name} nerede?`, {
        pitch: character.voice.pitch,
        rate: character.voice.rate,
      });
    }, 320);
  }, [character, target, later]);

  const handleQuizPick = useCallback(
    (place: Place) => {
      if (!character || !target || stage !== "quiz" || quizState !== "asking") {
        return;
      }

      if (place.id === target.id) {
        setQuizState("correct");
        setStars((value) => value + 1);
        setSolved((value) => value + 1);
        playApplause();
        void speak(
          `Doğru! ${character.name} ${target.locative}. Harikasın!`,
          { pitch: character.voice.pitch, rate: character.voice.rate },
        );
        return;
      }

      playError();
      triggerShake();
      setQuizState("wrong");
      setWrongId(place.id);
      later(() => {
        void speak(`Olmadı. ${character.name} nerede? Tekrar dene.`, {
          pitch: character.voice.pitch,
          rate: character.voice.rate,
        });
      }, 480);

      if (wrongTimerRef.current) clearTimeout(wrongTimerRef.current);
      wrongTimerRef.current = setTimeout(() => {
        setQuizState("asking");
        setWrongId(null);
      }, 1300);
    },
    [character, target, stage, quizState, triggerShake, later],
  );

  const goNext = useCallback(() => {
    if (!character) return;
    startRound(character);
  }, [character, startRound]);

  useEffect(() => {
    if (stage !== "quiz" || quizState !== "correct") return;
    const timer = setTimeout(() => {
      if (character) startRound(character);
    }, 7500);
    return () => clearTimeout(timer);
  }, [stage, quizState, character, startRound]);

  useEffect(() => {
    return () => {
      stopSpeaking();
      if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
      if (wrongTimerRef.current) clearTimeout(wrongTimerRef.current);
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      laterTimersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  const handleRepeat = useCallback(() => {
    if (!character) return;
    unlockAudio();
    const voice = { pitch: character.voice.pitch, rate: character.voice.rate };
    if (stage === "need" && scenario) {
      void speak(
        `Merhaba! Ben ${character.name}. ${scenario.need} Nereye gitmeliyim?`,
        voice,
      );
    } else if (stage === "travel" && target) {
      void speak(`${character.name} ${target.dative} gidiyor.`, voice);
    } else if (stage === "quiz" && target) {
      void speak(`${character.name} nerede?`, voice);
    }
  }, [character, stage, scenario, target]);

  const toggleMute = useCallback(() => {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
    if (next) {
      stopSpeaking();
    } else {
      unlockAudio();
      playPop();
    }
  }, [muted]);

  const backToSelect = useCallback(() => {
    stopSpeaking();
    setCharacter(null);
    setScenario(null);
    setTarget(null);
    setOptions([]);
    setStage("select");
    setQuizState("asking");
    setWrongId(null);
    setHintId(null);
    setWrongAttempts(0);
    setStars(0);
    setSolved(0);
    setShaking(false);
    setToast(null);
    queueRef.current = [];
    lastIdRef.current = null;
  }, []);

  if (!character || stage === "select") {
    return (
      <StartScreen
        names={names}
        onNameChange={handleNameChange}
        onPick={handlePickCharacter}
        onTestSound={handleTestSound}
      />
    );
  }

  return (
    <div className={`app ${shaking ? "shake-screen" : ""}`}>
      <header className="topbar">
        <div className="brand">
          <span className="brand-logo" aria-hidden="true">
            📍
          </span>
          <div className="brand-text">
            <span className="brand-title">Nerede?</span>
            <span className="brand-sub">Okul öncesi dil ve konuşma oyunu</span>
          </div>
        </div>

        <div className="topbar-actions">
          <div className="star-pill" aria-label={`${stars} yıldız`}>
            <span aria-hidden="true">⭐</span>
            <span>{stars}</span>
          </div>
          <button
            type="button"
            className="icon-btn"
            onClick={toggleMute}
            aria-label={muted ? "Sesi aç" : "Sesi kapat"}
            title={muted ? "Sesi aç" : "Sesi kapat"}
          >
            {muted ? "🔇" : "🔊"}
          </button>
          <button
            type="button"
            className="text-btn"
            onClick={backToSelect}
            title="Karakteri değiştir"
          >
            <span aria-hidden="true">👥</span> Karakter
          </button>
        </div>
      </header>

      <main className="game">
        <SpeechPanel
          character={character}
          stage={stage}
          need={scenario?.need ?? ""}
          target={target}
          solved={solved}
          onRepeat={handleRepeat}
        />

        <section className="city-area" aria-label="Nerede şehri">
          <div className="city-tip">
            {stage === "need" && "Şehirde doğru yeri bul ve üzerine bas 🔎"}
            {stage === "travel" && "Araba yola çıktı! 🚗"}
            {stage === "quiz" && "Soru ekranındasın 🧐"}
          </div>
          <CityMap
            character={character}
            stage={stage}
            target={target}
            hintId={hintId}
            onPlaceClick={handlePlaceClick}
            onArrive={handleArrive}
          />
          {toast && (
            <div className={`city-toast city-toast--${toast.kind}`} role="status">
              <span aria-hidden="true">{toast.kind === "ok" ? "✅" : "❌"}</span>
              {toast.text}
            </div>
          )}
        </section>
      </main>

      {stage === "quiz" && target && (
        <ArrivalQuiz
          character={character}
          target={target}
          options={options}
          state={quizState}
          wrongId={wrongId}
          onPick={handleQuizPick}
          onNext={goNext}
          onRepeat={handleRepeat}
        />
      )}
    </div>
  );
}
