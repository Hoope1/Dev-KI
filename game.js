const game = {
    date: { year: 1956, month: 1 },
    money: 50000,
    reputation: 0,
    ethics: 0,
    isPaused: false,
    speed: 1,
    compute: 1,
    computeUnit: 'KFLOPS',
    computeUpgradeLevel: 0,
    data: 100,
    dataUnit: 'KB',
    labSize: 1,
    labName: 'Dein KI Labor'
};

const finances = {
    income: { products: 0, grants: 0, consulting: 0 },
    expenses: { salaries: 0, compute: 500, office: 2000, data: 0, rnd: 500 }
};

const team = [];
const research = { active: [], completed: [], unlocked: {} };
const products = { active: [], inDev: [] };
const news = [];
const stats = { papers: 0, research: 0, products: 0, hires: 0, revenue: 0, totalSpent: 0 };

const researchTree = {
    'Symbolic AI': [
        { name: 'Logic Systems', year: 1956, duration: 6, cost: 20000, compute: 1 },
        { name: 'Expert Systems', year: 1970, duration: 9, cost: 50000, compute: 2 },
        { name: 'Knowledge Graphs', year: 1980, duration: 12, cost: 100000, compute: 5 },
        { name: 'Semantic Networks', year: 1985, duration: 15, cost: 150000, compute: 10 }
    ],
    'Neural Networks': [
        { name: 'Perceptron', year: 1958, duration: 6, cost: 25000, compute: 1 },
        { name: 'Multi-Layer Perceptron', year: 1986, duration: 12, cost: 60000, compute: 5 },
        { name: 'Backpropagation', year: 1986, duration: 12, cost: 70000, compute: 5 },
        { name: 'CNNs', year: 1998, duration: 15, cost: 200000, compute: 50 },
        { name: 'RNNs/LSTM', year: 2000, duration: 18, cost: 300000, compute: 100 },
        { name: 'Attention Mechanisms', year: 2014, duration: 20, cost: 500000, compute: 500 },
        { name: 'Transformers', year: 2017, duration: 24, cost: 2000000, compute: 5000 },
        { name: 'Large Language Models', year: 2019, duration: 30, cost: 10000000, compute: 50000 },
        { name: 'Multimodal Models', year: 2022, duration: 36, cost: 50000000, compute: 100000 }
    ],
    'Machine Learning': [
        { name: 'Decision Trees', year: 1980, duration: 6, cost: 30000, compute: 2 },
        { name: 'Naive Bayes', year: 1985, duration: 6, cost: 40000, compute: 2 },
        { name: 'Support Vector Machines', year: 1995, duration: 8, cost: 80000, compute: 10 },
        { name: 'Random Forests', year: 2001, duration: 10, cost: 150000, compute: 20 },
        { name: 'Gradient Boosting', year: 2005, duration: 12, cost: 250000, compute: 50 },
        { name: 'Ensemble Methods', year: 2010, duration: 15, cost: 500000, compute: 100 }
    ],
    'Reinforcement Learning': [
        { name: 'Q-Learning', year: 1989, duration: 8, cost: 50000, compute: 5 },
        { name: 'Policy Gradients', year: 2000, duration: 12, cost: 100000, compute: 20 },
        { name: 'Actor-Critic', year: 2005, duration: 15, cost: 200000, compute: 50 },
        { name: 'Deep Q-Networks', year: 2013, duration: 18, cost: 500000, compute: 200 },
        { name: 'AlphaGo-style', year: 2016, duration: 24, cost: 5000000, compute: 5000 },
        { name: 'Multi-Agent RL', year: 2020, duration: 30, cost: 10000000, compute: 10000 }
    ],
    'Computer Vision': [
        { name: 'Edge Detection', year: 1986, duration: 6, cost: 30000, compute: 2 },
        { name: 'Feature Extraction', year: 1999, duration: 10, cost: 80000, compute: 10 },
        { name: 'Object Detection', year: 2005, duration: 15, cost: 200000, compute: 50 },
        { name: 'Face Recognition', year: 2010, duration: 18, cost: 400000, compute: 100 },
        { name: 'Image Segmentation', year: 2012, duration: 20, cost: 600000, compute: 200 },
        { name: 'GANs', year: 2014, duration: 20, cost: 800000, compute: 500 },
        { name: 'Diffusion Models', year: 2020, duration: 25, cost: 3000000, compute: 5000 }
    ],
    'Natural Language Processing': [
        { name: 'Bag of Words', year: 1990, duration: 6, cost: 40000, compute: 2 },
        { name: 'TF-IDF', year: 1995, duration: 8, cost: 60000, compute: 5 },
        { name: 'Word Embeddings', year: 2013, duration: 15, cost: 300000, compute: 100 },
        { name: 'Sequence Models', year: 2015, duration: 18, cost: 600000, compute: 300 },
        { name: 'Transformer LMs', year: 2018, duration: 24, cost: 3000000, compute: 5000 },
        { name: 'Large Language Models', year: 2020, duration: 30, cost: 15000000, compute: 50000 }
    ],
    'AGI Research': [
        { name: 'Multi-Task Learning', year: 2015, duration: 24, cost: 1000000, compute: 1000 },
        { name: 'Transfer Learning', year: 2018, duration: 30, cost: 3000000, compute: 5000 },
        { name: 'Meta-Learning', year: 2020, duration: 36, cost: 8000000, compute: 10000 },
        { name: 'World Models', year: 2022, duration: 48, cost: 20000000, compute: 50000 },
        { name: 'Reasoning Systems', year: 2024, duration: 60, cost: 50000000, compute: 100000 },
        { name: 'AGI', year: 2025, duration: 72, cost: 100000000, compute: 500000 }
    ]
};

for (const track in researchTree) {
    research.unlocked[track] = [];
}

const competitors = [
    { name: 'MIT AI Lab', reputation: 100, focus: 'Symbolic AI', year: 1956 },
    { name: 'Stanford AI', reputation: 120, focus: 'Neural Networks', year: 1963 },
    { name: 'CMU Robotics', reputation: 80, focus: 'Machine Learning', year: 1979 },
    { name: 'Google Brain', reputation: 800, focus: 'Neural Networks', year: 2011 },
    { name: 'DeepMind', reputation: 900, focus: 'Reinforcement Learning', year: 2010 },
    { name: 'OpenAI', reputation: 850, focus: 'AGI Research', year: 2015 },
    { name: 'Anthropic', reputation: 700, focus: 'AGI Research', year: 2021 },
    { name: 'Meta AI', reputation: 750, focus: 'Neural Networks', year: 2013 }
];

const canvas = document.getElementById('labCanvas');
const ctx = canvas.getContext('2d');

let cameraX = 0;
let cameraY = 0;
const TILE_WIDTH = 64;
const TILE_HEIGHT = 32;

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

function worldToScreen(x, y) {
    return {
        x: (x - y) * (TILE_WIDTH / 2) + canvas.width / 2 + cameraX,
        y: (x + y) * (TILE_HEIGHT / 2) + 100 + cameraY
    };
}

const labObjects = [];

function addLabObject(type, x, y) {
    labObjects.push({ type, x, y, id: Date.now() + Math.random() });
}

function initLab() {
    const size = 8 + game.labSize * 2;
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            addLabObject('floor', x, y);
        }
    }
    
    addLabObject('desk', 2, 2);
    addLabObject('desk', 4, 2);
    addLabObject('server', 6, 3);
    addLabObject('plant', 1, 1);
    addLabObject('coffee', 3, 4);
}

const employees = [];

function addEmployee(member) {
    employees.push({
        member: member,
        x: 2 + Math.random() * 4,
        y: 2 + Math.random() * 3,
        targetX: null,
        targetY: null,
        speed: 0.02 + Math.random() * 0.01,
        animFrame: 0
    });
}

function drawIsometricTile(x, y, color) {
    const screen = worldToScreen(x, y);
    
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(screen.x, screen.y);
    ctx.lineTo(screen.x + TILE_WIDTH / 2, screen.y + TILE_HEIGHT / 2);
    ctx.lineTo(screen.x, screen.y + TILE_HEIGHT);
    ctx.lineTo(screen.x - TILE_WIDTH / 2, screen.y + TILE_HEIGHT / 2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 1;
    ctx.stroke();
}

function drawDesk(x, y) {
    const screen = worldToScreen(x, y);
    
    ctx.fillStyle = '#4a3f35';
    ctx.fillRect(screen.x - 20, screen.y - 10, 40, 20);
    
    ctx.fillStyle = '#5c4f44';
    ctx.beginPath();
    ctx.moveTo(screen.x, screen.y - 15);
    ctx.lineTo(screen.x + 25, screen.y - 5);
    ctx.lineTo(screen.x, screen.y + 5);
    ctx.lineTo(screen.x - 25, screen.y - 5);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#3a2f25';
    ctx.stroke();
    
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(screen.x - 8, screen.y - 30, 16, 12);
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(screen.x - 6, screen.y - 28, 12, 8);
}

function drawServer(x, y) {
    const screen = worldToScreen(x, y);
    
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(screen.x - 15, screen.y - 40, 30, 45);
    
    for (let i = 0; i < 5; i++) {
        const lightColor = Math.random() > 0.5 ? '#00ff00' : '#ff0000';
        ctx.fillStyle = lightColor;
        ctx.fillRect(screen.x - 10, screen.y - 35 + i * 8, 4, 4);
        ctx.fillRect(screen.x + 6, screen.y - 35 + i * 8, 4, 4);
    }
    
    ctx.strokeStyle = '#00ffff';
    ctx.strokeRect(screen.x - 15, screen.y - 40, 30, 45);
}

function drawPlant(x, y) {
    const screen = worldToScreen(x, y);
    
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(screen.x - 8, screen.y - 5, 16, 10);
    
    ctx.fillStyle = '#228b22';
    ctx.beginPath();
    ctx.moveTo(screen.x, screen.y - 20);
    ctx.lineTo(screen.x - 10, screen.y - 10);
    ctx.lineTo(screen.x - 5, screen.y - 15);
    ctx.lineTo(screen.x, screen.y - 8);
    ctx.lineTo(screen.x + 5, screen.y - 15);
    ctx.lineTo(screen.x + 10, screen.y - 10);
    ctx.closePath();
    ctx.fill();
}

function drawCoffeeMachine(x, y) {
    const screen = worldToScreen(x, y);
    
    ctx.fillStyle = '#3a3a3a';
    ctx.fillRect(screen.x - 12, screen.y - 20, 24, 25);
    
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(screen.x - 8, screen.y - 15, 6, 4);
    
    ctx.fillStyle = '#8b4513';
    ctx.fillRect(screen.x - 4, screen.y - 5, 8, 8);
}

function drawEmployee(emp) {
    const screen = worldToScreen(emp.x, emp.y);
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.beginPath();
    ctx.ellipse(screen.x, screen.y + 15, 10, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    
    const colors = ['#00ffff', '#00ff00', '#ff00ff', '#ffff00', '#ff8800'];
    const color = colors[emp.member.skill % colors.length];
    
    ctx.fillStyle = color;
    ctx.fillRect(screen.x - 6, screen.y - 10, 12, 20);
    
    ctx.fillStyle = '#ffdbac';
    ctx.beginPath();
    ctx.arc(screen.x, screen.y - 15, 6, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(screen.x - 20, screen.y - 40, 40, 12);
    ctx.fillStyle = color;
    ctx.font = '8px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText(emp.member.name.split(' ')[0], screen.x, screen.y - 32);
}

function updateEmployees() {
    employees.forEach(emp => {
        if (!emp.targetX || Math.abs(emp.x - emp.targetX) < 0.1) {
            emp.targetX = 1 + Math.random() * 5;
            emp.targetY = 1 + Math.random() * 4;
        }
        
        const dx = emp.targetX - emp.x;
        const dy = emp.targetY - emp.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 0.1) {
            emp.x += (dx / dist) * emp.speed;
            emp.y += (dy / dist) * emp.speed;
        }
        
        emp.animFrame = (emp.animFrame + 0.1) % 1;
    });
}

function renderLab() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0f1428');
    gradient.addColorStop(1, '#1a1f3a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const allObjects = [...labObjects, ...employees];
    allObjects.sort((a, b) => (a.y + (a.x || 0)) - (b.y + (b.x || 0)));
    
    allObjects.forEach(obj => {
        if (obj.type === 'floor') {
            drawIsometricTile(obj.x, obj.y, '#1a2332');
        } else if (obj.type === 'desk') {
            drawDesk(obj.x, obj.y);
        } else if (obj.type === 'server') {
            drawServer(obj.x, obj.y);
        } else if (obj.type === 'plant') {
            drawPlant(obj.x, obj.y);
        } else if (obj.type === 'coffee') {
            drawCoffeeMachine(obj.x, obj.y);
        } else if (obj.member) {
            drawEmployee(obj);
        }
    });
}

function formatMoney(amount) {
    if (amount >= 1000000000) return `$${(amount / 1000000000).toFixed(1)}B`;
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${Math.floor(amount).toLocaleString()}`;
}

function formatDate(date) {
    const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
    return `${months[date.month - 1]} ${date.year}`;
}

function showToast(msg, type) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = msg;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function addNews(msg, type) {
    news.unshift({ msg, date: {...game.date}, type });
    if (news.length > 100) news.pop();
    updateNewsLog();
}

function updateNewsLog() {
    const log = document.getElementById('newsLog');
    if (!log) return;
    log.innerHTML = news.slice(0, 10).map(n => 
        `<div class="news-item ${n.type}">${formatDate(n.date)}: ${n.msg}</div>`
    ).join('') || '<div class="empty">Keine Neuigkeiten</div>';
}

function advanceTime() {
    game.date.month++;
    if (game.date.month > 12) {
        game.date.month = 1;
        game.date.year++;
        processYearEnd();
    }
    
    processMonthly();
    updateUI();
}

function processYearEnd() {
    addNews(`🎆 ${game.date.year} beginnt! Dein Labor wächst weiter.`, 'positive');
    
    if (game.date.year >= 2010) {
        finances.expenses.compute = Math.max(500, finances.expenses.compute * 0.98);
    }
    
    team.forEach(member => {
        if (Math.random() < 0.1 && member.skill < 10) {
            member.skill++;
            addNews(`📚 ${member.name} hat Skill erhöht auf ${member.skill}!`, 'positive');
        }
    });
}

function processMonthly() {
    const totalIncome = Object.values(finances.income).reduce((a, b) => a + b, 0);
    const totalExpenses = Object.values(finances.expenses).reduce((a, b) => a + b, 0);
    game.money += totalIncome - totalExpenses;
    stats.revenue += totalIncome;
    stats.totalSpent += totalExpenses;
    
    research.active.forEach(proj => {
        proj.progress += (100 / proj.duration);
        if (proj.progress >= 100) {
            completeResearch(proj);
        }
    });
    
    products.inDev.forEach(prod => {
        prod.progress += (100 / prod.duration);
        if (prod.progress >= 100) {
            launchProduct(prod);
        }
    });
    
    team.forEach(member => {
        member.morale += (Math.random() - 0.5) * 5;
        member.morale = Math.max(0, Math.min(100, member.morale));
        
        if (member.morale < 30 && Math.random() < 0.05) {
            handleEmployeeQuit(member);
        }
    });
    
    if (Math.random() < 0.08) triggerEvent();
    
    if (game.date.month % 3 === 0) {
        processCompetitorActions();
    }
    
    if (game.money < -100000) {
        gameOver('Bankrott');
    }
    
    if (research.unlocked['AGI Research'] && research.unlocked['AGI Research'].includes(5)) {
        gameWin();
    }
}

function completeResearch(proj) {
    research.active = research.active.filter(p => p !== proj);
    research.completed.push(proj);
    research.unlocked[proj.track].push(proj.level);
    
    stats.research++;
    game.reputation += 50 + proj.level * 10;
    
    showToast(`✅ ${proj.name} abgeschlossen!`, 'success');
    addNews(`🔬 Forschung abgeschlossen: ${proj.name} (+${50 + proj.level * 10} Rep)`, 'positive');
    
    setTimeout(() => offerPaperPublication(proj), 500);
    
    updateUI();
}

function offerPaperPublication(proj) {
    const cost = 10000 + proj.level * 5000;
    const repGain = 100 + proj.level * 20;
    
    if (confirm(`Paper über "${proj.name}" veröffentlichen?\n\nKosten: ${formatMoney(cost)}\nReputation: +${repGain}`)) {
        if (game.money >= cost) {
            game.money -= cost;
            game.reputation += repGain;
            stats.papers++;
            showToast('📄 Paper veröffentlicht!', 'success');
            addNews(`📄 Paper über ${proj.name} in Top-Conference akzeptiert! +${repGain} Rep`, 'positive');
            
            if (Math.random() < 0.3) {
                setTimeout(() => triggerEthicsEvent(), 1000);
            }
        } else {
            showToast('Nicht genug Geld!', 'error');
        }
    }
}

function handleEmployeeQuit(member) {
    const index = team.indexOf(member);
    if (index > -1) {
        team.splice(index, 1);
        finances.expenses.salaries -= member.salary / 12;
        
        const empIndex = employees.findIndex(e => e.member === member);
        if (empIndex > -1) employees.splice(empIndex, 1);
        
        showToast(`${member.name} hat gekündigt!`, 'error');
        addNews(`👋 ${member.name} verlässt das Team (niedrige Moral)`, 'negative');
        updateUI();
    }
}

function generateEmployee(role, skill) {
    const firstNames = ['Alice', 'Bob', 'Carol', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Irene', 'Jack', 'Kate', 'Leo'];
    const lastNames = ['Smith', 'Chen', 'Kumar', 'Garcia', 'Lee', 'Wang', 'Brown', 'Martinez', 'Anderson', 'Taylor', 'Moore', 'Jackson'];
    
    const salaries = {
        'Researcher': [60000, 150000, 350000],
        'Engineer': [80000, 180000, 400000],
        'Data Scientist': [70000, 140000, 300000],
        'Product Manager': [90000, 160000, 320000]
    };
    
    const tier = skill <= 3 ? 0 : skill <= 7 ? 1 : 2;
    
    return {
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        role: role,
        skill: skill,
        salary: salaries[role][tier],
        morale: 70 + Math.random() * 25,
        assigned: null,
        experience: 0
    };
}

function hireEmployee(emp) {
    team.push(emp);
    stats.hires++;
    finances.expenses.salaries += emp.salary / 12;
    
    addEmployee(emp);
    
    const deskX = 2 + team.length % 4;
    const deskY = 2 + Math.floor(team.length / 4);
    addLabObject('desk', deskX, deskY);
    
    showToast(`${emp.name} eingestellt!`, 'success');
    addNews(`👤 ${emp.name} (${emp.role}, Skill ${emp.skill}) tritt dem Team bei!`, 'positive');
    updateUI();
}

function showHireModal() {
    const modal = document.getElementById('hireModal');
    const list = document.getElementById('candidatesList');
    
    const candidates = [];
    for (let i = 0; i < 6; i++) {
        const roles = ['Researcher', 'Engineer', 'Data Scientist', 'Product Manager'];
        const role = roles[Math.floor(Math.random() * roles.length)];
        const skill = 1 + Math.floor(Math.random() * 10);
        candidates.push(generateEmployee(role, skill));
    }
    
    list.innerHTML = candidates.map((c, i) => `
        <div class="candidate">
            <div class="member-name">${c.name}</div>
            <div class="member-role">${c.role}</div>
            <div class="skill-bar">
                ${Array(10).fill(0).map((_, j) => 
                    `<div class="skill-dot ${j < c.skill ? 'filled' : ''}"></div>`
                ).join('')}
            </div>
            <div class="member-stats" style="margin-top: 0.5rem;">
                <div>Skill: ${c.skill}/10</div>
                <div>Gehalt: ${formatMoney(c.salary)}/Jahr</div>
            </div>
            <button class="btn-primary" onclick="hireCandidate(${i})" style="margin-top: 0.5rem;">Einstellen (${formatMoney(c.salary)})</button>
        </div>
    `).join('');
    
    window.currentCandidates = candidates;
    modal.classList.add('active');
}

window.hireCandidate = function(index) {
    const candidate = window.currentCandidates[index];
    if (game.money >= candidate.salary) {
        hireEmployee(candidate);
        document.getElementById('hireModal').classList.remove('active');
    } else {
        showToast('Nicht genug Geld!', 'error');
    }
};

function teamTraining() {
    const cost = 50000 * team.length;
    if (confirm(`Team-Training durchführen?\n\nKosten: ${formatMoney(cost)}\nAlle Mitarbeiter: +1 Skill, +20 Moral`)) {
        if (game.money >= cost) {
            game.money -= cost;
            team.forEach(member => {
                if (member.skill < 10) member.skill++;
                member.morale = Math.min(100, member.morale + 20);
            });
            showToast('Team-Training erfolgreich!', 'success');
            addNews('📚 Team-Training abgeschlossen! Alle Mitarbeiter verbessert.', 'positive');
            updateUI();
        } else {
            showToast('Nicht genug Geld!', 'error');
        }
    }
}

function startResearch(track, level) {
    const tech = researchTree[track][level];
    
    if (!tech) return;
    
    if (game.date.year < tech.year) {
        showToast(`Nicht verfügbar bis ${tech.year}!`, 'error');
        return;
    }
    
    if (game.money < tech.cost) {
        showToast('Nicht genug Geld!', 'error');
        return;
    }
    
    if (game.compute < tech.compute) {
        showToast(`Nicht genug Compute! Benötigt: ${tech.compute} ${game.computeUnit}`, 'error');
        return;
    }
    
    if (level > 0 && !research.unlocked[track].includes(level - 1)) {
        showToast('Vorheriges Level benötigt!', 'error');
        return;
    }
    
    game.money -= tech.cost;
    
    const proj = {
        track: track,
        level: level,
        name: tech.name,
        duration: tech.duration,
        progress: 0,
        start: {...game.date}
    };
    
    research.active.push(proj);
    showToast(`Forschung gestartet: ${tech.name}`, 'success');
    addNews(`🚀 Forschung: ${tech.name} (${tech.duration} Monate)`, 'positive');
    updateUI();
}

function showProductModal() {
    const modal = document.getElementById('productModal');
    
    const techSelect = document.getElementById('productTechSelect');
    const availableTech = [];
    
    for (const track in research.unlocked) {
        research.unlocked[track].forEach(level => {
            availableTech.push({
                track: track,
                level: level,
                name: researchTree[track][level].name
            });
        });
    }
    
    if (availableTech.length === 0) {
        showToast('Erst Forschung abschließen!', 'error');
        return;
    }
    
    techSelect.innerHTML = availableTech.map((t, i) => 
        `<option value="${i}">${t.track}: ${t.name}</option>`
    ).join('');
    
    window.availableTech = availableTech;
    modal.classList.add('active');
    updateProductInfo();
}

function updateProductInfo() {
    const type = document.getElementById('productTypeSelect').value;
    const techIndex = parseInt(document.getElementById('productTechSelect').value);
    const info = document.getElementById('productInfoBox');
    
    if (isNaN(techIndex)) {
        info.innerHTML = '';
        return;
    }
    
    const tech = window.availableTech[techIndex];
    const costs = {
        research: 50000,
        enterprise: 200000,
        consumer: 500000,
        api: 1000000
    };
    
    const durations = {
        research: 3,
        enterprise: 6,
        consumer: 9,
        api: 12
    };
    
    const revenues = {
        research: 5000,
        enterprise: 50000,
        consumer: 100000,
        api: 200000
    };
    
    info.innerHTML = `
        <div class="info-row">Entwicklungskosten: ${formatMoney(costs[type])}</div>
        <div class="info-row">Entwicklungsdauer: ${durations[type]} Monate</div>
        <div class="info-row">Erwartete Einnahmen: ${formatMoney(revenues[type])}/Monat</div>
        <div class="info-row">Basiert auf: ${tech.name}</div>
    `;
}

function createProduct() {
    const name = document.getElementById('productNameInput').value.trim();
    const type = document.getElementById('productTypeSelect').value;
    const techIndex = parseInt(document.getElementById('productTechSelect').value);
    
    if (!name) {
        showToast('Bitte Produktname eingeben!', 'error');
        return;
    }
    
    const tech = window.availableTech[techIndex];
    
    const costs = {
        research: 50000,
        enterprise: 200000,
        consumer: 500000,
        api: 1000000
    };
    
    const durations = {
        research: 3,
        enterprise: 6,
        consumer: 9,
        api: 12
    };
    
    const revenues = {
        research: 5000,
        enterprise: 50000,
        consumer: 100000,
        api: 200000
    };
    
    if (game.money < costs[type]) {
        showToast('Nicht genug Geld!', 'error');
        return;
    }
    
    game.money -= costs[type];
    
    const product = {
        name: name,
        type: type,
        tech: tech,
        duration: durations[type],
        progress: 0,
        revenue: revenues[type] * (0.5 + Math.random()),
        start: {...game.date}
    };
    
    products.inDev.push(product);
    
    showToast(`Produkt in Entwicklung: ${name}`, 'success');
    addNews(`💼 Produktentwicklung: ${name} (${durations[type]} Monate)`, 'positive');
    
    document.getElementById('productModal').classList.remove('active');
    updateUI();
}

function launchProduct(prod) {
    products.inDev = products.inDev.filter(p => p !== prod);
    products.active.push(prod);
    
    finances.income.products += prod.revenue;
    stats.products++;
    
    showToast(`🚀 ${prod.name} gelauncht!`, 'success');
    addNews(`💼 Produkt ${prod.name} ist live! Umsatz: ${formatMoney(prod.revenue)}/Monat`, 'positive');
    
    game.reputation += 30;
    
    updateUI();
}

function triggerEvent() {
    const events = [
        {
            title: '💡 Forschungsdurchbruch!',
            desc: 'Ein Teammitglied macht eine wichtige Entdeckung!',
            choices: [
                { text: 'Exzellent!', effect: () => { 
                    game.reputation += 50;
                    showToast('+50 Reputation', 'success');
                }}
            ]
        },
        {
            title: '🎓 Grant-Angebot',
            desc: 'Eine Universität bietet $100K für ein gemeinsames Projekt.',
            choices: [
                { text: 'Annehmen', effect: () => { 
                    game.money += 100000;
                    addNews('🎓 $100K Grant erhalten!', 'positive');
                }},
                { text: 'Ablehnen', effect: () => {} }
            ]
        },
        {
            title: '⚠️ Hardware-Ausfall',
            desc: 'Deine Server sind ausgefallen! Reparatur: $50K',
            choices: [
                { text: 'Reparieren', effect: () => { 
                    if (game.money >= 50000) {
                        game.money -= 50000;
                        showToast('Hardware repariert', 'warning');
                    } else {
                        showToast('Nicht genug Geld!', 'error');
                    }
                }}
            ]
        },
        {
            title: '🌟 Star-Forscher interessiert',
            desc: 'Ein hochqualifizierter Forscher (Skill 9) möchte für 30% unter Marktpreis arbeiten!',
            choices: [
                { text: 'Einstellen', effect: () => {
                    const emp = generateEmployee('Researcher', 9);
                    emp.salary *= 0.7;
                    hireEmployee(emp);
                }},
                { text: 'Ablehnen', effect: () => {} }
            ]
        },
        {
            title: '📰 Medienaufmerksamkeit',
            desc: 'Deine Forschung wird in großen Medien erwähnt!',
            choices: [
                { text: 'Großartig!', effect: () => {
                    game.reputation += 100;
                    addNews('📰 Medien berichten über unser Labor! +100 Rep', 'positive');
                }}
            ]
        },
        {
            title: '💼 Consulting-Anfrage',
            desc: 'Ein Unternehmen bietet $200K für 3 Monate Consulting.',
            choices: [
                { text: 'Annehmen', effect: () => {
                    finances.income.consulting += 66667;
                    addNews('💼 Consulting-Projekt angenommen', 'positive');
                    setTimeout(() => {
                        finances.income.consulting -= 66667;
                        addNews('💼 Consulting-Projekt abgeschlossen', 'important');
                    }, 3000);
                }},
                { text: 'Ablehnen', effect: () => {} }
            ]
        },
        {
            title: '🏆 Award-Nominierung',
            desc: 'Dein Labor wurde für einen wichtigen Preis nominiert!',
            choices: [
                { text: 'Annehmen', effect: () => {
                    game.reputation += 150;
                    game.ethics += 20;
                    addNews('🏆 Award-Nominierung! +150 Rep, +20 Ethik', 'positive');
                }}
            ]
        }
    ];
    
    const event = events[Math.floor(Math.random() * events.length)];
    showEventModal(event);
}

function triggerEthicsEvent() {
    const ethicsEvents = [
        {
            title: '⚖️ Bias im Modell entdeckt',
            desc: 'Dein neuestes Modell zeigt Bias gegenüber bestimmten Gruppen. Was tun?',
            choices: [
                { 
                    text: '✅ Modell zurückziehen und reparieren (6 Monate, $100K)',
                    ethical: true,
                    effect: () => {
                        if (game.money >= 100000) {
                            game.money -= 100000;
                            game.ethics += 50;
                            game.reputation += 30;
                            addNews('✅ Ethische Entscheidung: Bias behoben', 'positive');
                        }
                    }
                },
                {
                    text: '❌ Trotzdem launchen (hohe Einnahmen, Reputationsrisiko)',
                    ethical: false,
                    effect: () => {
                        game.ethics -= 100;
                        game.reputation -= 200;
                        finances.income.products += 50000;
                        addNews('❌ Unethische Entscheidung: Bias ignoriert', 'negative');
                    }
                }
            ]
        },
        {
            title: '🎖️ Militär-Kontrakt',
            desc: 'Das Pentagon bietet $10M für autonome Waffensysteme.',
            choices: [
                {
                    text: '✅ Ablehnen (ethisch)',
                    ethical: true,
                    effect: () => {
                        game.ethics += 100;
                        game.reputation += 50;
                        addNews('✅ Militär-Kontrakt abgelehnt', 'positive');
                    }
                },
                {
                    text: '❌ Annehmen ($10M, Mitarbeiter unzufrieden)',
                    ethical: false,
                    effect: () => {
                        game.money += 10000000;
                        game.ethics -= 200;
                        team.forEach(m => m.morale -= 30);
                        addNews('❌ Militär-Kontrakt angenommen', 'negative');
                    }
                }
            ]
        },
        {
            title: '🔒 Datenschutz-Dilemma',
            desc: 'Du könntest ein besseres Modell mit privaten Nutzerdaten trainieren.',
            choices: [
                {
                    text: '✅ Nur mit Erlaubnis (weniger Daten)',
                    ethical: true,
                    effect: () => {
                        game.ethics += 50;
                        addNews('✅ Datenschutz respektiert', 'positive');
                    }
                },
                {
                    text: '❌ Ohne zu fragen (besseres Modell, Skandal-Risiko)',
                    ethical: false,
                    effect: () => {
                        game.ethics -= 150;
                        if (Math.random() < 0.3) {
                            game.reputation -= 500;
                            game.money -= 2000000;
                            addNews('❌ Datenschutz-Skandal! -500 Rep, $2M Strafe', 'negative');
                        } else {
                            game.reputation += 50;
                            addNews('❌ Unethisch aber erfolgreich', 'important');
                        }
                    }
                }
            ]
        }
    ];
    
    const event = ethicsEvents[Math.floor(Math.random() * ethicsEvents.length)];
    showEthicsModal(event);
}

function showEventModal(event) {
    const modal = document.getElementById('eventModal');
    document.getElementById('eventTitle').textContent = event.title;
    document.getElementById('eventDesc').textContent = event.desc;
    
    const choices = document.getElementById('eventChoices');
    choices.innerHTML = event.choices.map((c, i) => 
        `<button class="choice-btn" onclick="handleEventChoice(${i})">${c.text}</button>`
    ).join('');
    
    window.currentEvent = event;
    modal.classList.add('active');
}

function showEthicsModal(event) {
    const modal = document.getElementById('ethicsModal');
    document.getElementById('ethicsTitle').textContent = event.title;
    document.getElementById('ethicsDesc').textContent = event.desc;
    
    const choices = document.getElementById('ethicsChoices');
    choices.innerHTML = event.choices.map((c, i) => 
        `<button class="choice-btn ${c.ethical ? 'ethical' : 'unethical'}" onclick="handleEthicsChoice(${i})">${c.text}</button>`
    ).join('');
    
    window.currentEthicsEvent = event;
    modal.classList.add('active');
}

window.handleEventChoice = function(index) {
    const event = window.currentEvent;
    event.choices[index].effect();
    document.getElementById('eventModal').classList.remove('active');
    updateUI();
};

window.handleEthicsChoice = function(index) {
    const event = window.currentEthicsEvent;
    event.choices[index].effect();
    document.getElementById('ethicsModal').classList.remove('active');
    updateUI();
};

function processCompetitorActions() {
    const activeCompetitors = competitors.filter(c => game.date.year >= c.year);
    
    activeCompetitors.forEach(comp => {
        if (Math.random() < 0.4) {
            const actions = [
                () => addNews(`📰 ${comp.name} veröffentlicht bahnbrechendes Paper über ${comp.focus}`, 'important'),
                () => addNews(`💼 ${comp.name} launcht neues ${comp.focus} Produkt`, 'important'),
                () => {
                    comp.reputation += 50;
                    addNews(`🏆 ${comp.name} gewinnt wichtigen Award`, 'important');
                }
            ];
            
            actions[Math.floor(Math.random() * actions.length)]();
        }
    });
}

function applyGrant() {
    const baseAmount = 20000;
    const repMultiplier = 1 + (game.reputation / 500);
    const amount = Math.floor(baseAmount * repMultiplier * (1 + Math.random()));
    const success = Math.random() < (0.6 + game.reputation / 2000);
    
    if (success) {
        game.money += amount;
        game.reputation += 10;
        finances.income.grants += amount / 12;
        
        showToast(`Grant gewonnen: ${formatMoney(amount)}!`, 'success');
        addNews(`🎓 Grant erhalten: ${formatMoney(amount)} (12 Monate)`, 'positive');
        
        setTimeout(() => {
            finances.income.grants -= amount / 12;
        }, 12000);
    } else {
        showToast('Grant-Antrag abgelehnt', 'error');
        addNews('Grant-Antrag wurde abgelehnt', 'negative');
    }
    
    updateUI();
}

function seekVC() {
    if (game.date.year < 1990) {
        showToast('VC-Funding erst ab 1990 verfügbar!', 'error');
        return;
    }
    
    const baseAmount = 500000;
    const repMultiplier = 1 + (game.reputation / 300);
    const amount = Math.floor(baseAmount * repMultiplier * (2 + Math.random() * 3));
    
    if (confirm(`VC bietet ${formatMoney(amount)} für 20% Equity.\n\nAnnehmen?`)) {
        game.money += amount;
        game.reputation += 50;
        showToast(`VC-Funding: ${formatMoney(amount)}!`, 'success');
        addNews(`💰 ${formatMoney(amount)} VC-Funding erhalten (20% Equity abgegeben)`, 'positive');
    }
    
    updateUI();
}

function takeLoan() {
    const amount = 200000;
    const interest = 20000;
    
    if (confirm(`Kredit: ${formatMoney(amount)}\n\nZinsen: ${formatMoney(interest)}/Monat für 12 Monate`)) {
        game.money += amount;
        finances.expenses.office += interest;
        
        showToast('Kredit aufgenommen', 'warning');
        addNews(`🏦 Kredit ${formatMoney(amount)} aufgenommen`, 'important');
        
        setTimeout(() => {
            finances.expenses.office -= interest;
            addNews('🏦 Kredit vollständig zurückgezahlt', 'positive');
        }, 12000);
    }
    
    updateUI();
}

function offerConsulting() {
    if (team.length < 3) {
        showToast('Mindestens 3 Mitarbeiter benötigt!', 'error');
        return;
    }
    
    const amount = 100000;
    
    if (confirm(`Consulting-Projekt annehmen?\n\nEinnahmen: ${formatMoney(amount)}/Monat für 6 Monate\nTeam-Kapazität: -30%`)) {
        finances.income.consulting += amount;
        team.forEach(m => m.morale -= 10);
        
        showToast('Consulting-Projekt gestartet', 'success');
        addNews('💼 Consulting-Projekt für 6 Monate', 'positive');
        
        setTimeout(() => {
            finances.income.consulting -= amount;
            addNews('💼 Consulting-Projekt abgeschlossen', 'positive');
        }, 6000);
    }
    
    updateUI();
}

function expandLab() {
    const cost = 500000 * (game.labSize + 1);
    
    if (confirm(`Labor erweitern?\n\nKosten: ${formatMoney(cost)}\n+Platz für mehr Mitarbeiter\n+20% Moral-Bonus`)) {
        if (game.money >= cost) {
            game.money -= cost;
            game.labSize++;
            
            labObjects.length = 0;
            initLab();
            
            team.forEach(m => m.morale = Math.min(100, m.morale + 20));
            
            showToast('Labor erweitert!', 'success');
            addNews(`🏗️ Labor auf Level ${game.labSize} erweitert!`, 'positive');
            updateUI();
        } else {
            showToast('Nicht genug Geld!', 'error');
        }
    }
}

function upgradeCompute() {
    const costs = [100000, 500000, 2000000, 10000000, 50000000];
    const multipliers = [10, 100, 1000, 10000, 100000];
    const units = ['KFLOPS', 'MFLOPS', 'GFLOPS', 'TFLOPS', 'PFLOPS', 'EFLOPS'];
    
    if (game.computeUpgradeLevel >= costs.length) {
        showToast('Maximales Compute-Level erreicht!', 'warning');
        return;
    }
    
    const cost = costs[game.computeUpgradeLevel];
    const nextMultiplier = multipliers[game.computeUpgradeLevel];
    const nextUnit = units[game.computeUpgradeLevel + 1];
    
    if (confirm(`Compute upgraden?\n\nKosten: ${formatMoney(cost)}\nNeue Leistung: ${nextMultiplier} ${nextUnit}`)) {
        if (game.money >= cost) {
            game.money -= cost;
            game.compute = nextMultiplier;
            game.computeUnit = nextUnit;
            game.computeUpgradeLevel++;
            
            finances.expenses.compute += cost * 0.1;
            
            showToast('Compute upgraded!', 'success');
            addNews(`🖥️ Compute upgraded auf ${nextMultiplier} ${nextUnit}!`, 'positive');
            updateUI();
        } else {
            showToast('Nicht genug Geld!', 'error');
        }
    }
}

function gameOver(reason) {
    game.isPaused = true;
    
    const message = `💔 GAME OVER: ${reason}\n\n` +
        `Zeit gespielt: ${game.date.year - 1956} Jahre\n` +
        `Reputation: ${game.reputation}\n` +
        `Papers: ${stats.papers}\n` +
        `Forschung: ${stats.research}\n` +
        `Produkte: ${stats.products}`;
    
    alert(message);
}

function gameWin() {
    game.isPaused = true;
    
    const timeBonus = (60 - (game.date.year - 1956)) * 10000;
    const repBonus = game.reputation * 50;
    const ethicsMultiplier = game.ethics > 500 ? 2.0 : game.ethics > 200 ? 1.5 : game.ethics > 0 ? 1.0 : 0.5;
    const finalScore = Math.floor((100000 + timeBonus + repBonus) * ethicsMultiplier);
    
    const message = `🎉 GLÜCKWUNSCH! DU HAST AGI ERREICHT!\n\n` +
        `Endpunktzahl: ${finalScore.toLocaleString()}\n` +
        `Zeit: ${game.date.year - 1956} Jahre (${game.date.year})\n` +
        `Reputation: ${game.reputation}\n` +
        `Ethik: ${game.ethics}\n` +
        `Papers: ${stats.papers}\n` +
        `Forschung: ${stats.research}\n` +
        `Produkte: ${stats.products}\n` +
        `Team: ${team.length} Mitarbeiter\n\n` +
        `Ranking: ${finalScore > 1000000 ? 'S-Tier (Legende!)' : 
                    finalScore > 500000 ? 'A-Tier (Exzellent)' :
                    finalScore > 250000 ? 'B-Tier (Gut)' : 'C-Tier'}`;
    
    alert(message);
}

function updateUI() {
    document.getElementById('dateDisplay').textContent = formatDate(game.date);
    document.getElementById('money').textContent = formatMoney(game.money);
    document.getElementById('reputation').textContent = game.reputation;
    document.getElementById('ethics').textContent = game.ethics > 0 ? `+${game.ethics}` : game.ethics;
    
    document.getElementById('teamCount').textContent = team.length;
    document.getElementById('computePower').textContent = `${game.compute} ${game.computeUnit}`;
    document.getElementById('dataAmount').textContent = `${game.data} ${game.dataUnit}`;
    
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
        const tabId = activeTab.id;
        if (tabId === 'dashboardTab') updateDashboard();
        if (tabId === 'researchTab') updateResearchTab();
        if (tabId === 'teamTab') updateTeamTab();
        if (tabId === 'productsTab') updateProductsTab();
        if (tabId === 'financeTab') updateFinanceTab();
        if (tabId === 'statsTab') updateStatsTab();
    }
}

function updateDashboard() {
    const totalIncome = Object.values(finances.income).reduce((a, b) => a + b, 0);
    const totalExpenses = Object.values(finances.expenses).reduce((a, b) => a + b, 0);
    const net = totalIncome - totalExpenses;
    const runway = net < 0 ? game.money / Math.abs(net) : Infinity;
    
    document.getElementById('budget').textContent = formatMoney(game.money);
    document.getElementById('monthlyIncome').textContent = '+' + formatMoney(totalIncome);
    document.getElementById('monthlyExpenses').textContent = '-' + formatMoney(totalExpenses);
    document.getElementById('monthlyNet').textContent = formatMoney(net);
    document.getElementById('monthlyNet').className = 'value ' + (net >= 0 ? 'positive' : 'negative');
    document.getElementById('runway').textContent = runway === Infinity ? '♾️ Profitabel!' : `${Math.floor(runway)} Monate`;
    
    const activeRes = document.getElementById('activeResearch');
    if (research.active.length === 0) {
        activeRes.innerHTML = '<div class="empty">Keine aktive Forschung</div>';
    } else {
        activeRes.innerHTML = research.active.map(p => `
            <div class="research-item">
                <div class="research-name">${p.name}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${p.progress}%"></div>
                </div>
                <div style="font-size: 0.85rem; color: #888;">${Math.floor(p.progress)}% - ${Math.ceil((100 - p.progress) / (100 / p.duration))} Monate</div>
            </div>
        `).join('');
    }
    
    const activeProd = document.getElementById('activeProducts');
    if (products.active.length === 0) {
        activeProd.innerHTML = '<div class="empty">Keine Produkte</div>';
    } else {
        activeProd.innerHTML = products.active.map(p => `
            <div class="product-item">
                <div class="product-name">${p.name}</div>
                <div style="font-size: 0.85rem; color: #00ff00;">Umsatz: ${formatMoney(p.revenue)}/Monat</div>
            </div>
        `).join('');
    }
}

function updateResearchTab() {
    const tracks = document.getElementById('researchTracks');
    tracks.innerHTML = Object.entries(researchTree).map(([track, levels]) => {
        const dots = levels.map((_, i) => {
            const isCompleted = research.unlocked[track].includes(i);
            const isActive = research.active.some(p => p.track === track && p.level === i);
            return `<div class="level-dot ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}"></div>`;
        }).join('');
        
        return `
            <div class="research-track">
                <div class="track-name">${track} (${research.unlocked[track].length}/${levels.length})</div>
                <div class="track-progress">${dots}</div>
            </div>
        `;
    }).join('');
    
    const trackSelect = document.getElementById('trackSelect');
    trackSelect.innerHTML = '<option value="">Bereich wählen...</option>' + 
        Object.keys(researchTree).map(t => `<option value="${t}">${t}</option>`).join('');
    
    updateResearchInfo();
}

function updateResearchInfo() {
    const track = document.getElementById('trackSelect').value;
    const levelSelect = document.getElementById('levelSelect');
    const info = document.getElementById('researchInfo');
    const btn = document.getElementById('startResearchBtn');
    
    if (!track) {
        levelSelect.innerHTML = '<option value="">Level wählen...</option>';
        info.innerHTML = '';
        btn.disabled = true;
        return;
    }
    
    const levels = researchTree[track];
    levelSelect.innerHTML = '<option value="">Level wählen...</option>' +
        levels.map((l, i) => `<option value="${i}">L${i+1}: ${l.name} (${l.year})</option>`).join('');
    
    const level = parseInt(levelSelect.value);
    if (isNaN(level)) {
        info.innerHTML = '';
        btn.disabled = true;
        return;
    }
    
    const tech = levels[level];
    const yearMet = game.date.year >= tech.year;
    const moneyMet = game.money >= tech.cost;
    const computeMet = game.compute >= tech.compute;
    const prevMet = level === 0 || research.unlocked[track].includes(level - 1);
    
    info.innerHTML = `
        <div class="info-row ${yearMet ? 'met' : 'not-met'}">
            Jahr: ${tech.year} ${yearMet ? '✓' : '✗'}
        </div>
        <div class="info-row ${moneyMet ? 'met' : 'not-met'}">
            Kosten: ${formatMoney(tech.cost)} ${moneyMet ? '✓' : '✗'}
        </div>
        <div class="info-row ${computeMet ? 'met' : 'not-met'}">
            Compute: ${tech.compute} ${game.computeUnit} ${computeMet ? '✓' : '✗'}
        </div>
        <div class="info-row ${prevMet ? 'met' : 'not-met'}">
            Vorherig: ${prevMet ? 'OK ✓' : 'Benötigt ✗'}
        </div>
        <div class="info-row">Dauer: ${tech.duration} Monate</div>
    `;
    
    btn.disabled = !yearMet || !moneyMet || !computeMet || !prevMet;
}

function updateTeamTab() {
    const list = document.getElementById('teamList');
    if (team.length === 0) {
        list.innerHTML = '<div class="empty">Noch keine Mitarbeiter. Klicke "Mitarbeiter einstellen"!</div>';
        return;
    }
    
    list.innerHTML = team.map(m => `
        <div class="team-member">
            <div class="member-name">${m.name}</div>
            <div class="member-role">${m.role}</div>
            <div class="skill-bar">
                ${Array(10).fill(0).map((_, i) => 
                    `<div class="skill-dot ${i < m.skill ? 'filled' : ''}"></div>`
                ).join('')}
            </div>
            <div class="member-stats" style="margin-top: 0.5rem;">
                <div>Skill: ${m.skill}/10</div>
                <div>Gehalt: ${formatMoney(m.salary)}/Jahr</div>
                <div>Moral: ${Math.floor(m.morale)}%</div>
                <div>Status: ${m.assigned || 'Verfügbar'}</div>
            </div>
        </div>
    `).join('');
}

function updateProductsTab() {
    const activeList = document.getElementById('activeProductsList');
    const inDevList = document.getElementById('inDevProductsList');
    
    if (products.active.length === 0) {
        activeList.innerHTML = '<div class="empty">Keine aktiven Produkte</div>';
    } else {
        activeList.innerHTML = products.active.map(p => `
            <div class="product-item">
                <div class="product-name">${p.name}</div>
                <div style="font-size: 0.85rem; margin-top: 0.25rem;">
                    Typ: ${p.type}<br>
                    Basiert auf: ${p.tech.name}<br>
                    Umsatz: ${formatMoney(p.revenue)}/Monat
                </div>
            </div>
        `).join('');
    }
    
    if (products.inDev.length === 0) {
        inDevList.innerHTML = '<div class="empty">Keine Produkte in Entwicklung</div>';
    } else {
        inDevList.innerHTML = products.inDev.map(p => `
            <div class="product-item">
                <div class="product-name">${p.name}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${p.progress}%"></div>
                </div>
                <div style="font-size: 0.85rem; color: #888;">${Math.floor(p.progress)}% - ${Math.ceil((100 - p.progress) / (100 / p.duration))} Monate</div>
            </div>
        `).join('');
    }
}

function updateFinanceTab() {
    const totalIncome = Object.values(finances.income).reduce((a, b) => a + b, 0);
    const totalExpenses = Object.values(finances.expenses).reduce((a, b) => a + b, 0);
    const net = totalIncome - totalExpenses;
    
    document.getElementById('finBalance').textContent = formatMoney(game.money);
    document.getElementById('finIncome').textContent = '+' + formatMoney(totalIncome);
    document.getElementById('finExpenses').textContent = '-' + formatMoney(totalExpenses);
    document.getElementById('finNet').textContent = formatMoney(net);
    document.getElementById('finNet').className = 'value ' + (net >= 0 ? 'positive' : 'negative');
    
    document.getElementById('expSalaries').textContent = formatMoney(finances.expenses.salaries);
    document.getElementById('expCompute').textContent = formatMoney(finances.expenses.compute);
    document.getElementById('expOffice').textContent = formatMoney(finances.expenses.office);
    document.getElementById('expData').textContent = formatMoney(finances.expenses.data);
    document.getElementById('expRnD').textContent = formatMoney(finances.expenses.rnd);
    
    document.getElementById('incProducts').textContent = formatMoney(finances.income.products);
    document.getElementById('incGrants').textContent = formatMoney(finances.income.grants);
    document.getElementById('incConsulting').textContent = formatMoney(finances.income.consulting);
}

function updateStatsTab() {
    document.getElementById('statPapers').textContent = stats.papers;
    document.getElementById('statResearch').textContent = stats.research;
    document.getElementById('statProducts').textContent = stats.products;
    document.getElementById('statHires').textContent = stats.hires;
    document.getElementById('statRevenue').textContent = formatMoney(stats.revenue);
    
    const leaderboard = document.getElementById('leaderboard');
    const allLabs = [...competitors.filter(c => game.date.year >= c.year), 
                     { name: game.labName, reputation: game.reputation, isPlayer: true }]
        .sort((a, b) => b.reputation - a.reputation);
    
    leaderboard.innerHTML = allLabs.slice(0, 10).map((lab, index) => `
        <div class="leaderboard-item ${lab.isPlayer ? 'player' : ''}">
            <span class="leaderboard-rank">#${index + 1}</span>
            <span style="flex: 1;">${lab.name}</span>
            <span>${lab.reputation} Rep</span>
        </div>
    `).join('');
    
    const timeline = document.getElementById('timeline');
    const majorEvents = news.filter(n => n.type === 'positive' || n.type === 'important').slice(0, 15);
    timeline.innerHTML = majorEvents.map(event => `
        <div class="timeline-item">
            <div class="timeline-date">${formatDate(event.date)}</div>
            <div class="timeline-event">${event.msg}</div>
        </div>
    `).join('') || '<div class="empty">Noch keine wichtigen Ereignisse</div>';
}

function saveGame() {
    const data = { game, finances, team, research, products, news, stats, labObjects };
    localStorage.setItem('kidevtycoon_ultimate', JSON.stringify(data));
    showToast('💾 Spiel gespeichert!', 'success');
}

function loadGame() {
    const data = localStorage.getItem('kidevtycoon_ultimate');
    if (!data) {
        showToast('Kein Spielstand gefunden!', 'error');
        return;
    }
    
    const loaded = JSON.parse(data);
    Object.assign(game, loaded.game);
    Object.assign(finances, loaded.finances);
    team.length = 0;
    team.push(...loaded.team);
    Object.assign(research, loaded.research);
    Object.assign(products, loaded.products);
    news.length = 0;
    news.push(...loaded.news);
    Object.assign(stats, loaded.stats);
    labObjects.length = 0;
    labObjects.push(...loaded.labObjects);
    
    employees.length = 0;
    team.forEach(m => addEmployee(m));
    
    showToast('📁 Spiel geladen!', 'success');
    updateUI();
}

function newGame() {
    if (confirm('Neues Spiel starten?\n\nDer aktuelle Fortschritt geht verloren!')) {
        localStorage.removeItem('kidevtycoon_ultimate');
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    initLab();
    
    document.getElementById('pauseBtn').addEventListener('click', () => {
        game.isPaused = true;
        game.speed = 0;
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('pauseBtn').classList.add('active');
    });
    
    document.getElementById('normalBtn').addEventListener('click', () => {
        game.isPaused = false;
        game.speed = 1;
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('normalBtn').classList.add('active');
    });
    
    document.getElementById('fastBtn').addEventListener('click', () => {
        game.isPaused = false;
        game.speed = 2;
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('fastBtn').classList.add('active');
    });
    
    document.getElementById('ultraFastBtn').addEventListener('click', () => {
        game.isPaused = false;
        game.speed = 4;
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('ultraFastBtn').classList.add('active');
    });
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.getElementById(tab + 'Tab').classList.add('active');
            updateUI();
        });
    });
    
    document.getElementById('trackSelect').addEventListener('change', updateResearchInfo);
    document.getElementById('levelSelect').addEventListener('change', updateResearchInfo);
    document.getElementById('startResearchBtn').addEventListener('click', () => {
        const track = document.getElementById('trackSelect').value;
        const level = parseInt(document.getElementById('levelSelect').value);
        startResearch(track, level);
    });
    
    document.getElementById('hireBtn').addEventListener('click', showHireModal);
    document.getElementById('trainingBtn').addEventListener('click', teamTraining);
    
    document.getElementById('newProductBtn').addEventListener('click', showProductModal);
    document.getElementById('productTypeSelect').addEventListener('change', updateProductInfo);
    document.getElementById('productTechSelect').addEventListener('change', updateProductInfo);
    document.getElementById('createProductBtn').addEventListener('click', createProduct);
    
    document.getElementById('grantBtn').addEventListener('click', applyGrant);
    document.getElementById('vcBtn').addEventListener('click', seekVC);
    document.getElementById('loanBtn').addEventListener('click', takeLoan);
    document.getElementById('consultingBtn').addEventListener('click', offerConsulting);
    
    document.getElementById('expandLabBtn').addEventListener('click', expandLab);
    document.getElementById('upgradeComputeBtn').addEventListener('click', upgradeCompute);
    
    document.getElementById('saveBtn').addEventListener('click', saveGame);
    document.getElementById('loadBtn').addEventListener('click', loadGame);
    document.getElementById('newGameBtn').addEventListener('click', newGame);
    
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal').classList.remove('active');
        });
    });
    
    addNews('🎮 Willkommen bei KI Dev Tycoon - Ultimate Edition!', 'positive');
    addNews('💡 Tipp: Starte mit Forschung oder stelle Mitarbeiter ein', 'important');
    addNews('🎯 Ziel: Erreiche AGI als Erster!', 'important');
    
    updateUI();
    
    setInterval(() => {
        if (!game.isPaused) saveGame();
    }, 60000);
});

let lastTick = Date.now();

function gameLoop() {
    const now = Date.now();
    const delta = now - lastTick;
    
    if (!game.isPaused) {
        const tickRates = [0, 1000, 500, 250];
        const tickRate = tickRates[game.speed];
        
        if (delta >= tickRate) {
            advanceTime();
            lastTick = now;
        }
    }
    
    updateEmployees();
    renderLab();
    
    requestAnimationFrame(gameLoop);
}

gameLoop();
