var d = require('./src/course-data.js');
d.COURSE_DATA.modules.forEach(function(mod) {
  mod.lessons.forEach(function(l) {
    l.blocks.forEach(function(b, i) {
      if (b.type === 'scenario')
        console.log('SCENARIO @' + i + ' id=' + b.id + ' title=' + b.title);
      if (b.type === 'quiz')
        console.log('QUIZ @' + i + ' id=' + b.id + ' scenarioId=' + (b.scenarioId || 'NONE') + ' q=' + b.question.substring(0, 50));
    });
  });
});
