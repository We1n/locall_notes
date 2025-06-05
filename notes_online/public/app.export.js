// Экспорт заметок в JSON-файл
// Этот файл можно подключить к index.html для экспорта, если основной app.js сложно править автоматически

function exportNotes() {
  if (!window.state || !Array.isArray(state.notes)) {
    alert('Заметки не загружены!');
    return;
  }
  const data = JSON.stringify(state.notes, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'notes_export.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('export-notes-btn');
  if (btn) btn.onclick = exportNotes;
});
