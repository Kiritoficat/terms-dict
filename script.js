const STORAGE_KEY = 'terminology_data';

let terms = [];

function loadTerms() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      terms = JSON.parse(stored);
    } catch (e) {
      console.error('Error loading terms:', e);
      terms = getSampleTerms();
      saveTerms();
    }
  } else {
    terms = getSampleTerms();
    saveTerms();
  }
}

function saveTerms() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(terms));
}

function getSampleTerms() {
  return [
    { ru: 'Напоминание', kz: 'Еске салғыш' },
    { ru: 'Поток', kz: 'Ағын' },
    { ru: 'База данных', kz: 'Деректер қоймасы' },
    { ru: 'Программа', kz: 'Бағдарлама' },
    { ru: 'Сеть', kz: 'Желі' },
    { ru: 'Окно', kz: 'Терезе' },
    { ru: 'Файл', kz: 'Файл' },
    { ru: 'Папка', kz: 'Бума' },
    { ru: 'Клавиатура', kz: 'Пернетақта' },
    { ru: 'Мышь', kz: 'Тышқан' }
  ];
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function getPageType() {
  return document.body.classList.contains('admin-page') ? 'admin' : 'dictionary';
}

if (getPageType() === 'dictionary') {
  initDictionary();
} else {
  initAdmin();
}

function initDictionary() {
  const searchInput = document.getElementById('search-input');
  const tableBody = document.getElementById('table-body');
  const termCount = document.getElementById('term-count');
  const filteredCount = document.getElementById('filtered-count');

  loadTerms();
  renderDictionary();

  searchInput.addEventListener('input', (e) => {
    renderDictionary(e.target.value.toLowerCase());
  });

  function renderDictionary(query = '') {
    const filtered = query
      ? terms.filter(
          term =>
            term.ru.toLowerCase().includes(query) ||
            term.kz.toLowerCase().includes(query)
        )
      : terms;

    if (filtered.length === 0) {
      tableBody.innerHTML = '<tr class="empty-row"><td colspan="2">No terms found</td></tr>';
      termCount.textContent = `${terms.length} ${terms.length === 1 ? 'term' : 'terms'}`;
      filteredCount.textContent = '';
      return;
    }

    tableBody.innerHTML = filtered
      .map(
        (term) =>
          `
      <tr>
        <td>${escapeHtml(term.ru)}</td>
        <td>${escapeHtml(term.kz)}</td>
      </tr>
    `
      )
      .join('');

    termCount.textContent = `${terms.length} ${terms.length === 1 ? 'term' : 'terms'}`;

    if (query && filtered.length < terms.length) {
      filteredCount.textContent = `(showing ${filtered.length})`;
    } else {
      filteredCount.textContent = '';
    }
  }
}

function initAdmin() {
  const addTermForm = document.getElementById('add-term-form');
  const termsList = document.getElementById('terms-list');
  const adminCount = document.getElementById('admin-count');
  const exportBtn = document.getElementById('export-btn');
  const importBtn = document.getElementById('import-btn');
  const importFile = document.getElementById('import-file');
  const clearBtn = document.getElementById('clear-btn');

  let editingIndex = null;

  loadTerms();
  renderAdminTerms();

  addTermForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const ru = document.getElementById('term-ru').value.trim();
    const kz = document.getElementById('term-kz').value.trim();

    if (ru && kz) {
      if (editingIndex !== null) {
        terms[editingIndex] = { ru, kz };
        editingIndex = null;
        addTermForm.querySelector('button').textContent = 'Add Term';
      } else {
        terms.unshift({ ru, kz });
      }

      saveTerms();
      addTermForm.reset();
      document.getElementById('term-ru').focus();
      renderAdminTerms();
    }
  });

  function renderAdminTerms() {
    if (terms.length === 0) {
      termsList.innerHTML = `
        <div class="empty-state">
          <p>No terms added yet. Create your first term above!</p>
        </div>
      `;
      adminCount.textContent = '0 terms';
      return;
    }

    termsList.innerHTML = terms
      .map(
        (term, index) => `
      <div class="term-item">
        <div class="term-content">
          <div class="term-ru">${escapeHtml(term.ru)}</div>
          <div class="term-kz">${escapeHtml(term.kz)}</div>
        </div>
        <div class="term-actions">
          <button class="btn-edit" onclick="editTerm(${index})">Edit</button>
          <button class="btn-delete" onclick="deleteTerm(${index})">Delete</button>
        </div>
      </div>
    `
      )
      .join('');

    adminCount.textContent = `${terms.length} ${terms.length === 1 ? 'term' : 'terms'}`;
  }

  window.editTerm = (index) => {
    const term = terms[index];
    document.getElementById('term-ru').value = term.ru;
    document.getElementById('term-kz').value = term.kz;
    editingIndex = index;
    addTermForm.querySelector('button').textContent = 'Update Term';
    document.getElementById('term-ru').focus();
  };

  window.deleteTerm = (index) => {
    if (confirm('Are you sure you want to delete this term?')) {
      terms.splice(index, 1);
      saveTerms();
      renderAdminTerms();
      if (editingIndex === index) {
        addTermForm.reset();
        editingIndex = null;
        addTermForm.querySelector('button').textContent = 'Add Term';
      }
    }
  };

  exportBtn.addEventListener('click', () => {
    const dataStr = JSON.stringify(terms, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `terminology-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  });

  importBtn.addEventListener('click', () => {
    importFile.click();
  });

  importFile.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported) && imported.every(t => t.ru && t.kz)) {
          if (
            confirm(`Import ${imported.length} terms? This will replace your current data.`)
          ) {
            terms = imported;
            saveTerms();
            renderAdminTerms();
            addTermForm.reset();
            editingIndex = null;
            addTermForm.querySelector('button').textContent = 'Add Term';
            alert('Data imported successfully!');
          }
        } else {
          alert('Invalid file format. Each term must have "ru" and "kz" fields.');
        }
      } catch (error) {
        alert('Error reading file. Please select a valid JSON file.');
      }
    };
    reader.readAsText(file);
    importFile.value = '';
  });

  clearBtn.addEventListener('click', () => {
    if (
      confirm('Are you sure you want to delete ALL terms? This action cannot be undone.')
    ) {
      if (confirm('Really delete everything? This is your last chance!')) {
        terms = [];
        saveTerms();
        renderAdminTerms();
        addTermForm.reset();
        editingIndex = null;
        addTermForm.querySelector('button').textContent = 'Add Term';
      }
    }
  });
}
