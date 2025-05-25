// =================== WORTLISTE NACH KATEGORIEN ===================
const allWords = {
    objekte: ["Glas", "Becher", "Flasche", "Kissen", "Decke", "Sofa", "Fernseher", "Fernbedienung", "Uhr", "Telefon"],
    berufe: ["Arzt", "Lehrer", "Bäcker", "Mechaniker", "Polizist", "Pilot", "Koch", "Kellner", "Friseur", "Verkäufer"],
    natur: ["Wald", "Wiese", "Fluss", "Teich", "Meer", "Ozean", "Strand", "Küste", "Wasserfall", "Gebirge"],
    adjektive: ["groß", "alt", "jung", "neu", "hoch", "tief", "breit", "schmal", "dick", "dünn"],
    verben: ["gehen", "fahren", "schreiben", "sprechen", "sehen", "hören", "denken", "fühlen", "riechen", "schmecken"]
    // Weitere Begriffe kannst du oben anreichern
};

// =================== BEREICHE REFERENZIEREN ===================
const setupSection = document.getElementById('setup-section');
const gameSection = document.getElementById('game-section');
const resultsSection = document.getElementById('results-section');
const startBtn = document.getElementById('start-game-btn');
const restartBtn = document.getElementById('restart-btn');
const playerCountInput = document.getElementById('player-count');
const playerNamesDiv = document.getElementById('player-names');
const readyBtn = document.getElementById('ready-btn');

// =================== HINWEIS-FENSTER FÜR QUERFORMAT & KIPPE ===================
const orientationHint = document.createElement('div');
orientationHint.id = "orientation-hint";
orientationHint.style.cssText = "position:fixed;left:0;top:0;width:100vw;height:100vh;z-index:9999;background:rgba(0,0,0,0.95);color:#fff;display:flex;align-items:center;justify-content:center;font-size:1.4em;text-align:center;display:none;";
orientationHint.innerHTML = `
<div>
    <b>Bitte drehe dein Handy jetzt ins Querformat<br>
    und halte es wie ein Stirnband an deine Stirn.<br>
    <br>
    <span style="color:#80ff80;">Kippe nach unten (Richtung Boden): <b>richtig</b> (grün)</span><br>
    <span style="color:#ffb2b2;">Kippe nach oben (Richtung Decke): <b>falsch</b> (rot)</span>
    </b>
    <br><br>
    <button id="enable-motion-btn" style="font-size:1em;padding:0.5em 1em;margin-top:1em;">Bewegungssensoren aktivieren</button>
    <br><small style="color:#bbb;">(iPhone: Bitte Bewegungssensoren erlauben, sonst funktioniert die Kippsteuerung nicht!)</small>
</div>
`;
document.body.appendChild(orientationHint);

// =================== NAMENSFELDER DYNAMISCH ERZEUGEN ===================
function renderNameInputs() {
    playerNamesDiv.innerHTML = '';
    const playerCount = parseInt(playerCountInput.value) || 2;
    for (let i = 1; i <= playerCount; i++) {
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Name Spieler ${i}`;
        input.className = 'player-name';
        playerNamesDiv.appendChild(input);
    }
}
playerCountInput.addEventListener('change', renderNameInputs);
window.addEventListener('DOMContentLoaded', renderNameInputs);

// =================== SPIELFLUSS-VARIABLEN ===================
let gameData = null;
let playerIndex = 0;
let round = 1;
let timer = null;
let wordIndex = 0;
let wordsCurrentRound = [];
let remainingTime = 0;
let scores = [];
let isGameRunning = false;
let neutralGamma = null; // Für Kipp-Ausgangsposition im Querformat
let canTriggerKipp = true; // Für Debounce, damit kein Doppelkipp
let landscapeSign = 1; // Für Landscape-Richtungs-Erkennung
let motionPermissionGranted = false;

// =================== LANDSCAPE-RICHTUNG ERKENNEN ===================
function detectLandscapeSign() {
    if (window.orientation === 90) {
        landscapeSign = 1;   // Landscape-Left
    } else if (window.orientation === -90) {
        landscapeSign = -1;  // Landscape-Right
    } else {
        landscapeSign = 1;   // Fallback
    }
}

// =================== SPIELSTART: SETUP EINSAMMELN & STARTEN ===================
startBtn.addEventListener('click', function () {
    const names = Array.from(document.getElementsByClassName('player-name'))
        .map(input => input.value.trim() || input.placeholder);

    const rounds = parseInt(document.getElementById('rounds-per-player').value);
    const roundTime = parseInt(document.getElementById('round-time').value);
    const categories = Array.from(document.querySelectorAll('#category-select input:checked'))
        .map(cb => cb.value);

    if (categories.length === 0) {
        alert("Bitte wähle mindestens eine Kategorie aus!");
        return;
    }

    gameData = {
        playerNames: names,
        rounds,
        roundTime,
        categories
    };

    setupSection.style.display = 'none';
    gameSection.style.display = 'flex';
    resultsSection.style.display = 'none';

    showOrientationHintAndThen(() => {
        startGameSession();
    });
});

// =================== SPIELSESSION INITIALISIEREN ===================
function startGameSession() {
    playerIndex = 0;
    round = 1;
    scores = Array(gameData.playerNames.length).fill(0);

    wordsCurrentRound = [];
    gameData.categories.forEach(category => {
        if (allWords[category]) {
            wordsCurrentRound = wordsCurrentRound.concat(allWords[category]);
        }
    });
    if (wordsCurrentRound.length === 0) {
        Object.values(allWords).forEach(arr => wordsCurrentRound = wordsCurrentRound.concat(arr));
    }
    wordsCurrentRound = wordsCurrentRound.sort(() => Math.random() - 0.5);

    wordIndex = 0;
    showPlayerTurn();
}

// =================== ANZEIGE, WER DRAN IST ===================
function showPlayerTurn() {
    isGameRunning = false;
    document.getElementById('word-display').style.display = "none";
    document.getElementById('timer-display').textContent = "";
    document.getElementById('countdown').style.display = "none";
    readyBtn.style.display = 'block';
    document.getElementById('current-player-display').textContent = `${gameData.playerNames[playerIndex]} ist an der Reihe (Runde ${round})`;

    const punkte = Number.isFinite(scores[playerIndex]) ? scores[playerIndex] : 0;
    document.getElementById('score-display').textContent = `Punkte: ${punkte}`;

    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(()=>{});
    }
}

// =================== HINWEIS: QUERFORMAT BIS ERKANNT + iOS BUTTON ===================
function showOrientationHintAndThen(callback) {
    orientationHint.style.display = "flex";
    let permissionOk = false;

    const enableBtn = document.getElementById('enable-motion-btn');
    if (enableBtn) {
        enableBtn.disabled = false;
        enableBtn.innerText = "Bewegungssensoren aktivieren";
        enableBtn.onclick = function() {
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission().then(result => {
                    if (result === 'granted') {
                        permissionOk = true;
                        enableBtn.disabled = true;
                        enableBtn.innerText = "Bewegungssensoren aktiviert!";
                        proceedIfReady();
                    } else {
                        alert("Bitte erlaube die Bewegungssensoren.");
                    }
                });
            } else {
                permissionOk = true;
                enableBtn.disabled = true;
                enableBtn.innerText = "Bewegungssensoren nicht nötig";
                proceedIfReady();
            }
        };
    } else {
        permissionOk = true;
    }

    function proceedIfReady() {
        let isLandscape = false;
        if (window.matchMedia("(orientation: landscape)").matches) isLandscape = true;
        if (typeof window.orientation !== "undefined")
            isLandscape = (window.orientation === 90 || window.orientation === -90);
        if (isLandscape && permissionOk) {
            orientationHint.style.display = "none";
            window.removeEventListener('orientationchange', proceedIfReady);
            window.removeEventListener('resize', proceedIfReady);
            callback();
        }
    }

    window.addEventListener('orientationchange', proceedIfReady);
    window.addEventListener('resize', proceedIfReady);
    proceedIfReady();
}

// =================== COUNTDOWN & START DER RUNDE ===================
readyBtn.onclick = function startRound() {
    showOrientationHintAndThen(reallyStartRound);
};

function reallyStartRound() {
    readyBtn.style.display = "none";
    let count = 3;
    const countdownDiv = document.getElementById('countdown');
    countdownDiv.style.display = "block";
    countdownDiv.textContent = count;
    document.getElementById('word-display').style.display = "none";

    const countdown = setInterval(() => {
        count--;
        if (count > 0) {
            countdownDiv.textContent = count;
        } else {
            clearInterval(countdown);
            countdownDiv.style.display = "none";
            beginGameplay();
        }
    }, 800);
}

// =================== RUNDE BEGINNT, TIMER LÄUFT ===================
function beginGameplay() {
    setNeutralGamma(); // Neutralstellung exakt bei Rundenstart setzen!
    canTriggerKipp = true;

    if (!gameData || !gameData.roundTime) {
        alert("Fehler: Spieldaten fehlen. Bitte Spiel erneut starten!");
        location.reload();
        return;
    }
    isGameRunning = true;
    wordIndex = 0;
    showWord();
    remainingTime = gameData.roundTime;
    updateTimerDisplay();
    timer = setInterval(() => {
        remainingTime--;
        updateTimerDisplay();
        if (remainingTime <= 0) {
            clearInterval(timer);
            isGameRunning = false;
            setTimeout(nextPlayerOrEnd, 900);
        }
    }, 1000);
}

// ========== NEUTRALSTELLUNG (GAMMA) SPEICHERN (bei Wortstart) + LandscapeSign setzen ==========
function setNeutralGamma() {
    neutralGamma = null;
    detectLandscapeSign();
    window.addEventListener('deviceorientation', function once(event) {
        neutralGamma = event.gamma;
        window.removeEventListener('deviceorientation', once, true);
    }, true);
}

// =================== AKTUELLES WORT ANZEIGEN ===================
function showWord() {
    if (!wordsCurrentRound.length) {
        document.getElementById('word-display').textContent = "Keine Wörter!";
        isGameRunning = false;
        return;
    }
    if (wordIndex >= wordsCurrentRound.length) {
        wordsCurrentRound = wordsCurrentRound.sort(() => Math.random() - 0.5);
        wordIndex = 0;
    }
    const aktuellesWort = wordsCurrentRound[wordIndex] || "-";
    document.getElementById('word-display').textContent = aktuellesWort;
    document.getElementById('word-display').style.display = "block";
    const punkte = Number.isFinite(scores[playerIndex]) ? scores[playerIndex] : 0;
    document.getElementById('score-display').textContent = `Punkte: ${punkte}`;
    canTriggerKipp = true;
}

// =================== TIMER ANZEIGEN ===================
function updateTimerDisplay() {
    document.getElementById('timer-display').textContent = `Verbleibende Zeit: ${remainingTime}s`;
}

// =================== KIPPSTEUERUNG (DEVICE ORIENTATION, GAMMA!) ===================
const THRESHOLD = 55;
const NEUTRAL_RANGE = 20;

window.addEventListener('deviceorientation', function(event) {
    if (!isGameRunning || neutralGamma === null) return;

    let delta = (event.gamma - neutralGamma) * landscapeSign;

    // In Neutralzone: Debounce zurücksetzen
    if (delta > -NEUTRAL_RANGE && delta < NEUTRAL_RANGE) {
        canTriggerKipp = true;
        return;
    }

    // ECHTES Debounce: Nur 1 Wort pro Kipp, egal wie lange gekippt!
    if (canTriggerKipp) {
        if (delta > THRESHOLD) {
            canTriggerKipp = false;
            handleKipp(true);  // Nach unten (Boden): grün, Punkt
        } else if (delta < -THRESHOLD) {
            canTriggerKipp = false;
            handleKipp(false); // Nach oben (Decke): rot, kein Punkt
        }
    }
}, true);

// =================== KIPP-AKTION: FEEDBACK, PUNKTE, WORTWECHSEL ===================
function handleKipp(correct) {
    if (!isGameRunning || !wordsCurrentRound.length) return;
    isGameRunning = false;
    if (correct) {
        scores[playerIndex] = (Number.isFinite(scores[playerIndex]) ? scores[playerIndex] : 0) + 1;
        gameSection.classList.add('game-correct');
    } else {
        gameSection.classList.add('game-wrong');
    }
    setTimeout(() => {
        gameSection.classList.remove('game-correct', 'game-wrong');
        wordIndex++;
        showWord();
        isGameRunning = true;
        canTriggerKipp = true;
    }, 400);
}

// =================== RUNDE & SPIELENDE / AUSWERTUNG ===================
function nextPlayerOrEnd() {
    gameSection.classList.remove('game-correct', 'game-wrong');
    document.getElementById('word-display').style.display = "none";
    document.getElementById('timer-display').textContent = "";

    playerIndex++;
    if (playerIndex >= gameData.playerNames.length) {
        playerIndex = 0;
        round++;
    }

    if (round > gameData.rounds) {
        showResultsFinal();
    } else {
        showPlayerTurn();
    }
}

// ==== Highscore-Laden und Speichern (localStorage) ====
function saveHighscore(resultsArr) {
    let highscores = JSON.parse(localStorage.getItem("stirnraten_highscores") || "[]");
    const now = new Date();
    highscores.push({
        results: resultsArr,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString()
    });
    localStorage.setItem("stirnraten_highscores", JSON.stringify(highscores));
}

function loadHighscoreTable() {
    let highscores = JSON.parse(localStorage.getItem("stirnraten_highscores") || "[]");
    if (highscores.length === 0) return "<i>Kein Highscore gespeichert</i>";
    let html = `<table>
        <tr><th>Datum</th><th>Uhrzeit</th><th>1. Platz</th><th>Punkte</th></tr>`;
    highscores.slice().reverse().forEach(entry => {
        let best = entry.results[0];
        html += `<tr>
            <td>${entry.date}</td>
            <td>${entry.time}</td>
            <td>${best.name}</td>
            <td>${best.points}</td>
        </tr>`;
    });
    html += `</table>`;
    return html;
}

// =================== AUSWERTUNG & RANGFOLGE, GEWINNER HERVORHEBEN ===================
function showResultsFinal() {
    isGameRunning = false;
    setupSection.style.display = 'none';
    gameSection.style.display = 'none';
    resultsSection.style.display = 'flex';

    let results = gameData.playerNames.map((name, i) => ({
        name: name,
        points: scores[i]
    }));
    results.sort((a, b) => b.points - a.points);

    saveHighscore(results);

    let html = `<table>
        <tr><th>Rang</th><th>Spieler</th><th>Punkte</th></tr>`;
    results.forEach((r, i) => {
        let highlight = i === 0 ? ' style="background:#ffe066;color:#222;font-weight:bold;"' : '';
        html += `<tr${highlight}><td>${i+1}.</td><td>${r.name}</td><td>${r.points}</td></tr>`;
    });
    html += `</table>`;

    html += `<h3>Highscores</h3>` + loadHighscoreTable();

    document.getElementById('results-table').innerHTML = html;
}

// =================== NEUSTART ===================
restartBtn.addEventListener('click', function () {
    setupSection.style.display = 'flex';
    gameSection.style.display = 'none';
    resultsSection.style.display = 'none';
    renderNameInputs();
});
