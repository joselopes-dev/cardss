// Permitir que os elementos possam ser soltos
function allowDrop(event) {
  event.preventDefault();
  if (event.type === 'dragover' || event.type === 'touchmove') {
    event.currentTarget.classList.add('drag-over');
  }
}

// Função chamada quando o item começa a ser arrastado com mouse
function drag(event) {
  event.dataTransfer.setData("imageId", event.target.id);
}

// Função chamada quando o item deixa a área de drop com mouse
function dragLeave(event) {
  event.currentTarget.classList.remove('drag-over');
}

// Função para soltar a imagem na área designada com mouse
function drop(event) {
  event.preventDefault();
  event.currentTarget.classList.remove('drag-over');
  
  var imageId = event.dataTransfer.getData("imageId");
  var droppedElement = document.getElementById(imageId);
  
  if (checkAnswer(imageId, event.target.id)) {
    var dropArea = event.target;
    var textContent = dropArea.innerHTML;
    dropArea.innerHTML = "";

    var textElement = document.createElement("p");
    textElement.innerHTML = textContent;
    dropArea.appendChild(textElement);

    dropArea.appendChild(droppedElement); 
    throwConfetti();
  } else {
    resetPosition(droppedElement);
  }
}


const games = {
  1: {
    name: "Tags HTML",
    images: [
      { id: "img1", src: "imagens/imagem_head.png", answer: "drop1" },
      { id: "img2", src: "imagens/imagem_title.png", answer: "drop2" },
      { id: "img3", src: "imagens/tags-html.png", answer: "drop3" },
      { id: "img4", src: "imagens/imagem_meta.png", answer: "drop4" },
      { id: "img5", src: "imagens/imagem_link.png", answer: "drop5" },
      { id: "img6", src: "imagens/imagem_style.png", answer: "drop6" },
      { id: "img7", src: "imagens/imagem_script.png", answer: "drop7" },
      { id: "img8", src: "imagens/imagem_bory.png", answer: "drop8" },
      { id: "img9", src: "imagens/imagem_h1_h6.png", answer: "drop9" },
      { id: "img10", src: "imagens/imagem_p.png", answer: "drop10" },
      { id: "img11", src: "imagens/imagem_a.png", answer: "drop11" },
      { id: "img12", src: "imagens/imagem_img.png", answer: "drop12" }
    ],
    dropAreas: [
      { id: "drop1", label: "Contém metadados sobre o documento" },
      { id: "drop2", label: "Define o título da página que aparece na aba do navegador" },
      { id: "drop3", label: "Todo o conteúdo da página é colocado dentro desta tag" },
      { id: "drop4", label: "Fornece metadados, como a codificação de caracteres" },
      { id: "drop5", label: "Usada para conectar o documento a arquivos externos" },
      { id: "drop6", label: "Define estilos CSS diretamente no documento" },
      { id: "drop7", label: "Define ou vincula scripts JavaScript" },
      { id: "drop8", label: "Contém todo o conteúdo visível da página web" },
      { id: "drop9", label: "Representam cabeçalhos" },
      { id: "drop10", label: "Define um parágrafo de texto" },
      { id: "drop11", label: "Cria um link para outra página ou recurso" },
      { id: "drop12", label: "Insere uma imagem no documento" }
    ]
  },
  2: {
    name: "Tags HTML",
    images: [
      { id: "imgA", src: "imagens/imagem_ul.png", answer: "dropA" },
      { id: "imgB", src: "imagens/imagem_ol.png", answer: "dropB" },
      { id: "imgC", src: "imagens/imagem_li.png", answer: "dropC" },
      { id: "imgD", src: "imagens/imagem_div.png", answer: "dropD" },
      { id: "imgE", src: "imagens/imagem_span.png", answer: "dropE" },
      { id: "imgF", src: "imagens/imagem_form.png", answer: "dropF" },
      { id: "imgG", src: "imagens/imagem_imput.png", answer: "dropG" },
      { id: "imgH", src: "imagens/imagem_buton.png", answer: "dropH" },
      { id: "imgI", src: "imagens/imagem_table.png", answer: "dropI" },
      { id: "imgJ", src: "imagens/imagem_tr.png", answer: "dropJ" },
      { id: "imgL", src: "imagens/imagem_td.png", answer: "dropL" },
      { id: "imgM", src: "imagens/imagem_th.png", answer: "dropM" }
      // Adicione mais imagens e respostas aqui
    ],
    dropAreas: [
      { id: "dropA", label: "Define uma lista não ordenada" },
      { id: "dropB", label: "Define uma lista ordenada" },
      { id: "dropC", label: "Define um item de uma lista" },
      { id: "dropD", label: "Usada como um contêiner genérico para agrupar elementos" },
      { id: "dropE", label: "Usada para estilizar ou agrupar uma pequena porção de texto" },
      { id: "dropF", label: "Cria um formulário interativo para a entrada de dados do usuário" },
      { id: "dropG", label: "Representa um campo de entrada em um formulário" },
      { id: "dropH", label: "Define um botão clicável" },
      { id: "dropI", label: "Cria uma tabela" },
      { id: "dropJ", label: "Representa uma linha dentro de uma tabela" },
      { id: "dropL", label: "Representa uma célula de dados dentro de uma linha de tabela" },
      { id: "dropM", label: "Define uma célula de cabeçalho em uma tabela" }
      // Adicione mais áreas de drop aqui
    ]
  }
  // Adicione mais jogos aqui
};

// Função para iniciar o jogo
function startGame() {
  const selectedGameId = document.getElementById('game-selector').value;
  const selectedGame = games[selectedGameId];
  
  // Limpa o contêiner
  document.getElementById('drag-container').innerHTML = '';
  document.getElementById('drop-area-container').innerHTML = '';

  // Adiciona imagens ao contêiner de arrastar
  selectedGame.images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.id = image.id;
    imgElement.src = image.src;
    imgElement.draggable = true;
    imgElement.ondragstart = drag;
    imgElement.className = "drag-image"; // Classe para estilização
    document.getElementById('drag-container').appendChild(imgElement);
  });

  // Adiciona áreas de drop
  selectedGame.dropAreas.forEach(area => {
    const dropArea = document.createElement('div');
    dropArea.id = area.id;
    dropArea.classList.add('drop-area');
    dropArea.ondrop = drop;
    dropArea.ondragover = allowDrop;
    dropArea.innerHTML = `<p>${area.label}</p>`;
    document.getElementById('drop-area-container').appendChild(dropArea);
  });

  shuffleElements(document.getElementById('drag-container'));
  shuffleElements(document.getElementById('drop-area-container'));
}

// Permitir que os elementos possam ser soltos
function allowDrop(event) {
  event.preventDefault();
}

// Função chamada quando o item começa a ser arrastado
function drag(event) {
  event.dataTransfer.setData("imageId", event.target.id);
}

// Função para soltar a imagem na área designada
function drop(event) {
  event.preventDefault();
  const imageId = event.dataTransfer.getData("imageId");
  const droppedElement = document.getElementById(imageId);

  if (checkAnswer(imageId, event.target.id)) {
    const dropArea = event.target;
    const textContent = dropArea.innerHTML;
    dropArea.innerHTML = "";
    const textElement = document.createElement("p");
    textElement.innerHTML = textContent;
    dropArea.appendChild(textElement);
    dropArea.appendChild(droppedElement);
    throwConfetti();
  } else {
    resetPosition(droppedElement);
  }
}

// Função para validar a resposta correta
function checkAnswer(imageId, dropAreaId) {
  const selectedGameId = document.getElementById('game-selector').value;
  const selectedGame = games[selectedGameId];
  const image = selectedGame.images.find(img => img.id === imageId);
  return image && image.answer === dropAreaId;
}

// Função para jogar confetes 🎉
function throwConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
}

// Função para reposicionar a imagem no local original
function resetPosition(element) {
  const dragContainer = document.getElementById('drag-container');
  dragContainer.appendChild(element);
}

// Função para embaralhar os elementos dentro de um contêiner
function shuffleElements(container) {
  const elementsArray = Array.from(container.children);
  for (let i = elementsArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    container.appendChild(elementsArray[j]);
  }
}

// Função para reiniciar o jogo
function restartGame() {
  const container = document.getElementById('drag-container');
  const dropAreas = document.querySelectorAll('.drop-area');

  dropAreas.forEach(area => {
    const imagesInDropArea = area.querySelectorAll('img');
    imagesInDropArea.forEach(image => {
      container.appendChild(image);
    });
  });

  shuffleElements(container);
  shuffleElements(document.getElementById('drop-area-container'));
}

// Embaralhar ao carregar a página
document.addEventListener("DOMContentLoaded", function() {
  startGame(); // Inicia o jogo padrão ao carregar
});


// Objeto para gerenciar dados de toque
let touchData = {
  dragging: false,
  draggedElement: null,
  originalParent: null,
  startX: 0,
  startY: 0,
  currentX: 0,
  currentY: 0,
  clone: null
};

// Iniciar o toque
function touchStart(event) {
  event.preventDefault();
  
  if (event.target.tagName.toLowerCase() === 'img') {
    touchData.dragging = true;
    touchData.draggedElement = event.target;
    touchData.originalParent = event.target.parentElement;
    const touch = event.touches[0];
    touchData.startX = touch.clientX;
    touchData.startY = touch.clientY;
    
    // Criar um clone para seguir o toque
    touchData.clone = event.target.cloneNode(true);
    touchData.clone.style.position = 'absolute';
    touchData.clone.style.pointerEvents = 'none';
    touchData.clone.style.opacity = '0.8';
    touchData.clone.style.left = `${touch.clientX}px`;
    touchData.clone.style.top = `${touch.clientY}px`;
    document.body.appendChild(touchData.clone);
  }
}

// Movimentar o toque
function touchMove(event) {
  if (!touchData.dragging) return;
  
  const touch = event.touches[0];
  touchData.currentX = touch.clientX;
  touchData.currentY = touch.clientY;
  
  if (touchData.clone) {
    touchData.clone.style.left = `${touch.clientX}px`;
    touchData.clone.style.top = `${touch.clientY}px`;
  }

  // Adicionar classe de drag-over se estiver sobre uma drop area
  const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
  if (dropTarget && dropTarget.classList.contains('drop-area')) {
    dropTarget.classList.add('drag-over');
  }

  // Remover a classe de drag-over de outras drop areas
  document.querySelectorAll('.drop-area').forEach(function(area) {
    if (area !== dropTarget) {
      area.classList.remove('drag-over');
    }
  });
}

// Finalizar o toque
function touchEnd(event) {
  if (!touchData.dragging) return;
  
  touchData.dragging = false;
  
  if (touchData.clone) {
    document.body.removeChild(touchData.clone);
    touchData.clone = null;
  }
  
  // Remover todas as classes de drag-over
  document.querySelectorAll('.drop-area').forEach(function(area) {
    area.classList.remove('drag-over');
  });
  
  // Detectar o elemento sob o toque
  const dropTarget = document.elementFromPoint(touchData.currentX, touchData.currentY);
  
  if (dropTarget && dropTarget.classList.contains('drop-area')) {
    const imageId = touchData.draggedElement.id;
    const dropAreaId = dropTarget.id;
    
    if (checkAnswer(imageId, dropAreaId)) {
      var dropArea = dropTarget;
      var textContent = dropArea.innerHTML;
      dropArea.innerHTML = "";

      var textElement = document.createElement("p");
      textElement.innerHTML = textContent;
      dropArea.appendChild(textElement);

      dropArea.appendChild(touchData.draggedElement); 
      throwConfetti();
    } else {
      resetPosition(touchData.draggedElement);
    }
  } else {
    resetPosition(touchData.draggedElement);
  }
}

// Adicionar eventos de toque aos elementos arrastáveis
function addTouchSupport() {
  const draggableImages = document.querySelectorAll('.drag-container img');
  
  draggableImages.forEach(function(img) {
    img.addEventListener('touchstart', touchStart, false);
    img.addEventListener('touchmove', touchMove, false);
    img.addEventListener('touchend', touchEnd, false);
  });
}

// Embaralhar ao carregar a página e adicionar suporte a toque
document.addEventListener("DOMContentLoaded", function() {
  var container = document.getElementById('drag-container');
  var dropContainer = document.getElementById('drop-area-container');

  shuffleElements(container);
  shuffleElements(dropContainer);
  
  // Adicionar suporte a toque
  addTouchSupport();
});