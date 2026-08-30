// Initialize Icons
lucide.createIcons();

const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('page-title');

// --- NAVIGATION & ANIMATION LOGIC ---
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active states
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        pageTitle.innerText = item.innerText;

        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));
        
        // Show target page
        const targetId = item.getAttribute('data-target');
        const targetPage = document.getElementById(targetId);
        targetPage.classList.add('active');

        // Trigger Staggered Animations
        const staggerItems = targetPage.querySelectorAll('.stagger-item');
        staggerItems.forEach((el, index) => {
            el.style.animation = 'none'; // reset
            el.offsetHeight; // trigger reflow
            el.style.animation = `slideUp 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards`;
            el.style.animationDelay = `${index * 0.1}s`;
        });

        // Trigger Dynamic Progress Bars
        const progressBars = targetPage.querySelectorAll('.progress');
        progressBars.forEach(bar => {
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = bar.getAttribute('data-width');
            }, 300); // Wait for page to render
        });
    });
});

// Init first page animations
document.querySelector('.nav-item.active').click();

// --- AI SCANNER ---
function startScan() {
    document.getElementById('upload-zone').classList.add('hidden');
    document.getElementById('scanning-ui').classList.remove('hidden');

    setTimeout(() => {
        document.getElementById('scanning-ui').classList.add('hidden');
        const results = document.getElementById('scan-results');
        results.classList.remove('hidden');
        
        // Animate result items
        results.querySelectorAll('.stagger-item').forEach((el, index) => {
            el.style.animation = 'none'; el.offsetHeight;
            el.style.animation = `slideUp 0.5s ease forwards`;
            el.style.animationDelay = `${index * 0.1}s`;
        });
    }, 2500);
}

function resetScan() {
    document.getElementById('upload-zone').classList.remove('hidden');
    document.getElementById('scan-results').classList.add('hidden');
}

// --- CIRCULAR PART BANK & MODAL ---
const partsData = [
    { name: "DDR4 8GB RAM", category: "memory", condition: "Good", qty: 24, comp: "Universal", use: "Refurbishment" },
    { name: "Laptop Cooling Fan", category: "cooling", condition: "Good", qty: 12, comp: "ThinkPad T-Series", use: "Upcycle" },
    { name: "512GB M.2 NVMe SSD", category: "storage", condition: "Excellent", qty: 8, comp: "Universal", use: "Refurbishment" }
];

const partGrid = document.getElementById('part-grid');

function renderParts(filter = 'all') {
    partGrid.innerHTML = '';
    const filteredParts = filter === 'all' ? partsData : partsData.filter(p => p.category === filter);

    filteredParts.forEach((part, index) => {
        const card = document.createElement('div');
        card.className = 'part-card stagger-item';
        card.style.animationDelay = `${index * 0.1}s`;
        card.onclick = () => openModal('partDetail', part); // Interactive Click
        card.innerHTML = `
            <h3 style="color:var(--primary); margin-bottom:12px;">${part.name}</h3>
            <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:8px;">Qty: <strong>${part.qty}</strong> | Cond: <strong>${part.condition}</strong></p>
            <div class="part-tag">${part.category.toUpperCase()}</div>
        `;
        partGrid.appendChild(card);
    });
}
renderParts();

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderParts(btn.getAttribute('data-filter'));
    });
});

// --- MODAL SYSTEM ---
const modal = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

function openModal(type, data = null) {
    modal.classList.remove('hidden');
    if(type === 'registerModal') {
        modalTitle.innerText = "Register New Device";
        modalBody.innerHTML = `
            <p style="color:var(--text-muted); font-size:0.9rem;">Connecting to Enterprise Resource System...</p>
            <div style="margin-top:30px; text-align:center;"><i data-lucide="loader" class="spin-icon"></i></div>
        `;
    } else if (type === 'partDetail') {
        modalTitle.innerText = "Component Details";
        modalBody.innerHTML = `
            <h3 style="color:var(--secondary); margin-bottom:15px;">${data.name}</h3>
            <p><strong>Condition:</strong> ${data.condition}</p>
            <p><strong>Stock:</strong> ${data.qty} Units</p>
            <p><strong>Compatibility:</strong> ${data.comp}</p>
            <p><strong>Recommended Use:</strong> ${data.use}</p>
            <button class="btn btn-primary" style="margin-top:20px; width:100%; justify-content:center;">Request Component</button>
        `;
    }
    lucide.createIcons(); // re-init icons inside modal
}

function closeModal() {
    modal.classList.add('hidden');
}
