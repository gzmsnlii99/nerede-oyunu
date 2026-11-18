"use client";

import type { CSSProperties } from "react";
import type { Character, Place } from "@/lib/data";
import type { QuizState } from "@/lib/types";
import { CharacterAvatar } from "./CharacterAvatar";
import { Confetti } from "./Confetti";
import { PlaceArt } from "./PlaceArt";

type Props = {
  character: Character;
  target: Place;
  options: Place[];
  state: QuizState;
  wrongId: string | null;
  onPick: (place: Place) => void;
  onNext: () => void;
  onRepeat: () => void;
};

export function ArrivalQuiz({
  character,
  target,
  options,
  state,
  wrongId,
  onPick,
  onNext,
  onRepeat,
}: Props) {
  return (
    <div className="quiz-overlay">
      {state === "correct" && <Confetti />}
      <div className={`quiz-card ${state === "wrong" ? "shake" : ""}`}>
        <button
          type="button"
          className="quiz-listen"
          onClick={onRepeat}
          aria-label="Soruyu tekrar dinle"
        >
          🔊
        </button>

        <div className="quiz-hero">
          <div className="quiz-avatar">
            <CharacterAvatar character={character} size={112} />
          </div>
          <div className="quiz-question">
            <span className="quiz-eyebrow">Soru</span>
            <h2>{character.name} nerede?</h2>
            <p>Doğru yeri seç.</p>
          </div>
        </div>

        <div className="quiz-options">
          {options.map((option) => {
            const isCorrect = option.id === target.id;
            const isWrong = wrongId === option.id;
            const revealed = state === "correct" && isCorrect;
            const style = {
              "--card": option.wall,
              "--edge": option.roof,
            } as CSSProperties;
            return (
              <button
                key={option.id}
                type="button"
                className={[
                  "quiz-option",
                  revealed ? "is-correct" : "",
                  isWrong ? "is-wrong" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={style}
                onClick={() => onPick(option)}
                disabled={state !== "asking"}
              >
                <span className="quiz-option-art">
                  <PlaceArt place={option} />
                  {revealed && <span className="quiz-option-check">✓</span>}
                </span>
                <span className="quiz-option-name">{option.name}</span>
              </button>
            );
          })}
        </div>

        {state === "asking" && (
          <p className="quiz-hint">👆 Bir resme dokun.</p>
        )}
        {state === "wrong" && (
          <div className="quiz-result quiz-result--wrong" role="alert">
            Olmadı, tekrar dene! 💪
          </div>
        )}
        {state === "correct" && (
          <div className="quiz-result quiz-result--correct" role="status">
            <span className="quiz-result-big">🎉 Doğru!</span>
            <span>
              {character.name} {target.locative}.
            </span>
            <button type="button" className="btn btn-next" onClick={onNext}>
              Sıradaki soru ➜
            </button>
            <span className="quiz-auto">Birazdan yeni soru geliyor...</span>
          </div>
        )}
      </div>
    </div>
  );
}
