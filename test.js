// npm test: loads Slate in a hidden window with a throwaway profile.
// Fails on any failed console.assert, any page error, and any failed check below.
const { app, BrowserWindow } = require('electron');
const fs = require('fs'), os = require('os'), path = require('path');

// Runs inside the page, so it can use the app's own functions.
async function checks() {
  const fails = [], check = (ok, name) => { if (!ok) fails.push(name); };
  window.alert = () => {}; window.confirm = () => true; window.print = () => {};
  V.auto = true; V.autoEl = true;
  const start = script => { newProject(); S.script = script; syncScenes(); };
  const row = loc => S.scenes.find(s => s.loc === loc);
  const THREE = 'INT. BAR - NIGHT\n\nA.\n\nEXT. ROAD - DAY\n\nB.\n\nINT. KITCHEN - DAY\n\nC.';

  // Scene work stays with its scene when numbers shift.
  start(THREE);
  S.days.push({id: 'd1', call: '07:00'});
  Object.assign(row('KITCHEN'), {props: 'Kettle', day: 'd1'});
  S.shots.push({id: 'sh1', scene: row('KITCHEN').id, num: '1', size: 'CU', desc: 'Kettle'});
  S.script = S.script.replace('INT. KITCHEN', 'EXT. BEACH - DAY\n\nNew.\n\nINT. KITCHEN');
  syncScenes();
  check(row('KITCHEN').props === 'Kettle' && row('KITCHEN').day === 'd1' && row('KITCHEN').num === '4', 'inserting a scene keeps tags and day on the old scene');
  check(S.shots[0].scene === row('KITCHEN').id && !row('BEACH').props, 'inserting a scene keeps shots on the old scene');

  start(THREE);
  row('KITCHEN').props = 'Kettle';
  moveChunk(3, 1); syncScenes();
  check(row('KITCHEN').props === 'Kettle' && row('KITCHEN').num === '1' && !row('ROAD').props, 'moving a card keeps its tags');

  start('INT. BAR - NIGHT\n\nFirst.\n\nEXT. ROAD - DAY\n\nB.\n\nINT. BAR - NIGHT\n\nSecond.');
  S.scenes.find(s => s.num === '3').props = 'Glass';
  S.script = 'INT. BAR - NIGHT\n\nBrand new.\n\n' + S.script;
  syncScenes();
  check(S.scenes.find(s => s.num === '4')?.props === 'Glass', 'repeated headings are told apart by their text');

  start(THREE);
  row('BAR').props = 'Hand tag'; row('BAR').autoEl = {};
  S.script = S.script.replace('INT. BAR - NIGHT', 'INT. PUB - NIGHT');
  syncScenes();
  check(row('PUB')?.props === 'Hand tag' && !row('BAR'), 'editing a heading keeps the scene');

  start(THREE);
  S.script = S.script.replace('EXT. ROAD - DAY\n\nB.\n\n', '');
  syncScenes();
  check(!row('ROAD') && S.scenes.length === 2, 'a cut scene with no work is removed');

  start(THREE);
  row('ROAD').desc = 'Long walk';
  S.script = S.script.replace('EXT. ROAD - DAY\n\nB.\n\n', '');
  syncScenes();
  check(row('ROAD')?.desc === 'Long walk', 'a cut scene with work is kept');
  check(new Set(S.scenes.map(s => String(s.num))).size === S.scenes.length, 'a kept cut scene never shares a number');

  // A backup restores everything, and only safe files load.
  start(THREE);
  S.snaps = [{id: 'snapA', name: 'Draft', date: 1}];
  await imgPut('snap:snapA', 'old text'); await imgPut('imgA', 'data:image/png;base64,AA');
  S.shots.push({id: 'sh2', scene: row('BAR').id, num: '1', size: 'WS', desc: '', img: 'imgA'});
  await importBackup(await projectBackup());
  check(S.snaps.length === 1 && S.snaps[0].id !== 'snapA' && await imgGet('snap:' + S.snaps[0].id) === 'old text', 'a backup restores snapshot text');
  check(S.shots[0].img && S.shots[0].img !== 'imgA' && await imgGet(S.shots[0].img) === 'data:image/png;base64,AA', 'a backup restores images');
  const id = S.id, base = {title: 'X', scenes: [], shots: [], days: [], people: []};
  const refused = async d => { try { await importBackup(JSON.stringify(d)); return false; } catch { return true; } };
  check(await refused({...base, scenes: [{id: 'x"><img src=x onerror=alert(1)>'}]}), 'markup in an id is refused');
  check(await refused({...base, days: [{id: 'd', locId: '"><b>'}]}), 'markup in a linked id is refused');
  check(await refused({...base, strips: {'int-d': 'red"><b>'}}), 'markup in a strip colour is refused');
  check(S.id === id, 'a refused backup changes nothing');

  // Locking ignores headings in the boneyard.
  start(THREE.replace('EXT. ROAD', '/* cut\nINT. OLD - DAY\nGone.\n*/\n\nEXT. ROAD'));
  actions.lock();
  check(S.lock && /INT\. KITCHEN - DAY #3#/.test(S.script) && /^INT\. OLD - DAY$/m.test(S.script), 'locking skips the boneyard');

  // Unreadable data is never saved over.
  newProject();
  const bad = S.id, broken = '{"title":"My Film","script":"INT. A';
  localStorage.setItem(pkey(bad), broken);
  openProject(bad);
  check(!persist() && localStorage.getItem(pkey(bad)) === broken, 'a damaged project is not overwritten');

  // Printed packets.
  start('INT. A - DAY\n\nTOM\nHi.\n\nANA\nYo.');
  V.sidesFor = 'TOM';
  actions.printsides({dataset: {all: '1'}});
  check($('#sides').children.length === 2, 'the everyone button prints everyone');
  dispatchEvent(new Event('afterprint'));
  V.sidesFor = 'NOT IN THIS PROJECT';
  check(buildSides() === 2, 'a name from another project prints everyone');

  // Small rules.
  check(stripCls({ie: 'INT', tod: 'EVENING'}) === 'int-n', 'evening is night on the strips');
  start('INT. A - DAY\n\nHi.');
  S.scenes[0].props = 'Amp';
  check(hl(esc('Rock & roll, amp; amp'), tagRegex(S.scenes[0])) === 'Rock &amp; roll, <mark class="t-props">amp</mark>; <mark class="t-props">amp</mark>', 'highlighting leaves &amp; alone');
  return fails;
}

app.setPath('userData', fs.mkdtempSync(path.join(os.tmpdir(), 'slate-test-')));
app.whenReady().then(async () => {
  const problems = [], w = new BrowserWindow({ show: false });
  w.webContents.on('console-message', e => { if (e.level === 'error') problems.push('console: ' + e.message); });
  await w.loadFile(path.join(__dirname, 'index.html'));
  problems.push(...await w.webContents.executeJavaScript(`(${checks})()`));
  problems.forEach(p => console.error('FAIL ' + p));
  console.log(problems.length ? `${problems.length} failed` : 'All checks passed');
  app.exit(problems.length ? 1 : 0);
}).catch(e => { console.error(e); app.exit(1); });
