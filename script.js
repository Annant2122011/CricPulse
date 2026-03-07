// script.js

// 1. Ticker Match Data
// 1. Ticker Match Data
// 1. Ticker Match Data
let matches = [
    // UPDATED: IND vs ENG Semi-Final 2 Result!
    { id: 1, status: "RESULT • T20 World Cup SF 2", team1: "IND", score1: "253/7", overs1: "(20.0)", team2: "ENG", score2: "246/8", overs2: "(20.0)", note: "IND won by 7 runs" },
    
    // SF 1 Result
    { id: 2, status: "RESULT • T20 World Cup SF 1", team1: "SA", score1: "169/8", overs1: "(20.0)", team2: "NZ", score2: "173/1", overs2: "(12.5)", note: "NZ won by 9 wickets" },
    
    // SA vs ZIM Super 8 Result
    { id: 3, status: "RESULT • T20 World Cup Super 8", team1: "ZIM", score1: "153/7", overs1: "(20.0)", team2: "SA", score2: "154/5", overs2: "(17.5)", note: "SA won by 5 wickets" },
    
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
// 3. Full News Article Data for the Popup
const newsData = {
    1: {
        title: "Surya's Men Crush England to Seal 2026 World Cup Final Spot!",
        img: "https://img.freepik.com/premium-vector/india-vs-england-cricket-championship-match-with-flag-shield-beautiful-stadium-background_607751-1449.jpg",
        body: "<p>India has officially booked their ticket to the T20 World Cup 2026 Final! In a high-octane clash at the Wankhede Stadium, Suryakumar Yadav led from the front to dismantle a formidable English side.</p><p>India's spin trio of Axar Patel, Varun Chakaravarthy, and Washington Sundar choked the English batters in the middle overs, defending a par score of 185 with absolute precision. India will now face New Zealand in the ultimate championship match.</p>"
    },
    2: {
        title: "Unreal! Finn Allen's 33-Ball Blitzkrieg Demolishes South Africa",
        img: "https://assets.hmtvlive.com/h-upload/2026/03/04/406895-finn-allen-century.jpg",
        body: "<p>History was rewritten at Eden Gardens tonight. New Zealand opener Finn Allen smashed the fastest century in T20 World Cup history, bringing up his 100 in just 33 deliveries against South Africa.</p><p>The Proteas' pace battery, including Kagiso Rabada and Anrich Nortje, looked completely helpless as Allen cleared the ropes 11 times. New Zealand chased down the target of 169 in a jaw-dropping 12.5 overs to storm into the Final.</p>"
    },
   3: {
        title: "The Ultimate Showdown: India vs New Zealand for the Crown",
        img: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        body: "<p>The 2026 T20 World Cup has reached its magnificent conclusion. Suryakumar Yadav's undefeated Indian squad will lock horns with a fearless New Zealand side in front of 130,000 roaring fans in Ahmedabad.</p><p>India's lethal spin chokehold will face its ultimate test against the brute force of Finn Allen and Devon Conway. With the pitch expected to be a batting paradise, experts are predicting a massive high-scoring thriller. The toss will be crucial, but both teams look absolutely ready for war.</p>"
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
