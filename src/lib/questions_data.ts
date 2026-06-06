export interface IPLQuestion {
  id: string;
  body: string;
  options: string[];
  answer: string;
  points: number;
  category: string;
  type: 'multiple-choice' | 'true-false' | 'timed';
}

export const iplQuestions: IPLQuestion[] = [
  // IPL History
  {
    id: "hist-1",
    body: "In which year was the inaugural season of the Indian Premier League (IPL) played?",
    options: ["2007", "2008", "2009", "2010"],
    answer: "2008",
    points: 10,
    category: "IPL History",
    type: "multiple-choice"
  },
  {
    id: "hist-2",
    body: "Which team won the first-ever IPL season in 2008?",
    options: ["Chennai Super Kings", "Rajasthan Royals", "Mumbai Indians", "Deccan Chargers"],
    answer: "Rajasthan Royals",
    points: 10,
    category: "IPL History",
    type: "multiple-choice"
  },
  {
    id: "hist-3",
    body: "Where was the second season of the IPL (2009) hosted due to general elections in India?",
    options: ["United Arab Emirates", "South Africa", "England", "Australia"],
    answer: "South Africa",
    points: 10,
    category: "IPL History",
    type: "multiple-choice"
  },
  {
    id: "hist-4",
    body: "True or False: The Deccan Chargers was the team that won the 2009 IPL tournament.",
    options: ["True", "False"],
    answer: "True",
    points: 10,
    category: "IPL History",
    type: "true-false"
  },
  {
    id: "hist-5",
    body: "Which franchise was suspended for two seasons (2016 and 2017) along with Rajasthan Royals?",
    options: ["Kochi Tuskers Kerala", "Pune Warriors India", "Chennai Super Kings", "Deccan Chargers"],
    answer: "Chennai Super Kings",
    points: 10,
    category: "IPL History",
    type: "multiple-choice"
  },

  // IPL Records
  {
    id: "rec-1",
    body: "Who holds the record for the highest individual score in an IPL match (175* runs)?",
    options: ["Chris Gayle", "Brendon McCullum", "AB de Villiers", "KL Rahul"],
    answer: "Chris Gayle",
    points: 10,
    category: "IPL Records",
    type: "multiple-choice"
  },
  {
    id: "rec-2",
    body: "Who is the all-time leading run-scorer in IPL history (as of the start of 2025)?",
    options: ["Shikhar Dhawan", "Rohit Sharma", "David Warner", "Virat Kohli"],
    answer: "Virat Kohli",
    points: 10,
    category: "IPL Records",
    type: "multiple-choice"
  },
  {
    id: "rec-3",
    body: "Which bowler has taken the most wickets in IPL history?",
    options: ["Lasith Malinga", "Yuzvendra Chahal", "Dwayne Bravo", "Amit Mishra"],
    answer: "Yuzvendra Chahal",
    points: 10,
    category: "IPL Records",
    type: "multiple-choice"
  },
  {
    id: "rec-4",
    body: "Who holds the record for the fastest century in IPL history (off just 30 balls)?",
    options: ["Yusuf Pathan", "Chris Gayle", "David Miller", "Travis Head"],
    answer: "Chris Gayle",
    points: 15,
    category: "IPL Records",
    type: "timed"
  },
  {
    id: "rec-5",
    body: "Who was the first player to hit 350+ sixes in IPL career?",
    options: ["Rohit Sharma", "Chris Gayle", "MS Dhoni", "AB de Villiers"],
    answer: "Chris Gayle",
    points: 10,
    category: "IPL Records",
    type: "multiple-choice"
  },

  // Teams
  {
    id: "team-1",
    body: "Which team has won 5 IPL trophies under Rohit Sharma's captaincy?",
    options: ["Chennai Super Kings", "Mumbai Indians", "Kolkata Knight Riders", "Delhi Capitals"],
    answer: "Mumbai Indians",
    points: 10,
    category: "Teams",
    type: "multiple-choice"
  },
  {
    id: "team-2",
    body: "Which team won the 2022 IPL title in their debut season?",
    options: ["Lucknow Super Giants", "Gujarat Titans", "Punjab Kings", "Sunrisers Hyderabad"],
    answer: "Gujarat Titans",
    points: 10,
    category: "Teams",
    type: "multiple-choice"
  },
  {
    id: "team-3",
    body: "What is the home ground of the Kolkata Knight Riders?",
    options: ["M. Chinnaswamy Stadium", "Eden Gardens", "Wankhede Stadium", "Arjun Jaitley Stadium"],
    answer: "Eden Gardens",
    points: 10,
    category: "Teams",
    type: "multiple-choice"
  },
  {
    id: "team-4",
    body: "True or False: Delhi Capitals was previously named Delhi Daredevils.",
    options: ["True", "False"],
    answer: "True",
    points: 10,
    category: "Teams",
    type: "true-false"
  },
  {
    id: "team-5",
    body: "Which franchise won the IPL final in 2016 against Royal Challengers Bangalore?",
    options: ["Kolkata Knight Riders", "Chennai Super Kings", "Sunrisers Hyderabad", "Mumbai Indians"],
    answer: "Sunrisers Hyderabad",
    points: 10,
    category: "Teams",
    type: "multiple-choice"
  },

  // Players
  {
    id: "play-1",
    body: "Who is the only player to have won the 'Most Valuable Player' award three times in IPL history?",
    options: ["Andre Russell", "Shane Watson", "Virat Kohli", "Sunil Narine"],
    answer: "Sunil Narine",
    points: 15,
    category: "Players",
    type: "timed"
  },
  {
    id: "play-2",
    body: "Which player has played the most matches in IPL history?",
    options: ["Rohit Sharma", "Dinesh Karthik", "MS Dhoni", "Virat Kohli"],
    answer: "MS Dhoni",
    points: 10,
    category: "Players",
    type: "multiple-choice"
  },
  {
    id: "play-3",
    body: "Who has recorded the best bowling figures in an IPL match (6 wickets for 12 runs)?",
    options: ["Alzarri Joseph", "Sohail Tanvir", "Adam Zampa", "Anil Kumble"],
    answer: "Alzarri Joseph",
    points: 15,
    category: "Players",
    type: "multiple-choice"
  },
  {
    id: "play-4",
    body: "True or False: AB de Villiers has won the IPL trophy during his tenure with RCB.",
    options: ["True", "False"],
    answer: "False",
    points: 10,
    category: "Players",
    type: "true-false"
  },
  {
    id: "play-5",
    body: "Who scored the first-ever century in the history of the IPL during the opening match of 2008?",
    options: ["Brendon McCullum", "Sourav Ganguly", "Ricky Ponting", "Matthew Hayden"],
    answer: "Brendon McCullum",
    points: 10,
    category: "Players",
    type: "multiple-choice"
  },

  // Captains
  {
    id: "capt-1",
    body: "Who was the captain of Rajasthan Royals during the first season of the IPL in 2008?",
    options: ["Shane Warne", "Rahul Dravid", "Graeme Smith", "Sanju Samson"],
    answer: "Shane Warne",
    points: 10,
    category: "Captains",
    type: "multiple-choice"
  },
  {
    id: "capt-2",
    body: "Which captain led Kolkata Knight Riders to their first two IPL titles in 2012 and 2014?",
    options: ["Sourav Ganguly", "Gautam Gambhir", "Dinesh Karthik", "Shreyas Iyer"],
    answer: "Gautam Gambhir",
    points: 10,
    category: "Captains",
    type: "multiple-choice"
  },
  {
    id: "capt-3",
    body: "Who captained the Sunrisers Hyderabad during their victorious 2016 campaign?",
    options: ["Kane Williamson", "David Warner", "Shikhar Dhawan", "Pat Cummins"],
    answer: "David Warner",
    points: 10,
    category: "Captains",
    type: "multiple-choice"
  },
  {
    id: "capt-4",
    body: "True or False: Hardik Pandya captained Gujarat Titans to their maiden IPL trophy in 2022.",
    options: ["True", "False"],
    answer: "True",
    points: 10,
    category: "Captains",
    type: "true-false"
  },
  {
    id: "capt-5",
    body: "Who led Mumbai Indians to their first IPL title in the year 2013?",
    options: ["Ricky Ponting", "Harbhajan Singh", "Sachin Tendulkar", "Rohit Sharma"],
    answer: "Rohit Sharma",
    points: 10,
    category: "Captains",
    type: "multiple-choice"
  },

  // Orange Cap
  {
    id: "orng-1",
    body: "Who won the Orange Cap for scoring the most runs in the 2024 IPL season?",
    options: ["Ruturaj Gaikwad", "Travis Head", "Virat Kohli", "Abhishek Sharma"],
    answer: "Virat Kohli",
    points: 10,
    category: "Orange Cap",
    type: "multiple-choice"
  },
  {
    id: "orng-2",
    body: "Who holds the record for scoring the most runs in a single IPL season (973 runs in 2016)?",
    options: ["Jos Buttler", "Virat Kohli", "Shubman Gill", "Chris Gayle"],
    answer: "Virat Kohli",
    points: 10,
    category: "Orange Cap",
    type: "multiple-choice"
  },
  {
    id: "orng-3",
    body: "Who is the only player to have won the Orange Cap three times in IPL history?",
    options: ["Chris Gayle", "David Warner", "Virat Kohli", "Michael Hussey"],
    answer: "David Warner",
    points: 15,
    category: "Orange Cap",
    type: "timed"
  },
  {
    id: "orng-4",
    body: "True or False: Shubman Gill won the Orange Cap in the 2023 IPL season.",
    options: ["True", "False"],
    answer: "True",
    points: 10,
    category: "Orange Cap",
    type: "true-false"
  },
  {
    id: "orng-5",
    body: "Who was the first Indian player to win the Orange Cap, doing so in 2010?",
    options: ["Sachin Tendulkar", "Robin Uthappa", "Virat Kohli", "Suresh Raina"],
    answer: "Sachin Tendulkar",
    points: 10,
    category: "Orange Cap",
    type: "multiple-choice"
  },

  // Purple Cap
  {
    id: "prpl-1",
    body: "Who won the Purple Cap for taking the most wickets in the 2024 IPL season?",
    options: ["Jasprit Bumrah", "Harshal Patel", "Varun Chakaravarthy", "Mitchell Starc"],
    answer: "Harshal Patel",
    points: 10,
    category: "Purple Cap",
    type: "multiple-choice"
  },
  {
    id: "prpl-2",
    body: "Which bowler holds the record for the most wickets in a single IPL season (32 wickets)?",
    options: ["Harshal Patel & Dwayne Bravo", "Lasith Malinga & Kagiso Rabada", "Yuzvendra Chahal & Bhuvneshwar Kumar", "Jasprit Bumrah & Dwayne Bravo"],
    answer: "Harshal Patel & Dwayne Bravo",
    points: 15,
    category: "Purple Cap",
    type: "multiple-choice"
  },
  {
    id: "prpl-3",
    body: "Who is the only bowler to win the Purple Cap in consecutive IPL seasons (2016 and 2017)?",
    options: ["Dwayne Bravo", "Bhuvneshwar Kumar", "Lasith Malinga", "Rashid Khan"],
    answer: "Bhuvneshwar Kumar",
    points: 15,
    category: "Purple Cap",
    type: "timed"
  },
  {
    id: "prpl-4",
    body: "True or False: Mohammad Shami won the Purple Cap in the 2023 IPL season.",
    options: ["True", "False"],
    answer: "True",
    points: 10,
    category: "Purple Cap",
    type: "true-false"
  },
  {
    id: "prpl-5",
    body: "Who was the first bowler to win the Purple Cap in the inaugural IPL season in 2008?",
    options: ["Sohail Tanvir", "Shane Warne", "Sreesanth", "Glenn McGrath"],
    answer: "Sohail Tanvir",
    points: 10,
    category: "Purple Cap",
    type: "multiple-choice"
  },

  // Finals
  {
    id: "fin-1",
    body: "Which team has lost the most number of IPL finals in the tournament history?",
    options: ["Royal Challengers Bengaluru", "Chennai Super Kings", "Mumbai Indians", "Kolkata Knight Riders"],
    answer: "Chennai Super Kings",
    points: 10,
    category: "Finals",
    type: "multiple-choice"
  },
  {
    id: "fin-2",
    body: "In which year did Mumbai Indians win their first IPL title by defeating CSK in the final?",
    options: ["2011", "2013", "2015", "2017"],
    answer: "2013",
    points: 10,
    category: "Finals",
    type: "multiple-choice"
  },
  {
    id: "fin-3",
    body: "Who was named the 'Player of the Match' in the 2024 IPL final between KKR and SRH?",
    options: ["Mitchell Starc", "Sunil Narine", "Venkatesh Iyer", "Shreyas Iyer"],
    answer: "Mitchell Starc",
    points: 15,
    category: "Finals",
    type: "timed"
  },
  {
    id: "fin-4",
    body: "True or False: Sunrisers Hyderabad defeated Royal Challengers Bangalore in the 2016 final by 8 runs.",
    options: ["True", "False"],
    answer: "True",
    points: 10,
    category: "Finals",
    type: "true-false"
  },
  {
    id: "fin-5",
    body: "Which team defeated Chennai Super Kings by 1 wicket/1 run in the finals of 2019?",
    options: ["Kolkata Knight Riders", "Rajasthan Royals", "Mumbai Indians", "Sunrisers Hyderabad"],
    answer: "Mumbai Indians",
    points: 10,
    category: "Finals",
    type: "multiple-choice"
  },

  // Stadiums
  {
    id: "stad-1",
    body: "Which stadium hosted the IPL 2024 final match?",
    options: ["Narendra Modi Stadium, Ahmedabad", "M. A. Chidambaram Stadium, Chennai", "Wankhede Stadium, Mumbai", "Eden Gardens, Kolkata"],
    answer: "M. A. Chidambaram Stadium, Chennai",
    points: 10,
    category: "Stadiums",
    type: "multiple-choice"
  },
  {
    id: "stad-2",
    body: "Which stadium has the largest seating capacity in cricket, hosting several IPL finals?",
    options: ["Eden Gardens", "Melbourne Cricket Ground", "Narendra Modi Stadium", "Wankhede Stadium"],
    answer: "Narendra Modi Stadium",
    points: 10,
    category: "Stadiums",
    type: "multiple-choice"
  },
  {
    id: "stad-3",
    body: "Which IPL stadium is located at HPCA and known for its high altitude and scenic views?",
    options: ["Dharamshala Stadium", "Dehradun Stadium", "Mohali Stadium", "Jaipur Stadium"],
    answer: "Dharamshala Stadium",
    points: 10,
    category: "Stadiums",
    type: "multiple-choice"
  },
  {
    id: "stad-4",
    body: "True or False: Wankhede Stadium is located in Bengaluru.",
    options: ["True", "False"],
    answer: "False",
    points: 10,
    category: "Stadiums",
    type: "true-false"
  },
  {
    id: "stad-5",
    body: "Which stadium is famously referred to as the 'Chepauk' stadium?",
    options: ["M. A. Chidambaram Stadium", "M. Chinnaswamy Stadium", "Rajiv Gandhi Stadium", "PCA Stadium"],
    answer: "M. A. Chidambaram Stadium",
    points: 10,
    category: "Stadiums",
    type: "multiple-choice"
  },

  // IPL Awards
  {
    id: "awd-1",
    body: "Who won the 'Emerging Player of the Tournament' award in the 2024 IPL season?",
    options: ["Yashasvi Jaiswal", "Nitish Kumar Reddy", "Abhishek Sharma", "Rinku Singh"],
    answer: "Nitish Kumar Reddy",
    points: 15,
    category: "IPL Awards",
    type: "timed"
  },
  {
    id: "awd-2",
    body: "Who was the first-ever player to win the 'Player of the Tournament' award in IPL 2008?",
    options: ["Shane Watson", "Shaun Marsh", "Sohail Tanvir", "Yusuf Pathan"],
    answer: "Shane Watson",
    points: 10,
    category: "IPL Awards",
    type: "multiple-choice"
  },
  {
    id: "awd-3",
    body: "Which bowler won the 'Emerging Player' award in the 2022 season playing for Sunrisers Hyderabad?",
    options: ["Umran Malik", "Arshdeep Singh", "Avesh Khan", "Harshal Patel"],
    answer: "Umran Malik",
    points: 10,
    category: "IPL Awards",
    type: "multiple-choice"
  },
  {
    id: "awd-4",
    body: "True or False: Andre Russell has won the Most Valuable Player (MVP) award twice in the IPL.",
    options: ["True", "False"],
    answer: "True",
    points: 10,
    category: "IPL Awards",
    type: "true-false"
  },
  {
    id: "awd-5",
    body: "Which award was introduced in the IPL to recognize the player who has the highest impact rate during the season?",
    options: ["Super Striker of the Season", "Most Valuable Player", "Gamechanger of the Season", "Maximum Sixes Award"],
    answer: "Super Striker of the Season",
    points: 10,
    category: "IPL Awards",
    type: "multiple-choice"
  }
];
