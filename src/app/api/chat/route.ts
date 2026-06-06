export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const query = (message || "").toLowerCase().trim();

    let reply = "";
    let thought = "";

    // Simulated thought processes and rules
    if (query.includes("highest score") || query.includes("gayle") || query.includes("175")) {
      thought = "User is asking about the highest individual score in IPL history.\n- Retrieve record holder: Chris Gayle (175* for RCB vs Pune Warriors India in 2013).\n- Format answer clearly highlighting the score, team, year, and venue.";
      reply = "The highest individual score in IPL history belongs to the legendary **Chris Gayle**! He smashed a record-shattering **175* off just 66 balls** playing for **Royal Challengers Bengaluru (RCB)** against Pune Warriors India at the M. Chinnaswamy Stadium, Bengaluru on **April 23, 2013**.";
    } else if (query.includes("orange cap")) {
      thought = "User wants to know about the Orange Cap.\n- Definition: Awarded to the highest run-scorer of the season.\n- Notable mention: Virat Kohli holds the record for most runs in a single season (973 runs in 2016).";
      reply = "The **Orange Cap** is an award presented annually to the **leading run-scorer** in the IPL season. The player who has scored the most runs wears the cap while fielding. The record for the most runs in a single season is held by **Virat Kohli** with **973 runs in 2016**.";
    } else if (query.includes("purple cap")) {
      thought = "User is asking about the Purple Cap.\n- Definition: Awarded to the leading wicket-taker of the season.\n- Notable mention: Harshal Patel (2021) and Dwayne Bravo (2013) hold the record for most wickets in a single season (32 wickets).";
      reply = "The **Purple Cap** is awarded to the **leading wicket-taker** of the IPL season. The bowler with the most wickets wears it during matches. **Harshal Patel** (2021) and **Dwayne Bravo** (2013) share the record for most wickets in a single season with **32 wickets** each.";
    } else if (query.includes("most title") || query.includes("most trophy") || query.includes("won the most") || query.includes("most trophies")) {
      thought = "User is querying which team has won the most trophies.\n- Retrieve records: Chennai Super Kings (CSK) and Mumbai Indians (MI) are tied with 5 titles each.\n- Kolkata Knight Riders (KKR) follows with 3 titles.";
      reply = "As of 2025, **Chennai Super Kings (CSK)** and **Mumbai Indians (MI)** are tied for the most IPL championships, having won **5 titles** each! \n\nHere's the leaderboard:\n- **CSK:** 2010, 2011, 2018, 2021, 2023\n- **MI:** 2013, 2015, 2017, 2019, 2020\n- **KKR:** 2012, 2014, 2024 (3 titles)";
    } else if (query.includes("impact player")) {
      thought = "User wants an explanation of the Impact Player rule.\n- Introduced in: IPL 2023.\n- Rule detail: Teams name 5 substitutes at the toss; 1 can be used as an 'Impact Player' replacing any starting player at any point during the game.";
      reply = "The **Impact Player rule** (introduced in IPL 2023) allows teams to nominate **5 substitute players** during the toss. During the match, any one of these 5 can replace a member of the starting XI at any break in play (before the start of an inning, after an over, at the fall of a wicket, or when a batsman retires). An active Impact Player can bat and bowl their full quota of overs.";
    } else if (query.includes("hint") || query.includes("clue") || query.includes("quiz")) {
      thought = "User is asking for a tip/hint to perform better in the quiz.\n- Offer strategy: Focus on historical milestones, cap awards (Orange/Purple), captaincy changes, and player stats.\n- Suggestion: Look closely at year 2008 (RR championship) and Gayle's 175* records.";
      reply = "Here's a **CricGuru Quiz Hint**: Pay close attention to historical records! MS Dhoni and Rohit Sharma are the key captains of the 5-time winners. Also, remember that **Virat Kohli** is the only player to play for a single franchise (RCB) since the first season in 2008. Good luck!";
    } else if (query.includes("chinnaswamy")) {
      thought = "User is querying the M. Chinnaswamy Stadium.\n- Home ground: Royal Challengers Bengaluru (RCB).\n- Noted for: Small boundaries, high-scoring matches.";
      reply = "The **M. Chinnaswamy Stadium** in Bengaluru is the iconic home ground of **Royal Challengers Bengaluru (RCB)**. It is famous for its high-altitude, flat pitch, and short boundary lengths, making it a dream venue for batsmen and the site of many massive IPL records!";
    } else if (query.includes("wankhede")) {
      thought = "User is asking about Wankhede Stadium.\n- Home ground: Mumbai Indians (MI).\n- Significance: Host of the 2011 World Cup Final.";
      reply = "The **Wankhede Stadium** in Mumbai is the famous home ground of the **Mumbai Indians (MI)**. It is located right next to the Arabian Sea, meaning the evening sea breeze often assists swing bowlers early in the game!";
    } else if (query.includes("hello") || query.includes("hi") || query.includes("hey") || query.includes("namaste")) {
      thought = "User greets CricGuru AI.\n- Respond warmly and set context for the chat.";
      reply = "Namaste! 👋 Welcome to CricGuru AI. I am here to help you conquer the **IPL Fan Quest**. Ask me any cricket question or type 'hint' to get an edge in the quiz!";
    } else {
      thought = `User asked: "${message}".\n- Match found: No exact record match.\n- Action: Respond as a knowledgeable cricket companion, stating the facts we know and inviting them to ask details.`;
      reply = `Interesting query! While I don't have the real-time scoreboard for that specific match right now, I can tell you all about **IPL records, championship history, rules, and stats**. \n\nTry asking me: \n- *Who won the inaugural IPL in 2008?*\n- *Which bowler has the most wickets?*\n- *What is the Orange Cap?*`;
    }

    return Response.json({ reply, thought });
  } catch (err: any) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
