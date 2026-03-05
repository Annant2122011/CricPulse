// script.js

// 1. Ticker Match Data
// 1. Ticker Match Data
let matches = [
    // Upcoming match moved to the very first spot!
    { id: 1, status: "UPCOMING • T20 World Cup SF 2", team1: "IND", score1: "Yet to bat", overs1: "", team2: "ENG", score2: "Yet to bat", overs2: "", note: "Starts today at 7:00 PM IST" },
    
    // SF 1 Result
    { id: 2, status: "RESULT • T20 World Cup SF 1", team1: "SA", score1: "169/8", overs1: "(20.0)", team2: "NZ", score2: "173/1", overs2: "(12.5)", note: "NZ won by 9 wickets" },
    
    // Added an actual Super 8 blockbuster to replace the fake LIVE match
    { id: 3, status: "RESULT • T20 World Cup Super 8", team1: "IND", score1: "205/5", overs1: "(20.0)", team2: "AUS", score2: "181/7", overs2: "(20.0)", note: "IND won by 24 runs" },
    
    // WI vs IND Super 8 Result
    { id: 4, status: "RESULT • T20 World Cup Super 8", team1: "WI", score1: "195/4", overs1: "(20.0)", team2: "IND", score2: "199/5", overs2: "(19.2)", note: "IND won by 5 wickets" }
];

// 2. Points Table Data
let standings = [
    { team: "IND", played: 3, won: 3, lost: 0, nrr: "+1.500", pts: 6 },
    { team: "AUS", played: 3, won: 2, lost: 1, nrr: "+0.850", pts: 4 },
    { team: "AFG", played: 3, won: 1, lost: 2, nrr: "-0.400", pts: 2 },
    { team: "BAN", played: 3, won: 0, lost: 3, nrr: "-1.250", pts: 0 }
];

// 3. Full News Article Data for the Popup
const newsData = {
    1: {
        title: "Semi-Final Showdown: India & England Clash for Final Spot",
        // Updated to the India vs England vector image
        img: "https://img.freepik.com/premium-vector/india-vs-england-cricket-championship-match-with-flag-shield-beautiful-stadium-background_607751-1449.jpg",
        body: "<p>With a spot in the grand finale on the line, Rohit Sharma’s men face a formidable English side tonight in a high-stakes blockbuster. Will India avenge their 2022 exit?</p><p>The pitch is expected to be on the slower side, bringing India's world-class spinners heavily into the game. However, England's deep batting lineup, featuring explosive openers, is well-equipped to handle the turning ball.</p><p>Weather forecasts suggest a clear evening, meaning fans can expect a full, uninterrupted 20-over thriller under the lights.</p>"
    },
    2: {
        title: "Finn Allen's Masterclass Sinks South Africa in SF 1",
        // Updated to the Finn Allen century image
        img: "https://assets.hmtvlive.com/h-upload/2026/03/04/406895-finn-allen-century.jpg",
        body: "<p>A breathtaking 33-ball century from the explosive Kiwi opener dismantled the Proteas' bowling attack, comfortably securing New Zealand's ticket to the Final.</p><p>Chasing a modest total of 169, Allen showed absolutely no mercy to the South African pace battery, clearing the ropes 9 times in the first 10 overs alone. The match was practically over before the halfway mark of the chase.</p><p>New Zealand will now rest and wait to see who emerges victorious from the second semi-final between India and England.</p>"
    },
    3: {
        title: "The Rise of Spin: Pitch Factors Decoded for the Final",
        // Updated to the pitch and ball image
        img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
        body: "<p>As the tournament reaches its climax, spinners are playing an increasingly crucial role. We break down the pitch conditions expected for the ultimate championship match.</p><p>Throughout the Super 8s, fast bowlers have seen their economy rates spike, while wrist spinners have consistently choked the run flow in the middle overs. The surface for the Final is notoriously dry, meaning the toss could be the deciding factor.</p><p>Teams will likely look to bat first, post a par score of around 160, and let their slower bowlers do the rest as the pitch deteriorates.</p>"
    }
};

// --- Core Functions ---

function renderTicker() {
    const tickerContainer = document.getElementById('ticker-container');
    tickerContainer.innerHTML = ''; 

    matches.forEach(match => {
        const isLive = match.status.includes('LIVE');
        const liveIndicator = isLive ? '<span class="live-dot"></span>' : '';

        const card = document.createElement('div');
        card.className = 'match-card';
        card.innerHTML = `
            <div class="match-status">${liveIndicator}${match.status}</div>
            <div><strong>${match.team1}</strong> ${match.score1} <span style="font-size: 0.8rem; color: var(--text-dim);">${match.overs1}</span></div>
            <div><strong>${match.team2}</strong> ${match.score2} <span style="font-size: 0.8rem; color: var(--text-dim);">${match.overs2}</span></div>
            <div style="font-size: 0.8rem; margin-top: 8px; color: var(--text-dim); border-top: 1px solid rgba(255,255,255,0.1); padding-top: 5px;">${match.note}</div>
        `;
        tickerContainer.appendChild(card);
    });
}

function renderPointsTable() {
    const tableBody = document.getElementById('points-table-body');
    tableBody.innerHTML = ''; 

    standings.forEach((row, index) => {
        const tr = document.createElement('tr');
        const isTopTwo = index < 2 ? 'style="color: var(--accent-neon);"' : ''; 
        
        tr.innerHTML = `
            <td>${index + 1}</td>
            <td ${isTopTwo}><strong>${row.team}</strong></td>
            <td>${row.played}</td>
            <td>${row.won}</td>
            <td>${row.lost}</td>
            <td>${row.nrr}</td>
            <td ${isTopTwo}><strong>${row.pts}</strong></td>
        `;
        tableBody.appendChild(tr);
    });
}

// --- Modal Functions ---

function openModal(articleId) {
    const modal = document.getElementById('news-modal');
    
    // Inject the specific article data into the modal
    document.getElementById('modal-title').innerText = newsData[articleId].title;
    document.getElementById('modal-img').src = newsData[articleId].img;
    document.getElementById('modal-body').innerHTML = newsData[articleId].body;
    
    // Show the modal with animation
    modal.style.display = 'flex';
    setTimeout(() => { modal.classList.add('show'); }, 10);
}

function closeModal() {
    const modal = document.getElementById('news-modal');
    modal.classList.remove('show');
    // Wait for the fade out animation to finish before hiding
    setTimeout(() => { modal.style.display = 'none'; }, 300);
}

// Close the modal if the user clicks anywhere outside the box
window.onclick = function(event) {
    const modal = document.getElementById('news-modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    renderTicker();
    renderPointsTable();
});
