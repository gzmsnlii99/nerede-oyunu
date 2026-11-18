"use client";

import type { Character, Place } from "@/lib/data";
import type { Stage } from "@/lib/types";
import { CharacterAvatar } from "./CharacterAvatar";

type Props = {
  character: Character;
  stage: Stage;
  need: string;
  target: Place | null;
  solved: number;
  onRepeat: () => void;
};

export function SpeechPanel({
  character,
  stage,
  need,
  target,
  solved,
  onRepeat,
}: Props) {
  return (
    <aside className="panel">
      <div className="panel-character">
        <div className="panel-avatar-wrap">
          <CharacterAvatar character={character} size={118} />
        </div>
        <div className="panel-id">
          <span className="panel-hello">Merhaba, ben</span>
          <span className="panel-name">{character.name}</span>
          <span className="panel-role">{character.role}</span>
        </div>
      </div>

      <div className="bubble">
        <span className="bubble-tail" aria-hidden="true" />
        {stage === "need" && (
          <>
            <p className="bubble-need">{need}</p>
            <p className="bubble-ask">Nereye gitmeliyim? 🤔</p>
          </>
        )}
        {stage === "travel" && (
          <p className="bubble-need">
            🚗 {character.name} {target?.dative} gidiyor...
          </p>
        )}
        {stage === "quiz" && (
          <>
            <p className="bubble-need">{character.name} nerede? 🧐</p>
            <p className="bubble-ask">Aşağıdan seç!</p>
          </>
        )}
      </div>

      <button type="button" className="btn btn-repeat" onClick={onRepeat}>
        <span aria-hidden="true">🔊</span> Tekrar dinle
      </button>

      <div className="panel-help">
        <p className="panel-help-title">Nasıl oynanır?</p>
        <p>
          Şehirdeki yerlere dokununca adlarını duyarsın. Doğru yeri bul ve
          üzerine bas!
        </p>
      </div>

      <div className="panel-progress">
        <span className="panel-progress-label">Tamamlanan</span>
        <span className="panel-progress-value">{solved} soru</span>
      </div>
    </aside>
  );
}
