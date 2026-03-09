document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LIVE MATCH TICKER LOGIC
    // ==========================================
    const liveMatches = [
        {
            status: "RESULT • T20 World Cup Final",
            team1: "IND", score1: "255/5", overs1: "(20.0)",
            team2: "NZ", score2: "159/10", overs2: "(19.0)",
            result: "IND won by 96 runs",
            color: "var(--accent-neon)"
        },
        {
            status: "RESULT • T20 World Cup SF 2",
            team1: "IND", score1: "253/7", overs1: "(20.0)",
            team2: "ENG", score2: "246/7", overs2: "(20.0)",
            result: "IND won by 7 runs",
            color: "var(--accent-blue)"
        },
        {
            status: "RESULT • Women's Only Test",
            team1: "IND-W", score1: "198 & 149", overs1: "",
            team2: "AUS-W", score2: "323 & 28/0", overs2: "",
            result: "AUS-W won by 10 wickets",
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
    // 2. MASTER NEWS DATABASE (15 ARTICLES)
    // ==========================================
    const newsDatabase = [
        // --- TODAY'S TOP 5 NEWS (MARCH 9, 2026) ---
        {
            id: 1, tag: "🔴 BREAKING", date: "March 9, 2026",
            title: "Virat Kohli's Emotional Post After India Lift T20 World Cup", 
            img: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_50/lsci/db/PICTURES/CMS/347800/347881.4.jpg",
            desc: "Virat Kohli hailed India's national cricket team after their dominant 96-run triumph over New Zealand in the ICC Men's T20 World Cup final.",
            body: `<p>The internet went into a complete meltdown early Monday morning as Virat Kohli posted a deeply emotional tribute to the Indian Cricket Team. Following their historic 96-run victory over New Zealand, Kohli praised the resilience and aggression of the squad.</p><p>"This team has redefined what it means to play fearless cricket," Kohli wrote. The post has already broken social media engagement records, signifying the massive cultural impact of this World Cup victory on home soil.</p>`
        },
        {
            id: 2, tag: "🔥 SPOTLIGHT", date: "March 9, 2026",
            title: "Jasprit Bumrah Finishes T20 World Cup as Joint-Highest Wicket Taker", 
            img: "https://content.api.news/v3/images/bin/82340bdf69ceba068032c8f2d76f52e0",
            desc: "The talismanic bowler returned career-best T20I figures of 4/15 in the final, taking his tournament tally to 14 wickets.",
            body: `<p>Jasprit Bumrah proved once again why he is a generational talent. In a high-scoring tournament on flat pitches, Bumrah maintained a stunning economy rate of 5.66. His 4/15 in the final completely derailed the Kiwi chase.</p><p>Bumrah's performance allowed him to finish joint-top of the bowling charts alongside Varun Chakaravarthy, cementing his status as the premier fast bowler in world cricket today.</p>`
        },
        {
            id: 3, tag: "🏏 WPL 2026", date: "March 9, 2026",
            title: "WPL: Mumbai Indians Secure Playoff Berth with Thrilling Last-Ball Win", 
            img: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_50/lsci/db/PICTURES/CMS/356300/356372.jpg",
            desc: "Harmanpreet Kaur's explosive 65* guided the Mumbai Indians to a dramatic victory over the Delhi Capitals in a top-of-the-table WPL clash.",
            body: `<p>Women's Premier League action reached a fever pitch today as the Mumbai Indians snatched a victory from the jaws of defeat. Chasing 178 against a formidable Delhi Capitals attack, MI needed 14 off the final over.</p><p>Captain Harmanpreet Kaur took matters into her own hands, striking two massive sixes to punch MI's ticket directly to the playoffs, setting the stage for a spectacular WPL endgame.</p>`
        },
        {
            id: 4, tag: "💰 AUCTION", date: "March 9, 2026",
            title: "Mega Auction Fever: Franchises Prepare Record Bids for Travis Head", 
            img: "https://img.etimg.com/thumb/width-1200,height-900,imgsize-60568,resizemode-75,msid-125950172/news/sports/ipl-2026-auction-what-the-ten-teams-have-and-who-theyll-be-desperate-to-get.jpg",
            desc: "With the upcoming IPL 2026 mega auction, insiders report that at least three franchises are preparing 30+ crore bids for the Australian opener.",
            body: `<p>The upcoming IPL Mega Auction is already sending shockwaves through the franchise cricket landscape. With teams only allowed a maximum of four retentions, several marquee players are set to hit the open market.</p><p>According to today's insider leaks, Australian powerhouse Travis Head is expected to shatter all previous auction records, with multiple franchises expanding their purses specifically to secure his explosive top-order services.</p>`
        },
        {
            id: 5, tag: "⚖️ ICC RULES", date: "March 9, 2026",
            title: "ICC Announces Strict New Over-Rate Penalties Starting Next Month", 
            img: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_50/lsci/db/PICTURES/CMS/292800/292866.jpg",
            desc: "In a bid to speed up the game, the ICC has announced that fielding teams will lose a player for the final two overs if they fail to meet the time limit.",
            body: `<p>The International Cricket Council released a stunning mandate this morning. Starting April 1st, 2026, any team that falls behind the allotted over-rate time will be forced to play with only 10 men on the field for the remainder of the innings.</p><p>This drastic rule change comes after numerous complaints from broadcasters regarding matches extending well beyond their scheduled programming windows.</p>`
        },

        // --- WORLD CUP EXCLUSIVES (OLDER DATES) ---
        {
            id: 6, tag: "⭐ INTERVIEW", date: "March 8, 2026",
            title: "Sanju Samson Credits Sachin's Guidance for World Cup Success", 
            img: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_50/lsci/db/PICTURES/CMS/128400/128483.jpg",
            desc: "Player of the Tournament Sanju Samson reveals how constant conversations with Sachin Tendulkar helped him stay focused.",
            body: `<p>Scoring 321 runs across the tournament, including a brilliant 89 in the final, Sanju Samson was the undisputed star of India's batting lineup. Following the victory, Samson opened up about his mental preparation.</p><p>"My career felt like it was on the line a few years ago," Samson admitted. "But constant conversations with Sachin Sir gave me the clarity I needed. It was God's plan."</p>`
        },
        {
            id: 7, tag: "🏏 WOMEN'S TESTS", date: "March 8, 2026",
            title: "Australia Women Cruise to 10-Wicket Test Win Over India", 
            img: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_50/lsci/db/PICTURES/CMS/373900/373934.jpg",
            desc: "In the one-off Test, Australia's women's team delivered a dominant all-round performance to defeat India.",
            body: `<p>Australia's Women showed exactly why they are the undisputed queens of the longest format. Despite a valiant first-innings 75 from Smriti Mandhana, India was bundled out for 198 and 149 in their two innings.</p><p>Ellyse Perry's brilliant century setup the game for the visitors, and their spinners made light work of the Indian middle order on a turning pitch, chasing down the target with ease.</p>`
        },
        {
            id: 8, tag: "🧠 COACH'S CORNER", date: "March 7, 2026",
            title: "‘Stop celebrating milestones. Celebrate trophies’: Gautam Gambhir", 
            img: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_50/lsci/db/PICTURES/CMS/382000/382046.jpg",
            desc: "India head coach Gautam Gambhir sets the tone for the team's ruthless new philosophy.",
            body: `<p>Gautam Gambhir has transformed the culture of the Indian dressing room. Speaking to the media, he was crystal clear: "We have celebrated personal milestones a lot in the past. Milestones don't matter — trophies do."</p><p>Under Gambhir's tenure, India has secured three consecutive ICC white-ball trophies, proving his aggressive and team-first philosophy is yielding historic results.</p>`
        },
        {
            id: 9, tag: "🗣️ CRITICISM", date: "March 7, 2026",
            title: "Mohammad Amir Tears Into Mitchell Santner for Gifting Final", 
            img: "https://assets-in.bmscdn.com/discovery-catalog/events/et00490363-bnbpphzmer-landscape.jpg",
            desc: "Former Pakistan pacer Mohammad Amir lambasted New Zealand's captain for poor strategic choices.",
            body: `<p>Speaking on a post-match show, Mohammad Amir did not hold back his criticism of the Black Caps. "I have never seen New Zealand under such pressure," Amir stated.</p><p>He specifically targeted Santner's decision to drop spinner Cole McConchie and avoid bowling Glenn Phillips in the powerplay, allowing the Indian openers to race away with the game.</p>`
        },
        {
            id: 10, tag: "🏅 FUTURE PLANS", date: "March 6, 2026",
            title: "Suryakumar Yadav Sets Sights on LA 2028 Olympics Gold", 
            img: "https://img1.hscicdn.com/image/upload/f_auto,t_ds_w_1200,q_50/lsci/db/PICTURES/CMS/347800/347881.4.jpg",
            desc: "With back-to-back T20 World Cups secured, the Indian captain is already looking ahead to cricket's Olympic return.",
            body: `<p>Winning a World Cup at home might feel like the perfect time to step away, but Suryakumar Yadav is hungry for more. "Next goal is Olympics gold," SKY announced during the press conference.</p><p>With cricket returning to the Olympics in 2028 after a 128-year absence, securing a gold medal for India has become the ultimate new frontier for this dominant squad.</p>`
        },

        // --- DEEP DIVES & EDITOR'S PICKS ---
        {
            id: 11, tag: "📈 EVOLUTION", date: "March 5, 2026",
            title: "The 500-Run Frontier: Is the Ultimate ODI Record About to Fall?", 
            img: "https://www.cricindeed.com/wp-content/uploads/2026/02/fastest-400-in-odi-1024x566.jpg",
            desc: "With batting strike rates skyrocketing, experts believe the mythical 500-run mark is finally within reach.",
            body: `<p>For decades, scoring 400 runs in a One Day International was considered the absolute pinnacle of batting achievement. However, as we move through 2026, the landscape of 50-over cricket has been completely altered.</p><p>Data shows a massive shift in templates, with nations now treating the first ten overs like a T20 powerplay. Pundits agree that a perfect storm of conditions will soon lead an elite lineup to shatter the 500-run ceiling.</p>`
        },
        {
            id: 12, tag: "⚡ TACTICS", date: "March 4, 2026",
            title: "Decoding Finn Allen: The Anatomy of a 33-Ball Century", 
            img: "https://static.wixstatic.com/media/8d5194_f7c33e229d1a46f5842cc65500f6a163~mv2.png/v1/fill/w_666,h_372,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/8d5194_f7c33e229d1a46f5842cc65500f6a163~mv2.png",
            desc: "How the explosive Kiwi opener dismantled the South African attack and rewrote history earlier this month.",
            body: `<p>Striking the fastest century in T20 World Cup history in just 33 balls, Allen didn't just beat South Africa; he broke their tactical spirit. His innings was a masterclass in aggressive intent.</p><p>Data analysts noted that Allen completely ignored traditional footwork, instead creating a massive base in the crease to target the arc between long-on and deep mid-wicket. By staying deep, he turned express pace into batting practice.</p>`
        },
        {
            id: 13, tag: "📉 TEAM ANALYSIS", date: "March 3, 2026",
            title: "Pakistan's Transition Phase: Rebuilding the Men in Green", 
            img: "https://wallpapers.com/images/hd/pakistan-cricket-team-huddle-n0agyv3wqh2gh0ek.jpg",
            desc: "A deep dive into the structural changes needed for Pakistan to bounce back from recent tournament exits.",
            body: `<p>Following early exits in global tournaments, the PCB has initiated a massive overhaul of both the playing squad and the domestic structure. The primary issue highlighted has been a stagnation in batting intent.</p><p>The new coaching staff has publicly demanded a shift toward ultra-aggressive powerplay tactics. Rebuilding the "Men in Green" will require patience, but the raw talent in the region remains undeniable.</p>`
        },
        {
            id: 14, tag: "⭐ MASTERCLASS", date: "March 2, 2026",
            title: "Jasprit Bumrah's Mechanics: A Scientific Analysis", 
            img: "https://content.api.news/v3/images/bin/82340bdf69ceba068032c8f2d76f52e0",
            desc: "Breaking down the mechanics behind the most feared delivery in modern men's cricket.",
            body: `<p>There is fast bowling, and then there is Jasprit Bumrah. Biomechanists and cricket coaches alike have spent years analyzing his hyper-extended elbow and stuttering run-up.</p><p>Recent analysis reveals that Bumrah's release point is significantly further ahead of the popping crease. This late release creates an optical illusion for the batter, making the ball appear significantly faster than the radar gun suggests.</p>`
        },
        {
            id: 15, tag: "🚀 RISING STAR", date: "March 1, 2026",
            title: "Yashasvi Jaiswal: The Ultimate All-Format Juggernaut", 
            img: "https://images.news18.com/ibnlive/uploads/2025/08/Yashasvi-Jaiswal-smashes-his-6th-Test-hundred-2025-08-b1ef92d59ff08feb052209e499cca81e.jpg",
            desc: "From playing in the maidans to dismantling international attacks, Jaiswal's incredible rise continues.",
            body: `<p>Beyond the inspirational backstory lies a technically brilliant, ruthlessly aggressive batter taking all three formats by storm. Jaiswal possesses a rare ability to seamlessly transition gears.</p><p>In Test cricket, he has shown the patience to bat for hours, while in T20s, he routinely destroys bowling plans within the powerplay. Indian management views him as the definitive all-format successor to the previous generation.</p>`
        }
    ];

    // ==========================================
    // 3. RENDER HOMEPAGE TOP 5 NEWS
    // ==========================================
    const topNewsContainer = document.getElementById('top-news-container');
    if (topNewsContainer) {
        let topNewsHTML = '';
        // Slice the array to only show the first 5 (Today's) articles on the homepage
        newsDatabase.slice(0, 5).forEach(news => {
            topNewsHTML += `
                <article class="ultra-news-card" onclick="window.location.href='news.html'">
                    <div class="ultra-news-img-placeholder">
                        <img src="${news.img}" alt="${news.title}" class="ultra-news-img">
                    </div>
                    <div class="ultra-news-content">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <span class="ultra-news-tag">${news.tag}</span>
                            <span style="color: var(--accent-blue); font-size: 0.8rem; font-weight: bold;">📅 ${news.date}</span>
                        </div>
                        <h3 class="ultra-news-title" style="margin-top: 10px;">${news.title}</h3>
                        <p>${news.desc}</p>
                        <span class="ultra-read-more">Read Full Article ➔</span>
                    </div>
                </article>
            `;
        });
        topNewsContainer.innerHTML = topNewsHTML;
    }

    // ==========================================
    // 4. RENDER FULL NEWS PAGE (WITH SECTIONS)
    // ==========================================
    const fullNewsContainer = document.getElementById('news-container');
    
    if (fullNewsContainer) {
        fullNewsContainer.className = ""; // Remove default grid to stack sections properly
        let fullNewsHTML = '';
        
        // We structure the 15 articles into 3 distinct sections
        const sections = [
            { title: "🔴 Today's Top Headlines", items: newsDatabase.slice(0, 5) },
            { title: "🏆 World Cup Exclusives", items: newsDatabase.slice(5, 10) },
            { title: "📰 Deep Dives & Editor's Picks", items: newsDatabase.slice(10, 15) }
        ];

        sections.forEach(section => {
            fullNewsHTML += `
                <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; margin-top: 50px;">
                    <h2 style="font-size: 2rem; color: var(--text-bright); text-transform: uppercase; letter-spacing: 1px;">${section.title}</h2>
                </div>
                <div class="ultra-news-grid">
            `;
            
            section.items.forEach(news => {
                fullNewsHTML += `
                    <article class="ultra-news-card" data-id="${news.id}">
                        <div class="ultra-news-img-placeholder">
                            <img src="${news.img}" alt="${news.title}" class="ultra-news-img">
                        </div>
                        <div class="ultra-news-content">
                            <div style="display:flex; justify-content:space-between; align-items:center;">
                                <span class="ultra-news-tag">${news.tag}</span>
                                <span style="color: var(--accent-blue); font-size: 0.8rem; font-weight: bold;">📅 ${news.date}</span>
                            </div>
                            <h3 class="ultra-news-title" style="margin-top: 10px;">${news.title}</h3>
                            <p>${news.desc}</p>
                            <span class="ultra-read-more">Read Article ➔</span>
                        </div>
                    </article>
                `;
            });
            fullNewsHTML += `</div>`;
        });

        fullNewsContainer.innerHTML = fullNewsHTML;

        // Add Click Listeners to open the Modal
        document.querySelectorAll('.ultra-news-card').forEach(card => {
            card.addEventListener('click', function() {
                const articleId = parseInt(this.getAttribute('data-id'));
                openUltraModal(articleId);
            });
        });
    }

    // ==========================================
    // 5. MODAL LOGIC (POPUP WINDOW)
    // ==========================================
    const modal = document.getElementById('ultra-modal');
    const closeBtn = document.getElementById('close-modal-btn');

    function openUltraModal(id) {
        const article = newsDatabase.find(item => item.id === id);
        if(article && modal) {
            document.getElementById('ultra-modal-tag').innerText = article.tag;
            document.getElementById('ultra-modal-title').innerText = article.title;
            document.getElementById('ultra-modal-img').src = article.img;
            document.getElementById('ultra-modal-body').innerHTML = article.body;
            
            modal.style.display = 'flex';
            setTimeout(() => { modal.classList.add('show-modal'); }, 10);
            document.body.style.overflow = 'hidden'; 
        }
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeUltraModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeUltraModal();
        }
    });

    function closeUltraModal() {
        if (modal) {
            modal.classList.remove('show-modal');
            setTimeout(() => { modal.style.display = 'none'; }, 300);
            document.body.style.overflow = 'auto'; 
        }
    }
});
