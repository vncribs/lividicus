var scale = 1,
    panning = false,
    startPosition = { x: 0, y: 0 },
    lastPosition = { x: 0, y: 0 },
    zoomElement = document.getElementById("zoom");

function updateTransform() {
    zoomElement.style.transform = "translate(" + startPosition.x + "px, " + startPosition.y + "px) scale(" + scale + ")";

    // Após atualizar a transformação do mapa, atualize também as posições dos personagens
    updatePlayerPositions();
}

zoomElement.onmousedown = function (e) {
    e.preventDefault();
    lastPosition = { x: e.clientX, y: e.clientY };
    panning = true;
}

zoomElement.onmouseup = function (e) {
    panning = false;
}

zoomElement.onmousemove = function (e) {
    e.preventDefault();
    if (panning) {
        var deltaX = e.clientX - lastPosition.x,
            deltaY = e.clientY - lastPosition.y;
        lastPosition = { x: e.clientX, y: e.clientY };

        // Ajusta startPosition para que o mapa permaneça dentro do quadro visível
        startPosition.x = Math.max(startPosition.x + deltaX, -zoomElement.offsetWidth * (scale - 1));
        startPosition.x = Math.min(startPosition.x, 0);
        startPosition.y = Math.max(startPosition.y + deltaY, -zoomElement.offsetHeight * (scale - 1));
        startPosition.y = Math.min(startPosition.y, 0);

        updateTransform();
    }
}

zoomElement.onwheel = function (e) {
    e.preventDefault();
    var deltaX = e.clientX - zoomElement.getBoundingClientRect().left,
        deltaY = e.clientY - zoomElement.getBoundingClientRect().top,
        xs = deltaX / scale,
        ys = deltaY / scale,
        delta = (e.wheelDelta ? e.wheelDelta : -e.deltaY);

    if (delta > 0) {
        scale *= 1.2;
        scale = Math.min(scale, 4);
    } else {
        scale /= 1.2;
        scale = Math.max(scale, 1);

        // Redefine startPosition para o centro do quadro quando o zoom for reduzido
        startPosition.x = (zoomElement.offsetWidth - (zoomElement.offsetWidth * scale)) / 2;
        startPosition.y = (zoomElement.offsetHeight - (zoomElement.offsetHeight * scale)) / 2;
    }

    var newDeltaX = xs * scale - deltaX,
        newDeltaY = ys * scale - deltaY;

    startPosition.x -= newDeltaX;
    startPosition.y -= newDeltaY;

    updateTransform();
}

var zoomOutCount = 0, // Inicia o contador de zoom out
    checkInterval; // Variável para armazenar o intervalo de verificação

function checkMapPosition() {
    // Aqui você pode verificar se o mapa está colado à borda e fazer o que for necessário
    // Por exemplo, você pode chamar uma função para ajustar a posição do mapa
    console.log("Verificando a posição do mapa após " + zoomOutCount + " zoom outs.");
    // Implemente sua lógica de verificação aqui
}

// Inicia o intervalo de verificação a cada milissegundo
checkInterval = setInterval(checkMapPosition, 1);

// Define a duração do segundo extra em milissegundos
var extraSecondDuration = 3000;

// Realiza verificações adicionais a cada milissegundo durante o segundo extra
for (var i = 1; i <= extraSecondDuration; i++) {
    setTimeout(checkMapPosition, i);
}

// Para a verificação após o segundo extra
setTimeout(function() {
    clearInterval(checkInterval);
}, extraSecondDuration);