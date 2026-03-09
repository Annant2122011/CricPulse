document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. LIVE MATCH TICKER LOGIC
    // ==========================================
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

    // ==========================================
    // 2. AUTOMATIC LIVE NEWS FETCHER
    // ==========================================
    
    // Fallback data just in case the API limit is reached or internet is down
    const fallbackNews = [
        {
            title: "Virat Kohli's Emotional Post After India Lift World Cup", 
            image: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_50/lsci/db/PICTURES/CMS/347800/347881.4.jpg",
            description: "Virat Kohli hailed India's national cricket team after their dominant triumph in the final...",
            url: "#"
        },
        {
            title: "Jasprit Bumrah Finishes as Joint-Highest Wicket Taker", 
            image: "https://content.api.news/v3/images/bin/82340bdf69ceba068032c8f2d76f52e0",
            description: "Team India fast bowler Jasprit Bumrah boasts an incredible 5.66 economy rate as he shares the top spot...",
            url: "#"
        },
        {
            title: "Sanju Samson Credits Sachin Tendulkar's Guidance", 
            image: "https://static.wixstatic.com/media/8d5194_f7c33e229d1a46f5842cc65500f6a163~mv2.png/v1/fill/w_666,h_372,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/8d5194_f7c33e229d1a46f5842cc65500f6a163~mv2.png",
            description: "After an incredible tournament, Sanju Samson reveals how constant conversations with Sachin helped...",
            url: "#"
        }
    ];

    const topNewsContainer = document.getElementById('top-news-container'); // Homepage
    const fullNewsContainer = document.getElementById('news-container'); // News Page

    // The function that automatically pulls live data from the internet
    async function fetchLiveCricketNews() {
        // NOTE: To make this live, you need a free API key from gnews.io
        // Replace 'DEMO_KEY' with your actual free key when you get one.
        const apiKey = 'DEMO_KEY'; 
        const url = `https://gnews.io/api/v4/search?q=cricket&lang=en&max=6&apikey=${apiKey}`;

        try {
            // Only try to fetch if we aren't using the demo key
            if (apiKey === 'e915a3b619adba4828ef97e47cb4df96') throw new Error("Need real API key");

            const response = await fetch(url);
            const data = await response.json();

            if (data.articles && data.articles.length > 0) {
                renderNewsCards(data.articles);
            } else {
                renderNewsCards(fallbackNews); // Fallback if API returns empty
            }
        } catch (error) {
            console.log("Using Premium Fallback News (Live API requires a free key).");
            renderNewsCards(fallbackNews);
        }
    }

    // Function to draw the HTML onto the page
    function renderNewsCards(articles) {
        let newsHTML = '';
        
        // Loop through the articles and build the glassmorphism cards
        articles.forEach(article => {
            // Clean up the data from the API
            const imageUrl = article.image || article.urlToImage || "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop";
            const title = article.title;
            const desc = article.description || article.content || "Click to read the full story...";
            const link = article.url || "#";

            newsHTML += `
                <article class="ultra-news-card" onclick="window.open('${link}', '_blank')">
                    <div class="ultra-news-img-placeholder">
                        <img src="${imageUrl}" alt="${title}" class="ultra-news-img">
                    </div>
                    <div class="ultra-news-content">
                        <span class="ultra-news-tag">⚡ LIVE UPDATE</span>
                        <h3 class="ultra-news-title">${title}</h3>
                        <p>${desc.substring(0, 100)}...</p>
                        <span class="ultra-read-more">Read Full Article ➔</span>
                    </div>
                </article>
            `;
        });

        // Inject the cards into whichever page the user is currently looking at
        if (topNewsContainer) topNewsContainer.innerHTML = newsHTML;
        if (fullNewsContainer) fullNewsContainer.innerHTML = newsHTML;
    }

    // Fire the engine!
    if (topNewsContainer || fullNewsContainer) {
        fetchLiveCricketNews();
    }
});
