import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   HEROICONS — inline SVG
══════════════════════════════════════════════════════════════════════════ */
const Icon = ({ name, size = 18, stroke = "currentColor", fill = "none", sw = 1.5 }) => {
  const p = {
    sparkles: <><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/><path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/></>,
    arrowRight: <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>,
    chevronRight: <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>,
    check: <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/>,
    map: <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.159.69.159 1.006 0z"/>,
    users: <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>,
    bolt: <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"/>,
    academic: <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>,
    briefcase: <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0"/>,
    currency: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>,
    heart: <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>,
    globe: <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>,
    send: <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/>,
    arrowLeft: <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>,
    star: <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>,
    fire: <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/>,
    cpu: <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/></>,
    lightbulb: <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/>,
    chart: <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/>,
    chat: <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>,
    xmark: <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>,
    pencil: <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>,
    diagramNode: <><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v3m0 0l-4.5 5m4.5-5l4.5 5"/></>,
    smiley: <><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw}>
      {p[name]}
    </svg>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   CSS
══════════════════════════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@300;400;500;700;800&family=Instrument+Serif:ital@0;1&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0f0d09;--s1:#1a1610;--s2:#221e14;--s3:#2c2618;
  --cream:#f0ebe0;--cream2:#c8c0ae;--sand:#8a7f6e;
  --rust:#c4522a;--rust2:#e06540;--rust3:#f07850;
  --moss:#3d5a3e;--moss2:#4a7a4c;--sage:#7aae7e;
  --gold:#c9a84c;--gold2:#e0bc60;
  --border:rgba(240,235,224,0.07);--border2:rgba(240,235,224,0.13);
  --r:16px;--rsm:10px;
  --fd:'Clash Display',sans-serif;
  --fb:'Cabinet Grotesk',sans-serif;
  --fs:'Instrument Serif',serif;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--cream);font-family:var(--fb);font-size:15px;line-height:1.65;overflow-x:hidden;cursor:none;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:var(--bg)}::-webkit-scrollbar-thumb{background:var(--s3);border-radius:2px}

/* CURSOR */
#cur{position:fixed;pointer-events:none;z-index:99999;width:11px;height:11px;background:var(--rust2);border-radius:50%;transform:translate(-50%,-50%);transition:width .18s,height .18s,opacity .18s;mix-blend-mode:difference}
#cur.big{width:38px;height:38px;opacity:.35}
#cur-ring{position:fixed;pointer-events:none;z-index:99998;width:30px;height:30px;border:1px solid rgba(224,101,64,.35);border-radius:50%;transform:translate(-50%,-50%);transition:left .11s ease,top .11s ease}

/* CANVAS */
#bgc{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.45}

/* NAV */
.nav{position:fixed;top:0;left:0;right:0;z-index:500;height:62px;padding:0 36px;display:flex;align-items:center;justify-content:space-between;background:rgba(15,13,9,.75);backdrop-filter:blur(20px);border-bottom:1px solid var(--border)}
.nav-logo{font-family:var(--fd);font-size:19px;font-weight:700;color:var(--cream);letter-spacing:-.5px;display:flex;align-items:center;gap:9px}
.nav-pulse{width:8px;height:8px;border-radius:50%;background:var(--rust2);animation:breathe 3s ease-in-out infinite}
@keyframes breathe{0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(224,101,64,.4)}50%{transform:scale(1.3);box-shadow:0 0 0 5px rgba(224,101,64,0)}}
.nav-links{display:flex;align-items:center;gap:2px}
.nav-link{padding:6px 15px;border-radius:100px;border:none;background:transparent;color:rgba(240,235,224,.45);font-family:var(--fb);font-size:13px;font-weight:500;cursor:none;transition:all .22s}
.nav-link:hover,.nav-link.on{color:var(--cream);background:rgba(240,235,224,.07)}

/* LIVE FEED */
.live-feed{position:fixed;bottom:22px;right:22px;z-index:400;display:flex;flex-direction:column;gap:7px;pointer-events:none}
.lf{display:flex;align-items:center;gap:9px;padding:10px 15px;border-radius:10px;background:rgba(26,22,16,.92);backdrop-filter:blur(14px);border:1px solid var(--border);font-size:12px;color:rgba(240,235,224,.6);box-shadow:0 4px 16px rgba(0,0,0,.4);animation:lfIn .4s cubic-bezier(.34,1.56,.64,1) both,lfOut .3s 3.6s ease forwards;max-width:260px}
@keyframes lfIn{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
@keyframes lfOut{to{opacity:0;transform:translateX(16px)}}
.lf-dot{width:6px;height:6px;border-radius:50%;background:var(--sage);flex-shrink:0;animation:breathe 2s ease-in-out infinite}

/* APP */
.app{min-height:100vh;position:relative;z-index:1}

/* HERO */
.hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 24px 48px;position:relative;overflow:hidden;text-align:center}
.blob{position:absolute;border-radius:50%;filter:blur(85px);pointer-events:none;animation:blobMorph 14s ease-in-out infinite}
.b1{width:520px;height:520px;background:rgba(61,90,62,.3);top:-120px;left:-160px;animation-delay:0s}
.b2{width:380px;height:380px;background:rgba(196,82,42,.18);bottom:-80px;right:-80px;animation-delay:-5s}
.b3{width:280px;height:280px;background:rgba(201,168,76,.1);top:45%;left:42%;animation-delay:-10s}
@keyframes blobMorph{0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%;transform:translate(0,0) scale(1)}25%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%;transform:translate(18px,-18px) scale(1.04)}50%{border-radius:50% 60% 30% 60%/30% 60% 70% 40%;transform:translate(-12px,12px) scale(.97)}75%{border-radius:60% 30% 50% 50%/40% 50% 60% 50%;transform:translate(8px,4px) scale(1.02)}}
.eyebrow{display:flex;align-items:center;gap:8px;padding:6px 15px;border-radius:100px;border:1px solid rgba(240,235,224,.1);background:rgba(240,235,224,.04);font-size:11px;font-weight:500;color:var(--sage);margin-bottom:28px;letter-spacing:.5px;animation:rise .7s ease both}
.ldot{width:6px;height:6px;border-radius:50%;background:var(--sage);animation:breathe 2.2s ease-in-out infinite}
.hero-h1{font-family:var(--fd);font-size:clamp(44px,7vw,84px);font-weight:700;line-height:1.0;letter-spacing:-3px;max-width:880px;margin-bottom:10px;animation:rise .7s .08s ease both}
.hero-h1 em{font-family:var(--fs);font-style:italic;color:var(--rust2);display:inline-block;animation:wobble .9s .25s cubic-bezier(.34,1.56,.64,1) both}
@keyframes wobble{from{opacity:0;transform:rotate(-4deg) scale(.8)}to{opacity:1;transform:rotate(-1.5deg) scale(1)}}
.hero-sub{font-size:17px;font-weight:300;color:rgba(240,235,224,.5);max-width:500px;margin-bottom:44px;line-height:1.75;animation:rise .7s .16s ease both}
@keyframes rise{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}

/* INPUT CARD */
.ic-shell{width:100%;max-width:680px;position:relative;animation:rise .7s .28s ease both}
.ic-shell::before{content:'';position:absolute;inset:-1px;border-radius:calc(var(--r) + 1px);background:linear-gradient(135deg,rgba(196,82,42,.35),rgba(61,90,62,.25),rgba(201,168,76,.15));z-index:-1;animation:bpulse 4.5s ease-in-out infinite}
@keyframes bpulse{0%,100%{opacity:.4}50%{opacity:.9}}
.ic{background:rgba(34,30,20,.88);backdrop-filter:blur(20px);border-radius:var(--r);padding:26px;border:1px solid var(--border)}
.chips{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:16px}
.chip{display:flex;align-items:center;gap:6px;padding:6px 13px;border-radius:100px;border:1px solid rgba(240,235,224,.09);background:rgba(240,235,224,.04);color:rgba(240,235,224,.5);font-size:12px;font-weight:500;cursor:none;transition:all .2s;font-family:var(--fb)}
.chip:hover{border-color:rgba(224,101,64,.45);color:var(--cream);transform:translateY(-1px)}
.chip.on{border-color:var(--rust);background:rgba(196,82,42,.18);color:var(--cream)}
.ta{width:100%;min-height:108px;background:rgba(240,235,224,.04);border:1px solid rgba(240,235,224,.08);border-radius:var(--rsm);padding:15px;color:var(--cream);font-family:var(--fb);font-size:15px;font-weight:300;resize:none;outline:none;transition:border-color .2s,box-shadow .2s;line-height:1.65}
.ta:focus{border-color:rgba(224,101,64,.38);box-shadow:0 0 0 3px rgba(196,82,42,.09)}
.ta::placeholder{color:rgba(240,235,224,.2)}
.ifoot{display:flex;align-items:center;justify-content:space-between;margin-top:13px;gap:12px}
.ihint{font-size:11px;color:rgba(240,235,224,.22);flex:1}
.btn-go{display:inline-flex;align-items:center;gap:9px;padding:12px 26px;border-radius:100px;border:none;background:linear-gradient(135deg,var(--rust),var(--rust2));color:white;font-family:var(--fd);font-size:13px;font-weight:600;cursor:none;transition:all .22s;box-shadow:0 4px 22px rgba(196,82,42,.32);white-space:nowrap;position:relative;overflow:hidden}
.btn-go::after{content:'';position:absolute;width:100%;height:100%;top:0;left:-100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.14),transparent);transition:left .4s}
.btn-go:hover::after{left:100%}
.btn-go:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 7px 28px rgba(196,82,42,.46)}
.btn-go:disabled{opacity:.4;cursor:not-allowed}

/* TICKER */
.ticker-wrap{position:relative;overflow:hidden;width:100%;padding:13px 0;border-top:1px solid rgba(240,235,224,.05);border-bottom:1px solid rgba(240,235,224,.05);margin-top:56px;animation:rise .7s .44s ease both}
.ticker-track{display:flex;gap:0;animation:tick 30s linear infinite;width:max-content}
@keyframes tick{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
.ti{display:flex;align-items:center;gap:9px;padding:0 28px;font-size:12px;font-weight:500;color:rgba(240,235,224,.32);white-space:nowrap}
.ti strong{color:rgba(240,235,224,.65);font-weight:700}
.ti-sep{color:var(--rust);opacity:.45}

/* STATS */
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(240,235,224,.05);max-width:600px;margin:52px auto 0;border-radius:var(--r);overflow:hidden;animation:rise .7s .56s ease both}
.sb{background:rgba(34,30,20,.85);padding:22px;text-align:center;transition:background .22s}
.sb:hover{background:rgba(61,90,62,.22)}
.sn{font-family:var(--fd);font-size:34px;font-weight:700;color:var(--cream);line-height:1;margin-bottom:4px}
.sn span{color:var(--rust2)}
.sl{font-size:11px;color:rgba(240,235,224,.32);font-weight:500;letter-spacing:.3px}

/* PAGE */
.page{padding:82px 24px 60px;max-width:1080px;margin:0 auto;animation:rise .4s ease both}

/* SOLUTION HEADER */
.sol-head{display:flex;align-items:flex-start;gap:18px;padding:22px 26px;background:rgba(34,30,20,.75);border:1px solid var(--border);border-radius:var(--r);margin-bottom:22px;backdrop-filter:blur(12px);position:relative;overflow:hidden}
.sol-head::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:linear-gradient(180deg,var(--rust),var(--moss))}
.sol-icon{width:48px;height:48px;border-radius:13px;flex-shrink:0;background:linear-gradient(135deg,var(--rust),var(--moss));display:flex;align-items:center;justify-content:center;color:white}
.sol-head h2{font-family:var(--fd);font-size:19px;font-weight:600;margin-bottom:5px;letter-spacing:-.4px}
.sol-head p{font-size:13px;color:rgba(240,235,224,.45);line-height:1.55}
.itag{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:5px;margin-bottom:5px;background:rgba(196,82,42,.13);border:1px solid rgba(196,82,42,.22);font-size:10px;font-weight:700;color:var(--rust2);letter-spacing:.5px;text-transform:uppercase}

/* PROGRESS */
.prog{background:rgba(34,30,20,.75);border:1px solid var(--border);border-radius:var(--r);padding:18px 22px;margin-bottom:20px}
.prog-l{display:flex;justify-content:space-between;align-items:center;margin-bottom:9px}
.prog-l span:first-child{font-family:var(--fd);font-size:13px;font-weight:600}
.prog-l span:last-child{font-size:12px;color:var(--rust2);font-weight:700}
.prog-track{height:5px;background:rgba(240,235,224,.06);border-radius:10px;overflow:hidden}
.prog-fill{height:100%;border-radius:10px;background:linear-gradient(90deg,var(--rust),var(--gold),var(--moss2));background-size:200%;transition:width .6s cubic-bezier(.34,1.56,.64,1);animation:shimmer 3s linear infinite}
@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

/* 2-COL */
.sol-grid{display:grid;grid-template-columns:1fr 310px;gap:18px}
@media(max-width:820px){.sol-grid{grid-template-columns:1fr}}
.sol-main{display:flex;flex-direction:column;gap:14px}
.sol-side{display:flex;flex-direction:column;gap:12px}

/* TAB BAR */
.tbbar{display:flex;gap:2px;padding:3px;background:rgba(34,30,20,.85);border-radius:calc(var(--rsm)+3px);border:1px solid var(--border);margin-bottom:14px}
.tb{flex:1;padding:8px 5px;border-radius:var(--rsm);border:none;background:transparent;color:rgba(240,235,224,.38);font-family:var(--fb);font-size:12px;font-weight:600;cursor:none;transition:all .2s;text-align:center;letter-spacing:.1px;display:flex;align-items:center;justify-content:center;gap:5px}
.tb:hover{color:rgba(240,235,224,.65)}
.tb.on{background:rgba(240,235,224,.08);color:var(--cream);box-shadow:0 1px 4px rgba(0,0,0,.35)}

/* CARD */
.card{background:rgba(34,30,20,.75);border:1px solid var(--border);border-radius:var(--r);padding:20px;backdrop-filter:blur(10px);transition:border-color .22s}
.card:hover{border-color:var(--border2)}
.cl{font-family:var(--fd);font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:rgba(240,235,224,.28);margin-bottom:14px;display:flex;align-items:center;gap:8px}
.cl-line{flex:1;height:1px;background:rgba(240,235,224,.05)}

/* DIAGRAM CANVAS CARD */
.diagram-card{background:rgba(34,30,20,.75);border:1px solid var(--border);border-radius:var(--r);overflow:hidden;transition:border-color .22s}
.diagram-card:hover{border-color:var(--border2)}
.diagram-head{padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between}
.diagram-head-left{display:flex;align-items:center;gap:8px}
.diagram-title{font-family:var(--fd);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:rgba(240,235,224,.35)}
.diagram-svg-wrap{padding:20px;min-height:340px;display:flex;align-items:center;justify-content:center;position:relative}
.diagram-loading{display:flex;flex-direction:column;align-items:center;gap:14px;color:rgba(240,235,224,.3);font-size:13px}
.diagram-loading svg{animation:spin 2s linear infinite;opacity:.5}
@keyframes spin{to{transform:rotate(360deg)}}

/* SVG DIAGRAM STYLES */
.d-node{cursor:none;transition:all .2s}
.d-node:hover .d-rect{filter:brightness(1.2)}
.d-edge{stroke-dasharray:6 3;animation:dash 20s linear infinite}
@keyframes dash{to{stroke-dashoffset:-200}}

/* AI PROSE */
.ai-prose{font-weight:300;line-height:1.85;color:rgba(240,235,224,.72);font-size:14px}
.ai-prose h3{font-family:var(--fd);font-size:15px;font-weight:600;color:var(--cream);margin:16px 0 7px;letter-spacing:-.3px}
.ai-prose h3:first-child{margin-top:0}
.ai-prose p{margin-bottom:11px}
.ai-prose ul{padding-left:17px;margin-bottom:11px}
.ai-prose li{margin-bottom:4px}
.ai-prose strong{color:var(--cream);font-weight:600}

/* STEPS */
.steps{display:flex;flex-direction:column;gap:9px}
.step{display:flex;align-items:flex-start;gap:13px;padding:13px 15px;border-radius:var(--rsm);border:1px solid rgba(240,235,224,.06);background:rgba(240,235,224,.025);cursor:none;transition:all .2s;position:relative;overflow:hidden}
.step::before{content:'';position:absolute;left:0;top:0;bottom:0;width:0;background:linear-gradient(180deg,var(--rust),var(--moss));transition:width .28s}
.step:hover{border-color:rgba(240,235,224,.11);transform:translateX(2px)}
.step:hover::before,.step.done::before{width:3px}
.step.done{background:rgba(61,90,62,.1);border-color:rgba(61,90,62,.18)}
.step-n{width:25px;height:25px;border-radius:7px;flex-shrink:0;border:1px solid rgba(240,235,224,.1);display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:11px;font-weight:700;color:rgba(240,235,224,.35);transition:all .2s}
.step.done .step-n{border-color:rgba(61,90,62,.4);color:var(--sage);background:rgba(61,90,62,.13)}
.step-body{flex:1}
.step-t{font-size:13px;font-weight:600;margin-bottom:2px}
.step-d{font-size:12px;color:rgba(240,235,224,.38);line-height:1.5}

/* CHAT */
.chat-box{display:flex;flex-direction:column;height:390px}
.chat-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:9px}
.cm{display:flex;gap:8px;align-items:flex-start}
.cm.me{flex-direction:row-reverse}
.cm-av{width:26px;height:26px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700}
.cm.ai .cm-av{background:linear-gradient(135deg,var(--moss),var(--rust));color:white}
.cm.me .cm-av{background:rgba(240,235,224,.1);color:rgba(240,235,224,.45)}
.cm-bub{padding:9px 13px;border-radius:11px;max-width:80%;font-size:13px;line-height:1.55}
.cm.ai .cm-bub{background:rgba(240,235,224,.055);border:1px solid var(--border);color:rgba(240,235,224,.7);border-radius:3px 11px 11px 11px}
.cm.me .cm-bub{background:var(--rust);color:white;border-radius:11px 3px 11px 11px}
.chat-in{display:flex;gap:7px;padding:11px 14px;border-top:1px solid rgba(240,235,224,.05)}
.chat-f{flex:1;background:rgba(240,235,224,.05);border:1px solid rgba(240,235,224,.08);border-radius:8px;padding:8px 13px;color:var(--cream);font-family:var(--fb);font-size:13px;outline:none;transition:border-color .2s}
.chat-f:focus{border-color:rgba(196,82,42,.38)}
.chat-f::placeholder{color:rgba(240,235,224,.18)}
.chat-send{width:34px;height:34px;border-radius:8px;border:none;background:var(--rust);color:white;cursor:none;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
.chat-send:hover:not(:disabled){background:var(--rust2);transform:scale(1.06)}
.chat-send:disabled{opacity:.38}

/* RESOURCE / OPP / TAG */
.res{display:flex;align-items:center;gap:11px;padding:10px 13px;border-radius:var(--rsm);border:1px solid rgba(240,235,224,.06);background:rgba(240,235,224,.025);cursor:none;transition:all .2s;margin-bottom:7px;text-decoration:none}
.res:last-child{margin-bottom:0}
.res:hover{border-color:rgba(240,235,224,.13);transform:translateX(2px)}
.res-ico{color:var(--rust2);flex-shrink:0}
.res-n{font-size:13px;font-weight:600;color:var(--cream)}
.res-t{font-size:11px;color:rgba(240,235,224,.3);margin-top:1px}
.tags{display:flex;flex-wrap:wrap;gap:6px}
.tag{padding:5px 11px;border-radius:5px;font-size:11px;font-weight:600;border:1px solid rgba(240,235,224,.07);background:rgba(240,235,224,.035);color:rgba(240,235,224,.45);cursor:none;transition:all .2s}
.tag:hover{transform:scale(1.04)}
.tag.hot{border-color:rgba(196,82,42,.28);color:var(--rust2);background:rgba(196,82,42,.07)}
.tag.grow{border-color:rgba(61,90,62,.35);color:var(--sage);background:rgba(61,90,62,.08)}
.opp{display:flex;align-items:flex-start;gap:11px;padding:12px 14px;border-radius:var(--rsm);border:1px solid rgba(240,235,224,.06);background:rgba(240,235,224,.025);margin-bottom:8px;cursor:none;transition:all .2s}
.opp:hover{border-color:rgba(240,235,224,.11)}
.opp-ico{color:var(--gold);margin-top:2px;flex-shrink:0}
.opp-t{font-size:13px;font-weight:600;margin-bottom:2px}
.opp-m{font-size:11px;color:rgba(240,235,224,.32)}
.badge{display:inline-block;margin-top:5px;padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700}
.badge.remote{background:rgba(61,90,62,.13);color:var(--sage);border:1px solid rgba(61,90,62,.22)}
.badge.free{background:rgba(201,168,76,.1);color:var(--gold);border:1px solid rgba(201,168,76,.22)}

/* DECISION */
.dt-q{padding:13px 16px;border-radius:var(--rsm);margin-bottom:7px;border:1px solid rgba(196,82,42,.22);background:rgba(196,82,42,.055);font-size:14px;font-weight:500;display:flex;align-items:flex-start;gap:9px}
.dt-a{padding:10px 15px;border-radius:var(--rsm);margin-bottom:6px;border:1px solid rgba(240,235,224,.07);background:rgba(240,235,224,.025);font-size:13px;color:rgba(240,235,224,.5);cursor:none;display:flex;align-items:center;gap:9px;transition:all .2s}
.dt-a:hover{border-color:rgba(201,168,76,.32);color:var(--cream);background:rgba(201,168,76,.06)}
.dt-done{padding:12px 15px;border-radius:var(--rsm);margin-bottom:7px;border:1px solid rgba(61,90,62,.25);background:rgba(61,90,62,.07);font-size:13px;color:var(--sage);display:flex;align-items:center;gap:7px}

/* LOADING */
.ld{display:flex;align-items:center;gap:5px;padding:14px}
.ldd{width:7px;height:7px;border-radius:50%;background:var(--rust);animation:ldA 1.4s ease-in-out infinite}
.ldd:nth-child(2){animation-delay:.2s}.ldd:nth-child(3){animation-delay:.4s}
@keyframes ldA{0%,80%,100%{transform:scale(.5);opacity:.3}40%{transform:scale(1);opacity:1}}

/* COMMUNITY */
.pg-t{font-family:var(--fd);font-size:clamp(26px,4vw,38px);font-weight:700;letter-spacing:-1.5px;margin-bottom:5px}
.pg-s{color:rgba(240,235,224,.38);font-size:14px;font-weight:300;margin-bottom:28px}
.filters{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:22px}
.fc{display:flex;align-items:center;gap:6px;padding:6px 13px;border-radius:100px;border:1px solid rgba(240,235,224,.07);background:rgba(240,235,224,.035);color:rgba(240,235,224,.4);font-size:12px;font-weight:600;cursor:none;transition:all .2s}
.fc:hover{color:var(--cream);border-color:rgba(240,235,224,.16)}
.fc.on{background:rgba(196,82,42,.13);border-color:rgba(196,82,42,.3);color:var(--rust2)}
.sg{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:13px}
.sc{background:rgba(34,30,20,.75);border:1px solid var(--border);border-radius:var(--r);padding:19px;cursor:none;transition:all .24s;position:relative;overflow:hidden}
.sc::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(196,82,42,.03),rgba(61,90,62,.03));opacity:0;transition:opacity .24s}
.sc:hover{border-color:var(--border2);transform:translateY(-3px);box-shadow:0 10px 36px rgba(0,0,0,.38)}
.sc:hover::after{opacity:1}
.sc-chip{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:4px;margin-bottom:11px;font-size:10px;font-weight:700;letter-spacing:.4px;background:rgba(196,82,42,.1);color:var(--rust2);border:1px solid rgba(196,82,42,.18)}
.sc-top{display:flex;align-items:center;gap:9px;margin-bottom:11px}
.sc-av{width:32px;height:32px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:white}
.sc-nm{font-size:12px;font-weight:700}
.sc-cx{font-size:10px;color:rgba(240,235,224,.3)}
.sc-out{display:inline-flex;align-items:center;gap:4px;padding:3px 8px;border-radius:4px;font-size:10px;font-weight:700;background:rgba(61,90,62,.13);color:var(--sage);border:1px solid rgba(61,90,62,.22);margin-left:auto}
.sc-title{font-family:var(--fd);font-size:14px;font-weight:600;margin-bottom:7px;line-height:1.3;letter-spacing:-.2px}
.sc-text{font-size:13px;color:rgba(240,235,224,.47);line-height:1.7;margin-bottom:13px;font-weight:300}
.sc-foot{display:flex;align-items:center;gap:11px;font-size:12px;color:rgba(240,235,224,.22)}
.like-btn{display:flex;align-items:center;gap:5px;cursor:none;transition:color .2s}
.like-btn:hover,.like-btn.on{color:var(--rust2)}

/* SKILLS */
.skgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(175px,1fr));gap:9px;margin-bottom:26px}
.skcard{background:rgba(34,30,20,.75);border:1px solid var(--border);border-radius:var(--r);padding:17px;cursor:none;transition:all .24s;position:relative;overflow:hidden}
.skcard::before{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:var(--ac,var(--rust));transform:scaleX(0);transition:transform .28s;transform-origin:left}
.skcard:hover{border-color:var(--border2);transform:translateY(-3px);box-shadow:0 9px 30px rgba(0,0,0,.36)}
.skcard:hover::before{transform:scaleX(1)}
.sk-ico{color:var(--ac,var(--rust2));margin-bottom:9px}
.sk-nm{font-family:var(--fd);font-size:12px;font-weight:600;margin-bottom:3px}
.sk-lv{font-size:10px;margin-bottom:9px;font-weight:700}
.sk-lv.hot{color:var(--rust2)}.sk-lv.emerging{color:var(--sage)}.sk-lv.growing{color:var(--gold)}.sk-lv.steady{color:rgba(240,235,224,.3)}
.sk-bar{height:3px;background:rgba(240,235,224,.07);border-radius:2px;overflow:hidden}
.sk-fill{height:100%;border-radius:2px;background:var(--ac,var(--rust))}
.skcard.sk-active{border-color:var(--ac,var(--rust))!important;background:rgba(196,82,42,.08)!important}
@keyframes spin{to{transform:rotate(360deg)}}
.search-bar{width:100%;max-width:320px;background:rgba(240,235,224,.05);border:1px solid rgba(240,235,224,.08);border-radius:100px;padding:9px 17px;color:var(--cream);font-family:var(--fb);font-size:13px;outline:none;transition:border-color .2s;margin-bottom:22px}
.search-bar:focus{border-color:rgba(196,82,42,.32)}
.search-bar::placeholder{color:rgba(240,235,224,.2)}
.ai-guide-panel{margin-top:22px;background:rgba(34,30,20,.75);border:1px solid var(--border);border-radius:var(--r);padding:20px;animation:rise .35s ease}

/* BACK */
.back{display:inline-flex;align-items:center;gap:6px;padding:8px 15px;border-radius:100px;border:1px solid rgba(240,235,224,.09);background:transparent;color:rgba(240,235,224,.45);font-size:13px;font-weight:500;cursor:none;transition:all .2s;margin-bottom:22px;font-family:var(--fb)}
.back:hover{color:var(--cream);background:rgba(240,235,224,.05)}

/* ── FEEDBACK MODAL ── */
.modal-backdrop{position:fixed;inset:0;z-index:800;background:rgba(15,13,9,.75);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:24px;animation:rise .25s ease}
.modal{background:var(--s2);border:1px solid var(--border2);border-radius:calc(var(--r) + 4px);padding:32px;width:100%;max-width:460px;position:relative;box-shadow:0 24px 80px rgba(0,0,0,.6)}
.modal-close{position:absolute;top:16px;right:16px;width:30px;height:30px;border-radius:8px;border:none;background:rgba(240,235,224,.06);color:rgba(240,235,224,.5);cursor:none;display:flex;align-items:center;justify-content:center;transition:all .2s}
.modal-close:hover{background:rgba(240,235,224,.11);color:var(--cream)}
.modal-title{font-family:var(--fd);font-size:22px;font-weight:700;letter-spacing:-.5px;margin-bottom:6px}
.modal-sub{font-size:13px;color:rgba(240,235,224,.4);font-weight:300;margin-bottom:24px}
.f-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:rgba(240,235,224,.35);margin-bottom:8px;display:block}
.f-input,.f-ta{width:100%;background:rgba(240,235,224,.05);border:1px solid rgba(240,235,224,.09);border-radius:var(--rsm);padding:11px 14px;color:var(--cream);font-family:var(--fb);font-size:14px;outline:none;transition:border-color .2s;margin-bottom:16px}
.f-ta{min-height:100px;resize:none;line-height:1.6;font-weight:300}
.f-input:focus,.f-ta:focus{border-color:rgba(196,82,42,.4)}
.f-input::placeholder,.f-ta::placeholder{color:rgba(240,235,224,.18)}
.stars{display:flex;gap:6px;margin-bottom:20px}
.star-btn{background:none;border:none;cursor:none;color:rgba(240,235,224,.2);transition:color .15s,transform .15s}
.star-btn.on,.star-btn:hover{color:var(--gold2)}
.star-btn.on{transform:scale(1.15)}
.f-row{display:flex;gap:10px}
.btn-sub{flex:1;padding:12px;border-radius:var(--rsm);border:none;background:linear-gradient(135deg,var(--rust),var(--rust2));color:white;font-family:var(--fd);font-size:14px;font-weight:600;cursor:none;transition:all .22s}
.btn-sub:hover{transform:translateY(-1px);box-shadow:0 5px 20px rgba(196,82,42,.4)}
.btn-sub:disabled{opacity:.4}
.btn-cancel{padding:12px 18px;border-radius:var(--rsm);border:1px solid var(--border2);background:transparent;color:rgba(240,235,224,.5);font-family:var(--fb);font-size:13px;cursor:none;transition:all .2s}
.btn-cancel:hover{color:var(--cream);background:rgba(240,235,224,.05)}
.f-success{text-align:center;padding:16px 0 8px}
.f-success-icon{font-size:40px;margin-bottom:12px}
.f-success h3{font-family:var(--fd);font-size:20px;font-weight:700;margin-bottom:6px}
.f-success p{font-size:14px;color:rgba(240,235,224,.45);font-weight:300}

/* FEEDBACK NAV BTN */
.nav-feedback{display:flex;align-items:center;gap:6px;padding:7px 14px;border-radius:100px;border:1px solid rgba(240,235,224,.1);background:transparent;color:rgba(240,235,224,.5);font-family:var(--fb);font-size:12px;font-weight:600;cursor:none;transition:all .22s}
.nav-feedback:hover{border-color:rgba(196,82,42,.4);color:var(--rust2);background:rgba(196,82,42,.08)}
`;

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════════════ */
const CATS = [
  {id:"career",label:"Career",icon:"briefcase"},
  {id:"freelance",label:"Online Work",icon:"globe"},
  {id:"school",label:"School",icon:"academic"},
  {id:"skills",label:"Learn Skills",icon:"bolt"},
  {id:"finance",label:"Money",icon:"currency"},
  {id:"decision",label:"Life Decision",icon:"chart"},
  {id:"mental",label:"Burnout",icon:"heart"},
  {id:"business",label:"Business",icon:"fire"},
];

const SKILLS = [
  {name:"UI/UX Design",ico:"sparkles",demand:92,color:"#c4522a",lv:"Hot"},
  {name:"Data Analysis",ico:"chart",demand:95,color:"#e06540",lv:"Hot"},
  {name:"Web Dev",ico:"cpu",demand:88,color:"#7aae7e",lv:"Hot"},
  {name:"Copywriting",ico:"lightbulb",demand:75,color:"#c9a84c",lv:"Growing"},
  {name:"Video Editing",ico:"bolt",demand:80,color:"#c4522a",lv:"Hot"},
  {name:"SEO & Marketing",ico:"fire",demand:72,color:"#c9a84c",lv:"Growing"},
  {name:"Virtual Assistant",ico:"briefcase",demand:70,color:"#7aae7e",lv:"Steady"},
  {name:"AI Prompting",ico:"sparkles",demand:97,color:"#e06540",lv:"Emerging"},
  {name:"Social Media",ico:"users",demand:68,color:"#c9a84c",lv:"Steady"},
  {name:"Python / ML",ico:"cpu",demand:91,color:"#7aae7e",lv:"Hot"},
  {name:"Graphic Design",ico:"sparkles",demand:74,color:"#c4522a",lv:"Growing"},
  {name:"Project Mgmt",ico:"map",demand:83,color:"#c9a84c",lv:"Hot"},
];

const STORIES = [
  {id:1,av:"A",name:"Ana Reyes",ctx:"BPO → UX Designer",cat:"career",outcome:"Hired in 6 months",title:"From call center night shifts to UX Designer with zero design background",text:"I was stuck on night shifts for 3 years feeling completely lost. The roadmap diagram showed me a clear visual path — I could literally see the route from where I was to where I wanted to go. It helped me realize my customer service skills were actually valuable for UX research. Built a portfolio in 90 days, landed my first UX role.",likes:342,time:"2 weeks ago"},
  {id:2,av:"J",name:"Juan Miguel",ctx:"College dropout → Freelance Dev",cat:"freelance",outcome:"$2k/month",title:"Dropped out and built a freelance career from scratch in the Philippines",text:"The architecture framework this generated was mind-blowing. It mapped out exactly which skills unlocked which opportunities — like a tech tree in a video game. I followed the WordPress → freelance pathway and got my first $300 project within 2 months.",likes:289,time:"1 month ago"},
  {id:3,av:"S",name:"Sofia Chen",ctx:"Burned out teacher → EdTech Creator",cat:"mental",outcome:"Found purpose",title:"I was about to quit teaching. This helped me pivot without losing my identity.",text:"The path diagram showed me I didn't want to leave education — I needed to find a different shape for it. Seeing the visual map of pivot paths made it click in a way that reading advice never did. Now I create educational content and tutor online.",likes:198,time:"3 weeks ago"},
  {id:4,av:"M",name:"Marco Santos",ctx:"OFW → Remote PM",cat:"skills",outcome:"Stayed with family",title:"Replaced my OFW salary with remote work and finally came home",text:"After 8 years abroad I wanted to come home. The path diagram literally showed me a bridge from construction coordination to remote project management. I got PMP certified and now earn in dollars from my living room.",likes:412,time:"5 days ago"},
  {id:5,av:"R",name:"Ria Dela Cruz",ctx:"Fresh grad → Content Strategist",cat:"career",outcome:"Remote job in 3 months",title:"Mass comm grad with no connections — how I got a remote job fast",text:"Seeing my situation mapped out as an architecture diagram made everything feel less overwhelming. The visual showed content strategy as a high-demand niche perfectly shaped for my skills. I followed the exact path, built a portfolio, landed a fully remote role.",likes:156,time:"1 week ago"},
  {id:6,av:"K",name:"Karl Santos",ctx:"IT support → AI Engineer",cat:"skills",outcome:"Doubled income",title:"IT support to AI engineering in under a year",text:"The skill tree diagram showed me that Python and ML were buildable from my existing knowledge with a clear visual path. Following the 6-month plan step by step, I now work at a startup building AI tools.",likes:503,time:"2 days ago"},
];

const FEEDS = [
  "Someone in Cebu just mapped their career path",
  "A new community story was shared",
  "47 people solved a life problem this hour",
  "A designer shared their pivot story from Manila",
  "Someone completed their 6-step roadmap",
  "New skill guide: AI Prompting 2026",
  "12 people started their path diagram this minute",
];

/* ═══════════════════════════════════════════════════════════════════════════
   API
══════════════════════════════════════════════════════════════════════════ */
async function callAI(messages, system) {
  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({model:"claude-sonnet-4-20250514", max_tokens:1000, system, messages}),
  });
  const d = await r.json();
  if (!r.ok) throw new Error(d.error?.message || "API error");
  return d.content[0]?.text || "";
}

function renderMD(t) {
  return t
    .replace(/^###\s(.+)$/gm,"<h3>$1</h3>")
    .replace(/^##\s(.+)$/gm,"<h3>$1</h3>")
    .replace(/^#\s(.+)$/gm,"<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")
    .replace(/^-\s(.+)$/gm,"<li>$1</li>")
    .replace(/(<li>.*<\/li>\n?)+/g,m=>`<ul>${m}</ul>`)
    .replace(/\n\n+/g,"</p><p>")
    .replace(/^(?!<)/gm,"")
    .replace(/([^>])$/gm,(m)=>m.startsWith("<")?m:`<p>${m}</p>`);
}

/* ═══════════════════════════════════════════════════════════════════════════
   PATH DIAGRAM — AI-generated SVG architecture of the user's journey
══════════════════════════════════════════════════════════════════════════ */
function PathDiagram({ diagramData, loading }) {
  if (loading) {
    return (
      <div className="diagram-loading">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--rust)" strokeWidth="2">
          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
        <span>Building your path diagram…</span>
      </div>
    );
  }
  if (!diagramData) return null;

  const { nodes = [], edges = [] } = diagramData;
  const W = 700, H = 360;

  const NODE_COLORS = {
    start:  { fill:"#3d5a3e", stroke:"#7aae7e", text:"#c8f0ca" },
    step:   { fill:"#2c2618", stroke:"#c4522a", text:"#f0ebe0" },
    skill:  { fill:"#1e1c14", stroke:"#c9a84c", text:"#e8d890" },
    goal:   { fill:"#4a1a0a", stroke:"#e06540", text:"#ffd0b0" },
    option: { fill:"#1a1e26", stroke:"#5a7ab0", text:"#b0c8f0" },
  };

  const rw = 130, rh = 44, rx = 10;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",maxHeight:360,overflow:"visible"}}>
      <defs>
        <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="rgba(196,82,42,0.6)"/>
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="glow-gold">
          <feGaussianBlur stdDeviation="4" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map((e, i) => {
        const from = nodes.find(n => n.id === e.from);
        const to = nodes.find(n => n.id === e.to);
        if (!from || !to) return null;
        const x1 = from.x + rw / 2, y1 = from.y + rh / 2;
        const x2 = to.x - rw / 2, y2 = to.y + rh / 2;
        const mx = (x1 + x2) / 2;
        return (
          <g key={i}>
            <path
              d={`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`}
              fill="none" stroke="rgba(196,82,42,0.25)" strokeWidth="1.5"
              strokeDasharray="5 3" markerEnd="url(#arr)"
              className="d-edge"
              style={{animationDelay:`${i * 0.5}s`}}
            />
            {e.label && (
              <text x={mx} y={(y1+y2)/2-6} textAnchor="middle" fill="rgba(201,168,76,0.6)" fontSize="9" fontFamily="Cabinet Grotesk">{e.label}</text>
            )}
          </g>
        );
      })}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const c = NODE_COLORS[n.type] || NODE_COLORS.step;
        const isGoal = n.type === "goal";
        return (
          <g key={n.id} className="d-node" transform={`translate(${n.x - rw/2},${n.y - rh/2})`}
             style={{animation:`rise .5s ${i*0.12}s ease both`}}>
            <rect className="d-rect" width={rw} height={rh} rx={rx}
              fill={c.fill} stroke={c.stroke} strokeWidth={isGoal ? 1.5 : 1}
              filter={isGoal ? "url(#glow-gold)" : "url(#glow)"}
            />
            {n.phase && (
              <text x={rw/2} y={12} textAnchor="middle" fill={c.stroke} fontSize="8"
                fontFamily="Clash Display" fontWeight="700" letterSpacing="1" opacity="0.7">
                {n.phase}
              </text>
            )}
            <text x={rw/2} y={n.phase ? 26 : 21} textAnchor="middle" fill={c.text}
              fontSize="11" fontFamily="Clash Display" fontWeight="600">
              {n.label.length > 16 ? n.label.slice(0,15)+"…" : n.label}
            </text>
            {n.sublabel && (
              <text x={rw/2} y={n.phase ? 36 : 34} textAnchor="middle"
                fill={c.text} fontSize="8.5" fontFamily="Cabinet Grotesk" opacity="0.55">
                {n.sublabel.length > 18 ? n.sublabel.slice(0,17)+"…" : n.sublabel}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BG CANVAS
══════════════════════════════════════════════════════════════════════════ */
function BgCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    let W, H, pts = [], raf;
    const resize = () => { W = cv.width = window.innerWidth; H = cv.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    for (let i = 0; i < 50; i++) pts.push({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-.5)*.22, vy: (Math.random()-.5)*.22,
      r: Math.random()*1.6+.3,
      c: `hsl(${Math.random()*40+10},${Math.random()*25+20}%,${Math.random()*18+38}%)`
    });
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      pts.forEach(p => {
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=p.c; ctx.fill();
      });
      pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{
        const dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy);
        if(d<115){ ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
          ctx.strokeStyle=`rgba(138,127,110,${(1-d/115)*.18})`; ctx.lineWidth=.5; ctx.stroke(); }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} id="bgc"/>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   CURSOR
══════════════════════════════════════════════════════════════════════════ */
function Cursor() {
  const cr = useRef(null), tr = useRef(null);
  useEffect(() => {
    const c=cr.current, t=tr.current; if(!c||!t) return;
    let tx=0,ty=0;
    const mv=(e)=>{ tx=e.clientX; ty=e.clientY; c.style.left=tx+"px"; c.style.top=ty+"px"; };
    const loop=()=>{ t.style.left=tx+"px"; t.style.top=ty+"px"; requestAnimationFrame(loop); };
    const big=()=>c.classList.add("big"), sm=()=>c.classList.remove("big");
    document.addEventListener("mousemove",mv);
    document.querySelectorAll("button,a").forEach(el=>{ el.addEventListener("mouseenter",big); el.addEventListener("mouseleave",sm); });
    requestAnimationFrame(loop);
    return()=>document.removeEventListener("mousemove",mv);
  },[]);
  return <><div id="cur" ref={cr}/><div id="cur-ring" ref={tr}/></>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   LIVE FEED
══════════════════════════════════════════════════════════════════════════ */
function LiveFeed() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const show = () => {
      const msg = FEEDS[Math.floor(Math.random()*FEEDS.length)];
      const id = Date.now();
      setItems(p => [...p.slice(-2), {id, msg}]);
      setTimeout(() => setItems(p => p.filter(i => i.id !== id)), 4300);
    };
    show();
    const t = setInterval(show, 7500 + Math.random()*4000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="live-feed">
      {items.map(i => (
        <div key={i.id} className="lf"><div className="lf-dot"/>{i.msg}</div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COUNTER
══════════════════════════════════════════════════════════════════════════ */
function Counter({target, suffix=""}) {
  const [n,setN]=useState(0); const ref=useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ let s=0; const step=target/60;
        const t=setInterval(()=>{ s=Math.min(s+step,target); setN(Math.round(s)); if(s>=target) clearInterval(t); },18); }
    },{threshold:.5});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[target]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

const Dots = () => <div className="ld"><div className="ldd"/><div className="ldd"/><div className="ldd"/></div>;

/* ═══════════════════════════════════════════════════════════════════════════
   FEEDBACK MODAL
══════════════════════════════════════════════════════════════════════════ */
function FeedbackModal({ onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("general");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!msg.trim()) return;
    setBusy(true);
    await new Promise(r => setTimeout(r, 800));
    setDone(true);
    setBusy(false);
  };

  return (
    <div className="modal-backdrop" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}><Icon name="xmark" size={14}/></button>
        {done ? (
          <div className="f-success">
            <div className="f-success-icon">🌱</div>
            <h3>Thank you!</h3>
            <p>Your feedback helps us grow LifePath into something genuinely useful for everyone.</p>
          </div>
        ) : (
          <>
            <div className="modal-title">Share your thoughts</div>
            <div className="modal-sub">Tell us what's working, what isn't, or what you wish existed.</div>

            <label className="f-label">Type of feedback</label>
            <div className="chips" style={{marginBottom:18}}>
              {["general","bug","feature","content"].map(t=>(
                <button key={t} className={`chip${type===t?" on":""}`} onClick={()=>setType(t)} style={{fontSize:11}}>
                  {t.charAt(0).toUpperCase()+t.slice(1)}
                </button>
              ))}
            </div>

            <label className="f-label">Your experience (optional)</label>
            <div className="stars" onMouseLeave={()=>setHover(0)}>
              {[1,2,3,4,5].map(s=>(
                <button key={s} className={`star-btn${s<=(hover||rating)?" on":""}`}
                  onClick={()=>setRating(s)} onMouseEnter={()=>setHover(s)}>
                  <Icon name="star" size={22} fill={s<=(hover||rating)?"var(--gold2)":"none"} stroke={s<=(hover||rating)?"var(--gold2)":"currentColor"}/>
                </button>
              ))}
            </div>

            <label className="f-label">Your name (optional)</label>
            <input className="f-input" placeholder="e.g. Ana" value={name} onChange={e=>setName(e.target.value)}/>

            <label className="f-label">Your message</label>
            <textarea className="f-ta" placeholder="What did you think? What could be better? What helped you most?" value={msg} onChange={e=>setMsg(e.target.value)}/>

            <div className="f-row">
              <button className="btn-cancel" onClick={onClose}>Cancel</button>
              <button className="btn-sub" onClick={submit} disabled={busy||!msg.trim()}>
                {busy ? <Dots/> : "Send Feedback"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   AI CHAT
══════════════════════════════════════════════════════════════════════════ */
function Chat({ context }) {
  const [msgs,setMsgs]=useState([{r:"ai",t:"I've studied your situation. Ask me anything — I'm here to help you think through it."}]);
  const [inp,setInp]=useState(""); const [busy,setBusy]=useState(false);
  const endRef=useRef(null);
  useEffect(()=>endRef.current?.scrollIntoView({behavior:"smooth"}),[msgs]);
  const send=async()=>{
    if(!inp.trim()||busy) return;
    const q=inp.trim(); setInp(""); setBusy(true);
    setMsgs(p=>[...p,{r:"me",t:q}]);
    try{
      const hist=msgs.map(m=>({role:m.r==="ai"?"assistant":"user",content:m.t}));
      hist.push({role:"user",content:q});
      const reply=await callAI(hist,`You are a warm, insightful life coach on LifePath. User's situation: "${context}". Give concise, actionable, human advice. Max 3 short paragraphs.`);
      setMsgs(p=>[...p,{r:"ai",t:reply}]);
    } catch { setMsgs(p=>[...p,{r:"ai",t:"Connection issue — please try again."}]); }
    setBusy(false);
  };
  return (
    <div className="chat-box">
      <div className="chat-msgs">
        {msgs.map((m,i)=>(
          <div key={i} className={`cm ${m.r==="ai"?"ai":"me"}`}>
            <div className="cm-av">{m.r==="ai"?<Icon name="sparkles" size={11}/>:"Me"}</div>
            <div className="cm-bub">{m.t}</div>
          </div>
        ))}
        {busy&&<div className="cm ai"><div className="cm-av"><Icon name="sparkles" size={11}/></div><div className="cm-bub"><Dots/></div></div>}
        <div ref={endRef}/>
      </div>
      <div className="chat-in">
        <input className="chat-f" placeholder="Ask your life guide…" value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}/>
        <button className="chat-send" onClick={send} disabled={busy||!inp.trim()}><Icon name="send" size={13}/></button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO PAGE
══════════════════════════════════════════════════════════════════════════ */
function HeroPage({ onSolve }) {
  const [prob,setProb]=useState(""); const [cat,setCat]=useState(null); const [busy,setBusy]=useState(false);

  const go = async () => {
    if (prob.trim().length < 20 || busy) return;
    setBusy(true);
    try {
      const sys = `You are a world-class life coach AI on LifePath. Respond ONLY with valid JSON and absolutely nothing else — no markdown fences:
{
  "summary": "2-sentence empathetic reframing",
  "insight": "the core insight",
  "steps": [{"title":"...","desc":"..."}],
  "skills": ["skill1","skill2","skill3","skill4"],
  "resources": [{"name":"...","type":"...","icon":"globe","url":"#"}],
  "opportunities": [{"title":"...","meta":"...","icon":"bolt","badge":"remote"}],
  "decisionTree": [{"question":"...","answers":["...","...","..."]}],
  "guidanceText": "3-4 paragraphs with ## headers and - bullets",
  "diagram": {
    "nodes": [
      {"id":"n1","type":"start","label":"Where You Are","sublabel":"Current situation","x":80,"y":180},
      {"id":"n2","type":"step","label":"Step name","sublabel":"short desc","x":250,"y":100,"phase":"MONTH 1"},
      {"id":"n3","type":"step","label":"Step name","sublabel":"short desc","x":250,"y":260,"phase":"MONTH 1"},
      {"id":"n4","type":"skill","label":"Key Skill","sublabel":"learn this","x":430,"y":100,"phase":"MONTH 2-3"},
      {"id":"n5","type":"skill","label":"Key Skill","sublabel":"learn this","x":430,"y":260,"phase":"MONTH 2-3"},
      {"id":"n6","type":"option","label":"Path A","sublabel":"option","x":600,"y":130,"phase":"MONTH 4+"},
      {"id":"n7","type":"option","label":"Path B","sublabel":"option","x":600,"y":230,"phase":"MONTH 4+"},
      {"id":"n8","type":"goal","label":"Your Goal","sublabel":"end state","x":760,"y":180,"phase":"GOAL"}
    ],
    "edges": [
      {"from":"n1","to":"n2","label":""},
      {"from":"n1","to":"n3","label":""},
      {"from":"n2","to":"n4","label":""},
      {"from":"n3","to":"n5","label":""},
      {"from":"n4","to":"n6","label":""},
      {"from":"n5","to":"n7","label":""},
      {"from":"n6","to":"n8","label":""},
      {"from":"n7","to":"n8","label":""}
    ]
  }
}
Make diagram nodes fully relevant to the user's specific situation (real skill names, real step names, real goal). Use x coordinates from 60 to 760 spread across the 700px width. y from 60 to 300. Make 6-8 realistic steps total.`;

      const raw = await callAI([{role:"user",content:`My situation: ${prob}\nCategory: ${cat||"general"}`}], sys);
      let data;
      try { data = JSON.parse(raw.replace(/```json|```/g,"").trim()); }
      catch {
        data = {
          summary:"Your personalized roadmap is ready.", insight:"You're facing something many people have overcome with the right structure.",
          guidanceText: raw,
          steps:[{title:"Clarify your exact goal",desc:"Write down what success looks like in 90 days."},{title:"Audit your current assets",desc:"List skills, time, tools, and connections you have."},{title:"Find your single biggest blocker",desc:"What one thing is stopping progress the most?"},{title:"Take one micro-action today",desc:"Do something small but real within 24 hours."},{title:"Build your support circle",desc:"Find 1-2 people who have done what you want."},{title:"Set a 30-day checkpoint",desc:"Define what progress looks like in one month."}],
          skills:["Critical thinking","Self-direction","Research","Communication"],
          resources:[{name:"Coursera",type:"Learning Platform",icon:"academic",url:"https://coursera.org"},{name:"LinkedIn",type:"Professional Network",icon:"briefcase",url:"https://linkedin.com"}],
          opportunities:[{title:"Entry-level opportunities",meta:"Start building experience",icon:"bolt",badge:"remote"}],
          decisionTree:[{question:"What matters most right now?",answers:["Financial stability","Career growth","Work-life balance"]}],
          diagram:{
            nodes:[
              {id:"n1",type:"start",label:"Where You Are",sublabel:"Current state",x:80,y:180},
              {id:"n2",type:"step",label:"Clarify Goal",sublabel:"Define success",x:240,y:100,phase:"WEEK 1"},
              {id:"n3",type:"step",label:"Audit Skills",sublabel:"What you have",x:240,y:260,phase:"WEEK 1"},
              {id:"n4",type:"skill",label:"Core Skill #1",sublabel:"Learn & practice",x:420,y:100,phase:"MONTH 1-2"},
              {id:"n5",type:"skill",label:"Core Skill #2",sublabel:"Build portfolio",x:420,y:260,phase:"MONTH 1-2"},
              {id:"n6",type:"option",label:"Path A",sublabel:"Option one",x:590,y:130,phase:"MONTH 3+"},
              {id:"n7",type:"option",label:"Path B",sublabel:"Option two",x:590,y:230,phase:"MONTH 3+"},
              {id:"n8",type:"goal",label:"Your Goal",sublabel:"Target outcome",x:750,y:180,phase:"GOAL"},
            ],
            edges:[
              {from:"n1",to:"n2"},{from:"n1",to:"n3"},
              {from:"n2",to:"n4"},{from:"n3",to:"n5"},
              {from:"n4",to:"n6"},{from:"n5",to:"n7"},
              {from:"n6",to:"n8"},{from:"n7",to:"n8"},
            ]
          }
        };
      }
      onSolve({ prob, cat, data });
    } catch(e) { console.error(e); }
    setBusy(false);
  };

  const TICKS = ["48,291 problems solved","Career pivots","Freelance starts","Burnout recovery","Skill roadmaps","94% felt clearer","Life decisions made","Path diagrams generated"];

  return (
    <div className="hero">
      <div className="blob b1"/><div className="blob b2"/><div className="blob b3"/>
      <div className="eyebrow"><div className="ldot"/>AI-powered · Visual path diagrams · Free forever</div>
      <h1 className="hero-h1">Your life problems,<br/>finally <em>mapped</em></h1>
      <p className="hero-sub">Describe any real situation. Get a structured AI roadmap <em style={{fontFamily:"var(--fs)",color:"var(--gold)"}}>and a visual path diagram</em> built specifically for you.</p>

      <div className="ic-shell">
        <div className="ic">
          <div className="chips">
            {CATS.map(c=>(
              <button key={c.id} className={`chip${cat===c.id?" on":""}`} onClick={()=>setCat(c.id)}>
                <Icon name={c.icon} size={12}/> {c.label}
              </button>
            ))}
          </div>
          <textarea className="ta"
            placeholder="Example: I'm 24, Business Admin grad, no job in my field, considering freelancing. I don't know where to start or what skills to focus on…"
            value={prob} onChange={e=>setProb(e.target.value.slice(0,1000))}/>
          <div className="ifoot">
            <span className="ihint">More detail → better diagram · {prob.length}/1000</span>
            <button className="btn-go" onClick={go} disabled={busy||prob.trim().length<20}>
              {busy ? <Dots/> : <><Icon name="diagramNode" size={15}/>Build My Path</>}
            </button>
          </div>
        </div>
      </div>

      <div className="ticker-wrap" style={{maxWidth:680}}>
        <div className="ticker-track">
          {[...TICKS,...TICKS].map((t,i)=>(
            <span key={i} className="ti"><span className="ti-sep">◆</span><strong>{t}</strong></span>
          ))}
        </div>
      </div>

      <div className="stats">
        {[{n:48291,s:"",l:"Problems Solved"},{n:94,s:"%",l:"Felt Clearer After"},{n:12040,s:"",l:"Path Diagrams Built"}].map(st=>(
          <div key={st.l} className="sb">
            <div className="sn"><Counter target={st.n} suffix={st.s}/></div>
            <div className="sl">{st.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SOLUTION PAGE
══════════════════════════════════════════════════════════════════════════ */
function SolPage({ session, onBack }) {
  const {prob,cat,data} = session;
  const [tab,setTab]=useState("diagram");
  const [done,setDone]=useState(new Set());
  const [ti,setTi]=useState(0);
  const catObj = CATS.find(c=>c.id===cat);
  const pct = data.steps ? Math.round((done.size/data.steps.length)*100) : 0;
  const tog = (i) => setDone(p=>{const n=new Set(p);n.has(i)?n.delete(i):n.add(i);return n;});
  const RICO = {globe:"globe",academic:"academic",briefcase:"briefcase",users:"users",bolt:"bolt",chart:"chart",lightbulb:"lightbulb",cpu:"cpu",fire:"fire"};

  return (
    <div className="page" style={{paddingTop:82}}>
      <button className="back" onClick={onBack}><Icon name="arrowLeft" size={14}/> Back</button>

      <div className="sol-head">
        <div className="sol-icon"><Icon name={catObj?.icon||"sparkles"} size={20}/></div>
        <div style={{flex:1}}>
          <div className="itag"><Icon name="sparkles" size={10}/> AI Analysis</div>
          <h2>{data.summary||"Your personalized roadmap is ready"}</h2>
          <p>{data.insight}</p>
        </div>
      </div>

      {data.steps&&(
        <div className="prog">
          <div className="prog-l"><span>Roadmap Progress</span><span>{done.size}/{data.steps.length} steps · {pct}%</span></div>
          <div className="prog-track"><div className="prog-fill" style={{width:`${pct}%`}}/></div>
        </div>
      )}

      <div className="sol-grid">
        <div className="sol-main">
          <div className="tbbar">
            {[
              {id:"diagram",l:"Path Diagram",ic:"diagramNode"},
              {id:"guide",l:"Guidance",ic:"lightbulb"},
              {id:"steps",l:"Action Plan",ic:"map"},
              {id:"chat",l:"AI Chat",ic:"chat"},
              {id:"decide",l:"Decide",ic:"chart"},
            ].map(t=>(
              <button key={t.id} className={`tb${tab===t.id?" on":""}`} onClick={()=>setTab(t.id)}>
                <Icon name={t.ic} size={12}/>{t.l}
              </button>
            ))}
          </div>

          {tab==="diagram"&&(
            <div className="diagram-card">
              <div className="diagram-head">
                <div className="diagram-head-left">
                  <Icon name="diagramNode" size={14} stroke="var(--rust2)"/>
                  <span className="diagram-title">Your Path Architecture</span>
                </div>
                <span style={{fontSize:10,color:"rgba(240,235,224,.25)",fontWeight:500,letterSpacing:.3}}>
                  Personalized for your situation
                </span>
              </div>
              <div className="diagram-svg-wrap">
                <PathDiagram diagramData={data.diagram} loading={false}/>
              </div>
              <div style={{padding:"0 20px 16px",display:"flex",gap:16,flexWrap:"wrap"}}>
                {[
                  {type:"start",label:"Your Start",color:"#7aae7e"},
                  {type:"step",label:"Action Steps",color:"#c4522a"},
                  {type:"skill",label:"Skills to Learn",color:"#c9a84c"},
                  {type:"option",label:"Path Options",color:"#5a7ab0"},
                  {type:"goal",label:"Your Goal",color:"#e06540"},
                ].map(l=>(
                  <div key={l.type} style={{display:"flex",alignItems:"center",gap:6,fontSize:11,color:"rgba(240,235,224,.4)"}}>
                    <div style={{width:10,height:10,borderRadius:3,background:l.color,opacity:.7}}/>
                    {l.label}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==="guide"&&(
            <div className="card">
              <div className="cl">In-Depth Guidance <div className="cl-line"/></div>
              {data.guidanceText
                ? <div className="ai-prose" dangerouslySetInnerHTML={{__html:renderMD(data.guidanceText)}}/>
                : <Dots/>}
            </div>
          )}

          {tab==="steps"&&data.steps&&(
            <div className="card">
              <div className="cl">Step-by-Step Plan <div className="cl-line"/></div>
              <div className="steps">
                {data.steps.map((s,i)=>(
                  <div key={i} className={`step${done.has(i)?" done":""}`} onClick={()=>tog(i)}>
                    <div className="step-n">{done.has(i)?<Icon name="check" size={11}/>:i+1}</div>
                    <div className="step-body">
                      <div className="step-t">{s.title}</div>
                      <div className="step-d">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab==="chat"&&(
            <div className="card" style={{padding:0,overflow:"hidden"}}>
              <div style={{padding:"18px 20px 0"}}>
                <div className="cl">Personal AI Life Guide <div className="cl-line"/></div>
              </div>
              <Chat context={prob}/>
            </div>
          )}

          {tab==="decide"&&data.decisionTree&&(
            <div className="card">
              <div className="cl">Decision Clarity <div className="cl-line"/></div>
              <p style={{fontSize:13,color:"rgba(240,235,224,.38)",marginBottom:16,fontWeight:300}}>Work through these to find your direction.</p>
              {data.decisionTree.slice(0,ti+1).map((node,i)=>(
                <div key={i}>
                  <div className="dt-q"><Icon name="lightbulb" size={14} stroke="var(--rust2)"/>{node.question}</div>
                  {i===ti&&node.answers?.map((a,j)=>(
                    <div key={j} className="dt-a" onClick={()=>setTi(Math.min(ti+1,data.decisionTree.length-1))}>
                      <Icon name="chevronRight" size={12} stroke="var(--gold)"/>{a}
                    </div>
                  ))}
                  {i<ti&&<div className="dt-done"><Icon name="check" size={12}/>Answered — moving forward</div>}
                  <div style={{height:7}}/>
                </div>
              ))}
              {ti>=data.decisionTree.length-1&&(
                <div className="dt-done" style={{justifyContent:"center",fontWeight:700}}>
                  <Icon name="check" size={13}/>Clarity achieved — check your Action Plan
                </div>
              )}
            </div>
          )}
        </div>

        <div className="sol-side">
          {data.skills&&(
            <div className="card">
              <div className="cl">Skills to Build <div className="cl-line"/></div>
              <div className="tags">
                {data.skills.map((s,i)=>(
                  <span key={i} className={`tag ${i<2?"hot":"grow"}`}>{s}</span>
                ))}
              </div>
            </div>
          )}
          {data.resources&&(
            <div className="card">
              <div className="cl">Resources <div className="cl-line"/></div>
              {data.resources.map((r,i)=>(
                <a key={i} href={r.url||"#"} target="_blank" rel="noopener noreferrer" className="res">
                  <span className="res-ico"><Icon name={RICO[r.icon]||"globe"} size={15}/></span>
                  <div style={{flex:1}}>
                    <div className="res-n">{r.name}</div>
                    <div className="res-t">{r.type}</div>
                  </div>
                  <Icon name="chevronRight" size={12} stroke="rgba(240,235,224,.2)"/>
                </a>
              ))}
            </div>
          )}
          {data.opportunities&&(
            <div className="card">
              <div className="cl">Opportunities <div className="cl-line"/></div>
              {data.opportunities.map((o,i)=>(
                <div key={i} className="opp">
                  <span className="opp-ico"><Icon name={RICO[o.icon]||"bolt"} size={15}/></span>
                  <div>
                    <div className="opp-t">{o.title}</div>
                    <div className="opp-m">{o.meta}</div>
                    {o.badge&&<span className={`badge ${o.badge}`}>{o.badge.toUpperCase()}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="card">
            <div className="cl">Community Stories <div className="cl-line"/></div>
            {STORIES.slice(0,2).map(s=>(
              <div key={s.id} style={{marginBottom:12,paddingBottom:12,borderBottom:"1px solid rgba(240,235,224,.05)"}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:7}}>
                  <div className="sc-av" style={{width:26,height:26,fontSize:10,background:`hsl(${s.id*60},40%,32%)`}}>{s.av}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:11,fontWeight:700}}>{s.name}</div>
                    <div style={{fontSize:10,color:"rgba(240,235,224,.28)"}}>{s.ctx}</div>
                  </div>
                  <div className="sc-out" style={{fontSize:10}}><Icon name="check" size={9}/>{s.outcome}</div>
                </div>
                <div style={{fontSize:12,color:"rgba(240,235,224,.42)",lineHeight:1.6,fontWeight:300}}>{s.text.slice(0,120)}…</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMMUNITY
══════════════════════════════════════════════════════════════════════════ */
function CommunityPage() {
  const [likes,setLikes]=useState({}); const [filter,setFilter]=useState("all");
  const filtered=filter==="all"?STORIES:STORIES.filter(s=>s.cat===filter);
  const GRADS=["linear-gradient(135deg,#6b3520,#c4522a)","linear-gradient(135deg,#1e402e,#3d7a4c)","linear-gradient(135deg,#3a2e14,#6b5a28)","linear-gradient(135deg,#162440,#2d5a8a)","linear-gradient(135deg,#32143c,#6a3a8a)","linear-gradient(135deg,#3c1414,#7a3a3a)"];
  return (
    <div className="page">
      <div className="pg-t">Community Stories</div>
      <div className="pg-s">Real people, real problems, real paths forward.</div>
      <div className="filters">
        <button className={`fc${filter==="all"?" on":""}`} onClick={()=>setFilter("all")}><Icon name="users" size={12}/>All</button>
        {CATS.slice(0,5).map(c=>(
          <button key={c.id} className={`fc${filter===c.id?" on":""}`} onClick={()=>setFilter(c.id)}>
            <Icon name={c.icon} size={12}/>{c.label}
          </button>
        ))}
      </div>
      <div className="sg">
        {filtered.map(s=>(
          <div key={s.id} className="sc">
            <div className="sc-chip"><Icon name={CATS.find(c=>c.id===s.cat)?.icon||"bolt"} size={9}/>{CATS.find(c=>c.id===s.cat)?.label}</div>
            <div className="sc-top">
              <div className="sc-av" style={{background:GRADS[s.id%GRADS.length]}}>{s.av}</div>
              <div><div className="sc-nm">{s.name}</div><div className="sc-cx">{s.ctx}</div></div>
              <div className="sc-out"><Icon name="check" size={9}/>{s.outcome}</div>
            </div>
            <div className="sc-title">{s.title}</div>
            <div className="sc-text">{s.text}</div>
            <div className="sc-foot">
              <div className={`like-btn${likes[s.id]?" on":""}`} onClick={()=>setLikes(p=>({...p,[s.id]:!p[s.id]}))}>
                <Icon name="heart" size={12} fill={likes[s.id]?"var(--rust2)":"none"} stroke={likes[s.id]?"var(--rust2)":"currentColor"}/>
                {s.likes+(likes[s.id]?1:0)}
              </div>
              <span>·</span><span>{s.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   PER-SKILL PALETTES — unique visual identity per skill
══════════════════════════════════════════════════════════════════════════ */
const SKILL_PALETTES = {
  "UI/UX Design":     { bg:"#0d0914", panel:"#160f1f", a:"#a855f7", b:"#ec4899", text:"#f3e8ff" },
  "Data Analysis":    { bg:"#06100f", panel:"#0c1c1a", a:"#06b6d4", b:"#3b82f6", text:"#e0f7ff" },
  "Web Dev":          { bg:"#080f08", panel:"#0f1a0f", a:"#22c55e", b:"#84cc16", text:"#dcfce7" },
  "Copywriting":      { bg:"#140e06", panel:"#1f1810", a:"#f97316", b:"#fbbf24", text:"#fff7ed" },
  "Video Editing":    { bg:"#140608", panel:"#200c10", a:"#f43f5e", b:"#fb7185", text:"#fff1f2" },
  "SEO & Marketing":  { bg:"#080a14", panel:"#10121e", a:"#6366f1", b:"#818cf8", text:"#eef2ff" },
  "Virtual Assistant":{ bg:"#061210", panel:"#0e1e1a", a:"#14b8a6", b:"#2dd4bf", text:"#ccfbf1" },
  "AI Prompting":     { bg:"#0e0814", panel:"#180f20", a:"#d946ef", b:"#e879f9", text:"#fdf4ff" },
  "Social Media":     { bg:"#140806", panel:"#201210", a:"#fb923c", b:"#fcd34d", text:"#fff7ed" },
  "Python / ML":      { bg:"#060814", panel:"#0c101e", a:"#3b82f6", b:"#60a5fa", text:"#dbeafe" },
  "Graphic Design":   { bg:"#14060e", panel:"#200c18", a:"#ec4899", b:"#f472b6", text:"#fce7f3" },
  "Project Mgmt":     { bg:"#060e14", panel:"#0e181e", a:"#38bdf8", b:"#7dd3fc", text:"#e0f2fe" },
};
const DEFAULT_PAL = { bg:"#0f0d09", panel:"#221e14", a:"#c4522a", b:"#e06540", text:"#f0ebe0" };
const DIFF_COLORS = { Easy:"#22c55e", Medium:"#f97316", Hard:"#f43f5e", Expert:"#a855f7" };

/* ═══════════════════════════════════════════════════════════════════════════
   SKILL FRAMEWORK DIAGRAM — 1200×860 full canvas, 5 data panels
══════════════════════════════════════════════════════════════════════════ */
function SkillFrameworkDiagram({ data, skillName, palKey }) {
  if (!data) return null;
  const pal = SKILL_PALETTES[palKey] || DEFAULT_PAL;
  const { ladder=[], timeline=[], earningBands=[], workPaths=[], jobTitles=[], prereqs=[], firstDollar="" } = data;

  const h2r = (h) => {
    if (!h || h.length < 7) return "200,200,200";
    try { return `${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`; }
    catch { return "200,200,200"; }
  };
  const ra = h2r(pal.a), rt = h2r(pal.text);

  const W = 1200, H = 860;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{width:"100%",display:"block"}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fgv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={pal.a} stopOpacity="0.35"/>
          <stop offset="100%" stopColor={pal.a} stopOpacity="0.04"/>
        </linearGradient>
        <filter id="fg"><feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="fgsm"><feGaussianBlur stdDeviation="2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>

      {/* BG + grid */}
      <rect width={W} height={H} fill={pal.bg}/>
      {Array.from({length:25}).map((_,i)=>(
        <line key={`gv${i}`} x1={i*50} y1={0} x2={i*50} y2={H} stroke={`rgba(${ra},0.035)`} strokeWidth="1"/>
      ))}
      {Array.from({length:18}).map((_,i)=>(
        <line key={`gh${i}`} x1={0} y1={i*50} x2={W} y2={i*50} stroke={`rgba(${ra},0.035)`} strokeWidth="1"/>
      ))}

      {/* HEADER BAR */}
      <rect x={0} y={0} width={W} height={54} fill={`rgba(${ra},0.08)`}/>
      <rect x={0} y={53} width={W} height={1} fill={`rgba(${ra},0.22)`}/>
      <text x={22} y={32} fontFamily="Clash Display" fontWeight="700" fontSize="19"
        fill={pal.text} letterSpacing="-0.5">{skillName} — Skill Framework</text>
      <text x={22} y={47} fontFamily="Cabinet Grotesk" fontSize="10.5"
        fill={`rgba(${rt},0.38)`} fontWeight="400">AI-generated · 2026 market data</text>

      {/* LEGEND */}
      {[
        {l:"Learning Ladder",c:pal.a},
        {l:"Timeline",c:pal.b},
        {l:"Job Titles",c:"#22c55e"},
        {l:"Work Paths",c:"#f97316"},
        {l:"Earnings",c:"#a855f7"},
      ].map((item,i)=>(
        <g key={i} transform={`translate(${340+i*168},17)`}>
          <rect x={0} y={0} width={10} height={10} rx="3" fill={item.c} opacity="0.75"/>
          <text x={14} y={9} fontFamily="Cabinet Grotesk" fontSize="10"
            fill={`rgba(${rt},0.38)`} fontWeight="500">{item.l}</text>
        </g>
      ))}

      {/* TIME TO FIRST DOLLAR */}
      {firstDollar && (
        <g>
          <rect x={W-252} y={12} width={234} height={30} rx="7"
            fill={`rgba(${ra},0.14)`} stroke={pal.a} strokeWidth="1" filter="url(#fgsm)"/>
          <text x={W-135} y={23} textAnchor="middle" fontFamily="Clash Display"
            fontSize="8.5" fontWeight="700" fill={pal.a} letterSpacing="1">TIME TO FIRST DOLLAR</text>
          <text x={W-135} y={36} textAnchor="middle" fontFamily="Cabinet Grotesk"
            fontSize="11" fontWeight="700" fill={pal.text}>{firstDollar}</text>
        </g>
      )}

      {/* ═══════════════ PANEL 1: LEARNING LADDER (left tall column) ═══════════════ */}
      {(() => {
        const px=16, py=66, pw=292, ph=H-82;
        const steps = ladder.slice(0,6);
        const spacing = (ph-60) / Math.max(steps.length-1,1);
        const nx = px+40;
        return (
          <g>
            <rect x={px} y={py} width={pw} height={ph} rx="14"
              fill={pal.panel} stroke={`rgba(${ra},0.22)`} strokeWidth="1"/>
            <text x={px+pw/2} y={py+21} textAnchor="middle" fontFamily="Clash Display"
              fontSize="10.5" fontWeight="700" letterSpacing="2" fill={pal.a} opacity="0.9">LEARNING LADDER</text>
            <line x1={px+18} y1={py+29} x2={px+pw-18} y2={py+29} stroke={`rgba(${ra},0.1)`} strokeWidth="1"/>
            {/* spine */}
            <line x1={nx} y1={py+40} x2={nx} y2={py+ph-16}
              stroke={`rgba(${ra},0.13)`} strokeWidth="1.5" strokeDasharray="4 3"/>

            {steps.map((s,i)=>{
              const ny=py+48+i*spacing;
              const isGoal=i===steps.length-1;
              const dc=DIFF_COLORS[s.difficulty]||pal.a;
              return (
                <g key={i} style={{animation:`rise .45s ${i*0.09}s ease both`}}>
                  <line x1={nx+10} y1={ny} x2={nx+24} y2={ny} stroke={`rgba(${ra},0.22)`} strokeWidth="1"/>
                  <circle cx={nx} cy={ny} r={isGoal?11:7}
                    fill={isGoal?pal.a:pal.panel} stroke={isGoal?pal.b:pal.a}
                    strokeWidth={isGoal?0:1.5} filter={isGoal?"url(#fg)":undefined}/>
                  {isGoal&&<circle cx={nx} cy={ny} r={17} fill="none" stroke={pal.a}
                    strokeWidth="1" opacity="0.32" style={{animation:"breathe 2.5s ease-in-out infinite"}}/>}
                  <text x={nx} y={ny+4} textAnchor="middle" fontFamily="Clash Display"
                    fontSize={isGoal?"10":"9"} fontWeight="700"
                    fill={isGoal?"white":pal.a}>{isGoal?"✓":i+1}</text>
                  {/* label */}
                  <text x={nx+28} y={ny-6} fontFamily="Clash Display" fontSize="12"
                    fontWeight="600" fill={pal.text}>{s.tool}</text>
                  <text x={nx+28} y={ny+7} fontFamily="Cabinet Grotesk" fontSize="10"
                    fill={`rgba(${rt},0.42)`}>{s.why}</text>
                  {/* time badge */}
                  <rect x={px+pw-88} y={ny-13} width="72" height="14" rx="4"
                    fill={`rgba(${ra},0.1)`} stroke={`rgba(${ra},0.18)`} strokeWidth="0.8"/>
                  <text x={px+pw-52} y={ny-3} textAnchor="middle" fontFamily="Cabinet Grotesk"
                    fontSize="9" fontWeight="700" fill={pal.a}>{s.time}</text>
                  {/* difficulty */}
                  <rect x={px+pw-88} y={ny+3} width="34" height="12" rx="4"
                    fill={`rgba(${h2r(dc)},0.14)`} stroke={`rgba(${h2r(dc)},0.3)`} strokeWidth="0.8"/>
                  <text x={px+pw-71} y={ny+12} textAnchor="middle" fontFamily="Cabinet Grotesk"
                    fontSize="8" fontWeight="700" fill={dc}>{s.difficulty||"Med"}</text>
                  {/* free/paid */}
                  <rect x={px+pw-50} y={ny+3} width="34" height="12" rx="4"
                    fill={s.free?"rgba(34,197,94,0.1)":"rgba(249,115,22,0.1)"}
                    stroke={s.free?"rgba(34,197,94,0.28)":"rgba(249,115,22,0.28)"} strokeWidth="0.8"/>
                  <text x={px+pw-33} y={ny+12} textAnchor="middle" fontFamily="Cabinet Grotesk"
                    fontSize="8" fontWeight="700"
                    fill={s.free?"#22c55e":"#f97316"}>{s.free?"FREE":"PAID"}</text>
                </g>
              );
            })}
          </g>
        );
      })()}

      {/* ═══════════════ PANEL 2: TIMELINE (top-center) ═══════════════ */}
      {(() => {
        const px=322, py=66, pw=548, ph=278;
        const pts=timeline.slice(0,6);
        const barW=Math.floor((pw-56)/pts.length)-10;
        const maxH=ph-86;
        const maxV=Math.max(...pts.map(p=>p.hours||1),1);
        return (
          <g>
            <rect x={px} y={py} width={pw} height={ph} rx="14"
              fill={pal.panel} stroke={`rgba(${ra},0.22)`} strokeWidth="1"/>
            <text x={px+pw/2} y={py+21} textAnchor="middle" fontFamily="Clash Display"
              fontSize="10.5" fontWeight="700" letterSpacing="2" fill={pal.a} opacity="0.9">TIMELINE</text>
            <line x1={px+18} y1={py+29} x2={px+pw-18} y2={py+29} stroke={`rgba(${ra},0.1)`} strokeWidth="1"/>
            {/* baseline */}
            <line x1={px+24} y1={py+ph-28} x2={px+pw-22} y2={py+ph-28}
              stroke={`rgba(${rt},0.07)`} strokeWidth="1"/>
            {/* y-axis guides */}
            {[0,0.5,1].map((pct,i)=>(
              <text key={i} x={px+18} y={py+ph-28-(pct*maxH*0.8)+4} textAnchor="end"
                fontFamily="Cabinet Grotesk" fontSize="9"
                fill={`rgba(${rt},0.22)`}>{Math.round(pct*maxV)}h</text>
            ))}
            {pts.map((p,i)=>{
              const bh=Math.max(((p.hours||1)/maxV)*maxH*0.8,18);
              const bx=px+28+i*(barW+10);
              const by=py+ph-28-bh;
              const isPeak=p.hours===maxV;
              return (
                <g key={i} style={{animation:`rise .4s ${i*0.08+0.1}s ease both`}}>
                  <rect x={bx} y={by} width={barW} height={bh} rx="6"
                    fill={isPeak?"url(#fgv)":`rgba(${ra},0.1)`}
                    stroke={isPeak?pal.a:`rgba(${ra},0.25)`}
                    strokeWidth={isPeak?1.5:1} filter={isPeak?"url(#fgsm)":undefined}/>
                  {bh>32&&<text x={bx+barW/2} y={by+bh/2+4} textAnchor="middle"
                    fontFamily="Cabinet Grotesk" fontSize="9.5" fontWeight="600"
                    fill={isPeak?pal.text:`rgba(${rt},0.5)`}>
                    {(p.milestone||"").slice(0,11)}</text>}
                  <text x={bx+barW/2} y={by-6} textAnchor="middle"
                    fontFamily="Cabinet Grotesk" fontSize="10" fontWeight="700"
                    fill={isPeak?pal.a:`rgba(${ra},0.6)`}>{p.hours}h/wk</text>
                  <text x={bx+barW/2} y={py+ph-14} textAnchor="middle"
                    fontFamily="Clash Display" fontSize="10" fontWeight="600"
                    fill={`rgba(${rt},0.4)`}>{p.label}</text>
                </g>
              );
            })}
            {/* trend line */}
            {pts.length>1&&<polyline
              points={pts.map((p,i)=>{
                const bh=Math.max(((p.hours||1)/maxV)*maxH*0.8,18);
                const bx=px+28+i*(barW+10);
                return `${bx+barW/2},${py+ph-28-bh}`;
              }).join(" ")}
              fill="none" stroke={pal.a} strokeWidth="1.5" strokeOpacity="0.28" strokeDasharray="4 3"/>}
          </g>
        );
      })()}

      {/* ═══════════════ PANEL 3: JOB TITLES (top-right) ═══════════════ */}
      {(() => {
        const px=884, py=66, pw=300, ph=278;
        const jobs=jobTitles.slice(0,6);
        return (
          <g>
            <rect x={px} y={py} width={pw} height={ph} rx="14"
              fill={pal.panel} stroke={`rgba(${ra},0.22)`} strokeWidth="1"/>
            <text x={px+pw/2} y={py+21} textAnchor="middle" fontFamily="Clash Display"
              fontSize="10.5" fontWeight="700" letterSpacing="2" fill={pal.a} opacity="0.9">JOB TITLES</text>
            <line x1={px+18} y1={py+29} x2={px+pw-18} y2={py+29} stroke={`rgba(${ra},0.1)`} strokeWidth="1"/>
            {jobs.map((j,i)=>{
              const jy=py+38+i*37;
              const isHot=j.hot;
              return (
                <g key={i} style={{animation:`rise .4s ${i*0.09+0.15}s ease both`}}>
                  <rect x={px+12} y={jy} width={pw-24} height={29} rx="8"
                    fill={isHot?`rgba(${ra},0.09)`:`rgba(${rt},0.025)`}
                    stroke={isHot?`rgba(${ra},0.22)`:`rgba(${rt},0.05)`} strokeWidth="1"/>
                  <circle cx={px+24} cy={jy+14} r={isHot?5:3.5}
                    fill={isHot?pal.a:`rgba(${ra},0.28)`}
                    filter={isHot?"url(#fgsm)":undefined}/>
                  <text x={px+35} y={jy+10} fontFamily="Clash Display" fontSize="11.5"
                    fontWeight="600" fill={isHot?pal.text:`rgba(${rt},0.6)`}>{j.title}</text>
                  <text x={px+35} y={jy+23} fontFamily="Cabinet Grotesk" fontSize="10"
                    fill={`rgba(${rt},0.38)`}>{j.salary}</text>
                  {isHot&&<>
                    <rect x={px+pw-48} y={jy+8} width="32" height="13" rx="4"
                      fill={`rgba(${ra},0.18)`} stroke={`rgba(${ra},0.38)`} strokeWidth="0.8"/>
                    <text x={px+pw-32} y={jy+18} textAnchor="middle"
                      fontFamily="Cabinet Grotesk" fontSize="8" fontWeight="800"
                      fill={pal.a}>HOT</text>
                  </>}
                </g>
              );
            })}
          </g>
        );
      })()}

      {/* ═══════════════ PANEL 4: WORK PATHS (bottom-center) ═══════════════ */}
      {(() => {
        const px=322, py=358, pw=548, ph=238;
        const paths=workPaths.slice(0,3);
        const rowH=(ph-50)/paths.length;
        const typeC=["#f97316","#22c55e","#3b82f6"];
        return (
          <g>
            <rect x={px} y={py} width={pw} height={ph} rx="14"
              fill={pal.panel} stroke={`rgba(${ra},0.22)`} strokeWidth="1"/>
            <text x={px+pw/2} y={py+21} textAnchor="middle" fontFamily="Clash Display"
              fontSize="10.5" fontWeight="700" letterSpacing="2" fill={pal.a} opacity="0.9">WORK PATHS</text>
            <line x1={px+18} y1={py+29} x2={px+pw-18} y2={py+29} stroke={`rgba(${ra},0.1)`} strokeWidth="1"/>
            {paths.map((p,i)=>{
              const ry=py+36+i*rowH;
              const tc=typeC[i%3];
              const tcr=h2r(tc);
              const df=((p.demand||50)/100)*(pw-228);
              return (
                <g key={i} style={{animation:`rise .4s ${i*0.1+0.2}s ease both`}}>
                  <rect x={px+12} y={ry+3} width={pw-24} height={rowH-10} rx="9"
                    fill={`rgba(${tcr},0.05)`} stroke={`rgba(${tcr},0.11)`} strokeWidth="1"/>
                  <rect x={px+20} y={ry+13} width={64} height={18} rx="5"
                    fill={`rgba(${tcr},0.17)`} stroke={`rgba(${tcr},0.36)`} strokeWidth="1"/>
                  <text x={px+52} y={ry+25} textAnchor="middle"
                    fontFamily="Clash Display" fontSize="9" fontWeight="800" fill={tc}>{p.type}</text>
                  <text x={px+94} y={ry+20} fontFamily="Clash Display" fontSize="13"
                    fontWeight="600" fill={pal.text}>{p.name}</text>
                  <text x={px+94} y={ry+35} fontFamily="Cabinet Grotesk" fontSize="10"
                    fill={`rgba(${rt},0.36)`}>{(p.platforms||[]).join("  ·  ")}</text>
                  {/* demand bar */}
                  <rect x={px+pw-184} y={ry+17} width={150} height={8} rx="4"
                    fill={`rgba(${rt},0.05)`}/>
                  <rect x={px+pw-184} y={ry+17} width={df} height={8} rx="4"
                    fill={tc} opacity="0.72"/>
                  <text x={px+pw-20} y={ry+25} textAnchor="end"
                    fontFamily="Cabinet Grotesk" fontSize="11" fontWeight="700"
                    fill={tc}>{p.demand}%</text>
                </g>
              );
            })}
          </g>
        );
      })()}

      {/* ═══════════════ PANEL 5: EARNING POTENTIAL (bottom-right) ═══════════════ */}
      {(() => {
        const px=884, py=358, pw=300, ph=238;
        const bands=earningBands.slice(0,4);
        const rowH=(ph-50)/bands.length;
        const maxE=Math.max(...bands.map(b=>b.max||1),1);
        return (
          <g>
            <rect x={px} y={py} width={pw} height={ph} rx="14"
              fill={pal.panel} stroke={`rgba(${ra},0.22)`} strokeWidth="1"/>
            <text x={px+pw/2} y={py+21} textAnchor="middle" fontFamily="Clash Display"
              fontSize="10.5" fontWeight="700" letterSpacing="2" fill={pal.a} opacity="0.9">EARNING POTENTIAL</text>
            <line x1={px+18} y1={py+29} x2={px+pw-18} y2={py+29} stroke={`rgba(${ra},0.1)`} strokeWidth="1"/>
            {bands.map((b,i)=>{
              const ry=py+36+i*rowH;
              const trackW=pw-100;
              const fMax=Math.max(((b.max||0)/maxE)*trackW,14);
              const fMin=Math.max(((b.min||0)/maxE)*trackW,7);
              const isTop=i===bands.length-1;
              const alpha=0.3+(i/bands.length)*0.7;
              return (
                <g key={i} style={{animation:`rise .4s ${i*0.1+0.25}s ease both`}}>
                  <text x={px+16} y={ry+rowH/2+5} fontFamily="Clash Display"
                    fontSize="11" fontWeight="600"
                    fill={`rgba(${rt},${0.38+i*0.16})`}>{b.level}</text>
                  <rect x={px+82} y={ry+rowH/2-5} width={trackW} height={10} rx="5"
                    fill={`rgba(${rt},0.045)`}/>
                  <rect x={px+82} y={ry+rowH/2-5} width={fMin} height={10} rx="5"
                    fill={pal.a} opacity={alpha*0.38}/>
                  <rect x={px+82} y={ry+rowH/2-5} width={fMax} height={10} rx="5"
                    fill={pal.a} opacity={alpha}
                    filter={isTop?"url(#fgsm)":undefined}/>
                  <text x={px+pw-12} y={ry+rowH/2+5} textAnchor="end"
                    fontFamily="Cabinet Grotesk" fontSize="12" fontWeight="700"
                    fill={isTop?pal.text:`rgba(${ra},0.78)`}>{b.range}</text>
                </g>
              );
            })}
          </g>
        );
      })()}

      {/* ═══════════════ PREREQS STRIP (bottom full-width) ═══════════════ */}
      {prereqs.length>0&&(
        <g>
          <rect x={16} y={H-54} width={W-32} height={38} rx="10"
            fill={`rgba(${ra},0.065)`} stroke={`rgba(${ra},0.14)`} strokeWidth="1"/>
          <text x={26} y={H-30} fontFamily="Clash Display" fontSize="9.5"
            fontWeight="700" letterSpacing="1.8" fill={pal.a} opacity="0.65">PREREQUISITES</text>
          {prereqs.slice(0,7).map((p,i)=>(
            <g key={i}>
              <rect x={148+i*142} y={H-50} width={132} height={30} rx="7"
                fill={`rgba(${ra},0.09)`} stroke={`rgba(${ra},0.18)`} strokeWidth="1"/>
              <text x={148+i*142+66} y={H-31} textAnchor="middle"
                fontFamily="Cabinet Grotesk" fontSize="11" fontWeight="600"
                fill={`rgba(${rt},0.65)`}>{p}</text>
            </g>
          ))}
        </g>
      )}
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SKILLS PAGE
══════════════════════════════════════════════════════════════════════════ */
function SkillsPage() {
  const [q, setQ] = useState("");
  const [frameworkData, setFrameworkData] = useState(null);
  const [busy, setBusy] = useState(false);
  const [activeSk, setActiveSk] = useState(null);
  const frameworkRef = useRef(null);
  const filtered = SKILLS.filter(s => s.name.toLowerCase().includes(q.toLowerCase()));

  const loadFramework = async (sk) => {
    setActiveSk(sk); setFrameworkData(null); setBusy(true);
    setTimeout(()=>frameworkRef.current?.scrollIntoView({behavior:"smooth",block:"start"}),140);

    const sys=`You are a precise career data expert for 2026. Respond ONLY with a single valid JSON object — no markdown, no code fences:
{
  "ladder":[
    {"tool":"Exact tool name","why":"concise reason max 6 words","time":"2 wks","difficulty":"Easy","free":true},
    {"tool":"...","why":"...","time":"1 mo","difficulty":"Medium","free":true},
    {"tool":"...","why":"...","time":"2 mo","difficulty":"Medium","free":false},
    {"tool":"...","why":"...","time":"3 mo","difficulty":"Hard","free":false},
    {"tool":"READY","why":"job/freelance ready","time":"4 mo","difficulty":"Expert","free":true}
  ],
  "timeline":[
    {"label":"Wk 1-2","hours":8,"milestone":"Fundamentals"},
    {"label":"Mo 1","hours":20,"milestone":"Core tools"},
    {"label":"Mo 2","hours":28,"milestone":"Real projects"},
    {"label":"Mo 3","hours":22,"milestone":"Portfolio"},
    {"label":"Mo 4","hours":16,"milestone":"Job hunt"},
    {"label":"Mo 5+","hours":12,"milestone":"Paid work"}
  ],
  "jobTitles":[
    {"title":"Junior role title","salary":"$45-60K / yr","hot":true},
    {"title":"Freelance title","salary":"$30-55/hr","hot":false},
    {"title":"Mid-level title","salary":"$65-85K / yr","hot":true},
    {"title":"Senior title","salary":"$90-120K / yr","hot":false},
    {"title":"Consulting title","salary":"$80-130/hr","hot":false},
    {"title":"Management title","salary":"$95-140K / yr","hot":false}
  ],
  "workPaths":[
    {"type":"JOB","name":"Full-Time Employment","platforms":["LinkedIn","Indeed","AngelList"],"demand":85},
    {"type":"FREELANCE","name":"Independent Freelance","platforms":["Upwork","Fiverr","Toptal"],"demand":72},
    {"type":"AGENCY","name":"Agency / Consulting","platforms":["Cold outreach","Referrals"],"demand":55}
  ],
  "earningBands":[
    {"level":"Beginner","min":15,"max":30,"range":"$15-30/hr"},
    {"level":"Junior","min":45,"max":65,"range":"$45-65K"},
    {"level":"Mid","min":68,"max":95,"range":"$68-95K"},
    {"level":"Senior","min":95,"max":145,"range":"$95-145K"}
  ],
  "prereqs":["Prereq 1","Prereq 2","Prereq 3"],
  "firstDollar":"2-3 months with focused effort"
}
Make EVERY field specific and accurate for "${sk.name}" in 2026. Real tool names, real job titles, real platforms, real salaries. difficulty = Easy/Medium/Hard/Expert only.`;

    try {
      const raw=await callAI([{role:"user",content:`Build full skill framework for: ${sk.name}`}],sys);
      setFrameworkData(JSON.parse(raw.replace(/```json|```/g,"").trim()));
    } catch {
      setFrameworkData({
        ladder:[
          {tool:"Fundamentals",why:"core concepts first",time:"2 wks",difficulty:"Easy",free:true},
          {tool:"Free Practice Tools",why:"hands-on learning",time:"1 mo",difficulty:"Medium",free:true},
          {tool:"Real Projects",why:"build your portfolio",time:"2 mo",difficulty:"Medium",free:true},
          {tool:"Specialize",why:"pick a profitable niche",time:"3 mo",difficulty:"Hard",free:false},
          {tool:"READY",why:"job/freelance ready",time:"4 mo",difficulty:"Expert",free:true},
        ],
        timeline:[
          {label:"Wk 1-2",hours:8,milestone:"Basics"},
          {label:"Mo 1",hours:20,milestone:"Tools"},
          {label:"Mo 2",hours:28,milestone:"Projects"},
          {label:"Mo 3",hours:20,milestone:"Portfolio"},
          {label:"Mo 4",hours:16,milestone:"Job hunt"},
          {label:"Mo 5+",hours:12,milestone:"Paid work"},
        ],
        jobTitles:[
          {title:"Junior Specialist",salary:"$45-60K / yr",hot:true},
          {title:"Freelance Expert",salary:"$30-55/hr",hot:false},
          {title:"Mid-Level Analyst",salary:"$65-85K / yr",hot:true},
          {title:"Senior Lead",salary:"$90-120K / yr",hot:false},
          {title:"Independent Consultant",salary:"$80-130/hr",hot:false},
          {title:"Department Manager",salary:"$95-140K / yr",hot:false},
        ],
        workPaths:[
          {type:"JOB",name:"Full-Time Employment",platforms:["LinkedIn","Indeed","AngelList"],demand:84},
          {type:"FREELANCE",name:"Independent Freelance",platforms:["Upwork","Fiverr","Toptal"],demand:70},
          {type:"AGENCY",name:"Agency / Consulting",platforms:["Cold outreach","Referrals"],demand:54},
        ],
        earningBands:[
          {level:"Beginner",min:15,max:30,range:"$15-30/hr"},
          {level:"Junior",min:45,max:65,range:"$45-65K"},
          {level:"Mid",min:68,max:95,range:"$68-95K"},
          {level:"Senior",min:95,max:145,range:"$95-145K"},
        ],
        prereqs:["Basic computer skills","English literacy","Time commitment (15-25hrs/wk)"],
        firstDollar:"2-3 months with focused effort",
      });
    }
    setBusy(false);
  };

  const pal = activeSk ? (SKILL_PALETTES[activeSk.name]||DEFAULT_PAL) : DEFAULT_PAL;

  return (
    <div className="page">
      <div className="pg-t">Skills Explorer</div>
      <div className="pg-s">
        Click any skill — the AI builds a full visual framework: learning ladder with difficulty ratings, timeline, job titles, work paths, earnings, and prerequisites.
      </div>
      <input className="search-bar" placeholder="Search skills…" value={q} onChange={e=>setQ(e.target.value)}/>
      <div className="skgrid">
        {filtered.map(sk=>(
          <div key={sk.name} className={`skcard${activeSk?.name===sk.name?" sk-active":""}`}
            style={{"--ac":sk.color}} onClick={()=>loadFramework(sk)}>
            <div className="sk-ico"><Icon name={sk.ico} size={18} stroke={sk.color}/></div>
            <div className="sk-nm">{sk.name}</div>
            <div className={`sk-lv ${sk.lv.toLowerCase()}`}>{sk.lv} · {sk.demand}%</div>
            <div className="sk-bar"><div className="sk-fill" style={{width:`${sk.demand}%`}}/></div>
          </div>
        ))}
      </div>

      {(busy||frameworkData)&&activeSk&&(
        <div ref={frameworkRef} style={{
          marginTop:10, borderRadius:"var(--r)", overflow:"hidden",
          border:`1px solid rgba(${(()=>{const h=pal.a;try{return`${parseInt(h.slice(1,3),16)},${parseInt(h.slice(3,5),16)},${parseInt(h.slice(5,7),16)}`}catch{return"200,100,50"}})()},0.28)`,
          animation:"rise .4s ease both", background:pal.bg,
        }}>
          <div style={{padding:"11px 18px",borderBottom:`1px solid rgba(255,255,255,0.055)`,
            display:"flex",alignItems:"center",justifyContent:"space-between",
            background:"rgba(255,255,255,0.028)"}}>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <Icon name={activeSk.ico} size={14} stroke={pal.a}/>
              <span style={{fontFamily:"var(--fd)",fontSize:13,fontWeight:700,color:pal.text,letterSpacing:"-.2px"}}>
                {activeSk.name}
              </span>
              <span style={{padding:"2px 8px",borderRadius:4,fontSize:8.5,fontWeight:800,
                background:"rgba(255,255,255,0.07)",color:pal.a,letterSpacing:"1px"}}>
                FRAMEWORK · AI
              </span>
            </div>
            <span style={{fontSize:10,color:"rgba(255,255,255,0.18)",fontWeight:500}}>
              2026 market data · visual canvas
            </span>
          </div>
          <div style={{width:"100%",lineHeight:0}}>
            {busy?(
              <div style={{height:380,display:"flex",flexDirection:"column",alignItems:"center",
                justifyContent:"center",gap:14,background:pal.bg}}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none"
                  stroke={pal.a} strokeWidth="2" style={{animation:"spin 1.5s linear infinite"}}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
                <span style={{fontFamily:"var(--fb)",fontSize:12,color:"rgba(255,255,255,0.28)"}}>
                  Building {activeSk.name} framework…
                </span>
              </div>
            ):(
              <SkillFrameworkDiagram data={frameworkData} skillName={activeSk.name} palKey={activeSk.name}/>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ROOT
══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [pg,setPg]=useState("home");
  const [session,setSession]=useState(null);
  const [showFeedback,setShowFeedback]=useState(false);

  const solve=(s)=>{ setSession(s); setPg("solution"); };

  const TABS=[
    {id:"home",l:"Home"},
    {id:"solution",l:"My Roadmap",hide:!session},
    {id:"community",l:"Community"},
    {id:"skills",l:"Skills"},
  ];

  return (
    <>
      <style>{CSS}</style>
      <BgCanvas/>
      <Cursor/>
      <LiveFeed/>
      {showFeedback&&<FeedbackModal onClose={()=>setShowFeedback(false)}/>}
      <div className="app">
        <nav className="nav">
          <div className="nav-logo"><div className="nav-pulse"/>LifePath</div>
          <div className="nav-links">
            {TABS.filter(t=>!t.hide).map(t=>(
              <button key={t.id} className={`nav-link${pg===t.id?" on":""}`} onClick={()=>setPg(t.id)}>
                {t.l}
                {t.id==="solution"&&session&&<span style={{width:5,height:5,borderRadius:"50%",background:"var(--rust2)",display:"inline-block",marginLeft:6,verticalAlign:"middle"}}/>}
              </button>
            ))}
            <button className="nav-feedback" onClick={()=>setShowFeedback(true)}>
              <Icon name="pencil" size={12}/>Feedback
            </button>
          </div>
        </nav>

        {pg==="home"&&<HeroPage onSolve={solve}/>}
        {pg==="solution"&&session&&<SolPage session={session} onBack={()=>setPg("home")}/>}
        {pg==="community"&&<CommunityPage/>}
        {pg==="skills"&&<SkillsPage/>}
      </div>
    </>
  );
}
