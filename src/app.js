import { ICONS } from './icons.js';
import { escHtml, arrEq, getYoutubeEmbedUrl } from './utils.js';
import { state, saveState, loadState } from './state.js';
import { COURSE_DATA } from './course-data.js';

let allLessons = [];
let totalQuizCount = 0;

var blockTypeLabels = { video:'Video', quiz:'Quiz', discussion:'Reflection', scenario:'Scenario', text:'Reading', principles:'Key Principles', officers:'Safeguarding Officers', links:'Resources', warning:'Important Notice', 'safer-recruitment':'Safer Recruitment', declaration:'Self-Declaration' };

var celebratedLessonIds = new Set();
var scenarioExpanded = false;
var announceTimer = null;

var DECLARATION_URL = 'https://forms.cloud.microsoft/pages/responsepage.aspx?id=Vh899lFQb0WqKQNhQLPcZdoUSrKAnglKmUU3TRuuYWhUMDlNRlpaWTg4SzJLOFFQNkVYNFBSWTUzWi4u';
var LOCK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';

function isModuleLocked(moduleId) {
  var mods = COURSE_DATA.modules;
  if (!mods.length || mods[mods.length - 1].id !== moduleId) return false;
  return !allLessons.every(function (l) {
    return l.moduleId === moduleId || isLessonComplete(l.lesson);
  });
}

function isLessonLocked(lessonId) {
  var entry = allLessons.find(function (l) { return l.lesson.id === lessonId; });
  if (!entry) return false;
  return isModuleLocked(entry.moduleId);
}

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
  var allDone = allLessons.every(function (l) { return isLessonComplete(l.lesson); });
  var ringCirc = 2 * Math.PI * 52;

  var html = '';
  html += '<div class="hub-view">';
  html += '<div class="hub-hero">';
  html += '<div class="hub-hero-logo"><img src="./htbb-logo.png" alt="HTBB"></div>';
  html += '<h1 class="hub-hero-title">Safeguarding Training</h1>';
  html += '<p class="hub-hero-subtitle">Complete all modules to finish the course</p>';
  html += '<div class="hub-hero-stats">';
  html += '<div class="hub-stat-ring">';
  html += '<svg viewBox="0 0 120 120" class="hub-ring-svg" role="img" aria-label="Course progress: ' + pct + ' percent">';
  html += '<circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" stroke-width="8"/>';
  html += '<circle cx="60" cy="60" r="52" fill="none" stroke="var(--teal-500)" stroke-width="8" stroke-linecap="round" stroke-dasharray="' + ringCirc + '" stroke-dashoffset="' + (ringCirc * (1 - pct / 100)) + '" transform="rotate(-90 60 60)" class="hub-ring-fill"/>';
  html += '<text x="60" y="60" text-anchor="middle" dominant-baseline="central" class="hub-ring-text">' + pct + '%</text>';
  html += '</svg>';
  html += '</div>';
  html += '<div class="hub-stat-details">';
  html += '<div class="hub-stat-row"><span class="hub-stat-num">' + completed + '/' + totalQuizCount + '</span><span class="hub-stat-label">quizzes completed</span></div>';
  html += '<div class="hub-stat-row"><span class="hub-stat-num">' + COURSE_DATA.modules.length + '</span><span class="hub-stat-label">modules</span></div>';
  html += '<div class="hub-stat-row"><span class="hub-stat-num">' + allLessons.length + '</span><span class="hub-stat-label">lessons</span></div>';
  html += '</div>';
  html += '</div>';
  html += '</div>';

  if (allDone) {
    html += '<div class="hub-complete-card">';
    html += '<div class="hub-complete-icon">' + ICONS['check-circle'] + '</div>';
    html += '<h2>All lessons complete!</h2>';
    html += '<p>Final step: complete the official self-declaration form to sign off the HTBB Safeguarding Training course.</p>';
    html += '<a class="btn btn-primary hub-complete-cta" href="' + DECLARATION_URL + '" target="_blank" rel="noopener noreferrer">Open Self-Declaration Form<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>';
    html += '</div>';
  }

  var resumeLocked = state.currentLessonId && isLessonLocked(state.currentLessonId);
  if (state.currentLessonId && !allDone && !resumeLocked) {
    var resumeItem = allLessons.find(function (l) { return l.lesson.id === state.currentLessonId; });
    if (resumeItem && !isLessonComplete(resumeItem.lesson)) {
      var rBlocks = resumeItem.lesson.blocks;
      var rIdx = Math.min(state.currentBlockIndex, rBlocks.length - 1);
      html += '<button type="button" class="hub-resume" id="hubResumeBtn">';
      html += '<span class="hub-resume-content">';
      html += '<span class="hub-resume-label">Continue where you left off</span>';
      html += '<span class="hub-resume-title">' + escHtml(resumeItem.lesson.title) + '</span>';
      html += '<span class="hub-resume-meta">' + escHtml(resumeItem.moduleTitle) + '</span>';
      html += '<span class="hub-resume-step">Step ' + (rIdx + 1) + ' of ' + rBlocks.length + '</span>';
      html += '</span>';
      html += '<span class="hub-resume-btn" aria-hidden="true">Resume<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16"><polyline points="9 18 15 12 9 6"/></svg></span>';
      html += '</button>';
    }
  }

  html += '<div class="hub-modules">';
  COURSE_DATA.modules.forEach(function (mod, modIdx) {
    var modPct = getModuleProgress(mod);
    var allComplete = mod.lessons.every(function (l) { return isLessonComplete(l); });
    var locked = isModuleLocked(mod.id);
    var tint = locked ? 'tint-5' : 'tint-' + ((modIdx % 7) + 1);
    var currentLesson = mod.lessons.find(function (l) { return !isLessonComplete(l); }) || mod.lessons[mod.lessons.length - 1];

    html += '<article class="hub-module-card' + (allComplete ? ' complete' : '') + (locked ? ' locked' : '') + '" data-module="' + mod.id + '" style="animation:cardSlideIn 0.5s var(--ease-out) ' + (modIdx * 0.08) + 's both">';
    if (!locked) html += '<button type="button" class="hub-module-open" aria-label="Open ' + escHtml(mod.title) + '"></button>';
    html += '<div class="hub-module-header">';
    html += '<div class="hub-module-icon ' + tint + '">' + (ICONS[mod.icon] || ICONS['book-open']) + '</div>';
    if (locked) {
      html += '<div class="hub-module-lock" aria-hidden="true">' + LOCK_ICON + '</div>';
    } else if (allComplete) {
      html += '<div class="hub-module-check">' + ICONS['check-circle'] + '</div>';
    }
    html += '<span class="hub-module-index">' + String(modIdx + 1).padStart(2, '0') + '</span>';
    html += '</div>';
    html += '<h3 class="hub-module-title">' + escHtml(mod.title.replace(/^Module \d+:\s*/, '')) + '</h3>';
    if (locked) {
      html += '<p class="hub-module-meta">Complete all other modules to unlock</p>';
    } else if (allComplete) {
      html += '<p class="hub-module-meta">All lessons complete</p>';
    } else {
      html += '<p class="hub-module-meta">' + escHtml(currentLesson.title) + '</p>';
    }
    if (!locked) {
      html += '<div class="hub-module-progress" role="progressbar" aria-label="' + escHtml(mod.title) + ' progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + modPct + '">';
      html += '<div class="hub-module-progress-fill" style="width:' + modPct + '%"></div>';
      html += '</div>';
    }
    html += '</article>';
  });
  html += '</div>';
  html += '</div>';

  container.innerHTML = html;

  container.querySelectorAll('.hub-module-card').forEach(function (card) {
    card.addEventListener('click', function () {
      if (card.classList.contains('locked')) return;
      var modId = card.getAttribute('data-module');
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
  if (isLessonLocked(lessonId)) {
    announce('Complete all other modules to unlock this section.');
    return;
  }
  var isResuming = (state.currentLessonId === lessonId);
  state.view = 'lesson';
  state.currentLessonId = lessonId;
  if (!isResuming) {
    state.currentBlockIndex = 0;
  }
  scenarioExpanded = false;
  saveState();
  renderLessonView();
}

function backToHub() {
  state.view = 'hub';
  saveState();
  renderHub();
  updateHeader();
  updateBottomNav();
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

  var currentBlock = blocks[idx];

  html += '<div class="lesson-blocks-progressive">';

  if (currentBlock.type === 'quiz') {
    var scenarioBlock = null;
    for (var s = 0; s < idx; s++) {
      if (blocks[s].type === 'scenario') { scenarioBlock = blocks[s]; break; }
    }
    if (scenarioBlock) {
      html += '<div class="scenario-ref' + (scenarioExpanded ? '' : ' collapsed') + '" id="scenarioRef">';
      html += '<button class="scenario-ref-toggle" id="scenarioToggle">';
      html += ICONS['alert-triangle'];
      html += '<span class="scenario-ref-label">' + escHtml(scenarioBlock.title) + '</span>';
      html += '<svg class="scenario-ref-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
      html += '</button>';
      html += '<div class="scenario-ref-body" id="scenarioBody">';
      html += '<p class="scenario-ref-text">' + escHtml(scenarioBlock.content) + '</p>';
      html += '</div>';
      html += '</div>';
    }
  }

  html += '<div class="block-container">';
  html += renderBlock(currentBlock);
  html += '</div>';

  if (idx >= blocks.length - 1 && isBlockComplete(currentBlock)) {
    html += '<div class="block-next-area">';
    html += '<div class="lesson-complete-banner">';
    html += '<div class="completion-icon">' + ICONS['check-circle'] + '</div>';
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

  var scenToggle = document.getElementById('scenarioToggle');
  if (scenToggle) {
    scenToggle.setAttribute('aria-expanded', scenarioExpanded ? 'true' : 'false');
    scenToggle.setAttribute('aria-controls', 'scenarioBody');
    scenToggle.addEventListener('click', function () {
      var ref = document.getElementById('scenarioRef');
      ref.classList.toggle('collapsed');
      scenarioExpanded = !ref.classList.contains('collapsed');
      scenToggle.setAttribute('aria-expanded', scenarioExpanded ? 'true' : 'false');
    });
  }

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
      }
    });
  }

  updateHeader();
  updateBottomNav();
  window.scrollTo({ top: 0, behavior: 'smooth' });

  var titleEl = container.querySelector('.lesson-title');
  if (titleEl) {
    titleEl.setAttribute('tabindex', '-1');
    titleEl.focus({ preventScroll: true });
  }
  announce(lesson.title + ', step ' + (idx + 1) + ' of ' + blocks.length);
}

function advanceBlock() {
  var item = getCurrentLesson();
  if (!item) return;
  var blocks = item.lesson.blocks;
  if (state.currentBlockIndex < blocks.length - 1) {
    state.currentBlockIndex++;
    saveState();
    renderLessonView();
    maybeCelebrate(null);
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
    default: return '';
  }
}

/* =============================================
   HEADER & NAV
   ============================================= */
function updateHeader() {
  var backBtn = document.getElementById('headerBackBtn');
  var statsWrap = document.getElementById('headerStatsWrap');

  if (state.view === 'hub') {
    backBtn.style.display = 'none';
    statsWrap.style.display = 'flex';
  } else {
    backBtn.style.display = 'flex';
    statsWrap.style.display = 'none';
  }

  var completed = getCompletedQuizzes();
  document.getElementById('headerQuizCount').textContent = completed + '/' + totalQuizCount + ' quizzes';
}

function announce(message) {
  var el = document.getElementById('a11yAnnouncer');
  if (!el) return;
  clearTimeout(announceTimer);
  el.textContent = '';
  announceTimer = setTimeout(function () { el.textContent = message; }, 50);
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
    var idleLabel = block.type === 'quiz' ? 'Answer to continue' : (block.type === 'discussion' ? 'Save to continue' : 'Next Step');
    nextBtn.querySelector('span').textContent = canAdvance ? 'Next Step' : idleLabel;
  }

  var reachable = true;
  var dotsHtml = '';
  for (var i = 0; i < blocks.length; i++) {
    if (i > 0 && !isBlockComplete(blocks[i - 1])) reachable = false;
    var cls = 'nav-dot';
    if (i < idx) cls += ' done';
    else if (i === idx) cls += ' current';
    var stepLabel = blockTypeLabels[blocks[i].type] || blocks[i].type;
    dotsHtml += '<button type="button" class="' + cls + '" data-step="' + i + '"' +
      ' aria-label="Step ' + (i + 1) + ' of ' + blocks.length + ': ' + stepLabel + '"' +
      (i === idx ? ' aria-current="step"' : '') +
      (reachable ? '' : ' disabled') + '></button>';
  }
  blockSteps.innerHTML = dotsHtml;

  blockSteps.querySelectorAll('.nav-dot').forEach(function (dot) {
    dot.addEventListener('click', function () {
      var step = parseInt(this.getAttribute('data-step'), 10);
      if (isNaN(step) || step === state.currentBlockIndex) return;
      state.currentBlockIndex = step;
      saveState();
      renderLessonView();
    });
  });
}

/* =============================================
   BLOCK RENDERERS
   ============================================= */
function renderVideo(block) {
  var embedUrl = block.youtubeUrl ? getYoutubeEmbedUrl(block.youtubeUrl) : null;
  var html = '<div class="video-block">';
  if (block.title || block.duration) {
    html += '<div class="video-meta">';
    if (block.title) html += '<span class="video-title">' + escHtml(block.title) + '</span>';
    if (block.duration) html += '<span class="video-duration">' + ICONS['clock'] + escHtml(block.duration) + '</span>';
    html += '</div>';
  }
  if (embedUrl) {
    html += '<div class="video-wrapper">';
    html += '<iframe width="963" height="542" src="' + escHtml(embedUrl) + '" title="' + escHtml(block.title || 'Course Video') + '" loading="lazy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>';
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

  var html = '<div class="' + cardClass + '" data-quiz-id="' + block.id + '" role="group" aria-label="Question ' + block.questionNumber + ': ' + escHtml(block.question) + '">';
  html += '<div class="quiz-header">';
  html += '<div class="quiz-badges">';
  html += '<span class="badge badge-teal">Q' + block.questionNumber + '</span>';
  if (isMulti) html += '<span class="badge badge-gray">Select ALL that apply</span>';
  if (submitted) {
    html += '<span class="quiz-result ' + (isCorrect ? 'correct' : 'incorrect') + '" role="status">';
    html += isCorrect ? ICONS['check-circle'] : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
    html += ' ' + (isCorrect ? 'Correct!' : 'Incorrect') + '</span>';
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
        html += '<span class="quiz-option-icon" style="color:var(--emerald-500)" aria-hidden="true">' + ICONS['check-circle'] + '</span>';
      } else if (!isCorrectOpt2 && isSelected2) {
        html += '<span class="quiz-option-icon" style="color:var(--red-500)" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span>';
      } else if (isCorrectOpt2) {
        html += '<span class="quiz-option-icon" style="color:var(--emerald-400)" aria-hidden="true">' + ICONS['check-circle'] + '</span>';
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
  html += '<label for="disc-' + block.id + '" class="sr-only">Your reflection on: ' + escHtml(block.prompt) + '</label>';
  html += '<textarea class="discussion-textarea" id="disc-' + block.id + '" data-disc-id="' + block.id + '" placeholder="Share your thoughts here...">' + escHtml(savedText) + '</textarea>';
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
  var html = '<div class="declaration-card">';
  html += '<div class="declaration-header">';
  html += '<h2>Safeguarding Self-Declaration</h2>';
  html += '<p>This is the final step of the course. Please complete the official self-declaration form to sign off your HTBB Safeguarding Training.</p>';
  html += '</div>';
  html += '<div class="declaration-footer">';
  html += '<a class="btn-declaration" href="' + DECLARATION_URL + '" target="_blank" rel="noopener noreferrer">Open Self-Declaration Form<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></a>';
  html += '<p class="declaration-form-note">Opens in a new tab. Your response is sent directly to the HTBB Safeguarding Team.</p>';
  html += '</div>';
  html += '</div>';
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

function maybeCelebrate(originEl) {
  var item = getCurrentLesson();
  if (!item) return;
  var lessonId = item.lesson.id;
  if (celebratedLessonIds.has(lessonId)) return;
  if (!isLessonComplete(item.lesson)) return;
  celebratedLessonIds.add(lessonId);
  launchConfetti(originEl);
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
      updateQuizCard(quizId);
      updateHeader();
      updateBottomNav();
      maybeCelebrate(updatedCard);
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
          answer.selected = answer.selected.filter(function (v) { return v !== this.value; }.bind(this));
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

      updateQuizCard(quizId);
      updateHeader();
      updateBottomNav();
      maybeCelebrate(document.querySelector('.quiz-card[data-quiz-id="' + quizId + '"]'));
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
      maybeCelebrate(this.closest('.discussion-card'));
    });
  });
}

/* =============================================
   INIT
   ============================================= */
export function init() {
  buildLessonList();
  loadState();

  if (state.view === 'lesson') {
    var lessonValid = state.currentLessonId && allLessons.find(function (l) { return l.lesson.id === state.currentLessonId; });
    if (!lessonValid || isLessonLocked(state.currentLessonId)) {
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

  var toggle = document.getElementById('themeToggle');
  toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  toggle.addEventListener('click', function () {
    document.body.classList.toggle('dark');
    var dark = document.body.classList.contains('dark');
    localStorage.setItem('htbb-theme', dark ? 'dark' : 'light');
    toggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
  });
}
