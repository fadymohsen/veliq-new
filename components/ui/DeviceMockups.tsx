"use client";

/* Rounded-rectangle SVG path helper */
function rr(x: number, y: number, w: number, h: number, r: number) {
  return `M${x + r},${y} h${w - 2 * r} a${r},${r} 0 0 1 ${r},${r} v${h - 2 * r} a${r},${r} 0 0 1 ${-r},${r} h${-(w - 2 * r)} a${r},${r} 0 0 1 ${-r},${-r} v${-(h - 2 * r)} a${r},${r} 0 0 1 ${r},${-r} z`;
}

/* ─── iPhone 15 Pro Max ───────────────────────────────────────────────────── */
function PhoneMockup({ url, previewImage }: { url: string; previewImage?: string }) {
  // SVG units == pixels (1:1) so the frame aligns with the iframe exactly.
  const VB_W = 312, VB_H = 662;
  // Body: x6 y6 w300 h650 r52 · Screen hole: x17 y17 w278 h628 r42
  const SCR_X = 17, SCR_Y = 17, SCR_W = 278, SCR_H = 628, SCR_R = 42;
  const STATUS_H = 46;          // status bar / notch safe area
  const SITE_H = SCR_H - STATUS_H;
  const VIEWPORT = 430;
  const scale = SCR_W / VIEWPORT;

  return (
    <div style={{ position: "relative", width: VB_W, height: VB_H, flexShrink: 0, filter: "drop-shadow(0 40px 90px rgba(0,0,0,0.85))" }}>

      {/* Screen: status bar (under notch) + live site */}
      <div style={{
        position: "absolute",
        left: SCR_X, top: SCR_Y, width: SCR_W, height: SCR_H,
        borderRadius: SCR_R, overflow: "hidden", background: "#0a0a0a",
      }}>
        {/* Status bar */}
        <div style={{
          height: STATUS_H, display: "flex", alignItems: "center",
          justifyContent: "space-between", padding: "0 26px 6px", color: "#fff",
        }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.2px", marginTop: 6 }}>9:41</span>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
            {/* Wi-Fi */}
            <svg width="16" height="12" viewBox="0 0 16 12" fill="#fff" aria-hidden>
              <path d="M8 2C5 2 2.4 3.2 0.6 5.1L2 6.5C3.5 5 5.6 4 8 4s4.5 1 6 2.5l1.4-1.4C13.6 3.2 11 2 8 2z" />
              <path d="M8 6c-1.6 0-3 0.6-4 1.7l1.4 1.4C6 8.4 6.9 8 8 8s2 0.4 2.6 1.1L12 7.7C11 6.6 9.6 6 8 6z" />
              <circle cx="8" cy="10.4" r="1.3" />
            </svg>
            {/* Battery */}
            <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden>
              <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="#fff" strokeOpacity="0.5" />
              <rect x="2" y="2" width="16" height="8" rx="1.5" fill="#fff" />
              <rect x="23" y="3.5" width="1.6" height="5" rx="0.8" fill="#fff" fillOpacity="0.5" />
            </svg>
          </div>
        </div>

        {/* Live site — starts below the notch */}
        <div style={{ width: SCR_W, height: SITE_H, overflow: "hidden" }}>
          {previewImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewImage}
              alt="Mobile preview"
              style={{ width: SCR_W, height: SITE_H, objectFit: "cover", objectPosition: "top", display: "block" }}
            />
          ) : (
            <iframe
              src={url}
              title="Mobile preview"
              scrolling="no"
              style={{
                width: VIEWPORT + 18,
                height: Math.round(SITE_H / scale),
                transform: `scale(${scale})`,
                transformOrigin: "0 0",
                border: "none", display: "block", pointerEvents: "none",
              }}
            />
          )}
        </div>
      </div>

      {/* SVG frame on top — transparent screen hole */}
      <svg
        width={VB_W} height={VB_H} viewBox={`0 0 ${VB_W} ${VB_H}`}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        aria-hidden
      >
        <defs>
          <linearGradient id="phoneBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#222" />
            <stop offset="45%" stopColor="#0c0c0c" />
            <stop offset="100%" stopColor="#1a1a1a" />
          </linearGradient>
        </defs>

        {/* Side buttons (drawn under the body) */}
        <rect x="2"   y="132" width="4" height="22" rx="1.5" fill="#2c2c2c" />
        <rect x="2"   y="184" width="4" height="46" rx="1.5" fill="#2c2c2c" />
        <rect x="2"   y="240" width="4" height="46" rx="1.5" fill="#2c2c2c" />
        <rect x="306" y="206" width="4" height="84" rx="1.5" fill="#2c2c2c" />

        {/* Bezel ring (even-odd: outer body minus screen hole) */}
        <path
          d={`${rr(6, 6, 300, 650, 52)} ${rr(SCR_X, SCR_Y, SCR_W, SCR_H, SCR_R)}`}
          fillRule="evenodd"
          fill="url(#phoneBody)"
        />
        {/* Outer rim edge */}
        <path d={rr(6, 6, 300, 650, 52)} fill="none" stroke="#3a3a3a" strokeWidth="1.5" />
        {/* Thin polished band just inside the edge */}
        <path d={rr(9, 9, 294, 644, 49)} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Dynamic Island */}
        <rect x="108" y="26" width="96" height="29" rx="14.5" fill="#000" />
        <circle cx="188" cy="40.5" r="4.5" fill="#0c0c14" stroke="#1b2030" strokeWidth="1" />
        <circle cx="189" cy="41" r="1.6" fill="#1e2a44" />
      </svg>
    </div>
  );
}

/* ─── MacBook ─────────────────────────────────────────────────────────────── */
function LaptopMockup({ url, previewImage }: { url: string; previewImage?: string }) {
  const VB_W = 880, VB_H = 560;
  // Lid body: x60 y8 w760 h486 r20 · Screen hole: x74 y22 w732 h458 r6
  const SCR_X = 74, SCR_Y = 22, SCR_W = 732, SCR_H = 458, SCR_R = 6;
  const CHROME_H = 34;
  const IF_Y = SCR_Y + CHROME_H;          // iframe starts below browser bar
  const IF_H = SCR_H - CHROME_H;
  const VIEWPORT = 1440;
  const scale = SCR_W / VIEWPORT;
  const urlLabel = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div style={{ position: "relative", width: VB_W, height: VB_H, flexShrink: 0, filter: "drop-shadow(0 40px 90px rgba(0,0,0,0.8))" }}>

      {/* Browser chrome */}
      <div style={{
        position: "absolute", left: SCR_X, top: SCR_Y, width: SCR_W, height: CHROME_H,
        background: "rgb(24,24,24)", display: "flex", alignItems: "center",
        padding: "0 14px", gap: 10, borderTopLeftRadius: SCR_R, borderTopRightRadius: SCR_R,
      }}>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgb(255,95,86)" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgb(255,189,46)" }} />
          <div style={{ width: 11, height: 11, borderRadius: "50%", background: "rgb(39,201,63)" }} />
        </div>
        <div style={{
          flex: 1, height: 22, background: "rgb(34,34,34)", borderRadius: 11, margin: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgb(46,46,46)",
        }}>
          <span style={{ fontSize: 10, color: "rgb(140,140,140)" }}>🔒 {urlLabel}</span>
        </div>
      </div>

      {/* Live site */}
      <div style={{
        position: "absolute", left: SCR_X, top: IF_Y, width: SCR_W, height: IF_H,
        overflow: "hidden", background: "#fff",
      }}>
        {previewImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewImage}
            alt="Desktop preview"
            style={{ width: SCR_W, height: IF_H, objectFit: "cover", objectPosition: "top", display: "block" }}
          />
        ) : (
          <iframe
            src={url}
            title="Desktop preview"
            scrolling="no"
            style={{
              width: VIEWPORT + 18,
              height: Math.round(IF_H / scale),
              transform: `scale(${scale})`,
              transformOrigin: "0 0",
              border: "none", display: "block", pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* SVG frame */}
      <svg
        width={VB_W} height={VB_H} viewBox={`0 0 ${VB_W} ${VB_H}`}
        style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
        aria-hidden
      >
        <defs>
          <linearGradient id="lidBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#262626" />
            <stop offset="100%" stopColor="#161616" />
          </linearGradient>
          <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2a2a" />
            <stop offset="55%" stopColor="#1d1d1d" />
            <stop offset="100%" stopColor="#0e0e0e" />
          </linearGradient>
        </defs>

        {/* Lid bezel (even-odd: lid minus screen) */}
        <path
          d={`${rr(60, 8, 760, 486, 20)} ${rr(SCR_X, SCR_Y, SCR_W, SCR_H, SCR_R)}`}
          fillRule="evenodd"
          fill="url(#lidBody)"
        />
        <path d={rr(60, 8, 760, 486, 20)} fill="none" stroke="#383838" strokeWidth="1.5" />

        {/* Webcam */}
        <circle cx="440" cy="15" r="2.6" fill="#222" stroke="#333" strokeWidth="0.6" />

        {/* Hinge gap */}
        <rect x="60" y="494" width="760" height="6" fill="#0a0a0a" />

        {/* Base / deck */}
        <path d={`M14,500 h852 a8,8 0 0 1 8,8 v6 a18,18 0 0 1 -18,18 h-832 a18,18 0 0 1 -18,-18 v-6 a8,8 0 0 1 8,-8 z`} fill="url(#base)" stroke="#383838" strokeWidth="1.2" />
        {/* Front notch (open-lid grip) */}
        <path d="M395,500 h90 a6,6 0 0 1 -6,8 h-78 a6,6 0 0 1 -6,-8 z" fill="#0c0c0c" />
      </svg>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────────────────────── */
export default function DeviceMockups({ url, title, previewImage }: { url: string; title: string; previewImage?: string }) {
  return (
    <section style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>

      {/* Label */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 28, height: 1, background: "rgb(99,102,241)" }} />
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgb(99,102,241)" }}>
          {previewImage ? "Preview" : "Live Preview"}
        </span>
        <span style={{ width: 28, height: 1, background: "rgb(99,102,241)" }} />
      </div>

      {/* Devices — laptop hidden on mobile, phone only */}
      <div style={{
        display: "flex", alignItems: "flex-end", justifyContent: "center",
        gap: 28, width: "100%", overflowX: "auto", paddingBottom: 12,
      }}>
        <div className="hidden md:block" style={{ flexShrink: 0 }}>
          <LaptopMockup url={url} previewImage={previewImage} />
        </div>
        <PhoneMockup url={url} previewImage={previewImage} />
      </div>

      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.18)", letterSpacing: "0.02em" }}>
        {previewImage ? `Preview · ${title}` : `Live embed · ${title} · some sites may restrict iframe display`}
      </p>
    </section>
  );
}
