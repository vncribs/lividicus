//Fazer a DIV ser "pegavel"
dragElement(document.getElementById("player1"));
dragElement(document.getElementById("player2"));
dragElement(document.getElementById("player3"));
dragElement(document.getElementById("player4"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  // Variável para armazenar as coordenadas originais do personagem
var originalPosition = { x: 0, y: 0 };

// Função para atualizar as coordenadas originais do personagem
function updateOriginalPosition() {
    originalPosition.x = elmnt.offsetLeft;
    originalPosition.y = elmnt.offsetTop;
}


  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Calcular a proporção do deslocamento com base no zoom do mapa
    var zoomFactor = scale; // Supondo que "scale" seja o fator de zoom do mapa
    pos1 *= zoomFactor;
    pos2 *= zoomFactor;

    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

}