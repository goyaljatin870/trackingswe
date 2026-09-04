// ============================================================
//  ProjectPulse — Firebase-Backed Project Tracker
//  Roles: Admin | Team Member | Public Viewer
//  Database: Cloud Firestore (real-time sync)
// ============================================================

// ===== ⚠️ FIREBASE CONFIG — PASTE YOUR CONFIG HERE ===== //
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
// ======================================================== //

// ===== Constants =====
const ADMIN_CREDENTIALS = { userId: "admin", password: "admin123" };

const COLORS = ['#6366f1','#ec4899','#10b981','#f59e0b','#8b5cf6','#06b6d4','#ef4444','#14b8a6','#f97316','#a855f7'];

const DEFAULTS = {
    members: [
        { id: 1, name: "Aarav Sharma",   rollNo: "21CS101", gmail: "aarav.sharma@gmail.com",   mobile: "9876543210", availability: "Available", userId: "aarav",   password: "aarav123" },
        { id: 2, name: "Priya Patel",    rollNo: "21CS102", gmail: "priya.patel@gmail.com",    mobile: "9876543211", availability: "Available", userId: "priya",   password: "priya123" },
        { id: 3, name: "Rohan Gupta",    rollNo: "21CS103", gmail: "rohan.gupta@gmail.com",    mobile: "9876543212", availability: "Busy",      userId: "rohan",   password: "rohan123" },
        { id: 4, name: "Sneha Reddy",    rollNo: "21CS104", gmail: "sneha.reddy@gmail.com",    mobile: "9876543213", availability: "Available", userId: "sneha",   password: "sneha123" },
        { id: 5, name: "Vikram Singh",   rollNo: "21CS105", gmail: "vikram.singh@gmail.com",   mobile: "9876543214", availability: "On Leave",  userId: "vikram",  password: "vikram123" },
        { id: 6, name: "Ananya Joshi",   rollNo: "21CS106", gmail: "ananya.joshi@gmail.com",   mobile: "9876543215", availability: "Available", userId: "ananya",  password: "ananya123" },
    ],
    progress: [
        { id: 1,  title: "Designed login page wireframes",      desc: "Created high-fidelity mockups for login, signup and forgot password flows.",       memberIds: [2],    week: 1, status: "Completed",   date: "2026-08-11", hours: 4 },
        { id: 2,  title: "Setup CI/CD pipeline",                desc: "Configured GitHub Actions for automated testing and deployment.",                  memberIds: [5],    week: 1, status: "Completed",   date: "2026-08-12", hours: 6 },
        { id: 3,  title: "Database schema design",              desc: "Designed normalized PostgreSQL schema with ER diagrams.",                          memberIds: [3, 1], week: 1, status: "Completed",   date: "2026-08-13", hours: 5 },
        { id: 4,  title: "Implemented JWT authentication",      desc: "Built JWT-based auth with refresh tokens and session management.",                 memberIds: [1],    week: 2, status: "Completed",   date: "2026-08-18", hours: 8 },
        { id: 5,  title: "Dashboard UI components",             desc: "Built reusable chart components and stats cards.",                                 memberIds: [2, 6], week: 2, status: "Completed",   date: "2026-08-19", hours: 6 },
        { id: 6,  title: "API rate limiting middleware",         desc: "Implemented Express middleware for request throttling.",                           memberIds: [3],    week: 2, status: "Completed",   date: "2026-08-20", hours: 3 },
        { id: 7,  title: "Unit test setup with Jest",           desc: "Configured Jest, wrote tests for auth and user modules.",                          memberIds: [4],    week: 2, status: "Completed",   date: "2026-08-21", hours: 5 },
        { id: 8,  title: "React Router with lazy loading",      desc: "Setup client-side routing with code splitting.",                                   memberIds: [1],    week: 3, status: "Completed",   date: "2026-08-25", hours: 4 },
        { id: 9,  title: "Dashboard charts integration",        desc: "Integrated Chart.js for real-time analytics displays.",                            memberIds: [2, 3], week: 3, status: "Completed",   date: "2026-08-26", hours: 7 },
        { id: 10, title: "Data migration scripts",              desc: "Wrote Node.js scripts for legacy data migration.",                                 memberIds: [3],    week: 3, status: "Completed",   date: "2026-08-27", hours: 6 },
        { id: 11, title: "Integration testing suite",           desc: "Wrote API integration tests with Supertest.",                                      memberIds: [4, 1], week: 3, status: "Completed",   date: "2026-08-28", hours: 5 },
        { id: 12, title: "Docker containerization",             desc: "Dockerized all microservices and created docker-compose.",                          memberIds: [5],    week: 3, status: "Completed",   date: "2026-08-28", hours: 6 },
        { id: 13, title: "WebSocket notifications",             desc: "Built real-time notification system with Socket.io.",                              memberIds: [1, 3], week: 4, status: "Completed",   date: "2026-09-01", hours: 7 },
        { id: 14, title: "User profile management",             desc: "Profile pages with avatar upload and settings.",                                   memberIds: [2],    week: 4, status: "Completed",   date: "2026-09-02", hours: 5 },
        { id: 15, title: "Redis caching layer",                 desc: "Implemented Redis caching for frequently accessed APIs.",                          memberIds: [3, 5], week: 4, status: "Completed",   date: "2026-09-03", hours: 4 },
        { id: 16, title: "File upload service",                 desc: "Building S3-based file upload with presigned URLs.",                               memberIds: [1, 2], week: 5, status: "In Progress", date: "2026-09-08", hours: 3 },
        { id: 17, title: "Admin panel development",             desc: "Creating admin dashboard with user management.",                                   memberIds: [2, 6], week: 5, status: "In Progress", date: "2026-09-09", hours: 4 },
        { id: 18, title: "Elasticsearch integration",           desc: "Setting up full-text search across the platform.",                                 memberIds: [3],    week: 5, status: "In Progress", date: "2026-09-10", hours: 5 },
        { id: 19, title: "Kubernetes deployment config",        desc: "Writing K8s manifests and Helm charts.",                                           memberIds: [5, 4], week: 5, status: "Pending",     date: "2026-09-11", hours: 0 },
        { id: 20, title: "E2E test automation",                 desc: "Cypress tests for critical user flows.",                                           memberIds: [4, 6], week: 5, status: "Pending",     date: "2026-09-10", hours: 0 },
    ]
};

// ===== State =====
let currentRole = null;       // 'admin' | 'member' | 'public'
let currentMemberId = null;
let members = [];
let progressEntries = [];
let selectedMemberIds = [];
let db = null;
let membersLoaded = false;
let progressLoaded = false;

// ===== Helpers =====
function getColor(id) { return COLORS[(id - 1) % COLORS.length]; }
function getInitials(name) { return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2); }

function getMemberIds(entry) {
    if (Array.isArray(entry.memberIds)) return entry.memberIds;
    if (entry.memberId) return [entry.memberId];
    return [];
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function renderMemberChips(ids) {
    return ids.map(id => {
        const m = members.find(x => x.id === id);
        if (!m) return '';
        return `<span class="member-chip" style="background:color-mix(in srgb, ${getColor(m.id)} 15%, transparent); color:${getColor(m.id)};">
            <span class="member-chip-avatar" style="background:${getColor(m.id)}">${getInitials(m.name)}</span>
            ${m.name.split(' ')[0]}
        </span>`;
    }).join('');
}

function renderMemberNames(ids) {
    return ids.map(id => {
        const m = members.find(x => x.id === id);
        return m ? m.name : 'Unknown';
    }).join(', ');
}

// ===== Firebase Initialization =====
async function initFirestore() {
    // Check if config is still placeholder
    if (firebaseConfig.apiKey === "YOUR_API_KEY") {
        document.getElementById('loadingOverlay').innerHTML = `
            <div class="loading-content">
                <i class="fas fa-exclamation-triangle" style="font-size:3rem;color:#f59e0b;"></i>
                <h2 style="margin-top:20px;">Firebase Not Configured</h2>
                <p style="max-width:400px;margin:10px auto;line-height:1.6;">
                    Open <strong>app.js</strong> and paste your Firebase config at the top of the file.<br>
                    See the deploy guide for setup instructions.
                </p>
            </div>`;
        return;
    }

    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();

        // Enable offline persistence for better performance
        try { await db.enablePersistence(); } catch (e) { /* OK if fails */ }

        await seedIfNeeded();
        setupRealtimeListeners();
        monitorConnection();
    } catch (err) {
        console.error('Firebase init error:', err);
        document.getElementById('loadingOverlay').innerHTML = `
            <div class="loading-content">
                <i class="fas fa-times-circle" style="font-size:3rem;color:#ef4444;"></i>
                <h2 style="margin-top:20px;">Connection Failed</h2>
                <p>${err.message}</p>
            </div>`;
    }
}

async function seedIfNeeded() {
    const configDoc = await db.collection('meta').doc('config').get();
    if (configDoc.exists && configDoc.data().seeded) return;

    console.log('Seeding default data...');
    const batch = db.batch();

    DEFAULTS.members.forEach(m => {
        batch.set(db.collection('members').doc(String(m.id)), m);
    });

    DEFAULTS.progress.forEach(p => {
        batch.set(db.collection('progress').doc(String(p.id)), p);
    });

    batch.set(db.collection('meta').doc('config'), { seeded: true });
    await batch.commit();
    console.log('Default data seeded!');
}

function setupRealtimeListeners() {
    // Members listener
    db.collection('members').onSnapshot(snapshot => {
        members = snapshot.docs.map(doc => {
            const data = doc.data();
            // Ensure userId and password exist
            if (!data.userId) {
                data.userId = (data.name || 'user').split(' ')[0].toLowerCase() + data.id;
            }
            if (!data.password) {
                data.password = data.userId + '123';
            }
            return data;
        });
        members.sort((a, b) => a.id - b.id);
        membersLoaded = true;
        checkDataReady();
        if (currentRole) renderAll();
    }, err => {
        console.error('Members listener error:', err);
    });

    // Progress listener
    db.collection('progress').onSnapshot(snapshot => {
        progressEntries = snapshot.docs.map(doc => {
            const data = doc.data();
            // Normalize memberIds
            if (!data.memberIds && data.memberId) {
                data.memberIds = [data.memberId];
            }
            if (!data.memberIds) data.memberIds = [];
            return data;
        });
        progressEntries.sort((a, b) => a.id - b.id);
        progressLoaded = true;
        checkDataReady();
        if (currentRole) renderAll();
    }, err => {
        console.error('Progress listener error:', err);
    });
}

function checkDataReady() {
    if (membersLoaded && progressLoaded) {
        const overlay = document.getElementById('loadingOverlay');
        overlay.classList.add('hidden');
        setTimeout(() => { overlay.style.display = 'none'; }, 400);
    }
}

function monitorConnection() {
    // Firestore doesn't have a built-in connection state listener like Realtime DB,
    // so we use online/offline events as a proxy
    const badge = document.getElementById('connectionBadge');
    const updateBadge = (online) => {
        if (online) {
            badge.className = 'connection-badge connected';
            badge.title = 'Database connected';
            badge.querySelector('.connection-text').textContent = 'Live';
        } else {
            badge.className = 'connection-badge disconnected';
            badge.title = 'Offline — changes will sync when reconnected';
            badge.querySelector('.connection-text').textContent = 'Offline';
        }
    };
    window.addEventListener('online', () => updateBadge(true));
    window.addEventListener('offline', () => updateBadge(false));
    updateBadge(navigator.onLine);
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
    initFirestore();
    initTheme();
    initMobileToggle();
    initClickOutsideMultiSelect();
});

// ===== Auth: Tab Switching =====
function switchAuthTab(tab) {
    const tabLoginBtn = document.getElementById('tabLoginBtn');
    const tabRegisterBtn = document.getElementById('tabRegisterBtn');
    const loginPanel = document.getElementById('loginPanel');
    const registerPanel = document.getElementById('registerPanel');
    const loginError = document.getElementById('loginError');
    const registerError = document.getElementById('registerError');

    if (loginError) loginError.textContent = '';
    if (registerError) registerError.textContent = '';

    if (tab === 'register') {
        tabLoginBtn.classList.remove('active');
        tabRegisterBtn.classList.add('active');
        loginPanel.style.display = 'none';
        registerPanel.style.display = 'block';
    } else {
        tabRegisterBtn.classList.remove('active');
        tabLoginBtn.classList.add('active');
        registerPanel.style.display = 'none';
        loginPanel.style.display = 'block';
    }
}

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        input.type = 'password';
        btn.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

function handleLogin(e) {
    e.preventDefault();
    const userIdInput = document.getElementById('loginUserId').value.trim();
    const passwordInput = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');
    errorEl.textContent = '';

    if (userIdInput.toLowerCase() === ADMIN_CREDENTIALS.userId.toLowerCase() && passwordInput === ADMIN_CREDENTIALS.password) {
        currentRole = 'admin';
        currentMemberId = null;
        enterApp();
        showToast('Logged in as Administrator', 'success');
        return;
    }

    const member = members.find(m =>
        (m.userId && m.userId.toLowerCase() === userIdInput.toLowerCase()) ||
        (m.rollNo && m.rollNo.toLowerCase() === userIdInput.toLowerCase())
    );

    if (member && member.password === passwordInput) {
        currentRole = 'member';
        currentMemberId = member.id;
        enterApp();
        showToast(`Welcome back, ${member.name}!`, 'success');
        return;
    }

    errorEl.textContent = 'Invalid User ID or Password. Please try again.';
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('regName').value.trim();
    const rollNo = document.getElementById('regRollNo').value.trim();
    const gmail = document.getElementById('regGmail').value.trim();
    const mobile = document.getElementById('regMobile').value.trim();
    const userId = document.getElementById('regUserId').value.trim();
    const password = document.getElementById('regPassword').value;
    const errorEl = document.getElementById('registerError');
    errorEl.textContent = '';

    if (userId.toLowerCase() === ADMIN_CREDENTIALS.userId.toLowerCase()) {
        errorEl.textContent = 'This User ID is reserved for administrator.';
        return;
    }

    const existingUser = members.find(m => m.userId && m.userId.toLowerCase() === userId.toLowerCase());
    if (existingUser) {
        errorEl.textContent = 'User ID already in use. Please choose another.';
        return;
    }

    const existingRoll = members.find(m => m.rollNo && m.rollNo.toLowerCase() === rollNo.toLowerCase());
    if (existingRoll) {
        errorEl.textContent = 'A member with this Roll No. already exists.';
        return;
    }

    const maxId = members.length > 0 ? Math.max(...members.map(m => m.id)) : 0;
    const newId = maxId + 1;
    const newMember = { id: newId, name, rollNo, gmail, mobile, availability: 'Available', userId, password };

    // Optimistic: add locally + write to Firestore
    members.push(newMember);
    db.collection('members').doc(String(newId)).set(newMember);

    currentRole = 'member';
    currentMemberId = newId;
    enterApp();
    showToast(`Account created! Welcome, ${name}!`, 'success');
}

function loginAsPublic() {
    currentRole = 'public';
    currentMemberId = null;
    enterApp();
    showToast('Viewing project as Public Viewer', 'success');
}

function enterApp() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('appWrapper').style.display = 'flex';
    setupRole();
    renderAll();
}

function logout() {
    currentRole = null;
    currentMemberId = null;
    document.getElementById('appWrapper').style.display = 'none';
    document.getElementById('loginScreen').style.display = '';

    document.getElementById('loginUserId').value = '';
    document.getElementById('loginPassword').value = '';
    const loginErr = document.getElementById('loginError');
    if (loginErr) loginErr.textContent = '';
    const regForm = document.querySelector('#registerPanel form');
    if (regForm) regForm.reset();
    const regErr = document.getElementById('registerError');
    if (regErr) regErr.textContent = '';
    switchAuthTab('login');
}

// ===== Role Setup =====
function setupRole() {
    const chip = document.getElementById('roleChip');
    const avatarEl = document.getElementById('userBadgeAvatar');
    const nameEl = document.getElementById('userBadgeName');
    const roleEl = document.getElementById('userBadgeRole');

    chip.className = 'role-chip ' + currentRole;

    if (currentRole === 'admin') {
        chip.textContent = 'Admin';
        avatarEl.style.background = '#dc2626';
        avatarEl.innerHTML = '<i class="fas fa-shield-halved" style="color:white;font-size:1rem;"></i>';
        nameEl.textContent = 'Administrator';
        roleEl.textContent = 'Full Access';
    } else if (currentRole === 'member') {
        const m = members.find(x => x.id === currentMemberId);
        chip.textContent = 'Team Member';
        avatarEl.style.background = getColor(m.id);
        avatarEl.textContent = getInitials(m.name);
        nameEl.textContent = m.name;
        roleEl.textContent = m.rollNo;
    } else {
        chip.textContent = 'Public Viewer';
        avatarEl.style.background = '#059669';
        avatarEl.innerHTML = '<i class="fas fa-eye" style="color:white;font-size:1rem;"></i>';
        nameEl.textContent = 'Public Viewer';
        roleEl.textContent = 'Read Only';
    }
    buildNavigation();
}

function buildNavigation() {
    const nav = document.getElementById('navLinks');
    const items = [
        { id: 'dashboard', icon: 'fa-th-large', label: 'Dashboard' },
        { id: 'team', icon: 'fa-users', label: 'Team Members' },
        { id: 'progress', icon: 'fa-clipboard-list', label: 'Work Progress' },
        { id: 'weekly', icon: 'fa-calendar-week', label: 'Weekly View' },
    ];

    nav.innerHTML = items.map((item, i) =>
        `<li class="${i === 0 ? 'active' : ''}" data-section="${item.id}">
            <i class="fas ${item.icon}"></i><span>${item.label}</span>
        </li>`
    ).join('');

    nav.querySelectorAll('li').forEach(li => {
        li.addEventListener('click', () => {
            nav.querySelectorAll('li').forEach(l => l.classList.remove('active'));
            li.classList.add('active');
            document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
            document.getElementById(`section-${li.dataset.section}`).classList.add('active');
            document.getElementById('pageTitle').textContent = li.querySelector('span').textContent;
            document.getElementById('sidebar').classList.remove('mobile-open');
        });
    });
    applyRoleVisibility();
}

function applyRoleVisibility() {
    document.querySelectorAll('.admin-only').forEach(el => {
        el.style.display = currentRole === 'admin' ? '' : 'none';
    });
    document.querySelectorAll('.member-or-admin').forEach(el => {
        el.style.display = (currentRole === 'admin' || currentRole === 'member') ? '' : 'none';
    });
}

// ===== Render All =====
function renderAll() {
    renderDashboard();
    renderTeam();
    renderWorkProgress();
    renderWeeklyView();
}

// ===== Dashboard =====
function renderDashboard() {
    document.getElementById('statMembers').textContent = members.length;
    document.getElementById('statEntries').textContent = progressEntries.length;

    const weeks = [...new Set(progressEntries.map(p => p.week))];
    const maxWeek = weeks.length > 0 ? Math.max(...weeks) : 0;
    document.getElementById('statCurrentWeek').textContent = maxWeek;

    const completed = progressEntries.filter(p => p.status === 'Completed').length;
    const total = progressEntries.length;
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    document.getElementById('statProgress').textContent = pct + '%';

    renderRecentEntries();
    renderTeamMiniList();
}

function renderRecentEntries() {
    const container = document.getElementById('recentEntries');
    const sorted = [...progressEntries].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

    if (sorted.length === 0) {
        container.innerHTML = '<p class="empty-state"><i class="fas fa-inbox"></i>No entries yet</p>';
        return;
    }

    container.innerHTML = sorted.map(entry => {
        const ids = getMemberIds(entry);
        const firstMember = members.find(x => x.id === ids[0]);
        const color = firstMember ? getColor(firstMember.id) : '#999';
        const initials = firstMember ? getInitials(firstMember.name) : '?';
        const statusText = entry.status === 'Completed' ? 'completed' : entry.status === 'In Progress' ? 'working on' : 'has pending';
        const memberCountExtra = ids.length > 1 ? ` (+${ids.length - 1} more)` : '';

        return `
            <div class="activity-item">
                <div class="activity-avatar" style="background:${color}">${initials}</div>
                <div class="activity-content">
                    <p><strong>${firstMember ? firstMember.name : 'Unknown'}${memberCountExtra}</strong> ${statusText} <strong>${entry.title}</strong></p>
                    <span class="activity-time">Week ${entry.week} · ${formatDate(entry.date)}${entry.hours > 0 ? ` · ${entry.hours}h` : ''}</span>
                </div>
            </div>
        `;
    }).join('');
}

function renderTeamMiniList() {
    const container = document.getElementById('teamMiniList');
    if (members.length === 0) {
        container.innerHTML = '<p class="empty-state">No team members</p>';
        return;
    }
    container.innerHTML = members.map(m => {
        const entryCount = progressEntries.filter(p => getMemberIds(p).includes(m.id)).length;
        return `
            <div class="team-mini-item">
                <div class="team-mini-avatar" style="background:${getColor(m.id)}">${getInitials(m.name)}</div>
                <div class="team-mini-info">
                    <h5>${m.name}</h5>
                    <span>${m.rollNo} · ${entryCount} entries</span>
                </div>
                <span class="availability-tag ${m.availability}">${m.availability}</span>
            </div>
        `;
    }).join('');
}

// ===== Team Members =====
function renderTeam() {
    const grid = document.getElementById('teamGrid');
    if (members.length === 0) {
        grid.innerHTML = '<p class="empty-state" style="grid-column:1/-1;"><i class="fas fa-users"></i>No team members added yet</p>';
        return;
    }
    grid.innerHTML = members.map(m => {
        const entries = progressEntries.filter(p => getMemberIds(p).includes(m.id));
        const completed = entries.filter(p => p.status === 'Completed').length;
        const totalHours = entries.reduce((s, e) => s + (e.hours || 0), 0);

        return `
            <div class="team-card">
                <div class="team-card-header">
                    <div class="team-card-avatar">${getInitials(m.name)}</div>
                    <div class="team-card-info">
                        <h4>${m.name}</h4>
                        <span>${m.rollNo}</span>
                    </div>
                </div>
                <div class="team-card-body">
                    <div class="team-detail"><i class="fas fa-envelope"></i><span>${m.gmail}</span></div>
                    <div class="team-detail"><i class="fas fa-phone"></i><span>${m.mobile}</span></div>
                    <div class="team-detail"><i class="fas fa-signal"></i><span class="availability-tag ${m.availability}">${m.availability}</span></div>
                    <div class="team-detail" style="border-bottom:none;"><i class="fas fa-chart-bar"></i><span>${completed} completed · ${totalHours}h total</span></div>
                </div>
                <div class="team-card-footer">
                    <span class="meta-tag"><i class="fas fa-clipboard-list"></i> ${entries.length} entries</span>
                    <div class="card-actions" ${currentRole !== 'admin' ? 'style="display:none"' : ''}>
                        <button onclick="editMember(${m.id})" title="Edit"><i class="fas fa-pen"></i> Edit</button>
                        <button class="delete-btn" onclick="confirmDeleteMember(${m.id})" title="Delete"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ===== Work Progress =====
function renderWorkProgress() {
    const container = document.getElementById('progressEntries');
    const weekFilter = document.getElementById('progressWeekFilter');

    const weeks = [...new Set(progressEntries.map(p => p.week))].sort((a, b) => a - b);
    const currentFilterVal = weekFilter.value;
    weekFilter.innerHTML = '<option value="all">All Weeks</option>' +
        weeks.map(w => `<option value="${w}">Week ${w}</option>`).join('');
    weekFilter.value = currentFilterVal;

    const filterVal = weekFilter.value;
    let filtered = [...progressEntries];

    if (filterVal !== 'all') {
        filtered = filtered.filter(p => p.week === parseInt(filterVal));
    }

    if (currentRole === 'member') {
        filtered = filtered.filter(p => getMemberIds(p).includes(currentMemberId));
    }

    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (filtered.length === 0) {
        container.innerHTML = '<p class="empty-state"><i class="fas fa-inbox"></i>No work progress entries found</p>';
        return;
    }

    container.innerHTML = filtered.map(entry => {
        const ids = getMemberIds(entry);
        const firstMember = members.find(x => x.id === ids[0]);
        const color = firstMember ? getColor(firstMember.id) : '#999';
        const initials = firstMember ? getInitials(firstMember.name) : '?';
        const canEdit = currentRole === 'admin' || (currentRole === 'member' && ids.includes(currentMemberId));
        const canDelete = currentRole === 'admin';
        const canEditTime = currentRole === 'admin';

        return `
            <div class="progress-entry">
                <div class="progress-entry-avatar" style="background:${color}">${initials}</div>
                <div class="progress-entry-content">
                    <div class="progress-entry-header">
                        <div>
                            <div class="progress-entry-title">${entry.title}</div>
                            <div class="progress-entry-meta">
                                <span class="meta-tag"><i class="fas fa-users"></i> <span class="member-chips">${renderMemberChips(ids)}</span></span>
                                <span class="meta-tag"><i class="fas fa-calendar"></i> ${formatDate(entry.date)}</span>
                                <span class="meta-tag"><i class="fas fa-clock"></i> ${entry.hours}h</span>
                                <span class="meta-tag"><i class="fas fa-layer-group"></i> Week ${entry.week}</span>
                            </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:8px;">
                            <span class="status-badge ${entry.status}">${entry.status}</span>
                        </div>
                    </div>
                    ${entry.desc ? `<div class="progress-entry-desc">${entry.desc}</div>` : ''}
                </div>
                ${canEdit || canDelete ? `
                    <div class="progress-entry-actions">
                        ${canEdit ? `<button onclick="editProgress(${entry.id}, ${canEditTime})" title="Edit"><i class="fas fa-pen"></i></button>` : ''}
                        ${canDelete ? `<button class="delete-btn" onclick="confirmDeleteProgress(${entry.id})" title="Delete"><i class="fas fa-trash"></i></button>` : ''}
                    </div>
                ` : ''}
            </div>
        `;
    }).join('');
}

// ===== Weekly View =====
function renderWeeklyView() {
    const container = document.getElementById('weeklyTimeline');
    const weeks = [...new Set(progressEntries.map(p => p.week))].sort((a, b) => a - b);

    if (weeks.length === 0) {
        container.innerHTML = '<p class="empty-state"><i class="fas fa-calendar-xmark"></i>No weekly data available</p>';
        return;
    }

    container.innerHTML = weeks.map((w, idx) => {
        const weekEntries = progressEntries.filter(p => p.week === w);
        const completed = weekEntries.filter(p => p.status === 'Completed').length;
        const inProgress = weekEntries.filter(p => p.status === 'In Progress').length;
        const pending = weekEntries.filter(p => p.status === 'Pending').length;
        const totalHours = weekEntries.reduce((s, e) => s + (e.hours || 0), 0);
        const percent = weekEntries.length > 0 ? Math.round((completed / weekEntries.length) * 100) : 0;
        const isLast = idx === weeks.length - 1;

        return `
            <div class="week-card">
                <div class="week-header" onclick="toggleWeek(this)">
                    <div class="week-header-left">
                        <div class="week-number">W${w}</div>
                        <div class="week-title">
                            <h4>Week ${w}</h4>
                            <span>${weekEntries.length} entries · ${totalHours}h total</span>
                        </div>
                    </div>
                    <div class="week-header-right">
                        <div class="week-stats-mini">
                            <div class="week-stat-mini">
                                <div class="week-stat-mini-value" style="color:var(--success)">${completed}</div>
                                <div class="week-stat-mini-label">Done</div>
                            </div>
                            <div class="week-stat-mini">
                                <div class="week-stat-mini-value" style="color:var(--warning)">${inProgress}</div>
                                <div class="week-stat-mini-label">Active</div>
                            </div>
                            <div class="week-stat-mini">
                                <div class="week-stat-mini-value" style="color:var(--text-muted)">${pending}</div>
                                <div class="week-stat-mini-label">Pending</div>
                            </div>
                        </div>
                        <div class="week-progress-bar">
                            <div class="week-progress-fill" style="width:${percent}%"></div>
                        </div>
                        <button class="week-toggle ${isLast ? 'expanded' : ''}">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                </div>
                <div class="week-body ${isLast ? 'expanded' : ''}">
                    <div class="week-entries-list">
                        ${weekEntries.map(entry => {
                            const ids = getMemberIds(entry);
                            const statusIcon = entry.status === 'Completed' ? 'fa-check-circle' :
                                              entry.status === 'In Progress' ? 'fa-spinner' : 'fa-circle';
                            return `
                                <div class="week-entry-item">
                                    <i class="fas ${statusIcon} week-entry-status ${entry.status}"></i>
                                    <span class="week-entry-title">${entry.title}</span>
                                    <div class="week-entry-member">
                                        <div class="member-chips">${renderMemberChips(ids)}</div>
                                    </div>
                                    ${entry.hours > 0 ? `<span class="week-entry-hours">${entry.hours}h</span>` : ''}
                                    <span class="status-badge ${entry.status}" style="font-size:0.6rem;">${entry.status}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function toggleWeek(header) {
    const body = header.nextElementSibling;
    const toggle = header.querySelector('.week-toggle');
    body.classList.toggle('expanded');
    toggle.classList.toggle('expanded');
}

// ===== Multi-Select Member Dropdown =====
function toggleMultiSelect() {
    const trigger = document.getElementById('memberSelectTrigger');
    const dropdown = document.getElementById('memberDropdown');
    trigger.classList.toggle('open');
    dropdown.classList.toggle('open');
    if (dropdown.classList.contains('open')) {
        document.getElementById('memberSearchInput').focus();
    }
}

function closeMultiSelect() {
    document.getElementById('memberSelectTrigger').classList.remove('open');
    document.getElementById('memberDropdown').classList.remove('open');
}

function initClickOutsideMultiSelect() {
    document.addEventListener('click', (e) => {
        const ms = document.getElementById('memberMultiSelect');
        if (ms && !ms.contains(e.target)) closeMultiSelect();
    });
}

function populateMemberOptions(availableMembers, preSelected) {
    selectedMemberIds = [...preSelected];
    const container = document.getElementById('memberOptions');
    container.innerHTML = availableMembers.map(m => {
        const isSelected = selectedMemberIds.includes(m.id);
        return `
            <div class="multi-select-option ${isSelected ? 'selected' : ''}" data-id="${m.id}" onclick="toggleMemberOption(${m.id})">
                <div class="ms-checkbox">${isSelected ? '<i class="fas fa-check"></i>' : ''}</div>
                <div class="ms-avatar" style="background:${getColor(m.id)}">${getInitials(m.name)}</div>
                <div class="ms-info">
                    <div class="ms-name">${m.name}</div>
                    <div class="ms-roll">${m.rollNo}</div>
                </div>
            </div>
        `;
    }).join('');
    updateMultiSelectTrigger();
}

function toggleMemberOption(id) {
    const idx = selectedMemberIds.indexOf(id);
    if (idx > -1) selectedMemberIds.splice(idx, 1);
    else selectedMemberIds.push(id);

    document.querySelectorAll('#memberOptions .multi-select-option').forEach(opt => {
        const optId = parseInt(opt.dataset.id);
        const isSelected = selectedMemberIds.includes(optId);
        opt.classList.toggle('selected', isSelected);
        opt.querySelector('.ms-checkbox').innerHTML = isSelected ? '<i class="fas fa-check"></i>' : '';
    });
    updateMultiSelectTrigger();
}

function removeMemberFromSelection(id) {
    const idx = selectedMemberIds.indexOf(id);
    if (idx > -1) {
        selectedMemberIds.splice(idx, 1);
        const opt = document.querySelector(`#memberOptions .multi-select-option[data-id="${id}"]`);
        if (opt) { opt.classList.remove('selected'); opt.querySelector('.ms-checkbox').innerHTML = ''; }
        updateMultiSelectTrigger();
    }
}

function clearMemberSelection() {
    selectedMemberIds = [];
    document.querySelectorAll('#memberOptions .multi-select-option').forEach(opt => {
        opt.classList.remove('selected');
        opt.querySelector('.ms-checkbox').innerHTML = '';
    });
    updateMultiSelectTrigger();
}

function updateMultiSelectTrigger() {
    const trigger = document.getElementById('memberSelectTrigger');
    const icon = '<i class="fas fa-chevron-down"></i>';
    if (selectedMemberIds.length === 0) {
        trigger.innerHTML = `<span class="multi-select-placeholder">Select members...</span>${icon}`;
    } else {
        const tags = selectedMemberIds.map(id => {
            const m = members.find(x => x.id === id);
            if (!m) return '';
            return `<span class="member-tag">
                ${m.name.split(' ')[0]}
                <span class="tag-remove" onclick="event.stopPropagation(); removeMemberFromSelection(${m.id})">
                    <i class="fas fa-times"></i>
                </span>
            </span>`;
        }).join('');
        trigger.innerHTML = `<div class="multi-select-tags">${tags}</div>${icon}`;
    }
    if (document.getElementById('memberDropdown').classList.contains('open')) {
        trigger.classList.add('open');
    }
}

function filterMemberOptions(query) {
    const q = query.toLowerCase();
    document.querySelectorAll('#memberOptions .multi-select-option').forEach(opt => {
        const name = opt.querySelector('.ms-name').textContent.toLowerCase();
        const roll = opt.querySelector('.ms-roll').textContent.toLowerCase();
        opt.style.display = (name.includes(q) || roll.includes(q)) ? '' : 'none';
    });
}

// ===== Modal Helpers =====
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }

// ===== Member CRUD (Firestore) =====
function saveMember(e) {
    e.preventDefault();
    const editId = document.getElementById('editMemberId').value;
    const data = {
        name: document.getElementById('mName').value.trim(),
        rollNo: document.getElementById('mRollNo').value.trim(),
        gmail: document.getElementById('mGmail').value.trim(),
        mobile: document.getElementById('mMobile').value.trim(),
        availability: document.getElementById('mAvailability').value,
    };

    if (editId) {
        // Update existing member in Firestore
        db.collection('members').doc(editId).update(data);
        showToast(`${data.name} updated successfully!`, 'success');
    } else {
        // Add new member to Firestore
        const maxId = members.length > 0 ? Math.max(...members.map(m => m.id)) : 0;
        const newId = maxId + 1;
        const defaultUserId = data.name.split(' ')[0].toLowerCase() + newId;
        const newMember = {
            id: newId,
            ...data,
            userId: defaultUserId,
            password: defaultUserId + "123"
        };
        db.collection('members').doc(String(newId)).set(newMember);
        showToast(`${data.name} added! (Login: ${defaultUserId})`, 'success');
    }

    closeModal('memberModal');
    document.getElementById('memberFormData').reset();
    document.getElementById('editMemberId').value = '';
    // No need for renderAll() — real-time listener handles it
}

function editMember(id) {
    const m = members.find(x => x.id === id);
    if (!m) return;
    document.getElementById('memberModalTitle').textContent = 'Edit Team Member';
    document.getElementById('memberSubmitBtn').textContent = 'Save Changes';
    document.getElementById('editMemberId').value = m.id;
    document.getElementById('mName').value = m.name;
    document.getElementById('mRollNo').value = m.rollNo;
    document.getElementById('mGmail').value = m.gmail;
    document.getElementById('mMobile').value = m.mobile;
    document.getElementById('mAvailability').value = m.availability;
    openModal('memberModal');
}

function confirmDeleteMember(id) {
    const m = members.find(x => x.id === id);
    if (!m) return;

    document.getElementById('confirmMessage').textContent = `Delete "${m.name}"? They will be removed from all progress entries.`;
    document.getElementById('confirmDeleteBtn').onclick = async () => {
        // Delete member doc
        await db.collection('members').doc(String(id)).delete();

        // Update progress entries that reference this member
        const batch = db.batch();
        progressEntries.forEach(entry => {
            const ids = getMemberIds(entry);
            if (ids.includes(id)) {
                const newIds = ids.filter(mid => mid !== id);
                if (newIds.length === 0) {
                    // Delete the progress entry entirely
                    batch.delete(db.collection('progress').doc(String(entry.id)));
                } else {
                    // Update memberIds
                    batch.update(db.collection('progress').doc(String(entry.id)), { memberIds: newIds });
                }
            }
        });
        await batch.commit();

        closeModal('confirmModal');
        showToast(`${m.name} removed`, 'error');
        // Real-time listeners will update the UI
    };
    openModal('confirmModal');
}

// ===== Progress CRUD (Firestore) =====
function openAddProgress() {
    document.getElementById('progressModalTitle').textContent = 'Add Work Progress';
    document.getElementById('progressSubmitBtn').textContent = 'Add Entry';
    document.getElementById('progressFormData').reset();
    document.getElementById('editProgressId').value = '';

    let availableMembers;
    if (currentRole === 'member') {
        availableMembers = members.filter(m => m.id === currentMemberId);
        populateMemberOptions(availableMembers, [currentMemberId]);
    } else {
        availableMembers = members;
        populateMemberOptions(availableMembers, []);
    }

    // All fields editable for new entries
    document.getElementById('pHours').readOnly = false;
    document.getElementById('pHours').disabled = false;
    document.getElementById('pDate').readOnly = false;
    document.getElementById('pWeek').disabled = false;
    document.getElementById('timeNote').style.display = 'none';
    document.getElementById('dateNote').style.display = 'none';
    document.getElementById('weekNote').style.display = 'none';

    document.getElementById('pDate').value = new Date().toISOString().split('T')[0];
    openModal('progressModal');
}

function editProgress(id, canEditTime) {
    const entry = progressEntries.find(x => x.id === id);
    if (!entry) return;

    document.getElementById('progressModalTitle').textContent = 'Edit Work Progress';
    document.getElementById('progressSubmitBtn').textContent = 'Save Changes';
    document.getElementById('editProgressId').value = entry.id;
    document.getElementById('pTitle').value = entry.title;
    document.getElementById('pDescription').value = entry.desc || '';
    document.getElementById('pWeek').value = entry.week;
    document.getElementById('pStatus').value = entry.status;
    document.getElementById('pDate').value = entry.date;
    document.getElementById('pHours').value = entry.hours;

    const ids = getMemberIds(entry);
    if (currentRole === 'member') {
        const availableMembers = members.filter(m => ids.includes(m.id) || m.id === currentMemberId);
        populateMemberOptions(availableMembers, ids);
    } else {
        populateMemberOptions(members, ids);
    }

    const hoursField = document.getElementById('pHours');
    const dateField = document.getElementById('pDate');
    const weekField = document.getElementById('pWeek');

    if (!canEditTime) {
        hoursField.readOnly = true;
        dateField.readOnly = true;
        weekField.disabled = true;
        document.getElementById('timeNote').style.display = 'flex';
        document.getElementById('dateNote').style.display = 'flex';
        document.getElementById('weekNote').style.display = 'flex';
    } else {
        hoursField.readOnly = false;
        dateField.readOnly = false;
        weekField.disabled = false;
        document.getElementById('timeNote').style.display = 'none';
        document.getElementById('dateNote').style.display = 'none';
        document.getElementById('weekNote').style.display = 'none';
    }

    openModal('progressModal');
}

function saveProgress(e) {
    e.preventDefault();

    if (selectedMemberIds.length === 0) {
        showToast('Please select at least one member', 'error');
        return;
    }

    const editId = document.getElementById('editProgressId').value;
    const data = {
        title: document.getElementById('pTitle').value.trim(),
        desc: document.getElementById('pDescription').value.trim(),
        memberIds: [...selectedMemberIds],
        week: parseInt(document.getElementById('pWeek').value),
        status: document.getElementById('pStatus').value,
        date: document.getElementById('pDate').value,
        hours: parseFloat(document.getElementById('pHours').value) || 0,
    };

    if (editId) {
        const existingEntry = progressEntries.find(p => p.id === parseInt(editId));
        // If member editing, preserve locked fields
        if (currentRole === 'member' && existingEntry) {
            data.hours = existingEntry.hours;
            data.date = existingEntry.date;
            data.week = existingEntry.week;
        }
        data.id = parseInt(editId);
        db.collection('progress').doc(editId).update(data);
        showToast('Entry updated!', 'success');
    } else {
        const maxId = progressEntries.length > 0 ? Math.max(...progressEntries.map(p => p.id)) : 0;
        const newId = maxId + 1;
        data.id = newId;
        db.collection('progress').doc(String(newId)).set(data);
        showToast('Progress entry added!', 'success');
    }

    closeModal('progressModal');
    closeMultiSelect();
    document.getElementById('progressFormData').reset();
    document.getElementById('editProgressId').value = '';
    selectedMemberIds = [];
    // Real-time listener will handle re-render
}

function confirmDeleteProgress(id) {
    const entry = progressEntries.find(x => x.id === id);
    if (!entry) return;

    document.getElementById('confirmMessage').textContent = `Delete entry "${entry.title}"?`;
    document.getElementById('confirmDeleteBtn').onclick = () => {
        db.collection('progress').doc(String(id)).delete();
        closeModal('confirmModal');
        showToast('Entry deleted', 'error');
    };
    openModal('confirmModal');
}

// Close modals on backdrop click
document.addEventListener('DOMContentLoaded', () => {
    ['memberModal', 'progressModal', 'confirmModal'].forEach(id => {
        document.getElementById(id).addEventListener('click', function(e) {
            if (e.target === this) closeModal(id);
        });
    });
});

// ===== Theme =====
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('pp_theme');
    if (saved === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        toggle.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
    }
    toggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            toggle.innerHTML = '<i class="fas fa-moon"></i><span>Dark Mode</span>';
            localStorage.setItem('pp_theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggle.innerHTML = '<i class="fas fa-sun"></i><span>Light Mode</span>';
            localStorage.setItem('pp_theme', 'dark');
        }
    });
}

// ===== Mobile Toggle =====
function initMobileToggle() {
    document.getElementById('mobileToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('mobile-open');
    });
}

// ===== Toast =====
function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-times-circle'}"></i> ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = '0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}
