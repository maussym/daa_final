import course from './content.js';

const icons = {
  home: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  book: '<path d="M12 7v14m-9-3h5a4 4 0 0 1 4 3 4 4 0 0 1 4-3h5V4h-5a4 4 0 0 0-4 3 4 4 0 0 0-4-3H3Z"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5zm-9 9 9 5 9-5M3 16l9 5 9-5"/>',
  code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6M14 4l-4 16"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 12h8m-8 4h8"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M10 2h4m-2 7v4l3 2m3-9 2-2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  chart: '<path d="M3 3v18h18M7 16v-3m5 3V8m5 8V5"/>',
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  back: '<path d="M20 12H5m6-6-6 6 6 6"/>',
  diagonal: '<path d="M6 18 18 6M8 6h10v10"/>',
  next: '<path d="m9 18 6-6-6-6"/>',
  check: '<path d="m4 12 5 5 11-11"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  shuffle: '<path d="M3 6h3c5 0 7 12 12 12h3m-3-3 3 3-3 3M3 18h3c1.6 0 2.9-1.3 4.1-3.2M14 9.2C15.2 7.3 16.4 6 18 6h3m-3-3 3 3-3 3"/>',
  user: '<circle cx="12" cy="8" r="3"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>',
};
const ico = name => '<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icons[name] + '</svg>';
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const two = n => String(n).padStart(2,'0');
const letters = ['A','B','C','D'];
const main = document.querySelector('#main');
const sidebar = document.querySelector('#sidebar');
const topbar = document.querySelector('#topbar');
const veil = document.querySelector('#veil');
const notice = document.querySelector('#notice');
const storageKey = 'daa-final-prep-v1';
const allQuestions = [...course.samples, ...course.practice];
const questionById = new Map(allQuestions.map(q => [q.id,q]));
const nav = [
  ['Study', [['home','Overview','home'],['lessons','Lessons','book'],['cards','Flashcards','layers'],['code','Java lab','code']]],
  ['Practice', [['sample','Sample bank','file'],['exam','Mock final','timer'],['errors','Mistake review','target'],['progress','Progress','chart']]],
];
const titles = new Map(nav.flatMap(([, items]) => items.map(([page,name]) => [page,name])));
let state = {completed:{}, cards:{}, code:{}, attempts:{}, history:[], active:null, lastLesson:1, ui:{}};
let storageFailed = false;
try {
  const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
  if (saved && typeof saved === 'object') state = {...state,...saved};
} catch {
  storageFailed = true;
}
const countDone = () => Object.values(state.completed).filter(Boolean).length;
const errors = () => allQuestions.filter(q => state.attempts[q.id]?.needsReview);
const mastered = () => Object.values(state.cards).filter(c => c === 'known').length;
const percent = (a,b) => b ? Math.round(a/b*100) : 0;
const dateLabel = time => new Date(time).toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});
const path = () => {
  const [page,id] = location.hash.slice(1).split('/');
  return titles.has(page) || page === 'lesson' ? [page,Number(id)] : ['home',0];
};
const storedUI = state.ui || {};
let filterWeek = storedUI.filterWeek ?? 0;
let filterText = storedUI.filterText ?? '';
const sampleSelections = storedUI.sampleSelections ?? {};
const sampleFeedback = storedUI.sampleFeedback ?? {};
let cardWeek = storedUI.cardWeek ?? 0;
let cardMode = storedUI.cardMode ?? 'all';
let deck = storedUI.deck ?? course.cards.map(c => c.id);
let cardPos = Math.max(0, Math.min(storedUI.cardPos ?? 0, deck.length - 1));
let flipped = storedUI.flipped ?? false;
const config = {pool:'mixed', count:20, minutes:40, ...storedUI.config};
const openCode = storedUI.openCode ?? {};
let examResult = storedUI.showResult ? state.lastReview ?? null : null;
let reviewFilter = storedUI.reviewFilter ?? 'missed';
let noticeTimer;
let heroObserver;
function save() {
  state.ui = {
    filterWeek, filterText, sampleSelections, sampleFeedback,
    cardWeek, cardMode, deck, cardPos, flipped, config, openCode,
    showResult: examResult !== null, reviewFilter,
  };
  try {
    localStorage.setItem(storageKey, JSON.stringify(state));
    storageFailed = false;
  } catch {
    if (!storageFailed) toast('Progress could not be saved.');
    storageFailed = true;
  }
}
function toast(message) {
  notice.textContent = message;
  notice.classList.add('show');
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => notice.classList.remove('show'),2400);
}
function shuffle(sequence) {
  const result = [...sequence];
  for (let i=result.length-1;i>0;i--) {
    const j = Math.floor(Math.random()*(i+1));
    [result[i],result[j]] = [result[j],result[i]];
  }
  return result;
}
function meter(value) {
  return '<div class="meter" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="'+value+'" aria-label="Completion"><span style="width:'+value+'%"></span></div>';
}
function link(route, label, icon = 'arrow', style = 'secondary') {
  return '<a class="btn '+style+'" href="#'+route+'">'+escape(label)+(icon ? ico(icon) : '')+'</a>';
}
function action(name, label, style = 'secondary', {icon,id,disabled=false} = {}) {
  return '<button type="button" class="btn '+style+'" data-do="'+name+'"'+(id === undefined ? '' : ' data-id="'+escape(id)+'"')+(disabled ? ' disabled' : '')+'>'+escape(label)+(icon ? ico(icon) : '')+'</button>';
}
function head(title,description='',actions='',eyebrow='') {
  return '<div class="page-head"><div>'+(eyebrow ? '<div class="eyebrow">'+escape(eyebrow)+'</div>' : '')+
    '<h1>'+escape(title)+'</h1>'+(description ? '<p>'+escape(description)+'</p>' : '')+'</div>'+
    (actions ? '<div class="actions">'+actions+'</div>' : '')+'</div>';
}
function stat(icon,value,label) {
  return '<div class="stat"><span class="stat-icon">'+ico(icon)+'</span><span class="stat-data"><strong>'+escape(value)+'</strong><small>'+escape(label)+'</small></span></div>';
}
function tile(route,icon,theme,title,description) {
  return '<a class="tile" href="#'+route+'"><div class="tile-top"><span class="tile-icon '+theme+'">'+ico(icon)+'</span>'+ico('diagonal')+'</div><h3>'+escape(title)+'</h3><p>'+escape(description)+'</p></a>';
}
function btnNav(page) {
  const active = page === 'lesson' ? 'lessons' : page;
  sidebar.innerHTML = '<a class="brand" href="#home"><img src="./mark.svg" alt=""><span><b>DAA Final Prep</b><small>AITU · RiAA 2310</small></span></a>'+
    '<nav aria-label="Study navigation">'+nav.map(([group,items]) =>
    '<div class="nav-group"><span class="nav-label">'+group+'</span>'+items.map(([route,name,icon]) =>
    '<a class="nav-link '+(active === route ? 'active' : '')+'" href="#'+route+'"'+(active === route ? ' aria-current="page"' : '')+'>'+ico(icon)+escape(name)+(route === 'errors' && errors().length ? '<span class="nav-count">'+errors().length+'</span>' : '')+'</a>').join('')+'</div>').join('')+'</nav>'+
    '<div class="side-bottom"><a class="side-progress" href="#progress"><small>Course progress <strong>'+countDone()+'/10</strong></small>'+meter(countDone()*10)+'</a></div>';
  const shown = page === 'lesson' ? 'Lesson notes' : titles.get(page);
  topbar.innerHTML = '<div class="breadcrumb"><button type="button" class="icon-button menu-toggle" data-do="menu" aria-expanded="'+sidebar.classList.contains('open')+'" aria-controls="sidebar" aria-label="Open navigation">'+ico('menu')+'</button><a href="#home">DAA 2310</a>'+ico('next')+'<strong>'+escape(shown)+'</strong></div><div class="top-end"><span class="course-label">Design &amp; Analysis of Algorithms</span><a class="avatar" href="#progress" aria-label="View your progress">'+ico('user')+'</a></div>';
}
function lessonCard(lesson) {
  return '<a class="lesson-card" href="#lesson/'+lesson.id+'"><span class="lesson-index">'+two(lesson.id)+'</span><div><div class="lesson-meta">'+escape(lesson.group)+'</div><h3>'+escape(lesson.name)+'</h3><p>'+escape(lesson.description)+'</p></div>'+ico(state.completed[lesson.id] ? 'check' : 'next')+'</a>';
}
function dashboard() {
  const first = course.lessons.find(l => !state.completed[l.id]);
  const current = course.lessons.find(l => l.id === state.lastLesson && !state.completed[l.id]) || first || course.lessons[0];
  const queue = [current,...course.lessons.filter(l => l.id !== current.id && !state.completed[l.id])].slice(0,2);
  const best = Math.max(0,...state.history.filter(a => a.mode === 'mock').map(a => percent(a.correct,a.count)));
  return '<section class="hero" aria-labelledby="hero-title"><canvas class="hero-canvas" aria-hidden="true"></canvas><div class="hero-content"><h1 id="hero-title">Design &amp; Analysis<span>of Algorithms</span></h1><p>Notes, flashcards and mock exams.</p><div class="actions">'+link('lesson/'+current.id, countDone() === 0 && state.lastLesson === 1 ? 'Start learning' : first ? 'Continue learning' : 'Revisit lessons','arrow','primary')+link('exam',state.active?.mode === 'mock' ? 'Resume mock final' : 'Take a mock final','timer')+'</div></div></section>'+
    '<div class="stats" aria-label="Your study stats">'+stat('book',countDone()+'/10','Lessons completed')+stat('layers',mastered()+'/40','Flashcards known')+stat('target',state.history.some(a => a.mode === 'mock') ? best+'%' : '—','Best mock score')+'</div>'+
    '<section class="section"><div class="section-head"><h2>Study tools</h2></div><div class="tile-grid">'+
    tile('cards','layers','purple','Flashcards','40 cards')+
    tile('sample','file','amber','Sample bank','20 sample questions')+
    tile('code','code','blue','Java lab','8 implementations')+
    '</div></section><section class="section"><div class="section-head"><h2>'+ (first ? 'Next in your course' : 'Review your course')+'</h2><a class="text-link" href="#lessons">All lessons '+ico('arrow')+'</a></div><div class="grid-2">'+queue.map(lessonCard).join('')+'</div></section>';
}
function table(block) {
  return '<div class="table-scroll"><table><thead><tr>'+block.rows[0].map(c => '<th scope="col">'+escape(c)+'</th>').join('')+'</tr></thead><tbody>'+block.rows.slice(1).map(row => '<tr>'+row.map(c => '<td>'+escape(c)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
}
function contentBlocks(blocks) {
  let html = '';
  let listing = false;
  for (const block of blocks) {
    if (block.kind !== 'bullet' && listing) { html+='</ul>'; listing=false; }
    if (block.kind === 'heading') html += '<h2>'+escape(block.text)+'</h2>';
    if (block.kind === 'paragraph') html += '<p>'+escape(block.text)+'</p>';
    if (block.kind === 'table') html += table(block);
    if (block.kind === 'code') html += '<pre><code>'+escape(block.text)+'</code></pre>';
    if (block.kind === 'bullet') {
      if (!listing) { html+='<ul>'; listing=true; }
      html+='<li>'+escape(block.text)+'</li>';
    }
  }
  return html+(listing ? '</ul>' : '');
}
function lessonsPage() {
  return head('Lessons')+
    '<div class="grid-2">'+course.lessons.map(lessonCard).join('')+'</div>'+
    '<section class="section"><div class="section-head"><h2>Assignment review</h2></div><div class="grid-2">'+course.assignments.map(a =>
    '<article class="panel"><h3>'+escape(a.name)+'</h3><p style="margin:7px 0">'+escape(a.description)+'</p><a class="text-link" href="'+escape(a.link)+'" target="_blank" rel="noopener noreferrer">Assignment brief '+ico('diagonal')+'</a></article>').join('')+'</div></section>';
}
function lessonPage(id) {
  const l = course.lessons.find(item => item.id === id);
  if (!l) return empty('Lesson unavailable','Open the course to choose a lesson.',link('lessons','All lessons'));
  return head(l.title,'',link('lessons','All lessons','back','ghost'),'Week '+two(l.id)+' / '+l.group)+
    '<div class="content-split"><article class="panel notes">'+contentBlocks(l.blocks)+'<a class="text-link" href="'+escape(l.source)+'" target="_blank" rel="noopener noreferrer">Open the LMS week '+ico('diagonal')+'</a></article>'+
    '<aside class="panel lesson-tools">'+
    action('complete',state.completed[id] ? 'Completed' : 'Mark complete',state.completed[id] ? 'ghost' : 'primary',{id,icon:'check'})+
    action('week-cards','Open flashcards','secondary',{id,icon:'layers'})+
    action('week-practice','Take lesson quiz','secondary',{id,icon:'target'})+
    (id < 10 ? link('lesson/'+(id+1),'Next lesson') : link('exam','Mock final','timer'))+'</aside></div>';
}
function options(selected=0) {
  return '<option value="0">All weeks</option>'+course.lessons.map(l => '<option value="'+l.id+'"'+(l.id===selected?' selected':'')+'>Week '+l.id+' · '+escape(l.name)+'</option>').join('');
}
function codePage() {
  return head('Java lab','8 implementations')+
    '<div class="list">'+course.implementations.map(c => '<details class="panel code-card" data-code="'+c.id+'"'+(openCode[c.id]?' open':'')+'><summary>'+escape(c.name)+(state.code[c.id] ? ' <span class="chip good">Practiced</span>' : '')+'</summary>'+
    '<div class="notes">'+contentBlocks(c.blocks)+'<div class="actions">'+action('copy-code','Copy Java','ghost',{id:c.id})+
    action('code-done',state.code[c.id] ? 'Practiced' : 'Mark practiced',state.code[c.id] ? 'ghost' : 'primary',{id:c.id,icon:'check'})+'</div></div></details>').join('')+'</div>';
}
function empty(title,description,actions='') {
  return '<div class="panel empty"><h2>'+escape(title)+'</h2>'+(description ? '<p>'+escape(description)+'</p>' : '')+(actions ? '<div class="actions">'+actions+'</div>' : '')+'</div>';
}
function answerGrid(q, order, selected, locked, context) {
  return '<div class="answers" aria-label="Answer choices">'+order.map((i,pos) => {
    const classes = locked ? (i === q.answer ? 'correct' : i === selected ? 'wrong' : '') : i === selected ? 'selected' : '';
    return '<button type="button" class="answer '+classes+'" data-do="'+context+'-choice" data-id="'+q.id+':'+i+'" aria-pressed="'+(i===selected)+'"'+(locked?' disabled':'')+'><span class="answer-letter">'+letters[pos]+'</span>'+escape(q.choices[i])+'</button>';
  }).join('')+'</div>';
}
function explanation(q, letter='') {
  return '<div class="explanation"><strong>Answer'+escape(letter)+' · '+escape(q.choices[q.answer])+'</strong><p>'+escape(q.why)+'</p></div>';
}
function sampleCard(q) {
  const selected = sampleSelections[q.id];
  const feedback = sampleFeedback[q.id];
  const locked = Boolean(feedback);
  return '<article class="panel question-card" id="sample-'+q.id+'"><div class="question-title"><span class="meta">'+two(q.num)+'</span><h2>'+escape(q.text)+'</h2></div>'+
    '<span class="chip">Week '+q.week+'</span>'+answerGrid(q,[0,1,2,3],selected,locked,'sample')+
    (locked ? explanation(q,' · '+letters[q.answer]) : '')+'<div class="actions" style="margin-top:11px">'+
    (locked ? action('sample-reset','Try again','ghost',{id:q.id}) :
      action('sample-check','Check answer','primary',{id:q.id,disabled:selected===undefined})+action('sample-reveal','Show explanation','ghost',{id:q.id}))+ '</div></article>';
}
function sampleList() {
  const match = filterText.trim().toLowerCase();
  const list = course.samples.filter(q => (!filterWeek || q.week === filterWeek) && (!match || [q.text,...q.choices].join(' ').toLowerCase().includes(match)));
  return list.length ? list.map(sampleCard).join('') : empty('No matches','Try another keyword or week.');
}
function samplePage() {
  return head('Sample bank','20 sample questions')+
    '<div class="filters"><label>Search questions<input type="search" id="sample-search" value="'+escape(filterText)+'" placeholder="e.g. rolling hash"></label><label>Filter by lesson<select id="sample-week">'+options(filterWeek)+'</select></label></div>'+
    '<div class="list" id="sample-list">'+sampleList()+'</div>';
}
function availableCards() {
  return course.cards.filter(c => (!cardWeek || c.week === cardWeek) &&
    (cardMode === 'all' || (cardMode === 'learning' ? state.cards[c.id] !== 'known' : state.cards[c.id] === 'known')));
}
function resetDeck(random=false) {
  const ids = availableCards().map(c => c.id);
  deck = random ? shuffle(ids) : ids;
  cardPos = 0;
  flipped = false;
}
function flashPage() {
  const c = course.cards.find(item => item.id === deck[cardPos]);
  return head('Flashcards')+
    '<div class="flash-wrap"><div class="filters"><label>Lesson<select id="card-week">'+options(cardWeek)+'</select></label><label>Show<select id="card-mode">'+[['all','All cards'],['learning','Still learning'],['known','Known']].map(([v,t])=>'<option value="'+v+'"'+(cardMode===v?' selected':'')+'>'+t+'</option>').join('')+'</select></label>'+
    action('shuffle-cards','Shuffle','ghost',{icon:'shuffle',disabled:!deck.length})+'</div>'+
    (c ? '<div class="flash-top"><span class="meta">Card '+(cardPos+1)+' of '+deck.length+'</span><span class="chip">Week '+c.week+'</span></div>'+
    '<button class="flash-stage '+(flipped?'flipped':'')+'" type="button" data-do="flip" aria-label="'+escape((flipped?'Answer: ':'Question: ')+(flipped?c.back:c.front))+'"><span class="eyebrow">'+(flipped?'Answer':'Question')+'</span><span class="card-face">'+escape(flipped ? c.back : c.front)+'</span><small>'+ (flipped?'Show question':'Flip card')+'</small></button>'+
    '<div class="flash-controls"><div class="actions">'+ action('card-prev','Previous','ghost',{icon:'back',disabled:deck.length<2})+action('card-next','Next','ghost',{icon:'arrow',disabled:deck.length<2})+'</div><div class="actions">'+
    action('card-again','Needs practice','secondary',{id:c.id,disabled:!flipped})+action('card-know','I know this','primary',{id:c.id,icon:'check',disabled:!flipped})+'</div></div>' : empty('No cards in this view','Choose another lesson or show all cards.'))+'</div>';
}
function errorsPage() {
  const wrong = errors();
  return head('Mistake review','',wrong.length ? action('retry-errors','Retry '+wrong.length+(wrong.length===1?' question':' questions'),'primary',{icon:'arrow'}) : '')+
    (wrong.length ? '<div class="list">'+wrong.map(q => '<article class="panel question-card"><div class="question-title"><span class="meta">W'+two(q.week)+'</span><h2>'+escape(q.text)+'</h2></div><span class="chip">'+(q.source==='sample'?'Sample '+q.num:'Course practice')+'</span>'+
      '<p>Last attempt · '+escape(state.attempts[q.id].last === null ? 'Unanswered' : q.choices[state.attempts[q.id].last])+'</p>'+explanation(q)+
      '<a class="text-link" style="margin-top:9px" href="#lesson/'+q.week+'">Revisit lesson '+ico('arrow')+'</a></article>').join('')+'</div>' :
    empty('No mistakes to review','Missed questions appear here.',link('sample','Open sample bank')));
}
function progressPage() {
  const scored = Object.values(state.attempts);
  const correctAnswers = scored.reduce((sum,q)=>sum+q.correct,0);
  const total = scored.reduce((sum,q)=>sum+q.total,0);
  return head('Progress',storageFailed ? 'Progress could not be saved in this browser.' : 'Saved on this browser.')+
    '<div class="stats" style="margin-top:0">'+stat('book',countDone()+'/10','Lessons completed')+stat('layers',mastered()+'/40','Flashcards known')+stat('target',total ? percent(correctAnswers,total)+'%' : '—','Answer accuracy')+'</div>'+
    '<div class="grid-2 section"><section class="panel"><div class="section-head"><h2>By lesson</h2></div>'+
    course.lessons.map(l => {
      const known=course.cards.filter(c=>c.week===l.id&&state.cards[c.id]==='known').length;
      const attempts=allQuestions.filter(q=>q.week===l.id).map(q=>state.attempts[q.id]).filter(Boolean);
      const n=attempts.reduce((sum,a)=>sum+a.total,0), correct=attempts.reduce((sum,a)=>sum+a.correct,0);
      return '<a class="progress-row" href="#lesson/'+l.id+'"><span class="lesson-index">'+two(l.id)+'</span><span><strong>'+escape(l.name)+'</strong><br><small class="muted">'+known+'/4 cards · '+(n ? correct+'/'+n+' correct' : 'No quiz answers')+'</small></span>'+(state.completed[l.id]?'<span class="chip good">Complete</span>':ico('next'))+'</a>';
    }).join('')+'</section><section class="panel"><div class="section-head"><h2>Practice history</h2></div>'+
    (state.history.length ? state.history.map(h => '<div class="history-row"><div><strong>'+escape(h.title)+'</strong><p>'+dateLabel(h.at)+'</p></div><strong>'+h.correct+'/'+h.count+'</strong></div>').join('') : '<p>No completed attempts yet.</p>')+'</section></div>';
}

const modes = {
  mixed: {label:'Mixed bank',questions:allQuestions,counts:[10,20,30,50]},
  sample: {label:'Sample questions only',questions:course.samples,counts:[5,10,20]},
  practice: {label:'Course practice only',questions:course.practice,counts:[10,20,30]},
};
function newAttempt(questions, {mode,title,minutes=0}) {
  if (state.active) {
    toast('Finish or discard your current session first.');
    navigate('exam');
    return;
  }
  const started = Date.now();
  state.active = {
    mode,title,started,deadline:minutes ? started+minutes*60_000 : null,index:0,answers:{},
    questions:shuffle(questions).map(q => ({id:q.id,order:shuffle([0,1,2,3])})),
  };
  examResult=null;
  save();
  navigate('exam');
}
function track(q,value) {
  const prior=state.attempts[q.id] || {total:0,correct:0};
  const correct=value===q.answer;
  state.attempts[q.id]={total:prior.total+1,correct:prior.correct+Number(correct),needsReview:!correct,last:value};
}
function finishAttempt(timedOut=false) {
  const e=state.active;
  if (!e) return;
  const rows=e.questions.map(item => {
    const q=questionById.get(item.id);
    const selected=e.answers[q.id] ?? null;
    track(q,selected);
    return {...item,selected};
  });
  const correct=rows.filter(r => questionById.get(r.id).answer===r.selected).length;
  const summary={title:e.title,mode:e.mode,at:Date.now(),correct,count:rows.length};
  state.history.unshift(summary);
  state.active=null;
  examResult={...summary,rows,timedOut};
  state.lastReview=examResult;
  reviewFilter='missed';
  save();
  if (path()[0]==='exam') { render(); window.scrollTo(0,0); main.focus({preventScroll:true}); }
  else if (timedOut) toast('Your timed session ended. View results in Mock final.');
}
function attemptSetup() {
  const pool=modes[config.pool];
  const previous=state.lastReview ? action('last-result','See last result','ghost',{icon:'chart'}) : '';
  return head('Mock final')+
    '<div class="exam-wrap"><section class="panel"><h2>Test settings</h2>'+
    '<div class="settings"><label>Question bank<select id="exam-pool">'+Object.entries(modes).map(([key,m])=>'<option value="'+key+'"'+(key===config.pool?' selected':'')+'>'+m.label+'</option>').join('')+'</select></label>'+
    '<label>Questions<select id="exam-count">'+pool.counts.map(n=>'<option value="'+n+'"'+(n===config.count?' selected':'')+'>'+n+(n===pool.questions.length?' · full bank':'')+'</option>').join('')+'</select></label>'+
    '<label>Time limit<select id="exam-minutes">'+[[40,'40 minutes'],[20,'20 minutes'],[10,'10 minutes'],[0,'Untimed']].map(([n,s])=>'<option value="'+n+'"'+(n===config.minutes?' selected':'')+'>'+s+'</option>').join('')+'</select></label></div>'+
    '<div class="actions">'+action('start-exam','Start mock final','primary',{icon:'arrow'})+previous+'</div></section></div>';
}
function timeLeft(deadline) {
  const seconds=Math.max(0,Math.ceil((deadline-Date.now())/1000));
  return two(Math.floor(seconds/60))+':'+two(seconds%60);
}
function attemptPage(e) {
  const entry=e.questions[e.index], q=questionById.get(entry.id);
  const done=Object.keys(e.answers).length;
  return head(e.title)+
    '<div class="exam-wrap"><div class="exam-top"><span class="meta" id="exam-status">Question '+(e.index+1)+' of '+e.questions.length+' · '+done+' answered</span>'+
    (e.deadline ? '<span class="chip" aria-label="Time remaining">'+ico('timer')+' <span id="timer">'+timeLeft(e.deadline)+'</span></span>' : '<span class="chip">Untimed</span>')+'</div>'+
    meter(percent(done,e.questions.length))+
    '<article class="panel exam-q"><div class="question-title"><span class="meta">'+two(e.index+1)+'</span><h2>'+escape(q.text)+'</h2></div>'+
    answerGrid(q,entry.order,e.answers[q.id],false,'exam')+
    '<div class="exam-nav">'+action('exam-prev','Previous','ghost',{icon:'back',disabled:e.index===0})+
    (e.index<e.questions.length-1?action('exam-next','Next question','primary',{icon:'arrow'}):action('submit-exam','Submit answers','primary',{icon:'check'}))+'</div></article>'+
    '<div class="exam-picker" aria-label="Jump to question">'+e.questions.map((item,index)=>'<button type="button" data-do="exam-jump" data-id="'+index+'" class="'+(index===e.index?'current':e.answers[item.id]!==undefined?'done':'')+'" aria-label="Question '+(index+1)+(e.answers[item.id]!==undefined?', answered':'')+'"'+(index===e.index?' aria-current="step"':'')+'>'+(index+1)+'</button>').join('')+'</div>'+
    '<div class="actions" style="margin-top:15px">'+action('submit-exam','Finish session','secondary')+
    action('discard-exam','Discard session','ghost danger')+'</div></div>';
}
function resultPage(result) {
  const missed=result.rows.filter(row => row.selected!==questionById.get(row.id).answer);
  const rows=reviewFilter==='missed' ? missed : result.rows;
  return head(result.title+' results',result.timedOut?'Time is up.':'')+
    '<div class="exam-wrap"><div class="panel result-hero"><span class="score">'+percent(result.correct,result.count)+'%</span><div><h2>'+result.correct+' / '+result.count+' correct</h2><p>'+missed.length+' to review</p></div></div>'+
    '<div class="actions" style="margin-bottom:15px">'+action('new-exam','New session','primary',{icon:'arrow'})+link('errors','Mistake review','target','ghost')+'</div>'+
    '<div class="filters"><label>Review<select id="result-filter"><option value="missed"'+(reviewFilter==='missed'?' selected':'')+'>Missed and unanswered</option><option value="all"'+(reviewFilter==='all'?' selected':'')+'>All questions</option></select></label></div>'+
    (rows.length ? '<div class="list">'+rows.map(row=>{
      const q=questionById.get(row.id);
      const selected=row.selected===null?'Unanswered':q.choices[row.selected];
      return '<article class="panel"><div class="question-title"><span class="meta">W'+two(q.week)+'</span><h2>'+escape(q.text)+'</h2></div><p>Your answer · '+escape(selected)+'</p>'+
      answerGrid(q,row.order,row.selected,true,'exam')+explanation(q)+
      '<a class="text-link" style="margin-top:9px" href="#lesson/'+q.week+'">Open lesson '+ico('arrow')+'</a></article>';
    }).join('')+'</div>' : empty('All answers correct',''))+'</div>';
}
function examPage() {
  return state.active ? attemptPage(state.active) : examResult ? resultPage(examResult) : attemptSetup();
}
function closeMenu() {
  sidebar.classList.remove('open');
  veil.hidden=true;
  topbar.querySelector('.menu-toggle')?.setAttribute('aria-expanded','false');
}
function navigate(route) {
  closeMenu();
  if (location.hash!=='#'+route) location.hash=route;
  else { render(); window.scrollTo(0,0); }
}
function render() {
  heroObserver?.disconnect();
  const [page,id]=path();
  if (page==='lesson' && course.lessons.some(l=>l.id===id) && state.lastLesson!==id) { state.lastLesson=id; save(); }
  btnNav(page);
  const screens={home:dashboard,lessons:lessonsPage,lesson:()=>lessonPage(id),cards:flashPage,code:codePage,sample:samplePage,exam:examPage,errors:errorsPage,progress:progressPage};
  main.innerHTML=screens[page]();
  document.title=(page==='home'?'':(page==='lesson'?'Lesson notes':titles.get(page))+' · ')+'DAA Final Prep';
  if (page==='home') {
    const canvas=main.querySelector('canvas');
    heroObserver=new ResizeObserver(()=>drawGraph(canvas));
    heroObserver.observe(canvas);
  }
}
function drawGraph(canvas) {
  const w=canvas.clientWidth,h=canvas.clientHeight;
  if (!w || !h) return;
  const dpr=Math.min(devicePixelRatio||1,2);
  canvas.width=Math.round(w*dpr);
  canvas.height=Math.round(h*dpr);
  const c=canvas.getContext('2d');
  c.scale(dpr,dpr);
  const centerX=w*.74,centerY=h*.50;
  const light=c.createRadialGradient(centerX,centerY,1,centerX,centerY,w*.47);
  light.addColorStop(0,'#405928'); light.addColorStop(.54,'#273922'); light.addColorStop(1,'#172217');
  c.fillStyle=light; c.fillRect(0,0,w,h);
  c.fillStyle='#d7ff9d30';
  for (let x=13;x<w;x+=18) for (let y=12;y<h;y+=18) c.fillRect(x,y,1,1);
  const size=Math.min(w*.96,h*1.54);
  const nodes=[[-.35,.15],[-.30,-.18],[-.08,-.30],[.18,-.25],[.34,-.06],[.25,.22],[-.02,.3],[-.11,.015],[.10,.04],[-.22,.235],[.42,.12]];
  const edges=[[0,1],[0,7],[0,9],[1,2],[1,7],[2,3],[2,7],[3,4],[3,8],[4,8],[4,5],[4,10],[5,6],[5,8],[5,10],[6,7],[6,8],[6,9],[7,8],[7,9]];
  c.save();
  c.translate(centerX,centerY);
  c.strokeStyle='#b4d48426'; c.lineWidth=1;
  for (let r of [.20,.32,.435]) { c.beginPath();c.arc(0,0,size*r,0,Math.PI*2);c.stroke(); }
  c.setLineDash([4,6]);
  c.beginPath(); c.moveTo(-size*.48,0);c.lineTo(size*.47,0);c.moveTo(0,-h*.44);c.lineTo(0,h*.44);c.stroke();
  c.setLineDash([]);
  const coords=nodes.map(([x,y])=>[x*size,y*size]);
  const active=new Set(['1,2','2,7','3,8','4,8','5,8','6,7','7,8','0,7','6,9','4,10']);
  for (const edge of edges) {
    const [a,b]=edge.map(i=>coords[i]);
    const strong=active.has(edge.join(','));
    c.lineWidth=strong?1.6:1;
    c.strokeStyle=strong?'#d7fda1bd':'#accc7d45';
    if(strong){c.shadowColor='#c9f477';c.shadowBlur=9;}
    c.beginPath();c.moveTo(...a);c.lineTo(...b);c.stroke();
    c.shadowBlur=0;
  }
  for (const [i,[x,y]] of coords.entries()) {
    const major=[1,2,4,7,8].includes(i);
    const glow=c.createRadialGradient(x,y,2,x,y,major?25:17);
    glow.addColorStop(0,'#d8ff9a70');glow.addColorStop(1,'#d8ff9a00');
    c.fillStyle=glow;c.beginPath();c.arc(x,y,major?25:17,0,Math.PI*2);c.fill();
    c.strokeStyle='#bfeb8e88';c.lineWidth=1;c.beginPath();c.arc(x,y,major?9:7,0,Math.PI*2);c.stroke();
    c.fillStyle=major?'#e4ffb5':'#abc982';c.beginPath();c.arc(x,y,major?3.7:2.6,0,Math.PI*2);c.fill();
  }
  if(w>660) {
    c.font='10px monospace';c.fillStyle='#d6f5afab';
    for(const [i,label] of [[1,'A'],[2,'B'],[4,'C'],[5,'D'],[6,'E']]) {
      const [x,y]=coords[i];c.fillText(label,x+11,y-8);
    }
  }
  c.restore();
}
function refreshSample(q) {
  const current=document.getElementById('sample-'+q.id);
  if (current) current.outerHTML=sampleCard(q);
}
function revealCardRating(id,rating) {
  const oldIndex=cardPos;
  state.cards[id]=rating;
  const visibleIds = new Set(availableCards().map(card=>card.id));
  deck=deck.filter(key=>visibleIds.has(key));
  if(cardMode==='known' && !deck.length) cardPos=0;
  else if(deck.includes(id)) cardPos=(oldIndex+1)%deck.length;
  else cardPos=deck.length?oldIndex%deck.length:0;
  flipped=false;
  save();
  render();
  toast(rating==='known'?'Marked as known':'Marked for review');
}
function examJump(position) {
  state.active.index=Math.min(state.active.questions.length-1,Math.max(0,position));
  save();
  render();
}
function activeOrToast() {
  if (!state.active) return false;
  toast('Finish or discard your current session first.');
  navigate('exam');
  return true;
}
document.addEventListener('click', event => {
  const summary=event.target.closest('.code-card > summary');
  if (summary) {
    const details=summary.parentElement;
    openCode[details.dataset.code]=!details.open;
    save();
    return;
  }
  const button=event.target.closest('[data-do]');
  if (!button || button.disabled) return;
  const name=button.dataset.do;
  const id=button.dataset.id;
  const which=Number(id);
  if (name==='menu') {
    if(sidebar.classList.contains('open')) closeMenu();
    else { sidebar.classList.add('open');veil.hidden=false;button.setAttribute('aria-expanded','true');sidebar.querySelector('a').focus(); }
  }
  if(name==='complete') { state.completed[id]=!state.completed[id];save();render();toast(state.completed[id]?'Lesson marked complete':'Lesson marked incomplete'); }
  if(name==='week-cards') { cardWeek=which;cardMode='all';resetDeck();save();navigate('cards'); }
  if(name==='week-practice') {
    if(activeOrToast()) return;
    newAttempt(allQuestions.filter(q=>q.week===which),{mode:'lesson',title:'Week '+which+' practice'});
  }
  if(name==='copy-code') {
    const text=course.implementations.find(c=>c.id===which)?.blocks.find(b=>b.kind==='code')?.text;
    if (text) navigator.clipboard?.writeText(text).then(()=>toast('Java copied'),()=>toast('Select the Java text to copy it.'));
    if(!navigator.clipboard) toast('Select the Java text to copy it.');
  }
  if(name==='code-done') {
    state.code[id]=!state.code[id]; save();
    const details=button.closest('details');
    details.querySelector('summary').innerHTML=escape(course.implementations.find(c=>c.id===which).name)+(state.code[id]?' <span class="chip good">Practiced</span>':'');
    button.outerHTML=action('code-done',state.code[id]?'Practiced':'Mark practiced',state.code[id]?'ghost':'primary',{id:which,icon:'check'});
    toast(state.code[id]?'Marked as practiced':'Marked for practice');
  }
  if(name.startsWith('sample-')) {
    const [qid,selected]=id.split(':');
    const q=questionById.get(qid);
    if(name==='sample-choice') sampleSelections[qid]=Number(selected);
    if(name==='sample-check' && sampleSelections[qid]!==undefined) {
      track(q,sampleSelections[qid]);sampleFeedback[qid]='checked';btnNav('sample');
    }
    if(name==='sample-reveal') sampleFeedback[qid]='revealed';
    if(name==='sample-reset') { delete sampleSelections[qid];delete sampleFeedback[qid]; }
    save();
    refreshSample(q);
    const selectors={ 'sample-choice':'[data-do="sample-choice"][data-id="'+id+'"]', 'sample-check':'[data-do="sample-reset"]','sample-reveal':'[data-do="sample-reset"]','sample-reset':'[data-do="sample-choice"]' };
    document.getElementById('sample-'+qid)?.querySelector(selectors[name])?.focus({preventScroll:true});
  }
  if(name==='flip') { flipped=!flipped;save();render();main.querySelector('.flash-stage').focus({preventScroll:true}); }
  if(name==='shuffle-cards') { resetDeck(true);save();render(); }
  if(name==='card-prev' || name==='card-next') { cardPos=(cardPos+deck.length+(name==='card-next'?1:-1))%deck.length;flipped=false;save();render(); }
  if(name==='card-again') revealCardRating(which,'again');
  if(name==='card-know') revealCardRating(which,'known');
  if(name==='start-exam' && !state.active) {
    const questions=shuffle(modes[config.pool].questions).slice(0,config.count);
    newAttempt(questions,{mode:'mock',title:'Mock final',minutes:config.minutes});
  }
  if(name==='retry-errors' && !activeOrToast()) newAttempt(errors(),{mode:'review',title:'Mistake retry'});
  if(name==='exam-choice' && state.active) {
    const [qid,value]=id.split(':');
    if (state.active.deadline && state.active.deadline<=Date.now()) { finishAttempt(true);return; }
    state.active.answers[qid]=Number(value);save();render();
    main.querySelector('[data-do="exam-choice"][data-id="'+id+'"]')?.focus({preventScroll:true});
  }
  if(name==='exam-jump' && state.active) examJump(which);
  if(name==='exam-prev' && state.active) examJump(state.active.index-1);
  if(name==='exam-next' && state.active) examJump(state.active.index+1);
  if(name==='submit-exam' && state.active) {
    const missing=state.active.questions.length-Object.keys(state.active.answers).length;
    if(!missing || window.confirm('Submit with '+missing+' unanswered question'+(missing===1?'':'s')+'?')) finishAttempt(state.active.deadline!==null && state.active.deadline<=Date.now());
  }
  if(name==='discard-exam' && state.active && window.confirm('Discard this session and its answers?')) {
    state.active=null;examResult=null;save();render();
  }
  if(name==='new-exam') { examResult=null;save();render();window.scrollTo(0,0); }
  if(name==='last-result' && state.lastReview) { examResult=state.lastReview;reviewFilter='missed';save();render(); }
});
main.addEventListener('input',event=>{
  if(event.target.id==='sample-search') { filterText=event.target.value;save();main.querySelector('#sample-list').innerHTML=sampleList(); }
});
main.addEventListener('change',event=>{
  const {id,value}=event.target;
  if(id==='sample-week') { filterWeek=Number(value);save();main.querySelector('#sample-list').innerHTML=sampleList(); }
  if(id==='card-week') { cardWeek=Number(value);resetDeck();save();render(); }
  if(id==='card-mode') { cardMode=value;resetDeck();save();render(); }
  if(id==='exam-pool' && modes[value]) {
    config.pool=value;if(!modes[value].counts.includes(config.count))config.count=modes[value].counts[0];save();render();
  }
  if(id==='exam-count') { config.count=Number(value);save(); }
  if(id==='exam-minutes') { config.minutes=Number(value);save(); }
  if(id==='result-filter') { reviewFilter=value;save();render();main.querySelector('#result-filter')?.focus(); }
});
veil.addEventListener('click',()=>{closeMenu();topbar.querySelector('.menu-toggle')?.focus();});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape' && sidebar.classList.contains('open')) { closeMenu();topbar.querySelector('.menu-toggle')?.focus(); }
});
document.querySelector('.skip').addEventListener('click',event=>{event.preventDefault();main.focus();});
window.addEventListener('hashchange',()=>{closeMenu();render();window.scrollTo(0,0);main.focus({preventScroll:true});});
function tick() {
  const deadline=state.active?.deadline;
  if(!deadline) return;
  if(deadline<=Date.now()) { finishAttempt(true);return; }
  const timer=document.querySelector('#timer');
  if(timer) {
    timer.textContent=timeLeft(deadline);
    timer.closest('.chip')?.classList.toggle('timer-low',deadline-Date.now()<60_000);
  }
}
tick();
render();
setInterval(tick,500);
