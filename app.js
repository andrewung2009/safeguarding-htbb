(function () {
  'use strict';

  // ==================== SVG Icons ====================
  var ICONS = {
    'book-open': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
    'shield': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    'message-square': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    'shield-check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>',
    'check-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    'chevron-right': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    'circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>',
    'circle-filled': '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>',
    'video': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
    'file-text': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    'play': '<svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="5 3 19 12 5 21 5 3"/></svg>',
    'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    'arrow-right': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    'alert-triangle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
    'refresh': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
    'phone': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    'mail': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    'external-link': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    'user-check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/></svg>',
    'clipboard-list': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>'
  };

  function icon(name, cls) {
    cls = cls || '';
    return '<span class="icon ' + cls + '">' + (ICONS[name] || ICONS['file-text']) + '</span>';
  }

  // ==================== State ====================
  var STORAGE_KEY = 'htbb-safeguarding-state';
  var state = {
    currentLessonId: '',
    quizAnswers: {},
    discussionTexts: {},
    expandedModules: {}
  };

  var allLessons = [];
  var totalQuizCount = 0;

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { }
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        state.currentLessonId = parsed.currentLessonId || '';
        state.quizAnswers = parsed.quizAnswers || {};
        state.discussionTexts = parsed.discussionTexts || {};
        state.expandedModules = parsed.expandedModules || {};
      }
    } catch (e) { }
  }

  // ==================== Helpers ====================
  function getYoutubeEmbedUrl(url) {
    var match = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/) ||
      url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]+)/) ||
      url.match(/(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)/);
    return match ? 'https://www.youtube.com/embed/' + match[1] : null;
  }

  function escHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function arrEq(a, b) {
    if (a.length !== b.length) return false;
    var sa = a.slice().sort();
    var sb = b.slice().sort();
    for (var i = 0; i < sa.length; i++) {
      if (sa[i] !== sb[i]) return false;
    }
    return true;
  }

  // ==================== COURSE DATA (INLINED) ====================
  var COURSE_DATA = {
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

  // ==================== Build Flat Lesson List ====================
  function buildLessonList() {
    allLessons = [];
    totalQuizCount = 0;
    COURSE_DATA.modules.forEach(function (mod) {
      mod.lessons.forEach(function (lesson) {
        allLessons.push({ moduleId: mod.id, moduleTitle: mod.title, lesson: lesson });
        lesson.blocks.forEach(function (b) {
          if (b.type === 'quiz') totalQuizCount++;
        });
      });
    });
  }

  function getCompletedQuizzes() {
    var count = 0;
    COURSE_DATA.modules.forEach(function (mod) {
      mod.lessons.forEach(function (lesson) {
        lesson.blocks.forEach(function (b) {
          if (b.type === 'quiz') {
            var ans = state.quizAnswers[b.id];
            if (ans && ans.submitted) count++;
          }
        });
      });
    });
    return count;
  }

  function isLessonComplete(lesson) {
    var quizzesDone = true;
    var discsDone = true;
    lesson.blocks.forEach(function (b) {
      if (b.type === 'quiz') {
        var a = state.quizAnswers[b.id];
        if (!a || !a.submitted) quizzesDone = false;
      }
      if (b.type === 'discussion') {
        if (!state.discussionTexts[b.id]) discsDone = false;
      }
    });
    return quizzesDone && discsDone;
  }

  function findCurrentIndex() {
    for (var i = 0; i < allLessons.length; i++) {
      if (allLessons[i].lesson.id === state.currentLessonId) return i;
    }
    return 0;
  }

  // ==================== Render Sidebar ====================
  function renderSidebar() {
    var nav = document.getElementById('sidebarNav');
    var html = '';
    COURSE_DATA.modules.forEach(function (mod) {
      var isOpen = state.expandedModules[mod.id] !== false;
      var allComplete = mod.lessons.every(function (l) { return isLessonComplete(l); });

      html += '<div class="module-group">';
      html += '<button class="module-toggle" data-module="' + mod.id + '">';
      html += '<span class="module-chevron' + (isOpen ? ' open' : '') + '">' + ICONS['chevron-right'] + '</span>';
      html += '<span class="module-toggle-icon">' + (ICONS[mod.icon] || ICONS['book-open']) + '</span>';
      html += '<span style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + escHtml(mod.title) + '</span>';
      if (allComplete) html += '<span class="module-complete-icon">' + ICONS['check-circle'] + '</span>';
      html += '</button>';

      if (isOpen) {
        html += '<div class="lesson-list">';
        mod.lessons.forEach(function (lesson) {
          var isActive = lesson.id === state.currentLessonId;
          var complete = isLessonComplete(lesson);
          var statusIcon;
          if (complete) {
            statusIcon = '<span class="circle-complete">' + ICONS['check-circle'] + '</span>';
          } else if (isActive) {
            statusIcon = '<span class="circle-active">' + ICONS['circle-filled'] + '</span>';
          } else {
            statusIcon = '<span class="circle-empty">' + ICONS['circle'] + '</span>';
          }
          html += '<button class="lesson-btn' + (isActive ? ' active' : '') + '" data-lesson="' + lesson.id + '">';
          html += '<span class="lesson-status">' + statusIcon + '</span>';
          html += '<span class="lesson-label">' + escHtml(lesson.title) + '</span>';
          html += '<span class="lesson-icon">' + (ICONS[lesson.icon] || ICONS['file-text']) + '</span>';
          html += '</button>';
        });
        html += '</div>';
      }
      html += '</div>';
    });
    nav.innerHTML = html;

    nav.querySelectorAll('.module-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var mid = this.getAttribute('data-module');
        state.expandedModules[mid] = state.expandedModules[mid] === false ? true : false;
        saveState();
        renderSidebar();
      });
    });

    nav.querySelectorAll('.lesson-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        state.currentLessonId = this.getAttribute('data-lesson');
        saveState();
        renderSidebar();
        renderContent();
        updateProgress();
        updateNav();
        closeMobileSidebar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // ==================== Render Content ====================
  function renderContent() {
    var container = document.getElementById('contentArea');
    var idx = findCurrentIndex();
    var item = allLessons[idx];
    if (!item) return;

    var lesson = item.lesson;

    var html = '';
    html += '<div class="lesson-header">';
    html += '<p class="lesson-module-label">' + escHtml(item.moduleTitle) + '</p>';
    html += '<h1 class="lesson-title">' + escHtml(lesson.title) + '</h1>';
    html += '</div>';
    html += '<div class="lesson-blocks">';

    lesson.blocks.forEach(function (block) {
      switch (block.type) {
        case 'video': html += renderVideo(block); break;
        case 'quiz': html += renderQuiz(block); break;
        case 'discussion': html += renderDiscussion(block); break;
        case 'scenario': html += renderScenario(block); break;
        case 'text': html += renderText(block); break;
        case 'principles': html += renderPrinciples(block); break;
        case 'officers': html += renderOfficers(block); break;
        case 'links': html += renderLinks(block); break;
        case 'warning': html += renderWarning(block); break;
        case 'safer-recruitment': html += renderSaferRecruitment(block); break;
        case 'declaration': html += renderDeclaration(block); break;
        case 'closing': html += renderClosing(block); break;
      }
    });

    html += '</div>';
    container.innerHTML = html;

    attachQuizListeners();
    attachDiscussionListeners();
    attachDeclarationListeners();
  }

  function renderVideo(block) {
    var embedUrl = block.youtubeUrl ? getYoutubeEmbedUrl(block.youtubeUrl) : null;
    var html = '<div class="video-block">';
    if (embedUrl) {
      html += '<div class="video-wrapper"><iframe src="' + escHtml(embedUrl) + '" title="' + escHtml(block.title || 'Course Video') + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>';
    } else {
      html += '<div class="video-placeholder"><button class="video-play-btn">' + ICONS['play'] + '</button></div>';
    }
    html += '<div class="video-info">';
    if (block.title) html += '<span class="video-info-title">' + escHtml(block.title) + '</span>';
    html += '<span class="video-info-duration">' + ICONS['clock'] + ' ' + escHtml(block.duration) + '</span>';
    html += '</div></div>';
    return html;
  }

  function renderQuiz(block) {
    var existing = state.quizAnswers[block.id];
    var submitted = existing && existing.submitted;
    var isCorrect = existing && existing.isCorrect;
    var isMulti = block.selectMode === 'multi';

    var cardClass = 'quiz-card';
    if (submitted) cardClass += isCorrect ? ' correct' : ' incorrect';

    var html = '<div class="' + cardClass + '" data-quiz-id="' + block.id + '">';
    html += '<div class="quiz-header">';
    html += '<div class="quiz-badges">';
    html += '<span class="badge badge-teal">Q' + block.questionNumber + '</span>';
    if (isMulti) html += '<span class="badge badge-gray">Select ALL that apply</span>';
    if (submitted) {
      html += '<span class="quiz-result ' + (isCorrect ? 'correct' : 'incorrect') + '">';
      html += isCorrect ? ICONS['check-circle'] : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
      html += ' <span class="quiz-result-text">' + (isCorrect ? 'Correct' : 'Incorrect') + '</span></span>';
    }
    html += '</div>';
    html += '<div class="quiz-question">' + escHtml(block.question) + '</div>';
    html += '</div>';

    html += '<div class="quiz-options">';
    block.options.forEach(function (opt) {
      var optClass = 'quiz-option';
      if (submitted) {
        optClass += ' submitted';
        var isCorrectOpt = block.correctAnswers.indexOf(opt.id) !== -1;
        var isSelected = existing.selected.indexOf(opt.id) !== -1;
        if (isCorrectOpt && isSelected) optClass += ' opt-correct';
        else if (!isCorrectOpt && isSelected) optClass += ' opt-wrong';
        else if (isCorrectOpt && !isSelected) optClass += ' opt-missed';
      } else if (existing && existing.selected && existing.selected.indexOf(opt.id) !== -1) {
        optClass += ' selected';
      }

      var inputType = isMulti ? 'checkbox' : 'radio';
      var inputName = 'quiz-' + block.id;
      var checked = existing && existing.selected && existing.selected.indexOf(opt.id) !== -1 ? ' checked' : '';

      html += '<label class="' + optClass + '">';
      html += '<input type="' + inputType + '" name="' + inputName + '" value="' + opt.id + '"' + checked + (submitted ? ' disabled' : '') + '>';
      html += '<span class="quiz-option-label"><strong>' + escHtml(opt.label) + '</strong> ' + escHtml(opt.text) + '</span>';
      if (submitted) {
        var isCorrectOpt2 = block.correctAnswers.indexOf(opt.id) !== -1;
        var isSelected2 = existing.selected.indexOf(opt.id) !== -1;
        if (isCorrectOpt2 && isSelected2) {
          html += '<span class="quiz-option-icon" style="color:var(--emerald-500)">' + ICONS['check-circle'] + '</span>';
        } else if (!isCorrectOpt2 && isSelected2) {
          html += '<span class="quiz-option-icon" style="color:var(--red-500)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span>';
        } else if (isCorrectOpt2) {
          html += '<span class="quiz-option-icon" style="color:var(--emerald-400)">' + ICONS['check-circle'] + '</span>';
        }
      }
      html += '</label>';
    });
    html += '</div>';

    html += '<div class="quiz-actions">';
    if (!submitted) {
      html += '<button class="btn btn-primary btn-sm quiz-submit-btn" data-quiz-id="' + block.id + '">Submit Answer</button>';
    } else {
      html += '<button class="btn btn-outline btn-sm quiz-reset-btn" data-quiz-id="' + block.id + '">' + ICONS['refresh'] + ' Try Again</button>';
    }
    html += '</div>';
    html += '</div>';
    return html;
  }

  function renderDiscussion(block) {
    var savedText = state.discussionTexts[block.id] || '';
    var isSaved = !!savedText;
    var btnClass = isSaved ? 'btn btn-saved btn-sm' : 'btn btn-primary btn-sm';

    var html = '<div class="discussion-card">';
    html += '<div class="discussion-header">';
    html += ICONS['message-square'];
    html += '<span class="badge badge-teal">Reflection</span>';
    html += '<span class="discussion-duration">' + ICONS['clock'] + ' ' + escHtml(block.duration) + '</span>';
    html += '</div>';
    html += '<div class="discussion-prompt">' + escHtml(block.prompt) + '</div>';
    if (block.hint) {
      html += '<p style="padding:0 20px 8px;font-size:13px;color:var(--gray-400);font-style:italic;"><em>' + escHtml(block.hint) + '</em></p>';
    }
    html += '<div class="discussion-body">';
    html += '<textarea class="discussion-textarea" data-disc-id="' + block.id + '" placeholder="Share your thoughts here...">' + escHtml(savedText) + '</textarea>';
    html += '</div>';
    html += '<div class="discussion-footer">';
    html += '<span class="discussion-charcount">' + savedText.length + ' characters</span>';
    html += '<button class="' + btnClass + ' disc-save-btn" data-disc-id="' + block.id + '"' + (isSaved ? ' disabled' : '') + '>';
    if (isSaved) {
      html += ICONS['check-circle'] + ' Saved';
    } else {
      html += 'Save Response';
    }
    html += '</button>';
    html += '</div>';
    html += '</div>';
    return html;
  }

  function renderScenario(block) {
    var html = '<div class="scenario-card">';
    html += '<div class="scenario-header">';
    html += ICONS['alert-triangle'];
    html += '<span class="badge badge-teal">Scenario</span>';
    html += '<span class="scenario-title">' + escHtml(block.title) + '</span>';
    html += '</div>';
    html += '<div class="scenario-body">';
    html += '<p class="scenario-instructions">Instructions: Read the scenario below carefully, then answer the questions that follow. This scenario is fictional and created for the purpose of Safeguarding Training.</p>';
    html += '<div class="scenario-text">' + escHtml(block.content) + '</div>';
    html += '</div>';
    html += '</div>';
    return html;
  }

  function renderText(block) {
    return '<div class="text-block"><p>' + escHtml(block.content) + '</p></div>';
  }

  function renderPrinciples(block) {
    var html = '<div class="principles-section">';
    html += '<div class="principles-heading">' + ICONS['book-open'] + ' <h2 class="principles-title">' + escHtml(block.title) + '</h2></div>';
    html += '<div class="principles-cards">';
    block.sections.forEach(function (sec) {
      html += '<div class="principle-card"><div class="principle-card-inner">';
      html += '<div class="principle-icon">' + ICONS['shield'] + '</div>';
      html += '<div class="principle-content">';
      html += '<h3>' + escHtml(sec.heading) + '</h3>';
      if (sec.content) html += '<p>' + escHtml(sec.content) + '</p>';
      if (sec.items && sec.items.length) {
        html += '<ul class="principle-list">';
        sec.items.forEach(function (item) {
          html += '<li>' + ICONS['check-circle'] + ' <span>' + escHtml(item) + '</span></li>';
        });
        html += '</ul>';
      }
      html += '</div></div></div>';
    });
    html += '</div></div>';
    return html;
  }

  function renderOfficers(block) {
    var officers = [
      { name: "Revd. Eddie Ong", initials: "EO" },
      { name: "Rev. Eddy Chin", initials: "EC" },
      { name: "Annarina Jacob", initials: "AJ" },
      { name: "Karyn Suwito", initials: "KS" },
      { name: "Evelyn Ngui", initials: "EN" }
    ];

    var html = '<div class="officer-section">';
    html += '<div class="officer-heading">' + ICONS['user-check'] + ' <h2>HTBB Safeguarding Officers</h2></div>';
    html += '<div class="officer-grid">';
    officers.forEach(function (officer) {
      html += '<div class="officer-card">';
      html += '<div class="officer-avatar">' + escHtml(officer.initials) + '</div>';
      html += '<div class="officer-info"><h3>' + escHtml(officer.name) + '</h3></div>';
      html += '</div>';
    });
    html += '</div>';
    html += '<div class="contact-box">';
    html += '<div class="contact-row">' + ICONS['phone'] + ' <strong>Hotline:</strong> <a href="tel:+60195556916">+6019-555 6916</a></div>';
    html += '<div class="contact-row">' + ICONS['mail'] + ' <strong>Email:</strong> <a href="mailto:safeguarding@htbb.org">safeguarding@htbb.org</a></div>';
    html += '</div>';
    html += '</div>';
    return html;
  }

  function renderLinks(block) {
    var html = '<div class="links-card">';
    html += '<div class="links-header">' + ICONS['external-link'] + ' <span>' + escHtml(block.title) + '</span></div>';
    html += '<div class="links-list">';
    block.links.forEach(function (link) {
      html += '<a href="' + escHtml(link.url) + '" target="_blank" rel="noopener noreferrer">' + ICONS['arrow-right'] + ' ' + escHtml(link.label) + '</a>';
    });
    html += '</div></div>';
    return html;
  }

  function renderWarning(block) {
    var html = '<div class="warning-banner">';
    html += ICONS['alert-triangle'];
    html += '<p>' + escHtml(block.content) + '</p>';
    html += '</div>';
    return html;
  }

  function renderSaferRecruitment(block) {
    var html = '<div class="safer-recruitment-section">';
    html += '<div class="safer-recruitment-heading">' + ICONS['alert-triangle'] + ' <h2>Safer Recruitment (Required Training)</h2></div>';
    html += '<ul class="safer-recruitment-list">';
    block.items.forEach(function (item) {
      html += '<li>' + ICONS['check-circle'] + ' <span>' + escHtml(item) + '</span></li>';
    });
    html += '</ul></div>';
    return html;
  }

  function renderDeclaration(block) {
    var declarationItems = [
      "I have watched all video lessons and completed all modules in the HTBB Safeguarding Training course.",
      "I have completed all quizzes \u2014 Safeguarding Scenario 1 (Jasmine & Arthur), Scenario 2 (Daniel), and Scenario 3 (Brandon).",
      "I understand what safeguarding means in a church context and why it is important at HTBB.",
      "I understand how to recognise different forms of abuse including physical, emotional, and psychological abuse.",
      "I know how to respond to a safeguarding disclosure and understand I must report concerns to the HTBB Safeguarding Officer within 24 hours.",
      "I understand safeguarding practices required when working with children \u2014 including supervision, physical contact boundaries, and communication guidelines.",
      "I understand how to serve vulnerable adults safely, including maintaining healthy boundaries and avoiding dependency relationships.",
      "I commit to applying these safeguarding principles in my ministry role at HTBB and will raise any concerns with the Safeguarding Officer promptly."
    ];

    var ministryOptions = [
      "Children's Ministry", "Youth Ministry", "Connect Groups",
      "Social Action/Outreach", "Worship Team", "Welcome Team",
      "Alpha Team", "Other"
    ];

    var checkedState = state.declarationChecks || {};

    var html = '<div class="declaration-card">';
    html += '<div class="declaration-header">';
    html += '<h2>Safeguarding Self-Declaration</h2>';
    html += '<p>Fill in all fields and tick each declaration box to officially sign off. Your response will be sent to the HTBB Safeguarding Team.</p>';
    html += '</div>';
    html += '<div class="declaration-body">';

    // Form fields
    html += '<div class="declaration-field"><label>Full Name <span class="required">*</span></label>';
    html += '<input type="text" id="decl-name" placeholder="Enter your full name"></div>';

    html += '<div class="declaration-field"><label>Email Address <span class="required">*</span></label>';
    html += '<input type="email" id="decl-email" placeholder="Enter your email address"></div>';

    html += '<div class="declaration-field"><label>Phone Number</label>';
    html += '<input type="tel" id="decl-phone" placeholder="Enter your phone number"></div>';

    html += '<div class="declaration-field"><label>Ministry / Team <span class="required">*</span></label>';
    html += '<select id="decl-ministry"><option value="">Select your ministry or team</option>';
    ministryOptions.forEach(function (opt) {
      html += '<option value="' + escHtml(opt) + '">' + escHtml(opt) + '</option>';
    });
    html += '</select></div>';

    html += '<div class="declaration-field"><label>Your Role <span class="required">*</span></label>';
    html += '<input type="text" id="decl-role" placeholder="Enter your role (e.g., Volunteer, Leader)"></div>';

    html += '<div class="declaration-field"><label>Date of Completion <span class="required">*</span></label>';
    html += '<input type="date" id="decl-date"></div>';

    // Checkboxes
    html += '<div class="declaration-checkboxes">';
    html += '<h3>Declarations <span style="font-weight:400;font-size:13px;color:var(--gray-500);">(tick all to proceed)</span></h3>';
    html += '<ul class="declaration-checkbox-list" id="decl-checkboxes">';
    declarationItems.forEach(function (item, idx) {
      var id = 'decl-check-' + idx;
      var isChecked = checkedState[id];
      html += '<li' + (isChecked ? ' class="checked"' : '') + '>';
      html += '<input type="checkbox" id="' + id + '" data-decl-check="' + idx + '"' + (isChecked ? ' checked' : '') + '>';
      html += '<label for="' + id + '">' + escHtml(item) + '</label>';
      html += '</li>';
    });
    html += '</ul>';
    html += '</div>';

    // Optional feedback
    html += '<div class="declaration-field"><label>Questions, concerns, or feedback about this training (optional)</label>';
    html += '<textarea id="decl-feedback" rows="3" placeholder="Share any questions or feedback..."></textarea>';
    html += '</div>';

    html += '</div>';

    // Footer
    var allChecked = declarationItems.every(function (_, idx) { return checkedState['decl-check-' + idx]; });
    html += '<div class="declaration-footer">';
    html += '<p class="declaration-feedback ' + (allChecked ? 'ready' : 'pending') + '" id="decl-feedback-text">';
    if (allChecked) {
      html += ICONS['check-circle'] + ' All declarations checked. You may now submit.';
    } else {
      var checked = declarationItems.filter(function (_, idx) { return checkedState['decl-check-' + idx]; }).length;
      html += checked + ' of ' + declarationItems.length + ' declarations checked.';
    }
    html += '</p>';
    html += '<a href="#" class="btn-declaration" id="decl-submit-btn"' + (allChecked ? '' : ' disabled') + ' onclick="return false;">Open Self-Declaration Form</a>';
    html += '</div>';
    html += '</div>';
    return html;
  }

  function renderClosing(block) {
    var html = '<div class="closing-section">';
    html += '<div class="closing-box">';
    html += '<div class="closing-heading">' + ICONS['book-open'] + ' <h2>Required Reading</h2></div>';
    html += '<p class="closing-text">Upon reading all the required documents, you can scan the QR code or click the link below to sign the Self-Declaration Form.</p>';
    html += '<div class="closing-doc-list">';
    block.documents.forEach(function (doc) {
      html += '<div class="closing-doc-item"><div class="closing-doc-icon">' + ICONS['arrow-right'] + '</div><span class="closing-doc-name">' + escHtml(doc) + '</span></div>';
    });
    html += '</div>';
    html += '<div class="completion-card">';
    html += '<div class="completion-emoji">&#127881;</div>';
    html += '<h3>Course Complete!</h3>';
    html += '<p>Thank you for completing the HTBB Safeguarding Course. Your commitment to keeping our church community safe is valued.</p>';
    html += '</div></div></div>';
    return html;
  }

  // ==================== Event Listeners ====================
  function attachQuizListeners() {
    document.querySelectorAll('.quiz-option input').forEach(function (input) {
      input.addEventListener('change', function () {
        var quizId = this.closest('.quiz-card').getAttribute('data-quiz-id');
        if (!state.quizAnswers[quizId]) {
          state.quizAnswers[quizId] = { selected: [], isCorrect: false, submitted: false };
        }
        var answer = state.quizAnswers[quizId];
        if (this.type === 'checkbox') {
          if (this.checked) {
            if (answer.selected.indexOf(this.value) === -1) answer.selected.push(this.value);
          } else {
            answer.selected = answer.selected.filter(function (v) { return v !== this.value; }.bind(this));
          }
        } else {
          answer.selected = [this.value];
        }
        saveState();
      });
    });

    document.querySelectorAll('.quiz-submit-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var quizId = this.getAttribute('data-quiz-id');
        var answer = state.quizAnswers[quizId];
        if (!answer || answer.selected.length === 0) return;

        var quizData = null;
        COURSE_DATA.modules.forEach(function (mod) {
          mod.lessons.forEach(function (lesson) {
            lesson.blocks.forEach(function (b) {
              if (b.type === 'quiz' && b.id === quizId) quizData = b;
            });
          });
        });
        if (!quizData) return;

        var correct = arrEq(answer.selected, quizData.correctAnswers);
        answer.isCorrect = correct;
        answer.submitted = true;
        saveState();
        renderContent();
        renderSidebar();
        updateProgress();
      });
    });

    document.querySelectorAll('.quiz-reset-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var quizId = this.getAttribute('data-quiz-id');
        state.quizAnswers[quizId] = { selected: [], isCorrect: false, submitted: false };
        saveState();
        renderContent();
        renderSidebar();
        updateProgress();
      });
    });
  }

  function attachDiscussionListeners() {
    document.querySelectorAll('.discussion-textarea').forEach(function (ta) {
      var discId = ta.getAttribute('data-disc-id');
      var counter = ta.closest('.discussion-card').querySelector('.discussion-charcount');
      ta.addEventListener('input', function () {
        if (counter) counter.textContent = this.value.length + ' characters';
        var btn = ta.closest('.discussion-card').querySelector('.disc-save-btn');
        if (btn) {
          btn.disabled = false;
          btn.className = 'btn btn-primary btn-sm disc-save-btn';
          btn.innerHTML = 'Save Response';
          btn.setAttribute('data-disc-id', discId);
        }
      });
    });

    document.querySelectorAll('.disc-save-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var discId = this.getAttribute('data-disc-id');
        var textarea = document.querySelector('.discussion-textarea[data-disc-id="' + discId + '"]');
        if (!textarea || !textarea.value.trim()) return;
        state.discussionTexts[discId] = textarea.value.trim();
        saveState();
        this.disabled = true;
        this.className = 'btn btn-saved btn-sm disc-save-btn';
        this.innerHTML = ICONS['check-circle'] + ' Saved';
        this.setAttribute('data-disc-id', discId);
        renderSidebar();
      });
    });
  }

  function attachDeclarationListeners() {
    document.querySelectorAll('[data-decl-check]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        if (!state.declarationChecks) state.declarationChecks = {};
        state.declarationChecks[this.id] = this.checked;
        saveState();
        // Update list item styling
        var li = this.closest('li');
        if (this.checked) {
          li.classList.add('checked');
        } else {
          li.classList.remove('checked');
        }
        // Update footer
        var total = document.querySelectorAll('[data-decl-check]').length;
        var checked = document.querySelectorAll('[data-decl-check]:checked').length;
        var feedback = document.getElementById('decl-feedback-text');
        var submitBtn = document.getElementById('decl-submit-btn');
        if (checked === total) {
          feedback.className = 'declaration-feedback ready';
          feedback.innerHTML = ICONS['check-circle'] + ' All declarations checked. You may now submit.';
          submitBtn.disabled = false;
        } else {
          feedback.className = 'declaration-feedback pending';
          feedback.textContent = checked + ' of ' + total + ' declarations checked.';
          submitBtn.disabled = true;
        }
      });
    });

    var submitBtn = document.getElementById('decl-submit-btn');
    if (submitBtn) {
      submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        // Open the Microsoft Forms link in a new tab
        window.open('https://forms.office.com/Pages/ResponsePage.aspx?id=Vh899lFQb0WqKQNhQLPcZdoUSrKAnglKmUU3TRuuYWhUNlBWR05RVENKUzdHSlNDT1NISzNRT0s2Uy4u', '_blank');
      });
    }
  }

  // ==================== Progress ====================
  function updateProgress() {
    var completed = getCompletedQuizzes();
    var pct = totalQuizCount > 0 ? Math.round((completed / totalQuizCount) * 100) : 0;

    document.getElementById('sidebarProgressText').textContent = completed + ' / ' + totalQuizCount + ' quizzes';
    document.getElementById('sidebarProgressFill').style.width = pct + '%';
    document.getElementById('headerProgressText').textContent = pct + '%';
    document.getElementById('headerProgressFill').style.width = pct + '%';
    document.getElementById('headerQuizCount').textContent = completed + '/' + totalQuizCount + ' quizzes';
  }

  function updateNav() {
    var idx = findCurrentIndex();
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    var navInfo = document.getElementById('navInfo');

    prevBtn.disabled = idx <= 0;
    nextBtn.disabled = idx >= allLessons.length - 1;
    navInfo.textContent = (idx + 1) + ' / ' + allLessons.length;
  }

  // ==================== Mobile Sidebar ====================
  function closeMobileSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('mobileOverlay').classList.remove('visible');
  }

  function openMobileSidebar() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('mobileOverlay').classList.add('visible');
  }

  // ==================== Init ====================
  function init() {
    buildLessonList();
    loadState();

    // Default lesson
    if (!state.currentLessonId || !allLessons.find(function (l) { return l.lesson.id === state.currentLessonId; })) {
      state.currentLessonId = allLessons[0].lesson.id;
      saveState();
    }

    // Default expanded
    COURSE_DATA.modules.forEach(function (mod) {
      if (state.expandedModules[mod.id] === undefined) {
        state.expandedModules[mod.id] = true;
      }
    });

    // Show app
    document.getElementById('loading').style.display = 'none';
    document.getElementById('app').style.display = 'flex';

    // Render
    renderSidebar();
    renderContent();
    updateProgress();
    updateNav();

    // Navigation events
    document.getElementById('mobileMenuBtn').addEventListener('click', openMobileSidebar);
    document.getElementById('sidebarClose').addEventListener('click', closeMobileSidebar);
    document.getElementById('mobileOverlay').addEventListener('click', closeMobileSidebar);

    document.getElementById('prevBtn').addEventListener('click', function () {
      var idx = findCurrentIndex();
      if (idx > 0) {
        state.currentLessonId = allLessons[idx - 1].lesson.id;
        saveState();
        renderSidebar();
        renderContent();
        updateProgress();
        updateNav();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    document.getElementById('nextBtn').addEventListener('click', function () {
      var idx = findCurrentIndex();
      if (idx < allLessons.length - 1) {
        state.currentLessonId = allLessons[idx + 1].lesson.id;
        saveState();
        renderSidebar();
        renderContent();
        updateProgress();
        updateNav();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
