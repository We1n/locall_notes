// Тема (dark/light)
(function() {
  const theme = localStorage.getItem('theme') || 'light';
  document.body.classList.toggle('dark', theme==='dark');
  const btn = document.getElementById('toggle-theme');
  if (btn) btn.textContent = theme==='dark' ? '☀️' : '🌙';
})();

// Основная логика приложения
const api = {
  async getNotes() {
    return fetch('/api/notes').then(r => r.json());
  },
  async getTags() {
    return fetch('/api/tags').then(r => r.json());
  },
  async getCategories() {
    return fetch('/api/categories').then(r => r.json());
  },
  async addNote(formData) {
    return fetch('/api/notes', {
      method: 'POST',
      body: formData
    }).then(r => r.json());
  }
};

const state = {
  notes: [],
  tags: [],
  categories: [],
  filterTag: null,
  filterCategory: null,
  search: ''
};

function renderSidebar() {
  // Категории
  const catList = document.getElementById('category-list');
  catList.innerHTML = '<li><a href="#" class="hover:underline" data-cat="">Все</a></li>' +
    state.categories.map(cat => `<li><a href="#" class="hover:underline" data-cat="${cat}">${cat}</a></li>`).join('');
  catList.querySelectorAll('a').forEach(a => {
    a.onclick = e => {
      e.preventDefault();
      state.filterCategory = a.dataset.cat || null;
      renderNotes();
    };
  });
  // Теги (множественный выбор)
  const tagSelect = document.getElementById('tag-multiselect');
  if (tagSelect) {
    // Группировка тегов по иерархии (разделитель ':')
    const tagTree = {};
    state.tags.forEach(tag => {
      const [root, ...rest] = tag.split(':');
      if (!tagTree[root]) tagTree[root] = [];
      if (rest.length) tagTree[root].push(tag);
      else tagTree[root].unshift(tag);
    });
    let html = '';
    Object.keys(tagTree).forEach(root => {
      tagTree[root].forEach(tag => {
        const isSub = tag !== root;
        html += `<option value="${tag}">${isSub ? '— ' : ''}${tag}</option>`;
      });
    });
    tagSelect.innerHTML = html;
    tagSelect.onchange = function() {
      state.filterTags = Array.from(tagSelect.selectedOptions).map(opt => opt.value);
      renderNotes();
    };
  }
}


function renderNotes() {
  let filtered = state.notes;
  if (state.filterCategory) filtered = filtered.filter(n => n.category === state.filterCategory);
  if (Array.isArray(state.filterTags) && state.filterTags.length > 0) {
    filtered = filtered.filter(n => state.filterTags.every(tag => n.tags.includes(tag)));
  }
  if (state.search) {
    const s = state.search.toLowerCase();
    filtered = filtered.filter(n => n.title.toLowerCase().includes(s) || n.content.toLowerCase().includes(s));
  }
  // Сортировка
  const sort = state.sort || 'date_desc';
  filtered = [...filtered];
  if (sort === 'custom') {
    let order = [];
    try { order = JSON.parse(localStorage.getItem('customOrder')||'[]'); } catch(e){}
    if (order.length) {
      filtered.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
    }
  } else if (sort === 'date_desc') filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  else if (sort === 'date_asc') filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
  else if (sort === 'title_asc') filtered.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
  else if (sort === 'title_desc') filtered.sort((a, b) => b.title.localeCompare(a.title, 'ru'));
  else if (sort === 'tags_desc') filtered.sort((a, b) => (b.tags?.length||0) - (a.tags?.length||0));
  else if (sort === 'tags_asc') filtered.sort((a, b) => (a.tags?.length||0) - (b.tags?.length||0));
  const notesList = document.getElementById('notes-list');
  notesList.innerHTML = filtered.map(note => {
    const drag = sort==='custom' ? 'draggable="true"' : '';
    return `<div class="border rounded p-3 bg-gray-50 shadow-sm note-card" data-id="${note.id}" ${drag}>
      <div class="flex justify-between items-center mb-2">
        <span class="font-bold">${note.title}</span>
        <span class="text-xs text-gray-400">${note.date.split('T')[0]}</span>
      </div>
      <div>
        <div class="font-bold text-lg truncate mb-1">${note.title || 'Без названия'}</div>
        <div class="text-xs text-gray-400 mb-1">${note.date ? new Date(note.date).toLocaleDateString() : ''}</div>
        <div class="text-gray-600 dark:text-gray-300 text-sm mb-2" style="display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;">${note.content ? note.content.replace(/\n/g,'<br>') : ''}</div>
        <div class="flex flex-wrap gap-1 mb-1">
          ${(note.tags||[]).map(tag => `<span class="${chipColor(tag)}">${tag}</span>`).join('')}
        </div>
      </div>
      ${note.attachments && note.attachments.length ? `
        <div class="mt-2">
          <div class="font-semibold text-xs mb-1">Вложения:</div>
          <ul class="space-y-1">
            ${note.attachments.map(f => `
              <li>
                <a href="${f.data}" download="${f.name}" target="_blank" class="inline-flex items-center gap-1 text-blue-700 hover:underline">
                  ${f.type && f.type.includes('pdf') ? '📄' : f.type && f.type.includes('text') ? '📄' : '📎'}
                  ${f.name}
                </a>
              </li>
            `).join('')}
          </ul>
        </div>
      ` : ''}
    </div>`;
  }).join('') || '<div class="text-gray-400">Нет заметок</div>';
  // Drag-and-drop обработчики
  if (state.sort==='custom') {
    let dragSrcId = null;
    document.querySelectorAll('.note-card').forEach(card => {
      card.ondragstart = e => {
        dragSrcId = card.dataset.id;
        e.dataTransfer.effectAllowed = 'move';
      };
      card.ondragover = e => {
        e.preventDefault();
        card.classList.add('ring', 'ring-blue-300');
      };
      card.ondragleave = e => {
        card.classList.remove('ring', 'ring-blue-300');
      };
      card.ondrop = e => {
        e.preventDefault();
        card.classList.remove('ring', 'ring-blue-300');
        const tgtId = card.dataset.id;
        if (dragSrcId && tgtId && dragSrcId!==tgtId) {
          let order = [];
          try { order = JSON.parse(localStorage.getItem('customOrder')||'[]'); } catch(e){}
          if (!order.length) order = filtered.map(n=>n.id);
          const from = order.indexOf(dragSrcId);
          const to = order.indexOf(tgtId);
          if (from>-1 && to>-1) {
            order.splice(to, 0, order.splice(from, 1)[0]);
            localStorage.setItem('customOrder', JSON.stringify(order));
            renderNotes();
          }
        }
      };
    });
  }
  // Навешиваем обработчики на кнопки редактирования
  document.querySelectorAll('.edit-note-btn').forEach(btn => {
    btn.onclick = () => openEditModal(btn.dataset.id);
  });
}

function openEditModal(noteId) {
  const note = state.notes.find(n => n.id === noteId);
  if (!note) return;
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modal-title').textContent = 'Редактировать заметку';
  document.getElementById('note-id').value = note.id;
  document.getElementById('note-title').value = note.title;
  document.getElementById('note-category').value = note.category || '';
  document.getElementById('note-tags').value = note.tags ? note.tags.join(', ') : '';
  document.getElementById('note-content').value = note.content;
  // Показать кнопку удаления
  const delBtn = document.getElementById('delete-note-btn');
  if (delBtn) delBtn.classList.remove('hidden');
  // Не трогаем картинку (можно добавить логику замены при необходимости)
}


// openModal теперь сбрасывает поля и ставит заголовок
function openModal() {
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('modal-title').textContent = 'Новая заметка';
  document.getElementById('note-form').reset();
  document.getElementById('note-id').value = '';
  // Скрыть кнопку удаления
  const delBtn = document.getElementById('delete-note-btn');
  if (delBtn) delBtn.classList.add('hidden');
}



function openModal() {
  document.getElementById('modal').classList.remove('hidden');
  document.getElementById('note-form').reset();
  document.getElementById('note-id').value = '';
}
function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

document.getElementById('add-note-btn').onclick = openModal;
document.getElementById('close-modal').onclick = closeModal;
document.getElementById('modal').onclick = e => {
  if (e.target === document.getElementById('modal')) closeModal();
};
document.getElementById('search').oninput = e => {
  state.search = e.target.value;
  renderNotes();
};

document.getElementById('note-form').onsubmit = async function(e) {
  e.preventDefault();
  const noteId = document.getElementById('note-id').value;
  // Чтение файлов как Data URL
  const files = document.getElementById('note-files').files;
  const attachments = [];
  if (files && files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      // eslint-disable-next-line no-loop-func
      const promise = new Promise(resolve => {
        reader.onload = () => {
          attachments.push({
            name: file.name,
            type: file.type,
            data: reader.result
          });
          resolve();
        };
        reader.readAsDataURL(file);
      });
      await promise;
    }
  }
  // Проверка лимита localStorage (грубо, только для предупреждения)
  try {
    const test = JSON.stringify(attachments);
    if (test.length > 4000000) {
      alert('Внимание! Слишком много/большие файлы. Возможен лимит localStorage.');
    }
  } catch(e) {}
  // Сохраняем заметку в localStorage
  const note = {
    id: noteId || ('note_' + Date.now()),
    title: document.getElementById('note-title').value,
    category: document.getElementById('note-category').value,
    tags: document.getElementById('note-tags').value.split(',').map(t=>t.trim()).filter(Boolean),
    content: document.getElementById('note-content').value,
    attachments,
    date: noteId ? (state.notes.find(n=>n.id===noteId)?.date || new Date().toISOString()) : new Date().toISOString()
  };
  // Картинка (image) отдельно
  if (document.getElementById('note-image').files[0]) {
    const imgFile = document.getElementById('note-image').files[0];
    const imgReader = new FileReader();
    const imgPromise = new Promise(resolve => {
      imgReader.onload = () => {
        note.image = imgReader.result;
        resolve();
      };
      imgReader.readAsDataURL(imgFile);
    });
    await imgPromise;
  } else if (noteId) {
    // Сохраняем старую картинку при редактировании, если не выбрана новая
    note.image = (state.notes.find(n=>n.id===noteId)?.image)||null;
  }
  // Сохраняем в localStorage
  let notes = JSON.parse(localStorage.getItem('notes')||'[]');
  if (noteId) {
    notes = notes.map(n => n.id === noteId ? note : n);
  } else {
    notes.push(note);
  }
  localStorage.setItem('notes', JSON.stringify(notes));
  closeModal();
  await loadData();
};

async function loadData() {
  [state.notes, state.tags, state.categories] = await Promise.all([
    api.getNotes(), api.getTags(), api.getCategories()
  ]);
  renderSidebar();
  renderNotes();
  // Автодополнение тегов
  const datalist = document.getElementById('tags-datalist');
  if (datalist && Array.isArray(state.tags)) {
    datalist.innerHTML = state.tags.map(tag => `<option value="${tag}">`).join('');
  }
}

loadData();

// Сортировка: обработчик
const sortSelect = document.getElementById('sort-notes');
if (sortSelect) {
  sortSelect.onchange = function() {
    state.sort = sortSelect.value;
    renderNotes();
  };
  // Инициализация значения
  state.sort = sortSelect.value;
}

// Удаление заметки через модалку
const delBtn = document.getElementById('delete-note-btn');
if (delBtn) {
  delBtn.onclick = function() {
    const noteId = document.getElementById('note-id').value;
    if (!noteId) return;
    if (confirm('Удалить эту заметку?')) {
      let notes = JSON.parse(localStorage.getItem('notes')||'[]');
      notes = notes.filter(n => n.id !== noteId);
      localStorage.setItem('notes', JSON.stringify(notes));
      closeModal();
      loadData();
    }
  };
}

// Импорт заметок
const importBtn = document.getElementById('import-notes-btn');
const importInput = document.getElementById('import-notes-input');
if (importBtn && importInput) {
  importBtn.onclick = () => importInput.click();
  importInput.onchange = function(e) {
    const file = importInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function() {
      try {
        const imported = JSON.parse(reader.result);
        if (!Array.isArray(imported)) throw new Error('Некорректный формат файла');
        if (!confirm('Импортировать ' + imported.length + ' заметок?')) return;
        let notes = JSON.parse(localStorage.getItem('notes')||'[]');
        const ids = new Set(notes.map(n=>n.id));
        let added = 0;
        imported.forEach(n => {
          if (n.id && !ids.has(n.id)) {
            notes.push(n);
            ids.add(n.id);
            added++;
          }
        });
        localStorage.setItem('notes', JSON.stringify(notes));
        alert('Импортировано заметок: '+added);
        loadData();
      } catch(e) {
        alert('Ошибка импорта: '+e.message);
      }
      importInput.value = '';
    };
    reader.readAsText(file);
  };
}
