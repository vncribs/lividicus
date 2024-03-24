// playersMap.js

// Função para atualizar a posição dos personagens em relação ao mapa
function updatePlayerPositions() {
    // Seleciona todos os elementos de jogador
    const players = document.querySelectorAll('.player');

    // Obtém a posição atual do mapa
    const mapPosition = {
        x: startPosition.x,
        y: startPosition.y
    };

    // Atualiza a posição de cada jogador
    players.forEach(player => {
        // Obtém a posição relativa do jogador em relação ao mapa
        const playerPosition = {
            x: parseFloat(player.style.left.replace('px', '')),
            y: parseFloat(player.style.top.replace('px', ''))
        };

        // Atualiza a posição do jogador de acordo com a posição do mapa
        const updatedPosition = {
            x: playerPosition.x + mapPosition.x,
            y: playerPosition.y + mapPosition.y
        };

        // Define a nova posição do jogador
        player.style.left = updatedPosition.x + 'px';
        player.style.top = updatedPosition.y + 'px';
    });
}

// Event listener para chamar a função updatePlayerPositions quando necessário
document.addEventListener('DOMContentLoaded', function() {
    // Chamamos a função quando a página é carregada
    updatePlayerPositions();
});