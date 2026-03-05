// script.js

// Real T20 World Cup 2026 Match Data (March 2026)
let matches = [
    { 
        id: 1, 
        status: "UPCOMING • T20 World Cup SF 2", 
        team1: "IND", score1: "Yet to bat", overs1: "", 
        team2: "ENG", score2: "Yet to bat", overs2: "", 
        note: "Starts today at 7:00 PM IST" 
    },
    { 
        id: 2, 
        status: "RESULT • T20 World Cup SF 1", 
        team1: "SA", score1: "169/8", overs1: "(20.0)", 
        team2: "NZ", score2: "173/1", overs2: "(12.5)", 
        note: "NZ won by 9 wickets (Finn Allen 100*)" 
    },
    { 
        id: 3, 
        status: "RESULT • T20 World Cup Super 8", 
        team1: "WI", score1: "195/4", overs1: "(20.0)", 
        team2: "IND", score2: "199/5", overs2: "(19.2)", 
        note: "IND won by 5 wickets" 
    },
    { 
        id: 4, 
        status: "RESULT • T20 World Cup Super 8", 
        team1: "ZIM", score1: "153/7", overs1: "(20.0)", 
        team2: "SA", score2: "154/5", overs2: "(17.5)", 
        note: "SA won by 5 wickets" 
    },
    { 
        id: 5, 
        status: "RESULT • T20 World Cup Super 8", 
        team1: "SL", score1: "207/6", overs1: "(20.0)", 
        team2: "PAK", score2: "212/8", overs2: "(20.0)", 
        note: "PAK won by 5 runs" 
    },
    { 
        id: 6, 
        status: "RESULT • T20 World Cup Super 8", 
        team1: "NZ", score1: "159/7", overs1: "(20.0)", 
        team2: "ENG", score2: "161/6", overs2: "(19.3)", 
        note: "ENG won by 4 wickets" 
    }
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
            <div style="font-size: 0.8rem; margin-top: 5px; color: #aaa;">${match.note}</div>
        `;
        tickerContainer.appendChild(card);
    });
}

// Run this function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    renderTicker();
});
