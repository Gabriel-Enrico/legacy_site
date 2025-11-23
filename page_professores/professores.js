document.addEventListener('DOMContentLoaded', () => {

    const listContainer = document.querySelector('.professors-list');
    const listItems = document.querySelectorAll('.professor-item');
    const previewContainer = document.querySelector('.professors-image-preview');

    // 1. Criar a div de legenda dinamicamente e adicionar ao container
    const captionDiv = document.createElement('div');
    captionDiv.classList.add('professor-caption');
    // Estrutura inicial vazia
    captionDiv.innerHTML = '<h3></h3><p></p>';

    // Checagem de segurança caso o container não exista (ex: mobile)
    if (previewContainer) {
        previewContainer.appendChild(captionDiv);
    }

    const preloadedImages = {};
    let activeImage = null;

    // Preload das imagens (mantido do seu código original)
    listItems.forEach(item => {
        const imageUrl = item.dataset.image;
        if (imageUrl) {
            const img = new Image();
            img.src = imageUrl;
            preloadedImages[imageUrl] = img;

            img.classList.add('professor-preview-img');
            if (previewContainer) {
                previewContainer.appendChild(img);
            }
        }
    });

    // Eventos de Hover
    listItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const imageUrl = item.dataset.image;
            const description = item.dataset.description || ""; // Pega a descrição
            // Pega o nome que está dentro do span .prof-name
            const profName = item.querySelector('.prof-name').textContent;

            if (!imageUrl || !previewContainer) return;

            // Lógica da Imagem
            const imageToShow = previewContainer.querySelector(`img[src="${imageUrl}"]`);

            if (activeImage && activeImage !== imageToShow) {
                activeImage.classList.remove('active');
            }

            if (imageToShow) {
                imageToShow.classList.add('active');
                activeImage = imageToShow;
            }

            // Lógica da Legenda (Texto)
            // Atualiza o conteúdo HTML da legenda
            captionDiv.querySelector('h3').textContent = profName;
            captionDiv.querySelector('p').textContent = description;

            // Adiciona a classe active para o fade-in
            captionDiv.classList.add('active');
        });
    });

    // Evento de Mouse Leave (Sair da lista)
    if (listContainer) {
        listContainer.addEventListener('mouseleave', () => {
            // Remove imagem ativa
            if (activeImage) {
                activeImage.classList.remove('active');
                activeImage = null;
            }
            // Remove legenda ativa
            captionDiv.classList.remove('active');
        });
    }

    // Estilos dinâmicos para a imagem (mantido do seu código)
    const style = document.createElement('style');
    style.innerHTML = `
        .professor-preview-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            transform: scale(1.05);
            transition: opacity 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                        transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            z-index: 1; /* Imagem fica atrás do texto */
        }

        .professor-preview-img.active {
            opacity: 1;
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
});
