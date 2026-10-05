import Image from "next/image";
import { cn } from "@/lib/utils";

interface DeviceFrameProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  variant?: "phone" | "tablet";
}

export function DeviceFrame({ src, alt, priority = false, className, variant = "phone" }: DeviceFrameProps) {
  const isTablet = variant === "tablet";
  return (
    <div className={cn("relative select-none", className)}>
      {/* ── Volume buttons (left side) ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "-5px",
          top: "28%",
          display: isTablet ? "none" : "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 10,
        }}
      >
        {[32, 28].map((h, i) => (
          <div
            key={i}
            style={{
              width: "3px",
              height: `${h}px`,
              borderRadius: "3px 0 0 3px",
              background: "linear-gradient(to right, #1a1510, #2e2720)",
              boxShadow: "-1px 0 2px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          />
        ))}
      </div>

      {/* ── Power button (right side) ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: "-3px",
          top: "22%",
          zIndex: 10,
          display: isTablet ? "none" : "block",
          width: "3px",
          height: "44px",
          borderRadius: "0 3px 3px 0",
          background: "linear-gradient(to left, #1a1510, #2e2720)",
          boxShadow: "1px 0 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      />

      {/* ── Tablet body ── */}
      <div
        style={{
          borderRadius: isTablet ? "1.5rem" : "2.75rem",
          /* Warm charcoal aluminum — lighter at top-left edge */
          background:
            "linear-gradient(150deg, #3d3730 0%, #1c1814 35%, #221e19 65%, #312a23 100%)",
          padding: "0",
          boxShadow: `
            0 0 0 1.5px rgba(255,255,255,0.07),
            0 2px  4px rgba(0,0,0,0.4),
            0 8px  20px rgba(0,0,0,0.35),
            0 24px 60px rgba(0,0,0,0.3),
            0 50px 100px rgba(0,0,0,0.18),
            inset 0 1px 0 rgba(255,255,255,0.10)
          `,
          overflow: "hidden",
        }}
      >
        {/* Top bezel */}
        <div
          style={{
            height: isTablet ? "1.5rem" : "2.75rem",
            background: "linear-gradient(180deg, #2e2820 0%, #1c1814 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {/* Speaker grille */}
          <div style={{ position: "absolute", left: "2rem", display: "flex", gap: "3px", alignItems: "center" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: "2px",
                  height: "7px",
                  borderRadius: "1px",
                  background: "rgba(0,0,0,0.55)",
                  boxShadow: "inset 0 1px 1px rgba(0,0,0,0.6)",
                }}
              />
            ))}
          </div>

          {/* Front camera */}
          <div
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "radial-gradient(circle at 38% 38%, #2a2a38, #06060c)",
              boxShadow:
                "0 0 0 1.5px rgba(255,255,255,0.07), 0 0 0 3px rgba(0,0,0,0.4), inset 0 1px 2px rgba(0,0,0,0.9)",
            }}
          />

          {/* Top bezel edge highlight */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "15%",
              right: "15%",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.18) 60%, transparent)",
            }}
          />
        </div>

        {/* ── Screen ──
            Ratio 1320/1922 = original image minus the Android nav bar at bottom (190px).
            objectPosition "top" shows the screenshot from the very top — the Android
            status bar is visible (adds realism) and the nav bar is cropped out.
        */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: isTablet ? "16/10" : "1320/1922",
            background: "#000",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover", objectPosition: isTablet ? "center top" : "top" }}
          />

          {/* Screen glare — subtle top-left sheen */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.01) 30%, transparent 55%)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        </div>

        {/* Bottom bezel */}
        <div
          style={{
            height: isTablet ? "1.25rem" : "2.25rem",
            background: "linear-gradient(0deg, #2e2820 0%, #1c1814 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {/* Home indicator bar */}
          <div
            style={{
              width: isTablet ? "2rem" : "2.5rem",
              height: "3px",
              borderRadius: "2px",
              background: "rgba(255,255,255,0.14)",
              boxShadow: "0 1px 2px rgba(0,0,0,0.4)",
            }}
          />
        </div>

        {/* Body left edge highlight */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "5%",
            bottom: "5%",
            left: 0,
            width: "1px",
            background:
              "linear-gradient(180deg, transparent, rgba(255,255,255,0.10) 30%, rgba(255,255,255,0.10) 70%, transparent)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}
