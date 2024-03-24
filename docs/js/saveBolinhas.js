// Função para carregar as posições das bolinhas do localStorage
function loadPositions() {
    for (let i = 1; i <= 4; i++) {
        const player = document.getElementById(`player${i}`);
        const storedPosition = localStorage.getItem(`player${i}`);
        if (storedPosition) {
            const { top, left } = JSON.parse(storedPosition);
            player.style.top = top;
            player.style.left = left;
        }
    }
}

// Função para salvar as posições das bolinhas no localStorage
function savePositions() {
    for (let i = 1; i <= 4; i++) {
        const player = document.getElementById(`player${i}`);
        const { top, left } = player.style;
        localStorage.setItem(`player${i}`, JSON.stringify({ top, left }));
    }
}

// Carregar posições ao carregar a página
loadPositions();

// Salvar posições ao fechar o navegador ou recarregar a página
window.addEventListener('beforeunload', savePositions);
