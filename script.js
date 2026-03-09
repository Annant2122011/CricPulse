document.addEventListener("DOMContentLoaded", () => {
    // 1. Live Match Ticker Data
    const liveMatches = [
        {
            status: "RESULT • T20 World Cup SF 2",
            team1: "IND", score1: "253/7", overs1: "(20.0)",
            team2: "ENG", score2: "246/8", overs2: "(20.0)",
            result: "IND won by 7 runs",
            color: "var(--accent-neon)"
        },
        {
            status: "RESULT • T20 World Cup SF 1",
            team1: "SA", score1: "169/8", overs1: "(20.0)",
            team2: "NZ", score2: "173/1", overs2: "(12.5)",
            result: "NZ won by 9 wickets",
            color: "var(--accent-blue)"
        },
        {
            status: "RESULT • T20 World Cup Super 8",
            team1: "ZIM", score1: "153/7", overs1: "(20.0)",
            team2: "SA", score2: "154/5", overs2: "(17.5)",
            result: "SA won by 5 wickets",
            color: "#ff9900"
        }
    ];

    const tickerContainer = document.getElementById('match-ticker');
    
    if (tickerContainer) {
        let tickerHTML = '';
        liveMatches.forEach(match => {
            tickerHTML += `
                <div class="match-card-ticker">
                    <p class="match-status-text" style="color: ${match.color};">${match.status}</p>
                    <div class="match-team-row">
                        <span class="team-name">${match.team1}</span> 
                        <span class="team-score-span">${match.score1} <span class="overs-span">${match.overs1}</span></span>
                    </div>
                    <div class="match-team-row">
                        <span class="team-name">${match.team2}</span> 
                        <span class="team-score-span">${match.score2} <span class="overs-span">${match.overs2}</span></span>
                    </div>
                    <p class="match-result-text">${match.result}</p>
                </div>
            `;
        });
        tickerContainer.innerHTML = tickerHTML;
    }

    // 2. Top 5 News Articles Data
    const topNews = [
        {
            id: 1, tag: "🏆 WORLD CUP", title: "The Grand Finale: India and New Zealand Prepare for Ultimate Glory", 
            img: "https://assets-in.bmscdn.com/discovery-catalog/events/et00490363-bnbpphzmer-landscape.jpg",
            desc: "The 2026 Men's T20 World Cup reaches its climax as two titans collide in Ahmedabad...",
        },
        {
            id: 2, tag: "🔥 SPOTLIGHT", title: "Decoding Finn Allen: The Anatomy of a 33-Ball Century", 
            img: "https://static.wixstatic.com/media/8d5194_f7c33e229d1a46f5842cc65500f6a163~mv2.png/v1/fill/w_666,h_372,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/8d5194_f7c33e229d1a46f5842cc65500f6a163~mv2.png",
            desc: "How the explosive Kiwi opener dismantled the South African attack and rewrote history...",
        },
        {
            id: 3, tag: "📈 EVOLUTION", title: "The 500-Run Frontier: Is the Ultimate ODI Record About to Fall?", 
            img: "https://www.cricindeed.com/wp-content/uploads/2026/02/fastest-400-in-odi-1024x566.jpg",
            desc: "With batting strike rates skyrocketing, experts believe the mythical 500-run mark is finally within reach...",
        },
        {
            id: 4, tag: "⭐ MASTERCLASS", title: "Jasprit Bumrah's Mechanics: A Scientific Analysis", 
            img: "https://content.api.news/v3/images/bin/82340bdf69ceba068032c8f2d76f52e0",
            desc: "Breaking down the mechanics behind the most feared delivery in modern men's cricket...",
        },
        {
            id: 5, tag: "💰 AUCTION", title: "IPL 2026 Mega Auction Rumors: Superstars Changing Colors", 
            img: "https://img.etimg.com/thumb/width-1200,height-900,imgsize-60568,resizemode-75,msid-125950172/news/sports/ipl-2026-auction-what-the-ten-teams-have-and-who-theyll-be-desperate-to-get.jpg",
            desc: "Franchises are gearing up for the biggest auction in years. Who goes where?...",
        }
    ];

    const newsContainer = document.getElementById('top-news-container');
    
    if (newsContainer) {
        let newsHTML = '';
        topNews.forEach(news => {
            newsHTML += `
                <article class="ultra-news-card" onclick="window.location.href='news.html'">
                    <div class="ultra-news-img-placeholder">
                        <img src="${news.img}" alt="${news.title}" class="ultra-news-img">
                    </div>
                    <div class="ultra-news-content">
                        <span class="ultra-news-tag">${news.tag}</span>
                        <h3 class="ultra-news-title">${news.title}</h3>
                        <p>${news.desc}</p>
                        <span class="ultra-read-more">Read Full Article ➔</span>
                    </div>
                </article>
            `;
        });
        newsContainer.innerHTML = newsHTML;
    }
});
