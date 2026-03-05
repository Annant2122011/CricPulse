// script.js

// Dummy match data
let matches = [
    { id: 1, status: "LIVE • T20 World Cup", team1: "IND", score1: "185/4", overs1: "(20.0)", team2: "AUS", score2: "112/3", overs2: "(12.4)", note: "AUS need 74 runs in 44 balls" },
    { id: 2, status: "RESULT • Test Match", team1: "ENG", score1: "345 & 210", overs1: "", team2: "SA", score2: "290 & 266/8", overs2: "", note: "SA won by 2 wickets" },
    { id: 3, status: "LIVE • Domestic T20", team1: "CSK", score1: "45/0", overs1: "(4.2)", team2: "MI", score2: "Yet to bat", overs2: "", note: "CSK chose to bat" }
];

// Function to draw the ticker
function renderTicker() {
    const tickerContainer = document.getElementById('ticker-container');
    tickerContainer.innerHTML = ''; // Clear current content

    matches.forEach(match => {
        const card = document.createElement('div');
        card.className = 'match-card';
        card.innerHTML = `
            <div class="match-status">${match.status}</div>
            <div><strong>${match.team1}</strong> ${match.score1} <span style="font-size: 0.8rem">${match.overs1}</span></div>
            <div><strong>${match.team2}</strong> ${match.score2} <span style="font-size: 0.8rem">${match.overs2}</span></div>
            <div style="font-size: 0.8rem; margin-top: 5px;">${match.note}</div>
        `;
        tickerContainer.appendChild(card);
    });
}

// Function to simulate a live score update
function simulateLiveMatch() {
    // Let's pretend CSK hits a boundary in match ID 3
    const liveMatch = matches.find(m => m.id === 3);
    
    // Change score to 49/0 and overs to 4.3
    setTimeout(() => {
        liveMatch.score1 = "49/0";
        liveMatch.overs1 = "(4.3)";
        renderTicker(); // Re-draw the ticker with new info
    }, 5000); // Happens 5 seconds after page loads
}

// Run these functions when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderTicker();
    simulateLiveMatch();
});
