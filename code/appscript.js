
const SIGNUP_SHEET_NAME = "Signups";
const GAMES_SHEET_NAME = "Games";
const OTP_SHEET_NAME = "OTPs";
const USERS_SHEET_NAME = "Users";
const OTP_EXPIRY_MINUTES = 10;

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let result = { ok: true };

    if (data.type === "signup") {
      writeSignup(ss, data);
    } else if (data.type === "game_end") {
      writeGameResult(ss, data);
    } else if (data.type === "send_otp") {
      result = sendOtp(ss, data.email, data.purpose || "verify");
    } else if (data.type === "verify_otp") {
      result = verifyOtp(ss, data.email, data.code, data.purpose || "verify");
    } else if (data.type === "user_upsert") {
      upsertUserRow(ss, data);
    } else {
      writeGeneric(ss, data);
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("MH2 Chess Logger is running ✅")
    .setMimeType(ContentService.MimeType.TEXT);
}

function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function writeSignup(ss, data) {
  const sheet = getOrCreateSheet(ss, SIGNUP_SHEET_NAME, ["Timestamp", "UID", "Name", "Email"]);
  sheet.appendRow([data.timestamp || new Date().toISOString(), data.uid || "", data.name || "", data.email || ""]);
}

function writeGameResult(ss, data) {
  const sheet = getOrCreateSheet(ss, GAMES_SHEET_NAME, ["Timestamp", "UID", "Name", "Mode", "My Color", "Winner", "Reason"]);
  sheet.appendRow([data.timestamp || new Date().toISOString(), data.uid || "", data.name || "", data.mode || "", data.myColor || "", data.winner || "", data.reason || ""]);
}

function writeGeneric(ss, data) {
  const sheet = getOrCreateSheet(ss, "Logs", ["Timestamp", "Raw JSON"]);
  sheet.appendRow([new Date().toISOString(), JSON.stringify(data)]);
}


function upsertUserRow(ss, data) {
  const sheet = getOrCreateSheet(ss, USERS_SHEET_NAME, [
    "UID", "Name", "Email", "Verified", "Elo", "Games", "Wins", "Draws", "Losses", "CreatedAt", "LastUpdated"
  ]);
  const rows = sheet.getDataRange().getValues();
  let rowIndex = -1;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === data.uid) { rowIndex = i + 1; break; }
  }
  const rowData = [
    data.uid || "", data.name || "", data.email || "",
    data.verified ? "YES" : "NO",
    data.elo != null ? data.elo : 1200,
    data.games || 0, data.wins || 0, data.draws || 0, data.losses || 0,
    data.createdAt || new Date().toISOString(),
    new Date().toISOString()
  ];
  if (rowIndex === -1) {
    sheet.appendRow(rowData);
  } else {
    sheet.getRange(rowIndex, 1, 1, rowData.length).setValues([rowData]);
  }
}


function otpSheet(ss) {
  return getOrCreateSheet(ss, OTP_SHEET_NAME, ["Email", "Purpose", "Code", "ExpiresAt", "Used"]);
}

function sendOtp(ss, email, purpose) {
  if (!email) return { ok: false, error: "Email required" };

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60000).toISOString();

  const sheet = otpSheet(ss);
  const rows = sheet.getDataRange().getValues();
  for (let i = rows.length - 1; i >= 1; i--) {
    if (rows[i][0] === email && rows[i][1] === purpose) {
      sheet.deleteRow(i + 1);
    }
  }
  sheet.appendRow([email, purpose, code, expiresAt, "NO"]);

  const subject = purpose === "reset"
    ? "MH2 Chess — Password Reset Code"
    : "MH2 Chess — Verify Your Email";

  const heading = purpose === "reset" ? "Reset Your Password" : "Verify Your Email";
  const message = purpose === "reset"
    ? "Apnar password reset korar jonyo niche deya code ti babohar korun."
    : "MH2 Chess-e account verify korar jonyo niche deya code ti babohar korun.";

  const html = `
  <div style="font-family:'Segoe UI',Arial,sans-serif;background:#05060a;padding:40px 20px;">
    <div style="max-width:420px;margin:0 auto;background:#0f1220;border-radius:18px;padding:36px 30px;border:1px solid rgba(124,158,255,0.18);">
      <div style="text-align:center;margin-bottom:24px;">
        <div style="font-size:22px;font-weight:800;background:linear-gradient(90deg,#00eaff,#8d6bff);-webkit-background-clip:text;background-clip:text;color:transparent;letter-spacing:1px;">MH2 CHESS</div>
      </div>
      <h2 style="color:#e9edf7;font-size:18px;text-align:center;margin:0 0 10px;">${heading}</h2>
      <p style="color:#9aa3bd;font-size:13px;text-align:center;line-height:1.6;margin:0 0 26px;">${message}</p>
      <div style="background:rgba(0,234,255,0.07);border:1px dashed #00eaff;border-radius:14px;padding:18px;text-align:center;margin-bottom:22px;">
        <span style="font-size:34px;letter-spacing:8px;font-weight:700;color:#00eaff;">${code}</span>
      </div>
      <p style="color:#5a6370;font-size:11px;text-align:center;margin:0;">Ei code ${OTP_EXPIRY_MINUTES} minute er jonyo valid thakbe. Apni jodi ei request na korle thaken, ei mail ta ignore korun.</p>
    </div>
  </div>`;

  GmailApp.sendEmail(email, subject, message + "\nCode: " + code, { htmlBody: html, name: "MH2 Chess" });

  return { ok: true, message: "OTP sent" };
}

function verifyOtp(ss, email, code, purpose) {
  if (!email || !code) return { ok: false, error: "Email and code required" };

  const sheet = otpSheet(ss);
  const rows = sheet.getDataRange().getValues();

  for (let i = 1; i < rows.length; i++) {
    const [rowEmail, rowPurpose, rowCode, rowExpires, rowUsed] = rows[i];
    if (rowEmail === email && rowPurpose === purpose) {
      if (rowUsed === "YES") return { ok: false, error: "Code already used" };
      if (new Date(rowExpires).getTime() < Date.now()) return { ok: false, error: "Code expired" };
      if (String(rowCode) !== String(code)) return { ok: false, error: "Invalid code" };

      sheet.getRange(i + 1, 5).setValue("YES");
      return { ok: true, verified: true };
    }
  }
  return { ok: false, error: "No OTP found, request a new one" };
}
