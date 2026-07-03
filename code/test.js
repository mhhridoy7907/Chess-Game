<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MH2 Chess — Online Chess</title>

<style>
:root {
  --primary-color: #6366f1;
  --primary-dark: #4f46e5;
  --secondary-color: #8b5cf6;
  --success-color: #10b981;
  --danger-color: #ef4444;
  --warning-color: #f59e0b;
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --bg-tertiary: #334155;
  --glass-bg: rgba(51, 65, 85, 0.1);
  --glass-border: rgba(148, 163, 184, 0.2);
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --border-radius: 16px;
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
}
body { overflow-y: auto; }
.glass-panel {
  background: var(--glass-bg); backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border); border-radius: var(--border-radius);
  padding: 24px; box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}
.screen {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  display: none; z-index: 100; overflow-y: auto; animation: fadeIn .3s ease-out;
}
.screen.active { display: flex; }
@keyframes fadeIn { from{opacity:0;transform:translateY(10px);} to{opacity:1;transform:translateY(0);} }

#loginScreen { align-items:center; justify-content:center; padding:20px; background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 50%, var(--bg-primary) 100%); }
.login-container { width:100%; max-width:450px; }
.login-container .glass-panel { text-align:center; }
.login-container h1 { font-size:3rem; margin-bottom:8px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.subtitle { color: var(--text-secondary); margin-bottom:32px; font-size:.95rem; }
.form-group { margin-bottom:20px; text-align:left; }
.input-field { width:100%; padding:12px 16px; background: rgba(100,116,139,.1); border:1px solid var(--glass-border); border-radius:12px; color:var(--text-primary); font-size:1rem; transition:var(--transition); }
.input-field:focus { outline:none; border-color:var(--primary-color); background: rgba(100,116,139,.2); box-shadow:0 0 20px rgba(99,102,241,.2); }
.input-field::placeholder { color: var(--text-tertiary); }
.error-text { display:block; color:var(--danger-color); margin-top:4px; font-size:.85rem; min-height: 1.2em; }
.login-footer { margin-top:16px; color:var(--text-tertiary); font-size:.85rem; }

.btn { padding:10px 20px; border:none; border-radius:12px; font-size:.95rem; font-weight:600; cursor:pointer; transition:var(--transition); display:inline-flex; align-items:center; gap:8px; white-space:nowrap; }
.btn-primary { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); color:#fff; }
.btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(99,102,241,.3); }
.btn-primary:active { transform:translateY(0); }
.btn-secondary { background: var(--glass-bg); border:1px solid var(--glass-border); color:var(--text-primary); }
.btn-secondary:hover { border-color:var(--primary-color); background: rgba(99,102,241,.1); }
.btn-large { padding:14px 28px; font-size:1.1rem; }
.btn-small { padding:8px 12px; font-size:.85rem; }
.btn-block { width:100%; justify-content:center; margin-bottom:8px; }
.btn-arrow { font-size:1.2rem; }
.btn:disabled { opacity:.5; cursor:not-allowed; }

#lobbyScreen { flex-direction:column; }
.lobby-container { width:100%; height:100%; display:flex; flex-direction:column; padding:20px; gap:20px; }
.header-content { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; }
.lobby-header h1 { font-size:2rem; margin:0; }
.user-info { display:flex; align-items:center; gap:12px; }
.username { background: var(--glass-bg); padding:8px 16px; border-radius:8px; border:1px solid var(--glass-border); }
.lobby-content { flex:1; overflow-y:auto; display:grid; grid-template-columns: repeat(auto-fit, minmax(300px,1fr)); gap:20px; }
.players-section h2 { display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; font-size:1.3rem; }
.count { background: var(--primary-color); padding:4px 12px; border-radius:20px; font-size:.85rem; min-width:40px; text-align:center; }
.players-list { display:flex; flex-direction:column; gap:12px; }
.player-item { background: var(--glass-bg); border:1px solid var(--glass-border); border-radius:12px; padding:16px; display:flex; justify-content:space-between; align-items:center; transition:var(--transition); }
.player-item:hover { background: rgba(99,102,241,.1); border-color:var(--primary-color); }
.player-info { flex:1; }
.player-item .player-name { font-weight:600; font-size:1.05rem; margin-bottom:4px; }
.player-item .player-status { color:var(--text-tertiary); font-size:.85rem; }
.invite-btn { flex-shrink:0; margin-left:12px; }
.loading { text-align:center; color:var(--text-tertiary); padding:40px 20px; }

.popup-overlay { position:fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,.7); display:flex; align-items:center; justify-content:center; z-index:1000; animation:fadeIn .3s ease-out; }
.popup-overlay.hidden { display:none; }
.popup-content { max-width:400px; width:90%; text-align:center; }
.popup-content h2 { margin-bottom:16px; color:var(--primary-color); }
#invitationMessage { color:var(--text-secondary); margin-bottom:24px; font-size:1.1rem; }
.popup-buttons { display:flex; gap:12px; }
.popup-buttons .btn { flex:1; justify-content:center; }

.game-room-container { display:grid; grid-template-columns: 1fr 380px; gap:20px; padding:20px; width:100%; height:100%; overflow:hidden; }
.game-board-section { display:flex; flex-direction:column; gap:16px; overflow-y:auto; }
.chess-board { width:100%; max-width:600px; aspect-ratio:1; background: var(--bg-secondary); border:2px solid var(--glass-border); border-radius:var(--border-radius); display:grid; grid-template-columns:repeat(8,1fr); grid-template-rows:repeat(8,1fr); box-shadow:0 20px 60px rgba(0,0,0,.3); overflow:hidden; }
.board-square { position:relative; display:flex; align-items:center; justify-content:center; cursor:pointer; user-select:none; transition:var(--transition); border:2px solid transparent; }
.board-square.light { background:#d7ccc8; }
.board-square.dark { background:#8b7355; }
.board-square.highlight { background: rgba(34,197,94,.4) !important; border-color: rgba(34,197,94,.6); }
.board-square.selected { background: rgba(99,102,241,.5) !important; border-color: var(--primary-color); }
.board-square.last-move { background: rgba(251,191,36,.3) !important; }
.board-square.in-check { background: rgba(239,68,68,.55) !important; }
.board-piece { font-size:3rem; cursor:grab; user-select:none; transition:var(--transition); filter: drop-shadow(0 2px 4px rgba(0,0,0,.3)); }
.board-piece:hover { transform:scale(1.1); }
.board-piece:active { cursor:grabbing; }
.sq-coord { position:absolute; bottom:2px; left:3px; font-size:.65rem; opacity:.55; pointer-events:none; }
.sq-coord.file { left:auto; right:3px; bottom:2px; top:auto; }
.board-controls { display:flex; gap:12px; flex-wrap:wrap; }

.game-info-section { display:flex; flex-direction:column; gap:16px; overflow-y:auto; padding-right:8px; }
.players-info { display:flex; flex-direction:column; gap:12px; }
.player-card { display:flex; align-items:center; gap:12px; padding:12px; background: rgba(99,102,241,.1); border-radius:12px; }
.player-card.white-player { background: rgba(243,244,246,.1); border:1px solid rgba(243,244,246,.2); }
.player-card.black-player { background: rgba(31,41,55,.3); border:1px solid rgba(31,41,55,.5); }
.player-card.active-turn { outline: 2px solid var(--success-color); }
.piece-symbol { font-size:2rem; }
.player-details { flex:1; }
.player-name { font-weight:600; margin-bottom:2px; }
.player-status { font-size:.85rem; color:var(--text-tertiary); }
.player-timer { font-size:1.5rem; font-weight:700; font-family:'Courier New',monospace; color:var(--primary-color); min-width:60px; text-align:right; }
.player-timer.low-time { color: var(--danger-color); }
.vs-text { text-align:center; color:var(--text-tertiary); font-weight:600; margin:4px 0; }

.config-section { margin-bottom:16px; }
.config-section label { display:block; margin-bottom:8px; font-weight:600; font-size:.95rem; }
.radio-group { display:flex; gap:12px; flex-wrap:wrap; }
.radio-label { display:flex; align-items:center; gap:6px; cursor:pointer; padding:8px 12px; border-radius:8px; border:1px solid var(--glass-border); background: var(--glass-bg); transition:var(--transition); }
.radio-label:hover { border-color:var(--primary-color); background: rgba(99,102,241,.1); }
.select-field { width:100%; padding:10px 12px; background: rgba(100,116,139,.1); border:1px solid var(--glass-border); border-radius:8px; color:var(--text-primary); font-size:.95rem; cursor:pointer; }
.select-field option { background: var(--bg-secondary); color: var(--text-primary); }
.ready-status { font-size:.85rem; color: var(--text-tertiary); margin-top:8px; text-align:center; }

.chat-messages { height:200px; overflow-y:auto; margin-bottom:12px; padding:12px; background: rgba(0,0,0,.2); border-radius:8px; display:flex; flex-direction:column; gap:8px; }
.chat-message { padding:8px 12px; background: rgba(99,102,241,.1); border-radius:6px; border-left:2px solid var(--primary-color); font-size:.9rem; }
.chat-message .message-author { font-weight:600; color:var(--primary-color); margin-bottom:2px; }
.chat-message .message-time { font-size:.75rem; color:var(--text-tertiary); margin-top:4px; }
.chat-input-group { display:flex; gap:8px; }
.chat-field { flex:1; padding:8px 12px !important; font-size:.9rem !important; }
.emoji-bar { display:flex; gap:6px; margin-bottom:8px; flex-wrap:wrap; }
.emoji-btn { background:none; border:none; font-size:1.2rem; cursor:pointer; padding:2px 4px; border-radius:6px; transition:var(--transition); }
.emoji-btn:hover { background: rgba(99,102,241,.2); }

.moves-list { display:grid; grid-template-columns:1fr 1fr; gap:8px; max-height:220px; overflow-y:auto; }
.move-item { padding:8px; background: rgba(99,102,241,.1); border-radius:6px; border:1px solid var(--glass-border); text-align:center; font-size:.9rem; font-family:'Courier New',monospace; }
.move-item.last-move { background: rgba(34,197,94,.2); border-color: var(--success-color); }
.captured-row { display:flex; gap:2px; flex-wrap:wrap; min-height:1.6rem; font-size:1.2rem; }

.game-over-container { display:flex; align-items:center; justify-content:center; width:100%; height:100%; padding:20px; }
.game-over-container .glass-panel { max-width:500px; width:100%; text-align:center; }
#gameOverTitle { font-size:2.5rem; margin-bottom:16px; background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
.game-over-message { font-size:1.1rem; color:var(--text-secondary); margin-bottom:32px; line-height:1.8; }
.game-over-buttons { display:flex; flex-direction:column; gap:12px; }
.game-over-buttons .btn { width:100%; justify-content:center; }

.loading-spinner { position:fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,.5); display:flex; flex-direction:column; align-items:center; justify-content:center; z-index:2000; }
.loading-spinner.hidden { display:none; }
.spinner { width:50px; height:50px; border:4px solid var(--glass-border); border-top-color:var(--primary-color); border-radius:50%; animation: spin .8s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }
#loadingText { margin-top:16px; }

.toast-container { position:fixed; top:20px; right:20px; z-index:3000; display:flex; flex-direction:column; gap:12px; max-width:400px; }
.toast { padding:14px 18px; border-radius:12px; color:#fff; display:flex; align-items:center; gap:12px; box-shadow:0 10px 30px rgba(0,0,0,.3); animation: slideIn .3s ease-out; word-break:break-word; }
.toast.success { background: linear-gradient(135deg, var(--success-color), #059669); }
.toast.error { background: linear-gradient(135deg, var(--danger-color), #dc2626); }
.toast.warning { background: linear-gradient(135deg, var(--warning-color), #d97706); }
.toast.info { background: linear-gradient(135deg, var(--primary-color), var(--secondary-color)); }
@keyframes slideIn { from{opacity:0; transform:translateX(400px);} to{opacity:1; transform:translateX(0);} }

@media (max-width: 1024px) {
  .game-room-container { grid-template-columns: 1fr; }
  .game-info-section { display:grid; grid-template-columns: repeat(2,1fr); gap:16px; }
  .players-info { grid-column: 1 / -1; }
}
@media (max-width: 768px) {
  .chess-board { max-width:100%; }
  .game-room-container { padding:12px; gap:12px; }
  .lobby-content { grid-template-columns: 1fr; }
  .header-content { flex-direction:column; align-items:flex-start; }
  .user-info { width:100%; flex-wrap:wrap; }
  .game-info-section { grid-template-columns: 1fr; max-height:460px; }
  .chat-messages { height:150px; }
  .login-container { max-width:90vw; }
  .login-container h1 { font-size:2.5rem; }
}
@media (max-width: 480px) {
  .glass-panel { padding:16px; }
  .login-container h1 { font-size:2rem; }
  .board-piece { font-size:2rem; }
  .lobby-header h1 { font-size:1.5rem; }
  .player-timer { font-size:1.2rem; }
  .radio-group { flex-direction:column; }
  .radio-label { width:100%; }
  #gameOverTitle { font-size:1.8rem; }
  .toast-container { left:20px; right:20px; }
  .toast { width:100%; }
  .popup-content { width:95%; }
}
.hidden { display:none !important; }
::-webkit-scrollbar { width:10px; height:10px; }
::-webkit-scrollbar-track { background:transparent; }
::-webkit-scrollbar-thumb { background: var(--glass-border); border-radius:5px; }
::-webkit-scrollbar-thumb:hover { background: rgba(148,163,184,.4); }
</style>
</head>
<body>

<!-- Login Screen -->
<div id="loginScreen" class="screen active">
  <div class="login-container">
    <div class="glass-panel">
      <h1>♟️ MH2 Chess</h1>
      <p class="subtitle">Play Real-Time Chess With Players Worldwide</p>
      <div class="form-group">
        <input type="text" id="usernameInput" placeholder="Enter your name (2-20 chars)" class="input-field" maxlength="20">
        <small id="usernameError" class="error-text"></small>
      </div>
      <button id="playBtn" class="btn btn-primary btn-large" style="width:100%;justify-content:center;">
        <span>Play Now</span><span class="btn-arrow">→</span>
      </button>
      <p class="login-footer">No registration needed • Anonymous login</p>
    </div>
  </div>
</div>

<!-- Lobby Screen -->
<div id="lobbyScreen" class="screen">
  <div class="lobby-container">
    <div class="lobby-header">
      <div class="header-content">
        <h1>♟️ Lobby</h1>
        <div class="user-info">
          <span id="currentUsername" class="username"></span>
          <button id="changeNameBtn" class="btn btn-secondary btn-small">Change Name</button>
        </div>
      </div>
    </div>
    <div class="lobby-content">
      <div class="players-section">
        <h2>Online Players <span id="onlineCount" class="count">0</span></h2>
        <div id="playersList" class="players-list">
          <div class="loading">Loading players...</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Invitation Popup -->
<div id="invitationPopup" class="popup-overlay hidden">
  <div class="popup-content glass-panel">
    <h2>Game Invitation</h2>
    <p id="invitationMessage"></p>
    <div class="popup-buttons">
      <button id="declineBtn" class="btn btn-secondary">Decline</button>
      <button id="acceptBtn" class="btn btn-primary">Accept</button>
    </div>
  </div>
</div>

<!-- Game Room Screen -->
<div id="gameRoomScreen" class="screen">
  <div class="game-room-container">
    <div class="game-board-section">
      <div id="chessBoard" class="chess-board"></div>
      <div class="board-controls">
        <button id="flipBoardBtn" class="btn btn-secondary btn-small">Flip Board</button>
        <button id="resignBtn" class="btn btn-secondary btn-small hidden">Resign</button>
        <button id="drawBtn" class="btn btn-secondary btn-small hidden">Offer Draw</button>
      </div>
      <div id="capturedByWhite" class="captured-row"></div>
      <div id="capturedByBlack" class="captured-row"></div>
    </div>

    <div class="game-info-section">
      <div class="players-info glass-panel">
        <div class="player-card white-player" id="whiteCard">
          <div class="piece-symbol">♔</div>
          <div class="player-details">
            <p class="player-name" id="whitePlayerName">White</p>
            <p class="player-status" id="whiteStatus">Waiting...</p>
          </div>
          <div class="player-timer" id="whiteTimer">∞</div>
        </div>
        <div class="vs-text">vs</div>
        <div class="player-card black-player" id="blackCard">
          <div class="piece-symbol">♚</div>
          <div class="player-details">
            <p class="player-name" id="blackPlayerName">Black</p>
            <p class="player-status" id="blackStatus">Waiting...</p>
          </div>
          <div class="player-timer" id="blackTimer">∞</div>
        </div>
      </div>

      <div id="preGameConfig" class="glass-panel">
        <h3>Game Configuration</h3>
        <div class="config-section">
          <label>Color:</label>
          <div class="radio-group">
            <label class="radio-label"><input type="radio" name="color" value="random" checked> Random</label>
            <label class="radio-label"><input type="radio" name="color" value="white"> White</label>
            <label class="radio-label"><input type="radio" name="color" value="black"> Black</label>
          </div>
        </div>
        <div class="config-section">
          <label>Time Control:</label>
          <select id="timerSelect" class="select-field">
            <option value="0">Unlimited</option>
            <option value="1">1 Minute</option>
            <option value="3" selected>3 Minutes</option>
            <option value="5">5 Minutes</option>
            <option value="10">10 Minutes</option>
            <option value="15">15 Minutes</option>
          </select>
        </div>
        <button id="readyBtn" class="btn btn-primary btn-block">Ready</button>
        <button id="backToLobbyBtn" class="btn btn-secondary btn-block">Back to Lobby</button>
        <p id="readyStatus" class="ready-status"></p>
      </div>

      <div id="gameChat" class="glass-panel hidden">
        <h3>Chat</h3>
        <div id="chatMessages" class="chat-messages"></div>
        <div class="emoji-bar">
          <button class="emoji-btn" data-emoji="😀">😀</button>
          <button class="emoji-btn" data-emoji="😂">😂</button>
          <button class="emoji-btn" data-emoji="👍">👍</button>
          <button class="emoji-btn" data-emoji="👏">👏</button>
          <button class="emoji-btn" data-emoji="😮">😮</button>
          <button class="emoji-btn" data-emoji="♟️">♟️</button>
          <button class="emoji-btn" data-emoji="🔥">🔥</button>
          <button class="emoji-btn" data-emoji="😢">😢</button>
        </div>
        <div class="chat-input-group">
          <input type="text" id="chatInput" class="input-field chat-field" placeholder="Type message..." maxlength="200">
          <button id="sendChatBtn" class="btn btn-secondary">Send</button>
        </div>
      </div>

      <div id="moveHistory" class="glass-panel hidden">
        <h3>Move History</h3>
        <div id="movesList" class="moves-list"></div>
      </div>
    </div>
  </div>
</div>

<!-- Game Over Screen -->
<div id="gameOverScreen" class="screen">
  <div class="game-over-container">
    <div class="glass-panel">
      <h1 id="gameOverTitle">Game Over</h1>
      <p id="gameOverMessage" class="game-over-message"></p>
      <div class="game-over-buttons">
        <button id="rematchBtn" class="btn btn-primary">Play Again</button>
        <button id="newGameBtn" class="btn btn-secondary">New Game</button>
        <button id="leaveBtn" class="btn btn-secondary">Leave</button>
      </div>
    </div>
  </div>
</div>

<div id="loadingSpinner" class="loading-spinner hidden">
  <div class="spinner"></div>
  <p id="loadingText">Connecting...</p>
</div>

<div class="toast-container" id="toastContainer"></div>

<!-- Firebase (compat build) -->
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.12.2/firebase-database-compat.js"></script>
<!-- Chess.js UMD build -->
<script src="https://cdn.jsdelivr.net/npm/chess.js@0.13.4/chess.min.js"></script>

<script>
/* ==========================================================
   FIREBASE SETUP
   ========================================================== */
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

try {
  firebase.initializeApp(firebaseConfig);
} catch (e) {
  console.log('Firebase already initialized');
}

const auth = firebase.auth();
const database = firebase.database();

/* ==========================================================
   FIREBASE MANAGER (IMPROVED)
   ========================================================== */
class FirebaseManager {
  constructor() {
    this.uid = null;
    this.username = null;
    this.listeners = {};
  }

  async loginAnonymous(username) {
    try {
      const cred = await auth.signInAnonymously();
      this.uid = cred.user.uid;
      this.username = username;

      const userRef = database.ref(`users/${this.uid}`);
      const connectedRef = database.ref('.info/connected');

      connectedRef.on('value', async (snap) => {
        if (snap.val() === true) {
          await userRef.onDisconnect().remove();
          await userRef.set({
            username: this.username,
            uid: this.uid,
            online: true,
            joinedTime: firebase.database.ServerValue.TIMESTAMP,
            lastActive: firebase.database.ServerValue.TIMESTAMP
          });
        }
      });

      return true;
    } catch (err) {
      console.error('Login failed:', err);
      showToast('Login failed. Check your connection.', 'error');
      return false;
    }
  }

  async getOnlineUsers() {
    try {
      const snap = await database.ref('users').once('value');
      const users = [];
      snap.forEach(child => {
        const u = child.val();
        if (u && u.uid !== this.uid && u.online === true) users.push(u);
      });
      return users;
    } catch (err) {
      console.error('Error getting online users:', err);
      return [];
    }
  }

  listenToOnlineUsers(callback) {
    try {
      const ref = database.ref('users');
      const handler = (snap) => {
        const users = [];
        snap.forEach(child => {
          const u = child.val();
          if (u && u.uid !== this.uid && u.online === true) users.push(u);
        });
        callback(users);
      };
      ref.on('value', handler);
      if (this.listeners['users']) {
        this.listeners['users'].ref.off('value', this.listeners['users'].cb);
      }
      this.listeners['users'] = { ref, event: 'value', cb: handler };
    } catch (err) {
      console.error('Error listening to online users:', err);
    }
  }

  async sendInvite(toUid) {
    try {
      const existing = await database.ref('invites')
        .orderByChild('toUid').equalTo(toUid).once('value');
      let alreadyInvited = false;
      existing.forEach(child => {
        if (child.val() && child.val().fromUid === this.uid) alreadyInvited = true;
      });
      if (alreadyInvited) {
        showToast('Invite already sent', 'warning');
        return null;
      }

      const roomRef = database.ref('gameRooms').push();
      const roomId = roomRef.key;

      await roomRef.set({
        players: {
          [this.uid]: { username: this.username, ready: false, connected: true }
        },
        whitePlayerId: null,
        blackPlayerId: null,
        currentTurn: 'w',
        fen: 'start',
        moves: [],
        status: 'waiting_for_opponent',
        timeLimit: 3,
        whiteTimer: null,
        blackTimer: null,
        winner: null,
        gameOverReason: null,
        createdTime: firebase.database.ServerValue.TIMESTAMP
      });

      await roomRef.child(`players/${this.uid}/connected`).onDisconnect().set(false);

      const inviteRef = database.ref('invites').push();
      await inviteRef.set({
        fromUid: this.uid,
        fromUsername: this.username,
        toUid: toUid,
        roomId: roomId,
        status: 'pending',
        createdTime: firebase.database.ServerValue.TIMESTAMP
      });

      setTimeout(async () => {
        try {
          const snap = await inviteRef.once('value');
          if (snap.exists() && snap.val().status === 'pending') {
            await inviteRef.remove();
            const rmSnap = await roomRef.once('value');
            if (rmSnap.exists() && rmSnap.val().status === 'waiting_for_opponent') {
              await roomRef.remove();
            }
          }
        } catch (e) { }
      }, 60000);

      return roomId;
    } catch (err) {
      console.error('Error sending invite:', err);
      showToast('Failed to send invite', 'error');
      return null;
    }
  }

  listenToInvites(callback) {
    try {
      const ref = database.ref('invites').orderByChild('toUid').equalTo(this.uid);
      const handler = (snap) => {
        snap.forEach(child => {
          const invite = child.val();
          if (invite && invite.status === 'pending') {
            callback({ id: child.key, ...invite });
          }
        });
      };
      ref.on('child_added', handler);
      if (this.listeners['invites']) {
        try { this.listeners['invites'].ref.off('child_added', this.listeners['invites'].cb); } catch (e) {}
      }
      this.listeners['invites'] = { ref, event: 'child_added', cb: handler };
    } catch (err) {
      console.error('Error listening to invites:', err);
    }
  }

  async declineInvite(inviteId, roomId) {
    try {
      await database.ref(`invites/${inviteId}`).remove();
      if (roomId) {
        const snap = await database.ref(`gameRooms/${roomId}`).once('value');
        if (snap.exists() && snap.val().status === 'waiting_for_opponent') {
          await database.ref(`gameRooms/${roomId}`).remove();
        }
      }
    } catch (err) {
      console.error('Error declining invite:', err);
    }
  }

  async acceptInvite(inviteId, invite) {
    try {
      const roomId = invite.roomId;
      const roomRef = database.ref(`gameRooms/${roomId}`);

      const snap = await roomRef.once('value');
      if (!snap.exists()) {
        showToast('Game room no longer exists', 'error');
        return null;
      }

      const updates = {};
      updates[`players/${invite.fromUid}`] = { username: invite.fromUsername, ready: false, connected: true };
      updates[`players/${this.uid}`] = { username: this.username, ready: false, connected: true };
      updates['status'] = 'waiting';
      
      await roomRef.update(updates);
      await roomRef.child(`players/${this.uid}/connected`).onDisconnect().set(false);
      await database.ref(`invites/${inviteId}`).remove();
      
      return roomId;
    } catch (err) {
      console.error('Error accepting invite:', err);
      showToast('Failed to accept invite', 'error');
      return null;
    }
  }

  listenToGameRoom(roomId, callback) {
    try {
      const ref = database.ref(`gameRooms/${roomId}`);
      const handler = (snap) => {
        if (snap.exists()) {
          callback(snap.val());
        }
      };
      ref.on('value', handler);
      if (this.listeners['room']) {
        try { this.listeners['room'].ref.off('value', this.listeners['room'].cb); } catch (e) {}
      }
      this.listeners['room'] = { ref, event: 'value', cb: handler };
      database.ref(`gameRooms/${roomId}/players/${this.uid}/connected`).onDisconnect().set(false);
    } catch (err) {
      console.error('Error listening to game room:', err);
    }
  }

  async setReady(roomId, colorChoice, timeLimit) {
    try {
      const roomRef = database.ref(`gameRooms/${roomId}`);
      const snap = await roomRef.once('value');
      const room = snap.val();
      if (!room) return;

      const updates = {};
      updates[`players/${this.uid}/ready`] = true;
      updates[`players/${this.uid}/colorChoice`] = colorChoice;
      updates[`players/${this.uid}/timeLimit`] = timeLimit;
      await roomRef.update(updates);

      const freshSnap = await roomRef.once('value');
      const freshRoom = freshSnap.val();
      const uids = Object.keys(freshRoom.players || {}).filter(id => freshRoom.players[id].connected);
      const allReady = uids.length === 2 && uids.every(id => freshRoom.players[id].ready);

      if (allReady && freshRoom.status === 'waiting') {
        await this._finalizeGameStart(roomId, freshRoom, uids);
      }
    } catch (err) {
      console.error('Error setting ready:', err);
    }
  }

  async _finalizeGameStart(roomId, room, uids) {
    try {
      if (uids.length !== 2) return;

      let white = null, black = null;
      const whiteWanters = uids.filter(id => room.players[id].colorChoice === 'white');
      const blackWanters = uids.filter(id => room.players[id].colorChoice === 'black');
      const randomWanters = uids.filter(id => room.players[id].colorChoice === 'random');

      if (whiteWanters.length === 1 && blackWanters.length === 1) {
        white = whiteWanters[0];
        black = blackWanters[0];
      } else if (whiteWanters.length === 1) {
        white = whiteWanters[0];
        black = randomWanters[0] || uids.find(id => id !== white);
      } else if (blackWanters.length === 1) {
        black = blackWanters[0];
        white = randomWanters[0] || uids.find(id => id !== black);
      } else {
        const shuffled = [...uids].sort(() => Math.random() - 0.5);
        white = shuffled[0];
        black = shuffled[1];
      }

      const t1 = room.players[uids[0]].timeLimit ?? 3;
      const t2 = room.players[uids[1]].timeLimit ?? 3;
      const timeLimit = Math.max(t1, t2);
      const seconds = timeLimit === 0 ? null : timeLimit * 60;

      await database.ref(`gameRooms/${roomId}`).update({
        whitePlayerId: white,
        blackPlayerId: black,
        status: 'playing',
        timeLimit: timeLimit,
        whiteTimer: seconds,
        blackTimer: seconds,
        currentTurn: 'w',
        startedTime: firebase.database.ServerValue.TIMESTAMP
      });
    } catch (err) {
      console.error('Error finalizing game start:', err);
    }
  }

  async makeMove(roomId, moveData, newFen, newTurn) {
    try {
      const roomRef = database.ref(`gameRooms/${roomId}`);
      const snap = await roomRef.once('value');
      const room = snap.val();
      if (!room) return;
      
      const moves = room.moves ? [...room.moves] : [];
      moves.push(moveData);

      await roomRef.update({
        moves: moves,
        fen: newFen,
        currentTurn: newTurn,
        lastMoveTime: firebase.database.ServerValue.TIMESTAMP
      });
    } catch (err) {
      console.error('Error making move:', err);
    }
  }

  async syncTimer(roomId, whiteTimer, blackTimer) {
    try {
      await database.ref(`gameRooms/${roomId}`).update({
        whiteTimer: whiteTimer,
        blackTimer: blackTimer
      });
    } catch (err) {
      console.error('Error syncing timer:', err);
    }
  }

  async endGame(roomId, winnerId, reason) {
    try {
      await database.ref(`gameRooms/${roomId}`).update({
        status: 'finished',
        winner: winnerId || null,
        gameOverReason: reason,
        finishedTime: firebase.database.ServerValue.TIMESTAMP
      });
    } catch (err) {
      console.error('Error ending game:', err);
    }
  }

  async resign(roomId) {
    try {
      const snap = await database.ref(`gameRooms/${roomId}`).once('value');
      const room = snap.val();
      if (!room) return;
      const winnerId = room.whitePlayerId === this.uid ? room.blackPlayerId : room.whitePlayerId;
      await this.endGame(roomId, winnerId, 'resignation');
    } catch (err) {
      console.error('Error resigning:', err);
    }
  }

  async playerLeft(roomId) {
    try {
      const snap = await database.ref(`gameRooms/${roomId}`).once('value');
      const room = snap.val();
      if (!room || room.status === 'finished') return;
      if (room.status === 'playing') {
        const winnerId = room.whitePlayerId === this.uid ? room.blackPlayerId : room.whitePlayerId;
        await this.endGame(roomId, winnerId, 'abandonment');
      }
      await database.ref(`gameRooms/${roomId}/players/${this.uid}/connected`).set(false);
    } catch (err) {
      console.error('Error player left:', err);
    }
  }

  async addChatMessage(roomId, message) {
    try {
      if (!message || message.trim().length === 0) return;
      const chatRef = database.ref(`gameRooms/${roomId}/chat`).push();
      await chatRef.set({
        username: this.username,
        uid: this.uid,
        message: message.substring(0, 200),
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
    } catch (err) {
      console.error('Error adding chat message:', err);
    }
  }

  async deleteRoom(roomId) {
    try {
      await database.ref(`gameRooms/${roomId}`).remove();
    } catch (err) {
      console.error('Error deleting room:', err);
    }
  }

  removeAllListeners() {
    for (const key in this.listeners) {
      try {
        const { ref, event, cb } = this.listeners[key];
        ref.off(event, cb);
      } catch (e) { }
    }
    this.listeners = {};
  }

  removeRoomListener() {
    if (this.listeners['room']) {
      try {
        const { ref, event, cb } = this.listeners['room'];
        ref.off(event, cb);
      } catch (e) { }
      delete this.listeners['room'];
    }
  }
}

const fbManager = new FirebaseManager();

/* ==========================================================
   HELPERS
   ========================================================== */
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => {
    try { toast.remove(); } catch (e) { }
  }, 3500);
}

function showLoading(text) {
  document.getElementById('loadingText').textContent = text || 'Loading...';
  document.getElementById('loadingSpinner').classList.remove('hidden');
}

function hideLoading() {
  document.getElementById('loadingSpinner').classList.add('hidden');
}

function switchScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById(screenId);
  if (screen) screen.classList.add('active');
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text.toString();
  return div.innerHTML;
}

/* ==========================================================
   GAME STATE
   ========================================================== */
const gameState = {
  gameRoomId: null,
  game: null,
  boardFlipped: false,
  selectedSquare: null,
  selectedMoves: [],
  gameStarted: false,
  playerColor: null,
  opponentId: null,
  opponentUsername: null,
  timerInterval: null,
  whiteTimeRemaining: null,
  blackTimeRemaining: null,
  lastAppliedMoveCount: 0,
  pendingPromotion: null,
  roomStatus: null,
  chatLastUpdate: 0
};

document.addEventListener('DOMContentLoaded', () => {
  if (typeof Chess === 'undefined') {
    showToast('Chess library failed to load. Please refresh the page.', 'error');
    return;
  }
  try {
    gameState.game = new Chess();
  } catch (err) {
    console.error('Failed to initialize Chess:', err);
    showToast('Failed to initialize chess. Please refresh.', 'error');
    return;
  }
  initializeEventListeners();
});

function initializeEventListeners() {
  document.getElementById('playBtn').addEventListener('click', handleLogin);
  document.getElementById('usernameInput').addEventListener('keypress', e => { if (e.key === 'Enter') handleLogin(); });
  document.getElementById('changeNameBtn').addEventListener('click', handleChangeName);

  document.getElementById('readyBtn').addEventListener('click', handleReady);
  document.getElementById('backToLobbyBtn').addEventListener('click', handleBackToLobby);
  document.getElementById('flipBoardBtn').addEventListener('click', () => { gameState.boardFlipped = !gameState.boardFlipped; renderBoard(); });
  document.getElementById('resignBtn').addEventListener('click', handleResign);
  document.getElementById('drawBtn').addEventListener('click', handleDrawOffer);

  document.getElementById('sendChatBtn').addEventListener('click', handleSendChat);
  document.getElementById('chatInput').addEventListener('keypress', e => { if (e.key === 'Enter') handleSendChat(); });
  document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = document.getElementById('chatInput');
      input.value += btn.dataset.emoji;
      input.focus();
    });
  });

  document.getElementById('rematchBtn').addEventListener('click', handleRematch);
  document.getElementById('newGameBtn').addEventListener('click', handleNewGame);
  document.getElementById('leaveBtn').addEventListener('click', handleLeaveFromGameOver);

  document.getElementById('acceptBtn').addEventListener('click', handleAcceptInvite);
  document.getElementById('declineBtn').addEventListener('click', handleDeclineInvite);

  window.addEventListener('beforeunload', () => {
    if (gameState.gameRoomId && fbManager.uid) {
      try {
        database.ref(`gameRooms/${gameState.gameRoomId}/players/${fbManager.uid}/connected`).set(false);
      } catch (e) { }
    }
  });

  const chatInput = document.getElementById('chatInput');
  chatInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter' && chatInput.value.trim() === '/acceptdraw' && gameState.gameRoomId) {
      chatInput.value = '';
      clearInterval(gameState.timerInterval);
      await fbManager.endGame(gameState.gameRoomId, null, 'draw_agreement');
    }
  });
}

/* ---------- LOGIN ---------- */
async function handleLogin() {
  const input = document.getElementById('usernameInput');
  const username = input.value.trim();
  const errorEl = document.getElementById('usernameError');

  if (username.length < 2 || username.length > 20) {
    errorEl.textContent = 'Username must be 2–20 characters';
    return;
  }
  errorEl.textContent = '';
  showLoading('Signing in...');

  const success = await fbManager.loginAnonymous(username);
  hideLoading();

  if (success) {
    document.getElementById('currentUsername').textContent = escapeHtml(username);
    switchScreen('lobbyScreen');
    enterLobby();
  }
}

async function handleChangeName() {
  const newName = prompt('Enter new username (2-20 chars):', fbManager.username || '');
  if (!newName) return;
  const trimmed = newName.trim();
  if (trimmed.length < 2 || trimmed.length > 20) {
    showToast('Invalid username', 'error');
    return;
  }
  fbManager.username = trimmed;
  try {
    await database.ref(`users/${fbManager.uid}/username`).set(trimmed);
    document.getElementById('currentUsername').textContent = escapeHtml(trimmed);
    showToast('Username updated!', 'success');
  } catch (e) {
    showToast('Failed to update username', 'error');
  }
}

/* ---------- LOBBY ---------- */
function enterLobby() {
  fbManager.listenToOnlineUsers(updatePlayersList);
  fbManager.listenToInvites(handleIncomingInvite);
}

function updatePlayersList(users) {
  const list = document.getElementById('playersList');
  document.getElementById('onlineCount').textContent = users.length;

  if (users.length === 0) {
    list.innerHTML = '<div class="loading">No other players online right now</div>';
    return;
  }

  list.innerHTML = users.map(u => `
    <div class="player-item">
      <div class="player-info">
        <div class="player-name">${escapeHtml(u.username)}</div>
        <div class="player-status">🟢 Online</div>
      </div>
      <button class="btn btn-primary btn-small invite-btn" data-uid="${escapeHtml(u.uid)}" data-name="${escapeHtml(u.username)}">Invite</button>
    </div>
  `).join('');

  list.querySelectorAll('.invite-btn').forEach(btn => {
    btn.addEventListener('click', () => sendInvite(btn.dataset.uid, btn.dataset.name));
  });
}

async function sendInvite(uid, name) {
  const roomId = await fbManager.sendInvite(uid);
  if (roomId) {
    showToast(`Invitation sent to ${escapeHtml(name)}!`, 'success');
    gameState.gameRoomId = roomId;
    gameState.opponentId = uid;
    gameState.opponentUsername = name;
    enterGameRoom(roomId);
  }
}

function handleIncomingInvite(invite) {
  const popup = document.getElementById('invitationPopup');
  document.getElementById('invitationMessage').textContent = `${escapeHtml(invite.fromUsername)} wants to play chess!`;
  popup.dataset.inviteId = invite.id;
  popup.dataset.fromUid = invite.fromUid;
  popup.dataset.fromUsername = invite.fromUsername;
  popup.dataset.roomId = invite.roomId;
  popup.classList.remove('hidden');
}

async function handleAcceptInvite() {
  const popup = document.getElementById('invitationPopup');
  const { inviteId, fromUid, fromUsername, roomId } = popup.dataset;
  popup.classList.add('hidden');

  try {
    const snap = await database.ref(`invites/${inviteId}`).once('value');
    if (!snap.exists()) {
      showToast('Invitation expired', 'error');
      return;
    }

    const invite = snap.val();
    const resultRoomId = await fbManager.acceptInvite(inviteId, invite);
    if (resultRoomId) {
      gameState.opponentId = fromUid;
      gameState.opponentUsername = fromUsername;
      enterGameRoom(resultRoomId);
    }
  } catch (err) {
    console.error('Error accepting invite:', err);
    showToast('Failed to accept invite', 'error');
  }
}

async function handleDeclineInvite() {
  const popup = document.getElementById('invitationPopup');
  popup.classList.add('hidden');
  const { inviteId, roomId } = popup.dataset;
  await fbManager.declineInvite(inviteId, roomId);
}

/* ---------- GAME ROOM ---------- */
function enterGameRoom(roomId) {
  gameState.gameRoomId = roomId;
  gameState.gameStarted = false;
  gameState.selectedSquare = null;
  gameState.selectedMoves = [];
  gameState.lastAppliedMoveCount = 0;
  gameState.chatLastUpdate = 0;
  
  if (gameState.game) {
    gameState.game.reset();
  }

  fbManager.removeAllListeners();

  document.getElementById('preGameConfig').classList.remove('hidden');
  document.getElementById('gameChat').classList.add('hidden');
  document.getElementById('moveHistory').classList.add('hidden');
  document.getElementById('resignBtn').classList.add('hidden');
  document.getElementById('drawBtn').classList.add('hidden');
  document.getElementById('readyBtn').disabled = false;
  document.getElementById('readyBtn').textContent = 'Ready';
  document.getElementById('readyStatus').textContent = '';
  document.getElementById('whiteTimer').textContent = '∞';
  document.getElementById('blackTimer').textContent = '∞';
  document.getElementById('whitePlayerName').textContent = 'White';
  document.getElementById('blackPlayerName').textContent = 'Black';
  document.getElementById('chatMessages').innerHTML = '';

  switchScreen('gameRoomScreen');
  renderBoard();
  fbManager.listenToGameRoom(roomId, handleGameRoomUpdate);
}

async function handleReady() {
  const colorChoice = document.querySelector('input[name="color"]:checked').value;
  const timeLimit = parseInt(document.getElementById('timerSelect').value, 10);
  document.getElementById('readyBtn').disabled = true;
  document.getElementById('readyStatus').textContent = 'Waiting for opponent to ready up...';
  await fbManager.setReady(gameState.gameRoomId, colorChoice, timeLimit);
}

function handleGameRoomUpdate(room) {
  if (!room) return;
  
  gameState.roomStatus = room.status;

  for (const uid in (room.players || {})) {
    if (uid !== fbManager.uid && !gameState.opponentId) {
      gameState.opponentId = uid;
      gameState.opponentUsername = room.players[uid].username;
    }
  }

  const whiteName = room.whitePlayerId ? (room.players[room.whitePlayerId]?.username || 'White') : 'Waiting...';
  const blackName = room.blackPlayerId ? (room.players[room.blackPlayerId]?.username || 'Black') : 'Waiting...';
  document.getElementById('whitePlayerName').textContent = escapeHtml(whiteName);
  document.getElementById('blackPlayerName').textContent = escapeHtml(blackName);

  if (room.status === 'playing' && gameState.opponentId) {
    const oppConnected = room.players[gameState.opponentId]?.connected;
    if (oppConnected === false) {
      showToast('Opponent left — win by abandonment', 'warning');
    }
  }

  if (room.status === 'waiting') {
    const readyCount = Object.values(room.players || {}).filter(p => p.ready).length;
    document.getElementById('readyStatus').textContent =
      readyCount > 0 ? `${readyCount}/2 players ready` : '';
  }

  if (room.status === 'playing' && !gameState.gameStarted) {
    startGame(room);
  }

  if (room.status === 'playing' && gameState.gameStarted) {
    syncBoardFromRoom(room);
    syncTimersFromRoom(room);
  }

  if (room.status === 'finished') {
    handleGameOver(room);
  }

  if (room.chat) displayChat(room.chat);
}

function startGame(room) {
  gameState.gameStarted = true;
  gameState.playerColor = room.whitePlayerId === fbManager.uid ? 'white' : 'black';
  gameState.boardFlipped = gameState.playerColor === 'black';

  document.getElementById('preGameConfig').classList.add('hidden');
  document.getElementById('gameChat').classList.remove('hidden');
  document.getElementById('moveHistory').classList.remove('hidden');
  document.getElementById('resignBtn').classList.remove('hidden');
  document.getElementById('drawBtn').classList.remove('hidden');

  if (gameState.game) gameState.game.reset();
  gameState.lastAppliedMoveCount = 0;

  gameState.whiteTimeRemaining = room.whiteTimer;
  gameState.blackTimeRemaining = room.blackTimer;
  updateTimerDisplay();

  renderBoard();
  showToast('Game started! You are playing ' + gameState.playerColor, 'success');

  startLocalTimerTick();
}

function startLocalTimerTick() {
  if (gameState.timerInterval) clearInterval(gameState.timerInterval);
  if (gameState.whiteTimeRemaining === null) return;

  gameState.timerInterval = setInterval(async () => {
    if (!gameState.gameStarted || gameState.roomStatus !== 'playing' || !gameState.game) {
      clearInterval(gameState.timerInterval);
      return;
    }

    const turn = gameState.game.turn();
    const isMyTurn = (turn === 'w' && gameState.playerColor === 'white') ||
                      (turn === 'b' && gameState.playerColor === 'black');
    if (!isMyTurn) return;

    if (turn === 'w') gameState.whiteTimeRemaining = Math.max(0, gameState.whiteTimeRemaining - 1);
    else gameState.blackTimeRemaining = Math.max(0, gameState.blackTimeRemaining - 1);

    updateTimerDisplay();
    
    if (Math.random() < 0.1) {
      await fbManager.syncTimer(gameState.gameRoomId, gameState.whiteTimeRemaining, gameState.blackTimeRemaining);
    }

    if ((turn === 'w' && gameState.whiteTimeRemaining <= 0) ||
        (turn === 'b' && gameState.blackTimeRemaining <= 0)) {
      clearInterval(gameState.timerInterval);
      const loserColor = turn === 'w' ? 'white' : 'black';
      const winnerId = gameState.playerColor === loserColor ? gameState.opponentId : fbManager.uid;
      await fbManager.endGame(gameState.gameRoomId, winnerId, `${loserColor}_timeout`);
    }
  }, 1000);
}

function updateTimerDisplay() {
  const w = document.getElementById('whiteTimer');
  const b = document.getElementById('blackTimer');
  w.textContent = formatTime(gameState.whiteTimeRemaining);
  b.textContent = formatTime(gameState.blackTimeRemaining);
  w.classList.toggle('low-time', gameState.whiteTimeRemaining !== null && gameState.whiteTimeRemaining <= 20);
  b.classList.toggle('low-time', gameState.blackTimeRemaining !== null && gameState.blackTimeRemaining <= 20);

  if (gameState.game) {
    document.getElementById('whiteCard').classList.toggle('active-turn', gameState.game.turn() === 'w');
    document.getElementById('blackCard').classList.toggle('active-turn', gameState.game.turn() === 'b');
  }
}

function formatTime(seconds) {
  if (seconds === null || seconds === undefined) return '∞';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function syncTimersFromRoom(room) {
  if (typeof room.whiteTimer !== 'undefined' && room.whiteTimer !== null) gameState.whiteTimeRemaining = room.whiteTimer;
  if (typeof room.blackTimer !== 'undefined' && room.blackTimer !== null) gameState.blackTimeRemaining = room.blackTimer;
  updateTimerDisplay();
}

function syncBoardFromRoom(room) {
  const moves = room.moves || [];
  if (moves.length === gameState.lastAppliedMoveCount) return;

  if (!gameState.game) return;

  gameState.game.reset();
  for (const mv of moves) {
    try {
      gameState.game.move({ from: mv.from, to: mv.to, promotion: mv.promotion || 'q' });
    } catch (e) {
      console.error('Move error:', e, mv);
    }
  }
  gameState.lastAppliedMoveCount = moves.length;
  gameState.selectedSquare = null;
  gameState.selectedMoves = [];
  renderBoard();
  updateMoveHistory();
  updateCapturedPieces();
  if (moves.length > 0) {
    playSoundForLastMove(moves[moves.length - 1]);
  }

  checkGameStatus();
}

function playSoundForLastMove(mv) {
  if (!mv) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = mv.captured ? 220 : 440;
    gain.gain.value = 0.05;
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch (e) { }
}

/* ---------- BOARD RENDER ---------- */
const PIECE_UNICODE = {
  p: '♟', n: '♞', b: '♝', r: '♜', q: '♛', k: '♚',
  P: '♙', N: '♘', B: '♗', R: '♖', Q: '♕', K: '♔'
};

function pieceGlyph(piece) {
  if (!piece) return '';
  const key = piece.color === 'w' ? piece.type.toUpperCase() : piece.type.toLowerCase();
  return PIECE_UNICODE[key] || '';
}

function renderBoard() {
  if (!gameState.game) return;

  const board = document.getElementById('chessBoard');
  board.innerHTML = '';

  const filesAsc = ['a','b','c','d','e','f','g','h'];
  const ranksAsc = ['1','2','3','4','5','6','7','8'];

  const files = gameState.boardFlipped ? [...filesAsc].reverse() : filesAsc;
  const ranks = gameState.boardFlipped ? ranksAsc : [...ranksAsc].reverse();

  const history = gameState.game.history({ verbose: true });
  const lastMove = history.length ? history[history.length - 1] : null;
  const inCheck = gameState.game.in_check();
  const turnColor = gameState.game.turn();

  for (const rank of ranks) {
    for (const file of files) {
      const square = file + rank;
      const piece = gameState.game.get(square);

      const sqDiv = document.createElement('div');
      sqDiv.className = 'board-square';
      const isLight = (filesAsc.indexOf(file) + ranksAsc.indexOf(rank)) % 2 === 1;
      sqDiv.classList.add(isLight ? 'light' : 'dark');

      if (gameState.selectedSquare === square) sqDiv.classList.add('selected');
      if (gameState.selectedMoves.includes(square)) sqDiv.classList.add('highlight');
      if (lastMove && (lastMove.from === square || lastMove.to === square)) sqDiv.classList.add('last-move');
      if (inCheck && piece && piece.type === 'k' && piece.color === turnColor) sqDiv.classList.add('in-check');

      if (piece) {
        const pieceDiv = document.createElement('div');
        pieceDiv.className = 'board-piece';
        pieceDiv.textContent = pieceGlyph(piece);
        sqDiv.appendChild(pieceDiv);
      }

      if (file === files[0]) {
        const coord = document.createElement('span');
        coord.className = 'sq-coord';
        coord.textContent = rank;
        sqDiv.appendChild(coord);
      }
      if (rank === ranks[ranks.length - 1]) {
        const coord = document.createElement('span');
        coord.className = 'sq-coord file';
        coord.textContent = file;
        sqDiv.appendChild(coord);
      }

      sqDiv.addEventListener('click', () => handleSquareClick(square));

      if (piece) {
        sqDiv.querySelector('.board-piece').draggable = true;
        sqDiv.querySelector('.board-piece').addEventListener('dragstart', (e) => {
          e.dataTransfer.setData('text/plain', square);
          handleSquareClick(square, true);
        });
      }
      sqDiv.addEventListener('dragover', (e) => e.preventDefault());
      sqDiv.addEventListener('drop', (e) => {
        e.preventDefault();
        const from = e.dataTransfer.getData('text/plain');
        if (from && gameState.selectedMoves.includes(square)) {
          attemptMove(from, square);
        }
      });

      board.appendChild(sqDiv);
    }
  }
}

function isMyTurnNow() {
  if (!gameState.game) return false;
  const turn = gameState.game.turn();
  return (turn === 'w' && gameState.playerColor === 'white') ||
         (turn === 'b' && gameState.playerColor === 'black');
}

function handleSquareClick(square, fromDrag) {
  if (!gameState.gameStarted || gameState.roomStatus !== 'playing' || !gameState.game) return;
  if (!isMyTurnNow()) {
    if (!fromDrag) showToast("Not your turn!", 'warning');
    return;
  }

  if (gameState.selectedMoves.includes(square)) {
    attemptMove(gameState.selectedSquare, square);
    return;
  }

  const piece = gameState.game.get(square);
  const mine = piece && ((gameState.playerColor === 'white' && piece.color === 'w') ||
                          (gameState.playerColor === 'black' && piece.color === 'b'));

  if (mine) {
    gameState.selectedSquare = square;
    gameState.selectedMoves = gameState.game.moves({ square, verbose: true }).map(m => m.to);
  } else {
    gameState.selectedSquare = null;
    gameState.selectedMoves = [];
  }
  renderBoard();
}

async function attemptMove(from, to) {
  if (!gameState.game) return;

  const piece = gameState.game.get(from);
  let promotion = 'q';
  if (piece && piece.type === 'p' && (to[1] === '8' || to[1] === '1')) {
    promotion = await askPromotionChoice();
  }

  const moveObj = gameState.game.move({ from, to, promotion });
  if (!moveObj) {
    showToast('Invalid move', 'warning');
    return;
  }

  gameState.selectedSquare = null;
  gameState.selectedMoves = [];
  gameState.lastAppliedMoveCount = gameState.game.history().length;

  renderBoard();
  updateMoveHistory();
  updateCapturedPieces();
  playSoundForLastMove(moveObj);

  await fbManager.makeMove(gameState.gameRoomId, {
    from, to, promotion: moveObj.promotion || null,
    san: moveObj.san, captured: moveObj.captured || null
  }, gameState.game.fen(), gameState.game.turn());

  await checkGameStatus();
}

function askPromotionChoice() {
  return new Promise((resolve) => {
    const choice = prompt('Promote pawn to: Q, R, B, or N', 'Q');
    const map = { Q: 'q', R: 'r', B: 'b', N: 'n' };
    const val = (choice || 'Q').trim().toUpperCase();
    resolve(map[val] || 'q');
  });
}

/* ---------- GAME STATUS ---------- */
async function checkGameStatus() {
  if (!gameState.game) return;
  
  const g = gameState.game;
  if (g.in_checkmate()) {
    const winnerColor = g.turn() === 'w' ? 'black' : 'white';
    const winnerId = winnerColor === gameState.playerColor ? fbManager.uid : gameState.opponentId;
    await fbManager.endGame(gameState.gameRoomId, winnerId, 'checkmate');
  } else if (g.in_stalemate()) {
    await fbManager.endGame(gameState.gameRoomId, null, 'stalemate');
  } else if (g.in_threefold_repetition()) {
    await fbManager.endGame(gameState.gameRoomId, null, 'threefold_repetition');
  } else if (g.insufficient_material()) {
    await fbManager.endGame(gameState.gameRoomId, null, 'insufficient_material');
  } else if (g.in_draw()) {
    await fbManager.endGame(gameState.gameRoomId, null, 'fifty_move_rule');
  }
}

/* ---------- MOVE HISTORY / CAPTURES ---------- */
function updateMoveHistory() {
  if (!gameState.game) return;

  const list = document.getElementById('movesList');
  const history = gameState.game.history();
  list.innerHTML = history.map((san, i) => {
    const moveNum = Math.floor(i / 2) + 1;
    const prefix = i % 2 === 0 ? `${moveNum}. ` : '';
    const isLast = i === history.length - 1;
    return `<div class="move-item ${isLast ? 'last-move' : ''}">${prefix}${escapeHtml(san)}</div>`;
  }).join('');
  list.scrollTop = list.scrollHeight;
}

function updateCapturedPieces() {
  if (!gameState.game) return;

  const history = gameState.game.history({ verbose: true });
  const capturedByWhite = [];
  const capturedByBlack = [];
  history.forEach(m => {
    if (m.captured) {
      const glyph = PIECE_UNICODE[m.color === 'w' ? m.captured : m.captured.toUpperCase()];
      if (m.color === 'w') capturedByWhite.push(glyph);
      else capturedByBlack.push(glyph);
    }
  });
  document.getElementById('capturedByWhite').textContent = capturedByWhite.join(' ');
  document.getElementById('capturedByBlack').textContent = capturedByBlack.join(' ');
}

/* ---------- CHAT ---------- */
async function handleSendChat() {
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  await fbManager.addChatMessage(gameState.gameRoomId, msg);
}

function displayChat(chat) {
  const container = document.getElementById('chatMessages');
  const messages = Object.values(chat || {}).sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
  container.innerHTML = messages.map(m => `
    <div class="chat-message">
      <div class="message-author">${escapeHtml(m.username)}</div>
      <div>${escapeHtml(m.message)}</div>
    </div>
  `).join('');
  container.scrollTop = container.scrollHeight;
}

/* ---------- RESIGN / DRAW ---------- */
async function handleResign() {
  if (confirm('Are you sure you want to resign?')) {
    clearInterval(gameState.timerInterval);
    await fbManager.resign(gameState.gameRoomId);
  }
}

async function handleDrawOffer() {
  if (confirm('Offer a draw to your opponent?')) {
    await fbManager.addChatMessage(gameState.gameRoomId, '🤝 offered a draw. Type /acceptdraw to accept.');
    showToast('Draw offer sent in chat', 'info');
  }
}

/* ---------- GAME OVER ---------- */
const REASON_TEXT = {
  checkmate: 'Checkmate',
  stalemate: 'Stalemate',
  threefold_repetition: 'Threefold Repetition',
  insufficient_material: 'Insufficient Material',
  fifty_move_rule: 'Fifty-Move Rule',
  draw_agreement: 'Draw by Agreement',
  resignation: 'Resignation',
  abandonment: 'Opponent Left — Win by Abandonment',
  white_timeout: 'White Ran Out of Time',
  black_timeout: 'Black Ran Out of Time'
};

function handleGameOver(room) {
  clearInterval(gameState.timerInterval);
  gameState.gameStarted = false;

  const reasonText = REASON_TEXT[room.gameOverReason] || 'Game Over';
  let title, message;

  if (room.winner) {
    const iWon = room.winner === fbManager.uid;
    title = iWon ? 'You Won! 🎉' : 'You Lost 💔';
    message = `${reasonText}`;
  } else {
    title = 'Draw 🤝';
    message = reasonText;
  }

  document.getElementById('gameOverTitle').textContent = title;
  document.getElementById('gameOverMessage').textContent = message;
  switchScreen('gameOverScreen');

  scheduleRoomCleanup(gameState.gameRoomId);
}

function scheduleRoomCleanup(roomId) {
  setTimeout(async () => {
    try {
      const snap = await database.ref(`gameRooms/${roomId}`).once('value');
      if (snap.exists() && snap.val().status === 'finished') {
        await fbManager.deleteRoom(roomId);
      }
    } catch (e) { }
  }, 8000);
}

/* ---------- REMATCH / NEW GAME / LEAVE ---------- */
async function handleRematch() {
  if (!gameState.opponentId) {
    handleNewGame();
    return;
  }
  fbManager.removeAllListeners();

  const roomRef = database.ref('gameRooms').push();
  const roomId = roomRef.key;
  await roomRef.set({
    players: {
      [fbManager.uid]: { username: fbManager.username, ready: false, connected: true },
      [gameState.opponentId]: { username: gameState.opponentUsername, ready: false, connected: true }
    },
    whitePlayerId: null,
    blackPlayerId: null,
    currentTurn: 'w',
    moves: [],
    status: 'waiting',
    timeLimit: 3,
    whiteTimer: null,
    blackTimer: null,
    winner: null,
    gameOverReason: null,
    createdTime: firebase.database.ServerValue.TIMESTAMP
  });
  await roomRef.child(`players/${fbManager.uid}/connected`).onDisconnect().set(false);

  fbManager.listenToOnlineUsers(updatePlayersList);
  fbManager.listenToInvites(handleIncomingInvite);

  enterGameRoom(roomId);
}

function handleNewGame() {
  fbManager.removeRoomListener();
  gameState.gameRoomId = null;
  gameState.gameStarted = false;
  switchScreen('lobbyScreen');
  if (!fbManager.listeners['users']) fbManager.listenToOnlineUsers(updatePlayersList);
  if (!fbManager.listeners['invites']) fbManager.listenToInvites(handleIncomingInvite);
}

function handleLeaveFromGameOver() {
  handleNewGame();
}

async function handleBackToLobby() {
  if (gameState.gameStarted) {
    if (!confirm('Game in progress. Leave game?')) return;
    clearInterval(gameState.timerInterval);
    await fbManager.playerLeft(gameState.gameRoomId);
  } else if (gameState.gameRoomId) {
    await database.ref(`gameRooms/${gameState.gameRoomId}/players/${fbManager.uid}/connected`).set(false);
  }
  fbManager.removeRoomListener();
  gameState.gameRoomId = null;
  gameState.gameStarted = false;
  switchScreen('lobbyScreen');
  if (!fbManager.listeners['users']) fbManager.listenToOnlineUsers(updatePlayersList);
  if (!fbManager.listeners['invites']) fbManager.listenToInvites(handleIncomingInvite);
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(gameState.timerInterval);
  } else if (gameState.gameStarted) {
    startLocalTimerTick();
  }
});
</script>
</body>
</html>
