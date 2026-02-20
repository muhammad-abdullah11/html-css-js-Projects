const quoteDisplay = document.getElementById('quote-display');
const quoteInput = document.getElementById('quote-input');
const timerEl = document.getElementById('timer');
const wpmEl = document.getElementById('wpm');
const accEl = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');
const levelBtns = document.querySelectorAll('.mode-btn');

const data = {
    easy: [
        "The quick brown fox jumps over the lazy dog.",
        "Simple words are often the best for practice.",
        "Typing fast is a skill that takes time to learn.",
        "A clear mind leads to a steady hand on the keys."
    ],
    medium: [
        "In a world of constant digital distraction, focus becomes a superpower.",
        "The archaeological expedition unearthed artifacts from the Bronze Age.",
        "Success is not final, failure is not fatal: it is the courage to continue."
    ],
    hard: [
        "The phenomenon of globalization is significantly more ancient than contemporary historical narratives often acknowledge.",
        "Interdisciplinary research facilitates the synthesis of diverse perspectives, fostering innovative solutions to complex problems.",
        "Navigational capabilities of ancient civilizations were remarkably sophisticated, defying rudimentary technological assumptions."
    ]
};

let timer = 60, interval = null, started = false, level = 'easy';

function load() {
    const list = data[level];
    const text = list[Math.floor(Math.random() * list.length)];
    quoteDisplay.innerHTML = '';
    text.split('').forEach(c => {
        const s = document.createElement('span');
        s.innerText = c;
        quoteDisplay.appendChild(s);
    });
    quoteInput.value = '';
    quoteInput.disabled = false;
}

function start() {
    if (started) return;
    started = true;
    interval = setInterval(() => {
        timer--;
        timerEl.innerText = timer;
        if (timer <= 0) end();
    }, 1000);
}

function end() {
    clearInterval(interval);
    quoteInput.disabled = true;
}

function track() {
    start();
    const spans = quoteDisplay.querySelectorAll('span');
    const vals = quoteInput.value.split('');
    let ok = 0, err = 0;

    spans.forEach((s, i) => {
        const v = vals[i];
        if (v == null) {
            s.classList.remove('correct', 'incorrect');
        } else if (v === s.innerText) {
            s.classList.add('correct');
            s.classList.remove('incorrect');
            ok++;
        } else {
            s.classList.add('incorrect');
            s.classList.remove('correct');
            err++;
        }
    });

    const elapsed = (60 - timer) / 60 || 0.01;
    wpmEl.innerText = Math.round((ok / 5) / elapsed);
    accEl.innerText = Math.round((ok / (ok + err || 1)) * 100);

    if (vals.length >= spans.length) end();
}

levelBtns.forEach(b => {
    b.onclick = () => {
        levelBtns.forEach(btn => btn.classList.remove('active'));
        b.classList.add('active');
        level = b.innerText.toLowerCase();
        reset();
    };
});

function reset() {
    clearInterval(interval);
    timer = 60;
    started = false;
    timerEl.innerText = timer;
    wpmEl.innerText = 0;
    accEl.innerText = 0;
    load();
}

restartBtn.onclick = reset;
quoteInput.oninput = track;
load();
