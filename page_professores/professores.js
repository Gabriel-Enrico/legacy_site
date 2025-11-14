document.addEventListener('DOMContentLoaded', () => {

    const listContainer = document.querySelector('.professors-list');
    const listItems = document.querySelectorAll('.professor-item');
    const previewContainer = document.querySelector('.professors-image-preview');

    const preloadedImages = {};
    let activeImage = null;

    listItems.forEach(item => {
        const imageUrl = item.dataset.image;
        if (imageUrl) {
            const img = new Image();
            img.src = imageUrl;
            preloadedImages[imageUrl] = img;

            img.classList.add('professor-preview-img');
            previewContainer.appendChild(img);
        }
    });

    listItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const imageUrl = item.dataset.image;
            if (!imageUrl) return;

            const imageToShow = previewContainer.querySelector(`[src="${imageUrl}"]`);

            if (activeImage && activeImage !== imageToShow) {
                activeImage.classList.remove('active');
            }

            if (imageToShow) {
                imageToShow.classList.add('active');
                activeImage = imageToShow;
            }
        });
    });

    if (listContainer) {
        listContainer.addEventListener('mouseleave', () => {
            if (activeImage) {
                activeImage.classList.remove('active');
                activeImage = null;
            }
        });
    }

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
        }

        .professor-preview-img.active {
            opacity: 1;
            transform: scale(1);
        }
    `;
    document.head.appendChild(style);
});
