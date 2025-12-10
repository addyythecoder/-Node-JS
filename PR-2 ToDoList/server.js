const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const TASKS_FILE = path.join(DATA_DIR, 'tasks.json');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// ensure data dir + file exist
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(TASKS_FILE)) fs.writeFileSync(TASKS_FILE, '[]', 'utf8');

function readTasks() {
  try {
    const raw = fs.readFileSync(TASKS_FILE, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (err) {
    console.error('Failed to read tasks file:', err);
    return [];
  }
}

function writeTasks(tasks) {
  // atomic write: write temp then rename
  const tmp = TASKS_FILE + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(tasks, null, 2), 'utf8');
  fs.renameSync(tmp, TASKS_FILE);
}

/* Routes */

// Home - list & create form
app.get('/', (req, res) => {
  let tasks = readTasks();
  // sort: undone first, then by due date then created_at
  tasks.sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1;
    if (a.due_date && b.due_date) return new Date(a.due_date) - new Date(b.due_date);
    return new Date(a.created_at) - new Date(b.created_at);
  });
  res.render('index', { tasks, flash: req.query.flash || null });
});

// Create
app.post('/tasks', (req, res) => {
  const { title = '', description = '', due_date = '', priority = 'low' } = req.body;
  if (!title.trim()) return res.redirect('/?flash=' + encodeURIComponent('Title required'));
  const tasks = readTasks();
  const task = {
    id: uuidv4(),
    title: title.trim(),
    description: description.trim(),
    due_date: due_date || null,
    priority: priority || 'low',
    done: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  tasks.push(task);
  writeTasks(tasks);
  res.redirect('/?flash=' + encodeURIComponent('Task created'));
});

// Edit form
app.get('/tasks/:id/edit', (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).send('Task not found');
  res.render('edittask', { task });
});

// Update (PUT)
app.put('/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).send('Task not found');
  const { title = '', description = '', due_date = '', priority = 'low' } = req.body;
  if (!title.trim()) return res.redirect(`/tasks/${req.params.id}/edit?flash=` + encodeURIComponent('Title required'));
  tasks[idx] = {
    ...tasks[idx],
    title: title.trim(),
    description: description.trim(),
    due_date: due_date || null,
    priority: priority || 'low',
    updated_at: new Date().toISOString()
  };
  writeTasks(tasks);
  res.redirect('/?flash=' + encodeURIComponent('Task updated'));
});

// Toggle complete (supports AJAX and simple form POST)
app.post('/tasks/:id/toggle', (req, res) => {
  const tasks = readTasks();
  const idx = tasks.findIndex(t => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  tasks[idx].done = !tasks[idx].done;
  tasks[idx].updated_at = new Date().toISOString();
  writeTasks(tasks);

  // If client expects JSON (AJAX), send JSON; otherwise redirect
  if (req.headers.accept && req.headers.accept.includes('application/json')) {
    return res.json({ ok: true, task: tasks[idx] });
  } else {
    return res.redirect('/');
  }
});

// Delete (via form using method-override or ajax)
app.delete('/tasks/:id', (req, res) => {
  let tasks = readTasks();
  const before = tasks.length;
  tasks = tasks.filter(t => t.id !== req.params.id);
  if (tasks.length === before) return res.status(404).send('Task not found');
  writeTasks(tasks);
  res.redirect('/?flash=' + encodeURIComponent('Task deleted'));
});

// Simple health
app.get('/health', (req, res) => res.send('ok'));

app.listen(PORT, () => {
  console.log(`To-Do app listening at http://localhost:${PORT}`);
});
