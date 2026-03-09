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

    // 2. Top 5 Real-World News Articles
    const topNews = [
        {
            id: 1, tag: "🏆 CHAMPIONS", title: "Virat Kohli's Emotional Post After India Lift T20 World Cup", 
            img: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_50/lsci/db/PICTURES/CMS/347800/347881.4.jpg",
            desc: "Virat Kohli hailed India's national cricket team after their dominant 96-run triumph over New Zealand in the ICC Men's T20 World Cup final...",
        },
        {
            id: 2, tag: "🔥 SPOTLIGHT", title: "Jasprit Bumrah Finishes T20 World Cup 2026 as Joint-Highest Wicket Taker", 
            img: "https://content.api.news/v3/images/bin/82340bdf69ceba068032c8f2d76f52e0",
            desc: "Team India fast bowler Jasprit Bumrah boasts an incredible 5.66 economy rate as he shares the top wicket-taker spot with Varun Chakaravarthy...",
        },
        {
            id: 3, tag: "⭐ MASTERCLASS", title: "Sanju Samson Credits Sachin Tendulkar's Guidance for T20 World Cup Success", 
            img: "https://static.wixstatic.com/media/8d5194_f7c33e229d1a46f5842cc65500f6a163~mv2.png/v1/fill/w_666,h_372,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/8d5194_f7c33e229d1a46f5842cc65500f6a163~mv2.png",
            desc: "After an incredible tournament, Player of the Tournament Sanju Samson reveals how constant conversations with Sachin Tendulkar helped him stay focused...",
        },
        {
            id: 4, tag: "🏏 AUS-W VS IND-W", title: "Australia Women Cruise to 10-Wicket Test Win Over India", 
            img: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_50/lsci/db/PICTURES/CMS/128400/128483.jpg",
            desc: "In the one-off Test at Mullanpur, Australia's women's team delivered a dominant performance to defeat India by 10 wickets...",
        },
        {
            id: 5, tag: "📉 TEAM ANALYSIS", title: "New Zealand Lost T20 World Cup Final Even Before It Began: The Tactical Blunder", 
            img: "https://assets-in.bmscdn.com/discovery-catalog/events/et00490363-bnbpphzmer-landscape.jpg",
            desc: "Experts analyze how skipper Mitchell Santner's controversial team selection and decision to drop Cole McConchie cost the Kiwis the final...",
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
