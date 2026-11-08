import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Memflow — Apprends aujourd’hui. Retrouve-le demain.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
	return new ImageResponse(
		<div
			style={{
				background: "#FAF6EF",
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				padding: "80px",
				fontFamily: "Georgia, serif",
				position: "relative",
			}}
		>
			{/* Wordmark */}
			<div
				style={{
					display: "flex",
					alignItems: "center",
					marginBottom: "48px",
				}}
			>
				<span
					style={{
						fontSize: "36px",
						fontWeight: "700",
						color: "#2B241D",
						letterSpacing: "-0.5px",
					}}
				>
					Mem
				</span>
				<span
					style={{
						fontSize: "36px",
						fontWeight: "700",
						color: "#D97B3F",
						letterSpacing: "-0.5px",
					}}
				>
					Flow
				</span>
			</div>

			{/* Headline */}
			<div
				style={{
					fontSize: "72px",
					fontWeight: "700",
					color: "#2B241D",
					textAlign: "center",
					lineHeight: "1.1",
					letterSpacing: "-1px",
					maxWidth: "900px",
				}}
			>
				Apprends aujourd’hui.{" "}
				<span style={{ color: "#D97B3F" }}>Retrouve-le demain.</span>
			</div>

			{/* Tagline */}
			<div
				style={{
					marginTop: "32px",
					fontSize: "24px",
					color: "#6B6258",
					textAlign: "center",
					fontFamily: "system-ui, sans-serif",
					fontWeight: "400",
				}}
			>
				Collections · Révision espacée · Statistiques
			</div>

			{/* Bottom accent */}
			<div
				style={{
					position: "absolute",
					bottom: "48px",
					display: "flex",
					alignItems: "center",
					gap: "8px",
				}}
			>
				<div
					style={{
						width: "8px",
						height: "8px",
						borderRadius: "50%",
						background: "#D97B3F",
					}}
				/>
				<span
					style={{
						fontSize: "16px",
						color: "#6B6258",
						fontFamily: "system-ui, sans-serif",
					}}
				>
					memflow.one
				</span>
			</div>
		</div>,
		{ ...size },
	);
}
