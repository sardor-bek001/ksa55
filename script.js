// Data (Ma'lumotlar bazasi)
let projects = [
    { id: 1, name: "Web-sayt Yaratish", client: "Artel Group", deadline: "2026-10-25", budget: 3500, status: "In Progress" },
    { id: 2, name: "Mobil Ilova (iOS/Android)", client: "Korzinka Market", deadline: "2026-11-10", budget: 8200, status: "Pending" },
    { id: 3, name: "CRM Tizimi Integratsiyasi", client: "IT Park Uzbekistan", deadline: "2026-10-15", budget: 5000, status: "Completed" },
    { id: 4, name: "SMM & Reklama Kampaniyasi", client: "Texnomart", deadline: "2026-10-30", budget: 1500, status: "In Progress" }
];

const clients = [
    { name: "Artel Group", category: "Maishiy texnika", projects: 4, phone: "+998 71 200 00 00" },
    { name: "Korzinka Market", category: "Reteil va Savdo", projects: 2, phone: "+998 71 140 14 14" },
    { name: "IT Park Uzbekistan", category: "Texnologiyalar", projects: 6, phone: "+998 71 209 11 99" },
    { name: "Texnomart", category: "Elektronika", projects: 3, phone: "+998 71 200 12 34" }
];

const team = [
    { name: "Jasur Raximov", role: "Akkount Menedjer", email: "jasur@corppro.uz" },
    { name: "Malika Alimova", role: "Lead UI/UX Dizayner", email: "malika@corppro.uz" },
    { name: "Bekzod Umarov", role: "Senior Full-Stack Dasturchi", email: "bekzod@corppro.uz" },
    { name: "Dilnoza Nodirova", role: "Moliya Mutaxassisi", email: "dilnoza@corppro.uz" }
];

// 1. Bo'limlar (Tab) o'rtasida o'tish
function switchSection(sectionId, event) {
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.menu-item').forEach(btn => btn.classList.remove('active'));

    document.getElementById(sectionId).classList.add('active');
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
}

// 2. Loyihalar jadvalini yuklash
function renderTable(data) {
    const tbody = document.getElementById('projectsTableBody');
    tbody.innerHTML = data.map(p => `
        <tr>
            <td><strong>${p.name}</strong></td>
            <td>${p.client}</td>
            <td>${p.deadline}</td>
            <td><strong>$${p.budget}</strong></td>
            <td><span class="badge ${getStatusBadgeClass(p.status)}">${p.status}</span></td>
            <td>
                <button class="btn-secondary" style="padding:4px 8px;" onclick="deleteProject(${p.id})">
                    <i class="fa-solid fa-trash" style="color:red;"></i>
                </button>
            </td>
        </tr>
    `).join('');

    document.getElementById('statProjectCount').innerText = `${data.length} ta`;
}

function getStatusBadgeClass(status) {
    if (status === 'In Progress') return 'info';
    if (status === 'Completed') return 'success';
    return 'warning';
}

// 3. Kanban doskasini yuklash
function renderKanban() {
    const colTodo = document.getElementById('colTodo');
    const colInProgress = document.getElementById('colInProgress');
    const colDone = document.getElementById('colDone');

    colTodo.innerHTML = '';
    colInProgress.innerHTML = '';
    colDone.innerHTML = '';

    projects.forEach(p => {
        const cardHtml = `
            <div class="kanban-card">
                <h4>${p.name}</h4>
                <small style="color:var(--text-secondary)">Mijoz: ${p.client}</small>
                <div style="margin-top:8px; font-weight:bold;">$${p.budget}</div>
            </div>
        `;

        if (p.status === 'Pending') colTodo.innerHTML += cardHtml;
        else if (p.status === 'In Progress') colInProgress.innerHTML += cardHtml;
        else if (p.status === 'Completed') colDone.innerHTML += cardHtml;
    });
}

// 4. Mijozlar va Jamoani chiqarish
function renderClientsAndTeam() {
    const clientsGrid = document.getElementById('clientsGrid');
    clientsGrid.innerHTML = clients.map(c => `
        <div class="client-card">
            <i class="fa-solid fa-building" style="font-size:2rem; color:var(--primary); margin-bottom:10px;"></i>
            <h3>${c.name}</h3>
            <p style="color:var(--text-secondary); font-size:0.9rem;">${c.category}</p>
            <div style="margin:10px 0;"><strong>${c.projects} ta</strong> faol loyiha</div>
            <small>${c.phone}</small>
        </div>
    `).join('');

    const teamGrid = document.getElementById('teamGrid');
    teamGrid.innerHTML = team.map(t => `
        <div class="team-card">
            <i class="fa-solid fa-user-circle" style="font-size:2.5rem; color:var(--purple); margin-bottom:10px;"></i>
            <h3>${t.name}</h3>
            <p style="color:var(--primary); font-size:0.9rem; font-weight:600;">${t.role}</p>
            <small style="color:var(--text-secondary); display:block; margin-top:8px;">${t.email}</small>
        </div>
    `).join('');
}

// 5. Yangi loyiha qo'shish (Modal)
function openNewProjectModal() {
    document.getElementById('projectModal').classList.add('active');
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('active');
}

function addProjectFromModal() {
    const name = document.getElementById('modalProjName').value;
    const client = document.getElementById('modalClient').value;
    const budget = document.getElementById('modalBudget').value;
    const status = document.getElementById('modalStatus').value;

    if (!name || !client || !budget) {
        alert("Iltimos, barcha maydonlarni to'ldiring!");
        return;
    }

    const newProj = {
        id: Date.now(),
        name,
        client,
        deadline: new Date().toISOString().split('T')[0],
        budget: Number(budget),
        status
    };

    projects.push(newProj);
    renderTable(projects);
    renderKanban();
    closeModal();

    // Inputlarni tozalash
    document.getElementById('modalProjName').value = '';
    document.getElementById('modalClient').value = '';
    document.getElementById('modalBudget').value = '';
}

// 6. Loyihani o'chirish
function deleteProject(id) {
    projects = projects.filter(p => p.id !== id);
    renderTable(projects);
    renderKanban();
}

// 7. Qidiruv funksiyasi
function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = projects.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.client.toLowerCase().includes(query)
    );
    renderTable(filtered);
}

function showNotification() {
    alert("Yangi xabarnomalar yo'q. Tizim va ma'lumotlar barqaror ishlamoqda!");
}

function exportData() {
    alert("Loyiha ma'lumotlari CSV shaklida eksport qilindi!");
}

// Boshlang'ich yuklash
renderTable(projects);
renderKanban();
renderClientsAndTeam();


/* ============================================================
   QO'SHIMCHA MODUL
   (Yuqoridagi eski kod o'zgarmagan. Quyidagi funksiyalar
   o'sha nomdagi eski funksiyalarning o'rnini bosadi.)
   ============================================================ */

// ---------- Yordamchi funksiyalar ----------
const LS = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};
const pad = n => String(n).padStart(2, '0');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmtMoney = n => '$' + Number(n).toLocaleString('en-US');
const setText = (id, t) => { const el = document.getElementById(id); if (el) el.textContent = t; };
const todayISO = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const daysLeft = iso => {
    const t = new Date(); t.setHours(0, 0, 0, 0);
    const [y, m, d] = iso.split('-').map(Number);
    return Math.round((new Date(y, m - 1, d) - t) / 864e5);
};
const STATUS_UZ = { 'In Progress': 'Jarayonda', 'Pending': 'Kutilmoqda', 'Completed': 'Bajarildi' };
const PRIO_UZ = { high: 'Yuqori', medium: "O'rta", low: 'Past' };
const MONTHS_UZ = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr'];

// ---------- Toast xabarlar ----------
function showToast(msg, type = 'info') {
    let box = document.getElementById('toastBox');
    if (!box) { box = document.createElement('div'); box.id = 'toastBox'; document.body.appendChild(box); }
    const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info' };
    const t = document.createElement('div');
    t.className = 'toast ' + type;
    t.innerHTML = `<i class="fa-solid ${icons[type] || icons.info}"></i><span>${esc(msg)}</span>`;
    box.appendChild(t);
    setTimeout(() => { t.classList.add('hide'); setTimeout(() => t.remove(), 300); }, 3000);
}

// ---------- Saqlangan ma'lumotlarni yuklash ----------
const savedProjects = LS.get('cp_projects', null);
if (Array.isArray(savedProjects)) projects = savedProjects;

let tasks = LS.get('cp_tasks', [
    { id: 1, text: 'Artel Group bilan uchrashuv tayyorlash', done: false, priority: 'high' },
    { id: 2, text: 'Haftalik hisobotni yuborish', done: false, priority: 'medium' },
    { id: 3, text: "Yangi dizayn maketini ko'rib chiqish", done: true, priority: 'low' }
]);
let taskFilter = 'all';

const BASE_INCOME = 124500, BASE_EXPENSE = 42100;
let transactions = LS.get('cp_tx', [
    { id: 1, type: 'income', desc: "CRM loyihasi to'lovi", cat: 'Loyiha', amount: 5000, date: todayISO() },
    { id: 2, type: 'expense', desc: 'Ofis ijarasi', cat: 'Ijara', amount: 1800, date: todayISO() },
    { id: 3, type: 'expense', desc: 'Xodimlar maoshi', cat: 'Maosh', amount: 6000, date: todayISO() },
    { id: 4, type: 'expense', desc: 'Reklama xarajati', cat: 'Marketing', amount: 900, date: todayISO() }
]);

// ---------- Jonli soat ----------
function tickClock() {
    const el = document.getElementById('clockText');
    if (!el) return;
    const d = new Date();
    el.textContent = `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}  ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

// ---------- Mobil menyu ----------
function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('open');
}

// ---------- Filtr, qidiruv va saralash ----------
let activeStatus = 'all', sortKey = null, sortDir = 1;

function applyFilters() {
    const q = (document.getElementById('searchInput').value || '').toLowerCase();
    let list = projects.filter(p =>
        (activeStatus === 'all' || p.status === activeStatus) &&
        (p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q))
    );
    if (sortKey) {
        list.sort((a, b) => {
            const x = a[sortKey], y = b[sortKey];
            return (typeof x === 'number' ? x - y : String(x).localeCompare(String(y))) * sortDir;
        });
    }
    renderTable(list);
}

function handleSearch() { applyFilters(); }   // eski funksiyani almashtiradi

function setStatusFilter(s) {
    activeStatus = s;
    document.querySelectorAll('#statusChips .chip').forEach(c => c.classList.toggle('active', c.dataset.status === s));
    applyFilters();
}

function sortBy(key) {
    sortDir = (sortKey === key) ? -sortDir : 1;
    sortKey = key;
    document.querySelectorAll('.custom-table th.sortable').forEach(th => {
        th.classList.remove('asc', 'desc');
        if (th.dataset.key === key) th.classList.add(sortDir === 1 ? 'asc' : 'desc');
    });
    applyFilters();
}

// ---------- renderTable ni boyitish ----------
const _origRenderTable = renderTable;
renderTable = function (data) {
    _origRenderTable(data);
    const rows = document.querySelectorAll('#projectsTableBody tr');
    if (!data.length) {
        document.getElementById('projectsTableBody').innerHTML =
            '<tr><td colspan="6" class="empty-note">Hech narsa topilmadi</td></tr>';
    } else {
        rows.forEach((tr, i) => {
            const p = data[i]; if (!p) return;
            const badge = tr.querySelector('.badge');
            if (badge) badge.textContent = STATUS_UZ[p.status] || p.status;
            const d = daysLeft(p.deadline);
            if (p.status !== 'Completed') {
                tr.children[2].insertAdjacentHTML('beforeend',
                    `<span class="days-left">${d < 0 ? Math.abs(d) + ' kun kechikkan' : d === 0 ? 'Bugun!' : d + ' kun qoldi'}</span>`);
                if (d < 0) tr.classList.add('row-overdue');
            }
            tr.lastElementChild.insertAdjacentHTML('afterbegin',
                `<button class="btn-secondary btn-mini" title="Holatni almashtirish" onclick="cycleStatus(${p.id})"><i class="fa-solid fa-rotate"></i></button> `);
        });
    }
    updateExtras();
};


/* ============================================================
   TO'LDIRISH QISMI: yetishmayotgan barcha funksiyalar
   ============================================================ */
const $id = id => document.getElementById(id);
let charts = {}, ready = false;

// Holatni aylantirish: Kutilmoqda -> Jarayonda -> Bajarildi
function cycleStatus(id) {
    const order = ['Pending', 'In Progress', 'Completed'];
    const p = projects.find(x => x.id === id);
    if (!p) return;
    p.status = order[(order.indexOf(p.status) + 1) % order.length];
    applyFilters();
    renderKanban();
    showToast(`"${p.name}": ${STATUS_UZ[p.status]}`, 'success');
}

// ---------- Modal oynalar ----------
function openModalById(id) { const m = $id(id); if (m) m.classList.add('active'); }
function closeModalById(id) { const m = $id(id); if (m) m.classList.remove('active'); }

// ---------- Loyiha: qo'shish, o'chirish, tahrirlash ----------
addProjectFromModal = function () {
    const name = $id('modalProjName').value.trim();
    const client = $id('modalClient').value.trim();
    const budget = $id('modalBudget').value;
    const status = $id('modalStatus').value;
    if (!name || !client || !budget) { showToast("Barcha maydonlarni to'ldiring", 'error'); return; }
    const d = new Date(); d.setDate(d.getDate() + 14);
    projects.push({ id: Date.now(), name, client, deadline: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, budget: Number(budget), status });
    applyFilters(); renderKanban(); closeModal();
    ['modalProjName', 'modalClient', 'modalBudget'].forEach(i => $id(i).value = '');
    showToast("Loyiha qo'shildi (muddat: 14 kun, tahrirlash mumkin)", 'success');
};

deleteProject = function (id) {
    if (!confirm("Loyihani o'chirishni xohlaysizmi?")) return;
    projects = projects.filter(p => p.id !== id);
    applyFilters(); renderKanban();
    showToast("Loyiha o'chirildi", 'success');
};

function editProject(id) {
    const p = projects.find(x => x.id === id);
    if (!p) return;
    $id('epId').value = p.id; $id('epName').value = p.name; $id('epClient').value = p.client;
    $id('epDeadline').value = p.deadline; $id('epBudget').value = p.budget; $id('epStatus').value = p.status;
    openModalById('editModal');
}

function saveEditProject() {
    const p = projects.find(x => x.id === Number($id('epId').value));
    if (!p) return;
    const name = $id('epName').value.trim(), client = $id('epClient').value.trim();
    if (!name || !client || !$id('epDeadline').value) { showToast("Maydonlarni to'ldiring", 'error'); return; }
    p.name = name; p.client = client; p.deadline = $id('epDeadline').value;
    p.budget = Number($id('epBudget').value) || 0; p.status = $id('epStatus').value;
    applyFilters(); renderKanban(); closeModalById('editModal');
    showToast('Loyiha saqlandi', 'success');
}

// Jadvalga "tahrirlash" tugmasini qo'shish
const _prevRenderTable = renderTable;
renderTable = function (data) {
    _prevRenderTable(data);
    if (!data.length) return;
    document.querySelectorAll('#projectsTableBody tr').forEach((tr, i) => {
        const p = data[i]; if (!p) return;
        tr.lastElementChild.insertAdjacentHTML('afterbegin',
            `<button class="btn-secondary btn-mini" title="Tahrirlash" onclick="editProject(${p.id})"><i class="fa-solid fa-pen"></i></button> `);
    });
};

// ---------- Mijozlar va jamoa ----------
const _sc = LS.get('cp_clients', null); if (Array.isArray(_sc)) clients.splice(0, clients.length, ..._sc);
const _st = LS.get('cp_team', null); if (Array.isArray(_st)) team.splice(0, team.length, ..._st);

renderClientsAndTeam = function () {
    const cq = ($id('clientSearch').value || '').toLowerCase();
    const tq = ($id('teamSearch').value || '').toLowerCase();
    const cl = clients.map((c, i) => ({ c, i })).filter(x => (x.c.name + x.c.category).toLowerCase().includes(cq));
    $id('clientsGrid').innerHTML = cl.length ? cl.map(({ c, i }) => `
        <div class="client-card">
            <button class="card-del" title="O'chirish" onclick="deleteClient(${i})"><i class="fa-solid fa-xmark"></i></button>
            <i class="fa-solid fa-building" style="font-size:2rem; color:var(--primary); margin-bottom:10px;"></i>
            <h3>${esc(c.name)}</h3>
            <p style="color:var(--text-secondary); font-size:0.9rem;">${esc(c.category)}</p>
            <div style="margin:10px 0;"><strong>${esc(c.projects)} ta</strong> faol loyiha</div>
            <small>${esc(c.phone)}</small>
        </div>`).join('') : '<p class="empty-note">Mijoz topilmadi</p>';
    const tm = team.map((t, i) => ({ t, i })).filter(x => (x.t.name + x.t.role).toLowerCase().includes(tq));
    $id('teamGrid').innerHTML = tm.length ? tm.map(({ t, i }) => `
        <div class="team-card">
            <button class="card-del" title="O'chirish" onclick="deleteTeam(${i})"><i class="fa-solid fa-xmark"></i></button>
            <i class="fa-solid fa-user-circle" style="font-size:2.5rem; color:var(--purple); margin-bottom:10px;"></i>
            <h3>${esc(t.name)}</h3>
            <p style="color:var(--primary); font-size:0.9rem; font-weight:600;">${esc(t.role)}</p>
            <small style="color:var(--text-secondary); display:block; margin-top:8px;">${esc(t.email)}</small>
        </div>`).join('') : '<p class="empty-note">Xodim topilmadi</p>';
};

function addClient() {
    const name = $id('cName').value.trim();
    if (!name) { showToast('Kompaniya nomini kiriting', 'error'); return; }
    clients.push({ name, category: $id('cCategory').value.trim() || '—', projects: Number($id('cProjects').value) || 0, phone: $id('cPhone').value.trim() || '—' });
    LS.set('cp_clients', clients); renderClientsAndTeam(); closeModalById('clientModal');
    ['cName', 'cCategory', 'cProjects', 'cPhone'].forEach(i => $id(i).value = '');
    showToast("Mijoz qo'shildi", 'success');
}
function deleteClient(i) { if (!confirm("Mijozni o'chirasizmi?")) return; clients.splice(i, 1); LS.set('cp_clients', clients); renderClientsAndTeam(); }

function addTeamMember() {
    const name = $id('tName').value.trim();
    if (!name) { showToast('Ismni kiriting', 'error'); return; }
    team.push({ name, role: $id('tRole').value.trim() || '—', email: $id('tEmail').value.trim() || '—' });
    LS.set('cp_team', team); renderClientsAndTeam(); closeModalById('teamModal');
    ['tName', 'tRole', 'tEmail'].forEach(i => $id(i).value = '');
    showToast("Xodim qo'shildi", 'success');
}
function deleteTeam(i) { if (!confirm("Xodimni o'chirasizmi?")) return; team.splice(i, 1); LS.set('cp_team', team); renderClientsAndTeam(); }

// ---------- Vazifalar ----------
function renderTasks() {
    const f = tasks.filter(t => taskFilter === 'all' || (taskFilter === 'open' ? !t.done : t.done));
    $id('taskList').innerHTML = f.length ? f.map(t => `
        <li class="task-item ${t.done ? 'done' : ''}">
            <label><input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTask(${t.id})"><span>${esc(t.text)}</span></label>
            <span class="prio ${t.priority}">${PRIO_UZ[t.priority]}</span>
            <button class="btn-secondary btn-mini" onclick="deleteTask(${t.id})"><i class="fa-solid fa-trash" style="color:#ef4444;"></i></button>
        </li>`).join('') : '<li class="empty-note">Vazifa yo\'q</li>';
    const done = tasks.filter(t => t.done).length;
    const pct = tasks.length ? Math.round(done / tasks.length * 100) : 0;
    $id('taskProgressFill').style.width = pct + '%';
    setText('taskProgressText', `${pct}% bajarildi (${done}/${tasks.length})`);
    LS.set('cp_tasks', tasks);
}
function addTask() {
    const inp = $id('taskInput'), text = inp.value.trim();
    if (!text) return;
    tasks.unshift({ id: Date.now(), text, done: false, priority: $id('taskPriority').value });
    inp.value = ''; renderTasks(); buildNotifs();
}
function toggleTask(id) { const t = tasks.find(x => x.id === id); if (t) t.done = !t.done; renderTasks(); buildNotifs(); }
function deleteTask(id) { tasks = tasks.filter(t => t.id !== id); renderTasks(); buildNotifs(); }
function setTaskFilter(f) {
    taskFilter = f;
    document.querySelectorAll('#taskChips .chip').forEach(c => c.classList.toggle('active', c.dataset.filter === f));
    renderTasks();
}

// ---------- Moliya ----------
function renderFinance() {
    const sum = t => transactions.filter(x => x.type === t).reduce((s, x) => s + Number(x.amount), 0);
    const inc = BASE_INCOME + sum('income'), exp = BASE_EXPENSE + sum('expense');
    setText('finIncome', fmtMoney(inc)); setText('finProfit', fmtMoney(inc - exp));
    const red = document.querySelector('.fin-box.red h2'); if (red) red.textContent = fmtMoney(exp);
    const list = [...transactions].sort((a, b) => b.id - a.id);
    $id('txBody').innerHTML = list.length ? list.map(t => `
        <tr>
            <td>${esc(t.date)}</td><td>${esc(t.desc)}</td><td>${esc(t.cat)}</td>
            <td class="${t.type === 'income' ? 'tx-in' : 'tx-out'}">${t.type === 'income' ? '+' : '-'}${fmtMoney(t.amount)}</td>
            <td><button class="btn-secondary btn-mini" onclick="deleteTx(${t.id})"><i class="fa-solid fa-trash" style="color:#ef4444;"></i></button></td>
        </tr>`).join('') : '<tr><td colspan="5" class="empty-note">Operatsiya yo\'q</td></tr>';
    const byCat = {};
    transactions.filter(t => t.type === 'expense').forEach(t => byCat[t.cat] = (byCat[t.cat] || 0) + Number(t.amount));
    drawChart('expenseChart', 260, {
        type: 'bar',
        data: { labels: Object.keys(byCat), datasets: [{ label: 'Chiqim ($)', data: Object.values(byCat), backgroundColor: '#ef4444', borderRadius: 6 }] },
        options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });
    LS.set('cp_tx', transactions);
}
function addTransaction() {
    const desc = $id('txDesc').value.trim(), amount = Number($id('txAmount').value);
    if (!desc || !(amount > 0)) { showToast("Tavsif va to'g'ri summani kiriting", 'error'); return; }
    transactions.push({ id: Date.now(), type: $id('txType').value, desc, cat: $id('txCat').value, amount, date: todayISO() });
    $id('txDesc').value = ''; $id('txAmount').value = '';
    renderFinance(); updateExtras(); showToast("Operatsiya qo'shildi", 'success');
}
function deleteTx(id) { transactions = transactions.filter(t => t.id !== id); renderFinance(); updateExtras(); }

// ---------- Eslatmalar ----------
let notes = LS.get('cp_notes', [
    { id: 1, text: "Mijozlarga yangi narx ro'yxatini yuborish", color: 'yellow' },
    { id: 2, text: 'Payshanba kuni jamoa yig\'ilishi', color: 'blue' }
]);
function renderNotes() {
    $id('notesGrid').innerHTML = notes.length ? notes.map(n => `
        <div class="note ${n.color}">
            <button class="card-del" onclick="deleteNote(${n.id})"><i class="fa-solid fa-xmark"></i></button>
            <p>${esc(n.text)}</p>
        </div>`).join('') : '<p class="empty-note">Eslatma yo\'q</p>';
    LS.set('cp_notes', notes);
}
function addNote() {
    const inp = $id('noteInput'), text = inp.value.trim();
    if (!text) return;
    notes.unshift({ id: Date.now(), text, color: $id('noteColor').value });
    inp.value = ''; renderNotes();
}
function deleteNote(id) { notes = notes.filter(n => n.id !== id); renderNotes(); }

// ---------- Kalendar ----------
let calY = new Date().getFullYear(), calM = new Date().getMonth(), calSel = null;
function changeMonth(d) {
    calM += d;
    if (calM < 0) { calM = 11; calY--; }
    if (calM > 11) { calM = 0; calY++; }
    calSel = null; renderCalendar();
}
function selectDay(iso) { calSel = (calSel === iso) ? null : iso; renderCalendar(); }
function deadlineRow(p) {
    const d = daysLeft(p.deadline);
    const cls = p.status === 'Completed' ? 'ok' : d < 0 ? 'late' : d <= 7 ? 'soon' : 'ok';
    const txt = p.status === 'Completed' ? 'Bajarildi' : d < 0 ? `${Math.abs(d)} kun kechikkan` : d === 0 ? 'Bugun' : `${d} kun`;
    return `<div class="deadline-item"><div><strong>${esc(p.name)}</strong><br><small>${esc(p.client)} · ${esc(p.deadline)}</small></div><span class="pill ${cls}">${txt}</span></div>`;
}
function renderCalendar() {
    setText('calTitle', `${MONTHS_UZ[calM]} ${calY}`);
    const offset = (new Date(calY, calM, 1).getDay() + 6) % 7;
    const dim = new Date(calY, calM + 1, 0).getDate(), today = todayISO();
    let html = '<div class="cal-day empty"></div>'.repeat(offset);
    for (let d = 1; d <= dim; d++) {
        const iso = `${calY}-${pad(calM + 1)}-${pad(d)}`;
        const n = projects.filter(p => p.deadline === iso).length;
        const cls = ['cal-day', iso === today ? 'today' : '', n ? 'has-event' : '', iso === calSel ? 'selected' : ''].join(' ');
        html += `<div class="${cls}" onclick="selectDay('${iso}')">${d}${n ? `<span class="cal-count">${n}</span>` : ''}</div>`;
    }
    $id('calDays').innerHTML = html;
    let list;
    if (calSel) { list = projects.filter(p => p.deadline === calSel); setText('calSideTitle', `${calSel} muddatlari`); }
    else { list = projects.filter(p => p.status !== 'Completed').sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 6); setText('calSideTitle', 'Yaqin muddatlar'); }
    $id('calSideList').innerHTML = list.length ? list.map(deadlineRow).join('') : '<p class="empty-note">Muddat yo\'q</p>';
}

// ---------- Xabarnomalar ----------
function buildNotifs() {
    const items = [];
    projects.filter(p => p.status !== 'Completed').forEach(p => {
        const d = daysLeft(p.deadline);
        if (d < 0) items.push({ t: 'danger', i: 'fa-circle-exclamation', m: `"${p.name}" muddati ${Math.abs(d)} kun o'tgan` });
        else if (d <= 3) items.push({ t: 'warning', i: 'fa-clock', m: `"${p.name}" muddati ${d === 0 ? 'bugun' : d + ' kundan keyin'}` });
    });
    const high = tasks.filter(t => !t.done && t.priority === 'high').length;
    if (high) items.push({ t: 'info', i: 'fa-list-check', m: `${high} ta yuqori darajali vazifa kutmoqda` });
    $id('notifPanel').innerHTML = '<h4>Xabarnomalar</h4>' + (items.length
        ? items.map(x => `<div class="notif-item ${x.t}"><i class="fa-solid ${x.i}"></i><span>${esc(x.m)}</span></div>`).join('')
        : '<div class="empty-note">Yangi xabarnoma yo\'q</div>');
    const dot = document.querySelector('.icon-btn.notification .dot');
    if (dot) dot.style.display = items.length ? 'block' : 'none';
}
showNotification = function () { buildNotifs(); $id('notifPanel').classList.toggle('open'); };
document.addEventListener('click', e => {
    if (!e.target.closest('.notification') && !e.target.closest('#notifPanel')) $id('notifPanel').classList.remove('open');
});

// ---------- Grafiklar va statistika ----------
function drawChart(id, h, cfg) {
    const el = $id(id);
    if (!el || typeof Chart === 'undefined') return;
    if (!el.parentNode.classList.contains('cwrap')) {
        const w = document.createElement('div');
        w.className = 'cwrap'; w.style.cssText = `position:relative;height:${h}px`;
        el.parentNode.insertBefore(w, el); w.appendChild(el);
    }
    if (charts[id]) charts[id].destroy();
    cfg.options = Object.assign({ responsive: true, maintainAspectRatio: false }, cfg.options);
    charts[id] = new Chart(el, cfg);
}

function updateExtras() {
    LS.set('cp_projects', projects);
    const total = projects.reduce((s, p) => s + Number(p.budget || 0), 0);
    const doneList = projects.filter(p => p.status === 'Completed');
    const doneSum = doneList.reduce((s, p) => s + Number(p.budget || 0), 0);
    const overdue = projects.filter(p => p.status !== 'Completed' && daysLeft(p.deadline) < 0).length;
    const pct = projects.length ? Math.round(doneList.length / projects.length * 100) : 0;

    setText('statTotalRevenue', fmtMoney(total));
    setText('statProjectCount', projects.filter(p => p.status !== 'Completed').length + ' ta');
    setText('rpTotal', fmtMoney(total)); setText('rpDone', fmtMoney(doneSum));
    setText('rpAvg', fmtMoney(projects.length ? Math.round(total / projects.length) : 0));
    setText('rpOverdue', overdue + ' ta');
    $id('rpProgressFill').style.width = pct + '%';
    setText('rpProgressText', `${pct}% loyiha yakunlangan`);
    $id('rpProgressFill').style.cssText += ';height:100%;background:var(--success);border-radius:10px;transition:width .4s';

    const up = projects.filter(p => p.status !== 'Completed').sort((a, b) => a.deadline.localeCompare(b.deadline)).slice(0, 5);
    $id('deadlineList').innerHTML = up.length ? up.map(deadlineRow).join('') : '<p class="empty-note">Faol muddat yo\'q</p>';

    const cnt = s => projects.filter(p => p.status === s).length;
    drawChart('statusChart', 260, {
        type: 'doughnut',
        data: { labels: ['Kutilmoqda', 'Jarayonda', 'Bajarildi'], datasets: [{ data: [cnt('Pending'), cnt('In Progress'), cnt('Completed')], backgroundColor: ['#f59e0b', '#2563eb', '#10b981'], borderWidth: 0 }] },
        options: { plugins: { legend: { position: 'bottom' } }, cutout: '65%' }
    });
    const byClient = {};
    projects.forEach(p => byClient[p.client] = (byClient[p.client] || 0) + Number(p.budget || 0));
    drawChart('clientChart', 260, {
        type: 'doughnut',
        data: { labels: Object.keys(byClient), datasets: [{ data: Object.values(byClient), backgroundColor: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', '#06b6d4', '#ec4899'], borderWidth: 0 }] },
        options: { plugins: { legend: { position: 'bottom' } } }
    });

    // Oylik daromad/xarajat (oxirgi 6 oy)
    const now = new Date(), labels = [];
    for (let i = 5; i >= 0; i--) labels.push(MONTHS_UZ[new Date(now.getFullYear(), now.getMonth() - i, 1).getMonth()]);
    const inc = [14200, 16800, 15500, 19800, 22400, 9000], exp = [8100, 9400, 8800, 10200, 11600, 4000];
    const ym = todayISO().slice(0, 7);
    transactions.filter(t => t.date.startsWith(ym)).forEach(t => { (t.type === 'income' ? inc : exp)[5] += Number(t.amount); });
    drawChart('revenueChart', 300, {
        type: 'line',
        data: { labels, datasets: [
            { label: 'Daromad ($)', data: inc, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,.12)', fill: true, tension: .35 },
            { label: 'Xarajat ($)', data: exp, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,.1)', fill: true, tension: .35 }
        ] },
        options: { plugins: { legend: { position: 'bottom' } }, scales: { y: { beginAtZero: true } } }
    });

    renderCalendar(); buildNotifs();
}

// ---------- Sozlamalar ----------
function toggleDark(on) {
    document.body.classList.toggle('dark', !!on);
    const sw = $id('darkSwitch'); if (sw) sw.checked = !!on;
    const ic = document.querySelector('#darkBtn i'); if (ic) ic.className = on ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    LS.set('cp_dark', !!on);
    if (typeof Chart !== 'undefined') { Chart.defaults.color = on ? '#94a3b8' : '#64748b'; Chart.defaults.borderColor = on ? '#22304a' : '#e2e8f0'; }
    if (ready) updateExtras();
}
function shade(hex, p) {
    const n = parseInt(hex.slice(1), 16);
    return '#' + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(x => Math.round(x * (1 - p)).toString(16).padStart(2, '0')).join('');
}
function setAccent(c) {
    document.documentElement.style.setProperty('--primary', c);
    document.documentElement.style.setProperty('--primary-hover', shade(c, 0.15));
    $id('accentColor').value = c; LS.set('cp_accent', c);
}
function resetData() {
    if (!confirm("Barcha saqlangan ma'lumotlar o'chiriladi. Davom etasizmi?")) return;
    try { Object.keys(localStorage).filter(k => k.startsWith('cp_')).forEach(k => localStorage.removeItem(k)); } catch (e) {}
    location.reload();
}

// ---------- Eksport / zaxira ----------
function download(name, content, type, bom) {
    const blob = new Blob([(bom ? '\ufeff' : '') + content], { type });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob); a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
const toCSV = (head, rows) => [head, ...rows].map(r => r.map(v => '"' + String(v).replace(/"/g, '""') + '"').join(',')).join('\n');
exportData = function () {
    download('loyihalar.csv', toCSV(['Nomi', 'Mijoz', 'Muddat', 'Byudjet', 'Holat'],
        projects.map(p => [p.name, p.client, p.deadline, p.budget, STATUS_UZ[p.status] || p.status])), 'text/csv', true);
    showToast('Loyihalar CSV yuklandi', 'success');
};
function exportTasks() {
    download('vazifalar.csv', toCSV(['Vazifa', 'Muhimlik', 'Holat'], tasks.map(t => [t.text, PRIO_UZ[t.priority], t.done ? 'Bajarilgan' : 'Faol'])), 'text/csv', true);
}
function exportTx() {
    download('moliya.csv', toCSV(['Sana', 'Tur', 'Tavsif', 'Kategoriya', 'Summa'], transactions.map(t => [t.date, t.type === 'income' ? 'Kirim' : 'Chiqim', t.desc, t.cat, t.amount])), 'text/csv', true);
}
function backupData() {
    download('corppro-zaxira.json', JSON.stringify({ projects, tasks, transactions, notes, clients, team }, null, 2), 'application/json');
    showToast('Zaxira yuklandi', 'success');
}
function importBackup(ev) {
    const f = ev.target.files[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => {
        try {
            const d = JSON.parse(r.result);
            if (Array.isArray(d.projects)) projects = d.projects;
            if (Array.isArray(d.tasks)) tasks = d.tasks;
            if (Array.isArray(d.transactions)) transactions = d.transactions;
            if (Array.isArray(d.notes)) notes = d.notes;
            if (Array.isArray(d.clients)) { clients.splice(0, clients.length, ...d.clients); LS.set('cp_clients', clients); }
            if (Array.isArray(d.team)) { team.splice(0, team.length, ...d.team); LS.set('cp_team', team); }
            applyFilters(); renderKanban(); renderClientsAndTeam(); renderTasks(); renderFinance(); renderNotes(); updateExtras();
            showToast('Zaxira tiklandi', 'success');
        } catch (e) { showToast("Fayl noto'g'ri formatda", 'error'); }
        ev.target.value = '';
    };
    r.readAsText(f);
}

// Bo'lim ochilganda grafiklar o'lchamini yangilash
const _sw = switchSection;
switchSection = function (id, ev) {
    _sw(id, ev);
    if (id === 'calendar') renderCalendar();
    setTimeout(() => Object.values(charts).forEach(c => c.resize()), 50);
};

// ---------- Boshlang'ich ishga tushirish ----------
const _acc = LS.get('cp_accent', null); if (_acc) setAccent(_acc);
toggleDark(LS.get('cp_dark', false));
ready = true;
applyFilters(); renderKanban(); renderClientsAndTeam();
renderTasks(); renderFinance(); renderNotes(); updateExtras();
tickClock(); setInterval(tickClock, 1000);

/* ============================================================
   QO'SHIMCHA JS
   script.js faylining ENG OXIRIGA qo'shing (eski kod o'zgarmaydi)
   Hammasi alohida blok ichida, eski funksiyalar bilan to'qnashmaydi.
   ============================================================ */
(function () {
    'use strict';

    const $ = id => document.getElementById(id);
    const store = {
        get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
        set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
    };
    const toast = (m, t) => (typeof showToast === 'function' ? showToast(m, t) : null);

    /* ---------- 1. Asboblar bo'limini ulash ---------- */
    const toolsSection = $('tools');
    const main = document.querySelector('.main-content');
    if (toolsSection && main) main.appendChild(toolsSection);

    const menu = document.querySelector('.sidebar-menu');
    if (menu && toolsSection) {
        const link = document.createElement('a');
        link.href = '#';
        link.className = 'menu-item';
        link.innerHTML = '<i class="fa-solid fa-toolbox"></i> Asboblar';
        link.addEventListener('click', e => { e.preventDefault(); switchSection('tools', e); });
        menu.appendChild(link);
    }

    // Bo'lim almashganda: maqsadni yangilash, mobil menyuni yopish, tepaga chiqish
    if (typeof switchSection === 'function') {
        const _switch = switchSection;
        switchSection = function (id, ev) {
            _switch(id, ev);
            if (id === 'tools') updateGoal();
            const sb = document.querySelector('.sidebar');
            if (sb) sb.classList.remove('open');
            window.scrollTo({ top: 0 });
        };
    }

    /* ---------- 2. Diqqat taymeri (Pomodoro) ---------- */
    let pomoTotal = 25 * 60, pomoLeft = pomoTotal, pomoTimer = null;
    const dayKey = 'cp_pomo_' + new Date().toISOString().split('T')[0];

    function drawPomo() {
        const m = String(Math.floor(pomoLeft / 60)).padStart(2, '0');
        const s = String(pomoLeft % 60).padStart(2, '0');
        const d = $('pomoDisplay');
        if (!d) return;
        d.textContent = `${m}:${s}`;
        d.classList.toggle('running', !!pomoTimer);
        document.title = pomoTimer ? `${m}:${s} // CORPORATE PRO` : 'CORPORATE PRO // Biznes Boshqaruv Platformasi';
    }
    function drawPomoCount() {
        const el = $('pomoCount');
        if (el) el.textContent = `Bugun yakunlangan: ${store.get(dayKey, 0)} ta`;
    }
    function stopPomo() {
        clearInterval(pomoTimer);
        pomoTimer = null;
        const b = $('pomoToggle');
        if (b) b.innerHTML = '<i class="fa-solid fa-play"></i> Boshlash';
    }

    window.togglePomo = function () {
        if (pomoTimer) { stopPomo(); drawPomo(); return; }
        if (pomoLeft <= 0) pomoLeft = pomoTotal;
        $('pomoToggle').innerHTML = '<i class="fa-solid fa-pause"></i> To\'xtatish';
        $('pomoDisplay').classList.remove('finished');
        pomoTimer = setInterval(() => {
            pomoLeft--;
            if (pomoLeft <= 0) {
                pomoLeft = 0;
                stopPomo();
                $('pomoDisplay').classList.add('finished');
                if (pomoTotal === 25 * 60) { store.set(dayKey, store.get(dayKey, 0) + 1); drawPomoCount(); }
                toast('Vaqt tugadi! Ajoyib ish.', 'success');
            }
            drawPomo();
        }, 1000);
        drawPomo();
    };
    window.resetPomo = function () {
        stopPomo();
        pomoLeft = pomoTotal;
        $('pomoDisplay').classList.remove('finished');
        drawPomo();
    };
    window.setPomoMode = function (min, btn) {
        document.querySelectorAll('.timer-modes .chip').forEach(c => c.classList.remove('active'));
        if (btn) btn.classList.add('active');
        pomoTotal = min * 60;
        resetPomo();
    };

    /* ---------- 3. Valyuta konvertori ---------- */
    window.convertFx = function (from) {
        const rate = parseFloat($('fxRate').value) || 0;
        store.set('cp_fx_rate', rate);
        if (!rate) return;
        if (from === 'usd') {
            const v = parseFloat($('fxUsd').value);
            $('fxUzs').value = isNaN(v) ? '' : Math.round(v * rate);
        } else {
            const v = parseFloat($('fxUzs').value);
            $('fxUsd').value = isNaN(v) ? '' : (v / rate).toFixed(2);
        }
    };

    /* ---------- 4. Oylik maqsad ---------- */
    function completedSum() {
        if (typeof projects === 'undefined' || !Array.isArray(projects)) return 0;
        return projects.filter(p => p.status === 'Completed').reduce((s, p) => s + Number(p.budget || 0), 0);
    }
    function updateGoal() {
        const goal = Number(store.get('cp_goal', 0));
        const fill = $('goalFill'), text = $('goalText');
        if (!fill || !text) return;
        const done = completedSum();
        if (!goal) {
            fill.style.width = '0';
            text.textContent = 'Maqsad belgilanmagan';
            return;
        }
        const pct = Math.min(100, Math.round(done / goal * 100));
        fill.style.width = pct + '%';
        fill.classList.toggle('reached', done >= goal);
        text.textContent = `$${done.toLocaleString('en-US')} / $${goal.toLocaleString('en-US')} (${pct}%)`;
    }
    window.saveGoal = function () {
        store.set('cp_goal', Number($('goalInput').value) || 0);
        updateGoal();
    };

    /* ---------- 5. Tepaga qaytish tugmasi ---------- */
    window.addEventListener('scroll', () => {
        const b = $('toTop');
        if (b) b.classList.toggle('show', window.scrollY > 300);
    }, { passive: true });

    /* ---------- 6. Tezkor tugmalar ---------- */
    function openShortcuts() { const m = $('shortcutModal'); if (m) m.classList.add('active'); }

    document.addEventListener('keydown', e => {
        const tag = (e.target.tagName || '').toLowerCase();
        const typing = tag === 'input' || tag === 'textarea' || tag === 'select';

        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
            const np = $('notifPanel');
            if (np) np.classList.remove('open');
            return;
        }
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            const s = $('searchInput'); if (s) s.focus();
            return;
        }
        if (typing || e.ctrlKey || e.metaKey || e.altKey) return;

        if (e.key === '/') { e.preventDefault(); const s = $('searchInput'); if (s) s.focus(); }
        else if (e.key === '?') { openShortcuts(); }
        else if (e.key.toLowerCase() === 'n' && typeof openNewProjectModal === 'function') { e.preventDefault(); openNewProjectModal(); }
        else if (e.key.toLowerCase() === 'd' && typeof toggleDark === 'function') { toggleDark(!document.body.classList.contains('dark')); }
    });

    // Modal tashqarisini bosganda yopish
    document.addEventListener('click', e => {
        if (e.target.classList && e.target.classList.contains('modal-overlay')) e.target.classList.remove('active');
    });

    /* ---------- 7. Boshlang'ich holat ---------- */
    const rate = store.get('cp_fx_rate', 12700);
    if ($('fxRate')) $('fxRate').value = rate || 12700;
    const goal = store.get('cp_goal', 0);
    if ($('goalInput') && goal) $('goalInput').value = goal;
    drawPomo();
    drawPomoCount();
    updateGoal();
})();


/* ============================================================
   YANA QO'SHIMCHALAR (eski kod o'zgarmagan)
   1) Kanban: sudrab tashlash  2) Salomlashuv kartasi
   3) Faoliyat jurnali         4) Yon menyuni yig'ish
   5) Vazifani ikki marta bosib tahrirlash
   ============================================================ */
(function () {
    const $ = id => document.getElementById(id);
    const goTo = id => { const a = document.querySelector(`.menu-item[onclick*="'${id}'"]`); if (a) a.click(); };
    window.goTo = goTo;

    /* ---------- 1. Kanban: drag & drop ---------- */
    const COLS = [['Pending', 'colTodo'], ['In Progress', 'colInProgress'], ['Completed', 'colDone']];
    const _rk = renderKanban;
    renderKanban = function () {
        _rk();
        COLS.forEach(([st, col]) => {
            const el = $(col); if (!el) return;
            const list = projects.filter(p => p.status === st);
            [...el.children].forEach((card, i) => {
                const p = list[i]; if (!p) return;
                card.draggable = true;
                card.dataset.id = p.id;
                card.title = "Sudrab boshqa ustunga tashlang, tahrirlash uchun ikki marta bosing";
                card.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', String(p.id)); card.classList.add('dragging'); });
                card.addEventListener('dragend', () => card.classList.remove('dragging'));
                card.addEventListener('dblclick', () => editProject(p.id));
            });
            if (!list.length) el.innerHTML = '<div class="kanban-empty">Bo\'sh</div>';
            const h = el.previousElementSibling;
            if (h) {
                const old = h.querySelector('.col-meta'); if (old) old.remove();
                const sum = list.reduce((s, p) => s + Number(p.budget || 0), 0);
                h.insertAdjacentHTML('beforeend', `<span class="col-meta">${list.length} ta · ${fmtMoney(sum)}</span>`);
            }
        });
    };
    COLS.forEach(([st, col]) => {
        const el = $(col); if (!el) return;
        el.addEventListener('dragover', e => { e.preventDefault(); el.classList.add('drag-over'); });
        el.addEventListener('dragleave', () => el.classList.remove('drag-over'));
        el.addEventListener('drop', e => {
            e.preventDefault(); el.classList.remove('drag-over');
            const p = projects.find(x => x.id === Number(e.dataTransfer.getData('text/plain')));
            if (!p || p.status === st) return;
            p.status = st;
            applyFilters(); renderKanban();
            showToast(`"${p.name}": ${STATUS_UZ[st]}`, 'success');
            addActivity('fa-arrows-up-down-left-right', `"${p.name}" ${STATUS_UZ[st]} ustuniga ko'chirildi`);
        });
    });

    /* ---------- 2. Salomlashuv kartasi ---------- */
    const dash = $('dashboard');
    const welcome = document.createElement('div');
    welcome.className = 'welcome-card';
    welcome.innerHTML = `
        <div><h2 id="wlTitle"></h2><p id="wlText"></p></div>
        <div class="welcome-actions">
            <button class="btn-secondary" onclick="openNewProjectModal()"><i class="fa-solid fa-folder-plus"></i> Loyiha</button>
            <button class="btn-secondary" onclick="goTo('tasks'); setTimeout(()=>document.getElementById('taskInput').focus(), 100)"><i class="fa-solid fa-list-check"></i> Vazifa</button>
            <button class="btn-secondary" onclick="goTo('reports')"><i class="fa-solid fa-file-lines"></i> Hisobot</button>
        </div>`;
    const pt = dash && dash.querySelector('.page-title');
    if (pt) pt.insertAdjacentElement('afterend', welcome);

    function refreshWelcome() {
        const h = new Date().getHours();
        const g = h < 5 ? 'Xayrli tun' : h < 12 ? 'Xayrli tong' : h < 18 ? 'Xayrli kun' : 'Xayrli kech';
        const open = tasks.filter(t => !t.done).length;
        const late = projects.filter(p => p.status !== 'Completed' && daysLeft(p.deadline) < 0).length;
        const next = projects.filter(p => p.status !== 'Completed' && daysLeft(p.deadline) >= 0)
            .sort((a, b) => a.deadline.localeCompare(b.deadline))[0];
        setText('wlTitle', `${g}, Sardorbek!`);
        setText('wlText', `${open} ta faol vazifa, ${late} ta muddati o'tgan loyiha.` +
            (next ? ` Eng yaqin muddat: "${next.name}" (${daysLeft(next.deadline)} kun).` : ''));
    }
    const _ue = updateExtras;
    updateExtras = function () { _ue(); refreshWelcome(); };

    /* ---------- 3. Faoliyat jurnali ---------- */
    let log = LS.get('cp_activity', []);
    function renderActivity() {
        const ul = $('activityList'); if (!ul) return;
        ul.innerHTML = log.length ? log.map(a => {
            const d = new Date(a.t);
            const time = `${pad(d.getDate())}.${pad(d.getMonth() + 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
            return `<li class="activity-item"><i class="fa-solid ${a.icon}"></i><span>${esc(a.text)}</span><small>${time}</small></li>`;
        }).join('') : '<li class="empty-note">Hozircha harakat yo\'q</li>';
    }
    function addActivity(icon, text) {
        log.unshift({ t: Date.now(), icon, text });
        log = log.slice(0, 100);
        LS.set('cp_activity', log);
        renderActivity();
    }
    window.addActivity = addActivity;
    window.clearActivity = function () { log = []; LS.set('cp_activity', log); renderActivity(); showToast('Jurnal tozalandi', 'success'); };

    function hook(name, before, after) {
        const o = window[name]; if (typeof o !== 'function') return;
        window[name] = function (...a) {
            const st = before ? before(...a) : null;
            const r = o.apply(this, a);
            try { after(st, ...a); } catch (e) {}
            return r;
        };
    }
    hook('addProjectFromModal', () => projects.length, n => { if (projects.length > n) addActivity('fa-folder-plus', `Yangi loyiha: ${projects[projects.length - 1].name}`); });
    hook('deleteProject', id => ({ n: projects.length, name: (projects.find(p => p.id === id) || {}).name }), (s) => { if (projects.length < s.n) addActivity('fa-trash', `Loyiha o'chirildi: ${s.name}`); });
    hook('cycleStatus', null, (s, id) => { const p = projects.find(x => x.id === id); if (p) addActivity('fa-rotate', `"${p.name}" holati: ${STATUS_UZ[p.status]}`); });
    hook('saveEditProject', () => $('editModal').classList.contains('active'), (was) => { if (was && !$('editModal').classList.contains('active')) addActivity('fa-pen', `Loyiha tahrirlandi: ${$('epName').value}`); });
    hook('addTask', () => tasks.length, n => { if (tasks.length > n) addActivity('fa-list-check', `Yangi vazifa: ${tasks[0].text}`); });
    hook('toggleTask', null, (s, id) => { const t = tasks.find(x => x.id === id); if (t) addActivity(t.done ? 'fa-circle-check' : 'fa-circle', `${t.done ? 'Bajarildi' : 'Qayta ochildi'}: ${t.text}`); });
    hook('deleteTask', id => (tasks.find(t => t.id === id) || {}).text, t => { if (t) addActivity('fa-trash', `Vazifa o'chirildi: ${t}`); });
    hook('addTransaction', () => transactions.length, n => { if (transactions.length > n) { const t = transactions[transactions.length - 1]; addActivity('fa-wallet', `${t.type === 'income' ? 'Kirim' : 'Chiqim'}: ${t.desc} (${fmtMoney(t.amount)})`); } });
    hook('addClient', () => clients.length, n => { if (clients.length > n) addActivity('fa-building', `Yangi mijoz: ${clients[clients.length - 1].name}`); });
    hook('addTeamMember', () => team.length, n => { if (team.length > n) addActivity('fa-user-plus', `Yangi xodim: ${team[team.length - 1].name}`); });
    renderActivity();

    /* ---------- 4. Yon menyuni yig'ish (kompyuterda) ---------- */
    const mt = document.querySelector('.menu-toggle');
    if (mt) {
        const cb = document.createElement('button');
        cb.className = 'icon-btn collapse-btn';
        cb.title = "Menyuni yig'ish";
        cb.innerHTML = '<i class="fa-solid fa-angles-left"></i>';
        cb.onclick = () => {
            const on = document.body.classList.toggle('sidebar-collapsed');
            cb.firstChild.className = on ? 'fa-solid fa-angles-right' : 'fa-solid fa-angles-left';
            LS.set('cp_collapsed', on);
        };
        mt.insertAdjacentElement('afterend', cb);
        if (LS.get('cp_collapsed', false)) { document.body.classList.add('sidebar-collapsed'); cb.firstChild.className = 'fa-solid fa-angles-right'; }
    }

    /* ---------- 5. Vazifani ikki marta bosib tahrirlash ---------- */
    const _rt = renderTasks;
    renderTasks = function () {
        _rt();
        const f = tasks.filter(t => taskFilter === 'all' || (taskFilter === 'open' ? !t.done : t.done));
        document.querySelectorAll('#taskList .task-item').forEach((li, i) => {
            const t = f[i]; const sp = li.querySelector('label span'); if (!t || !sp) return;
            sp.title = 'Tahrirlash uchun ikki marta bosing';
            sp.addEventListener('dblclick', e => {
                e.preventDefault();
                const v = prompt('Vazifani tahrirlash:', t.text);
                if (v && v.trim()) { t.text = v.trim(); renderTasks(); showToast('Vazifa yangilandi', 'success'); }
            });
        });
    };
    renderTasks();

    // Boshlang'ich holat
    renderKanban();
    refreshWelcome();
})();


/* ============================================================
   YANA QO'SHIMCHALAR #3 (eski kod o'zgarmagan)
   1) Global qidiruv (Ctrl+/)   2) Xarajat limiti
   3) Sozlamalar: ism va tayyor ranglar
   4) Loyiha oynasiga "Muddat" maydoni
   5) Jadval ostida jami qator  6) Mijoz/Jamoa CSV
   ============================================================ */
(function () {
    const $ = id => document.getElementById(id);

    /* ---------- 1. Global qidiruv ---------- */
    let act = 0, cur = [];
    function sectionItems() {
        return [...document.querySelectorAll('.sidebar-menu .menu-item')].map(a => ({
            icon: (a.querySelector('i') || {}).className ? a.querySelector('i').className.replace('fa-solid ', '') : 'fa-circle',
            title: a.textContent.trim(), sub: "Bo'limga o'tish", go: () => a.click()
        }));
    }
    function buildResults(q) {
        q = q.toLowerCase();
        const r = [];
        const has = s => String(s).toLowerCase().includes(q);
        projects.forEach(p => { if (has(p.name + ' ' + p.client)) r.push({ icon: 'fa-diagram-project', title: p.name, sub: `Loyiha · ${p.client} · ${STATUS_UZ[p.status]}`, go: () => { goTo('projects'); } }); });
        clients.forEach(c => { if (has(c.name + ' ' + c.category)) r.push({ icon: 'fa-building', title: c.name, sub: `Mijoz · ${c.category}`, go: () => goTo('clients') }); });
        team.forEach(t => { if (has(t.name + ' ' + t.role)) r.push({ icon: 'fa-user', title: t.name, sub: `Xodim · ${t.role}`, go: () => goTo('team') }); });
        tasks.forEach(t => { if (has(t.text)) r.push({ icon: 'fa-list-check', title: t.text, sub: `Vazifa · ${t.done ? 'bajarilgan' : 'faol'}`, go: () => goTo('tasks') }); });
        notes.forEach(n => { if (has(n.text)) r.push({ icon: 'fa-note-sticky', title: n.text, sub: 'Eslatma', go: () => goTo('notes') }); });
        sectionItems().forEach(s => { if (has(s.title)) r.push(s); });
        return r.slice(0, 10);
    }
    function renderPalette() {
        const q = $('paletteInput').value.trim();
        cur = q ? buildResults(q) : sectionItems();
        if (act >= cur.length) act = 0;
        $('paletteResults').innerHTML = cur.length ? cur.map((x, i) => `
            <div class="pal-item ${i === act ? 'active' : ''}" data-i="${i}">
                <i class="fa-solid ${x.icon}"></i>
                <div><strong>${esc(x.title)}</strong><small>${esc(x.sub)}</small></div>
            </div>`).join('') : '<div class="empty-note">Hech narsa topilmadi</div>';
    }
    function runPalette(i) {
        const x = cur[i]; if (!x) return;
        closeModalById('paletteModal');
        x.go();
    }
    function openPalette() {
        openModalById('paletteModal');
        $('paletteInput').value = ''; act = 0; renderPalette();
        setTimeout(() => $('paletteInput').focus(), 30);
    }
    window.openPalette = openPalette;
    $('paletteInput').addEventListener('input', () => { act = 0; renderPalette(); });
    $('paletteInput').addEventListener('keydown', e => {
        if (e.key === 'ArrowDown') { e.preventDefault(); act = (act + 1) % Math.max(cur.length, 1); renderPalette(); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); act = (act - 1 + cur.length) % Math.max(cur.length, 1); renderPalette(); }
        else if (e.key === 'Enter') { e.preventDefault(); runPalette(act); }
    });
    $('paletteResults').addEventListener('click', e => {
        const it = e.target.closest('.pal-item'); if (it) runPalette(Number(it.dataset.i));
    });
    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key === '/') { e.preventDefault(); openPalette(); }
    });
    const clk = $('darkBtn');
    if (clk) {
        const b = document.createElement('button');
        b.className = 'icon-btn'; b.title = 'Global qidiruv (Ctrl+/)';
        b.innerHTML = '<i class="fa-solid fa-magnifying-glass-chart"></i>';
        b.onclick = openPalette;
        clk.insertAdjacentElement('beforebegin', b);
    }

    /* ---------- 2. Xarajat limiti (Moliya) ---------- */
    const fin = $('finance');
    const fs = fin && fin.querySelector('.finance-summary');
    if (fs) {
        const box = document.createElement('div');
        box.className = 'panel-box limit-box';
        box.innerHTML = `
            <div class="limit-head">
                <h3><i class="fa-solid fa-gauge-high"></i> Xarajat limiti</h3>
                <input type="number" id="limitInput" placeholder="Limit ($)">
            </div>
            <div class="progress-bar"><div id="limitFill"></div></div>
            <small id="limitText">Limit belgilanmagan</small>`;
        fs.insertAdjacentElement('afterend', box);
        $('limitInput').value = LS.get('cp_limit', '') || '';
        $('limitInput').addEventListener('input', () => { LS.set('cp_limit', Number($('limitInput').value) || 0); refreshLimit(true); });
    }
    let warned = false;
    function refreshLimit(fromInput) {
        const fill = $('limitFill'); if (!fill) return;
        const limit = Number(LS.get('cp_limit', 0)) || 0;
        const exp = BASE_EXPENSE + transactions.filter(t => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
        if (!limit) { fill.style.width = '0'; setText('limitText', 'Limit belgilanmagan'); return; }
        const pct = Math.round(exp / limit * 100);
        fill.style.width = Math.min(100, pct) + '%';
        fill.style.background = pct >= 100 ? 'var(--danger)' : pct >= 70 ? 'var(--warning)' : 'var(--success)';
        setText('limitText', `${fmtMoney(exp)} / ${fmtMoney(limit)} (${pct}%)`);
        if (pct >= 100 && !warned && !fromInput) { warned = true; showToast('Xarajat limiti oshib ketdi!', 'error'); }
        if (pct < 100) warned = false;
    }
    const _ue2 = updateExtras;
    updateExtras = function () { _ue2(); refreshLimit(); applyName(); };

    /* ---------- 3. Sozlamalar: ism va tayyor ranglar ---------- */
    const sb = document.querySelector('.settings-box');
    if (sb) {
        const colors = ['#2563eb', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899'];
        sb.insertAdjacentHTML('afterbegin', `
            <div class="setting-row">
                <div><h4>Foydalanuvchi ismi</h4><small>Menyu va salomlashuvda ko'rinadi</small></div>
                <input type="text" id="userNameInput" class="name-input" maxlength="30">
            </div>
            <div class="setting-row">
                <div><h4>Tayyor ranglar</h4><small>Bir bosishda mavzuni almashtiring</small></div>
                <div class="swatches">${colors.map(c => `<button class="swatch" style="background:${c}" title="${c}" onclick="setAccent('${c}')"></button>`).join('')}</div>
            </div>`);
        $('userNameInput').value = LS.get('cp_username', 'Sardorbek');
        $('userNameInput').addEventListener('input', () => { LS.set('cp_username', $('userNameInput').value.trim() || 'Sardorbek'); applyName(); });
    }
    function applyName() {
        const name = LS.get('cp_username', 'Sardorbek');
        const h = document.querySelector('.user-info h4'); if (h) h.textContent = name;
        const w = $('wlTitle'); if (w) w.textContent = w.textContent.replace(/,\s.*!$/, `, ${name}!`);
    }

    /* ---------- 4. Yangi loyiha oynasiga "Muddat" ---------- */
    const mb = document.querySelector('#projectModal .modal-body');
    if (mb) {
        const g = document.createElement('div');
        g.className = 'form-group';
        g.innerHTML = '<label>Muddat</label><input type="date" id="modalDeadline">';
        const groups = mb.querySelectorAll('.form-group');
        groups[2].insertAdjacentElement('afterend', g);   // Byudjetdan keyin
    }
    const _apm = window.addProjectFromModal;
    window.addProjectFromModal = function () {
        const dl = $('modalDeadline').value, n = projects.length;
        const r = _apm.apply(this, arguments);
        if (projects.length > n) {
            if (dl) { projects[projects.length - 1].deadline = dl; applyFilters(); renderKanban(); }
            $('modalDeadline').value = '';
        }
        return r;
    };

    /* ---------- 5. Jadval ostida jami qator ---------- */
    const _rt3 = renderTable;
    renderTable = function (data) {
        _rt3(data);
        const cont = $('projectsTableBody').closest('.table-container');
        let el = $('tableSummary');
        if (!el) { el = document.createElement('div'); el.id = 'tableSummary'; el.className = 'table-summary'; cont.appendChild(el); }
        const sum = data.reduce((s, p) => s + Number(p.budget || 0), 0);
        el.innerHTML = `Ko'rsatilgan: <strong>${data.length} ta</strong> loyiha · Jami byudjet: <strong>${fmtMoney(sum)}</strong>`;
    };

    /* ---------- 6. Mijoz va jamoa CSV ---------- */
    function addCsvBtn(inputId, label, fn) {
        const inp = $(inputId); const tb = inp && inp.closest('.toolbar'); if (!tb) return;
        const b = document.createElement('button');
        b.className = 'btn-secondary';
        b.innerHTML = `<i class="fa-solid fa-file-csv"></i> ${label}`;
        b.onclick = fn;
        tb.insertBefore(b, tb.lastElementChild);
    }
    addCsvBtn('clientSearch', 'CSV', () => {
        download('mijozlar.csv', toCSV(['Kompaniya', 'Soha', 'Faol loyihalar', 'Telefon'], clients.map(c => [c.name, c.category, c.projects, c.phone])), 'text/csv', true);
        showToast('Mijozlar CSV yuklandi', 'success');
    });
    addCsvBtn('teamSearch', 'CSV', () => {
        download('jamoa.csv', toCSV(['Ism', 'Lavozim', 'Email'], team.map(t => [t.name, t.role, t.email])), 'text/csv', true);
        showToast('Jamoa CSV yuklandi', 'success');
    });

    // Boshlang'ich holat
    applyFilters(); updateExtras();
})();


/* ============================================================
   YANA QO'SHIMCHALAR #4 (eski kod o'zgarmagan)
   1) O'chirishni qaytarish (Qaytarish tugmasi va Ctrl+Z)
   2) Loyiha bajarilish foizi (tahrirlash oynasi, kanban, jadval)
   3) Mijoz kartasini bosganda uning loyihalari
   4) Eslatmalarni qadash (pin)
   ============================================================ */
(function () {
    const $ = id => document.getElementById(id);

    /* ---------- 1. O'chirishni qaytarish ---------- */
    let lastUndo = null;
    function undoToast(msg, restore) {
        let box = $('toastBox');
        if (!box) { box = document.createElement('div'); box.id = 'toastBox'; document.body.appendChild(box); }
        box.querySelectorAll('.toast-undo').forEach(b => b.closest('.toast').remove());
        const t = document.createElement('div');
        t.className = 'toast info';
        t.innerHTML = `<i class="fa-solid fa-trash-can-arrow-up"></i><span>${esc(msg)}</span><button class="toast-undo">Qaytarish</button>`;
        const close = () => { t.classList.add('hide'); setTimeout(() => t.remove(), 300); };
        const run = () => {
            if (lastUndo !== run) return;
            lastUndo = null; restore(); close();
            showToast('Qaytarildi', 'success');
        };
        t.querySelector('button').onclick = run;
        lastUndo = run;
        box.appendChild(t);
        setTimeout(() => { close(); if (lastUndo === run) lastUndo = null; }, 7000);
    }
    function wrapDel(name, getArr, restore, msg) {
        const o = window[name]; if (typeof o !== 'function') return;
        window[name] = function (...a) {
            const snap = getArr().slice();
            const r = o.apply(this, a);
            if (getArr().length < snap.length) undoToast(msg, () => restore(snap));
            return r;
        };
    }
    wrapDel('deleteProject', () => projects, s => { projects = s; applyFilters(); renderKanban(); }, "Loyiha o'chirildi");
    wrapDel('deleteTask', () => tasks, s => { tasks = s; renderTasks(); buildNotifs(); }, "Vazifa o'chirildi");
    wrapDel('deleteNote', () => notes, s => { notes = s; renderNotes(); }, "Eslatma o'chirildi");
    wrapDel('deleteTx', () => transactions, s => { transactions = s; renderFinance(); updateExtras(); }, "Operatsiya o'chirildi");
    wrapDel('deleteClient', () => clients, s => { clients.splice(0, clients.length, ...s); LS.set('cp_clients', clients); renderClientsAndTeam(); }, "Mijoz o'chirildi");
    wrapDel('deleteTeam', () => team, s => { team.splice(0, team.length, ...s); LS.set('cp_team', team); renderClientsAndTeam(); }, "Xodim o'chirildi");

    document.addEventListener('keydown', e => {
        if (!((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z')) return;
        const tag = (e.target.tagName || '').toLowerCase();
        if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
        if (lastUndo) { e.preventDefault(); lastUndo(); }
    });
    const sl = document.querySelector('.shortcut-list');
    if (sl) sl.insertAdjacentHTML('beforeend', '<li><span><kbd>Ctrl</kbd>+<kbd>Z</kbd></span> O\'chirilganni qaytarish</li>');

    /* ---------- 2. Loyiha bajarilish foizi ---------- */
    const progressOf = p => p.status === 'Completed' ? 100 : (p.progress != null ? Number(p.progress) : (p.status === 'Pending' ? 0 : 30));
    const bar = v => `<div class="mini-progress"><div style="width:${v}%"></div></div><small class="mini-pct">${v}%</small>`;

    const eb = document.querySelector('#editModal .modal-body');
    if (eb) {
        eb.insertAdjacentHTML('beforeend', `
            <div class="form-group">
                <label>Bajarilish: <b id="epProgVal">0</b>%</label>
                <input type="range" id="epProgress" min="0" max="100" step="5" value="0">
            </div>`);
        $('epProgress').addEventListener('input', () => setText('epProgVal', $('epProgress').value));
        $('epStatus').addEventListener('change', () => {
            if ($('epStatus').value === 'Completed') { $('epProgress').value = 100; setText('epProgVal', 100); }
        });
    }
    const _ep = window.editProject;
    window.editProject = function (id) {
        _ep.apply(this, arguments);
        const p = projects.find(x => x.id === id);
        if (p && $('epProgress')) { const v = progressOf(p); $('epProgress').value = v; setText('epProgVal', v); }
    };
    const _sep = window.saveEditProject;
    window.saveEditProject = function () {
        const id = Number($('epId').value), v = Number($('epProgress').value);
        const r = _sep.apply(this, arguments);
        if (!$('editModal').classList.contains('active')) {
            const p = projects.find(x => x.id === id);
            if (p) { p.progress = p.status === 'Completed' ? 100 : v; applyFilters(); renderKanban(); }
        }
        return r;
    };

    const _rk4 = renderKanban;
    renderKanban = function () {
        _rk4();
        document.querySelectorAll('.kanban-card[data-id]').forEach(card => {
            const p = projects.find(x => x.id === Number(card.dataset.id));
            if (p) card.insertAdjacentHTML('beforeend', bar(progressOf(p)));
        });
    };
    const _rt4 = renderTable;
    renderTable = function (data) {
        _rt4(data);
        if (!data.length) return;
        document.querySelectorAll('#projectsTableBody tr').forEach((tr, i) => {
            const p = data[i]; if (p && tr.children[0]) tr.children[0].insertAdjacentHTML('beforeend', bar(progressOf(p)));
        });
    };

    /* ---------- 3. Mijoz kartasi: loyihalar ro'yxati ---------- */
    document.body.insertAdjacentHTML('beforeend', `
        <div class="modal-overlay" id="clientDetailModal">
            <div class="modal-box">
                <div class="modal-header">
                    <h3 id="cdTitle"></h3>
                    <span class="close-btn" onclick="closeModalById('clientDetailModal')">&times;</span>
                </div>
                <div id="cdBody"></div>
            </div>
        </div>`);
    function showClient(name) {
        const c = clients.find(x => x.name === name);
        const list = projects.filter(p => p.client === name);
        const sum = list.reduce((s, p) => s + Number(p.budget || 0), 0);
        setText('cdTitle', name);
        $('cdBody').innerHTML = `
            <p class="cd-sub">${esc(c ? c.category : '')}${c && c.phone ? ' · ' + esc(c.phone) : ''}</p>
            ${list.length ? list.map(p => `
                <div class="deadline-item">
                    <div><strong>${esc(p.name)}</strong><br><small>Muddat: ${esc(p.deadline)} · ${progressOf(p)}%</small></div>
                    <span class="badge ${getStatusBadgeClass(p.status)}">${STATUS_UZ[p.status]}</span>
                </div>`).join('') : '<p class="empty-note">Bu mijozga tegishli loyiha yo\'q</p>'}
            <div class="cd-total">Jami: <strong>${list.length} ta</strong> loyiha · <strong>${fmtMoney(sum)}</strong></div>`;
        openModalById('clientDetailModal');
    }
    $('clientsGrid').addEventListener('click', e => {
        if (e.target.closest('.card-del')) return;
        const card = e.target.closest('.client-card');
        if (card) showClient(card.querySelector('h3').textContent);
    });

    /* ---------- 4. Eslatmalarni qadash ---------- */
    const _rn = renderNotes;
    renderNotes = function () {
        notes.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
        _rn();
        document.querySelectorAll('#notesGrid .note').forEach((el, i) => {
            const n = notes[i]; if (!n) return;
            el.classList.toggle('pinned', !!n.pinned);
            el.insertAdjacentHTML('afterbegin',
                `<button class="card-pin" title="${n.pinned ? 'Qadashni olib tashlash' : 'Qadash'}" onclick="togglePin(${n.id})"><i class="fa-solid fa-thumbtack"></i></button>`);
        });
    };
    window.togglePin = function (id) {
        const n = notes.find(x => x.id === id); if (!n) return;
        n.pinned = !n.pinned; renderNotes();
    };

    // Boshlang'ich holat
    applyFilters(); renderKanban(); renderNotes();
})();