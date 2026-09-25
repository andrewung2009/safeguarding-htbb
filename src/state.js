const STORAGE_KEY = 'htbb-safeguarding-state';
const SCHEMA_VERSION = 2;

export const state = {
  view: 'hub',
  currentLessonId: '',
  currentBlockIndex: 0,
  quizAnswers: {},
  discussionTexts: {},
};

export function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: SCHEMA_VERSION, ...state }));
  } catch (e) {
    console.warn('Failed to save progress:', e);
  }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return;

    state.view = parsed.view === 'lesson' ? 'lesson' : 'hub';
    state.currentLessonId = typeof parsed.currentLessonId === 'string' ? parsed.currentLessonId : '';
    state.currentBlockIndex = Number.isInteger(parsed.currentBlockIndex) && parsed.currentBlockIndex >= 0 ? parsed.currentBlockIndex : 0;
    state.quizAnswers = sanitizeQuizAnswers(parsed.quizAnswers);
    state.discussionTexts = sanitizeStringMap(parsed.discussionTexts);
  } catch (e) {
    console.warn('Failed to load progress, starting fresh:', e);
  }
}

function sanitizeQuizAnswers(raw) {
  if (!raw || typeof raw !== 'object') return {};
  const clean = {};
  for (const [id, val] of Object.entries(raw)) {
    if (val && typeof val === 'object' && Array.isArray(val.selected)) {
      clean[id] = {
        selected: val.selected.filter(s => typeof s === 'string'),
        isCorrect: !!val.isCorrect,
        submitted: !!val.submitted,
      };
    }
  }
  return clean;
}

function sanitizeStringMap(raw) {
  if (!raw || typeof raw !== 'object') return {};
  const clean = {};
  for (const [id, val] of Object.entries(raw)) {
    if (typeof val === 'string') clean[id] = val;
  }
  return clean;
}
