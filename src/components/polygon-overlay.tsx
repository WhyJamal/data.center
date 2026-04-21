"use client";

interface PolygonItem {
  id: number;
  polygon: string;
  isUnavailable?: boolean;
}

interface PolygonOverlayProps {
  items: PolygonItem[];
  hoveredId: number | null;
  isExiting?: boolean;
  onEnter: (id: number) => void;
  onLeave: () => void;
  onClick: (item: PolygonItem) => void;
  showGlow?: boolean;
}

export default function PolygonOverlay({
  items,
  hoveredId,
  isExiting = false,
  onEnter,
  onLeave,
  onClick,
  showGlow = false,
}: PolygonOverlayProps) {
  return (
    <>
      {/* Visual layer — glow + fill */}
      <svg
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {showGlow && (
          <defs>
            <filter id="white-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   0 0 0 28 -8"
                result="glow"
              />
              <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        )}

        {items.map((item) => {
          if (isExiting) return null;

          const isActive = hoveredId === item.id;

          return (
            <g key={item.id}>
              {/* Outer glow polygon */}
              <polygon
                points={item.polygon}
                fill={isActive ? "rgba(255,255,255,0.06)" : "transparent"}
                stroke={isActive ? "rgba(255,255,255,0.35)" : "transparent"}
                strokeWidth="6"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className="[transition:fill_0.25s_ease,stroke_0.25s_ease]"
              />

              {/* Main polygon */}
              <polygon
                points={item.polygon}
                fill={
                  isActive
                    ? item.isUnavailable
                      ? "rgba(239,68,68,0.25)"
                      : "rgba(255,255,255,0.22)"
                    : "transparent"
                }
                stroke={
                  isActive
                    ? item.isUnavailable
                      ? "rgba(239,68,68,1)"
                      : "rgba(255,255,255,1)"
                    : "transparent"
                }
                strokeWidth="2.5"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                filter={isActive && showGlow ? "url(#white-glow)" : undefined}
                className="[transition:fill_0.25s_ease,stroke_0.25s_ease]"
              />
            </g>
          );
        })}
      </svg>

      {/* Interaction layer — transparent hit areas */}
      <svg
        className="absolute inset-0 w-full h-full z-30"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {items.map((item) => (
          <polygon
            key={item.id}
            points={item.polygon}
            fill="rgba(0,0,0,0.001)"
            stroke="transparent"
            strokeWidth="12"
            vectorEffect="non-scaling-stroke"
            className="cursor-pointer"
            onMouseEnter={() => onEnter(item.id)}
            onMouseLeave={onLeave}
            onClick={() => onClick(item)}
          />
        ))}
      </svg>
    </>
  );
}