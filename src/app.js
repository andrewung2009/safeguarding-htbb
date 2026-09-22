import { ICONS } from './icons.js';
import { escHtml, arrEq, getYoutubeEmbedUrl } from './utils.js';
import { state, saveState, loadState } from './state.js';
import { COURSE_DATA } from './course-data.js';

let allLessons = [];
let totalQuizCount = 0;

function buildLessonList() {
  allLessons = [];
  totalQuizCount = 0;
  COURSE_DATA.modules.forEach(function (mod) {
    mod.lessons.forEach(function (lesson) {
      allLessons.push({ moduleId: mod.id, moduleTitle: mod.title, moduleIcon: mod.icon, lesson: lesson });
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

function isBlockComplete(block) {
  if (block.type === 'quiz') {
    var a = state.quizAnswers[block.id];
    return a && a.submitted;
  }
  if (block.type === 'discussion') {
    return !!state.discussionTexts[block.id];
  }
  return true;
}

function findCurrentIndex() {
  for (var i = 0; i < allLessons.length; i++) {
    if (allLessons[i].lesson.id === state.currentLessonId) return i;
  }
  return 0;
}

function getCurrentLesson() {
  var idx = findCurrentIndex();
  return allLessons[idx] || null;
}

function getModuleProgress(mod) {
  var total = 0;
  var done = 0;
  mod.lessons.forEach(function (l) {
    l.blocks.forEach(function (b) {
      if (b.type === 'quiz' || b.type === 'discussion') {
        total++;
        if (isBlockComplete(b)) done++;
      }
    });
  });
  return total > 0 ? Math.round((done / total) * 100) : 100;
}

function getOverallProgress() {
  var completed = getCompletedQuizzes();
  return totalQuizCount > 0 ? Math.round((completed / totalQuizCount) * 100) : 0;
}

/* =============================================
   HUB VIEW
   ============================================= */
function renderHub() {
  var container = document.getElementById('contentArea');
  var pct = getOverallProgress();
  var completed = getCompletedQuizzes();

  var html = '';
  html += '<div class="hub-view">';
  html += '<div class="hub-hero">';
  html += '<div class="hub-hero-logo"><img src="./htbb-logo.png" alt="HTBB"></div>';
  html += '<h1 class="hub-hero-title">Safeguarding Training</h1>';
  html += '<p class="hub-hero-subtitle">Complete all modules to finish the course</p>';
  html += '<div class="hub-hero-stats">';
  html += '<div class="hub-stat-ring">';
  html += '<svg viewBox="0 0 120 120" class="hub-ring-svg">';
  html += '<circle cx="60" cy="60" r="52" fill="none" stroke="var(--slate-100)" stroke-width="8"/>';
  html += '<circle cx="60" cy="60" r="52" fill="none" stroke="var(--teal-500)" stroke-width="8" stroke-linecap="round" stroke-dasharray="' + (2 * Math.PI * 52) + '" stroke-dashoffset="' + (2 * Math.PI * 52 * (1 - pct / 100)) + '" transform="rotate(-90 60 60)" class="hub-ring-fill"/>';
  html += '<text x="60" y="60" text-anchor="middle" dominant-baseline="central" class="hub-ring-text">' + pct + '%</text>';
  html += '</svg>';
  html += '</div>';
  html += '<div class="hub-stat-details">';
  html += '<div class="hub-stat-row"><span class="hub-stat-num">' + completed + '/' + totalQuizCount + '</span><span class="hub-stat-label">quizzes completed</span></div>';
  html += '<div class="hub-stat-row"><span class="hub-stat-num">' + allLessons.length + '</span><span class="hub-stat-label">lessons total</span></div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';

  if (state.currentLessonId && state.currentBlockIndex > 0) {
    var resumeItem = allLessons.find(function (l) { return l.lesson.id === state.currentLessonId; });
    if (resumeItem && !isLessonComplete(resumeItem.lesson)) {
      var rBlocks = resumeItem.lesson.blocks;
      html += '<div class="hub-resume" id="hubResumeBtn">';
      html += '<div class="hub-resume-content">';
      html += '<div class="hub-resume-label">Continue where you left off</div>';
      html += '<div class="hub-resume-title">' + escHtml(resumeItem.lesson.title) + '</div>';
      html += '<div class="hub-resume-meta">' + escHtml(resumeItem.moduleTitle) + '</div>';
      html += '<div class="hub-resume-step">Step ' + (state.currentBlockIndex + 1) + ' of ' + rBlocks.length + '</div>';
      html += '</div>';
      html += '<div class="hub-resume-btn">Resume<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg></div>';
      html += '</div>';
    }
  }

  html += '<div class="hub-modules">';
  COURSE_DATA.modules.forEach(function (mod, modIdx) {
    var modPct = getModuleProgress(mod);
    var allComplete = mod.lessons.every(function (l) { return isLessonComplete(l); });
    var lessonsComplete = mod.lessons.filter(function (l) { return isLessonComplete(l); }).length;
    var gradIdx = (modIdx % 7) + 1;

    html += '<button class="hub-module-card' + (allComplete ? ' complete' : '') + '" data-module="' + mod.id + '" style="animation:cardSlideIn 0.5s var(--ease-out) ' + (modIdx * 0.08) + 's both">';
    html += '<span class="hub-module-number">' + String(modIdx + 1).padStart(2, '0') + '</span>';
    html += '<div class="hub-module-header">';
    html += '<div class="hub-module-icon gradient-' + gradIdx + '">' + (ICONS[mod.icon] || ICONS['book-open']) + '</div>';
    if (allComplete) html += '<div class="hub-module-check">' + ICONS['check-circle'] + '</div>';
    html += '</div>';
    html += '<h3 class="hub-module-title">' + escHtml(mod.title.replace(/^Module \d+:\s*/, '')) + '</h3>';
    var currentLesson = mod.lessons.find(function (l) { return !isLessonComplete(l); }) || mod.lessons[mod.lessons.length - 1];
    if (allComplete) {
      html += '<p class="hub-module-meta">All lessons complete</p>';
    } else {
      html += '<p class="hub-module-meta">' + escHtml(currentLesson.title) + '</p>';
    }
    html += '<div class="hub-module-progress">';
    html += '<div class="hub-module-progress-fill" style="width:' + modPct + '%"></div>';
    html += '</div>';
    html += '</button>';
  });
  html += '</div>';
  html += '</div>';

  container.innerHTML = html;

  container.querySelectorAll('.hub-module-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var modId = this.getAttribute('data-module');
      var mod = COURSE_DATA.modules.find(function (m) { return m.id === modId; });
      if (!mod || !mod.lessons.length) return;
      var firstIncomplete = mod.lessons.find(function (l) { return !isLessonComplete(l); });
      var target = firstIncomplete || mod.lessons[0];
      enterLesson(target.id);
    });
  });

  var resumeBtn = document.getElementById('hubResumeBtn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', function () {
      enterLesson(state.currentLessonId);
    });
  }
}

/* =============================================
   LESSON VIEW — Progressive Disclosure
   ============================================= */
function enterLesson(lessonId) {
  var isResuming = (state.currentLessonId === lessonId);
  state.view = 'lesson';
  state.currentLessonId = lessonId;
  if (!isResuming) {
    state.currentBlockIndex = 0;
  }
  saveState();
  renderLessonView();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function backToHub() {
  state.view = 'hub';
  saveState();
  renderHub();
  updateHeader();
}

function renderLessonView() {
  var container = document.getElementById('contentArea');
  var item = getCurrentLesson();
  if (!item) { backToHub(); return; }

  var lesson = item.lesson;
  var blocks = lesson.blocks;
  var idx = state.currentBlockIndex;
  if (idx >= blocks.length) idx = blocks.length - 1;
  if (idx < 0) idx = 0;
  state.currentBlockIndex = idx;

  var html = '';
  html += '<div class="lesson-view">';

  html += '<div class="lesson-header">';
  html += '<p class="lesson-module-label">' + escHtml(item.moduleTitle) + '</p>';
  html += '<h1 class="lesson-title">' + escHtml(lesson.title) + '</h1>';
  html += '<div class="lesson-step-indicator">';
  var pctProgress = blocks.length > 1 ? Math.round((idx / (blocks.length - 1)) * 100) : 100;
  html += '<div class="lesson-progress-track"><div class="lesson-progress-fill" style="width:' + pctProgress + '%"></div></div>';
  html += '<span class="step-label">' + (idx + 1) + ' / ' + blocks.length + '</span>';
  html += '</div>';
  html += '</div>';

  var blockTypeLabels = { video:'Video', quiz:'Quiz', discussion:'Reflection', scenario:'Scenario', text:'Reading', principles:'Key Principles', officers:'Safeguarding Officers', links:'Resources', warning:'Important Notice', 'safer-recruitment':'Safer Recruitment', declaration:'Self-Declaration', closing:'Summary' };
  var blockTypeIcons = { video:'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', quiz:'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', discussion:'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', scenario:'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z', text:'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' };
  var currentBlock = blocks[idx];
  var typeLabel = blockTypeLabels[currentBlock.type] || currentBlock.type;
  var typeSvg = blockTypeIcons[currentBlock.type] || '';

  html += '<div class="lesson-blocks-progressive">';
  html += '<div class="block-type-pill type-' + currentBlock.type + '">';
  if (typeSvg) html += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="' + typeSvg + '"/></svg>';
  html += typeLabel;
  html += '</div>';
  html += '<div class="block-container block-enter">';
  html += renderBlock(currentBlock);
  html += '</div>';

  if (idx >= blocks.length - 1) {
    html += '<div class="block-next-area">';
    html += '<div class="lesson-complete-banner">';
    html += '<div class="completion-emoji">&#127881;</div>';
    html += '<h3>Lesson Complete!</h3>';
    html += '<p>You\'ve finished this lesson. Great work!</p>';
    html += '<div class="lesson-complete-actions">';
    html += '<button class="btn btn-outline" id="backToHubBtn">Back to Modules</button>';
    var nextLessonIdx = findCurrentIndex() + 1;
    if (nextLessonIdx < allLessons.length) {
      html += '<button class="btn btn-primary" id="nextLessonBtn">Next Lesson &rarr;</button>';
    }
    html += '</div>';
    html += '</div>';
    html += '</div>';
  }

  html += '</div>';
  html += '</div>';
  html += '</div>';

  container.innerHTML = html;

  attachQuizListeners();
  attachDiscussionListeners();
  attachDeclarationListeners();

  var backBtn = document.getElementById('backToHubBtn');
  if (backBtn) {
    backBtn.addEventListener('click', function () { backToHub(); });
  }

  var nextLessonBtn = document.getElementById('nextLessonBtn');
  if (nextLessonBtn) {
    nextLessonBtn.addEventListener('click', function () {
      var nextIdx = findCurrentIndex() + 1;
      if (nextIdx < allLessons.length) {
        enterLesson(allLessons[nextIdx].lesson.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  updateHeader();
  updateBottomNav();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function advanceBlock() {
  var item = getCurrentLesson();
  if (!item) return;
  var blocks = item.lesson.blocks;
  if (state.currentBlockIndex < blocks.length - 1) {
    state.currentBlockIndex++;
    saveState();
    renderLessonView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function prevBlock() {
  if (state.currentBlockIndex > 0) {
    state.currentBlockIndex--;
    saveState();
    renderLessonView();
  }
}

function renderBlock(block) {
  switch (block.type) {
    case 'video': return renderVideo(block);
    case 'quiz': return renderQuiz(block);
    case 'discussion': return renderDiscussion(block);
    case 'scenario': return renderScenario(block);
    case 'text': return renderText(block);
    case 'principles': return renderPrinciples(block);
    case 'officers': return renderOfficers(block);
    case 'links': return renderLinks(block);
    case 'warning': return renderWarning(block);
    case 'safer-recruitment': return renderSaferRecruitment(block);
    case 'declaration': return renderDeclaration(block);
    case 'closing': return renderClosing(block);
    default: return '';
  }
}

/* =============================================
   HEADER & NAV
   ============================================= */
function updateHeader() {
  var backBtn = document.getElementById('headerBackBtn');
  var progressWrap = document.getElementById('headerProgressWrap');
  var statsWrap = document.getElementById('headerStatsWrap');

  if (state.view === 'hub') {
    backBtn.style.display = 'none';
    progressWrap.style.display = 'none';
    statsWrap.style.display = 'flex';
  } else {
    backBtn.style.display = 'flex';
    progressWrap.style.display = 'none';
    statsWrap.style.display = 'none';
  }

  var completed = getCompletedQuizzes();
  document.getElementById('headerQuizCount').textContent = completed + '/' + totalQuizCount + ' quizzes';
}

function updateBottomNav() {
  var bottomNav = document.getElementById('bottomNav');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var blockSteps = document.getElementById('blockSteps');

  if (state.view !== 'lesson') {
    bottomNav.style.display = 'none';
    return;
  }
  bottomNav.style.display = 'flex';

  var item = getCurrentLesson();
  if (!item) return;
  var blocks = item.lesson.blocks;
  var idx = state.currentBlockIndex;

  prevBtn.disabled = idx <= 0;

  if (idx >= blocks.length - 1) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'inline-flex';
    var block = blocks[idx];
    var needsAction = block.type === 'quiz' || block.type === 'discussion';
    var canAdvance = needsAction ? isBlockComplete(block) : true;
    nextBtn.disabled = !canAdvance;
    nextBtn.querySelector('span').textContent = canAdvance ? 'Next Step' : 'Complete to continue';
  }

  var dotsHtml = '';
  for (var i = 0; i < blocks.length; i++) {
    var cls = 'nav-dot';
    if (i < idx) cls += ' done';
    else if (i === idx) cls += ' current';
    dotsHtml += '<div class="' + cls + '"></div>';
  }
  blockSteps.innerHTML = dotsHtml;
}

/* =============================================
   BLOCK RENDERERS
   ============================================= */
function renderVideo(block) {
  var embedUrl = block.youtubeUrl ? getYoutubeEmbedUrl(block.youtubeUrl) : null;
  var html = '<div class="video-block">';
  if (embedUrl) {
    html += '<div class="video-wrapper">';
    html += '<iframe width="963" height="542" src="' + escHtml(embedUrl) + '" title="' + escHtml(block.title || 'Course Video') + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
    html += '</div>';
  }
  html += '</div>';
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
    html += ' <span class="quiz-result-text">' + (isCorrect ? 'Correct!' : 'Incorrect') + '</span></span>';
    if (isCorrect) {
      html += '<span class="quiz-success-feedback">' + ICONS['check-circle'] + ' Well done!</span>';
    }
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
  } else if (!isCorrect) {
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
    html += '<p class="discussion-hint"><em>' + escHtml(block.hint) + '</em></p>';
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

  html += '<div class="declaration-checkboxes">';
  html += '<h3>Declarations <span style="font-weight:400;font-size:13px;color:var(--slate-400);">(tick all to proceed)</span></h3>';
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

  html += '<div class="declaration-field"><label>Questions, concerns, or feedback about this training (optional)</label>';
  html += '<textarea id="decl-feedback" rows="3" placeholder="Share any questions or feedback..."></textarea>';
  html += '</div>';

  html += '</div>';

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

/* =============================================
   CONFETTI
   ============================================= */
function launchConfetti(originEl) {
  var container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);

  var rect = originEl ? originEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 3, width: 0 };
  var cx = rect.left + rect.width / 2;
  var cy = rect.top;

  var colors = ['#14b8a6', '#10b981', '#0d9488', '#059669', '#2dd4bf', '#99f6e4', '#06b6d4', '#67e8f9'];
  var pieces = 16;

  for (var i = 0; i < pieces; i++) {
    var piece = document.createElement('div');
    piece.className = 'confetti-piece';
    var color = colors[Math.floor(Math.random() * colors.length)];
    var x = cx + (Math.random() - 0.5) * 160;
    var y = cy + (Math.random() - 0.5) * 20;
    var size = 5 + Math.random() * 6;
    var duration = 1 + Math.random() * 0.8;
    var delay = Math.random() * 0.3;
    var rotation = Math.random() * 720;

    piece.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + size + 'px;height:' + size + 'px;' +
      'background:' + color + ';animation-duration:' + duration + 's;animation-delay:' + delay + 's;' +
      'transform:rotate(' + rotation + 'deg);border-radius:' + (Math.random() > 0.5 ? '50%' : '2px') + ';';
    container.appendChild(piece);
  }

  setTimeout(function () {
    if (container.parentNode) container.parentNode.removeChild(container);
  }, 2500);
}

/* =============================================
   QUIZ CARD IN-PLACE UPDATE
   ============================================= */
function updateQuizCard(quizId) {
  var quizData = null;
  COURSE_DATA.modules.forEach(function (mod) {
    mod.lessons.forEach(function (lesson) {
      lesson.blocks.forEach(function (b) {
        if (b.type === 'quiz' && b.id === quizId) quizData = b;
      });
    });
  });
  if (!quizData) return;

  var existingCard = document.querySelector('.quiz-card[data-quiz-id="' + quizId + '"]');
  if (!existingCard) return;

  var newHtml = renderQuiz(quizData);
  var temp = document.createElement('div');
  temp.innerHTML = newHtml;
  var parsed = temp.firstElementChild;
  existingCard.className = parsed.className;
  existingCard.innerHTML = parsed.innerHTML;

  var updatedCard = existingCard;

  var submitBtn = updatedCard.querySelector('.quiz-submit-btn');
  if (submitBtn) {
    submitBtn.addEventListener('click', function () {
      var answer = state.quizAnswers[quizId];
      if (!answer || answer.selected.length === 0) return;
      var correct = arrEq(answer.selected, quizData.correctAnswers);
      answer.isCorrect = correct;
      answer.submitted = true;
      saveState();
      if (correct) launchConfetti(updatedCard);
      updateQuizCard(quizId);
      updateHeader();
      updateBottomNav();
    });
  }

  var resetBtn = updatedCard.querySelector('.quiz-reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      state.quizAnswers[quizId] = { selected: [], isCorrect: false, submitted: false };
      saveState();
      updateQuizCard(quizId);
      updateHeader();
      updateBottomNav();
    });
  }

  var isMulti = quizData.selectMode === 'multi';
  updatedCard.querySelectorAll('.quiz-option input').forEach(function (input) {
    input.addEventListener('change', function () {
      var answer = state.quizAnswers[quizId];
      if (!answer) {
        answer = { selected: [], isCorrect: false, submitted: false };
        state.quizAnswers[quizId] = answer;
      }
      if (isMulti) {
        if (this.checked) {
          if (answer.selected.indexOf(this.value) === -1) answer.selected.push(this.value);
        } else {
          answer.selected = answer.selected.filter(function (v) { return v !== this.value; });
        }
      } else {
        answer.selected = [this.value];
      }
      saveState();
    });
  });
}

/* =============================================
   EVENT LISTENERS
   ============================================= */
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

      if (correct) {
        launchConfetti(this.closest('.quiz-card'));
      }

      updateQuizCard(quizId);
      updateHeader();
      updateBottomNav();
    });
  });

  document.querySelectorAll('.quiz-reset-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var quizId = this.getAttribute('data-quiz-id');
      state.quizAnswers[quizId] = { selected: [], isCorrect: false, submitted: false };
      saveState();
      updateQuizCard(quizId);
      updateHeader();
      updateBottomNav();
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
      updateHeader();
      updateBottomNav();
    });
  });
}

function attachDeclarationListeners() {
  document.querySelectorAll('[data-decl-check]').forEach(function (cb) {
    cb.addEventListener('change', function () {
      if (!state.declarationChecks) state.declarationChecks = {};
      state.declarationChecks[this.id] = this.checked;
      saveState();
      var li = this.closest('li');
      if (this.checked) {
        li.classList.add('checked');
      } else {
        li.classList.remove('checked');
      }
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
      window.open('https://forms.office.com/Pages/ResponsePage.aspx?id=Vh899lFQb0WqKQNhQLPcZdoUSrKAnglKmUU3TRuuYWhUNlBWR05RVENKUzdHSlNDT1NISzNRT0s2Uy4u', '_blank');
    });
  }
}

/* =============================================
   INIT
   ============================================= */
export function init() {
  buildLessonList();
  loadState();

  if (state.view === 'lesson') {
    if (!state.currentLessonId || !allLessons.find(function (l) { return l.lesson.id === state.currentLessonId; })) {
      state.view = 'hub';
      saveState();
    }
  }

  document.getElementById('loading').style.display = 'none';
  document.getElementById('app').style.display = 'flex';

  if (state.view === 'hub') {
    renderHub();
  } else {
    renderLessonView();
  }

  updateHeader();

  document.getElementById('headerBackBtn').addEventListener('click', function () {
    backToHub();
  });

  document.getElementById('prevBtn').addEventListener('click', function () {
    prevBlock();
  });

  document.getElementById('nextBtn').addEventListener('click', function () {
    advanceBlock();
  });

  initTheme();
}

function initTheme() {
  var saved = localStorage.getItem('htbb-theme');
  var isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (isDark) document.body.classList.add('dark');

  document.getElementById('themeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark');
    var dark = document.body.classList.contains('dark');
    localStorage.setItem('htbb-theme', dark ? 'dark' : 'light');
  });
}
