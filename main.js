// Initialize Lucide Icons
lucide.createIcons();

// --- NAVIGATION LOGIC ---
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
const pageTitle = document.getElementById('page-title');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all nav items
        navItems.forEach(nav => nav.classList.remove('active'));
        // Add to clicked
        item.classList.add('active');

        // Update Title
        pageTitle.innerText = item.innerText;

        // Hide all pages
        pages.forEach(page => page.classList.remove('active'));
        
        // Show target page
        const targetId = item.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// --- AI SCANNER SIMULATION ---
function startScan() {
    const uploadZone = document.getElementById('upload-zone');
    const scanningUI = document.getElementById('scanning-ui');
    const scanResults = document.getElementById('scan-results');

    // Switch UI to Scanning
    uploadZone.classList.add('hidden');
    scanningUI.classList.remove('hidden');

    // Simulate Processing Time (3 seconds)
    setTimeout(() => {
        scanningUI.classList.add('hidden');
        scanResults.classList.remove('hidden');
    }, 3000);
}

function resetScan() {
    document.getElementById('upload-zone').classList.remove('hidden');
    document.getElementById('scanning-ui').classList.add('hidden');
    document.getElementById('scan-results').classList.add('hidden');
}

// --- CIRCULAR PART BANK DATA & FILTERING ---
const partsData = [
    { name: "DDR4 8GB RAM", category: "memory", condition: "Good", qty: 24, comp: "Universal Notebook", use: "Refurbishment" },
    { name: "Laptop Cooling Fan", category: "cooling", condition: "Good", qty: 12, comp: "ThinkPad T-Series", use: "Repair / Upcycle" },
    { name: "512GB M.2 NVMe SSD", category: "storage", condition: "Excellent", qty: 8, comp: "Universal", use: "Refurbishment" },
    { name: "ThinkPad Keyboard", category: "input", condition: "Fair", qty: 5, comp: "ThinkPad T480/T470", use: "Repair" },
    { name: "1TB 2.5 SATA HDD", category: "storage", condition: "Good", qty: 15, comp: "Legacy Laptops", use: "External Storage Upcycle" },
    { name: "DDR3 4GB RAM", category: "memory", condition: "Fair", qty: 30, comp: "Older Generation", use: "Low-end Refurbish" }
];

const partGrid = document.getElementById('part-grid');

function renderParts(filter = 'all') {
    partGrid.innerHTML = ''; // Clear current
    
    const filteredParts = filter === 'all' 
        ? partsData 
        : partsData.filter(p => p.category === filter);

    filteredParts.forEach(part => {
        const card = document.createElement('div');
        card.className = 'part-card';
        card.innerHTML = `
            <h3>${part.name}</h3>
            <div class="part-info"><span class="label">Condition:</span> <strong>${part.condition}</strong></div>
            <div class="part-info"><span class="label">Quantity:</span> <strong>${part.qty} units</strong></div>
            <div class="part-info"><span class="label">Compatible:</span> <span>${part.comp}</span></div>
            <div class="part-info"><span class="label">Potential Use:</span> <span>${part.use}</span></div>
            <div class="part-tag">${part.category.toUpperCase()}</div>
        `;
        partGrid.appendChild(card);
    });
}

// Initial Render
renderParts();

// Filter Event Listeners
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Render
        renderParts(btn.getAttribute('data-filter'));
    });
});
