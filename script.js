let activeTab = null;
const originalContent = document.getElementById('cardContent').innerHTML;
const originalLabel = "PLAYER PROFILE";

const mapData = [
    { id: 1, name: "Home: Las Piñas City", desc: "1285 Fruto Santos Avenue, Zapote.", x: 10, y: 80 },
    { id: 2, name: "Zapote Elementary School", desc: "Primary education (2011-2017).", x: 10, y: 65 },
    { id: 3, name: "Las Piñas North National HS", desc: "High School Journey (2017-2021).", x: 25, y: 65 },
    { id: 4, name: "Holy Rosary Academy", desc: "Senior High School (2021-2023).", x: 25, y: 50 },
    { id: 5, name: "PERCDC LearnHub", desc: "First Internship placement (2023).", x: 40, y: 50 },
    { id: 6, name: "PUP Parañaque (Y1-2)", desc: "Engineering studies (2023-2025).", x: 55, y: 50 },
    { id: 7, name: "Absolute Industrial Solutions", desc: "Industry Internship (2023).", x: 55, y: 65 },
    { id: 8, name: "PUP Parañaque (Y3)", desc: "Currently a 3rd year Engineering student!", x: 70, y: 65 },
    { id: 101, name: "???", desc: "A path yet explored...", x: 70, y: 50, mystery: true },
    { id: 102, name: "???", desc: "A path yet explored...", x: 88, y: 50, mystery: true },
    { id: 103, name: "???", desc: "A path yet explored...", x: 88, y: 15, mystery: true },
    { id: 9, name: "Japan", desc: "Dream Destination: The final goal.", x: 94, y: 15, locked: true }
];

function showNode(event, id) {
    event.stopPropagation();
    const popup = document.getElementById('mapPopup');
    const node = mapData.find(n => n.id === id);
    popup.style.display = 'block';
    popup.innerHTML = `<strong style="color:#f85858;">${node.name}</strong><br>${node.desc}`;
}

function closePopup() {
    const popup = document.getElementById('mapPopup');
    if(popup) popup.style.display = 'none';
}

function toggleCategory(element, type) {
    const display = document.getElementById('mainDisplay');
    const sidePanel = document.getElementById('sidePanel');
    const beltContainer = document.getElementById('beltInterfaceContainer');
    const content = document.getElementById('cardContent');
    const label = document.getElementById('cardLabel');
    const badges = document.getElementById('badgeSection');
    const header = document.getElementById('cardHeader');

    // Resetting UI if same tab clicked
    if (activeTab === element) {
        element.classList.remove('active');
        activeTab = null;
        display.style.display = "flex";
        sidePanel.style.display = "flex";
        beltContainer.innerHTML = "";
        label.innerText = originalLabel;
        content.innerHTML = originalContent;
        badges.style.display = "block";
        header.style.display = "flex";
        return;
    }

    if (activeTab) activeTab.classList.remove('active');
    element.classList.add('active');
    activeTab = element;

    // Logic to hide main display and sidebars for lower belt buttons
    const isLowerBelt = ['PARTY', 'POKEDEX', 'KEY ITEMS', 'SETTINGS'].includes(type);
    
    if (isLowerBelt) {
        display.style.display = "none";
        sidePanel.style.display = "none";
        renderBeltScreen(type);
    } else {
        // Side Panel logic (original)
        display.style.display = "flex";
        sidePanel.style.display = "flex";
        beltContainer.innerHTML = "";
        label.innerText = type;
        badges.style.display = "none";
        renderSidePanelScreen(type, content, header);
    }
}

function renderSidePanelScreen(type, content, header) {
    if(type === 'MAP') {
        header.style.display = "none";
        let nodesHTML = mapData.map(n => `<div class="map-node ${n.mystery || n.locked ? 'locked' : ''}" style="left:${n.x}%; top:${n.y}%" onclick="showNode(event, ${n.id})"></div>`).join('');
        let decoHTML = "";
        let treesCount = 0;
        while(treesCount < 12) {
            let rx = Math.random() * 80;
            let ry = 35 + Math.random() * 50;
            if (rx < 75) { decoHTML += `<div class="map-decoration" style="left:${rx}%; top:${ry}%">🌲</div>`; treesCount++; }
        }
        content.innerHTML = `<div class="map-screen-wrapper" onclick="closePopup()"><div class="map-landmass" style="width: 15%; height: 10%; top: 5%; left: 40%; border-radius: 20px;"></div><div class="map-landmass" style="width: 82%; height: 65%; top: 32%; left: -2%; border-radius: 0 120px 100px 0;"></div><div class="map-landmass" style="width: 20%; height: 25%; top: 5%; left: 82%; border-radius: 40px;"></div><div class="map-container"><div class="map-route-v" style="left: 10%; top: 65%; height: 15%;"></div><div class="map-route-h" style="left: 10%; top: 65%; width: 15%;"></div><div class="map-route-v" style="left: 25%; top: 65%; height: 0%;"></div><div class="map-route-v" style="left: 25%; top: 50%; height: 15%;"></div><div class="map-route-h" style="left: 25%; top: 50%; width: 15%;"></div><div class="map-route-h" style="left: 40%; top: 50%; width: 15%;"></div><div class="map-route-v" style="left: 55%; top: 50%; height: 15%;"></div><div class="map-route-h" style="left: 55%; top: 65%; width: 15%;"></div><div class="map-route-v route-bridge" style="left: 70%; top: 50%; height: 15%;"></div><div class="map-route-h route-bridge" style="left: 70%; top: 50%; width: 18%;"></div><div class="map-route-v route-bridge" style="left: 88%; top: 15%; height: 35%;"></div><div class="map-route-h route-bridge" style="left: 88%; top: 15%; width: 6%;"></div>${decoHTML}${nodesHTML}<div class="map-popup" id="mapPopup"></div></div></div>`;
    } else if (type === 'FAVORITES') {
        header.style.display = "none";
        content.innerHTML = `<div class="fav-screen"><div class="fav-left"><div style="font-size:2rem; width:100%; border-bottom:3px solid #a04040;">JAYZIE / Lv. 20</div><div class="fav-sprite-placeholder"><img src="assets/1x1.png" alt="Profile Photo" class="fav-photo-frame"></div><div style="text-align:center;"><div style="font-size:2rem; color:#a04040;">STUDENT</div><div style="font-size:2.5rem; color:#fff; text-shadow:2px 2px #a04040;">♂</div></div></div><div class="fav-right"><div class="fav-header-box"><span>PROFILE</span><span>No. 67</span></div><div class="fav-info-block"><div class="fav-row"><span class="fav-label">FAV COLOR</span> <span>Blue</span></div><div class="fav-row"><span class="fav-label">LOVES</span> <span>Eating</span></div><div class="fav-row"><span class="fav-label">NATURE</span> <span>Laid-back</span></div><div class="fav-row"><span class="fav-label">CURRENT QUEST</span> <span>Graduate</span></div><div style="margin-top:20px; font-size:1.5rem; line-height:1.2;">"Digital design just seems to click for him without much fuss. While he's highly capable in Engineering, it prefers to keep a steady, easygoing pace through life."</div></div></div></div>`;
    } else if (type === 'CONTACT') {
        header.style.display = "none";
        content.innerHTML = `<div class="contact-screen"><div class="contact-card"><div class="contact-header">REACH OUT - CALL ME?</div><div class="contact-grid"><a href="mailto:ayangcojayz@gmail.com" class="contact-btn"><div class="contact-icon"><img src="assets/email.png" alt="Email"></div><div class="contact-text">EMAIL<br><small>ayangcojayz@gmail.com</small></div></a><a href="https://www.facebook.com/share/1FCCC8yA2a/" target="_blank" class="contact-btn"><div class="contact-icon"><img src="assets/fb.png" alt="Facebook"></div><div class="contact-text">FACEBOOK<br><small>Jayzie Ayangco</small></div></a><a href="https://github.com/jayzieayangco/INTERACTIVE_RESUME" target="_blank" class="contact-btn"><div class="contact-icon"><img src="assets/git.png" alt="GitHub"></div><div class="contact-text">GITHUB<br><small>View My Code</small></div></a><a href="#09920610392" class="contact-btn"><div class="contact-icon"><img src="assets/wap.png" alt="Message"></div><div class="contact-text">MESSAGE<br><small>09920610392</small></div></a></div></div></div>`;
    }
}

function renderBeltScreen(type) {
    const container = document.getElementById('beltInterfaceContainer');
    if (type === 'PARTY') {
        const skills = [
            { name: 'JavaScript', lv: 3, exp: 85, icon: '📜' },
            { name: 'Python', lv: 2, exp: 70, icon: '🐍' },
            { name: 'C++', lv: 4, exp: 60, icon: '⚙️' },
            { name: 'HTML/CSS', lv: 5, exp: 95, icon: '🎨' },
            { name: 'React', lv: 1, exp: 40, icon: '⚛️' },
            { name: 'SQL', lv: 2, exp: 55, icon: '💾' }
        ];
        
        let slotsHTML = skills.map((s, i) => `
            <div class="party-slot ${i === 0 ? 'active-slot' : ''}">
                <div class="slot-icon">${s.icon}</div>
                <div class="slot-info">
                    <div class="slot-header">
                        <span class="slot-name">${s.name}</span>
                        <span class="slot-level">Lv. ${s.lv} Year(s)</span>
                    </div>
                    <div class="hp-container">
                        <div class="hp-bar" style="width: ${s.exp}%; background: ${s.exp > 50 ? '#78c850' : s.exp > 20 ? '#f8d030' : '#f85858'}"></div>
                        <div class="hp-text">${s.exp}/100 PRO</div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = `<div class="party-screen-full"><h1 style="width:100%; color:white; text-align:center; font-size:3rem; margin-bottom:10px; text-shadow: 3px 3px #000;">TECH STACK PARTY</h1>${slotsHTML}</div>`;
    } else if (type === 'POKEDEX') {
        container.innerHTML = `<div class="generic-screen"><h1>POKEDEX - PROJECTS</h1><p>[Fire] Web App Portfolio</p><p>[Water] Database Management System</p><p>[Grass] Interactive Resume</p></div>`;
    } else if (type === 'KEY ITEMS') {
        container.innerHTML = `<div class="generic-screen"><h1>KEY ITEMS - CREDENTIALS</h1><p>📜 Web Development Certification</p><p>📜 Data Science Essentials</p></div>`;
    } else if (type === 'SETTINGS') {
        container.innerHTML = `<div class="generic-screen"><h1>SETTINGS</h1><p>Sound: ON</p><p>Text Speed: FAST</p></div>`;
    }
}