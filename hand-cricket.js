// Game State Variables
let playerScore = 0;
let computerScore = 0;
let targetScore = null;
let isPlayerBatting = true; // Player always bats first in this version
let isGameOver = false;

// Hand Emojis map to make it visual
const handEmojis = {
    1: "☝️", 
    2: "✌️", 
    3: "🤟", 
    4: "🖐️", // 4 fingers (close enough)
    5: "🖐️", 
    6: "👍"  // Thumbs up for 6
};

function playHand(playerNum) {
    if (isGameOver) return;

    // Generate Computer Number (1 to 6)
    const computerNum = Math.floor(Math.random() * 6) + 1;

    // Update UI visuals
    const playerIcon = document.getElementById('player-hand');
    const computerIcon = document.getElementById('computer-hand');
    
    playerIcon.innerText = handEmojis[playerNum];
    computerIcon.innerText = handEmojis[computerNum];

    // Add a quick "bump" animation
    playerIcon.style.transform = "scale(1.2)";
    computerIcon.style.transform = "scale(1.2)";
    setTimeout(() => {
        playerIcon.style.transform = "scale(1)";
        computerIcon.style.transform = "scale(1)";
    }, 150);

    // Game Logic
    if (playerNum === computerNum) {
        handleWicket();
    } else {
        handleRuns(playerNum, computerNum);
    }
}

function handleRuns(playerNum, computerNum) {
    const commentary = document.getElementById('hand-commentary');

    if (isPlayerBatting) {
        playerScore += playerNum;
        document.getElementById('player-hand-score').innerText = playerScore;
        
        if (playerNum === 6 || playerNum === 4) {
            commentary.innerHTML = `What a shot! You smashed a <b>${playerNum}</b>!`;
            speak(`Great shot, ${playerNum} runs!`);
        } else {
            commentary.innerHTML = `You pick up <b>${playerNum}</b> runs. Good rotation.`;
        }

    } else {
        // Computer is batting
        computerScore += computerNum;
        document.getElementById('computer-hand-score').innerText = computerScore;
        
        if (computerScore >= targetScore) {
            // Computer chased it down
            endGame(false);
            return;
        }

        if (computerNum === 6 || computerNum === 4) {
            commentary.innerHTML = `Watch out! The computer hits a massive <b>${computerNum}</b>!`;
            speak(`Computer hits ${computerNum}`);
        } else {
            commentary.innerHTML = `Computer nudges it for <b>${computerNum}</b> runs.`;
        }
    }
}

function handleWicket() {
    const commentary = document.getElementById('hand-commentary');
    const board = document.querySelector('.hand-cricket-board');
    
    // Shake the board for impact!
    board.classList.add('shake-animation');
    setTimeout(() => board.classList.remove('shake-animation'), 400);

    if (isPlayerBatting) {
        // Player is OUT, switch innings
        isPlayerBatting = false;
        targetScore = playerScore + 1;
        
        commentary.innerHTML = `<span style="color: #ff2a2a; font-weight:bold;">HOWZAT! YOU ARE OUT!</span><br>You scored ${playerScore}. Computer needs ${targetScore} to win.`;
        speak(`Out! You are bowled! The computer needs ${targetScore} runs to win.`);
        
        // Update UI for 2nd Innings
        document.getElementById('target-box').style.display = 'block';
        document.getElementById('target-score').innerText = targetScore;
        
        const badge = document.getElementById('innings-status');
        badge.innerText = "🏏 2ND INNINGS: DEFEND YOUR TARGET";
        badge.style.background = "#ff2a2a";
        badge.style.color = "#fff";

    } else {
        // Computer is OUT, Player wins!
        endGame(true);
    }
}

function endGame(playerWins) {
    isGameOver = true;
    const commentary = document.getElementById('hand-commentary');
    
    document.getElementById('hand-action-area').style.display = 'none';
    document.getElementById('hand-restart-btn').style.display = 'block';

    if (playerWins) {
        commentary.innerHTML = `<span style="color: var(--accent-neon); font-size: 1.8rem; font-weight:900;">🏆 YOU WIN! 🏆</span><br>You bowled the computer out for ${computerScore}!`;
        speak("What a victory! You have won the match!");
    } else {
        commentary.innerHTML = `<span style="color: #ff2a2a; font-size: 1.8rem; font-weight:900;">❌ YOU LOSE! ❌</span><br>The computer chased down the target!`;
        speak("Game over. The computer wins the match.");
    }
}

function resetHandGame() {
    playerScore = 0;
    computerScore = 0;
    targetScore = null;
    isPlayerBatting = true;
    isGameOver = false;

    // Reset UI
    document.getElementById('player-hand-score').innerText = "0";
    document.getElementById('computer-hand-score').innerText = "0";
    document.getElementById('target-box').style.display = 'none';
    
    document.getElementById('player-hand').innerText = "✊";
    document.getElementById('computer-hand').innerText = "✊";
    
    const badge = document.getElementById('innings-status');
    badge.innerText = "🏏 1ST INNINGS: YOU ARE BATTING";
    badge.style.background = "var(--accent-neon)";
    badge.style.color = "#000";

    document.getElementById('hand-commentary').innerHTML = "Step up to the pitch! Choose a number to hit your first run.";
    
    document.getElementById('hand-action-area').style.display = 'block';
    document.getElementById('hand-restart-btn').style.display = 'none';
}

// Voice Engine Function
function speak(text) {
    if ('speechSynthesis' in window) {
        // Cancel any currently playing speech so it doesn't overlap
        window.speechSynthesis.cancel(); 
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.1; // Slightly faster for energetic commentary
        utterance.pitch = 1.2; // Slightly higher pitch
        window.speechSynthesis.speak(utterance);
    }
}
