// =================== WORTLISTE NACH KATEGORIEN ===================
const allWords = {
    objekte: ["Lampe", "Stuhl", "Tasse", "Tisch", "Schlüssel", "Buch"],
    berufe: ["Arzt", "Lehrer", "Bäcker", "Mechaniker", "Polizist", "Pilot"],
    natur: ["Baum", "Blume", "Wolke", "See", "Stein", "Berg"],
    adjektive: ["schnell", "langsam", "lustig", "klug", "schwer", "klein"],
    verben: ["laufen", "springen", "malen", "essen", "lesen", "schlafen"]
    // Weitere Kategorien und Wörter kannst du ergänzen!
};

// =================== BEREICHE REFERENZIEREN ===================
const setupSection = document.getElementById('setup-section');
const gameSection = document.getElementById('game-section');
const resultsSection = document.getElementById('results-section');
const startBtn = document.getElementById('start-game-btn');
const restartBtn = document.getElementById('restart-btn');
const playerCountInput = document.getElementById('player-count');
const playerNamesDiv = document.getElementById('player-names');

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

// =================== SPIELSTART: SETUP EINSAMMELN & STARTEN ===================
startBtn.addEventListener('click', function () {
    const names = Array.from(document.getElementsByClassName('player-name'))
        .map(input => input.value.trim() || input.placeholder);

    const rounds = parseInt(document.getElementById('rounds-per-player').value);
    const roundTime = parseInt(document.getElementById('round-time').value);
    const categories = Array.from(document.querySelectorAll('#category-select input:checked'))
        .map(cb => cb.value);

    // Warnung und Abbruch, wenn keine Kategorie gewählt
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
    startGameSession();
});

// =================== SPIELSESSION INITIALISIEREN ===================
function startGameSession() {
    playerIndex = 0;
    round = 1;
    scores = Array(gameData.playerNames.length).fill(0);

    // Wörter nach gewählten Kategorien
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
    document.getElementById('ready-btn').style.display = 'block';
    document.getElementById('current-player-display').textContent = `${gameData.playerNames[playerIndex]} ist an der Reihe (Runde ${round})`;

    // Sicherstellen, dass Punkte immer korrekt angezeigt werden
    const punkte = Number.isFinite(scores[playerIndex]) ? scores[playerIndex] : 0;
    document.getElementById('score-display').textContent = `Punkte: ${punkte}`;

    // Querformat anfordern (optional)
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(()=>{});
    }
}

// =================== COUNTDOWN & START DER RUNDE ===================
document.getElementById('ready-btn').onclick = startRound;

function startRound() {
    document.getElementById('ready-btn').style.display = "none";
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
}

// =================== TIMER ANZEIGEN ===================
function updateTimerDisplay() {
    document.getElementById('timer-display').textContent = `Verbleibende Zeit: ${remainingTime}s`;
}

// =================== KIPPSTEUERUNG (DEVICE ORIENTATION) ===================
window.addEventListener('deviceorientation', function(event) {
    if (!isGameRunning) return;
    let x = event.beta;
    // Richtung Boden (richtig): +60° bis +110°
    if (x >= 60 && x <= 110) {
        handleKipp(true);
    }
    // Richtung Decke (falsch): -60° bis -110°
    else if (x <= -60 && x >= -110) {
        handleKipp(false);
    }
    // Sonst nichts tun!
}, true);

// =================== KIPP-AKTION: FEEDBACK, PUNKTE, WORTWECHSEL ===================
function handleKipp(correct) {
    // Nur reagieren, wenn wirklich ein Wort angezeigt wird!
    if (!isGameRunning || !wordsCurrentRound.length) return;
    isGameRunning = false; // Verhindert Dopplung

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

    // Ergebnisse sortieren (Rangfolge)
    let results = gameData.playerNames.map((name, i) => ({
        name: name,
        points: scores[i]
    }));
    results.sort((a, b) => b.points - a.points);

    // Highscore speichern (beste Leistung mit Zeitpunkt)
    saveHighscore(results);

    // Gewinner optisch hervorheben (Platz 1 gelb hinterlegen)
    let html = `<table>
        <tr><th>Rang</th><th>Spieler</th><th>Punkte</th></tr>`;
    results.forEach((r, i) => {
        let highlight = i === 0 ? ' style="background:#ffe066;color:#222;font-weight:bold;"' : '';
        html += `<tr${highlight}><td>${i+1}.</td><td>${r.name}</td><td>${r.points}</td></tr>`;
    });
    html += `</table>`;

    // Highscore-Tabelle darunter einblenden
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