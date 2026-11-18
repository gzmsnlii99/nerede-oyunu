"use client";

import { useEffect, useRef, useState } from "react";
import { PLACES, type Character, type Place } from "@/lib/data";
import {
  CAR_START,
  CITY,
  MAP_H,
  MAP_W,
  RIGHT_ROAD_X,
  doorPoint,
  placePoint,
  routeFor,
  streetCenterY,
  tileY,
} from "@/lib/city";
import { playVroom } from "@/lib/audio";
import { CharacterAvatar } from "./CharacterAvatar";
import { PlaceBuilding } from "./PlaceBuilding";
import type { Stage } from "@/lib/types";

type Props = {
  character: Character;
  stage: Stage;
  target: Place | null;
  hintId: string | null;
  onPlaceClick: (place: Place) => void;
  onArrive: () => void;
};

type CarState = { x: number; y: number; angle: number; duration: number };
type WalkerState = { x: number; y: number; entered: boolean };

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function CityMap({
  character,
  stage,
  target,
  hintId,
  onPlaceClick,
  onArrive,
}: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [car, setCar] = useState<CarState>({
    ...CAR_START,
    angle: 0,
    duration: 0,
  });
  const [walker, setWalker] = useState<WalkerState | null>(null);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width < 10 || rect.height < 10) return;
      const availW = Math.max(40, rect.width - 16);
      const availH = Math.max(40, rect.height - 16);
      const fit = Math.min(availW / MAP_W, availH / MAP_H);
      const minScale = window.innerWidth <= 700 ? 0.7 : 0.45;
      const next = Math.max(minScale, Math.min(fit, 1.18));
      setScale(next);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (stage === "need") {
      setCar({ ...CAR_START, angle: 0, duration: 0 });
      setWalker(null);
    }
  }, [stage]);

  useEffect(() => {
    if (stage !== "travel" || !target) return;
    const el = viewportRef.current?.querySelector(
      `[data-place-id="${target.id}"]`,
    );
    el?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [stage, target]);

  useEffect(() => {
    if (stage !== "travel" || !target) return;
    let cancelled = false;

    const index = PLACES.findIndex((p) => p.id === target.id);
    const col = index % CITY.cols;
    const row = Math.floor(index / CITY.cols);
    const legs = routeFor(col, row);
    const start = legs[0]?.from ?? CAR_START;
    const stop = placePoint(col, row);
    const door = doorPoint(col, row);

    const run = async () => {
      setWalker(null);
      setCar({ x: start.x, y: start.y, angle: legs[0]?.angle ?? 0, duration: 0 });
      playVroom();
      await sleep(160);

      for (const leg of legs) {
        if (cancelled) return;
        setCar({
          x: leg.to.x,
          y: leg.to.y,
          angle: leg.angle,
          duration: leg.duration,
        });
        await sleep(leg.duration + 90);
      }

      if (cancelled) return;
      setWalker({ x: stop.x, y: stop.y, entered: false });
      await sleep(320);

      if (cancelled) return;
      setWalker({ x: door.x, y: door.y, entered: true });
      await sleep(1050);

      if (cancelled) return;
      setWalker(null);
      onArrive();
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [stage, target, onArrive]);

  return (
    <div className="city-viewport" ref={viewportRef}>
      <div
        className="city-scaler"
        style={{ width: MAP_W * scale, height: MAP_H * scale }}
      >
        <div
          className="city-map"
          style={{
            width: MAP_W,
            height: MAP_H,
            transform: `scale(${scale})`,
          }}
        >
          {/* yollar */}
          {Array.from({ length: CITY.rows }).map((_, row) => (
            <div
              key={`road-${row}`}
              className="road road-h"
              style={{
                left: 6,
                width: RIGHT_ROAD_X + CITY.rightRoadW / 2 - 6,
                top: tileY(row) + CITY.tileH,
                height: CITY.streetH,
              }}
            >
              <span className="lane" />
            </div>
          ))}
          <div
            className="road road-v"
            style={{
              left: RIGHT_ROAD_X - CITY.rightRoadW / 2,
              top: 6,
              width: CITY.rightRoadW,
              height: MAP_H - 12,
            }}
          >
            <span className="lane lane-v" />
          </div>

          {/* ev */}
          <div
            className="home-marker"
            style={{ left: RIGHT_ROAD_X - 36, top: MAP_H - 76 }}
          >
            <span className="home-icon">🏠</span>
            <span className="home-label">Ev</span>
          </div>

          {/* binalar */}
          {PLACES.map((place, index) => {
            const col = index % CITY.cols;
            const row = Math.floor(index / CITY.cols);
            return (
              <PlaceBuilding
                key={place.id}
                place={place}
                col={col}
                row={row}
                onClick={onPlaceClick}
                disabled={stage !== "need"}
                hint={hintId === place.id}
                active={target?.id === place.id && stage === "travel"}
              />
            );
          })}

          {/* araba */}
          <div
            className="car"
            style={{
              transform: `translate(${car.x - 20}px, ${car.y - 30}px) rotate(${car.angle}deg)`,
              transitionDuration: `${car.duration}ms`,
            }}
          >
            <span className="car-wheel car-wheel-1" />
            <span className="car-wheel car-wheel-2" />
            <span className="car-wheel car-wheel-3" />
            <span className="car-wheel car-wheel-4" />
            <span className="car-body">
              <span className="car-windshield car-windshield-front" />
              <span className="car-roof" />
              <span className="car-windshield car-windshield-back" />
              <span className="car-light car-light-l" />
              <span className="car-light car-light-r" />
            </span>
          </div>

          {/* yürüyen karakter */}
          {walker && (
            <div
              className={`walker ${walker.entered ? "is-entering" : ""}`}
              style={{ left: walker.x, top: walker.y }}
            >
              <CharacterAvatar character={character} size={46} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
