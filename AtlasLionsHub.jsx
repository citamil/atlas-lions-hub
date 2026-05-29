import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const PLAYERS = [
  { id:1, name:"Yassine Bounou", pos:"GK", club:"Al-Hilal", caps:52, goals:0, rating:8.4, img:"🧤" },
  { id:2, name:"Achraf Hakimi", pos:"RB", club:"PSG", caps:88, goals:13, rating:8.7, img:"⚡" },
  { id:3, name:"Romain Saïss", pos:"CB", club:"Beşiktaş", caps:79, goals:7, rating:7.9, img:"🛡️" },
  { id:4, name:"Nayef Aguerd", pos:"CB", club:"West Ham", caps:44, goals:3, rating:7.8, img:"🛡️" },
  { id:5, name:"Noussair Mazraoui", pos:"LB", club:"Man Utd", caps:56, goals:4, rating:7.7, img:"🦁" },
  { id:6, name:"Azzedine Ounahi", pos:"CM", club:"Marseille", caps:38, goals:3, rating:8.0, img:"🎯" },
  { id:7, name:"Sofyan Amrabat", pos:"CDM", club:"Fenerbahçe", caps:61, goals:2, rating:8.2, img:"💪" },
  { id:8, name:"Selim Amallah", pos:"CM", club:"Standard", caps:29, goals:4, rating:7.6, img:"⚙️" },
  { id:9, name:"Hakim Ziyech", pos:"CAM", club:"Galatasaray", caps:62, goals:19, rating:8.5, img:"🪄" },
  { id:10, name:"Youssef En-Nesyri", pos:"ST", club:"Fenerbahçe", caps:59, goals:25, rating:8.3, img:"🔥" },
  { id:11, name:"Sofiane Boufal", pos:"LW", club:"Southampton", caps:49, goals:8, rating:8.0, img:"💫" },
  { id:12, name:"Brahim Díaz", pos:"AM", club:"AC Milan", caps:22, goals:5, rating:8.1, img:"✨" },
  { id:13, name:"Abdessamad Ezzalzouli", pos:"RW", club:"Betis", caps:18, goals:4, rating:7.9, img:"🚀" },
  { id:14, name:"Ilias Chair", pos:"AM", club:"QPR", caps:12, goals:2, rating:7.5, img:"🎪" },
];

const MATCHES = [
  { id:1, home:"🇲🇦 Morocco", away:"🇿🇦 South Africa", homeScore:2, awayScore:0, date:"15 Jun 2025", competition:"AFCON Qualifier", status:"FT", venue:"Complexe Mohammed V", events:[
    {min:23, type:"goal", player:"En-Nesyri", team:"home"},
    {min:67, type:"goal", player:"Ziyech", team:"home"},
    {min:45, type:"yellow", player:"Amrabat", team:"home"},
  ]},
  { id:2, home:"🇲🇦 Morocco", away:"🇪🇬 Egypt", homeScore:1, awayScore:1, date:"19 Jun 2025", competition:"AFCON Qualifier", status:"FT", venue:"Stade de Marrakech", events:[
    {min:34, type:"goal", player:"Boufal", team:"home"},
    {min:78, type:"goal", player:"Salah", team:"away"},
    {min:56, type:"yellow", player:"Aguerd", team:"home"},
  ]},
  { id:3, home:"🇪🇸 Spain", away:"🇲🇦 Morocco", homeScore:null, awayScore:null, date:"5 Sep 2025", competition:"Friendly", status:"UPCOMING", venue:"Santiago Bernabéu"},
  { id:4, home:"🇲🇦 Morocco", away:"🇫🇷 France", homeScore:null, awayScore:null, date:"9 Sep 2025", competition:"Friendly", status:"UPCOMING", venue:"Stade Ibn Batouta"},
  { id:5, home:"🇲🇦 Morocco", away:"🇸🇳 Senegal", homeScore:2, awayScore:1, date:"10 May 2025", competition:"AFCON Qualifier", status:"FT", venue:"Complexe Mohammed V", events:[
    {min:12, type:"goal", player:"En-Nesyri", team:"home"},
    {min:55, type:"goal", player:"Mané", team:"away"},
    {min:88, type:"goal", player:"Ziyech", team:"home"},
  ]},
];

const NEWS = [
  { id:1, title:"Hakimi Named Captain for AFCON Qualifying Campaign", summary:"Achraf Hakimi has been officially confirmed as the permanent captain of the Atlas Lions ahead of the crucial AFCON 2025 qualifying matches.", category:"National Team", time:"2h ago", likes:342, img:"⚡", hot:true },
  { id:2, title:"En-Nesyri Scores Hat-Trick for Fenerbahçe", summary:"Youssef En-Nesyri continued his stunning form with a hat-trick in the Turkish Süper Lig, boosting his chances for the national team.", category:"Players Abroad", time:"5h ago", likes:289, img:"🔥", hot:true },
  { id:3, title:"Morocco Confirmed as 2030 World Cup Co-Host", summary:"FIFA has officially confirmed Morocco alongside Spain and Portugal as co-hosts for the 2030 FIFA World Cup, with several matches to be played across Moroccan cities.", category:"World Cup", time:"1d ago", likes:1204, img:"🏆", hot:false },
  { id:4, title:"Ziyech Returns to Training After Injury", summary:"Hakim Ziyech has been cleared for full training at Galatasaray following a minor muscle strain that kept him out for two weeks.", category:"Players Abroad", time:"1d ago", likes:156, img:"🪄", hot:false },
  { id:5, title:"Morocco Draw Spain in Friendly Ahead of AFCON", summary:"A high-profile friendly against Spain at the Santiago Bernabéu has been confirmed for September, providing a major test for Walid Regragui's side.", category:"National Team", time:"2d ago", likes:678, img:"🇪🇸", hot:false },
  { id:6, title:"CAF Announces New AFCON Format for 2025 Edition", summary:"The Confederation of African Football has unveiled sweeping changes to the AFCON format, with the 2025 edition set to feature 24 teams across expanded venues.", category:"CAF", time:"3d ago", likes:445, img:"🌍", hot:false },
  { id:7, title:"Mazraoui Praised by Man United Boss", summary:"Manchester United manager praised Noussair Mazraoui's outstanding performances and confirmed his place as first-choice right-back at Old Trafford.", category:"Transfers", time:"3d ago", likes:312, img:"🔴", hot:false },
];

const LEADERBOARD = [
  { rank:1, name:"AtlasKing_MA", points:2840, badge:"🏆", level:"Legend" },
  { rank:2, name:"HakimiNo2", points:2210, badge:"🥈", level:"Elite" },
  { rank:3, name:"LionsFan94", points:1980, badge:"🥉", level:"Elite" },
  { rank:4, name:"MarocForever", points:1540, badge:"⭐", level:"Pro" },
  { rank:5, name:"RiadRedStar", points:1320, badge:"⭐", level:"Pro" },
];

const PREDICTIONS = [
  { id:1, match:"Morocco vs Spain", date:"5 Sep 2025", locked:false },
  { id:2, match:"Morocco vs France", date:"9 Sep 2025", locked:false },
  { id:3, match:"Morocco vs South Africa", result:"Morocco Win", correct:true, points:100, locked:true },
  { id:4, match:"Morocco vs Egypt", result:"Draw", correct:true, points:150, locked:true },
  { id:5, match:"Morocco vs Senegal", result:"Morocco Win", correct:true, points:100, locked:true },
];

const REWARDS = [
  { id:1, name:"Golden Lion Badge", cost:500, icon:"🦁", unlocked:false, desc:"Exclusive badge for your profile" },
  { id:2, name:"Morocco Kit Wallpaper Pack", cost:750, icon:"👕", unlocked:false, desc:"5 HD team wallpapers" },
  { id:3, name:"Atlas Legend Frame", cost:1000, icon:"🏆", unlocked:false, desc:"Gold profile frame" },
  { id:4, name:"VIP Supporter Card", cost:1500, icon:"💎", unlocked:false, desc:"Digital VIP supporter card" },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');
  
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  
  :root {
    --red: #C1121F;
    --red2: #E63946;
    --green: #2DC653;
    --green2: #1a9e40;
    --gold: #FFD60A;
    --bg: #0A0A0F;
    --bg2: #12121A;
    --bg3: #1A1A26;
    --bg4: #22222F;
    --glass: rgba(255,255,255,0.04);
    --glass2: rgba(255,255,255,0.07);
    --border: rgba(255,255,255,0.08);
    --text: #F0F0F0;
    --text2: #A0A0B0;
    --text3: #606070;
    --radius: 16px;
    --radius2: 12px;
  }

  html, body { height: 100%; background: var(--bg); color: var(--text); font-family: 'Inter', sans-serif; }

  .app-wrap {
    max-width: 430px; margin: 0 auto; height: 100vh;
    display: flex; flex-direction: column; overflow: hidden;
    position: relative; background: var(--bg);
  }

  /* SCROLLABLE CONTENT */
  .page { flex: 1; overflow-y: auto; padding-bottom: 80px; }
  .page::-webkit-scrollbar { width: 0; }

  /* BOTTOM NAV */
  .bottom-nav {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 72px; background: rgba(18,18,26,0.95);
    backdrop-filter: blur(20px);
    border-top: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-around;
    z-index: 100; padding: 0 8px;
  }
  .nav-item {
    display: flex; flex-direction: column; align-items: center;
    gap: 4px; cursor: pointer; padding: 8px 14px; border-radius: 14px;
    transition: all 0.2s; flex: 1;
  }
  .nav-item.active { background: rgba(193,18,31,0.15); }
  .nav-icon { font-size: 22px; transition: transform 0.2s; }
  .nav-item.active .nav-icon { transform: scale(1.15); }
  .nav-label { font-size: 10px; font-weight: 600; color: var(--text3); letter-spacing: 0.5px; text-transform: uppercase; }
  .nav-item.active .nav-label { color: var(--red2); }

  /* HEADER */
  .header {
    padding: 52px 20px 12px;
    background: linear-gradient(180deg, rgba(193,18,31,0.12) 0%, transparent 100%);
    display: flex; align-items: center; justify-content: space-between;
  }
  .header-brand { display: flex; align-items: center; gap: 10px; }
  .header-logo { width: 38px; height: 38px; border-radius: 50%;
    background: linear-gradient(135deg, var(--red), var(--red2));
    display: flex; align-items: center; justify-content: center; font-size: 18px;
    box-shadow: 0 0 20px rgba(193,18,31,0.4);
  }
  .header-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1px; }
  .header-sub { font-size: 10px; color: var(--text2); letter-spacing: 2px; text-transform: uppercase; }
  .header-actions { display: flex; gap: 10px; }
  .icon-btn { width: 38px; height: 38px; border-radius: 12px; background: var(--glass2);
    border: 1px solid var(--border); display: flex; align-items: center; justify-content: center;
    font-size: 16px; cursor: pointer; transition: all 0.2s; }
  .icon-btn:hover { background: var(--glass); transform: scale(1.05); }

  /* HERO MATCH CARD */
  .hero-match {
    margin: 16px; border-radius: 20px; overflow: hidden;
    background: linear-gradient(135deg, #1a0510 0%, #0f1a0f 50%, #1a1505 100%);
    border: 1px solid rgba(193,18,31,0.3);
    position: relative; padding: 24px 20px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }
  .hero-match::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, var(--red), var(--green), var(--gold));
  }
  .match-comp { font-size: 11px; color: var(--gold); letter-spacing: 2px;
    text-transform: uppercase; font-weight: 600; margin-bottom: 16px;
    display: flex; align-items: center; gap: 6px; }
  .match-teams { display: flex; align-items: center; justify-content: space-between; }
  .match-team { text-align: center; flex: 1; }
  .team-flag { font-size: 42px; display: block; margin-bottom: 8px; }
  .team-name { font-size: 12px; color: var(--text2); font-weight: 600; letter-spacing: 0.5px; }
  .match-score {
    display: flex; align-items: center; gap: 8px; padding: 0 16px;
  }
  .score-num { font-family: 'Bebas Neue', sans-serif; font-size: 52px; color: var(--text); line-height: 1; }
  .score-sep { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: var(--text3); }
  .match-meta { margin-top: 16px; display: flex; align-items: center; justify-content: space-between; }
  .match-status { font-size: 11px; font-weight: 700; letter-spacing: 1px; padding: 4px 10px;
    border-radius: 20px; text-transform: uppercase; }
  .status-ft { background: rgba(45,198,83,0.15); color: var(--green); border: 1px solid rgba(45,198,83,0.3); }
  .status-live { background: rgba(230,57,70,0.2); color: var(--red2); border: 1px solid rgba(230,57,70,0.4);
    animation: pulse 1.5s infinite; }
  .status-upcoming { background: rgba(255,214,10,0.1); color: var(--gold); border: 1px solid rgba(255,214,10,0.3); }
  @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.6 } }

  /* SECTION */
  .section { padding: 0 16px; margin-bottom: 24px; }
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
  .section-title { font-family: 'Rajdhani', sans-serif; font-size: 18px; font-weight: 700; letter-spacing: 0.5px; }
  .section-more { font-size: 12px; color: var(--red2); font-weight: 600; cursor: pointer; }

  /* NEWS CARDS */
  .news-scroll { display: flex; gap: 12px; overflow-x: auto; padding-bottom: 8px; }
  .news-scroll::-webkit-scrollbar { height: 0; }
  .news-card-h {
    min-width: 260px; border-radius: var(--radius); background: var(--bg3);
    border: 1px solid var(--border); overflow: hidden; cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s; flex-shrink: 0;
  }
  .news-card-h:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
  .news-card-img { height: 120px; background: linear-gradient(135deg, var(--bg4), var(--bg3));
    display: flex; align-items: center; justify-content: center; font-size: 48px;
    position: relative; }
  .news-hot { position: absolute; top: 8px; left: 8px; background: var(--red);
    color: white; font-size: 9px; font-weight: 700; padding: 3px 7px; border-radius: 20px;
    letter-spacing: 1px; text-transform: uppercase; }
  .news-card-body { padding: 12px; }
  .news-cat { font-size: 10px; color: var(--green); font-weight: 700; letter-spacing: 1px;
    text-transform: uppercase; margin-bottom: 6px; }
  .news-title { font-size: 13px; font-weight: 600; line-height: 1.4; margin-bottom: 8px; }
  .news-meta { display: flex; align-items: center; justify-content: space-between; }
  .news-time { font-size: 11px; color: var(--text3); }
  .news-likes { font-size: 11px; color: var(--text3); display: flex; align-items: center; gap: 4px; }

  /* FULL NEWS CARD */
  .news-card-full {
    background: var(--bg3); border-radius: var(--radius); border: 1px solid var(--border);
    padding: 16px; margin-bottom: 12px; cursor: pointer;
    transition: transform 0.2s; display: flex; gap: 14px; align-items: flex-start;
  }
  .news-card-full:hover { transform: translateX(4px); }
  .news-card-full .icon { font-size: 36px; min-width: 52px; height: 52px;
    background: var(--bg4); border-radius: 12px; display: flex; align-items: center;
    justify-content: center; }
  .news-card-full .body { flex: 1; }

  /* FIXTURE CARDS */
  .fixture-card {
    background: var(--bg3); border-radius: var(--radius2); border: 1px solid var(--border);
    padding: 14px 16px; margin-bottom: 10px; display: flex; align-items: center;
    gap: 12px; cursor: pointer; transition: all 0.2s;
  }
  .fixture-card:hover { background: var(--bg4); }
  .fixture-teams { flex: 1; display: flex; align-items: center; gap: 10px; }
  .fixture-flag { font-size: 24px; }
  .fixture-vs { font-size: 11px; color: var(--text3); font-weight: 600; }
  .fixture-name { font-size: 13px; font-weight: 600; }
  .fixture-right { text-align: right; }
  .fixture-date { font-size: 11px; color: var(--text2); margin-bottom: 3px; }
  .fixture-comp { font-size: 10px; color: var(--red2); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }

  /* PLAYER CARDS */
  .players-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .player-card {
    background: var(--bg3); border-radius: var(--radius2); border: 1px solid var(--border);
    padding: 14px; cursor: pointer; transition: all 0.2s; text-align: center;
  }
  .player-card:hover { border-color: rgba(193,18,31,0.4); transform: translateY(-2px); }
  .player-avatar { font-size: 32px; height: 56px; width: 56px; border-radius: 50%;
    background: var(--bg4); display: flex; align-items: center; justify-content: center;
    margin: 0 auto 10px; border: 2px solid var(--border); }
  .player-name { font-size: 13px; font-weight: 600; margin-bottom: 2px; }
  .player-pos { font-size: 10px; color: var(--text3); margin-bottom: 6px; }
  .player-club { font-size: 11px; color: var(--text2); }
  .player-rating { display: inline-block; background: var(--red); color: white;
    font-size: 12px; font-weight: 700; padding: 2px 8px; border-radius: 20px; margin-top: 6px; }

  /* STATS BAR */
  .stat-row { margin-bottom: 10px; }
  .stat-label { display: flex; justify-content: space-between; margin-bottom: 4px; }
  .stat-name { font-size: 12px; color: var(--text2); }
  .stat-val { font-size: 12px; font-weight: 600; }
  .stat-bar { height: 5px; background: var(--bg4); border-radius: 3px; overflow: hidden; }
  .stat-fill { height: 100%; border-radius: 3px;
    background: linear-gradient(90deg, var(--red), var(--red2)); transition: width 1s ease; }
  .stat-fill.green { background: linear-gradient(90deg, var(--green2), var(--green)); }

  /* PREDICTION */
  .pred-card {
    background: var(--bg3); border-radius: var(--radius); border: 1px solid var(--border);
    padding: 18px; margin-bottom: 12px;
  }
  .pred-match { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
  .pred-date { font-size: 11px; color: var(--text3); margin-bottom: 14px; }
  .pred-options { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; }
  .pred-btn {
    padding: 10px 6px; border-radius: 10px; text-align: center;
    background: var(--bg4); border: 1px solid var(--border);
    cursor: pointer; transition: all 0.2s; font-size: 12px; font-weight: 600;
  }
  .pred-btn:hover { border-color: var(--red); color: var(--red); }
  .pred-btn.selected { background: rgba(193,18,31,0.2); border-color: var(--red); color: var(--red2); }
  .pred-result { display: flex; align-items: center; gap: 8px; }
  .pred-correct { color: var(--green); font-size: 12px; font-weight: 600; }
  .pred-wrong { color: var(--red2); font-size: 12px; font-weight: 600; }
  .pred-pts { background: rgba(255,214,10,0.15); color: var(--gold);
    font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 20px; margin-left: auto; }

  /* LEADERBOARD */
  .lb-card {
    background: var(--bg3); border-radius: var(--radius2); border: 1px solid var(--border);
    padding: 14px 16px; margin-bottom: 8px; display: flex; align-items: center; gap: 12px;
  }
  .lb-rank { font-family: 'Bebas Neue', sans-serif; font-size: 22px; width: 32px; text-align: center; }
  .lb-badge { font-size: 22px; }
  .lb-info { flex: 1; }
  .lb-name { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
  .lb-level { font-size: 11px; color: var(--text3); }
  .lb-pts { font-family: 'Bebas Neue', sans-serif; font-size: 24px; color: var(--gold); }

  /* MY POINTS */
  .points-banner {
    margin: 0 16px 20px; border-radius: 20px; padding: 20px;
    background: linear-gradient(135deg, rgba(193,18,31,0.3) 0%, rgba(45,198,83,0.2) 100%);
    border: 1px solid rgba(193,18,31,0.3);
    position: relative; overflow: hidden;
  }
  .points-banner::after {
    content: '🦁'; position: absolute; right: 16px; top: 50%; transform: translateY(-50%);
    font-size: 64px; opacity: 0.15;
  }
  .pts-label { font-size: 12px; color: var(--text2); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
  .pts-value { font-family: 'Bebas Neue', sans-serif; font-size: 52px; color: var(--gold); line-height: 1; }
  .pts-progress { margin-top: 12px; }
  .pts-prog-label { display: flex; justify-content: space-between; margin-bottom: 6px; }
  .pts-prog-bar { height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden; }
  .pts-prog-fill { height: 100%; background: linear-gradient(90deg, var(--red), var(--gold)); border-radius: 3px; transition: width 1s; }

  /* REWARD CARDS */
  .reward-card {
    background: var(--bg3); border-radius: var(--radius); border: 1px solid var(--border);
    padding: 18px; margin-bottom: 10px; display: flex; align-items: center; gap: 14px;
  }
  .reward-icon { font-size: 36px; width: 60px; height: 60px; background: var(--bg4);
    border-radius: 14px; display: flex; align-items: center; justify-content: center; }
  .reward-info { flex: 1; }
  .reward-name { font-size: 14px; font-weight: 700; margin-bottom: 3px; }
  .reward-desc { font-size: 12px; color: var(--text3); }
  .reward-cost { display: flex; align-items: center; gap: 6px; margin-top: 6px; }
  .reward-pts { font-size: 13px; color: var(--gold); font-weight: 700; }
  .reward-btn {
    padding: 8px 16px; border-radius: 20px; font-size: 12px; font-weight: 700;
    cursor: pointer; border: none; transition: all 0.2s;
    background: var(--red); color: white;
  }
  .reward-btn:disabled { background: var(--bg4); color: var(--text3); cursor: not-allowed; }

  /* AUTH PAGE */
  .auth-page {
    min-height: 100vh; display: flex; flex-direction: column;
    background: var(--bg); position: relative; overflow: hidden;
  }
  .auth-bg {
    position: absolute; inset: 0; 
    background: radial-gradient(ellipse at 50% 0%, rgba(193,18,31,0.2) 0%, transparent 60%),
                radial-gradient(ellipse at 80% 100%, rgba(45,198,83,0.1) 0%, transparent 50%);
  }
  .auth-content { position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column;
    padding: 60px 24px 40px; }
  .auth-logo { text-align: center; margin-bottom: 40px; }
  .auth-logo-icon { width: 80px; height: 80px; border-radius: 24px;
    background: linear-gradient(135deg, var(--red), var(--red2));
    display: flex; align-items: center; justify-content: center; font-size: 36px;
    margin: 0 auto 16px; box-shadow: 0 8px 32px rgba(193,18,31,0.4); }
  .auth-logo-title { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 2px; }
  .auth-logo-sub { font-size: 13px; color: var(--text2); margin-top: 4px; letter-spacing: 3px; text-transform: uppercase; }
  .auth-form { display: flex; flex-direction: column; gap: 14px; }
  .auth-input {
    padding: 16px; border-radius: 14px; background: var(--bg3);
    border: 1px solid var(--border); color: var(--text); font-size: 15px; outline: none;
    transition: border-color 0.2s;
  }
  .auth-input:focus { border-color: var(--red); }
  .auth-input::placeholder { color: var(--text3); }
  .auth-btn {
    padding: 16px; border-radius: 14px; border: none; cursor: pointer;
    font-size: 16px; font-weight: 700; letter-spacing: 0.5px;
    background: linear-gradient(135deg, var(--red), var(--red2));
    color: white; transition: all 0.2s; box-shadow: 0 4px 16px rgba(193,18,31,0.3);
  }
  .auth-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 24px rgba(193,18,31,0.4); }
  .auth-google {
    padding: 16px; border-radius: 14px; border: 1px solid var(--border);
    background: var(--bg3); color: var(--text); cursor: pointer; font-size: 15px;
    font-weight: 600; display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: all 0.2s;
  }
  .auth-google:hover { background: var(--bg4); }
  .auth-switch { text-align: center; margin-top: 8px; font-size: 14px; color: var(--text2); }
  .auth-switch span { color: var(--red2); cursor: pointer; font-weight: 600; }
  .auth-divider { display: flex; align-items: center; gap: 12px; color: var(--text3); font-size: 12px; }
  .auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: var(--border); }

  /* PROFILE */
  .profile-hero {
    padding: 52px 20px 24px; text-align: center;
    background: linear-gradient(180deg, rgba(193,18,31,0.15) 0%, transparent 100%);
  }
  .profile-avatar { width: 90px; height: 90px; border-radius: 50%; border: 3px solid var(--red);
    background: var(--bg3); display: flex; align-items: center; justify-content: center;
    font-size: 40px; margin: 0 auto 14px; box-shadow: 0 0 24px rgba(193,18,31,0.3); }
  .profile-name { font-family: 'Rajdhani', sans-serif; font-size: 24px; font-weight: 700; }
  .profile-email { font-size: 13px; color: var(--text3); margin-top: 2px; }
  .profile-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 20px 16px; }
  .pstat { background: var(--bg3); border-radius: 14px; border: 1px solid var(--border); padding: 14px; text-align: center; }
  .pstat-val { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--gold); }
  .pstat-label { font-size: 11px; color: var(--text3); margin-top: 2px; }

  /* MATCH DETAIL */
  .match-detail-header {
    padding: 52px 20px 24px;
    background: linear-gradient(180deg, rgba(193,18,31,0.2) 0%, transparent 100%);
    text-align: center;
  }
  .md-comp { font-size: 11px; color: var(--gold); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px; }
  .md-teams { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 16px; }
  .md-flag { font-size: 54px; }
  .md-score { font-family: 'Bebas Neue', sans-serif; font-size: 64px; display: flex; align-items: center; gap: 12px; }
  .md-sep { font-size: 36px; color: var(--text3); }
  .timeline { padding: 0 16px; }
  .tl-item { display: flex; align-items: center; gap: 12px; padding: 10px 0;
    border-bottom: 1px solid var(--border); }
  .tl-min { font-family: 'Bebas Neue', sans-serif; font-size: 18px; color: var(--text3); min-width: 40px; }
  .tl-icon { font-size: 18px; }
  .tl-text { font-size: 13px; font-weight: 500; }
  .tl-team { font-size: 11px; color: var(--text3); }

  /* SETTINGS */
  .settings-row {
    background: var(--bg3); border-radius: var(--radius2); border: 1px solid var(--border);
    padding: 16px; margin-bottom: 8px; display: flex; align-items: center; gap: 14px;
    cursor: pointer; transition: background 0.2s;
  }
  .settings-row:hover { background: var(--bg4); }
  .settings-icon { font-size: 20px; width: 40px; height: 40px; background: var(--bg4);
    border-radius: 12px; display: flex; align-items: center; justify-content: center; }
  .settings-label { flex: 1; font-size: 14px; font-weight: 500; }
  .settings-arrow { color: var(--text3); font-size: 14px; }

  /* TOAST */
  .toast {
    position: fixed; top: 60px; left: 50%; transform: translateX(-50%) translateY(-80px);
    background: var(--green2); color: white; padding: 12px 20px; border-radius: 20px;
    font-size: 13px; font-weight: 600; z-index: 1000; transition: transform 0.3s;
    white-space: nowrap; box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  }
  .toast.show { transform: translateX(-50%) translateY(0); }
  .toast.red { background: var(--red); }

  /* SPLASH */
  .splash {
    position: fixed; inset: 0; background: var(--bg); z-index: 999;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    transition: opacity 0.6s;
  }
  .splash.out { opacity: 0; pointer-events: none; }
  .splash-logo { font-size: 72px; animation: bounceIn 0.8s ease; margin-bottom: 20px; }
  .splash-title { font-family: 'Bebas Neue', sans-serif; font-size: 36px; letter-spacing: 3px;
    animation: fadeUp 0.8s 0.3s both; }
  .splash-sub { font-size: 13px; color: var(--text3); letter-spacing: 4px; text-transform: uppercase;
    animation: fadeUp 0.8s 0.5s both; margin-top: 8px; }
  .splash-bar { width: 160px; height: 3px; background: var(--bg3); border-radius: 2px;
    margin-top: 40px; overflow: hidden; animation: fadeUp 0.8s 0.7s both; }
  .splash-progress { height: 100%; background: linear-gradient(90deg, var(--red), var(--green));
    border-radius: 2px; animation: load 1.8s 0.8s ease forwards; width: 0; }
  @keyframes load { to { width: 100%; } }
  @keyframes bounceIn { 0% { transform: scale(0); } 70% { transform: scale(1.1); } 100% { transform: scale(1); } }
  @keyframes fadeUp { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform: translateY(0); } }

  /* CHIPS */
  .chips { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 14px; }
  .chips::-webkit-scrollbar { height: 0; }
  .chip {
    padding: 7px 16px; border-radius: 20px; font-size: 12px; font-weight: 600;
    white-space: nowrap; cursor: pointer; transition: all 0.2s; flex-shrink: 0;
    background: var(--bg3); border: 1px solid var(--border); color: var(--text2);
  }
  .chip.active { background: rgba(193,18,31,0.2); border-color: var(--red); color: var(--red2); }

  .btn-back {
    display: flex; align-items: center; gap: 8px; color: var(--text2);
    cursor: pointer; font-size: 14px; font-weight: 600; padding: 0 20px 16px;
  }
  .btn-back:hover { color: var(--text); }

  .tag { display: inline-block; padding: 3px 10px; border-radius: 20px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; }
  .tag-red { background: rgba(193,18,31,0.2); color: var(--red2); }
  .tag-green { background: rgba(45,198,83,0.15); color: var(--green); }
  .tag-gold { background: rgba(255,214,10,0.15); color: var(--gold); }

  .divider { height: 1px; background: var(--border); margin: 16px 0; }

  .empty-state { text-align: center; padding: 40px 20px; color: var(--text3); }
  .empty-state .icon { font-size: 48px; margin-bottom: 12px; }
`;

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [splash, setSplash] = useState(true);
  const [splashOut, setSplashOut] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [tab, setTab] = useState("home");
  const [toast, setToast] = useState({ show: false, msg: "", red: false });
  const [user, setUser] = useState(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");

  // Points
  const [points, setPoints] = useState(350);
  const [predictions, setPredictions] = useState({});

  // Detail views
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);

  const showToast = (msg, red = false) => {
    setToast({ show: true, msg, red });
    setTimeout(() => setToast({ show: false, msg: "", red: false }), 2500);
  };

  useEffect(() => {
    setTimeout(() => setSplashOut(true), 2600);
    setTimeout(() => setSplash(false), 3200);
  }, []);

  const handleLogin = () => {
    if (!loginEmail || !loginPass) { showToast("Please fill all fields", true); return; }
    setUser({ name: loginEmail.split("@")[0], email: loginEmail, avatar: "🦁" });
    setAuthed(true);
    showToast("Welcome back, Atlas Lion! 🦁");
  };
  const handleRegister = () => {
    if (!regName || !regEmail || !regPass) { showToast("Please fill all fields", true); return; }
    setUser({ name: regName, email: regEmail, avatar: "🦁" });
    setAuthed(true);
    showToast(`Welcome, ${regName}! Let's go Atlas Lions! 🇲🇦`);
  };
  const handleGoogle = () => {
    setUser({ name: "Atlas Fan", email: "fan@gmail.com", avatar: "🦁" });
    setAuthed(true);
    showToast("Signed in with Google! 🦁");
  };
  const handleLogout = () => {
    setAuthed(false);
    setUser(null);
    setTab("home");
    showToast("Logged out. Come back soon!", true);
  };

  const makePrediction = (matchId, result) => {
    if (predictions[matchId]) { showToast("Prediction already locked!", true); return; }
    setPredictions(p => ({ ...p, [matchId]: result }));
    const pts = result === "Draw" ? 150 : 100;
    setPoints(p => p + pts);
    showToast(`+${pts} points! Prediction locked 🔒`);
  };

  return (
    <>
      <style>{css}</style>

      {/* TOAST */}
      <div className={`toast${toast.red ? " red" : ""}${toast.show ? " show" : ""}`}>{toast.msg}</div>

      {/* SPLASH */}
      {splash && (
        <div className={`splash${splashOut ? " out" : ""}`}>
          <div className="splash-logo">🦁</div>
          <div className="splash-title">Atlas Lions Hub</div>
          <div className="splash-sub">المنتخب الوطني المغربي</div>
          <div className="splash-bar"><div className="splash-progress" /></div>
        </div>
      )}

      {/* AUTH */}
      {!authed ? (
        <div className="auth-page">
          <div className="auth-bg" />
          <div className="auth-content">
            <div className="auth-logo">
              <div className="auth-logo-icon">🦁</div>
              <div className="auth-logo-title">Atlas Lions Hub</div>
              <div className="auth-logo-sub">Morocco National Team</div>
            </div>
            {authMode === "login" ? (
              <div className="auth-form">
                <input className="auth-input" placeholder="Email" type="email"
                  value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                <input className="auth-input" placeholder="Password" type="password"
                  value={loginPass} onChange={e => setLoginPass(e.target.value)} />
                <button className="auth-btn" onClick={handleLogin}>Sign In</button>
                <div className="auth-divider">or continue with</div>
                <button className="auth-google" onClick={handleGoogle}>
                  <span>🌐</span> Continue with Google
                </button>
                <div className="auth-switch">
                  No account? <span onClick={() => setAuthMode("register")}>Create one</span>
                </div>
              </div>
            ) : (
              <div className="auth-form">
                <input className="auth-input" placeholder="Username" value={regName} onChange={e => setRegName(e.target.value)} />
                <input className="auth-input" placeholder="Email" type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} />
                <input className="auth-input" placeholder="Password" type="password" value={regPass} onChange={e => setRegPass(e.target.value)} />
                <button className="auth-btn" onClick={handleRegister}>Create Account</button>
                <div className="auth-divider">or continue with</div>
                <button className="auth-google" onClick={handleGoogle}>
                  <span>🌐</span> Continue with Google
                </button>
                <div className="auth-switch">
                  Have an account? <span onClick={() => setAuthMode("login")}>Sign in</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* MAIN APP */
        <div className="app-wrap">
          <div className="page">
            {selectedMatch ? (
              <MatchDetail match={selectedMatch} onBack={() => setSelectedMatch(null)} />
            ) : selectedNews ? (
              <NewsDetail news={selectedNews} onBack={() => setSelectedNews(null)} />
            ) : tab === "home" ? (
              <HomePage onMatchClick={setSelectedMatch} onNewsClick={setSelectedNews} />
            ) : tab === "news" ? (
              <NewsPage onNewsClick={setSelectedNews} />
            ) : tab === "predict" ? (
              <PredictPage points={points} predictions={predictions} onPredict={makePrediction} />
            ) : tab === "team" ? (
              <TeamPage />
            ) : tab === "profile" ? (
              <ProfilePage user={user} points={points} onLogout={handleLogout} showToast={showToast} />
            ) : null}
          </div>
          {!selectedMatch && !selectedNews && (
            <nav className="bottom-nav">
              {[
                { id:"home", icon:"🏠", label:"Home" },
                { id:"news", icon:"📰", label:"News" },
                { id:"predict", icon:"🎯", label:"Predict" },
                { id:"team", icon:"🦁", label:"Team" },
                { id:"profile", icon:"👤", label:"Profile" },
              ].map(n => (
                <div key={n.id} className={`nav-item${tab===n.id?" active":""}`} onClick={() => setTab(n.id)}>
                  <span className="nav-icon">{n.icon}</span>
                  <span className="nav-label">{n.label}</span>
                </div>
              ))}
            </nav>
          )}
        </div>
      )}
    </>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────
function HomePage({ onMatchClick, onNewsClick }) {
  return (
    <>
      <div className="header">
        <div className="header-brand">
          <div className="header-logo">🦁</div>
          <div>
            <div className="header-title">Atlas Lions Hub</div>
            <div className="header-sub">Morocco National Team</div>
          </div>
        </div>
        <div className="header-actions">
          <div className="icon-btn">🔍</div>
          <div className="icon-btn">🔔</div>
        </div>
      </div>

      {/* LIVE / UPCOMING */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">📅 Fixtures & Results</span>
        </div>
        {MATCHES.slice(0, 3).map(m => (
          <div key={m.id} className="fixture-card" onClick={() => onMatchClick(m)}>
            <div className="fixture-teams">
              <span className="fixture-flag">{m.home.split(" ")[0]}</span>
              <div>
                <div className="fixture-name">{m.home.replace(/^.+\s/, "")} vs {m.away.replace(/^.+\s/, "")}</div>
                <div className="fixture-comp">{m.competition}</div>
              </div>
            </div>
            <div className="fixture-right">
              {m.status === "FT" ? (
                <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:20}}>{m.homeScore} – {m.awayScore}</div>
              ) : (
                <div className="fixture-date">{m.date}</div>
              )}
              <div className={`match-status status-${m.status.toLowerCase()}`}>{m.status}</div>
            </div>
          </div>
        ))}
      </div>

      {/* FEATURED MATCH */}
      <div onClick={() => onMatchClick(MATCHES[0])}>
        <HeroMatch match={MATCHES[0]} />
      </div>

      {/* TEAM STATS */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">📊 Team Stats (2025)</span>
        </div>
        <div style={{background:"var(--bg3)",borderRadius:"var(--radius)",border:"1px solid var(--border)",padding:16}}>
          {[
            { label:"Goals Scored", val:18, max:25, pct:72 },
            { label:"Clean Sheets", val:6, max:10, pct:60, green:true },
            { label:"Win Rate", val:"73%", pct:73 },
            { label:"Possession Avg", val:"58%", pct:58, green:true },
          ].map(s => (
            <div className="stat-row" key={s.label}>
              <div className="stat-label">
                <span className="stat-name">{s.label}</span>
                <span className="stat-val">{s.val}</span>
              </div>
              <div className="stat-bar">
                <div className={`stat-fill${s.green?" green":""}`} style={{width:`${s.pct}%`}} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEWS HORIZONTAL */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">📰 Latest News</span>
        </div>
        <div className="news-scroll">
          {NEWS.slice(0, 5).map(n => (
            <div key={n.id} className="news-card-h" onClick={() => onNewsClick(n)}>
              <div className="news-card-img">
                <span style={{fontSize:48}}>{n.img}</span>
                {n.hot && <div className="news-hot">🔥 Hot</div>}
              </div>
              <div className="news-card-body">
                <div className="news-cat">{n.category}</div>
                <div className="news-title">{n.title}</div>
                <div className="news-meta">
                  <span className="news-time">{n.time}</span>
                  <span className="news-likes">❤️ {n.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TOP PLAYERS */}
      <div className="section">
        <div className="section-header">
          <span className="section-title">⭐ Top Performers</span>
        </div>
        <div className="players-grid">
          {PLAYERS.slice(0, 4).map(p => (
            <div key={p.id} className="player-card">
              <div className="player-avatar">{p.img}</div>
              <div className="player-name">{p.name.split(" ").pop()}</div>
              <div className="player-pos">{p.pos}</div>
              <div className="player-club">{p.club}</div>
              <div className="player-rating">{p.rating}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function HeroMatch({ match: m }) {
  return (
    <div className="hero-match" style={{cursor:"pointer"}}>
      <div className="match-comp">⚽ {m.competition}</div>
      <div className="match-teams">
        <div className="match-team">
          <span className="team-flag">{m.home.split(" ")[0]}</span>
          <div className="team-name">{m.home.replace(/^.+\s/, "")}</div>
        </div>
        <div className="match-score">
          {m.status !== "UPCOMING" ? (
            <>
              <span className="score-num">{m.homeScore}</span>
              <span className="score-sep">:</span>
              <span className="score-num">{m.awayScore}</span>
            </>
          ) : (
            <span style={{fontFamily:"Bebas Neue,sans-serif",fontSize:28,color:"var(--text3)"}}>VS</span>
          )}
        </div>
        <div className="match-team">
          <span className="team-flag">{m.away.split(" ")[0]}</span>
          <div className="team-name">{m.away.replace(/^.+\s/, "")}</div>
        </div>
      </div>
      <div className="match-meta">
        <div className="match-status status-ft">{m.status}</div>
        <div style={{fontSize:12,color:"var(--text3)"}}>{m.date} · {m.venue}</div>
      </div>
    </div>
  );
}

// ─── NEWS PAGE ────────────────────────────────────────────────────────────────
function NewsPage({ onNewsClick }) {
  const cats = ["All", "National Team", "Players Abroad", "Transfers", "CAF", "World Cup"];
  const [cat, setCat] = useState("All");
  const filtered = cat === "All" ? NEWS : NEWS.filter(n => n.category === cat);

  return (
    <>
      <div className="header">
        <div className="header-brand">
          <div style={{fontSize:24}}>📰</div>
          <div>
            <div className="header-title">News</div>
            <div className="header-sub">Atlas Lions</div>
          </div>
        </div>
        <div className="icon-btn">🔍</div>
      </div>
      <div className="section" style={{paddingBottom:0}}>
        <div className="chips">
          {cats.map(c => (
            <div key={c} className={`chip${cat===c?" active":""}`} onClick={() => setCat(c)}>{c}</div>
          ))}
        </div>
      </div>
      <div className="section">
        {filtered.map(n => (
          <div key={n.id} className="news-card-full" onClick={() => onNewsClick(n)}>
            <div className="icon">{n.img}</div>
            <div className="body">
              <div className="news-cat">{n.category} {n.hot && <span className="tag tag-red">🔥 Hot</span>}</div>
              <div className="news-title">{n.title}</div>
              <div className="news-meta" style={{marginTop:6}}>
                <span className="news-time">{n.time}</span>
                <span className="news-likes">❤️ {n.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── NEWS DETAIL ──────────────────────────────────────────────────────────────
function NewsDetail({ news: n, onBack }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(n.likes);

  const toggleLike = () => {
    setLiked(l => !l);
    setLikes(l => liked ? l - 1 : l + 1);
  };

  return (
    <>
      <div style={{padding:"52px 0 12px"}}>
        <div className="btn-back" onClick={onBack}>← Back</div>
      </div>
      <div style={{height:200,background:"linear-gradient(135deg,var(--bg3),var(--bg4))",display:"flex",alignItems:"center",justifyContent:"center",fontSize:72,margin:"0 16px",borderRadius:16}}>
        {n.img}
      </div>
      <div className="section" style={{paddingTop:20}}>
        <div style={{display:"flex",gap:8,marginBottom:14}}>
          <span className="tag tag-green">{n.category}</span>
          {n.hot && <span className="tag tag-red">🔥 Trending</span>}
        </div>
        <div style={{fontFamily:"Rajdhani,sans-serif",fontSize:24,fontWeight:700,lineHeight:1.3,marginBottom:12}}>{n.title}</div>
        <div style={{fontSize:12,color:"var(--text3)",marginBottom:16}}>{n.time} · Atlas Lions Hub</div>
        <div className="divider" />
        <div style={{fontSize:14,color:"var(--text2)",lineHeight:1.8,marginBottom:20}}>
          {n.summary}
          {" "}The Morocco National Team continues to make headlines across the African continent and beyond, proving once again why they are considered among the elite on the continent. Fans and analysts alike have praised the squad's cohesion and tactical discipline under coach Walid Regragui.
          <br /><br />
          The technical staff is closely monitoring player form heading into the next round of qualifiers, with selection decisions expected to be announced within the coming weeks. Atlas Lions supporters remain passionate and hopeful as the team gears up for a busy international calendar.
        </div>
        <div style={{display:"flex",gap:12}}>
          <button onClick={toggleLike} style={{flex:1,padding:"12px",borderRadius:12,border:`1px solid ${liked?"var(--red)":"var(--border)"}`,background:liked?"rgba(193,18,31,0.15)":"var(--bg3)",color:liked?"var(--red2)":"var(--text2)",cursor:"pointer",fontWeight:600,fontSize:13}}>
            {liked ? "❤️" : "🤍"} {likes}
          </button>
          <button style={{flex:1,padding:"12px",borderRadius:12,border:"1px solid var(--border)",background:"var(--bg3)",color:"var(--text2)",cursor:"pointer",fontWeight:600,fontSize:13}}>
            💬 Comment
          </button>
          <button style={{flex:1,padding:"12px",borderRadius:12,border:"1px solid var(--border)",background:"var(--bg3)",color:"var(--text2)",cursor:"pointer",fontWeight:600,fontSize:13}}>
            🔗 Share
          </button>
        </div>
      </div>
    </>
  );
}

// ─── MATCH DETAIL ─────────────────────────────────────────────────────────────
function MatchDetail({ match: m, onBack }) {
  return (
    <>
      <div style={{padding:"52px 0 0"}}>
        <div className="btn-back" onClick={onBack}>← Back to Matches</div>
      </div>
      <div className="match-detail-header">
        <div className="md-comp">⚽ {m.competition}</div>
        <div className="md-teams">
          <div style={{textAlign:"center"}}>
            <div className="md-flag">{m.home.split(" ")[0]}</div>
            <div style={{fontSize:12,color:"var(--text2)",fontWeight:600}}>{m.home.replace(/^.+\s/, "")}</div>
          </div>
          {m.status !== "UPCOMING" ? (
            <div className="md-score">
              <span>{m.homeScore}</span>
              <span className="md-sep">:</span>
              <span>{m.awayScore}</span>
            </div>
          ) : (
            <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:32,color:"var(--text3)",padding:"0 16px"}}>VS</div>
          )}
          <div style={{textAlign:"center"}}>
            <div className="md-flag">{m.away.split(" ")[0]}</div>
            <div style={{fontSize:12,color:"var(--text2)",fontWeight:600}}>{m.away.replace(/^.+\s/, "")}</div>
          </div>
        </div>
        <div className={`match-status status-${m.status.toLowerCase()}`}>{m.status}</div>
        <div style={{marginTop:10,fontSize:12,color:"var(--text3)"}}>{m.date} · {m.venue}</div>
      </div>

      {m.status !== "UPCOMING" && m.events && (
        <div className="section" style={{marginTop:16}}>
          <div className="section-header"><span className="section-title">⏱ Match Events</span></div>
          <div className="timeline">
            {m.events.map((ev, i) => (
              <div key={i} className="tl-item">
                <div className="tl-min">{ev.min}'</div>
                <div className="tl-icon">
                  {ev.type === "goal" ? "⚽" : ev.type === "yellow" ? "🟨" : ev.type === "red" ? "🟥" : "🔄"}
                </div>
                <div>
                  <div className="tl-text">{ev.player}</div>
                  <div className="tl-team">{ev.team === "home" ? m.home : m.away}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="section">
        <div className="section-header"><span className="section-title">📊 Match Stats</span></div>
        <div style={{background:"var(--bg3)",borderRadius:"var(--radius)",border:"1px solid var(--border)",padding:16}}>
          {m.status !== "UPCOMING" ? (
            [
              {label:"Possession", h:58, a:42},
              {label:"Shots on Target", h:7, a:3},
              {label:"Passes", h:420, a:290},
              {label:"Corners", h:6, a:2},
            ].map(s => (
              <div key={s.label} style={{marginBottom:14}}>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:6}}>
                  <span style={{fontWeight:700,color:"var(--red2)"}}>{s.h}</span>
                  <span style={{color:"var(--text3)"}}>{s.label}</span>
                  <span style={{fontWeight:700,color:"var(--text2)"}}>{s.a}</span>
                </div>
                <div style={{height:5,background:"var(--bg4)",borderRadius:3,overflow:"hidden",display:"flex"}}>
                  <div style={{width:`${(s.h/(s.h+s.a))*100}%`,background:"var(--red)",borderRadius:3}} />
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state"><div className="icon">⏳</div><div>Stats available after kick-off</div></div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── PREDICT PAGE ─────────────────────────────────────────────────────────────
function PredictPage({ points, predictions, onPredict }) {
  const progress = Math.min((points / 1000) * 100, 100);
  const upcoming = PREDICTIONS.filter(p => !p.locked);
  const history = PREDICTIONS.filter(p => p.locked);

  return (
    <>
      <div className="header">
        <div className="header-brand">
          <div style={{fontSize:24}}>🎯</div>
          <div>
            <div className="header-title">Predict & Win</div>
            <div className="header-sub">Earn Points</div>
          </div>
        </div>
      </div>

      {/* Points Banner */}
      <div className="points-banner">
        <div className="pts-label">Your Points</div>
        <div className="pts-value">{points}</div>
        <div className="pts-progress">
          <div className="pts-prog-label">
            <span style={{fontSize:11,color:"var(--text2)"}}>Progress to reward</span>
            <span style={{fontSize:11,color:"var(--gold)"}}>{points}/1000</span>
          </div>
          <div className="pts-prog-bar">
            <div className="pts-prog-fill" style={{width:`${progress}%`}} />
          </div>
        </div>
      </div>

      {/* Predictions */}
      <div className="section">
        <div className="section-header"><span className="section-title">🔓 Open Predictions</span></div>
        {upcoming.length === 0 && (
          <div className="empty-state"><div className="icon">⚽</div><div>No open predictions right now</div></div>
        )}
        {upcoming.map(p => (
          <PredCard key={p.id} p={p} selected={predictions[p.id]} onPredict={onPredict} />
        ))}
      </div>

      <div className="section">
        <div className="section-header"><span className="section-title">📜 History</span></div>
        {history.map(p => (
          <div key={p.id} className="pred-card">
            <div className="pred-match">{p.match}</div>
            <div className="pred-result">
              <span>{p.correct ? "✅" : "❌"}</span>
              <span className={p.correct ? "pred-correct" : "pred-wrong"}>
                {p.result} · {p.correct ? "Correct" : "Wrong"}
              </span>
              {p.correct && <span className="pred-pts">+{p.points} pts</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="section">
        <div className="section-header"><span className="section-title">🏆 Leaderboard</span></div>
        {LEADERBOARD.map(u => (
          <div key={u.rank} className="lb-card">
            <div className="lb-rank" style={{color: u.rank===1?"var(--gold)":u.rank===2?"#C0C0C0":u.rank===3?"#CD7F32":"var(--text3)"}}>{u.rank}</div>
            <div className="lb-badge">{u.badge}</div>
            <div className="lb-info">
              <div className="lb-name">{u.name}</div>
              <div className="lb-level">{u.level}</div>
            </div>
            <div className="lb-pts">{u.points}</div>
          </div>
        ))}
      </div>

      {/* Rewards */}
      <div className="section">
        <div className="section-header"><span className="section-title">🎁 Rewards Shop</span></div>
        {REWARDS.map(r => (
          <div key={r.id} className="reward-card">
            <div className="reward-icon">{r.icon}</div>
            <div className="reward-info">
              <div className="reward-name">{r.name}</div>
              <div className="reward-desc">{r.desc}</div>
              <div className="reward-cost">
                <span className="reward-pts">⭐ {r.cost} pts</span>
              </div>
            </div>
            <button className="reward-btn" disabled={points < r.cost}>
              {points >= r.cost ? "Claim" : "🔒"}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function PredCard({ p, selected, onPredict }) {
  return (
    <div className="pred-card">
      <div className="pred-match">{p.match}</div>
      <div className="pred-date">{p.date}</div>
      <div className="pred-options">
        {["Home Win", "Draw", "Away Win"].map(opt => (
          <div key={opt}
            className={`pred-btn${selected===opt?" selected":""}`}
            onClick={() => onPredict(p.id, opt)}>
            {opt === "Home Win" ? "1" : opt === "Draw" ? "X" : "2"}
            <div style={{fontSize:10,marginTop:3,color:"inherit",opacity:0.8}}>{opt}</div>
          </div>
        ))}
      </div>
      {selected && (
        <div style={{marginTop:10,fontSize:12,color:"var(--gold)",display:"flex",alignItems:"center",gap:6}}>
          🔒 Locked: <strong>{selected}</strong>
        </div>
      )}
    </div>
  );
}

// ─── TEAM PAGE ────────────────────────────────────────────────────────────────
function TeamPage() {
  const [view, setView] = useState("squad");
  return (
    <>
      <div className="header">
        <div className="header-brand">
          <div style={{fontSize:24}}>🦁</div>
          <div>
            <div className="header-title">Atlas Lions</div>
            <div className="header-sub">Squad & Stats</div>
          </div>
        </div>
      </div>
      <div className="section" style={{paddingBottom:0}}>
        <div className="chips">
          {["squad","formation","trophies"].map(v => (
            <div key={v} className={`chip${view===v?" active":""}`} onClick={() => setView(v)}>
              {v.charAt(0).toUpperCase()+v.slice(1)}
            </div>
          ))}
        </div>
      </div>

      {view === "squad" && (
        <div className="section">
          {["GK","CB","RB","LB","CDM","CM","CAM","RW","LW","ST"].map(pos => {
            const pp = PLAYERS.filter(p => p.pos === pos);
            if (!pp.length) return null;
            return (
              <div key={pos} style={{marginBottom:16}}>
                <div style={{fontSize:11,color:"var(--text3)",fontWeight:700,letterSpacing:2,textTransform:"uppercase",marginBottom:8}}>{pos}</div>
                {pp.map(p => (
                  <div key={p.id} style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:12,padding:"12px 14px",marginBottom:8,display:"flex",alignItems:"center",gap:12}}>
                    <div style={{fontSize:24}}>{p.img}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:14,fontWeight:600}}>{p.name}</div>
                      <div style={{fontSize:11,color:"var(--text3)"}}>{p.club}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:11,color:"var(--text2)"}}>{p.caps} caps</div>
                      <div className="player-rating" style={{marginTop:4}}>{p.rating}</div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      {view === "formation" && (
        <div className="section">
          <div style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:16,padding:20,textAlign:"center"}}>
            <div style={{fontFamily:"Bebas Neue,sans-serif",fontSize:20,color:"var(--gold)",marginBottom:20,letterSpacing:2}}>4-3-3 Formation</div>
            {/* Pitch visualization */}
            <div style={{background:"linear-gradient(180deg,#0d2b0d,#0f3a0f)",borderRadius:12,padding:"20px 10px",position:"relative",minHeight:320}}>
              {[
                { row: [PLAYERS[9]], label:"Attack" },
                { row: [PLAYERS[10], PLAYERS[8], PLAYERS[12]], label:"Midfield" },
                { row: [PLAYERS[5], PLAYERS[6], PLAYERS[7]], label:"Mid" },
                { row: [PLAYERS[4], PLAYERS[3], PLAYERS[2], PLAYERS[1]], label:"Defense" },
                { row: [PLAYERS[0]], label:"GK" },
              ].map((line, i) => (
                <div key={i} style={{display:"flex",justifyContent:"center",gap:8,marginBottom:16}}>
                  {line.row.map(p => p && (
                    <div key={p.id} style={{textAlign:"center",width:56}}>
                      <div style={{width:40,height:40,borderRadius:"50%",background:"rgba(193,18,31,0.8)",border:"2px solid var(--red2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,margin:"0 auto 4px"}}>
                        {p.img}
                      </div>
                      <div style={{fontSize:9,color:"white",fontWeight:600,lineHeight:1.2}}>{p.name.split(" ").pop()}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === "trophies" && (
        <div className="section">
          {[
            {icon:"🏆",name:"Africa Cup of Nations",years:["1976","1988"]},
            {icon:"🥈",name:"AFCON Runner-Up",years:["2004","2023"]},
            {icon:"🌍",name:"Arab Nations Cup",years:["2012","2020"]},
            {icon:"⭐",name:"FIFA World Cup QF",years:["2022"]},
            {icon:"🏅",name:"CHAN Champions",years:["2018","2020"]},
          ].map(t => (
            <div key={t.name} style={{background:"var(--bg3)",border:"1px solid var(--border)",borderRadius:14,padding:16,marginBottom:10,display:"flex",alignItems:"center",gap:14}}>
              <div style={{fontSize:36}}>{t.icon}</div>
              <div style={{flex:1}}>
                <div style={{fontSize:14,fontWeight:700,marginBottom:4}}>{t.name}</div>
                <div style={{display:"flex",gap:6}}>
                  {t.years.map(y => (
                    <span key={y} className="tag tag-gold">{y}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage({ user, points, onLogout, showToast }) {
  return (
    <>
      <div className="profile-hero">
        <div className="profile-avatar">{user.avatar}</div>
        <div className="profile-name">{user.name}</div>
        <div className="profile-email">{user.email}</div>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginTop:12}}>
          <span className="tag tag-red">Atlas Fan</span>
          <span className="tag tag-gold">⭐ {points} pts</span>
        </div>
      </div>

      <div className="profile-stats">
        <div className="pstat"><div className="pstat-val">{points}</div><div className="pstat-label">Points</div></div>
        <div className="pstat"><div className="pstat-val">5</div><div className="pstat-label">Predictions</div></div>
        <div className="pstat"><div className="pstat-val">3</div><div className="pstat-label">Correct</div></div>
      </div>

      <div className="section">
        <div className="section-title" style={{marginBottom:14}}>Account</div>
        {[
          {icon:"👤", label:"Edit Profile"},
          {icon:"🔔", label:"Notifications"},
          {icon:"🌐", label:"Language · English"},
          {icon:"🌙", label:"Dark Mode · On"},
          {icon:"📥", label:"Saved Articles"},
          {icon:"🔒", label:"Privacy & Security"},
          {icon:"ℹ️", label:"About Atlas Lions Hub"},
        ].map(s => (
          <div key={s.label} className="settings-row" onClick={() => showToast("Coming soon!")}>
            <div className="settings-icon">{s.icon}</div>
            <div className="settings-label">{s.label}</div>
            <div className="settings-arrow">›</div>
          </div>
        ))}

        <div className="divider" />

        <div className="settings-row" style={{borderColor:"rgba(193,18,31,0.3)"}} onClick={onLogout}>
          <div className="settings-icon">🚪</div>
          <div className="settings-label" style={{color:"var(--red2)"}}>Sign Out</div>
        </div>
      </div>
    </>
  );
}
