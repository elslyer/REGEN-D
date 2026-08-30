// 1. Initialize Icons
lucide.createIcons();

// 2. Navigation Logic
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('page-title');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active class
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Update Title
        pageTitle.innerText = item.innerText;

        // Switch Pages
        const targetId = item.getAttribute('data-target');
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
    });
});

// Shortcut button on header
function goToScanner() {
    document.querySelector('[data-target="scanner"]').click();
}

// 3. AI Scanner Simulation
function runAIScan() {
    const uploadArea = document.getElementById('upload-area');
    const loader = document.getElementById('scanning-loader');
    const result = document.getElementById('scan-result');

    uploadArea.classList.add('hidden');
    loader.classList.remove('hidden');

    // Simulate AI processing time (2.5 seconds)
    setTimeout(() => {
        loader.classList.add('hidden');
        result.classList.remove('hidden');
    }, 2500);
}

function resetScan() {
    document.getElementById('upload-area').classList.remove('hidden');
    document.getElementById('scan-result').classList.add('hidden');
}

// 4. Circular Part Bank Logic
const parts = [
    { name: "DDR4 8GB 2666MHz", cat: "memory", cond: "Tested / Good", qty: 45, src: "HP ProBook 450", use: "Refurbish" },
    { name: "DDR3 4GB 1600MHz", cat: "memory", cond: "Tested / Fair", qty: 120, src: "Legacy Models", use: "Low-end Reuse" },
    { name: "512GB M.2 NVMe SSD", cat: "storage", cond: "100% Health", qty: 18, src: "Dell XPS 13", use: "Refurbish" },
    { name: "1TB 2.5 SATA HDD", cat: "storage", cond: "85% Health", qty: 32, src: "Various", use: "External Storage Upcycle" },
    { name: "Dual Heatpipe Fan", cat: "cooling", cond: "Cleaned / Good", qty: 8, src: "ThinkPad T480", use: "Repair / Upcycle" },
    { name: "54Wh Battery Cell", cat: "power", cond: "60% Capacity", qty: 4, src: "Dell Latitude", use: "DIY Powerbank" }
];

const partGrid = document.getElementById('part-grid');

function renderParts(filter = 'all') {
    partGrid.innerHTML = '';
    const filtered = filter === 'all' ? parts : parts.filter(p => p.cat === filter);

    filtered.forEach(part => {
        const card = document.createElement('div');
        card.className = 'p-card';
        card.innerHTML = `
            <h3>${part.name}</h3>
            <div class="p-detail"><span>Condition:</span> <strong>${part.cond}</strong></div>
            <div class="p-detail"><span>Available:</span> <strong>${part.qty} Units</strong></div>
            <div class="p-detail"><span>Source:</span> <strong>${part.src}</strong></div>
            <div class="p-detail"><span>Potential Use:</span> <strong>${part.use}</strong></div>
            <span class="p-cat">${part.cat}</span>
        `;
        partGrid.appendChild(card);
    });
}

// Init Part Bank
renderParts();

// Filter Logic
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderParts(btn.getAttribute('data-cat'));
    });
});
