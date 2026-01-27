let activeTab = null;
const originalContent = document.getElementById('cardContent').innerHTML;
const originalLabel = "PLAYER CARD";

// Sound Logic
const soundLevels = ["OFF", "LOW", "MED", "HIGH"];
let currentSoundIndex = 0; // Starts at OFF

const mapData = [
    { id: 1, name: "Home: Las Piñas City", desc: "1285 Fruto Santos Avenue, Zapote.", x: 10, y: 80 },
    { id: 2, name: "Zapote Elementary School", desc: "Primary education (2011-2017).", x: 10, y: 65 },
    { id: 3, name: "Las Piñas North National HS", desc: "Junior High School(2017-2021).", x: 25, y: 65 },
    { id: 4, name: "Holy Rosary Academy", desc: "Senior High School (2021-2023).", x: 25, y: 50 },
    { id: 5, name: "PERCDC LearnHub", desc: "First Internship (2023).", x: 40, y: 50 },
    { id: 6, name: "PUP Parañaque (Y1-2)", desc: "College Level (2023-2025).", x: 55, y: 50 },
    { id: 7, name: "Absolute Industrial Solutions", desc: "Industry Internship (2023).", x: 55, y: 65 },
    { id: 8, name: "PUP Parañaque (Y3)", desc: "Currently a 3rd year Engineering student!", x: 70, y: 65 },
    { id: 101, name: "???", desc: "A path yet explored...", x: 70, y: 50, mystery: true },
    { id: 102, name: "???", desc: "A path yet explored...", x: 88, y: 50, mystery: true },
    { id: 103, name: "???", desc: "A path yet explored...", x: 88, y: 15, mystery: true },
    { id: 9, name: "Japan", desc: "Dream Destination", x: 94, y: 15, locked: true }
];

const projectData = [
    { name: 'Smart Clothesline System', desc: 'An Arduino-powered device that uses rain sensors to automatically retract clothes when it rains and redeploy them when it is dry.', type: 'ELECTRIC', icon: 'assets/pball.png' },
    { name: 'SEED: IoT Waste Sorter', desc: 'An automated kiosk that uses sensors to identify and sort residential waste into recyclables or organic matter for composting.', type: 'FIRE', icon: 'assets/gball.png' },
    { name: 'Adventure Quest: My Mayor', desc: 'A 2D pixel-art simulation game where players manage community issues like famine and hunger to build leadership and problem-solving skills.', type: 'WATER', icon: 'assets/uball.png' },
    { name: 'Contactless Sanitizer Dispenser', desc: 'A low-cost, transistor-based touchless device that uses IR sensors to dispense sanitizer without physical contact.', type: 'ELECTRIC', icon: 'assets/mball.png' }
];

const credentialData = [
    { name: 'OJT & Work Ethics', desc: 'Prepared for corporate environments through training on professional conduct, discipline, and ethical workplace standards.', icon: 'assets/tm1.png' },
    { name: 'Value of Strong Work Ethics', desc: 'Completed advanced training on responsibility and ethical behavior within modern, high-standard workplaces.', icon: 'assets/tm2.png' },
    { name: 'Python Foundations (SoloLearn)', desc: 'Certified in Python programming. Proficient in core syntax, logic structures, and data manipulation.', icon: 'assets/tm3.png' }
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

function resetToMain() {
    const display = document.getElementById('mainDisplay');
    const sidePanel = document.getElementById('sidePanel');
    const beltContainer = document.getElementById('beltInterfaceContainer');
    const content = document.getElementById('cardContent');
    const label = document.getElementById('cardLabel');
    const badges = document.getElementById('badgeSection');
    const header = document.getElementById('cardHeader');

    if (activeTab) activeTab.classList.remove('active');
    activeTab = null;
    display.classList.remove('ui-exit');
    sidePanel.classList.remove('ui-exit');
    beltContainer.innerHTML = "";
    label.innerText = originalLabel;
    content.innerHTML = originalContent;
    badges.style.display = "block";
    header.style.display = "flex";
}

function toggleCategory(element, type) {
    const display = document.getElementById('mainDisplay');
    const sidePanel = document.getElementById('sidePanel');
    const beltContainer = document.getElementById('beltInterfaceContainer');
    const content = document.getElementById('cardContent');
    const label = document.getElementById('cardLabel');
    const badges = document.getElementById('badgeSection');
    const header = document.getElementById('cardHeader');

    if (activeTab === element) {
        resetToMain();
        return;
    }

    if (activeTab) activeTab.classList.remove('active');
    element.classList.add('active');
    activeTab = element;

    const isLowerBelt = ['PARTY', 'PROJECT', 'CERTIFICATE', 'SETTINGS'].includes(type);
    
    if (isLowerBelt) {
        display.classList.add('ui-exit');
        sidePanel.classList.add('ui-exit');
        setTimeout(() => {
            renderBeltScreen(type);
        }, 300);
    } else {
        display.classList.remove('ui-exit');
        sidePanel.classList.remove('ui-exit');
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
    container.innerHTML = ""; 
    
    let bgClass = "";
    if(type === 'PARTY') bgClass = "bg-party";
    else if(type === 'PROJECT') bgClass = "bg-project";
    else if(type === 'CERTIFICATE') bgClass = "bg-certificate";
    else if(type === 'SETTINGS') bgClass = "bg-settings";

    if (type === 'PARTY') {
        const skills = [
            { name: 'HTML/CSS', lv: 9, exp: 80, symbol: '🌐' },
            { name: 'React', lv: 7, exp: 75, symbol: '⚛️' },
            { name: 'SQL', lv: 3, exp: 40, symbol: '🗄️' },
            { name: 'JavaScript', lv: 5, exp: 60, symbol: '📜' },
            { name: 'Python', lv: 5, exp: 65, symbol: '🐍' },
            { name: 'C++', lv: 4, exp: 50, symbol: '⚙️' },
        ];
        
        let titleHTML = `<h1 style="width:100%; color:white; text-align:center; font-size:3rem; margin-bottom:10px; text-shadow: 3px 3px #000;">${type}</h1>`;
        let slotsHTML = skills.map(s => `
            <div class="party-slot">
                <div class="slot-icon">${s.symbol}</div>
                <div class="slot-info">
                    <div class="slot-header"><span class="slot-name">${s.name}</span><span class="slot-level">Lv. ${s.lv}</span></div>
                    <div class="hp-container">
                        <div class="hp-bar" style="width: ${s.exp}%; background: ${s.exp > 50 ? '#78c850' : '#f8d030'}"></div>
                        <div class="hp-text">${s.exp}/100 PRO</div>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = `<div class="party-screen-full ${bgClass}">${titleHTML}${slotsHTML}
            <div class="bag-item-row" style="position:absolute; bottom:80px; right:40px; background:#f85858; color:white; border:4px solid #fff; border-radius:10px; width:150px; justify-content:center; box-shadow: 4px 4px 0 #000;" onclick="resetToMain()">
               <span class="select-arrow" style="visibility:visible; color:white;">▶</span> CLOSE
            </div></div>`;
        return;
    }

    if(type === 'SETTINGS') {
        container.innerHTML = `
        <div class="party-screen-full bg-settings">
            <div class="bag-wrapper">
                <div class="bag-visual-panel" style="height: 100px; flex: none;">
                    <h2 style="font-size:3.5rem; color:#fff; text-shadow:2px 2px #000;">OPTION</h2>
                </div>
                <div class="settings-menu">
                    <div class="settings-row" onclick="updateSetting('SOUND')">
                        <span>SOUND</span>
                        <span class="settings-value" id="soundVal">${soundLevels[currentSoundIndex]}</span>
                    </div>
                    <div class="settings-row">
                        <span>BUTTON MODE</span>
                        <span class="settings-value">HELP</span>
                    </div>
                    <div class="settings-row">
                        <span>FRAME</span>
                        <span class="settings-value">TYPE 1</span>
                    </div>
                    <div class="settings-row" style="color:#f85858; border:none;" onclick="resetToMain()">
                        <span>CANCEL</span>
                    </div>
                </div>
            </div>
        </div>`;
        return;
    }

    // Handle PROJECT and CERTIFICATE
    let listData = type === 'PROJECT' ? projectData : credentialData;
    let listHTML = listData.map((item, i) => `
        <div class="bag-item-row ${i === 0 ? 'selected' : ''}" onclick="updateBagDetail(this, '${item.desc}', '${item.icon}')">
            <span class="select-arrow">▶</span> ${item.name}
        </div>`).join('');

    container.innerHTML = `
        <div class="party-screen-full ${bgClass}">
            <div class="bag-wrapper">
                <div class="bag-top-row">
                    <div class="bag-visual-panel">
                        <div class="bag-main-icon" id="bagLargeIcon"><img src="${listData[0].icon}" style="width:120px; height:120px; object-fit:contain;"></div>
                        <h2 style="font-size:2.5rem; color:#fff; text-shadow:2px 2px #000;">${type}</h2>
                    </div>
                    <div class="bag-list-panel">
                        ${listHTML}
                        <div class="bag-item-row" onclick="resetToMain()"><span class="select-arrow">▶</span> CLOSE</div>
                    </div>
                </div>
                <div class="bag-description-box" id="bagDescText">${listData[0].desc}</div>
            </div>
        </div>`;
}

function updateSetting(type) {
    if(type === 'SOUND') {
        currentSoundIndex = (currentSoundIndex + 1) % soundLevels.length;
        const level = soundLevels[currentSoundIndex];
        document.getElementById('soundVal').innerText = level;
        
        const music = document.getElementById('bgMusic');
        if(level === "OFF") {
            music.pause();
        } else {
            if(level === "LOW") music.volume = 0.2;
            if(level === "MED") music.volume = 0.5;
            if(level === "HIGH") music.volume = 1.0;
            music.play().catch(e => console.log("User interaction required for audio"));
        }
    }
}

function updateBagDetail(element, desc, iconPath) {
    const rows = document.querySelectorAll('.bag-item-row');
    rows.forEach(r => r.classList.remove('selected'));
    element.classList.add('selected');
    document.getElementById('bagDescText').innerText = desc;
    document.getElementById('bagLargeIcon').innerHTML = `<img src="${iconPath}" style="width:120px; height:120px; object-fit:contain;">`;
}