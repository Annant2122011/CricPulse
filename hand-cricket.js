// --- Advanced Game State Variables ---
let playerScore = 0;
let computerScore = 0;
let playerBalls = 0;
let computerBalls = 0;
let targetScore = null;
let isPlayerBatting = true; 
let currentInnings = 1;
let isGameOver = false;

// Toss Variables
let playerTossChoice = ''; 

// Visual Hand Emojis
const handEmojis = {
    1: "☝️", 2: "✌️", 3: "🤟", 4: "🖐️", 5: "🖐️", 6: "👍"
};

// Rich Commentary Database
const commentaryDB = {
    1: ["Pushed into the gap for a quick single.", "Just a single, good rotation of strike.", "Tapped to mid-on and they scamper across for one."],
    2: ["Excellent running between the wickets, they get two.", "Placed beautifully into the covers, easy two.", "Two runs added to the total. Great hustle!"],
    3: ["Great effort in the deep, they save a boundary but get three.", "Three runs! Brilliant running under pressure."],
    4: ["SMASHED! One bounce over the ropes for FOUR!", "What a shot! Pierced the gap perfectly for four.", "Beautiful timing, crunched to the boundary for FOUR!"],
    5: ["Five runs?! Absolute chaos in the field! Overthrows!", "Rare five runs! The fielding side is falling apart!"],
    6: ["OUT OF THE PARK! Massive SIX!", "He's hit that into the next town! SIX RUNS!", "Stand and deliver! An absolute maximum!"]
};

// ==========================================
// TOSS LOGIC
// ==========================================

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
        speak(`Sum is ${totalSum}, which is ${sumResult}. You won the toss! What will you do?`);
    } else {
        winnerText.innerText = "🤖 COMPUTER WON THE TOSS 🤖";
        winnerText.style.color = "#ff2a2a";
        
        const compDecisionBat = Math.random() > 0.5;
        isPlayerBatting = !compDecisionBat; 
        
        let decisionText = compDecisionBat ? "Computer chose to BAT first." : "Computer chose to BOWL first.";
        
        const compBox = document.getElementById('computer-decision-box');
        compBox.style.display = 'block';
        compBox.insertAdjacentHTML('afterbegin', `<p style="color: var(--accent-blue); font-size: 1.3rem; margin-bottom: 10px;">${decisionText}</p>`);
        
        speak(`Sum is ${totalSum}. Computer won the toss and chose to ${compDecisionBat ? 'bat' : 'bowl'}.`);
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
    document.getElementById('hand-commentary').innerHTML = `You are <b>${action}</b> first! Step up to the pitch and throw a number.`;
    speak(`Match starting. You are ${action} first. Let's play!`);
}

// ==========================================
// MATCH LOGIC & STATS
// ==========================================

function getRandomCommentary(runs) {
    const options = commentaryDB[runs];
    return options[Math.floor(Math.random() * options.length)];
}

function playHand(playerNum) {
    if (isGameOver) return;

    const computerNum = Math.floor(Math.random() * 6) + 1;
    const playerIcon = document.getElementById('player-hand');
    const computerIcon = document.getElementById('computer-hand');
    
    playerIcon.innerText = handEmojis[playerNum];
    computerIcon.innerText = handEmojis[computerNum];

    // Pop Animation
    playerIcon.style.transform = "scale(1.3)";
    computerIcon.style.transform = "scale(1.3)";
    setTimeout(() => {
        playerIcon.style.transform = "scale(1)";
        computerIcon.style.transform = "scale(1)";
    }, 150);

    if (isPlayerBatting) {
        playerBalls++;
    } else {
        computerBalls++;
    }

    if (playerNum === computerNum) {
        handleWicket();
    } else {
        handleRuns(playerNum, computerNum);
    }
}

function handleRuns(playerNum, computerNum) {
    const commentary = document.getElementById('hand-commentary');
    let crr = 0;

    if (isPlayerBatting) {
        let oldScore = playerScore;
        playerScore += playerNum;
        crr = ((playerScore / playerBalls) * 6).toFixed(1);
        
        document.getElementById('player-hand-score').innerText = playerScore;
        
        // Milestone Check!
        if (oldScore < 50 && playerScore >= 50) {
            speak(`Brilliant batting! That is a half century for the player!`);
            commentary.innerHTML = `🌟 <b>HALF CENTURY!</b> 🌟<br>You bring up 50 off just ${playerBalls} balls!`;
            return; // Skip normal commentary to celebrate
        }

        if (currentInnings === 2 && playerScore >= targetScore) {
            endGame(true, "chased");
            return;
        }

        let dynamicText = getRandomCommentary(playerNum);
        commentary.innerHTML = `<span style="color:var(--accent-neon); font-weight:bold;">+${playerNum} RUNS</span><br>${dynamicText} <span style="font-size:0.9rem; color:var(--text-dim);">(CRR: ${crr})</span>`;
        if (playerNum >= 4) speak(`${playerNum} runs! Good shot.`);

    } else {
        let oldScore = computerScore;
        computerScore += computerNum;
        crr = ((computerScore / computerBalls) * 6).toFixed(1);

        document.getElementById('computer-hand-score').innerText = computerScore;
        
        if (oldScore < 50 && computerScore >= 50) {
            speak(`The computer brings up a dangerous half century.`);
            commentary.innerHTML = `⚠️ <b>HALF CENTURY</b> ⚠️<br>Computer reaches 50 off ${computerBalls} balls.`;
            return;
        }

        if (currentInnings === 2 && computerScore >= targetScore) {
            endGame(false, "chased");
            return;
        }

        let dynamicText = getRandomCommentary(computerNum);
        commentary.innerHTML = `<span style="color:#ff2a2a; font-weight:bold;">+${computerNum} RUNS</span><br>${dynamicText} <span style="font-size:0.9rem; color:var(--text-dim);">(CRR: ${crr})</span>`;
        if (computerNum >= 4) speak(`Computer hits ${computerNum}`);
    }
}

function handleWicket() {
    const commentary = document.getElementById('hand-commentary');
    const board = document.querySelector('.hand-cricket-board');
    
    // Shake animation for wicket
    board.classList.add('shake-animation');
    setTimeout(() => board.classList.remove('shake-animation'), 400);

    if (currentInnings === 1) {
        currentInnings = 2;
        
        if (isPlayerBatting) {
            targetScore = playerScore + 1;
            isPlayerBatting = false; 
            let crr = ((playerScore / playerBalls) * 6).toFixed(1);
            commentary.innerHTML = `<span style="color: #ff2a2a; font-weight:bold;">HOWZAT! YOU ARE OUT!</span><br>You scored ${playerScore} off ${playerBalls} balls (SR: ${crr}). Computer needs ${targetScore} to win.`;
            speak(`Out! You are bowled! The computer needs ${targetScore} runs to win.`);
        } else {
            targetScore = computerScore + 1;
            isPlayerBatting = true; 
            let crr = ((computerScore / computerBalls) * 6).toFixed(1);
            commentary.innerHTML = `<span style="color: var(--accent-neon); font-weight:bold;">BOWLED HIM!</span><br>Computer scored ${computerScore} off ${computerBalls} balls (SR: ${crr}). You need ${targetScore} to win.`;
            speak(`Got him! The computer is out. You need ${targetScore} runs to win.`);
        }
        
        document.getElementById('target-box').style.display = 'block';
        document.getElementById('target-score').innerText = targetScore;
        updateInningsUI();

    } else {
        // End of 2nd Innings -> Check for TIE first
        if ((isPlayerBatting && playerScore === targetScore - 1) || (!isPlayerBatting && computerScore === targetScore - 1)) {
            endGame("tie", "tie");
        } 
        else if (isPlayerBatting) {
            endGame(false, "defended"); // Player got out while chasing
        } 
        else {
            endGame(true, "defended"); // Computer got out while chasing
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
        commentary.innerHTML = `<span style="color: #ff9900; font-size: 1.8rem; font-weight:900;">🤝 IT'S A TIE! 🤝</span><br>Unbelievable scenes! Scores are exactly level.`;
        speak("Unbelievable scenes! The match ends in a thrilling tie!");
    }
    else if (playerWins) {
        let msg = winType === "chased" ? `You chased down the target in ${playerBalls} balls!` : `You bowled the computer out and defended the total!`;
        commentary.innerHTML = `<span style="color: var(--accent-neon); font-size: 1.8rem; font-weight:900;">🏆 YOU WIN! 🏆</span><br>${msg}`;
        speak("What an incredible victory! You have won the match!");
    } 
    else {
        let msg = winType === "chased" ? `Computer chased down the target in ${computerBalls} balls.` : `You were bowled out! The computer successfully defended the total.`;
        commentary.innerHTML = `<span style="color: #ff2a2a; font-size: 1.8rem; font-weight:900;">❌ YOU LOSE! ❌</span><br>${msg}`;
        speak("Game over. The computer wins the match.");
    }
}

function resetToToss() {
    playerScore = 0;
    computerScore = 0;
    playerBalls = 0;
    computerBalls = 0;
    targetScore = null;
    currentInnings = 1;
    isGameOver = false;
    playerTossChoice = '';

    document.getElementById('match-screen').style.display = 'none';
    document.getElementById('toss-screen').style.display = 'block';
    
    document.getElementById('toss-step-1').style.display = 'block';
    document.getElementById('toss-step-2').style.display = 'none';
    document.getElementById('toss-result-screen').style.display = 'none';
    document.getElementById('player-decision-box').style.display = 'none';
    
    const compBox = document.getElementById('computer-decision-box');
    compBox.style.display = 'none';
    if(compBox.children.length > 1) {
        compBox.removeChild(compBox.firstChild); 
    }

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
        utterance.rate = 1.1; 
        utterance.pitch = 1.2; 
        window.speechSynthesis.speak(utterance);
    }
}
