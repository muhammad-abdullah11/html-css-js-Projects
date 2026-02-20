const clockTab = document.getElementById('clock-tab');
const stopwatchTab = document.getElementById('stopwatch-tab');
const timerTab = document.getElementById('timer-tab');
const clockSec = document.getElementById('clock-section');
const stopwatchSec = document.getElementById('stopwatch-section');
const timerSec = document.getElementById('timer-section');

const timeDisplay = document.getElementById('time-display');
const dateDisplay = document.getElementById('date-display');

const swDisplay = document.getElementById('stopwatch-display');
const swStart = document.getElementById('sw-start');
const swStop = document.getElementById('sw-stop');
const swReset = document.getElementById('sw-reset');

const tmDisplay = document.getElementById('timer-display');
const tmMinInput = document.getElementById('timer-min');
const tmSecInput = document.getElementById('timer-sec');
const tmStart = document.getElementById('tm-start');
const tmStop = document.getElementById('tm-stop');
const tmReset = document.getElementById('tm-reset');

function switchTab(tab) {
    [clockTab, stopwatchTab, timerTab].forEach(t => t.classList.remove('active'));
    [clockSec, stopwatchSec, timerSec].forEach(s => s.classList.add('hidden'));

    if (tab === 'clock') {
        clockTab.classList.add('active');
        clockSec.classList.remove('hidden');
    } else if (tab === 'stopwatch') {
        stopwatchTab.classList.add('active');
        stopwatchSec.classList.remove('hidden');
    } else if (tab === 'timer') {
        timerTab.classList.add('active');
        timerSec.classList.remove('hidden');
    }
}

clockTab.onclick = () => switchTab('clock');
stopwatchTab.onclick = () => switchTab('stopwatch');
timerTab.onclick = () => switchTab('timer');

function updateClock() {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    timeDisplay.innerText = `${h}:${m}:${s}`;
    dateDisplay.innerText = now.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}
setInterval(updateClock, 1000);
updateClock();

let swStartTime = 0;
let swElapsedTime = 0;
let swInterval = null;

function updateSW() {
    const totalMs = Date.now() - swStartTime + swElapsedTime;
    const ms = Math.floor((totalMs % 1000) / 10);
    const s = Math.floor((totalMs / 1000) % 60);
    const m = Math.floor((totalMs / 60000) % 60);
    const h = Math.floor(totalMs / 3600000);
    swDisplay.innerText = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(2, '0')}`;
}

swStart.onclick = () => {
    if (!swInterval) {
        swStartTime = Date.now();
        swInterval = setInterval(updateSW, 10);
    }
};

swStop.onclick = () => {
    if (swInterval) {
        swElapsedTime += Date.now() - swStartTime;
        clearInterval(swInterval);
        swInterval = null;
    }
};

swReset.onclick = () => {
    clearInterval(swInterval);
    swInterval = null;
    swStartTime = 0;
    swElapsedTime = 0;
    swDisplay.innerText = '00:00:00.00';
};

let tmTime = 0;
let tmInterval = null;

function updateTM() {
    if (tmTime <= 0) {
        clearInterval(tmInterval);
        tmInterval = null;
        alert('Timer Finished!');
        return;
    }
    tmTime--;
    const m = Math.floor(tmTime / 60);
    const s = tmTime % 60;
    tmDisplay.innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

tmStart.onclick = () => {
    if (!tmInterval) {
        if (tmTime <= 0) {
            const mins = parseInt(tmMinInput.value) || 0;
            const secs = parseInt(tmSecInput.value) || 0;
            tmTime = mins * 60 + secs;
        }
        if (tmTime > 0) {
            tmInterval = setInterval(updateTM, 1000);
        }
    }
};

tmStop.onclick = () => {
    if (tmInterval) {
        clearInterval(tmInterval);
        tmInterval = null;
    }
};

tmReset.onclick = () => {
    clearInterval(tmInterval);
    tmInterval = null;
    tmTime = 0;
    tmDisplay.innerText = '00:00';
    tmMinInput.value = '';
    tmSecInput.value = '';
};
