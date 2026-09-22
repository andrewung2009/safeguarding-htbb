export const COURSE_DATA = {
    courseTitle: "HTBB Safeguarding Training",
    modules: [
      {
        id: "module-1",
        title: "Module 1: Introduction to Safeguarding",
        icon: "book-open",
        lessons: [
          {
            id: "lesson-1-1",
            title: "Introduction to Safeguarding",
            icon: "video",
            blocks: [
              {
                type: "video",
                duration: "2 min 36 sec",
                title: "Introduction to Safeguarding",
                youtubeUrl: "https://www.youtube.com/watch?v=p6CeIkZdroY"
              },
              {
                type: "discussion",
                prompt: "Share one or two key things you learned about safeguarding in the church.",
                hint: "Consider what surprised you, or what feels most relevant to your ministry context.",
                duration: "5 min",
                id: "disc-1-1"
              }
            ]
          }
        ]
      },
      {
        id: "module-2",
        title: "Module 2: Safeguarding and the Gospel",
        icon: "shield",
        lessons: [
          {
            id: "lesson-2-1",
            title: "Safeguarding and the Gospel",
            icon: "video",
            blocks: [
              {
                type: "video",
                duration: "4 min 53 sec",
                title: "Safeguarding and the Gospel",
                youtubeUrl: "https://www.youtube.com/watch?v=u08UeJEki-I"
              },
              {
                type: "discussion",
                prompt: "Why is safeguarding at the heart of our Christian faith? What does Scripture tell us about safeguarding?",
                hint: "Consider what the video revealed about the connection between safeguarding and the Gospel.",
                duration: "5 min",
                id: "disc-2-1"
              }
            ]
          }
        ]
      },
      {
        id: "module-3",
        title: "Module 3: The Scope of Safeguarding",
        icon: "users",
        lessons: [
          {
            id: "lesson-3-1",
            title: "The Scope of Safeguarding",
            icon: "video",
            blocks: [
              {
                type: "video",
                duration: "2 min 57 sec",
                title: "The Scope of Safeguarding",
                youtubeUrl: "https://www.youtube.com/watch?v=T32URxt2NMY"
              },
              {
                type: "discussion",
                prompt: "Who is responsible for safeguarding in the church?",
                duration: "5 min",
                id: "disc-3a"
              },
              {
                type: "officers",
                id: "officers-3"
              },
              {
                type: "links",
                title: "Required Reading",
                links: [
                  { label: "HTBB Safeguarding Page", url: "https://www.htbb.org/safeguarding" },
                  { label: "HTBB Safeguarding Policy", url: "#" },
                  { label: "Behaviour Protocols", url: "#" }
                ]
              },
              {
                type: "safer-recruitment",
                items: [
                  "CHTBB",
                  "HTBB Youth Ministry",
                  "Campus Ministry",
                  "Capture Team",
                  "Social Action",
                  "Security Team",
                  "Connect Group Leaders and Core Team Members",
                  "Family Life Facilitators",
                  "Creche Team",
                  "Ministry Leaders"
                ]
              },
              {
                type: "warning",
                content: "You must complete this entire training course and submit the self-declaration form in Module 7 before beginning your ministry role."
              },
              {
                type: "discussion",
                prompt: "Name the five HTBB Safeguarding Officers and how to contact them.",
                hint: "Refer to the officer contact information above.",
                duration: "5 min",
                id: "disc-3b"
              },
              {
                type: "discussion",
                prompt: "In your ministry context, what situations might present safeguarding risks?",
                hint: "e.g., Connect Group, Children's Ministry, Youth, Social Action.",
                duration: "5 min",
                id: "disc-3c"
              }
            ]
          }
        ]
      },
      {
        id: "module-4",
        title: "Module 4: What is Abuse?",
        icon: "alert-triangle",
        lessons: [
          {
            id: "lesson-4-1",
            title: "Recognising Abuse",
            icon: "video",
            blocks: [
              {
                type: "video",
                duration: "4 min 39 sec",
                title: "What is Abuse? — Abuse and Confidentiality",
                youtubeUrl: "https://www.youtube.com/watch?v=JHQI8osdgrs"
              },
              {
                type: "video",
                duration: "10 min 36 sec",
                title: "Forms of Abuse",
                youtubeUrl: "https://www.youtube.com/watch?v=TIsinZCPCG8"
              },
              {
                type: "discussion",
                prompt: "When might confidentiality need to be broken in a safeguarding situation?",
                hint: "Share one or two surprising things you learned about confidentiality in a safeguarding context.",
                duration: "5 min",
                id: "disc-4-1"
              },
              {
                type: "scenario",
                title: "Safeguarding Scenario 1 — Jasmine & Arthur",
                content: "You are a CHTBB micro-group leader. A CHTBB teacher in your group shares the following situation with you.\n\nRecently, both of you noticed that a mother named Jasmine has started bringing her young son Arthur, who uses a wheelchair, to church.\n\nAfter church one day, Jasmine approached the teacher and asked if they could speak privately. During the conversation, Jasmine became emotional and began to cry.\n\nShe shared that she has been feeling overwhelmed caring for Arthur. Her husband travels frequently for work and their marriage has been under strain.\n\nJasmine also shared something concerning. She said that last week her husband hit Arthur on the leg because Arthur would not go to sleep. She said this has happened a few times before. Arthur now has a small red bruise on his leg.\n\nJasmine also mentioned that her husband often shouts at her, and that she has been struggling to sleep because of stress.\n\nThe teacher is unsure what to do and asks for your thoughts.",
                id: "scenario-1"
              },
              {
                type: "quiz",
                questionNumber: 1,
                question: "The teacher asks what you think about Jasmine and her husband. What would be the most appropriate response?",
                options: [
                  { id: "a", label: "A.", text: "Share your personal opinion about them." },
                  { id: "b", label: "B.", text: "Change the subject and ignore the situation." },
                  { id: "c", label: "C.", text: "Explain that it is not your role to judge the people involved." }
                ],
                correctAnswers: ["c"],
                selectMode: "single",
                id: "q-s1-1"
              },
              {
                type: "quiz",
                questionNumber: 2,
                question: "Becoming increasingly isolated and overwhelmed by caring responsibilities is a risk for:",
                options: [
                  { id: "a", label: "A.", text: "The husband" },
                  { id: "b", label: "B.", text: "The church" },
                  { id: "c", label: "C.", text: "Arthur and Jasmine" },
                  { id: "d", label: "D.", text: "You" },
                  { id: "e", label: "E.", text: "Jasmine" }
                ],
                correctAnswers: ["e"],
                selectMode: "single",
                id: "q-s1-2"
              },
              {
                type: "quiz",
                questionNumber: 3,
                question: "Continued abuse and suffering is a risk for:",
                options: [
                  { id: "a", label: "A.", text: "The husband" },
                  { id: "b", label: "B.", text: "The church" },
                  { id: "c", label: "C.", text: "Arthur and Jasmine" },
                  { id: "d", label: "D.", text: "You" },
                  { id: "e", label: "E.", text: "Jasmine" }
                ],
                correctAnswers: ["c"],
                selectMode: "single",
                id: "q-s1-3"
              },
              {
                type: "quiz",
                questionNumber: 4,
                question: "Is physical abuse a safeguarding concern in this situation?",
                options: [
                  { id: "a", label: "A.", text: "It may be a concern because Jasmine reported shouting." },
                  { id: "b", label: "B.", text: "It is not a concern at present." },
                  { id: "c", label: "C.", text: "It is a concern because Arthur has been deliberately hit." }
                ],
                correctAnswers: ["c"],
                selectMode: "single",
                id: "q-s1-4"
              },
              {
                type: "quiz",
                questionNumber: 5,
                question: "Is emotional or psychological abuse a concern in this situation?",
                options: [
                  { id: "a", label: "A.", text: "Yes — Jasmine reports frequent shouting and emotional distress." },
                  { id: "b", label: "B.", text: "No — shouting is not a safeguarding concern." },
                  { id: "c", label: "C.", text: "No — there is no evidence of emotional harm." }
                ],
                correctAnswers: ["a"],
                selectMode: "single",
                id: "q-s1-5"
              },
              {
                type: "quiz",
                questionNumber: 6,
                question: "What would be the best outcomes in this situation? (Select ALL that apply)",
                options: [
                  { id: "a", label: "A.", text: "Punish Jasmine's husband immediately." },
                  { id: "b", label: "B.", text: "Ensure the safety of Jasmine and Arthur." },
                  { id: "c", label: "C.", text: "Involve the Safeguarding Officer as soon as possible." },
                  { id: "d", label: "D.", text: "Protect the church's reputation so people think abuse does not happen here." },
                  { id: "e", label: "E.", text: "Support the family so they can receive appropriate help and care." }
                ],
                correctAnswers: ["b", "c", "e"],
                selectMode: "multi",
                id: "q-s1-6"
              }
            ]
          }
        ]
      },
      {
        id: "module-5",
        title: "Module 5: How to Respond to Disclosure",
        icon: "message-square",
        lessons: [
          {
            id: "lesson-5-1",
            title: "Responding to Disclosure",
            icon: "video",
            blocks: [
              {
                type: "video",
                duration: "4 min 33 sec",
                title: "How to Respond to Disclosure (4 Rs)",
                youtubeUrl: "https://www.youtube.com/watch?v=gZV1kcBBVr0"
              },
              {
                type: "text",
                content: "Continue working with the Jasmine & Arthur scenario. Answer Questions 7\u20139 based on Safeguarding Scenario 1."
              },
              {
                type: "scenario",
                title: "Safeguarding Scenario 1 — Jasmine & Arthur",
                content: "You are a CHTBB micro-group leader. A CHTBB teacher in your group shares the following situation with you.\n\nRecently, both of you noticed that a mother named Jasmine has started bringing her young son Arthur, who uses a wheelchair, to church.\n\nAfter church one day, Jasmine approached the teacher and asked if they could speak privately. During the conversation, Jasmine became emotional and began to cry.\n\nShe shared that she has been feeling overwhelmed caring for Arthur. Her husband travels frequently for work and their marriage has been under strain.\n\nJasmine also shared something concerning. She said that last week her husband hit Arthur on the leg because Arthur would not go to sleep. She said this has happened a few times before. Arthur now has a small red bruise on his leg.\n\nJasmine also mentioned that her husband often shouts at her, and that she has been struggling to sleep because of stress.\n\nThe teacher is unsure what to do and asks for your thoughts.",
                id: "scenario-1"
              },
              {
                type: "quiz",
                questionNumber: 7,
                question: "What actions would be most appropriate in this situation? (Select TWO)",
                options: [
                  { id: "a", label: "A.", text: "Visit the family to investigate the situation yourself." },
                  { id: "b", label: "B.", text: "Decide not to take the matter further to avoid conflict." },
                  { id: "c", label: "C.", text: "Ensure Jasmine and Arthur continue to feel supported and welcome at church." },
                  { id: "d", label: "D.", text: "Report the concern to the Safeguarding Officer." }
                ],
                correctAnswers: ["c", "d"],
                selectMode: "multi",
                id: "q-s1-7"
              },
              {
                type: "quiz",
                questionNumber: 8,
                question: "When preparing a written record for the Safeguarding Officer, what information should be included? (Select THREE)",
                options: [
                  { id: "a", label: "A.", text: "Who else may be aware of the situation." },
                  { id: "b", label: "B.", text: "Your personal interpretation of events." },
                  { id: "c", label: "C.", text: "The date and time of the conversation." },
                  { id: "d", label: "D.", text: "Your recommendation of what should happen next." },
                  { id: "e", label: "E.", text: "An accurate description of what was said, including exact wording where possible." }
                ],
                correctAnswers: ["a", "c", "e"],
                selectMode: "multi",
                id: "q-s1-8"
              },
              {
                type: "quiz",
                questionNumber: 9,
                question: "How quickly should this concern be reported to the Safeguarding Officer?",
                options: [
                  { id: "a", label: "A.", text: "Within 2\u20134 days" },
                  { id: "b", label: "B.", text: "Within 24 hours" },
                  { id: "c", label: "C.", text: "Only if the situation happens again" },
                  { id: "d", label: "D.", text: "When you next see the Safeguarding Officer at church" }
                ],
                correctAnswers: ["b"],
                selectMode: "single",
                id: "q-s1-9"
              }
            ]
          }
        ]
      },
      {
        id: "module-6",
        title: "Module 6: Practical Safeguarding",
        icon: "shield-check",
        lessons: [
          {
            id: "lesson-6a",
            title: "Serving Safely with Children",
            icon: "book-open",
            blocks: [
              {
                type: "text",
                content: "Safeguarding is not only about responding to abuse when it occurs. It is also about creating ministry environments that reduce the risk of harm and promote safety for everyone."
              },
              {
                type: "principles",
                title: "Practical Safeguarding with Children",
                id: "principles-children",
                sections: [
                  {
                    heading: "Key Principles",
                    content: "Children are a particularly vulnerable group because they depend on adults for care, guidance, and protection. As ministry leaders and volunteers, we are responsible for ensuring that church environments are safe, nurturing, and respectful.",
                    items: [
                      "Always prioritise the child's safety and wellbeing.",
                      "Maintain transparency and accountability.",
                      "Avoid situations where you are alone with a child.",
                      "Respect boundaries in communication and physical contact."
                    ]
                  },
                  {
                    heading: "1. Never Be Alone With a Child",
                    content: "There should always be at least two approved volunteers present when children are in a ministry space. This ensures children are protected, volunteers are accountable, and situations are less likely to be misunderstood.",
                    items: [
                      "If alone: Ensure door remains open, maintain line of sight, move to public space.",
                      "Warning: Volunteers should never intentionally arrange to meet a child alone."
                    ]
                  },
                  {
                    heading: "2. Open and Visible Environments",
                    content: "See-through windows or doors kept open. This allows parents, ministry leaders, and other volunteers to observe activities."
                  },
                  {
                    heading: "3. Appropriate Physical Contact",
                    content: "If a younger child needs assistance, another volunteer should be present and parents informed.",
                    items: [
                      "Acceptable: High fives, handshakes, fist bumps, brief side hugs initiated by child.",
                      "Avoid: Lengthy/full hugs, sitting on lap, tickling, piggyback rides, holding unnecessarily, assisting in restroom."
                    ]
                  },
                  {
                    heading: "4. Communication Boundaries",
                    content: "Communication must be through official channels, in group chats, with parental awareness.",
                    items: [
                      "Volunteers must not: message privately, interact one-on-one on social media, exchange personal details, share personal photos."
                    ]
                  },
                  {
                    heading: "5. Ministry Concern Report",
                    content: "A Ministry Concern Report is for injuries or minor accidents. A Safeguarding Incident Report is for abuse, neglect, or harm. Volunteers should inform the ministry leader, complete the appropriate report, and inform parents."
                  }
                ]
              }
            ]
          },
          {
            id: "lesson-6b",
            title: "Scenario 2 — Daniel",
            icon: "file-text",
            blocks: [
              {
                type: "scenario",
                title: "Safeguarding Scenario 2 — Daniel",
                content: "Daniel recently began serving as a volunteer in the HTBB Children's Ministry.\n\nDuring one Sunday session, several volunteers briefly step out to prepare materials for the next activity. Daniel realises that he is alone in the classroom with one child, Ted, while the other children have already moved to the next station.\n\nLater that morning, Ted trips while playing and scrapes his knee. Daniel helps him up and reassures him. Ted begins to cry and asks for a hug.\n\nAfter the session, Ted's parent thanks Daniel for helping during the class and asks if Daniel could send Ted encouraging messages during the week.\n\nDaniel wants to be supportive but is unsure what the appropriate safeguarding practices are in these situations.",
                id: "scenario-2"
              },
              {
                type: "quiz",
                questionNumber: 1,
                question: "Why is Daniel being alone with Ted a safeguarding concern?",
                options: [
                  { id: "a", label: "A.", text: "Daniel may not know how to manage the situation" },
                  { id: "b", label: "B.", text: "Volunteers should not be alone with a child" },
                  { id: "c", label: "C.", text: "Ted might become bored" },
                  { id: "d", label: "D.", text: "The activity had finished" }
                ],
                correctAnswers: ["b"],
                selectMode: "single",
                id: "q-s2-1"
              },
              {
                type: "quiz",
                questionNumber: 2,
                question: "What would be the most appropriate action for Daniel?",
                options: [
                  { id: "a", label: "A.", text: "Wait in the room alone with Ted" },
                  { id: "b", label: "B.", text: "Ensure the door is open or move to a visible area where others can see them" },
                  { id: "c", label: "C.", text: "Take Ted somewhere private" },
                  { id: "d", label: "D.", text: "Ask Ted to leave" }
                ],
                correctAnswers: ["b"],
                selectMode: "single",
                id: "q-s2-2"
              },
              {
                type: "quiz",
                questionNumber: 3,
                question: "Which of the following is an example of appropriate physical contact?",
                options: [
                  { id: "a", label: "A.", text: "Sitting a child on your lap" },
                  { id: "b", label: "B.", text: "Tickling during playtime" },
                  { id: "c", label: "C.", text: "Piggyback rides" },
                  { id: "d", label: "D.", text: "High fives or handshakes" }
                ],
                correctAnswers: ["d"],
                selectMode: "single",
                id: "q-s2-3"
              },
              {
                type: "quiz",
                questionNumber: 4,
                question: "How should Daniel respond to the request to message Ted during the week?",
                options: [
                  { id: "a", label: "A.", text: "Send private messages to Ted" },
                  { id: "b", label: "B.", text: "Add Ted on social media" },
                  { id: "c", label: "C.", text: "Share his personal phone number" },
                  { id: "d", label: "D.", text: "Explain that communication should happen through ministry channels or group messages" }
                ],
                correctAnswers: ["d"],
                selectMode: "single",
                id: "q-s2-4"
              },
              {
                type: "quiz",
                questionNumber: 5,
                question: "If a child is injured during a ministry session, what should volunteers do? (Select ALL that apply)",
                options: [
                  { id: "a", label: "A.", text: "Inform the ministry leader" },
                  { id: "b", label: "B.", text: "Complete an incident report" },
                  { id: "c", label: "C.", text: "Inform the child's parents or guardians" },
                  { id: "d", label: "D.", text: "Ignore the incident if the child feels better later" }
                ],
                correctAnswers: ["a", "b", "c"],
                selectMode: "multi",
                id: "q-s2-5"
              }
            ]
          },
          {
            id: "lesson-6c",
            title: "Safeguarding Vulnerable Adults",
            icon: "book-open",
            blocks: [
              {
                type: "text",
                content: "Safeguarding is not only about responding to abuse when it occurs. It is also about creating ministry environments that reduce the risk of harm and promote safety for everyone."
              },
              {
                type: "principles",
                title: "Safeguarding Vulnerable Adults",
                id: "principles-adults",
                sections: [
                  {
                    heading: "Who Are Vulnerable Adults?",
                    content: "A vulnerable adult refers to someone who may need additional protection because they may be less able to safeguard themselves from harm, abuse, or exploitation. This may include individuals with learning disabilities, mental health challenges, dementia, substance misuse, physical disabilities, or reduced capacity. Some individuals may only be vulnerable in certain situations, such as during grief, financial hardship, illness, or social isolation. The goal is not to remove independence, but to ensure they are supported, safe, and able to participate meaningfully."
                  },
                  {
                    heading: "1. Empowerment",
                    content: "Where possible, individuals should be supported to make their own decisions and express their wishes. This means listening carefully, respecting their choices, and avoiding taking over decisions unnecessarily."
                  },
                  {
                    heading: "2. Prevention",
                    content: "It is always better to prevent harm before it happens. This includes maintaining clear and healthy ministry boundaries, avoiding situations where unhealthy dependency may develop, and ensuring transparency."
                  },
                  {
                    heading: "3. Proportionality",
                    content: "Safeguarding responses should be appropriate to the level of risk involved. However, any concern involving harm, abuse, or exploitation must always be reported. Never manage serious concerns alone."
                  },
                  {
                    heading: "4. Protection",
                    content: "Extra care should be given to individuals who may be more vulnerable to harm or exploitation, including those with limited support networks, those who struggle to advocate for themselves, and those experiencing crisis or emotional distress."
                  },
                  {
                    heading: "5. Partnership",
                    content: "Safeguarding is never meant to be done alone. Work together with ministry leaders, the Safeguarding team, families or carers, and relevant professionals or organisations when needed."
                  },
                  {
                    heading: "Avoid Dependency Relationships",
                    content: "When one person becomes the only source of support, it can lead to unhealthy emotional dependence, blurred boundaries, and increased safeguarding risks. Instead, involve a wider network: ministry teams, safeguarding officers, pastoral staff, and external professionals."
                  },
                  {
                    heading: "Maintain Healthy Boundaries",
                    content: "Avoid: personal financial support or loans, gifts of significant value, becoming someone's sole source of emotional support, regular one-to-one counselling without oversight, meeting in isolated private settings. If significant support is needed, use appropriate church structures or external services \u2014 not alone."
                  },
                  {
                    heading: "Be Aware of Risks",
                    content: "In rare cases, someone attending church may have a known history of abuse, be under investigation, have previously harmed others, or display concerning behaviour. Do not attempt to handle it alone. Inform a Safeguarding Officer, ministry leader, or HTBB staff member immediately."
                  }
                ]
              }
            ]
          },
          {
            id: "lesson-6d",
            title: "Scenario 3 — Brandon",
            icon: "file-text",
            blocks: [
              {
                type: "scenario",
                title: "Safeguarding Scenario 3 — Brandon",
                content: "Brandon has been attending HTBB regularly for the past six months. During this time, he has built connections with several staff members and church attendees and has shared some of the personal challenges he has been facing, including the breakdown of his marriage, tensions with his former spouse, and financial difficulties.\n\nBrandon typically attends Sunday services and sometimes stays through multiple services in the same day.\n\nIn recent weeks, several people have noticed changes in Brandon's behaviour. He appears more anxious, suspicious of others, and emotionally distressed. On several occasions he has shared that he has been experiencing thoughts about harming himself and feelings of hopelessness.\n\nA friend of Brandon's, Tom, has also expressed concern. Tom shared that Brandon recently left the hospital before completing a planned psychiatric admission that had been arranged to support his mental health.\n\nDuring the same week, a church member reported that Brandon had sent messages that made them uncomfortable, including comments suggesting he could introduce women to him, along with messages referring to his distressing thoughts about harming himself.\n\nAnother church member reported feeling uncomfortable when Brandon expressed romantic interest and asked her out. Although she tried to end the conversation, Brandon followed her for a short distance, which made her feel uneasy.\n\nBecause of these concerns, a safeguarding report has been submitted to the Safeguarding Officers.",
                id: "scenario-3"
              },
              {
                type: "quiz",
                questionNumber: 1,
                question: "Why might Brandon be considered a vulnerable adult?",
                options: [
                  { id: "a", label: "A.", text: "He attends church regularly" },
                  { id: "b", label: "B.", text: "He is going through a divorce" },
                  { id: "c", label: "C.", text: "He appears to be experiencing mental health challenges and emotional distress" },
                  { id: "d", label: "D.", text: "He stays through several services" }
                ],
                correctAnswers: ["c"],
                selectMode: "single",
                id: "q-s3-1"
              },
              {
                type: "quiz",
                questionNumber: 2,
                question: "What safeguarding concerns are raised in this situation? (Select ALL that apply)",
                options: [
                  { id: "a", label: "A.", text: "Brandon expressing thoughts about harming himself" },
                  { id: "b", label: "B.", text: "Messages that made church members uncomfortable" },
                  { id: "c", label: "C.", text: "Following a church member after she tried to leave the conversation" },
                  { id: "d", label: "D.", text: "Brandon attending multiple services" },
                  { id: "e", label: "E.", text: "Leaving hospital before completing psychiatric care" }
                ],
                correctAnswers: ["a", "b", "c", "e"],
                selectMode: "multi",
                id: "q-s3-2"
              },
              {
                type: "quiz",
                questionNumber: 3,
                question: "Who may be at risk in this situation? (Select ALL that apply)",
                options: [
                  { id: "a", label: "A.", text: "Brandon himself" },
                  { id: "b", label: "B.", text: "The woman who felt uncomfortable" },
                  { id: "c", label: "C.", text: "Other church members interacting with Brandon" },
                  { id: "d", label: "D.", text: "The Safeguarding Officers" },
                  { id: "e", label: "E.", text: "The wider church community" }
                ],
                correctAnswers: ["a", "b", "c", "e"],
                selectMode: "multi",
                id: "q-s3-3"
              },
              {
                type: "quiz",
                questionNumber: 4,
                question: "If Brandon begins relying heavily on one church member for emotional support, what is the most appropriate response?",
                options: [
                  { id: "a", label: "A.", text: "Continue supporting him privately" },
                  { id: "b", label: "B.", text: "Avoid speaking with him" },
                  { id: "c", label: "C.", text: "Ensure support involves ministry leaders or Safeguarding Officers" },
                  { id: "d", label: "D.", text: "Tell him to stop sharing his struggles" }
                ],
                correctAnswers: ["c"],
                selectMode: "single",
                id: "q-s3-4"
              },
              {
                type: "quiz",
                questionNumber: 5,
                question: "If someone attending church raises safeguarding concerns, what should you do?",
                options: [
                  { id: "a", label: "A.", text: "Ignore the situation" },
                  { id: "b", label: "B.", text: "Confront the person directly" },
                  { id: "c", label: "C.", text: "Discuss it widely with others" },
                  { id: "d", label: "D.", text: "Inform a Safeguarding Officer, ministry leader, or HTBB staff member" }
                ],
                correctAnswers: ["d"],
                selectMode: "single",
                id: "q-s3-5"
              },
              {
                type: "quiz",
                questionNumber: 6,
                question: "Which statement best reflects healthy safeguarding practice when supporting vulnerable adults?",
                options: [
                  { id: "a", label: "A.", text: "One church member should take responsibility for supporting the person" },
                  { id: "b", label: "B.", text: "Church members should avoid interacting with vulnerable adults" },
                  { id: "c", label: "C.", text: "Care should involve ministry leaders, Safeguarding Officers, and appropriate boundaries" },
                  { id: "d", label: "D.", text: "The situation should be handled privately" }
                ],
                correctAnswers: ["c"],
                selectMode: "single",
                id: "q-s3-6"
              }
            ]
          }
        ]
      },
      {
        id: "module-7",
        title: "Module 7: Resources & Self-Declaration",
        icon: "check-circle",
        lessons: [
          {
            id: "lesson-7-1",
            title: "Resources & Self-Declaration",
            icon: "clipboard-list",
            blocks: [
              {
                type: "text",
                content: "Well done on completing the HTBB Safeguarding Training course! As a final step, please review the required resources and complete your self-declaration form to officially sign off on this training."
              },
              {
                type: "officers",
                id: "officers-7"
              },
              {
                type: "links",
                title: "Required Resources",
                links: [
                  { label: "HTBB Safeguarding Policy", url: "#" },
                  { label: "Staff & Volunteer Behaviour Protocols", url: "#" },
                  { label: "Safeguarding Handbook", url: "#" },
                  { label: "Incident Reporting Form", url: "#" }
                ]
              },
              {
                type: "declaration",
                id: "declaration-1"
              }
            ]
          }
        ]
      }
    ]
  };
