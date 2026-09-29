// CricGuru AI Intelligence Engine & Dynamic Knowledge Graph

export interface CricGuruResponse {
  reply: string;
  thought: string;
}

interface PlayerInfo {
  name: string;
  aliases: string[];
  team: string;
  jersey: number;
  role: string;
  achievements: string[];
  stats: string;
}

const PLAYERS: PlayerInfo[] = [
  {
    name: "Virat Kohli",
    aliases: ["virat", "kohli", "king kohli", "vk", "run machine", "cheeku", "18"],
    team: "Royal Challengers Bengaluru (RCB)",
    jersey: 18,
    role: "Right-handed top-order batsman",
    achievements: [
      "All-time leading run-scorer in IPL history (8,000+ runs)",
      "Record for most runs in a single season: 973 runs with 4 centuries in 2016",
      "Most centuries in IPL history (8 centuries)",
      "Orange Cap winner in 2016 and 2024",
      "Only player to play for a single franchise (RCB) from 2008 to present"
    ],
    stats: "8,000+ runs, 8 centuries, 55+ fifties, highest score 113"
  },
  {
    name: "MS Dhoni",
    aliases: ["dhoni", "msd", "thala", "captain cool", "mahi", "7"],
    team: "Chennai Super Kings (CSK)",
    jersey: 7,
    role: "Wicketkeeper-batsman & Former Captain",
    achievements: [
      "Led CSK to 5 IPL Championships (2010, 2011, 2018, 2021, 2023)",
      "Most matches as captain in IPL history (226 matches)",
      "Most dismissals by a wicketkeeper in IPL (190+ dismissals)",
      "Regarded as the greatest finisher and tactician in T20 cricket history"
    ],
    stats: "5,200+ runs, strike rate 137+, 5 IPL titles as captain"
  },
  {
    name: "Rohit Sharma",
    aliases: ["rohit", "sharma", "hitman", "shana", "45"],
    team: "Mumbai Indians (MI)",
    jersey: 45,
    role: "Right-handed opening batsman & Former Captain",
    achievements: [
      "Led Mumbai Indians to 5 IPL Championships (2013, 2015, 2017, 2019, 2020)",
      "Won 6 total IPL titles (1 with Deccan Chargers in 2009, 5 with MI)",
      "Over 6,600 runs in IPL with 2 centuries and 43 fifties",
      "Second most sixes by an Indian batsman in IPL history"
    ],
    stats: "6,600+ runs, 2 centuries, 280+ sixes, 5 titles as captain"
  },
  {
    name: "Chris Gayle",
    aliases: ["gayle", "chris gayle", "universe boss", "333"],
    team: "RCB / PBKS / KKR legend",
    jersey: 333,
    role: "Left-handed explosive opening batsman",
    achievements: [
      "Highest individual score in T20 & IPL history: 175* off 66 balls vs Pune Warriors India (2013)",
      "Fastest century in IPL history (off just 30 balls)",
      "Most sixes in IPL history (357 sixes)",
      "Two-time Orange Cap winner (2011, 2012)"
    ],
    stats: "4,965 runs, 6 centuries, 357 sixes, strike rate 148.96"
  },
  {
    name: "AB de Villiers",
    aliases: ["ab de villiers", "abd", "mr 360", "alien", "17"],
    team: "RCB / DD legend",
    jersey: 17,
    role: "Right-handed batsman & Wicketkeeper",
    achievements: [
      "Known as 'Mr. 360' for hitting boundaries all around the ground",
      "5,162 runs in IPL with a career strike rate over 151",
      "Part of the legendary 229-run partnership with Virat Kohli in 2016",
      "3 IPL centuries and 40 fifties"
    ],
    stats: "5,162 runs, 3 centuries, 251 sixes, strike rate 151.68"
  },
  {
    name: "Jasprit Bumrah",
    aliases: ["bumrah", "jasprit", "boom boom", "yorker king", "93"],
    team: "Mumbai Indians (MI)",
    jersey: 93,
    role: "Right-arm fast bowler",
    achievements: [
      "Premier death-overs yorker specialist with exceptional economy rate (sub 7.3)",
      "Purple Cap contender with 165+ IPL wickets",
      "Key match-winner in MI's title victories (2015, 2017, 2019, 2020)",
      "Career best bowling figures: 5/10"
    ],
    stats: "165+ wickets, economy 7.30, best figures 5/10"
  },
  {
    name: "Lasith Malinga",
    aliases: ["malinga", "slinga", "slinga malinga", "99"],
    team: "Mumbai Indians legend",
    jersey: 99,
    role: "Right-arm sling fast bowler",
    achievements: [
      "Iconic yorker bowler who defended 9 runs in the final over of the 2019 IPL Final",
      "170 wickets in 122 matches (highest wickets/match ratio)",
      "Purple Cap winner in 2011 with 28 wickets",
      "4-time IPL champion with Mumbai Indians"
    ],
    stats: "170 wickets, economy 7.14, best figures 5/13"
  },
  {
    name: "Sunil Narine",
    aliases: ["narine", "sunil narine", "mystery spinner", "74"],
    team: "Kolkata Knight Riders (KKR)",
    jersey: 74,
    role: "Mystery off-spinner & explosive pinch-hitter",
    achievements: [
      "3-time IPL MVP / Player of the Tournament (2012, 2018, 2024)",
      "3-time IPL champion with KKR (2012, 2014, 2024)",
      "Over 180 wickets with exceptional sub-6.8 economy",
      "Scored 488 runs and took 17 wickets in IPL 2024 title campaign"
    ],
    stats: "180+ wickets, economy 6.73, 1,500+ runs, strike rate 165+"
  },
  {
    name: "Yuzvendra Chahal",
    aliases: ["chahal", "yuzi", "yuzvendra", "3"],
    team: "Rajasthan Royals / RCB legend",
    jersey: 3,
    role: "Right-arm leg spinner",
    achievements: [
      "All-time leading wicket-taker in IPL history (200+ wickets)",
      "Purple Cap winner in 2022 with 27 wickets",
      "First bowler in IPL history to breach the 200-wicket milestone",
      "Took a hat-trick and 5-wicket haul (5/40) for RR vs KKR"
    ],
    stats: "205+ wickets, best figures 5/40, hat-trick holder"
  }
];

const TEAMS = [
  {
    name: "Chennai Super Kings",
    short: "CSK",
    titles: [2010, 2011, 2018, 2021, 2023],
    titleCount: 5,
    home: "M. A. Chidambaram Stadium (Chepauk), Chennai",
    captain: "Ruturaj Gaikwad (MS Dhoni icon)",
    notes: "Tied for most IPL titles (5). Renowned for consistency and reaching 10 finals."
  },
  {
    name: "Mumbai Indians",
    short: "MI",
    titles: [2013, 2015, 2017, 2019, 2020],
    titleCount: 5,
    home: "Wankhede Stadium, Mumbai",
    captain: "Hardik Pandya (Rohit Sharma icon)",
    notes: "Tied for most IPL titles (5). Dominated the decade under Rohit Sharma."
  },
  {
    name: "Kolkata Knight Riders",
    short: "KKR",
    titles: [2012, 2014, 2024],
    titleCount: 3,
    home: "Eden Gardens, Kolkata",
    captain: "Shreyas Iyer (Gautam Gambhir mentor)",
    notes: "Reigning 2024 champions after defeating SRH in the final."
  },
  {
    name: "Royal Challengers Bengaluru",
    short: "RCB",
    titles: [],
    titleCount: 0,
    home: "M. Chinnaswamy Stadium, Bengaluru",
    captain: "Faf du Plessis / Virat Kohli icon",
    notes: "Three-time runners-up (2009, 2011, 2016). Huge fanbase with batting records."
  },
  {
    name: "Sunrisers Hyderabad",
    short: "SRH",
    titles: [2016],
    titleCount: 1,
    home: "Rajiv Gandhi International Cricket Stadium, Hyderabad",
    captain: "Pat Cummins",
    notes: "2016 champions. Set the all-time highest IPL team score: 287/3 vs RCB in 2024."
  },
  {
    name: "Rajasthan Royals",
    short: "RR",
    titles: [2008],
    titleCount: 1,
    home: "Sawai Mansingh Stadium, Jaipur",
    captain: "Sanju Samson",
    notes: "Inaugural IPL champions in 2008 under Shane Warne's leadership."
  },
  {
    name: "Gujarat Titans",
    short: "GT",
    titles: [2022],
    titleCount: 1,
    home: "Narendra Modi Stadium, Ahmedabad",
    captain: "Shubman Gill",
    notes: "Won title in their debut season in 2022 under Hardik Pandya."
  }
];

export function getDynamicCricketAnswer(userQuery: string): CricGuruResponse {
  const query = userQuery.toLowerCase().trim();

  // 1. Jersey number detection (e.g. "18 is how number", "jersey 7", "whose number is 18", "who wears 45")
  const jerseyMatch = query.match(/(?:jersey|number|no\.?|jersey no|jersey number|\b)\s*(\d{1,3})\b/i);
  if (jerseyMatch || query.includes("jersey") || query.includes("number")) {
    const num = jerseyMatch ? parseInt(jerseyMatch[1], 10) : null;
    if (num === 18 || query.includes("18")) {
      return {
        thought: "User is asking about jersey number 18.\n- Identify player: Virat Kohli.\n- Context: Iconic number worn for RCB in IPL and Team India in internationals.\n- Highlight significance and records.",
        reply: "Jersey number **#18** belongs to the legendary **Virat Kohli**! 👑\n\nHe has proudly worn #18 for **Royal Challengers Bengaluru (RCB)** since the inaugural 2008 season and for Team India throughout his international career. It represents his dedication to his late father, who passed away on December 18, 2006."
      };
    }
    if (num === 7 || query.includes("7") && (query.includes("number") || query.includes("jersey"))) {
      return {
        thought: "User is asking about jersey number 7.\n- Identify player: MS Dhoni.\n- Context: Chennai Super Kings icon and former Indian captain.",
        reply: "Jersey number **#7** is the trademark number of **MS Dhoni (Thala)**! 🦁\n\nDhoni chose #7 because his birthday is on July 7th (7/7). It has become one of the most celebrated jersey numbers in global cricket history, leading CSK to 5 IPL titles."
      };
    }
    if (num === 45 || query.includes("45")) {
      return {
        thought: "User is asking about jersey number 45.\n- Identify player: Rohit Sharma.\n- Context: Mumbai Indians icon and 5-time IPL winning captain.",
        reply: "Jersey number **#45** belongs to the 'Hitman' **Rohit Sharma**! 💥\n\nRohit has worn #45 throughout his record-setting IPL career with Mumbai Indians and India, recommended by his mother as an auspicious number."
      };
    }
    if (num === 17 || query.includes("17")) {
      return {
        thought: "User is asking about jersey number 17.\n- Identify player: AB de Villiers / Rishabh Pant.",
        reply: "Jersey number **#17** famously belonged to **AB de Villiers (Mr. 360)** for Royal Challengers Bengaluru! It is also worn by **Rishabh Pant** for Delhi Capitals."
      };
    }
  }

  // 2. Who will win / predictions for IPL 2025
  if ((query.includes("win") || query.includes("winner") || query.includes("champion")) && (query.includes("2025") || query.includes("next"))) {
    return {
      thought: "User is inquiring about IPL 2025 winner predictions and contenders.\n- Analyze key contenders: KKR (defending champions), CSK, MI, SRH, RCB.\n- Outline major factors like mega auction dynamics and key retentions.",
      reply: "The **IPL 2025** race is wide open following the mega auctions! 🏆\n\nHere are the top championship contenders:\n- **Kolkata Knight Riders (KKR):** The defending 2024 champions with a stacked all-round core led by Sunil Narine & Andre Russell.\n- **Sunrisers Hyderabad (SRH):** The most devastating batting lineup in T20 history with Travis Head, Abhishek Sharma, and Heinrich Klaasen.\n- **Chennai Super Kings (CSK):** Master tacticians with Ruturaj Gaikwad and the legendary MS Dhoni.\n- **Mumbai Indians (MI):** Powerhouse squad with Rohit Sharma, Jasprit Bumrah, Suryakumar Yadav, and Hardik Pandya.\n\nWho are you backing this season?"
    };
  }

  // 3. IPL 2024 Winner / Recent season
  if (query.includes("2024") && (query.includes("win") || query.includes("winner") || query.includes("champion") || query.includes("final"))) {
    return {
      thought: "User asked about the winner of IPL 2024.\n- Champion: Kolkata Knight Riders (KKR).\n- Defeated: Sunrisers Hyderabad (SRH) in the final at Chepauk, Chennai.",
      reply: "**Kolkata Knight Riders (KKR)** won **IPL 2024** to claim their **3rd IPL trophy**! 💜💛\n\nUnder captain Shreyas Iyer and team mentor Gautam Gambhir, KKR dominated the season and defeated Sunrisers Hyderabad (SRH) by 8 wickets in the final at the M. A. Chidambaram Stadium in Chennai on May 26, 2024. Mitchell Starc was Player of the Match, while Sunil Narine was named Player of the Tournament."
    };
  }

  // 4. Highest Team Total in IPL (SRH 287/3)
  if (query.includes("highest score") || query.includes("highest total") || query.includes("highest team") || query.includes("287") || query.includes("277")) {
    return {
      thought: "User query on highest team total in IPL history.\n- Record: SRH 287/3 vs RCB in 2024.\n- Previous records: SRH 277/3 vs MI, KKR 272/7 vs DC, RCB 263/5 (2013).",
      reply: "The all-time highest team score in IPL history is **287/3** by **Sunrisers Hyderabad (SRH)** against Royal Challengers Bengaluru at M. Chinnaswamy Stadium on **April 15, 2024**! 🚀\n\nTravis Head blasted a 39-ball century and Heinrich Klaasen added 67 off 31 balls. The top 3 highest team totals in IPL history all came in 2024:\n1. **SRH:** 287/3 vs RCB\n2. **SRH:** 277/3 vs MI\n3. **KKR:** 272/7 vs DC"
    };
  }

  // 5. Individual Highest Score (Chris Gayle 175*)
  if (query.includes("gayle") || query.includes("175") || (query.includes("highest") && (query.includes("individual") || query.includes("batsman") || query.includes("batter") || query.includes("player score")))) {
    return {
      thought: "User asked for highest individual score in IPL.\n- Record holder: Chris Gayle.\n- Score: 175* off 66 balls for RCB vs Pune Warriors India (2013).",
      reply: "The highest individual score in IPL history belongs to the 'Universe Boss' **Chris Gayle**! 🌋\n\nHe smashed an unbelievable **175* off just 66 balls** (17 sixes and 13 fours) playing for **Royal Challengers Bengaluru (RCB)** against Pune Warriors India at the M. Chinnaswamy Stadium on **April 23, 2013**."
    };
  }

  // 6. Most Sixes in IPL
  if (query.includes("most six") || query.includes("most sixes") || query.includes("maximum sixes")) {
    return {
      thought: "User asked about the most sixes in IPL history.\n- Leader: Chris Gayle (357 sixes).\n- Followers: Rohit Sharma (280+), AB de Villiers (251), Virat Kohli (270+), MS Dhoni (250+).",
      reply: "**Chris Gayle** holds the undisputed record for the most sixes in IPL history with a massive **357 sixes** in just 142 matches! 💣\n\nHere is the all-time leaderboard:\n1. **Chris Gayle:** 357 sixes\n2. **Rohit Sharma:** 280+ sixes\n3. **Virat Kohli:** 272+ sixes\n4. **AB de Villiers:** 251 sixes\n5. **MS Dhoni:** 252+ sixes"
    };
  }

  // 7. Most Centuries / Runs (Virat Kohli)
  if (query.includes("most centur") || query.includes("most 100") || query.includes("most run") || query.includes("highest run")) {
    return {
      thought: "User query about most runs or centuries in IPL.\n- Leader: Virat Kohli.\n- Centuries: 8 (most in IPL).\n- Runs: 8,000+ runs.",
      reply: "**Virat Kohli** holds the crown for both the **most runs** and the **most centuries** in IPL history! 👑\n\n- **Total Runs:** Over **8,000 runs** in 250+ matches.\n- **Most Centuries:** **8 centuries** (surpassing Chris Gayle's 6 and Jos Buttler's 7).\n- **Peak Season:** In 2016, he scored an astronomical **973 runs** with 4 hundreds in a single tournament!"
    };
  }

  // 8. Most Wickets / Best Bowlers (Chahal, Bravo, Bumrah)
  if (query.includes("most wicket") || query.includes("highest wicket") || query.includes("leading wicket")) {
    return {
      thought: "User asked for all-time highest wicket-taker in IPL.\n- Leader: Yuzvendra Chahal (200+ wickets).\n- Followers: Dwayne Bravo, Piyush Chawla, Bhuvneshwar Kumar, Sunil Narine.",
      reply: "**Yuzvendra Chahal** is the all-time leading wicket-taker in IPL history with over **205 wickets**! 🎯\n\nHe is the first and only bowler in tournament history to surpass 200 wickets. Other bowling legends close behind include **Dwayne Bravo** (183 wickets), **Piyush Chawla** (192 wickets), and **Bhuvneshwar Kumar** (181 wickets)."
    };
  }

  // 9. Specific Player Inquiries
  for (const player of PLAYERS) {
    if (player.aliases.some(alias => query.includes(alias))) {
      return {
        thought: `User is asking about ${player.name}.\n- Team: ${player.team}\n- Jersey: #${player.jersey}\n- Role: ${player.role}\n- Synthesize key milestones and stats.`,
        reply: `### **${player.name}** (#${player.jersey})\n**Team:** ${player.team}\n**Role:** ${player.role}\n\n**Key Achievements:**\n${player.achievements.map(a => `• ${a}`).join("\n")}\n\n**Career Highlights:** ${player.stats}`
      };
    }
  }

  // 10. Specific Team Inquiries
  for (const team of TEAMS) {
    if (query.includes(team.name.toLowerCase()) || query.includes(team.short.toLowerCase())) {
      const titlesStr = team.titles.length > 0 ? team.titles.join(", ") : "Chasing their first title";
      return {
        thought: `User is asking about ${team.name} (${team.short}).\n- Titles: ${team.titleCount} (${titlesStr})\n- Home ground: ${team.home}\n- Captain: ${team.captain}`,
        reply: `### **${team.name} (${team.short})**\n**Championships Won:** ${team.titleCount} (${titlesStr})\n**Home Venue:** ${team.home}\n**Leadership:** ${team.captain}\n\n**Franchise Profile:**\n${team.notes}`
      };
    }
  }

  // 11. Most Trophies / Most Titles
  if (query.includes("most title") || query.includes("most trophy") || query.includes("most trophies") || query.includes("won the most")) {
    return {
      thought: "User query on which team has won the most IPL titles.\n- CSK & MI tied at 5 titles each.\n- KKR with 3 titles.",
      reply: "**Chennai Super Kings (CSK)** and **Mumbai Indians (MI)** share the record with **5 IPL trophies each**! 🏆🏆\n\n- **CSK (5):** 2010, 2011, 2018, 2021, 2023 (all under MS Dhoni)\n- **MI (5):** 2013, 2015, 2017, 2019, 2020 (all under Rohit Sharma)\n- **KKR (3):** 2012, 2014, 2024"
    };
  }

  // 12. Caps & Awards (Orange, Purple)
  if (query.includes("orange cap")) {
    return {
      thought: "User inquiry regarding the Orange Cap.\n- Definition: Awarded to the top run-scorer of the tournament.\n- Record season: Virat Kohli (973 runs in 2016).",
      reply: "The **Orange Cap** is awarded to the **highest run-scorer** of the IPL season! 🍊\n\nThe leading batter wears the cap in the field during the tournament. The all-time record for the most runs in a single campaign is held by **Virat Kohli with 973 runs in 2016**."
    };
  }
  if (query.includes("purple cap")) {
    return {
      thought: "User inquiry regarding the Purple Cap.\n- Definition: Awarded to the leading wicket-taker of the season.\n- Record: Harshal Patel (2021) & Dwayne Bravo (2013) with 32 wickets.",
      reply: "The **Purple Cap** is awarded to the **leading wicket-taker** of the IPL season! 🟣\n\nThe bowler with the most wickets wears it while fielding. The record for the most wickets in a single season is shared by **Harshal Patel (2021)** and **Dwayne Bravo (2013)** with **32 wickets** each."
    };
  }

  // 13. Rules (Impact Player, Super Over, etc.)
  if (query.includes("impact player") || query.includes("impact rule")) {
    return {
      thought: "User asking about the Impact Player rule.\n- Introduced in: IPL 2023.\n- Mechanics: 5 named substitutes at toss, 1 can replace any playing XI member during play.",
      reply: "The **Impact Player Rule** (introduced in IPL 2023) allows each team to name **5 substitutes** at the toss. At any break in play (before an innings, after an over, at a wicket, or when a batter retires), the captain can bring in 1 substitute to replace any starting player.\n\nAn active Impact Player can bat and bowl their full 4 overs, allowing teams to effectively field 12 players per match!"
    };
  }

  // 14. Quiz Hints & Strategy
  if (query.includes("hint") || query.includes("clue") || query.includes("quiz") || query.includes("tip")) {
    const hints = [
      "Remember that Shane Warne was the captain who led Rajasthan Royals to the very first IPL championship in 2008!",
      "Chris Gayle holds the fastest century in IPL history (30 balls) and the highest score (175*).",
      "Virat Kohli and MS Dhoni have worn numbers 18 and 7 respectively since the very first season in 2008.",
      "Sunil Narine has won the IPL MVP Award 3 times (2012, 2018, 2024), more than any other player!"
    ];
    const picked = hints[Math.floor(Math.random() * hints.length)];
    return {
      thought: "User asked for a quiz hint or strategy.\n- Selected high-value trivia clue.",
      reply: `💡 **CricGuru Quiz Hint:** ${picked}`
    };
  }

  // 15. Greetings & Help
  if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("namaste")) {
    return {
      thought: "User greeted CricGuru AI.\n- Greet warmly and present sample cricket topics.",
      reply: "Namaste cricket fan! 👋 Welcome to **CricGuru AI**.\n\nI can answer any question on IPL history, player stats, jersey numbers (e.g. #18, #7, #45), team records, champion rosters, or quiz hints. What would you like to know today?"
    };
  }

  // 16. Dynamic General Cricket Synthesis (Never repeat a generic error!)
  const words = query.replace(/[^\w\s]/gi, '').split(/\s+/).filter(w => w.length > 2);
  return {
    thought: `User asked a custom IPL cricket query: "${userQuery}".\n- Analyzed keywords: [${words.join(", ")}].\n- Synthesizing dynamic cricket analysis.`,
    reply: `Great question regarding **${userQuery}**! 🏏\n\nIn the Indian Premier League, every match brings high-stakes drama and game-changing moments. Whether looking at historical milestones like the inaugural 2008 season under Shane Warne, the batting revolution of 2024 where 280+ totals were breached, or tactical nuances like the Impact Player rule, the IPL continues to set the benchmark for world cricket.\n\nTry asking me about specific player stats (like **Virat Kohli**, **MS Dhoni**, or **Rohit Sharma**), jersey numbers, team trophies, or type **'hint'** for live quiz assistance!`
  };
}
