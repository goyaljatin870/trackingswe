// ============================================================
//  ProjectPulse — Firebase-Backed Project Tracker
//  Roles: Admin | Team Member | Public Viewer
//  Database: Cloud Firestore (real-time sync)
// ============================================================

// ===== ⚠️ FIREBASE CONFIG — PASTE YOUR CONFIG HERE ===== //
const firebaseConfig = {
  apiKey: "AIzaSyDarzmDbhpZZpyvqAXLyGRNORGpzdrdMwo",
  authDomain: "projectpulse-36e9f.firebaseapp.com",
  projectId: "projectpulse-36e9f",
  storageBucket: "projectpulse-36e9f.firebasestorage.app",
  messagingSenderId: "628211205083",
  appId: "1:628211205083:web:31586d94d3d398b5dc5dfe"
};
// ======================================================== //

// ===== Constants =====
const ADMIN_CREDENTIALS = { userId: "jatin870", password: "Goyal@1234" };

const COLORS = ['#6366f1','#ec4899','#10b981','#f59e0b','#8b5cf6','#06b6d4','#ef4444','#14b8a6','#f97316','#a855f7'];

const DEFAULTS = {
    members: [
        { id: 1, name: "Aarav Sharma",   rollNo: "21CS101", gmail: "aarav.sharma@gmail.com",   mobile: "9876543210", availability: "Available", userId: "aarav",   password: "aarav123",  approved: true },
        { id: 2, name: "Priya Patel",    rollNo: "21CS102", gmail: "priya.patel@gmail.com",    mobile: "9876543211", availability: "Available", userId: "priya",   password: "priya123",  approved: true },
        { id: 3, name: "Rohan Gupta",    rollNo: "21CS103", gmail: "rohan.gupta@gmail.com",    mobile: "9876543212", availability: "Busy",      userId: "rohan",   password: "rohan123",  approved: true },
        { id: 4, name: "Sneha Reddy",    rollNo: "21CS104", gmail: "sneha.reddy@gmail.com",    mobile: "9876543213", availability: "Available", userId: "sneha",   password: "sneha123",  approved: true },
        { id: 5, name: "Vikram Singh",   rollNo: "21CS105", gmail: "vikram.singh@gmail.com",   mobile: "9876543214", availability: "On Leave",  userId: "vikram",  password: "vikram123", approved: true },
        { id: 6, name: "Ananya Joshi",   rollNo: "21CS106", gmail: "ananya.joshi@gmail.com",   mobile: "9876543215", availability: "Available", userId: "ananya",  password: "ananya123", approved: true },
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
let presentations = [];
let reports = [];
let selectedMemberIds = [];
let selectedFile = null;
let db = null;
let storage = null;
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
        storage = firebase.storage();

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

    // Presentations listener
    db.collection('presentations').onSnapshot(snapshot => {
        presentations = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
        presentations.sort((a, b) => new Date(b.uploadDate || 0) - new Date(a.uploadDate || 0));
        if (currentRole) renderFiles('presentations');
    }, err => {
        console.error('Presentations listener error:', err);
    });

    // Reports listener
    db.collection('reports').onSnapshot(snapshot => {
        reports = snapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));
        reports.sort((a, b) => new Date(b.uploadDate || 0) - new Date(a.uploadDate || 0));
        if (currentRole) renderFiles('reports');
    }, err => {
        console.error('Reports listener error:', err);
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
        // Check if member is approved by admin
        if (!member.approved) {
            errorEl.innerHTML = '<i class="fas fa-clock"></i> Your account is pending admin approval. Please wait for the admin to approve your registration.';
            return;
        }
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
    const newMember = { id: newId, name, rollNo, gmail, mobile, availability: 'Available', userId, password, approved: false };

    // Write to Firestore (pending approval)
    db.collection('members').doc(String(newId)).set(newMember);

    // Show success message — do NOT auto-login
    document.querySelector('#registerPanel form').reset();
    const successEl = document.getElementById('registerError');
    successEl.style.color = 'var(--success)';
    successEl.innerHTML = '<i class="fas fa-check-circle"></i> Registration successful! Your account is pending admin approval. You will be able to login once approved.';

    // Reset color after switching tabs
    setTimeout(() => { successEl.style.color = ''; }, 8000);
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
        { id: 'presentations', icon: 'fa-file-powerpoint', label: 'Presentations' },
        { id: 'reports', icon: 'fa-file-alt', label: 'Reports' },
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
    renderFiles('presentations');
    renderFiles('reports');
}

// ===== Dashboard =====
function renderDashboard() {
    const approvedCount = members.filter(m => m.approved !== false).length;
    const pendingCount = members.filter(m => m.approved === false).length;
    document.getElementById('statMembers').textContent = approvedCount;
    document.getElementById('statEntries').textContent = progressEntries.length;

    // Show pending badge on Team nav if admin has pending approvals
    const teamNav = document.querySelector('[data-section="team"]');
    if (teamNav) {
        const existingBadge = teamNav.querySelector('.nav-badge');
        if (existingBadge) existingBadge.remove();
        if (currentRole === 'admin' && pendingCount > 0) {
            const badge = document.createElement('span');
            badge.className = 'nav-badge';
            badge.textContent = pendingCount;
            teamNav.appendChild(badge);
        }
    }

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
    const approvedMembers = members.filter(m => m.approved !== false);
    if (approvedMembers.length === 0) {
        container.innerHTML = '<p class="empty-state">No team members</p>';
        return;
    }
    container.innerHTML = approvedMembers.map(m => {
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

    const approvedMembers = members.filter(m => m.approved !== false);
    const pendingMembers = members.filter(m => m.approved === false);

    if (members.length === 0) {
        grid.innerHTML = '<p class="empty-state" style="grid-column:1/-1;"><i class="fas fa-users"></i>No team members added yet</p>';
        return;
    }

    let html = '';

    // Pending Approvals Section (Admin only)
    if (currentRole === 'admin' && pendingMembers.length > 0) {
        html += `
            <div class="pending-section" style="grid-column:1/-1;">
                <div class="pending-header">
                    <h3><i class="fas fa-user-clock"></i> Pending Approvals <span class="pending-count">${pendingMembers.length}</span></h3>
                </div>
                <div class="pending-list">
                    ${pendingMembers.map(m => `
                        <div class="pending-card">
                            <div class="pending-card-left">
                                <div class="team-card-avatar pending-avatar">${getInitials(m.name)}</div>
                                <div class="pending-info">
                                    <h4>${m.name}</h4>
                                    <div class="pending-details">
                                        <span><i class="fas fa-id-badge"></i> ${m.rollNo}</span>
                                        <span><i class="fas fa-envelope"></i> ${m.gmail}</span>
                                        <span><i class="fas fa-phone"></i> ${m.mobile}</span>
                                        <span><i class="fas fa-user"></i> @${m.userId}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="pending-actions">
                                <button class="btn btn-primary btn-sm" onclick="approveMember(${m.id})">
                                    <i class="fas fa-check"></i> Approve
                                </button>
                                <button class="btn btn-danger btn-sm" onclick="rejectMember(${m.id})">
                                    <i class="fas fa-times"></i> Reject
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Approved team members
    if (approvedMembers.length === 0 && pendingMembers.length > 0) {
        html += '<p class="empty-state" style="grid-column:1/-1;">No approved team members yet</p>';
    } else {
        html += approvedMembers.map(m => {
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

    grid.innerHTML = html;
}

function approveMember(id) {
    db.collection('members').doc(String(id)).update({ approved: true });
    showToast('Member approved! They can now login.', 'success');
}

function rejectMember(id) {
    const m = members.find(x => x.id === id);
    if (!m) return;
    document.getElementById('confirmMessage').textContent = `Reject and remove "${m.name}"? They will need to register again.`;
    document.getElementById('confirmDeleteBtn').onclick = () => {
        db.collection('members').doc(String(id)).delete();
        closeModal('confirmModal');
        showToast(`${m.name}'s registration rejected`, 'error');
    };
    openModal('confirmModal');
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
            password: defaultUserId + "123",
            approved: true   // Admin-added members are auto-approved
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
        availableMembers = members.filter(m => m.approved !== false);
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
        populateMemberOptions(members.filter(m => m.approved !== false || ids.includes(m.id)), ids);
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
    ['memberModal', 'progressModal', 'confirmModal', 'uploadModal', 'githubSettingsModal'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', function(e) {
                if (e.target === this) closeModal(id);
            });
        }
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

// ===== FILE MANAGEMENT (Presentations & Reports) =====

function getFileTypeInfo(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    const map = {
        ppt:  { icon: 'fa-file-powerpoint', cls: 'ppt', label: 'PPT' },
        pptx: { icon: 'fa-file-powerpoint', cls: 'ppt', label: 'PPTX' },
        pdf:  { icon: 'fa-file-pdf',        cls: 'pdf', label: 'PDF' },
        doc:  { icon: 'fa-file-word',        cls: 'doc', label: 'DOC' },
        docx: { icon: 'fa-file-word',        cls: 'doc', label: 'DOCX' },
        xls:  { icon: 'fa-file-excel',       cls: 'xls', label: 'XLS' },
        xlsx: { icon: 'fa-file-excel',       cls: 'xls', label: 'XLSX' },
        txt:  { icon: 'fa-file-alt',         cls: 'other', label: 'TXT' },
        csv:  { icon: 'fa-file-csv',         cls: 'other', label: 'CSV' },
    };
    return map[ext] || { icon: 'fa-file', cls: 'other', label: ext.toUpperCase() };
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// ===== GITHUB STORAGE CONFIGURATION =====
const GITHUB_DEFAULTS = {
    owner: "goyaljatin870",
    repo: "trackingswe",
    branch: "main",
    token: ""
};

function getGithubConfig() {
    return {
        owner: (localStorage.getItem('pp_gh_owner') || GITHUB_DEFAULTS.owner).trim(),
        repo: (localStorage.getItem('pp_gh_repo') || GITHUB_DEFAULTS.repo).trim(),
        branch: (localStorage.getItem('pp_gh_branch') || GITHUB_DEFAULTS.branch).trim(),
        token: (localStorage.getItem('pp_gh_token') || '').trim()
    };
}

function openGithubSettings() {
    const config = getGithubConfig();
    document.getElementById('ghOwnerInput').value = config.owner;
    document.getElementById('ghRepoInput').value = config.repo;
    document.getElementById('ghBranchInput').value = config.branch;
    document.getElementById('ghTokenInput').value = config.token;
    const testResult = document.getElementById('ghTestResult');
    if (testResult) {
        testResult.style.display = 'none';
        testResult.innerHTML = '';
    }
    openModal('githubSettingsModal');
}

function saveGithubSettings(e) {
    e.preventDefault();
    const owner = document.getElementById('ghOwnerInput').value.trim();
    const repo = document.getElementById('ghRepoInput').value.trim();
    const branch = document.getElementById('ghBranchInput').value.trim() || 'main';
    const token = document.getElementById('ghTokenInput').value.trim();

    localStorage.setItem('pp_gh_owner', owner);
    localStorage.setItem('pp_gh_repo', repo);
    localStorage.setItem('pp_gh_branch', branch);
    localStorage.setItem('pp_gh_token', token);

    updateGithubBanner();
    closeModal('githubSettingsModal');
    showToast('GitHub storage settings saved!', 'success');
}

async function testGithubConnection() {
    const owner = document.getElementById('ghOwnerInput').value.trim();
    const repo = document.getElementById('ghRepoInput').value.trim();
    const token = document.getElementById('ghTokenInput').value.trim();
    const resultEl = document.getElementById('ghTestResult');
    const testBtn = document.getElementById('ghTestBtn');

    if (!owner || !repo) {
        resultEl.style.display = 'block';
        resultEl.style.background = 'rgba(239, 68, 68, 0.1)';
        resultEl.style.color = 'var(--danger)';
        resultEl.innerHTML = '<i class="fas fa-times-circle"></i> Please enter Owner and Repo name.';
        return;
    }

    testBtn.disabled = true;
    testBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testing...';
    resultEl.style.display = 'block';
    resultEl.style.background = 'rgba(99, 102, 241, 0.1)';
    resultEl.style.color = 'var(--primary)';
    resultEl.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking repository on GitHub...';

    try {
        const headers = { 'Accept': 'application/vnd.github.v3+json' };
        if (token) headers['Authorization'] = `token ${token}`;

        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, { headers });
        const data = await res.json();

        if (res.ok) {
            const hasPush = data.permissions ? data.permissions.push : !!token;
            resultEl.style.background = 'rgba(16, 185, 129, 0.1)';
            resultEl.style.color = 'var(--success)';
            resultEl.innerHTML = `<i class="fas fa-check-circle"></i> Connected to <strong>${data.full_name}</strong>! ${hasPush ? '(Push permission verified ✅)' : '(Read-only — token required for uploading)'}`;
        } else {
            resultEl.style.background = 'rgba(239, 68, 68, 0.1)';
            resultEl.style.color = 'var(--danger)';
            resultEl.innerHTML = `<i class="fas fa-times-circle"></i> GitHub error: ${data.message || 'Repository not found'}`;
        }
    } catch (err) {
        resultEl.style.background = 'rgba(239, 68, 68, 0.1)';
        resultEl.style.color = 'var(--danger)';
        resultEl.innerHTML = `<i class="fas fa-times-circle"></i> Connection failed: ${err.message}`;
    } finally {
        testBtn.disabled = false;
        testBtn.innerHTML = '<i class="fas fa-plug"></i> Test Connection';
    }
}

function updateGithubBanner() {
    const config = getGithubConfig();
    const repoEl = document.getElementById('ghBannerRepo');
    const statusEl = document.getElementById('ghBannerStatus');

    if (repoEl) repoEl.textContent = `${config.owner}/${config.repo}`;
    if (statusEl) {
        if (config.token) {
            statusEl.className = 'gh-banner-status ready';
            statusEl.innerHTML = '<i class="fas fa-check-circle"></i> Ready to commit & store';
        } else {
            statusEl.className = 'gh-banner-status warning';
            statusEl.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Token needed to upload (Click Configure)';
        }
    }
}

// ===== UPLOAD MODAL & SOURCE TOGGLE =====
let currentUploadSource = 'file';

function switchUploadSource(source) {
    currentUploadSource = source;
    const btnFile = document.getElementById('btnSourceFile');
    const btnLink = document.getElementById('btnSourceLink');
    const fileGroup = document.getElementById('fileSourceGroup');
    const linkGroup = document.getElementById('linkSourceGroup');

    if (source === 'file') {
        btnFile.classList.add('active');
        btnLink.classList.remove('active');
        fileGroup.style.display = '';
        linkGroup.style.display = 'none';
    } else {
        btnLink.classList.add('active');
        btnFile.classList.remove('active');
        fileGroup.style.display = 'none';
        linkGroup.style.display = 'block';
        const urlInput = document.getElementById('uploadUrlInput');
        if (urlInput) urlInput.focus();
    }
}

function openUploadModal(type) {
    document.getElementById('uploadType').value = type;
    document.getElementById('uploadModalTitle').textContent =
        type === 'presentation' ? 'Upload Presentation to GitHub' : 'Upload Report to GitHub';
    document.getElementById('dropZoneHint').textContent =
        type === 'presentation'
            ? 'PPT, PPTX, PDF (Max 50MB)'
            : 'PDF, DOC, DOCX, XLS, XLSX, TXT, CSV (Max 50MB)';
    document.getElementById('uploadFormData').reset();
    removeSelectedFile();
    const urlInput = document.getElementById('uploadUrlInput');
    if (urlInput) urlInput.value = '';
    switchUploadSource('file');
    updateGithubBanner();
    document.getElementById('uploadProgress').style.display = 'none';
    const submitBtn = document.getElementById('uploadSubmitBtn');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-upload"></i> Upload to GitHub';
    openModal('uploadModal');
    initDropZone();
}

function closeUploadModal() {
    closeModal('uploadModal');
    removeSelectedFile();
    const urlInput = document.getElementById('uploadUrlInput');
    if (urlInput) urlInput.value = '';
}

function initDropZone() {
    const dropZone = document.getElementById('dropZone');
    if (!dropZone) return;

    // Remove old listeners by cloning
    const newDropZone = dropZone.cloneNode(true);
    dropZone.parentNode.replaceChild(newDropZone, dropZone);
    const newFileInput = newDropZone.querySelector('#fileInput');

    newDropZone.addEventListener('click', () => newFileInput.click());

    newDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        newDropZone.classList.add('drag-over');
    });

    newDropZone.addEventListener('dragleave', () => {
        newDropZone.classList.remove('drag-over');
    });

    newDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        newDropZone.classList.remove('drag-over');
        if (e.dataTransfer.files.length > 0) {
            handleFileSelect(e.dataTransfer.files[0]);
        }
    });

    newFileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFileSelect(e.target.files[0]);
        }
    });
}

function handleFileSelect(file) {
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
        showToast('File is too large. Maximum size is 50MB.', 'error');
        return;
    }

    selectedFile = file;
    const info = getFileTypeInfo(file.name);

    document.getElementById('dropZone').style.display = 'none';
    const selectedEl = document.getElementById('selectedFile');
    selectedEl.style.display = 'flex';
    document.getElementById('selectedFileIcon').className = `fas ${info.icon}`;
    document.getElementById('selectedFileName').textContent = file.name;
    document.getElementById('selectedFileSize').textContent = formatFileSize(file.size);

    const titleInput = document.getElementById('uploadTitle');
    if (!titleInput.value.trim()) {
        titleInput.value = file.name.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ');
    }
}

function removeSelectedFile() {
    selectedFile = null;
    const selectedEl = document.getElementById('selectedFile');
    if (selectedEl) selectedEl.style.display = 'none';
    const dropZone = document.getElementById('dropZone');
    if (dropZone) dropZone.style.display = '';
    const fileInput = document.getElementById('fileInput');
    if (fileInput) fileInput.value = '';
}

// ===== GITHUB FILE UPLOAD HANDLER =====
async function handleFileUpload(e) {
    e.preventDefault();

    const type = document.getElementById('uploadType').value;
    const title = document.getElementById('uploadTitle').value.trim();
    const collection = type === 'presentation' ? 'presentations' : 'reports';
    const submitBtn = document.getElementById('uploadSubmitBtn');

    // Case 1: Web Link (Google Slides, Canva, Drive link, etc.)
    if (currentUploadSource === 'link') {
        const urlInput = document.getElementById('uploadUrlInput');
        const url = urlInput ? urlInput.value.trim() : '';
        if (!url) {
            showToast('Please enter a valid link URL', 'error');
            return;
        }

        let fileName = 'Presentation.pptx';
        if (url.includes('docs.google.com/presentation')) {
            fileName = 'Google Slides.pptx';
        } else if (url.includes('docs.google.com/document')) {
            fileName = 'Google Docs.docx';
        } else if (url.toLowerCase().endsWith('.pdf') || url.includes('.pdf?')) {
            fileName = 'Document.pdf';
        } else if (url.toLowerCase().endsWith('.pptx') || url.toLowerCase().endsWith('.ppt')) {
            fileName = 'Presentation.pptx';
        } else if (type === 'report') {
            fileName = 'Report.pdf';
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';

        try {
            await db.collection(collection).add({
                title: title,
                fileName: fileName,
                fileUrl: url,
                isLink: true,
                storageType: 'link',
                storagePath: null,
                fileSize: 0,
                uploadDate: new Date().toISOString(),
            });

            closeUploadModal();
            showToast(`${type === 'presentation' ? 'Presentation' : 'Report'} link saved!`, 'success');
        } catch (err) {
            console.error('Save link error:', err);
            showToast('Failed to save link: ' + err.message, 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-upload"></i> Upload to GitHub';
        }
        return;
    }

    // Case 2: File Upload to GitHub Repository
    if (!selectedFile) {
        showToast('Please select a file to upload', 'error');
        return;
    }

    const config = getGithubConfig();
    if (!config.token) {
        showToast('GitHub token required to upload files. Please configure your token.', 'error');
        openGithubSettings();
        return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading to GitHub...';

    const progressEl = document.getElementById('uploadProgress');
    const progressFill = document.getElementById('uploadProgressFill');
    const progressText = document.getElementById('uploadProgressText');
    progressEl.style.display = 'block';
    progressFill.style.width = '20%';
    progressText.textContent = 'Reading file...';

    try {
        // Step 1: Read file as Base64
        const base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = reject;
            reader.readAsDataURL(selectedFile);
        });

        progressFill.style.width = '50%';
        progressText.textContent = `Committing to ${config.owner}/${config.repo}...`;

        // Step 2: Sanitize file name and create path in repo
        const cleanName = selectedFile.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const filePath = `uploads/${collection}/${Date.now()}_${cleanName}`;

        // Step 3: Call GitHub Contents API
        const ghUrl = `https://api.github.com/repos/${config.owner}/${config.repo}/contents/${filePath}`;
        const commitBody = {
            message: `Upload ${selectedFile.name} [ProjectPulse]`,
            content: base64Data,
            branch: config.branch
        };

        const ghRes = await fetch(ghUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${config.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commitBody)
        });

        const ghData = await ghRes.json();

        if (!ghRes.ok) {
            throw new Error(ghData.message || `GitHub error: HTTP ${ghRes.status}`);
        }

        progressFill.style.width = '85%';
        progressText.textContent = 'Saving to database...';

        // Step 4: Construct direct raw and CDN URLs
        const rawUrl = `https://raw.githubusercontent.com/${config.owner}/${config.repo}/${config.branch}/${filePath}`;
        const cdnUrl = `https://cdn.jsdelivr.net/gh/${config.owner}/${config.repo}@${config.branch}/${filePath}`;
        const sha = ghData.content ? ghData.content.sha : '';
        const htmlUrl = ghData.content ? ghData.content.html_url : `https://github.com/${config.owner}/${config.repo}/blob/${config.branch}/${filePath}`;

        // Step 5: Save record to Firestore
        await db.collection(collection).add({
            title: title,
            fileName: selectedFile.name,
            fileUrl: rawUrl,
            cdnUrl: cdnUrl,
            githubPath: filePath,
            githubSha: sha,
            githubHtmlUrl: htmlUrl,
            storageType: 'github',
            fileSize: selectedFile.size,
            uploadDate: new Date().toISOString(),
        });

        progressFill.style.width = '100%';
        progressText.textContent = 'Done!';

        setTimeout(() => {
            closeUploadModal();
            showToast(`Uploaded to GitHub (${config.repo}) successfully!`, 'success');
        }, 300);

    } catch (err) {
        console.error('GitHub upload error:', err);
        let errorMsg = err.message;
        if (errorMsg.includes('Bad credentials')) {
            errorMsg = 'Invalid GitHub token. Please verify your token in GitHub Settings.';
        }
        showToast('Upload failed: ' + errorMsg, 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-upload"></i> Upload to GitHub';
        progressEl.style.display = 'none';
    }
}

// ===== RENDER FILE CARDS =====
function renderFiles(type) {
    const files = type === 'presentations' ? presentations : reports;
    const grid = document.getElementById(type + 'Grid');
    if (!grid) return;

    const emptyIcon = type === 'presentations' ? 'fa-file-powerpoint' : 'fa-file-alt';
    const emptyLabel = type === 'presentations' ? 'No presentations uploaded yet' : 'No reports uploaded yet';

    if (files.length === 0) {
        grid.innerHTML = `<p class="empty-state" style="grid-column:1/-1;"><i class="fas ${emptyIcon}"></i>${emptyLabel}</p>`;
        return;
    }

    grid.innerHTML = files.map(file => {
        const info = getFileTypeInfo(file.fileName);
        const uploadDate = file.uploadDate ? formatDate(file.uploadDate) : 'Recently';
        const fileSize = file.fileSize > 0 ? formatFileSize(file.fileSize) : (file.isLink ? 'Web Link' : '');
        const deleteBtn = currentRole === 'admin'
            ? `<button class="delete-file-btn" onclick="event.stopPropagation(); deleteFile('${type}', '${file.docId}')" title="Delete"><i class="fas fa-trash"></i> Delete</button>`
            : '';
        const ghBtn = file.githubHtmlUrl
            ? `<a href="${file.githubHtmlUrl}" target="_blank" onclick="event.stopPropagation()" title="View on GitHub"><i class="fab fa-github"></i> GitHub</a>`
            : '';

        return `
            <div class="file-card" onclick="viewFile('${file.docId}', '${type}')">
                <div class="file-card-preview ${info.cls}">
                    <i class="fas ${info.icon}"></i>
                    <span class="file-ext-badge">${info.label}</span>
                </div>
                <div class="file-card-body">
                    <h4 title="${file.title}">${file.title}</h4>
                    <div class="file-card-meta">
                        <span><i class="fas fa-calendar"></i> ${uploadDate}</span>
                        ${fileSize ? `<span><i class="fas ${file.isLink ? 'fa-link' : 'fa-weight-hanging'}"></i> ${fileSize}</span>` : ''}
                    </div>
                    <div class="file-card-actions">
                        <button onclick="event.stopPropagation(); viewFile('${file.docId}', '${type}')">
                            <i class="fas fa-eye"></i> View
                        </button>
                        <button onclick="event.stopPropagation(); viewFile('${file.docId}', '${type}', true)" title="Open in Fullscreen">
                            <i class="fas fa-expand"></i> Fullscreen
                        </button>
                        <a href="${file.fileUrl}" target="_blank" download onclick="event.stopPropagation()">
                            <i class="fas ${file.isLink ? 'fa-external-link-alt' : 'fa-download'}"></i> ${file.isLink ? 'Open' : 'Download'}
                        </a>
                        ${ghBtn}
                        ${deleteBtn}
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ===== FILE VIEWER (Multi-Engine & Fullscreen) =====
let currentViewerFile = null;
let currentViewerEngine = 'office'; // 'office' | 'google'

function viewFile(docId, type, startFullscreen = false) {
    const files = type === 'presentations' ? presentations : reports;
    const file = files.find(f => f.docId === docId);
    if (!file) return;

    currentViewerFile = file;
    const info = getFileTypeInfo(file.fileName);
    const ext = file.fileName.split('.').pop().toLowerCase();
    const isOffice = ['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx'].includes(ext);

    document.getElementById('viewerTitle').textContent = file.title;
    document.getElementById('viewerIcon').className = `fas ${info.icon}`;

    // Always use fileUrl (raw.githubusercontent.com) - avoid 403-forbidden CDN URLs!
    const directFileUrl = file.fileUrl;

    const downloadBtn = document.getElementById('viewerDownload');
    const newTabBtn = document.getElementById('viewerNewTab');
    const fallbackOpen = document.getElementById('viewerFallbackOpen');
    const fallbackDownload = document.getElementById('viewerFallbackDownload');

    if (file.isLink) {
        if (downloadBtn) downloadBtn.style.display = 'none';
        if (fallbackDownload) fallbackDownload.style.display = 'none';
        if (newTabBtn) newTabBtn.href = file.fileUrl;
        if (fallbackOpen) {
            fallbackOpen.href = file.fileUrl;
            fallbackOpen.innerHTML = '<i class="fas fa-external-link-alt"></i> Open Link';
        }
    } else {
        if (downloadBtn) {
            downloadBtn.style.display = '';
            downloadBtn.href = directFileUrl;
        }
        if (fallbackDownload) {
            fallbackDownload.style.display = '';
            fallbackDownload.href = directFileUrl;
        }
        if (newTabBtn) newTabBtn.href = file.githubHtmlUrl || directFileUrl;
        if (fallbackOpen) {
            fallbackOpen.href = directFileUrl;
            fallbackOpen.innerHTML = '<i class="fas fa-external-link-alt"></i> Open File Directly';
        }
    }

    // Engine toggle (only for Office / PPTX / DOCX files)
    const engineToggle = document.getElementById('viewerEngineToggle');
    if (engineToggle) {
        if (isOffice && !file.isLink) {
            engineToggle.style.display = 'inline-flex';
            // Update active state on buttons
            const btnOffice = document.getElementById('btnEngineOffice');
            const btnGoogle = document.getElementById('btnEngineGoogle');
            if (btnOffice && btnGoogle) {
                btnOffice.classList.toggle('active', currentViewerEngine === 'office');
                btnGoogle.classList.toggle('active', currentViewerEngine === 'google');
            }
        } else {
            engineToggle.style.display = 'none';
        }
    }

    // Show loading overlay
    const loadingEl = document.getElementById('viewerLoading');
    if (loadingEl) {
        loadingEl.classList.remove('hidden');
        const loadText = document.getElementById('viewerLoadingText');
        if (loadText) {
            loadText.textContent = isOffice
                ? `Loading presentation preview via ${currentViewerEngine === 'office' ? 'Microsoft Office' : 'Google Docs'}...`
                : 'Loading document preview...';
        }
    }

    // Load iframe
    loadViewerIframe(currentViewerEngine);

    document.getElementById('viewerModal').classList.add('active');

    if (startFullscreen) {
        setTimeout(() => toggleViewerFullscreen(true), 200);
    }
}

function loadViewerIframe(engine) {
    if (!currentViewerFile) return;
    const file = currentViewerFile;
    const ext = file.fileName.split('.').pop().toLowerCase();
    const iframe = document.getElementById('viewerFrame');
    // Ensure we use raw.githubusercontent.com or direct URL
    const targetUrl = file.fileUrl;

    let embedUrl = targetUrl;

    if (targetUrl.includes('docs.google.com/presentation/d/')) {
        embedUrl = targetUrl.replace(/\/edit.*$/, '/embed?start=false&loop=false&delayms=3000')
                            .replace(/\/view.*$/, '/embed?start=false&loop=false&delayms=3000');
        if (!embedUrl.includes('/embed')) embedUrl += '/embed';
    } else if (targetUrl.includes('docs.google.com/document/d/')) {
        embedUrl = targetUrl.replace(/\/edit.*$/, '/preview')
                            .replace(/\/view.*$/, '/preview');
    } else if (targetUrl.includes('drive.google.com/file/d/')) {
        embedUrl = targetUrl.replace(/\/view.*$/, '/preview');
    } else if (['pdf'].includes(ext)) {
        embedUrl = targetUrl;
    } else if (['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx'].includes(ext)) {
        if (engine === 'office') {
            // Microsoft Office Online Viewer - native PowerPoint rendering!
            embedUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(targetUrl)}`;
        } else {
            // Google Docs Viewer alternate
            embedUrl = `https://docs.google.com/gview?url=${encodeURIComponent(targetUrl)}&embedded=true`;
        }
    }

    iframe.src = embedUrl;

    // Safety timeout: auto-hide loading overlay after 2.5s so user can interact
    setTimeout(() => {
        const loadingEl = document.getElementById('viewerLoading');
        if (loadingEl) loadingEl.classList.add('hidden');
    }, 2500);
}

function switchViewerEngine(engine) {
    currentViewerEngine = engine;
    const btnOffice = document.getElementById('btnEngineOffice');
    const btnGoogle = document.getElementById('btnEngineGoogle');

    if (btnOffice && btnGoogle) {
        btnOffice.classList.toggle('active', engine === 'office');
        btnGoogle.classList.toggle('active', engine === 'google');
    }

    const loadingEl = document.getElementById('viewerLoading');
    if (loadingEl) {
        loadingEl.classList.remove('hidden');
        const loadText = document.getElementById('viewerLoadingText');
        if (loadText) {
            loadText.textContent = `Switching to ${engine === 'office' ? 'Microsoft Office' : 'Google Docs'} Viewer...`;
        }
    }

    loadViewerIframe(engine);
}

function onViewerIframeLoad() {
    const loadingEl = document.getElementById('viewerLoading');
    if (loadingEl) {
        setTimeout(() => {
            loadingEl.classList.add('hidden');
        }, 400);
    }
}

function toggleViewerFullscreen(force) {
    const modal = document.getElementById('viewerModal');
    const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);

    if (force === true || (!isFull && force !== false)) {
        if (modal.requestFullscreen) {
            modal.requestFullscreen().catch(() => {});
        } else if (modal.webkitRequestFullscreen) {
            modal.webkitRequestFullscreen();
        } else if (modal.mozRequestFullScreen) {
            modal.mozRequestFullScreen();
        } else if (modal.msRequestFullscreen) {
            modal.msRequestFullscreen();
        }
    } else if (force === false || isFull) {
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}

// Sync Fullscreen icon with browser fullscreen state
['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(evt => {
    document.addEventListener(evt, () => {
        const icon = document.getElementById('viewerFullscreenIcon');
        if (!icon) return;
        const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
        if (isFull) {
            icon.classList.remove('fa-expand');
            icon.classList.add('fa-compress');
        } else {
            icon.classList.remove('fa-compress');
            icon.classList.add('fa-expand');
        }
    });
});

function closeViewer() {
    // Exit browser fullscreen if active
    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
        if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    }

    document.getElementById('viewerModal').classList.remove('active');
    const iframe = document.getElementById('viewerFrame');
    if (iframe) iframe.src = '';
    const loadingEl = document.getElementById('viewerLoading');
    if (loadingEl) loadingEl.classList.add('hidden');
    currentViewerFile = null;
}

document.addEventListener('keydown', (e) => {
    const viewerActive = document.getElementById('viewerModal').classList.contains('active');
    if (viewerActive) {
        if (e.key === 'Escape') {
            closeViewer();
        } else if (e.key === 'f' || e.key === 'F') {
            // Toggle fullscreen with 'f' key if not typing in an input
            if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                toggleViewerFullscreen();
            }
        }
    }
});

// ===== DELETE FILE (GitHub + Firestore) =====
function deleteFile(type, docId) {
    const files = type === 'presentations' ? presentations : reports;
    const file = files.find(f => f.docId === docId);
    if (!file) return;

    document.getElementById('confirmMessage').textContent = `Delete "${file.title}"? This will also delete it from GitHub.`;
    document.getElementById('confirmDeleteBtn').onclick = async () => {
        try {
            const config = getGithubConfig();
            // Delete from GitHub repository if path and sha exist and token available
            if (file.githubPath && file.githubSha && config.token) {
                try {
                    await fetch(`https://api.github.com/repos/${config.owner}/${config.repo}/contents/${file.githubPath}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `token ${config.token}`,
                            'Accept': 'application/vnd.github.v3+json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            message: `Delete ${file.fileName} [ProjectPulse]`,
                            sha: file.githubSha,
                            branch: config.branch
                        })
                    });
                } catch (ghErr) {
                    console.warn('GitHub file delete warning:', ghErr);
                }
            }

            // Delete record from Firestore
            await db.collection(type).doc(docId).delete();
            closeModal('confirmModal');
            showToast('File deleted successfully', 'error');
        } catch (err) {
            console.error('Delete error:', err);
            showToast('Delete failed: ' + err.message, 'error');
        }
    };
    openModal('confirmModal');
}
