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
    { ru: 'знак @', kz: '«айқұлақ» таңбасы' },
    { ru: 'кнопка «завернуть»', kz: '«қайыру» түймешігі' },
    { ru: 'движение (существительное)', kz: 'қимылдану' },
    { ru: 'двигаться (глагол)', kz: 'қимылдау' },
    { ru: 'анимация', kz: 'анимация' },
    { ru: 'система автоматизированного проектирования', kz: 'автоматтандырылған жобалау жүйесi' },
    { ru: 'абзац', kz: 'азат жол' },
    { ru: 'информатика', kz: 'ақпараттану' },
    { ru: 'на передний план', kz: 'алдына шығару' },
    { ru: 'виртуальная память', kz: 'ауани жады' },
    { ru: 'команда перехода', kz: 'ауысу пәрмені' },
    { ru: 'светлый', kz: 'ашық' },
    { ru: 'использовать по умолчанию', kz: 'әдепкілік қолдану' },
    { ru: 'типовая', kz: 'бiр үлгi' },
    { ru: 'типизация', kz: 'бiр үлгiлеу' },
    { ru: 'курс', kz: 'бағам / бағыт' },
    { ru: 'ориентир, ориентация', kz: 'бағдар' },
    { ru: 'маршрут', kz: 'бағдарғы' },
    { ru: 'маршрутизация', kz: 'бағдарғылау' },
    { ru: 'маршрутизатор', kz: 'бағдарғылауыш' },
    { ru: 'программатор', kz: 'бағдарламалағыш' },
    { ru: 'программное обеспечение', kz: 'бағдарламалық жасақтама' },
    { ru: 'программист', kz: 'бағдарламашы' },
    { ru: 'направление', kz: 'бағыт' },
    { ru: 'главный (компьютер)', kz: 'басты (компьютер)' },
    { ru: 'закрепить', kz: 'бекемдеу' },
    { ru: 'значок', kz: 'белгiше' },
    { ru: 'передача', kz: 'беру, жiберу' },
    { ru: 'веб-компонент', kz: 'веб-құрамдас' },
    { ru: 'веб-узел', kz: 'веб-торап' },
    { ru: 'пакет', kz: 'десте' },
    { ru: 'аудио', kz: 'дыбыс' },
    { ru: 'домен', kz: 'егелік' },
    { ru: 'метка, ярлык', kz: 'ен' },
    { ru: 'вычислительный комплекс', kz: 'есептеу кешенi' },
    { ru: 'вычислительная машина', kz: 'есептеу машинасы' },
    { ru: 'вычислитель', kz: 'есептеуiш' },
    { ru: 'витая пара', kz: 'есулi қоссым' },
    { ru: 'память', kz: 'жады' },
    { ru: 'развернуть', kz: 'жазу' },
    { ru: 'линия', kz: 'желi' },
    { ru: 'бегунок', kz: 'жүгіртпе' },
    { ru: 'бегущая строка', kz: 'жүгіртпе жол' },
    { ru: 'журнал', kz: 'жұрнал' },
    { ru: 'интрасеть', kz: 'интражелі' },
    { ru: 'передача кадра', kz: 'кадр беру' },
    { ru: 'расширение', kz: 'кеңейме, кеңейту' },
    { ru: 'инвертор', kz: 'керiлеуiш' },
    { ru: 'таблица', kz: 'кесте' },
    { ru: 'ключ', kz: 'кілт' },
    { ru: 'входящий', kz: 'кіресін' },
    { ru: 'брошюра', kz: 'кітапша' },
    { ru: 'мини', kz: 'кiшi' },
    { ru: 'миниатюрный', kz: 'кiшiгiрiм' },
    { ru: 'застряла бумага', kz: 'қағаз кептелді' },
    { ru: 'свернуть', kz: 'қайыру' },
    { ru: 'маска', kz: 'қалқа' },
    { ru: 'маскирование', kz: 'қалқалау' },
    { ru: 'полужирный', kz: 'қалың' },
    { ru: 'галочка', kz: 'қанатша' },
    { ru: 'журнал ошибок', kz: 'қателер жұрналы' },
    { ru: 'жесткий диск', kz: 'қатты диск' },
    { ru: 'недоступная команда', kz: 'қол жеткісіз пәрмен' },
    { ru: 'приложение', kz: 'қолданба' },
    { ru: 'добавить', kz: 'қосу' },
    { ru: 'сумма', kz: 'қосынды' },
    { ru: 'суммирование', kz: 'қосындылау' },
    { ru: 'сумматор', kz: 'қосындылауыш' },
    { ru: 'жирный', kz: 'қою' },
    { ru: 'компонент', kz: 'құрамдас' },
    { ru: 'блокировка', kz: 'құрсаулау' },
    { ru: 'шина', kz: 'құрсым' },
    { ru: 'машинно-ориентированный язык', kz: 'машина-бағдарлы тiл' },
    { ru: 'адрес', kz: 'мекенжай' },
    { ru: 'заголовок текста', kz: 'мәтiн тақырыбы' },
    { ru: 'версия', kz: 'нобай' },
    { ru: 'вариант', kz: 'нұсқа' },
    { ru: 'обратить', kz: 'оралту' },
    { ru: 'команда', kz: 'пәрмен' },
    { ru: 'клавиатура', kz: 'пернетақта' },
    { ru: 'режим', kz: 'режiм' },
    { ru: 'классификация', kz: 'сыныптау' },
    { ru: 'панель', kz: 'тақта' },
    { ru: 'заголовок', kz: 'тақырып' },
    { ru: 'маркер', kz: 'таңбалауыш' },
    { ru: 'пиктограмма', kz: 'таңбаша' },
    { ru: 'настройка', kz: 'теңшелім' },
    { ru: 'настроить', kz: 'теңшеу' },
    { ru: 'окно', kz: 'терезе' },
    { ru: 'атрибут', kz: 'төлсипат' },
    { ru: 'корневой каталог', kz: 'түбiрлiк каталог' },
    { ru: 'кнопка', kz: 'түймешік' },
    { ru: 'зависание', kz: 'тұқырып қалу, тұқыру' },
    { ru: 'обои', kz: 'тұсқағаз' },
    { ru: 'стол', kz: 'үстел' },
    { ru: 'верхний колонтитул', kz: 'үстіңгі деректеме' },
    { ru: 'расширение имени файла', kz: 'файл атының кеңеймесi' },
    { ru: 'микро', kz: 'шағын' },
    { ru: 'исходящие', kz: 'шығасын' },
    { ru: 'компактный', kz: 'ықшам' },
    { ru: 'бета-версия', kz: 'ілкі нобай' }
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
