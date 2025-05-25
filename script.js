// =================== WORTLISTE NACH KATEGORIEN ===================
const allWords = {
    objekte: ["Lampe", "Stuhl", "Tasse", "Tisch", "Schlüssel", "Buch",​"Glas", "Becher", "Flasche", "Kissen", "Decke", "Sofa", "Fernseher", "Fernbedienung", "Uhr", "Telefon", 
"Handy", "Computer", "Laptop", "Tablet", "Kopfhörer", "Radio", "Kamera", "Spiegel", "Bild", "Gemälde", 
"Schrank", "Kommode", "Schublade", "Regal", "Blume", "Vase", "Kerze", "Teelicht", "Tasche", "Rucksack", 
"Koffer", "Jacke", "Mantel", "Hut", "Mütze", "Schal", "Handschuh", "Socken", "Schuh", "Stiefel", 
"Kamm", "Bürste", "Zahnbürste", "Zahnpasta", "Seife", "Handtuch", "Waschlappen", "Shampoo", "Duschgel", "Spülung", 
"Topf", "Pfanne", "Herd", "Backofen", "Mikrowelle", "Kühlschrank", "Gefrierschrank", "Toaster", "Wasserkocher", "Mixer", 
"Kaffeemaschine", "Teekanne", "Teller", "Schüssel", "Messer", "Gabel", "Löffel", "Suppenkelle", "Dosenöffner", "Korkenzieher", 
"Besen", "Schaufel", "Wischmopp", "Eimer", "Staubsauger", "Handfeger", "Schwamm", "Putzlappen", "Gießkanne", "Blumentopf", 
"Brief", "Umschlag", "Paket", "Zeitschrift", "Zeitung", "Buchstütze", "Kalender", "Notizbuch", "Stift", "Kugelschreiber", 
"Radiergummi", "Lineal", "Tacker", "Locher", "Büroklammer", "Mappe", "Ordner", "Heft", "Block", "Papier" ],
    berufe: ["Arzt", "Lehrer", "Bäcker", "Mechaniker", "Polizist", "Pilot", "Arzt", "Lehrer", "Bäcker", "Mechaniker", "Polizist", "Pilot", "Feuerwehrmann", "Koch", "Kellner", "Friseur",
"Verkäufer", "Buchhalter", "Ingenieur", "Architekt", "Elektriker", "Maler", "Maurer", "Zimmermann", "Tischler", "Schreiner",
"Kfz-Mechatroniker", "Metzger", "Schneider", "Rechtsanwalt", "Notar", "Richter", "Staatsanwalt", "Bankkaufmann", "Versicherungskaufmann", "Immobilienmakler",
"Apotheker", "Zahnarzt", "Tierarzt", "Optiker", "Physiotherapeut", "Ergotherapeut", "Logopäde", "Pädagoge", "Erzieher", "Sozialarbeiter",
"Hebamme", "Pflegekraft", "Krankenpfleger", "Altenpfleger", "Rettungssanitäter", "Medizinisch-technischer Assistent", "Laborant", "Chemiker", "Biologe", "Physiker",
"Informatiker", "Programmierer", "Systemadministrator", "Webdesigner", "Grafiker", "Fotograf", "Journalist", "Redakteur", "Autor", "Übersetzer",
"Schauspieler", "Musiker", "Sänger", "Maler", "Bildhauer", "Tänzer", "Regisseur", "Kameramann", "Tontechniker", "Maskenbildner",
"Landwirt", "Gärtner", "Winzer", "Florist", "Fischer", "Jäger", "Forstwirt", "Tierpfleger", "Tiertrainer", "Hundetrainer",
"Lokführer", "Busfahrer", "Taxifahrer", "LKW-Fahrer", "Schaffner", "Seemann", "Matrose", "Bergmann", "Postbote", "Briefträger",
"Pilot", "Stewardess", "Hotelfachmann", "Rezeptionist", "Hausmeister", "Putzkraft", "Wachmann", "Detektiv", "Schiedsrichter", "Sporttrainer"],
    natur: ["Baum", "Blume", "Wolke", "See", "Stein", "Berg","Wald", "Wiese", "Fluss", "Teich", "Meer", "Ozean", "Strand", "Küste", "Wasserfall", "Gebirge",
"Hügel", "Tal", "Feld", "Moos", "Tundra", "Steppe", "Savanne", "Regenwald", "Dschungel", "Wüste",
"Schlucht", "Gletscher", "Lavasee", "Vulkan", "Höhle", "Quelle", "Bach", "Sumpf", "Moor", "Heide",
"Sand", "Lehm", "Erde", "Felsen", "Klippe", "Riff", "Insel", "Halbinsel", "Bucht", "Lagune",
"Delta", "Mündung", "Kanal", "Düne", "Grotte", "Wasserquelle", "Pfad", "Weg", "Ast", "Zweig",
"Laub", "Blatt", "Rinde", "Wurzel", "Samen", "Nuss", "Zapfen", "Gras", "Kraut", "Farn",
"Pilz", "Alge", "Koralle", "Muschel", "Schnecke", "Kiesel", "Tor", "Teichufer", "Hang", "Plateau",
"Steppe", "Sumpfwald", "Mangrove", "Boden", "Eis", "Schnee", "Feldrain", "Kanal", "Lagune", "Talboden",
"Quelle", "Bachlauf", "Aue", "Prärie", "Savannenbaum", "Binsen", "Teichrose", "Schilf", "Reisfeld", "Wildbach",
"Erhebung", "Wasseroberfläche", "Torf", "Heidekraut", "Erdreich", "Schluchtwald", "Geröll", "Schwemmland", "Sandbank", "Schlick" ],
    adjektive: ["schnell", "langsam", "lustig", "klug", "schwer", "klein","groß", "alt", "jung", "neu", "hoch", "tief", "breit", "schmal", "dick", "dünn",
"stark", "schwach", "hell", "dunkel", "warm", "kalt", "weich", "hart", "trocken", "nass",
"laut", "leise", "ruhig", "wild", "sanft", "rauh", "sauber", "schmutzig", "schön", "hässlich",
"freundlich", "unfreundlich", "nett", "böse", "mutig", "ängstlich", "fröhlich", "traurig", "zart", "grob",
"fleißig", "faul", "teuer", "billig", "wertvoll", "wertlos", "reich", "arm", "berühmt", "unbekannt",
"zufrieden", "unzufrieden", "gesund", "krank", "hungrig", "satt", "durstig", "müde", "wach", "aktiv",
"passiv", "offen", "verschlossen", "ehrlich", "unehrlich", "hilfsbereit", "egoistisch", "geduldig", "ungeduldig", "treu",
"untreu", "lustlos", "interessiert", "desinteressiert", "lieb", "herzlos", "entspannt", "nervös", "aufgeregt", "gelassen",
"ruhig", "launisch", "zufällig", "planmäßig", "geplant", "spontan", "konzentriert", "zerstreut", "vorsichtig", "leichtsinnig",
"pünktlich", "unpünktlich", "höflich", "frech", "ehrgeizig", "nachlässig", "bescheiden", "arrogant", "zuverlässig", "unzuverlässig",
"kompetent", "inkompetent", "witzig", "ernst", "freundschaftlich", "feindlich", "optimistisch", "pessimistisch", "hoffnungsvoll", "hoffnungslos",
"entschlossen", "unentschlossen", "neugierig", "gleichgültig", "charismatisch", "unauffällig", "loyal", "illoyal", "aktiv", "passiv",
"anständig", "unanständig", "gebildet", "ungebildet", "respektvoll", "respektlos", "authentisch", "verstellt", "modern", "altmodisch",
"klassisch", "exotisch", "natürlich", "künstlich", "robust", "empfindlich", "schüchtern", "aufgeschlossen", "leidenschaftlich", "gleichmütig",
"selbstbewusst", "unsicher", "selbstständig", "abhängig", "ehrlich", "unehrlich", "unterhaltsam", "langweilig", "rein", "unrein",
"gepflegt", "ungepflegt", "ordentlich", "unordentlich", "diszipliniert", "undiszipliniert", "willensstark", "willensschwach", "warmherzig", "kaltblütig",
"phantasievoll", "einfallslos", "begeistert", "gleichgültig", "verständnisvoll", "verständnislos", "zurückhaltend", "offensiv", "aggressiv", "defensiv",
"verspielt", "ernsthaft", "bodenständig", "abgehoben", "überheblich", "demütig", "sorgfältig", "nachlässig", "sparsam", "verschwenderisch",
"flexibel", "starr", "beständig", "unbeständig", "entschlossen", "zögerlich", "frisch", "altbacken", "spannend", "langweilig",
"hilfsbereit", "gleichgültig", "tolerant", "intolerant", "beliebt", "unbeliebt", "ausgeglichen", "unausgeglichen", "gelassen", "hektisch",
"lebendig", "träge", "heiter", "düster", "verträumt", "realistisch", "sicher", "unsicher", "klar", "verschwommen",
"detailreich", "oberflächlich", "zielstrebig", "planlos", "treu", "unzuverlässig", "anpassungsfähig", "stur", "ehrgeizig", "antriebslos",
"abenteuerlustig", "vorsichtig", "glücklich", "unglücklich", "respektvoll", "rücksichtslos", "besonnen", "impulsiv", "geduldig", "scharfsinnig"
],
    verben: ["laufen", "springen", "malen", "essen", "lesen", "schlafen", "gehen", "fahren", "schreiben", "sprechen", "sehen", "hören", "denken", "fühlen", "riechen", "schmecken",
"arbeiten", "spielen", "trinken", "zeichnen", "bauen", "kaufen", "verkaufen", "bezahlen", "nehmen", "geben",
"bringen", "holen", "suchen", "finden", "verlieren", "gewinnen", "öffnen", "schließen", "legen", "stellen",
"setzen", "stehen", "sitzen", "fallen", "steigen", "klettern", "rollen", "drehen", "wenden", "ziehen",
"schieben", "drücken", "halten", "werfen", "fangen", "backen", "kochen", "braten", "putzen", "wischen",
"waschen", "spülen", "schneiden", "messen", "wiegen", "packen", "entpacken", "schalten", "leuchten", "blinken",
"tanzen", "singen", "zeichnen", "fotografieren", "filmen", "fragen", "antworten", "erzählen", "beschreiben", "erklären",
"planen", "organisieren", "besuchen", "einladen", "grüßen", "verabschieden", "beginnen", "enden", "warten", "beeilen",
"weinen", "lachen", "lächeln", "ärgern", "freuen", "bewundern", "glauben", "hoffen", "lieben", "hassen",
"vergessen", "erinnern", "verzeihen", "streiten", "vertragen", "reisen", "fliegen", "baden", "duschen", "zählen"
],
    bekanntePersonen: ["Justin Bieber", "Billie Eilish", "Ariana Grande", "Rihanna", "Drake", "Beyoncé", "Selena Gomez", "Dua Lipa", "The Weeknd", "Kendrick Lamar",
"Kanye West", "Taylor Swift", "Shawn Mendes", "Camila Cabello", "Ed Sheeran", "Harry Styles", "Zayn", "Niall Horan", "Louis Tomlinson", "Liam Payne",
"Miley Cyrus", "Nicki Minaj", "Cardi B", "Travis Scott", "Post Malone", "Olivia Rodrigo", "Doja Cat", "Lizzo", "Sam Smith", "Bruno Mars",
"Tupac", "Eminem", "Usher", "Ne-Yo", "Chris Brown", "Lil Wayne", "50 Cent", "Jay-Z", "Katy Perry", "Lady Gaga",
"Zendaya", "Timothée Chalamet", "Emma Watson", "Daniel Radcliffe", "Rupert Grint", "Tom Holland", "Robert Pattinson", "Kristen Stewart", "Millie Bobby Brown", "Finn Wolfhard",
"Will Smith", "Jaden Smith", "Jacob Elordi", "Sydney Sweeney", "Hunter Schafer", "Pedro Pascal", "Pedro Alonso", "Úrsula Corberó", "Cillian Murphy",
"Tommy Shelby", "Walter White", "Jesse Pinkman", "Eleven", "Spongebob", "Patrick Star", "Squidward", "Sandy Cheeks", "Naruto", "Sasuke Uchiha",
"Sakura Haruno", "Kakashi", "Itachi", "Goku", "Vegeta", "Bulma", "Luffy", "Zorro", "Sanji", "Nami",
"Ash Ketchum", "Pikachu", "Misty", "Brock", "Detektiv Conan", "Ran Mori", "Shinichi Kudo", "Heiji Hattori", "L Lawliet", "Light Yagami",
"Rick Sanchez", "Morty Smith", "BoJack Horseman", "Homer Simpson", "Bart Simpson", "Marge Simpson", "Lisa Simpson", "Mickey Mouse", "Donald Duck", "Goofy"]
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
    <small style="color:#bbb;">(Erlaube ggf. Bewegungssensoren, falls dein Handy fragt)</small>
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
let neutralBeta = null; // Für echte Kipp-Ausgangsposition
let canTriggerKipp = true; // Für "Debounce", damit kein Doppelkipp

// =================== MOTION/FREIGABE iOS ===================
function requestMotionPermissionIfNeeded() {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState !== 'granted') {
                    alert("Bitte erlaube Zugriff auf die Bewegungssensoren in den Einstellungen.");
                }
            })
            .catch(console.error);
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
        requestMotionPermissionIfNeeded();
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

// =================== HINWEIS: QUERFORMAT BIS ERKANNT ===================
function showOrientationHintAndThen(callback) {
    orientationHint.style.display = "flex";

    function checkLandscapeAndContinue() {
        let isLandscape = false;
        if (window.matchMedia("(orientation: landscape)").matches) {
            isLandscape = true;
        }
        if (typeof window.orientation !== "undefined") {
            isLandscape = (window.orientation === 90 || window.orientation === -90);
        }
        if (isLandscape) {
            orientationHint.style.display = "none";
            window.removeEventListener('orientationchange', checkLandscapeAndContinue);
            window.removeEventListener('resize', checkLandscapeAndContinue);
            callback();
        }
    }

    window.addEventListener('orientationchange', checkLandscapeAndContinue);
    window.addEventListener('resize', checkLandscapeAndContinue);
    checkLandscapeAndContinue();
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

    // Neutrale Kipp-Ausgangsposition beim Start der Runde merken
    neutralBeta = null;
    window.addEventListener('deviceorientation', captureNeutralBeta, { once: true });
    function captureNeutralBeta(event) {
        neutralBeta = event.beta;
    }
    canTriggerKipp = true; // Für jede Runde neu erlauben

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
    canTriggerKipp = true; // Nach jedem neuen Wort wieder erlauben
}

// =================== TIMER ANZEIGEN ===================
function updateTimerDisplay() {
    document.getElementById('timer-display').textContent = `Verbleibende Zeit: ${remainingTime}s`;
}

// =================== KIPPSTEUERUNG (DEVICE ORIENTATION) ===================
window.addEventListener('deviceorientation', function(event) {
    if (!isGameRunning || neutralBeta === null) return;
    let delta = event.beta - neutralBeta;

    // Schwellen für „deutlich“ kippen:
    const THRESHOLD = 35; // wie sensibel: höher = weniger sensibel
    const NEUTRAL_RANGE = 20; // wie breit die Neutralzone ist

    // Prüfen, ob noch in Neutralzone
    if (delta > -NEUTRAL_RANGE && delta < NEUTRAL_RANGE) {
        canTriggerKipp = true; // Freigabe für nächste Wertung
        return;
    }

    // Nur auslösen, wenn nicht mehrfach hintereinander und deutlich gekippt
    if (canTriggerKipp) {
        if (delta > THRESHOLD) {
            handleKipp(true);  // Nach unten gekippt (richtig)
            canTriggerKipp = false;
        } else if (delta < -THRESHOLD) {
            handleKipp(false); // Nach oben gekippt (falsch)
            canTriggerKipp = false;
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
        canTriggerKipp = true; // Nach jedem neuen Wort wieder erlauben
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
