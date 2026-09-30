const initialPosition = Array(8).fill().map(() => Array(8).fill(null));


const squaresEl = document.querySelectorAll('.square');
const board = document.querySelector('#board');

const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// Create a map of square positions to their algebraic notation
// const squarePositions = {};
// Array.from(squares).forEach((square, index) => {
//     const rank = ranks[Math.floor(index / 8)];
//     const file = files[index % 8];
//     square.textContent = `${file}${rank}`;
// });

const startingPosition = {
    'a1': 'br',
    'b1': 'bn',
    'c1': 'bb',
    'd1': 'bq',
    'e1': 'bk',
    'f1': 'bb',
    'g1': 'bn',
    'h1': 'br',
    'a2': 'bp',
    'b2': 'bp',
    'c2': 'bp',
    'd2': 'bp',
    'e2': 'bp',
    'f2': 'bp',
    'g2': 'bp',
    'h2': 'bp',
    'a8': 'wr',
    'b8': 'wn',
    'c8': 'wb',
    'd8': 'wq',
    'e8': 'wk',
    'f8': 'wb',
    'g8': 'wn',
    'h8': 'wr',
    'a7': 'wp',
    'b7': 'wp',
    'c7': 'wp',
    'd7': 'wp',
    'e7': 'wp',
    'f7': 'wp',
    'g7': 'wp',
    'h7': 'wp'
};

// Initialize the board with the starting position
squaresEl.forEach((square, index) => {
    const rank = ranks[Math.floor(index / 8)];
    const file = files[index % 8];
    const algebraicNotation = `${file}${rank}`;
    const piece = startingPosition[algebraicNotation];
    if (piece) {
        let img = document.createElement('img');
        img.classList.add('piece');
        img.id = 'id' + index;
        img.src = `img/${piece}.png`;
        img.draggable = false;
        square.append(img);
    }
});

let activeDrag = null;

board.addEventListener('pointerdown', (event) => {
    if (!(event.target instanceof Element)) return;

    const piece = event.target.closest('.piece');
    if (!piece) return;

    event.preventDefault();
    activeDrag = {
        piece,
        startX: event.clientX,
        startY: event.clientY
    };
    piece.classList.add('is-dragging');
    board.setPointerCapture(event.pointerId);
});

board.addEventListener('pointermove', (event) => {
    if (!activeDrag) return;

    const offsetX = event.clientX - activeDrag.startX;
    const offsetY = event.clientY - activeDrag.startY;
    activeDrag.piece.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
});

function finishDrag(event, shouldMove) {
    if (!activeDrag) return;

    const { piece } = activeDrag;
    if (shouldMove) {
        const target = document.elementFromPoint(event.clientX, event.clientY);
        const targetSquare = target instanceof Element ? target.closest('.square') : null;
        if (targetSquare && board.contains(targetSquare)) {
            targetSquare.replaceChildren();
            targetSquare.append(piece);
        }
    }

    piece.classList.remove('is-dragging');
    piece.style.transform = '';
    activeDrag = null;
}

board.addEventListener('pointerup', (event) => {
    finishDrag(event, true);
});

board.addEventListener('pointercancel', (event) => {
    finishDrag(event, false);
});

const movements = {
    p: [8, 16],
    r: [8, 1],
    n: [],
    b: [],
    q: [],
    k: []
}

