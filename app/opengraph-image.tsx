import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MemFlow: Retenir plus. Réviser moins.";
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
			{/* Orange accent bar */}
			<div
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					height: "6px",
					background: "#D97B3F",
				}}
			/>

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
				Retenir plus.{" "}
				<span style={{ color: "#D97B3F" }}>Réviser moins.</span>
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
				Flashcards · Révision espacée · Apprentissage actif
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
