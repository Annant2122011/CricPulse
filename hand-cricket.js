// --- Advanced Game & Stat Variables ---
let playerScore = 0; let computerScore = 0;
let playerBalls = 0; let computerBalls = 0;
let targetScore = null;
let isPlayerBatting = true; 
let currentInnings = 1;
let isGameOver = false;
let playerTossChoice = ''; 

// Deep Tracking Stats
let pStats = { fours: 0, sixes: 0, outOn: "Not Out" };
let cStats = { fours: 0, sixes: 0, outOn: "Not Out" };

const handEmojis = { 1: "☝️", 2: "✌️", 3: "🤟", 4: "🖐️", 5: "🖐️", 6: "👍" };

const commentaryDB = {
    1: [
        "Pushed into the gap for a quick single.", 
        "Just a single, excellent rotation of the strike.", 
        "Tapped softly to mid-on and they scamper across for one.",
        "Driven straight to the sweeper cover, just a single.",
        "Nudged off the hips down to fine leg for one.",
        "Played with soft hands, quick single taken before the fielder reacts."
    ],
    2: [
        "Excellent running between the wickets, they get two.", 
        "Placed beautifully into the covers, an easy two.", 
        "Two runs added to the total. Great hustle out there!",
        "Whipped away through mid-wicket, they'll push hard and come back for the second.",
        "Spliced over the infield, the outfield is slow so they settle for two.",
        "Pushed hard down the ground, fantastic call for the second run."
    ],
    3: [
        "Great effort in the deep! The fielder saves a boundary but they run three.", 
        "Three runs! Brilliant running between the wickets under pressure.",
        "Pierced the infield but it slows down near the ropes, they run three.",
        "Fielder gives chase and pulls it back just in time. Three runs added.",
        "Excellent placement, the long boundary allows them to comfortably run three.",
        "Misfield in the deep! They take full advantage and sprint for a third run."
    ],
    4: [
        "SMASHED! One bounce over the ropes for FOUR!", 
        "Pierced the gap perfectly for a beautiful boundary.",
        "Crunched through the covers! No need to run for that, FOUR!",
        "Thick edge... but it flies past the keeper for a lucky FOUR!",
        "Dances down the track and drives it gloriously for four runs.",
        "Pulled away with absolute disdain! Four added to the total."
    ],
    5: [
        "Five runs?! Absolute chaos in the field! Overthrows!", 
        "A rare five runs! The fielding side is falling apart out there!",
        "Direct hit misses, the backup fielder fumbles... that's 5 runs!",
        "What a mix-up in the field! It's a comedy of errors resulting in 5.",
        "Pushed for a quick single, and an awful overthrow rolls all the way to the boundary! 5 runs!"
    ],
    6: [
        "OUT OF THE PARK! Massive SIX!", 
        "Stand and deliver! An absolute maximum!",
        "He's hit that into the next town! SIX RUNS!",
        "Into the stands! A lucky fan in the crowd catches that one, what a SIX!",
        "Clean strike! Sails high and handsome over long-on for a monstrous maximum.",
        "Absolutely dispatched! That sounded so sweet off the bat. SIX!"
    ]
};

// --- Toss Logic ---
function chooseToss(choice) {
    playerTossChoice = choice;
    document.getElementById('toss-step-1').style.display = 'none';
    document.getElementById('toss-step-2').style.display = 'block';
    document.getElementById('toss-choice-text').innerText = `You chose ${choice.toUpperCase()}`;
    speak(`You chose ${choice}. Throw your number.`);
}

function playToss(playerNum) {
    document.getElementById('toss-step-2').style.display = 'none';
    document.getElementById('toss-result-screen').style.display = 'block';

    const computerNum = Math.floor(Math.random() * 6) + 1;
    const totalSum = playerNum + computerNum;
    const isSumEven = totalSum % 2 === 0;

    document.getElementById('toss-player-hand').innerText = handEmojis[playerNum];
    document.getElementById('toss-computer-hand').innerText = handEmojis[computerNum];
    
    let sumResult = isSumEven ? 'EVEN' : 'ODD';
    document.getElementById('toss-sum-text').innerText = `${playerNum} + ${computerNum} = ${totalSum} (${sumResult})`;

    let playerWonToss = ((playerTossChoice === 'even' && isSumEven) || (playerTossChoice === 'odd' && !isSumEven));
    const winnerText = document.getElementById('toss-winner-text');
    
    if (playerWonToss) {
        winnerText.innerText = "🎉 YOU WON THE TOSS! 🎉";
        winnerText.style.color = "var(--accent-neon)";
        document.getElementById('player-decision-box').style.display = 'block';
        speak(`Sum is ${totalSum}. You won the toss! What will you do?`);
    } else {
        winnerText.innerText = "🤖 COMPUTER WON THE TOSS 🤖";
        winnerText.style.color = "#ff2a2a";
        const compDecisionBat = Math.random() > 0.5;
        isPlayerBatting = !compDecisionBat; 
        
        let decisionText = compDecisionBat ? "Computer chose to BAT first." : "Computer chose to BOWL first.";
        const compBox = document.getElementById('computer-decision-box');
        compBox.style.display = 'block';
        compBox.insertAdjacentHTML('afterbegin', `<p style="color: var(--accent-blue); font-size: 1.3rem; margin-bottom: 10px;">${decisionText}</p>`);
        speak(`Computer won the toss and chose to ${compDecisionBat ? 'bat' : 'bowl'}.`);
    }
}

function startMatch(playerDecidedToBat) {
    isPlayerBatting = playerDecidedToBat;
    continueToMatch();
}

function continueToMatch() {
    document.getElementById('toss-screen').style.display = 'none';
    document.getElementById('match-screen').style.display = 'block';
    updateInningsUI();
    const action = isPlayerBatting ? "Batting" : "Bowling";
    document.getElementById('hand-commentary').innerHTML = `You are <b>${action}</b> first! Throw a number.`;
    speak(`Match starting. You are ${action} first.`);
}

// --- Match Logic ---
function playHand(playerNum) {
    if (isGameOver) return;
    const computerNum = Math.floor(Math.random() * 6) + 1;
    
    document.getElementById('player-hand').innerText = handEmojis[playerNum];
    document.getElementById('computer-hand').innerText = handEmojis[computerNum];

    if (isPlayerBatting) playerBalls++;
    else computerBalls++;

    if (playerNum === computerNum) {
        handleWicket(playerNum); // Pass the number they got out on
    } else {
        handleRuns(playerNum, computerNum);
    }
}

function handleRuns(playerNum, computerNum) {
    const commentary = document.getElementById('hand-commentary');
    let crr = 0;

    if (isPlayerBatting) {
        playerScore += playerNum;
        if (playerNum === 4) pStats.fours++;
        if (playerNum === 6) pStats.sixes++;

        crr = ((playerScore / playerBalls) * 6).toFixed(1);
        document.getElementById('player-hand-score').innerText = playerScore;

        if (currentInnings === 2 && playerScore >= targetScore) { endGame(true, "chased"); return; }

        let text = commentaryDB[playerNum][Math.floor(Math.random() * commentaryDB[playerNum].length)];
        commentary.innerHTML = `<span style="color:var(--accent-neon); font-weight:bold;">+${playerNum} RUNS</span><br>${text} <span style="font-size:0.9rem; color:var(--text-dim);">(CRR: ${crr})</span>`;
    } else {
        computerScore += computerNum;
        if (computerNum === 4) cStats.fours++;
        if (computerNum === 6) cStats.sixes++;

        crr = ((computerScore / computerBalls) * 6).toFixed(1);
        document.getElementById('computer-hand-score').innerText = computerScore;

        if (currentInnings === 2 && computerScore >= targetScore) { endGame(false, "chased"); return; }

        let text = commentaryDB[computerNum][Math.floor(Math.random() * commentaryDB[computerNum].length)];
        commentary.innerHTML = `<span style="color:#ff2a2a; font-weight:bold;">+${computerNum} RUNS</span><br>${text} <span style="font-size:0.9rem; color:var(--text-dim);">(CRR: ${crr})</span>`;
    }
}

function handleWicket(outNumber) {
    const commentary = document.getElementById('hand-commentary');
    
    if (isPlayerBatting) pStats.outOn = outNumber;
    else cStats.outOn = outNumber;

    if (currentInnings === 1) {
        currentInnings = 2;
        if (isPlayerBatting) {
            targetScore = playerScore + 1;
            isPlayerBatting = false; 
            commentary.innerHTML = `<span style="color: #ff2a2a; font-weight:bold;">HOWZAT! YOU ARE OUT ON A ${outNumber}!</span><br>Computer needs ${targetScore} to win.`;
            speak(`Out on a ${outNumber}! The computer needs ${targetScore} to win.`);
        } else {
            targetScore = computerScore + 1;
            isPlayerBatting = true; 
            commentary.innerHTML = `<span style="color: var(--accent-neon); font-weight:bold;">BOWLED HIM ON A ${outNumber}!</span><br>You need ${targetScore} to win.`;
            speak(`Got him on a ${outNumber}! You need ${targetScore} to win.`);
        }
        document.getElementById('target-box').style.display = 'block';
        document.getElementById('target-score').innerText = targetScore;
        updateInningsUI();
    } else {
        if ((isPlayerBatting && playerScore === targetScore - 1) || (!isPlayerBatting && computerScore === targetScore - 1)) {
            endGame("tie", "tie");
        } else if (isPlayerBatting) {
            endGame(false, "defended"); 
        } else {
            endGame(true, "defended"); 
        }
    }
}

function updateInningsUI() {
    const badge = document.getElementById('innings-status');
    if (currentInnings === 1) {
        badge.innerText = `🏏 1ST INNINGS: YOU ARE ${isPlayerBatting ? 'BATTING' : 'BOWLING'}`;
        badge.style.background = isPlayerBatting ? "var(--accent-neon)" : "var(--accent-blue)";
    } else {
        badge.innerText = `🎯 2ND INNINGS: YOU ARE ${isPlayerBatting ? 'CHASING' : 'DEFENDING'}`;
        badge.style.background = isPlayerBatting ? "var(--accent-neon)" : "#ff2a2a";
        badge.style.color = isPlayerBatting ? "#000" : "#fff";
    }
}

function endGame(playerWins, winType) {
    isGameOver = true;
    const commentary = document.getElementById('hand-commentary');
    
    document.getElementById('hand-action-area').style.display = 'none';
    document.getElementById('hand-restart-btn').style.display = 'block';

    if (playerWins === "tie") {
        commentary.innerHTML = `<span style="color: #ff9900; font-weight:900;">🤝 IT'S A TIE! 🤝</span>`;
        speak("Unbelievable scenes! Match tied!");
    } else if (playerWins) {
        commentary.innerHTML = `<span style="color: var(--accent-neon); font-weight:900;">🏆 YOU WIN! 🏆</span>`;
        speak("What a victory! You have won the match!");
    } else {
        commentary.innerHTML = `<span style="color: #ff2a2a; font-weight:900;">❌ YOU LOSE! ❌</span>`;
        speak("Game over. The computer wins the match.");
    }

    generatePostMatchAnalysis(playerWins);
}

// ==========================================
// 📊 DEEP DATA ANALYSIS ENGINE 📊
// ==========================================
function generatePostMatchAnalysis(playerWins) {
    document.getElementById('analysis-screen').style.display = 'block';

    // Calculate Strike Rates & Run Rates
    let pSR = playerBalls > 0 ? ((playerScore / playerBalls) * 100).toFixed(2) : "0.00";
    let pRR = playerBalls > 0 ? ((playerScore / playerBalls) * 6).toFixed(2) : "0.00";
    let cSR = computerBalls > 0 ? ((computerScore / computerBalls) * 100).toFixed(2) : "0.00";
    let cRR = computerBalls > 0 ? ((computerScore / computerBalls) * 6).toFixed(2) : "0.00";

    // Inject Player Data
    document.getElementById('an-p-runs').innerText = playerScore;
    document.getElementById('an-p-balls').innerText = playerBalls;
    document.getElementById('an-p-sr').innerText = pSR;
    document.getElementById('an-p-rr').innerText = pRR;
    document.getElementById('an-p-bounds').innerText = (pStats.fours + pStats.sixes);
    document.getElementById('an-p-4s').innerText = pStats.fours;
    document.getElementById('an-p-6s').innerText = pStats.sixes;
    document.getElementById('an-p-out').innerText = pStats.outOn;

    // Inject Computer Data
    document.getElementById('an-c-runs').innerText = computerScore;
    document.getElementById('an-c-balls').innerText = computerBalls;
    document.getElementById('an-c-sr').innerText = cSR;
    document.getElementById('an-c-rr').innerText = cRR;
    document.getElementById('an-c-bounds').innerText = (cStats.fours + cStats.sixes);
    document.getElementById('an-c-4s').innerText = cStats.fours;
    document.getElementById('an-c-6s').innerText = cStats.sixes;
    document.getElementById('an-c-out').innerText = cStats.outOn;

    // AI Insight Generator
    let aiText = "";
    if (playerWins === "tie") {
        aiText = "An absolute dead heat! Both sides had identical impact on the pitch. Cricket is the real winner today.";
    } else if (playerWins) {
        if (parseFloat(pRR) > parseFloat(cRR) + 2) {
            aiText = `Absolute domination! You completely outclassed the AI with a massive Run Rate of ${pRR} compared to their ${cRR}. Your boundary hitting broke the computer's digital spirit!`;
        } else {
            aiText = `A hard-fought victory! The Run Rates were close (${pRR} vs ${cRR}), but your tactical bowling and clutch batting made the difference when it mattered most.`;
        }
    } else {
        if (parseFloat(cRR) > parseFloat(pRR) + 2) {
            aiText = `You were completely outplayed. The computer's aggressive Run Rate of ${cRR} crushed your bowling attack. You need to rotate the strike better next game!`;
        } else {
            aiText = `Heartbreak! You played well with a Run Rate of ${pRR}, but the computer edged you out. That wicket falling on a ${pStats.outOn} really cost you the match.`;
        }
    }

    document.getElementById('ai-insight-text').innerText = `"${aiText}"`;
    speak("Check out your post match analysis below.");
}

function resetToToss() {
    playerScore = 0; computerScore = 0;
    playerBalls = 0; computerBalls = 0;
    targetScore = null; currentInnings = 1; isGameOver = false;
    pStats = { fours: 0, sixes: 0, outOn: "Not Out" };
    cStats = { fours: 0, sixes: 0, outOn: "Not Out" };

    document.getElementById('match-screen').style.display = 'none';
    document.getElementById('toss-screen').style.display = 'block';
    document.getElementById('analysis-screen').style.display = 'none';
    
    document.getElementById('toss-step-1').style.display = 'block';
    document.getElementById('toss-step-2').style.display = 'none';
    document.getElementById('toss-result-screen').style.display = 'none';
    document.getElementById('player-decision-box').style.display = 'none';
    
    const compBox = document.getElementById('computer-decision-box');
    compBox.style.display = 'none';
    if(compBox.children.length > 1) compBox.removeChild(compBox.firstChild); 

    document.getElementById('player-hand-score').innerText = "0";
    document.getElementById('computer-hand-score').innerText = "0";
    document.getElementById('target-box').style.display = 'none';
    document.getElementById('player-hand').innerText = "✊";
    document.getElementById('computer-hand').innerText = "✊";
    document.getElementById('hand-action-area').style.display = 'block';
    document.getElementById('hand-restart-btn').style.display = 'none';
}

function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); 
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.1; utterance.pitch = 1.2; 
        window.speechSynthesis.speak(utterance);
    }
}
