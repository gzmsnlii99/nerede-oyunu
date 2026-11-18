export const CITY = {
  cols: 6,
  rows: 4,
  padX: 20,
  padTop: 18,
  tileW: 168,
  tileH: 128,
  gapX: 7,
  streetH: 44,
  rightRoadW: 54,
  bottomPad: 76,
  startX: 0,
  speed: 430,
};

export const MAP_W =
  CITY.padX * 2 +
  CITY.cols * CITY.tileW +
  (CITY.cols - 1) * CITY.gapX +
  CITY.rightRoadW;

export const MAP_H =
  CITY.padTop + CITY.rows * (CITY.tileH + CITY.streetH) + CITY.bottomPad;

export function tileX(col: number) {
  return CITY.padX + col * (CITY.tileW + CITY.gapX);
}

export function tileY(row: number) {
  return CITY.padTop + row * (CITY.tileH + CITY.streetH);
}

export function streetCenterY(row: number) {
  return tileY(row) + CITY.tileH + CITY.streetH / 2;
}

export const RIGHT_ROAD_X =
  CITY.padX +
  CITY.cols * CITY.tileW +
  (CITY.cols - 1) * CITY.gapX +
  CITY.rightRoadW / 2;

export const CAR_START = {
  x: RIGHT_ROAD_X,
  y: streetCenterY(CITY.rows - 1),
};

export type Point = { x: number; y: number };

export function placePoint(col: number, row: number): Point {
  return {
    x: tileX(col) + CITY.tileW / 2,
    y: streetCenterY(row) + 10,
  };
}

export function doorPoint(col: number, row: number): Point {
  return {
    x: tileX(col) + CITY.tileW / 2,
    y: tileY(row) + CITY.tileH - 8,
  };
}

export type Leg = {
  from: Point;
  to: Point;
  angle: number;
  duration: number;
};

function angleFor(from: Point, to: Point) {
  const deg = (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;
  return deg + 90;
}

export function routeFor(col: number, row: number): Leg[] {
  const streetY = streetCenterY(row);
  const targetX = tileX(col) + CITY.tileW / 2;
  const points: Point[] = [{ ...CAR_START }];

  // Sağdaki ana caddeden hedef sokağa çık
  if (row !== CITY.rows - 1) {
    points.push({ x: RIGHT_ROAD_X, y: streetY });
  }
  points.push({ x: targetX, y: streetY });

  const legs: Leg[] = [];
  for (let i = 1; i < points.length; i += 1) {
    const from = points[i - 1];
    const to = points[i];
    const dist = Math.hypot(to.x - from.x, to.y - from.y);
    if (dist < 2) continue;
    legs.push({
      from,
      to,
      angle: angleFor(from, to),
      duration: Math.max(320, (dist / CITY.speed) * 1000),
    });
  }
  return legs;
}
