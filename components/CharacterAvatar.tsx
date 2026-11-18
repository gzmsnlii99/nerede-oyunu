import type { Character } from "@/lib/data";

type Props = {
  character: Character;
  size?: number;
  className?: string;
};

/**
 * Yumuşak hatlı, sevimli çocuk kitabı karakterleri.
 * Tüm çizimler yuvarlak biçimlerden oluşur; sert siyah kontur kullanılmaz.
 */
export function CharacterAvatar({ character, size = 140, className }: Props) {
  const c = character;
  const { skin, skinShade, hair, outfit, outfitShade } = c;
  const scarf = "#F7E8D5";
  const scarfShade = "#EBD8C0";
  const feature = "#5B4536";
  const lip = "#B75E4B";

  const isElder = c.hairStyle === "elder";
  const browColor = isElder ? "#D9D3C7" : hair;

  return (
    <svg
      viewBox="0 0 120 150"
      width={size}
      height={size * 1.25}
      className={className}
      role="img"
      aria-label={`${c.name}, ${c.role}`}
    >
      <defs>
        <linearGradient id={`body-${c.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={outfit} />
          <stop offset="1" stopColor={outfitShade} />
        </linearGradient>
        <radialGradient id={`cheek-${c.id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F58FA6" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#F58FA6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* zemin gölgesi */}
      <ellipse cx="60" cy="143" rx="27" ry="4.5" fill="#3B2F26" opacity="0.13" />

      {/* arka saç / başörtüsü çerçevesi */}
      {(c.hairStyle === "bun" || c.hairStyle === "ponytail") && (
        <path
          d="M29 48 Q27 20 60 17 Q93 20 91 48 Q91 66 84 70 Q87 40 60 36 Q33 40 36 70 Q29 66 29 48 Z"
          fill={hair}
        />
      )}
      {c.hairStyle === "scarfbun" && (
        <>
          <path
            d="M27 54 Q23 14 60 11 Q97 14 93 54 Q92 68 83 72 Q87 40 60 36 Q33 40 37 72 Q28 68 27 54 Z"
            fill={scarf}
          />
          <path
            d="M35 74 Q27 90 31 108 L44 104 Q41 90 48 80 Z"
            fill={scarfShade}
            opacity="0.9"
          />
          <path
            d="M85 74 Q93 90 89 108 L76 104 Q79 90 72 80 Z"
            fill={scarfShade}
            opacity="0.9"
          />
        </>
      )}

      {/* bacaklar */}
      <rect x="48.5" y="114" width="9.5" height="23" rx="4.75" fill={skinShade} />
      <rect x="62" y="114" width="9.5" height="23" rx="4.75" fill={skinShade} />
      <ellipse cx="52" cy="138.5" rx="8.6" ry="4.2" fill="#8A7261" />
      <ellipse cx="69" cy="138.5" rx="8.6" ry="4.2" fill="#8A7261" />

      {/* kollar */}
      <rect
        x="27"
        y="82"
        width="11"
        height="35"
        rx="5.5"
        fill={outfitShade}
        transform="rotate(8 32.5 99)"
      />
      <rect
        x="82"
        y="82"
        width="11"
        height="35"
        rx="5.5"
        fill={outfitShade}
        transform="rotate(-8 87.5 99)"
      />
      <circle cx="30" cy="116.5" r="5.6" fill={skin} />
      <circle cx="90" cy="116.5" r="5.6" fill={skin} />

      {/* gövde */}
      <path
        d="M42 82 Q42 73.5 60 73.5 Q78 73.5 78 82 L83 113 Q84 122 71 122 L49 122 Q36 122 37 113 Z"
        fill={`url(#body-${c.id})`}
      />
      {/* yumuşak kumaş parlaklığı */}
      <path
        d="M45 87 Q48 111 44 117"
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.18"
        fill="none"
      />

      {/* kıyafet detayları */}
      {c.id === "cocuk" && (
        <g>
          <path
            d="M50 76 Q60 83 70 76"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />
          <rect x="50" y="96" width="20" height="15" rx="4" fill="#FFFFFF" opacity="0.35" />
          <circle cx="60" cy="88" r="1.8" fill="#FFFFFF" opacity="0.85" />
          <circle cx="60" cy="94" r="1.8" fill="#FFFFFF" opacity="0.85" />
        </g>
      )}
      {c.id === "baba" && (
        <>
          <path d="M52 76 L60 84 L68 76" fill="#FFFFFF" opacity="0.85" />
          <rect x="42" y="112" width="36" height="5" rx="2.5" fill="#5D7894" opacity="0.55" />
        </>
      )}
      {c.id === "anne" && (
        <>
          <path
            d="M50 76 Q60 82 70 76"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
          <circle cx="60" cy="96" r="2" fill="#FFFFFF" opacity="0.4" />
        </>
      )}
      {c.id === "abla" && (
        <path
          d="M48 90 Q60 94 72 90"
          stroke="#FFFFFF"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          opacity="0.45"
        />
      )}
      {c.id === "dede" && (
        <g>
          <path d="M51 76 L60 84 L69 76" fill="#F5E9D8" opacity="0.9" />
          <circle cx="60" cy="94" r="1.8" fill="#F5E9D8" opacity="0.8" />
          <circle cx="60" cy="103" r="1.8" fill="#F5E9D8" opacity="0.8" />
          <circle cx="60" cy="112" r="1.8" fill="#F5E9D8" opacity="0.8" />
        </g>
      )}
      {c.id === "nine" && (
        <path
          d="M47 78 Q60 87 73 78"
          stroke={scarfShade}
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
          opacity="0.9"
        />
      )}

      {/* boyun */}
      <rect x="54.5" y="64" width="11" height="13" rx="5.5" fill={skinShade} />

      {/* kulaklar */}
      <circle cx="32" cy="49" r="6.2" fill={skin} />
      <circle cx="88" cy="49" r="6.2" fill={skin} />

      {/* kafa */}
      <circle cx="60" cy="47" r="29" fill={skin} />

      {/* saç / başörtüsü ön kısmı */}
      {c.hairStyle === "pigtails" && (
        <>
          {/* yanlardaki at kuyrukları */}
          <path
            d="M33 40 Q19 44 17 57 Q15 70 25 77 Q22 61 35 50 Z"
            fill={hair}
          />
          <path
            d="M87 40 Q101 44 103 57 Q105 70 95 77 Q98 61 85 50 Z"
            fill={hair}
          />
          {/* tokalar */}
          <g fill="#FF7FA8">
            <path d="M26 37 Q20 32 18 38 Q20 43 26 42 Z" />
            <path d="M26 37 Q32 32 34 38 Q32 43 26 42 Z" />
            <circle cx="26" cy="40" r="2.4" fill="#FF5E92" />
            <path d="M94 37 Q100 32 102 38 Q100 43 94 42 Z" />
            <path d="M94 37 Q88 32 86 38 Q88 43 94 42 Z" />
            <circle cx="94" cy="40" r="2.4" fill="#FF5E92" />
          </g>
          {/* kaküller */}
          <path
            d="M32 44 Q34 21 60 19 Q86 21 88 44 Q80 30 60 30 Q40 30 32 44 Z"
            fill={hair}
          />
          <path
            d="M44 26 Q52 21 61 23"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.16"
          />
        </>
      )}
      {c.hairStyle === "bun" && (
        <>
          <circle cx="60" cy="11" r="9.5" fill={hair} />
          <circle cx="60" cy="11" r="9.5" fill="#FFFFFF" opacity="0.08" />
          <path
            d="M32 44 Q34 22 60 20 Q86 22 88 44 Q80 31 60 30 Q40 31 32 44 Z"
            fill={hair}
          />
          <path
            d="M44 26 Q52 21 60 22"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.14"
          />
        </>
      )}
      {c.hairStyle === "ponytail" && (
        <>
          <path
            d="M86 34 Q104 38 103 58 Q102 72 94 77 Q98 60 89 47 Z"
            fill={hair}
          />
          <circle cx="88" cy="37" r="4.2" fill="#F2A3BC" />
          <path
            d="M32 44 Q34 21 60 19 Q86 21 88 44 Q80 31 60 30 Q40 31 32 44 Z"
            fill={hair}
          />
          <path
            d="M43 27 Q52 21 61 23"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.13"
          />
        </>
      )}
      {c.hairStyle === "short" && (
        <>
          <path
            d="M31 43 Q33 18 60 16 Q87 18 89 43 Q81 29 60 28 Q39 29 31 43 Z"
            fill={hair}
          />
          <path
            d="M30 43 Q30 52 33 55 L37 52 Q34 47 35 41 Z"
            fill={hair}
          />
          <path
            d="M90 43 Q90 52 87 55 L83 52 Q86 47 85 41 Z"
            fill={hair}
          />
          <path
            d="M43 25 Q52 19 61 21"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.12"
          />
        </>
      )}
      {c.hairStyle === "elder" && (
        <>
          <path
            d="M33 50 Q27 34 39 26 Q38 38 43 46 Q38 50 33 50 Z"
            fill={hair}
          />
          <path
            d="M87 50 Q93 34 81 26 Q82 38 77 46 Q82 50 87 50 Z"
            fill={hair}
          />
          <path
            d="M35 42 Q38 35 44 33"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
            fill="none"
            opacity="0.45"
          />
        </>
      )}
      {c.hairStyle === "scarfbun" && (
        <>
          <path
            d="M30 50 Q29 20 60 16 Q91 20 90 50 Q89 60 83 63 Q85 36 60 33 Q35 36 37 63 Q31 60 30 50 Z"
            fill={scarf}
          />
          <path
            d="M36 26 Q48 19 60 19"
            stroke="#FFFFFF"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M82 31 Q88 39 87 52"
            stroke={scarfShade}
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.8"
          />
        </>
      )}

      {/* kaşlar */}
      <path
        d="M43.5 41.5 Q49 39 54 41"
        stroke={browColor}
        strokeWidth="1.9"
        strokeLinecap="round"
        fill="none"
        opacity="0.62"
      />
      <path
        d="M66 41 Q71 39 76.5 41.5"
        stroke={browColor}
        strokeWidth="1.9"
        strokeLinecap="round"
        fill="none"
        opacity="0.62"
      />

      {/* gözler */}
      <ellipse cx="50" cy="50.5" rx="3.2" ry="3.9" fill={feature} />
      <ellipse cx="70" cy="50.5" rx="3.2" ry="3.9" fill={feature} />
      <circle cx="51.2" cy="49.2" r="1.25" fill="#FFFFFF" />
      <circle cx="71.2" cy="49.2" r="1.25" fill="#FFFFFF" />
      {isElder && (
        <path
          d="M46.8 54 Q50 55.8 53.2 54"
          stroke={feature}
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.22"
        />
      )}

      {/* yanaklar */}
      <ellipse cx="38.5" cy="58.5" rx="7.5" ry="5" fill={`url(#cheek-${c.id})`} />
      <ellipse cx="81.5" cy="58.5" rx="7.5" ry="5" fill={`url(#cheek-${c.id})`} />

      {/* burun */}
      <path
        d="M58.6 55.5 Q60 57 61.4 55.5"
        stroke="#C98F73"
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />

      {/* ağız */}
      {c.accessory !== "mustache" && (
        <path
          d="M53.5 61 Q60 66 66.5 61"
          stroke={lip}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
      )}

      {/* gözlük */}
      {c.accessory === "glasses" && (
        <g
          fill="rgba(255,255,255,0.32)"
          stroke="#9A8470"
          strokeWidth="2.2"
          strokeLinejoin="round"
        >
          <rect x="39.5" y="43" width="20" height="16" rx="8" />
          <rect x="60.5" y="43" width="20" height="16" rx="8" />
          <path d="M59.5 48 Q60 46.6 60.5 48" fill="none" />
          <path d="M39.5 47 L33 45.5" fill="none" />
          <path d="M80.5 47 L87 45.5" fill="none" />
        </g>
      )}

      {/* bıyık */}
      {c.accessory === "mustache" && (
        <>
          <path
            d="M50 60 Q55 56 60 60 Q65 56 70 60 Q66.5 65.5 60 63 Q53.5 65.5 50 60 Z"
            fill={hair}
          />
          <path
            d="M55 65.5 Q60 68 65 65.5"
            stroke={lip}
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        </>
      )}

      {/* dedenin yumuşak beyaz bıyığı */}
      {isElder && (
        <path
          d="M51 59.5 Q55.5 56.5 60 59.5 Q64.5 56.5 69 59.5 Q65.5 64 60 62 Q54.5 64 51 59.5 Z"
          fill={hair}
          opacity="0.95"
        />
      )}

      {/* emzik */}

      {/* baston */}
      {c.accessory === "cane" && (
        <g stroke="#B08968" strokeWidth="4.4" fill="none" strokeLinecap="round">
          <path d="M90 117 Q99 117 97 106" />
          <path d="M91 117 L95 141" />
        </g>
      )}
    </svg>
  );
}
