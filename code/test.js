<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<title>MH2 Chess | Online Multiplayer</title>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/chessboardjs/1.0.0/chessboard-1.0.0.min.css" integrity="sha512-6E4E4Nz2m0PTBw3JmxV+mNsIzTFEMSPd/CTOs2mtNqBSJq2CHjxAqxoZTz3AtGxgIVpQ7fCcM9EOoAuUENkFEA==" crossorigin="anonymous" referrerpolicy="no-referrer">

<style>
:root{
  --bg-0:#0b0d12;
  --bg-1:#12151c;
  --bg-2:#181c26;
  --glass:rgba(255,255,255,0.045);
  --glass-brd:rgba(255,255,255,0.09);
  --ink-0:#eef1f6;
  --ink-1:#a7adba;
  --ink-2:#6c7draw;
  --ink-muted:#6c7686;
  --emerald:#37c98f;
  --emerald-dim:#1f8f63;
  --gold:#d7ab5c;
  --crimson:#e35d6a;
  --blue:#5c9fd7;
  --sq-light:#eadfce;
  --sq-dark:#7c5a41;
  --radius:16px;
  --radius-sm:10px;
  --font-display:'Fraunces', Georgia, 'Times New Roman', serif;
  --font-body:'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono:'JetBrains Mono', 'Courier New', monospace;
}

@font-face{font-family:'Fraunces';src:local('Georgia');}

*{box-sizing:border-box; margin:0; padding:0;}

html,body{
  height:100%;
  background:
    radial-gradient(1200px 800px at 15% -10%, rgba(55,201,143,0.06), transparent 60%),
    radial-gradient(1000px 700px at 110% 10%, rgba(215,171,92,0.05), transparent 55%),
    var(--bg-0);
  color:var(--ink-0);
  font-family:var(--font-body);
  overflow-x:hidden;
}

::selection{ background: rgba(55,201,143,0.35); }

::-webkit-scrollbar{ width:8px; height:8px; }
::-webkit-scrollbar-track{ background:transparent; }
::-webkit-scrollbar-thumb{ background:rgba(255,255,255,0.12); border-radius:8px; }
::-webkit-scrollbar-thumb:hover{ background:rgba(255,255,255,0.2); }

a{color:inherit;}

.hidden{ display:none !important; }

/* ---------- Utility Glass Panel ---------- */
.glass{
  background:var(--glass);
  border:1px solid var(--glass-brd);
  backdrop-filter:blur(18px);
  -webkit-backdrop-filter:blur(18px);
  border-radius:var(--radius);
}

/* ================= TOP BAR ================= */
.topbar{
  position:sticky; top:0; z-index:50;
  display:flex; align-items:center; justify-content:space-between;
  padding:14px 26px;
  background:rgba(11,13,18,0.72);
  backdrop-filter:blur(14px);
  border-bottom:1px solid rgba(255,255,255,0.06);
}
.brand{
  display:flex; align-items:center; gap:10px;
  font-family:var(--font-display);
  font-size:22px; letter-spacing:0.3px;
}
.brand .mark{
  width:34px; height:34px; border-radius:9px;
  display:flex; align-items:center; justify-content:center;
  background:linear-gradient(145deg, var(--emerald), var(--emerald-dim));
  color:#08120d; font-weight:800; font-family:var(--font-body);
  font-size:16px;
  box-shadow:0 4px 18px rgba(55,201,143,0.35);
}
.brand small{
  display:block; font-family:var(--font-body); font-size:10.5px; letter-spacing:1.5px;
  color:var(--ink-2); text-transform:uppercase; font-weight:600; margin-top:1px;
}
.topbar-right{ display:flex; align-items:center; gap:14px; }
.me-chip{
  display:flex; align-items:center; gap:9px;
  padding:6px 12px 6px 6px; border-radius:999px;
  background:var(--glass); border:1px solid var(--glass-brd);
  font-size:13.5px; font-weight:600;
}
.avatar{
  width:26px;height:26px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  background:linear-gradient(145deg,var(--gold),#a97e3a);
  color:#1a1305; font-weight:800; font-size:12px;
}
.status-dot{ width:8px;height:8px;border-radius:50%; background:var(--emerald); box-shadow:0 0 8px var(--emerald); }

/* ================= LOGIN SCREEN ================= */
.login-wrap{
  min-height:100vh; display:flex; align-items:center; justify-content:center;
  padding:24px;
}
.login-card{
  width:100%; max-width:420px;
  padding:42px 36px 34px;
  text-align:center;
  position:relative;
  overflow:hidden;
}
.login-card::before{
  content:''; position:absolute; inset:0;
  background:
    linear-gradient(135deg, rgba(55,201,143,0.10), transparent 45%),
    linear-gradient(315deg, rgba(215,171,92,0.08), transparent 45%);
  pointer-events:none;
}
.login-glyph{
  width:64px;height:64px;margin:0 auto 18px;
  border-radius:18px;
  display:flex;align-items:center;justify-content:center;
  background:linear-gradient(145deg, var(--emerald), var(--emerald-dim));
  box-shadow:0 10px 30px rgba(55,201,143,0.35);
  font-size:30px;
}
.login-card h1{
  font-family:var(--font-display); font-size:30px; font-weight:600; margin-bottom:6px;
}
.login-card p.sub{ color:var(--ink-1); font-size:14px; margin-bottom:28px; }
.field{ text-align:left; margin-bottom:18px; position:relative; }
.field label{
  display:block; font-size:11.5px; letter-spacing:1.2px; text-transform:uppercase;
  color:var(--ink-2); font-weight:700; margin-bottom:8px;
}
.field input{
  width:100%; padding:13px 14px; border-radius:11px;
  background:rgba(255,255,255,0.04); border:1px solid var(--glass-brd);
  color:var(--ink-0); font-size:15px; font-family:var(--font-body);
  outline:none; transition:border-color .15s, background .15s;
}
.field input:focus{ border-color:var(--emerald); background:rgba(255,255,255,0.06); }
.field .hint{ font-size:11.5px; color:var(--ink-2); margin-top:6px; }
.btn{
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:13px 22px; border-radius:11px; border:none; cursor:pointer;
  font-family:var(--font-body); font-weight:700; font-size:14.5px;
  transition:transform .12s ease, box-shadow .12s ease, opacity .12s ease, background .15s;
  user-select:none;
}
.btn:active{ transform:scale(0.97); }
.btn:disabled{ opacity:0.45; cursor:not-allowed; }
.btn-primary{
  background:linear-gradient(145deg, var(--emerald), var(--emerald-dim));
  color:#082017; box-shadow:0 8px 22px rgba(55,201,143,0.30);
  width:100%;
}
.btn-primary:hover:not(:disabled){ box-shadow:0 10px 28px rgba(55,201,143,0.42); }
.btn-ghost{
  background:var(--glass); color:var(--ink-0); border:1px solid var(--glass-brd);
}
.btn-ghost:hover{ background:rgba(255,255,255,0.08); }
.btn-danger{ background:linear-gradient(145deg,#e35d6a,#a83947); color:#fff; }
.btn-gold{ background:linear-gradient(145deg,var(--gold),#a97e3a); color:#1a1305; }
.btn-sm{ padding:8px 14px; font-size:13px; border-radius:9px; }
.login-error{ color:var(--crimson); font-size:13px; margin-top:12px; min-height:18px; }

/* ================= APP LAYOUT ================= */
.app{ display:none; min-height:calc(100vh - 63px); }
.app.active{ display:block; }

/* ---------- LOBBY ---------- */
.lobby{
  max-width:1180px; margin:0 auto; padding:30px 24px 60px;
  display:grid; grid-template-columns:1.3fr 1fr; gap:22px;
}
@media(max-width:900px){ .lobby{ grid-template-columns:1fr; } }

.panel{ padding:22px; }
.panel-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:16px; }
.panel-head h2{ font-family:var(--font-display); font-size:19px; font-weight:600; }
.panel-head .count{
  font-size:11.5px; font-weight:700; color:var(--emerald);
  background:rgba(55,201,143,0.12); padding:3px 10px; border-radius:999px;
}

.player-row{
  display:flex; align-items:center; justify-content:space-between;
  padding:13px 14px; border-radius:12px;
  background:rgba(255,255,255,0.025); border:1px solid transparent;
  margin-bottom:8px; transition:background .15s, border-color .15s;
}
.player-row:hover{ background:rgba(255,255,255,0.05); border-color:var(--glass-brd); }
.player-left{ display:flex; align-items:center; gap:11px; }
.player-name{ font-weight:600; font-size:14.5px; }
.player-meta{ font-size:11.5px; color:var(--ink-2); margin-top:1px; }
.empty-note{ text-align:center; color:var(--ink-2); font-size:13.5px; padding:30px 10px; }

.activity-log{ max-height:420px; overflow-y:auto; }
.log-line{ font-size:13px; color:var(--ink-1); padding:8px 0; border-bottom:1px dashed rgba(255,255,255,0.05); }
.log-line b{ color:var(--ink-0); }
.log-line .t{ float:right; color:var(--ink-2); font-size:11px; }

/* ---------- MODALS / POPUPS ---------- */
.overlay{
  position:fixed; inset:0; z-index:200;
  background:rgba(5,6,9,0.68);
  display:flex; align-items:center; justify-content:center;
  padding:20px; backdrop-filter:blur(4px);
  animation:fadeIn .18s ease;
}
@keyframes fadeIn{ from{opacity:0;} to{opacity:1;} }
.modal{
  width:100%; max-width:400px; padding:26px;
  animation:popIn .22s cubic-bezier(.2,.9,.3,1.2);
}
@keyframes popIn{ from{opacity:0; transform:translateY(12px) scale(0.97);} to{opacity:1; transform:translateY(0) scale(1);} }
.modal h3{ font-family:var(--font-display); font-size:20px; margin-bottom:6px; }
.modal p{ color:var(--ink-1); font-size:14px; margin-bottom:20px; line-height:1.5; }
.modal-actions{ display:flex; gap:10px; }
.modal-actions .btn{ flex:1; }

/* Invite pulse avatar */
.invite-avatar{
  width:58px;height:58px;border-radius:16px;margin-bottom:14px;
  display:flex;align-items:center;justify-content:center; font-size:22px; font-weight:800;
  background:linear-gradient(145deg,var(--gold),#a97e3a); color:#1a1305;
  box-shadow:0 0 0 0 rgba(215,171,92,0.5);
  animation:pulse 1.6s infinite;
}
@keyframes pulse{
  0%{ box-shadow:0 0 0 0 rgba(215,171,92,0.45); }
  70%{ box-shadow:0 0 0 16px rgba(215,171,92,0); }
  100%{ box-shadow:0 0 0 0 rgba(215,171,92,0); }
}

/* ================= GAME ROOM ================= */
.room{ max-width:1220px; margin:0 auto; padding:22px 20px 50px; }

.setup-wrap{
  max-width:640px; margin:20px auto; padding:30px;
  text-align:center;
}
.setup-wrap h2{ font-family:var(--font-display); font-size:24px; margin-bottom:4px; }
.setup-wrap .vs{ color:var(--ink-1); font-size:14px; margin-bottom:26px; }
.opt-group{ margin-bottom:22px; text-align:left; }
.opt-group label.title{
  display:block; font-size:11.5px; letter-spacing:1.2px; text-transform:uppercase;
  color:var(--ink-2); font-weight:700; margin-bottom:10px;
}
.opt-pills{ display:flex; flex-wrap:wrap; gap:8px; }
.pill{
  padding:9px 16px; border-radius:999px; cursor:pointer; font-size:13.5px; font-weight:600;
  background:rgba(255,255,255,0.04); border:1px solid var(--glass-brd); color:var(--ink-1);
  transition:all .14s;
}
.pill:hover{ background:rgba(255,255,255,0.08); }
.pill.selected{
  background:linear-gradient(145deg, var(--emerald), var(--emerald-dim));
  color:#082017; border-color:transparent;
}
.ready-status-row{
  display:flex; justify-content:space-between; align-items:center;
  margin:22px 0 6px; padding:14px 16px; border-radius:12px; background:rgba(255,255,255,0.03);
}
.ready-side{ display:flex; align-items:center; gap:10px; font-size:14px; font-weight:600; }
.ready-badge{ font-size:11px; font-weight:700; padding:4px 10px; border-radius:999px; }
.ready-badge.waiting{ background:rgba(255,255,255,0.08); color:var(--ink-2); }
.ready-badge.ready{ background:rgba(55,201,143,0.18); color:var(--emerald); }

/* ---------- BOARD LAYOUT ---------- */
.board-layout{
  display:grid; grid-template-columns:300px 1fr 300px; gap:20px; align-items:start;
}
@media(max-width:1050px){ .board-layout{ grid-template-columns:1fr; } }

.side-col{ display:flex; flex-direction:column; gap:16px; }

.player-card{ padding:16px 18px; display:flex; align-items:center; gap:12px; }
.player-card.active-turn{ border-color:rgba(55,201,143,0.5); box-shadow:0 0 0 1px rgba(55,201,143,0.25) inset; }
.player-card .avatar{ width:40px;height:40px; font-size:15px; }
.player-card .info{ flex:1; min-width:0; }
.player-card .info .nm{ font-weight:700; font-size:14.5px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
.player-card .info .rl{ font-size:11px; color:var(--ink-2); text-transform:uppercase; letter-spacing:0.5px; font-weight:700; margin-top:2px; }
.clock{
  font-family:var(--font-mono); font-size:20px; font-weight:700; padding:6px 12px; border-radius:9px;
  background:rgba(0,0,0,0.35); min-width:74px; text-align:center; letter-spacing:0.5px;
}
.clock.low{ color:var(--crimson); background:rgba(227,93,106,0.15); animation:tick 1s infinite; }
@keyframes tick{ 50%{ opacity:0.55; } }

.captured-row{ padding:14px 16px; }
.captured-row .lbl{ font-size:11px; text-transform:uppercase; letter-spacing:1px; color:var(--ink-2); font-weight:700; margin-bottom:8px; }
.captured-pieces{ display:flex; flex-wrap:wrap; gap:2px; font-size:19px; min-height:24px; }

.board-center{ display:flex; flex-direction:column; align-items:center; gap:14px; }
.board-container{ width:100%; max-width:560px; position:relative; }
#board{ width:100%; border-radius:8px; overflow:hidden; box-shadow:0 16px 50px rgba(0,0,0,0.5); }

.board-toolbar{ display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }

.move-history-card{ padding:14px 16px; max-height:210px; display:flex; flex-direction:column; }
.move-history-card .lbl{ font-size:11px; text-transform:uppercase; letter-spacing:1px; color:var(--ink-2); font-weight:700; margin-bottom:8px; }
.moves-list{ overflow-y:auto; font-family:var(--font-mono); font-size:13px; flex:1; }
.moves-list .mv-row{ display:grid; grid-template-columns:30px 1fr 1fr; gap:6px; padding:3px 0; color:var(--ink-1); }
.moves-list .mv-row span.n{ color:var(--ink-2); }
.moves-list .mv-row .hl{ color:var(--emerald); font-weight:700; }

.status-banner{
  padding:10px 16px; border-radius:12px; text-align:center; font-size:13.5px; font-weight:700;
  background:rgba(255,255,255,0.04); border:1px solid var(--glass-brd); width:100%; max-width:560px;
}
.status-banner.check{ color:var(--crimson); background:rgba(227,93,106,0.12); border-color:rgba(227,93,106,0.3); }

/* Chat */
.chat-card{ padding:14px 16px; display:flex; flex-direction:column; height:280px; }
.chat-card .lbl{ font-size:11px; text-transform:uppercase; letter-spacing:1px; color:var(--ink-2); font-weight:700; margin-bottom:8px; }
.chat-log{ flex:1; overflow-y:auto; display:flex; flex-direction:column; gap:8px; padding-right:4px; }
.chat-msg{ font-size:13.5px; line-height:1.4; }
.chat-msg .who{ font-weight:700; font-size:11.5px; color:var(--gold); }
.chat-msg .who.me{ color:var(--emerald); }
.chat-msg .ts{ color:var(--ink-2); font-size:10px; margin-left:6px; }
.chat-input-row{ display:flex; gap:8px; margin-top:10px; }
.chat-input-row input{
  flex:1; padding:10px 12px; border-radius:9px; background:rgba(255,255,255,0.04);
  border:1px solid var(--glass-brd); color:var(--ink-0); font-size:13.5px; outline:none;
}
.chat-input-row input:focus{ border-color:var(--emerald); }
.chat-input-row button{ padding:10px 14px; }

/* square highlight helpers */
.sq-legal::before{
  content:''; position:absolute; width:26%; height:26%; border-radius:50%;
  background:rgba(55,201,143,0.55); top:50%; left:50%; transform:translate(-50%,-50%);
}
.sq-capture::before{
  content:''; position:absolute; inset:6%; border-radius:50%;
  border:4px solid rgba(227,93,106,0.65); background:transparent;
}
.sq-last{ box-shadow: inset 0 0 0 9999px rgba(215,171,92,0.35); }
.sq-select{ box-shadow: inset 0 0 0 9999px rgba(55,201,143,0.45); }
.sq-check{ box-shadow: inset 0 0 0 9999px rgba(227,93,106,0.55); }

/* Toasts */
.toast-wrap{ position:fixed; bottom:20px; right:20px; z-index:400; display:flex; flex-direction:column; gap:10px; }
.toast{
  padding:13px 18px; border-radius:12px; font-size:13.5px; font-weight:600;
  min-width:240px; box-shadow:0 10px 30px rgba(0,0,0,0.4);
  animation:slideIn .2s ease;
}
@keyframes slideIn{ from{ transform:translateX(30px); opacity:0; } to{ transform:translateX(0); opacity:1; } }
.toast.info{ background:#1c2530; border:1px solid rgba(92,159,215,0.3); color:var(--blue); }
.toast.success{ background:#132a22; border:1px solid rgba(55,201,143,0.3); color:var(--emerald); }
.toast.error{ background:#2a1418; border:1px solid rgba(227,93,106,0.3); color:var(--crimson); }

/* Game over */
.gameover-icon{ font-size:44px; margin-bottom:8px; }
.gameover-title{ font-family:var(--font-display); font-size:26px; margin-bottom:6px; }
.gameover-sub{ color:var(--ink-1); font-size:14px; margin-bottom:22px; }

/* Promotion modal */
.promo-choices{ display:flex; gap:10px; justify-content:center; margin-top:6px; }
.promo-choice{
  width:60px;height:60px;border-radius:12px; display:flex;align-items:center;justify-content:center;
  background:rgba(255,255,255,0.05); border:1px solid var(--glass-brd); font-size:34px; cursor:pointer;
}
.promo-choice:hover{ background:rgba(55,201,143,0.15); border-color:var(--emerald); }

.spinner{
  width:16px;height:16px;border-radius:50%;
  border:2px solid rgba(255,255,255,0.25); border-top-color:#fff;
  animation:spin .7s linear infinite; display:inline-block;
}
@keyframes spin{ to{ transform:rotate(360deg); } }

.footer-note{ text-align:center; color:var(--ink-2); font-size:11.5px; margin-top:30px; }

@media(max-width:640px){
  .topbar{ padding:12px 14px; }
  .brand{ font-size:18px; }
  .lobby{ padding:18px 12px 40px; gap:14px; }
  .panel{ padding:16px; }
}
</style>
</head>
<body>

<!-- ============ TOAST CONTAINER ============ -->
<div class="toast-wrap" id="toastWrap"></div>

<!-- ============ LOGIN SCREEN ============ -->
<div class="login-wrap" id="loginScreen">
  <div class="glass login-card">
    <div class="login-glyph">♞</div>
    <h1>MH2 Chess</h1>
    <p class="sub">Real-time online multiplayer chess</p>
    <div class="field">
      <label for="nicknameInput">Choose a nickname</label>
      <input id="nicknameInput" type="text" maxlength="20" placeholder="e.g. RookMaster" autocomplete="off">
      <div class="hint">2–20 characters. No account needed.</div>
    </div>
    <button class="btn btn-primary" id="loginBtn">
      <span id="loginBtnText">Enter the Lobby</span>
    </button>
    <div class="login-error" id="loginError"></div>
  </div>
</div>

<!-- ============ APP SHELL ============ -->
<div class="app" id="app">
  <div class="topbar">
    <div class="brand">
      <div class="mark">♞</div>
      <div>
        MH2 Chess
        <small>Online Multiplayer</small>
      </div>
    </div>
    <div class="topbar-right">
      <div class="me-chip">
        <span class="status-dot"></span>
        <span class="avatar" id="meAvatar">?</span>
        <span id="meName">—</span>
      </div>
      <button class="btn btn-ghost btn-sm" id="leaveRoomBtn" style="display:none;">Leave Game</button>
    </div>
  </div>

  <!-- ===== LOBBY VIEW ===== -->
  <div class="lobby" id="lobbyView">
    <div class="glass panel">
      <div class="panel-head">
        <h2>Online Players</h2>
        <span class="count" id="onlineCount">0 online</span>
      </div>
      <div id="playersList"></div>
    </div>
    <div class="glass panel">
      <div class="panel-head">
        <h2>Activity</h2>
      </div>
      <div class="activity-log" id="activityLog">
        <div class="empty-note">Invites and events will appear here.</div>
      </div>
    </div>
  </div>

  <!-- ===== ROOM VIEW ===== -->
  <div class="room hidden" id="roomView">

    <!-- Setup / Ready screen -->
    <div class="glass setup-wrap" id="setupView">
      <h2 id="setupTitle">Preparing Match</h2>
      <div class="vs" id="setupVs">You vs Opponent</div>

      <div class="opt-group">
        <label class="title">Choose Side</label>
        <div class="opt-pills" id="colorPills">
          <div class="pill" data-value="white">White</div>
          <div class="pill" data-value="random">Random</div>
          <div class="pill" data-value="black">Black</div>
        </div>
      </div>

      <div class="opt-group">
        <label class="title">Time Control</label>
        <div class="opt-pills" id="timerPills">
          <div class="pill" data-value="0">Unlimited</div>
          <div class="pill" data-value="1">1 min</div>
          <div class="pill" data-value="3">3 min</div>
          <div class="pill" data-value="5">5 min</div>
          <div class="pill" data-value="10">10 min</div>
          <div class="pill" data-value="15">15 min</div>
          <div class="pill" data-value="30">30 min</div>
        </div>
      </div>

      <div class="ready-status-row">
        <div class="ready-side">
          <span class="avatar" id="setupMeAvatar">?</span>
          <span id="setupMeName">You</span>
        </div>
        <span class="ready-badge waiting" id="setupMeBadge">Not Ready</span>
      </div>
      <div class="ready-status-row">
        <div class="ready-side">
          <span class="avatar" id="setupOppAvatar">?</span>
          <span id="setupOppName">Opponent</span>
        </div>
        <span class="ready-badge waiting" id="setupOppBadge">Not Ready</span>
      </div>

      <button class="btn btn-primary" id="readyBtn" style="margin-top:18px;">I'm Ready</button>
    </div>

    <!-- Board view -->
    <div class="board-layout hidden" id="boardView">
      <div class="side-col">
        <div class="glass player-card" id="topPlayerCard">
          <span class="avatar" id="topAvatar">?</span>
          <div class="info">
            <div class="nm" id="topName">—</div>
            <div class="rl" id="topRole">—</div>
          </div>
          <div class="clock" id="topClock">--:--</div>
        </div>
        <div class="glass captured-row">
          <div class="lbl">Captured by opponent</div>
          <div class="captured-pieces" id="topCaptured"></div>
        </div>
        <div class="glass move-history-card">
          <div class="lbl">Move History</div>
          <div class="moves-list" id="movesList"></div>
        </div>
      </div>

      <div class="board-center">
        <div class="status-banner" id="statusBanner">Game in progress</div>
        <div class="board-container">
          <div id="board"></div>
        </div>
        <div class="board-toolbar">
          <button class="btn btn-ghost btn-sm" id="flipBtn">⟳ Flip Board</button>
          <button class="btn btn-ghost btn-sm" id="resignBtn">🏳 Resign</button>
          <button class="btn btn-ghost btn-sm" id="drawBtn">🤝 Offer Draw</button>
        </div>
        <div class="glass chat-card">
          <div class="lbl">Chat</div>
          <div class="chat-log" id="chatLog"></div>
          <div class="chat-input-row">
            <input id="chatInput" type="text" maxlength="200" placeholder="Type a message…">
            <button class="btn btn-primary btn-sm" id="chatSendBtn">Send</button>
          </div>
        </div>
      </div>

      <div class="side-col">
        <div class="glass player-card" id="bottomPlayerCard">
          <span class="avatar" id="bottomAvatar">?</span>
          <div class="info">
            <div class="nm" id="bottomName">—</div>
            <div class="rl" id="bottomRole">—</div>
          </div>
          <div class="clock" id="bottomClock">--:--</div>
        </div>
        <div class="glass captured-row">
          <div class="lbl">Captured by you</div>
          <div class="captured-pieces" id="bottomCaptured"></div>
        </div>
      </div>
    </div>

    <div class="footer-note">MH2 Chess · synced in real time via Firebase</div>
  </div>
</div>

<!-- ============ INVITE POPUP ============ -->
<div class="overlay hidden" id="inviteOverlay">
  <div class="glass modal" style="text-align:center;">
    <div class="invite-avatar" id="inviteAvatar">?</div>
    <h3 id="inviteTitle">Game Invite</h3>
    <p id="inviteText">wants to play a game with you.</p>
    <div class="modal-actions">
      <button class="btn btn-ghost" id="declineInviteBtn">Decline</button>
      <button class="btn btn-primary" id="acceptInviteBtn">Accept</button>
    </div>
  </div>
</div>

<!-- ============ WAITING FOR RESPONSE POPUP ============ -->
<div class="overlay hidden" id="waitingOverlay">
  <div class="glass modal" style="text-align:center;">
    <div class="spinner" style="width:26px;height:26px;border-width:3px;margin-bottom:14px;"></div>
    <h3 id="waitingTitle">Waiting for response…</h3>
    <p id="waitingText">Your invite has been sent.</p>
    <div class="modal-actions">
      <button class="btn btn-ghost" id="cancelInviteBtn">Cancel</button>
    </div>
  </div>
</div>

<!-- ============ PROMOTION MODAL ============ -->
<div class="overlay hidden" id="promoOverlay">
  <div class="glass modal" style="text-align:center;">
    <h3>Promote Pawn</h3>
    <p>Choose a piece for promotion</p>
    <div class="promo-choices" id="promoChoices"></div>
  </div>
</div>

<!-- ============ GAME OVER MODAL ============ -->
<div class="overlay hidden" id="gameOverOverlay">
  <div class="glass modal" style="text-align:center;">
    <div class="gameover-icon" id="goIcon">🏆</div>
    <div class="gameover-title" id="goTitle">Game Over</div>
    <div class="gameover-sub" id="goSub">—</div>
    <div class="modal-actions">
      <button class="btn btn-ghost" id="goLeaveBtn">Leave</button>
      <button class="btn btn-primary" id="goRematchBtn">Rematch</button>
    </div>
  </div>
</div>

<!-- ============ DRAW OFFER MODAL ============ -->
<div class="overlay hidden" id="drawOfferOverlay">
  <div class="glass modal" style="text-align:center;">
    <h3>Draw Offered</h3>
    <p id="drawOfferText">Your opponent offers a draw.</p>
    <div class="modal-actions">
      <button class="btn btn-ghost" id="declineDrawBtn">Decline</button>
      <button class="btn btn-primary" id="acceptDrawBtn">Accept</button>
    </div>
  </div>
</div>

<!-- ============ LIBRARIES ============ -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js" integrity="sha512-v2CJ7UaYy4JwqLDIrZUI/4hqeoQieOmAZNXBeQyjo21dadnwR+8ZaIJVT8EE2iyI61OV8e6M8PP2/4hpQINQ/g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js" integrity="sha512-jsCf0EmMPvsn5FQ8sk9tPBIB8O8SB+kn2Kd2Wc8LqU9E9O4dJ2y2xCgfWKmUIzCDs1XuMuvbQpXwZg7d18UzZg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/chessboardjs/1.0.0/chessboard-1.0.0.min.js" integrity="sha512-31D2ODVXeVwx8ZKGnhonMK7YJfCH+jvcdE0FjKmYs5uUt96NrCnP1XPjXFcXBaZG4YWc9zK1J2r2pgeqDJnEUQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>

<!-- Firebase Compat SDK -->
<script src="https://www.gstatic.com/firebasejs/10.13.1/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.13.1/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.13.1/firebase-database-compat.js"></script>

<script>
(function(){
"use strict";

/* =====================================================================
   FIREBASE INIT
===================================================================== */
const firebaseConfig = {
  apiKey: "AIzaSyAY9cow1Umc9pWXFqhyHoN8TCagH311ZwA",
  authDomain: "chess-40a5d.firebaseapp.com",
  databaseURL: "https://chess-40a5d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chess-40a5d",
  storageBucket: "chess-40a5d.firebasestorage.app",
  messagingSenderId: "24839142679",
  appId: "1:24839142679:web:625d73e3554de9a484cb52",
  measurementId: "G-EY4JBP0KSW"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

/* =====================================================================
   GLOBAL STATE
===================================================================== */
const State = {
  uid: null,
  username: null,
  roomId: null,
  room: null,          // latest room snapshot value
  game: null,           // chess.js instance
  board: null,          // chessboard.js instance
  myColor: null,        // 'white' | 'black'
  orientation: 'white',
  selectedSquare: null,
  clockInterval: null,
  listeners: {},        // path -> ref (for cleanup)
  sentInviteId: null,
  incomingInviteId: null,
  lastMoveSquares: null,
  rematchRequested: false,
  gameOverShown: false,
  chatMsgCache: {},
};

const ROOM_STALE_MS = 1000 * 60 * 60 * 6;    // 6 hours
const INVITE_STALE_MS = 1000 * 60 * 5;       // 5 minutes

/* =====================================================================
   UTILITIES
===================================================================== */
function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.from(document.querySelectorAll(sel)); }
function el(id){ return document.getElementById(id); }
function show(node){ node.classList.remove('hidden'); }
function hide(node){ node.classList.add('hidden'); }
function initials(name){ return (name||'?').trim().slice(0,2).toUpperCase(); }
function nowTs(){ return Date.now(); }
function safeKey(str){ return String(str).replace(/[.#$/\[\]]/g,'_'); }

function toast(msg, type){
  type = type || 'info';
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.textContent = msg;
  el('toastWrap').appendChild(t);
  setTimeout(()=>{ t.style.opacity='0'; t.style.transition='opacity .3s'; setTimeout(()=>t.remove(),300); }, 3600);
}

function logActivity(html){
  const log = el('activityLog');
  const empty = log.querySelector('.empty-note');
  if(empty) empty.remove();
  const line = document.createElement('div');
  line.className = 'log-line';
  const time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  line.innerHTML = html + '<span class="t">'+time+'</span>';
  log.prepend(line);
  while(log.children.length > 40) log.removeChild(log.lastChild);
}

function fmtClock(ms){
  if(ms === null || ms === undefined) return '--:--';
  if(ms === Infinity) return '∞';
  if(ms < 0) ms = 0;
  const totalSec = Math.ceil(ms/1000);
  const m = Math.floor(totalSec/60);
  const s = totalSec % 60;
  return (m<10?'0':'')+m+':'+(s<10?'0':'')+s;
}

/* =====================================================================
   LOGIN / AUTH
===================================================================== */
el('loginBtn').addEventListener('click', doLogin);
el('nicknameInput').addEventListener('keydown', (e)=>{ if(e.key==='Enter') doLogin(); });

function doLogin(){
  const nameRaw = el('nicknameInput').value.trim();
  el('loginError').textContent = '';
  if(nameRaw.length < 2 || nameRaw.length > 20){
    el('loginError').textContent = 'Nickname must be 2–20 characters.';
    return;
  }
  el('loginBtn').disabled = true;
  el('loginBtnText').innerHTML = '<span class="spinner"></span> Connecting…';

  auth.signInAnonymously().then((cred)=>{
    State.uid = cred.user.uid;
    State.username = nameRaw;
    return cred.user.updateProfile({ displayName: nameRaw }).catch(()=>{});
  }).then(()=>{
    initUserPresence();
  }).catch((err)=>{
    console.error(err);
    el('loginError').textContent = 'Could not connect: ' + err.message;
    el('loginBtn').disabled = false;
    el('loginBtnText').textContent = 'Enter the Lobby';
  });
}

auth.onAuthStateChanged((user)=>{
  if(user && !State.uid){
    // Reconnect scenario (page refresh, already authenticated)
    State.uid = user.uid;
    State.username = user.displayName || ('Player' + user.uid.slice(0,4));
    el('nicknameInput').value = State.username;
    initUserPresence();
  }
});

function initUserPresence(){
  const uid = State.uid;
  const userRef = db.ref('users/' + uid);
  const meta = {
    uid: uid,
    username: State.username,
    online: true,
    joinedAt: firebase.database.ServerValue.TIMESTAMP,
    lastSeen: firebase.database.ServerValue.TIMESTAMP
  };

  // Presence pattern: use .info/connected to (re)establish onDisconnect on every reconnect
  db.ref('.info/connected').on('value', (snap)=>{
    if(snap.val() === true){
      userRef.onDisconnect().remove().then(()=>{
        userRef.update(meta);
      });
      // keep lastSeen fresh
      userRef.update({ lastSeen: firebase.database.ServerValue.TIMESTAMP, online:true });
    }
  });

  enterApp();
  listenOnlineUsers();
  listenIncomingInvites();
  listenSentInviteStatus();
  attemptReconnectToRoom();
  runCleanupSweep();
}

function enterApp(){
  hide(el('loginScreen'));
  el('app').classList.add('active');
  el('meName').textContent = State.username;
  el('meAvatar').textContent = initials(State.username);
}

/* =====================================================================
   LOBBY: ONLINE USERS LIST
===================================================================== */
function listenOnlineUsers(){
  const ref = db.ref('users');
  State.listeners.users = ref;
  ref.on('value', (snap)=>{
    const val = snap.val() || {};
    const list = el('playersList');
    list.innerHTML = '';
    let count = 0;
    const entries = Object.values(val).filter(u => u && u.uid !== State.uid && u.online);
    entries.sort((a,b)=> (b.joinedAt||0) - (a.joinedAt||0));

    entries.forEach(u=>{
      count++;
      const row = document.createElement('div');
      row.className = 'player-row';
      const busy = !!u.roomId;
      row.innerHTML = `
        <div class="player-left">
          <span class="avatar">${initials(u.username)}</span>
          <div>
            <div class="player-name">${escapeHtml(u.username)}</div>
            <div class="player-meta">${busy ? 'In a game' : 'In lobby'}</div>
          </div>
        </div>
        <button class="btn btn-gold btn-sm" ${busy || State.roomId ? 'disabled' : ''}>Invite</button>
      `;
      row.querySelector('button').addEventListener('click', ()=> sendInvite(u.uid, u.username));
      list.appendChild(row);
    });

    if(count === 0){
      list.innerHTML = '<div class="empty-note">No other players online right now.<br>Share this page with a friend!</div>';
    }
    el('onlineCount').textContent = count + ' online';
  });
}

function escapeHtml(str){
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

/* =====================================================================
   INVITE SYSTEM
===================================================================== */
function sendInvite(toUid, toName){
  if(State.roomId){ toast('Finish your current game first.', 'error'); return; }
  if(State.sentInviteId){ toast('You already have a pending invite.', 'error'); return; }

  const inviteRef = db.ref('invites').push();
  const inviteId = inviteRef.key;
  const payload = {
    id: inviteId,
    fromUid: State.uid,
    fromName: State.username,
    toUid: toUid,
    toName: toName,
    status: 'pending',
    createdAt: firebase.database.ServerValue.TIMESTAMP
  };
  inviteRef.set(payload).then(()=>{
    State.sentInviteId = inviteId;
    el('waitingTitle').textContent = 'Waiting for response…';
    el('waitingText').textContent = 'Invite sent to ' + toName + '.';
    show(el('waitingOverlay'));
    logActivity('You invited <b>'+escapeHtml(toName)+'</b>');

    // auto expire after timeout
    setTimeout(()=>{
      db.ref('invites/'+inviteId).once('value').then(s=>{
        const v = s.val();
        if(v && v.status === 'pending'){
          db.ref('invites/'+inviteId).remove();
          if(State.sentInviteId === inviteId){
            State.sentInviteId = null;
            hide(el('waitingOverlay'));
            toast('Invite expired.', 'info');
          }
        }
      });
    }, INVITE_STALE_MS);
  }).catch(err=>{
    toast('Failed to send invite: ' + err.message, 'error');
  });
}

el('cancelInviteBtn').addEventListener('click', ()=>{
  if(State.sentInviteId){
    db.ref('invites/' + State.sentInviteId).remove();
    State.sentInviteId = null;
  }
  hide(el('waitingOverlay'));
});

function listenIncomingInvites(){
  const ref = db.ref('invites').orderByChild('toUid').equalTo(State.uid);
  State.listeners.incomingInvites = ref;
  ref.on('child_added', (snap)=>{
    const inv = snap.val();
    if(!inv || inv.status !== 'pending') return;
    if(State.roomId){
      // auto-decline if already in a game
      db.ref('invites/'+snap.key).update({status:'declined'});
      return;
    }
    State.incomingInviteId = snap.key;
    el('inviteAvatar').textContent = initials(inv.fromName);
    el('inviteTitle').textContent = 'Game Invite';
    el('inviteText').textContent = inv.fromName + ' wants to play a game with you.';
    show(el('inviteOverlay'));
  });

  ref.on('child_changed', (snap)=>{
    const inv = snap.val();
    if(inv && inv.status !== 'pending' && State.incomingInviteId === snap.key){
      hide(el('inviteOverlay'));
      State.incomingInviteId = null;
    }
  });

  ref.on('child_removed', (snap)=>{
    if(State.incomingInviteId === snap.key){
      hide(el('inviteOverlay'));
      State.incomingInviteId = null;
    }
  });
}

function listenSentInviteStatus(){
  const ref = db.ref('invites').orderByChild('fromUid').equalTo(State.uid);
  State.listeners.sentInvites = ref;
  ref.on('child_changed', (snap)=>{
    const inv = snap.val();
    if(!inv || inv.id !== State.sentInviteId) return;

    if(inv.status === 'accepted' && inv.roomId){
      hide(el('waitingOverlay'));
      State.sentInviteId = null;
      logActivity('<b>'+escapeHtml(inv.toName)+'</b> accepted your invite');
      joinRoom(inv.roomId);
      db.ref('invites/'+snap.key).remove();
    } else if(inv.status === 'declined'){
      hide(el('waitingOverlay'));
      State.sentInviteId = null;
      toast(inv.toName + ' declined your invite.', 'error');
      db.ref('invites/'+snap.key).remove();
    }
  });
}

el('acceptInviteBtn').addEventListener('click', ()=>{
  if(!State.incomingInviteId) return;
  const inviteId = State.incomingInviteId;
  const inviteRef = db.ref('invites/'+inviteId);

  inviteRef.once('value').then(snap=>{
    const inv = snap.val();
    if(!inv || inv.status !== 'pending'){ hide(el('inviteOverlay')); return; }

    const roomRef = db.ref('gameRooms').push();
    const roomId = roomRef.key;
    const roomData = buildNewRoom(roomId, inv.fromUid, inv.fromName, inv.toUid, inv.toName);

    roomRef.set(roomData).then(()=>{
      return inviteRef.update({ status:'accepted', roomId: roomId });
    }).then(()=>{
      hide(el('inviteOverlay'));
      State.incomingInviteId = null;
      logActivity('You accepted an invite from <b>'+escapeHtml(inv.fromName)+'</b>');
      joinRoom(roomId);
    }).catch(err=> toast('Failed to create room: '+err.message, 'error'));
  });
});

el('declineInviteBtn').addEventListener('click', ()=>{
  if(!State.incomingInviteId) return;
  db.ref('invites/'+State.incomingInviteId).update({status:'declined'});
  hide(el('inviteOverlay'));
  State.incomingInviteId = null;
});

function buildNewRoom(roomId, uidA, nameA, uidB, nameB){
  return {
    id: roomId,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    status: 'setup',
    players: {
      [safeKey(uidA)]: { uid: uidA, name: nameA },
      [safeKey(uidB)]: { uid: uidB, name: nameB }
    },
    playerOrder: [uidA, uidB],
    fen: 'start',
    turn: 'w',
    readySelections: {},
    presence: {
      [safeKey(uidA)]: true,
      [safeKey(uidB)]: true
    },
    winner: null,
    reason: null,
    lastActivity: firebase.database.ServerValue.TIMESTAMP
  };
}

/* =====================================================================
   ROOM: JOIN / LEAVE / RECONNECT
===================================================================== */
function attemptReconnectToRoom(){
  db.ref('users/'+State.uid+'/roomId').once('value').then(snap=>{
    const rid = snap.val();
    if(rid){
      db.ref('gameRooms/'+rid).once('value').then(rsnap=>{
        const room = rsnap.val();
        if(room && room.status !== 'finished'){
          toast('Reconnecting to your game…', 'info');
          joinRoom(rid);
        } else {
          db.ref('users/'+State.uid+'/roomId').remove();
        }
      });
    }
  });
}

function joinRoom(roomId){
  if(State.roomId === roomId && State.listeners.room) return;
  cleanupRoomListeners();

  State.roomId = roomId;
  db.ref('users/'+State.uid).update({ roomId: roomId, status:'in-room' });

  hide(el('lobbyView'));
  show(el('roomView'));
  el('leaveRoomBtn').style.display = 'inline-flex';
  State.gameOverShown = false;

  // presence + onDisconnect for this room
  const presRef = db.ref('gameRooms/'+roomId+'/presence/'+safeKey(State.uid));
  presRef.onDisconnect().set(false);
  presRef.set(true);

  const roomRef = db.ref('gameRooms/'+roomId);
  State.listeners.room = roomRef;
  roomRef.on('value', onRoomUpdate);

  const chatRef = db.ref('gameRooms/'+roomId+'/chat');
  State.listeners.chat = chatRef;
  State.chatMsgCache = {};
  el('chatLog').innerHTML = '';
  chatRef.limitToLast(100).on('child_added', onChatMsg);
}

function cleanupRoomListeners(){
  if(State.listeners.room){ State.listeners.room.off('value', onRoomUpdate); State.listeners.room = null; }
  if(State.listeners.chat){ State.listeners.chat.off('child_added', onChatMsg); State.listeners.chat = null; }
  if(State.clockInterval){ clearInterval(State.clockInterval); State.clockInterval = null; }
}

function leaveRoomCleanup(deleteRoom){
  const roomId = State.roomId;
  if(!roomId) return;
  cleanupRoomListeners();
  db.ref('gameRooms/'+roomId+'/presence/'+safeKey(State.uid)).onDisconnect().cancel();
  db.ref('users/'+State.uid).update({ roomId: null, status:'lobby' });
  if(deleteRoom){
    db.ref('gameRooms/'+roomId).remove();
  }
  State.roomId = null;
  State.room = null;
  State.game = null;
  State.myColor = null;
  State.gameOverShown = false;
  hide(el('roomView'));
  hide(el('gameOverOverlay'));
  show(el('lobbyView'));
  el('leaveRoomBtn').style.display = 'none';
  hide(el('setupView'));
  hide(el('boardView'));
}

el('leaveRoomBtn').addEventListener('click', ()=>{
  const room = State.room;
  if(room && room.status === 'playing'){
    // treat as resignation
    finishGame(getOpponentUid(), 'opponent_left');
  }
  leaveRoomCleanup(room && room.status !== 'playing');
});

window.addEventListener('beforeunload', ()=>{
  // best-effort; onDisconnect() handles the rest
});

/* =====================================================================
   ROOM STATE HANDLING
===================================================================== */
function getOpponentUid(){
  if(!State.room || !State.room.playerOrder) return null;
  return State.room.playerOrder.find(u => u !== State.uid);
}
function getMyPlayerInfo(){
  if(!State.room) return null;
  return State.room.players[safeKey(State.uid)];
}
function getOppPlayerInfo(){
  const oppUid = getOpponentUid();
  if(!oppUid || !State.room) return null;
  return State.room.players[safeKey(oppUid)];
}

let firstRoomLoad = true;

function onRoomUpdate(snap){
  const room = snap.val();
  if(!room){
    // room deleted
    if(State.roomId){
      toast('Game room closed.', 'info');
      leaveRoomCleanup(false);
    }
    return;
  }
  const prevStatus = State.room ? State.room.status : null;
  State.room = room;

  renderSetupPanel();

  if(room.status === 'setup'){
    hide(el('boardView'));
    show(el('setupView'));
  } else if(room.status === 'playing' || room.status === 'finished'){
    hide(el('setupView'));
    show(el('boardView'));
    if(prevStatus !== 'playing' && prevStatus !== 'finished'){
      initBoardForGame();
    }
    syncBoardFromRoom();
    updatePlayerCards();
    updateClocksDisplay();
    if(room.status === 'finished' && !State.gameOverShown){
      showGameOver();
    }
  }

  checkOpponentPresence(room);
  checkDrawOffer(room);
  checkRematch(room);

  firstRoomLoad = false;
}

function checkOpponentPresence(room){
  if(room.status !== 'playing') return;
  const oppUid = getOpponentUid();
  if(!oppUid) return;
  const oppPresent = room.presence && room.presence[safeKey(oppUid)];
  if(oppPresent === false && room.status === 'playing' && !State.gameOverShown){
    // opponent disconnected -> I win
    finishGame(State.uid, 'opponent_disconnected');
  }
}

/* =====================================================================
   SETUP / READY SCREEN
===================================================================== */
let mySelection = { color: null, timer: null };

$all('#colorPills .pill').forEach(p=>{
  p.addEventListener('click', ()=>{
    $all('#colorPills .pill').forEach(x=>x.classList.remove('selected'));
    p.classList.add('selected');
    mySelection.color = p.dataset.value;
  });
});
$all('#timerPills .pill').forEach(p=>{
  p.addEventListener('click', ()=>{
    $all('#timerPills .pill').forEach(x=>x.classList.remove('selected'));
    p.classList.add('selected');
    mySelection.timer = parseInt(p.dataset.value, 10);
  });
});

el('readyBtn').addEventListener('click', ()=>{
  if(mySelection.color === null || mySelection.timer === null){
    toast('Please choose a side and a time control.', 'error');
    return;
  }
  const path = 'gameRooms/'+State.roomId+'/readySelections/'+safeKey(State.uid);
  db.ref(path).set({
    color: mySelection.color,
    timer: mySelection.timer,
    ready: true,
    ts: firebase.database.ServerValue.TIMESTAMP
  }).then(()=>{
    el('readyBtn').disabled = true;
    el('readyBtn').textContent = 'Waiting for opponent…';
    maybeStartGame();
  });
});

function renderSetupPanel(){
  const room = State.room;
  if(!room) return;
  const me = getMyPlayerInfo();
  const opp = getOppPlayerInfo();
  el('setupMeAvatar').textContent = initials(me ? me.name : State.username);
  el('setupMeName').textContent = (me ? me.name : State.username) + ' (you)';
  el('setupOppAvatar').textContent = initials(opp ? opp.name : '?');
  el('setupOppName').textContent = opp ? opp.name : 'Opponent';
  el('setupVs').textContent = (me?me.name:'') + ' vs ' + (opp?opp.name:'…');

  const sels = room.readySelections || {};
  const mySel = sels[safeKey(State.uid)];
  const oppUid = getOpponentUid();
  const oppSel = oppUid ? sels[safeKey(oppUid)] : null;

  el('setupMeBadge').textContent = mySel && mySel.ready ? 'Ready' : 'Not Ready';
  el('setupMeBadge').className = 'ready-badge ' + (mySel && mySel.ready ? 'ready' : 'waiting');
  el('setupOppBadge').textContent = oppSel && oppSel.ready ? 'Ready' : 'Not Ready';
  el('setupOppBadge').className = 'ready-badge ' + (oppSel && oppSel.ready ? 'ready' : 'waiting');

  if(mySel && mySel.ready){
    el('readyBtn').disabled = true;
    el('readyBtn').textContent = 'Waiting for opponent…';
  }

  if(room.status === 'setup' && mySel && mySel.ready && oppSel && oppSel.ready){
    maybeStartGame();
  }
}

function maybeStartGame(){
  const room = State.room;
  if(!room || room.status !== 'setup') return;
  const sels = room.readySelections || {};
  const order = room.playerOrder;
  if(!order || order.length !== 2) return;
  const selA = sels[safeKey(order[0])];
  const selB = sels[safeKey(order[1])];
  if(!(selA && selA.ready && selB && selB.ready)) return;

  // Deterministic leader: lower uid string performs the assignment transaction
  const leader = order.slice().sort()[0];
  if(State.uid !== leader) return;

  db.ref('gameRooms/'+State.roomId).transaction((current)=>{
    if(!current || current.status !== 'setup') return current;
    const s = current.readySelections || {};
    const sA = s[safeKey(order[0])];
    const sB = s[safeKey(order[1])];
    if(!(sA && sA.ready && sB && sB.ready)) return current;

    let colorA = sA.color, colorB = sB.color;
    if(colorA === 'random' && colorB === 'random'){
      colorA = Math.random() < 0.5 ? 'white' : 'black';
      colorB = colorA === 'white' ? 'black' : 'white';
    } else if(colorA === 'random' && colorB !== 'random'){
      colorA = colorB === 'white' ? 'black' : 'white';
    } else if(colorB === 'random' && colorA !== 'random'){
      colorB = colorA === 'white' ? 'black' : 'white';
    } else if(colorA === colorB){
      // conflict, randomize
      colorA = Math.random() < 0.5 ? 'white' : 'black';
      colorB = colorA === 'white' ? 'black' : 'white';
    }

    const timerMin = sA.timer; // leader's selection governs time control
    const timeMs = timerMin === 0 ? Infinity : timerMin * 60 * 1000;

    const whiteUid = colorA === 'white' ? order[0] : order[1];
    const blackUid = colorA === 'white' ? order[1] : order[0];

    current.status = 'playing';
    current.fen = 'start';
    current.turn = 'w';
    current.whiteUid = whiteUid;
    current.blackUid = blackUid;
    current.timer = {
      minutes: timerMin,
      whiteTimeLeft: timeMs,
      blackTimeLeft: timeMs,
      turnStartedAt: firebase.database.ServerValue.TIMESTAMP
    };
    current.moveHistory = [];
    current.captured = { white: [], black: [] };
    current.winner = null;
    current.reason = null;
    current.rematch = {};
    current.drawOffer = null;
    current.lastActivity = firebase.database.ServerValue.TIMESTAMP;
    return current;
  }).catch(err=> console.error('start txn failed', err));
}

/* =====================================================================
   CHESS BOARD / GAME LOGIC
===================================================================== */
function initBoardForGame(){
  const room = State.room;
  State.game = new Chess();
  State.myColor = room.whiteUid === State.uid ? 'white' : 'black';
  State.orientation = State.myColor;

  const topInfo = State.myColor === 'white' ? room.players[safeKey(room.blackUid)] : room.players[safeKey(room.whiteUid)];
  const bottomInfo = State.myColor === 'white' ? room.players[safeKey(room.whiteUid)] : room.players[safeKey(room.blackUid)];

  if(State.board){ State.board.destroy(); State.board = null; }
  State.board = Chessboard('board', {
    position: 'start',
    draggable: true,
    pieceTheme: 'https://cdnjs.cloudflare.com/ajax/libs/chessboardjs/1.0.0/img/chesspieces/wikipedia/{piece}.png',
    orientation: State.orientation,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  });

  window.addEventListener('resize', ()=>{ if(State.board) State.board.resize(); });

  if(State.clockInterval) clearInterval(State.clockInterval);
  State.clockInterval = setInterval(updateClocksDisplay, 250);

  el('flipBtn').onclick = ()=>{
    State.orientation = State.orientation === 'white' ? 'black' : 'white';
    State.board.orientation(State.orientation);
    updatePlayerCards();
  };
  el('resignBtn').onclick = confirmResign;
  el('drawBtn').onclick = offerDraw;
}

function onDragStart(source, piece){
  const room = State.room;
  if(!room || room.status !== 'playing') return false;
  const myTurnColor = State.myColor === 'white' ? 'w' : 'b';
  if(room.turn !== myTurnColor) return false;
  if((myTurnColor === 'w' && piece.search(/^b/) !== -1)) return false;
  if((myTurnColor === 'b' && piece.search(/^w/) !== -1)) return false;
  clearHighlights();
  highlightLegalMoves(source);
  return true;
}

function highlightLegalMoves(square){
  const moves = State.game.moves({ square: square, verbose: true });
  const $sq = $board_square(square);
  $sq.addClass('sq-select');
  moves.forEach(m=>{
    const cls = m.flags.indexOf('c') !== -1 || m.flags.indexOf('e') !== -1 ? 'sq-capture' : 'sq-legal';
    $board_square(m.to).addClass(cls);
  });
}
function $board_square(square){
  return $('#board .square-' + square);
}
function clearHighlights(){
  $all('#board .square-55d63, #board [class*="square-"]').forEach(n=>{
    n.classList.remove('sq-legal','sq-capture','sq-select');
  });
}

let pendingPromotion = null;

function onDrop(source, target){
  clearHighlights();
  if(source === target) return 'snapback';

  const piece = State.game.get(source);
  const isPromotion = piece && piece.type === 'p' &&
    ((piece.color === 'w' && target[1] === '8') || (piece.color === 'b' && target[1] === '1'));

  if(isPromotion){
    const legal = State.game.moves({square:source, verbose:true}).some(m=>m.to===target);
    if(!legal) return 'snapback';
    pendingPromotion = { source, target };
    showPromotionModal(piece.color);
    return; // wait for user choice; piece visually stays until we resolve
  }

  const move = State.game.move({ from: source, to: target, promotion: 'q' });
  if(move === null) return 'snapback';

  commitMove(move);
}

function showPromotionModal(color){
  const pieces = ['q','r','b','n'];
  const container = el('promoChoices');
  container.innerHTML = '';
  pieces.forEach(p=>{
    const div = document.createElement('div');
    div.className = 'promo-choice';
    const code = (color === 'w' ? 'w' : 'b') + p.toUpperCase();
    div.innerHTML = `<img src="https://cdnjs.cloudflare.com/ajax/libs/chessboardjs/1.0.0/img/chesspieces/wikipedia/${code}.png" style="width:44px;height:44px;">`;
    div.addEventListener('click', ()=>{
      hide(el('promoOverlay'));
      if(!pendingPromotion) return;
      const mv = State.game.move({ from: pendingPromotion.source, to: pendingPromotion.target, promotion: p });
      pendingPromotion = null;
      if(mv){ commitMove(mv); } else { State.board.position(State.game.fen()); }
    });
    container.appendChild(div);
  });
  show(el('promoOverlay'));
}

function onSnapEnd(){
  if(pendingPromotion) return;
  State.board.position(State.game.fen());
}

function commitMove(move){
  const room = State.room;
  const fen = State.game.fen();
  const turn = State.game.turn();

  // update captured pieces
  const captured = room.captured || { white: [], black: [] };
  if(move.captured){
    const capturedByColor = move.color === 'w' ? 'white' : 'black';
    captured[capturedByColor] = (captured[capturedByColor]||[]).concat([move.captured]);
  }

  // clock update: deduct elapsed time from the mover, reset turnStartedAt
  const timer = room.timer || {};
  const turnStartedAt = timer.turnStartedAt || nowTs();
  const elapsed = nowTs() - turnStartedAt;
  let whiteTimeLeft = timer.whiteTimeLeft;
  let blackTimeLeft = timer.blackTimeLeft;
  if(whiteTimeLeft !== Infinity && blackTimeLeft !== Infinity){
    if(move.color === 'w') whiteTimeLeft = Math.max(0, whiteTimeLeft - elapsed);
    else blackTimeLeft = Math.max(0, blackTimeLeft - elapsed);
  }

  const historyEntry = {
    san: move.san, from: move.from, to: move.to, color: move.color,
    fen: fen, ts: firebase.database.ServerValue.TIMESTAMP
  };

  const updates = {};
  updates['gameRooms/'+State.roomId+'/fen'] = fen;
  updates['gameRooms/'+State.roomId+'/turn'] = turn;
  updates['gameRooms/'+State.roomId+'/moveHistory'] = (room.moveHistory||[]).concat([historyEntry]);
  updates['gameRooms/'+State.roomId+'/captured'] = captured;
  updates['gameRooms/'+State.roomId+'/timer/whiteTimeLeft'] = whiteTimeLeft === Infinity ? 'inf' : whiteTimeLeft;
  updates['gameRooms/'+State.roomId+'/timer/blackTimeLeft'] = blackTimeLeft === Infinity ? 'inf' : blackTimeLeft;
  updates['gameRooms/'+State.roomId+'/timer/turnStartedAt'] = firebase.database.ServerValue.TIMESTAMP;
  updates['gameRooms/'+State.roomId+'/lastActivity'] = firebase.database.ServerValue.TIMESTAMP;
  updates['gameRooms/'+State.roomId+'/drawOffer'] = null;

  db.ref().update(updates).then(()=>{
    checkGameEndConditions();
  });
}

function checkGameEndConditions(){
  const g = State.game;
  if(g.in_checkmate()){
    const winnerColor = g.turn() === 'w' ? 'black' : 'white';
    const winnerUid = winnerColor === 'white' ? State.room.whiteUid : State.room.blackUid;
    finishGame(winnerUid, 'checkmate');
  } else if(g.in_stalemate()){
    finishGame(null, 'stalemate');
  } else if(g.in_threefold_repetition()){
    finishGame(null, 'threefold_repetition');
  } else if(g.insufficient_material()){
    finishGame(null, 'insufficient_material');
  } else if(g.in_draw()){
    finishGame(null, 'fifty_move_rule');
  }
}

function syncBoardFromRoom(){
  const room = State.room;
  if(!room || !State.game) return;
  if(room.fen && room.fen !== 'start'){
    if(State.game.fen() !== room.fen){
      State.game.load(room.fen);
    }
  }
  if(State.board) State.board.position(State.game.fen() === (new Chess()).fen() && room.fen==='start' ? 'start' : State.game.fen());

  // last move highlight
  clearHighlights();
  const hist = room.moveHistory || [];
  if(hist.length){
    const last = hist[hist.length-1];
    $board_square(last.from).addClass('sq-last');
    $board_square(last.to).addClass('sq-last');
  }
  renderMoveHistory(hist);
  renderCapturedPieces(room.captured);
  updateStatusBanner();
}

function renderMoveHistory(hist){
  const list = el('movesList');
  list.innerHTML = '';
  for(let i=0;i<hist.length;i+=2){
    const num = Math.floor(i/2)+1;
    const w = hist[i] ? hist[i].san : '';
    const b = hist[i+1] ? hist[i+1].san : '';
    const row = document.createElement('div');
    row.className = 'mv-row';
    row.innerHTML = `<span class="n">${num}.</span><span>${w}</span><span>${b}</span>`;
    list.appendChild(row);
  }
  list.scrollTop = list.scrollHeight;
}

function renderCapturedPieces(captured){
  captured = captured || {white:[], black:[]};
  const glyphs = { p:'♟',n:'♞',b:'♝',r:'♜',q:'♛',k:'♚' };
  const bottomIsMe = true;
  // pieces captured BY white are shown on white's side (opponent losses)
  const capturedByMe = State.myColor === 'white' ? captured.white : captured.black;
  const capturedByOpp = State.myColor === 'white' ? captured.black : captured.white;
  el('bottomCaptured').textContent = (capturedByMe||[]).map(p=>glyphs[p]||'').join(' ');
  el('topCaptured').textContent = (capturedByOpp||[]).map(p=>glyphs[p]||'').join(' ');
}

function updateStatusBanner(){
  const banner = el('statusBanner');
  const room = State.room;
  if(!room || room.status !== 'playing'){ banner.textContent = room && room.status==='finished' ? 'Game finished' : 'Waiting…'; banner.classList.remove('check'); return; }
  const g = State.game;
  const turnName = g.turn() === 'w' ? (room.players[safeKey(room.whiteUid)]||{}).name : (room.players[safeKey(room.blackUid)]||{}).name;
  if(g.in_check()){
    banner.textContent = (turnName||'Player') + ' is in check!';
    banner.classList.add('check');
    highlightKingInCheck();
  } else {
    banner.textContent = (turnName||'Player') + "'s turn to move";
    banner.classList.remove('check');
  }
}

function highlightKingInCheck(){
  const g = State.game;
  const color = g.turn();
  const board = g.board();
  for(let r=0;r<8;r++){
    for(let c=0;c<8;c++){
      const sq = board[r][c];
      if(sq && sq.type==='k' && sq.color===color){
        const file = 'abcdefgh'[c];
        const rank = 8-r;
        $board_square(file+rank).addClass('sq-check');
      }
    }
  }
}

/* =====================================================================
   PLAYER CARDS + CLOCKS
===================================================================== */
function updatePlayerCards(){
  const room = State.room;
  if(!room) return;
  const topUid = State.orientation === 'white' ? room.blackUid : room.whiteUid;
  const bottomUid = State.orientation === 'white' ? room.whiteUid : room.blackUid;
  const topInfo = room.players[safeKey(topUid)] || {name:'—'};
  const bottomInfo = room.players[safeKey(bottomUid)] || {name:'—'};

  el('topName').textContent = topInfo.name;
  el('topAvatar').textContent = initials(topInfo.name);
  el('topRole').textContent = topUid === room.whiteUid ? 'White' : 'Black';
  el('bottomName').textContent = bottomInfo.name;
  el('bottomAvatar').textContent = initials(bottomInfo.name);
  el('bottomRole').textContent = bottomUid === room.whiteUid ? 'White' : 'Black';

  const turnColor = room.turn === 'w' ? room.whiteUid : room.blackUid;
  el('topPlayerCard').classList.toggle('active-turn', room.status==='playing' && turnColor === topUid);
  el('bottomPlayerCard').classList.toggle('active-turn', room.status==='playing' && turnColor === bottomUid);
}

function updateClocksDisplay(){
  const room = State.room;
  if(!room || !room.timer || room.status !== 'playing'){
    if(room && room.timer){
      el('topClock').textContent = fmtClock(deInf(room.timer.whiteTimeLeft));
      el('bottomClock').textContent = fmtClock(deInf(room.timer.blackTimeLeft));
    }
    return;
  }
  const timer = room.timer;
  let whiteLeft = deInf(timer.whiteTimeLeft);
  let blackLeft = deInf(timer.blackTimeLeft);

  if(whiteLeft !== Infinity && blackLeft !== Infinity && timer.turnStartedAt){
    const elapsed = nowTs() - timer.turnStartedAt;
    if(room.turn === 'w') whiteLeft = Math.max(0, whiteLeft - elapsed);
    else blackLeft = Math.max(0, blackLeft - elapsed);
  }

  const topIsWhite = (State.orientation === 'black');
  el('topClock').textContent = fmtClock(topIsWhite ? whiteLeft : blackLeft);
  el('bottomClock').textContent = fmtClock(topIsWhite ? blackLeft : whiteLeft);
  el('topClock').classList.toggle('low', (topIsWhite?whiteLeft:blackLeft) < 15000 && (topIsWhite?whiteLeft:blackLeft) !== Infinity);
  el('bottomClock').classList.toggle('low', (topIsWhite?blackLeft:whiteLeft) < 15000 && (topIsWhite?blackLeft:whiteLeft) !== Infinity);

  // Timeout detection (only the player whose turn's clock hit 0 triggers the write, guarded by transaction-like check)
  if(whiteLeft <= 0 && whiteLeft !== Infinity && room.turn === 'w' && !State.gameOverShown){
    finishGame(room.blackUid, 'timeout');
  } else if(blackLeft <= 0 && blackLeft !== Infinity && room.turn === 'b' && !State.gameOverShown){
    finishGame(room.whiteUid, 'timeout');
  }
}
function deInf(v){ return v === 'inf' ? Infinity : v; }

/* =====================================================================
   GAME END / RESIGN / DRAW
===================================================================== */
function finishGame(winnerUid, reason){
  if(!State.roomId) return;
  db.ref('gameRooms/'+State.roomId).transaction((current)=>{
    if(!current || current.status === 'finished') return current;
    current.status = 'finished';
    current.winner = winnerUid || null;
    current.reason = reason;
    current.lastActivity = firebase.database.ServerValue.TIMESTAMP;
    return current;
  });
}

function confirmResign(){
  if(!confirm('Are you sure you want to resign?')) return;
  finishGame(getOpponentUid(), 'resignation');
}

function offerDraw(){
  if(!State.roomId) return;
  db.ref('gameRooms/'+State.roomId+'/drawOffer').set({ byUid: State.uid, ts: firebase.database.ServerValue.TIMESTAMP });
  toast('Draw offer sent.', 'info');
}

let drawOfferShownFor = null;
function checkDrawOffer(room){
  const offer = room.drawOffer;
  if(offer && offer.byUid !== State.uid && room.status === 'playing'){
    if(drawOfferShownFor !== offer.ts){
      drawOfferShownFor = offer.ts;
      el('drawOfferText').textContent = (getOppPlayerInfo()||{}).name + ' offers a draw.';
      show(el('drawOfferOverlay'));
    }
  } else if(!offer){
    hide(el('drawOfferOverlay'));
  }
}
el('acceptDrawBtn').addEventListener('click', ()=>{
  hide(el('drawOfferOverlay'));
  finishGame(null, 'draw_agreement');
});
el('declineDrawBtn').addEventListener('click', ()=>{
  hide(el('drawOfferOverlay'));
  if(State.roomId) db.ref('gameRooms/'+State.roomId+'/drawOffer').remove();
});

function showGameOver(){
  State.gameOverShown = true;
  const room = State.room;
  const icon = el('goIcon'), title = el('goTitle'), sub = el('goSub');
  const reasonText = {
    checkmate: 'by checkmate',
    resignation: 'by resignation',
    timeout: 'on time',
    opponent_disconnected: '— opponent disconnected',
    opponent_left: '— opponent left the game',
    stalemate: 'Draw by stalemate',
    threefold_repetition: 'Draw by threefold repetition',
    insufficient_material: 'Draw — insufficient material',
    fifty_move_rule: 'Draw by the fifty-move rule',
    draw_agreement: 'Draw by agreement'
  };
  if(room.winner){
    const iamWinner = room.winner === State.uid;
    icon.textContent = iamWinner ? '🏆' : '😔';
    title.textContent = iamWinner ? 'You Won!' : 'You Lost';
    const winnerInfo = room.players[safeKey(room.winner)] || {};
    sub.textContent = (winnerInfo.name||'Winner') + ' wins ' + (reasonText[room.reason]||'');
  } else {
    icon.textContent = '🤝';
    title.textContent = 'Draw';
    sub.textContent = reasonText[room.reason] || 'The game ended in a draw.';
  }
  show(el('gameOverOverlay'));
}

el('goLeaveBtn').addEventListener('click', ()=>{
  leaveRoomCleanup(true);
});

el('goRematchBtn').addEventListener('click', ()=>{
  if(!State.roomId) return;
  State.rematchRequested = true;
  db.ref('gameRooms/'+State.roomId+'/rematch/'+safeKey(State.uid)).set(true);
  el('goRematchBtn').disabled = true;
  el('goRematchBtn').textContent = 'Waiting for opponent…';
});

function checkRematch(room){
  const r = room.rematch || {};
  const order = room.playerOrder;
  if(!order) return;
  if(room.status === 'finished' && r[safeKey(order[0])] && r[safeKey(order[1])]){
    const leader = order.slice().sort()[0];
    if(State.uid === leader){
      db.ref('gameRooms/'+State.roomId).transaction((current)=>{
        if(!current || current.status !== 'finished') return current;
        current.status = 'setup';
        current.readySelections = {};
        current.fen = 'start';
        current.moveHistory = [];
        current.captured = {white:[],black:[]};
        current.winner = null;
        current.reason = null;
        current.rematch = {};
        current.drawOffer = null;
        current.lastActivity = firebase.database.ServerValue.TIMESTAMP;
        return current;
      });
    }
    hide(el('gameOverOverlay'));
    State.gameOverShown = false;
    State.rematchRequested = false;
    el('goRematchBtn').disabled = false;
    el('goRematchBtn').textContent = 'Rematch';
    mySelection = { color:null, timer:null };
    $all('.pill').forEach(p=>p.classList.remove('selected'));
    el('readyBtn').disabled = false;
    el('readyBtn').textContent = "I'm Ready";
  }
}

/* =====================================================================
   CHAT
===================================================================== */
el('chatSendBtn').addEventListener('click', sendChat);
el('chatInput').addEventListener('keydown', (e)=>{ if(e.key==='Enter') sendChat(); });

function sendChat(){
  const input = el('chatInput');
  const text = input.value.trim();
  if(!text || !State.roomId) return;
  db.ref('gameRooms/'+State.roomId+'/chat').push({
    uid: State.uid,
    name: State.username,
    text: text.slice(0,200),
    ts: firebase.database.ServerValue.TIMESTAMP
  });
  input.value = '';
}

function onChatMsg(snap){
  const msg = snap.val();
  if(!msg || State.chatMsgCache[snap.key]) return;
  State.chatMsgCache[snap.key] = true;
  const log = el('chatLog');
  const div = document.createElement('div');
  div.className = 'chat-msg';
  const isMe = msg.uid === State.uid;
  const time = msg.ts ? new Date(msg.ts).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) : '';
  div.innerHTML = `<span class="who ${isMe?'me':''}">${escapeHtml(msg.name)}</span><span class="ts">${time}</span><div>${escapeHtml(msg.text)}</div>`;
  log.appendChild(div);
  log.scrollTop = log.scrollHeight;
}

/* =====================================================================
   DATABASE CLEANUP SWEEP (client-assisted, best-effort)
===================================================================== */
function runCleanupSweep(){
  // Run once shortly after connecting, then periodically while tab is open.
  const sweep = ()=>{
    const cutoffRoom = nowTs() - ROOM_STALE_MS;
    db.ref('gameRooms').orderByChild('lastActivity').endAt(cutoffRoom).once('value').then(snap=>{
      snap.forEach(child=>{
        db.ref('gameRooms/'+child.key).remove();
      });
    }).catch(()=>{});

    const cutoffInvite = nowTs() - INVITE_STALE_MS;
    db.ref('invites').orderByChild('createdAt').endAt(cutoffInvite).once('value').then(snap=>{
      snap.forEach(child=>{
        db.ref('invites/'+child.key).remove();
      });
    }).catch(()=>{});
  };
  sweep();
  setInterval(sweep, 5 * 60 * 1000);
}

})();
</script>
</body>
</html>
