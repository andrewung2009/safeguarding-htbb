const STORAGE_KEY = 'htbb-safeguarding-state';

export const state = {
  view: 'hub',
  currentLessonId: '',
  currentBlockIndex: 0,
  quizAnswers: {},
  discussionTexts: {},
  expandedModules: {},
  declarationChecks: {},
};

export function saveState() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { /* */ }
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state.view = parsed.view || 'hub';
      state.currentLessonId = parsed.currentLessonId || '';
      state.currentBlockIndex = parsed.currentBlockIndex || 0;
      state.quizAnswers = parsed.quizAnswers || {};
      state.discussionTexts = parsed.discussionTexts || {};
      state.expandedModules = parsed.expandedModules || {};
      state.declarationChecks = parsed.declarationChecks || {};
    }
  } catch (e) { /* */ }
}
