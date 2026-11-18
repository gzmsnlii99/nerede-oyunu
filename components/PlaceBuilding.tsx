import type { CSSProperties } from "react";
import type { Place } from "@/lib/data";
import { CITY, tileX, tileY } from "@/lib/city";
import { PlaceArt } from "./PlaceArt";

type Props = {
  place: Place;
  col: number;
  row: number;
  onClick: (place: Place) => void;
  disabled?: boolean;
  hint?: boolean;
  active?: boolean;
};

export function PlaceBuilding({
  place,
  col,
  row,
  onClick,
  disabled,
  hint,
  active,
}: Props) {
  const outdoor =
    place.art === "park" || place.art === "pool" || place.art === "mosque";

  const style = {
    left: tileX(col),
    top: tileY(row),
    width: CITY.tileW,
    height: CITY.tileH,
    "--roof": place.roof,
    "--accent": place.accent,
  } as CSSProperties;

  return (
    <button
      type="button"
      className={[
        "place",
        outdoor ? "place--outdoor" : "",
        place.awning ? "has-awning" : "",
        hint ? "is-hint" : "",
        active ? "is-active" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      onClick={() => onClick(place)}
      disabled={disabled}
      data-place-id={place.id}
      aria-label={`${place.name}. Yerin adını duymak için bas.`}
    >
      <span className="place-board">
        <span className="place-board-icon" aria-hidden="true">
          {place.emoji}
        </span>
        <span className="place-board-name">{place.name}</span>
      </span>

      <span className="place-window">
        <PlaceArt place={place} />
      </span>

      {place.awning && <span className="place-awning" aria-hidden="true" />}
    </button>
  );
}
