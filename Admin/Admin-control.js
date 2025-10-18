const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function splitLines(v) { return (v || '').split(/\r?\n/).map(x => x.trim()).filter(Boolean) }


// Add List Item
function addListItem(containerId, placeholder = 'Item') {
  const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
  const container = document.getElementById(containerId);
  const wrapper = document.createElement('div');
  wrapper.className = 'input-group';
  wrapper.setAttribute('data-item-id', id);
  wrapper.innerHTML = `
    <span class="input-group-text">${placeholder}</span>
    <input type="text" class="form-control" />
    <button class="btn btn-outline-danger" type="button" data-action="remove">Remove</button>
  `;
  container.appendChild(wrapper);
}


// Collect List
function collectList(containerId) {
  return Array.from(document.getElementById(containerId).querySelectorAll('input'))
    .map(i => i.value.trim()).filter(Boolean);
}

function buildWeekPlanUI() {
  const container = $('#week-plan');
  container.innerHTML = DAYS.map(day => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="border rounded p-2 h-100">
        <h6 class="mb-2">${day}</h6>
        <label class="form-label">Breakfast</label>
        <input type="text" class="form-control mb-2" data-day="${day}" data-meal="breakfast">
        <label class="form-label">Lunch</label>
        <input type="text" class="form-control mb-2" data-day="${day}" data-meal="lunch">
        <label class="form-label">Dinner</label>
        <input type="text" class="form-control" data-day="${day}" data-meal="dinner">
      </div>
    </div>
  `).join('');
}

function addRecipeCard() {
  const i = Date.now().toString(36);
  $('#recipes-list').insertAdjacentHTML('beforeend', `
    <div class="col-12 col-lg-4" data-recipe="${i}">
      <div class="card h-100">
        <div class="card-body">
          <label class="form-label">Title</label>
          <input class="form-control mb-2" data-field="title">
          <div class="row g-2">
            <div class="col-6">
              <label class="form-label">Time (min)</label>
              <input type="number" class="form-control" data-field="time" value="15">
            </div>
            <div class="col-6">
              <label class="form-label">Servings</label>
              <input type="number" class="form-control" data-field="servings" value="2">
            </div>
          </div>
          <label class="form-label mt-2">Image File</label>
          <input type="file" accept="image/*" class="form-control mb-2" data-field="imageFile">
          <label class="form-label">Ingredients (one per line)</label>
          <textarea class="form-control mb-2" rows="3" data-field="ingredients"></textarea>
          <button class="btn btn-sm btn-outline-danger" data-action="remove">Remove</button>
        </div>
      </div>
    </div>
  `);
}

// Exercise Step Card
function addExerciseStepCard() {
  const i = Date.now().toString(36);
  $('#steps-list').insertAdjacentHTML('beforeend', `
    <div class="card" data-step="${i}">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-12">
            <label class="form-label">Step Title</label>
            <input class="form-control" data-field="title" placeholder="Step title">
          </div>
          <div class="col-12">
            <label class="form-label">Step Description</label>
            <textarea class="form-control" rows="3" data-field="description" placeholder="Detailed step description"></textarea>
          </div>
          <div class="col-6">
            <label class="form-label">Duration (seconds)</label>
            <input type="number" class="form-control" data-field="duration" placeholder="30">
          </div>
          <div class="col-6">
            <label class="form-label">Repetitions</label>
            <input type="number" class="form-control" data-field="reps" placeholder="10">
          </div>
          <div class="col-12">
            <label class="form-label">Image File</label>
            <input type="file" accept="image/*" class="form-control" data-field="imageFile">
          </div>
          <div class="col-12">
            <button class="btn btn-sm btn-outline-danger" data-action="remove">Remove Step</button>
          </div>
        </div>
      </div>
    </div>
  `);
}

function collectRecipes() {
  return $$('#recipes-list [data-recipe]').map(card => {
    const get = f => card.querySelector(`[data-field="${f}"]`);
    const fileInput = get('imageFile');
    const file = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;
    return {
      title: get('title').value.trim(),
      time: Number(get('time').value || 0),
      servings: Number(get('servings').value || 0),
      imageName: file ? file.name : '',
      ingredients: splitLines(get('ingredients').value)
    };
  });
}

function collectExerciseSteps() {
  return $$('#steps-list [data-step]').map(card => {
    const get = f => card.querySelector(`[data-field="${f}"]`);
    const fileInput = get('imageFile');
    const file = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;
    return {
      title: get('title').value.trim(),
      description: get('description').value.trim(),
      duration: Number(get('duration').value || 0),
      reps: Number(get('reps').value || 0),
      imageName: file ? file.name : ''
    };
  });
}

// Build Payload
function buildPayload(diet) {
  const week = {};
  DAYS.forEach(day => {
    week[day.toLowerCase()] = {
      breakfast: $(`[data-day="${day}"][data-meal="breakfast"]`).value.trim(),
      lunch: $(`[data-day="${day}"][data-meal="lunch"]`).value.trim(),
      dinner: $(`[data-day="${day}"][data-meal="dinner"]`).value.trim()
    };
  });
  return {
    diet: diet,
    hero: {
      title: $('#hero-title').value.trim(),
      subtitle: $('#hero-subtitle').value.trim()
    },
    overview: {
      title: $('#overview-title').value.trim(),
      text: $('#overview-text').value.trim(),
      features: collectList('features-list')
    },
    foods: {
      allowed: collectList('allowed-list'),
      avoid: collectList('avoid-list')
    },
    week,
    recipes: collectRecipes(),
    tips: collectList('tips-list')
  };
}

// Build Exercise Payload
function buildExercisePayload(exercise) {
  return {
    exercise: exercise,
    hero: {
      title: $('#exercise-hero-title').value.trim(),
      subtitle: $('#exercise-hero-subtitle').value.trim()
    },
    overview: {
      title: $('#exercise-overview-title').value.trim(),
      text: $('#exercise-overview-text').value.trim(),
      difficulty: $('#exercise-difficulty').value,
      duration: Number($('#exercise-duration').value || 0),
      benefits: collectList('benefits-list'),
      category: $('#exercise-category').value,
      muscles: splitLines($('#exercise-muscles').value)
    },
    steps: collectExerciseSteps(),
    equipment: {
      required: collectList('equipment-list'),
      optional: collectList('optional-equipment-list')
    },
    media: (function(){
      const fileInput = document.getElementById('exercise-image');
      const file = fileInput && fileInput.files && fileInput.files[0] ? fileInput.files[0] : null;
      return {
        imageName: file ? file.name : '',
        videoUrl: document.getElementById('exercise-video').value.trim()
      };
    })(),
    tips: collectList('exercise-tips-list')
  };
}

document.getElementById('btn-update-diet').addEventListener('click', () => {
  const diet = $('#diet-select').value;
  const payload = buildPayload(diet);
  console.log(payload);
});

document.getElementById('btn-update-exercise').addEventListener('click', () => {
  const exercise = $('#exercise-select').value;
  const payload = buildExercisePayload(exercise);
  console.log(payload);
});

function show(message, type = 'success') {
  const el = document.createElement('div'); el.className = `alert alert-${type}`; el.style.position = 'fixed'; el.style.left = '16px'; el.style.bottom = '16px'; el.style.zIndex = '9999'; el.textContent = message; document.body.appendChild(el); setTimeout(() => el.remove(), 2200);
}

document.addEventListener('DOMContentLoaded', () => {
  buildWeekPlanUI();
  
  // Navigation between sections
  const sidebarItems = document.querySelectorAll('.sidebar ul li');
  const dietsContainer = document.querySelector('.diets-container');
  const exercisesContainer = document.querySelector('.exercises-container');
  const usersContainer = document.querySelector('.users-container');
  
  sidebarItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      // Remove active class from all items
      sidebarItems.forEach(li => li.classList.remove('active'));
      // Add active class to clicked item
      item.classList.add('active');
      
      // Show/hide containers based on selection
      if (index === 0) { 
        dietsContainer.style.display = 'block';
        exercisesContainer.style.display = 'none';
        usersContainer.style.display = 'none';
      } else if (index === 1) { 
        dietsContainer.style.display = 'none';
        exercisesContainer.style.display = 'block';
        usersContainer.style.display = 'none';
      } else if (index === 2) {
        dietsContainer.style.display = 'none';
        exercisesContainer.style.display = 'none';
        usersContainer.style.display = 'block';
      } else if (index === 3) { 
        dietsContainer.style.display = 'none';
        exercisesContainer.style.display = 'none';
        usersContainer.style.display = 'none';
      } else {
        dietsContainer.style.display = 'none';
        exercisesContainer.style.display = 'none';
        usersContainer.style.display = 'none';
      }
    });
  });
  
  // diet switcher (placeholder to hook loading/saving by diet)
  document.getElementById('diet-select').addEventListener('change', (e) => {
    const diet = e.target.value;
    // TODO: load diet data from backend by selected diet
    // Example: fetch(`/api/pages/diet/${diet}`).then(...)
  });
  
  // exercise switcher
  document.getElementById('exercise-select').addEventListener('change', (e) => {
    const exercise = e.target.value;
    // TODO: load exercise data from backend by selected exercise
    // Example: fetch(`/api/pages/exercise/${exercise}`).then(...)
  });
  
  // dynamic lists for diets
  document.getElementById('btn-add-feature')?.addEventListener('click', () => addListItem('features-list', 'Feature'));
  document.getElementById('btn-add-allowed')?.addEventListener('click', () => addListItem('allowed-list', 'Food'));
  document.getElementById('btn-add-avoid')?.addEventListener('click', () => addListItem('avoid-list', 'Food'));
  document.getElementById('btn-add-tip')?.addEventListener('click', () => addListItem('tips-list', 'Tip'));

  // dynamic lists for exercises
  document.getElementById('btn-add-benefit')?.addEventListener('click', () => addListItem('benefits-list', 'Benefit'));
  document.getElementById('btn-add-equipment')?.addEventListener('click', () => addListItem('equipment-list', 'Equipment'));
  document.getElementById('btn-add-optional-equipment')?.addEventListener('click', () => addListItem('optional-equipment-list', 'Equipment'));
  document.getElementById('btn-add-exercise-tip')?.addEventListener('click', () => addListItem('exercise-tips-list', 'Tip'));
  document.getElementById('btn-add-step')?.addEventListener('click', addExerciseStepCard);

  document.addEventListener('click', (e) => {
    if (e.target.matches('[data-action="remove"]')) {
      const row = e.target.closest('[data-item-id]');
      if (row) row.remove();
    }
  });
  $('#btn-add-recipe').addEventListener('click', addRecipeCard);
  $('#recipes-list').addEventListener('click', (e) => {
    if (e.target.matches('[data-action="remove"]')) {
      e.target.closest('[data-recipe]').remove();
    }
  });
  $('#steps-list').addEventListener('click', (e) => {
    if (e.target.matches('[data-action="remove"]')) {
      e.target.closest('[data-step]').remove();
    }
  });
});



// ---------------- Users Module ----------------
const USERS_PAGE_SIZE = 8;
let usersData = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '1234567890', role: 'user', status: 'active' },
  { id: 2, name: 'Jane Doe', email: 'jane.doe@example.com', phone: '1234567890', role: 'admin', status: 'active' },
  { id: 3, name: 'Adam Smith', email: 'adam@site.com', phone: '555111222', role: 'user', status: 'suspended' },
];

function renderUsersTable(list) {
  const tbody = document.getElementById('users-tbody');
  const count = document.getElementById('users-count');
  tbody.innerHTML = list.map(u => `
    <tr>
      <td>${u.id}</td>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.phone || ''}</td>
      <td><span class="badge bg-${u.role==='admin'?'secondary':'info'}">${u.role}</span></td>
      <td><span class="badge bg-${u.status==='active'?'success':'warning'}">${u.status}</span></td>
      <td class="text-end">
        <button class="btn btn-sm btn-primary" data-action="edit" data-id="${u.id}">Edit</button>
        <button class="btn btn-sm btn-danger" data-action="delete" data-id="${u.id}">Delete</button>
      </td>
    </tr>
  `).join('');
  count.textContent = `${list.length} users`;
}

function filterUsers() {
  const term = (document.getElementById('user-search').value || '').toLowerCase();
  const role = document.getElementById('user-role-filter').value;
  const status = document.getElementById('user-status-filter').value;
  return usersData.filter(u => {
    const matchesTerm = !term || u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term);
    const matchesRole = !role || u.role === role;
    const matchesStatus = !status || u.status === status;
    return matchesTerm && matchesRole && matchesStatus;
  });
}

function openUserModal(user) {
  const modalEl = document.getElementById('userModal');
  if (!modalEl) return;
  const modal = new bootstrap.Modal(modalEl);
  document.getElementById('userModalLabel').textContent = user ? 'Edit User' : 'Add User';
  document.getElementById('user-id').value = user ? user.id : '';
  document.getElementById('user-name').value = user ? user.name : '';
  document.getElementById('user-email').value = user ? user.email : '';
  document.getElementById('user-phone').value = user ? (user.phone || '') : '';
  document.getElementById('user-role').value = user ? user.role : 'user';
  document.getElementById('user-status').value = user ? user.status : 'active';
  modal.show();
}

function saveUserFromModal() {
  const id = document.getElementById('user-id').value.trim();
  const name = document.getElementById('user-name').value.trim();
  const email = document.getElementById('user-email').value.trim();
  const phone = document.getElementById('user-phone').value.trim();
  const role = document.getElementById('user-role').value;
  const status = document.getElementById('user-status').value;
  if (!name || !email) { show('Name and Email are required', 'danger'); return; }
  if (id) {
    // update
    const idx = usersData.findIndex(u => String(u.id) === id);
    if (idx !== -1) usersData[idx] = { ...usersData[idx], name, email, phone, role, status };
  } else {
    // create
    const newId = (usersData.at(-1)?.id || 0) + 1;
    usersData.push({ id: newId, name, email, phone, role, status });
  }
  bootstrap.Modal.getInstance(document.getElementById('userModal'))?.hide();
  renderUsersTable(filterUsers());
  show('Saved successfully');
}

function attachUsersEvents() {
  document.getElementById('user-search').addEventListener('input', () => renderUsersTable(filterUsers()));
  document.getElementById('user-role-filter').addEventListener('change', () => renderUsersTable(filterUsers()));
  document.getElementById('user-status-filter').addEventListener('change', () => renderUsersTable(filterUsers()));
  document.getElementById('btn-add-user').addEventListener('click', () => openUserModal(null));
  document.getElementById('btn-save-user').addEventListener('click', saveUserFromModal);
  document.getElementById('users-tbody').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const id = Number(btn.getAttribute('data-id'));
    if (btn.getAttribute('data-action') === 'edit') {
      const user = usersData.find(u => u.id === id);
      if (user) openUserModal(user);
    } else if (btn.getAttribute('data-action') === 'delete') {
      usersData = usersData.filter(u => u.id !== id);
      renderUsersTable(filterUsers());
      show('Deleted');
    }
  });
}

// init users when container becomes visible first time
let usersInited = false;
const usersObserver = new MutationObserver(() => {
  const usersContainer = document.querySelector('.users-container');
  if (!usersInited && usersContainer && usersContainer.style.display !== 'none') {
    usersInited = true;
    renderUsersTable(filterUsers());
    attachUsersEvents();
  }
});
usersObserver.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['style', 'class'] });


const toggleIcon = document.getElementById('arrow-open');
if (toggleIcon) {
  toggleIcon.addEventListener('click', (e) => {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.classList.toggle('toggle-sidebar');
    toggleIcon.classList.toggle('toggle');
  });

  // Ensure correct state on resize: keep sidebar visible on desktop
  window.addEventListener('resize', () => {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    if (window.innerWidth > 768) {
      sidebar.classList.remove('toggle-sidebar');
      toggleIcon.classList.remove('toggle');
    }
  });
}

