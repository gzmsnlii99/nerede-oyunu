import type { ReactNode } from "react";
import type { Place } from "@/lib/data";

/* Tüm sahneler 160 × 95 kutuda çizilir; zemin çizgisi y = 78. */
const SKIN = "#F6CEAC";
const SKIN_DARK = "#E2B187";
const HAIR = "#4A3324";
const HAIR_LIGHT = "#6B4A33";
const INK = "#3E3025";
const CREAM = "#FFFDF7";
const WOOD = "#CFA067";
const WOOD_DARK = "#AE7C45";
const METAL = "#9AA9B8";
const METAL_DARK = "#6E7F92";

type RoomProps = {
  bg: string;
  floor: string;
  children: ReactNode;
};

function Room({ bg, floor, children }: RoomProps) {
  return (
    <>
      <rect width="160" height="95" fill={bg} />
      <rect y="78" width="160" height="17" fill={floor} />
      <path d="M0 78 H160" stroke="#3B2F26" strokeOpacity="0.1" strokeWidth="1.6" />
      {children}
    </>
  );
}

type PersonProps = {
  x: number;
  y?: number;
  s?: number;
  shirt?: string;
  pants?: string;
  hair?: string;
  skin?: string;
  coat?: string;
  apron?: string;
  hat?: "chef" | "cap" | "fire" | "police" | "nurse";
  longHair?: boolean;
  wave?: boolean;
};

function Person({
  x,
  y = 79,
  s = 1,
  shirt = "#7FB8A8",
  pants = "#5D6B80",
  hair = HAIR,
  skin = SKIN,
  coat,
  apron,
  hat,
  longHair,
  wave,
}: PersonProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="1.6" rx="9.5" ry="2.4" fill={INK} opacity="0.12" />

      <rect x="-5.4" y="-12" width="4.8" height="12" rx="2.4" fill={pants} />
      <rect x="0.6" y="-12" width="4.8" height="12" rx="2.4" fill={pants} />
      <ellipse cx="-3.2" cy="0.4" rx="3.9" ry="2" fill="#6E5A4B" />
      <ellipse cx="3.2" cy="0.4" rx="3.9" ry="2" fill="#6E5A4B" />

      {longHair && (
        <path d="M-8 -38 Q-10.5 -26 -8 -17 L8 -17 Q10.5 -26 8 -38 Z" fill={hair} />
      )}

      <path
        d="M-7.5 -28 Q-7.5 -31.5 0 -31.5 Q7.5 -31.5 7.5 -28 L9 -12 Q9 -8.5 5 -8.5 L-5 -8.5 Q-9 -8.5 -9 -12 Z"
        fill={shirt}
      />
      {coat && (
        <>
          <path
            d="M-7.5 -28 Q-7.5 -31.5 0 -31.5 Q7.5 -31.5 7.5 -28 L9 -12 Q9 -8.5 5 -8.5 L-5 -8.5 Q-9 -8.5 -9 -12 Z"
            fill={coat}
          />
          <path
            d="M-3.2 -31.5 L0 -26 L3.2 -31.5"
            fill="none"
            stroke={shirt}
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </>
      )}
      {apron && (
        <path
          d="M-5 -24.5 L5 -24.5 L5.8 -12 Q6 -9 0 -9 Q-6 -9 -5.8 -12 Z"
          fill={apron}
        />
      )}

      <rect
        x="-11"
        y="-28"
        width="4"
        height="16"
        rx="2"
        fill={coat ?? shirt}
        transform={wave ? "rotate(-52 -9 -26)" : "rotate(6 -9 -20)"}
      />
      <rect
        x="7"
        y="-28"
        width="4"
        height="16"
        rx="2"
        fill={coat ?? shirt}
        transform="rotate(-6 9 -20)"
      />
      <circle cx={wave ? -15 : -10} cy={wave ? -31 : -12} r="2.3" fill={skin} />
      <circle cx="10" cy="-12" r="2.3" fill={skin} />

      <rect x="-2.4" y="-34.5" width="4.8" height="4.5" rx="2" fill={skin} />
      <circle cx="0" cy="-41" r="7.6" fill={skin} />

      <path
        d="M-7.6 -43 Q-6 -49 0 -49 Q6 -49 7.6 -43 Q3 -45.5 0 -45.5 Q-3 -45.5 -7.6 -43 Z"
        fill={hair}
      />
      {longHair && (
        <>
          <path d="M-7.6 -43 Q-9.5 -40 -8.6 -35 L-6.4 -36 Q-7.2 -40 -6.2 -43 Z" fill={hair} />
          <path d="M7.6 -43 Q9.5 -40 8.6 -35 L6.4 -36 Q7.2 -40 6.2 -43 Z" fill={hair} />
        </>
      )}
      {hat === "chef" && (
        <g>
          <rect x="-5.6" y="-52.4" width="11.2" height="4" rx="2" fill={CREAM} />
          <circle cx="-3.9" cy="-53.8" r="3" fill={CREAM} />
          <circle cx="0" cy="-55.2" r="3.4" fill={CREAM} />
          <circle cx="3.9" cy="-53.8" r="3" fill={CREAM} />
        </g>
      )}
      {hat === "cap" && (
        <path
          d="M-7.8 -46.8 Q-6 -51.6 0 -51.6 Q6 -51.6 7.8 -46.8 L0 -47.8 Z"
          fill={coat ?? shirt}
        />
      )}
      {hat === "fire" && (
        <path
          d="M-8 -46.5 Q-7.4 -52 0 -52 Q7.4 -52 8 -46.5 L5 -44.5 L-5 -44.5 Z"
          fill="#D9534F"
        />
      )}
      {hat === "police" && (
        <>
          <path d="M-8 -46.8 Q-7 -52 0 -52 Q7 -52 8 -46.8 L0 -47.8 Z" fill="#40639B" />
          <circle cx="0" cy="-49" r="1.5" fill="#F6D267" />
        </>
      )}
      {hat === "nurse" && (
        <path
          d="M-7.8 -46.8 Q-6 -51.6 0 -51.6 Q6 -51.6 7.8 -46.8 L0 -47.8 Z"
          fill={CREAM}
        />
      )}

      <circle cx="-2.7" cy="-41.6" r="0.9" fill={INK} />
      <circle cx="2.7" cy="-41.6" r="0.9" fill={INK} />
      <path
        d="M-1.8 -38.7 Q0 -37.5 1.8 -38.7"
        stroke="#B35D49"
        strokeWidth="0.9"
        strokeLinecap="round"
        fill="none"
      />
    </g>
  );
}

function Plant({ x, y = 79, s = 1 }: { x: number; y?: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-5 0 L5 0 L3.6 -9 L-3.6 -9 Z" fill="#D9986B" />
      <path d="M-3.5 -8.5 L3.5 -8.5 L3 -6 L-3 -6 Z" fill="#B87C52" />
      <ellipse cx="-4" cy="-16" rx="3.6" ry="7" fill="#7CC48F" transform="rotate(-22 -4 -16)" />
      <ellipse cx="4" cy="-17" rx="3.6" ry="7" fill="#8ED3A0" transform="rotate(24 4 -17)" />
      <ellipse cx="0" cy="-21" rx="3.4" ry="7.6" fill="#6DBB83" />
    </g>
  );
}

function Cup({ x, y, color = "#FFFFFF" }: { x: number; y: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d="M-3 -4 L3 -4 L2.4 1 L-2.4 1 Z" fill={color} />
      <path d="M-3 -4 L3 -4" stroke="#C7B7A6" strokeWidth="0.8" />
      <path
        d="M-3.2 -6 Q-3.6 -8 -2.4 -9"
        stroke="#D8CFC4"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

function Counter({
  x,
  y = 60,
  w,
  color = "#EFDCC0",
}: {
  x: number;
  y?: number;
  w: number;
  color?: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={79 - y} fill={color} />
      <rect x={x - 1.6} y={y - 3.4} width={w + 3.2} height="4.6" rx="2.2" fill={WOOD_DARK} />
      <rect x={x + 3} y={y + 6} width={w - 6} height="2" fill="#000" opacity="0.06" />
    </g>
  );
}

function Table({ x, top = 62, w = 30 }: { x: number; top?: number; w?: number }) {
  return (
    <g>
      <rect x={x} y={top} width={w} height="3.4" rx="1.7" fill={WOOD} />
      <rect x={x + w / 2 - 1.3} y={top + 3.4} width="2.6" height={79 - top - 3.4} fill={WOOD_DARK} />
    </g>
  );
}

const BOOK_COLORS = ["#E8798A", "#5BAE92", "#EFC24F", "#7C9BE0", "#C48BD8", "#5CB9CE"];

function Books({
  x,
  y,
  w,
  h = 10,
  count = 6,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  count?: number;
}) {
  const bw = w / count;
  return (
    <g>
      {Array.from({ length: count }).map((_, i) => (
        <rect
          key={i}
          x={x + i * bw + 0.4}
          y={y + ((i * 7) % 3 === 0 ? 0.8 : 0)}
          width={bw - 0.8}
          height={h - ((i * 7) % 3 === 0 ? 0.8 : 0)}
          rx="0.8"
          fill={BOOK_COLORS[i % BOOK_COLORS.length]}
        />
      ))}
    </g>
  );
}

function Bookcase({
  x,
  y,
  w,
  h,
  rows = 3,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rows?: number;
}) {
  const innerTop = y + 2.5;
  const rowH = (h - 6) / rows;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2.4" fill={WOOD} />
      <rect x={x + 2.5} y={y + 2.5} width={w - 5} height={h - 5} rx="1.4" fill="#F8EFE1" />
      {Array.from({ length: rows }).map((_, r) => (
        <g key={r}>
          <rect
            x={x + 2.5}
            y={innerTop + rowH * (r + 1) - 2.6}
            width={w - 5}
            height="2.2"
            fill={WOOD_DARK}
          />
          <Books
            x={x + 4}
            y={innerTop + rowH * r + rowH - 12}
            w={w - 8}
            h={9.4}
            count={Math.max(4, Math.round(w / 8))}
          />
        </g>
      ))}
    </g>
  );
}

/* --- küçük ürün çizimleri ------------------------------------------ */

function Milk({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-4.4 0 L-4.4 -10 L0 -14 L4.4 -10 L4.4 0 Z" fill="#FFFFFF" stroke="#CFE2EE" strokeWidth="0.7" />
      <path d="M-4.4 -8.4 H4.4 V-4.6 H-4.4 Z" fill="#5FB8E8" />
      <path d="M0 -9.6 Q1.4 -11 2.8 -9.6" stroke="#FFFFFF" strokeWidth="0.9" fill="none" />
      <path d="M-4.4 -10 L0 -14 L4.4 -10" fill="#EAF5FB" stroke="#CFE2EE" strokeWidth="0.7" />
      <rect x="-2.6" y="-3.6" width="5.2" height="2.6" rx="0.8" fill="#BEE7FA" />
    </g>
  );
}

function WaterBottle({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-3" y="-13" width="6" height="13" rx="2" fill="#D8F1FC" stroke="#9BD3EA" strokeWidth="0.7" />
      <rect x="-1.8" y="-15.4" width="3.6" height="2.8" rx="1" fill="#3FA9DD" />
      <rect x="-3" y="-9.6" width="6" height="4.6" fill="#4FB8E8" />
      <path d="M-3 -6.4 H3" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.7" />
      <rect x="-2" y="-4.6" width="4" height="1.4" rx="0.5" fill="#FFFFFF" opacity="0.8" />
    </g>
  );
}

function PastaBox({ x, y, s = 1, color = "#F2B33D" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-5" y="-13" width="10" height="13" rx="1" fill={color} stroke="#D89A28" strokeWidth="0.6" />
      <rect x="-4" y="-11.6" width="8" height="4.4" rx="0.6" fill="#FFF3D6" />
      <path d="M-4 -9.4 H4 M-4 -8 H2.4" stroke="#D89A28" strokeWidth="0.7" />
      <g stroke="#F3D07C" strokeWidth="0.8">
        <path d="M-3.4 -1.4 V-5.4" />
        <path d="M-1.6 -1.2 V-5.8" />
        <path d="M0.2 -1.4 V-5.2" />
        <path d="M2 -1.2 V-5.6" />
        <path d="M3.4 -1.4 V-5" />
      </g>
    </g>
  );
}

function Bill({ x, y, s = 1, rotate = 0 }: { x: number; y: number; s?: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`}>
      <rect x="-8" y="-4.5" width="16" height="9" rx="1.2" fill="#9BD8A8" stroke="#5FAE72" strokeWidth="0.7" />
      <rect x="-6.4" y="-3.2" width="12.8" height="6.4" rx="0.8" fill="none" stroke="#5FAE72" strokeWidth="0.5" />
      <circle r="2.4" fill="#D9F2DF" stroke="#5FAE72" strokeWidth="0.6" />
      <text
        x="0"
        y="1.9"
        fontSize="4.4"
        fontWeight="700"
        fill="#3F8A54"
        textAnchor="middle"
        fontFamily="sans-serif"
      >
        ₺
      </text>
    </g>
  );
}

function Coin({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="3.6" ry="2.2" fill="#F2C24B" stroke="#C9971F" strokeWidth="0.6" />
      <ellipse cx="0" cy="-1.4" rx="3.6" ry="2.2" fill="#FBDD86" stroke="#C9971F" strokeWidth="0.6" />
      <text x="0" y="-0.1" fontSize="2.4" fontWeight="700" fill="#B8860B" textAnchor="middle" fontFamily="sans-serif">
        ₺
      </text>
    </g>
  );
}

function Cake({ x, y, s = 1, color = "#F49AC0" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-8" y="-12" width="16" height="12" rx="1.4" fill="#F7DFB2" />
      <rect x="-8" y="-12" width="16" height="4.6" rx="2" fill={color} />
      <path d="M-8 -7.4 Q-4 -5 0 -7.4 Q4 -9.8 8 -7.4 L8 -5.4 Q4 -7.8 0 -5.4 Q-4 -3 0 0" fill="#FFFFFF" opacity="0.5" />
      <path d="M-8 -2.4 H8" stroke="#E8C794" strokeWidth="1.4" />
      <circle cx="0" cy="-14.4" r="2.4" fill="#E4556A" />
      <path d="M0 -16.8 Q0.8 -19 1.8 -17.6" stroke="#5CA06A" strokeWidth="0.8" fill="none" />
    </g>
  );
}

function IceCreamCone({
  x,
  y,
  s = 1,
  flavors = ["#F6A7C1", "#F7D06B", "#A8DEC8"],
}: {
  x: number;
  y: number;
  s?: number;
  flavors?: string[];
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-5.6 0 L5.6 0 L0 -12 Z" fill="#E8B778" stroke="#C99455" strokeWidth="0.6" />
      <path d="M-4.4 -2.4 H4.4 M-2.6 -5.4 H2.6" stroke="#C99455" strokeWidth="0.7" />
      {flavors.map((f, i) => (
        <circle key={i} cx={(i - (flavors.length - 1) / 2) * 3.4} cy={-13 - i * 2.6} r="3.8" fill={f} />
      ))}
      <circle cx="0" cy={-13 - (flavors.length - 1) * 2.6 - 1} r="2.2" fill="#E4556A" />
    </g>
  );
}

function IceTub({ x, y, color }: { x: number; y: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="-7" y="-9" width="14" height="9" rx="1.6" fill="#FFFFFF" stroke="#D7E6EF" strokeWidth="0.8" />
      <rect x="-6" y="-7.6" width="12" height="5.4" rx="2" fill={color} />
      <path d="M-5 -7 Q-2 -9.6 1 -7 Q3 -5.4 5 -7" fill="#FFFFFF" opacity="0.45" />
    </g>
  );
}

function BottleMed({
  x,
  y,
  s = 1,
  color = "#FFFFFF",
}: {
  x: number;
  y: number;
  s?: number;
  color?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-3.4" y="-11" width="6.8" height="11" rx="1.6" fill={color} stroke="#C9D8D2" strokeWidth="0.7" />
      <rect x="-2" y="-13.4" width="4" height="3" rx="1" fill="#F2A33C" />
      <rect x="-2.6" y="-8.6" width="5.2" height="4.8" rx="0.6" fill="#FFFFFF" />
      <path d="M-1.4 -7.2 V-4.8 M-2.7 -6 H-0.1" stroke="#E4556A" strokeWidth="1.2" strokeLinecap="round" />
    </g>
  );
}

function Blister({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-7" y="-4" width="14" height="8" rx="1.4" fill="#FFFFFF" stroke="#D6E0E8" strokeWidth="0.7" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={-3.6 + i * 3.6} cy="0" r="1.7" fill="#F28080" />
      ))}
    </g>
  );
}

function MedCabinet({
  x,
  y,
  w,
  h,
  rows = 3,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rows?: number;
}) {
  const rowH = (h - 6) / rows;
  const count = Math.max(3, Math.round(w / 12));
  const bw = (w - 8) / count;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2.4" fill="#FFFFFF" stroke="#B9D8CC" strokeWidth="1.2" />
      <rect x={x + 2} y={y + 2} width={w - 4} height={h - 4} rx="1.4" fill="#F2FAF6" />
      {Array.from({ length: rows }).map((_, r) =>
        Array.from({ length: count }).map((__, i) => {
          const bx = x + 4 + i * bw;
          const top = y + 4 + rowH * r;
          const kind = (r * 3 + i) % 3;
          if (kind === 0) {
            return (
              <g key={`${r}-${i}`}>
                <rect x={bx} y={top + 1.6} width={bw - 1.4} height={rowH - 6} rx="1" fill="#FFFFFF" stroke="#D8CCBE" strokeWidth="0.7" />
                <rect x={bx} y={top + 2.8} width={bw - 1.4} height={2.4} fill="#EF4444" />
                <rect x={bx + 1.2} y={top + 6.4} width={bw - 3.8} height="1.4" fill="#EBB6B6" />
              </g>
            );
          }
          if (kind === 1) {
            return (
              <g key={`${r}-${i}`}>
                <rect x={bx + 0.6} y={top + 2} width={bw - 2.6} height={rowH - 7} rx="1.4" fill="#F9E7A8" stroke="#D9C177" strokeWidth="0.7" />
                <rect x={bx + 1.6} y={top + 4} width={bw - 4.6} height="1.5" fill="#E2A33C" />
                <circle cx={bx + bw / 2 - 0.7} cy={top + rowH - 7.4} r="1.1" fill="#E4556A" />
              </g>
            );
          }
          return (
            <g key={`${r}-${i}`}>
              <BottleMed x={bx + bw / 2 - 0.7} y={top + rowH - 3.4} s={0.62} color="#EAF6FF" />
            </g>
          );
        }),
      )}
      {Array.from({ length: rows }).map((_, r) => (
        <rect
          key={`shelf-${r}`}
          x={x + 3}
          y={y + 4 + rowH * (r + 1) - 2.4}
          width={w - 6}
          height="2"
          fill="#A8CFC1"
        />
      ))}
    </g>
  );
}

function HospitalScene() {
  return (
    <Room bg="#EFF8FC" floor="#DCEBF2">
      <g transform="translate(150 15)">
        <circle r="11.5" fill="#FDE4E4" />
        <path d="M-7 -2.4 H7 V2.4 H-7 Z" fill="#EF4444" />
        <path d="M-2.4 -7 H2.4 V7 H-2.4 Z" fill="#EF4444" />
      </g>

      <Person x={26} y={79} coat="#FFFFFF" shirt="#8FD3C5" longHair />
      <path d="M33 52 Q33 60 42 60" stroke="#7C93A8" strokeWidth="1.4" fill="none" />
      <circle cx="42.5" cy="60" r="1.8" fill="#7C93A8" />
      <rect x="30" y="44" width="4" height="8" rx="1.5" fill="#F6D267" opacity="0.9" />

      <g>
        <rect x="84" y="60" width="68" height="8" rx="3" fill="#BFDCEA" />
        <rect x="86" y="52" width="64" height="9" rx="4" fill="#FFFFFF" />
        <rect x="106" y="44" width="36" height="15" rx="6" fill="#9FD8CF" />
        <rect x="89" y="47" width="15" height="8" rx="4" fill="#FFFFFF" />
        <circle cx="122" cy="45" r="5.2" fill={SKIN} />
        <path d="M117 45 Q122 39.6 127 45" fill={HAIR} />
        <circle cx="120.4" cy="45.4" r="0.7" fill={INK} />
        <circle cx="123.6" cy="45.4" r="0.7" fill={INK} />
        <rect x="86.5" y="68" width="3.4" height="11" rx="1.6" fill="#94B4C6" />
        <rect x="146.5" y="68" width="3.4" height="11" rx="1.6" fill="#94B4C6" />
      </g>

      <path d="M78 18 V52" stroke="#B9C7D6" strokeWidth="1.6" />
      <rect x="71" y="13" width="14" height="6" rx="2" fill="#D7F0FF" stroke="#B9C7D6" strokeWidth="0.8" />
      <path d="M78 23 Q84 30 78 40" stroke="#BBD6E6" strokeWidth="1.4" fill="none" />

      <rect x="8" y="14" width="28" height="19" rx="2.4" fill="#3F4C5C" />
      <path d="M12 25 H18 L20 19 L23 30 L26 24 H32" stroke="#7CF2B0" strokeWidth="1.4" fill="none" />
      <rect x="19" y="33" width="6" height="3" rx="1" fill="#7C8FA3" />
    </Room>
  );
}

function PharmacyScene() {
  return (
    <Room bg="#F1FBF6" floor="#DCEEE7">
      <g transform="translate(141 20)">
        <circle r="12.5" fill="#D6F5E7" />
        <path d="M-8 -2.7 H8 V2.7 H-8 Z" fill="#14A05F" />
        <path d="M-2.7 -8 H2.7 V8 H-2.7 Z" fill="#14A05F" />
      </g>

      <MedCabinet x={4} y={14} w={60} h={64} rows={3} />
      <MedCabinet x={68} y={24} w={27} h={54} rows={2} />

      <Person x={122} y={79} coat="#FFFFFF" shirt="#7FD3BE" longHair />
      <Counter x={94} y={61} w={62} />
      <BottleMed x={102} y={60} s={1.35} />
      <BottleMed x={111} y={60} s={1.05} color="#F7C948" />
      <Blister x={120} y={53} s={0.95} />
      <BottleMed x={134} y={60} s={1.15} color="#8FD3E8" />
      <Blister x={140} y={53} s={0.8} />
    </Room>
  );
}

function VetScene() {
  return (
    <Room bg="#FFF8EB" floor="#F2E6CF">
      <g fill="#E3C79B">
        <circle cx="20" cy="14" r="2.2" />
        <circle cx="16.6" cy="10.8" r="1.4" />
        <circle cx="20" cy="9.2" r="1.4" />
        <circle cx="23.4" cy="10.8" r="1.4" />
        <circle cx="140" cy="10" r="2" />
        <circle cx="137" cy="7" r="1.3" />
        <circle cx="140" cy="5.6" r="1.3" />
        <circle cx="143" cy="7" r="1.3" />
      </g>

      <MedCabinet x={104} y={16} w={30} h={30} rows={2} />

      <Person x={26} y={79} coat="#FFFFFF" shirt="#9FD8E8" longHair />
      <rect x="25" y="57" width="13" height="9" rx="2" fill="#FFFFFF" stroke="#C9D8E2" strokeWidth="0.8" />
      <path d="M28 60 H35 M28 63 H33" stroke="#C9D8E2" strokeWidth="0.9" />

      <rect x="44" y="60" width="56" height="4.6" rx="2.3" fill="#E4C9A3" />
      <rect x="47" y="64.6" width="2.6" height="14" fill={WOOD_DARK} />
      <rect x="94" y="64.6" width="2.6" height="14" fill={WOOD_DARK} />

      <g transform="translate(62 60)">
        <ellipse cx="0" cy="-6" rx="13" ry="6.4" fill="#D8A46F" />
        <circle cx="14" cy="-11" r="6.4" fill="#E4B383" />
        <path d="M9 -15.6 Q7 -22 12 -20 Q14 -17 13 -14 Z" fill="#B9824F" />
        <path d="M19 -15.6 Q22 -22 18 -20 Q16 -17 17 -14 Z" fill="#B9824F" />
        <circle cx="16.4" cy="-12" r="0.9" fill={INK} />
        <circle cx="11.6" cy="-12" r="0.9" fill={INK} />
        <ellipse cx="14" cy="-9" rx="1.5" ry="1.1" fill="#5A4336" />
        <path d="M14 -8 Q14 -6 16 -7" stroke="#B35D49" strokeWidth="0.8" fill="none" />
        <path d="M-12 -6 Q-18 -10 -16 -2" stroke="#D8A46F" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        <rect x="-8" y="-2" width="2.6" height="4" rx="1.2" fill="#C48F5D" />
        <rect x="8" y="-2" width="2.6" height="4" rx="1.2" fill="#C48F5D" />
      </g>

      <g transform="translate(140 79)">
        <ellipse cx="0" cy="-7" rx="9" ry="6" fill="#B8B2A8" />
        <circle cx="8" cy="-13" r="5.4" fill="#C3BDB3" />
        <path d="M4.5 -17 L5 -22 L8 -18 Z" fill="#B8B2A8" />
        <path d="M10 -18 L12 -22 L13.5 -17 Z" fill="#B8B2A8" />
        <circle cx="9.5" cy="-13.5" r="0.8" fill={INK} />
        <circle cx="6.5" cy="-13.5" r="0.8" fill={INK} />
        <path d="M8 -11.5 Q9 -10.5 10 -11.5" stroke="#B35D49" strokeWidth="0.7" fill="none" />
        <path d="M-9 -7 Q-15 -7 -13 -1" stroke="#B8B2A8" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      </g>

      <Person x={122} y={79} shirt="#F3B5C6" s={0.92} />
    </Room>
  );
}

function BankScene() {
  return (
    <Room bg="#EEF4FC" floor="#DCE6F2">
      <g transform="translate(8 12)">
        <rect width="44" height="66" rx="4" fill="#4FB08F" stroke="#2E8A6E" strokeWidth="1.4" />
        <rect x="4" y="4" width="36" height="8" rx="2.4" fill="#1F7A5E" />
        <text x="22" y="10" fontSize="5.8" fontWeight="700" fill="#EAF9F2" textAnchor="middle" fontFamily="sans-serif">
          ATM
        </text>
        <rect x="5" y="16" width="34" height="17" rx="2" fill="#E4F8F0" stroke="#2E8A6E" strokeWidth="0.8" />
        <path d="M8 21 H28 M8 25 H24 M8 29 H27" stroke="#8CC7B6" strokeWidth="1.3" strokeLinecap="round" />
        <rect x="5" y="37" width="21" height="14" rx="2" fill="#D3EFE4" stroke="#2E8A6E" strokeWidth="0.6" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <circle key={i} cx={9 + (i % 3) * 6} cy={41 + Math.floor(i / 3) * 4} r="1.4" fill="#2E8A6E" />
        ))}
        <rect x="29" y="38" width="10" height="3.2" rx="1.6" fill="#1F7A5E" />
        <rect x="29" y="45" width="10" height="7" rx="1.4" fill="#F2C24B" />
        <path d="M31 47.5 H37 M31 49.5 H35" stroke="#B98A2E" strokeWidth="0.9" />
        <rect x="4" y="58" width="36" height="3" rx="1.5" fill="#1F7A5E" opacity="0.5" />
      </g>

      <Bill x={63} y={20} rotate={-12} s={0.95} />
      <Bill x={79} y={14} rotate={10} s={0.8} />
      <Bill x={63} y={35} rotate={8} s={0.85} />
      <Coin x={98} y={24} />
      <Coin x={104} y={20} s={0.9} />
      <Coin x={54} y={10} s={0.8} />

      <Person x={124} y={79} coat="#FFFFFF" shirt="#B9C8E8" longHair />
      <Counter x={96} y={62} w={62} />
      <Bill x={108} y={58} s={0.7} rotate={-8} />
      <Coin x={126} y={57} />
      <Coin x={133} y={57} />

      <Person x={150} y={79} shirt="#F3B5C6" s={0.9} />
    </Room>
  );
}

function Envelope({
  x,
  y,
  s = 1,
  rotate = 0,
}: {
  x: number;
  y: number;
  s?: number;
  rotate?: number;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`}>
      <rect x="-9" y="-6" width="18" height="12" rx="1.4" fill="#FFFDF7" stroke="#DCCBAE" strokeWidth="0.9" />
      <path d="M-9 -6 L0 1.6 L9 -6" fill="none" stroke="#DCCBAE" strokeWidth="0.9" />
      <rect x="4.4" y="-4.6" width="3.4" height="3" rx="0.5" fill="#F2A3B6" />
    </g>
  );
}

function Cart({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M0 0 H7 L11 14 H34 L38 3"
        stroke={METAL}
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 5 H36" stroke="#C7D1DC" strokeWidth="1.2" />
      <rect x="5" y="6.4" width="4.4" height="7" rx="1" fill="#F2A3A3" />
      <rect x="11" y="4.6" width="4.4" height="9" rx="1" fill="#F7D488" />
      <rect x="17" y="7.6" width="5" height="6" rx="1" fill="#9FD8CF" />
      <circle cx="14" cy="18" r="2.8" fill="#5C6672" />
      <circle cx="32" cy="18" r="2.8" fill="#5C6672" />
    </g>
  );
}

function CoffeeSign({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r="11" fill="#FFF3E0" stroke="#B98F63" strokeWidth="1.3" />
      <path d="M-5 -1.6 H3 V3 Q3 6 0 6 H-2 Q-5 6 -5 3 Z" fill="#8B5E3C" />
      <path d="M3 0.4 Q7 0.4 7 3 Q7 5.6 3 5.6" stroke="#8B5E3C" strokeWidth="1.5" fill="none" />
      <path d="M-3 -4.4 Q-5 -6.6 -3 -8.6 M0 -4.4 Q-2 -6.6 0 -8.6" stroke="#C9A98A" strokeWidth="1" fill="none" strokeLinecap="round" />
    </g>
  );
}

function LibraryScene() {
  return (
    <Room bg="#FBF3E6" floor="#EADFCE">
      <Bookcase x={4} y={7} w={46} h={45} rows={3} />
      <Bookcase x={57} y={7} w={46} h={45} rows={3} />
      <Bookcase x={110} y={7} w={46} h={45} rows={3} />

      <Person x={18} y={79} shirt="#8FD3C5" s={0.92} longHair />
      <Person x={34} y={79} shirt="#F3A6C6" s={0.9} />
      <Table x={8} top={62} w={40} />
      <Books x={13} y={57.4} w={13} h={4.6} count={3} />

      <Person x={78} y={79} shirt="#F7D488" s={0.92} />
      <Person x={94} y={79} shirt="#9FC4E8" s={0.9} longHair />
      <Table x={68} top={62} w={38} />
      <Books x={73} y={57.4} w={13} h={4.6} count={3} />

      <Person x={132} y={79} shirt="#C7B0E8" s={0.92} longHair />
      <Table x={120} top={62} w={34} />
      <Books x={125} y={57.4} w={13} h={4.6} count={3} />

      <path d="M152 78 V42" stroke="#B9A58B" strokeWidth="1.6" />
      <path d="M144 42 H160 L156 32 H148 Z" fill="#F4D784" />
    </Room>
  );
}

function PostScene() {
  const letters = [
    { x: 78, y: 10, r: -8 },
    { x: 99, y: 8, r: 6 },
    { x: 120, y: 12, r: -4 },
    { x: 141, y: 9, r: 8 },
    { x: 88, y: 25, r: 5 },
    { x: 111, y: 23, r: -6 },
    { x: 133, y: 27, r: 3 },
  ];
  return (
    <Room bg="#FFF9E8" floor="#EFE5CE">
      {letters.map((l, i) => (
        <Envelope key={i} x={l.x} y={l.y} rotate={l.r} s={0.9} />
      ))}

      <g transform="translate(6 12)">
        <rect width="56" height="46" rx="3" fill="#E9C96B" stroke="#D2AE4C" strokeWidth="1" />
        {[0, 1].map((row) =>
          [0, 1, 2].map((col) => (
            <g key={`${row}-${col}`}>
              <rect x={4 + col * 17} y={4 + row * 20} width="14" height="16" rx="2" fill="#FDF1C3" stroke="#D2AE4C" strokeWidth="0.9" />
              <rect x={4 + col * 17} y={7 + row * 20} width="14" height="4" rx="1" fill="#E2B84A" />
              <path d={`M${7 + col * 17} ${12 + row * 20} H${14 + col * 17}`} stroke="#C9A33B" strokeWidth="0.8" />
            </g>
          )),
        )}
      </g>

      <Person x={92} y={79} shirt="#7FA8D8" coat="#F6E3A1" longHair />
      <Counter x={70} y={62} w={30} />
      <Envelope x={84} y={56} s={0.9} rotate={-6} />
      <Envelope x={92} y={58} s={0.7} rotate={8} />

      <Person x={146} y={79} shirt="#7FA8D8" coat="#F6E3A1" s={0.95} />

      <rect x="106" y="60" width="22" height="18" rx="2" fill="#DDBB93" stroke="#C9A273" strokeWidth="0.8" />
      <path d="M117 60 V78" stroke="#C9A273" strokeWidth="1.2" />
      <path d="M106 60 L117 66 L128 60" stroke="#C9A273" strokeWidth="1" fill="none" />
      <rect x="132" y="64" width="16" height="14" rx="2" fill="#E8C79F" stroke="#C9A273" strokeWidth="0.8" />
      <path d="M140 64 V78" stroke="#C9A273" strokeWidth="1" />
    </Room>
  );
}

function MarketScene() {
  const shelfItems = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <Room bg="#F1FAF2" floor="#E0EEDF">
      <rect x="4" y="6" width="152" height="42" rx="3" fill="#E7F3E4" />
      <path d="M4 20 H156 M4 34 H156" stroke="#CFE3CB" strokeWidth="1.2" />

      {shelfItems.map((i) => {
        const x = 11 + i * 18;
        if (i % 3 === 0) return <Milk key={i} x={x} y={19} s={1.15} />;
        if (i % 3 === 1) return <WaterBottle key={i} x={x} y={20} s={1.25} />;
        return <PastaBox key={i} x={x} y={19} s={1.1} color={i % 2 ? "#F2B33D" : "#E8674F"} />;
      })}
      {shelfItems.map((i) => {
        const x = 11 + i * 18;
        if (i % 3 === 0) return <WaterBottle key={`b-${i}`} x={x} y={34} s={1.2} />;
        if (i % 3 === 1) return <PastaBox key={`b-${i}`} x={x} y={33} s={1.15} color="#F2B33D" />;
        return <Milk key={`b-${i}`} x={x} y={33} s={1.1} />;
      })}
      {shelfItems.map((i) => {
        const x = 11 + i * 18;
        return <PastaBox key={`c-${i}`} x={x} y={48} s={1.05} color={i % 2 ? "#5BAE92" : "#EFC24F"} />;
      })}

      <Person x={22} y={79} shirt="#8FD3C5" longHair />
      <path d="M30 56 H36 L38 64 H44" stroke="#C7B7A6" strokeWidth="1.8" fill="none" strokeLinecap="round" />

      <Cart x={50} y={60} s={1.25} />

      <Person x={136} y={79} shirt="#7FB8A8" apron="#F6E7D2" />
      <Counter x={112} y={62} w={46} />
      <rect x="117" y="56" width="14" height="6" rx="1.6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="0.8" />
      <rect x="133" y="55" width="9" height="7" rx="1.4" fill="#F2B33D" />

      <Person x={100} y={79} shirt="#F3B5C6" s={0.92} longHair />
    </Room>
  );
}

function CafeScene() {
  return (
    <Room bg="#FDF1E3" floor="#F0E2CE">
      <path d="M28 0 V9" stroke="#B9A58B" strokeWidth="1.2" />
      <path d="M22 9 H34 L31 16 H25 Z" fill="#F4D784" />
      <path d="M52 0 V6" stroke="#B9A58B" strokeWidth="1.2" />
      <path d="M47 6 H57 L55 12 H49 Z" fill="#F4D784" />

      <CoffeeSign x={142} y={20} s={1.1} />

      <Person x={16} y={79} shirt="#F3A6C6" s={0.92} />
      <Person x={30} y={79} shirt="#9FC4E8" s={0.9} longHair />
      <Table x={8} top={62} w={32} />
      <Cup x={17} y={61} />
      <Cup x={26} y={61} color="#F7D488" />

      <Person x={62} y={79} shirt="#8FD3C5" s={0.92} longHair />
      <Person x={76} y={79} shirt="#F7D488" s={0.9} />
      <Table x={54} top={62} w={32} />
      <Cup x={63} y={61} color="#F3B5C6" />
      <Cup x={72} y={61} />

      <Person x={108} y={79} shirt="#C7B0E8" s={0.92} />
      <Person x={122} y={79} shirt="#7FD3BE" s={0.9} longHair />
      <Table x={100} top={62} w={32} />
      <Cup x={109} y={61} />
      <Cup x={118} y={61} color="#F7D488" />

      <Person x={152} y={79} shirt="#8B6B4F" apron="#F6E7D2" longHair />
      <Counter x={138} y={62} w={22} />
      <rect x="140" y="50" width="16" height="11" rx="2" fill="#B9C0C8" />
      <rect x="142" y="52" width="5" height="3.4" rx="1" fill="#5C6672" />
      <rect x="149" y="52" width="5" height="3.4" rx="1" fill="#5C6672" />

      <Plant x={92} y={79} s={0.75} />
    </Room>
  );
}

function Cupcake({ x, y, s = 1, frosting = "#F3AFC8" }: { x: number; y: number; s?: number; frosting?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-4.2 0 L4.2 0 L3.2 -6 L-3.2 -6 Z" fill="#E9C6A0" stroke="#D8AE84" strokeWidth="0.6" />
      <path d="M-2.6 -6 L2.6 -6" stroke="#D8AE84" strokeWidth="0.6" />
      <circle cx="0" cy="-8" r="3.8" fill={frosting} />
      <circle cx="0" cy="-11.6" r="2.5" fill="#F7D9A0" />
      <circle cx="0" cy="-13.6" r="1.3" fill="#E4556A" />
    </g>
  );
}

function Donut({ x, y, s = 1, frosting = "#F3AFC8" }: { x: number; y: number; s?: number; frosting?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle r="4.8" fill="#E8B778" />
      <circle r="4.8" fill="none" stroke={frosting} strokeWidth="2.8" />
      <circle r="1.8" fill="#FFFDF7" />
      <g stroke="#FFFDF7" strokeWidth="0.7" strokeLinecap="round">
        <path d="M-3.4 -2.4 L-1.8 -3.2" />
        <path d="M1.2 -3.8 L2.4 -2.8" />
        <path d="M2.8 1.6 L3.6 2.8" />
        <path d="M-3.6 1.2 L-4 2.6" />
      </g>
    </g>
  );
}

function Tart({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-6 0 L6 0 L4.4 -5.6 L-4.4 -5.6 Z" fill="#E5B77C" stroke="#C99B6A" strokeWidth="0.7" />
      <ellipse cx="0" cy="-5.6" rx="4.4" ry="1.6" fill="#F6D267" />
      <circle cx="-1.6" cy="-6" r="1.3" fill="#E4556A" />
      <circle cx="1.8" cy="-6.2" r="1.1" fill="#E4556A" />
    </g>
  );
}

function Pencil({ x, y, s = 1, color = "#F2C24B", rotate = 0 }: { x: number; y: number; s?: number; color?: string; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`}>
      <rect x="-1.4" y="-14" width="2.8" height="12" rx="0.8" fill={color} />
      <path d="M-1.4 -14 L0 -18 L1.4 -14 Z" fill="#F2D9B0" />
      <path d="M-0.5 -16.6 L0 -18 L0.5 -16.6 Z" fill={INK} />
      <rect x="-1.4" y="-2.6" width="2.8" height="2.6" rx="0.6" fill="#F2A3B6" />
    </g>
  );
}

function BakeryScene() {
  return (
    <Room bg="#FDF0F6" floor="#F0DDE6">
      <g transform="translate(0 6)">
        <path d="M8 0 Q24 6 40 0 Q56 6 72 0" stroke="#D9C7AD" strokeWidth="1" fill="none" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M${16 + i * 14} 1.6 L${22 + i * 14} 2.4 L${19 + i * 14} 8 Z`} fill={["#F2A3B6", "#F7D488", "#9FD8CF", "#B7C9F2"][i]} />
        ))}
      </g>

      <rect x="4" y="44" width="94" height="34" rx="4" fill="#FFFFFF" stroke="#E9C6D6" strokeWidth="2" />
      <path d="M7 55 H95 M7 66 H95" stroke="#E9C6D6" strokeWidth="1.4" />

      <Cake x={20} y={55} s={0.95} color="#F49AC0" />
      <Donut x={34} y={54} s={0.85} />
      <Cupcake x={45} y={55} s={0.9} />
      <Tart x={57} y={55} s={0.9} />
      <Cake x={72} y={55} s={0.85} color="#A8DCC8" />
      <Donut x={86} y={54} s={0.8} frosting="#F7D488" />

      <Cake x={18} y={66} s={0.9} color="#F7D9A0" />
      <Cupcake x={32} y={66} s={0.85} frosting="#D7A7E8" />
      <Cupcake x={41} y={66} s={0.8} frosting="#A8DCC8" />
      <Tart x={52} y={66} s={0.85} />
      <Donut x={64} y={66} s={0.8} />
      <Cake x={78} y={66} s={0.8} color="#F3AFC8" />

      <rect x="4" y="40" width="94" height="5" rx="2.5" fill="#E9C6D6" />

      <Cake x={110} y={58} s={1.5} color="#F3A6C6" />
      <rect x="100" y="58" width="20" height="4" rx="2" fill="#E9D3B8" />

      <Person x={136} y={79} shirt="#F3A6C6" apron="#FFFFFF" hat="chef" />
      <rect x="126" y="58" width="22" height="5" rx="2.5" fill="#E9D3B8" />
      <Cupcake x={132} y={58} s={1} />
      <Cupcake x={141} y={58} s={1} frosting="#A8DCC8" />
    </Room>
  );
}

function StationeryScene() {
  const notebookColors = ["#F2A3B6", "#8FD3E8", "#F7D488", "#A8DCC8", "#C7B0E8", "#F2907B"];
  return (
    <Room bg="#FFF7ED" floor="#F1E3D3">
      <rect x="4" y="8" width="74" height="40" rx="3" fill="#FDE8D3" />
      <path d="M4 21 H78 M4 34 H78" stroke="#EBCFB2" strokeWidth="1.2" />
      {notebookColors.map((c, i) => (
        <g key={c}>
          <rect x={8 + i * 11.6} y="10" width="9.6" height="10" rx="1.2" fill={c} />
          <rect x={10 + i * 11.6} y="12" width="5.6" height="1.6" rx="0.8" fill="#FFFFFF" opacity="0.85" />
          <rect x={8 + i * 11.6} y="23" width="9.6" height="10" rx="1.2" fill={notebookColors[(i + 3) % 6]} />
          <rect x={10 + i * 11.6} y="25" width="5.6" height="1.6" rx="0.8" fill="#FFFFFF" opacity="0.85" />
        </g>
      ))}

      <rect x="86" y="30" width="16" height="18" rx="2.4" fill="#DCEBF7" stroke="#B9D4E7" strokeWidth="1" />
      <Pencil x={90} y={44} rotate={-8} color="#F2B33D" />
      <Pencil x={94} y={44} rotate={4} color="#E4556A" />
      <Pencil x={98} y={44} rotate={12} color="#5BAE92" />

      <rect x="108" y="34" width="22" height="14" rx="2" fill="#F7D488" stroke="#D9B55A" strokeWidth="1" />
      <g>
        <Pencil x={112} y={44} rotate={-14} s={0.8} color="#E4556A" />
        <Pencil x={117} y={44} rotate={-4} s={0.8} color="#5BAE92" />
        <Pencil x={122} y={44} rotate={8} s={0.8} color="#7C9BE0" />
      </g>

      <g transform="translate(142 44)">
        <circle cx="-3" cy="0" r="3.4" fill="none" stroke="#7C8FA3" strokeWidth="1.4" />
        <circle cx="4" cy="0" r="3.4" fill="none" stroke="#7C8FA3" strokeWidth="1.4" />
        <path d="M0 2 L-1 12 M2 2 L3 12" stroke="#7C8FA3" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      <Person x={124} y={79} coat="#FFFFFF" shirt="#F2A3B6" longHair />
      <Counter x={102} y={62} w={56} />
      <rect x="108" y="56" width="14" height="6" rx="1.4" fill="#FFFFFF" stroke="#D6C6B4" strokeWidth="0.8" />
      <rect x="126" y="55" width="11" height="7" rx="1.4" fill="#8FD3E8" />
      <rect x="140" y="56" width="12" height="6" rx="1.4" fill="#F7D488" />

      <Person x={84} y={79} shirt="#8FD3C5" s={0.92} />
    </Room>
  );
}

function IceCreamScene() {
  return (
    <Room bg="#EAF7FD" floor="#D9EAF2">
      <g transform="translate(134 18) scale(1.35)">
        <path d="M-6 14 L6 14 L0 2 Z" fill="#E8B778" stroke="#C99455" strokeWidth="0.6" />
        <circle cx="-2.6" cy="-1" r="3.6" fill="#F3AFC8" />
        <circle cx="2.6" cy="-1.4" r="3.6" fill="#A8DCC8" />
        <circle cx="0" cy="-5.8" r="3.6" fill="#F7D488" />
        <circle cx="0" cy="-8.4" r="1.3" fill="#E4556A" />
      </g>

      <rect x="4" y="48" width="86" height="31" rx="4" fill="#FFFFFF" stroke="#BFDDEA" strokeWidth="2" />
      <rect x="7" y="51" width="80" height="14" rx="3" fill="#D7F0FF" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <IceTub
          key={i}
          x={13 + (i % 4) * 20}
          y={i < 4 ? 65 : 76}
          color={["#F6A7C1", "#F7D06B", "#A8DEC8", "#C7B0E8", "#F2A177", "#8FD3E8", "#F3A6C6", "#B7E4A8"][i]}
        />
      ))}
      <path d="M7 72 H87" stroke="#DCEBF2" strokeWidth="1.2" />

      <Person x={120} y={79} shirt="#8FC9E8" apron="#FFFFFF" longHair />
      <path d="M127 57 L131 49" stroke="#E8B778" strokeWidth="2" strokeLinecap="round" />
      <circle cx="131" cy="46" r="3.2" fill="#F3AFC8" />

      <Person x={100} y={79} shirt="#F7D488" s={0.9} />
      <IceCreamCone x={104} y={60} s={0.9} />

      <Person x={146} y={79} shirt="#F3B5C6" s={0.88} longHair />
      <IceCreamCone x={150} y={61} s={0.85} flavors={["#A8DEC8", "#F6A7C1"]} />
    </Room>
  );
}

function HairdresserScene() {
  return (
    <Room bg="#F8F2FD" floor="#EAE1F3">
      <g transform="translate(146 18)">
        <circle cx="-3.4" cy="0" r="4" fill="none" stroke="#7C6A92" strokeWidth="1.6" />
        <circle cx="4" cy="0" r="4" fill="none" stroke="#7C6A92" strokeWidth="1.6" />
        <path d="M-0.4 2.4 L-2 13 M1.4 2.4 L3.2 13" stroke="#7C6A92" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="-3.4" cy="0" r="1.4" fill="#B7A4D8" />
        <circle cx="4" cy="0" r="1.4" fill="#B7A4D8" />
      </g>

      <ellipse cx="40" cy="40" rx="20" ry="24" fill="#D7F0F7" stroke="#FFFFFF" strokeWidth="3" />
      <path d="M30 30 Q38 24 48 27" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.85" />
      <rect x="36" y="63" width="7" height="7" rx="2" fill="#B8A8C8" />

      <rect x="28" y="56" width="24" height="30" rx="5" fill="#C7B0E8" />
      <Person x={40} y={70} shirt="#F3A6C6" s={0.78} longHair />
      <rect x="22" y="70" width="36" height="9" rx="4" fill="#B7A4D8" />
      <rect x="24" y="79" width="4" height="6" rx="2" fill="#8F7BB0" />
      <rect x="52" y="79" width="4" height="6" rx="2" fill="#8F7BB0" />

      <Person x={80} y={79} shirt="#C7B0E8" apron="#F6E7D2" longHair />
      <g transform="translate(92 56)">
        <rect x="-2" y="-2" width="9" height="6" rx="2.4" fill="#B7A4D8" />
        <path d="M7 0 L11 1.6 L7 3.4" fill="#8F7BB0" />
        <path d="M-2 1 H-6" stroke="#8F7BB0" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M-6 1 L-9 4" stroke="#8F7BB0" strokeWidth="1.2" strokeLinecap="round" />
      </g>

      <rect x="98" y="12" width="58" height="4" rx="2" fill={WOOD} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={103 + i * 10} y={4} width="5.4" height="8" rx="1.4" fill={["#F3AFC8", "#A8DCC8", "#F7D488", "#C7B0E8", "#9FD8E8"][i]} />
      ))}

      {/* saç yıkama lavabosu ve yıkanan müşteri */}
      <g transform="translate(116 62)">
        <rect x="-13" y="9" width="26" height="10" rx="3" fill="#B7A4D8" />
        <rect x="-16" y="19" width="3.4" height="7" rx="1.7" fill="#8F7BB0" />
        <rect x="12.6" y="19" width="3.4" height="7" rx="1.7" fill="#8F7BB0" />
        <circle cx="0" cy="-7" r="5.8" fill={SKIN} />
        <path d="M-5.8 -8.4 Q-5 -13.4 0 -13.4 Q5 -13.4 5.8 -8.4 Q2.6 -10.6 0 -10.6 Q-2.6 -10.6 -5.8 -8.4 Z" fill={HAIR} />
        <circle cx="-2" cy="-6.6" r="0.8" fill={INK} />
        <circle cx="2" cy="-6.6" r="0.8" fill={INK} />
        <path d="M-1.4 -3.8 Q0 -2.8 1.4 -3.8" stroke="#B35D49" strokeWidth="0.8" fill="none" strokeLinecap="round" />
        <path d="M-12 0 Q0 -8 12 0" stroke="#D7F0FF" strokeWidth="1.4" fill="none" />
        <rect x="-14" y="-1" width="28" height="6" rx="3" fill="#FFFFFF" stroke="#C9D8E2" strokeWidth="1" />
        <rect x="-12" y="1" width="24" height="3" rx="1.5" fill="#BFE4F8" />
        <rect x="-1.6" y="4" width="3.2" height="6" fill="#C9D8E2" />
      </g>
    </Room>
  );
}

function Dumbbell({ x, y, s = 1, rotate = 0 }: { x: number; y: number; s?: number; rotate?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`}>
      <rect x="-4.6" y="-1.5" width="9.2" height="3" rx="1.4" fill={METAL_DARK} />
      <rect x="-8.6" y="-3.6" width="4.4" height="7.2" rx="1.4" fill="#4F5F6C" />
      <rect x="4.2" y="-3.6" width="4.4" height="7.2" rx="1.4" fill="#4F5F6C" />
    </g>
  );
}

function Bloom({ x, y, s = 1, color = "#F28B9B" }: { x: number; y: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const a = (i * 72 * Math.PI) / 180;
        return <circle key={i} cx={Math.cos(a) * 2.9} cy={Math.sin(a) * 2.9} r="2.7" fill={color} />;
      })}
      <circle r="1.9" fill="#F7D488" />
    </g>
  );
}

function Seat({ x, y = 79, s = 1, color = "#D95F6B" }: { x: number; y?: number; s?: number; color?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-8" y="-14" width="16" height="15" rx="4" fill={color} />
      <rect x="-9" y="-15.6" width="18" height="6" rx="3" fill="#E97985" />
      <rect x="-8.4" y="-1" width="16.8" height="4.4" rx="2.2" fill={color} />
      <rect x="-7" y="3.4" width="3" height="5" fill="#B34C57" />
      <rect x="4" y="3.4" width="3" height="5" fill="#B34C57" />
    </g>
  );
}

function Tooth({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path
        d="M0 -11 Q-12 -11 -12 0 Q-12 7 -9 9 Q-7 13 -5.6 6 Q-4.6 1.6 0 1.6 Q4.6 1.6 5.6 6 Q7 13 9 9 Q12 7 12 0 Q12 -11 0 -11 Z"
        fill="#FFFFFF"
        stroke="#CFE5DE"
        strokeWidth="1.5"
      />
      <path d="M-6 -5 Q-2 -7.6 2 -5" stroke="#EAF4F0" strokeWidth="1.4" fill="none" />
      <path d="M-7.6 -1.6 Q-5 -3 2.4 -3" stroke="#EAF4F0" strokeWidth="1" fill="none" />
    </g>
  );
}

function Popcorn({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-6.4 12 L6.4 12 L7.4 0 H-7.4 Z" fill="#FFFFFF" stroke="#E4D8CB" strokeWidth="0.9" />
      <path d="M-4.6 12 L-5.4 0 M4.6 12 L5.4 0" stroke="#E05A52" strokeWidth="1.6" />
      <g fill="#F7D488">
        <circle cx="-4" cy="-1.6" r="2.6" />
        <circle cx="0.6" cy="-3" r="2.9" />
        <circle cx="4.4" cy="-1.2" r="2.4" />
        <circle cx="-1.4" cy="-1.2" r="2.2" />
      </g>
    </g>
  );
}

function GymScene() {
  return (
    <Room bg="#F1F5F9" floor="#E2E8F0">
      <circle cx="142" cy="16" r="7" fill="#FFFFFF" stroke="#B9C7D6" strokeWidth="1.5" />
      <path d="M142 11 V16 L145 18" stroke="#8CA0B6" strokeWidth="1.2" strokeLinecap="round" />

      <g>
        <rect x="6" y="64" width="58" height="9" rx="3.4" fill="#6E7F92" />
        <rect x="9" y="67" width="52" height="3" rx="1.5" fill="#B7C3D1" />
        <path d="M10 64 L17 40 H35" stroke="#6E7F92" strokeWidth="3" fill="none" strokeLinecap="round" />
        <rect x="28" y="34" width="20" height="8" rx="2" fill="#6E7F92" />
        <rect x="30" y="36" width="8" height="3.4" rx="1" fill="#BFE6F7" />
        <circle cx="14" cy="75" r="3" fill="#4E5D6E" />
        <circle cx="56" cy="75" r="3" fill="#4E5D6E" />
      </g>
      <Person x={32} y={66} s={0.82} shirt="#8FD3C5" pants="#E98A8A" longHair />

      <g transform="translate(76 52)">
        <rect width="40" height="27" rx="3" fill="#C9D4E0" stroke="#A9BACA" strokeWidth="1" />
        <path d="M2 11 H38 M2 21 H38" stroke="#9DAEBD" strokeWidth="1.6" />
        <Dumbbell x={10} y={7.4} s={1.1} />
        <Dumbbell x={28} y={7.4} s={1.1} />
        <Dumbbell x={10} y={17.6} s={1.2} />
        <Dumbbell x={28} y={17.6} s={1.2} />
        <Dumbbell x={19} y={24.4} s={1.3} />
      </g>
      <rect x="72" y="79" width="48" height="3.4" rx="1.7" fill="#9DAEBD" />

      <circle cx="72" cy="66" r="12.5" fill="#F6A7C1" />
      <circle cx="72" cy="66" r="12.5" fill="none" stroke="#E88AAE" strokeWidth="1.4" />
      <path d="M62 60 Q72 66 82 60" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.7" />
      <path d="M62 72 Q72 66 82 72" stroke="#FFFFFF" strokeWidth="2" fill="none" opacity="0.5" />

      <ellipse cx="112" cy="76" rx="20" ry="3.4" fill="#B7C9E8" />
      <path d="M96 74 Q104 60 120 62 Q132 64 130 74" stroke="#8FA6D8" strokeWidth="2.6" fill="none" />

      <g transform="translate(150 70)">
        <path d="M0 8 Q-9 4 -9 -3 Q-9 -8 0 -3 Q9 -8 9 -3 Q9 4 0 8 Z" fill="#7FD3BE" />
        <path d="M-5 8 L5 8" stroke="#4FA48F" strokeWidth="2" />
      </g>
      <path d="M136 79 Q144 70 152 79" stroke="#E98A8A" strokeWidth="2" fill="none" opacity="0.7" />
    </Room>
  );
}

function FloristScene() {
  return (
    <Room bg="#FDF2F8" floor="#F0DDE7">
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${16 + i * 25} 78)`}>
          <path d="M-8 0 L8 0 L6 -14 L-6 -14 Z" fill={["#8FC9E8", "#C7B0E8", "#9FD8CF"][i]} />
          <path d="M-6 -14 H6" stroke="#FFFFFF" strokeWidth="1.4" opacity="0.7" />
          <path d="M0 -14 V-26 M-4 -14 Q-9 -24 -12 -27 M4 -14 Q9 -24 12 -27" stroke="#6DBB83" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <Bloom x={-12} y={-29} s={1.25} color="#F28B9B" />
          <Bloom x={0} y={-32} s={1.4} color="#F3AFC8" />
          <Bloom x={12} y={-29} s={1.25} color="#F7D488" />
          <Bloom x={-5} y={-22} s={0.9} color="#D7A7E8" />
          <Bloom x={6} y={-23} s={0.9} color="#F28B9B" />
        </g>
      ))}

      <g transform="translate(96 78)">
        <path d="M-9 0 L9 0 L7 -16 L-7 -16 Z" fill="#E9C6D6" />
        <path d="M0 -16 V-30 M-5 -16 Q-10 -27 -13 -31 M5 -16 Q10 -27 13 -31" stroke="#6DBB83" strokeWidth="1.9" fill="none" strokeLinecap="round" />
        <Bloom x={-13} y={-33} s={1.3} color="#F7D488" />
        <Bloom x={0} y={-36} s={1.5} color="#F28B9B" />
        <Bloom x={13} y={-33} s={1.3} color="#F3AFC8" />
      </g>

      <Person x={130} y={79} shirt="#F3B5C6" apron="#F6E7D2" longHair />
      <g transform="translate(139 58)">
        <path d="M-2 12 L12 12 L10 -2 L0 -2 Z" fill="#FFFFFF" stroke="#E9C6D6" strokeWidth="0.9" />
        <path d="M0 -2 L-4 -10 M10 -2 L14 -9" stroke="#6DBB83" strokeWidth="1.6" strokeLinecap="round" />
        <Bloom x={-4} y={-11} s={1.1} color="#F28B9B" />
        <Bloom x={14} y={-10} s={1.1} color="#F7D488" />
      </g>

      <path d="M148 0 V9" stroke="#B9A58B" strokeWidth="1.2" />
      <path d="M141 9 H155 L153 17 H143 Z" fill="#D9986B" />
      <ellipse cx="148" cy="10" rx="6" ry="3" fill="#7CC48F" />

      <rect x="4" y="14" width="34" height="4" rx="2" fill={WOOD} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${10 + i * 8} 14)`}>
          <path d="M-3 0 L3 0 L2 -5 L-2 -5 Z" fill="#D9986B" />
          <circle cx="0" cy="-7" r="3" fill="#7CC48F" />
        </g>
      ))}
    </Room>
  );
}

function CinemaScene() {
  return (
    <Room bg="#F3EEFF" floor="#E2D8F2">
      <path d="M0 0 H14 V78 H0 Z" fill="#D9C7F0" />
      <path d="M160 0 H146 V78 H160 Z" fill="#D9C7F0" />

      <rect x="16" y="8" width="118" height="42" rx="4" fill="#FFFDF7" stroke="#C7B0E8" strokeWidth="3" />
      <rect x="16" y="8" width="118" height="8" fill="#C7B0E8" opacity="0.55" />
      <path d="M55 20 L59 29 L69 29 L61 35 L64 45 L55 39 L46 45 L49 35 L41 29 L51 29 Z" fill="#F6D267" />
      <g fill="#6B5A8A" opacity="0.55">
        <rect x="24" y="20" width="9" height="6" rx="1" />
        <rect x="24" y="30" width="9" height="6" rx="1" />
        <rect x="24" y="40" width="9" height="6" rx="1" />
        <rect x="118" y="20" width="9" height="6" rx="1" />
        <rect x="118" y="30" width="9" height="6" rx="1" />
        <rect x="118" y="40" width="9" height="6" rx="1" />
      </g>

      <g>
        <Seat x={22} color="#C94F5C" />
        <Seat x={41} color="#D95F6B" />
        <Seat x={60} color="#C94F5C" />
        <Seat x={79} color="#D95F6B" />
        <Seat x={98} color="#C94F5C" />
        <Seat x={117} color="#D95F6B" />
      </g>
      <g fill={HAIR}>
        <circle cx="22" cy="60" r="4.4" />
        <circle cx="60" cy="60" r="4.4" />
        <circle cx="98" cy="60" r="4.4" />
      </g>
      <g fill="#5B4230">
        <circle cx="41" cy="60" r="4.4" />
        <circle cx="79" cy="60" r="4.4" />
        <circle cx="117" cy="60" r="4.4" />
      </g>

      <g>
        <Seat x={31} y={95} s={1.15} color="#B94751" />
        <Seat x={56} y={95} s={1.15} color="#C94F5C" />
        <Seat x={81} y={95} s={1.15} color="#B94751" />
        <Seat x={106} y={95} s={1.15} color="#C94F5C" />
        <Seat x={131} y={95} s={1.15} color="#B94751" />
      </g>

      <Popcorn x={146} y={62} s={1.1} />
    </Room>
  );
}

function DentistScene() {
  return (
    <Room bg="#EAF8F4" floor="#DCEDE6">
      <circle cx="78" cy="24" r="20" fill="#FFFFFF" />
      <Tooth x={78} y={24} s={1.35} />
      <path d="M96 8 L98 12 L102 12 L99 15 L100 19 L96 16 L92 19 L93 15 L90 12 L94 12 Z" fill="#F6D267" />

      <g>
        <rect x="8" y="68" width="62" height="9" rx="4" fill="#B7C9D8" />
        <path d="M12 68 Q12 50 34 50 Q50 50 50 60 L50 68 Z" fill="#9FD8CF" />
        <rect x="20" y="52" width="18" height="7" rx="3.5" fill="#FFFFFF" opacity="0.6" />
        <rect x="8" y="47" width="10" height="21" rx="4" fill="#8FA6B6" />
        <rect x="14" y="76" width="4" height="8" fill="#8FA6B6" />
        <rect x="60" y="76" width="4" height="8" fill="#8FA6B6" />
        <circle cx="40" cy="42" r="5.4" fill={SKIN} />
        <path d="M35 42 Q40 36 45 42" fill={HAIR_LIGHT} />
      </g>

      <path d="M74 20 Q86 20 86 32" stroke="#B9C7D6" strokeWidth="2.4" fill="none" />
      <ellipse cx="86" cy="34" rx="8" ry="4.4" fill="#D7F0FF" stroke="#B9C7D6" strokeWidth="1.4" />

      <Person x={132} y={79} coat="#FFFFFF" shirt="#9FD8CF" longHair />
      <path d="M139 55 L147 47" stroke="#B9C7D6" strokeWidth="2" strokeLinecap="round" />
      <circle cx="148" cy="45" r="2.6" fill="#D7F0FF" stroke="#B9C7D6" strokeWidth="1" />

      <rect x="112" y="60" width="16" height="12" rx="2" fill="#FFFFFF" stroke="#CFE5DE" strokeWidth="1" />
      <path d="M115 64 H125 M115 67 H121" stroke="#CFE5DE" strokeWidth="1.2" />

      <g transform="translate(104 72)">
        <rect x="0" y="0" width="26" height="7" rx="2" fill="#FFFFFF" stroke="#CFE5DE" strokeWidth="0.9" />
        <rect x="3" y="-3.4" width="4" height="3.4" rx="1" fill="#9FD8CF" />
        <rect x="10" y="-4" width="3" height="4" rx="1" fill="#F3AFC8" />
      </g>
    </Room>
  );
}

function Bus({
  x,
  y,
  s = 1,
  color = "#57BFA6",
}: {
  x: number;
  y: number;
  s?: number;
  color?: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-30" y="-24" width="60" height="24" rx="5" fill={color} />
      <rect x="-30" y="-9" width="60" height="4" fill="#FFFFFF" opacity="0.85" />
      <rect x="-26" y="-20" width="13" height="9" rx="1.6" fill="#D7F0FF" />
      <rect x="-10" y="-20" width="13" height="9" rx="1.6" fill="#D7F0FF" />
      <rect x="6" y="-20" width="13" height="9" rx="1.6" fill="#D7F0FF" />
      <rect x="22" y="-21" width="7" height="12" rx="2" fill="#D7F0FF" />
      <rect x="-24" y="-32" width="44" height="6" rx="2.4" fill="#3E8F7E" />
      <circle cx="-17" cy="1" r="4.4" fill="#3E3A34" />
      <circle cx="-17" cy="1" r="1.8" fill="#A7B0B8" />
      <circle cx="17" cy="1" r="4.4" fill="#3E3A34" />
      <circle cx="17" cy="1" r="1.8" fill="#A7B0B8" />
    </g>
  );
}

function BusStationScene() {
  return (
    <Room bg="#EDF6F4" floor="#DDE9E5">
      <rect x="92" y="6" width="64" height="20" rx="3" fill="#3E8F7E" />
      <text x="124" y="19.6" fontSize="8" fontWeight="700" fill="#EFFCF7" textAnchor="middle" fontFamily="sans-serif">
        OTOGAR
      </text>
      <path d="M96 26 V34 M152 26 V34" stroke="#3E8F7E" strokeWidth="2" />

      <Bus x={30} y={52} s={0.72} color="#7FA8D8" />
      <Bus x={130} y={52} s={0.66} color="#F2B33D" />

      <rect x="0" y="62" width="160" height="3" fill="#CBD8D5" />
      <path d="M6 66 H154" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="8 8" />

      <Bus x={52} y={89} s={1.05} color="#57BFA6" />

      <Person x={118} y={79} shirt="#F2C94C" s={0.9} />
      <rect x="126" y="66" width="13" height="10" rx="2" fill="#C97B5E" />
      <path d="M132.5 66 V76" stroke="#B2674E" strokeWidth="1.2" />
      <path d="M132.5 66 Q132.5 62.6 135 62.6" stroke="#B2674E" strokeWidth="1.2" fill="none" />

      <Person x={142} y={79} shirt="#F3B5C6" s={0.86} longHair />
      <rect x="148" y="68" width="11" height="9" rx="2" fill="#8FC9E8" />

      <rect x="96" y="34" width="26" height="16" rx="2" fill="#3E4A5A" />
      <path d="M100 39 H118 M100 43 H118 M100 47 H112" stroke="#F6D267" strokeWidth="1.4" strokeLinecap="round" />
    </Room>
  );
}

function AirportScene() {
  return (
    <Room bg="#DDF0FC" floor="#CDE3EE">
      <circle cx="22" cy="14" r="7" fill="#F8D77C" />
      <g fill="#FFFFFF" opacity="0.95">
        <ellipse cx="60" cy="12" rx="12" ry="5.4" />
        <ellipse cx="68" cy="9" rx="7" ry="4.4" />
        <ellipse cx="120" cy="18" rx="9" ry="4" opacity="0.8" />
      </g>

      <path d="M0 66 H160 V95 H0 Z" fill="#7C8B98" />
      <path d="M0 74 H160" stroke="#FFFFFF" strokeWidth="1.6" strokeDasharray="12 10" opacity="0.85" />

      <g transform="translate(66 48) rotate(-6)">
        <path d="M-34 6 Q-34 -6 0 -7 Q34 -6 34 3 Q34 9 0 10 Q-34 9 -34 6 Z" fill="#FFFFFF" stroke="#D3DEE7" strokeWidth="1" />
        <path d="M-2 8 L-20 22 H-8 L8 9 Z" fill="#EAF2F8" stroke="#D3DEE7" strokeWidth="0.8" />
        <path d="M-2 -5 L-20 -18 H-8 L8 -5 Z" fill="#FFFFFF" stroke="#D3DEE7" strokeWidth="0.8" />
        <path d="M26 -4 L34 -16 H40 L34 -4 Z" fill="#3F7FC0" />
        <path d="M30 -8 L34 -14" stroke="#FFFFFF" strokeWidth="1.6" />
        <circle cx="20" cy="0" r="1.4" fill="#9FC4D8" />
        <path d="M-30 1 H2" stroke="#E4556A" strokeWidth="1.2" opacity="0.6" />
        <g fill="#9FC4D8">
          <circle cx="-22" cy="-2" r="1.1" />
          <circle cx="-16" cy="-2" r="1.1" />
          <circle cx="-10" cy="-2" r="1.1" />
          <circle cx="-4" cy="-2" r="1.1" />
        </g>
      </g>

      <g transform="translate(140 44)">
        <rect x="-8" y="0" width="16" height="32" rx="2" fill="#EAF2F8" stroke="#C9D8E2" strokeWidth="1.2" />
        <rect x="-11" y="-12" width="22" height="14" rx="3" fill="#BFE4F8" stroke="#9FC4D8" strokeWidth="1.2" />
        <path d="M-11 -12 H11" stroke="#9FC4D8" strokeWidth="1.4" />
        <rect x="-3" y="-20" width="6" height="8" fill="#9FC4D8" />
        <circle cx="0" cy="-22" r="2" fill="#E4556A" />
        <path d="M-6 8 H6 M-6 16 H6 M-6 24 H6" stroke="#C9D8E2" strokeWidth="1.2" />
      </g>

      <g>
        <rect x="110" y="66" width="22" height="14" rx="2" fill="#C9D9EA" />
        <rect x="108" y="63" width="26" height="4" rx="2" fill="#8FAAC9" />
        <rect x="113" y="56" width="18" height="5" rx="2" fill="#40639B" />
      </g>

      <Person x={28} y={79} shirt="#6DA8D8" apron="#F6E7D2" />
      <rect x="4" y="56" width="34" height="5" rx="2" fill="#8FAAC9" />
      <rect x="8" y="49" width="24" height="6" rx="2" fill="#40639B" />
      <text x="20" y="53.8" fontSize="4.4" fontWeight="700" fill="#FFFFFF" textAnchor="middle" fontFamily="sans-serif">
        CHECK-IN
      </text>

      <Person x={96} y={79} shirt="#F3B5C6" longHair />
      <rect x="104" y="64" width="13" height="11" rx="2" fill="#8FC9E8" />
      <path d="M110.5 64 V75" stroke="#6DA8D8" strokeWidth="1.2" />
      <path d="M110.5 64 Q110.5 60 113 60" stroke="#6DA8D8" strokeWidth="1.2" fill="none" />
    </Room>
  );
}

function MechanicScene() {
  return (
    <Room bg="#F4F1EA" floor="#E5DED2">
      <rect x="4" y="6" width="78" height="30" rx="2.4" fill="#DDD2C1" stroke="#C4B7A2" strokeWidth="1.2" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx={12 + i * 12} cy="11" r="1.2" fill="#B7A992" />
      ))}
      <g stroke="#6E7F92" strokeWidth="2" strokeLinecap="round" fill="none">
        <path d="M14 30 L22 20" />
        <path d="M31 30 L31 18" />
        <path d="M46 30 L46 18" />
        <path d="M60 30 L66 19" />
        <path d="M72 30 L72 20" />
      </g>
      <circle cx="23" cy="19" r="3.2" fill="none" stroke="#6E7F92" strokeWidth="2" />
      <rect x="28" y="14" width="6" height="4" rx="1.4" fill="#E05A52" />
      <rect x="43" y="13" width="6" height="5" rx="1.4" fill="#F2C24B" />
      <path d="M58 19 L68 14 L71 19 L62 24 Z" fill="#9AA9B8" />
      <rect x="68" y="14" width="8" height="3" rx="1.4" fill="#8B6B4F" />

      <g>
        <path d="M10 70 Q10 56 24 54 L42 54 L50 42 H86 L96 54 H114 Q126 56 126 70 L126 76 H10 Z" fill="#8FB8D8" />
        <path d="M54 46 H82 L88 54 H48 Z" fill="#D7F0FF" />
        <path d="M70 46 V54" stroke="#8FB8D8" strokeWidth="2" />
        <rect x="10" y="70" width="116" height="6" fill="#6B93B5" />
        <circle cx="34" cy="78" r="8" fill="#3E3A34" />
        <circle cx="34" cy="78" r="3.4" fill="#A7B0B8" />
        <circle cx="100" cy="78" r="8" fill="#3E3A34" />
        <circle cx="100" cy="78" r="3.4" fill="#A7B0B8" />
        <path d="M96 54 L108 30 H120 L116 54" fill="#7FA8C8" opacity="0.92" />
        <path d="M100 45 H114" stroke="#D7F0FF" strokeWidth="1.6" />
      </g>

      <g transform="translate(138 79)">
        <ellipse cx="0" cy="0" rx="8" ry="4.4" fill="#4E4A42" />
        <ellipse cx="0" cy="-5" rx="8" ry="4.4" fill="#3E3A34" />
        <ellipse cx="0" cy="-10" rx="8" ry="4.4" fill="#4E4A42" />
        <circle cx="0" cy="-5" r="2.4" fill="#A7B0B8" />
      </g>

      <Person x={146} y={74} shirt="#6B7C8F" hat="cap" s={0.92} />
      <path d="M138 56 L130 46" stroke="#8C9AA8" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="129" cy="45" r="3" fill="none" stroke="#8C9AA8" strokeWidth="2" />

      <rect x="6" y="70" width="20" height="10" rx="2" fill="#C97B5E" />
      <path d="M11 70 Q11 66 16 66 H19 Q23 66 23 70" stroke="#B2674E" strokeWidth="1.4" fill="none" />
      <path d="M30 76 L36 68 L42 76" stroke="#9AA9B8" strokeWidth="2" fill="none" />
      <circle cx="36" cy="67" r="2.4" fill="#9AA9B8" />
    </Room>
  );
}

function FireScene() {
  return (
    <Room bg="#FDEEEA" floor="#EED9D2">
      <path d="M0 22 H160 M0 30 H160" stroke="#F3D6CE" strokeWidth="2" />

      <g>
        <rect x="4" y="42" width="98" height="32" rx="5" fill="#E05A52" />
        <rect x="98" y="32" width="44" height="42" rx="5" fill="#E05A52" />
        <rect x="102" y="36" width="36" height="16" rx="3" fill="#D7F0FF" />
        <path d="M102 45 H138" stroke="#E05A52" strokeWidth="1.6" />
        <rect x="4" y="58" width="98" height="5" fill="#FFFFFF" opacity="0.86" />
        <path d="M14 42 H88" stroke="#FFFFFF" strokeWidth="3" opacity="0.4" />
        <rect x="120" y="26" width="13" height="5" rx="2" fill="#F2C94C" />
        <rect x="122" y="21" width="9" height="5" rx="2" fill="#8FD8F2" />
        <circle cx="26" cy="76" r="7" fill="#3E3A34" />
        <circle cx="26" cy="76" r="3" fill="#A7B0B8" />
        <circle cx="84" cy="76" r="7" fill="#3E3A34" />
        <circle cx="84" cy="76" r="3" fill="#A7B0B8" />
        <circle cx="124" cy="76" r="7" fill="#3E3A34" />
        <circle cx="124" cy="76" r="3" fill="#A7B0B8" />
      </g>

      <g stroke="#D8DDE4" strokeWidth="2.4" strokeLinecap="round" fill="none">
        <path d="M74 40 L92 16" />
        <path d="M74 40 L96 34" />
        <path d="M74 40 L88 44" />
        <path d="M92 16 H106" />
        <path d="M88 12 H104" />
      </g>

      <Person x={144} y={79} shirt="#D9534F" hat="fire" s={0.9} />
      <g transform="translate(136 62) rotate(-20)">
        <rect x="-1.6" y="0" width="3.2" height="10" rx="1.4" fill="#F2C94C" />
        <path d="M-1.6 0 L1.6 0 L1.6 -3 L-1.6 -3 Z" fill="#E0A93B" />
      </g>

      <g transform="translate(12 66)">
        <circle cx="8" cy="8" r="7" fill="none" stroke="#F2C94C" strokeWidth="3" />
        <circle cx="8" cy="8" r="8" fill="none" stroke="#E0A93B" strokeWidth="1.2" />
        <path d="M2 2 Q-2 -2 2 -4" stroke="#F2C94C" strokeWidth="2.6" fill="none" />
      </g>

      <g transform="translate(148 22)">
        <rect x="-5" y="0" width="10" height="16" rx="3" fill="#E05A52" />
        <rect x="-4" y="-4" width="8" height="4" rx="1.4" fill="#8E8E93" />
        <path d="M-2 18 H2" stroke="#8E8E93" strokeWidth="1.6" />
      </g>
    </Room>
  );
}

function PoliceScene() {
  return (
    <Room bg="#EEF3FB" floor="#DEE7F2">
      {/* rozet */}
      <g transform="translate(146 15)">
        <path
          d="M0 -11 L3.4 -3.4 L11 -3.4 L5 1.6 L7.2 9 L0 4.6 L-7.2 9 L-5 1.6 L-11 -3.4 L-3.4 -3.4 Z"
          fill="#F2C94C"
          stroke="#D3A93B"
          strokeWidth="1"
        />
        <circle r="3.4" fill="#40639B" />
        <circle r="1.4" fill="#EAF2FA" />
      </g>

      {/* arananlar panosu */}
      <rect x="5" y="10" width="56" height="37" rx="3" fill="#FFFFFF" stroke="#C2D2E4" strokeWidth="1.4" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={9 + i * 17.5} y="14" width="14.5" height="19" rx="1.4" fill="#DCE9F7" />
          <circle cx={16.2 + i * 17.5} cy="20.4" r="3.6" fill="#B9CBE0" />
          <path d={`M${11.4 + i * 17.5} 29.6 Q${16.2 + i * 17.5} 24.6 ${21 + i * 17.5} 29.6 Z`} fill="#B9CBE0" />
          <rect x={9 + i * 17.5} y="35.4" width="14.5" height="2" rx="1" fill="#C9D8E8" />
          <rect x={9 + i * 17.5} y="39.2" width="9.4" height="2" rx="1" fill="#DCE6F2" />
        </g>
      ))}

      {/* şikayetçi kişi */}
      <Person x={72} y={79} shirt="#9FC4E8" s={0.98} longHair />
      <g transform="translate(80 57)">
        <rect x="0" y="0" width="8" height="6" rx="1.2" fill="#C97B5E" />
        <path d="M0 0 L4 3 L8 0" stroke="#B2674E" strokeWidth="0.8" fill="none" />
      </g>

      {/* masa ve polis memuru */}
      <Person x={112} y={70} shirt="#40639B" coat="#40639B" hat="police" s={0.92} />
      <rect x="90" y="58" width="44" height="5" rx="2.4" fill={WOOD} />
      <rect x="94" y="63" width="3" height="15" fill={WOOD_DARK} />
      <rect x="127" y="63" width="3" height="15" fill={WOOD_DARK} />
      <rect x="96" y="52" width="15" height="6" rx="1.4" fill="#FFFFFF" stroke="#C9D8E2" strokeWidth="0.8" />
      <path d="M99 54.4 H108.6 M99 56.4 H105.6" stroke="#C9D8E2" strokeWidth="0.9" />
      <rect x="115" y="53" width="10" height="5" rx="1.2" fill="#F2C94C" />
      <path d="M117.4 55.4 H122.6" stroke="#C39A2E" strokeWidth="1" />

      {/* parmaklıklar */}
      <rect x="138" y="24" width="20" height="3" rx="1.2" fill="#8FA2B8" />
      <rect x="138" y="44" width="20" height="2.4" rx="1.2" fill="#A9BACB" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={140 + i * 4.6} y="24" width="2" height="55" rx="1" fill="#9DAFC2" />
      ))}
      <rect x="136" y="20" width="3.4" height="59" rx="1.6" fill="#8497AD" />
      <rect x="157" y="20" width="3" height="59" rx="1.4" fill="#8497AD" />
    </Room>
  );
}

function PoolScene() {
  return (
    <Room bg="#E7F7FF" floor="#D2ECF7">
      <circle cx="140" cy="13" r="7.5" fill="#FBE08A" />
      <g fill="#FFFFFF" opacity="0.95">
        <ellipse cx="64" cy="11" rx="13" ry="5.2" />
        <ellipse cx="73" cy="7.6" rx="8" ry="4.4" />
        <ellipse cx="106" cy="15" rx="9" ry="3.8" opacity="0.75" />
      </g>

      {/* şemsiye */}
      <path d="M22 38 V10" stroke="#B9C7D4" strokeWidth="2" />
      <path d="M8 12 Q22 0 36 12 Z" fill="#F2A3B6" />
      <path d="M22 12 Q26 4 31 9 M22 12 Q18 4 13 9" stroke="#FFFFFF" strokeWidth="1.4" fill="none" opacity="0.7" />

      {/* cankurtaran kulesi */}
      <g>
        <path d="M112 78 L120 40 M146 78 L138 40" stroke="#D9A25C" strokeWidth="2.6" strokeLinecap="round" />
        <rect x="114" y="40" width="30" height="4" rx="2" fill="#C98F4B" />
        <rect x="118" y="30" width="22" height="10" rx="3" fill="#F2C24B" />
        <rect x="118" y="30" width="22" height="3.4" rx="1.7" fill="#E0A93B" />
        <path d="M120 40 V50 M138 40 V50" stroke="#D9A25C" strokeWidth="2" />
      </g>

      {/* havuz */}
      <rect x="8" y="40" width="144" height="38" rx="7" fill="#5FBFE4" />
      <rect x="12" y="44" width="136" height="30" rx="5" fill="#87D6F2" />
      <path
        d="M18 50 Q26 46 34 50 Q42 54 50 50 M62 50 Q70 46 78 50 Q86 54 94 50 M106 50 Q114 46 122 50 Q130 54 138 50"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        fill="none"
        opacity="0.65"
      />
      <path d="M12 60 H148" stroke="#FFFFFF" strokeWidth="1.8" strokeDasharray="5 6" opacity="0.9" />
      <path d="M12 71 H148" stroke="#FFFFFF" strokeWidth="1.4" strokeDasharray="5 6" opacity="0.55" />

      {/* yüzücü */}
      <g transform="translate(46 58)">
        <circle cx="0" cy="-5" r="4.4" fill={SKIN} />
        <path d="M-4.6 -6.6 Q0 -11.6 4.6 -6.6 Q2 -8.6 0 -8.6 Q-2 -8.6 -4.6 -6.6 Z" fill="#E05A52" />
        <path d="M-4 -2 L4 -2" stroke="#F2A3B6" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M4 -3 L11 -6" stroke={SKIN_DARK} strokeWidth="2.4" strokeLinecap="round" />
        <path d="M-11 2 Q-4 -2 3 2" stroke={SKIN_DARK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      </g>

      {/* can simidi */}
      <g transform="translate(104 58) rotate(-10)">
        <circle r="7.4" fill="none" stroke="#F27D8F" strokeWidth="3.4" />
        <circle r="7.4" fill="none" stroke="#FFFFFF" strokeWidth="3.4" strokeDasharray="4.6 4.6" />
      </g>
      <circle cx="130" cy="50" r="4.6" fill="#F7D06B" />
      <path d="M126 50 Q130 44 134 50" stroke="#FFFFFF" strokeWidth="1.1" fill="none" />

      {/* havuz merdiveni */}
      <path d="M134 42 V70 M142 42 V70" stroke="#DCE7EE" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M134 48 H142 M134 56 H142 M134 64 H142" stroke="#DCE7EE" strokeWidth="1.6" />

      <Person x={24} y={79} shirt="#F2A3B6" s={0.9} longHair />
    </Room>
  );
}

function ParkScene() {
  return (
    <Room bg="#E4F6FB" floor="#7CC48F">
      <rect y="58" width="160" height="37" fill="#A7DA8D" />
      <path d="M0 58 H160" stroke="#8CC776" strokeWidth="1.4" />
      <circle cx="138" cy="12" r="8" fill="#FBE08A" />
      <g fill="#FFFFFF" opacity="0.95">
        <ellipse cx="52" cy="12" rx="13" ry="5.2" />
        <ellipse cx="61" cy="8.6" rx="8" ry="4.4" />
      </g>

      {/* ağaçlar */}
      <g>
        <rect x="11" y="48" width="6" height="26" rx="2.4" fill="#B4874F" />
        <circle cx="14" cy="36" r="15" fill="#6DBB83" />
        <circle cx="4" cy="43" r="9" fill="#8ED3A0" />
        <circle cx="24" cy="43" r="8" fill="#7CC48F" />
      </g>
      <g>
        <rect x="146" y="52" width="5.6" height="24" rx="2.4" fill="#B4874F" />
        <circle cx="149" cy="41" r="12" fill="#6DBB83" />
        <circle cx="140" cy="47" r="7.5" fill="#8ED3A0" />
      </g>

      {/* salıncak */}
      <g>
        <path d="M40 78 L50 26 M92 78 L82 26" stroke="#C98F4B" strokeWidth="3.4" strokeLinecap="round" />
        <path d="M48 62 L84 62" stroke="#D9A25C" strokeWidth="2.6" strokeLinecap="round" />
        <rect x="44" y="31" width="46" height="4.6" rx="2.3" fill="#C98F4B" />
        <path d="M54 34 V54 M64 34 V54" stroke="#9AA9B8" strokeWidth="1.6" />
        <rect x="49" y="53" width="20" height="3.6" rx="1.8" fill="#E05A52" />
        <path d="M81 34 V50 M89 34 V50" stroke="#9AA9B8" strokeWidth="1.6" />
        <rect x="77" y="49" width="18" height="3.4" rx="1.7" fill="#F2C24B" />
        <Person x={59} y={52} shirt="#F3A6C6" s={0.72} />
      </g>

      {/* kaydırak */}
      <g>
        <path d="M104 78 V42 H124 V78" fill="#E7F1F7" stroke="#C9D8E2" strokeWidth="1.4" />
        <rect x="104" y="38" width="22" height="4.6" rx="2.3" fill="#5BAE92" />
        <path d="M106 44 L100 74 H110 L114 44 Z" fill="#F2C24B" />
        <path d="M104 52 H116" stroke="#E0A93B" strokeWidth="1.4" />
        <circle cx="108" cy="62" r="1.6" fill="#FFFFFF" opacity="0.8" />
      </g>

      {/* bank ve çocuklar */}
      <g>
        <rect x="120" y="66" width="34" height="4.4" rx="2.2" fill="#C98F4B" />
        <rect x="122" y="70.4" width="3" height="8.6" fill="#A87A4F" />
        <rect x="149" y="70.4" width="3" height="8.6" fill="#A87A4F" />
        <path d="M120 66 H154" stroke="#D9A25C" strokeWidth="1.2" />
      </g>

      <Person x={72} y={79} shirt="#F7D488" s={0.88} />
      <Person x={86} y={79} shirt="#9FC4E8" s={0.86} longHair />

      {/* çiçekler ve top */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${28 + i * 9} 76)`}>
          <path d="M0 0 V-6" stroke="#4FA48F" strokeWidth="1.2" />
          <circle cx="0" cy="-7.4" r="2.2" fill={["#F28B9B", "#F7D488", "#D7A7E8", "#F28B9B"][i]} />
          <circle cx="0" cy="-7.4" r="0.9" fill="#FFFFFF" />
        </g>
      ))}
      <g transform="translate(112 74)">
        <circle r="6" fill="#FFFFFF" stroke="#DCE7EE" strokeWidth="1" />
        <path d="M0 -6 Q3 0 0 6 Q-3 0 0 -6 Z" fill="#E05A52" />
        <path d="M-6 0 Q0 -3 6 0 Q0 3 -6 0 Z" fill="#40639B" />
      </g>
    </Room>
  );
}

function MosqueScene() {
  return (
    <Room bg="#E9F5FC" floor="#E5DFCC">
      <rect y="60" width="160" height="35" fill="#E1DAC5" />
      <path d="M0 60 H160" stroke="#CEC5AC" strokeWidth="1.4" />
      <circle cx="136" cy="12" r="7.5" fill="#FBE08A" />

      {/* minare */}
      <g>
        <rect x="14" y="12" width="15" height="64" rx="3" fill="#F7F2E5" stroke="#DCD3BE" strokeWidth="1" />
        <path d="M14 12 L21.5 3 L29 12 Z" fill="#8FB8A8" />
        <path d="M21.5 3 V-2" stroke="#C9A33B" strokeWidth="1.6" />
        <circle cx="21.5" cy="-3.4" r="1.8" fill="#C9A33B" />
        <rect x="12" y="24" width="19" height="4.4" rx="2.2" fill="#CFE3D8" />
        <rect x="12" y="44" width="19" height="4.4" rx="2.2" fill="#CFE3D8" />
        <path d="M19 60 Q21.5 56 24 60 V70 H19 Z" fill="#A8D0BF" />
      </g>

      {/* kubbe ve ana bina */}
      <g>
        <rect x="50" y="40" width="94" height="38" rx="3" fill="#F9F5EA" stroke="#DCD3BE" strokeWidth="1.2" />
        <path d="M50 42 Q97 0 144 42 Z" fill="#A8D0BF" />
        <path d="M97 8 V0" stroke="#C9A33B" strokeWidth="1.6" />
        <circle cx="97" cy="-2" r="2" fill="#C9A33B" />
        <path d="M64 42 Q97 20 130 42" stroke="#8FBCAB" strokeWidth="1.4" fill="none" />

        {/* kemerli pencereler */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <path
              d={`M${58 + i * 30} 62 V52 Q${64 + i * 30} 46 ${70 + i * 30} 52 V62 Z`}
              fill="#CFE7F2"
              stroke="#B9D4E2"
              strokeWidth="0.9"
            />
            <path d={`M${64 + i * 30} 48 V62`} stroke="#DCEBF2" strokeWidth="0.8" />
          </g>
        ))}

        {/* kapı */}
        <path d="M88 78 V58 Q97 46 106 58 V78 Z" fill="#C98F4B" stroke="#A87A4F" strokeWidth="1.2" />
        <path d="M97 52 V78" stroke="#A87A4F" strokeWidth="1.1" />
        <circle cx="94" cy="68" r="1.4" fill="#F2C24B" />

        <rect x="50" y="76" width="94" height="4" rx="2" fill="#D9D2BD" />
      </g>

      {/* ağaç */}
      <g>
        <rect x="152" y="50" width="5" height="28" rx="2" fill="#B4874F" />
        <circle cx="154" cy="44" r="10" fill="#6DBB83" />
        <circle cx="147" cy="50" r="7" fill="#8ED3A0" />
      </g>

      {/* şadırvan */}
      <g transform="translate(30 79)">
        <ellipse cx="0" cy="-2" rx="13" ry="4.6" fill="#CFE7F2" stroke="#B9D4E2" strokeWidth="1" />
        <rect x="-3" y="-11" width="6" height="9" rx="2" fill="#E7EFF4" stroke="#B9D4E2" strokeWidth="0.9" />
        <path d="M0 -11 V-16" stroke="#B9D4E2" strokeWidth="1.2" />
        <path d="M-6 -14 Q0 -12 6 -14" stroke="#8FC9E8" strokeWidth="1.2" fill="none" />
        <path d="M-4 -10 V-4 M4 -10 V-4" stroke="#8FC9E8" strokeWidth="1" opacity="0.8" />
      </g>

      <Person x={66} y={79} shirt="#7FB8A8" s={0.92} longHair />
      <Person x={126} y={79} shirt="#9FC4E8" s={0.86} />
    </Room>
  );
}

function sceneFor(place: Place): ReactNode {
  switch (place.id) {
    case "hastane":
      return <HospitalScene />;
    case "eczane":
      return <PharmacyScene />;
    case "veteriner":
      return <VetScene />;
    case "banka":
      return <BankScene />;
    case "kutuphane":
      return <LibraryScene />;
    case "postane":
      return <PostScene />;
    case "market":
      return <MarketScene />;
    case "kafe":
      return <CafeScene />;
    case "pastane":
      return <BakeryScene />;
    case "kirtasiye":
      return <StationeryScene />;
    case "dondurmaci":
      return <IceCreamScene />;
    case "kuafor":
      return <HairdresserScene />;
    case "spor-salonu":
      return <GymScene />;
    case "havuz":
      return <PoolScene />;
    case "park":
      return <ParkScene />;
    case "cicekci":
      return <FloristScene />;
    case "cami":
      return <MosqueScene />;
    case "sinema":
      return <CinemaScene />;
    case "itfaiye":
      return <FireScene />;
    case "karakol":
      return <PoliceScene />;
    case "dis-klinigi":
      return <DentistScene />;
    case "otogar":
      return <BusStationScene />;
    case "havalimani":
      return <AirportScene />;
    case "tamirci":
      return <MechanicScene />;
    default:
      return <HospitalScene />;
  }
}

export function PlaceArt({ place }: { place: Place }) {
  return (
    <svg
      className="place-art"
      viewBox="0 0 160 95"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
      focusable="false"
    >
      {sceneFor(place)}
    </svg>
  );
}
