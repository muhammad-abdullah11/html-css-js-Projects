const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sizeEL = document.getElementById('size');
const colorEl = document.getElementById('color');
let size = 10, isPressed = false, color = 'black', x, y;

canvas.addEventListener('mousedown', (e) => {
    isPressed = true;
    [x, y] = [e.offsetX, e.offsetY];
});

document.addEventListener('mouseup', () => {
    isPressed = false;
    [x, y] = [undefined, undefined];
});

canvas.addEventListener('mousemove', (e) => {
    if (isPressed) {
        const x2 = e.offsetX, y2 = e.offsetY;
        ctx.beginPath(); ctx.arc(x2, y2, size, 0, Math.PI * 2);
        ctx.fillStyle = color; ctx.fill();
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x2, y2);
        ctx.strokeStyle = color; ctx.lineWidth = size * 2; ctx.stroke();
        [x, y] = [x2, y2];
    }
});

document.getElementById('increase').onclick = () => {
    size = Math.min(size + 5, 50);
    sizeEL.innerText = size;
};

document.getElementById('decrease').onclick = () => {
    size = Math.max(size - 5, 5);
    sizeEL.innerText = size;
};

colorEl.onchange = (e) => color = e.target.value;
document.getElementById('clear').onclick = () => ctx.clearRect(0, 0, canvas.width, canvas.height);
document.getElementById('save').onclick = () => {
    const link = document.createElement('a');
    link.download = 'my-drawing.png';
    link.href = canvas.toDataURL();
    link.click();
};
