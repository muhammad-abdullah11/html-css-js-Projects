const textInput = document.getElementById("textInput");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const sentenceCount = document.getElementById("sentenceCount");
const readingTime = document.getElementById("readingTime");

const toUpperCaseBtn = document.querySelector(".toUpperCase");
const toLowerCaseBtn = document.querySelector(".toLowerCase");
const removeSpacesBtn = document.querySelector(".removeSpaces");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");

const updateStats = () => {
    const text = textInput.value;

    charCount.innerText = text.length;

    const words = text.trim().split(/\s+/).filter(item => item !== "");
    wordCount.innerText = words.length;

    const sentences = text.split(/[.!?]+/).filter(item => item.trim() !== "");
    sentenceCount.innerText = sentences.length;

    const time = Math.ceil(words.length / 200);
    readingTime.innerText = `${time}m`;
};

const transformText = (type) => {
    let text = textInput.value;
    switch (type) {
        case 'upper':
            textInput.value = text.toUpperCase();
            break;
        case 'lower':
            textInput.value = text.toLowerCase();
            break;
        case 'clean':
            textInput.value = text.replace(/\s+/g, ' ').trim();
            break;
    }
    updateStats();
};

textInput.addEventListener("input", updateStats);

toUpperCaseBtn.addEventListener("click", () => transformText('upper'));
toLowerCaseBtn.addEventListener("click", () => transformText('lower'));
removeSpacesBtn.addEventListener("click", () => transformText('clean'));

copyBtn.addEventListener("click", () => {
    if (textInput.value) {
        navigator.clipboard.writeText(textInput.value);
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "Copied!";
        setTimeout(() => copyBtn.innerText = originalText, 2000);
    }
});

clearBtn.addEventListener("click", () => {
    textInput.value = "";
    updateStats();
    textInput.focus();
});

updateStats();
