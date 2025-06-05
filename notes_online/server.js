const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = 3000;

const NOTES_DIR = path.join(__dirname, 'notes');
const PUBLIC_DIR = path.join(__dirname, 'public');
if (!fs.existsSync(NOTES_DIR)) fs.mkdirSync(NOTES_DIR);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, NOTES_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const fname = 'img_' + Date.now() + ext;
    cb(null, fname);
  }
});
const upload = multer({ storage });

app.use(express.static(PUBLIC_DIR));

// Получить все заметки
app.get('/api/notes', (req, res) => {
  const files = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.json'));
  const notes = files.map(f => {
    const note = JSON.parse(fs.readFileSync(path.join(NOTES_DIR, f), 'utf8'));
    if (note.image) note.image = '/notes/' + note.image;
    return note;
  });
  res.json(notes.sort((a,b) => b.date.localeCompare(a.date)));
});

// Получить все теги
app.get('/api/tags', (req, res) => {
  const files = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.json'));
  const tags = new Set();
  files.forEach(f => {
    const note = JSON.parse(fs.readFileSync(path.join(NOTES_DIR, f), 'utf8'));
    (note.tags||[]).forEach(t => tags.add(t));
  });
  res.json(Array.from(tags));
});

// Получить все категории
app.get('/api/categories', (req, res) => {
  const files = fs.readdirSync(NOTES_DIR).filter(f => f.endsWith('.json'));
  const cats = new Set();
  files.forEach(f => {
    const note = JSON.parse(fs.readFileSync(path.join(NOTES_DIR, f), 'utf8'));
    if (note.category) cats.add(note.category);
  });
  res.json(Array.from(cats));
});

// Получить картинки
app.use('/notes', express.static(NOTES_DIR));

// Добавить новую заметку
app.post('/api/notes', upload.single('image'), express.urlencoded({ extended: true }), (req, res) => {
  const { id, title, content, tags, category } = req.body;
  if (id) {
    // Редактирование существующей заметки
    const notePath = path.join(NOTES_DIR, id + '.json');
    if (fs.existsSync(notePath)) {
      const oldNote = JSON.parse(fs.readFileSync(notePath, 'utf8'));
      const updatedNote = {
        ...oldNote,
        title,
        content,
        tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        category,
        date: oldNote.date, // дата создания не меняется
        image: req.file ? req.file.filename : oldNote.image
      };
      fs.writeFileSync(notePath, JSON.stringify(updatedNote, null, 2));
      return res.json({ ok: true });
    } else {
      return res.status(404).json({ error: 'Note not found' });
    }
  } else {
    // Создание новой заметки
    const note = {
      id: 'note_' + Date.now(),
      title,
      content,
      tags: tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      category,
      date: new Date().toISOString(),
      image: req.file ? req.file.filename : null
    };
    fs.writeFileSync(path.join(NOTES_DIR, note.id + '.json'), JSON.stringify(note, null, 2));
    res.json({ ok: true });
  }
});

app.listen(PORT, () => {
  console.log(`Notes app running on http://localhost:${PORT}`);
});
